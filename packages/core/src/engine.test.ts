import { describe, expect, it } from 'vitest';
import { Mission } from '@macknow/missions';
import { SimulatorAdapter } from './adapter';
import {
  isMissionSupportedOnOs,
  matchesOsRange,
  resolveEffectiveOsVersion,
  resolveSimulatorTheme,
  resolveStepForEnvironment,
} from './version';
import {
  DEFAULT_USER_PROGRESS,
  exportProgressToJson,
  getSuggestedMissions,
  getTrackProgressSummaries,
  importProgressFromJson,
  isMissionUnlocked,
  matchesFilePattern,
  observeStepVerification,
  recordMissionCompletion,
} from './engine';
import { matchEmergencyQuery } from './matcher';

const SAMPLE_MISSIONS: Mission[] = [
  {
    id: 'macos-03-zrzut-ekranu',
    track: 'macos',
    level: 1,
    title: 'Zrzut ekranu i gdzie go szukać',
    realLifeHook: 'Gdy chcesz zachować potwierdzenie przelewu albo zabawny przepis.',
    estimatedMinutes: 4,
    prerequisites: [],
    reward: 'Odznaka Fotografa Ekranu',
    theory: {
      title: 'Aparat fotograficzny wbudowany w klawiaturę',
      metaphor: 'Polaroid, który kładzie zdjęcie prosto na biurko',
      story: 'Każdy Mac ma w środku cichy aparat fotograficzny.',
      realExplanation: 'Zrzut ekranu zapisuje się jako plik PNG na Pulpicie.',
      oneLiner: 'Zrzut ekranu zawsze ląduje na Pulpicie z datą i godziną w nazwie.',
      illustrationId: 'screenshot-polaroid',
    },
    steps: [
      {
        instruction: 'Wciśnij na klawiaturze ⌘⇧5, aby otworzyć pasek zrzutu ekranu.',
        hint: 'Przytrzymaj Command i Shift, a potem naciśnij cyfrę 5.',
        verify: { type: 'newFile', folder: '~/Desktop', pattern: '*Zrzut ekranu*|*Screen Shot*' },
        simulatorScene: 'macos-screenshot-bar',
        variants: [
          {
            osRange: '<10.14',
            instruction: 'Na macOS High Sierra wciśnij ⌘⇧4, aby zamienić kursor w celownik.',
            hint: 'Przytrzymaj Command oraz Shift i naciśnij cyfrę 4.',
            simulatorScene: 'macos-screenshot-legacy',
          },
        ],
      },
    ],
  },
  {
    id: 'macos-08-ustawienia',
    track: 'macos',
    level: 1,
    title: 'Ustawienia: Wi-Fi, dźwięk, Bluetooth',
    realLifeHook: 'Gdy słuchawki nie chcą się połączyć albo zniknął dźwięk.',
    estimatedMinutes: 5,
    prerequisites: ['macos-03-zrzut-ekranu'],
    reward: 'Odznaka Pani Domu Systemu',
    theory: {
      title: 'Tablica rozdzielcza Twojego Maca',
      metaphor: 'Skrzynka z bezpiecznikami, ale opisana po ludzku',
      story: 'W Ustawieniach włączysz Wi-Fi i sparujesz słuchawki.',
      realExplanation: 'Ustawienia systemowe gromadzą konfigurację sprzętu i sieci.',
      oneLiner: 'Wi-Fi, dźwięk i Bluetooth znajdziesz zawsze pod ikoną jabłuszka.',
      illustrationId: 'settings-switchboard',
    },
    steps: [
      {
        instruction: 'Kliknij jabłuszko  w lewym górnym rogu i wybierz „Ustawienia systemowe…”.',
        verify: { type: 'frontmostApp', app: 'System Settings' },
        variants: [
          {
            osRange: '<13',
            instruction: 'Kliknij jabłuszko  w lewym górnym rogu i wybierz „Preferencje systemowe…”.',
          },
        ],
      },
    ],
  },
  {
    id: 'iphone-03-hasla-pek-kluczy',
    track: 'iphone',
    level: 2,
    title: 'Hasła i pęk kluczy',
    realLifeHook: 'Koniec z żółtymi karteczkami przyklejanymi do obudowy.',
    estimatedMinutes: 5,
    prerequisites: [],
    minOsVersion: '10.14',
    reward: 'Odznaka Strażniczki Kluczy',
    theory: {
      title: 'Jeden sejf zamiast dwudziestu karteczek',
      metaphor: 'Hotelowy portier, który pamięta każdy klucz',
      story: 'Pęk kluczy iCloud pamięta hasła za Ciebie.',
      realExplanation: 'Hasła są szyfrowane i synchronizowane między iPhonem a Makiem.',
      oneLiner: 'Mac i iPhone dzielą jeden wspólny, zaszyfrowany sejf na hasła.',
      illustrationId: 'passwords-vault',
    },
    steps: [
      {
        instruction: 'Otwórz aplikację Hasła lub sekcję Hasła w Ustawieniach.',
        verify: { type: 'manual' },
      },
    ],
  },
];

