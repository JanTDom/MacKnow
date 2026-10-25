import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const fontsDir = path.join(rootDir, 'apps', 'web', 'public', 'fonts');

fs.mkdirSync(fontsDir, { recursive: true });

/**
 * Pobiera i zapisuje lokalnie (do użytku 100% offline) pliki czcionek Google Fonts (licencja SIL Open Font License):
 * - Fraunces (700, 600, latin-ext + latin – pełne polskie znaki: ą, ć, ę, ł, ń, ó, ś, ź, ż)
 * - Plus Jakarta Sans (400, 500, 600, 700, latin-ext + latin – pełne polskie znaki)
 */

function fetchBuffer(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(fetchBuffer(res.headers.location, headers));
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      })
      .on('error', reject);
  });
}

async function downloadGoogleFontCssAndWoff2(familyQuery, prefix) {
  const ua =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15';
  const cssUrl = `https://fonts.googleapis.com/css2?family=${familyQuery}&subset=latin,latin-ext&display=swap`;
  const cssBuf = await fetchBuffer(cssUrl, { 'User-Agent': ua });
  let css = cssBuf.toString('utf8');

  const urlRegex = /url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/g;
  let match;
  let index = 0;
  const replacements = [];

  while ((match = urlRegex.exec(css)) !== null) {
    const remoteUrl = match[1];
    index++;
    const fileName = `${prefix}-${index}.woff2`;
    const filePath = path.join(fontsDir, fileName);
    const fontData = await fetchBuffer(remoteUrl);
    fs.writeFileSync(filePath, fontData);
    replacements.push({ remoteUrl, localUrl: `/fonts/${fileName}` });
  }

  for (const r of replacements) {
    css = css.split(r.remoteUrl).join(r.localUrl);
  }

  return css;
}

async function main() {
  try {
    const frauncesCss = await downloadGoogleFontCssAndWoff2(
      'Fraunces:opsz,wght@9..144,600;9..144,700',
      'fraunces-pl'
    );
    const jakartaCss = await downloadGoogleFontCssAndWoff2(
      'Plus+Jakarta+Sans:wght@400;500;600;700',
      'plus-jakarta-sans-pl'
    );
    const combinedCss = `/* Wbudowane lokalnie czcionki Fraunces i Plus Jakarta Sans (z pełnym zestawem polskich znaków: ą, ć, ę, ł, ń, ó, ś, ź, ż) */\n${frauncesCss}\n${jakartaCss}\n`;
    fs.writeFileSync(path.join(fontsDir, 'fonts.css'), combinedCss, 'utf8');
    console.log('Pobrano i wbudowano lokalnie czcionki Fraunces oraz Plus Jakarta Sans (latin + latin-ext).');
  } catch (err) {
    console.error('Błąd pobierania czcionek:', err);
    process.exit(1);
  }
}

main();
