# Worldborne Medical — Landing Page

Physician-led clinical content review service. Bento-box style landing page built with Next.js 14, Tailwind CSS, and Lucide icons.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS 3 |
| Icons | lucide-react |
| Language | TypeScript |
| Rendering | Static (SSG) |

## Project Structure

```
worldborne/
├── app/
│   ├── globals.css      # Tailwind directives + Inter font import
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Full landing page (single component)
├── public/              # Static assets (add profile photo here)
├── CLAUDE.md            # This file
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
└── package.json
```

## Running Locally

```bash
npm install
npm run dev       # → http://localhost:3000
npm run build     # Production build
npm run start     # Serve production build
```

## Page Layout (Bento Box)

The page uses a responsive 2-column CSS Grid that stacks to 1 column on mobile (`< md` breakpoint).

```
┌──────────────────────────────────────────┐
│  HEADER  — Logo + "Get Free Audit" CTA   │
├────────────────────┬─────────────────────┤
│  HERO LEFT         │  HERO RIGHT         │
│  "What We Do"      │  Profile photo      │
│  Value prop +      │  placeholder        │
│  tag pills         │  (square card)      │
├────────────────────┼─────────────────────┤
│  PORTFOLIO LINK    │  BIO SUMMARY        │
│  Arrow icon CTA    │  Bio text + badges  │
├────────────────────┼─────────────────────┤
│  LEAD GEN          │  SERVICES           │
│  "Free Clinical    │  Pilot / Top 10 /   │
│   Audit" hook      │  Top 25 / Retainer  │
│  Contact form      │  with pricing       │
├────────────────────┴─────────────────────┤
│  FOOTER  — Copyright + LinkedIn icon     │
└──────────────────────────────────────────┘
```

## Customisation Checklist

- [ ] **Profile photo** — Replace the `<User>` placeholder in the Hero Right card with a real `<Image>` tag pointing to `/public/photo.jpg`
- [ ] **Dr. [Name]** — Update the name and credentials in the Hero Right card
- [ ] **Bio text** — Edit the bio paragraph in the Bio card (`app/page.tsx`, BIO section)
- [ ] **Pricing** — Replace `$XXX` / `$X,XXX` / `Custom` in the `SERVICES` array at the top of `page.tsx`
- [ ] **LinkedIn URL** — Update the `href` on the footer LinkedIn link
- [ ] **Form action** — Wire the `handleSubmit` function to your backend / Resend / Formspree endpoint
- [ ] **Portfolio link** — Add `href` to the Portfolio card once the portfolio page exists
- [ ] **CNAME** — The existing `CNAME` file is already configured for the domain

## Design Tokens (Tailwind)

| Purpose | Class |
|---------|-------|
| Page background | `bg-slate-100` |
| Card background | `bg-white` |
| Dark card | `bg-slate-900` |
| Primary blue | `bg-blue-600` / `text-blue-600` |
| CTA accent | `bg-amber-300` / `text-amber-900` |
| Muted text | `text-slate-500` |
| Body text | `text-slate-700` |

## Deployment

The project outputs a fully static site (`○ Static`). Compatible with:
- **Vercel** — push to GitHub, connect repo, zero-config deploy
- **GitHub Pages** — run `next build && next export` (set `output: 'export'` in `next.config.js`) then push `/out` to `gh-pages`
- **Netlify** — same as Vercel
