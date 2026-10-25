import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const desktopRoot = path.resolve(__dirname, '..');
const distDir = path.join(desktopRoot, 'dist');
const require = createRequire(import.meta.url);

fs.mkdirSync(distDir, { recursive: true });

// 1. Bundle main.ts and preload.ts with all runtime dependencies (chokidar, readdirp, sql.js, @macknow/*)
// embedded directly into dist/main.js and dist/preload.js so app.asar never misses a transitive pnpm module.
await esbuild.build({
  entryPoints: [
    path.join(desktopRoot, 'src', 'main.ts'),
    path.join(desktopRoot, 'src', 'preload.ts'),
  ],
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'cjs',
  outdir: distDir,
  external: ['electron', 'fsevents'],
  sourcemap: false,
  logLevel: 'info',
});

// 2. Copy sql-wasm.wasm alongside dist/main.js so sql.js loads it from __dirname inside app.asar
const wasmSrc = require.resolve('sql.js/dist/sql-wasm.wasm');
const wasmDest = path.join(distDir, 'sql-wasm.wasm');
fs.copyFileSync(wasmSrc, wasmDest);

console.log('[desktop:bundle] Zbudowano samodzielne pakiety dist/main.js, dist/preload.js oraz dist/sql-wasm.wasm');
