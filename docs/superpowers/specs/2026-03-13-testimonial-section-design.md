# Testimonial Section Design Spec
Date: 2026-03-13

## Overview

Add a testimonial section to two Boot.dev landing pages:
- `For Schools _ Boot.dev.html`
- `Boot.dev for Business _ Boot.dev.html`

Both pages share an identical component implementation. The section appears after the hero/intro paragraph, before the features section.

## Component Architecture

A single native Web Component (`<testimonial-strip>`) defined in one shared JS file (e.g., `testimonial-strip.js`). Both HTML pages include the script and drop in the element with their respective data. Card style changes in the component definition propagate to both pages automatically.

## Card Visual Design

Matches the style of Boot.dev's existing individual testimonial cards:

- **Background:** `rgba(32, 35, 48, 0.75)` — translucent dark
- **Border:** `2px solid #e5ae3c` (Boot.dev yellow-400) — no border-radius (square corners)
- **Width:** 300px fixed
- **Padding:** 20px

### Card Layout (top to bottom)

1. **Header row** — avatar + text stack, side by side
   - Avatar: 48px circle, placeholder image (swappable)
   - Org/school name: bold, 15px, `#ffffff` (white)
   - Individual's name + title: 13px, `#919dab` (gray-400, lighter gray)
2. **Testimonial text**
   - Font: Arcuata, Georgia, serif (fallback stack)
   - Size: 14px
   - Color: `#ffffff` (white)
   - Line-height: 1.65

## Scroll Behavior

- Container: `overflow-x: auto`, scrollbars hidden (`scrollbar-width: none` + `::-webkit-scrollbar { display: none }`)
- `scroll-snap-type: x mandatory` on container
- `scroll-snap-align: start` on each card
- `gap: 16px` between cards
- Desktop: ~3–4 cards visible, hinting at more
- Mobile: ~1.2 cards visible

## Section Placement

- After the hero/intro paragraph
- Before the features/benefits section
- No section title (cards speak for themselves)

## Mock Data

### For Schools page — 5 cards, pre-college focus (high schools, after-school programs, summer programs)

| Avatar | Org | Person | Quote |
|--------|-----|--------|-------|
| placeholder | Lincoln High School | Sarah Chen, CS Instructor | "Boot.dev completely transformed how my students engage with programming. The gamified approach keeps them motivated in a way that textbooks never could." |
| placeholder | Code for Teens Summer Camp | James Park, Lead Instructor | "Students who come in with zero experience are writing real programs by week two. The structured path removes all the guesswork for instructors." |
| placeholder | Westside Academy | David Kim, AP CS Teacher | "I've tried a dozen platforms. Boot.dev is the only one where students actually ask to do more lessons outside of class time." |
| placeholder | Girls Who Code Chapter | Priya Nair, Program Director | "The browser-based environment is a game changer. No setup, no configuration — students open a laptop and start coding immediately." |
| placeholder | TechBridge After-School Program | Maria Torres, Curriculum Lead | "Our students come from under-resourced schools. Boot.dev's self-paced model lets each kid move at their own speed without anyone falling behind." |

### For Business page — 5 cards, companies/teams

| Avatar | Org | Person | Quote |
|--------|-----|--------|-------|
| placeholder | Acme Corp | Jordan Lee, Engineering Manager | "Our junior devs went from shaky fundamentals to confidently shipping backend features. The hands-on format is what made the difference." |
| placeholder | Stripe | Dana Kim, L&D Lead | "We've tried video courses and bootcamps. Boot.dev is the first platform where completion rates didn't fall off a cliff after week one." |
| placeholder | HashiCorp | Alex Rivera, DevOps Lead | "The infrastructure curriculum is genuinely current — Kubernetes, Docker, CI/CD. Our team isn't learning yesterday's stack." |
| placeholder | Midsize SaaS Co. | Sam Patel, CTO | "The ROI was immediate. Within a month of onboarding our IT staff, they were handling tasks that used to require contractor support." |
| placeholder | Greenfield Ventures | Taylor Brooks, Head of Engineering | "Cost-effective and self-paced. Our engineers fit it around sprint cycles without any scheduling headaches." |

## File Structure

```
/
├── testimonial-strip.js        # Web component definition (shared)
├── For Schools _ Boot.dev.html # Includes <testimonial-strip> with schools data
├── Boot.dev for Business _ Boot.dev.html # Includes <testimonial-strip> with business data
```

## Web Component API

```html
<testimonial-strip>
  <testimonial-card
    avatar="path/to/photo.jpg"
    org="Lincoln High School"
    person="Sarah Chen, CS Instructor"
    quote="Boot.dev completely transformed..."
  ></testimonial-card>
  <!-- more cards -->
</testimonial-strip>
```

The component reads child `<testimonial-card>` elements and renders the styled strip internally using light DOM, so it inherits page-level styles and CSS variables without requiring re-declaration inside a shadow root.
