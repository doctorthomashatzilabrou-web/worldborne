# Worldborne document style

Turn any raw document into a **Worldborne signature-style PDF** — the navy-and-gold,
Cormorant-Garamond look of the Medivant / Andrela proposals.

You write plain **Markdown**; `build.py` renders it to a print-ready PDF using the
same design tokens as the landing page (`../index.html`). Fonts are vendored, so
output is pixel-stable and works offline.

```
doc-style/
├── build.py                 # the converter  (Markdown → HTML → PDF)
├── theme.css                # the signature style (print + screen)
├── assets/
│   ├── seal.png             # gold cover medallion
│   └── fonts/               # Cormorant Garamond + DM Sans (self-hosted woff2)
├── examples/
│   └── medical-affairs-retainer.md   # reproduces the Medivant proposal
└── README.md
```

## The two ways to convert a doc

**A. Hand it to Claude (easiest).** Drop your raw doc into a Claude Code / claude.ai
session and say *"style this with doc-style."* Claude maps your content onto the
Markdown format below and runs the build. No setup on your side.

**B. Do it yourself.** Write/convert the doc to the Markdown format, then run one command.

Either way the *style* lives in `theme.css` — it's defined once, so every document
comes out identical. There's no per-document design work.

## Quick start (path B)

```bash
pip install markdown pymupdf          # one-time
python3 doc-style/build.py doc-style/examples/medical-affairs-retainer.md
# → doc-style/examples/medical-affairs-retainer.pdf
```

Options:

```bash
python3 build.py mydoc.md -o out/mydoc.pdf   # choose output path
python3 build.py mydoc.md --html             # HTML only (open + Cmd-P to PDF)
```

Requirements: **Python 3**, `pip install markdown`, and a **Chromium/Chrome**
binary (used to print the PDF; set `CHROME_BIN` if it isn't auto-found).
`pip install pymupdf` (or `pypdf`) is optional but recommended — it enables the
per-page running footer. Without it you still get the full styled PDF, minus the footer.

## The Markdown format

Ordinary Markdown, plus a front-matter block for the cover and a few branded blocks.

### Front matter → cover page

```markdown
---
title: Medical Affairs Retainer
subtitle: Andrela & Andrenyx Portfolio
eyebrow: Worldborne Medical
prepared_for: Angelina Norman, Medical Director, Medivant Healthcare
prepared_by: Sarah J. LaFever, Head of Business Development
physician: Thomas A. Hatzilabrou, MD
date: June 15, 2026
classification: Confidential
footer: Worldborne Medical · Confidential — Prepared for Medivant Healthcare
---
```

Every field is optional. Omit them all and you get no cover page — handy for a
short memo. `footer` is the small line repeated at the bottom of each page.

### Headings & the editorial lede

- `# Heading` — large serif section head. The **first paragraph after it**
  automatically becomes the muted, gold-ruled lede (as in the examples).
- `## Heading` — bold serif subsection.
- `### HEADING` — small uppercase label.
- `*emphasis*` renders as gold italic serif (the house emphasis style).

### Callout — navy box with gold price rail

```markdown
::: callout $4,000 | COMPLIMENTARY
A **Promotional Compliance Review** is included at no charge...
:::
```

Both the price and the label are optional (`::: callout` with neither is a plain
navy note box).

### Pricing table

A normal Markdown table, with two conventions:

- **Stacked header cells** — split a header with `//` into eyebrow / name / price:
  `START HERE // Essentials // $5,000/mo`
- **Recommended column** — prefix that header cell with `*` to make it gold:
  `* RECOMMENDED // Authority Builder // $10,000/mo`
- **Total rows** — bold the first cell (`**Your monthly retainer**`) and the whole
  row renders navy.

```markdown
| Deliverable | START HERE // Essentials // $5,000/mo | * RECOMMENDED // Authority Builder // $10,000/mo |
|---|:---:|:---:|
| MD Review & Sign-off | 3 | 3 |
| **Your monthly retainer** | **$5,000** | **$10,000** |
```

### Tier cards

```markdown
::: tier * RECOMMENDED | Authority Builder | $10,000 | / month
- Everything in Essentials
- White Paper ×1
--- Configured list value **$12,000** — delivered at **$10,000/mo** (a **$2,000** saving).
:::
```

`* ` at the start marks it recommended (gold border). Header parts are
`eyebrow | name | price | per`. A line starting with `--- ` becomes the dashed
footnote.

## Changing the style

Everything visual is in `theme.css`, keyed off the same CSS custom properties as
the landing page (`--ink`, `--gold`, `--paper`, …). Edit once; every document
follows. To swap the cover medallion, replace `assets/seal.png`.

## How it works

`build.py` parses the front matter and branded blocks, converts the Markdown to
HTML, inlines `theme.css` + the fonts into one standalone HTML file, and prints it
with headless Chromium. The cover (full-bleed, no footer) and the body (uniform
margins, per-page footer) are rendered separately and merged, which is what keeps
the running footer pinned to the bottom of every page.
