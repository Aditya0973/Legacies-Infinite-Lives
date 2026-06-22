import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { 
  Character, 
  Relationship, 
  Career, 
  InventoryItem, 
  GameEvent, 
  WorldEvent, 
  Gender, 
  StatName, 
  Choice, 
  EventOutcome, 
  DynastyHistoryEntry,
  Expansion
} from '../types/game';
import { getExpansion } from '../data/expansions/registry';
import { saveSystem } from '../systems/SaveSystem';
import type { SlotMeta } from '../systems/SaveSystem';
import { gameAudio } from '../systems/SoundSystem';

interface GameContextType {
  activeExpansion: Expansion;
  character: Character | null;
  lineage: DynastyHistoryEntry[];
  worldEvent: WorldEvent | null;
  currentEvent: GameEvent | null;
  currentEventOutcome: EventOutcome | null;
  isPlaying: boolean;
  saveSlots: Record<string, SlotMeta>;
  activeSlotId: string;
  soundEnabled: boolean;
  
  // Actions
  selectExpansion: (id: string) => void;
  startNewLife: (name: string, dynastyName: string, gender: Gender) => void;
  ageOneYear: () => void;
  chooseChoice: (choice: Choice) => void;
  clearOutcome: () => void;
  interactWithRelation: (relationId: string, action: 'chat' | 'gift' | 'insult' | 'propose' | 'ask_gold') => void;
  applyForJob: (career: Career) => boolean;
  workHard: () => void;
  resignJob: () => void;
  askForPromotion: () => boolean;
  buyItem: (item: Omit<InventoryItem, 'id'>) => boolean;
  performActivity: (activityId: string) => void;
  selectHeirAndContinue: (childId: string) => void;
  toggleSound: () => void;
  saveGame: () => void;
  loadGame: (slotId: string) => void;
  deleteSlot: (slotId: string) => void;
  quitToMenu: () => void;
}

const resolveText = (
  textObj: string | Record<string, string>, 
  careerId?: string, 
  expansionId?: string
): string => {
  if (typeof textObj === 'string') return textObj;
  if (!textObj) return '';
  if (careerId && textObj[careerId]) return textObj[careerId];
  if (expansionId && textObj[expansionId]) return textObj[expansionId];
  return textObj.default || textObj[Object.keys(textObj)[0]] || '';
};

