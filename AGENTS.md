# Repository Guidelines

## Project Structure & Module Organization
- `index.html` weds content sections to shared Three.js viewers; keep semantic IDs to feed ScrollReveal.
- `javascript/` holds ES modules (`logo-viewer.js`, `scrollveal.js`, `valtilt.js`) imported from `main.js`.
- `style/` contains the authored Sass partials; `sass` builds to `css/main.css`, which ships in production while retaining tokens in `style/`.
- `assets/` stores imagery and `assets/3d/` GLB models; avoid inlining large binaries in git history.
- `docs/` houses reference material—add product notes or research here alongside the new style guide.

## Build, Test, and Development Commands
- `npm run dev` — Watches Sass, boots Vite dev server, and hot-reloads Three.js canvases.
- `npm run build` — Produces production CSS/JS in `dist/`; run before commits touching styling or scripts.
- `npm run preview` — Serves the built bundle locally to mirror the deploy target.
- `npm run sass:watch` — Optional if you want only Sass recompilation without Vite.

## Coding Style & Naming Conventions
- Use two-space indentation for JS, Sass, and HTML; keep modules in ES syntax with named exports.
- Centralize colors, spacing, and shadows in `style/base/_variables.scss`; reference tokens instead of hard-coded values.
- Name sections `section--<noun>` and apply shared `.section-intro`/`.surface-card` patterns for consistency.
- Keep Three.js constants uppercase (`POINTER_OUTSIDE`) and DOM data attributes kebab-cased.

## Testing Guidelines
- No automated tests yet; smoke-test hero interactions, ScrollReveal triggers, and logo hover lift in Chrome + Firefox.
- When changing Three.js assets, confirm frame rate using DevTools performance panel and inspect WebGL warnings.
- Document manual test notes in PR descriptions until a formal test suite is introduced.

## Commit & Pull Request Guidelines
- Write imperative, present-tense commit subjects (`Align skills cards with certificates theme`).
- Reference related issues in the body (`Refs #123`) and summarize visual changes (before/after screenshots when styling shifts).
- PRs should list the commands executed (`npm run build`, manual QA steps) and call out any follow-up work.
- Request review from another contributor familiar with the section you touched (e.g., styling vs. Three.js).
