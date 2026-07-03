#!/usr/bin/env python3
"""
Worldborne Medical — document conversion engine.

Turn a plain Markdown file into a Worldborne signature-style PDF (or HTML).

    python3 build.py examples/medical-affairs-retainer.md
    python3 build.py mydoc.md -o out/mydoc.pdf
    python3 build.py mydoc.md --html        # HTML only, skip PDF

The Markdown is ordinary Markdown plus a few Worldborne blocks:

  ---                     <-- front matter (cover page fields)
  title: Medical Affairs Retainer
  subtitle: Andrela & Andrenyx Portfolio
  prepared_for: Angelina Norman, Medical Director, Medivant
  prepared_by: Sarah J. LaFever, Head of Business Development
  physician: Thomas A. Hatzilabrou, MD
  date: June 15, 2026
  footer: Worldborne Medical · Confidential — Prepared for Medivant
  ---

  # Section heading          -> large serif head; the FIRST paragraph
  A one-line editorial lede.    after it becomes the gold-ruled lede.

  ::: callout $4,000 | COMPLIMENTARY
  A **Promotional Compliance Review** is included at no charge...
  :::

  ::: tier * RECOMMENDED | Authority Builder | $10,000 | /month
  - Everything in Essentials
  - White Paper ×1
  --- Configured list value **$12,000** — delivered at **$10,000/mo**.
  :::

  | Deliverable | START HERE // Essentials // $5,000/mo | * RECOMMENDED // Authority Builder // $10,000/mo |
  |-------------|:---:|:---:|
  | MD Review   | 3   | 3 |
  | **Your retainer** | **$5,000** | **$10,000** |     <-- bold first cell = total row

Dependencies:  pip install markdown   +   a Chromium/Chrome binary (for PDF).
"""
import argparse, base64, html, os, re, shutil, subprocess, sys, tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent


# ----------------------------------------------------------------------
# front matter
# ----------------------------------------------------------------------
def split_front_matter(text):
    m = re.match(r"\s*---\s*\n(.*?)\n---\s*\n", text, re.S)
    meta = {}
    if m:
        for line in m.group(1).splitlines():
            if ":" in line and not line.strip().startswith("#"):
                k, v = line.split(":", 1)
                meta[k.strip().lower()] = v.strip()
        text = text[m.end():]
    return meta, text


# ----------------------------------------------------------------------
# Worldborne custom blocks  (::: name args ... :::)
# processed BEFORE markdown so we emit raw HTML that markdown passes through
# ----------------------------------------------------------------------
def _md_inline(s, md):
    """Render a short markdown fragment, stripping the wrapping <p>."""
    out = md.reset().convert(s.strip())
    return re.sub(r"^<p>(.*)</p>$", r"\1", out, flags=re.S)


def process_blocks(text, md):
    lines = text.split("\n")
    out, i = [], 0
    while i < len(lines):
        m = re.match(r"^:::\s*(callout|tier)\s*(.*)$", lines[i].strip())
        if not m:
            out.append(lines[i]); i += 1; continue
        kind, header = m.group(1), m.group(2)
        i += 1
        body = []
        while i < len(lines) and lines[i].strip() != ":::":
            body.append(lines[i]); i += 1
        i += 1  # skip closing :::
        out.append(render_callout(header, body, md) if kind == "callout"
                   else render_tier(header, body, md))
    return "\n".join(out)


def render_callout(header, body, md):
    # header:  "$4,000 | COMPLIMENTARY"   (either part optional)
    price, _, label = header.partition("|")
    rail = ""
    if price.strip():
        rail += f'<div class="callout__price">{html.escape(price.strip())}</div>'
    if label.strip():
        rail += f'<div class="callout__label">{html.escape(label.strip())}</div>'
    inner = md.reset().convert("\n".join(body).strip())
    return (f'<div class="callout"><div class="callout__rail">{rail}</div>'
            f'<div class="callout__body">{inner}</div></div>')


