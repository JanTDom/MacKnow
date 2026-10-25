import { app, BrowserWindow, clipboard, ipcMain, screen } from 'electron';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { LiveHighlightSpec, MacAdapter } from './mac-adapter';
import { DesktopSqliteProgressStore } from './sqlite-store';
import { matchesOsRange } from '@macknow/core';

let mainWindow: BrowserWindow | null = null;
let overlayWindow: BrowserWindow | null = null;
let liveCoachTimer: ReturnType<typeof setInterval> | null = null;
let currentCoachPayload: { scene: string; instruction: string; hint: string } | null = null;
let localServer: http.Server | null = null;
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

/**
 * Buduje kod HTML przezroczystej nakładki ekranowej (Overlay), która zakreśla prawdziwe aplikacje
 * na ekranie Maca i wyświetla obok sympatycznego czarnego kotka przewodnika („Mruczka”) z podpowiedziami.
 */
function buildOverlayHtml(spec: LiveHighlightSpec, screenW: number, screenH: number): string {
  const { rect, label, instruction, hint, shortcutBadge, sideTips } = spec;
  const rx = Math.max(6, Math.min(screenW - 80, rect.x));
  const ry = Math.max(4, Math.min(screenH - 60, rect.y));
  const rw = Math.max(80, Math.min(screenW - rx - 8, rect.width));
  const rh = Math.max(36, Math.min(screenH - ry - 8, rect.height));

  // Wyliczamy pozycję karty Czarnego Kotka tak, aby była obok zakreślonego obszaru i nie wchodziła na prawy dok (450 px)
  const maxCardRight = screenW - 470;
  let cardX = rx + rw + 20;
  if (cardX + 340 > maxCardRight) {
    cardX = Math.max(20, Math.min(rx, maxCardRight - 350));
  }
  let cardY = ry + rh + 18;
  if (cardY + 230 > screenH - 40) {
    cardY = Math.max(48, ry - 230);
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
  .highlight-box {
    position: fixed;
    left: ${rx}px;
    top: ${ry}px;
    width: ${rw}px;
    height: ${rh}px;
    border: 4px solid #F59E0B;
    outline: 3px solid #D4593B;
    border-radius: 16px;
    background: rgba(251, 191, 36, 0.07);
    animation: pulseGlow 1.9s infinite ease-in-out;
  }
  .highlight-label {
    position: absolute;
    top: -36px;
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
    bottom: -36px;
  }
  .cat-coach-card {
    position: fixed;
    left: ${cardX}px;
    top: ${cardY}px;
    width: 348px;
    background: rgba(25, 26, 35, 0.95);
    color: #FAF7F2;
    border: 2.5px solid #F59E0B;
    border-radius: 20px;
    padding: 14px 16px;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
  }
  .cat-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
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
    background: rgba(255,255,255,0.08);
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
    <div class="highlight-label ${ry < 44 ? 'highlight-label-bottom' : ''}">
      Mruczek wskazuje: ${escapeHtml(label)}
    </div>
  </div>

  <div class="cat-coach-card">
    <div class="cat-header">
      <svg width="48" height="48" viewBox="0 0 96 96" fill="none">
        <circle cx="48" cy="50" r="40" fill="#D4593B" fill-opacity="0.25" />
        <path d="M22 38L17 14L38 26Z" fill="#1B1C24" stroke="#FBBF24" stroke-width="1.5"/>
        <path d="M74 38L79 14L58 26Z" fill="#1B1C24" stroke="#FBBF24" stroke-width="1.5"/>
        <path d="M25 35L21 19L35 27Z" fill="#F48FB1"/>
        <path d="M71 35L75 19L61 27Z" fill="#F48FB1"/>
        <ellipse cx="48" cy="46" rx="26" ry="22" fill="#1B1C24" stroke="#FBBF24" stroke-width="1.5"/>
        <circle cx="37" cy="45" r="6.5" fill="#FBBF24"/>
        <circle cx="59" cy="45" r="6.5" fill="#FBBF24"/>
        <circle cx="37" cy="45" r="3.4" fill="#111218"/>
        <circle cx="59" cy="45" r="3.4" fill="#111218"/>
        <circle cx="35" cy="42.5" r="1.6" fill="#FFFFFF"/>
        <circle cx="57" cy="42.5" r="1.6" fill="#FFFFFF"/>
        <path d="M45 52H51L48 55Z" fill="#F48FB1"/>
        <path d="M41 56C44 59 47 58 48 55C49 58 52 59 55 56" stroke="#F8BBD0" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M32 66C40 70 56 70 64 66" stroke="#D4593B" stroke-width="4.5" stroke-linecap="round"/>
        <circle cx="48" cy="70" r="4.5" fill="#F6C445"/>
      </svg>
      <div>
        <div class="cat-title">Czarny Kotek Mruczek • Na żywo</div>
        ${shortcutBadge ? `<span class="shortcut-pill">Skrót: ${escapeHtml(shortcutBadge)}</span>` : ''}
      </div>
    </div>
    <div class="cat-instruction">${escapeHtml(instruction)}</div>
    ${hint ? `<div class="cat-hint">Podpowiedź: ${escapeHtml(hint)}</div>` : ''}
    <ul class="side-tips">${tipsHtml}</ul>
  </div>
</body>
</html>`;
}

/**
 * Uruchamia lekki lokalny serwer HTTP na 127.0.0.1 serwujący statyczny build `apps/web/out`.
 */
function startStaticServer(staticRoot: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const reqUrl = (req.url || '/').split('?')[0];
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

  const refreshOverlayContent = async () => {
    if (!currentCoachPayload) return;
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.bounds;
    const spec = await macAdapter.computeLiveHighlight(
      currentCoachPayload.scene,
      currentCoachPayload.instruction,
      currentCoachPayload.hint,
      { width, height }
    );
    const win = ensureOverlayWindow();
    const html = buildOverlayHtml(spec, width, height);
    await win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
    if (!win.isVisible()) {
      win.showInactive();
    }
  };

  ipcMain.handle('macknow:frontmostApp', () => macAdapter.frontmostApp());
  ipcMain.handle('macknow:clipboardText', () => macAdapter.clipboardText());
  ipcMain.handle('macknow:safariUrl', () => macAdapter.safariUrl());
  ipcMain.handle('macknow:openApp', (_e, name: string) => macAdapter.openApp(name));
  ipcMain.handle('macknow:osVersion', () => macAdapter.osVersion());
  ipcMain.handle('macknow:loadProgress', () => sqliteStore.loadProgress());
  ipcMain.handle('macknow:saveProgress', (_e, json: string) => sqliteStore.saveProgress(json));

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

      // Dokujemy okno MacKnow z prawej strony ekranu (440 px szerokości, zawsze na wierzchu),
      // aby odsłonić prawdziwe programy Maca po lewej stronie ekranu.
      if (mainWindow && !mainWindow.isDestroyed()) {
        const workArea = screen.getPrimaryDisplay().workArea;
        const dockW = 445;
        const dockH = Math.min(860, workArea.height - 24);
        mainWindow.setAlwaysOnTop(true, 'floating');
        mainWindow.setBounds({
          x: workArea.x + workArea.width - dockW - 12,
          y: workArea.y + 12,
          width: dockW,
          height: dockH,
        });
      }

      let openedTarget = '';
      if (payload.openTarget !== false) {
        openedTarget = await macAdapter.openStepTargetOnMac(payload.scene);
      }

      // Dajemy ułamek sekundy na otwarcie okna aplikacji docelowej i rysujemy zakreślenie na żywo
      await new Promise((r) => setTimeout(r, 350));
      await refreshOverlayContent();

      if (liveCoachTimer) clearInterval(liveCoachTimer);
      liveCoachTimer = setInterval(() => {
        refreshOverlayContent().catch(() => {});
      }, 2200);

      return { active: true, openedTarget };
    }
  );

  ipcMain.handle(
    'macknow:updateLiveCoachStep',
    async (_e, payload: { scene: string; instruction: string; hint: string; openTarget?: boolean }) => {
      if (!currentCoachPayload) return { active: false };
      currentCoachPayload = {
        scene: payload.scene,
        instruction: payload.instruction,
        hint: payload.hint || '',
      };
      if (payload.openTarget) {
        await macAdapter.openStepTargetOnMac(payload.scene);
        await new Promise((r) => setTimeout(r, 300));
      }
      await refreshOverlayContent();
      return { active: true };
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
      const winWidth = Math.min(1220, workArea.width - 48);
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
  const winWidth = Math.min(1220, workArea.width - 48);
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
    backgroundColor: '#FAF7F2',
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
