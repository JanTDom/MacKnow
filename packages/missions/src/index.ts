export * from './types';
export * from './macos-missions';
export * from './programy-missions';
export * from './iphone-missions';
export * from './ai-missions';

import { Mission, TheoryCard } from './types';
import { MACOS_MISSIONS } from './macos-missions';
import { PROGRAMY_MISSIONS } from './programy-missions';
import { IPHONE_MISSIONS } from './iphone-missions';
import { AI_MISSIONS } from './ai-missions';

/**
 * Pełna baza wszystkich 32 misji MacKnow (10 macOS + 10 Programy + 6 iPhone + 6 AI).
 */
export const ALL_MISSIONS: Mission[] = [
  ...MACOS_MISSIONS,
  ...PROGRAMY_MISSIONS,
  ...IPHONE_MISSIONS,
  ...AI_MISSIONS,
];

export const EXTRA_THEORY_CARDS: TheoryCard[] = [];
