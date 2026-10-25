import { execFile } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import chokidar from 'chokidar';
import { Capability, EnvironmentAdapter, FileEvent, matchesOsRange } from '@macknow/core';

export type CommandExecutor = (
  cmd: string,
  args: string[]
) => Promise<{ stdout: string; stderr: string }>;

export interface MacWindowBounds {
  owner: string;
  name?: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LiveHighlightSpec {
  scene: string;
  targetApp: string;
  rect: { x: number; y: number; width: number; height: number };
  label: string;
  instruction: string;
  hint: string;
  shortcutBadge?: string;
  sideTips: string[];
}

/**
 * Domyślny wykonawca komend systemowych macOS (sw_vers, osascript, open, pbpaste) z bezpiecznym timeoutem.
 */
export const defaultCommandExecutor: CommandExecutor = (cmd, args) => {
  return new Promise((resolve, reject) => {
    execFile(cmd, args, { timeout: 3500, encoding: 'utf8' }, (err, stdout, stderr) => {
      if (err) {
        return reject(err);
      }
      resolve({ stdout: stdout || '', stderr: stderr || '' });
    });
  });
};

export interface MacAdapterOptions {
  exec?: CommandExecutor;
  readClipboard?: () => string | Promise<string | null>;
  homedir?: string;
  usePolling?: boolean;
}

const CG_WINDOW_LIST_JXA = `
ObjC.import("CoreGraphics");
const list = ObjC.castRefToObject($.CGWindowListCopyWindowInfo(17, 0));
const count = list.count;
const out = [];
for (let i = 0; i < count; i++) {
  const w = list.objectAtIndex(i);
  const layer = ObjC.unwrap(w.objectForKey("kCGWindowLayer"));
  const owner = ObjC.unwrap(w.objectForKey("kCGWindowOwnerName"));
  const name = ObjC.unwrap(w.objectForKey("kCGWindowName")) || "";
  const bounds = w.objectForKey("kCGWindowBounds");
  if (layer === 0 && bounds) {
    const x = ObjC.unwrap(bounds.objectForKey("X"));
    const y = ObjC.unwrap(bounds.objectForKey("Y"));
    const width = ObjC.unwrap(bounds.objectForKey("Width"));
    const height = ObjC.unwrap(bounds.objectForKey("Height"));
    if (width > 120 && height > 80) {
      out.push({ owner, name, x, y, width, height });
    }
  }
}
JSON.stringify(out);
`.trim();

/**
 * Adapter prawdziwego systemu macOS (od 10.13 High Sierra wzwyż) dla aplikacji Electron.
 * Wszystkie wywołania AppleScript i systemowe są odporne na brak uprawnień – w razie odmowy
 * zwracają null lub przełączają isAvailable() na false, bez rzucania błędów użytkowniczce.
 */
export class MacAdapter implements EnvironmentAdapter {
  private exec: CommandExecutor;
  private readClipboardFn?: () => string | Promise<string | null>;
  private homeDir: string;
  private usePolling: boolean;
  private cachedOsVersion: string | null = null;
  private capabilityStatus: Record<Capability, boolean> = {
    frontmostApp: true,
    watchFolder: true,
    clipboardText: true,
    safariUrl: true,
    openApp: true,
    realMac: true,
  };

  constructor(options: MacAdapterOptions = {}) {
    this.exec = options.exec || defaultCommandExecutor;
    this.readClipboardFn = options.readClipboard;
    this.homeDir = options.homedir || os.homedir();
    this.usePolling = options.usePolling !== undefined ? options.usePolling : true;
  }

  /**
   * Pobiera wersję systemu macOS przez `sw_vers -productVersion` (np. "10.13.6", "10.15.7", "12.7.4", "15.1").
   */
  async osVersion(): Promise<string | null> {
    if (this.cachedOsVersion) {
      return this.cachedOsVersion;
    }
    try {
      const { stdout } = await this.exec('sw_vers', ['-productVersion']);
      const ver = stdout.trim();
      if (ver) {
        this.cachedOsVersion = ver;
        return ver;
      }
    } catch {
      this.capabilityStatus.realMac = false;
    }
    return null;
  }

