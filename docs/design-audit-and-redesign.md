# Portfolio UI/UX Audit & Redesign Path

_Audit of `tahabouhsine.com` (MLNomadpy personal site) — June 2026._

This document is the agreed path for taking the portfolio from "works,
but dated and inconsistent" to a 2026-grade researcher portfolio. It is
ordered so each phase ships independently.

---

## 1. Verdict (the 0.5s / 2s / 5s read)

- **0.5s — "Is this current?"** No. Muddy brown background (`#412c0f`),
  Orbitron sci-fi headings, rainbow nav icons, and a typewriter effect
  read as **2018–2019**, not 2026.
- **2s — "What is this?"** Partly. The hero says "Taha Bouhsine / ML
  Researcher & Engineer" — clear. But it's floating over a dark video
  with no proof, no positioning, no path.
- **5s — "Is this for me / what next?"** Weak. The only CTA is a generic
  **"Connect"** to LinkedIn. No "see my research / talks / hire me"
  hierarchy. Navigation is **icon-only with no labels**, so a first-time
  visitor has to hover (impossible on touch) to learn what the site
  contains.

**Bottom line:** the content is strong (40+ talks, publications, poetry),
but the visual layer undersells it and the information architecture
hides it.

---

## 2. Critical findings (priority order)

### 2.1 — Three competing design systems (root cause of everything)

There is no single source of truth for tokens. Three files define
**conflicting** palettes and fonts:

| File | Background | Accent | Font |
|---|---|---|---|
| `src/assets/styles.css` | `#412c0f` brown | `#f4a560` sand | Orbitron / Space Mono |
| `src/assets/main.css` | `#0a0a0a` black | `#667eea→#764ba2` purple gradient | system / Inter |
| `src/assets/aboutme.css` (740 lines) | local overrides | mixed | mixed |

Focus rings are **purple** (`main.css:35`) while the brand is **orange**.
Body font resolves to system UI in one file and Space Mono in another.
**Fix this first** — everything else depends on a single token layer.

### 2.2 — Navbar (you flagged this; it's the biggest UX problem)

`src/components/Navbar.vue`:

- **Icon-only, no text labels.** Five FontAwesome glyphs with `data-tooltip`
  on `:hover` only (`Navbar.vue:561`). On mobile/touch there is **no way
  to discover** what each icon means without tapping. This hurts
  usability, accessibility, and SEO (no visible nav text).
- **Rainbow icon colors** — About `#77aaff` (blue), Talks `#ff88aa`
  (pink), Poetry `#ddaaff` (purple), Blogs `#ffcc66` (gold)
  (`Navbar.vue:405–419`). This violates the single-accent rule and reads
  as a toy, not a researcher's site.
- **A scroll-progress bar** (`Navbar.vue:57, 421`) that measures
  `window.scrollY` — but the app is a route-switched SPA where each view
  scrolls its own inner container, so this bar is usually **stuck at 0%**.
  Dead feature.
- **Fragile responsive height juggling** — `height: 70px` then `auto`
  with `padding-top` hacks across 5 breakpoints (`Navbar.vue:175–208,
  433–552`) to fit a floating section-title. Overly complex.
- **Home is a giant glowing circle** scaled 1.2× in the middle — a
  skeuomorphic "dock" metaphor that fights the flat content.

### 2.3 — Hero (`HeroSection.vue`)

- **Typewriter H1** hardcodes `steps(14, end)` for the 13-char string
  "Taha Bouhsine" (`HeroSection.vue:109`). Any name change silently
  breaks it; the `white-space: nowrap` + `max-width:0` animation can clip
  on narrow screens.
- **Background `.mp4` video** as the hero (`HeroSection.vue:3`) — heavy,
  hurts LCP/Core Web Vitals, and the skill's guidance explicitly flags
  hero video as risky in 2026. Mobile already disables it, proving it's
  optional.
- **Single weak CTA** — "Connect" → LinkedIn. No primary/secondary tier,
  no outcome copy.
- Dark `rgba(0,0,0,0.6)` scrim over video = generic.

### 2.4 — Typography

