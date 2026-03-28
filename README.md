# QuestFlow

QuestFlow is a Base mini app for publishing, discovering, and completing incentivized onchain quests.

## UI Structure

- Discover: logo, wallet connect, hero, dual CTA, live stats, filter chips, social activity rail, two-column quest grid.
- Quest Detail: back, save, share, reward card, compact stats, three-step action flow, fixed action buttons.
- Publish: single-screen glass form for title, reward pool, deadline, category, difficulty, verification, plus fixed publish CTA.
- Profile: avatar tile, short address, reward stats, reputation, and quick entry cards for quests, joins, and rewards.

## Tech

- Next.js App Router
- Tailwind CSS
- wagmi + RainbowKit
- Base mainnet contract integration
- `ox/erc8021` attribution data suffix placeholder
- transaction tracking via `utils/track.js`

## Notes

- `base:app_id` and `talentapp:project_verification` are hardcoded in [`app/layout.tsx`](./app/layout.tsx).
- Builder Code is currently left as `BUILDER_CODE_PLACEHOLDER` until the final code is provided.
