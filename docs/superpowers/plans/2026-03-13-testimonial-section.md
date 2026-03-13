# Testimonial Section Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a horizontally-scrolling testimonial card strip to both Boot.dev landing pages using a shared native Web Component.

**Architecture:** A single `testimonial-strip.js` file defines two custom elements (`<testimonial-strip>` and `<testimonial-card>`) using light DOM so they inherit page styles. Each HTML page includes the shared script and declares its own `<testimonial-strip>` with page-specific `<testimonial-card>` children inserted at the correct position in the page.

**Tech Stack:** Vanilla JS (Custom Elements v1), CSS (no framework), HTML

---

## Chunk 1: Web Component

### Task 1: Create `testimonial-strip.js`

**Files:**
- Create: `testimonial-strip.js`

**Context:**
The file defines two custom elements:
- `<testimonial-card>` — a data container. Reads its own `avatar`, `org`, `person`, and `quote` attributes and renders a styled card into itself.
- `<testimonial-strip>` — the scroll container. Renders a flex row that wraps its `<testimonial-card>` children with scroll-snap behavior.

Both use light DOM (`this.innerHTML = ...` in `connectedCallback`), so they inherit page CSS variables and font loading.

The Arcuata font is loaded via a `<link>` tag injected into `<head>` once (guard against duplicates). Source: `https://fonts.cdnfonts.com/css/arcuata`

- [ ] **Step 1: Create the file with the `<testimonial-card>` custom element**

Create `testimonial-strip.js` with:

```js
// Inject Arcuata font once
if (!document.querySelector('link[data-arcuata]')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.cdnfonts.com/css/arcuata';
  link.dataset.arcuata = '1';
  document.head.appendChild(link);
}

class TestimonialCard extends HTMLElement {
  connectedCallback() {
    const avatar = this.getAttribute('avatar') || '';
    const org = this.getAttribute('org') || '';
    const person = this.getAttribute('person') || '';
    const quote = this.getAttribute('quote') || '';

    const avatarContent = avatar
      ? `<img src="${avatar}" alt="${org}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;flex-shrink:0;">`
      : `<div style="width:48px;height:48px;border-radius:50%;background:#3c424f;flex-shrink:0;"></div>`;

    this.style.cssText = `
      display: flex;
      flex-direction: column;
      flex: 0 0 300px;
      scroll-snap-align: start;
      background: rgba(32, 35, 48, 0.75);
      border: 2px solid #e5ae3c;
      border-radius: 0;
      padding: 20px;
      gap: 14px;
      box-sizing: border-box;
    `;

    this.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;">
        ${avatarContent}
        <div>
          <div style="font-weight:600;font-size:15px;color:#ffffff;line-height:1.3;">${org}</div>
          <div style="font-size:13px;color:#919dab;margin-top:3px;">${person}</div>
        </div>
      </div>
      <p style="font-family:'Arcuata',Georgia,serif;font-size:14px;color:#ffffff;line-height:1.65;margin:0;">${quote}</p>
    `;
  }
}

customElements.define('testimonial-card', TestimonialCard);
```

- [ ] **Step 2: Add the `<testimonial-strip>` custom element to the same file**

Append to `testimonial-strip.js`:

```js
class TestimonialStrip extends HTMLElement {
  connectedCallback() {
    this.style.cssText = `
      display: flex;
      gap: 16px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      padding: 8px 0 16px;
      -webkit-overflow-scrolling: touch;
    `;

    // Hide webkit scrollbar via a one-time injected style tag
    if (!document.querySelector('style[data-testimonial-strip]')) {
      const style = document.createElement('style');
      style.dataset.testimonialStrip = '1';
      style.textContent = 'testimonial-strip::-webkit-scrollbar { display: none; }';
      document.head.appendChild(style);
    }
  }
}

customElements.define('testimonial-strip', TestimonialStrip);
```

- [ ] **Step 3: Open `testimonial-strip.js` in a browser to verify no syntax errors**

Open the browser console on any local HTML file that includes the script. Expected: no errors logged, both custom elements registered.

- [ ] **Step 4: Commit**

```bash
git add testimonial-strip.js
git commit -m "feat: add testimonial-strip web component"
```

---

## Chunk 2: For Schools Page

### Task 2: Insert testimonial strip into `For Schools _ Boot.dev.html`

**Files:**
- Modify: `For Schools _ Boot.dev.html`

**Context:**
The page is a saved SPA snapshot. The insertion point is immediately before the section that starts with `<h2 class="text-2xl">Three Semester-Long Courses</h2>`. Find this string in the file and insert the `<script>` tag + `<testimonial-strip>` block just before the closest enclosing `<div>` that contains it.

Specifically, find this exact string in the file:
```
<div><h2 class="text-2xl">Three Semester-Long Courses</h2>
```
And insert the component HTML immediately before that `<div>`.

- [ ] **Step 1: Add the `<script>` include and `<testimonial-strip>` block before the "Three Semester" section**

Find:
```html
<div><h2 class="text-2xl">Three Semester-Long Courses</h2>
```

Insert immediately before it:
```html
<script type="module" src="./testimonial-strip.js"></script>
<testimonial-strip>
  <testimonial-card
    org="Lincoln High School"
    person="Sarah Chen, CS Instructor"
    quote="Boot.dev completely transformed how my students engage with programming. The gamified approach keeps them motivated in a way that textbooks never could."
  ></testimonial-card>
  <testimonial-card
    org="Code for Teens Summer Camp"
    person="James Park, Lead Instructor"
    quote="Students who come in with zero experience are writing real programs by week two. The structured path removes all the guesswork for instructors."
  ></testimonial-card>
  <testimonial-card
    org="Westside Academy"
    person="David Kim, AP CS Teacher"
    quote="I've tried a dozen platforms. Boot.dev is the only one where students actually ask to do more lessons outside of class time."
  ></testimonial-card>
  <testimonial-card
    org="Girls Who Code Chapter"
    person="Priya Nair, Program Director"
    quote="The browser-based environment is a game changer. No setup, no configuration — students open a laptop and start coding immediately."
  ></testimonial-card>
  <testimonial-card
    org="TechBridge After-School Program"
    person="Maria Torres, Curriculum Lead"
    quote="Our students come from under-resourced schools. Boot.dev's self-paced model lets each kid move at their own speed without anyone falling behind."
  ></testimonial-card>
