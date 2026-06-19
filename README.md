# ⚠️ WORK IN PROGRESS — PLAY WITH CAUTION ⚠️

# Legacies: Infinite Lives

**Legacies: Infinite Lives** is a text-based, generational life simulator game set in a rich medieval fantasy realm. Players carve out their dynasty's fate across centuries, guiding descendants from humble serfs to mighty wizards, legendary knights, or influential chancellors.

This project is heavily **inspired by the popular life simulator game *BitLife***, adapting its core text-based life simulation flow, activity logs, and event outcomes into a customized, atmospheric medieval setting with deep role-playing mechanics.

---

## Key Features

### 1. Generational Vocation Tracks & Promotions
Every career path has **4 progression tiers** (requiring 3 successive promotions) to work your way up:
*   **Farmer Track:** `Peasant Farmer` → `Tenant Farmer` → `Estate Overseer` → `Grand Bailiff`
*   **Blacksmith Track:** `Apprentice Blacksmith` → `Journeyman Blacksmith` → `Master Armourer` → `Royal Blacksmith`
*   **Guard Track:** `City Guard` → `Guard Sergeant` → `Castle Warden` → `Lord Commander`
*   **Knight Track:** `Squire` → `Chivalric Knight` → `Knight Banneret` → `Grand Templar`
*   **Mage Track:** `Archmage Apprentice` → `Wizard Spellweaver` → `Court Wizard` → `High Archmage`
*   **Royal Advisor Track:** `Royal Scribe` → `Royal Advisor` → `Grand Chancellor` → `Hand of the King`
*   **Merchant Track:** `Street Peddler` → `Caravan Trader` → `Guild Merchant` → `Trade Master`

**Mechanics:**
*   **Work Hard:** Boosts your vocation performance once per year.
*   **Ask for Promotion:** Click to request advancement. Promotion requires **at least 80% performance** and meeting the higher attribute stats (Strength, Intellect, Charisma, etc.) of the next tier. If rejected, supervisors give exact feedback on what qualifications you lack.

### 2. World Activities & Traps
Engage in a variety of seasonal recreation, adventuring, and underworld activities:
*   **Raid a Crypt/Dungeon (Dungeon Delve):** Pay supplies, then choose to venture alone (high risk, keep all loot) or invite a living companion (friend/sibling/spouse) to watch your back (lower risk, share loot, but companion can die in cave-ins).
*   **Enter Coliseum Brawl:** Spar against gladiators for gold, might, and morality/reputation, risking injuries.
*   **Go on a Holy Pilgrimage:** Pray at distant mountain shrines to cleanse your soul, boosting Arcane Lore and gaining traits like `Kind` or `Cautious`.
*   **Start a Tavern Brawl:** Rowdy fisticuffs to build Might.
*   **Other Activities:** Gamble in taverns, pickpocket merchants, or raid goblin camps.

### 3. Economy & Estate Upkeeps
*   **Cost of Living:** Characters aged 14+ pay a yearly lifestyle tax based on their background (Farmer: 5 G/yr, Blacksmith: 10 G/yr, Merchant: 20 G/yr, Noble: 45 G/yr, Royal: 90 G/yr). Going into debt causes happiness loss!
*   **Asset Caps:** To keep the economy challenging, players are restricted to owning a maximum of **3 properties** (farms, castles) and **2 businesses** (forges) at any time.

### 4. Realistic Social Roster
*   Interact with your relatives (parents, siblings, spouse, children) or companions via Chat, Gifts, Insults, or Proposals.
*   **Fixed Names:** Friends and spouses receive random surnames from the expansion's naming list instead of inheriting the player's dynasty surname.
*   **Dynamic Tragedies:** Traumatic events (like dungeon deaths) mark relations as deceased in the Relations screen.

### 5. Media & Atmosphere
*   **Medieval Lofi Background Music:** Plays high-quality looped MP3 tracks for the Fantasy Expansion (using local assets), falling back to lightweight Web Audio API synthesis for secondary expansions.
*   **Desktop Responsive Frame:** Centers the layout vertically and horizontally on PC monitors as a floating device card with borders, shadows, and rounded edges, preventing stretched lines and keeping critical buttons (like profile) on-screen.

---

## Technology Stack
*   **Core:** React + TypeScript + Vite
*   **Styling:** Tailwind CSS v4 (with fluid custom variables)
*   **Audio:** Web Audio API + HTML5 Audio Node
*   **Icons:** Lucide React

---

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Run development server:**
    ```bash
    npm run dev
    ```
3.  **Build production package:**
    ```bash
    npm run build
    ```
