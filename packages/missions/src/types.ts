import { formatPolishTypography, TrackId } from '@macknow/ui';

export type { TrackId };

export interface TheoryCard {
  id?: string;
  category?: string;
  title: string;
  metaphor: string;
  story: string;
  realExplanation: string;
  oneLiner: string;
  commonMyth?: string;
  illustrationId: string;
  verifyNeeded?: boolean;
}

export type Verification =
  | { type: 'manual' }
  | { type: 'frontmostApp'; app: string }
  | { type: 'newFile'; folder: string; pattern: string }
  | { type: 'clipboardContains'; text: string }
  | { type: 'safariUrlContains'; text: string }
  | { type: 'simulatorAction'; action: string };

export interface StepVariant {
  osRange: string;
  instruction: string;
  hint?: string;
  hint2?: string;
  simulatorScene?: string;
  verifyNeeded?: boolean;
}

export interface Step {
  instruction: string;
  hint?: string;
  hint2?: string;
  verify: Verification;
  simulatorScene?: string;
  verifyNeeded?: boolean;
  variants?: StepVariant[];
}

export interface Mission {
  id: string;
  track: TrackId;
  level: 1 | 2 | 3;
  title: string;
  realLifeHook: string;
  estimatedMinutes: number;
  prerequisites: string[];
  theory: TheoryCard;
  steps: Step[];
  reward: string;
  minOsVersion?: string;
  synonyms?: string[];
}

/**
 * Przepuszcza wszystkie pola tekstowe karty teorii przez formatPolishTypography.
 */
export function polishTheoryCard(card: TheoryCard): TheoryCard {
  return {
    ...card,
    title: formatPolishTypography(card.title),
    metaphor: formatPolishTypography(card.metaphor),
    story: formatPolishTypography(card.story),
    realExplanation: formatPolishTypography(card.realExplanation),
    oneLiner: formatPolishTypography(card.oneLiner),
    commonMyth: card.commonMyth ? formatPolishTypography(card.commonMyth) : undefined,
  };
}

/**
 * Przepuszcza wszystkie pola tekstowe misji przez formatPolishTypography.
 */
export function polishMission(mission: Mission): Mission {
  return {
    ...mission,
    title: formatPolishTypography(mission.title),
    realLifeHook: formatPolishTypography(mission.realLifeHook),
    reward: formatPolishTypography(mission.reward),
    theory: polishTheoryCard(mission.theory),
    steps: mission.steps.map((step) => ({
      ...step,
      instruction: formatPolishTypography(step.instruction),
      hint: step.hint ? formatPolishTypography(step.hint) : undefined,
      hint2: step.hint2 ? formatPolishTypography(step.hint2) : undefined,
      variants: step.variants
        ? step.variants.map((variant) => ({
            ...variant,
            instruction: formatPolishTypography(variant.instruction),
            hint: variant.hint ? formatPolishTypography(variant.hint) : undefined,
            hint2: variant.hint2 ? formatPolishTypography(variant.hint2) : undefined,
          }))
        : undefined,
    })),
  };
}
