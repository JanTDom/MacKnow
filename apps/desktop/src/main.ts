import { app, BrowserWindow, clipboard, ipcMain, screen } from 'electron';
import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import os from 'node:os';
import path from 'node:path';
import { LiveHighlightSpec, MacAdapter } from './mac-adapter';
import { DesktopSqliteProgressStore } from './sqlite-store';
import { matchesOsRange } from '@macknow/core';

let mainWindow: BrowserWindow | null = null;
let overlayWindow: BrowserWindow | null = null;
let liveCoachTimer: ReturnType<typeof setInterval> | null = null;
let currentCoachPayload: { scene: string; instruction: string; hint: string } | null = null;
let currentOverlayHtml = '<!DOCTYPE html><html><body style="background:transparent"></body></html>';
let localServer: http.Server | null = null;
let localServerPort = 0;
const activeWatchers = new Map<string, () => void>();

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};

function escapeHtml(str: string): string {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export interface MaksAiPayload {
  question: string;
  missionTitle?: string;
  stepInstruction?: string;
  stepHint?: string;
  osVersion?: string | null;
  frontmostApp?: string | null;
  mode?: 'step' | 'pogotowie' | 'theory';
}

export interface MaksAiResult {
  answer: string;
  steps?: string[];
  source: 'gemini' | 'local';
}

/**
 * Odczytuje klucz API Gemini ze zmiennej środowiskowej lub lokalnego pliku konfiguracyjnego użytkownika
 * poza repozytorium Git.
 */
function resolveGeminiApiKey(): string | null {
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim()) {
    return process.env.GEMINI_API_KEY.trim();
  }
  const candidates: string[] = [];
  try {
    if (app && app.isReady()) {
      candidates.push(path.join(app.getPath('userData'), 'ai-config.json'));
    }
  } catch {
    // Ignorujemy brak gotowości app
  }
  candidates.push(
    path.join(os.homedir(), 'Library', 'Application Support', 'MacKnow', 'ai-config.json'),
    path.join(os.homedir(), 'Library', 'Application Support', '@macknow', 'desktop', 'ai-config.json')
  );

  for (const file of candidates) {
    try {
      if (fs.existsSync(file)) {
        const parsed = JSON.parse(fs.readFileSync(file, 'utf8')) as { geminiApiKey?: string };
        if (parsed.geminiApiKey && parsed.geminiApiKey.trim()) {
          return parsed.geminiApiKey.trim();
        }
      }
    } catch {
      // Próbujemy kolejny plik
    }
  }
  return null;
}

function buildLocalFallbackAnswer(payload: MaksAiPayload): MaksAiResult {
  const q = (payload.question || '').toLowerCase();
  const appName = payload.frontmostApp || 'Finder';

  if (q.includes('inaczej') || q.includes('nie widzę') || q.includes('gdzie')) {
    return {
      source: 'local',
      answer: `Małgorzato, spokojnie – na Twoim Macu widok może się minimalnie różnić, bo aktualnie na wierzchu jest program ${appName}.`,
      steps: [
        'Spójrz na samą górę ekranu (obok znaczka ) i upewnij się, że widzisz tam nazwę programu, w którym ćwiczymy.',
        'Jeśli okno wygląda inaczej niż w opisie, naciśnij ⌘2 (widok listy) lub ⌘3 (widok kolumn), aby uporządkować zawartość.',
        'Gdyby wyskoczyło nieznane okienko z pytaniem, naciśnij klawisz Esc w lewym górnym rogu klawiatury – okienko bezpiecznie zniknie.',
      ],
    };
  }

  return {
    source: 'local',
    answer: `Małgorzato, już Ci podpowiadam krok po kroku w tej sytuacji (${payload.missionTitle || 'praca na MacBooku'}):`,
    steps: [
      payload.stepInstruction
        ? `W tym kroku nasz cel to: ${payload.stepInstruction}`
        : 'Kliknij ikonę Findera (uśmiechniętą niebiesko-białą buźkę) na dolnym pasku Dock.',
      payload.stepHint
        ? `Wskazówka Maksa: ${payload.stepHint}`
        : 'Użyj lupy Spotlight (⌘Spacja w prawym górnym rogu ekranu), aby odnaleźć dowolny plik lub program po fragmencie nazwy.',
      'Pamiętaj, że każde przypadkowe działanie możesz od razu cofnąć skrótem ⌘Z.',
    ],
  };
}

