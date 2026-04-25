# Nuxt 3 + Tailwind v4 Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the static HTML/JS concepts sandbox to a Nuxt 3 project with Tailwind v4, converting the `testimonial-strip.js` web component to Vue SFCs and eliminating all unused CSS files.

**Architecture:** Nuxt 3 with file-based routing under `pages/`, a single `layouts/default.vue` for shared chrome, and two auto-imported Vue components (`TestimonialCard`, `TestimonialStrip`). Tailwind v4 is configured CSS-first via `@tailwindcss/vite` — no `tailwind.config.ts`. Custom tokens (`gray-850`, `gold`, `arcuata` font) live in `@theme` inside `assets/css/main.css`.

**Tech Stack:** Nuxt 3, Vue 3, Tailwind v4 (`@tailwindcss/vite`), Vitest, `@vue/test-utils`, `happy-dom`

---

## File Map

| Action | Path | Purpose |
|--------|------|---------|
| Create | `package.json` | Nuxt + Tailwind + test deps |
| Create | `nuxt.config.ts` | Tailwind vite plugin + CSS entry |
| Create | `tsconfig.json` | Extends Nuxt-generated tsconfig |
| Create | `app.vue` | Root: NuxtLayout + NuxtPage |
| Create | `assets/css/main.css` | Tailwind import, @theme tokens, @font-face |
| Move | `assets/fonts/` → `public/fonts/` | Fonts must be at a public URL for @font-face |
| Download | `public/images/woodendivider.webp` | Currently loaded from boot.dev CDN |
| Create | `layouts/default.vue` | Dark background wrapper |
| Create | `pages/index.vue` | Concepts nav |
| Create | `vitest.config.ts` | Test runner config |
| Create | `tests/components/TestimonialCard.test.ts` | Component contract tests |
| Create | `components/TestimonialCard.vue` | Card SFC replacing custom element |
| Create | `tests/components/TestimonialStrip.test.ts` | Component contract tests |
| Create | `components/TestimonialStrip.vue` | Strip SFC with scroll + drag logic |
| Create | `pages/testimonials/index.vue` | Full testimonials page |
| Delete | `testimonials/shared-files/` | Unused hashed CSS from boot.dev build |
| Delete | `testimonials/testimonial-strip.js` | Replaced by Vue components |
| Delete | `testimonials/index.html` | Replaced by pages/testimonials/index.vue |
| Delete | `index.html` | Replaced by pages/index.vue |

---

## Task 1: Scaffold Nuxt 3 project

**Files:**
- Create: `package.json`
- Create: `nuxt.config.ts`
- Create: `tsconfig.json`
- Create: `app.vue`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "concepts",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "nuxt": "^3.15.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@vitejs/plugin-vue": "^5.0.0",
    "@vue/test-utils": "^2.4.0",
    "happy-dom": "^15.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.0.0",
    "vitest": "^3.0.0",
    "vue-tsc": "^2.0.0"
  }
}
```

- [ ] **Step 2: Create `nuxt.config.ts`**

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  }
})
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "extends": "./.nuxt/tsconfig.json"
}
```

- [ ] **Step 4: Create `app.vue`**

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

- [ ] **Step 5: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, no errors. Nuxt will generate `.nuxt/` on first `nuxt dev` run.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json nuxt.config.ts tsconfig.json app.vue
git commit -m "feat: scaffold Nuxt 3 project"
```

---

## Task 2: Configure Tailwind v4 and CSS entry

**Files:**
- Create: `assets/css/main.css`

- [ ] **Step 1: Create `assets/css/` directory and `main.css`**

```bash
mkdir -p assets/css
```

```css
/* assets/css/main.css */
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
  font-style: normal;
}