def render_tier(header, body, md):
    # header: "[*] EYEBROW | Name | $price | /per"   (* => recommended)
    rec = header.strip().startswith("*")
    header = header.strip().lstrip("*").strip()
    parts = [p.strip() for p in header.split("|")]
    eyebrow = parts[0] if len(parts) > 0 else ""
    name    = parts[1] if len(parts) > 1 else ""
    price   = parts[2] if len(parts) > 2 else ""
    per     = parts[3] if len(parts) > 3 else ""
    # optional footnote line inside body starting with "--- "
    foot, keep = "", []
    for ln in body:
        fm = re.match(r"^\s*---\s+(.*)$", ln)
        if fm:
            foot = _md_inline(fm.group(1), md)
        else:
            keep.append(ln)
    lst = md.reset().convert("\n".join(keep).strip())
    price_html = ""
    if price:
        price_html = f'<div class="tier__price">{html.escape(price)}'
        if per:
            price_html += f' <span>{html.escape(per)}</span>'
        price_html += "</div>"
    head = (f'<div class="tier__head"><div>'
            f'<div class="tier__eyebrow">{html.escape(eyebrow)}</div>'
            f'<div class="tier__name">{html.escape(name)}</div></div>'
            f'{price_html}</div>')
    foot_html = f'<div class="tier__foot">{foot}</div>' if foot else ""
    cls = "tier is-recommended" if rec else "tier"
    return f'<div class="{cls}">{head}{lst}{foot_html}</div>'


# ----------------------------------------------------------------------
# table post-processing (runs on rendered HTML)
#   - header cells:  "eyebrow // name // price"  -> stacked spans
#   - recommended column: header cell text begins with "*"
#   - total rows: first body cell is <strong>
# ----------------------------------------------------------------------
def enhance_tables(html_str):
    def do_head_cell(cell_html):
        rec = False
        txt = cell_html
        # detect leading * (possibly wrapped by markdown, e.g. "* X" stays plain)
        stripped = re.sub(r"^\s*", "", txt)
        if stripped.startswith("*"):
            rec = True
            txt = stripped[1:].lstrip()
        if "//" in txt:
            a = [p.strip() for p in txt.split("//")]
            spans = ""
            if len(a) > 0 and a[0]: spans += f'<span class="th-eyebrow">{a[0]}</span>'
            if len(a) > 1 and a[1]: spans += f'<span class="th-name">{a[1]}</span>'
            if len(a) > 2 and a[2]: spans += f'<span class="th-price">{a[2]}</span>'
            txt = spans
        return rec, txt

    def process_table(tbl):
        # header row -> find recommended column indices
        rec_cols = set()
        def head_repl(m):
            idx = m.group("i") if False else None
            return m.group(0)
        # rebuild header cells
        head = re.search(r"<thead>(.*?)</thead>", tbl, re.S)
        if head:
            cells = re.findall(r"<th[^>]*>(.*?)</th>", head.group(1), re.S)
            new_cells = []
            for ci, c in enumerate(cells):
                rec, txt = do_head_cell(c)
                if rec: rec_cols.add(ci)
                cls = ' class="rec"' if rec else ""
                new_cells.append(f"<th{cls}>{txt}</th>")
            new_head = "<thead><tr>" + "".join(new_cells) + "</tr></thead>"
            tbl = tbl[:head.start()] + new_head + tbl[head.end():]
        # body rows: mark rec columns + total rows
        def body_row(m):
            row = m.group(1)
            cells = re.findall(r"<td[^>]*>(.*?)</td>", row, re.S)
            is_total = bool(cells) and re.search(r"<(strong|b)>", cells[0])
            new = []
            for ci, c in enumerate(cells):
                cls = ' class="rec"' if ci in rec_cols else ""
                new.append(f"<td{cls}>{c}</td>")
            tr_cls = ' class="total"' if is_total else ""
            return f"<tr{tr_cls}>" + "".join(new) + "</tr>"
        body = re.search(r"<tbody>(.*?)</tbody>", tbl, re.S)
        if body:
            nb = re.sub(r"<tr>(.*?)</tr>", body_row, body.group(1), flags=re.S)
            tbl = tbl[:body.start()] + "<tbody>" + nb + "</tbody>" + tbl[body.end():]
        return tbl

    return re.sub(r"<table>.*?</table>", lambda m: process_table(m.group(0)),
                  html_str, flags=re.S)


# ----------------------------------------------------------------------
# assembly
# ----------------------------------------------------------------------
def data_uri(path):
    mime = "image/png" if path.suffix.lower() == ".png" else "image/jpeg"
    return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode()