/**
 * Wysyła zapytanie sytuacyjne do modelu Gemini 2.5 Flash w imieniu Czarnego Kotka Maksa.
 */
async function askGeminiMaks(payload: MaksAiPayload): Promise<MaksAiResult> {
  const apiKey = resolveGeminiApiKey();
  if (!apiKey) {
    return buildLocalFallbackAnswer(payload);
  }

  const systemInstruction = [
    'Jesteś Maksem – sympatycznym, mądrym czarnym kotkiem przewodnikiem w aplikacji MacKnow stworzonej specjalnie dla Małgorzaty.',
    'Zwracaj się do niej ciepło, konkretnie, z lekkim kocim humorem, zawsze w formie żeńskiej („zrobiłaś”, „kliknęłaś”, „zobaczysz”, w wołaczu „Małgorzato”).',
    'Nigdy nie używaj słów „to proste” ani „wystarczy”. Nie używaj żadnych emotikonów ani emoji.',
    'Stosuj polskie nazwy elementów macOS: Biurko (Pulpit), Pobrane, Dokumenty, Finder, Pasek menu, Dock, Ustawienia systemowe (lub Preferencje systemowe na starszym macOS), zrzut ekranu, schowek.',
    'Odpowiedz w formacie JSON z dwoma polami: {"answer": "Krótkie, ciepłe wyjaśnienie (2-3 zdania)", "steps": ["Krok 1...", "Krok 2...", "Krok 3..."]}.',
  ].join(' ');

  const userContext = [
    `Tryb zapytania: ${payload.mode || 'step'}`,
    payload.missionTitle ? `Aktualna misja: ${payload.missionTitle}` : '',
    payload.stepInstruction ? `Aktualny krok misji: ${payload.stepInstruction}` : '',
    payload.stepHint ? `Podpowiedź do kroku: ${payload.stepHint}` : '',
    payload.osVersion ? `Wersja systemu macOS Małgorzaty: ${payload.osVersion}` : '',
    payload.frontmostApp ? `Otwarty teraz program na prawdziwym Macu: ${payload.frontmostApp}` : '',
    `Pytanie lub problem Małgorzaty: ${payload.question}`,
  ]
    .filter(Boolean)
    .join('\n');

  const requestBody = JSON.stringify({
    systemInstruction: {
      parts: [{ text: systemInstruction }],
    },
    contents: [
      {
        role: 'user',
        parts: [{ text: userContext }],
      },
    ],
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 550,
      responseMimeType: 'application/json',
    },
  });

  return new Promise((resolve) => {
    const req = https.request(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(requestBody),
        },
        timeout: 9000,
      },
      (res) => {
        let raw = '';
        res.on('data', (chunk) => {
          raw += chunk.toString();
        });
        res.on('end', () => {
          try {
            if (res.statusCode !== 200) {
              resolve(buildLocalFallbackAnswer(payload));
              return;
            }
            const parsed = JSON.parse(raw);
            const text: string =
              parsed?.candidates?.[0]?.content?.parts?.[0]?.text || '';
            if (!text) {
              resolve(buildLocalFallbackAnswer(payload));
              return;
            }
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              const obj = JSON.parse(jsonMatch[0]) as { answer?: string; steps?: string[] };
              if (obj.answer) {
                resolve({
                  answer: obj.answer,
                  steps: Array.isArray(obj.steps) ? obj.steps.slice(0, 5) : undefined,
                  source: 'gemini',
                });
                return;
              }
            }
            resolve({
              answer: text.trim(),
              source: 'gemini',
            });
          } catch {
            resolve(buildLocalFallbackAnswer(payload));
          }
        });
      }
    );

    req.on('error', () => {
      resolve(buildLocalFallbackAnswer(payload));
    });
    req.on('timeout', () => {
      req.destroy();
      resolve(buildLocalFallbackAnswer(payload));
    });
    req.write(requestBody);
    req.end();
  });
}

/**
 * Buduje kod HTML przezroczystej nakładki ekranowej (Overlay), która zakreśla prawdziwe aplikacje
 * na ekranie Maca i wyświetla obok animowanego czarnego kotka przewodnika („Maksa”) z podpowiedziami.
 */
