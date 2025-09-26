# Personal Portfolio Curriculum: Content‑First Site with Optional Three.js Polish

A practical, modifiable roadmap to build Omar Moussa Bin Zakaria’s professional developer portfolio (vanilla HTML/CSS/JS). Ship content first; add tasteful Three.js enhancements later.

---

## How to use this document
- Treat as a living plan and content repository; update as decisions change.
- Each phase lists: objectives, skills, deliverables/milestones, time estimate, prerequisites.
- Use checkboxes to track completion. Add notes/links as you go.

---

## Project overview and goals
**Owner:** Omar Moussa Bin Zakaria

**Primary goal:** Build a performant, accessible, content‑first developer portfolio that clearly communicates skills, projects, education, and credentials. Three.js is an optional enhancement for the hero after v1 ships.

**Success criteria**
- Clear content hierarchy for About, Skills, Projects, Education, Certificates, Contact.
- Fast, resilient site: fully readable without JS; enhancements never block core content.
- Polished visuals with responsive typography and strong contrast; keyboard accessible.
- Maintainable structure so content evolves independently of any 3D/JS.

---

## Technology stack decisions (frontend)
- HTML5 + semantic markup
- CSS: modern CSS (custom properties, responsive layout via Flex/Grid). Preprocessor optional
- JavaScript: minimal ES Modules; no framework required (may use Vite later for DX)
- Optional: Three.js (progressive enhancement in hero, later phase)
- Optional libs: small scroll/motion utilities (respecting prefers‑reduced‑motion)

Decision notes
- Start vanilla to keep footprint and complexity low
- Progressive enhancement: content and layout must not depend on JS/3D

---

## Development workflow and best practices
- Content‑first: structure HTML and copy before any JS/3D
- Accessibility‑by‑default: headings, landmarks, contrast, focus states, keyboard nav
- Performance budgets: LCP < 2.5s on mid‑range mobile; minimal JS; optimized images
- Version control: one feature branch per phase; small PRs; descriptive commits
- Suggested file structure:
  - /public/ (images, icons, pdf resume)
  - /src/styles/ (tokens.css, global.css)
  - /src/js/ (main.js, three‑hero.js later)
  - /index.html (single‑page portfolio)76

---

## Information architecture (content‑first)
- Hero: Name, role subheading, one‑liner value prop, CTA (Projects, Contact, Resume PDF)
- About: Short bio (3–5 sentences), headshot optional
- Skills: Grouped by category (Web, Backend/DB, ML/Algorithms, IoT, Tools)
- Projects: 3–6 best projects with consistent cards (title, brief, tech tags, links)
- Education: UiTM program + highlights; earlier education summarized
- Certificates & Awards: Issuer + credential name + date (concise list)
- Contact: Email CTA, GitHub/LinkedIn links (optional contact form)

---

## Resume content (drafted for site copy)

### Profile summary
Third‑year Bachelor of Computer Science (Hons.) Netcentric Computing student. Detail‑oriented, consistently delivers high‑quality work ahead of deadlines. Passionate about learning cutting‑edge tech—especially emerging AI—and turning curiosity into actionable skills. Known for collaboration, problem‑solving, and on‑time delivery. Open to mentorship and knowledge‑sharing.

### Skills (to confirm)
- Web: HTML, CSS, JavaScript; React.js; Vite
- Backend/DB: Node.js; Supabase (PostgreSQL); SQL; pgvector (vector embeddings)
- ML/Algorithms: K‑Nearest Neighbors (KNN); similarity search and ranking
- IoT: Arduino/ESP32; GPS/GSM modules; Blynk; sensor integration
- Tools/Practices: Git & GitHub; accessibility basics; performance profiling; CLI

### Selected projects
1) Real‑Time Sports Team‑Up Crowdsourcing Web App (2024–Current)
   - Stack: React.js, Vite, Node.js, Supabase (PostgreSQL)
   - Features: Real‑time sports vacancies; host/join matches; player similarity via vector embeddings (pgvector) + KNN; result sorting.
   - Role: Full‑stack implementer and algorithm designer.

2) Permit ML Scraper & Map Visualization (2025)
   - Automated system scraping grading permits from ~35–40 Southern California city websites; normalizes data; interactive map with drive‑time/distance.
   - Role: Web scraper developer and data visualization integrator.

3) Child Safety Wearable (IoT) — Location Tracking & SOS (2023)
   - Wearable device combining GPS/GSM location and environmental monitoring; panic button triggers SOS (via GSM) with GPS coordinates; buzzer for proximity.
   - Parents view realtime data on Blynk dashboard. Built with Arduino/ESP32, sensors, IoT cloud.

4) DVWA Security Analysis with Kali Linux (summary)
   - Conducted security analysis exercises using DVWA on Kali; practiced common web vulns and mitigations.

### Education
- Universiti Teknologi MARA (UiTM) Shah Alam — Bachelor of Computer Sciences (Hons.) Netcentric Computing (2022–Current)
  - Current CGPA: 3.45; Dean’s Award: 5th & 6th semesters
