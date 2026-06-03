# Portfolio Redesign — Design Spec

**Date:** 2026-06-03
**Owner:** Jeet Joshi
**Repo:** joshijeet02/jeet-joshi-portfolio (deployed at jeetjoshi.netlify.app via Netlify auto-deploy from `main`)

## Goal

Replace the current generic-feeling portfolio with a distinctive, sophisticated, beautiful design that reads as "an economist who builds." Same content and information architecture, completely new visual system, rewritten homepage copy, and a single unified codebase.

The redesign covers all 5 main pages **and** all 15 case-study pages, driven by one shared stylesheet.

## Design Direction

**Swiss Grid, "Bone & Terracotta" variant.** Architectural and bold: large grotesk display type on a visible grid, generous structure, warm paper palette, a single terracotta accent. Confident and "designed," but warmed so it never reads cold or corporate. Validated via visual mockups.

## Design System

### Color tokens
| Token | Hex | Use |
|-------|-----|-----|
| `--bone` | `#F4F1EA` | Page background |
| `--bone-2` | `#ECE6DA` | Panel / hover fill |
| `--ink` | `#1A1714` | Primary text, category headers |
| `--ink-2` | `#5C5347` | Body / muted text |
| `--faint` | `#9C9080` | Meta, captions, mono labels |
| `--line` | `#DBD3C5` | Hairlines, grid, borders |
| `--terra` | `#BE4A24` | Accent: links, bars, numerals, hovers |
| `--terra-2` | `#A23C1B` | Accent hover/active |
| `--near-black` | `#12100C` | Contact block + footer background |

### Typography
- **Space Grotesk** (400–700): display headlines, nav, UI, project titles.
- **Fraunces** (serif, incl. italic): all long-form reading — ledes, body, essay/section titles, the italic ampersand. This is the "writer" voice.
- **JetBrains Mono**: small uppercase labels, section numbers (`01 —`), row index numbers, dates, captions, meta.

### Recurring motifs
- Faint 84px background grid in the hero (and optionally section backgrounds at low opacity).
- Mono section numbers: `01 — Selected Work`, `02 — How I Work`, etc.
- Index numbers on list rows.
- 64px terracotta accent bar under the hero headline.
- Bordered grid containers for project/approach groups; the "category" box uses an inverted ink header bar.
- One dark (`--near-black`) inverted block for Contact; footer matches.

### Motion (subtle, tasteful)
- Scroll-reveal: opacity 0→1 + small translateY, IntersectionObserver, staggered delays.
- Hover: terracotta color shift on rows/links, gentle background fill on rows, slight lift/arrow-nudge on cards.
- All motion gated behind `@media (prefers-reduced-motion: reduce)` (disabled when requested).

### Responsive
- Desktop: multi-column grids (hero 2-col, approach 3-col).
- Mobile (≤780px): grids collapse to single column; display type scales down; nav collapses to a full-screen drawer toggled by a hamburger.

## Technical Approach

- Static hand-coded HTML + one shared `css/style.css` (rebuilt around the tokens above). **No build step**, consistent with current setup.
- **Unify the codebase:** the homepage stops being a separate inline-CSS island. All pages (incl. case studies) link the same `css/style.css` and share identical nav + footer markup.
- Shared JS in `js/main.js` (nav scroll state, mobile drawer, scroll-reveal, external-link handling). `js/writing.js` continues to power the live Substack feed.
- Fonts loaded via Google Fonts `<link>` with preconnect (already present).
- The unused `index-classic.html`, `index-lusion.html`, `index-obsidian.html` variants are deleted as part of the cleanup.

## Pages

### Shared: Nav + Footer
- **Nav** (fixed): `Jeet Joshi.` logo (terracotta period) left; mono uppercase links `Work · Writing · About` + terracotta `Talk →` right; hairline bottom border that strengthens on scroll. Mobile: hamburger → full-screen drawer.
- **Footer** (`--near-black`): name + © year left; mono `LinkedIn · Substack` (+ Work/Writing/About) right.

### 1. Homepage (`index.html`)
Sections in order:
1. **Hero** — 2-col grid (1.4fr / 0.8fr). Left: mono kicker, giant `ECONOMIST & BUILDER` (italic serif ampersand, terracotta "BUILDER"), terracotta bar, serif lede, actions. Right: **full uncropped portrait** (`FIG. 01` mono tag), height follows the image (no `object-fit` crop — must never cut the top of the head). Faint grid background.
2. **Intro line** — single serif paragraph (the "economist who got tired of good analysis going nowhere" passage).
3. **Selected Work** (`02 —`) — heading "What I've built"; the **Understand Indian Economy** category box (ink header, 3 numbered rows: RBI Communication Intelligence, India Macro Pulse, Rajasthan Employment Dashboard); then a few more featured rows below. "See all work →".
4. **How I Work** (`03 —`) — 3-col bordered grid, terracotta numerals (01/02/03), serif text.
5. **Writing** (`04 —`) — "Chai with an Economist"; **live Substack feed** (latest 4) as serif rows + mono dates; "Read all essays →".
6. **Contact** — `--near-black` inverted block; mono kicker, serif "Tell me what you are working on.", terracotta-underlined email `joshijeet02@gmail.com`, mono micro line.