describe('Core version matching & step resolution', () => {
  it('poprawnie rozpoznaje zakresy wersji macOS (10.13, 10.14, 12.7, 13.6, 15.1)', () => {
    expect(matchesOsRange('10.13.6', '<10.14')).toBe(true);
    expect(matchesOsRange('10.14.6', '<10.14')).toBe(false);
    expect(matchesOsRange('10.14.6', '>=10.13 <11')).toBe(true);
    expect(matchesOsRange('12.7.4', '<13')).toBe(true);
    expect(matchesOsRange('13.6.1', '<13')).toBe(false);
    expect(matchesOsRange('13.6.1', '>=13')).toBe(true);
    expect(matchesOsRange('15.1', '>=15')).toBe(true);
  });

  it('wybiera właściwy wariant kroku dla macOS 10.13 vs 14.5 i degraduje weryfikację w web', () => {
    const adapter = new SimulatorAdapter();
    const screenshotStep = SAMPLE_MISSIONS[0].steps[0];

    const onHighSierra = resolveStepForEnvironment(screenshotStep, '10.13.6', adapter, false);
    expect(onHighSierra.instruction).toContain('⌘⇧4');
    expect(onHighSierra.matchedVariantRange).toBe('<10.14');
    expect(onHighSierra.verify.type).toBe('manual');

    const onSonoma = resolveStepForEnvironment(screenshotStep, '14.5', adapter, false);
    expect(onSonoma.instruction).toContain('⌘⇧5');
    expect(onSonoma.matchedVariantRange).toBeUndefined();
    expect(onSonoma.verify.type).toBe('manual');
  });

  it('przełącza między Preferencjami systemowymi (<13) a Ustawieniami systemowymi (>=13)', () => {
    const adapter = new SimulatorAdapter();
    const settingsStep = SAMPLE_MISSIONS[1].steps[0];

    const onMonterey = resolveStepForEnvironment(settingsStep, '12.6', adapter, false);
    expect(onMonterey.instruction).toContain('Preferencje systemowe');

    const onVentura = resolveStepForEnvironment(settingsStep, '13.0', adapter, false);
    expect(onVentura.instruction).toContain('Ustawienia systemowe');
  });

  it('ukrywa misje z minOsVersion na starszym systemie i wylicza motyw symulatora', () => {
    expect(isMissionSupportedOnOs(SAMPLE_MISSIONS[2], '10.13.6')).toBe(false);
    expect(isMissionSupportedOnOs(SAMPLE_MISSIONS[2], '10.14.6')).toBe(true);
    expect(resolveEffectiveOsVersion(null, null, 'old')).toBe('10.14.6');
    expect(resolveSimulatorTheme('10.14.6', 'unknown')).toBe('classic');
    expect(resolveSimulatorTheme('14.0', 'unknown')).toBe('modern');
  });
});

