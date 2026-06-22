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

interface FallbackChoice {
  text: string;
  outcome_neutral?: string;
  outcome_success?: string;
  outcome_failure?: string;
}

function getFallbackEvent(expansion: string, category: string): { title: string; description: string; choices: FallbackChoice[] } {
  const themedFallbacks: Record<string, { title: string; description: string; choices: FallbackChoice[] }[]> = {
    fantasy: [
      {
        title: "A Shadow in the Alley",
        description: "While navigating the cobblestone streets, you notice a hooded figure dropping a sealed letter before vanishing into the crowds.",
        choices: [
          {
            text: "Pick up and pocket the letter",
            outcome_neutral: "You quickly slip the letter into your pocket, undetected. No one seems to have noticed."
          },
          {
            text: "Call out to the figure",
            outcome_success: "The figure stops, turns around, and thanks you for your honesty, offering a small purse of coins as a reward.",
            outcome_failure: "The figure panics, draws a hidden dagger, and slashes at you before escaping into the shadows."
          },
          {
            text: "Leave it and walk away",
            outcome_success: "You walk away, leaving the mystery behind. Later, you find a gold coin on the ground.",
            outcome_failure: "As you walk away, a city guard accuses you of littering and fines you."
          }
        ]
      },
      {
        title: "The Scholar's Proposition",
        description: "A scholar from the Grand Library offers to buy a family heirloom you possess, claiming it holds ancient, dangerous knowledge.",
        choices: [
          {
            text: "Refuse the gold and keep it",
            outcome_neutral: "You politely decline. The scholar sighs, warning you to keep it safe and hidden."
          },
          {
            text: "Sell it for a modest sum",
            outcome_success: "You hand over the heirloom. The scholar pays you handsomely and guarantees its safe keeping.",
            outcome_failure: "As you hand it over, the heirloom suddenly shatters, releasing a curse that drains your vitality."
          },
          {
            text: "Donate it to the library",
            outcome_success: "The library archivist is thrilled by the donation, granting you free access and a reward.",
            outcome_failure: "The archivist claims the heirloom is a fake and bans you from the premises."
          }
        ]
      }
    ],
    pirate: [
      {
        title: "Distant Sails",
        description: "A ship flying unrecognized colors appears on the horizon, moving erratically as if adrift or baiting a trap.",
        choices: [
          {
            text: "Steer closer to investigate",
            outcome_neutral: "You observe them from a safe distance. They seem to be repairing a torn sail."
          },
          {
            text: "Signal them from afar",
            outcome_success: "They signal back and trade some supplies with you, thanking you for the contact.",
            outcome_failure: "They fire a warning shot, causing your crew to panic and drop some cargo."
          },
          {
            text: "Maintain your course and speed",
            outcome_success: "You sail past them without incident, finding some drifting crates in the water.",
            outcome_failure: "They alter course and pursue you, forcing you to dump cargo to outrun them."
          }
        ]
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

    // Pre-calculate numerical rewards and risks
    const choice0Gold = Math.floor(Math.random() * 20) - 5; // small change
    const choice0Happiness = Math.floor(Math.random() * 6) + 1; // small boost

    const choice1GoldSuccess = rewardRange === 'high' ? Math.floor(Math.random() * 60) + 20 : Math.floor(Math.random() * 30) + 5;
    const choice1GoldFail = riskLevel === 'high' ? -Math.floor(Math.random() * 50) - 20 : -Math.floor(Math.random() * 20);

    const choice2GoldSuccess = rewardRange === 'high' ? Math.floor(Math.random() * 150) + 50 : Math.floor(Math.random() * 50) + 15;
    const choice2GoldFail = riskLevel === 'high' ? -Math.floor(Math.random() * 80) - 30 : -Math.floor(Math.random() * 30);

    // 2. Query Groq API with Retry Logic (Try Qwen 32B first, fall back to Llama 70B)
    let debugInfo: any = null;
    let aiResponse: any = null;
    let attempts = 0;
    const maxAttempts = 2;

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.warn("GROQ_API_KEY is not defined. Falling back to local event generation.");
    } else {
      while (attempts < maxAttempts && !aiResponse) {
        attempts++;
        // Attempt 1: qwen/qwen3-32b, Attempt 2: llama-3.3-70b-versatile
        const modelToUse = attempts === 1 ? 'qwen/qwen3-32b' : 'llama-3.3-70b-versatile';
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
Risk Level: "${riskLevel}" (integrate this flavor into the choices and narratives)

Ensure high variety and creativity:
- Do NOT repeat the common "strangers needing shelter" trope unless category is explicitly fitting and it's a completely new twist.
- Explore various event themes: ancient discoveries, career rivalry, mysterious illness symptoms, social gossip, business expansion opportunities, local guild disputes, supernatural visions, mystical artifacts, etc.
- Keep narratives very short, punchy, and quick to read.

Constraint limits:
- Event description MUST be max 150 characters.
- Each choice description MUST be max 30 characters.
- Each outcome story resolution MUST be max 100 characters.

The choices MUST describe clear, concrete physical actions or verbal responses that logically fit the scenario (e.g. for an illness: "Consult an apothecary", "Rest in isolation", "Purchase strange herbs"). Do NOT output abstract concepts or nonsensical/out-of-context options (do not say "exploit demand" for an illness).
The choices should be subtle and vague about whether they lead to a good or bad outcome.
The choices MUST align with these mechanical archetypes:
1. Choice 0: A cautious, safe, or neutral action.
2. Choice 1: An honorable, principled, or active action.
3. Choice 2: A pragmatic, selfish, or opportunistic action.

Format the response strictly as a JSON object:
{
  "title": "A short atmospheric title (max 5 words)",
  "description": "Vivid event description (max 150 characters)",
  "choices": [
    {
      "text": "Choice 0 text (cautious, max 30 chars)",
      "outcome_neutral": "Story outcome when they choose this cautious path (max 100 chars)"
    },
    {
      "text": "Choice 1 text (honorable, max 30 chars)",
      "outcome_success": "Story outcome when they choose this and succeed (max 100 chars)",
      "outcome_failure": "Story outcome when they choose this and fail (max 100 chars)"
    },
    {
      "text": "Choice 2 text (pragmatic, max 30 chars)",
      "outcome_success": "Story outcome when they choose this and succeed (max 100 chars)",
      "outcome_failure": "Story outcome when they choose this and fail (max 100 chars)"
    }
  ]
}

Return ONLY raw JSON. No markdown code blocks, no extra explanations, and no surrounding text.`;

          const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: modelToUse,
              messages: [
                {
                  role: 'system',
                  content: 'You are a narrative generator for Legacies. You must output ONLY a valid, raw JSON object. Do not output any markdown formatting, preamble, codeblock wrapping, or explanation. Start your response directly with \'{\' and end with \'}\'.'
                },
                { role: 'user', content: prompt }
              ],
              temperature: 0.8,
              max_tokens: 450,
              response_format: { type: 'json_object' }
            })
          });

          if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Groq API (${modelToUse}) responded with status ${response.status}: ${errText}`);
          }

          const data = await response.json();
          const contentText = data.choices?.[0]?.message?.content;
          if (contentText) {
            const parsed = JSON.parse(contentText.trim());
            if (parsed.title && parsed.description && Array.isArray(parsed.choices) && parsed.choices.length >= 3) {
              const c = parsed.choices;
              const choice0Ok = typeof c[0] === 'object' && c[0].text && c[0].outcome_neutral;
              const choice1Ok = typeof c[1] === 'object' && c[1].text && c[1].outcome_success && c[1].outcome_failure;
              const choice2Ok = typeof c[2] === 'object' && c[2].text && c[2].outcome_success && c[2].outcome_failure;

              if (choice0Ok && choice1Ok && choice2Ok) {
                aiResponse = parsed;
              } else if (typeof c[0] === 'string' && typeof c[1] === 'string' && typeof c[2] === 'string') {
                // Map legacy flat string format gracefully
                aiResponse = {
                  title: parsed.title,
                  description: parsed.description,
                  choices: [
                    { text: c[0], outcome_neutral: "You navigated the situation safely with minimal consequence." },
                    { text: c[1], outcome_success: "Your principled approach was successful.", outcome_failure: "Your attempt backfired despite your good intentions." },
                    { text: c[2], outcome_success: "Your pragmatic calculation paid off.", outcome_failure: "Your devious plot went awry." }
                  ]
                };
              }

              if (aiResponse) {
                console.log("=== GROQ SYSTEM & USER PROMPT ===");
                console.log(prompt);
                console.log("=== GROQ RESPONSE ===");
                console.log(contentText);
                console.log("=== TOKENS USED ===");
                console.log(JSON.stringify(data.usage));

                debugInfo = {
                  model: modelToUse,
                  prompt: prompt,
                  response: contentText,
                  usage: data.usage
                };
              }
            }
          }
        } catch (err) {
          console.error(`Attempt ${attempts} using ${modelToUse} failed:`, err);
        }
      }
    }

    // 3. Fallback narrative if AI failed
    if (!aiResponse) {
      aiResponse = getFallbackEvent(expansion, category);
      debugInfo = {
        model: "Local static fallback (AI failed / offline)",
        prompt: "N/A",
        response: JSON.stringify(aiResponse),
        usage: { total_tokens: 0, prompt_tokens: 0, completion_tokens: 0 }
      };
    }

    // 4. Assemble final GameEvent with pre-calculated mechanics mapped to the AI's story outcomes
    const choice0Outcomes: ChanceOutcome[] = [
      {
        chance: 100,
        outcome: {
          text: aiResponse.choices[0].outcome_neutral || "You navigated the situation safely.",
          statChanges: { happiness: choice0Happiness, health: Math.floor(Math.random() * 3) },
          goldChange: choice0Gold,
          logText: aiResponse.choices[0].outcome_neutral || "Chose the safe path."
        }
      }
    ];

    const choice1Outcomes: ChanceOutcome[] = [
      {
        chance: 65,
        outcome: {
          text: aiResponse.choices[1].outcome_success || "Your principled approach succeeded.",
          statChanges: { happiness: 10, health: 5, charisma: 5 },
          goldChange: choice1GoldSuccess,
          logText: aiResponse.choices[1].outcome_success || "Acted honorably and succeeded."
        }
      },
      {
        chance: 35,
        outcome: {
          text: aiResponse.choices[1].outcome_failure || "Your attempt backfired.",
          statChanges: { happiness: -15, health: riskLevel === 'high' ? -25 : -10 },
          goldChange: choice1GoldFail,
          death: riskLevel === 'high' && Math.random() < 0.1,
          deathReason: "Succumbed to injuries during a risky endeavor.",
          logText: aiResponse.choices[1].outcome_failure || "Acted honorably but suffered a setback."
        }
      }
    ];

    const choice2Outcomes: ChanceOutcome[] = [
      {
        chance: 60,
        outcome: {
          text: aiResponse.choices[2].outcome_success || "Your calculation paid off.",
          statChanges: { happiness: 15, intelligence: 5 },
          goldChange: choice2GoldSuccess,
          logText: aiResponse.choices[2].outcome_success || "Chose the pragmatic route and succeeded."
        }
      },
      {
        chance: 40,
        outcome: {
          text: aiResponse.choices[2].outcome_failure || "Your devious plot went awry.",
          statChanges: { happiness: -10, health: riskLevel === 'high' ? -30 : -15, charisma: -5 },
          goldChange: choice2GoldFail,
          death: riskLevel === 'high' && Math.random() < 0.15,
          deathReason: "Met a tragic end following a reckless decision.",
          logText: aiResponse.choices[2].outcome_failure || "Chose the pragmatic route and paid the price."
        }
      }
    ];

    const finalEvent: GameEvent = {
      id: `ai_event_${Date.now()}`,
      title: aiResponse.title,
      text: aiResponse.description,
      choices: [
        {
          text: aiResponse.choices[0].text,
          moralityShift: 0,
          outcomes: choice0Outcomes
        },
        {
          text: aiResponse.choices[1].text,
          moralityShift: 10, // Gain honor
          outcomes: choice1Outcomes
        },
        {
          text: aiResponse.choices[2].text,
          moralityShift: -10, // Gain infamy
          outcomes: choice2Outcomes
        }
      ]
    };

    const responseData = {
      ...finalEvent,
      _debug: debugInfo
    };

    return res.status(200).json(responseData);
  } catch (error: any) {
    console.error('Error generating event:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
