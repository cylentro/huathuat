## Goal
Fix 24 lint issues (9 errors, 15 warnings) across multiple files to satisfy project standards and allow code to be built and pushed to Git.

## Assumptions
- The current ESLint configuration is intentional and strict.
- `react-hooks/set-state-in-effect` is a specific rule that discourages synchronous state updates in effects.
- Most issues are repetitive (unused vars, unescaped entities, prefer-const).

## Plan

### Step 1: Fix `src/lib/strategies/four-d.ts` (1 error, 1 warning)
- **Change**: 
    - Convert `let next` to `const next` on line 146.
    - Prefix unused `config` on line 8 with `_`.
- **Files**: `src/lib/strategies/four-d.ts`
- **Verify**: `npx eslint src/lib/strategies/four-d.ts`

### Step 2: Fix `src/components/toto/StrategyGrid.tsx` (1 error)
- **Change**: 
    - Replace `any` in `ICON_MAP` with `LucideIcon`.
    - Import `LucideIcon` from `lucide-react`.
- **Files**: `src/components/toto/StrategyGrid.tsx`
- **Verify**: `npx eslint src/components/toto/StrategyGrid.tsx`

### Step 3: Fix `src/app/page.tsx` (1 error, several warnings)
- **Change**: 
    - Escape apostrophe in line 77: `Don't` -> `Don&apos;t`.
    - Resolve `set-state-in-effect` by wrapping resets in a check or moving logic.
- **Files**: `src/app/page.tsx`
- **Verify**: `npx eslint src/app/page.tsx`

### Step 4: Fix `src/context/GameContext.tsx` (3 errors, 1 warning)
- **Change**: 
    - Fix unused `SINGAPORE_TOTO`.
    - Resolve `set-state-in-effect` for `setActiveGameIdState` and `setHistory`.
- **Files**: `src/context/GameContext.tsx`
- **Verify**: `npx eslint src/context/GameContext.tsx`

### Step 5: Fix remaining unused variables and imports
- **Files**: 
    - `src/components/layout/Navbar.tsx`
    - `src/components/toto/StatsPanel.tsx`
    - `src/lib/generators/types.ts`
- **Verify**: `npm run lint`

### Step 6: Final Build Verification
- **Verify**: `npm run build`

## Risks & mitigations
- **Risk**: Refactoring `useEffect` to avoid `set-state-in-effect` might change behavior or skip necessary resets.
- **Mitigation**: Be extremely careful with logic; if the sync is necessary and correct, use eslint-disable with comment rather than breaking site.

## Rollback plan
- Use `git checkout src/` to revert changes if logic breaks.

## Persistence
- Artifact: `artifacts/superpowers/lint-fix-plan.md`
