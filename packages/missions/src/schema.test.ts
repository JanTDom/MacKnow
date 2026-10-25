import { describe, expect, it } from 'vitest';
import { Mission, polishMission } from './types';
import { validatePolishText } from '@macknow/ui';

describe('Mission schema and Polish typography formatter', () => {
  it('poprawnie formatuje wszystkie teksty w misji i wariantach kroków', () => {
    const rawMission: Mission = {
      id: 'test-mission',
      track: 'macos',
      level: 1,
      title: 'Znajdź plik w "Pobranych" - bez stresu',
      realLifeHook: 'Gdy pobierasz fakturę z maila i nagle znika z oczu...',
      estimatedMinutes: 3,
      prerequisites: [],
      reward: 'Odznaka Tropicielki Plików',
      theory: {
        title: 'Dlaczego Mac chowa rzeczy w "Pobranych"',
        metaphor: 'Skrzynka na listy przy drzwiach wejściowych',
        story: 'Wyobraź sobie, że listonosz wrzuca paczkę przez okno w kuchni - absurd, prawda? Dlatego Mac ma jedno miejsce na przesyłki z internetu.',
        realExplanation: 'Każdy plik pobrany z przeglądarki Safari lub zapisany z programu Mail trafia domyślnie do folderu Pobrane w oknie Findera.',
        oneLiner: 'Wszystko, co ściągasz z sieci, ląduje w folderze Pobrane.',
        commonMyth: 'Wiele osób myśli, że zamknięcie karty z plikiem kasuje go z dysku. A tymczasem plik spokojnie czeka w Pobranych.',
        illustrationId: 'downloads-mailbox',
      },
      steps: [
        {
          instruction: 'Kliknij ikonę Findera w Docku - tę uśmiechniętą twarz.',
          hint: 'Spójrz na sam dół ekranu, pierwsza ikona z lewej strony.',
          hint2: 'Najedź kursorem na niebiesko-białą buźkę na dole ekranu i kliknij raz lewym przyciskiem.',
          verify: { type: 'frontmostApp', app: 'Finder' },
          simulatorScene: 'macos-finder-dock',
          variants: [
            {
              osRange: '<13',
              instruction: 'Otwórz "Preferencje systemowe" w Docku.',
              hint: 'Ikona z zębatkami w Docku na dole ekranu.',
            },
          ],
        },
      ],
    };

    const formatted = polishMission(rawMission);
    expect(validatePolishText(formatted.title)).toEqual([]);
    expect(validatePolishText(formatted.realLifeHook)).toEqual([]);
    expect(validatePolishText(formatted.theory.story)).toEqual([]);
    expect(validatePolishText(formatted.steps[0].instruction)).toEqual([]);
    expect(validatePolishText(formatted.steps[0].variants![0].instruction)).toEqual([]);
  });
});
