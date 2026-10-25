export type Capability =
  | 'frontmostApp'
  | 'watchFolder'
  | 'clipboardText'
  | 'safariUrl'
  | 'openApp'
  | 'realMac';

export interface FileEvent {
  path: string;
  filename: string;
  folder: string;
  timestamp: number;
}

export interface EnvironmentAdapter {
  frontmostApp(): Promise<string | null>;
  watchFolder(path: string, cb: (file: FileEvent) => void): () => void;
  clipboardText(): Promise<string | null>;
  safariUrl(): Promise<string | null>;
  openApp(name: string): Promise<void>;
  isAvailable(capability: Capability): boolean;
  osVersion(): Promise<string | null>;
}

/**
 * Adapter używany w przeglądarce (apps/web) w trybie symulatora.
 * Zgodnie ze specyfikacją zwraca null dla osVersion() (chyba że nadpisano ręcznie w ustawieniach)
 * i degraduje weryfikacje systemowe do manual/simulatorAction.
 */
export class SimulatorAdapter implements EnvironmentAdapter {
  private simulatedOsVersion: string | null;

  constructor(simulatedOsVersion: string | null = null) {
    this.simulatedOsVersion = simulatedOsVersion;
  }

  setSimulatedOsVersion(version: string | null): void {
    this.simulatedOsVersion = version;
  }

  async frontmostApp(): Promise<string | null> {
    return null;
  }

  watchFolder(_path: string, _cb: (file: FileEvent) => void): () => void {
    return () => {};
  }

  async clipboardText(): Promise<string | null> {
    return null;
  }

  async safariUrl(): Promise<string | null> {
    return null;
  }

  async openApp(_name: string): Promise<void> {
    // W symulatorze otwieranie obsługuje stan sceny symulatora
  }

  isAvailable(_capability: Capability): boolean {
    return false;
  }

  async osVersion(): Promise<string | null> {
    return this.simulatedOsVersion;
  }
}
