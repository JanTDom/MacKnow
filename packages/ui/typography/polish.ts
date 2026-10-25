/**
 * Polska typografia, odmiana imienia Małgorzata oraz walidacja językowa dla MacKnow.
 * Zaprojektowane bez nowoczesnych konstrukcji ES2022+, w pełni kompatybilne z Safari 11+.
 */

export type GrammaticalCase =
  | 'mianownik' // kto? co? -> Małgorzata
  | 'dopelniacz' // kogo? czego? -> Małgorzaty
  | 'celownik' // komu? czemu? -> Małgorzacie
  | 'biernik' // kogo? co? -> Małgorzatę
  | 'narzednik' // z kim? z czym? -> Małgorzatą
  | 'miejscownik' // o kim? o czym? -> Małgorzacie
  | 'wolacz'; // o! (zwrot bezpośredni) -> Małgorzato

const MALGORZATA_DECLENSION: Record<GrammaticalCase, string> = {
  mianownik: 'Małgorzata',
  dopelniacz: 'Małgorzaty',
  celownik: 'Małgorzacie',
  biernik: 'Małgorzatę',
  narzednik: 'Małgorzatą',
  miejscownik: 'Małgorzacie',
  wolacz: 'Małgorzato',
};

/**
 * Zwraca poprawną formę imienia Małgorzata w zadanym przypadku.
 */
export function declineMalgorzata(grammaticalCase: GrammaticalCase): string {
  return MALGORZATA_DECLENSION[grammaticalCase];
}

/**
 * Przekształca dowolny tekst w tekst zgodny z regułami polskiej typografii:
 * 1. Zamienia wielokropek z trzech kropek (...) na pojedynczy znak wielokropka (…).
 * 2. Zamienia dywiz otoczony spacjami ( - ) na półpauzę ( – ) z niełamliwą spacją przed nią lub zwykłą po niej.
 * 3. Zamienia proste cudzysłowy ("...") na polskie cudzysłowy drukarskie („…”).
 * 4. Zamienia zapis stopni typu "90 deg" na znak "°".
 * 5. Wstawia twarde (niełamliwe) spacje (\u00A0) po jednoliterowych spójnikach i przyimkach (w, z, i, a, o, u, W, Z, I, A, O, U)
 *    oraz przed półpauzą, aby zapobiec wiszącym sierotom na końcu wiersza.
 */
export function formatPolishTypography(input: string): string {
  if (!input) {
    return input;
  }

  let result = input;

  // 1. Trzy kropki -> znak wielokropka (…)
  result = result.replace(/\.\.\./g, '…');

  // 2. Proste cudzysłowy "..." -> polskie „…”
  result = result.replace(/"([^"]+)"/g, '„$1”');

  // 3. Dywiz w funkcji myślnika (otoczony spacjami lub twardymi spacjami) -> półpauza (–)
  result = result.replace(/([\s\u00A0])-([\s\u00A0])/g, '$1–$2');

  // 4. Znak stopni przy liczbach (np. 180 deg -> 180°)
  result = result.replace(/(\d+)\s*deg\b/gi, '$1°');

  // 5. Niełamliwe spacje po jednoliterowych przyimkach i spójnikach (w, z, i, a, o, u)
  // Stosujemy pętlę, by obsłużyć sąsiadujące spójniki i przyimki, np. "a w domu" -> "a\u00A0w\u00A0domu"
  const singleLetterPattern = /(^|[\s\u00A0(„«])([wziaouWZIAOU]) +/g;
  let previous = '';
  while (previous !== result) {
    previous = result;
    result = result.replace(singleLetterPattern, '$1$2\u00A0');
  }

  return result;
}

/**
 *Alias skrócony do wygodnego użycia w komponentach UI: `pl("Tekst w oknie")`.
 */
export const pl = formatPolishTypography;

const PL_BOUNDARY_START = '(?:^|[^a-ząćęłńóśźżA-ZĄĆĘŁŃÓŚŹŻ])';
const PL_BOUNDARY_END = '(?=$|[^a-ząćęłńóśźżA-ZĄĆĘŁŃÓŚŹŻ])';

function plWordRegex(wordPattern: string): RegExp {
  return new RegExp(PL_BOUNDARY_START + '(?:' + wordPattern + ')' + PL_BOUNDARY_END, 'i');
}

/**
 * Wzorce zakazanych form męskich w bezpośrednich zwrotach do użytkowniczki.
 */
