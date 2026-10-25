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
   * Zwraca nazwę programu będącego aktualnie na pierwszym planie (frontmost).
   * Działa od macOS 10.13 High Sierra wzwyż.
   */
  async frontmostApp(): Promise<string | null> {
    try {
      const script =
        'tell application "System Events" to get name of first process whose frontmost is true';
      const { stdout } = await this.exec('osascript', ['-e', script]);
      const appName = stdout.trim();
      return appName || null;
    } catch {
      // Brak uprawnień Dostępności (Accessibility) – oznaczamy zdolność jako niedostępną, by przejść w tryb manual
      this.capabilityStatus.frontmostApp = false;
      return null;
    }
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
   * Sprawdza, czy dana funkcja systemowa jest dostępna na bieżącym Macu.
   */
  isAvailable(capability: Capability): boolean {
    return Boolean(this.capabilityStatus[capability]);
  }
}
