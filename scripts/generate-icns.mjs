import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

/**
 * Generuje deterministyczny obraz PNG (RGBA) ikony MacKnow (zaokrąglony kwadrat w kolorze terakoty #C85A32
 * z kremowym znakiem kompasu/M #FAF7F2) w dowolnym rozmiarze, a następnie buduje wielorozmiarowy plik
 * `MacKnow.icns` przy użyciu systemowego `iconutil` na macOS (oraz kopiuje do `apps/desktop/build/icon.icns`).
 */

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) {
    c = (c >>> 8) ^ CRC_TABLE[(c ^ buf[i]) & 0xff];
  }
  return (c ^ -1) >>> 0;
}

const CRC_TABLE = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  CRC_TABLE[n] = c >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  const combined = Buffer.concat([typeBuf, data]);
  crcBuf.writeUInt32BE(crc32(combined), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function pointToSegmentDist(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const l2 = dx * dx + dy * dy;
  if (l2 === 0) return Math.hypot(px - x1, py - y1);
  let t = ((px - x1) * dx + (py - y1) * dy) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

function renderIconPng(size) {
  const raw = Buffer.alloc(size * (size * 4 + 1));
  const scale = size / 512;

  for (let y = 0; y < size; y++) {
    const rowStart = y * (size * 4 + 1);
    raw[rowStart] = 0; // filter type 0

    const ny = (y + 0.5) / scale;
    for (let x = 0; x < size; x++) {
      const nx = (x + 0.5) / scale;
      const idx = rowStart + 1 + x * 4;

      // Zaokrąglony kwadrat: [32..480] z promieniem 108
      const cx = Math.max(140, Math.min(372, nx));
      const cy = Math.max(140, Math.min(372, ny));
      const distCorner = Math.hypot(nx - cx, ny - cy);
      const insideBg = nx >= 32 && nx <= 480 && ny >= 32 && ny <= 480 && distCorner <= 108;

      if (!insideBg) {
        raw[idx] = 0;
        raw[idx + 1] = 0;
        raw[idx + 2] = 0;
        raw[idx + 3] = 0;
        continue;
      }

      // Kolor bazowy terakoty: #C85A32 (200, 90, 50)
      let r = 200;
      let g = 90;
      let b = 50;

      // Sygnet M + kompas w kolorze #FAF7F2 (250, 247, 242)
      const strokeRadius = 21;
      const d1 = pointToSegmentDist(nx, ny, 148, 350, 148, 168);
      const d2 = pointToSegmentDist(nx, ny, 148, 168, 256, 252);
      const d3 = pointToSegmentDist(nx, ny, 256, 252, 364, 168);
      const d4 = pointToSegmentDist(nx, ny, 364, 168, 364, 350);
      const dDot = Math.hypot(nx - 256, ny - 338);

      const minStroke = Math.min(d1, d2, d3, d4);
      if (minStroke <= strokeRadius || dDot <= 26) {
        r = 250;
        g = 247;
        b = 242;
      }

      raw[idx] = r;
      raw[idx + 1] = g;
      raw[idx + 2] = b;
      raw[idx + 3] = 255;
    }
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const idat = zlib.deflateSync(raw);
  return Buffer.concat([
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', idat),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);
}

const brandDir = path.join(rootDir, 'packages', 'ui', 'brand');
const iconsetDir = path.join(brandDir, 'MacKnow.iconset');
fs.mkdirSync(iconsetDir, { recursive: true });

const iconSizes = [
  { name: 'icon_16x16.png', size: 16 },
  { name: 'icon_16x16@2x.png', size: 32 },
  { name: 'icon_32x32.png', size: 32 },
  { name: 'icon_32x32@2x.png', size: 64 },
  { name: 'icon_128x128.png', size: 128 },
  { name: 'icon_128x128@2x.png', size: 256 },
  { name: 'icon_256x256.png', size: 256 },
  { name: 'icon_256x256@2x.png', size: 512 },
  { name: 'icon_512x512.png', size: 512 },
  { name: 'icon_512x512@2x.png', size: 1024 },
];

for (const entry of iconSizes) {
  const png = renderIconPng(entry.size);
  fs.writeFileSync(path.join(iconsetDir, entry.name), png);
}

const icnsOut = path.join(brandDir, 'MacKnow.icns');
try {
  execSync(`iconutil -c icns "${iconsetDir}" -o "${icnsOut}"`);
} catch {
  // Fallback: budujemy poprawny kontener ICNS bezpośrednio z PNG (ic07, ic08, ic09, ic10)
  const types = [
    { ostype: 'ic04', size: 16 },
    { ostype: 'ic05', size: 32 },
    { ostype: 'ic07', size: 128 },
    { ostype: 'ic08', size: 256 },
    { ostype: 'ic09', size: 512 },
    { ostype: 'ic10', size: 1024 },
  ];
  const blocks = [];
  for (const t of types) {
    const pngData = renderIconPng(t.size);
    const blockHeader = Buffer.alloc(8);
    blockHeader.write(t.ostype, 0, 4, 'ascii');
    blockHeader.writeUInt32BE(pngData.length + 8, 4);
    blocks.push(Buffer.concat([blockHeader, pngData]));
  }
  const body = Buffer.concat(blocks);
  const header = Buffer.alloc(8);
  header.write('icns', 0, 4, 'ascii');
  header.writeUInt32BE(body.length + 8, 4);
  fs.writeFileSync(icnsOut, Buffer.concat([header, body]));
}

// Kopiujemy również do apps/desktop/build/icon.icns dla electron-builder
const desktopBuildDir = path.join(rootDir, 'apps', 'desktop', 'build');
fs.mkdirSync(desktopBuildDir, { recursive: true });
fs.copyFileSync(icnsOut, path.join(desktopBuildDir, 'icon.icns'));
fs.copyFileSync(path.join(iconsetDir, 'icon_512x512.png'), path.join(desktopBuildDir, 'icon.png'));

// Usuwamy tymczasowy katalog .iconset, zostawiając czysty plik MacKnow.icns
fs.rmSync(iconsetDir, { recursive: true, force: true });
console.log('Wygenerowano MacKnow.icns oraz apps/desktop/build/icon.icns.');