function buildOverlayHtml(spec: LiveHighlightSpec, screenW: number, screenH: number): string {
  const { rect, label, instruction, hint, shortcutBadge, sideTips } = spec;
  const rx = Math.max(6, Math.min(screenW - 80, rect.x));
  const ry = Math.max(4, Math.min(screenH - 60, rect.y));
  const rw = Math.max(80, Math.min(screenW - rx - 8, rect.width));
  const rh = Math.max(36, Math.min(screenH - ry - 8, rect.height));

  // Wyliczamy pozycję karty Kotka Maksa tak, aby była obok zakreślonego obszaru i nie wchodziła na prawy dok (455 px)
  const maxCardRight = screenW - 470;
  let cardX = rx + rw + 20;
  if (cardX + 356 > maxCardRight) {
    cardX = Math.max(20, Math.min(rx, maxCardRight - 360));
  }
  let cardY = ry + rh + 18;
  if (cardY + 240 > screenH - 40) {
    cardY = Math.max(48, ry - 240);
  }

  const tipsHtml = sideTips
    .map(
      (t) =>
        `<li style="margin-bottom:4px;line-height:1.35;">• ${escapeHtml(t)}</li>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; user-select: none; -webkit-user-select: none; }
  html, body {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    background: transparent;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Plus Jakarta Sans", sans-serif;
    pointer-events: none;
  }
  @keyframes pulseGlow {
    0%, 100% {
      box-shadow: 0 0 0 4px rgba(212, 89, 59, 0.35), 0 0 28px rgba(245, 158, 11, 0.75), inset 0 0 18px rgba(245, 158, 11, 0.28);
      transform: scale(1);
    }
    50% {
      box-shadow: 0 0 0 9px rgba(212, 89, 59, 0.22), 0 0 42px rgba(245, 158, 11, 0.95), inset 0 0 24px rgba(245, 158, 11, 0.4);
      transform: scale(1.006);
    }
  }
  @keyframes maksBlink {
    0%, 92%, 100% { transform: scaleY(1); }
    96% { transform: scaleY(0.12); }
  }
  @keyframes maksFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-3px); }
  }
  .highlight-box {
    position: fixed;
    left: ${rx}px;
    top: ${ry}px;
    width: ${rw}px;
    height: ${rh}px;
    border: 4px solid #F59E0B;
    outline: 3px solid #D4593B;
    border-radius: 18px;
    background: rgba(251, 191, 36, 0.08);
    animation: pulseGlow 1.9s infinite ease-in-out;
  }
  .highlight-label {
    position: absolute;
    top: -38px;
    left: 0;
    background: linear-gradient(135deg, #D4593B, #B45309);
    color: #FFFFFF;
    font-size: 13px;
    font-weight: 800;
    padding: 6px 14px;
    border-radius: 999px;
    white-space: nowrap;
    box-shadow: 0 6px 18px rgba(0,0,0,0.32);
    border: 2px solid #FDE68A;
  }
  .highlight-label-bottom {
    top: auto;
    bottom: -38px;
  }
  .cat-coach-card {
    position: fixed;
    left: ${cardX}px;
    top: ${cardY}px;
    width: 356px;
    background: rgba(24, 22, 20, 0.96);
    color: #FAF7F2;
    border: 2.5px solid #F59E0B;
    border-radius: 22px;
    padding: 14px 16px;
    box-shadow: 0 20px 44px rgba(0, 0, 0, 0.48);
  }
  .cat-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
  }
  .cat-avatar {
    animation: maksFloat 2.8s infinite ease-in-out;
  }
  .cat-eyes {
    transform-origin: 48px 45px;
    animation: maksBlink 4.2s infinite ease-in-out;
  }
  .cat-title {
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #FBBF24;
  }
  .cat-instruction {
    font-size: 14px;
    font-weight: 700;
    line-height: 1.38;
    color: #FFFFFF;
    margin-bottom: 6px;
  }
  .cat-hint {
    font-size: 12.5px;
    line-height: 1.35;
    color: #E2E8F0;
    background: rgba(255,255,255,0.09);
    padding: 7px 10px;
    border-radius: 10px;
    margin-bottom: 8px;
  }
  .shortcut-pill {
    display: inline-block;
    background: #F59E0B;
    color: #111218;
    font-weight: 800;
    font-size: 12px;
    padding: 3px 10px;
    border-radius: 999px;
    margin-top: 3px;
  }
  .side-tips {
    margin: 6px 0 0 0;
    padding-left: 4px;
    list-style: none;
    font-size: 11.5px;
    color: #CBD5E1;
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 7px;
  }
</style>
</head>
<body>
  <div class="highlight-box">
    <div class="highlight-label ${ry < 46 ? 'highlight-label-bottom' : ''}">
      Kot Maks wskazuje: ${escapeHtml(label)}
    </div>
  </div>

  <div class="cat-coach-card">
    <div class="cat-header">
      <svg class="cat-avatar" width="52" height="52" viewBox="0 0 96 96" fill="none">
        <circle cx="48" cy="50" r="40" fill="#D4593B" fill-opacity="0.25" />
        <path d="M22 38L17 14L38 26Z" fill="#1B1C24" stroke="#FBBF24" stroke-width="1.5"/>
        <path d="M74 38L79 14L58 26Z" fill="#1B1C24" stroke="#FBBF24" stroke-width="1.5"/>
        <path d="M25 35L21 19L35 27Z" fill="#F48FB1"/>
        <path d="M71 35L75 19L61 27Z" fill="#F48FB1"/>
        <ellipse cx="48" cy="46" rx="26" ry="22" fill="#1B1C24" stroke="#FBBF24" stroke-width="1.5"/>
        <g class="cat-eyes">
          <circle cx="37" cy="45" r="6.5" fill="#FBBF24"/>
          <circle cx="59" cy="45" r="6.5" fill="#FBBF24"/>
          <circle cx="37" cy="45" r="3.4" fill="#111218"/>
          <circle cx="59" cy="45" r="3.4" fill="#111218"/>
          <circle cx="35" cy="42.5" r="1.6" fill="#FFFFFF"/>
          <circle cx="57" cy="42.5" r="1.6" fill="#FFFFFF"/>
        </g>
        <path d="M45 52H51L48 55Z" fill="#F48FB1"/>
        <path d="M41 56C44 59 47 58 48 55C49 58 52 59 55 56" stroke="#F8BBD0" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M32 66C40 70 56 70 64 66" stroke="#D4593B" stroke-width="4.5" stroke-linecap="round"/>
        <circle cx="48" cy="70" r="4.8" fill="#F6C445"/>
      </svg>
      <div>
        <div class="cat-title">Kotek Maks • Podpowiedź na ekranie</div>
        ${shortcutBadge ? `<span class="shortcut-pill">Skrót: ${escapeHtml(shortcutBadge)}</span>` : ''}
      </div>
    </div>
    <div class="cat-instruction">${escapeHtml(instruction)}</div>
    ${hint ? `<div class="cat-hint">Podpowiedź Maksa: ${escapeHtml(hint)}</div>` : ''}
    <ul class="side-tips">${tipsHtml}</ul>
  </div>
</body>
</html>`;
}

/**
 * Uruchamia lekki lokalny serwer HTTP na 127.0.0.1 serwujący statyczny build `apps/web/out`,
 * przezroczystą nakładkę `/__overlay` oraz endpoint `/__api/ask-maks`.
 */
function startStaticServer(staticRoot: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const reqUrl = (req.url || '/').split('?')[0];

      if (reqUrl === '/__overlay') {
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store',
        });
        res.end(currentOverlayHtml);
        return;
      }

      if (reqUrl === '/__api/ask-maks' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
        req.on('end', async () => {
          try {
            const payload = JSON.parse(body || '{}') as MaksAiPayload;
            const answer = await askGeminiMaks(payload);
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(answer));
          } catch {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(buildLocalFallbackAnswer({ question: '' })));
          }
        });
        return;
      }

      const safeRelPath = path.normalize(reqUrl).replace(/^(\.\.[/\\])+/, '');
      let filePath = path.join(staticRoot, safeRelPath === '/' ? 'index.html' : safeRelPath);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }
      if (!fs.existsSync(filePath)) {
        filePath = path.join(staticRoot, 'index.html');
      }

      try {
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        const content = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(0, '127.0.0.1', () => {
      localServer = server;
      const addr = server.address();
      if (addr && typeof addr === 'object') {
        localServerPort = addr.port;
        resolve(addr.port);
      } else {
        reject(new Error('Nie udało się uruchomić lokalnego serwera UI.'));
      }
    });
  });
}

