# Implementation Plan: Huat Huat Dragon Mascot

## Goal
Add an interactive "Huat Huat Dragon" mascot to the application. The mascot will:
1. Provide random lucky tips.
2. React to the `HuatMeter` score after generation.
3. Warn the user if they are generating too many sets in a single session (e.g., more than 10 or 20 sets total), promoting responsible gaming.

## Constraints & Risks
- The mascot should be visually pleasing but not block the main UI. A floating or fixed position element at the bottom-right or bottom-left is ideal.
- State management is needed to track the total number of sets generated in the current *session* (not persisted across reloads, or stored in session storage/context).
- The mascot needs a few visual states (e.g., normal, happy for high score, warning/concerned for too many bets). Since we don't have custom 3D assets, we can use an Emoji or an icon (like 🐲 or a custom SVG) combined with a speech bubble.

## Steps

### 1. Context Update for Session Tracking
- Update `GameContext.tsx` to include `sessionSetsGenerated`, a simple counter that increments by the number of sets generated each time the user clicks generate.
- Provide `incrementSessionSets(count: number)` in the context.

### 2. Mascot Component
- Create `src/components/toto/HuatDragon.tsx`.
- This component connects to `GameContext` to read `sessionSetsGenerated`.
- It also takes props (like the latest `huatLevel` from the last generation, or reads the latest history item) to react to the score.
- **Logic**:
  - If `sessionSetsGenerated` exceeds a threshold (e.g., > 10 sets), the dragon shows a warning tooltip: "Wah lau, buy so many? Play responsibly hor!"
  - If a generation just happened, react based on `huatLevel` (e.g., "Huat Ah! This one confirm strike!" for legendary).
  - Otherwise, show a random lucky tip every few seconds or on a click (e.g., "Did you know? 8 is very ONG!").

### 3. Integration
- Add the `HuatDragon` component to `src/app/page.tsx` or `src/app/layout.tsx` so it floats on the screen.
- Update `handleGenerate` in `src/app/page.tsx` to call `incrementSessionSets(count)` where `count == setCount`.

## Verification
- Run local dev server (`npm run dev`).
- Generate 1 set, observe the dragon giving a lucky tip or reacting to the score.
- Generate > 10 sets (e.g., 20) and observe the dragon changing to a warning state.
