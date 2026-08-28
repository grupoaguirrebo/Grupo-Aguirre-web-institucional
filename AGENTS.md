# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Approved Grupo Aguirre direction

- Visual source of truth: the first regenerated option selected by the founder on 2026-08-28.
- Brand language: very dark navy, electric blue, white, condensed display typography, connected Bolivia imagery, alternating dark and light sections.
- Purpose: institutional credibility for buyers and potential commercial partners; WhatsApp is the only conversion path.
- Public positioning: “Comercializadora digital” and “Simplificamos la compra por volumen.”
- Do not expose names or clues about distributors, suppliers, sourcing, inventory, margins, customer lists, advertising methods, billing, payment mechanics, or internal operations.
- Do not claim authorized distribution, official representation, best prices in the market, or the absence of intermediaries.
- “Productos originales Tigre” is the approved factual product-line wording. Do not display Tigre's logo or imply an endorsement.
- The representative block stays near the end. Never invent a portrait; replace the current brand mark only when Jorge provides his real approved photograph.