const resolveNumber = (val: any, careerId?: string): number => {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  if (careerId && val[careerId] !== undefined) return val[careerId];
  return val.default || 0;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeExpansion, setActiveExpansion] = useState<Expansion>(getExpansion('fantasy'));
  const [character, setCharacter] = useState<Character | null>(null);
  const [lineage, setLineage] = useState<DynastyHistoryEntry[]>([]);
  const [worldEvent, setWorldEvent] = useState<WorldEvent | null>(null);
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [currentEventOutcome, setCurrentEventOutcome] = useState<EventOutcome | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [saveSlots, setSaveSlots] = useState<Record<string, SlotMeta>>({});
  const [activeSlotId, setActiveSlotId] = useState<string>('slot_1');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const preGeneratedEventRef = useRef<GameEvent | null>(null);
  const isPreGeneratingRef = useRef<boolean>(false);

  const preGenerateNextEvent = async (char: Character, exp: Expansion) => {
    if (isPreGeneratingRef.current) return;
    
    const nextAge = char.age + 1;
    if (nextAge < 5) return;
    
    isPreGeneratingRef.current = true;
    try {
      const honor = char.stats.reputation;
      const infamy = 100 - char.stats.reputation;
      
      const relationshipsSummary = char.relationships
        .map(r => `${r.type} ${r.name} (${r.status}, age ${r.age + 1}, relationship ${r.relationship})`)
        .join(', ');

      const compactState = {
        age: nextAge,
        career: char.career?.title || 'None',
        familyBackground: exp.startingBackgrounds.find(b => b.id === char.familyBackgroundId)?.name || char.familyBackgroundId,
        traits: char.traits,
        honor,
        infamy,
        gold: char.gold,
        relationshipsSummary,
        expansion: exp.name
      };

      const response = await fetch('/api/generate-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(compactState)
      });

      if (response.ok) {
        const rawEvent = await response.json();
        preGeneratedEventRef.current = rawEvent;
      } else {
        console.warn("Failed to pre-generate event, status:", response.status);
        preGeneratedEventRef.current = null;
      }
    } catch (err) {
      console.error("Error pre-generating event:", err);
      preGeneratedEventRef.current = null;
    } finally {
      isPreGeneratingRef.current = false;
    }
  };

  // Load active slots and config on mount
  useEffect(() => {
    setSaveSlots(saveSystem.getSlots());
    const savedSlot = saveSystem.getActiveSlotId();
    setActiveSlotId(savedSlot);
  }, []);

  // Handle background music playback based on active expansion and play state
  useEffect(() => {
    if (isPlaying && activeExpansion && soundEnabled) {
      gameAudio.startMusic(activeExpansion.id);
    } else {
      gameAudio.stopMusic();
    }
    return () => {
      gameAudio.stopMusic();
    };
  }, [isPlaying, activeExpansion?.id, soundEnabled]);

  const selectExpansion = (id: string) => {
    const exp = getExpansion(id);
    setActiveExpansion(exp);
    gameAudio.playClick();
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    gameAudio.setEnabled(newState);
    gameAudio.playClick();
  };

  const generateRandomName = (gender: Gender, exp: Expansion): { first: string; last: string } => {
    const firstList = gender === 'male' 
      ? exp.names.male 
      : gender === 'female' 
        ? exp.names.female 
        : [...exp.names.male, ...exp.names.female];
    const lastList = exp.names.last;

    const first = firstList[Math.floor(Math.random() * firstList.length)];
    const last = lastList[Math.floor(Math.random() * lastList.length)];
    return { first, last };
  };

  const rollStats = (): Record<StatName, number> => {
    const rollSkill = () => Math.floor(Math.random() * 30) + 25; // 25 to 55 for skills
    const rollVital = () => Math.floor(Math.random() * 15) + 80; // 80 to 95 for vitals
    return {
      health: rollVital(),
      happiness: rollVital(),
      intelligence: rollSkill(),
      charisma: rollSkill(),
      strength: rollSkill(),
      reputation: 50
    };
  };

  const startNewLife = (customName: string, customDynastyName: string, gender: Gender) => {
    // 1. Select dynamic starting background based on weight
    const totalWeight = activeExpansion.startingBackgrounds.reduce((sum, b) => sum + b.weight, 0);
    let roll = Math.random() * totalWeight;
    let selectedBg = activeExpansion.startingBackgrounds[0];
    
    for (const bg of activeExpansion.startingBackgrounds) {
      roll -= bg.weight;
      if (roll <= 0) {
        selectedBg = bg;
        break;
      }
    }

    // 2. Roll base attributes and apply background modifiers
    const baseRollSkill = () => Math.floor(Math.random() * 20) + 30; // 30 to 50 base for skills
    const baseRollVital = () => Math.floor(Math.random() * 15) + 80; // 80 to 95 base for health
    const stats: Record<StatName, number> = {
      health: Math.max(20, Math.min(100, baseRollVital() + (selectedBg.statModifiers.health || 0))),
      happiness: 80,
      intelligence: Math.max(5, Math.min(100, baseRollSkill() + (selectedBg.statModifiers.intelligence || 0))),
      charisma: Math.max(5, Math.min(100, baseRollSkill() + (selectedBg.statModifiers.charisma || 0))),
      strength: Math.max(5, Math.min(100, baseRollSkill() + (selectedBg.statModifiers.strength || 0))),
      reputation: Math.max(5, Math.min(100, 50 + (selectedBg.statModifiers.reputation || 0)))
    };

    // 3. Setup title and gold from background
    const startingTitle = gender === 'male' 
      ? selectedBg.titleMale 
      : gender === 'female' 
        ? selectedBg.titleFemale 
        : selectedBg.titleNonBinary;
        
    const startingGold = selectedBg.gold;

    const generated = generateRandomName(gender, activeExpansion);
    const name = customName.trim() || generated.first;
    const dynastyName = customDynastyName.trim() || generated.last;
    
    // Generate initial parents
    const parentLast = dynastyName;
    const motherFirst = activeExpansion.names.female[Math.floor(Math.random() * activeExpansion.names.female.length)];
    const fatherFirst = activeExpansion.names.male[Math.floor(Math.random() * activeExpansion.names.male.length)];

    const initialRelationships: Relationship[] = [
      {
        id: 'mother',
        name: `${motherFirst} ${parentLast}`,
        type: 'parent',
        relationship: Math.floor(Math.random() * 30) + 60, // 60 to 90
        status: 'alive',
        age: Math.floor(Math.random() * 15) + 20 // 20 to 35
      },
      {
        id: 'father',
        name: `${fatherFirst} ${parentLast}`,
        type: 'parent',
        relationship: Math.floor(Math.random() * 30) + 60,
        status: 'alive',
        age: Math.floor(Math.random() * 15) + 22 // 22 to 37
      }
    ];

    const journalText = `Born a ${gender} child. ${selectedBg.journalText} Parents: Mother ${initialRelationships[0].name}, Father ${initialRelationships[1].name}.`;

    const newChar: Character = {
      name,
      dynastyName,
      gender,
      age: 0,
      stats,
      gold: startingGold,
      title: startingTitle,
      familyBackgroundId: selectedBg.id,
      traits: [],
      relationships: initialRelationships,
      inventory: [],
      journal: [journalText],
      isDead: false,
      yearlyActions: {
        interactedRelations: [],
        activitiesPerformed: []
      }
    };

    setCharacter(newChar);
    setLineage([]);
    setWorldEvent(null);
    setCurrentEvent(null);
    setCurrentEventOutcome(null);
    setIsPlaying(true);
    
    gameAudio.playLevelUp();

    // Auto-save initial state
    const currentSave = {
      character: newChar,
      activeExpansionId: activeExpansion.id,
      worldEvent: null,
      lineage: []
    };
    saveSystem.saveGame(activeSlotId, currentSave);
    setSaveSlots(saveSystem.getSlots());

    preGenerateNextEvent(newChar, activeExpansion);
  };

  const applyForJob = (career: Career): boolean => {
    if (!character || character.isDead) return false;
    
    // Check age requirement
    if (career.requirements.minAge && character.age < career.requirements.minAge) {
      return false;
    }

    // Check stats requirement
    if (career.requirements.minStats) {
      for (const [stat, val] of Object.entries(career.requirements.minStats)) {
        if (character.stats[stat as StatName] < (val || 0)) {
          return false;
        }
      }
    }

    // Check pre-requisite career
    if (career.requirements.requiredCareerId && character.career?.id !== career.requirements.requiredCareerId) {
      return false;
    }

    setCharacter(prev => {
      if (!prev) return null;
      return {
        ...prev,
        career: {
          id: career.id,
          title: career.title,
          salary: career.salary,
          performance: 50
        },
        journal: [...prev.journal, `Began working as a ${career.title} (Salary: ${career.salary} Gold/yr).`]
      };
    });
    
    gameAudio.playMoney();
    return true;
  };

  const workHard = () => {
    if (!character || !character.career) return;
    if (character.yearlyActions?.workedHard) {
      gameAudio.playFail();
      return;
    }
    
    setCharacter(prev => {
      if (!prev || !prev.career) return null;
      const newPerf = Math.min(100, prev.career.performance + 15);
      const newHappiness = Math.max(0, prev.stats.happiness - 4);
      const newHealth = Math.max(0, prev.stats.health - 2);

      return {
        ...prev,
        stats: {
          ...prev.stats,
          happiness: newHappiness,
          health: newHealth
        },
        career: {
          ...prev.career,
          performance: newPerf
        },
        journal: [...prev.journal, `Worked hard at your job as a ${prev.career.title}. Performance increased.`],
        yearlyActions: {
          interactedRelations: prev.yearlyActions?.interactedRelations || [],
          activitiesPerformed: prev.yearlyActions?.activitiesPerformed || [],
          workedHard: true
        }
      };
    });
    gameAudio.playClick();
  };

  const resignJob = () => {
    if (!character || !character.career) return;
    
    setCharacter(prev => {
      if (!prev || !prev.career) return null;
      return {
        ...prev,
        career: undefined,
        journal: [...prev.journal, `Resigned from your career as a ${prev.career.title}.`]
      };
    });
    gameAudio.playClick();
  };

  const askForPromotion = (): boolean => {
    if (!character || character.isDead || !character.career) return false;
    
    const nextCareer = activeExpansion.careers.find(c => c.requirements.requiredCareerId === character.career?.id);
    if (!nextCareer) {
      setCharacter(prev => {
        if (!prev) return null;
        return {
          ...prev,
          journal: [...prev.journal, "You requested a promotion, but you are already at the peak of your career track!"]
        };
      });
      gameAudio.playFail();
      return false;
    }

    if (character.career.performance < 80) {
      setCharacter(prev => {
        if (!prev) return null;
        return {
          ...prev,
          journal: [...prev.journal, `Asked for a promotion, but your supervisor refused: "Your performance (${prev.career?.performance}%) is not high enough. We expect at least 80%."`]
        };
      });
      gameAudio.playFail();
      return false;
    }

    const failedStats: string[] = [];
    if (nextCareer.requirements.minStats) {
      for (const [stat, val] of Object.entries(nextCareer.requirements.minStats)) {
        if (character.stats[stat as StatName] < (val || 0)) {
          const label = activeExpansion.statLabels[stat as StatName] || stat;
          failedStats.push(label);
        }
      }
    }

    if (failedStats.length > 0) {
      setCharacter(prev => {
        if (!prev) return null;
        return {
          ...prev,
          journal: [...prev.journal, `Asked for a promotion, but you were rejected. They feel you lack the necessary qualifications: (${failedStats.join(', ')}).`]
        };
      });
      gameAudio.playFail();
      return false;
    }

    setCharacter(prev => {
      if (!prev) return null;
      const promoted = {
        id: nextCareer.id,
        title: nextCareer.title,
        salary: nextCareer.salary,
        performance: 40
      };
      return {
        ...prev,
        career: promoted,
        journal: [...prev.journal, `🎉 Promoted to ${nextCareer.title}! Your new salary is ${nextCareer.salary} Gold.` ]
      };
    });

    gameAudio.playLevelUp();
    return true;
  };

  const buyItem = (itemTemplate: Omit<InventoryItem, 'id'>): boolean => {
    if (!character || character.isDead) return false;
    if (character.gold < itemTemplate.cost) {
      gameAudio.playFail();
      return false;
    }

    if (itemTemplate.type === 'property') {
      const count = character.inventory.filter(i => i.type === 'property').length;
      if (count >= 3) {
        gameAudio.playFail();
        return false;
      }
    }

    if (itemTemplate.type === 'business') {
      const count = character.inventory.filter(i => i.type === 'business').length;
      if (count >= 2) {
        gameAudio.playFail();
        return false;
      }
    }

    const newItem: InventoryItem = {
      ...itemTemplate,
      id: `item_${Date.now()}_${Math.floor(Math.random() * 1000)}`
    };

    setCharacter(prev => {
      if (!prev) return null;
      
      // Charisma / Might boost templates based on name
      const statsBoost: Partial<Record<StatName, number>> = {};
      if (newItem.name.includes('Sword') || newItem.name.includes('Pistol')) {
        statsBoost.strength = Math.min(100, prev.stats.strength + 10);
      }
      if (newItem.name.includes('Wand') || newItem.name.includes('Sextant')) {
        statsBoost.intelligence = Math.min(100, prev.stats.intelligence + 10);
      }
      if (newItem.name.includes('Horse') || newItem.name.includes('Castle') || newItem.name.includes('Galleon')) {
        statsBoost.charisma = Math.min(100, prev.stats.charisma + 12);
        statsBoost.happiness = Math.min(100, prev.stats.happiness + 8);
      }

      return {
        ...prev,
        gold: prev.gold - newItem.cost,
        inventory: [...prev.inventory, newItem],
        stats: {
          ...prev.stats,
          ...statsBoost
        },
        journal: [...prev.journal, `Purchased ${newItem.name} for ${newItem.cost} Gold.`]
      };
    });

    gameAudio.playMoney();
    return true;
  };

  const performActivity = (activityId: string) => {
    if (!character || character.isDead) return;
    const performedActivities = character.yearlyActions?.activitiesPerformed || [];
    if (performedActivities.includes(activityId)) {
      gameAudio.playFail();
      return;
    }

    const activity = activeExpansion.activities.find(a => a.id === activityId);
    if (!activity) return;

    if (character.gold < activity.cost) {
      gameAudio.playFail();
      return;
    }

    // Special Activity: Dungeon Delve (Triggers custom interactive Event Modal)
    if (activityId === 'dungeon_raid') {
      // 1. Charge the initial entrance cost
      setCharacter(prev => {
        if (!prev) return null;
        return {
          ...prev,
          gold: prev.gold - activity.cost,
          yearlyActions: {
            interactedRelations: prev.yearlyActions?.interactedRelations || [],
            activitiesPerformed: [...(prev.yearlyActions?.activitiesPerformed || []), activityId]
          }
        };
      });

      const companions = character.relationships.filter(
        r => r.status === 'alive' && (r.type === 'friend' || r.type === 'sibling' || r.type === 'spouse')
      );

      const choices: Choice[] = [
        {
          text: "Delve alone (Keep all loot, high risk)",
          outcomes: [
            {
              chance: 55,
              outcome: {
                text: "You successfully disarmed the traps and routed the skeleton guardians, emerging with a heavy treasure sack!",
                logText: "Successfully raided the Whispering Crypts alone.",
                goldChange: 220,
                statChanges: { health: -10, happiness: 20 },
                addTraits: ["Brave"]
              }
            },
            {
              chance: 45,
              outcome: {
                text: "You tripped a poison dart plate and were ambushed by monsters. You barely escaped with your life!",
                logText: "Failed a dungeon delve and got injured.",
                goldChange: 0,
                statChanges: { health: -35, happiness: -15 }
              }
            }
          ]
        }
      ];

      if (companions.length > 0) {
        const comp = companions[Math.floor(Math.random() * companions.length)];
        choices.push({
          text: `Delve with your ${comp.type} ${comp.name} (Share loot, lower risk)`,
          outcomes: [
            {
              chance: 75,
              outcome: {
                text: `With ${comp.name} watching your back, you bypass the traps easily and split a massive treasure chest!`,
                logText: `Raided the Whispering Crypts with ${comp.name}.`,
                goldChange: 110,
                statChanges: { happiness: 15 },
                relationshipChange: {
                  type: 'modify',
                  relationId: comp.id,
                  amount: 15
                }
              }
            },
            {
              chance: 25,
              outcome: {
                text: `An ancient stone trap collapsed! You tried to pull ${comp.name} back, but they were crushed under the rubble. You fled in horror.`,
                logText: `${comp.name} died in the Whispering Crypts.`,
                goldChange: 0,
                statChanges: { happiness: -40 },
                relationshipChange: {
                  type: 'modify',
                  relationId: comp.id,
                  status: 'dead'
                }
              }
            }
          ]
        });
      }

      choices.push({
        text: "Turn back at the gates",
        outcomes: [
          {
            chance: 100,
            outcome: {
              text: "You decide the risk is too great and leave the crypts, retrieving your supplies.",
              logText: "Turned back from the Whispering Crypts.",
              goldChange: activity.cost // refund cost
            }
          }
        ]
      });

      const dungeonEvent: GameEvent = {
        id: 'activity_dungeon_raid_event',
        title: 'The Whispering Crypts',
        text: 'You stand at the mouth of the ancient tomb. A chilly wind blows from within, smelling of decay and old gold.',
        weight: 0,
        choices
      };

      setCurrentEvent(dungeonEvent);
      gameAudio.playClick();
      return;
    }

    setCharacter(prev => {
      if (!prev) return null;

      let goldCost = activity.cost;
      let newStats = { ...prev.stats };
      let logs = [...prev.journal];
      let relationships = [...prev.relationships];
      let currentGold = prev.gold - goldCost;
      let traits = [...prev.traits];

      if (activity.id === 'study_arcane' || activity.id === 'study_charts') {
        newStats.intelligence = Math.min(100, newStats.intelligence + 10);
        newStats.happiness = Math.max(0, newStats.happiness - 2);
        logs.push(`Studied local books and ancient charts. Knowledge increased.`);
        gameAudio.playClick();
      } 
      else if (activity.id === 'swordplay' || activity.id === 'climb_rigging') {
        newStats.strength = Math.min(100, newStats.strength + 8);
        newStats.health = Math.min(100, newStats.health + 4);
        newStats.happiness = Math.min(100, newStats.happiness + 2);
        logs.push(`Trained your body vigorously. Might and physical build increased.`);
        gameAudio.playClick();
      } 
      else if (activity.id === 'dice_game' || activity.id === 'liars_dice') {
        const win = Math.random() > 0.52; // Slightly house favored
        if (win) {
          currentGold += goldCost * 2;
          newStats.happiness = Math.min(100, newStats.happiness + 15);
          logs.push(`Won a tense dice game in the local tavern. Earned ${goldCost} Gold!`);
          gameAudio.playMoney();
        } else {
          newStats.happiness = Math.max(0, newStats.happiness - 15);
          logs.push(`Lost ${goldCost} Gold playing dice in the tavern.`);
          gameAudio.playFail();
        }
      } 
      else if (activity.id === 'pickpocket' || activity.id === 'smuggle_rum') {
        const success = Math.random() > 0.45; // 55% success chance
        if (success) {
          const loot = activity.id === 'pickpocket' 
            ? Math.floor(Math.random() * 25) + 10
            : Math.floor(Math.random() * 60) + 30;
          currentGold += loot;
          newStats.happiness = Math.min(100, newStats.happiness + 10);
          newStats.reputation = Math.max(0, newStats.reputation - 6);
          logs.push(`Successfully completed theft. Obtained ${loot} Gold!`);
          gameAudio.playMoney();
        } else {
          newStats.reputation = Math.max(0, newStats.reputation - 15);
          newStats.happiness = Math.max(0, newStats.happiness - 10);
          const caughtFine = activity.id === 'pickpocket' ? 50 : 100;
          currentGold = Math.max(0, currentGold - caughtFine);
          logs.push(`Caught in the act! You were heavily fined ${caughtFine} Gold by local guards.`);
          gameAudio.playFail();
        }
      } 
      else if (activity.id === 'goblin_raid' || activity.id === 'raid_merchant') {
        const success = Math.random() > 0.50; // 50% success chance
        if (success) {
          const loot = activity.id === 'goblin_raid'
            ? Math.floor(Math.random() * 120) + 80
            : Math.floor(Math.random() * 200) + 100;
          currentGold += loot;
          newStats.reputation = Math.max(0, newStats.reputation - 12);
          newStats.happiness = Math.min(100, newStats.happiness + 15);
          logs.push(`Successful raid! Returned with a haul of ${loot} Gold!`);
          gameAudio.playMoney();
        } else {
          // Fatal danger
          const dies = Math.random() < 0.25; // 25% chance of dying if you fail
          if (dies) {
            newStats.health = 0;
            return {
              ...prev,
              stats: { ...newStats, health: 0 },
              isDead: true,
              deathReason: activity.id === 'goblin_raid' ? 'Slain by goblins during a cave raid.' : 'Blown up by ship cannons during a merchant raid.',
              journal: [...logs, `Died at age ${prev.age}: ${activity.id === 'goblin_raid' ? 'Slain by goblins' : 'Blown up during cargo raid'}.`]
            };
          } else {
            newStats.health = Math.max(1, newStats.health - 40);
            newStats.happiness = Math.max(0, newStats.happiness - 20);
            newStats.reputation = Math.max(0, newStats.reputation - 20);
            logs.push(`The raid failed catastrophically! You barely escaped with your life, severely wounded.`);
            gameAudio.playFail();
          }
        }
      } 
      else if (activity.id === 'seek_love' || activity.id === 'tavern_carouse') {
        newStats.happiness = Math.min(100, newStats.happiness + 15);
        newStats.charisma = Math.min(100, newStats.charisma + 5);
        
        // Find partner chance
        const hasSpouse = relationships.some(r => r.type === 'spouse' && r.status === 'alive');
        if (!hasSpouse && Math.random() > 0.45) {
          const isFemale = Math.random() > 0.5;
          const nameList = isFemale ? activeExpansion.names.female : activeExpansion.names.male;
          const pFirst = nameList[Math.floor(Math.random() * nameList.length)];
          const pLast = activeExpansion.names.last[Math.floor(Math.random() * activeExpansion.names.last.length)];
          
          const newSpouse: Relationship = {
            id: `spouse_${Date.now()}`,
            name: `${pFirst} ${pLast}`,
            type: 'spouse',
            relationship: 80,
            status: 'alive',
            age: prev.age + Math.floor(Math.random() * 5) - 2
          };
          relationships.push(newSpouse);
          logs.push(`Met and married ${newSpouse.name} at the gathering!`);
          gameAudio.playLevelUp();
        } else {
          logs.push(`Had a pleasant, lively night socializing and laughing with the crowd.`);
          gameAudio.playClick();
        }
      }
      else if (activity.id === 'coliseum_fight') {
        const success = Math.random() > 0.45;
        if (success) {
          const reward = Math.floor(Math.random() * 80) + 40;
          currentGold += reward;
          newStats.reputation = Math.min(100, newStats.reputation + 8);
          newStats.strength = Math.min(100, newStats.strength + 10);
          newStats.happiness = Math.min(100, newStats.happiness + 15);
          logs.push(`Victorious in the Coliseum! You defeated your opponent and won ${reward} Gold and the crowd's cheers.`);
          gameAudio.playMoney();
        } else {
          newStats.health = Math.max(5, newStats.health - 30);
          newStats.happiness = Math.max(0, newStats.happiness - 10);
          newStats.reputation = Math.max(0, newStats.reputation - 5);
          logs.push(`Defeated in the Coliseum! You were carried out of the arena, beaten and humiliated.`);
          gameAudio.playFail();
        }
      }
      else if (activity.id === 'pilgrimage') {
        newStats.reputation = Math.min(100, newStats.reputation + 15);
        newStats.happiness = Math.min(100, newStats.happiness + 8);
        newStats.intelligence = Math.min(100, newStats.intelligence + 5);
        
        let gainedTrait = '';
        if (Math.random() > 0.6 && !traits.includes('Kind')) {
          gainedTrait = 'Kind';
        } else if (Math.random() > 0.6 && !traits.includes('Cautious')) {
          gainedTrait = 'Cautious';
        }
        
        let traitLog = '';
        if (gainedTrait) {
          traits = [...traits.filter(t => t !== gainedTrait), gainedTrait];
          traitLog = ` You gained the ${gainedTrait} trait.`;
        }
        logs.push(`Completed a holy pilgrimage to the mountain shrine. You feel spiritually cleansed.${traitLog}`);
        gameAudio.playLevelUp();
      }
      else if (activity.id === 'tavern_brawl') {
        const win = Math.random() > 0.5;
        newStats.strength = Math.min(100, newStats.strength + 8);
        if (win) {
          newStats.happiness = Math.min(100, newStats.happiness + 10);
          newStats.reputation = Math.max(0, newStats.reputation - 5);
          logs.push(`You won a rowdy brawl in the tavern, leaving the other guy knocked out cold.`);
          gameAudio.playClick();
        } else {
          newStats.health = Math.max(1, newStats.health - 20);
          newStats.happiness = Math.max(0, newStats.happiness - 10);
          logs.push(`You got beaten up in the tavern brawl. Ouch.`);
          gameAudio.playFail();
        }
      }

      return {
        ...prev,
        gold: currentGold,
        stats: newStats,
        relationships,
        journal: logs,
        traits,
        yearlyActions: {
          interactedRelations: prev.yearlyActions?.interactedRelations || [],
          activitiesPerformed: [...(prev.yearlyActions?.activitiesPerformed || []), activityId]
        }
      };
    });
  };

  const interactWithRelation = (relationId: string, action: 'chat' | 'gift' | 'insult' | 'propose' | 'ask_gold') => {
    if (!character || character.isDead) return;
    const interactedRelations = character.yearlyActions?.interactedRelations || [];
    if (interactedRelations.includes(relationId)) {
      gameAudio.playFail();
      return;
    }

    setCharacter(prev => {
      if (!prev) return null;
      let logs = [...prev.journal];
      let gold = prev.gold;
      let currentStats = { ...prev.stats };
      
      const newRelations = prev.relationships.map(r => {
        if (r.id !== relationId) return r;

        let level = r.relationship;
        if (action === 'chat') {
          level = Math.min(100, level + Math.floor(Math.random() * 10) + 6);
          logs.push(`Conversated with your ${r.type} ${r.name}. Relationship improved.`);
          gameAudio.playClick();
        } 
        else if (action === 'gift') {
          if (gold >= 25) {
            gold -= 25;
            level = Math.min(100, level + Math.floor(Math.random() * 15) + 15);
            logs.push(`Presented a thoughtful gift to your ${r.type} ${r.name}. They loved it.`);
            gameAudio.playMoney();
          } else {
            gameAudio.playFail();
          }
        } 
        else if (action === 'insult') {
          level = Math.max(0, level - Math.floor(Math.random() * 15) - 10);
          currentStats.happiness = Math.max(0, currentStats.happiness - 5);
          logs.push(`Argued with and insulted your ${r.type} ${r.name}. Atmosphere grew cold.`);
          gameAudio.playFail();
        } 
        else if (action === 'propose') {
          if (r.type === 'friend' && level >= 75) {
            r.type = 'spouse';
            level = Math.min(100, level + 15);
            logs.push(`Proposed marriage to your companion ${r.name}. They accepted!`);
            gameAudio.playLevelUp();
          } else {
            level = Math.max(0, level - 15);
            logs.push(`Proposed to ${r.name}, but they laughed and rejected you.`);
            gameAudio.playFail();
          }
        } 
        else if (action === 'ask_gold') {
          if (r.type === 'parent' && level >= 55) {
            const allowance = Math.floor(Math.random() * 30) + 10;
            gold += allowance;
            level = Math.max(0, level - 5);
            logs.push(`Asked your parent ${r.name} for financial assistance. They gifted you ${allowance} Gold.`);
            gameAudio.playMoney();
          } else {
            level = Math.max(0, level - 8);
            logs.push(`Asked ${r.name} for gold, but they refused to help.`);
            gameAudio.playFail();
          }
        }

        return { ...r, relationship: level };
      });

      return {
        ...prev,
        gold,
        stats: currentStats,
        relationships: newRelations,
        journal: logs,
        yearlyActions: {
          interactedRelations: [...(prev.yearlyActions?.interactedRelations || []), relationId],
          activitiesPerformed: prev.yearlyActions?.activitiesPerformed || []
        }
      };
    });
  };

  const ageOneYear = async () => {
    if (!character || character.isDead) return;

    const currentAge = character.age + 1;
    let newGold = character.gold;
    let newStats = { ...character.stats };
    let logs: string[] = [];
    let activeRelations = [...character.relationships];
    let activeJob = character.career ? { ...character.career } : undefined;
    let isDead = false;
    let deathReason = '';

    // 1. Career calculations
    if (activeJob) {
      let currentSalary = activeJob.salary;
      // World Event Modifiers
      if (worldEvent?.modifiers?.incomeMultiplier) {
        currentSalary = Math.round(currentSalary * worldEvent.modifiers.incomeMultiplier);
      }
      
      newGold += currentSalary;
      
      // Career performance decay/boost
      const randomShift = Math.floor(Math.random() * 11) - 5; // -5 to +5
      activeJob.performance = Math.max(0, Math.min(100, activeJob.performance + randomShift));
      
      logs.push(`Earned ${currentSalary} Gold from your work as a ${activeJob.title}.`);

      // Fire warning
      if (activeJob.performance < 15) {
        activeJob = undefined;
        newStats.happiness = Math.max(0, newStats.happiness - 25);
        logs.push(`Fired from your job due to terrible yearly performance!`);
        gameAudio.playFail();
      }
    }

    // 2. Inventory assets income and upkeep
    let netAssetFlow = 0;
    character.inventory.forEach(item => {
      netAssetFlow += item.income;
    });
    newGold += netAssetFlow;
    if (netAssetFlow > 0) {
      logs.push(`Investments yielded a net profit of ${netAssetFlow} Gold.`);
    } else if (netAssetFlow < 0) {
      logs.push(`Paid ${Math.abs(netAssetFlow)} Gold in maintenance and taxes for assets.`);
    }

    // 2.5 Cost of Living / Taxes based on age and family class
    if (currentAge >= 14) {
      let costOfLiving = 5; // default peasant
      if (character.familyBackgroundId === 'blacksmith') costOfLiving = 10;
      if (character.familyBackgroundId === 'merchant') costOfLiving = 20;
      if (character.familyBackgroundId === 'noble') costOfLiving = 45;
      if (character.familyBackgroundId === 'royal') costOfLiving = 90;
      
      newGold -= costOfLiving;
      logs.push(`Paid ${costOfLiving} Gold for food, housing, and basic taxes.`);
    }

    // Ensure gold doesn't go below 0 (accrue debt)
    if (newGold < 0) {
      newStats.happiness = Math.max(0, newStats.happiness - 10);
      logs.push(`Warning: You have entered debt! Your balance is ${newGold} Gold.`);
    }

    // 3. Relationships age up and survival check
    activeRelations = activeRelations.map(r => {
      if (r.status === 'dead') return r;
      const newAge = r.age + 1;
      
      // Death chance based on age
      let deathChance = 0.002;
      if (newAge > 60) deathChance = 0.03;
      if (newAge > 75) deathChance = 0.12;
      if (newAge > 90) deathChance = 0.35;

      if (Math.random() < deathChance) {
        logs.push(`Your ${r.type} ${r.name} has passed away at the age of ${newAge}.`);
        newStats.happiness = Math.max(0, newStats.happiness - 20);
        return { ...r, status: 'dead', age: newAge };
      }

      // Random drift in relationship quality
      const relShift = Math.floor(Math.random() * 7) - 3; // -3 to +3
      return { 
        ...r, 
        age: newAge, 
        relationship: Math.max(0, Math.min(100, r.relationship + relShift)) 
      };
    });

    // 4. Have children opportunity
    const isMarried = activeRelations.some(r => r.type === 'spouse' && r.status === 'alive');
    if (isMarried && currentAge >= 18 && currentAge <= 45 && Math.random() < 0.22) {
      const isBoy = Math.random() > 0.5;
      const cFirst = isBoy 
        ? activeExpansion.names.male[Math.floor(Math.random() * activeExpansion.names.male.length)]
        : activeExpansion.names.female[Math.floor(Math.random() * activeExpansion.names.female.length)];
      
      const newChild: Relationship = {
        id: `child_${Date.now()}`,
        name: `${cFirst} ${character.dynastyName}`,
        type: 'child',
        relationship: Math.floor(Math.random() * 20) + 75, // starts high
        status: 'alive',
        age: 0
      };
      activeRelations.push(newChild);
      logs.push(`Your spouse gave birth to a healthy ${isBoy ? 'boy' : 'girl'} named ${newChild.name}!`);
      gameAudio.playLevelUp();
    }

    // 5. World Event ticking
    let activeWorldEvent = worldEvent;
    if (activeWorldEvent) {
      const remaining = activeWorldEvent.duration - 1;
      if (remaining <= 0) {
        logs.push(`The global event '${activeWorldEvent.name}' has finally ended.`);
        activeWorldEvent = null;
      } else {
        activeWorldEvent = { ...activeWorldEvent, duration: remaining };
        
        // Apply world event passive drains
        if (activeWorldEvent.modifiers?.healthDrain) {
          newStats.health = Math.max(0, newStats.health - activeWorldEvent.modifiers.healthDrain);
          logs.push(`Drained by the effects of the active '${activeWorldEvent.name}' (-${activeWorldEvent.modifiers.healthDrain} health).`);
        }
      }
    } else {
      // Chance to trigger a new world event
      if (Math.random() < 0.03 && activeExpansion.worldEvents.length > 0) {
        const evTemplate = activeExpansion.worldEvents[Math.floor(Math.random() * activeExpansion.worldEvents.length)];
        activeWorldEvent = {
          ...evTemplate,
          duration: Math.floor(Math.random() * 5) + 3 // 3-7 years
        };
        logs.push(`GLOBAL WARPING: '${activeWorldEvent.name}' has begun! ${activeWorldEvent.description}`);
        gameAudio.playFail();
      }
    }

    // 6. Natural Stat Decay / Aging effects
    if (currentAge < 15) {
      newStats.strength = Math.min(100, newStats.strength + 3);
      newStats.intelligence = Math.min(100, newStats.intelligence + 2);
    } else if (currentAge > 50) {
      newStats.strength = Math.max(0, newStats.strength - 2);
      newStats.health = Math.max(0, newStats.health - 1);
    }
    if (currentAge > 70) {
      newStats.strength = Math.max(0, newStats.strength - 4);
      newStats.health = Math.max(0, newStats.health - 3);
    }

    // 7. Death Checks
    if (newStats.health <= 0) {
      isDead = true;
      deathReason = 'Fell victim to critical illness and body failure.';
    } else {
      let naturalDeathChance = 0.001;
      if (currentAge > 70) naturalDeathChance = 0.05;
      if (currentAge > 85) naturalDeathChance = 0.20;
      if (currentAge > 100) naturalDeathChance = 0.55;

      if (Math.random() < naturalDeathChance) {
        isDead = true;
        deathReason = 'Passed away peacefully of old age.';
      }
    }

    if (isDead) {
      logs.push(`Died of natural causes at age ${currentAge}.`);
      gameAudio.playDeath();
      
      const deadChar: Character = {
        ...character,
        age: currentAge,
        stats: { ...newStats, health: 0 },
        gold: newGold,
        career: activeJob,
        relationships: activeRelations,
        journal: [...character.journal, ...logs, `Died: ${deathReason}`],
        isDead: true,
        deathReason
      };
      
      setCharacter(deadChar);
      
      // Auto-save the death
      saveSystem.saveGame(activeSlotId, {
        character: deadChar,
        activeExpansionId: activeExpansion.id,
        worldEvent: activeWorldEvent,
        lineage
      });
      setSaveSlots(saveSystem.getSlots());
      return;
    }

    // 8. Event selection engine (Random events)
    // 85% chance of an event triggering at age 5+
    let triggeredEvent: GameEvent | null = null;
    if (currentAge >= 5 && Math.random() < 0.85) {
      if (preGeneratedEventRef.current) {
        triggeredEvent = preGeneratedEventRef.current;
        preGeneratedEventRef.current = null; // consume it
      } else {
        // 8a. Attempt to generate event using the backend AI service
        try {
          const honor = newStats.reputation;
          const infamy = 100 - newStats.reputation;
          const relationshipsSummary = activeRelations
            .map(r => `${r.type} ${r.name} (${r.status}, age ${r.age}, relationship ${r.relationship})`)
            .join(', ');

          const compactState = {
            age: currentAge,
            career: activeJob?.title || 'None',
            familyBackground: activeExpansion.startingBackgrounds.find(b => b.id === character.familyBackgroundId)?.name || character.familyBackgroundId,
            traits: character.traits,
            honor,
            infamy,
            gold: newGold,
            relationshipsSummary,
            expansion: activeExpansion.name
          };

          const response = await fetch('/api/generate-event', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(compactState)
          });

          if (response.ok) {
            triggeredEvent = await response.json();
          } else {
            console.warn("Backend failed to generate event, status code:", response.status);
          }
        } catch (err) {
          console.error("Failed to fetch generated event from backend, falling back to static:", err);
        }
      }

      // 8b. If AI generation was unavailable or failed, fall back to static local events
      if (!triggeredEvent && activeExpansion.events.length > 0) {
        // Filter valid events
        const validEvents = activeExpansion.events.filter(e => {
          if (e.requirements) {
            const r = e.requirements;
            if (r.minAge && currentAge < r.minAge) return false;
            if (r.maxAge && currentAge > r.maxAge) return false;
            if (r.careerId && activeJob?.id !== r.careerId) return false;
            if (r.activeWorldEventId && activeWorldEvent?.id !== r.activeWorldEventId) return false;
            
             if (r.hasSpouse) {
              const hasSpouse = activeRelations.some(rel => rel.type === 'spouse' && rel.status === 'alive');
              if (!hasSpouse) return false;
            }
            if (r.hasChildren) {
              const hasChildren = activeRelations.some(rel => rel.type === 'child' && rel.status === 'alive');
              if (!hasChildren) return false;
            }
            if (r.hasSibling) {
              const hasSibling = activeRelations.some(rel => rel.type === 'sibling' && rel.status === 'alive');
              if (!hasSibling) return false;
            }
            if (r.familyBackgroundId && character.familyBackgroundId !== r.familyBackgroundId) return false;
            if (r.requiredTraits && !r.requiredTraits.every(t => character.traits.includes(t))) return false;
            if (r.forbiddenTraits && r.forbiddenTraits.some(t => character.traits.includes(t))) return false;
            if (r.minStats) {
              for (const [stat, val] of Object.entries(r.minStats)) {
                if (newStats[stat as StatName] < (val || 0)) return false;
              }
            }
          }
          return true;
        });

        if (validEvents.length > 0) {
          // Weighted roll
          let totalWeight = 0;
          validEvents.forEach(e => {
            totalWeight += e.weight;
          });

          let roll = Math.random() * totalWeight;
          for (const ev of validEvents) {
            roll -= ev.weight;
            if (roll <= 0) {
              triggeredEvent = ev;
              break;
            }
          }
        }
      }
    }

    // Update state
    const nextChar: Character = {
      ...character,
      age: currentAge,
      stats: newStats,
      gold: newGold,
      career: activeJob,
      relationships: activeRelations,
      journal: [...character.journal, ...logs, `Aged up to ${currentAge} years old.`].slice(-100), // cap journal log at last 100 entries
      isDead: false,
      yearlyActions: {
        interactedRelations: [],
        activitiesPerformed: []
      }
    };

    setCharacter(nextChar);
    setWorldEvent(activeWorldEvent);
    
    if (triggeredEvent) {
      const shuffledChoices = [...triggeredEvent.choices].sort(() => Math.random() - 0.5);
      setCurrentEvent({
        ...triggeredEvent,
        choices: shuffledChoices
      });
    } else {
      gameAudio.playClick();
    }

    // Auto-save the state
    saveSystem.saveGame(activeSlotId, {
      character: nextChar,
      activeExpansionId: activeExpansion.id,
      worldEvent: activeWorldEvent,
      lineage
    });
    setSaveSlots(saveSystem.getSlots());

    // Pre-generate event for the next year in the background
    preGenerateNextEvent(nextChar, activeExpansion);
  };

  const chooseChoice = (choice: Choice) => {
    if (!character) return;

    // Apply Morality Reputation Shifts
    let reputationShift = choice.moralityShift || 0;
    
    // Choose outcome based on chances
    const outcomes = choice.outcomes;
    const roll = Math.random() * 100;
    let accum = 0;
    let selectedOutcome = outcomes[outcomes.length - 1].outcome; // default to last

    for (const item of outcomes) {
      accum += item.chance;
      if (roll <= accum) {
        selectedOutcome = item.outcome;
        break;
      }
    }

    // Apply outcome effects to character
    setCharacter(prev => {
      if (!prev) return null;

      const gChange = resolveNumber(selectedOutcome.goldChange, prev.career?.id);
      let gold = prev.gold + gChange;
      let stats = { ...prev.stats };
      let logs = [...prev.journal];
      let relationships = [...prev.relationships];
      let career = prev.career ? { ...prev.career } : undefined;
      let title = prev.title;
      let isDead = prev.isDead;
      let deathReason = prev.deathReason;

      // Apply stat changes
      if (selectedOutcome.statChanges) {
        for (const [stat, val] of Object.entries(selectedOutcome.statChanges)) {
          const sName = stat as StatName;
          const delta = resolveNumber(val, prev.career?.id);
          stats[sName] = Math.max(0, Math.min(100, stats[sName] + delta));
        }
      }

      // Add reputation shift
      stats.reputation = Math.max(0, Math.min(100, stats.reputation + reputationShift));

      // Title Change
      if (selectedOutcome.titleChange) {
        title = selectedOutcome.titleChange;
      }

      // Add item reward
      let inventory = [...prev.inventory];
      if (selectedOutcome.itemReward) {
        const item: InventoryItem = {
          ...selectedOutcome.itemReward,
          id: `item_${Date.now()}_${Math.floor(Math.random() * 1000)}`
        };
        inventory.push(item);
      }

      // Remove item
      if (selectedOutcome.removeItemName) {
        const index = inventory.findIndex(item => item.name === selectedOutcome.removeItemName);
        if (index > -1) {
          inventory.splice(index, 1);
        }
      }

      // Relationship changes
      if (selectedOutcome.relationshipChange) {
        const rc = selectedOutcome.relationshipChange;
        if (rc.type === 'spouse' || rc.type === 'child' || rc.type === 'friend' || rc.type === 'sibling') {
          const generatedName = generateRandomName('non-binary', activeExpansion);
          let surname = prev.dynastyName;
          if (rc.type === 'friend' || rc.type === 'spouse') {
            surname = activeExpansion.names.last[Math.floor(Math.random() * activeExpansion.names.last.length)];
          }
          const name = rc.name || `${generatedName.first} ${surname}`;
          
          let age = prev.age + Math.floor(Math.random() * 5) - 2;
          if (rc.type === 'child') {
            age = 0;
          } else if (rc.type === 'sibling') {
            age = Math.max(0, prev.age + Math.floor(Math.random() * 9) - 4);
          }

          const newRelation: Relationship = {
            id: `relation_${Date.now()}`,
            name,
            type: rc.type,
            relationship: rc.amount || 75,
            status: 'alive',
            age
          };
          relationships.push(newRelation);
        } 
        else if (rc.type === 'modify') {
          let targetId = rc.relationId;
          // Support generic targets: match first living relation of type
          if (targetId === 'spouse' || targetId === 'sibling' || targetId === 'child' || targetId === 'friend') {
            const match = relationships.find(r => r.type === targetId && r.status === 'alive');
            if (match) {
              targetId = match.id;
            }
          }

          relationships = relationships.map(r => {
            if (r.id === targetId || (targetId === 'spouse' && r.type === 'spouse')) { 
              const nextStatus = rc.status || r.status;
              const nextRel = rc.amount !== undefined ? Math.max(0, Math.min(100, r.relationship + rc.amount)) : r.relationship;
              return { ...r, relationship: nextRel, status: nextStatus };
            }
            return r;
          });
        }
      }

      // Career changes
      if (selectedOutcome.careerChange) {
        const cc = selectedOutcome.careerChange;
        if (cc.type === 'fire') {
          career = undefined;
        } 
        else if (cc.type === 'hire' && cc.careerId) {
          const jobTemplate = activeExpansion.careers.find(c => c.id === cc.careerId);
          if (jobTemplate) {
            career = {
              id: jobTemplate.id,
              title: jobTemplate.title,
              salary: jobTemplate.salary,
              performance: 50
            };
          }
        } 
        else if (cc.type === 'promote') {
          if (career) {
            career.performance = Math.min(100, career.performance + 30);
            career.salary = Math.round(career.salary * 1.3);
            career.title = cc.careerTitle || `Senior ${career.title}`;
          }
        }
      }

      let traits = [...prev.traits];
      if (selectedOutcome.addTraits) {
        selectedOutcome.addTraits.forEach(t => {
          if (!traits.includes(t)) traits.push(t);
        });
      }
      if (selectedOutcome.removeTraits) {
        traits = traits.filter(t => !selectedOutcome.removeTraits!.includes(t));
      }

      // Death outcome
      if (selectedOutcome.death) {
        isDead = true;
        deathReason = selectedOutcome.deathReason || 'Died in tragic circumstances.';
        stats.health = 0;
      }

      logs.push(resolveText(selectedOutcome.logText, prev.career?.id, activeExpansion.id));

      return {
        ...prev,
        gold,
        stats,
        title,
        career,
        relationships,
        inventory,
        isDead,
        deathReason,
        traits,
        journal: logs
      };
    });

    const finalGoldChange = resolveNumber(selectedOutcome.goldChange, character?.career?.id);
    if (selectedOutcome.death) {
      gameAudio.playDeath();
    } else if (finalGoldChange > 0) {
      gameAudio.playMoney();
    } else {
      gameAudio.playClick();
    }

    setCurrentEventOutcome(selectedOutcome);
  };

  const clearOutcome = () => {
    setCurrentEvent(null);
    setCurrentEventOutcome(null);
    
    // Auto-save on closing popup
    if (character) {
      saveSystem.saveGame(activeSlotId, {
        character,
        activeExpansionId: activeExpansion.id,
        worldEvent,
        lineage
      });
      setSaveSlots(saveSystem.getSlots());

      preGenerateNextEvent(character, activeExpansion);
    }
  };

  const selectHeirAndContinue = (childId: string) => {
    if (!character) return;

    const child = character.relationships.find(r => r.id === childId);
    if (!child) return;

    // 1. Create a generation history entry
    const historyEntry: DynastyHistoryEntry = {
      generation: lineage.length + 1,
      name: character.name,
      dynastyName: character.dynastyName,
      age: character.age,
      gold: character.gold,
      titleReached: character.title,
      summary: character.deathReason || 'Passed away.'
    };

    const nextLineage = [...lineage, historyEntry];

    // 2. Transfer inheritance assets (80% of gold due to estate tax)
    const inheritedGold = Math.max(0, Math.round(character.gold * 0.8));
    
    // Transfer assets (properties and businesses)
    const inheritedInventory = character.inventory.filter(
      item => item.type === 'property' || item.type === 'business' || item.name.includes('Runic') || item.name.includes('Dueling')
    );

    // 3. Setup new character stats (Inherit child stats)
    const startingStats = rollStats(); // Fallback but let's give child traits
    
    // Setup sibling/parent relations for the new character
    // The previous siblings and mother/father of the child
    const parentLast = character.dynastyName;
    const motherFirst = activeExpansion.names.female[Math.floor(Math.random() * activeExpansion.names.female.length)];
    const fatherFirst = activeExpansion.names.male[Math.floor(Math.random() * activeExpansion.names.male.length)];

    const newRelationships: Relationship[] = [
      {
        id: 'mother',
        name: `${motherFirst} ${parentLast}`,
        type: 'parent',
        relationship: 75,
        status: 'alive',
        age: child.age + 22
      },
      {
        id: 'father',
        name: `${fatherFirst} ${parentLast}`,
        type: 'parent',
        relationship: 75,
        status: 'alive',
        age: child.age + 24
      }
    ];

    // Determine dynamic background for heir based on parent's final title/achievements
    let nextBgId = 'farmer';
    if (character.title.includes('Prince') || character.title.includes('Princess') || character.title.includes('King') || character.title.includes('Queen') || character.title.includes('Royal')) {
      nextBgId = 'royal';
    } else if (character.title.includes('Noble') || character.title.includes('Gentry') || character.title.includes('Duke') || character.title.includes('Baron')) {
      nextBgId = 'noble';
    } else if (character.career?.id === 'royal_advisor' || character.career?.id === 'knight') {
      nextBgId = 'noble';
    } else if (character.career?.id === 'mage') {
      nextBgId = 'merchant';
    } else if (character.career?.id === 'blacksmith') {
      nextBgId = 'blacksmith';
    } else if (character.career?.id === 'farmer') {
      nextBgId = 'farmer';
    } else if (character.gold > 500) {
      nextBgId = 'merchant';
    }

    // Heir inherits some random traits from parent (40% chance to inherit one of parent's traits)
    let heirTraits: string[] = [];
    if (character.traits.length > 0 && Math.random() < 0.4) {
      const inheritedTrait = character.traits[Math.floor(Math.random() * character.traits.length)];
      heirTraits.push(inheritedTrait);
    }

    const nextChar: Character = {
      name: child.name.split(' ')[0], // Keep child name
      dynastyName: character.dynastyName,
      gender: Math.random() > 0.5 ? 'male' : 'female', // or inherit
      age: child.age,
      stats: startingStats,
      gold: inheritedGold,
      title: character.title.includes('Noble') ? 'Gentry' : activeExpansion.startingTitles[0], // lose some status, keep some
      familyBackgroundId: nextBgId,
      traits: heirTraits,
      relationships: newRelationships,
      inventory: inheritedInventory,
      journal: [
        `Inherited the family legacy of generation ${historyEntry.generation} after the death of ${character.name}.`,
        `Inherited ${inheritedGold} Gold and ${inheritedInventory.length} estate properties.`
      ],
      isDead: false,
      yearlyActions: {
        interactedRelations: [],
        activitiesPerformed: []
      }
    };

    setCharacter(nextChar);
    setLineage(nextLineage);
    setWorldEvent(null);
    setCurrentEvent(null);
    setCurrentEventOutcome(null);
    
    gameAudio.playLevelUp();

    // Save
    saveSystem.saveGame(activeSlotId, {
      character: nextChar,
      activeExpansionId: activeExpansion.id,
      worldEvent: null,
      lineage: nextLineage
    });
    setSaveSlots(saveSystem.getSlots());
  };

  const saveCurrentSlot = () => {
    if (!character) return;
    saveSystem.saveGame(activeSlotId, {
      character,
      activeExpansionId: activeExpansion.id,
      worldEvent,
      lineage
    });
    setSaveSlots(saveSystem.getSlots());
    gameAudio.playMoney();
  };

  const loadGame = (slotId: string) => {
    const data = saveSystem.loadGame(slotId);
    if (data) {
      setCharacter(data.character);
      const exp = getExpansion(data.activeExpansionId);
      setActiveExpansion(exp);
      setWorldEvent(data.worldEvent);
      setLineage(data.lineage);
      setActiveSlotId(slotId);
      saveSystem.setActiveSlotId(slotId);
      setIsPlaying(true);
      setCurrentEvent(null);
      setCurrentEventOutcome(null);
      gameAudio.playLevelUp();
      
      preGenerateNextEvent(data.character, exp);
    } else {
      gameAudio.playFail();
    }
  };

  const deleteSlot = (slotId: string) => {
    saveSystem.deleteSlot(slotId);
    setSaveSlots(saveSystem.getSlots());
    gameAudio.playClick();
  };

  const quitToMenu = () => {
    setIsPlaying(false);
    setCharacter(null);
    setLineage([]);
    setWorldEvent(null);
    setCurrentEvent(null);
    setCurrentEventOutcome(null);
    gameAudio.playClick();
  };

  return (
    <GameContext.Provider value={{
      activeExpansion,
      character,
      lineage,
      worldEvent,
      currentEvent,
      currentEventOutcome,
      isPlaying,
      saveSlots,
      activeSlotId,
      soundEnabled,
      selectExpansion,
      startNewLife,
      ageOneYear,
      chooseChoice,
      clearOutcome,
      interactWithRelation,
      applyForJob,
      workHard,
      resignJob,
      askForPromotion,
      buyItem,
      performActivity,
      selectHeirAndContinue,
      toggleSound,
      saveGame: saveCurrentSlot,
      loadGame,
      deleteSlot,
      quitToMenu
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
