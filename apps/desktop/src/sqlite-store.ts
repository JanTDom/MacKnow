import fs from 'node:fs';
import path from 'node:path';
import initSqlJs, { Database } from 'sql.js';

/**
 * Lokalna baza danych SQLite (przez sql.js) zapisywana na dysku w katalogu danych aplikacji Electron.
 * Zapewnia 100% kompatybilność na procesorach Intel (x64, od macOS 10.13 High Sierra) oraz Apple Silicon (arm64)
 * bez ryzyka błędów kompilacji natywnej node-gyp, z dodatkowym lustrzanym zapisem JSON.
 */
export class DesktopSqliteProgressStore {
  private dbPath: string;
  private jsonBackupPath: string;
  private db: Database | null = null;

  constructor(storageDir: string) {
    fs.mkdirSync(storageDir, { recursive: true });
    this.dbPath = path.join(storageDir, 'macknow-progress.sqlite');
    this.jsonBackupPath = path.join(storageDir, 'macknow-progress.json');
  }

  private async ensureDb(): Promise<Database | null> {
    if (this.db) {
      return this.db;
    }
    try {
      const SQL = await initSqlJs();
      if (fs.existsSync(this.dbPath)) {
        const fileBuffer = fs.readFileSync(this.dbPath);
        this.db = new SQL.Database(fileBuffer);
      } else {
        this.db = new SQL.Database();
      }
      this.db.run(
        'CREATE TABLE IF NOT EXISTS user_progress (id TEXT PRIMARY KEY, payload TEXT NOT NULL, updated_at TEXT NOT NULL);'
      );
      return this.db;
    } catch {
      return null;
    }
  }

  async loadProgress(): Promise<string | null> {
    const db = await this.ensureDb();
    if (db) {
      try {
        const res = db.exec("SELECT payload FROM user_progress WHERE id = 'malgorzata' LIMIT 1;");
        if (res.length > 0 && res[0].values.length > 0) {
          const val = res[0].values[0][0];
          if (typeof val === 'string') {
            return val;
          }
        }
      } catch {
        // Przechodzimy do pliku JSON backup
      }
    }

    if (fs.existsSync(this.jsonBackupPath)) {
      try {
        return fs.readFileSync(this.jsonBackupPath, 'utf8');
      } catch {
        return null;
      }
    }
    return null;
  }

  async saveProgress(jsonPayload: string): Promise<void> {
    // 1. Zapisujemy w bazie SQLite
    const db = await this.ensureDb();
    if (db) {
      try {
        const now = new Date().toISOString();
        db.run(
          "INSERT OR REPLACE INTO user_progress (id, payload, updated_at) VALUES ('malgorzata', ?, ?);",
          [jsonPayload, now]
        );
        const binary = db.export();
        fs.writeFileSync(this.dbPath, Buffer.from(binary));
      } catch {
        // Kontynuujemy do kopii JSON
      }
    }

    // 2. Zapisujemy lustrzany plik JSON
    try {
      fs.writeFileSync(this.jsonBackupPath, jsonPayload, 'utf8');
    } catch {
      // Ignorujemy
    }
  }
}