describe('Core mission engine & progress persistence', () => {
  it('zarządza odblokowaniem misji, ukończeniem, sugestiami i eksportem/importem JSON', () => {
    let progress = DEFAULT_USER_PROGRESS;
    expect(isMissionUnlocked(SAMPLE_MISSIONS[0], progress.completedMissions)).toBe(true);
    expect(isMissionUnlocked(SAMPLE_MISSIONS[1], progress.completedMissions)).toBe(false);

    const suggestedBefore = getSuggestedMissions(SAMPLE_MISSIONS, progress, '14.5');
    expect(suggestedBefore.length).toBeGreaterThanOrEqual(2);

    progress = recordMissionCompletion(progress, SAMPLE_MISSIONS[0], 1, '2026-10-25T10:00:00.000Z');
    expect(isMissionUnlocked(SAMPLE_MISSIONS[1], progress.completedMissions)).toBe(true);
    expect(progress.readTheoryIds).toContain('macos-03-zrzut-ekranu');

    const summaries = getTrackProgressSummaries(SAMPLE_MISSIONS, progress, '14.5');
    expect(summaries.macos.completed).toBe(1);
    expect(summaries.macos.total).toBe(2);
    expect(summaries.macos.percentage).toBe(50);

    const exported = exportProgressToJson(progress);
    const reimported = importProgressFromJson(exported);
    expect(reimported.completedMissions['macos-03-zrzut-ekranu'].hintsUsed).toBe(1);
  });

  it('weryfikuje nowy plik w czasie rzeczywistym przez watchFolder', () => {
    expect(matchesFilePattern('Zrzut ekranu 2026-10-25 o 11.20.10.png', '*Zrzut ekranu*|*Screen Shot*')).toBe(true);
    expect(matchesFilePattern('faktura.pdf', '*Zrzut ekranu*|*Screen Shot*')).toBe(false);

    let watcherCallback: ((f: { path: string; filename: string; folder: string; timestamp: number }) => void) | null = null;
    const mockMacAdapter = {
      frontmostApp: async () => 'Finder',
      watchFolder: (_folder: string, cb: (f: { path: string; filename: string; folder: string; timestamp: number }) => void) => {
        watcherCallback = cb;
        return () => {};
      },
      clipboardText: async () => null,
      safariUrl: async () => null,
      openApp: async () => {},
      isAvailable: () => true,
      osVersion: async () => '14.5',
    };

    let verifiedMsg = '';
    const { stop } = observeStepVerification(
      SAMPLE_MISSIONS[0].steps[0],
      '14.5',
      mockMacAdapter,
      true,
      (msg) => {
        verifiedMsg = msg || 'ok';
      }
    );

    expect(watcherCallback).not.toBeNull();
    watcherCallback!({
      path: '/Users/malgorzata/Desktop/Zrzut ekranu 2026-10-25.png',
      filename: 'Zrzut ekranu 2026-10-25.png',
      folder: '~/Desktop',
      timestamp: Date.now(),
    });
    expect(verifiedMsg).toContain('Widzę go na Pulpicie');
    stop();
  });
});

describe('Emergency Matcher (Pogotowie)', () => {
  it('dopasowuje potoczne zapytania z błędami ortograficznymi do właściwych misji', () => {
    const queries = [
      { q: 'jak zrobic skrin ekranu', expectedId: 'macos-03-zrzut-ekranu' },
      { q: 'printscreen gdzie jest zdjecie ekranu', expectedId: 'macos-03-zrzut-ekranu' },
      { q: 'sluchawki blutut nie dzialaja i brak glosu', expectedId: 'macos-08-ustawienia' },
      { q: 'zapomnialam hasla i pek kluczy', expectedId: 'iphone-03-hasla-pek-kluczy' },
    ];

    for (const item of queries) {
      const res = matchEmergencyQuery(item.q, SAMPLE_MISSIONS);
      expect(res.matchedMissions.length).toBeGreaterThan(0);
      expect(res.matchedMissions[0].mission.id).toBe(item.expectedId);
    }
  });
});