@font-face {
  font-family: 'Arcuata';
  src: url('/fonts/Arcuata-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}
```

- [ ] **Step 2: Start dev server and verify Tailwind loads**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: blank page with no console errors about missing CSS or Tailwind. The `@import "tailwindcss"` line will error if the package isn't installed — fix by checking `npm install` completed in Task 1.

- [ ] **Step 3: Stop dev server and commit**

```bash
git add assets/css/main.css
git commit -m "feat: add Tailwind v4 CSS entry with custom theme tokens"
```

---

## Task 3: Move fonts and download woodendivider image

**Files:**
- Create: `public/fonts/` (move Arcuata woff2 files here)
- Create: `public/images/woodendivider.webp` (download from CDN)

- [ ] **Step 1: Create public directories and move fonts**

```bash
mkdir -p public/fonts public/images
mv assets/fonts/Arcuata-Regular.woff2 public/fonts/
mv assets/fonts/Arcuata-Bold.woff2 public/fonts/
rmdir assets/fonts
```

- [ ] **Step 2: Download woodendivider image**

```bash
curl -L "https://www.boot.dev/_nuxt/woodendivider.CUsRAV17.webp" -o public/images/woodendivider.webp
```

Expected: `public/images/woodendivider.webp` exists and is ~a few KB.

- [ ] **Step 3: Commit**

```bash
git add public/
git rm assets/fonts/Arcuata-Regular.woff2 assets/fonts/Arcuata-Bold.woff2 2>/dev/null || true
git add -u
git commit -m "feat: move fonts to public/fonts, download woodendivider image"
```

---

## Task 4: Create default layout and nav page

**Files:**
- Create: `layouts/default.vue`
- Create: `pages/index.vue`

- [ ] **Step 1: Create `layouts/default.vue`**

```vue
<template>
  <div class="min-h-screen bg-[#121620] text-gray-200">
    <slot />
  </div>
</template>
```

- [ ] **Step 2: Create `pages/index.vue`**

```vue
<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <div class="text-center">
      <h1 class="mb-12 text-5xl font-semibold tracking-tight text-gray-100">
        Concepts
      </h1>
      <nav class="flex flex-col gap-8">
        <NuxtLink
          to="/testimonials"
          class="border border-gray-600 bg-gray-800 px-6 py-3 text-sm text-gray-200 transition-colors hover:bg-gray-700 hover:text-white"
        >
          Testimonials
        </NuxtLink>
        <span
          class="cursor-default border border-gray-700 bg-gray-800/40 px-6 py-3 text-sm text-gray-500"
        >
          More coming soon
        </span>
      </nav>
    </div>
  </div>
</template>
```

- [ ] **Step 3: Run dev server and verify nav page**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: dark background (`#121620`), "Concepts" heading, "Testimonials" link, "More coming soon" span. Clicking Testimonials will 404 (page not created yet) — that's fine.

- [ ] **Step 4: Commit**

```bash
git add layouts/default.vue pages/index.vue
git commit -m "feat: add default layout and concepts nav page"
```

---

## Task 5: Configure Vitest

**Files:**
- Create: `vitest.config.ts`

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('.', import.meta.url))
    }
  },
  test: {
    environment: 'happy-dom',
    globals: true
  }
})
```

- [ ] **Step 2: Verify Vitest runs with no tests**

```bash
npm run test
```

Expected output contains: `No test files found` or exits 0. If it errors on `@vitejs/plugin-vue` not found, run `npm install` again.

- [ ] **Step 3: Commit**

```bash
git add vitest.config.ts
git commit -m "feat: add Vitest config for component testing"
```

---

## Task 6: TestimonialCard — TDD

**Files:**
- Create: `tests/components/TestimonialCard.test.ts`
- Create: `components/TestimonialCard.vue`

- [ ] **Step 1: Create test file**

```bash
mkdir -p tests/components
```

```ts
// tests/components/TestimonialCard.test.ts
import { mount } from '@vue/test-utils'
import TestimonialCard from '~/components/TestimonialCard.vue'

