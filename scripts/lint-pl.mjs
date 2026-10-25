import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

/**
 * Skrypt `pnpm lint:pl` weryfikujący jakość polszczyzny w `packages/missions` oraz `apps/web`:
 * - brak prostych cudzysłowów `"` w tekstach dla użytkowniczki (po formatowaniu)
 * - brak dywizu otoczonego spacjami ` - ` w funkcji myślnika
 * - brak trzech kropek `...` zamiast znaku `…`
 * - brak form męskich w zwrotach do użytkowniczki („zrobiłeś”, „gotowy”, „ukończyłeś” itd.)
 * - brak kalk językowych („aplikuj”, „dedykowany”, „ekran domowy”)
 * - brak błędnego mianownika w wołaczu („Małgorzata, zrób…”)
 * - obecność wbudowanych czcionek z polskimi znakami (od Fazy 2)
 */

const PL_START = '(?:^|[^a-ząćęłńóśźżA-ZĄĆĘŁŃÓŚŹŻ])';
const PL_END = '(?=$|[^a-ząćęłńóśźżA-ZĄĆĘŁŃÓŚŹŻ])';
const plWord = (w) => new RegExp(`${PL_START}(?:${w})${PL_END}`, 'i');

const FORBIDDEN_MASCULINE = [
  plWord('zrobiłeś'),
  plWord('gotowy'),
  plWord('ukończyłeś'),
  plWord('kliknąłeś'),
  plWord('wybrałeś'),
  plWord('wpisałeś'),
  plWord('otworzyłeś'),
  plWord('zapisałeś'),
  plWord('znalazłeś'),
  plWord('przeczytałeś'),
  plWord('przeszedłeś'),
  plWord('nauczyłeś'),
  plWord('widziałeś'),
  plWord('chciałbyś'),
  plWord('mógłbyś'),
  plWord('powinieneś'),
  plWord('zaciąłeś się'),
];

const FORBIDDEN_ANGLICISMS = [
  plWord('aplikuj'),
  plWord('dedykowan(?:y|a|e|ego|ej|emu|ym|ych)'),
  plWord('ikonk(?:a|i|ę) ekranu domowego'),
  plWord('ekran domowy'),
  plWord('to proste'),
  plWord('wystarczy'),
];

const FORBIDDEN_VOCATIVE = /\bMałgorzata,\s+[a-ząćęłńóśźż]/;

function walkFiles(dir, exts, results = []) {
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === 'out' || entry.name === 'dist') {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, exts, results);
    } else if (exts.some((ext) => entry.name.endsWith(ext)) && !entry.name.endsWith('.test.ts')) {
      results.push(full);
    }
  }
  return results;
}

function extractPolishStrings(sourceCode) {
  const results = [];
  // Wyciągamy literały jedno- i wieloliniowe zawierające polskie litery lub zdania użytkownika
  const regex = /(['"`])((?:\\.|(?!\1)[^\\])*)\1/g;
  let match;
  while ((match = regex.exec(sourceCode)) !== null) {
    const val = match[2];
    // Sprawdzamy tylko ciągi będące tekstem dla użytkowniczki (zawierające spacje i wielką literę lub polskie znaki)
    if (
      val.length >= 6 &&
      val.includes(' ') &&
      /[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/.test(val) &&
      !val.includes('className') &&
      !val.startsWith('http')
    ) {
      results.push(val);
    }
  }
  return results;
}

let errors = 0;

const targetDirs = [
  path.join(rootDir, 'packages', 'missions', 'src'),
  path.join(rootDir, 'apps', 'web', 'src'),
];

for (const dir of targetDirs) {
  const files = walkFiles(dir, ['.ts', '.tsx']);
  for (const file of files) {
    const rel = path.relative(rootDir, file);
    const content = fs.readFileSync(file, 'utf8');
    const strings = extractPolishStrings(content);

    for (const text of strings) {
      if (text.includes('"')) {
        console.error(`[lint:pl] ${rel}: Prosty cudzysłów (") w tekście: ${text.slice(0, 80)}`);
        errors++;
      }
      if (/ - /.test(text)) {
        console.error(`[lint:pl] ${rel}: Dywiz jako myślnik ( - ) w tekście: ${text.slice(0, 80)}`);
        errors++;
      }
      if (text.includes('...')) {
        console.error(`[lint:pl] ${rel}: Trzy kropki (...) zamiast (…) w tekście: ${text.slice(0, 80)}`);
        errors++;
      }
      for (const pat of FORBIDDEN_MASCULINE) {
        if (pat.test(text)) {
          console.error(`[lint:pl] ${rel}: Forma męska (${pat}) w tekście: ${text.slice(0, 80)}`);
          errors++;
        }
      }
      for (const pat of FORBIDDEN_ANGLICISMS) {
        if (pat.test(text)) {
          console.error(`[lint:pl] ${rel}: Kalka z angielskiego (${pat}) w tekście: ${text.slice(0, 80)}`);
          errors++;
        }
      }
      if (FORBIDDEN_VOCATIVE.test(text)) {
        console.error(`[lint:pl] ${rel}: Brak wołacza „Małgorzato” w zwrocie bezpośrednim: ${text.slice(0, 80)}`);
        errors++;
      }
    }
  }
}

// Sprawdzamy czcionki wbudowane (jeśli katalog fonts istnieje od Fazy 2)
const fontsDir = path.join(rootDir, 'apps', 'web', 'public', 'fonts');
if (fs.existsSync(fontsDir)) {
  const fontFiles = fs.readdirSync(fontsDir).filter((f) => f.endsWith('.woff2') || f.endsWith('.ttf'));
  if (fontFiles.length === 0) {
    console.error('[lint:pl] Brak plików czcionek w apps/web/public/fonts!');
    errors++;
  }
}

if (errors > 0) {
  console.error(`\n[lint:pl] Znaleziono ${errors} błędów językowych/typograficznych.`);
  process.exit(1);
} else {
  console.log('[lint:pl] Wszystkie teksty przeszły kontrolę polskiej typografii i języka (0 błędów).');
}