### 2. Work (`work.html`)
- Page header (mono kicker + big title + serif sub).
- **Understand Indian Economy** category box (RBI, India Macro Pulse, MNREGA) — same component as homepage.
- "Other Featured" rows (Macro-to-Broker Forecasting, Grant Intelligence, Swaraj Loom, The Coach, etc.).
- **All Work** index: numbered mono rows (title · category · status tag).
- **Removed from all listings: VLC Spices and Norex Flavours** (cold leads). Their case-study files remain on disk but are no longer linked anywhere. (Delete later if desired.)

### 3. About (`about.html`)
- Page header. Oversized serif lead paragraph.
- Long-form set in Fraunces serif for readability; mono section labels; portrait framed as a grid cell (full, uncropped).
- Existing about content retained, audited to remove em dashes and match the new voice.

### 4. Writing (`writing.html`)
- Page header. Live Substack feed as serif rows + mono dates. Subscribe block. Graceful fallback link if feed is unavailable.

### 5. Contact (`contact.html`)
- The dark inverted block as centerpiece: serif headline, terracotta-underlined email, "what to include" guidance, other links in mono.

### 6. Case-study template (×15, minus the 2 removed if also delinked)
One consistent template applied to all case studies:
- Mono kicker + big Space Grotesk title; serif tagline; meta tags row.
- Serif body sections with mono section labels and a terracotta rule.
- Terracotta-bordered "reflection" callout.
- Prev/next project nav + Contact CTA.
- Same shared nav/footer.

## Final Homepage Copy (no em dashes)

**Kicker:** `ECONOMIST · BUILDER · AHMEDABAD`
**Headline:** ECONOMIST & BUILDER

**Lede:**
> I build decision-intelligence systems at the intersection of economics, finance, and AI. Custom, in-house systems that help companies and institutions turn their own data, as well as the public data around them, into sharper decisions at scale. Most tools begin with the technology. I begin with the economics: what a decision really costs, where the information is hiding, and what getting it right is worth.

**Actions:** `See the work →` · or start a conversation

**Intro line:**
> I am an economist who got tired of good analysis going nowhere. I was trained at the Gokhale Institute of Politics and Economics in Pune and the University of Sydney, then spent years in policy research watching the same thing happen. The insight would arrive, the report would land, and then the report would sit. So I started building the systems that carry the thinking forward. I write at Chai with an Economist, where about 3,000 people read me each month. I answer my own email.

**Work intro:**
> Every project here began as a real problem inside a real organisation. Nothing on this page is a demo.

**How I work:**
1. **Economics first.** Every problem has a structure. Who carries the cost, what information is missing, which incentive is quietly pulling the wrong way. I find that structure before I build anything.
2. **Build for the situation.** Not a general answer to a general problem, but something cut to fit this organisation, this data, this team. Generic tools solve generic problems.
3. **Deploy. Leave it running.** No reports that gather dust. No demo that earns applause and is then forgotten. Systems that run in production, for real people.

**Writing intro:**
> A newsletter about economics, AI, and the systems that quietly shape our lives. Around 3,000 people read it. I write when an idea has sat with me long enough that staying quiet starts to feel wrong.

**Contact:**
- Heading: Tell me what you are working on.
- Body: I will tell you honestly whether I can help. If I can, I will show you how I would approach it and what it would take to build. If I cannot, I will say so, and probably point you toward someone who can. I answer personally, usually within a day.
- Micro: `No form. No calendar link. Just email.`

## Copy Rules
- **No em dashes anywhere** on the site. Use periods, commas, colons, semicolons, or line breaks. Audit and fix existing About/Writing/Contact/case-study copy accordingly.

## Carried Over (already shipped, must be preserved)
- Contact email `joshijeet02@gmail.com`; Substack `jeetjoshi.substack.com`.
- Open Graph + Twitter Card + canonical tags on all pages (favicon restyled to match the new palette).
- Live Substack feed on homepage + Writing page.
- The new full-frame hero portrait.

## Accessibility
- Color contrast: ink/terra on bone meet WCAG AA for text; verify terracotta on bone for any small text (use ink for body, terracotta for accents/large text and links with underline).
- Keyboard-navigable nav + drawer (focus states, Escape to close).
- `prefers-reduced-motion` honored.
- Alt text on the portrait; semantic headings and landmarks retained.

## Out of Scope
- No CMS / framework / build pipeline.
- No new content beyond the rewritten homepage copy and em-dash cleanup.
- Deleting the two removed case-study files (delinked only, unless requested).

## Open Questions
- None blocking. ("at scale" vs "at institutional scale" left as "at scale"; can revisit during build.)
