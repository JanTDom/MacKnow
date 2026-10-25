import { Mission, Step, TrackId } from '@macknow/missions';
import { EnvironmentAdapter, FileEvent } from './adapter';
import {
  isMissionSupportedOnOs,
  MacLookChoice,
  ResolvedStep,
  resolveStepForEnvironment,
} from './version';

export type FontSizeScale = 'normal' | 'large' | 'xlarge';
export type ColorMode = 'light' | 'dark';

export interface MissionCompletionRecord {
  missionId: string;
  completedAt: string; // ISO date
  hintsUsed: number;
}

export interface UserSettings {
  fontSize: FontSizeScale;
  colorMode: ColorMode;
  macLook: MacLookChoice;
  realMacMode: boolean;
  manualOsOverride: string | null;
  onboardingDismissed: boolean;
}

export interface UserProgressState {
  version: 1;
  completedMissions: Record<string, MissionCompletionRecord>;
  readTheoryIds: string[];
  settings: UserSettings;
}

export const DEFAULT_USER_PROGRESS: UserProgressState = {
  version: 1,
  completedMissions: {},
  readTheoryIds: [],
  settings: {
    fontSize: 'normal',
    colorMode: 'light',
    macLook: 'unknown',
    realMacMode: false,
    manualOsOverride: null,
    onboardingDismissed: false,
  },
};

/**
 * Sprawdza, czy wszystkie wymagane wcześniejsze misje (prerequisites) zostały ukończone.
 */
export function isMissionUnlocked(
  mission: Mission,
  completedMissions: Record<string, MissionCompletionRecord>
): boolean {
  if (!mission.prerequisites || mission.prerequisites.length === 0) {
    return true;
  }
  for (let i = 0; i < mission.prerequisites.length; i++) {
    const reqId = mission.prerequisites[i];
    if (!completedMissions[reqId]) {
      return false;
    }
  }
  return true;
}

/**
 * Zwraca listę misji widocznych na danej wersji macOS wraz z informacją o odblokowaniu i ukończeniu.
 */
export interface MissionStatusItem {
  mission: Mission;
  unlocked: boolean;
  completed: boolean;
  completionRecord?: MissionCompletionRecord;
}

export function getVisibleMissionsWithStatus(
  missions: Mission[],
  progress: UserProgressState,
  effectiveOsVersion: string | null
): MissionStatusItem[] {
  return missions
    .filter((m) => isMissionSupportedOnOs(m, effectiveOsVersion))
    .map((mission) => {
      const completionRecord = progress.completedMissions[mission.id];
      return {
        mission,
        unlocked: isMissionUnlocked(mission, progress.completedMissions),
        completed: Boolean(completionRecord),
        completionRecord,
      };
    });
}

/**
 * Wybiera 3 sugerowane misje na ekran Start (pierwsze odblokowane i jeszcze nieukończone z różnych ścieżek,
 * a jeśli mniej niż 3 – uzupełnia kolejnymi odblokowanymi).
 */
export function getSuggestedMissions(
  missions: Mission[],
  progress: UserProgressState,
  effectiveOsVersion: string | null
): Mission[] {
  const statuses = getVisibleMissionsWithStatus(missions, progress, effectiveOsVersion);
  const available = statuses.filter((s) => s.unlocked && !s.completed).map((s) => s.mission);

  const selected: Mission[] = [];
  const usedTracks: Record<string, boolean> = {};

  for (let i = 0; i < available.length && selected.length < 3; i++) {
    const candidate = available[i];
    if (!usedTracks[candidate.track]) {
      selected.push(candidate);
      usedTracks[candidate.track] = true;
    }
  }

  for (let i = 0; i < available.length && selected.length < 3; i++) {
    const candidate = available[i];
    if (selected.indexOf(candidate) === -1) {
      selected.push(candidate);
    }
  }

  if (selected.length < 3) {
    for (let i = 0; i < statuses.length && selected.length < 3; i++) {
      const fallback = statuses[i].mission;
      if (selected.indexOf(fallback) === -1) {
        selected.push(fallback);
      }
    }
  }

  return selected;
}

export interface TrackProgressSummary {
  track: TrackId;
  total: number;
  completed: number;
  percentage: number;
}

export function getTrackProgressSummaries(
  missions: Mission[],
  progress: UserProgressState,
  effectiveOsVersion: string | null
): Record<TrackId, TrackProgressSummary> {
  const tracks: TrackId[] = ['macos', 'programy', 'iphone', 'ai'];
  const visible = getVisibleMissionsWithStatus(missions, progress, effectiveOsVersion);
  const result = {} as Record<TrackId, TrackProgressSummary>;

  for (let i = 0; i < tracks.length; i++) {
    const track = tracks[i];
    const inTrack = visible.filter((item) => item.mission.track === track);
    const total = inTrack.length;
    const completed = inTrack.filter((item) => item.completed).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    result[track] = { track, total, completed, percentage };
  }

  return result;
}

/**
 * Oznacza misję jako ukończoną i automatycznie dodaje jej kartę teorii do przeczytanych.
 */
