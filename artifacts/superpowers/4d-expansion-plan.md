# Expand Application to Support Singapore 4D

## Background

The app currently only supports Singapore Toto (6/49). Singapore 4D is fundamentally different:
- **Toto**: Pick 6 unique numbers from 1-49
- **4D**: Generate a single 4-digit number from 0000-9999

This means 4D needs its own data model, strategies, result display, and analytics logic. The existing architecture (`GeneratorConfig`, `StrategyFn`, `StrategyGrid`) needs to become **game-aware**.

> [!IMPORTANT]
> The 4D number is a **single 4-digit number** (e.g., `7283`), NOT "pick 4 numbers from 0-9". Each digit position (thousands, hundreds, tens, ones) can independently be 0-9, and digits **can repeat**. This fundamentally changes how strategies and display work compared to Toto.

---

## Proposed Changes

### Data Layer

#### [NEW] [sg-4d-history.ts](file:///Users/christianhadianto/Documents/TechSmith/toto-generator/src/data/sg-4d-history.ts)
- Define a `FourDDraw` interface: `{ drawNumber, date, numbers: number[] }` where `numbers` is an array of 23 winning 4-digit numbers per draw
- Seed ~20 recent "real-looking" draws manually
- Use the existing `seededRandom` pattern to fill ~500 draws deterministically
- Export `SG_4D_HISTORY` array

#### [NEW] [singapore-4d.ts](file:///Users/christianhadianto/Documents/TechSmith/toto-generator/src/lib/generators/singapore-4d.ts)
- Export `SINGAPORE_4D: GeneratorConfig` with `{ name: "Singapore 4D", min: 0, max: 9999, pick: 1 }`

---

### Strategy Layer

#### [NEW] [four-d.ts](file:///Users/christianhadianto/Documents/TechSmith/toto-generator/src/lib/strategies/four-d.ts)
4D-specific strategies (each returns a `number[]` with one 4-digit number):
1. **Quick Pick** — Pure random 0000-9999
2. **Hot Numbers** — Weighted toward numbers that appeared as winners recently
3. **Cold Numbers** — Favor numbers that haven't appeared in a long time
4. **Pattern Mix** — Ensures a mix of odd/even digits and high/low digits
5. **Digit Frequency** — Weight each digit position based on historical frequency
6. **Sum Target** — Generate numbers whose digit sum falls in the most common range
7. **Mirror/Reverse** — Takes recent winning numbers and generates their reverse
8. **Repeating Digits** — Favors patterns like `1122`, `3344`, `7777`
9. **Consecutive Pairs** — Generates numbers where at least two adjacent digits are consecutive
10. **Positional Trend** — Tracks upward/downward digit trends per position
11. **Gap Cycle** — Targets numbers "due" based on average appearance intervals
12. **Lucky Pairs** — Identifies 2-digit pairs that frequently co-occur

#### [NEW] [four-d-registry.ts](file:///Users/christianhadianto/Documents/TechSmith/toto-generator/src/lib/generators/four-d-registry.ts)
- Export `FOUR_D_STRATEGIES: Strategy[]` — the 4D strategy list
- Strategies use the same `Strategy` interface but with 4D-specific `generate` functions

---

### UI Layer

#### [MODIFY] [page.tsx](file:///Users/christianhadianto/Documents/TechSmith/toto-generator/src/app/page.tsx)
- Import 4D config, history, and strategy registry
- Use `activeGameId` from `useGame()` to switch between:
  - `SINGAPORE_TOTO` / `SINGAPORE_4D` config
  - `SG_TOTO_HISTORY` / `SG_4D_HISTORY` data
  - `STRATEGIES` / `FOUR_D_STRATEGIES` strategy list
- Pass the active strategy list to `StrategyGrid`
- Reset `strategyId` to `""` when game changes
- Display results using `ResultSet` for Toto, `FourDResultSet` for 4D

#### [MODIFY] [StrategyGrid.tsx](file:///Users/christianhadianto/Documents/TechSmith/toto-generator/src/components/toto/StrategyGrid.tsx)
- Accept a `strategies` prop instead of importing `STRATEGIES` directly
- This makes it game-agnostic

#### [NEW] [FourDResultSet.tsx](file:///Users/christianhadianto/Documents/TechSmith/toto-generator/src/components/toto/FourDResultSet.tsx)
- Display a single 4-digit number in a premium "lottery ticket" style
- Large, bold digits with individual digit cells
- Click-to-process animation (reuse existing pattern)

#### [MODIFY] [StatsPanel.tsx](file:///Users/christianhadianto/Documents/TechSmith/toto-generator/src/components/toto/StatsPanel.tsx)
- Accept a `gameType` prop (`"toto" | "4d"`)
- For Toto: keep existing logic (frequency of numbers 1-49)
- For 4D: analyze digit frequency per position (thousands/hundreds/tens/ones) and show hot/cold digits 0-9

#### [MODIFY] [analytics/page.tsx](file:///Users/christianhadianto/Documents/TechSmith/toto-generator/src/app/analytics/page.tsx)
- Use `activeGameId` to switch between `SG_TOTO_HISTORY` and `SG_4D_HISTORY` for the StatsPanel
- Pass `gameType` to StatsPanel
- History logs already filter by `gameId`, so they should work automatically

---

## Verification Plan

### Manual Verification
1. Open the app at `http://localhost:3000`
2. Select **Singapore 4D** from the game dropdown in the Navbar
3. Verify: Strategy grid shows 4D-specific strategies (6 strategies, not Toto's 10)
4. Verify: "No Strategy Selected" placeholder appears
5. Select a strategy → verify description card appears
6. Generate 3 sets → verify 4-digit numbers displayed (0000-9999 format)
7. Click a result to mark as processed
8. Navigate to **Analytics** page
9. Verify: StatsPanel shows digit-based hot/cold analysis (digits 0-9, not numbers 1-49)
10. Verify: History shows the 4D generation you just did
11. Switch back to **Singapore Toto** → verify everything still works as before
12. Verify: URL shows `?game=sg-4d` or `?game=sg-toto` correctly
