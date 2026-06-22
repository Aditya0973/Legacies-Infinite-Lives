import type { VercelRequest, VercelResponse } from '@vercel/node';

// Define outcome types matching the game types
interface StatChanges {
  health?: number;
  happiness?: number;
  intelligence?: number;
  charisma?: number;
  strength?: number;
  reputation?: number;
}

interface EventOutcome {
  text: string;
  statChanges?: StatChanges;
  goldChange?: number;
  death?: boolean;
  deathReason?: string;
  addTraits?: string[];
  removeTraits?: string[];
  logText: string;
}

interface ChanceOutcome {
  chance: number;
  outcome: EventOutcome;
}

interface Choice {
  text: string;
  moralityShift?: number; // Positive for Honor, negative for Infamy
  outcomes: ChanceOutcome[];
}

interface GameEvent {
  id: string;
  title: string;
  text: string;
  choices: Choice[];
}

function getFallbackEvent(expansion: string, category: string): { title: string; description: string; choices: string[] } {
  const themedFallbacks: Record<string, { title: string; description: string; choices: string[] }[]> = {
    fantasy: [
      {
        title: "A Shadow in the Alley",
        description: "While navigating the cobblestone streets, you notice a hooded figure dropping a sealed letter before vanishing into the crowds.",
        choices: ["Pick up and pocket the letter", "Call out to the figure", "Leave it and walk away"]
      },
      {
        title: "The Scholar's Proposition",
        description: "A scholar from the Grand Library offers to buy a family heirloom you possess, claiming it holds ancient, dangerous knowledge.",
        choices: ["Refuse the gold and keep it", "Sell it for a modest sum", "Donate it to the library"]
      }
    ],
    pirate: [
      {
        title: "Distant Sails",
        description: "A ship flying unrecognized colors appears on the horizon, moving erratically as if adrift or baiting a trap.",
        choices: ["Steer closer to investigate", "Signal them from afar", "Maintain your course and speed"]
      }
    ]
  };

  const cleanExpansion = (expansion || '').toLowerCase();
  const list = themedFallbacks[cleanExpansion] || themedFallbacks.fantasy;
  const selected = list[Math.floor(Math.random() * list.length)];
  return selected;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const {
      age,
      career,
      familyBackground,
      traits = [],
      honor = 50,
      infamy = 50,
      gold = 100,
      relationshipsSummary = '',
      expansion = 'Medieval Fantasy'
    } = req.body;

    // 1. Determine Event Mechanics
    const categories = age < 18 
      ? ['Health', 'Family', 'Social', 'Supernatural']
      : ['Health', 'Wealth', 'Career', 'Family', 'Crime', 'Social', 'Supernatural'];
    
    // Choose category based on state hints
    let category = categories[Math.floor(Math.random() * categories.length)];
    if (career && Math.random() < 0.3) {
      category = 'Career';
    }

    const riskLevels = ['low', 'medium', 'high'];
    const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];

    const rewardRanges = ['low', 'medium', 'high'];
    const rewardRange = rewardRanges[Math.floor(Math.random() * rewardRanges.length)];

    // Build the engine outcomes for each choice
    // Choice 0: Safe/Cautious
    const choice0Gold = Math.floor(Math.random() * 20) - 5; // small change
    const choice0Happiness = Math.floor(Math.random() * 6) + 1; // small boost
    const choice0Outcomes: ChanceOutcome[] = [
      {
        chance: 100,
        outcome: {
          text: "You navigated the situation safely with minimal consequence.",
          statChanges: { happiness: choice0Happiness, health: Math.floor(Math.random() * 3) },
          goldChange: choice0Gold,
          logText: "Chose the safe path."
        }
      }
    ];

    // Choice 1: Risky/Moral (Honor)
    const choice1GoldSuccess = rewardRange === 'high' ? Math.floor(Math.random() * 60) + 20 : Math.floor(Math.random() * 30) + 5;
    const choice1GoldFail = riskLevel === 'high' ? -Math.floor(Math.random() * 50) - 20 : -Math.floor(Math.random() * 20);
    const choice1Outcomes: ChanceOutcome[] = [
      {
        chance: 65,
        outcome: {
          text: "Your principled approach was successful.",
          statChanges: { happiness: 10, health: 5, charisma: 5 },
          goldChange: choice1GoldSuccess,
          logText: "Acted honorably and succeeded."
        }
      },
      {
        chance: 35,
        outcome: {
          text: "Your attempt backfired despite your good intentions.",
          statChanges: { happiness: -15, health: riskLevel === 'high' ? -25 : -10 },
          goldChange: choice1GoldFail,
          death: riskLevel === 'high' && Math.random() < 0.1,
          deathReason: "Succumbed to injuries during a risky endeavor.",
          logText: "Acted honorably but suffered a setback."
        }
      }
    ];

    // Choice 2: Pragmatic/Selfish (Infamy)
    const choice2GoldSuccess = rewardRange === 'high' ? Math.floor(Math.random() * 150) + 50 : Math.floor(Math.random() * 50) + 15;
    const choice2GoldFail = riskLevel === 'high' ? -Math.floor(Math.random() * 80) - 30 : -Math.floor(Math.random() * 30);
    const choice2Outcomes: ChanceOutcome[] = [
      {
        chance: 60,
        outcome: {
          text: "Your pragmatic calculation paid off.",
          statChanges: { happiness: 15, intelligence: 5 },
          goldChange: choice2GoldSuccess,
          logText: "Chose the pragmatic route and gained an advantage."
        }
      },
      {
        chance: 40,
        outcome: {
          text: "Your devious plot went awry.",
          statChanges: { happiness: -10, health: riskLevel === 'high' ? -30 : -15, charisma: -5 },
          goldChange: choice2GoldFail,
          death: riskLevel === 'high' && Math.random() < 0.15,
          deathReason: "Met a tragic end following a reckless decision.",
          logText: "Chose the pragmatic route and paid the price."
        }
      }
    ];

    // 2. Query Groq API with Retry Logic
    let aiResponse = null;
    let attempts = 0;
    const maxAttempts = 2;

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.warn("GROQ_API_KEY is not defined. Falling back to local event generation.");
    } else {
      while (attempts < maxAttempts && !aiResponse) {
        attempts++;
        try {
          const prompt = `You are the narrative generator for Legacies, a text-based life simulation RPG.
The active world theme/expansion is: "${expansion}".
The character is ${age} years old.
Career: "${career || 'None'}"
Family Background: "${familyBackground || 'None'}"
Traits: ${traits.length > 0 ? traits.join(', ') : 'None'}
Morality context: Honor level ${honor}/100, Infamy level ${infamy}/100
Current gold: ${gold}
Family & relationships status: "${relationshipsSummary || 'None'}"

Generate a random event matching:
Category: "${category}"
Risk Level: "${riskLevel}" (integrate this flavor into the choices and narrative)

The choices should be intentionally vague, subtle, and morally ambiguous. Avoid direct, obvious choices (e.g., do not say "Help them" vs "Ignore them").
Instead, use descriptions like "Offer shelter", "Offer coin", "Continue your journey".
The choices MUST align with the following mechanical archetypes:
1. Choice 0: A cautious, safe, or neutral action.
2. Choice 1: An honorable, principled, or active action.
3. Choice 2: A pragmatic, selfish, or opportunistic action.

Format the response strictly as a JSON object:
{
  "title": "A short, atmospheric title (max 5 words)",
  "description": "A vivid 2-3 sentence narrative outlining the dilemma.",
  "choices": [
    "Short vague description of Choice 0 (cautious)",
    "Short vague description of Choice 1 (honorable)",
    "Short vague description of Choice 2 (pragmatic)"
  ]
}

Return ONLY raw JSON. No markdown code blocks (e.g., do not use \`\`\`json), no extra explanations, and no surrounding text.`;

          const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: 'llama-3.1-8b-instant',
              messages: [{ role: 'user', content: prompt }],
              temperature: 0.75,
              response_format: { type: 'json_object' }
            })
          });

          if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Groq API responded with status ${response.status}: ${errText}`);
          }

          const data = await response.json();
          const contentText = data.choices?.[0]?.message?.content;
          if (contentText) {
            const parsed = JSON.parse(contentText.trim());
            if (parsed.title && parsed.description && Array.isArray(parsed.choices) && parsed.choices.length >= 3) {
              aiResponse = parsed;
            }
          }
        } catch (err) {
          console.error(`Attempt ${attempts} failed:`, err);
        }
      }
    }

    // 3. Fallback narrative if AI failed
    if (!aiResponse) {
      aiResponse = getFallbackEvent(expansion, category);
    }

    // 4. Assemble final GameEvent
    const finalEvent: GameEvent = {
      id: `ai_event_${Date.now()}`,
      title: aiResponse.title,
      text: aiResponse.description,
      choices: [
        {
          text: aiResponse.choices[0],
          moralityShift: 0,
          outcomes: choice0Outcomes
        },
        {
          text: aiResponse.choices[1],
          moralityShift: 10, // Gain honor
          outcomes: choice1Outcomes
        },
        {
          text: aiResponse.choices[2],
          moralityShift: -10, // Gain infamy
          outcomes: choice2Outcomes
        }
      ]
    };

    return res.status(200).json(finalEvent);
  } catch (error: any) {
    console.error('Error generating event:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
