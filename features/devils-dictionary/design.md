# Backend Devil's Dictionary — Design Spec

**Date:** 2026-03-13
**Project:** heyboot.net / boot marketing concepts repo
**Status:** Approved for implementation planning

---

## Overview

A satirical humor microsite modeled after Ambrose Bierce's *The Devil's Dictionary*, applied to backend engineering terminology. Each entry consists of a term and a sardonic definition (max ~800 characters). The project serves as a content marketing vehicle for boot.dev.

Two surfaces share a single content layer:

1. **Microsite** — browsable, searchable dictionary with individual entry pages
2. **Social cards** — pre-generated 4:5 PNG images (1080×1350px) for LinkedIn/Twitter distribution

---

## Repository Structure

```
boot/
  docs/                              ← GitHub Pages root (heyboot.net)
    index.html                       ← concept index home page
    testimonials/                    ← static, lives here directly
    devils-dictionary/               ← 11ty build output
    interactive-story/               ← static/self-contained, lives here directly
  features/
    devils-dictionary/
      entries/                       ← one .md file per term
      _data/
        categories.js                ← category slugs, labels, icon refs
      _includes/
        layouts/
          entry.njk                  ← single entry page template
          gallery.njk                ← card grid page template
        components/
          card.njk                   ← shared card component
      assets/
        css/
          main.css                   ← site variables, typography, layout
          card.css                   ← card styles (shared with Satori renderer)
        js/
          random.js                  ← random entry client-side redirect
      scripts/
        generate-cards.js            ← Satori card generation script
      .eleventy.js                   ← 11ty config (pathPrefix: /devils-dictionary/)
      package.json
```

GitHub Pages is configured to serve from the `/docs` folder on the `main` branch at `heyboot.net`.

**Rule:** If a concept has a build step, source lives in `features/` and output goes to `docs/`. If it's static or self-contained, it lives directly in `docs/` with no duplication.

---

## Content Model

Each entry is a Markdown file in `features/devils-dictionary/entries/[slug].md`. The filename is the canonical slug — no `slug` frontmatter field is needed, as 11ty derives it from the filename. The Satori card generation script also derives the slug from the filename when reading entries directly.

```markdown
---
term: "Callback Hell"
definition: "A nested labyrinth of indented functions, each waiting for the previous to fail in a slightly different way."
category: async
date: 2026-03-13
---
```

**Frontmatter fields:**

| Field | Type | Description |
|---|---|---|
| `term` | string | Display name of the term |
| `definition` | string | Sardonic definition, max ~800 chars |
| `category` | string | Category slug (references categories.js) |
| `date` | date | Publication date; used for gallery sort order (descending) |

---

## Category System

`_data/categories.js` is the single source of truth for category metadata:

```js
module.exports = {
  async:     { label: "Async",     cssVar: "--color-async",     icon: "⏳" },
  databases: { label: "Databases", cssVar: "--color-databases", icon: "🗄️" },
  devops:    { label: "DevOps",    cssVar: "--color-devops",    icon: "🔧" },
  security:  { label: "Security",  cssVar: "--color-security",  icon: "🔒" },
}
```

CSS custom properties in `main.css` mirror these slugs:

```css
:root {
  --color-async: #7C3AED;
  --color-databases: #0369A1;
  --color-devops: #B45309;
  --color-security: #B91C1C;
}
```

Templates look up category metadata from `categories.js` at build time. The `category` slug in entry frontmatter is the only reference needed.

---

## Pages & Routing

| URL | Description |
|---|---|
| `heyboot.net/devils-dictionary/` | Home — random entry displayed on load |
| `heyboot.net/devils-dictionary/entries/[slug]/` | Single entry page |
| `heyboot.net/devils-dictionary/gallery/` | Card grid, all entries |
| `heyboot.net/devils-dictionary/cards/[slug].png` | Pre-generated card image |

### Home Page

Displays a random entry on load. A client-side JS script (`random.js`) selects a random slug from a JSON list of all slugs (injected at build time by 11ty as a global data variable) and **redirects to that entry's page**. The home page itself has static OG tags pointing to a default/featured entry card. An "Another one" button on each entry page triggers another random redirect via `random.js`. A "Browse all" link goes to the gallery.

