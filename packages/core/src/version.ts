import { Mission, Step, Verification } from '@macknow/missions';
import { Capability, EnvironmentAdapter } from './adapter';

export type MacLookChoice = 'old' | 'new' | 'unknown';
export type SimulatorTheme = 'classic' | 'modern';

export interface ParsedVersion {
  major: number;
  minor: number;
  patch: number;
}

/**
 * Parsuje wersję macOS np. "10.13.6", "12.7", "15.1" do struktury liczbowej.
 */
export function parseOsVersion(versionStr: string | null | undefined): ParsedVersion | null {
  if (!versionStr) {
    return null;
  }
  const clean = versionStr.trim().replace(/^v/i, '');
  const match = clean.match(/^(\d+)(?:\.(\d+))?(?:\.(\d+))?/);
  if (!match) {
    return null;
  }
  return {
    major: parseInt(match[1], 10),
    minor: match[2] !== undefined ? parseInt(match[2], 10) : 0,
    patch: match[3] !== undefined ? parseInt(match[3], 10) : 0,
  };
}

/**
 * Porównuje dwie wersje: zwraca -1 gdy a < b, 0 gdy a == b, 1 gdy a > b.
 */
export function compareVersions(a: ParsedVersion, b: ParsedVersion): number {
  if (a.major !== b.major) {
    return a.major < b.major ? -1 : 1;
  }
  if (a.minor !== b.minor) {
    return a.minor < b.minor ? -1 : 1;
  }
  if (a.patch !== b.patch) {
    return a.patch < b.patch ? -1 : 1;
  }
  return 0;
}

function evaluateSingleConstraint(version: ParsedVersion, constraint: string): boolean {
  const match = constraint.trim().match(/^(<=|>=|<|>|=)?\s*(\d+(?:\.\d+)*)$/);
  if (!match) {
    return false;
  }
  const operator = match[1] || '=';
  const target = parseOsVersion(match[2]);
  if (!target) {
    return false;
  }
  const cmp = compareVersions(version, target);
  switch (operator) {
    case '<':
      return cmp < 0;
    case '<=':
      return cmp <= 0;
    case '>':
      return cmp > 0;
    case '>=':
      return cmp >= 0;
    case '=':
    default:
      return cmp === 0;
  }
}

/**
 * Sprawdza, czy podana wersja macOS (np. "10.14.6" lub "13.6") pasuje do zakresu semver
 * np. "<13", ">=13", ">=10.13 <11", ">=10.14 <13".
 */
export function matchesOsRange(osVersion: string | null | undefined, osRange: string): boolean {
  const parsed = parseOsVersion(osVersion);
  if (!parsed) {
    return false;
  }
  const parts = osRange
    .trim()
    .split(/\s+(?=[<>=\d])/g)
    .map((s) => s.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return false;
  }

  for (let i = 0; i < parts.length; i++) {
    if (!evaluateSingleConstraint(parsed, parts[i])) {
      return false;
    }
  }
  return true;
}

/**
 * Sprawdza, czy misja jest dostępna na danej wersji systemu (wg minOsVersion).
 * Gdy wersja systemu nie jest znana (null), misja pozostaje widoczna.
 */
export function isMissionSupportedOnOs(
  mission: Pick<Mission, 'minOsVersion'>,
  osVersion: string | null | undefined
): boolean {
  if (!mission.minOsVersion || !osVersion) {
    return true;
  }
  return matchesOsRange(osVersion, '>=' + mission.minOsVersion);
}

/**
 * Przekształca wybór wizualny użytkowniczki („Mój Mac wygląda tak”) na reprezentatywną wersję macOS,
 * jeśli nie wykryto prawdziwej wersji ani ręcznego nadpisania.
 */
