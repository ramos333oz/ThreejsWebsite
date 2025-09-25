# Digital Vision Frontend Curriculum: Website with Tasteful Three.js Enhancements

A practical, modifiable roadmap to take a beginner to confident implementer of a professional software-company sub‑page with progressive Three.js integration.

---

## How to use this document
- Treat this as a living reference guide. Update as decisions change.
- Each phase lists: objectives, skills, deliverables/milestones, time estimate, prerequisites.
- Use the checkboxes to track completion. Add notes/links as you go.

---

## Project overview and goals
**Company:** Digital Vision (software company)

**Primary goal:** Build a performant, accessible, content‑first marketing sub‑page that optionally integrates tasteful Three.js elements without blocking core content.

**Success criteria**
- Clear content hierarchy that communicates value, services, and proof (case studies/testimonials).
- Fast, resilient page: reads well with JS off; 3D loads progressively, never blocks copy.
- Visual polish consistent with future brand style guide.
- Maintainable structure and minimal coupling so content evolves independently of 3D.

---

## Technology stack decisions (frontend)
- HTML5 + semantic markup
- CSS: modern CSS (custom properties, container queries when useful); optional utility classes or small BEM; preprocessor optional
- JavaScript: ES Modules; no framework required; may use Vite for local dev convenience
- Three.js (WebGL) for optional 3D enhancement
- Optional libraries:
  - GSAP/ScrollTrigger or Lenis for gentle scroll interactions (later phases)
  - lil‑gui for dev‑only tweaking (never ship to production)

Decision notes
- Start vanilla to keep footprint and complexity low; introduce tooling (Vite) only if development speed benefits outweigh setup
- Progressive enhancement: content and layout must not depend on 3D

---

## Development workflow and best practices
- Content‑first: structure HTML and copy before any 3D
- Accessibility‑by‑default: headings, landmarks, color contrast, focus states; respect `prefers-reduced-motion`
- Performance budgets: LCP < 2.5s on mid‑range mobile; 3D payload (model + textures) ideally < 1–2 MB compressed
- Version control: one feature branch per phase; small PRs; descriptive commits
- File structure (suggested):
  - `/public/` static assets (images, icons, fonts)
  - `/src/` scripts and styles
  - `/src/styles/` global.css, tokens.css (colors, spacing, type)
  - `/src/js/` main.js, three‑scene.js (later), loaders.js (later)
  - `/pages/subpage.html` (this page)
- Code style: small modules; pure functions where possible; avoid global state; document decisions in this file

---

## Three.js integration strategy (content‑first approach)
- Stage 1: Ship complete HTML/CSS page with zero 3D; validate content, layout, accessibility
- Stage 2: Insert a canvas container in hero; lazy‑initialize minimal Three.js scene on idle or interaction
- Stage 3: Replace placeholder geometry with optimized GLTF (DRACO + KTX2 textures if needed)
- Stage 4: Subtle motion only; avoid scroll hijacking; keep interaction optional
- Fallbacks: if WebGL unsupported or user prefers reduced motion, show static image or simplified SVG

---

## Performance and accessibility considerations
- Performance
  - Optimize images (responsive `<img>`/`<picture>`, WebP/AVIF)
  - Lazy‑init 3D; guard with `requestIdleCallback` or user interaction
  - Compress models (DRACO), compress textures (KTX2/BasisU), reduce draw calls
  - Correct color spaces (sRGB); avoid unnecessary `material.needsUpdate`
- Accessibility
  - Semantics: landmarks, heading order, descriptive links
  - Keyboard navigation; visible focus; no keyboard traps
  - Motion: respect `prefers-reduced-motion`; provide a toggle to pause 3D
  - Ensure content readable without canvas or JS

---

## Testing and optimization phases (high‑level)
- Visual regression checks after each phase (screenshots on key breakpoints)
- Lighthouse & WebPageTest for performance; axe DevTools for accessibility
- Cross‑device manual testing; mid‑tier Android performance baseline
- Bundle sizing and network waterfall inspection

---

## Curriculum phases (modules)

### Phase 0 — Orientation & Environment
- Objectives
  - Understand project goals, constraints, and content‑first philosophy
  - Prepare a minimal dev environment (optional: Vite)
- Skills
  - Semantic HTML fundamentals; basic Git workflow
- Deliverables/milestones
  - [ ] Project folder structure created
  - [ ] Sub‑page HTML file scaffolded
  - [ ] Readme and this curriculum file in place
- Time estimate: 0.5–1 day
- Prerequisites: none

### Phase 1 — Content Architecture & Semantic HTML
- Objectives
  - Define page sections and information hierarchy; write draft copy
  - Implement semantic structure with landmarks and correct heading levels
- Skills
  - Content modeling; HTML5 semantics; accessible navigation
- Deliverables/milestones
  - [ ] Sections: Hero, Problem→Solution, Services, Case Studies, Tech & Approach, Social Proof, CTA Footer
  - [ ] Skip‑links, nav structure (if needed), proper headings
  - [ ] Plain HTML page reads coherently without JS/CSS
- Time estimate: 1–2 days
- Prerequisites: Phase 0

### Phase 2 — Visual Design Implementation (CSS)
- Objectives
  - Apply typography scale, spacing, color tokens; responsive layout
- Skills
  - CSS custom properties; modern layout (Flex/Grid); container queries (optional)
- Deliverables/milestones
  - [ ] `/src/styles/tokens.css` and `global.css`
  - [ ] Responsive layouts for mobile/tablet/desktop
  - [ ] Focus states, hover states, link styles, high contrast checks
- Time estimate: 2–3 days
- Prerequisites: Phase 1