### Entry Page

Full single entry view with:
- Term as page heading
- Category label + icon
- Definition text
- Link to card PNG (for direct social sharing)
- Boot.dev logo in footer
- Proper OG meta tags (see below)

### Gallery Page

Grid of all entry cards rendered as HTML. Each card links to its entry page. Sorted by date descending by default. Client-side search via Fuse.js (term and definition fields).

---

## Open Graph Tags

Each entry page includes:

```html
<meta property="og:title" content="[Term] — Backend Devil's Dictionary" />
<meta property="og:description" content="[Definition]" />
<meta property="og:image" content="https://heyboot.net/devils-dictionary/cards/[slug].png" />
<meta property="og:image:width" content="1080" />
<meta property="og:image:height" content="1350" />
<meta property="og:url" content="https://heyboot.net/devils-dictionary/entries/[slug]/" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="Backend Devil's Dictionary" />
<meta name="twitter:card" content="summary_large_image" />
```

Pasting any entry URL into LinkedIn or Twitter auto-renders the card as a link preview. The card PNG is also available standalone at its direct URL for image posts.

---

## Social Card Specification

**Format:** PNG, 1080×1350px (4:5 ratio — optimal for LinkedIn and Twitter feed presence)

**Generated by:** `scripts/generate-cards.js` using [Satori](https://github.com/vercel/satori)

**Card anatomy:**
- Category color accent (left border or top band, driven by CSS variable value)
- Term in large display type (Arcuata font)
- Definition in body type
- Category label + icon, small
- Boot.dev logo, small, bottom corner

**Font:** Arcuata (already in `assets/fonts/`) — loaded into Satori at generation time. Font files are resolved relative to the script using `path.join(__dirname, '../assets/fonts/Arcuata-Regular.woff2')` etc.

**Output location:** `docs/devils-dictionary/cards/[slug].png`

The Satori script reads all entry Markdown files, renders each through a JSX-like template, and writes PNGs. Styles mirror `card.css` so the card design stays consistent between the microsite card component and the generated PNG.

---

## Build & Deploy Workflow

### npm scripts (root `package.json`)

```json
"scripts": {
  "dev": "eleventy --config=features/devils-dictionary/.eleventy.js --serve",
  "build:dictionary": "eleventy --config=features/devils-dictionary/.eleventy.js",
  "cards": "node features/devils-dictionary/scripts/generate-cards.js",
  "build": "npm run build:dictionary && npm run cards"
}
```

### Local workflow

1. Add/edit entry files in `features/devils-dictionary/entries/`
2. `npm run build` — generates HTML into `docs/devils-dictionary/` and card PNGs into `docs/devils-dictionary/cards/`
3. `git add . && git commit && git push` — live on heyboot.net

### 11ty config

- `input`: `features/devils-dictionary`
- `output`: `docs/devils-dictionary`
- `pathPrefix`: `/devils-dictionary/`

---

## Branding

- Boot.dev logo: small, bottom corner of each card and in the site footer
- Microsite is editorial in tone — branding is present but not dominant
- Arcuata typeface used throughout for visual consistency with boot.dev brand

---

## Production Path

| Concern | Prototype | Production |
|---|---|---|
| Content authoring | Markdown files in repo | Web form → database (Postgres or Sanity) |
| Build | Local `npm run build` | GitHub Action on merge |
| Card generation | Local Satori script | Serverless function triggered on publish |
| Search | Client-side Fuse.js | Algolia or server-side |
| Submissions | n/a | Staff/contributor form with review queue |
| Hosting | GitHub Pages (`/docs` folder) | Custom server or Vercel/Netlify |

Long-term, this becomes a web application. The Markdown files map to database records, 11ty templates map to React/Next.js components, and the Satori script becomes a serverless function. The content model and card spec defined here carry forward unchanged.

---

## Out of Scope (Prototype)

- Contributor submission workflow
- Server-side search
- Dynamic OG image generation
- Authentication or CMS UI
- Analytics