describe('TestimonialCard', () => {
  it('renders org, person, and quote', () => {
    const wrapper = mount(TestimonialCard, {
      props: { org: 'Acme Corp', person: 'Jane Doe', quote: 'Great product!' }
    })
    expect(wrapper.text()).toContain('Acme Corp')
    expect(wrapper.text()).toContain('Jane Doe')
    expect(wrapper.text()).toContain('Great product!')
  })

  it('renders avatar img with correct src and alt when avatar prop is provided', () => {
    const wrapper = mount(TestimonialCard, {
      props: { org: 'Acme', person: 'Jane', quote: 'Good', avatar: '/avatar.jpg' }
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/avatar.jpg')
    expect(img.attributes('alt')).toBe('Acme')
  })

  it('renders placeholder div and no img when avatar prop is omitted', () => {
    const wrapper = mount(TestimonialCard, {
      props: { org: 'Acme', person: 'Jane', quote: 'Good' }
    })
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('[data-testid="avatar-placeholder"]').exists()).toBe(true)
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npm run test
```

Expected: FAIL with `Cannot find module '~/components/TestimonialCard.vue'`

- [ ] **Step 3: Create `components/TestimonialCard.vue`**

```vue
<template>
  <div
    class="flex w-[254px] shrink-0 snap-start flex-col gap-[14px] border-2 border-gold bg-[rgba(32,35,48,0.75)] p-5 sm:w-[300px]"
  >
    <div class="flex items-center gap-3">
      <img
        v-if="avatar"
        :src="avatar"
        :alt="org"
        class="h-12 w-12 shrink-0 rounded-full object-cover"
      />
      <div
        v-else
        data-testid="avatar-placeholder"
        class="h-12 w-12 shrink-0 rounded-full bg-[#3c424f]"
      ></div>
      <div>
        <div class="text-[15px] font-semibold leading-[1.3] text-white">{{ org }}</div>
        <div class="mt-[3px] text-[13px] text-[#919dab]">{{ person }}</div>
      </div>
    </div>
    <p class="m-0 font-arcuata text-[17px] leading-[1.5] tracking-[-0.3px] text-white">
      {{ quote }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  org: string
  person: string
  quote: string
  avatar?: string
}>()
</script>
```

- [ ] **Step 4: Run test — expect PASS**

```bash
npm run test
```

Expected: All 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add components/TestimonialCard.vue tests/components/TestimonialCard.test.ts
git commit -m "feat: add TestimonialCard component (TDD)"
```

---

## Task 7: TestimonialStrip — TDD

**Files:**
- Create: `tests/components/TestimonialStrip.test.ts`
- Create: `components/TestimonialStrip.vue`

- [ ] **Step 1: Create test file**

```ts
// tests/components/TestimonialStrip.test.ts
import { mount } from '@vue/test-utils'
import TestimonialStrip from '~/components/TestimonialStrip.vue'

describe('TestimonialStrip', () => {
  it('renders slotted content inside the scroll track', () => {
    const wrapper = mount(TestimonialStrip, {
      slots: { default: '<div class="test-card">Card content</div>' }
    })
    expect(wrapper.find('.test-card').exists()).toBe(true)
    expect(wrapper.find('.test-card').text()).toBe('Card content')
  })

  it('renders a Previous and a Next button', () => {
    const wrapper = mount(TestimonialStrip, {
      slots: { default: '<div>Card</div>' }
    })
    expect(wrapper.find('[aria-label="Previous"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="Next"]').exists()).toBe(true)
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npm run test
```

Expected: FAIL with `Cannot find module '~/components/TestimonialStrip.vue'`

- [ ] **Step 3: Create `components/TestimonialStrip.vue`**

```vue
<template>
  <div class="relative box-border px-[50px]">
    <button
      aria-label="Previous"
      class="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-y-[60%] cursor-pointer items-center justify-center border border-gold bg-[rgba(32,35,48,0.85)] text-lg text-gold"
      @click="scrollTrack(-1)"
    >
      ‹
    </button>

    <div
      ref="track"
      class="track-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pl-4 pt-2"
      :class="isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="stopDrag"
      @mouseleave="stopDrag"
    >
      <slot />
    </div>

    <button
      aria-label="Next"
      class="absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-[60%] cursor-pointer items-center justify-center border border-gold bg-[rgba(32,35,48,0.85)] text-lg text-gold"
      @click="scrollTrack(1)"
    >
      ›
    </button>
  </div>
</template>

<script setup lang="ts">
const track = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)

function startDrag(e: MouseEvent) {
  if (!track.value) return
  isDragging.value = true
  startX.value = e.pageX - track.value.offsetLeft
  scrollLeft.value = track.value.scrollLeft
}

function onDrag(e: MouseEvent) {
  if (!isDragging.value || !track.value) return
  e.preventDefault()
  const x = e.pageX - track.value.offsetLeft
  track.value.scrollLeft = scrollLeft.value - (x - startX.value) * 1.5
}

function stopDrag() {
  isDragging.value = false
}

function scrollTrack(dir: number) {
  track.value?.scrollBy({ left: dir * 320, behavior: 'smooth' })
}
</script>

<style scoped>
.track-scroll::-webkit-scrollbar {
  display: none;
}
.track-scroll {
  scrollbar-width: none;
}
</style>
```

- [ ] **Step 4: Run test — expect PASS**

```bash
npm run test
```

Expected: All 5 tests PASS (3 from Task 6 + 2 new).

- [ ] **Step 5: Commit**

```bash
git add components/TestimonialStrip.vue tests/components/TestimonialStrip.test.ts
git commit -m "feat: add TestimonialStrip component (TDD)"
```

---

## Task 8: Create testimonials page

**Files:**
- Create: `pages/testimonials/index.vue`

- [ ] **Step 1: Create `pages/testimonials/` directory**

```bash
mkdir -p pages/testimonials
```

- [ ] **Step 2: Create `pages/testimonials/index.vue`**

```vue
<template>
  <div class="bg-gray-850 pt-12 text-gray-200">
    <!-- Docs section -->
    <div class="mx-auto max-w-4xl px-8 py-16">
      <div class="mb-10 text-center">
        <h2 class="mb-3 text-3xl font-semibold text-gray-100 lg:text-5xl">
          Customer Success Stories
        </h2>
        <p class="mx-auto max-w-2xl text-gray-400">
          Not every organization will offer a quotable testimonial. This section flexes
          around what's actually available — so there's always something meaningful to show.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div class="border border-gray-500 bg-gray-800/30 p-6">
          <div class="mb-3 uppercase tracking-widest text-gold">Type 1 — Testimonial</div>
          <h3 class="mb-2 text-xl font-semibold text-gray-100">Attributed quote</h3>
          <p class="text-gray-400">
            A direct quote from an individual at an organization. Attribution can be a named
            person, a role, or a generic spokesperson when confidentiality is required.
          </p>
        </div>
        <div class="border border-gray-500 bg-gray-800/30 p-6">
          <div class="mb-3 uppercase tracking-widest text-gold">Type 2 — Micro Case Study</div>
          <h3 class="mb-2 text-xl font-semibold text-gray-100">Org-level narrative</h3>
          <p class="text-gray-400">
            A short paragraph describing how an organization uses the platform and what
            changed. No individual quoted — only an org name and optionally a department byline.
          </p>
        </div>
        <div class="border border-gray-500 bg-gray-800/30 p-6">
          <div class="mb-3 uppercase tracking-widest text-gold">Type 3 — Combined</div>
          <h3 class="mb-2 text-xl font-semibold text-gray-100">Quote + context</h3>
          <p class="text-gray-400">
            A brief quote paired with explanatory prose from Boot.dev. Useful when only a
            few words were provided — the added context fills in what the quote alone can't convey.
          </p>
        </div>
      </div>

      <div class="mt-8 border border-dashed border-gray-600 p-5 text-gray-400">
        <span class="font-medium text-gray-300">On the heading:</span>
        "What X Has Told Us" works when all entries are direct quotes. When the mix includes
        case studies or anonymous proof, the title would be adjusted.
      </div>
    </div>

    <!-- Divider -->
    <div class="h-[23px] w-full bg-center bg-[url('/images/woodendivider.webp')]"></div>

    <!-- Companies strip -->
    <div class="flex flex-col items-center text-center mt-12">
      <h2 class="max-w-xs text-balance text-3xl leading-16 text-gray-100 lg:max-w-2xl lg:text-4xl pt-8 mb-0">
        What Companies Have Told Us
      </h2>
    </div>
    <div class="mx-auto max-w-[1600px] px-6 pt-[26px] pb-10">
      <TestimonialStrip>
        <TestimonialCard
          org="Acme Corp"
          person="Jordan Lee, Engineering Manager"
          quote="Our junior devs went from shaky fundamentals to confidently shipping backend features. The hands-on format is what made the difference."
        />
        <TestimonialCard
          org="Pinnacle Software"
          person="Dana Kim, L&D Lead"
          quote="We've tried video courses and bootcamps. Boot.dev is the first platform where completion rates didn't fall off a cliff after week one."
        />
        <TestimonialCard
          org="CloudOps Inc."
          person="Alex Rivera, DevOps Lead"
          quote="The infrastructure curriculum is genuinely current — Kubernetes, Docker, CI/CD. Our team isn't learning yesterday's stack."
        />
        <TestimonialCard
          org="Midsize SaaS Co."
          person="Sam Patel, CTO"
          quote="The ROI was immediate. Within a month of onboarding our IT staff, they were handling tasks that used to require contractor support."
        />
        <TestimonialCard
          org="Greenfield Ventures"
          person="Taylor Brooks, Head of Engineering"
          quote="Cost-effective and self-paced. Our engineers fit it around sprint cycles without any scheduling headaches."
        />
      </TestimonialStrip>
    </div>

    <!-- Divider -->
    <div class="h-[23px] w-full bg-center bg-[url('/images/woodendivider.webp')]"></div>

    <!-- Schools strip -->
    <div class="flex flex-col items-center text-center mt-12">
      <h2 class="max-w-xs text-balance text-3xl leading-16 text-gray-100 lg:max-w-2xl lg:text-4xl">
        What Schools Have Told Us
      </h2>
    </div>
    <div class="mx-auto max-w-[1600px] px-6 pt-[26px] pb-10">
      <TestimonialStrip class="px-4">
        <TestimonialCard
          org="Lincoln High School"
          person="Sarah Chen, CS Instructor"
          quote="Boot.dev completely transformed how my students engage with programming. The gamified approach keeps them motivated in a way that textbooks never could."
        />
        <TestimonialCard
          org="Code for Teens Summer Camp"
          person="James Park, Lead Instructor"
          quote="Students who come in with zero experience are writing real programs by week two. The structured path removes all the guesswork for instructors."
        />
        <TestimonialCard
          org="Westside Academy"
          person="David Kim, AP CS Teacher"
          quote="I've tried a dozen platforms. Boot.dev is the only one where students actually ask to do more lessons outside of class time."
        />
        <TestimonialCard
          org="Girls Who Code Chapter"
          person="Priya Nair, Program Director"
          quote="The browser-based environment is a game changer. No setup, no configuration — students open a laptop and start coding immediately."
        />
        <TestimonialCard
          org="TechBridge After-School Program"
          person="Maria Torres, Curriculum Lead"
          quote="Our students come from under-resourced schools. Boot.dev's self-paced model lets each kid move at their own speed without anyone falling behind."
        />
      </TestimonialStrip>
    </div>

    <!-- Divider -->
    <div class="h-[23px] w-full bg-center bg-[url('/images/woodendivider.webp')]"></div>

    <div class="h-24"></div>
  </div>
</template>
```

- [ ] **Step 3: Run dev server and visually verify the testimonials page**

```bash
npm run dev
```

Open `http://localhost:3000/testimonials`. Check:
- Dark background, "Customer Success Stories" heading, 3-column format grid visible
- Wooden divider band visible between sections
- "What Companies Have Told Us" + "What Schools Have Told Us" strips visible
- Cards are horizontally scrollable, arrow buttons visible
- Drag-to-scroll works on the card track
- Arcuata font loads on quote text (serif, distinctive letterforms)
- Card border is gold (`#e5ae3c`)

- [ ] **Step 4: Commit**

```bash
git add pages/testimonials/index.vue
git commit -m "feat: add testimonials page using Vue components"
```

---

## Task 9: Delete old files

**Files:**
- Delete: `testimonials/shared-files/`
- Delete: `testimonials/testimonial-strip.js`
- Delete: `testimonials/index.html`
- Delete: `index.html`

- [ ] **Step 1: Remove old files**

```bash
git rm -r testimonials/shared-files/
git rm testimonials/testimonial-strip.js
git rm testimonials/index.html
git rm index.html
```

- [ ] **Step 2: Verify dev server still works**

```bash
npm run dev
```

Open `http://localhost:3000` and `http://localhost:3000/testimonials`. Both should still work correctly — these routes are now served entirely by Nuxt.

- [ ] **Step 3: Run tests to confirm nothing broke**

```bash
npm run test
```

Expected: All 5 tests PASS.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove old static HTML/JS files replaced by Nuxt"
```

---

## Task 10: Final verification and cleanup commit

- [ ] **Step 1: Run full test suite**

```bash
npm run test
```

Expected: 5 tests, all PASS.

- [ ] **Step 2: Check for any leftover references to old paths**

```bash
grep -r "shared-files\|testimonial-strip.js\|cdn.tailwindcss.com" . --include="*.vue" --include="*.ts" --include="*.html" 2>/dev/null
```

Expected: no output.

- [ ] **Step 3: Verify git status is clean**

```bash
git status
```

Expected: `nothing to commit, working tree clean`

- [ ] **Step 4: Smoke-test both routes one final time**

```bash
npm run dev
```

- `http://localhost:3000` — Concepts nav, "Testimonials" link works
- `http://localhost:3000/testimonials` — Full page loads, fonts render, card strips scroll, dividers show
