import type { Expansion } from '../../types/game';

export const pirateExpansion: Expansion = {
  id: 'pirate',
  name: 'Pirate Seas',
  theme: {
    fontTitle: "'Special Elite', cursive, sans-serif",
    fontBody: "'Outfit', sans-serif",
    primary: '#0284c7', // sky-600
    primaryHover: '#0369a1', // sky-700
    accent: '#f59e0b', // amber-500 (gold)
    bgStart: '#022c22', // deep teal-950
    bgEnd: '#020617', // gray-950
    panelBg: 'rgba(2, 44, 34, 0.75)',
    panelBorder: 'rgba(2, 132, 199, 0.35)',
    primaryGlow: 'rgba(2, 132, 199, 0.45)',
    textMain: '#f1f5f9', // light text
    textSub: '#94a3b8', // slate subtext
    textHeading: '#ffffff', // white heading
    cardBg: 'rgba(15, 23, 42, 0.4)', // dark card background
    cardBorder: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px' // rounded corners
  },
  moralityLabels: {
    honor: 'The Pirate Code (Accord)',
    infamy: 'Dreaded Outlaw (Infamy)'
  },
  statLabels: {
    health: 'Scurvy Resistance',
    happiness: 'Morale',
    intelligence: 'Navigation',
    charisma: 'Swagger',
    strength: 'Brawn',
    reputation: 'Notoriety'
  },
  careers: [
    {
      id: 'cabin_boy',
      title: 'Cabin Boy',
      salary: 10,
      description: 'Scrub the deck, boil salt-pork, and learn the ropes of sea life.',
      requirements: { minAge: 12 }
    },
    {
      id: 'deckhand',
      title: 'Able Deckhand',
      salary: 24,
      description: 'Hoist sails and secure lines in raging weather. Builds major strength.',
      requirements: { minAge: 15, minStats: { strength: 30 } }
    },
    {
      id: 'gunner',
      title: 'Master Gunner',
      salary: 55,
      description: 'Align the 32-pounder cannons and manage the black powder stockpile.',
      requirements: { minAge: 18, minStats: { strength: 45, intelligence: 35 } }
    },
    {
      id: 'quartermaster',
      title: 'Quartermaster',
      salary: 120,
      description: 'Distribute provisions, maintain the pirate code, and manage booty sharing.',
      requirements: { minAge: 21, minStats: { charisma: 50, intelligence: 50 }, requiredCareerId: 'gunner' }
    },
    {
      id: 'captain',
      title: 'Pirate Captain',
      salary: 350,
      description: 'Command the galleon, navigate uncharted reefs, and lead boarding parties.',
      requirements: { minAge: 25, minStats: { charisma: 65, strength: 55 }, requiredCareerId: 'quartermaster' }
    }
  ],
  activities: [
    {
      id: 'study_charts',
      name: 'Study Navigation Charts',
      description: 'Pour over naval maps and study currents to improve sea navigation.',
      cost: 10,
      category: 'study'
    },
    {
      id: 'climb_rigging',
      name: 'Train in Rigging',
      description: 'Climb the towering masts in high winds to build brawn.',
      cost: 5,
      category: 'health'
    },
    {
      id: 'liars_dice',
      name: 'Play Liar\'s Dice',
      description: 'Bet 15 doubloons in the smoky tavern.',
      cost: 15,
      category: 'gamble'
    },
    {
      id: 'smuggle_rum',
      name: 'Smuggle Jamaican Rum',
      description: 'Attempt to sneak barrels of contraband past harbor patrols.',
      cost: 0,
      category: 'crime'
    },
    {
      id: 'raid_merchant',
      name: 'Raid Merchant Ship',
      description: 'Board a weakly armed cargo vessel for gold. High danger, high reward!',
      cost: 0,
      category: 'crime'
    },
    {
      id: 'tavern_carouse',
      name: 'Carouse in Tortuga',
      description: 'Buy a round of rum for the tavern to boost morale and charisma.',
      cost: 40,
      category: 'social'
    }
  ],
  itemPool: [
    {
      name: 'Rusty Cutlass',
      type: 'item',
      cost: 15,
      income: 0,
      description: 'A reliable blade for boarding fights.'
    },
    {
      name: 'Polished Brass Sextant',
      type: 'item',
      cost: 80,
      income: 0,
      description: 'Improves navigation rating and mapping precision.'
    },
    {
      name: 'Dueling Flintlock Pistol',
      type: 'item',
      cost: 180,
      income: 0,
      description: 'A silver-inlaid firearm that commands dread.'
    },
    {
      name: 'Small Fishing Rowboat',
      type: 'property',
      cost: 90,
      income: 8,
      description: 'A modest boat that brings in fish for sale.'
    },
    {
      name: 'Trade Smuggling Sloop',
      type: 'business',
      cost: 500,
      income: 50,
      description: 'A swift, small ship smuggling silk and spice.'
    },
    {
      name: 'Armored War Galleon',
      type: 'property',
      cost: 3000,
      income: -80, // upkeep
      description: 'A triple-decker flagship fitted with 40 heavy cannons.'
    }
  ],
  names: {
    male: ['Edward', 'Bartholomew', 'Henry', 'Francis', 'William', 'Charles', 'Samuel', 'Jack', 'Avery', 'Blackbeard'],
    female: ['Anne', 'Mary', 'Grace', 'Jacquotte', 'Rachel', 'Charlotte', 'Elizabeth', 'Sadie', 'Flora', 'Clara'],
    last: ['Thatch', 'Morgan', 'Drake', 'Bonny', 'Read', 'Vane', 'Lafitte', 'Kidd', 'Avery', 'Silver', 'Flint']
  },
  startingTitles: ['Scallywag', 'Marooner', 'Corsair', 'Privateer', 'Sea Lord'],
  worldEvents: [
    {
      id: 'navy_blockade',
      name: 'Royal Navy Blockade',
      description: 'The King has dispatched an armada of war frigates to patrol active channels.',
      effectsText: 'High naval activity. Reduces raiding gold by 50% and raises danger.',
      modifiers: {
        incomeMultiplier: 0.5
      }
    },
    {
      id: 'silver_fleet',
      name: 'Silver Fleet Passage',
      description: 'A Spanish cargo fleet loaded with emeralds and silver coins is crossing the Caribbean.',
      effectsText: 'Gold rush. Raiding rewards are doubled!',
      modifiers: {
        incomeMultiplier: 2.0
      }
    },
    {
      id: 'scurvy_outbreak',
      name: 'Scurvy Gales',
      description: 'A lack of fresh citrus across ports causes a massive wave of shipboard scurvy.',
      effectsText: 'Drains health by 12 points each year.',
      modifiers: {
        healthDrain: 12
      }
    }
  ],
  events: [
    {
      id: 'stranded_merchant',
      title: 'Stranded Merchant',
      text: 'You spot a sinking merchant brigantine flying distress flags. The crew is clinging to wreckage.',
      weight: 10,
      requirements: { minAge: 14 },
      choices: [
        {
          text: 'Rescue the crew and drop them at the nearest port',
          moralityShift: 20, // honor
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: 'The crew is saved! The merchant guild awards you a reward and praises your Accord.',
                statChanges: { reputation: 25, happiness: 10 },
                goldChange: 40,
                logText: 'Rescued stranded merchant crew. Rewarded 40 gold by the Guild.'
              }
            }
          ]
        },
        {
          text: 'Plunder the floating cargo and leave them',
          moralityShift: -25, // infamy
          outcomes: [
            {
              chance: 70,
              outcome: {
                text: 'You haul onboard chests of spices and silver! The crew drowns in your wake.',
                goldChange: 120,
                statChanges: { reputation: -20, happiness: 15 },
                logText: 'Plundered cargo from a sinking ship, leaving the crew to the sharks.'
              }
            },
            {
              chance: 30,
              outcome: {
                text: 'A giant squid emerges, dragged by the blood! You flee, losing some crew and cargo.',
                statChanges: { health: -15, happiness: -20 },
                logText: 'Attacked by a giant squid while plundering wreckage.'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'mystic_compass',
      title: 'The Dead Man\'s Compass',
      text: 'A dying sailor in a Tortuga tavern hands you a dark iron compass. Its needle points not north, but toward your deepest desire.',
      weight: 15,
      requirements: { minAge: 16 },
      choices: [
        {
          text: 'Follow the needle blindly',
          outcomes: [
            {
              chance: 50,
              outcome: {
                text: 'It guides you to a hidden beach containing a chest of ancient Aztec coins!',
                goldChange: 180,
                statChanges: { happiness: 20 },
                logText: 'Followed a magical compass to a chest of Aztec gold.'
              }
            },
            {
              chance: 30,
              outcome: {
                text: 'It leads you straight into a Royal Navy ambush! You are shot in the arm during the escape.',
                statChanges: { health: -30, reputation: 10 },
                logText: 'Led into a Navy ambush by the magical compass.'
              }
            },
            {
              chance: 20,
              outcome: {
                text: 'The needle spins rapidly, making you dizzy. You pass out and wake up with heightened sea senses.',
                statChanges: { intelligence: 25 },
                logText: 'Absorbed mystic energy from a strange iron compass.'
              }
            }
          ]
        },
        {
          text: 'Pawn the strange compass',
          outcomes: [
            {
              chance: 100,
              outcome: {
                text: 'A merchant collector buys the odd relic for 50 gold pieces.',
                goldChange: 50,
                logText: 'Pawned a mysterious dead man\'s compass for 50 gold.'
              }
            }
          ]
        }
      ]
    }
  ],
  startingBackgrounds: [
    {
      id: 'fisherman',
      name: 'Fisherman Family',
      weight: 40,
      titleMale: 'Scallywag',
      titleFemale: 'Scallywag',
      titleNonBinary: 'Scallywag',
      gold: 10,
      statModifiers: { health: 10, strength: 15, intelligence: -5 },
      journalText: 'You were born into a humble Fisherman family as a Scallywag. Hauling nets has left you sturdy (+10 Scurvy Resistance) and strong (+15 Brawn), but you are unlearned in sea navigation (-5 Navigation).'
    },
    {
      id: 'gunsmith',
      name: 'Gunsmith Family',
      weight: 25,
      titleMale: 'Marooner',
      titleFemale: 'Marooner',
      titleNonBinary: 'Marooner',
      gold: 50,
      statModifiers: { strength: 20, health: 10, charisma: -5 },
      journalText: 'You were born into a Gunsmith family as a Marooner. Smelting brass and forging cannon barrels has given you brawn (+20 Brawn) and stamina (+10 Scurvy Resistance), but lacking swagger (-5 Swagger).'
    },
    {
      id: 'smuggler',
      name: 'Smuggler Family',
      weight: 20,
      titleMale: 'Marooner',
      titleFemale: 'Marooner',
      titleNonBinary: 'Marooner',
      gold: 150,
      statModifiers: { charisma: 10, strength: -5 },
      journalText: 'You were born into a Smuggler family as a Marooner. Running illegal rum past harbor patrols has given you 150 starting Gold and swagger (+10 Swagger), but you lack heavy physical conditioning (-5 Brawn).'
    },
    {
      id: 'merchant_fleet',
      name: 'Merchant Fleet Family',
      weight: 12,
      titleMale: 'Corsair',
      titleFemale: 'Corsair',
      titleNonBinary: 'Corsair',
      gold: 600,
      statModifiers: { charisma: 15, intelligence: 10, strength: -10 },
      journalText: 'You were born into a wealthy Merchant Fleet family. You inherit 600 Gold, fine merchant swagger (+15 Swagger), and navigational instruction (+10 Navigation), but are physically soft (-10 Brawn).'
    },
    {
      id: 'governor',
      name: 'Governor Family',
      weight: 3,
      titleMale: 'Privateer',
      titleFemale: 'Privateer',
      titleNonBinary: 'Privateer',
      gold: 1100,
      statModifiers: { charisma: 20, intelligence: 15, reputation: -10 },
      journalText: 'You were born into the Royal Governor\'s family. You start with 1100 Gold, aristocratic swagger (+20 Swagger), and charting school (+15 Navigation), but carry public suspicion (-10 Notoriety/Reputation risk).'
    }
  ]
};