def build_cover(meta):
    if not any(meta.get(k) for k in ("title", "subtitle", "prepared_for", "prepared_by")):
        return ""
    seal = HERE / "assets" / "seal.png"
    seal_img = (f'<img class="cover__seal" src="{data_uri(seal)}" alt="">'
                if seal.exists() else "")
    eyebrow = meta.get("eyebrow", "Worldborne Medical")
    rows = []
    for key, lbl in (("prepared_for", "Prepared for"), ("prepared_by", "Prepared by"),
                     ("physician", "Physician authorship"), ("date", "Date"),
                     ("classification", "Classification")):
        if meta.get(key):
            rows.append(f'<div><b>{html.escape(lbl)}</b>&nbsp; {html.escape(meta[key])}</div>')
    meta_box = f'<div class="cover__meta">{"".join(rows)}</div>' if rows else ""
    sub = (f'<div class="cover__subtitle">{html.escape(meta["subtitle"])}</div>'
           if meta.get("subtitle") else "")
    return f"""<section class="cover">
  <div class="cover__eyebrow">{html.escape(eyebrow)}</div>
  {seal_img}
  <h1 class="cover__title">{html.escape(meta.get("title",""))}</h1>
  {sub}
  <hr class="cover__rule">
  {meta_box}
</section>"""


def _resolved_theme():
    theme = (HERE / "theme.css").read_text(encoding="utf-8")
    # inline @import fonts.css + embed woff2 so output is fully standalone
    fonts_css = (HERE / "assets" / "fonts" / "fonts.css").read_text(encoding="utf-8")
    for face in re.findall(r"url\(\./([^)]+\.woff2)\)", fonts_css):
        p = HERE / "assets" / "fonts" / face
        uri = "data:font/woff2;base64," + base64.b64encode(p.read_bytes()).decode()
        fonts_css = fonts_css.replace(f"url(./{face})", f"url({uri})")
    return theme.replace("@import url('./assets/fonts/fonts.css');", fonts_css)


def build_parts(md_path):
    """Parse the source into the pieces we need to compose cover + body docs."""
    try:
        import markdown
    except ImportError:
        sys.exit("Missing dependency: pip install markdown")
    raw = Path(md_path).read_text(encoding="utf-8")
    meta, body = split_front_matter(raw)

    md = markdown.Markdown(extensions=["tables", "attr_list", "md_in_html", "sane_lists"])
    body = process_blocks(body, md)
    content = enhance_tables(md.reset().convert(body))

    return {
        "theme": _resolved_theme(),
        "cover": build_cover(meta),
        "content": content,
        "footer": html.escape(meta.get("footer", "Worldborne Medical · Confidential")),
        "title": html.escape(meta.get("title", "Worldborne Medical")),
    }


def _page(title, css, extra_css, body_html):
    return (f'<!doctype html><html lang="en"><head><meta charset="utf-8">'
            f'<title>{title}</title><style>{css}\n{extra_css}</style></head>'
            f'<body>{body_html}</body></html>')


def compose_combined(parts):
    """Single self-contained HTML (cover + body). Used for --html output and
    the no-Playwright fallback. Footer omitted — a fixed footer can overlap
    dense multi-page content in plain Chromium; the footer is added per-page
    by Playwright in the primary render path."""
    body = (f'<div class="pagebg"></div>{parts["cover"]}'
            f'<main class="doc">{parts["content"]}</main>')
    return _page(parts["title"], parts["theme"], "", body)


def compose_cover(parts):
    # Cover-only page: uniform 0 margin, navy body so the bleed is edge-to-edge.
    extra = "@page{margin:0}\nbody{background:var(--ink)}"
    return _page(parts["title"], parts["theme"], extra, parts["cover"])


def compose_body(parts):
    # Body-only doc. The running footer is supplied per-page by Playwright's
    # footerTemplate (rendered in the page margin), so none is baked in here.
    body = (f'<div class="pagebg"></div>'
            f'<main class="doc">{parts["content"]}</main>')
    return _page(parts["title"], parts["theme"], "", body)


# ----------------------------------------------------------------------
# PDF via headless Chromium
# ----------------------------------------------------------------------
def find_chrome():
    env = os.environ.get("CHROME_BIN")
    if env and Path(env).exists():
        return env
    for name in ("google-chrome", "chromium", "chromium-browser", "chrome"):
        p = shutil.which(name)
        if p:
            return p
    pw = os.environ.get("PLAYWRIGHT_BROWSERS_PATH", "/opt/pw-browsers")
    hits = sorted(Path(pw).glob("chromium-*/chrome-linux/chrome")) if Path(pw).exists() else []
    return str(hits[-1]) if hits else None