  /**
   * Pobiera współrzędne wszystkich widocznych okien na ekranie Maca przez CoreGraphics (CGWindowListCopyWindowInfo).
   * Działa bez uprawnień Dostępności (Accessibility) na macOS.
   */
  async getWindowBoundsList(): Promise<MacWindowBounds[]> {
    try {
      const { stdout } = await this.exec('osascript', ['-l', 'JavaScript', '-e', CG_WINDOW_LIST_JXA]);
      const parsed = JSON.parse(stdout.trim());
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      // Ignorujemy błąd i zwracamy pustą listę
    }
    return [];
  }

  /**
   * Zwraca nazwę programu będącego aktualnie na pierwszym planie (frontmost).
   * Działa od macOS 10.13 High Sierra wzwyż. Posiada fallback do CoreGraphics CGWindowListCopyWindowInfo.
   */
  async frontmostApp(): Promise<string | null> {
    try {
      const script =
        'tell application "System Events" to get name of first process whose frontmost is true';
      const { stdout } = await this.exec('osascript', ['-e', script]);
      const appName = stdout.trim();
      if (appName) {
        return appName;
      }
    } catch {
      // Próbujemy fallbacku CoreGraphics zanim wyłączymy zdolność frontmostApp
      const windows = await this.getWindowBoundsList();
      const topWin = windows.find((w) => w.owner && w.owner !== 'MacKnow' && w.owner !== 'Electron');
      if (topWin) {
        return topWin.owner;
      }
      this.capabilityStatus.frontmostApp = false;
      return null;
    }
    return null;
  }

  /**
   * Obserwuje wskazany folder (np. ~/Desktop, ~/Downloads, ~/Documents) za pomocą chokidar
   * z włączonym `usePolling: true` jako niezawodnym fallbackiem dla starszych MacBooków i dysków HDD.
   */
  watchFolder(folderPath: string, cb: (file: FileEvent) => void): () => void {
    const resolvedFolder = folderPath.startsWith('~/')
      ? path.join(this.homeDir, folderPath.slice(2))
      : folderPath;

    if (!fs.existsSync(resolvedFolder)) {
      return () => {};
    }

    const watcher = chokidar.watch(resolvedFolder, {
      ignoreInitial: true,
      depth: 0,
      usePolling: this.usePolling,
      interval: 500,
      IgnorePermissionErrors: true,
    } as chokidar.WatchOptions);

    watcher.on('add', (fullPath: string) => {
      cb({
        path: fullPath,
        filename: path.basename(fullPath),
        folder: folderPath,
        timestamp: Date.now(),
      });
    });

    watcher.on('error', () => {
      this.capabilityStatus.watchFolder = false;
    });

    return () => {
      watcher.close().catch(() => {});
    };
  }

  /**
   * Odczytuje aktualny tekst ze schowka systemowego macOS.
   */
  async clipboardText(): Promise<string | null> {
    try {
      if (this.readClipboardFn) {
        const res = await this.readClipboardFn();
        return res ?? null;
      }
      const { stdout } = await this.exec('pbpaste', []);
      return stdout;
    } catch {
      this.capabilityStatus.clipboardText = false;
      return null;
    }
  }

  /**
   * Pobiera adres URL aktywnej karty w przeglądarce Safari przez AppleScript.
   */
  async safariUrl(): Promise<string | null> {
    try {
      const script =
        'tell application "Safari" to if (count of windows) > 0 then get URL of current tab of front window';
      const { stdout } = await this.exec('osascript', ['-e', script]);
      const url = stdout.trim();
      return url || null;
    } catch {
      this.capabilityStatus.safariUrl = false;
      return null;
    }
  }