export const FORBIDDEN_MASCULINE_PATTERNS: RegExp[] = [
  plWordRegex('zrobiłeś'),
  plWordRegex('gotowy'),
  plWordRegex('ukończyłeś'),
  plWordRegex('kliknąłeś'),
  plWordRegex('wybrałeś'),
  plWordRegex('wpisałeś'),
  plWordRegex('otworzyłeś'),
  plWordRegex('zapisałeś'),
  plWordRegex('znalazłeś'),
  plWordRegex('przeczytałeś'),
  plWordRegex('przeszedłeś'),
  plWordRegex('nauczyłeś'),
  plWordRegex('widziałeś'),
  plWordRegex('chciałbyś'),
  plWordRegex('mógłbyś'),
  plWordRegex('powinieneś'),
  plWordRegex('zaciąłeś się'),
];

/**
 * Wzorce kalk językowych z angielskiego zakazanych w interfejsie i treściach.
 */
export const FORBIDDEN_ANGLICISM_PATTERNS: RegExp[] = [
  plWordRegex('aplikuj'),
  plWordRegex('dedykowan(?:y|a|e|ego|ej|emu|ym|ych)'),
  plWordRegex('ikonk(?:a|i|ę) ekranu domowego'),
  plWordRegex('ekran domowy'),
];

/**
 * Wzorzec błędnego użycia mianownika zamiast wołacza w bezpośrednim zwrocie ("Małgorzata, ...").
 */
export const FORBIDDEN_NOMINATIVE_VOCATIVE_PATTERN = /\bMałgorzata,\s+[a-ząćęłńóśźż]/;

export interface PolishLintIssue {
  rule:
    | 'straight-quotes'
    | 'hyphen-as-dash'
    | 'three-dots-ellipsis'
    | 'orphan-conjunction'
    | 'masculine-form'
    | 'anglicism'
    | 'nominative-as-vocative';
  message: string;
  excerpt: string;
}

/**
 * Sprawdza tekst pod kątem surowych wymogów językowych i typograficznych (używane w testach i `pnpm lint:pl`).
 */
export function validatePolishText(text: string): PolishLintIssue[] {
  const issues: PolishLintIssue[] = [];

  if (text.indexOf('"') !== -1) {
    issues.push({
      rule: 'straight-quotes',
      message: 'Wykryto prosty cudzysłów ("). Użyj polskich cudzysłowów drukarskich „…”.',
      excerpt: text,
    });
  }

  if (/[\s\u00A0]-[\s\u00A0]/.test(text)) {
    issues.push({
      rule: 'hyphen-as-dash',
      message: 'Wykryto dywiz otoczony spacjami ( - ). Użyj półpauzy ( – ).',
      excerpt: text,
    });
  }

  if (text.indexOf('...') !== -1) {
    issues.push({
      rule: 'three-dots-ellipsis',
      message: 'Wykryto trzy kropki (...). Użyj pojedynczego znaku wielokropka (…).',
      excerpt: text,
    });
  }

  if (/(^|[\s\u00A0(„«])([wziaouWZIAOU]) +/.test(text)) {
    issues.push({
      rule: 'orphan-conjunction',
      message:
        'Wykryto zwykłą spację po jednoliterowym spójniku/przyimku (w, z, i, a, o, u). Przepuść tekst przez formatPolishTypography().',
      excerpt: text,
    });
  }

  for (let i = 0; i < FORBIDDEN_MASCULINE_PATTERNS.length; i++) {
    const pattern = FORBIDDEN_MASCULINE_PATTERNS[i];
    if (pattern.test(text)) {
      issues.push({
        rule: 'masculine-form',
        message: 'Wykryto męską formę czasownika lub przymiotnika: ' + pattern.source,
        excerpt: text,
      });
    }
  }

  for (let i = 0; i < FORBIDDEN_ANGLICISM_PATTERNS.length; i++) {
    const pattern = FORBIDDEN_ANGLICISM_PATTERNS[i];
    if (pattern.test(text)) {
      issues.push({
        rule: 'anglicism',
        message: 'Wykryto kalkę z języka angielskiego: ' + pattern.source,
        excerpt: text,
      });
    }
  }

  if (FORBIDDEN_NOMINATIVE_VOCATIVE_PATTERN.test(text)) {
    issues.push({
      rule: 'nominative-as-vocative',
      message: 'Wykryto zwrot „Małgorzata, …” zamiast wołacza „Małgorzato, …”.',
      excerpt: text,
    });
  }

  return issues;
}