### Phase 3 — Accessibility & Baseline Performance
- Objectives
  - Ensure AA contrast, keyboard navigation, reduced motion handling
  - Establish performance baseline before any 3D
- Skills
  - Accessibility testing (axe), Lighthouse; image optimization
- Deliverables/milestones
  - [ ] Axe pass on key templates
  - [ ] Lighthouse: performance and accessibility ≥ 90 (no 3D yet)
  - [ ] Images optimized and responsive
- Time estimate: 1–2 days
- Prerequisites: Phase 2

### Phase 4 — Three.js Fundamentals (Sandbox)
- Objectives
  - Learn scene, camera, renderer, geometry, material, light, animation loop
  - Build a standalone sandbox (not yet in the page) for experimentation
- Skills
  - Three.js setup; resize handling; basic materials; OrbitControls (dev only)
- Deliverables/milestones
  - [ ] Minimal scene with a single mesh and light in `/src/js/sandbox`
  - [ ] Resize and pixel ratio handling; animation loop
  - [ ] Remove or confine OrbitControls to sandbox only
- Time estimate: 1–2 days
- Prerequisites: Phase 3

### Phase 5 — Integrate Minimal Three.js into the Sub‑Page
- Objectives
  - Add a hero canvas container; lazy‑init a simple, lightweight scene
  - Keep content readable while 3D loads
- Skills
  - Progressive enhancement; conditional init; DOM integration
- Deliverables/milestones
  - [ ] `<div id="hero-canvas">` in hero; `three‑scene.js` that initializes idly
  - [ ] Placeholder geometry (e.g., low‑poly shape) with subtle animation
  - [ ] Respect `prefers-reduced-motion` and provide pause toggle
- Time estimate: 1–2 days
- Prerequisites: Phase 4

### Phase 6 — Asset Loading & Gentle Interactions
- Objectives
  - Replace placeholder with optimized GLTF; add restrained motion
- Skills
  - GLTFLoader; DRACOLoader; basic lighting/material tuning; micro‑interactions
- Deliverables/milestones
  - [ ] GLTF loads under size budget (≤ ~1–2 MB compressed)
  - [ ] Subtle animation (rotation, parallax), no scroll hijacking
  - [ ] Fallback image for no‑WebGL or reduced motion
- Time estimate: 2–3 days
- Prerequisites: Phase 5

### Phase 7 — Performance Hardening & Accessibility Re‑audit
- Objectives
  - Re‑test performance and accessibility with 3D active
- Skills
  - Texture compression (KTX2), draw‑call reduction, tone mapping and color space
- Deliverables/milestones
  - [ ] Lighthouse ≥ 85 with 3D active; LCP < 2.5s on mid‑tier mobile
  - [ ] Axe pass with canvas present
  - [ ] Motion toggle verified; CPU/GPU acceptable in Performance panel
- Time estimate: 1–2 days
- Prerequisites: Phase 6

### Phase 8 — Testing, QA & Documentation
- Objectives
  - Stabilize; document decisions; prepare handoff notes
- Skills
  - Cross‑browser/device QA; documenting patterns
- Deliverables/milestones
  - [ ] Test matrix completed (browsers/devices)
  - [ ] Known issues list and mitigation / backlog entries
  - [ ] README updates; inline docs for three‑scene modules
- Time estimate: 1 day
- Prerequisites: Phase 7

---

## Dependencies between phases (summary)
- 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8
- Gate checks after Phases 3, 5, 7 ensure quality before adding complexity

---

## Daily working checklist
- [ ] Content changes do not depend on JavaScript to be readable
- [ ] Accessibility: headings, focus, contrast verified in changed sections
- [ ] 3D: init remains lazy/optional; motion respects user settings
- [ ] Performance: changed assets optimized; no unexpected bundle growth
- [ ] Decisions/changes recorded in this document

---

## Placeholders for future updates
- Style Guide Integration (colors, typography, components)
  - TODO: Link finalized brand tokens; swap temporary tokens in `/src/styles/tokens.css`
- Existing Codebase Analysis
  - TODO: Document how this sub‑page integrates with current site routing/build
  - TODO: Note shared components/utilities to reuse
- Asset Pipeline
  - TODO: Model sources, decimation settings, DRACO/KTX2 workflow, QA checklist
- Analytics & Monitoring
  - TODO: Events for hero interactions; error reporting for 3D init failures

---

## References and learning resources
- Three.js official documentation and examples (getting started, loaders, shadows)
- Example repos:
  - https://github.com/codebucks27/3D-Landing-page-for-Apple-iPhone (3D hero + scroll interaction)
  - https://github.com/doinel1a/vite-three-js (Vite + Three.js boilerplate)
  - https://github.com/Soft8Soft/threejs-blender-template (clean Three.js index setup)
- UX articles on parallax/scrolling:
  - Nielsen Norman Group: What Parallax Lacks
  - UXPA: Effects of Parallax Scrolling on User Experience

---

## Appendices

### A. Definition of Done (per phase)
- Objectives achieved; deliverables checked; accessibility/performance gates met; docs updated

### B. Milestone tracker (example)
| Phase | Status | Date | Notes |
|------|--------|------|-------|
| 0 | ☐ | | |
| 1 | ☐ | | |
| 2 | ☐ | | |
| 3 | ☐ | | |
| 4 | ☐ | | |
| 5 | ☐ | | |
| 6 | ☐ | | |
| 7 | ☐ | | |
| 8 | ☐ | | |

### C. Risk register (starter)
- Scope creep in 3D complexity → enforce budgets, gate reviews
- Performance regressions → continuous audits; lazy‑init policy
- Accessibility drift → periodic axe scans; manual keyboard testing

