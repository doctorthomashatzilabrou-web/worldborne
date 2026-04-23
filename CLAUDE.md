# Worldborne Medical — Landing Page

Physician-led clinical content review service for Dr. Thomas Hatzilabrou. Bento-box style landing page built with Next.js 14, Tailwind CSS, and Lucide icons.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS 3 |
| Icons | lucide-react |
| Language | TypeScript |
| Rendering | Static (SSG) + Edge API route |

## Project Structure

```
worldborne/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts     # Edge API route — contact form handler
│   ├── globals.css           # Tailwind directives + Inter font import
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Full landing page (single component)
├── public/                   # Static assets (add profile photo here)
├── CLAUDE.md                 # This file
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
npm run build     # Production build (outputs static + edge routes)
npm run start     # Serve production build
```

## Page Layout (Bento Box)

Responsive 2-column CSS Grid that stacks to 1 column on mobile (`< md` breakpoint).

```
┌──────────────────────────────────────────────┐
│  HEADER  — Globe+cross SVG logo              │
│            "Worldborne Medical" wordmark      │
│            "Get Free Audit" CTA button        │
├─────────────────────┬────────────────────────┤
│  HERO LEFT          │  HERO RIGHT            │
│  "What We Do"       │  "TH" initials avatar  │
│  Value prop copy    │  Dr. Thomas Hatzilabrou│
│  Tag pills          │  Credential badge grid │
├─────────────────────┴────────────────────────┤
│  STATS STRIP (full-width)                    │
│  500+ Articles | 48hr Turnaround | 100% MD   │
│  Certified | 10+ Yrs Practice                │
├─────────────────────┬────────────────────────┤
│  PORTFOLIO LINK     │  BIO SUMMARY           │
│  Arrow icon CTA     │  Bio text for Dr. TH   │
│                     │  Credential tags        │
├─────────────────────┼────────────────────────┤
│  LEAD GEN           │  SERVICES              │
│  "Free Clinical     │  Pilot       — $900    │
│   Audit" hook       │  Top 10      — $3,000  │
│  Contact form →     │  Top 25★     — $7,500  │
│  contact@worldborne │  Retainer    — $15,000 │
├─────────────────────┴────────────────────────┤
│  FOOTER  — Logo · Copyright · LinkedIn       │
└──────────────────────────────────────────────┘
```

## Customisation Checklist

### Replace placeholders

- [ ] **Profile photo** — In `app/page.tsx`, find the `"TH"` initials block (Hero Right section)
  and replace with:
  ```tsx
  import Image from 'next/image'
  // … inside the card:
  <Image
    src="/photo.jpg"
    alt="Dr. Thomas Hatzilabrou"
    width={160}
    height={160}
    className="rounded-2xl object-cover shadow-lg"
    priority
  />
  ```
  Then drop `photo.jpg` into `/public/`.

- [ ] **Bio text** — Edit the two `<p>` paragraphs in the `BIO` section of `app/page.tsx`.

- [ ] **Portfolio link** — Update the `href="#"` on the Portfolio card (`4a. PORTFOLIO LINK`).

- [ ] **Stats** — Adjust `STATS` array values at the top of `app/page.tsx` once real numbers are confirmed.

---

### Wire up the contact form email

The form POSTs JSON to `/api/contact`. The route logs requests and returns `{ success: true }`.
**Wire it to send real emails in `app/api/contact/route.ts`.**

#### Option A — Resend (recommended)

```bash
npm install resend
```

Add to `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Uncomment the Resend block in `route.ts`:
```ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'no-reply@worldborne.com',   // must be a Resend-verified domain
  to:   'contact@worldborne.com',
  replyTo: email,
  subject: `Free Audit Request — ${name}`,
  text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`,
})
```

#### Option B — Formspree (zero-backend, no server needed)

1. Create a free form at formspree.io → copy your form ID (e.g. `xabcdefg`).
2. In `app/page.tsx`, change the fetch call to:
   ```ts
   const res = await fetch('https://formspree.io/f/xabcdefg', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(formData),
   })
   ```
3. Delete `app/api/contact/route.ts` — it's no longer needed.

#### Option C — Nodemailer (self-hosted SMTP)

```bash
npm install nodemailer @types/nodemailer
```

Add to `.env.local`:
```
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=yourpassword
```

Note: remove `export const runtime = 'edge'` from `route.ts` when using Node.js APIs.

---

## Design Tokens (Tailwind)

| Purpose | Class |
|---------|-------|
| Page background | `bg-slate-100` |
| Card background | `bg-white` |
| Dark card | `bg-slate-900` |
| Primary blue | `bg-blue-600` / `text-blue-600` |
| CTA accent | `bg-amber-400` / `text-amber-900` |
| Muted text | `text-slate-500` |
| Body text | `text-slate-700` |
| Border | `border-slate-200` |

---

## Logo

The logo is an inline SVG (`<WorldborneLogo />` component at the top of `app/page.tsx`). It depicts a globe (latitude/longitude lines) with a medical cross overlaid — symbolising worldwide clinical oversight.

To swap in a custom logo file, replace `<WorldborneLogo />` with:
```tsx
import Image from 'next/image'
<Image src="/logo.svg" alt="Worldborne Medical" width={38} height={38} />
```

---

## Pricing (current)

| Tier | Articles | Price |
|------|----------|-------|
| Pilot | 3 articles | $900 one-time |
| Top 10 | 10 articles | $3,000 one-time |
| Top 25 ★ | 25 articles | $7,500 one-time |
| Monthly Retainer | 50+/month | $15,000/month |

To update pricing, edit the `SERVICES` array at the top of `app/page.tsx`.

---

## Deployment

The project outputs a fully static site with one Edge API route (`/api/contact`).

### Vercel (recommended — zero config)

1. Push to GitHub
2. Import repo at vercel.com
3. Add `RESEND_API_KEY` (or other email env vars) in Project Settings → Environment Variables
4. Deploy

### Netlify

Same as Vercel. Use "Next.js" as the build preset.

### GitHub Pages (static export only — disables contact form API)

```js
// next.config.js
const nextConfig = { output: 'export' }
module.exports = nextConfig
```

```bash
npm run build   # outputs to /out
# push /out to gh-pages branch
```

Note: the contact form will fall back to the `mailto:contact@worldborne.com` link when the API route is unavailable.
