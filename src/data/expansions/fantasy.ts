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
    // --- FARMER TRACK ---
    {
      id: 'farmer',
      title: 'Peasant Farmer',
      salary: 12,
      description: 'Till the soil, sow the seeds, and live a humble life close to nature.',
      requirements: { minAge: 14 }
    },
    {
      id: 'farmer_tenant',
      title: 'Tenant Farmer',
      salary: 25,
      description: 'Rent a larger plot of land and manage crop rotations for better yields.',
      requirements: { requiredCareerId: 'farmer', minStats: { strength: 40, health: 45 } }
    },
    {
      id: 'farmer_overseer',
      title: 'Estate Overseer',
      salary: 55,
      description: 'Supervise fields and peasant labors for a local landlord.',
      requirements: { requiredCareerId: 'farmer_tenant', minStats: { strength: 50, health: 55, intelligence: 35 } }
    },
    {
      id: 'farmer_bailiff',
      title: 'Grand Bailiff',
      salary: 120,
      description: 'Manage the entire agricultural output and tax collections of a noble estate.',
      requirements: { requiredCareerId: 'farmer_overseer', minStats: { strength: 55, health: 60, intelligence: 45, charisma: 35 } }
    },

    // --- BLACKSMITH TRACK ---
    {
      id: 'blacksmith',
      title: 'Apprentice Blacksmith',
      salary: 28,
      description: 'Stoke the forge fires and hammer iron. Builds strength and yields reliable gold.',
      requirements: { minAge: 16, minStats: { strength: 35 } }
    },
    {
      id: 'blacksmith_journeyman',
      title: 'Journeyman Blacksmith',
      salary: 60,
      description: 'Travel between villages refining your metalworking skills and creating quality tools.',
      requirements: { requiredCareerId: 'blacksmith', minStats: { strength: 45, health: 40 } }
    },
    {
      id: 'blacksmith_master',
      title: 'Master Armourer',
      salary: 130,
      description: 'Forge custom steel plate and weapons for knights and lords.',
      requirements: { requiredCareerId: 'blacksmith_journeyman', minStats: { strength: 60, health: 50, intelligence: 40 } }
    },
    {
      id: 'blacksmith_royal',
      title: 'Royal Blacksmith',
      salary: 280,
      description: 'Design and forge legendary weapons and crowns directly for the royal court.',
      requirements: { requiredCareerId: 'blacksmith_master', minStats: { strength: 75, health: 60, intelligence: 50, charisma: 45 } }
    },

    // --- GUARD / MILITARY TRACK ---
    {
      id: 'guard',
      title: 'City Guard',
      salary: 40,
      description: 'Patrol the castle ramparts and keep the peace. Requires discipline and might.',
      requirements: { minAge: 18, minStats: { strength: 40, reputation: 50 } }
    },
    {
      id: 'guard_sergeant',
      title: 'Guard Sergeant',
      salary: 85,
      description: 'Command a squad of city guards and organize patrols during street riots.',
      requirements: { requiredCareerId: 'guard', minStats: { strength: 50, reputation: 55, charisma: 35 } }
    },
    {
      id: 'guard_warden',
      title: 'Castle Warden',
      salary: 170,
      description: "Oversee the security, dungeons, and defenses of a lord's castle keep.",
      requirements: { requiredCareerId: 'guard_sergeant', minStats: { strength: 60, reputation: 60, charisma: 45, intelligence: 40 } }
    },
    {
      id: 'guard_commander',
      title: 'Lord Commander',
      salary: 380,
      description: "Command the entire military and defensive forces of the kingdom's capital.",
      requirements: { requiredCareerId: 'guard_warden', minStats: { strength: 70, reputation: 65, charisma: 55, intelligence: 50 } }
    },

    // --- SQUIRE / KNIGHT TRACK ---
    {
      id: 'squire',
      title: 'Squire',
      salary: 30,
      description: 'Polish armor, groom horses, and learn the chivalric code under a master knight.',
      requirements: { minAge: 14, minStats: { strength: 30, charisma: 30 } }
    },
    {
      id: 'knight',
      title: 'Chivalric Knight',
      salary: 110,
      description: 'Swear an oath of fealty to the Crown, fight in tournaments, and protect the weak.',
      requirements: { requiredCareerId: 'squire', minStats: { strength: 50, charisma: 45 } }
    },
    {
      id: 'knight_banneret',
      title: 'Knight Banneret',
      salary: 240,
      description: 'Lead a company of squires and soldiers in battle under your own banner.',
      requirements: { requiredCareerId: 'knight', minStats: { strength: 65, charisma: 55, reputation: 60 } }
    },
    {
      id: 'knight_templar',
      title: 'Grand Templar',
      salary: 550,
      description: 'Command a holy crusading order of knights, reporting only to the Pope or King.',
      requirements: { requiredCareerId: 'knight_banneret', minStats: { strength: 75, charisma: 65, reputation: 70, intelligence: 50 } }
    },

    // --- MAGE TRACK ---
    {
      id: 'mage',
      title: 'Archmage Apprentice',
      salary: 160,
      description: 'Harness the ley lines and channel elemental forces. Requires supreme intelligence.',
      requirements: { minAge: 18, minStats: { intelligence: 70 } }
    },
    {
      id: 'mage_spellweaver',
      title: 'Wizard Spellweaver',
      salary: 320,
      description: 'Synthesize runes and craft complex enchantments for military and household use.',
      requirements: { requiredCareerId: 'mage', minStats: { intelligence: 75, charisma: 40 } }
    },
    {
      id: 'mage_court',
      title: 'Court Wizard',
      salary: 650,
      description: 'Provide magical advice, scrying services, and elemental wards for the royal family.',
      requirements: { requiredCareerId: 'mage_spellweaver', minStats: { intelligence: 80, charisma: 55 } }
    },
    {
      id: 'mage_high',
      title: 'High Archmage',
      salary: 1300,
      description: 'Lead the Council of Mages, holding secrets of life and death, and guiding the empire.',
      requirements: { requiredCareerId: 'mage_court', minStats: { intelligence: 90, charisma: 65, health: 50 } }
    },

    // --- SCRIBE / ADVISOR TRACK ---
    {
      id: 'scribe',
      title: 'Royal Scribe',
      salary: 80,
      description: 'Transcribe royal decrees, file scroll taxes, and maintain the castle archives.',
      requirements: { minAge: 16, minStats: { intelligence: 45 } }
    },
    {
      id: 'royal_advisor',
      title: 'Royal Advisor',
      salary: 320,
      description: "Whisper counsel into the King's ear. Requires immense intellect and cunning charm.",
      requirements: { requiredCareerId: 'scribe', minStats: { intelligence: 65, charisma: 55 } }
    },
    {
      id: 'royal_chancellor',
      title: 'Grand Chancellor',
      salary: 720,
      description: 'Administer the royal treasury, seal treaties, and manage foreign ambassadors.',
      requirements: { requiredCareerId: 'royal_advisor', minStats: { intelligence: 75, charisma: 65, reputation: 50 } }
    },
    {
      id: 'royal_hand',
      title: 'Hand of the King',
      salary: 1600,
      description: "The absolute second-in-command of the realm, ruling from the Iron Throne in the King's absence.",
      requirements: { requiredCareerId: 'royal_chancellor', minStats: { intelligence: 85, charisma: 75, reputation: 60 } }
    },

    // --- MERCHANT TRACK ---
    {
      id: 'peddler',
      title: 'Street Peddler',
      salary: 20,
      description: 'Sell trinkets and spices in the local market square. Teaches basic trade and charisma.',
      requirements: { minAge: 14 }
    },
    {
      id: 'merchant_caravan',
      title: 'Caravan Trader',
      salary: 65,
      description: 'Lead a pack horse through wilderness paths, trading goods across major towns.',
      requirements: { requiredCareerId: 'peddler', minStats: { charisma: 40 } }
    },
    {
      id: 'merchant_guild',
      title: 'Guild Merchant',
      salary: 180,
      description: 'Establish trade routes, buy warehouses, and ship bulk luxury goods across the seas.',
      requirements: { requiredCareerId: 'merchant_caravan', minStats: { charisma: 55, intelligence: 45 } }
    },
    {
      id: 'trade_master',
      title: 'Trade Master',
      salary: 420,
      description: 'Direct the local merchant guild, establishing monopoly routes and bulk shipping deals.',
      requirements: { requiredCareerId: 'merchant_guild', minStats: { charisma: 70, intelligence: 60 } }
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
    },
    {
      id: 'dungeon_raid',
      name: 'Raid a Crypt/Dungeon',
      description: 'Delve into a dark tomb. Go alone (dangerous) or with a sibling/friend/spouse to share risk and loot.',
      cost: 30,
      category: 'health'
    },
    {
      id: 'coliseum_fight',
      name: 'Enter Coliseum Brawl',
      description: 'Enter the city arena to fight gladiators. Might gain reputation, gold, and might, but carries health risks.',
      cost: 10,
      category: 'health'
    },
    {
      id: 'pilgrimage',
      name: 'Go on a Holy Pilgrimage',
      description: 'Journey to a distant mountain shrine to pray. Boosts reputation/morality and traits.',
      cost: 40,
      category: 'study'
    },
    {
      id: 'tavern_brawl',
      name: 'Start a Tavern Brawl',
      description: 'Pick a fight with a rowdy sailor. Builds might, but can cost health.',
      cost: 0,
      category: 'health'
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
    },
    {
      id: "travelling_merchant",
      title: "Travelling Merchant",
      text: "A colourful merchant caravan arrives in town carrying exotic wares from distant kingdoms.",
      weight: 12,
      requirements: {
        minAge: 16
      },
      choices: [
        {
          text: "Browse the wares",
          moralityShift: 2,
          outcomes: [
            {
              chance: 70,
              outcome: {
                text: "You discover useful goods and make a fair purchase.",
                logText: "Purchased useful goods from a travelling merchant.",
                statChanges: {
                  happiness: 8
                },
                goldChange: -25
              }
            },
            {
              chance: 30,
              outcome: {
                text: "You accidentally buy an overpriced trinket.",
                logText: "Overpaid for a useless trinket.",
                statChanges: {
                  happiness: -3
                },
                goldChange: -50
              }
            }
          ]
        },
        {
          text: "Help the merchant unload supplies",
          moralityShift: 5,
          outcomes: [
            {
              chance: 80,
              outcome: {
                text: "The grateful merchant rewards your effort.",
                logText: "Helped a travelling merchant and earned a reward.",
                statChanges: {
                  reputation: 5,
                  happiness: 5
                },
                goldChange: 40
              }
            },
            {
              chance: 20,
              outcome: {
                text: "A crate falls on your foot during unloading.",
                logText: "Was injured while helping a merchant.",
                statChanges: {
                  health: -10
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: "mysterious_shrine",
      title: "Mysterious Shrine",
      text: "Deep in the forest you discover a forgotten shrine glowing with faint magical energy.",
      weight: 8,
      requirements: {
        minAge: 12
      },
      choices: [
        {
          text: "Offer a prayer",
          moralityShift: 8,
          outcomes: [
            {
              chance: 75,
              outcome: {
                text: "A sense of peace fills your heart.",
                logText: "Prayed at a mysterious shrine.",
                statChanges: {
                  happiness: 10,
                  reputation: 5
                }
              }
            },
            {
              chance: 25,
              outcome: {
                text: "Nothing appears to happen.",
                logText: "Visited a shrine but received no blessing.",
                statChanges: {
                  happiness: 2
                }
              }
            }
          ]
        },
        {
          text: "Search for treasure",
          moralityShift: -5,
          outcomes: [
            {
              chance: 60,
              outcome: {
                text: "You uncover a hidden pouch of coins.",
                logText: "Looted treasure from a shrine.",
                goldChange: 120,
                statChanges: {
                  happiness: 5
                }
              }
            },
            {
              chance: 40,
              outcome: {
                text: "The shrine's curse weakens you.",
                logText: "Suffered a curse after looting a shrine.",
                statChanges: {
                  health: -15,
                  happiness: -5
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: "tavern_dispute",
      title: "Tavern Dispute",
      text: "Two drunken patrons begin arguing loudly. Soon the entire tavern is watching.",
      weight: 15,
      requirements: {
        minAge: 18
      },
      choices: [
        {
          text: "Try to calm them down",
          moralityShift: 8,
          outcomes: [
            {
              chance: 70,
              outcome: {
                text: "You successfully settle the dispute.",
                logText: "Resolved a tavern dispute peacefully.",
                statChanges: {
                  reputation: 8,
                  charisma: 2
                }
              }
            },
            {
              chance: 30,
              outcome: {
                text: "One of them punches you.",
                logText: "Was injured while stopping a tavern fight.",
                statChanges: {
                  health: -8
                }
              }
            }
          ]
        },
        {
          text: "Join the fight",
          moralityShift: -10,
          outcomes: [
            {
              chance: 60,
              outcome: {
                text: "You win and impress the crowd.",
                logText: "Won a tavern brawl.",
                statChanges: {
                  strength: 3,
                  reputation: 3
                }
              }
            },
            {
              chance: 40,
              outcome: {
                text: "You are thrown through a table.",
                logText: "Lost a tavern brawl.",
                statChanges: {
                  health: -15,
                  happiness: -5
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: "opportunity_generous_patron",
      title: "A Generous Patron",
      text: {
        default: "A wealthy stranger has taken interest in your potential.",
        farmer: "A wealthy landowner admires your hard work in the fields.",
        blacksmith: "A nobleman is impressed by your craftsmanship.",
        guard: "A local magistrate notices your dedication.",
        knight: "A lord has heard tales of your valor.",
        mage: "An archmage sees promise in your studies.",
        royal_advisor: "A noble house seeks your guidance."
      },
      weight: 12,
      requirements: {
        minAge: 16
      },
      choices: [
        {
          text: "Accept their support",
          moralityShift: 3,
          outcomes: [
            {
              chance: 80,
              outcome: {
                text: "The investment pays off.",
                logText: {
                  default: "Accepted support from a wealthy patron.",
                  farmer: "Received support from a wealthy landowner.",
                  blacksmith: "Received sponsorship for your forge.",
                  guard: "Received backing from a magistrate.",
                  knight: "Received support from a noble patron.",
                  mage: "Received support from an archmage.",
                  royal_advisor: "Received support from an influential noble family."
                },
                goldChange: 100,
                statChanges: {
                  reputation: 5,
                  happiness: 5
                }
              }
            },
            {
              chance: 20,
              outcome: {
                text: "Their promises turn out to be empty.",
                logText: "Trusted a patron who failed to deliver.",
                statChanges: {
                  happiness: -5
                }
              }
            }
          ]
        },
        {
          text: "Refuse politely",
          moralityShift: 1,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You choose independence over assistance.",
                logText: "Declined assistance from a wealthy patron.",
                statChanges: {
                  reputation: 2
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: "disaster_unexpected_fire",
      title: "Unexpected Fire",
      text: {
        default: "A sudden fire breaks out nearby.",
        farmer: "Part of your crops catch fire.",
        blacksmith: "Sparks ignite part of your workshop.",
        guard: "A fire erupts in a crowded district.",
        knight: "A stable catches fire during the night.",
        mage: "A magical experiment causes a blaze.",
        royal_advisor: "A fire breaks out in a government building."
      },
      weight: 10,
      requirements: {
        minAge: 18
      },
      choices: [
        {
          text: "Attempt to contain it",
          moralityShift: 5,
          outcomes: [
            {
              chance: 70,
              outcome: {
                text: "You successfully limit the damage.",
                logText: "Helped contain a dangerous fire.",
                statChanges: {
                  reputation: 6
                }
              }
            },
            {
              chance: 30,
              outcome: {
                text: "You suffer injuries while helping.",
                logText: "Was injured while fighting a fire.",
                statChanges: {
                  health: -15,
                  reputation: 3
                }
              }
            }
          ]
        },
        {
          text: "Protect yourself first",
          moralityShift: -3,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You avoid harm but others suffer losses.",
                logText: "Prioritized personal safety during a fire.",
                statChanges: {
                  happiness: -3
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: "opportunity_hidden_cache",
      title: "Hidden Cache",
      text: {
        default: "You discover a hidden stash concealed from public view.",
        farmer: "You uncover a buried chest while plowing.",
        blacksmith: "A loose stone reveals a hidden compartment in your forge.",
        guard: "You discover contraband hidden in a warehouse.",
        knight: "You find a forgotten cache near an old battlefield.",
        mage: "You discover magical relics hidden beneath a ruined tower.",
        royal_advisor: "You uncover secret records hidden in the archives."
      },
      weight: 8,
      choices: [
        {
          text: "Claim it for yourself",
          moralityShift: -8,
          outcomes: [
            {
              chance: 75,
              outcome: {
                text: "You profit greatly from your discovery.",
                logText: "Kept a hidden cache for personal gain.",
                goldChange: 150,
                statChanges: {
                  happiness: 8
                }
              }
            },
            {
              chance: 25,
              outcome: {
                text: "The true owner discovers your actions.",
                logText: "Was exposed for taking a hidden cache.",
                goldChange: -100,
                statChanges: {
                  reputation: -10
                }
              }
            }
          ]
        },
        {
          text: "Report it",
          moralityShift: 10,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "Your honesty earns widespread respect.",
                logText: "Reported a hidden cache to the authorities.",
                statChanges: {
                  reputation: 10
                },
                goldChange: 50
              }
            }
          ]
        }
      ]
    },
    {
      id: "relationship_new_acquaintance",
      title: "A New Acquaintance",
      text: {
        default: "You meet someone interesting during your travels.",
        farmer: "A traveler stops by your farm.",
        blacksmith: "A customer lingers to talk after placing an order.",
        guard: "A citizen thanks you for your service.",
        knight: "A noble guest takes interest in you.",
        mage: "A scholar wishes to exchange knowledge.",
        royal_advisor: "A diplomat seeks your company."
      },
      weight: 15,
      choices: [
        {
          text: "Spend time together",
          moralityShift: 2,
          outcomes: [
            {
              chance: 80,
              outcome: {
                text: "You develop a meaningful friendship.",
                logText: "Formed a promising new friendship.",
                relationshipChange: {
                  type: "friend"
                },
                statChanges: {
                  happiness: 10,
                  charisma: 3
                }
              }
            },
            {
              chance: 20,
              outcome: {
                text: "You realize you have little in common.",
                logText: "Failed to build a connection with a new acquaintance.",
                statChanges: {
                  happiness: -2
                }
              }
            }
          ]
        },
        {
          text: "Remain distant",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You continue your life unchanged.",
                logText: "Chose not to pursue a new friendship."
              }
            }
          ]
        }
      ]
    },
    {
      id: "crime_suspicious_offer",
      title: "A Suspicious Offer",
      text: {
        default: "Someone approaches you with a questionable opportunity.",
        farmer: "A trader offers stolen goods at a bargain price.",
        blacksmith: "A stranger asks you to forge illegal weapons.",
        guard: "A criminal offers a bribe.",
        knight: "A noble offers payment for dishonorable work.",
        mage: "A cultist offers forbidden knowledge.",
        royal_advisor: "A faction offers political favors."
      },
      weight: 12,
      requirements: {
        minAge: 18
      },
      choices: [
        {
          text: "Accept",
          moralityShift: -12,
          outcomes: [
            {
              chance: 65,
              outcome: {
                text: "You profit from the arrangement.",
                logText: "Accepted a suspicious offer for personal gain.",
                goldChange: 120
              }
            },
            {
              chance: 35,
              outcome: {
                text: "The scheme collapses and you are implicated.",
                logText: "Suffered consequences after accepting a suspicious offer.",
                goldChange: -150,
                statChanges: {
                  reputation: -12,
                  happiness: -5
                }
              }
            }
          ]
        },
        {
          text: "Refuse",
          moralityShift: 8,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You keep your conscience clear.",
                logText: "Refused a suspicious offer.",
                statChanges: {
                  reputation: 5
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: "helping_father",
      title: "Helping Father",
      text: {
        default: "Your father is struggling with today's work and asks for your help.",
        farmer: "Your father asks you to help gather crops from the field.",
        blacksmith: "Your father asks you to help organize tools in the forge.",
        merchant: "Your father asks you to help count inventory.",
        noble: "Your father asks you to accompany him during estate inspections.",
        royal: "Your father invites you to observe an important court meeting."
      },
      weight: 15,
      requirements: {
        minAge: 4,
        maxAge: 8
      },
      choices: [
        {
          text: "Help enthusiastically",
          moralityShift: 5,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "Your father appreciates your effort.",
                logText: "Helped your father with his responsibilities.",
                statChanges: {
                  happiness: 5,
                  reputation: 2
                },
                relationshipChange: {
                  type: "modify",
                  relationId: "father",
                  amount: 10
                },
                addTraits: ["Kind"]
              }
            }
          ]
        },
        {
          text: "Refuse and go play",
          moralityShift: -3,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "Your father seems disappointed.",
                logText: "Refused to help your father.",
                statChanges: {
                  happiness: 3
                },
                relationshipChange: {
                  type: "modify",
                  relationId: "father",
                  amount: -8
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: "family_pet",
      title: "A Family Pet",
      text: {
        default: "A small animal has wandered near your home.",
        farmer: "A stray sheep follows you home from the fields.",
        blacksmith: "A scruffy dog begins sleeping near the forge.",
        merchant: "A clever cat starts visiting your family's shop.",
        noble: "A hunting hound puppy is gifted to your family.",
        royal: "An exotic bird is gifted to the royal household."
      },
      weight: 10,
      requirements: {
        minAge: 5,
        maxAge: 10
      },
      choices: [
        {
          text: "Take care of it",
          moralityShift: 6,
          outcomes: [
            {
              chance: 80,
              outcome: {
                text: "The animal becomes your loyal companion.",
                logText: "Raised a beloved family pet.",
                statChanges: {
                  happiness: 10
                },
                addTraits: ["Kind"]
              }
            },
            {
              chance: 20,
              outcome: {
                text: "Caring for the animal teaches responsibility.",
                logText: "Learned responsibility from caring for a pet.",
                statChanges: {
                  intelligence: 2,
                  happiness: 5
                },
                addTraits: ["Responsible"]
              }
            }
          ]
        },
        {
          text: "Ignore it",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "The animal eventually wanders away.",
                logText: "Ignored a wandering animal.",
                statChanges: {
                  happiness: -2
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: "lost_toy",
      title: "Lost Toy",
      text: "While playing outside, you realize your favorite toy is missing.",
      weight: 12,
      requirements: {
        minAge: 6,
        maxAge: 11
      },
      choices: [
        {
          text: "Search the woods alone",
          moralityShift: 1,
          outcomes: [
            {
              chance: 70,
              outcome: {
                text: "You find the toy after a long search.",
                logText: "Bravely searched for and recovered a lost toy.",
                statChanges: {
                  happiness: 8
                },
                addTraits: ["Brave"]
              }
            },
            {
              chance: 30,
              outcome: {
                text: "You get lost and return home frightened.",
                logText: "Got lost while searching for a toy.",
                statChanges: {
                  happiness: -5,
                  health: -3
                }
              }
            }
          ]
        },
        {
          text: "Ask an adult for help",
          moralityShift: 3,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "An adult helps you recover the toy safely.",
                logText: "Asked for help finding a lost toy.",
                statChanges: {
                  happiness: 5
                },
                addTraits: ["Cautious"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "helping_mother",
      title: "Helping Mother",
      text: {
        default: "Your mother is busy with her daily tasks and asks for your help.",
        farmer: "Your mother asks you to help prepare food for the workers.",
        blacksmith: "Your mother asks you to sort supplies for the forge.",
        merchant: "Your mother needs help organizing the family shop.",
        noble: "Your mother asks for help preparing for important guests.",
        royal: "Your mother asks you to assist with preparations for a royal banquet."
      },
      weight: 15,
      requirements: {
        minAge: 5,
        maxAge: 12
      },
      choices: [
        {
          text: "Help willingly",
          moralityShift: 5,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "Your mother is grateful for your assistance.",
                logText: "Helped your mother with her responsibilities.",
                statChanges: {
                  happiness: 5
                },
                relationshipChange: {
                  type: "modify",
                  relationId: "mother",
                  amount: 10
                },
                addTraits: ["Kind"]
              }
            }
          ]
        },
        {
          text: "Make excuses",
          moralityShift: -2,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "Your mother looks disappointed.",
                logText: "Avoided helping your mother.",
                relationshipChange: {
                  type: "modify",
                  relationId: "mother",
                  amount: -8
                },
                addTraits: ["Lazy"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "village_fair",
      title: "Village Fair",
      text: {
        default: "The annual village fair has arrived with games, food, and prizes.",
        noble: "A grand fair has been organized for local nobles and merchants.",
        royal: "A magnificent festival is held in honor of the royal household."
      },
      weight: 12,
      requirements: {
        minAge: 5,
        maxAge: 12
      },
      choices: [
        {
          text: "Enter a competition",
          outcomes: [
            {
              chance: 65,
              outcome: {
                text: "You win a small prize.",
                logText: "Won a prize at the village fair.",
                goldChange: 15,
                statChanges: {
                  happiness: 8,
                  reputation: 3
                }
              }
            },
            {
              chance: 35,
              outcome: {
                text: "You fail to win anything.",
                logText: "Lost a competition at the village fair.",
                statChanges: {
                  happiness: -2
                }
              }
            }
          ]
        },
        {
          text: "Spend your coin on treats",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You enjoy a wonderful day.",
                logText: "Spent money enjoying the village fair.",
                goldChange: -10,
                statChanges: {
                  happiness: 10
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: "first_friend",
      title: "First Friend",
      text: "You meet another child who seems eager to spend time with you.",
      weight: 14,
      requirements: {
        minAge: 6,
        maxAge: 12
      },
      choices: [
        {
          text: "Become friends",
          moralityShift: 3,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "A lasting friendship begins.",
                logText: "Made your first close friend.",
                relationshipChange: {
                  type: "friend"
                },
                statChanges: {
                  happiness: 8,
                  charisma: 2
                },
                addTraits: ["Kind"]
              }
            }
          ]
        },
        {
          text: "Keep to yourself",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You decide to remain alone.",
                logText: "Chose not to make a new friend.",
                statChanges: {
                  happiness: -2
                },
                addTraits: ["Cautious"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "childhood_illness",
      title: "Childhood Illness",
      text: "You wake up feeling weak and feverish.",
      weight: 10,
      requirements: {
        minAge: 5,
        maxAge: 12
      },
      choices: [
        {
          text: "Rest and recover",
          outcomes: [
            {
              chance: 80,
              outcome: {
                text: "After several days of rest, you recover.",
                logText: "Recovered from a childhood illness.",
                statChanges: {
                  health: -5
                }
              }
            },
            {
              chance: 20,
              outcome: {
                text: "The illness leaves you weakened.",
                logText: "Suffered lasting effects from a childhood illness.",
                statChanges: {
                  health: -15,
                  happiness: -5
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: "sneaking_out",
      title: "Sneaking Out",
      text: "You are tempted to leave home after dark without permission.",
      weight: 10,
      requirements: {
        minAge: 8,
        maxAge: 12
      },
      choices: [
        {
          text: "Sneak out",
          moralityShift: -4,
          outcomes: [
            {
              chance: 70,
              outcome: {
                text: "You enjoy an exciting adventure.",
                logText: "Snuck out at night.",
                statChanges: {
                  happiness: 8
                },
                addTraits: ["Rebellious"]
              }
            },
            {
              chance: 30,
              outcome: {
                text: "Your parents catch you and punish you.",
                logText: "Was caught sneaking out.",
                statChanges: {
                  happiness: -8
                },
                relationshipChange: {
                  type: "modify",
                  relationId: "father",
                  amount: -5
                }
              }
            }
          ]
        },
        {
          text: "Stay home",
          moralityShift: 2,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You decide not to take the risk.",
                logText: "Stayed home instead of sneaking out.",
                addTraits: ["Cautious"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "school_lesson",
      title: "Important Lesson",
      text: "A teacher presents a difficult lesson and asks the class questions.",
      weight: 14,
      requirements: {
        minAge: 7,
        maxAge: 12
      },
      choices: [
        {
          text: "Pay close attention",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You learn something valuable.",
                logText: "Studied diligently during a lesson.",
                statChanges: {
                  intelligence: 5
                },
                addTraits: ["Ambitious"]
              }
            }
          ]
        },
        {
          text: "Daydream instead",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You miss much of the lesson.",
                logText: "Ignored an important lesson.",
                statChanges: {
                  intelligence: -2
                },
                addTraits: ["Lazy"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "family_argument",
      title: "Family Argument",
      text: "Your parents have a serious disagreement at home.",
      weight: 8,
      requirements: {
        minAge: 6,
        maxAge: 12
      },
      choices: [
        {
          text: "Try to calm things down",
          moralityShift: 5,
          outcomes: [
            {
              chance: 70,
              outcome: {
                text: "Your efforts help ease tensions.",
                logText: "Helped calm a family argument.",
                relationshipChange: {
                  type: "modify",
                  relationId: "mother",
                  amount: 5
                },
                addTraits: ["Kind"]
              }
            },
            {
              chance: 30,
              outcome: {
                text: "The argument continues despite your efforts.",
                logText: "Failed to calm a family argument.",
                statChanges: {
                  happiness: -3
                }
              }
            }
          ]
        },
        {
          text: "Stay out of it",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You avoid getting involved.",
                logText: "Stayed out of a family argument.",
                addTraits: ["Cautious"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "sibling_rivalry",
      title: "Sibling Rivalry",
      text: {
        default: "A disagreement with your sibling has grown into a serious feud.",
        farmer: "Your sibling claims they worked harder on the family land than you.",
        blacksmith: "Your sibling asks why you get to sort supplies while they do the heavy lifting.",
        merchant: "Your sibling accuses you of receiving a larger share of family profits.",
        noble: "Your sibling believes you receive more favor from your family.",
        royal: "Your sibling believes you receive more favor from your family."
      },
      weight: 10,
      requirements: {
        minAge: 18,
        hasSibling: true
      },
      choices: [
        {
          text: "Attempt reconciliation",
          moralityShift: 6,
          outcomes: [
            {
              chance: 80,
              outcome: {
                text: "You manage to settle your differences.",
                logText: "Reconciled with a sibling after a dispute.",
                relationshipChange: {
                  type: "modify",
                  relationId: "sibling",
                  amount: 15
                },
                statChanges: {
                  happiness: 5,
                  reputation: 3
                }
              }
            },
            {
              chance: 20,
              outcome: {
                text: "Your sibling refuses to forgive you.",
                logText: "Failed to reconcile with a sibling.",
                relationshipChange: {
                  type: "modify",
                  relationId: "sibling",
                  amount: -5
                }
              }
            }
          ]
        },
        {
          text: "Escalate the feud",
          moralityShift: -8,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "The relationship deteriorates further.",
                logText: "Escalated a feud with a sibling.",
                relationshipChange: {
                  type: "modify",
                  relationId: "sibling",
                  amount: -20
                },
                addTraits: ["Greedy"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "arranged_marriage_offer",
      title: "Arranged Marriage Offer",
      text: {
        default: "Your family proposes a marriage that could improve your standing.",
        farmer: "A neighboring farming family proposes a marriage alliance.",
        blacksmith: "A wealthy metalworker family seeks a union with yours.",
        merchant: "A wealthy trading family seeks to unite their business with yours.",
        noble: "A powerful noble house offers a marriage alliance.",
        royal: "A politically important royal marriage is proposed."
      },
      weight: 8,
      requirements: {
        minAge: 18,
        hasSpouse: false
      },
      choices: [
        {
          text: "Accept",
          moralityShift: 2,
          outcomes: [
            {
              chance: 75,
              outcome: {
                text: "The arrangement proves beneficial.",
                logText: "Accepted an arranged marriage.",
                goldChange: 150,
                relationshipChange: {
                  type: "spouse"
                },
                statChanges: {
                  reputation: 8,
                  happiness: 3
                }
              }
            },
            {
              chance: 25,
              outcome: {
                text: "The marriage is difficult despite its advantages.",
                logText: "Accepted an arranged marriage that brought little happiness.",
                goldChange: 100,
                relationshipChange: {
                  type: "spouse",
                  amount: 40
                },
                statChanges: {
                  happiness: -10,
                  reputation: 5
                }
              }
            }
          ]
        },
        {
          text: "Refuse",
          moralityShift: 4,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You choose your own path.",
                logText: "Refused an arranged marriage proposal.",
                statChanges: {
                  happiness: 5
                },
                addTraits: ["Rebellious"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "family_secret",
      title: "A Family Secret",
      text: {
        default: "You uncover information that could damage your family's reputation.",
        farmer: "You discover your family's records of taxes were fabricated.",
        blacksmith: "You discover your family has been selling low-quality metal to the military.",
        merchant: "You discover evidence of questionable business dealings.",
        noble: "You learn of a scandal hidden by your family for years.",
        royal: "You uncover a politically dangerous secret."
      },
      weight: 7,
      requirements: {
        minAge: 18
      },
      choices: [
        {
          text: "Keep the secret",
          moralityShift: 8,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You protect your family.",
                logText: "Protected a family secret.",
                statChanges: {
                  reputation: 5
                },
                addTraits: ["Responsible"]
              }
            }
          ]
        },
        {
          text: "Exploit the secret",
          moralityShift: -12,
          outcomes: [
            {
              chance: 70,
              outcome: {
                text: "You gain leverage and wealth.",
                logText: "Used a family secret for personal gain.",
                goldChange: 200,
                addTraits: ["Greedy"]
              }
            },
            {
              chance: 30,
              outcome: {
                text: "The truth comes out and damages everyone involved.",
                logText: "A family secret became public and caused scandal.",
                statChanges: {
                  reputation: -15,
                  happiness: -10
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: "family_sickness",
      title: "Sickness in the Family",
      text: {
        default: "A close family member has fallen seriously ill.",
        farmer: "Your family struggles to work the land while a loved one is bedridden.",
        merchant: "Your business suffers as you care for a sick relative.",
        noble: "A respected member of your house has become gravely ill.",
        royal: "The illness of a family member has become a matter of public concern."
      },
      weight: 10,
      requirements: {
        minAge: 18
      },
      choices: [
        {
          text: "Pay for the best treatment",
          moralityShift: 6,
          outcomes: [
            {
              chance: 75,
              outcome: {
                text: "The treatment succeeds.",
                logText: "Paid for treatment that saved a family member.",
                goldChange: -150,
                statChanges: {
                  happiness: 8,
                  reputation: 3
                },
                addTraits: ["Kind"]
              }
            },
            {
              chance: 25,
              outcome: {
                text: "Despite your efforts, the illness persists.",
                logText: "Spent heavily on treatment with little success.",
                goldChange: -150,
                statChanges: {
                  happiness: -5
                }
              }
            }
          ]
        },
        {
          text: "Rely on prayers and hope",
          moralityShift: 2,
          outcomes: [
            {
              chance: 50,
              outcome: {
                text: "The family member slowly recovers.",
                logText: "A family member recovered unexpectedly.",
                statChanges: {
                  happiness: 5
                }
              }
            },
            {
              chance: 50,
              outcome: {
                text: "The illness worsens.",
                logText: "A family member's condition worsened.",
                statChanges: {
                  happiness: -8
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: "siblings_wedding",
      title: "Sibling's Wedding",
      text: {
        default: "Your sibling is getting married and expects a meaningful gift from you."
      },
      weight: 8,
      requirements: {
        minAge: 18,
        hasSibling: true
      },
      choices: [
        {
          text: "Give an expensive gift",
          moralityShift: 5,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "Your generosity is greatly appreciated.",
                logText: "Gave an expensive wedding gift to a sibling.",
                goldChange: -100,
                relationshipChange: {
                  type: "modify",
                  relationId: "sibling",
                  amount: 15
                },
                statChanges: {
                  reputation: 5
                }
              }
            }
          ]
        },
        {
          text: "Give a modest gift",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "Your sibling appreciates the gesture.",
                logText: "Gave a modest wedding gift to a sibling.",
                goldChange: -25,
                relationshipChange: {
                  type: "modify",
                  relationId: "sibling",
                  amount: 5
                }
              }
            }
          ]
        },
        {
          text: "Skip the wedding",
          moralityShift: -6,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "Your absence causes resentment.",
                logText: "Skipped a sibling's wedding.",
                relationshipChange: {
                  type: "modify",
                  relationId: "sibling",
                  amount: -15
                },
                statChanges: {
                  reputation: -3
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: "distant_cousin_visit",
      title: "A Distant Cousin",
      text: {
        default: "A distant cousin arrives seeking assistance.",
        farmer: "A struggling cousin asks for food and shelter.",
        merchant: "A cousin seeks funding for a risky venture.",
        noble: "A distant relative asks for political support.",
        royal: "A forgotten branch of the family seeks royal favor."
      },
      weight: 9,
      requirements: {
        minAge: 18
      },
      choices: [
        {
          text: "Help them",
          moralityShift: 6,
          outcomes: [
            {
              chance: 80,
              outcome: {
                text: "Your kindness is remembered.",
                logText: "Helped a distant cousin in need.",
                goldChange: -75,
                statChanges: {
                  happiness: 5,
                  reputation: 5
                },
                addTraits: ["Kind"]
              }
            },
            {
              chance: 20,
              outcome: {
                text: "The help is wasted and nothing comes of it.",
                logText: "Assisted a cousin who squandered the opportunity.",
                goldChange: -75,
                statChanges: {
                  happiness: -3
                }
              }
            }
          ]
        },
        {
          text: "Refuse",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You keep your resources but earn some criticism.",
                logText: "Refused to help a distant cousin.",
                statChanges: {
                  reputation: -2
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: "sibling_asks_for_loan",
      title: "A Sibling's Request",
      text: {
        default: "Your sibling approaches you asking for financial assistance.",
        farmer: "Your sibling's farm is struggling after a poor harvest.",
        merchant: "Your sibling's business is on the verge of collapse.",
        noble: "Your sibling has fallen into debt after a costly mistake.",
        royal: "A member of your royal family requests funds to resolve a scandal."
      },
      weight: 9,
      requirements: {
        minAge: 18,
        hasSibling: true
      },
      choices: [
        {
          text: "Provide the full loan",
          moralityShift: 8,
          outcomes: [
            {
              chance: 75,
              outcome: {
                text: "Your sibling is deeply grateful.",
                logText: "Provided a generous loan to a sibling.",
                goldChange: -150,
                relationshipChange: {
                  type: "modify",
                  relationId: "sibling",
                  amount: 15
                },
                addTraits: ["Kind"]
              }
            },
            {
              chance: 25,
              outcome: {
                text: "The money is wasted, but your sibling appreciates the effort.",
                logText: "Loaned money that was ultimately squandered.",
                goldChange: -150,
                relationshipChange: {
                  type: "modify",
                  relationId: "sibling",
                  amount: 8
                }
              }
            }
          ]
        },
        {
          text: "Offer partial help",
          moralityShift: 3,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "Your sibling appreciates the assistance.",
                logText: "Provided partial financial support to a sibling.",
                goldChange: -75,
                relationshipChange: {
                  type: "modify",
                  relationId: "sibling",
                  amount: 5
                }
              }
            }
          ]
        },
        {
          text: "Refuse",
          moralityShift: -5,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "Your sibling leaves disappointed.",
                logText: "Refused a sibling's request for help.",
                relationshipChange: {
                  type: "modify",
                  relationId: "sibling",
                  amount: -12
                },
                addTraits: ["Greedy"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "child_shows_talent",
      title: "A Gifted Child",
      text: {
        default: "One of your children shows remarkable potential.",
        farmer: "Your child displays an exceptional talent for managing the land.",
        merchant: "Your child demonstrates a natural talent for trade.",
        knight: "Your child shows promise in combat and leadership.",
        mage: "Your child exhibits unusual magical aptitude.",
        noble: "Your child impresses tutors with their intelligence.",
        royal: "Your child is already attracting attention at court."
      },
      weight: 8,
      requirements: {
        minAge: 25,
        hasChildren: true
      },
      choices: [
        {
          text: "Invest heavily in their future",
          moralityShift: 6,
          outcomes: [
            {
              chance: 80,
              outcome: {
                text: "Your investment greatly benefits your child.",
                logText: "Invested heavily in a talented child.",
                goldChange: -200,
                relationshipChange: {
                  type: "modify",
                  relationId: "child",
                  amount: 15
                },
                statChanges: {
                  reputation: 5,
                  happiness: 5
                }
              }
            },
            {
              chance: 20,
              outcome: {
                text: "The investment yields disappointing results.",
                logText: "Invested heavily in a child with little return.",
                goldChange: -200,
                relationshipChange: {
                  type: "modify",
                  relationId: "child",
                  amount: 5
                }
              }
            }
          ]
        },
        {
          text: "Offer encouragement only",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "Your child appreciates your support.",
                logText: "Encouraged a talented child.",
                relationshipChange: {
                  type: "modify",
                  relationId: "child",
                  amount: 8
                }
              }
            }
          ]
        },
        {
          text: "Ignore it",
          moralityShift: -4,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "Your child feels neglected.",
                logText: "Ignored a child's talents.",
                relationshipChange: {
                  type: "modify",
                  relationId: "child",
                  amount: -15
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: "elderly_parent_care",
      title: "Aging Parent",
      text: {
        default: "One of your parents can no longer care for themselves properly."
      },
      weight: 10,
      requirements: {
        minAge: 25
      },
      choices: [
        {
          text: "Personally care for them",
          moralityShift: 10,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "Your parent is comforted by your presence.",
                logText: "Personally cared for an aging parent.",
                relationshipChange: {
                  type: "modify",
                  relationId: "mother",
                  amount: 10
                },
                statChanges: {
                  happiness: -3,
                  reputation: 5
                },
                addTraits: ["Kind"]
              }
            }
          ]
        },
        {
          text: "Hire professional help",
          moralityShift: 5,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "Your parent receives proper care.",
                logText: "Paid for professional care for an aging parent.",
                goldChange: -100,
                relationshipChange: {
                  type: "modify",
                  relationId: "mother",
                  amount: 5
                }
              }
            }
          ]
        },
        {
          text: "Do nothing",
          moralityShift: -10,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "Your parent feels abandoned.",
                logText: "Neglected an aging parent.",
                relationshipChange: {
                  type: "modify",
                  relationId: "mother",
                  amount: -15
                },
                statChanges: {
                  reputation: -8
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: "sibling_land_dispute",
      title: "Disputed Inheritance",
      text: {
        default: "A disagreement arises over ownership of family land.",
        farmer: "The family farm is at the center of a bitter dispute.",
        merchant: "A valuable family property has become contested.",
        noble: "Several heirs claim ownership of an estate.",
        royal: "A succession dispute threatens family stability."
      },
      weight: 7,
      requirements: {
        minAge: 18,
        hasSibling: true
      },
      choices: [
        {
          text: "Divide it fairly",
          moralityShift: 10,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "Everyone receives a reasonable share.",
                logText: "Resolved an inheritance dispute fairly.",
                relationshipChange: {
                  type: "modify",
                  relationId: "sibling",
                  amount: 15
                },
                statChanges: {
                  reputation: 8
                },
                addTraits: ["Honest"]
              }
            }
          ]
        },
        {
          text: "Negotiate for more",
          moralityShift: -2,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You secure a larger share.",
                logText: "Negotiated aggressively during an inheritance dispute.",
                goldChange: 150,
                relationshipChange: {
                  type: "modify",
                  relationId: "sibling",
                  amount: -8
                }
              }
            }
          ]
        },
        {
          text: "Claim everything",
          moralityShift: -15,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You take complete control of the inheritance.",
                logText: "Claimed an entire inheritance for yourself.",
                goldChange: 300,
                relationshipChange: {
                  type: "modify",
                  relationId: "sibling",
                  amount: -25
                },
                statChanges: {
                  reputation: -10
                },
                addTraits: ["Greedy"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "travelling_merchant",
      title: "Travelling Merchant",
      text: {
        default: "A travelling merchant offers a sealed wooden crate containing 'unknown wonders' for a steep price.",
        farmer: "A merchant in a colorful wagon offers to sell you 'exotic subterranean roots' that he promises will double your harvest.",
        merchant: "A fellow trader offers you a share in a bulk cargo of silks from the Eastern Dynasties, but refuses to show you the manifest.",
        noble: "A merchant smuggler offers to sell you a casket of rare elixirs allegedly imported from the Elven Lands.",
        royal: "A foreign merchant offers to sell you a collection of rare art pieces from across the sea."
      },
      weight: 10,
      requirements: {
        minAge: 16
      },
      choices: [
        {
          text: "Invest in the deal",
          requirements: {
            minGold: 100
          },
          outcomes: [
            {
              chance: 60,
              outcome: {
                text: "The investment pays off beautifully! You discover valuable goods inside.",
                logText: "Invested with a travelling merchant and made a handsome profit.",
                goldChange: 250,
                statChanges: {
                  reputation: 5
                }
              }
            },
            {
              chance: 40,
              outcome: {
                text: "It was a total scam. The crate was filled with rocks and rusted scrap.",
                logText: "Scammed by a travelling merchant.",
                goldChange: -100,
                statChanges: {
                  happiness: -10
                }
              }
            }
          ]
        },
        {
          text: "Negotiate terms",
          requirements: {
            minStats: {
              charisma: 50
            }
          },
          outcomes: [
            {
              chance: 80,
              outcome: {
                text: "Your sharp negotiating skills secure a discount, and the goods prove solid.",
                logText: "Negotiated a discount with a merchant and turned a profit.",
                goldChange: 150,
                statChanges: {
                  reputation: 10
                }
              }
            },
            {
              chance: 20,
              outcome: {
                text: "The merchant takes offense to your low offer and packs up his stall.",
                logText: "Failed to negotiate with a travelling merchant.",
                statChanges: {
                  happiness: -2
                }
              }
            }
          ]
        },
        {
          text: "Ignore them",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You decide it's too risky and walk away.",
                logText: "Decided to ignore a travelling merchant's offer.",
                addTraits: ["Cautious"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "hidden_treasure_map",
      title: "Hidden Treasure Map",
      text: {
        default: "You find a dusty leather map in an old book suggesting treasure is buried nearby."
      },
      weight: 8,
      requirements: {
        minAge: 16
      },
      choices: [
        {
          text: "Search alone",
          moralityShift: 2,
          outcomes: [
            {
              chance: 40,
              outcome: {
                text: "After hours of digging, you unearth a chest of ancient coins!",
                logText: "Found buried treasure after searching alone.",
                goldChange: 300,
                addTraits: ["Brave"]
              }
            },
            {
              chance: 30,
              outcome: {
                text: "You step on a hidden pressure plate and get wounded by a trap.",
                logText: "Injured by a trap while searching for treasure.",
                statChanges: {
                  health: -15,
                  happiness: -10
                }
              }
            },
            {
              chance: 30,
              outcome: {
                text: "You dig for hours but find nothing but dirt and worms.",
                logText: "Searched for treasure alone but found nothing.",
                statChanges: {
                  happiness: -5
                }
              }
            }
          ]
        },
        {
          text: "Hire help",
          requirements: {
            minGold: 80
          },
          outcomes: [
            {
              chance: 80,
              outcome: {
                text: "Your team successfully unearths the treasure chest. You split the bounty fairly.",
                logText: "Hired helpers and successfully shared the treasure.",
                goldChange: 120,
                statChanges: {
                  reputation: 8
                }
              }
            },
            {
              chance: 20,
              outcome: {
                text: "Once the chest is found, your helpers turn on you, rob you, and flee.",
                logText: "Robbed by helpers while searching for treasure.",
                goldChange: -80,
                statChanges: {
                  happiness: -15,
                  health: -5
                },
                addTraits: ["Cautious"]
              }
            }
          ]
        },
        {
          text: "Sell the map",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You sell the map to a local collector in the tavern.",
                logText: "Sold a mysterious treasure map.",
                goldChange: 80,
                addTraits: ["Cautious"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "wealthy_patron",
      title: "Wealthy Patron",
      text: {
        default: "An influential local figure notices your potential and offers to sponsor your endeavors.",
        farmer: "A wealthy landowner offers to sponsor your agricultural projects.",
        merchant: "A powerful guild master offers to finance your trade caravans.",
        noble: "A senior noble house offers to fund your courtly education.",
        royal: "An elder statesman offers to back your political faction."
      },
      weight: 9,
      requirements: {
        minAge: 18
      },
      choices: [
        {
          text: "Accept support",
          moralityShift: -2,
          outcomes: [
            {
              chance: 70,
              outcome: {
                text: "They provide you with a substantial stipend to build your career.",
                logText: "Accepted career support from a wealthy patron.",
                goldChange: 150,
                statChanges: {
                  reputation: 10
                },
                addTraits: ["Ambitious"]
              }
            },
            {
              chance: 30,
              outcome: {
                text: "The patron turns out to be extremely demanding, harming your reputation with their scandals.",
                logText: "Accepted support from a patron who caused public scandals.",
                statChanges: {
                  reputation: -10,
                  happiness: -8
                },
                addTraits: ["Rebellious"]
              }
            }
          ]
        },
        {
          text: "Politely decline",
          moralityShift: 5,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You maintain your independence, gaining respect for your integrity.",
                logText: "Declined a patron's support to remain independent.",
                statChanges: {
                  reputation: 5
                },
                addTraits: ["Honest"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "mysterious_stranger",
      title: "Mysterious Stranger",
      text: {
        default: "A cloaked figure approaches you at dusk, offering valuable information for a price."
      },
      weight: 7,
      requirements: {
        minAge: 18
      },
      choices: [
        {
          text: "Pay for the secret",
          requirements: {
            minGold: 120
          },
          outcomes: [
            {
              chance: 65,
              outcome: {
                text: "The secret information allows you to exploit a major trade gap.",
                logText: "Bought a secret that yielded high returns.",
                goldChange: 350,
                statChanges: {
                  reputation: 15
                }
              }
            },
            {
              chance: 35,
              outcome: {
                text: "The stranger takes your gold and whispers a useless nursery rhyme before disappearing.",
                logText: "Swindled by a mysterious stranger.",
                goldChange: -120,
                statChanges: {
                  happiness: -10
                }
              }
            }
          ]
        },
        {
          text: "Refuse the deal",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You decline to deal with shady characters.",
                logText: "Refused to buy secrets from a stranger.",
                addTraits: ["Cautious"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "rare_opportunity_career",
      title: "Rare Opportunity",
      text: {
        default: "An opportunity presents itself in your profession.",
        farmer: "An elder farmer offers a batch of rare 'Aether Seeds' that grow in winter.",
        merchant: "A contact in the capital offers to register you for a premium trade route.",
        noble: "A foreign envoy offers a secret political alliance.",
        royal: "A foreign envoy offers a secret political alliance."
      },
      weight: 8,
      requirements: {
        minAge: 18
      },
      choices: [
        {
          text: "Seize the opportunity",
          requirements: {
            minGold: 100
          },
          outcomes: [
            {
              chance: 75,
              outcome: {
                text: "The venture succeeds brilliantly, elevating your professional standing.",
                logText: "Seized a professional opportunity and prospered.",
                goldChange: 250,
                statChanges: {
                  reputation: 10
                },
                addTraits: ["Ambitious"]
              }
            },
            {
              chance: 25,
              outcome: {
                text: "The opportunity backfires. You lose your investment and face scrutiny.",
                logText: "Attempted a professional venture that failed.",
                goldChange: -100,
                statChanges: {
                  reputation: -10,
                  happiness: -10
                }
              }
            }
          ]
        },
        {
          text: "Skip it",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You stay with what is safe and familiar.",
                logText: "Declined a professional opportunity.",
                addTraits: ["Cautious"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "village_competition",
      title: "Grand Tournament",
      text: {
        default: "A grand contest of skill, wits, and strength is announced in the square."
      },
      weight: 8,
      requirements: {
        minAge: 16
      },
      choices: [
        {
          text: "Enter immediately",
          outcomes: [
            {
              chance: 50,
              outcome: {
                text: "Against the odds, you win the contest and claim the prize money!",
                logText: "Won the Grand Tournament.",
                goldChange: 150,
                statChanges: {
                  reputation: 15
                },
                addTraits: ["Brave"]
              }
            },
            {
              chance: 50,
              outcome: {
                text: "You are badly beaten in the contest, leaving you bruised and humiliated.",
                logText: "Injured and defeated in the tournament.",
                statChanges: {
                  health: -10,
                  happiness: -5
                }
              }
            }
          ]
        },
        {
          text: "Train and prepare",
          requirements: {
            minGold: 40
          },
          outcomes: [
            {
              chance: 80,
              outcome: {
                text: "Your careful preparation pays off. You secure a victory and the trophy.",
                logText: "Prepared carefully and won the tournament.",
                goldChange: 110,
                statChanges: {
                  reputation: 10
                },
                addTraits: ["Responsible"]
              }
            },
            {
              chance: 20,
              outcome: {
                text: "Despite your training, you still lose the match and waste your entry fee.",
                logText: "Trained for the tournament but still lost.",
                goldChange: -40,
                statChanges: {
                  happiness: -5
                },
                addTraits: ["Cautious"]
              }
            }
          ]
        },
        {
          text: "Skip it",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You decide to watch the competition comfortably from the stands.",
                logText: "Skipped the Grand Tournament.",
                addTraits: ["Lazy"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "forgotten_ruins",
      title: "Forgotten Ruins",
      text: {
        default: "Ancient ruins are discovered deep in the nearby forest, rumored to hold relics."
      },
      weight: 7,
      requirements: {
        minAge: 18
      },
      choices: [
        {
          text: "Explore them alone",
          outcomes: [
            {
              chance: 50,
              outcome: {
                text: "You navigate the traps and find a chest of ancient silver!",
                logText: "Successfully explored forgotten ruins alone.",
                goldChange: 250,
                addTraits: ["Brave"]
              }
            },
            {
              chance: 50,
              outcome: {
                text: "The floor collapses under you. You trigger a trap and are badly injured.",
                logText: "Injured in collapsed ruins.",
                statChanges: {
                  health: -25
                },
                addTraits: ["Cautious"]
              }
            }
          ]
        },
        {
          text: "Fund an expedition",
          requirements: {
            minGold: 150
          },
          outcomes: [
            {
              chance: 80,
              outcome: {
                text: "The expedition returns safely with artifacts, giving you a huge return on investment.",
                logText: "Funded a successful archaeological expedition.",
                goldChange: 400,
                statChanges: {
                  reputation: 10
                }
              }
            },
            {
              chance: 20,
              outcome: {
                text: "The expedition gets lost in the shifting sands and collapses, wasting your gold.",
                logText: "Funded an expedition that was lost.",
                goldChange: -150
              }
            }
          ]
        },
        {
          text: "Ignore it",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You stay safe at home.",
                logText: "Decided to ignore the ruins.",
                addTraits: ["Cautious"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "foreign_visitor",
      title: "Foreign Visitor",
      text: {
        default: "A traveler from distant lands arrives in town seeking assistance with translation and navigation."
      },
      weight: 9,
      requirements: {
        minAge: 16
      },
      choices: [
        {
          text: "Help them willingly",
          moralityShift: 6,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You guide the traveler safely. They thank you and spread positive stories about your kindness.",
                logText: "Helped a foreign visitor navigate.",
                statChanges: {
                  reputation: 10,
                  happiness: 5
                },
                addTraits: ["Kind"]
              }
            }
          ]
        },
        {
          text: "Trade with them",
          outcomes: [
            {
              chance: 70,
              outcome: {
                text: "You exchange local crafts for their exotic foreign products, turning a tidy profit.",
                logText: "Traded exotic goods with a foreign visitor.",
                goldChange: 150,
                statChanges: {
                  reputation: 5
                }
              }
            },
            {
              chance: 30,
              outcome: {
                text: "You get out-negotiated and end up with defective goods.",
                logText: "Made a poor trade with a foreign visitor.",
                goldChange: -50
              }
            }
          ]
        },
        {
          text: "Exploit their ignorance",
          moralityShift: -12,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You overcharge them for basic items, swindling them out of their wealth.",
                logText: "Swindled a foreign visitor.",
                goldChange: 200,
                statChanges: {
                  reputation: -15
                },
                addTraits: ["Greedy"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "apprentice_offer",
      title: "Apprentice Offer",
      text: {
        default: "A veteran in your field offers to mentor you.",
        farmer: "A master farmer offers to teach you advanced crop rotation.",
        merchant: "The Trade Guild invites you to sit on their local council.",
        noble: "A veteran counselor offers to tutor you in courtly intrigue.",
        royal: "An elder statesman offers to tutor you in courtly intrigue."
      },
      weight: 9,
      requirements: {
        minAge: 18
      },
      choices: [
        {
          text: "Accept mentoring",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You learn advanced tactics and build your professional skills.",
                logText: "Accepted advanced mentorship.",
                statChanges: {
                  intelligence: 10,
                  reputation: 8
                },
                addTraits: ["Responsible"]
              }
            }
          ]
        },
        {
          text: "Decline",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You decline, preferring to chart your own course.",
                logText: "Declined mentorship.",
                addTraits: ["Cautious"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "once_in_a_lifetime",
      title: "Once-In-A-Lifetime Deal",
      text: {
        default: "A high-stakes, unique investment opportunity appears that could secure your dynasty's future."
      },
      weight: 4,
      requirements: {
        minAge: 25
      },
      choices: [
        {
          text: "Risk everything",
          requirements: {
            minGold: 300
          },
          outcomes: [
            {
              chance: 50,
              outcome: {
                text: "JACKPOT! The high-risk venture succeeds beyond your wildest dreams!",
                logText: "Staked a massive investment and won a jackpot.",
                goldChange: 1000,
                statChanges: {
                  reputation: 25
                },
                addTraits: ["Ambitious"]
              }
            },
            {
              chance: 50,
              outcome: {
                text: "Disaster! The venture collapses entirely, wiping out your investment.",
                logText: "Staked a massive investment and lost everything.",
                goldChange: -300,
                statChanges: {
                  reputation: -20
                },
                addTraits: ["Rebellious"]
              }
            }
          ]
        },
        {
          text: "Make a cautious investment",
          requirements: {
            minGold: 100
          },
          outcomes: [
            {
              chance: 80,
              outcome: {
                text: "The cautious venture yields a respectable profit.",
                logText: "Made a cautious investment and gained moderate returns.",
                goldChange: 200,
                statChanges: {
                  reputation: 5
                },
                addTraits: ["Cautious"]
              }
            },
            {
              chance: 20,
              outcome: {
                text: "The cautious venture still fails, costing you your investment.",
                logText: "Made a cautious investment that failed.",
                goldChange: -100
              }
            }
          ]
        },
        {
          text: "Walk away",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You decide the risk is too great and refuse to play.",
                logText: "Walked away from a high-stakes investment opportunity.",
                addTraits: ["Cautious"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "bandit_raid",
      title: "Bandit Raid",
      text: {
        default: "A group of bandits attacks your local settlement, looting and burning.",
        farmer: "A group of outlaw bandits raids your farm, demanding your winter store of grain.",
        blacksmith: "Rogue mercenaries raid your forge, demanding weapons and steel.",
        merchant: "Highwaymen ambush your trading caravan on the road.",
        noble: "A bandit army besieges your estate's outlying granaries."
      },
      weight: 10,
      requirements: {
        minAge: 16
      },
      choices: [
        {
          text: "Fight back",
          outcomes: [
            {
              chance: 40,
              outcome: {
                text: "You drive them off with brute force and claim their dropped weapons!",
                logText: "Fought off bandits and claimed their weapons.",
                goldChange: 50,
                statChanges: {
                  reputation: 20
                },
                addTraits: ["Brave"]
              }
            },
            {
              chance: 60,
              outcome: {
                text: "You are badly beaten and left wounded. The bandits loot your gold.",
                logText: "Wounded by bandits during a raid.",
                goldChange: -50,
                statChanges: {
                  health: -30,
                  happiness: -10
                }
              }
            }
          ]
        },
        {
          text: "Hide in safety",
          outcomes: [
            {
              chance: 70,
              outcome: {
                text: "You successfully hide while the town is pillaged. You lose only a little gold.",
                logText: "Hid during a bandit raid.",
                goldChange: -10,
                addTraits: ["Cautious"]
              }
            },
            {
              chance: 30,
              outcome: {
                text: "They discover your hiding spot anyway, beating you and taking your pouch.",
                logText: "Discovered and looted by bandits.",
                goldChange: -50,
                statChanges: {
                  health: -10,
                  happiness: -5
                }
              }
            }
          ]
        },
        {
          text: "Pay them off",
          requirements: {
            minGold: 100
          },
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You bribe the bandits to leave you in peace. They take the gold and ride away.",
                logText: "Bribed bandits to spare your assets.",
                goldChange: -100,
                statChanges: {
                  reputation: -5
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: "failed_harvest_disaster",
      title: "Supply Crisis",
      text: {
        default: "A severe supply shortage impacts the realm's trade and resources.",
        farmer: "A sudden blight sweeps the valley, causing your crops to wither in the soil.",
        merchant: "A trade embargo blocks key shipments, causing a critical goods shortage.",
        noble: "Tensions in outlying provinces cause tax collection revenues to plummet.",
        royal: "Tensions in outlying provinces cause tax collection revenues to plummet."
      },
      weight: 10,
      requirements: {
        minAge: 18
      },
      choices: [
        {
          text: "Invest savings to recover",
          requirements: {
            minGold: 100
          },
          outcomes: [
            {
              chance: 75,
              outcome: {
                text: "Your investment successfully stabilizes your operations.",
                logText: "Spent savings to weather a supply crisis.",
                goldChange: -100,
                statChanges: {
                  reputation: 5
                },
                addTraits: ["Responsible"]
              }
            },
            {
              chance: 25,
              outcome: {
                text: "Despite your spending, the crisis deepens and the money is wasted.",
                logText: "Spent money in vain trying to resolve a supply crisis.",
                goldChange: -100,
                statChanges: {
                  happiness: -15
                }
              }
            }
          ]
        },
        {
          text: "Cut expenses to survive",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You cut back on basic needs, surviving at the expense of your comfort.",
                logText: "Cut personal expenses to survive the supply crisis.",
                statChanges: {
                  happiness: -20,
                  reputation: -5
                },
                addTraits: ["Cautious"]
              }
            }
          ]
        },
        {
          text: "Borrow from lenders",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "Local loan sharks lend you gold, but demand aggressive future favors.",
                logText: "Borrowed money to survive the crisis.",
                goldChange: 80,
                statChanges: {
                  reputation: -10
                },
                addTraits: ["Rebellious"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "dangerous_illness",
      title: "Dangerous Illness",
      text: {
        default: "A dangerous, feverish plague sweeps the region, and you wake up coughing blood."
      },
      weight: 9,
      requirements: {
        minAge: 16
      },
      choices: [
        {
          text: "Seek premium apothecary care",
          requirements: {
            minGold: 150
          },
          outcomes: [
            {
              chance: 90,
              outcome: {
                text: "The apothecary's elixirs prove effective. You make a full recovery.",
                logText: "Cured of a dangerous illness by premium care.",
                goldChange: -150,
                statChanges: {
                  health: 10
                },
                addTraits: ["Cautious"]
              }
            },
            {
              chance: 10,
              outcome: {
                text: "The expensive treatment fails to cure you, draining your constitution.",
                logText: "Sought premium medical care but remained sick.",
                goldChange: -150,
                statChanges: {
                  health: -30
                }
              }
            }
          ]
        },
        {
          text: "Rest and recover naturally",
          outcomes: [
            {
              chance: 50,
              outcome: {
                text: "You manage to sweat out the fever naturally.",
                logText: "Recovered from illness naturally.",
                statChanges: {
                  health: 5
                }
              }
            },
            {
              chance: 50,
              outcome: {
                text: "Your condition worsens significantly.",
                logText: "Suffered a worsening condition from untreated illness.",
                statChanges: {
                  health: -25,
                  happiness: -10
                }
              }
            }
          ]
        },
        {
          text: "Ignore the symptoms",
          outcomes: [
            {
              chance: 30,
              outcome: {
                text: "Your body fights it off. You walk it off and feel tougher.",
                logText: "Ignored symptoms and recovered naturally.",
                addTraits: ["Brave"]
              }
            },
            {
              chance: 55,
              outcome: {
                text: "You collapse in the streets. You are severely weakened by the disease.",
                logText: "Collapsed due to ignoring illness.",
                statChanges: {
                  health: -20,
                  happiness: -15
                }
              }
            },
            {
              chance: 15,
              outcome: {
                text: "The fever boils your brain, and you succumb to the plague.",
                logText: "Succumbed to a dangerous fever.",
                death: true,
                deathReason: "Succumbed to a deadly plague."
              }
            }
          ]
        }
      ]
    },
    {
      id: "house_fire",
      title: "House Fire",
      text: {
        default: "A candle tips over, engulfing your home in flames.",
        farmer: "A stray ember ignites your family barn.",
        blacksmith: "A furnace explosion engulfs the forge in flames.",
        merchant: "Arsonists set fire to your primary merchandise warehouse.",
        noble: "A candle tips over, engulfing a wing of your manor house.",
        royal: "A political saboteur sets fire to the palace archives."
      },
      weight: 8,
      requirements: {
        minAge: 18
      },
      choices: [
        {
          text: "Save trapped neighbors",
          outcomes: [
            {
              chance: 60,
              outcome: {
                text: "Heroic rescue! You pull everyone to safety, though you inhale severe smoke.",
                logText: "Rescued people from a house fire.",
                statChanges: {
                  health: -10,
                  happiness: 15,
                  reputation: 20
                },
                addTraits: ["Brave"]
              }
            },
            {
              chance: 40,
              outcome: {
                text: "You rush in but are severely burned before you are forced to retreat.",
                logText: "Severely burned while trying to rescue neighbors.",
                statChanges: {
                  health: -40,
                  happiness: -10,
                  reputation: 10
                }
              }
            }
          ]
        },
        {
          text: "Save your gold chest",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You salvage your money chest, but suffer burns and public criticism.",
                logText: "Prioritized saving a gold chest during a fire.",
                goldChange: 100,
                statChanges: {
                  health: -30,
                  reputation: -15
                },
                addTraits: ["Greedy"]
              }
            }
          ]
        },
        {
          text: "Flee immediately",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You run outside safely, but all your household belongings burn.",
                logText: "Fled a house fire, losing personal property.",
                goldChange: -100,
                addTraits: ["Cautious"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "friend_betrayal",
      title: "Betrayed!",
      text: {
        default: "A companion you trusted has stolen your savings and shared your secrets with rivals."
      },
      weight: 8,
      requirements: {
        minAge: 16
      },
      choices: [
        {
          text: "Forgive and move on",
          moralityShift: 8,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You choose peace over vengeance, gaining public respect.",
                logText: "Forgave a companion who betrayed them.",
                goldChange: -50,
                statChanges: {
                  reputation: 10
                },
                addTraits: ["Kind"]
              }
            }
          ]
        },
        {
          text: "Demand compensation",
          outcomes: [
            {
              chance: 60,
              outcome: {
                text: "You corner them and force them to return your gold.",
                logText: "Recovered assets from a betrayer.",
                goldChange: 50
              }
            },
            {
              chance: 40,
              outcome: {
                text: "They refuse to compensate you, leaving you empty-handed.",
                logText: "Failed to secure compensation from a betrayer.",
                goldChange: -50,
                statChanges: {
                  happiness: -10
                },
                addTraits: ["Rebellious"]
              }
            }
          ]
        },
        {
          text: "Seek dark revenge",
          moralityShift: -12,
          outcomes: [
            {
              chance: 80,
              outcome: {
                text: "You ruin their reputation through a series of anonymous rumors.",
                logText: "Ruined a betrayer's reputation.",
                goldChange: -50,
                statChanges: {
                  happiness: 10
                },
                addTraits: ["Rebellious"]
              }
            },
            {
              chance: 20,
              outcome: {
                text: "Your plot backfires, and you are caught, damaging your own reputation.",
                logText: "Exposed while plotting revenge against a betrayer.",
                goldChange: -50,
                statChanges: {
                  reputation: -30,
                  happiness: -10
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: "flood",
      title: "Severe Flood",
      text: {
        default: "Heavy torrential rains cause the river to burst its banks, threating the settlement."
      },
      weight: 8,
      requirements: {
        minAge: 16
      },
      choices: [
        {
          text: "Help build community sandbags",
          moralityShift: 10,
          outcomes: [
            {
              chance: 75,
              outcome: {
                text: "You save the district. The community hails you as a responsible citizen.",
                logText: "Helped build sandbags during a flood.",
                statChanges: {
                  reputation: 15,
                  health: -10
                },
                addTraits: ["Responsible"]
              }
            },
            {
              chance: 25,
              outcome: {
                text: "You are swept away by the current and suffer severe injury.",
                logText: "Injured during flood sandbag work.",
                statChanges: {
                  health: -25,
                  reputation: 10
                }
              }
            }
          ]
        },
        {
          text: "Protect your private property",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You keep your assets dry, but neighbors resent your lack of community support.",
                logText: "Prioritized private property during a flood.",
                goldChange: -50,
                statChanges: {
                  reputation: -10
                },
                addTraits: ["Cautious"]
              }
            }
          ]
        },
        {
          text: "Evacuate immediately",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You flee to high ground safely, leaving your home to flood.",
                logText: "Evacuated during a flood.",
                goldChange: -100,
                addTraits: ["Cautious"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "false_accusation",
      title: "False Accusation",
      text: {
        default: "A local rival accuses you of conspiring with tax smugglers."
      },
      weight: 8,
      requirements: {
        minAge: 18
      },
      choices: [
        {
          text: "Fight it in court",
          outcomes: [
            {
              chance: 50,
              outcome: {
                text: "You prove your innocence in court!",
                logText: "Exonerated of smuggling charges.",
                statChanges: {
                  reputation: 15
                },
                addTraits: ["Honest"]
              }
            },
            {
              chance: 50,
              outcome: {
                text: "Corrupt judges rule against you. You are fined heavily.",
                logText: "Falsely convicted of tax smuggling.",
                goldChange: -150,
                statChanges: {
                  reputation: -20
                },
                addTraits: ["Rebellious"]
              }
            }
          ]
        },
        {
          text: "Bribe the court officials",
          requirements: {
            minGold: 100
          },
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "The case is quietly dismissed without a public trial.",
                logText: "Bribed officials to dismiss tax charges.",
                goldChange: -100,
                statChanges: {
                  reputation: -5
                },
                addTraits: ["Cautious"]
              }
            }
          ]
        },
        {
          text: "Accept the punishment",
          moralityShift: 5,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You pay the fine and accept the public shame.",
                logText: "Accepted tax smuggling punishment.",
                goldChange: -50,
                statChanges: {
                  reputation: -15
                },
                addTraits: ["Responsible"]
              }
            }
          ]
        }
      ]
    },
    {
      id: "economic_collapse_disaster",
      title: "Economic Depression",
      text: {
        default: "A severe economic depression hits the realm.",
        farmer: "Drought and heavy taxation crash grain prices across the barony.",
        merchant: "A sudden trade guild currency devaluation collapses market demand.",
        noble: "Dynastic wars drain the realm's treasury, collapsing estate values.",
        royal: "Dynastic wars drain the realm's treasury, collapsing estate values."
      },
      weight: 8,
      requirements: {
        minAge: 20
      },
      choices: [
        {
          text: "Invest in cheap assets",
          requirements: {
            minGold: 150
          },
          outcomes: [
            {
              chance: 50,
              outcome: {
                text: "Bold recovery! You buy low and turn a massive profit as the market recovers.",
                logText: "Profited by buying cheap assets during depression.",
                goldChange: 400,
                statChanges: {
                  reputation: 10
                },
                addTraits: ["Ambitious"]
              }
            },
            {
              chance: 50,
              outcome: {
                text: "The investment collapses. You lose your savings.",
                logText: "Lost savings investing during depression.",
                goldChange: -150,
                statChanges: {
                  happiness: -15
                }
              }
            }
          ]
        },
        {
          text: "Wait it out passively",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "Your funds stagnate as the economic depression lingers.",
                logText: "Waited out the economic depression.",
                goldChange: -50,
                addTraits: ["Cautious"]
              }
            }
          ]
        },
        {
          text: "Liquidate assets",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You sell off personal items at a loss to maintain cash reserves.",
                logText: "Liquidated assets during a depression.",
                goldChange: 80,
                statChanges: {
                  reputation: -15
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: "assassination_attempt",
      title: "Shadows in the Dark",
      text: {
        default: "A silent shadow slides into your chambers at night, blade drawn."
      },
      weight: 4,
      requirements: {
        minAge: 18,
        minStats: {
          reputation: 60
        }
      },
      choices: [
        {
          text: "Fight back",
          outcomes: [
            {
              chance: 60,
              outcome: {
                text: "You overpower the assassin in a chaotic grapple!",
                logText: "Defeated an assassin in hand-to-hand combat.",
                statChanges: {
                  reputation: 20
                },
                addTraits: ["Brave"]
              }
            },
            {
              chance: 30,
              outcome: {
                text: "You drive them off, but receive severe wounds in the process.",
                logText: "Severely wounded by an assassin.",
                statChanges: {
                  health: -45,
                  happiness: -10
                }
              }
            },
            {
              chance: 10,
              outcome: {
                text: "The blade finds your heart. You pass away silently.",
                logText: "Assassinated in chambers.",
                death: true,
                deathReason: "Assassinated in your sleep."
              }
            }
          ]
        },
        {
          text: "Flee into the night",
          outcomes: [
            {
              chance: 90,
              outcome: {
                text: "You escape through the window, calling for the guards.",
                logText: "Fled from an assassin.",
                statChanges: {
                  reputation: -10
                },
                addTraits: ["Cautious"]
              }
            },
            {
              chance: 10,
              outcome: {
                text: "They catch you on the terrace and stab you before fleeing.",
                logText: "Wounded trying to escape an assassin.",
                statChanges: {
                  health: -35
                }
              }
            }
          ]
        },
        {
          text: "Bribe the assassin",
          requirements: {
            minGold: 200
          },
          outcomes: [
            {
              chance: 50,
              outcome: {
                text: "You buy their loyalty. They reveal the rival who hired them.",
                logText: "Bribed an assassin to obtain hiring secrets.",
                goldChange: -200,
                statChanges: {
                  reputation: 15
                },
                addTraits: ["Ambitious"]
              }
            },
            {
              chance: 50,
              outcome: {
                text: "They take the gold, spit in your face, and stab you anyway.",
                logText: "Bribed assassin but was still attacked.",
                goldChange: -200,
                statChanges: {
                  health: -40
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: "black_winter",
      title: "The Black Winter",
      text: {
        default: "An unusually harsh, supernatural winter devastates the crops and freezes the land."
      },
      weight: 3,
      requirements: {
        minAge: 20
      },
      choices: [
        {
          text: "Share supplies with neighbors",
          moralityShift: 10,
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You share your warmth and bread. The community survives together.",
                logText: "Shared supplies with neighbors during the Black Winter.",
                goldChange: -100,
                statChanges: {
                  reputation: 20
                },
                addTraits: ["Kind"]
              }
            }
          ]
        },
        {
          text: "Hoard your resources",
          moralityShift: -10,
          outcomes: [
            {
              chance: 80,
              outcome: {
                text: "You stay safe and warm. You sell surplus fuel at exorbitant prices.",
                logText: "Hoarded resources and profited during the Black Winter.",
                goldChange: 150,
                statChanges: {
                  reputation: -25
                },
                addTraits: ["Greedy"]
              }
            },
            {
              chance: 20,
              outcome: {
                text: "Starving citizens riot and break into your cellars, looting your stocks.",
                logText: "Looted by mobs during the Black Winter.",
                goldChange: -200,
                statChanges: {
                  health: -20
                }
              }
            }
          ]
        },
        {
          text: "Flee south immediately",
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: "You pack your bags and move south to warmer lands.",
                logText: "Fled south during the Black Winter.",
                goldChange: -80,
                statChanges: {
                  reputation: -5
                },
                addTraits: ["Cautious"]
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
