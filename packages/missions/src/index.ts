export * from './types';
export * from './macos-missions';

import { Mission, TheoryCard } from './types';
import { MACOS_MISSIONS } from './macos-missions';

export const ALL_MISSIONS: Mission[] = [...MACOS_MISSIONS];
export const EXTRA_THEORY_CARDS: TheoryCard[] = [];