</testimonial-strip>
```

- [ ] **Step 2: Open `For Schools _ Boot.dev.html` in a browser and verify**

Check:
- Testimonial strip appears between the hero/CTA paragraph and the "Three Semester-Long Courses" section
- Cards are horizontally scrollable with snap behavior
- No horizontal scrollbar visible
- On narrow viewport (~375px), ~1.2 cards are visible

- [ ] **Step 3: Commit**

```bash
git add "For Schools _ Boot.dev.html"
git commit -m "feat: add testimonial strip to For Schools page"
```

---

## Chunk 3: For Business Page

### Task 3: Insert testimonial strip into `Boot.dev for Business _ Boot.dev.html`

**Files:**
- Modify: `Boot.dev for Business _ Boot.dev.html`

**Context:**
The insertion point is immediately before the section that contains `<h2` with text `Who is Boot.dev for?`. Use a text search tool (not visual scrolling — the file is minified) to locate this exact string:
```
</div></section><div class="absolute w-full bg-center -mt-10"
```
This is the divider element between the hero section and the "Who is Boot.dev for?" section. Insert the `<testimonial-strip>` block immediately after the closing `</section>` of the hero and before that divider `<div>`.

Note on org names: "Stripe" and "HashiCorp" from the spec mock data are replaced with "Pinnacle Software" and "CloudOps Inc." — this is intentional to avoid using real company names as fake testimonials on a client-facing page.

- [ ] **Step 1: Insert the `<script>` include and `<testimonial-strip>` block before the divider**

Find:
```html
</div></section><div class="absolute w-full bg-center -mt-10"
```

And insert immediately before the `<div class="absolute w-full bg-center -mt-10"`:
```html
<script type="module" src="./testimonial-strip.js"></script>
<div style="padding: 40px 16px 0;">
<testimonial-strip>
  <testimonial-card
    org="Acme Corp"
    person="Jordan Lee, Engineering Manager"
    quote="Our junior devs went from shaky fundamentals to confidently shipping backend features. The hands-on format is what made the difference."
  ></testimonial-card>
  <testimonial-card
    org="Pinnacle Software"
    person="Dana Kim, L&D Lead"
    quote="We've tried video courses and bootcamps. Boot.dev is the first platform where completion rates didn't fall off a cliff after week one."
  ></testimonial-card>
  <testimonial-card
    org="CloudOps Inc."
    person="Alex Rivera, DevOps Lead"
    quote="The infrastructure curriculum is genuinely current — Kubernetes, Docker, CI/CD. Our team isn't learning yesterday's stack."
  ></testimonial-card>
  <testimonial-card
    org="Midsize SaaS Co."
    person="Sam Patel, CTO"
    quote="The ROI was immediate. Within a month of onboarding our IT staff, they were handling tasks that used to require contractor support."
  ></testimonial-card>
  <testimonial-card
    org="Greenfield Ventures"
    person="Taylor Brooks, Head of Engineering"
    quote="Cost-effective and self-paced. Our engineers fit it around sprint cycles without any scheduling headaches."
  ></testimonial-card>
</testimonial-strip>
</div>
```

Note: The wrapping `<div style="padding: 40px 16px 0;">` provides breathing room between the hero section and the strip since this page has a decorative divider element following immediately.

- [ ] **Step 2: Open `Boot.dev for Business _ Boot.dev.html` in a browser and verify**

Check:
- Testimonial strip appears between the hero/social-proof band and the "Who is Boot.dev for?" section
- Cards match the visual style from the For Schools page (same component, same styles)
- Horizontal scroll with snap works
- No real company names appear (Stripe/HashiCorp replaced with Pinnacle Software/CloudOps Inc.)

- [ ] **Step 3: Commit**

```bash
git add "Boot.dev for Business _ Boot.dev.html"
git commit -m "feat: add testimonial strip to For Business page"
```