export function recordMissionCompletion(
  progress: UserProgressState,
  mission: Mission,
  hintsUsed: number,
  completedAtIso: string = new Date().toISOString()
): UserProgressState {
  const theoryId = mission.theory.id || mission.id;
  const readTheoryIds =
    progress.readTheoryIds.indexOf(theoryId) !== -1
      ? progress.readTheoryIds
      : progress.readTheoryIds.concat([theoryId]);

  return {
    ...progress,
    completedMissions: {
      ...progress.completedMissions,
      [mission.id]: {
        missionId: mission.id,
        completedAt: completedAtIso,
        hintsUsed,
      },
    },
    readTheoryIds,
  };
}

/**
 * Oznacza kartę teorii jako przeczytaną.
 */
export function markTheoryRead(
  progress: UserProgressState,
  theoryId: string
): UserProgressState {
  if (progress.readTheoryIds.indexOf(theoryId) !== -1) {
    return progress;
  }
  return {
    ...progress,
    readTheoryIds: progress.readTheoryIds.concat([theoryId]),
  };
}

/**
 * Eksportuje postęp do sformatowanego ciągu JSON.
 */
export function exportProgressToJson(progress: UserProgressState): string {
  return JSON.stringify(progress, null, 2);
}

/**
 * Bezpiecznie importuje i waliduje postęp z ciągu JSON.
 */
export function importProgressFromJson(rawJson: string): UserProgressState {
  const parsed = JSON.parse(rawJson) as Partial<UserProgressState>;
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Nieprawidłowy format pliku z postępem.');
  }
  const completedMissions =
    parsed.completedMissions && typeof parsed.completedMissions === 'object'
      ? parsed.completedMissions
      : {};
  const readTheoryIds = Array.isArray(parsed.readTheoryIds)
    ? parsed.readTheoryIds.filter((id): id is string => typeof id === 'string')
    : [];
  const settings: UserSettings = {
    ...DEFAULT_USER_PROGRESS.settings,
    ...(parsed.settings && typeof parsed.settings === 'object' ? parsed.settings : {}),
  };

  return {
    version: 1,
    completedMissions,
    readTheoryIds,
    settings,
  };
}

/**
 * Dopasowuje nazwę pliku do wzorca (obsługuje proste wyrażenia glob np. "*.png", "*Zrzut*" lub regex).
 */
export function matchesFilePattern(filename: string, pattern: string): boolean {
  if (!pattern || pattern === '*') {
    return true;
  }
  const regexSource = pattern
    .split('|')
    .map((part) =>
      part
        .trim()
        .replace(/[.+^${}()[\]\\]/g, '\\$&')
        .replace(/\*/g, '.*')
        .replace(/\?/g, '.')
    )
    .join('|');
  const regex = new RegExp('^(?:' + regexSource + ')$', 'i');
  return regex.test(filename);
}

/**
 * Uruchamia nasłuchiwanie weryfikacji kroku w czasie rzeczywistym (w trybie prawdziwego Maca).
 * Zwraca funkcję czyszczącą timery i watchery.
 */
export function observeStepVerification(
  step: Step,
  osVersion: string | null,
  adapter: EnvironmentAdapter,
  isRealMacMode: boolean,
  onVerified: (message?: string) => void,
  pollIntervalMs: number = 700
): { resolved: ResolvedStep; stop: () => void } {
  const resolved = resolveStepForEnvironment(step, osVersion, adapter, isRealMacMode);
  const verify = resolved.verify;
  let active = true;
  let timer: ReturnType<typeof setInterval> | null = null;
  let unwatch: (() => void) | null = null;

  const cleanup = () => {
    active = false;
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    if (unwatch) {
      unwatch();
      unwatch = null;
    }
  };

  if (verify.type === 'frontmostApp') {
    const targetApp = verify.app.toLowerCase();
    timer = setInterval(async () => {
      if (!active) return;
      const current = await adapter.frontmostApp();
      if (active && current && current.toLowerCase().indexOf(targetApp) !== -1) {
        cleanup();
        onVerified('Jest! Widzę otwarty program ' + verify.app + '.');
      }
    }, pollIntervalMs);
  } else if (verify.type === 'clipboardContains') {
    const expected = verify.text.toLowerCase();
    timer = setInterval(async () => {
      if (!active) return;
      const clip = await adapter.clipboardText();
      if (!active || clip === null) return;
      if (expected === '*' ? clip.trim().length > 0 : clip.toLowerCase().indexOf(expected) !== -1) {
        cleanup();
        onVerified('Jest! Tekst trafił prosto do schowka.');
      }
    }, pollIntervalMs);
  } else if (verify.type === 'safariUrlContains') {
    const expectedUrl = verify.text.toLowerCase();
    timer = setInterval(async () => {
      if (!active) return;
      const url = await adapter.safariUrl();
      if (!active || !url) return;
      if (url.toLowerCase().indexOf(expectedUrl) !== -1) {
        cleanup();
        onVerified('Jest! Widzę właściwą stronę w Safari.');
      }
    }, pollIntervalMs);
  } else if (verify.type === 'newFile') {
    unwatch = adapter.watchFolder(verify.folder, (file: FileEvent) => {
      if (!active) return;
      if (matchesFilePattern(file.filename, verify.pattern)) {
        cleanup();
        const folderLabel =
          verify.folder.indexOf('Desktop') !== -1
            ? 'na Pulpicie'
            : verify.folder.indexOf('Downloads') !== -1
              ? 'w Pobranych'
              : 'w folderze';
        onVerified('Jest! Widzę go ' + folderLabel + ' (' + file.filename + ').');
      }
    });
  }

  return { resolved, stop: cleanup };
}