  /**
   * Otwiera wskazaną aplikację na Macu za pomocą komendy `open -a "Nazwa"`.
   * Na macOS < 13 tłumaczy „System Settings” na „System Preferences”.
   */
  async openApp(name: string): Promise<void> {
    const ver = await this.osVersion();
    let targetName = name;
    if (
      ver &&
      matchesOsRange(ver, '<13') &&
      (name === 'System Settings' || name === 'Ustawienia systemowe')
    ) {
      targetName = 'System Preferences';
    }
    try {
      await this.exec('open', ['-a', targetName]);
    } catch {
      this.capabilityStatus.openApp = false;
    }
  }

  /**
   * Otwiera prawdziwy program, teczkę lub panel Ustawień systemowych odpowiadający bieżącemu krokowi misji.
   */
  async openStepTargetOnMac(scene: string): Promise<string> {
    const s = (scene || '').toLowerCase();
    try {
      if (s.includes('macos-02') || s.includes('macos-13') || s.includes('macos-17-step-2') || s.includes('programy-14')) {
        await this.exec('open', [path.join(this.homeDir, 'Downloads')]);
        return 'Finder (Pobrane)';
      }
      if (s.includes('macos-05') || s.includes('macos-11') || s.includes('macos-12') || s.includes('macos-16') || s.includes('programy-11')) {
        await this.exec('open', [path.join(this.homeDir, 'Documents')]);
        return 'Finder (Dokumenty)';
      }
      if (s.includes('macos-10')) {
        await this.exec('open', [path.join(this.homeDir, '.Trash')]);
        return 'Finder (Kosz)';
      }
      if (
        s.includes('macos-08') ||
        s.includes('macos-14') ||
        s.includes('macos-17') ||
        s.includes('macos-19') ||
        s.includes('macos-20-step-2') ||
        s.includes('iphone-04-step-1') ||
        s.includes('iphone-07')
      ) {
        await this.openApp('System Settings');
        return 'Ustawienia systemowe';
      }
      if (s.includes('mail') || s.includes('programy-01') || s.includes('programy-02')) {
        await this.openApp('Mail');
        return 'Mail';
      }
      if (
        s.includes('safari') ||
        s.includes('programy-03') ||
        s.includes('programy-04') ||
        s.includes('programy-08') ||
        s.includes('programy-13') ||
        s.includes('ai-02') ||
        s.includes('ai-03') ||
        s.includes('ai-04') ||
        s.includes('ai-05') ||
        s.includes('ai-06') ||
        s.includes('ai-07')
      ) {
        await this.openApp('Safari');
        return 'Safari';
      }
      if (s.includes('podglad') || s.includes('programy-09') || s.includes('programy-10') || s.includes('programy-12')) {
        await this.openApp('Preview');
        return 'Podgląd';
      }
      if (s.includes('word') || s.includes('programy-05') || s.includes('programy-06') || s.includes('ai-08') || s.includes('macos-04')) {
        await this.openApp('Notes');
        return 'Notatki';
      }
      if (s.includes('iphone-02') || s.includes('iphone-03')) {
        await this.openApp('Photos');
        return 'Zdjęcia';
      }
      if (s.includes('iphone-05')) {
        await this.openApp('Messages');
        return 'Wiadomości';
      }
      if (s.includes('iphone-06')) {
        await this.openApp('FaceTime');
        return 'FaceTime';
      }
      if (s.includes('iphone-08')) {
        await this.exec('open', ['/System/Applications/FindMy.app']).catch(() => this.openApp('Find My'));
        return 'Znajdź';
      }
      await this.openApp('Finder');
      return 'Finder';
    } catch {
      return 'Finder';
    }
  }

