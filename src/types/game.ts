export type StatName = 'health' | 'happiness' | 'intelligence' | 'charisma' | 'strength' | 'reputation';

export type Gender = 'male' | 'female' | 'non-binary';

export interface Relationship {
  id: string;
  name: string;
  type: 'parent' | 'sibling' | 'spouse' | 'child' | 'friend';
  relationship: number; // 0 to 100
  status: 'alive' | 'dead';
  age: number;
}

export interface Career {
  id: string;
  title: string;
  salary: number;
  description: string;
  requirements: {
    minAge?: number;
    minStats?: Partial<Record<StatName, number>>;
    requiredCareerId?: string;
  };
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'item' | 'property' | 'business';
  cost: number;
  income: number; // Positive is profit, negative is maintenance cost
  description: string;
}

export interface EventOutcome {
  text: string | Record<string, string>;
  statChanges?: Partial<Record<StatName, number | Record<string, number>>>;
  goldChange?: number | Record<string, number>;
  itemReward?: Omit<InventoryItem, 'id'>;
  removeItemName?: string;
  relationshipChange?: {
    type: 'spouse' | 'child' | 'friend' | 'modify';
    name?: string;
    amount?: number;
    relationId?: string; // used for updating existing relation
  };
  careerChange?: {
    type: 'hire' | 'fire' | 'promote';
    careerId?: string;
    careerTitle?: string;
    salary?: number;
  };
  titleChange?: string;
  death?: boolean;
  deathReason?: string;
  logText: string | Record<string, string>;
}

export interface ChanceOutcome {
  chance: number; // 0 to 100
  outcome: EventOutcome;
}

export interface Choice {
  text: string | Record<string, string>;
  moralityShift?: number; // Positive for Honor, negative for Infamy
  requirements?: {
    minStats?: Partial<Record<StatName, number>>;
    minGold?: number;
    careerId?: string;
  };
  outcomes: ChanceOutcome[]; // The sum of chances should be 100
}

export interface GameEvent {
  id: string;
  title: string;
  text: string | Record<string, string>;
  weight: number; // default base weight (e.g., 10)
  requirements?: {
    minAge?: number;
    maxAge?: number;
    careerId?: string;
    hasSpouse?: boolean;
    hasChildren?: boolean;
    activeWorldEventId?: string;
    minStats?: Partial<Record<StatName, number>>;
  };
  choices: Choice[];
}

export interface WorldEvent {
  id: string;
  name: string;
  description: string;
  duration: number; // in years
  effectsText: string;
  modifiers?: {
    incomeMultiplier?: number;
    healthDrain?: number;
    eventWeightModifiers?: Record<string, number>; // eventId -> weight multiplier
  };
}

export interface Character {
  name: string;
  dynastyName: string;
  gender: Gender;
  age: number;
  stats: Record<StatName, number>;
  gold: number;
  title: string;
  career?: {
    id: string;
    title: string;
    salary: number;
    performance: number; // 0 to 100
  };
  relationships: Relationship[];
  inventory: InventoryItem[];
  journal: string[];
  isDead: boolean;
  deathReason?: string;
}

export interface DynastyHistoryEntry {
  generation: number;
  name: string;
  dynastyName: string;
  age: number;
  gold: number;
  titleReached: string;
  summary: string;
}

export interface ExpansionTheme {
  fontTitle: string;
  fontBody: string;
  primary: string;
  primaryHover: string;
  accent: string;
  bgStart: string;
  bgEnd: string;
  panelBg: string;
  panelBorder: string;
  primaryGlow: string;
  textMain: string;
  textSub: string;
  textHeading: string;
  cardBg: string;
  cardBorder: string;
  borderRadius: string;
}

export interface FamilyBackground {
  id: string;
  name: string;
  weight: number;
  titleMale: string;
  titleFemale: string;
  titleNonBinary: string;
  gold: number;
  statModifiers: Partial<Record<StatName, number>>;
  journalText: string;
}

export interface Expansion {
  id: string;
  name: string;
  theme: ExpansionTheme;
  moralityLabels: {
    honor: string; // Left side of meter
    infamy: string; // Right side of meter
  };
  statLabels: Record<StatName, string>;
  careers: Career[];
  activities: {
    id: string;
    name: string;
    description: string;
    cost: number;
    category: 'study' | 'crime' | 'gamble' | 'social' | 'health';
  }[];
  events: GameEvent[];
  worldEvents: Omit<WorldEvent, 'duration'>[];
  itemPool: Omit<InventoryItem, 'id'>[];
  names: {
    male: string[];
    female: string[];
    last: string[];
  };
  startingTitles: string[];
  startingBackgrounds: FamilyBackground[];
}
