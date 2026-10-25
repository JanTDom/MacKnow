import { contextBridge, ipcRenderer } from 'electron';

export interface FileEventPayload {
  path: string;
  filename: string;
  folder: string;
  timestamp: number;
}

contextBridge.exposeInMainWorld('macknowDesktop', {
  isElectron: true,
  frontmostApp: (): Promise<string | null> => ipcRenderer.invoke('macknow:frontmostApp'),
  clipboardText: (): Promise<string | null> => ipcRenderer.invoke('macknow:clipboardText'),
  safariUrl: (): Promise<string | null> => ipcRenderer.invoke('macknow:safariUrl'),
  openApp: (name: string): Promise<void> => ipcRenderer.invoke('macknow:openApp', name),
  osVersion: (): Promise<string | null> => ipcRenderer.invoke('macknow:osVersion'),
  isAvailable: (_capability: string): boolean => true,
  watchFolder: (folderPath: string, cb: (file: FileEventPayload) => void): (() => void) => {
    const channel = `macknow:fileEvent:${folderPath}`;
    const listener = (_event: unknown, payload: FileEventPayload) => {
      cb(payload);
    };
    ipcRenderer.on(channel, listener);
    ipcRenderer.send('macknow:startWatch', folderPath);
    return () => {
      ipcRenderer.removeListener(channel, listener);
      ipcRenderer.send('macknow:stopWatch', folderPath);
    };
  },
  loadProgress: (): Promise<string | null> => ipcRenderer.invoke('macknow:loadProgress'),
  saveProgress: (json: string): Promise<void> => ipcRenderer.invoke('macknow:saveProgress', json),
  checkPermissions: (): Promise<{ accessibility: boolean; fullDiskAccess: boolean }> =>
    ipcRenderer.invoke('macknow:checkPermissions'),
  openPrivacySettings: (osVersion: string | null): Promise<void> =>
    ipcRenderer.invoke('macknow:openPrivacySettings', osVersion),
});