  /**
   * Wylicza dokładny prostokąt zakreślenia na żywo na prawdziwym ekranie Maca oraz dodatkowe wskazówki
   * wyświetlane obok przez czarnego kotka przewodnika („Mruczka”).
   */
  async computeLiveHighlight(
    scene: string,
    instruction: string,
    hint: string,
    screenSize: { width: number; height: number }
  ): Promise<LiveHighlightSpec> {
    const s = (scene || '').toLowerCase();
    const windows = await this.getWindowBoundsList();

    // Dopasowujemy aplikację docelową i dodatkowe podpowiedzi „Co warto wiedzieć obok”
    let targetApp = 'Finder';
    let shortcutBadge: string | undefined;
    let sideTips: string[] = [
      'Nie spiesz się – każde kliknięcie na Macu możesz bezpiecznie cofnąć skrótem ⌘Z.',
      'Jeśli okno programu schowało się pod innymi, kliknij jego ikonę na dolnym pasku Dock.',
    ];

    if (s.includes('macos-03')) {
      shortcutBadge = '⌘⇧5 lub ⌘⇧4';
      sideTips = [
        '⌘⇧5 otwiera wygodny pasek zrzutu ekranu na dole.',
        '⌘⇧4 zamienia kursor w celownik do zaznaczenia wycinka.',
        'Gotowy zrzut ląduje od razu na Twoim Biurku (Pulpicie).',
      ];
    } else if (s.includes('macos-04') || s.includes('clipboard')) {
      shortcutBadge = '⌘C → ⌘V';
      sideTips = [
        '⌘C kopiuje zaznaczony tekst na niewidzialną tacę schowka.',
        '⌘V wkleja zawartość schowka w nowym miejscu.',
        'Klawisz ⌘ (Command) leży tuż obok długiego klawisza spacji.',
      ];
    } else if (s.includes('macos-06')) {
      shortcutBadge = '⌘Spacja (Spotlight)';
      sideTips = [
        'Lupka Spotlight w prawym górnym rogu ekranu znajdzie każdy plik i program.',
        'Możesz w niej także liczyć (np. 145*12) i przeliczać waluty.',
      ];
    } else if (s.includes('macos-11') || s.includes('macos-12') || s.includes('macos-13')) {
      shortcutBadge = '⌘2 (Lista) / ⌘3 (Kolumny)';
      sideTips = [
        'Plik to pojedyncza kartka (np. .pdf, .jpg), a teczka (folder) to niebieskie pudełko na pliki.',
        'Widok Kolumn (⌘3) pokazuje całe drzewo katalogów od lewej do prawej.',
        'W widoku Listy (⌘2) kliknij „Data modyfikacji”, aby mieć dzisiejsze pliki na górze.',
      ];
    } else if (s.includes('macos-18')) {
      shortcutBadge = '⌥⌘Esc (Wymuś koniec)';
      sideTips = [
        'Zamknięcie zaciętego programu przez „Wymuś koniec” nie rusza pozostałych otwartych dokumentów.',
        'Nie musisz wyłączać całego MacBooka przyciskiem zasilania.',
      ];
    } else if (s.includes('macos-19')) {
      shortcutBadge = 'Prawy ⌥ (Option) + litera';
      sideTips = [
        'Tuż przy spacji leży Command (⌘), a klawisz polskich znaków Option (⌥) jest o jeden klawisz dalej w prawo.',
        'Możesz też przytrzymać zwykłą literę przez sekundę, aby wybrać polski ogonek z dymku!',
      ];
    } else if (s.includes('programy-11') || s.includes('iphone-07')) {
      shortcutBadge = 'iCloud vs Dysk Maca';
      sideTips = [
        'Chmurka ze strzałką w dół obok pliku oznacza, że kliknięcie pobierze go na stałe na dysk Maca.',
        'Bezpłatny iCloud ma 5 GB na serwerze, podczas gdy dysk Twojego Maca ma setki gigabajtów.',
      ];
    } else if (s.includes('programy-12')) {
      shortcutBadge = '⌘P (Drukuj / PDF)';
      sideTips = [
        'Zawsze spójrz na podgląd stron i wybierz „Od 1 do 1”, by nie drukować reklam i regulaminów.',
        'Przycisk „PDF” na dole okna drukowania zapisuje stronę jako plik bez użycia drukarki.',
      ];
    } else if (s.includes('programy-13')) {
      shortcutBadge = '⌘+ (Powiększ) / Czytnik';
      sideTips = [
        'Każde naciśnięcie ⌘+ powiększa litery na stronie w Safari.',
        'Ikona Czytnika po lewej stronie paska adresu ukrywa wszystkie reklamy wokół artykułu.',
      ];
    }

    // 1. Sceny wskazujące lewy górny róg ekranu (Menu Apple )
    if (s.includes('macos-09') || s.includes('macos-18-step-1') || s.includes('macos-20-step-1') || s.includes('macos-08-step-1')) {
      return {
        scene,
        targetApp: 'Menu Apple  (lewy górny róg)',
        rect: { x: 8, y: 4, width: 140, height: 38 },
        label: 'Menu  w lewym górnym rogu ekranu',
        instruction,
        hint,
        shortcutBadge,
        sideTips,
      };
    }

    // 2. Sceny wskazujące prawy górny róg ekranu (Spotlight / Centrum sterowania / Wi-Fi)
    if (s.includes('macos-06-step-1') || s.includes('iphone-01-step-2') || s.includes('iphone-03-step-1')) {
      return {
        scene,
        targetApp: 'Górny pasek menu (prawy górny róg)',
        rect: { x: Math.max(20, screenSize.width - 310), y: 4, width: 295, height: 40 },
        label: 'Ikony w prawym górnym rogu ekranu (Spotlight / Centrum sterowania)',
        instruction,
        hint,
        shortcutBadge,
        sideTips,
      };
    }

    // 3. Sceny wskazujące dolny pasek Dock
    if (
      s.includes('macos-01-step-1') ||
      s.includes('macos-02-step-1') ||
      s.includes('macos-05-step-1') ||
      s.includes('macos-10-step-1') ||
      s.includes('iphone-04-step-3')
    ) {
      const dockW = Math.min(760, Math.round(screenSize.width * 0.56));
      return {
        scene,
        targetApp: 'Pasek Dock na dole ekranu',
        rect: {
          x: Math.round((screenSize.width - dockW) / 2),
          y: screenSize.height - 88,
          width: dockW,
          height: 82,
        },
        label: 'Pasek Dock na dole ekranu Twojego Maca',
        instruction,
        hint,
        shortcutBadge,
        sideTips,
      };
    }

    // 4. Szukamy prawdziwego otwartego okna aplikacji docelowej na ekranie Maca
    const matchWindow = (names: string[]) =>
      windows.find((w) =>
        names.some((n) => w.owner.toLowerCase().includes(n.toLowerCase()))
      );

    let win: MacWindowBounds | undefined;
    if (s.includes('safari') || s.includes('programy-03') || s.includes('programy-04') || s.includes('programy-08') || s.includes('programy-13') || s.includes('programy-14') || s.includes('ai-')) {
      win = matchWindow(['Safari']);
      targetApp = 'Safari';
    } else if (s.includes('mail') || s.includes('programy-01') || s.includes('programy-02')) {
      win = matchWindow(['Mail']);
      targetApp = 'Mail';
    } else if (s.includes('podglad') || s.includes('programy-09') || s.includes('programy-10') || s.includes('programy-12')) {
      win = matchWindow(['Podgląd', 'Preview']);
      targetApp = 'Podgląd';
    } else if (s.includes('macos-08') || s.includes('macos-14') || s.includes('macos-17') || s.includes('macos-19') || s.includes('macos-20') || s.includes('iphone-04') || s.includes('iphone-07')) {
      win = matchWindow(['Ustawienia systemowe', 'System Settings', 'Preferencje systemowe', 'System Preferences']);
      targetApp = 'Ustawienia systemowe';
    } else if (s.includes('iphone-02') || s.includes('iphone-03')) {
      win = matchWindow(['Zdjęcia', 'Photos']);
      targetApp = 'Zdjęcia';
    } else if (s.includes('iphone-05')) {
      win = matchWindow(['Wiadomości', 'Messages']);
      targetApp = 'Wiadomości';
    } else if (s.includes('iphone-06')) {
      win = matchWindow(['FaceTime']);
      targetApp = 'FaceTime';
    } else if (s.includes('iphone-08')) {
      win = matchWindow(['Znajdź', 'Find My']);
      targetApp = 'Znajdź';
    } else if (s.includes('word') || s.includes('programy-05') || s.includes('programy-06') || s.includes('ai-08')) {
      win = matchWindow(['Word', 'Pages', 'Notatki', 'Notes', 'TextEdit']);
      targetApp = win?.owner || 'Notatki / Dokument';
    } else {
      win = matchWindow(['Finder']);
      targetApp = 'Finder';
    }

    if (win) {
      // Dopasowujemy dokładny fragment prawdziwego okna (pasek boczny, górny pasek narzędzi, dolny pasek ścieżki lub środek okna)
      if (
        s.includes('step-1') &&
        (targetApp === 'Finder' || targetApp === 'Ustawienia systemowe' || targetApp === 'Mail')
      ) {
        return {
          scene,
          targetApp,
          rect: {
            x: win.x + 6,
            y: win.y + 42,
            width: Math.min(230, Math.max(160, Math.round(win.width * 0.28))),
            height: Math.max(160, win.height - 54),
          },
          label: `Lewy pasek boczny w oknie programu ${targetApp}`,
          instruction,
          hint,
          shortcutBadge,
          sideTips,
        };
      }

      if (s.includes('macos-11-step-3')) {
        return {
          scene,
          targetApp,
          rect: {
            x: win.x + 10,
            y: win.y + win.height - 38,
            width: Math.max(240, win.width - 20),
            height: 34,
          },
          label: 'Pasek ścieżki na samym dole okna Findera',
          instruction,
          hint,
          shortcutBadge,
          sideTips,
        };
      }

      if (
        s.includes('macos-11-step-1') ||
        s.includes('macos-13-step-1') ||
        s.includes('safari') ||
        s.includes('programy-13') ||
        s.includes('programy-14') ||
        s.includes('podglad')
      ) {
        return {
          scene,
          targetApp,
          rect: {
            x: win.x + 12,
            y: win.y + 6,
            width: Math.max(260, win.width - 24),
            height: 68,
          },
          label: `Górny pasek narzędzi w oknie programu ${targetApp}`,
          instruction,
          hint,
          shortcutBadge,
          sideTips,
        };
      }

      return {
        scene,
        targetApp,
        rect: {
          x: win.x + 14,
          y: win.y + 38,
          width: Math.max(260, win.width - 28),
          height: Math.max(180, win.height - 52),
        },
        label: `Okno programu ${targetApp} na Twoim Macu`,
        instruction,
        hint,
        shortcutBadge,
        sideTips,
      };
    }

    // Jeśli okno docelowego programu nie jest jeszcze otwarte, wskazujemy lewą połowę ekranu roboczego
    return {
      scene,
      targetApp,
      rect: {
        x: 60,
        y: 80,
        width: Math.max(420, Math.round(screenSize.width * 0.52)),
        height: Math.max(320, Math.round(screenSize.height * 0.58)),
      },
      label: `Obszar roboczy programu ${targetApp}`,
      instruction,
      hint,
      shortcutBadge,
      sideTips,
    };
  }

  /**
   * Sprawdza, czy dana funkcja systemowa jest dostępna na bieżącym Macu.
   */
  isAvailable(capability: Capability): boolean {
    return Boolean(this.capabilityStatus[capability]);
  }
}
