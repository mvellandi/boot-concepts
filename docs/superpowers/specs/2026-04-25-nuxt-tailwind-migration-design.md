# Design: Migrate to Nuxt 3 + Tailwind v4

**Date:** 2026-04-25
**Status:** Approved

## Goal

Convert the static HTML/JS concepts sandbox into a Nuxt 3 project with Tailwind v4. Consolidate the current mix of inline CSS, JS `style.cssText`, `<style>` tags, and Tailwind CDN into mostly Tailwind utility classes. Establish a foundation for future concepts as their own routes.

## Project Structure

```
concepts/
├── assets/
│   └── css/main.css          ← Tailwind v4 import + @font-face + @theme
├── components/
│   ├── TestimonialCard.vue
│   └── TestimonialStrip.vue
├── layouts/
│   └── default.vue           ← dark bg (#121620), min-h-screen
├── pages/
│   ├── index.vue             ← concepts nav
│   └── testimonials/
│       └── index.vue         ← testimonials page
├── public/
│   ├── fonts/                ← Arcuata woff2 files (moved from assets/fonts/)
│   └── images/               ← woodendivider.webp (downloaded from boot.dev CDN)
├── nuxt.config.ts
└── package.json
```

**Deleted:**
- `testimonials/shared-files/` — all hashed CSS files and shared.css
- `testimonials/testimonial-strip.js` — replaced by Vue components
- `testimonials/index.html` — replaced by `pages/testimonials/index.vue`
- `index.html` — replaced by `pages/index.vue`

## Styling

Tailwind v4 wired via `@tailwindcss/vite` in `nuxt.config.ts`. No `tailwind.config.ts` — v4 uses CSS-first config.

`assets/css/main.css`:
```css
@import "tailwindcss";

@theme {
  --color-gray-850: #1a2030;
  --color-gold: #e5ae3c;
  --font-arcuata: 'Arcuata', Georgia, serif;
}

@font-face {
  font-family: 'Arcuata';
  src: url('/fonts/Arcuata-Regular.woff2') format('woff2');
  font-weight: 400;
}
@font-face {
  font-family: 'Arcuata';
  src: url('/fonts/Arcuata-Bold.woff2') format('woff2');
  font-weight: 700;
}
```

## Components

### TestimonialCard.vue

Props: `org` (string), `person` (string), `quote` (string), `avatar` (string, optional).

Replaces the `TestimonialCard` custom element from `testimonial-strip.js`. All `style.cssText` and inline style strings are replaced with Tailwind utility classes. Card width is controlled by a responsive class on the root element (`w-[254px] sm:w-[300px]`).

### TestimonialStrip.vue

Accepts a default slot of `TestimonialCard` components. Owns the scrollable track, left/right arrow buttons, and drag-to-scroll interaction logic (ported from the current web component).

Contains a `<style scoped>` block only for two things not expressible as Tailwind utilities:
- `::-webkit-scrollbar { display: none }` on the track
- `.dragging` cursor state during mouse drag

All other styles use Tailwind classes.

## Pages

### layouts/default.vue

Sets `bg-[#121620] min-h-screen` on the root element. All pages inherit this automatically.

### pages/index.vue

Direct port of `index.html` nav. Already mostly Tailwind — minimal changes.

### pages/testimonials/index.vue

Replaces `testimonials/index.html`. Changes:
- Removes `<base href="/testimonials/">` — Nuxt handles routing
- Removes all `shared-files` CSS link tags
- Removes `<style>` tag with `@font-face` — moved to `main.css`
- Inline padding wrappers (`style="padding-top: 26px..."`) → Tailwind classes
- Wooden divider `style="background-image: url(...); height: 23px"` → `bg-[url('/images/woodendivider.webp')] h-[23px]`
- `style="height: 96px"` spacer → `h-24`
- `style="color: #e5ae3c"` → `text-gold`
- `<script type="module" src="./testimonial-strip.js">` removed — components auto-imported by Nuxt
