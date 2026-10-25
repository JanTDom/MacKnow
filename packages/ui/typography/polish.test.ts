import { describe, expect, it } from 'vitest';
import {
  declineMalgorzata,
  formatPolishTypography,
  pl,
  validatePolishText,
} from './polish';

describe('formatPolishTypography (polish.ts)', () => {
  it('zamienia proste cudzysłowy na polskie cudzysłowy drukarskie', () => {
    expect(pl('Kliknij w "Pobrane" na pasku')).toBe('Kliknij w\u00A0„Pobrane” na pasku');
  });

  it('zamienia dywiz otoczony spacjami na półpauzę', () => {
    expect(pl('Finder - twój główny pomocnik')).toBe('Finder – twój główny pomocnik');
  });

  it('zamienia trzy kropki na pojedynczy znak wielokropka', () => {
    expect(pl('Sprawdźmy, gdzie to leży...')).toBe('Sprawdźmy, gdzie to leży…');
  });

  it('wstawia niełamliwe spacje po jednoliterowych przyimkach i spójnikach, także obok siebie', () => {
    const formatted = formatPolishTypography('W oknie i a z u o folderze');
    expect(formatted).toBe('W\u00A0oknie i\u00A0a\u00A0z\u00A0u\u00A0o\u00A0folderze');
    expect(validatePolishText(formatted)).toHaveLength(0);
  });

  it('poprawnie odmienia imię Małgorzata przez wszystkie przypadki', () => {
    expect(declineMalgorzata('mianownik')).toBe('Małgorzata');
    expect(declineMalgorzata('dopelniacz')).toBe('Małgorzaty');
    expect(declineMalgorzata('celownik')).toBe('Małgorzacie');
    expect(declineMalgorzata('biernik')).toBe('Małgorzatę');
    expect(declineMalgorzata('narzednik')).toBe('Małgorzatą');
    expect(declineMalgorzata('miejscownik')).toBe('Małgorzacie');
    expect(declineMalgorzata('wolacz')).toBe('Małgorzato');
  });

  it('wykrywa błędy typograficzne, formy męskie, kalki i brak wołacza', () => {
    const badText = 'Małgorzata, zrobiłeś to w "dedykowanym" oknie - brawo...';
    const issues = validatePolishText(badText);
    const rules = issues.map((item) => item.rule);
    expect(rules).toContain('straight-quotes');
    expect(rules).toContain('hyphen-as-dash');
    expect(rules).toContain('three-dots-ellipsis');
    expect(rules).toContain('orphan-conjunction');
    expect(rules).toContain('masculine-form');
    expect(rules).toContain('anglicism');
    expect(rules).toContain('nominative-as-vocative');
  });

  it('akceptuje poprawny polski tekst żeński po formatowaniu', () => {
    const goodText = pl('Małgorzato, dziś zrobiłaś świetny postęp – jesteś gotowa na kolejny krok…');
    expect(validatePolishText(goodText)).toEqual([]);
  });
});