- **Orbitron** for all headings (`--font-heading`) is a wide sci-fi
  display face — wrong signal for an ML researcher (reads "gaming /
  crypto"). **Space Mono** everywhere for body is quirky but low
  readability at length.
- **Pure white** `#ffffff` on dark (`--primary-text`) shimmers; 2026
  standard is a warm off-white.
- No modular type scale — sizes are ad-hoc (`2.5rem`, `3rem`, `1.1rem`,
  `0.9rem`) per component.

### 2.5 — Motion

- Full-page **slide transitions** between routes (`slide-fade-left/right`,
  `scale-fade`) move the entire viewport — heavy and disorienting versus
  the 2026 norm of fast, local, ≤300ms transitions.
- Typewriter + blink caret on every home visit (patronizing on repeat
  visits).

### 2.6 — Accessibility / correctness

- Focus outline color mismatch (purple vs brand).
- Nav relies on hover tooltips → fails touch + keyboard discovery.
- Some nav icon colors (`#77aaff` 5.6:1) are fine for contrast but the
  reliance on color to distinguish items is a WCAG "use of color" smell.
- Heading hierarchy is inconsistent across views.

---

## 3. New design direction — "Desert Obsidian"

Keep the **nomad/desert identity** (it's authentic and differentiated)
but modernize it: warm near-black instead of muddy brown, one refined
sand accent, an oasis-teal secondary, editorial typography. Warm-dark +
single accent is exactly the Linear/Vercel/Datadog 2026 register,
re-skinned for a desert brand.

### 3.1 — Color palette (WCAG AA verified on `--bg`)

```css
:root {
  /* Warm-dark neutral ramp (was a single muddy #412c0f) */
  --bg:          #0E0B08;  /* page background (warm near-black)        */
  --bg-elev:     #16110B;  /* +1 elevation: cards                      */
  --bg-elev-2:   #1F1810;  /* +2 elevation: modals, popovers           */
  --bg-elev-3:   rgba(240, 178, 101, 0.04); /* tinted hover wash       */

  /* Text ramp (warm off-white, never pure #fff) */
  --fg:          #F0EBE3;  /* primary text      — 16.5:1  ✅            */
  --fg-dim:      #B3A896;  /* secondary text    —  8.4:1  ✅            */
  --fg-mute:     #867B68;  /* micro / captions  —  4.7:1  ✅            */

  /* Brand */
  --accent:      #F0B265;  /* sand — CTAs, links, emphasis — 10.5:1 ✅  */
  --accent-2:    #46C2A8;  /* oasis teal — secondary signal —  8.9:1 ✅ */
  --accent-3:    #E07A4D;  /* clay/terracotta — highlights  —  6.6:1 ✅ */

  /* Lines & glow (accent at graduated opacity) */
  --line:        rgba(240, 178, 101, 0.14);
  --line-strong: rgba(240, 178, 101, 0.38);
  --glow:        0 0 0 1px rgba(240,178,101,.28),
                 0 20px 50px -18px rgba(240,178,101,.18);

  /* Button text on accent fills (dark, 9.9:1) */
  --on-accent:   #1A1206;
}
```

**Single-accent rule:** sand is the only emphasis color. Teal is reserved
for *one* job (e.g. "active/now" states or the publications signal); clay
for *one* job (e.g. poetry/Arabic content or danger). Retire the rainbow
nav icons entirely.

**Atmospherics** (the "this looks designed" layer): replace the heavy
video with (1) a faint 64px grid masked by a center radial fade at
`rgba(accent,0.04)`, and (2) two ultra-low-opacity radial vignettes
(sand top-left, teal bottom-right). Cheap, GPU-light, premium.

### 3.2 — Typography

Drop Orbitron + mono-for-everything. Adopt a **display sans + mono**
pairing (the dev/research default):

```css
--font-display: "Space Grotesk", "Inter", system-ui, sans-serif; /* headings */
--font-body:    "Inter", system-ui, sans-serif;                  /* body     */
--font-mono:    "IBM Plex Mono", ui-monospace, monospace;        /* labels, code, eyebrows */
--font-arabic:  "Amiri", serif;                                  /* poetry (keep) */
```

- Space Grotesk keeps a subtle technical character without Orbitron's
  costume-y width; Inter for readable body; Plex Mono for eyebrow labels
  / metadata (`01 · TALKS`).
- One modular scale (6 steps), `clamp()`-based:
  ```css
  --t-display: clamp(2.4rem, 6vw, 4rem);   /* hero H1, lh 1.05, -0.02em */
  --t-h2:      clamp(1.5rem, 3vw, 2.1rem);
  --t-h3:      1.05rem;
  --t-body:    1rem;
  --t-sub:     0.85rem;
  --t-label:   0.72rem; /* uppercase, 0.18em tracking, mono */
  ```

### 3.3 — Navbar redesign

Target: a **labeled, single-accent, top bar** that reads as a portfolio,
not a game dock.

- **Icon + text label** for each item (`About`, `Talks`, `Poetry`,
  `Blog`) — visible at all sizes ≥ tablet; on phones, a labeled bottom
  tab bar (icon over small label) so labels are always present.
- **Left: wordmark** ("Taha Bouhsine" or a small nomad mark) linking
  home — replaces the oversized glowing home circle.
- **Right: one primary CTA** ("Résumé" or "Get in touch") in sand.
- **Active state:** sand text + a 2px sand underline (single treatment),
  no colored icons, no glow circles.
- **Remove** the broken scroll-progress bar and the floating
  section-title (the active nav item already communicates location).
- **Sticky** with a subtle `backdrop-filter` blur and a hairline
  `--line` bottom border; elevate slightly on scroll. One height, no
  per-breakpoint juggling.
- Keep the skip-link; move focus ring to `--accent`.

### 3.4 — Hero redesign

- **Centered, editorial, no video.** Atmospheric grid + vignettes behind.
- **H1** (static, no typewriter): "Taha Bouhsine" in `--font-display`,
  with a one-line positioning sub: _"ML researcher building interpretable,
  efficient neural networks — Google Developer Expert, founder of
  MLNomads."_ (≤ 25 words, drops credibility).
- **Two CTAs:** primary "View research & talks" (→ /talks), secondary
  "Get in touch" (ghost). LinkedIn/social moves to a small row below.
- Optional: a slim **credibility strip** under the hero (GDE · N talks ·
  M publications · communities) — real numbers, no count-up animation.

### 3.5 — Spacing & components

- One 8px base spacing scale; section padding `clamp(3.5rem, 8vh, 6rem)`.
- **Cards** (talks/poetry): `--bg-elev` fill, `--line` border →
  `--line-strong` + 2px lift on hover (≤200ms), single `--glow`. Retire
  per-card glassmorphism and the bouncy
  `cubic-bezier(.175,.885,.32,1.275)` overshoot.
- Replace full-viewport route slides with a fast (≤250ms) cross-fade /
  small translate; respect `prefers-reduced-motion`.

---

## 4. Adoption roadmap

Each phase is shippable on its own and ordered by leverage.

### Phase 0 — Consolidate tokens _(half day, no visual risk)_
- Create `src/assets/tokens.css` as the **single** `:root` token source.
- Delete the competing palettes in `main.css` / `styles.css`; point
  everything at the tokens. Fix the purple focus ring.
- _Outcome:_ one source of truth; enables everything below.

### Phase 1 — Palette + Navbar _(1–2 days) — highest visible impact_
- Apply "Desert Obsidian" tokens (warm-dark, sand accent).
- Rebuild the navbar: labeled items, wordmark, single CTA, kill the
  rainbow icons + progress bar + floating title.
- _Outcome:_ the 0.5s "is this current?" flips to yes.

### Phase 2 — Typography + Hero _(1–2 days)_
- Swap fonts (Space Grotesk + Inter + Plex Mono); apply the type scale;
  warm off-white text.
- New hero: static H1, real sub, two-tier CTAs, atmospheric bg, drop the
  video and typewriter.
- _Outcome:_ the 2s/5s reads land.

### Phase 3 — Components & content surfaces _(2–3 days)_
- Restyle talk/poetry cards, detail pages, about tabs to the new system.
- Add eyebrow section labels (`01 · TALKS`).
- Render the full talks list server-side (SEO) and add the credibility
  strip.

### Phase 4 — Motion, polish, a11y _(1–2 days)_
- Fast local transitions; reduced-motion paths; axe DevTools to 0
  serious; Lighthouse ≥ 95 perf/a11y.
- Custom OG image + favicon from a nomad mark.

---

## 5. What NOT to do

- Don't add more sections/effects — the content spine is fine; this is a
  **subtraction + re-skin** job.
- Don't keep three font families of display type. One display, one body,
  one mono.
- Don't reintroduce per-component color tokens. Everything flows from
  `tokens.css`.
