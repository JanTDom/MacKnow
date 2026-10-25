import { describe, expect, it } from 'vitest';
import { ALL_MISSIONS, Mission } from '@macknow/missions';
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

const SAMPLE_MISSIONS: Mission[] = ALL_MISSIONS;

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
    const screenshotMission = SAMPLE_MISSIONS.find((m) => m.id === 'macos-03-zrzut-ekranu')!;
    const screenshotStep = screenshotMission.steps[0];

    const onHighSierra = resolveStepForEnvironment(screenshotStep, '10.13.6', adapter, false);
    expect(onHighSierra.instruction).toContain('⌘⇧4');
    expect(onHighSierra.matchedVariantRange).toBe('<10.14');

    const onSonoma = resolveStepForEnvironment(screenshotStep, '14.5', adapter, false);
    expect(onSonoma.instruction).toContain('⌘⇧5');
    expect(onSonoma.matchedVariantRange).toBeUndefined();
  });

  it('przełącza między Preferencjami systemowymi (<13) a Ustawieniami systemowymi (>=13)', () => {
    const adapter = new SimulatorAdapter();
    const settingsMission = SAMPLE_MISSIONS.find((m) => m.id === 'macos-08-ustawienia')!;
    const settingsStep = settingsMission.steps[0];

    const onMonterey = resolveStepForEnvironment(settingsStep, '12.6', adapter, false);
    expect(onMonterey.instruction).toContain('Preferencje systemowe');

    const onVentura = resolveStepForEnvironment(settingsStep, '13.0', adapter, false);
    expect(onVentura.instruction).toContain('Ustawienia systemowe');
  });

  it('ukrywa misje z minOsVersion na starszym systemie i wylicza motyw symulatora', () => {
    const passwordsMission = SAMPLE_MISSIONS.find((m) => m.id === 'iphone-03-hasla-pek-kluczy')!;
    expect(isMissionSupportedOnOs(passwordsMission, '10.13.6')).toBe(false);
    expect(isMissionSupportedOnOs(passwordsMission, '10.14.6')).toBe(true);
    expect(resolveEffectiveOsVersion(null, null, 'old')).toBe('10.14.6');
    expect(resolveSimulatorTheme('10.14.6', 'unknown')).toBe('classic');
    expect(resolveSimulatorTheme('14.0', 'unknown')).toBe('modern');
  });
});

describe('Core mission engine & progress persistence', () => {
  it('zarządza odblokowaniem misji, ukończeniem, sugestiami i eksportem/importem JSON', () => {
    let progress = DEFAULT_USER_PROGRESS;
    const firstMission = SAMPLE_MISSIONS.find((m) => m.id === 'macos-01-pulpit-dock')!;
    const secondMission = SAMPLE_MISSIONS.find((m) => m.id === 'macos-02-pobrane')!;

    expect(isMissionUnlocked(firstMission, progress.completedMissions)).toBe(true);
    expect(isMissionUnlocked(secondMission, progress.completedMissions)).toBe(false);

    const suggestedBefore = getSuggestedMissions(SAMPLE_MISSIONS, progress, '14.5');
    expect(suggestedBefore).toHaveLength(3);

    progress = recordMissionCompletion(progress, firstMission, 1, '2026-10-25T10:00:00.000Z');
    expect(isMissionUnlocked(secondMission, progress.completedMissions)).toBe(true);

    const summaries = getTrackProgressSummaries(SAMPLE_MISSIONS, progress, '14.5');
    expect(summaries.macos.completed).toBe(1);
    expect(summaries.macos.total).toBe(10);
    expect(summaries.macos.percentage).toBe(10);

    const exported = exportProgressToJson(progress);
    const reimported = importProgressFromJson(exported);
    expect(reimported.completedMissions['macos-01-pulpit-dock'].hintsUsed).toBe(1);
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

    const screenshotMission = SAMPLE_MISSIONS.find((m) => m.id === 'macos-03-zrzut-ekranu')!;
    let verifiedMsg = '';
    const { stop } = observeStepVerification(
      screenshotMission.steps[1],
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

describe('Emergency Matcher (Pogotowie) – 10 potocznych zapytań nietechnicznej użytkowniczki', () => {
  it('dopasowuje min. 8 na 10 (10/10) testowych zapytań napisanych potocznie i z błędami', () => {
    const testQueries = [
      { q: 'jak zrobic skrin ekranu', expectedId: 'macos-03-zrzut-ekranu' },
      { q: 'pobralam fakture i nie ma zniknela', expectedId: 'macos-02-pobrane' },
      { q: 'sluchawki blutut nie dzialaja i brak glosu', expectedId: 'macos-08-ustawienia' },
      { q: 'jak podpisac plik bez drukowania w podgladzie', expectedId: 'programy-09-podglad-pdf' },
      { q: 'przeslij zdjecie z iphone bez kabla airdrop', expectedId: 'iphone-01-airdrop' },
      { q: 'word nie widzi pliku z icloud gdzie zapisal sie dokument', expectedId: 'programy-05-word-pages-zapis' },
      { q: 'okno schowalo sie pod spodem za duzo okien', expectedId: 'macos-07-okna-mission-control' },
      { q: 'usunelam dokument jak odzyskac plik z kosza', expectedId: 'macos-10-kosz' },
      { q: 'podsumuj maila o co chodzi w tym urzedowym pismie', expectedId: 'ai-03-podsumuj-maila' },
      { q: 'zapomnialam hasla i pek kluczy', expectedId: 'iphone-03-hasla-pek-kluczy' },
    ];

    let matchedCorrectly = 0;
    for (const item of testQueries) {
      const res = matchEmergencyQuery(item.q, SAMPLE_MISSIONS);
      if (
        res.matchedMissions.length > 0 &&
        res.matchedMissions.some((m) => m.mission.id === item.expectedId)
      ) {
        matchedCorrectly++;
      }
    }

    expect(matchedCorrectly).toBeGreaterThanOrEqual(8);
    expect(matchedCorrectly).toBe(10);
  });
});