def _chrome_print(chrome, html_str, out_pdf, td, tag):
    src = Path(td) / f"{tag}.html"
    src.write_text(html_str, encoding="utf-8")
    subprocess.run([chrome, "--headless", "--no-sandbox", "--disable-gpu",
                    f"--user-data-dir={Path(td) / ('prof-'+tag)}",
                    "--no-pdf-header-footer", "--print-to-pdf-no-header",
                    f"--print-to-pdf={out_pdf}", src.as_uri()],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def _merge_pdfs(paths, out_pdf):
    """Merge PDFs using whatever is installed. Returns True on success."""
    try:
        import fitz  # PyMuPDF
        doc = fitz.open()
        for p in paths:
            with fitz.open(p) as src:
                doc.insert_pdf(src)
        doc.save(out_pdf); doc.close()
        return True
    except ImportError:
        pass
    try:
        from pypdf import PdfWriter
        w = PdfWriter()
        for p in paths:
            w.append(p)
        with open(out_pdf, "wb") as fh:
            w.write(fh)
        return True
    except ImportError:
        return False


def _stamp_footer(pdf_path, text):
    """Draw the running footer into each page's bottom margin with PyMuPDF.
    Reliable positioning (no HTML fixed-element quirks). No-op without fitz."""
    try:
        import fitz
    except ImportError:
        return False
    text = text.upper()
    doc = fitz.open(pdf_path)
    gold = (0.722, 0.584, 0.353)
    for page in doc:
        # shrink to fit the text column if the footer runs long
        fs = 7.0
        avail = page.rect.width - 40
        while fs > 5 and fitz.get_text_length(text, fontname="helv", fontsize=fs) > avail:
            fs -= 0.5
        w = fitz.get_text_length(text, fontname="helv", fontsize=fs)
        x = max((page.rect.width - w) / 2, 20)
        y = page.rect.height - 26  # points from the bottom edge (inside margin)
        page.insert_text((x, y), text, fontname="helv", fontsize=fs, color=gold)
    doc.saveIncr()
    doc.close()
    return True


def render_pdf(parts, out_pdf):
    """Render the cover (full-bleed) and body separately with headless Chromium,
    stamp the running footer onto the body pages, and merge. Falls back to a
    single clean render (no footer) if no PDF library is available."""
    chrome = find_chrome()
    if not chrome:
        sys.exit("No Chromium/Chrome found. Set CHROME_BIN, or use --html and print from a browser.")
    with tempfile.TemporaryDirectory() as td:
        body_pdf = str(Path(td) / "body.pdf")
        _chrome_print(chrome, compose_body(parts), body_pdf, td, "body")
        _stamp_footer(body_pdf, parts["footer"])
        pages = []
        if parts["cover"]:
            cover_pdf = str(Path(td) / "cover.pdf")
            _chrome_print(chrome, compose_cover(parts), cover_pdf, td, "cover")
            pages.append(cover_pdf)
        pages.append(body_pdf)
        if len(pages) == 1:
            shutil.copyfile(pages[0], out_pdf)
            return
        if _merge_pdfs(pages, out_pdf):
            return
        print("  note: install PyMuPDF or pypdf for the cover page + footer; "
              "using single-pass render.", file=sys.stderr)
        _chrome_print(chrome, compose_combined(parts), out_pdf, td, "doc")


def main():
    ap = argparse.ArgumentParser(description="Convert Markdown to a Worldborne signature-style PDF.")
    ap.add_argument("input", help="source .md file")
    ap.add_argument("-o", "--output", help="output path (.pdf or .html)")
    ap.add_argument("--html", action="store_true", help="emit HTML only (no PDF)")
    args = ap.parse_args()

    src = Path(args.input)
    parts = build_parts(src)

    if args.html or (args.output and args.output.endswith(".html")):
        out = Path(args.output) if args.output else src.with_suffix(".html")
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(compose_combined(parts), encoding="utf-8")
        print(f"→ {out}")
        return

    out = Path(args.output) if args.output else src.with_suffix(".pdf")
    out.parent.mkdir(parents=True, exist_ok=True)
    render_pdf(parts, str(out.resolve()))
    print(f"→ {out}")


if __name__ == "__main__":
    main()
