# Worldborne Medical — Landing Page

Single-page marketing site for Dr. Thomas Hatzilabrou's physician-led clinical content review service. Hosted on GitHub Pages at **www.worldborne.com**.

## Stack

Static HTML, vanilla CSS, one tiny inline IntersectionObserver script. No build step, no framework, no dependencies.

| Layer | Technology |
|-------|-----------|
| Markup | `index.html` (single file) |
| Styling | Inline `<style>` block — CSS custom properties + media query |
| Fonts | Google Fonts: Cormorant Garamond (serif), DM Sans (sans) |
| Hosting | GitHub Pages, custom domain via `CNAME` |
| Lead capture | `mailto:` + LinkedIn — no form processing |

## File layout

```
worldborne/
├── index.html      # Entire site
├── logo.png        # Nav + footer logo
├── profile.png     # Hero portrait
├── CNAME           # www.worldborne.com
├── .gitignore
└── CLAUDE.md       # This file
```

## Page sections (in order)

1. **Nav** — fixed, blurred backdrop. Links to each section + "Book a Call" CTA.
2. **Hero** — headline, value prop, CTA, portrait card with stats.
3. **Problem band** — single editorial sentence on YMYL / E-E-A-T pressure.
4. **`#services`** — three service cards: Clinical Content Review, Medical SEO Strategy, Legal-Medical Content.
5. **`#who`** — Who We Serve: 2×2 grid of audience segments.
6. **`#process`** — Process: four-step engagement on a dark background.
7. **`#contact`** — Email + LinkedIn cards. Direct outreach, no form.
8. **Footer** — tagline, brand mark, nav repeat, copyright.

## Working locally

No tooling. Open `index.html` in a browser, or:

```bash
python -m http.server 8000   # → http://localhost:8000
```

## Design tokens

Defined as CSS custom properties on `:root` at the top of the `<style>` block:

| Token | Value | Use |
|-------|-------|-----|
| `--ink` | `#0d1117` | Primary text, dark sections |
| `--paper` | `#faf8f4` | Default page background |
| `--fog` | `#f4f1ec` | Alternating section background |
| `--gold` | `#b8955a` | Accent, italic emphasis, links |
| `--gold-lt` | `#d4b07a` | Hover, gradient stops |
| `--muted` | `#6b6560` | Secondary copy |
| `--rule` | `rgba(184,149,90,0.25)` | Borders, dividers |
| `--serif` | Cormorant Garamond | Headings, italic emphasis |
| `--sans` | DM Sans | Body, labels |

## Conventions

- Section padding: `110px 56px` desktop, `72px 24px` ≤ 900px.
- Italic emphasis (`<em>`) renders gold serif everywhere — used for the editorial highlight in headings and the tagline.
- The `.reveal` class hides elements until they scroll into view; an IntersectionObserver at the bottom of the body adds `.visible` to fade them in.
- Backgrounds alternate paper → fog → ink across sections to give visual rhythm.

## Deployment

Push to `main`. GitHub Pages serves the repo root. The `CNAME` file points to `www.worldborne.com`.

There is **no build step**. Whatever is in `index.html` is what ships.

## Editing checklist

When changing content:

- **Copy / pricing / services** — edit `index.html` directly. Section IDs match nav anchors.
- **Bio / credentials** — these currently live in narrative form in the hero and problem band. If a separate "About" section is added, harvest the longer bio from this file's git history (the previous Next.js `app/page.tsx` had a fuller version).
- **Logo / portrait** — replace `logo.png` and `profile.png` in the repo root.
- **Contact** — `mailto:contact@worldborne.com` and `https://www.linkedin.com/company/worldborne/` are hard-coded in the `#contact` section.
- **Domain** — change `CNAME` and update DNS.

## What this site is not

- Not a lead-gen funnel — most clients come via direct outreach. The contact section is a credibility touchpoint, not a conversion form.
- Not a CMS — copy changes are git commits.
- Not Next.js — there used to be a Next.js scaffold in this repo. It was removed. Don't reintroduce a framework unless the contact form needs server-side processing.
