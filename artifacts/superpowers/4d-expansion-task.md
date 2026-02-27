# Expand Application to Support Singapore 4D

## Data Layer
- [ ] Create `FourDDraw` interface and `sg-4d-history.ts` with deterministic seeded data
- [ ] Create `singapore-4d.ts` game config

## Strategy Layer
- [ ] Create `src/lib/strategies/four-d.ts` with 12 4D-specific strategies
- [ ] Create `src/lib/generators/four-d-registry.ts` for 4D strategy registry

## UI Layer
- [ ] Make `StatsPanel` game-aware (dynamic range, digit-based stats for 4D)
- [ ] Make Generator page (`page.tsx`) game-aware (switch config/history/strategies/display)
- [ ] Make Analytics page game-aware (switch history/stats data)
- [ ] Create `FourDResultSet` component for 4D number display
- [ ] Update `StrategyGrid` to accept dynamic strategy list

## Verification
- [ ] Manual browser verification of both games
