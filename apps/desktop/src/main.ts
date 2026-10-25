import { app, BrowserWindow, clipboard, ipcMain, screen } from 'electron';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { MacAdapter } from './mac-adapter';
import { DesktopSqliteProgressStore } from './sqlite-store';
import { matchesOsRange } from '@macknow/core';

let mainWindow: BrowserWindow | null = null;
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

/**
 * Uruchamia lekki lokalny serwer HTTP na 127.0.0.1 serwujący statyczny build `apps/web/out`.
 * Pozwala utrzymać zużycie RAM poniżej 150 MB nawet na 4 GB RAM i macOS 10.13 High Sierra.
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

  ipcMain.handle('macknow:frontmostApp', () => macAdapter.frontmostApp());
  ipcMain.handle('macknow:clipboardText', () => macAdapter.clipboardText());
  ipcMain.handle('macknow:safariUrl', () => macAdapter.safariUrl());
  ipcMain.handle('macknow:openApp', (_e, name: string) => macAdapter.openApp(name));
  ipcMain.handle('macknow:osVersion', () => macAdapter.osVersion());
  ipcMain.handle('macknow:loadProgress', () => sqliteStore.loadProgress());
  ipcMain.handle('macknow:saveProgress', (_e, json: string) => sqliteStore.saveProgress(json));

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

  // Dokujemy małe okno z prawej strony ekranu, zawsze na wierzchu (alwaysOnTop),
  // aby nie zasłaniało programu, na którym ćwiczy Małgorzata.
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