export function resolveEffectiveOsVersion(
  detectedVersion: string | null,
  manualOverride: string | null,
  macLook: MacLookChoice
): string | null {
  if (manualOverride && manualOverride.trim().length > 0) {
    return manualOverride.trim();
  }
  if (detectedVersion && detectedVersion.trim().length > 0) {
    return detectedVersion.trim();
  }
  if (macLook === 'old') {
    return '10.14.6'; // Mojave / Catalina – klasyczne Preferencje systemowe w siatce
  }
  if (macLook === 'new') {
    return '14.5'; // Sonoma / Sequoia – nowe Ustawienia systemowe z listą boczną
  }
  return null;
}

/**
 * Określa motyw symulatora ('classic' dla macOS <= 12, 'modern' dla macOS >= 13 lub domyślnie).
 */
export function resolveSimulatorTheme(
  effectiveOsVersion: string | null,
  macLook: MacLookChoice
): SimulatorTheme {
  if (effectiveOsVersion) {
    return matchesOsRange(effectiveOsVersion, '<13') ? 'classic' : 'modern';
  }
  return macLook === 'old' ? 'classic' : 'modern';
}

export interface ResolvedStep {
  instruction: string;
  hint?: string;
  hint2?: string;
  verify: Verification;
  simulatorScene?: string;
  verifyNeeded?: boolean;
  matchedVariantRange?: string;
}

function capabilityForVerification(verify: Verification): Capability | null {
  switch (verify.type) {
    case 'frontmostApp':
      return 'frontmostApp';
    case 'newFile':
      return 'watchFolder';
    case 'clipboardContains':
      return 'clipboardText';
    case 'safariUrlContains':
      return 'safariUrl';
    default:
      return null;
  }
}

/**
 * Wybiera odpowiedni wariant kroku dla danej wersji systemu macOS oraz degraduje metodę weryfikacji,
 * jeśli działamy w przeglądarce lub dana funkcja jest niedostępna na starszym systemie.
 */
export function resolveStepForEnvironment(
  step: Step,
  osVersion: string | null,
  adapter: EnvironmentAdapter,
  isRealMacMode: boolean
): ResolvedStep {
  let instruction = step.instruction;
  let hint = step.hint;
  let hint2 = step.hint2;
  let simulatorScene = step.simulatorScene;
  let verifyNeeded = step.verifyNeeded;
  let matchedVariantRange: string | undefined;

  if (osVersion && step.variants && step.variants.length > 0) {
    for (let i = 0; i < step.variants.length; i++) {
      const variant = step.variants[i];
      if (matchesOsRange(osVersion, variant.osRange)) {
        instruction = variant.instruction;
        if (variant.hint !== undefined) {
          hint = variant.hint;
        }
        if (variant.hint2 !== undefined) {
          hint2 = variant.hint2;
        }
        if (variant.simulatorScene !== undefined) {
          simulatorScene = variant.simulatorScene;
        }
        if (variant.verifyNeeded !== undefined) {
          verifyNeeded = variant.verifyNeeded;
        }
        matchedVariantRange = variant.osRange;
        break;
      }
    }
  }

  let verify: Verification = step.verify;

  if (!isRealMacMode) {
    // W trybie web każda weryfikacja inna niż 'manual' i 'simulatorAction' degraduje się do 'manual'
    if (verify.type !== 'manual' && verify.type !== 'simulatorAction') {
      verify = { type: 'manual' };
    }
  } else {
    // W trybie prawdziwego Maca sprawdzamy, czy dany adapter wspiera tę funkcję na bieżącej wersji macOS
    const requiredCapability = capabilityForVerification(verify);
    if (requiredCapability && !adapter.isAvailable(requiredCapability)) {
      verify = { type: 'manual' };
    }
    // W trybie prawdziwego Maca kroki symulatora mogą być potwierdzane ręcznie, jeśli nie mają odpowiednika systemowego
    if (verify.type === 'simulatorAction') {
      verify = { type: 'manual' };
    }
  }

  return {
    instruction,
    hint,
    hint2,
    verify,
    simulatorScene,
    verifyNeeded,
    matchedVariantRange,
  };
}