- Matriculation Foundations — Banting, Selangor Matriculation (2021–2022)
  - CGPA: 3.54; MUET Band: 4.0
- Sijil Pelajaran Malaysia (SPM)

### Certificates & awards (issuer/date)
- Introduction to Artificial Intelligence — IBM (Feb 2025)
- Introduction to IoT — Cisco (Jun 2024)
- Google Cloud Computing Foundations (Feb 2024 series)
  - Cloud Computing Fundamentals
  - Data, ML and AI in Google Cloud
  - Infrastructure in Google Cloud
  - Networking & Security in Google Cloud
- AWS Cloud Practitioner Essentials (Feb 2024)
- Dean’s List Award — 5th Semester (May 2025)
- Dean’s List Award — 6th Semester (Mac 2025)

### Social & contact (to add to site)
- GitHub: (add)
- LinkedIn: (add)
- Email: (add)

---

## Performance and accessibility considerations
- Performance
  - Optimize images (responsive <img>/<picture>, WebP/AVIF)
  - Keep JS minimal; defer non‑critical scripts; inline critical CSS if small
  - Cache‑friendly asset naming; measure LCP and main‑thread time
- Accessibility
  - Correct semantics and heading order; descriptive links
  - Keyboard navigation; visible focus; no traps
  - Respect prefers‑reduced‑motion; provide motion toggle for any 3D

---

## Curriculum phases (modules)

### Phase 0 — Orientation & Environment
- Objectives: Confirm goals and constraints; set up minimal project structure
- Deliverables
  - [ ] Project folders (/public, /src/styles, /src/js)
  - [ ] README and this curriculum file
- Time: 0.5 day
- Prereqs: none

### Phase 1 — Content Architecture & Semantic HTML
- Objectives: Define sections and IA; draft copy using resume content
- Deliverables
  - [ ] index.html with sections: Hero, About, Skills, Projects, Education, Certificates, Contact
  - [ ] Plain HTML reads coherently without CSS/JS
- Time: 1–2 days
- Prereqs: Phase 0

### Phase 2 — Visual Design (CSS)
- Objectives: Add tokens.css + global.css; responsive type/spacing/layout
- Deliverables
  - [ ] /src/styles/tokens.css and global.css
  - [ ] Responsive layouts for mobile/tablet/desktop
  - [ ] Focus/hover states and contrast checks
- Time: 2 days
- Prereqs: Phase 1

### Phase 3 — Accessibility & Baseline Performance
- Objectives: AA contrast, keyboard nav, reduced motion handling; Lighthouse baseline
- Deliverables
  - [ ] Axe pass on key templates
  - [ ] Lighthouse ≥ 90 (no 3D yet)
  - [ ] Images optimized
- Time: 1 day
- Prereqs: Phase 2

### Phase 4 — Projects Deep‑Dive & Media
- Objectives: Add project screenshots/GIFs; finalize links (live/code)
- Deliverables
  - [ ] 3–6 project cards with consistent metadata
  - [ ] Links validated; alt text provided
- Time: 1 day
- Prereqs: Phase 3

### Phase 5 — SEO/Social & Polish
- Objectives: Meta + Open Graph; favicons; Resume PDF link; analytics optional
- Deliverables
  - [ ] <head> metadata and icons
  - [ ] /public/Resume.pdf link in header/footer
- Time: 0.5–1 day
- Prereqs: Phase 4

### Phase 6 — Optional Three.js Hero Enhancement
- Objectives: Add a light hero scene; lazy‑init; motion toggle
- Deliverables
  - [ ] /src/js/three‑hero.js; hero canvas container
  - [ ] Reduced‑motion respected; fallback image/SVG
- Time: 1–2 days
- Prereqs: Phase 5

### Phase 7 — Final QA & Documentation
- Objectives: Cross‑device QA; Lighthouse/axe re‑audit; document decisions
- Deliverables
  - [ ] Test matrix; known issues + mitigation
  - [ ] README updates
- Time: 0.5–1 day
- Prereqs: Phase 6 (or 5 if skipping 3D)

---

## Dependencies between phases (summary)
- 0 → 1 → 2 → 3 → 4 → 5 → 6 (optional) → 7
- Gate checks after Phases 3 and 6 ensure quality before adding complexity

---

## Daily working checklist
- [ ] Content remains readable without JS
- [ ] Accessibility (headings, focus, contrast) verified in changed sections
- [ ] Performance: images optimized; no unexpected JS growth
- [ ] Decisions/changes recorded in this document

---

## References and template candidates
- DevFolio (analysis target): https://github.com/AnilSeervi/DevFolio
- simplefolio: https://github.com/cobiwave/simplefolio
- portfolio‑template: https://github.com/nisarhassan12/portfolio-template
- CommunityPro/portfolio‑html: https://github.com/CommunityPro/portfolio-html

---

## Appendices
### A. Definition of Done (per phase)
- Objectives achieved; deliverables checked; accessibility/performance gates met; docs updated

### B. Risks
- Scope creep in 3D complexity → enforce budgets; gate reviews
- Performance regressions → continuous audits; lazy‑init policy
- Accessibility drift → periodic axe scans; manual keyboard testing