function resolveStaticWebRoot(): string {
  const packagedPath = path.join(process.resourcesPath || '', 'web-out');
  if (fs.existsSync(packagedPath)) {
    return packagedPath;
  }
  return path.resolve(__dirname, '../../web/out');
}

async function setupIpcAndWindow(): Promise<void> {
  const macAdapter = new MacAdapter({
    readClipboard: () => clipboard.readText(),
    usePolling: true,
  });

  const sqliteStore = new DesktopSqliteProgressStore(app.getPath('userData'));

  const ensureOverlayWindow = (): BrowserWindow => {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.bounds;

    if (!overlayWindow || overlayWindow.isDestroyed()) {
      overlayWindow = new BrowserWindow({
        x: 0,
        y: 0,
        width,
        height,
        transparent: true,
        frame: false,
        hasShadow: false,
        resizable: false,
        movable: false,
        focusable: false,
        skipTaskbar: true,
        alwaysOnTop: true,
        webPreferences: {
          contextIsolation: true,
          nodeIntegration: false,
        },
      });
      overlayWindow.setAlwaysOnTop(true, 'screen-saver');
      overlayWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
      overlayWindow.setIgnoreMouseEvents(true, { forward: true });
    }
    return overlayWindow;
  };

  const refreshOverlayContent = async (): Promise<string> => {
    if (!currentCoachPayload) return 'Finder';
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.bounds;
    const spec = await macAdapter.computeLiveHighlight(
      currentCoachPayload.scene,
      currentCoachPayload.instruction,
      currentCoachPayload.hint,
      { width, height }
    );
    currentOverlayHtml = buildOverlayHtml(spec, width, height);
    const win = ensureOverlayWindow();
    if (localServerPort > 0) {
      await win.loadURL(`http://127.0.0.1:${localServerPort}/__overlay?t=${Date.now()}`);
    } else {
      await win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(currentOverlayHtml)}`);
    }
    if (!win.isVisible()) {
      win.showInactive();
    }
    return spec.targetApp;
  };

  ipcMain.handle('macknow:frontmostApp', () => macAdapter.frontmostApp());
  ipcMain.handle('macknow:clipboardText', () => macAdapter.clipboardText());
  ipcMain.handle('macknow:safariUrl', () => macAdapter.safariUrl());
  ipcMain.handle('macknow:openApp', (_e, name: string) => macAdapter.openApp(name));
  ipcMain.handle('macknow:osVersion', () => macAdapter.osVersion());
  ipcMain.handle('macknow:loadProgress', () => sqliteStore.loadProgress());
  ipcMain.handle('macknow:saveProgress', (_e, json: string) => sqliteStore.saveProgress(json));
  ipcMain.handle('macknow:askMaksAi', (_e, payload: MaksAiPayload) => askGeminiMaks(payload));

  // Uruchamia tryb zakreślania na żywo na prawdziwych aplikacjach Maca
  ipcMain.handle(
    'macknow:startLiveCoach',
    async (
      _e,
      payload: { scene: string; instruction: string; hint: string; openTarget?: boolean }
    ) => {
      currentCoachPayload = {
        scene: payload.scene,
        instruction: payload.instruction,
        hint: payload.hint || '',
      };

      // Dokujemy okno MacKnow z prawej strony ekranu (460 px szerokości, zawsze na wierzchu),
      // aby odsłonić prawdziwe programy Maca po lewej stronie ekranu.
      if (mainWindow && !mainWindow.isDestroyed()) {
        const workArea = screen.getPrimaryDisplay().workArea;
        const dockW = 460;
        const dockH = Math.min(880, workArea.height - 20);
        mainWindow.setAlwaysOnTop(true, 'floating');
        mainWindow.setBounds({
          x: workArea.x + workArea.width - dockW - 10,
          y: workArea.y + 10,
          width: dockW,
          height: dockH,
        });
      }

      let openedTarget = '';
      if (payload.openTarget !== false) {
        openedTarget = await macAdapter.openStepTargetOnMac(payload.scene);
      }

      // Dajemy ułamek sekundy na otwarcie okna aplikacji docelowej i rysujemy zakreślenie na żywo
      await new Promise((r) => setTimeout(r, 380));
      const targetApp = await refreshOverlayContent();

      if (liveCoachTimer) clearInterval(liveCoachTimer);
      liveCoachTimer = setInterval(() => {
        refreshOverlayContent().catch(() => {});
      }, 2200);

      return { active: true, openedTarget: openedTarget || targetApp, targetApp };
    }
  );

  ipcMain.handle(
    'macknow:updateLiveCoachStep',
    async (_e, payload: { scene: string; instruction: string; hint: string; openTarget?: boolean }) => {
      currentCoachPayload = {
        scene: payload.scene,
        instruction: payload.instruction,
        hint: payload.hint || '',
      };
      let openedTarget = '';
      if (payload.openTarget) {
        openedTarget = await macAdapter.openStepTargetOnMac(payload.scene);
        await new Promise((r) => setTimeout(r, 320));
      }
      const targetApp = await refreshOverlayContent();
      return { active: true, openedTarget: openedTarget || targetApp, targetApp };
    }
  );

  ipcMain.handle('macknow:stopLiveCoach', async () => {
    currentCoachPayload = null;
    if (liveCoachTimer) {
      clearInterval(liveCoachTimer);
      liveCoachTimer = null;
    }
    if (overlayWindow && !overlayWindow.isDestroyed()) {
      overlayWindow.hide();
    }
    if (mainWindow && !mainWindow.isDestroyed()) {
      const workArea = screen.getPrimaryDisplay().workArea;
      const winWidth = Math.min(1240, workArea.width - 48);
      const winHeight = Math.min(860, workArea.height - 40);
      mainWindow.setAlwaysOnTop(false);
      mainWindow.setBounds({
        x: workArea.x + Math.max(16, Math.floor((workArea.width - winWidth) / 2)),
        y: workArea.y + Math.max(16, Math.floor((workArea.height - winHeight) / 2)),
        width: winWidth,
        height: winHeight,
      });
    }
    return { active: false };
  });

  ipcMain.handle('macknow:checkPermissions', async () => {
    const frontApp = await macAdapter.frontmostApp();
    const accessibility = frontApp !== null;
    let fullDiskAccess = true;
    try {
      fs.readdirSync(path.join(os.homedir(), 'Desktop'));
    } catch {
      fullDiskAccess = false;
    }
    return { accessibility, fullDiskAccess };
  });

  ipcMain.handle('macknow:openPrivacySettings', async (_e, osVersion: string | null) => {
    const ver = osVersion || (await macAdapter.osVersion());
    if (ver && matchesOsRange(ver, '<13')) {
      await macAdapter.openApp('System Preferences');
    } else {
      await macAdapter.openApp('System Settings');
    }
  });

  ipcMain.on('macknow:startWatch', (event, folderPath: string) => {
    if (activeWatchers.has(folderPath)) {
      activeWatchers.get(folderPath)!();
    }
    const stop = macAdapter.watchFolder(folderPath, (fileEvent) => {
      if (!event.sender.isDestroyed()) {
        event.sender.send(`macknow:fileEvent:${folderPath}`, fileEvent);
      }
    });
    activeWatchers.set(folderPath, stop);
  });

  ipcMain.on('macknow:stopWatch', (_event, folderPath: string) => {
    if (activeWatchers.has(folderPath)) {
      activeWatchers.get(folderPath)!();
      activeWatchers.delete(folderPath);
    }
  });

  const primaryDisplay = screen.getPrimaryDisplay();
  const workArea = primaryDisplay.workArea;
  const winWidth = Math.min(1240, workArea.width - 48);
  const winHeight = Math.min(860, workArea.height - 40);
  const winX = workArea.x + Math.max(16, Math.floor((workArea.width - winWidth) / 2));
  const winY = workArea.y + Math.max(16, Math.floor((workArea.height - winHeight) / 2));

  mainWindow = new BrowserWindow({
    width: winWidth,
    height: winHeight,
    x: winX,
    y: winY,
    minWidth: 380,
    minHeight: 540,
    title: 'MacKnow – Przewodnik Małgorzaty',
    backgroundColor: '#FAF6F0',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false,
    },
  });

  const webRoot = resolveStaticWebRoot();
  const port = await startStaticServer(webRoot);
  await mainWindow.loadURL(`http://127.0.0.1:${port}/`);
}

if (app) {
  app.whenReady().then(setupIpcAndWindow);

  app.on('window-all-closed', () => {
    if (liveCoachTimer) {
      clearInterval(liveCoachTimer);
      liveCoachTimer = null;
    }
    for (const stop of activeWatchers.values()) {
      stop();
    }
    activeWatchers.clear();
    if (localServer) {
      localServer.close();
    }
    app.quit();
  });
}
