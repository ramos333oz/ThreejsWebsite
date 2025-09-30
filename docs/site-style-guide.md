# Visual Theme Guide

## 1. Brand Overview
- Atmosphere: single luminous gradient inspired by the certificates section; avoid hard section breaks.
- Tone: calm, confident, polished technology profile.
- Layout: centered containers (max-width 1040px) with spacious breathing room and consistent sequencing (eyebrow ? title ? lede ? body).

## 2. Color System
| Token | Hex / Gradient | Usage |
|-------|----------------|-------|
| `--bg-gradient` | `linear-gradient(140deg, #f5f7fb 0%, #ecfcff 52%, #f1f5ff 100%)` | Body background applied to `body` and inherited by all sections |
| `--bg-radial-blue` | `radial-gradient(circle at 12% 18%, rgba(37, 99, 235, 0.28) 0%, rgba(37, 99, 235, 0) 62%)` | Large soft glow layered above base |
| `--bg-radial-purple` | `radial-gradient(circle at 88% 88%, rgba(124, 58, 237, 0.26) 0%, rgba(124, 58, 237, 0) 60%)` | Complementary glow |
| `--ink-strong` | `#0b1220` | Primary headings, important labels |
| `--ink-body` | `#475569` | General paragraph text |
| `--ink-subtle` | `#64748b` | Secondary copy, helper text |
| `--accent-primary` | `#1d4ed8` | Buttons, meta highlights |
| `--accent-secondary` | `#22d3ee` | Gradients, interactive flourishes |
| `--accent-tertiary` | `#7c3aed` | Alternate emphasis, halo overlays |
| `--surface-card` | `rgba(255, 255, 255, 0.9)` | Cards (skills, projects, education, contact) |
| `--surface-border` | `rgba(100, 116, 139, 0.22)` | Soft card borders |

*Guidelines*
- Apply base gradient to the `body` and use translucent card surfaces so sections feel like islands floating on the same backdrop.
- Use `--accent-primary` + `--accent-secondary` gradients for call-to-action buttons and pills; keep hover states brighter but within the same duo.
- Keep text legible: do not place white copy over cards; prefer `--ink-body`.

## 3. Typography
- Display Family: **Space Grotesk**.
- Body Family: **Inter**.
- Scale (mobile values decrease ~10%):
  - H1 `clamp(3.8rem, 6vw, 5.8rem)` weight 700.
  - H2 `3.2rem` weight 600.
  - H3 `2.1rem` weight 600.
  - Eyebrow `1.3rem`, letter-spacing `0.28em`, uppercase, color `rgba(11, 18, 32, 0.6)`.
  - Paragraph `1.6rem`, line-height `1.68`.
  - Small meta/pills `1.3rem`, uppercase, letter-spacing `0.08em`.
- Alignment: center intro blocks (`section-intro` wrapper) followed by left-aligned content inside cards.

## 4. Spacing & Layout
- Section padding: `padding-block: 9rem` desktop, `6rem` tablets, `5rem` phones.
- Container: `max-width: 1040px`, `margin-inline: auto`, `padding-inline: clamp(1.8rem, 4vw, 3.2rem)`.
- Vertical rhythm inside sections: intro gap `2.4rem`, grid gap `2.8rem`, card internal padding `3rem`.
- Use CSS custom properties (`--gap-section`, `--card-radius`) to keep spacing synchronized.

## 5. Components
### Section Intro
```
<section class="section">
  <div class="section-intro">
    <p class="section-eyebrow">label</p>
    <h2 class="section-title">Headline</h2>
    <p class="section-lede">One or two sentences.</p>
  </div>
  ...
</section>
```
- Applies to About, Skills, Projects, Education, Certificates, Contact.
- Eyebrow optional for Hero + Certificates where existing copy already fits the tone.

### Card Surface
- Background `--surface-card`, border `1px solid var(--surface-border)`, radius `2.4rem`, shadow `0 24px 60px rgba(15, 23, 42, 0.12)`.
- Optional halo pseudo-element using accent gradients (matching certificates).
- Hover: `transform: translateY(-10px); box-shadow` boosted by 20%, border color transitions to `--accent-primary` or card theme.

### Pill & Tag
- Font `1.3rem` uppercase, `letter-spacing: 0.08em`.
- Padding `0.6rem 1.6rem`, border radius `999px`.
- Background gradient: `linear-gradient(135deg, rgba(255,255,255,0.65), rgba(29,78,216,0.25))`.

### CTA Buttons
- Primary: gradient `linear-gradient(135deg, #22d3ee 0%, #1d4ed8 100%)`, white text, hover translateY `-4px`, shadow `0 24px 50px rgba(29, 78, 216, 0.3)`.
- Secondary: outline using `rgba(29, 78, 216, 0.25)`, text `--accent-primary`.

### 3D Logo Viewer Frame
- Wrapper uses card surface spec with `aspect-ratio: 1 / 1` and halo overlay like certificates.
- Canvas should inherit `border-radius` and use `overflow: hidden` to maintain card silhouette.

## 6. Background Application
- `body` background: base gradient plus layered radial glows via `::before` pseudo-element pinned fixed.
- Each section uses transparent backgrounds; only special contexts (hero overlay, footer) may add subtle linear gradient overlays respecting same palette.
- Remove horizontal rules between sections; rely on spacing + subtle decorative blur or top/bottom glows for transitions.

## 7. Interaction Principles
- Motion curve `cubic-bezier(0.16, 1, 0.3, 1)`, duration `0.45s` for hover lifts.
- Focus states: 3px outline using `rgba(34, 211, 238, 0.5)` with 6px offset.
- Reduced motion: disable translate/opacity animations, keep color transitions.

## 8. Implementation Checklist
1. Apply global tokens via `:root` and update `body` background.
2. Normalize section wrappers to use `section` + `.section-intro`.
3. Refactor hero/about/skills/projects/education/contact to reuse card + tag styles.
4. Remove dark overlays; ensure copy uses `--ink` colors.
5. Verify contrast (WCAG AA) for all text on gradients.
6. Review mobile breakpoints after refactor to maintain consistent rhythm.
