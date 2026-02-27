# Implementation Plan: 3-Tier Confetti Celebration & History Logging

## Goal
Implement a 3-tier celebration effect using confetti when the user generates their numbers, based on the `HuatMeter` score (Medium, High, and Legendary > 80). Also, store the computed `huatLevel` (e.g. "medium", "high", "legendary" or the numeric score) in the history when a set of numbers is generated. No scratch-to-reveal feature will be added.

## Constraints & Risks
- Limit confetti intensity so it doesn't cause performance issues.
- Ensure the celebration triggers right at the end of the score calculation animation.
- The score calculation requires the numbers and historical data. We should extract the calculation function or do it right before adding to history.

## Steps
1. **Dependency Installation**:
   - Install `canvas-confetti` and its types (`@types/canvas-confetti` as dev dependency).
2. **Confetti Utility**:
   - Create a helper to trigger confetti based on tier:
     - `medium` (Score 40-59): A moderate burst from the bottom.
     - `high` (Score 60-79): A larger burst with some star shapes and longer duration.
     - `legendary` (Score >= 80): A sustained full-screen confetti explosion with gold/red colors.
3. **Integration**:
   - Update `src/components/toto/HuatMeter.tsx`'s `useEffect` that handles the animated score to trigger confetti.
4. **Update Game History**:
   - Modify `src/context/GameContext.tsx` to include `score` and `huatTier` in the `HistoryItem` interface.
   - Refactor `calculateHuatScore` to be a reusable function inside `src/lib/huat-math.ts` (exporting it from where it's currently at `HuatMeter.tsx`).
   - In `src/app/page.tsx`, compute the huat score for the generated numbers and insert it into the `addHistory` payload.
5. **Lint Fixes**:
   - Ensure the linter passes without unexpected issues (e.g., in context or dependencies).

## Verification
- Validate the project compiles with `npm run build` or the dev server runs smoothly.
- Test generate numbers and verify each tier (`Medium`, `High`, `Legendary`) triggers the right intensity.
- Check LocalStorage or React Context to ensure `score` and/or `huatTier` is recorded correctly in the history items.
