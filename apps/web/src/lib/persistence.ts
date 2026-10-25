import {
  Capability,
  DEFAULT_USER_PROGRESS,
  EnvironmentAdapter,
  FileEvent,
  importProgressFromJson,
  SimulatorAdapter,
  UserProgressState,
} from '@macknow/core';

/**
 * Globalny interfejs mostu Electrona (wstrzykiwany przez preload.js w apps/desktop).
 */
export interface ElectronMacKnowBridge {
  isElectron: boolean;
  frontmostApp(): Promise<string | null>;
  clipboardText(): Promise<string | null>;
  safariUrl(): Promise<string | null>;
  openApp(name: string): Promise<void>;
  osVersion(): Promise<string | null>;
  isAvailable(capability: Capability): boolean;
  watchFolder(path: string, cb: (file: FileEvent) => void): () => void;
  loadProgress(): Promise<string | null>;
  saveProgress(json: string): Promise<void>;
  checkPermissions(): Promise<{ accessibility: boolean; fullDiskAccess: boolean }>;
  openPrivacySettings(osVersion: string | null): Promise<void>;
}

declare global {
  interface Window {
    macknowDesktop?: ElectronMacKnowBridge;
  }
}

const IDB_NAME = 'macknow_db';
const IDB_STORE = 'progress_store';
const IDB_KEY = 'malgorzata_progress';
const LS_FALLBACK_KEY = 'macknow_progress_v1';

function openIndexedDb(): Promise<IDBDatabase | null> {
  if (typeof window === 'undefined' || !window.indexedDB) {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    try {
      const req = window.indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

/**
 * Odczytuje stan postępu z bazy SQLite (w Electronie) lub z IndexedDB / localStorage (w przeglądarce).
 */
export async function loadPersistedProgress(): Promise<UserProgressState> {
  if (typeof window === 'undefined') {
    return DEFAULT_USER_PROGRESS;
  }

  try {
    if (window.macknowDesktop) {
      const desktopRaw = await window.macknowDesktop.loadProgress();
      if (desktopRaw) {
        return importProgressFromJson(desktopRaw);
      }
    }
  } catch {
    // Kontynuujemy do IndexedDB/localStorage
  }

  try {
    const db = await openIndexedDb();
    if (db) {
      const fromIdb = await new Promise<string | null>((resolve) => {
        const tx = db.transaction(IDB_STORE, 'readonly');
        const store = tx.objectStore(IDB_STORE);
        const getReq = store.get(IDB_KEY);
        getReq.onsuccess = () => resolve((getReq.result as string) || null);
        getReq.onerror = () => resolve(null);
      });
      if (fromIdb) {
        return importProgressFromJson(fromIdb);
      }
    }
  } catch {
    // Fallback do localStorage
  }

  try {
    const fromLs = window.localStorage.getItem(LS_FALLBACK_KEY);
    if (fromLs) {
      return importProgressFromJson(fromLs);
    }
  } catch {
    // Zwracamy czystą domyślną strukturę
  }

  return DEFAULT_USER_PROGRESS;
}

/**
 * Zapisuje stan postępu w SQLite (w Electronie) oraz w IndexedDB i localStorage (w przeglądarce).
 */
export async function savePersistedProgress(state: UserProgressState): Promise<void> {
  if (typeof window === 'undefined') {
    return;
  }
  const serialized = JSON.stringify(state);

  try {
    window.localStorage.setItem(LS_FALLBACK_KEY, serialized);
  } catch {
    // Ignorujemy błąd przepełnienia
  }

  try {
    if (window.macknowDesktop) {
      await window.macknowDesktop.saveProgress(serialized);
    }
  } catch {
    // Ignorujemy
  }

  try {
    const db = await openIndexedDb();
    if (db) {
      await new Promise<void>((resolve) => {
        const tx = db.transaction(IDB_STORE, 'readwrite');
        const store = tx.objectStore(IDB_STORE);
        store.put(serialized, IDB_KEY);
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      });
    }
  } catch {
    // Ignorujemy
  }
}

/**
 * Tworzy właściwy adapter środowiska: MacAdapter (przez most Electrona) lub SimulatorAdapter (w przeglądarce).
 */
export function createRuntimeAdapter(): EnvironmentAdapter {
  if (typeof window !== 'undefined' && window.macknowDesktop) {
    const bridge = window.macknowDesktop;
    return {
      frontmostApp: () => bridge.frontmostApp(),
      watchFolder: (folderPath, cb) => bridge.watchFolder(folderPath, cb),
      clipboardText: () => bridge.clipboardText(),
      safariUrl: () => bridge.safariUrl(),
      openApp: (name) => bridge.openApp(name),
      isAvailable: (cap) => bridge.isAvailable(cap),
      osVersion: () => bridge.osVersion(),
    };
  }
  return new SimulatorAdapter(null);
}
