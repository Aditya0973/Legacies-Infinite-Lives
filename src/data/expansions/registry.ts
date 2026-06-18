import type { Expansion } from '../../types/game';
import { fantasyExpansion } from './fantasy';
import { pirateExpansion } from './pirate';

export const EXPANSIONS: Record<string, Expansion> = {
  fantasy: fantasyExpansion,
  pirate: pirateExpansion
};

export const getExpansion = (id: string): Expansion => {
  return EXPANSIONS[id] || fantasyExpansion;
};

export const getAvailableExpansions = (): { id: string; name: string; description: string }[] => {
  return [
    {
      id: 'fantasy',
      name: 'Fantasy Realms',
      description: 'An era of magic, dragons, cathedral sieges, and chivalric knights.'
    }
  ];
};
