import type { Expansion } from '../../types/game';

export const fantasyExpansion: Expansion = {
  id: 'fantasy',
  name: 'Fantasy Realms',
  theme: {
    fontTitle: "'Cinzel Decorative', 'Cinzel', serif",
    fontBody: "'Cormorant Garamond', serif",
    primary: '#8c6239', // leather brown
    primaryHover: '#5c3a1a', 
    accent: '#b58933', // gold accent
    bgStart: '#2c1b0e', // dark wood desk
    bgEnd: '#120904', 
    panelBg: '#fcf6e8', // warm parchment paper
    panelBorder: '#543b23', // dark leather border
    primaryGlow: 'rgba(140, 98, 57, 0.2)',
    textMain: '#3c2a1a', // dark ink
    textSub: '#73563f', // faded ink
    textHeading: '#1f1005', // bold ink
    cardBg: 'rgba(140, 98, 57, 0.04)', // brown wash card
    cardBorder: 'rgba(84, 59, 35, 0.12)',
    borderRadius: '2px' // rectangular scroll cut
  },
  moralityLabels: {
    honor: 'Honor & Piety',
    infamy: 'Dread & Infamy'
  },
  statLabels: {
    health: 'Constitution',
    happiness: 'Joy',
    intelligence: 'Arcane Lore',
    charisma: 'Majesty',
    strength: 'Might',
    reputation: 'Morality'
  },
  careers: [
    {
      id: 'farmer',
      title: 'Peasant Farmer',
      salary: 12,
      description: 'Till the soil, sow the seeds, and live a humble life close to nature.',
      requirements: { minAge: 14 }
    },
    {
      id: 'blacksmith',
      title: 'Apprentice Blacksmith',
      salary: 28,
      description: 'Stoke the forge fires and hammer iron. Builds strength and yields reliable gold.',
      requirements: { minAge: 16, minStats: { strength: 35 } }
    },
    {
      id: 'guard',
      title: 'City Guard',
      salary: 40,
      description: 'Patrol the castle ramparts and keep the peace. Requires discipline and might.',
      requirements: { minAge: 18, minStats: { strength: 40, reputation: 50 } }
    },
    {
      id: 'knight',
      title: 'Chivalric Knight',
      salary: 110,
      description: 'Swear an oath of fealty to the Crown, fight in tournaments, and protect the weak.',
      requirements: { minAge: 21, minStats: { strength: 60, charisma: 50 }, requiredCareerId: 'guard' }
    },
    {
      id: 'mage',
      title: 'Archmage Apprentice',
      salary: 160,
      description: 'Harness the ley lines and channel elemental forces. Requires supreme intelligence.',
      requirements: { minAge: 18, minStats: { intelligence: 70 } }
    },
    {
      id: 'royal_advisor',
      title: 'Royal Advisor',
      salary: 320,
      description: 'Whisper counsel into the King\'s ear. Requires immense intellect and cunning charm.',
      requirements: { minAge: 30, minStats: { intelligence: 75, charisma: 70 } }
    }
  ],
  activities: [
    {
      id: 'study_arcane',
      name: 'Study Arcane Tomes',
      description: 'Pour over dusty magic scrolls in the library.',
      cost: 15,
      category: 'study'
    },
    {
      id: 'swordplay',
      name: 'Practice Swordplay',
      description: 'Train in the courtyard with wooden dummies to build might.',
      cost: 8,
      category: 'health'
    },
    {
      id: 'dice_game',
      name: 'Gamble in Tavern',
      description: 'Roll loaded bones with sketchy mercs for a chance of double gold.',
      cost: 20,
      category: 'gamble'
    },
    {
      id: 'pickpocket',
      name: 'Pickpocket Merchants',
      description: 'Attempt to swipe purses in the bustling market square.',
      cost: 0,
      category: 'crime'
    },
    {
      id: 'goblin_raid',
      name: 'Raid Goblin Cave',
      description: 'Venture into goblin-infested tunnels for treasure. Extremely dangerous!',
      cost: 0,
      category: 'crime'
    },
    {
      id: 'seek_love',
      name: 'Attend Royal Ball',
      description: 'Dress in your finest attire and seek a partner of high status.',
      cost: 60,
      category: 'social'
    }
  ],
  itemPool: [
    {
      name: 'Wooden Practice Sword',
      type: 'item',
      cost: 15,
      income: 0,
      description: 'A simple wooden sword that increases your sparring effectiveness slightly.'
    },
    {
      name: 'Runic Crystal Wand',
      type: 'item',
      cost: 120,
      income: 0,
      description: 'A shining crystal that amplifies spells. Boosts arcane capabilities.'
    },
    {
      name: 'Chivalric Warhorse',
      type: 'item',
      cost: 250,
      income: -10, // upkeep
      description: 'A majestic stallion. Increases charisma and speed, but demands feed.'
    },
    {
      name: 'Thatch-roofed Farm',
      type: 'property',
      cost: 180,
      income: 15,
      description: 'A modest farm plot that provides a steady seasonal harvest.'
    },
    {
      name: 'Market Blacksmith Forge',
      type: 'business',
      cost: 600,
      income: 65,
      description: 'A fully staffed commercial blacksmith shop producing weapons and armor.'
    },
    {
      name: 'Grand Stone Castle',
      type: 'property',
      cost: 2500,
      income: -50, // high maintenance but huge charisma boost
      description: 'A towering fortress overlooking the valley. Home of rulers.'
    }
  ],
  names: {
    male: ['Alistair', 'Cedric', 'Gareth', 'Valerius', 'Tristan', 'Eldrin', 'Balthazar', 'Gideon', 'Rowan', 'Kaelen'],
    female: ['Genevieve', 'Lyra', 'Seraphina', 'Elowen', 'Isolde', 'Morgana', 'Aurelia', 'Guinevere', 'Freya', 'Beatrix'],
    last: ['Stormbreaker', 'Ironclad', 'Dragonsworn', 'Valerius', 'Shadowflame', 'Silvercrest', 'Moonbrook', 'Kingsley', 'Wyrmscale']
  },
  startingTitles: ['Serf', 'Freeman', 'Yeoman', 'Gentry', 'Patrician', 'Noble'],
  worldEvents: [
    {
      id: 'dragon_scourge',
      name: 'Dragon Scourge',
      description: 'An ancient red dragon has nested in the volcanic peaks, terrorizing the countryside.',
      effectsText: 'Drains health yearly and reduces career earnings due to burning fields.',
      modifiers: {
        incomeMultiplier: 0.7,
        healthDrain: 8
      }
    },
    {
      id: 'golden_age',
      name: 'Golden Age of Magic',
      description: 'A powerful cosmic convergence has supercharged the world\'s mana lines.',
      effectsText: 'Increases study effectiveness and boosts economy. All careers earn 30% more.',
      modifiers: {
        incomeMultiplier: 1.3
      }
    },
    {
      id: 'plague',
      name: 'The Crimson Plague',
      description: 'A deadly airborne contagion sweeps through the kingdom, filling streets with sorrow.',
      effectsText: 'Critical threat. Heavy health drainage each year.',
      modifiers: {
        healthDrain: 15
      }
    }
  ],
  events: [
    {
      id: 'mystic_shrub',
      title: 'The Glowing Herb',
      text: 'While gathering wood in the Whispering Woods, you discover a strange, neon-purple shrub humming with energy.',
      weight: 10,
      requirements: { minAge: 10 },
      choices: [
        {
          text: 'Eat the glowing leaves',
          outcomes: [
            {
              chance: 40,
              outcome: {
                text: 'Your mind expands! You feel a strange surge of cosmic awareness.',
                statChanges: { intelligence: 20, happiness: 10 },
                logText: 'Ate mysterious glowing leaves and gained arcane intellect.'
              }
            },
            {
              chance: 40,
              outcome: {
                text: 'You vomit violently. It was poison!',
                statChanges: { health: -20, happiness: -15 },
                logText: 'Poisoned by mysterious glowing leaves.'
              }
            },
            {
              chance: 20,
              outcome: {
                text: 'A magic blast knocks you out! You wake up feeling energized but super aggressive.',
                statChanges: { strength: 15, health: 5, reputation: -10 },
                logText: 'Knocked out by a magical explosion in the woods.'
              }
            }
          ]
        },
        {
          text: 'Harvest it to sell in the market',
          outcomes: [
            {
              chance: 70,
              outcome: {
                text: 'An apothecary buys it for a handsome sum of gold!',
                goldChange: 35,
                logText: 'Sold a glowing forest herb to an apothecary for 35 gold.'
              }
            },
            {
              chance: 30,
              outcome: {
                text: 'It crumbles to gray ash in your hands. Worthless.',
                statChanges: { happiness: -5 },
                logText: 'Harvested a glowing herb, but it turned to ash.'
              }
            }
          ]
        },
        {
          text: 'Walk away safely',
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: 'You leave the magical plant in peace, avoiding potential curses.',
                logText: 'Decided to leave a mysterious glowing plant undisturbed.'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'orphanage_fire',
      title: 'Cathedral Fire',
      text: 'The local cathedral catches fire in the middle of the night! Screams echo from within.',
      weight: 12,
      requirements: { minAge: 16 },
      choices: [
        {
          text: 'Charge into the flames to rescue people',
          moralityShift: 25, // increase Honor
          outcomes: [
            {
              chance: 60,
              outcome: {
                text: 'You carry two children out of the inferno! The town hails you as a legendary hero.',
                statChanges: { reputation: 30, charisma: 15, happiness: 20 },
                titleChange: 'Yeoman',
                logText: 'Bravely rescued children from the burning cathedral. Hailed as a hero.'
              }
            },
            {
              chance: 40,
              outcome: {
                text: 'You rescue a priest but suffer horrific burns across your body.',
                statChanges: { health: -40, reputation: 25, strength: -10 },
                logText: 'Suffer severe burns saving a priest from the cathedral fire.'
              }
            }
          ]
        },
        {
          text: 'Use the distraction to steal the golden chalice',
          moralityShift: -30, // increase Infamy
          outcomes: [
            {
              chance: 50,
              outcome: {
                text: 'You slip inside, grab the sacred golden chalice, and escape unnoticed!',
                goldChange: 150,
                logText: 'Looted a solid gold chalice from the burning cathedral.'
              }
            },
            {
              chance: 50,
              outcome: {
                text: 'The guards catch you red-handed as you flee with the gold. You are thrown into the dungeon!',
                statChanges: { reputation: -40, happiness: -30, health: -15 },
                logText: 'Caught looting the cathedral. Locked in the castle dungeon.'
              }
            }
          ]
        },
        {
          text: 'Form a bucket brigade to help put it out safely',
          moralityShift: 10,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: 'You work tirelessly passing water. The fire is contained, and the clergy thanks you.',
                statChanges: { reputation: 10, strength: 5 },
                logText: 'Helped extinguish the cathedral fire safely.'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'beggar_choice',
      title: 'The Wandering Wizard',
      text: 'An old man clad in tattered robes begs you for a crust of bread and 5 gold pieces. His eyes gleam with hidden magic.',
      weight: 15,
      requirements: { minAge: 8 },
      choices: [
        {
          text: 'Give him bread and 5 gold',
          moralityShift: 15,
          requirements: { minGold: 5 },
          outcomes: [
            {
              chance: 70,
              outcome: {
                text: 'He transforms into a wizard! He touches your forehead, leaving a mark of luck.',
                statChanges: { happiness: 15, intelligence: 10, health: 10 },
                goldChange: -5,
                logText: 'Aided a disguised wizard and received a magical blessing.'
              }
            },
            {
              chance: 30,
              outcome: {
                text: 'He takes the gold and thanks you kindly. You feel good inside.',
                statChanges: { reputation: 5, happiness: 5 },
                goldChange: -5,
                logText: 'Gave 5 gold to a starving beggar.'
              }
            }
          ]
        },
        {
          text: 'Spit on his boots and tell him to get a job',
          moralityShift: -15,
          outcomes: [
            {
              chance: 50,
              outcome: {
                text: 'He mutters an incantation and points a finger at you. You feel a heavy chill.',
                statChanges: { happiness: -20, health: -10 },
                logText: 'Cursed by a beggar wizard after insulting him.'
              }
            },
            {
              chance: 50,
              outcome: {
                text: 'He hobbles away in tears. A nearby merchant glares at you in disgust.',
                statChanges: { reputation: -10 },
                logText: 'Insulted a poor beggar on the street.'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'dragon_attack_active',
      title: 'Dragon Raid!',
      text: 'Crimson wings block the sun! The dragon active in the world swoops down, breathing fire on your workplace.',
      weight: 25,
      requirements: { activeWorldEventId: 'dragon_scourge', minAge: 15 },
      choices: [
        {
          text: 'Stand your ground and shoot it with a ballista',
          outcomes: [
            {
              chance: 30,
              outcome: {
                text: 'Bullseye! Your bolt pierces its wing, forcing it to retreat. The King knights you on the spot!',
                statChanges: { reputation: 45, strength: 10, charisma: 25 },
                titleChange: 'Noble',
                goldChange: 200,
                logText: 'Shot down a raiding dragon. Knighted and rewarded by the King!'
              }
            },
            {
              chance: 70,
              outcome: {
                text: 'The dragon incinerates the ballista. You barely escape, suffering terrible ash-burns.',
                statChanges: { health: -50, happiness: -20 },
                logText: 'Injured trying to fight a dragon head-on.'
              }
            }
          ]
        },
        {
          text: 'Cower in the stone cellar',
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: 'You hide in the cellar. The work building is burnt to ash, but you survive.',
                statChanges: { happiness: -15 },
                logText: 'Hid in a cellar during a dragon attack.'
              }
            }
          ]
        }
      ]
    }
  ],
  startingBackgrounds: [
    {
      id: 'farmer',
      name: 'Farmer Family',
      weight: 40,
      titleMale: 'Serf',
      titleFemale: 'Serf',
      titleNonBinary: 'Serf',
      gold: 10,
      statModifiers: { health: 10, strength: 15, intelligence: -5 },
      journalText: 'You were born into a humble Farmer family as a Serf. Your family tills the soil, yielding a strong constitution (+10 Health) and might (+15 Strength), but you lack exposure to letters and arcane lore (-5 Intellect).'
    },
    {
      id: 'blacksmith',
      name: 'Blacksmith Family',
      weight: 25,
      titleMale: 'Freeman',
      titleFemale: 'Freeman',
      titleNonBinary: 'Freeman',
      gold: 50,
      statModifiers: { strength: 20, health: 10, charisma: -5 },
      journalText: 'You were born into a Blacksmith family as a Freeman. Stoking the fires and hammering iron has left you sturdy (+10 Health) and exceptionally strong (+20 Strength), but lacking aristocratic charm (-5 Charisma).'
    },
    {
      id: 'merchant',
      name: 'Merchant Family',
      weight: 20,
      titleMale: 'Freeman',
      titleFemale: 'Freeman',
      titleNonBinary: 'Freeman',
      gold: 150,
      statModifiers: { charisma: 10, strength: -5 },
      journalText: 'You were born into a Merchant family as a Freeman. Surrounded by trade coin, you start with 150 Gold and natural negotiating grace (+10 Charisma), but are unaccustomed to physical labor (-5 Strength).'
    },
    {
      id: 'noble',
      name: 'Noble Family',
      weight: 12,
      titleMale: 'Noble',
      titleFemale: 'Noble',
      titleNonBinary: 'Noble',
      gold: 600,
      statModifiers: { charisma: 15, intelligence: 10, strength: -10 },
      journalText: 'You were born into a prominent Noble family. You inherit 600 Gold, majestic poise (+15 Charisma), and private schooling (+10 Intelligence), but you are physically unconditioned (-10 Strength).'
    },
    {
      id: 'royal',
      name: 'Royal Family',
      weight: 3,
      titleMale: 'Prince',
      titleFemale: 'Princess',
      titleNonBinary: 'Royal Heir',
      gold: 1100,
      statModifiers: { charisma: 20, intelligence: 15, reputation: -10 },
      journalText: 'You were born into the sovereign Royal Family. You start with 1100 Gold, supreme majesty (+20 Charisma), and the finest royal education (+15 Intelligence), but carry political scrutiny (-10 Reputation/Morality risk).'
    }
  ]
};
