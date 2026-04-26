# Nuxt v4 + Biome Setup Design

**Date:** 2026-04-26
**Project:** concepts
**Goal:** Upgrade to Nuxt v4 and configure Biome for formatting and linting

## Overview

Upgrade the current Nuxt 3.15.0 project to Nuxt v4 and implement Biome as a unified tool for code formatting and linting, replacing the need for separate ESLint and Prettier configurations.

## Current State

- **Nuxt:** 3.15.0
- **TypeScript:** Standard Vue/Nuxt usage with `<script setup lang="ts">`
- **Components:** TestimonialCard.vue, TestimonialStrip.vue
- **Pages:** index.vue, testimonials/index.vue
- **Testing:** Vitest with happy-dom
- **Styling:** Tailwind CSS v4
- **Linting/Formatting:** Not configured

## Design Approach

### 1. Nuxt v4 Upgrade

**Changes:**
- Upgrade `nuxt` from `^3.15.0` to `^4.0.0` (latest stable)
- Update related dependencies to latest compatible versions
- Update `compatibilityDate` in `nuxt.config.ts` to `'2025-01-01'`
- No changes to existing component or page code expected

**Why this works:**
- Simple configuration (only Tailwind v4 plugin)
- Nuxt 4 maintains backward compatibility with most Nuxt 3 configs
- All dependencies (Vue 3.5, Vitest, TypeScript) are v4-compatible
- Components and pages work without modifications

**Rollback plan:** Keep a git commit before the upgrade for easy reversion

### 2. Biome Configuration

**Scope:**
- **Formatting:** JavaScript, TypeScript, Vue files with auto-format on save
- **Linting:** TypeScript rules, Vue SFC rules, import sorting
- **Configuration:** Single `biome.json` file in project root

**Configuration:**
```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": false,
    "ignore": [
      "node_modules",
      ".nuxt",
      "dist",
      ".output"
    ]
  },
  "formatter": {
    "enabled": true,
    "formatWithErrors": false,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "style": {
        "noUnusedTemplateLiteral": "error"
      },
      "suspicious": {
        "noExplicitAny": "warn"
      }
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "asNeeded"
    }
  }
}
```

**NPM Scripts:**
- `lint` - Check for linting issues
- `lint:fix` - Auto-fix linting issues
- `format` - Format all files
- `format:check` - Check if files are properly formatted

**Note:** All commands use `pnpm` for package management.

**TypeScript Integration:**
- Current usage: `<script setup lang="ts">` with typed props, refs, and function signatures
- Biome provides TypeScript support with `recommended` rules enabled
- `noExplicitAny: "warn"` catches missing types without being overly strict
- Scales well as more TypeScript is added to the project

### 3. Implementation Steps

1. **Upgrade dependencies**
   - Update `package.json`: Nuxt to `^4.0.0`, related packages to latest compatible versions
   - Run `pnpm install` (project uses pnpm for package management)
   - Verify no breaking changes in dependencies

2. **Install and configure Biome**
   - Add `@biomejs/biome@latest` to devDependencies
   - Create `biome.json` with the configuration above
   - Add NPM scripts for linting and formatting
   - Run `npm run format` to format existing code

3. **Update Nuxt config**
   - Update `compatibilityDate` in `nuxt.config.ts` to `'2025-01-01'`
   - Test dev server: `pnpm run dev`
   - Run existing tests: `pnpm run test`

4. **Integration checks**
   - Verify Tailwind v4 continues working (no config changes needed)
   - Check Vue components render correctly
   - Confirm Biome formatting doesn't break anything
   - Run full test suite for regressions

### 4. Testing Strategy

**Success criteria:**
- `pnpm run dev` starts successfully without errors
- `pnpm run build` completes production build successfully
- All existing tests pass: `pnpm run test`
- `pnpm run lint:fix` runs without errors
- `pnpm run format` successfully formats all files
- No console errors in the running app
- Navigation between pages works correctly

**Rollback criteria:**
If any of these occur and cannot be quickly resolved:
- Dev server won't start
- Build breaks completely
- All tests fail
- Biome breaks existing code formatting

## Benefits

**Nuxt v4:**
- Performance improvements over Nuxt 3
- Better TypeScript support
- Future-proofing the project
- Access to latest Nuxt features and improvements

**Biome:**
- 10-100x faster than ESLint/Prettier combination
- Single tool replaces both linting and formatting needs
- Excellent TypeScript support out of the box
- Minimal configuration required
- Modern, actively maintained tooling

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Nuxt 4 breaking changes | Low | Medium | Simple project, minimal custom config, git commit for rollback |
| Biome format changes existing code | Low | Low | Can format incrementally, git diff to review changes |
| Dependency conflicts | Low | Medium | Check compatibility before upgrade, test thoroughly |
| TypeScript rule conflicts | Very Low | Low | Current TS usage is standard, Biome's rules are reasonable |

## Dependencies

Current key dependencies (to be updated):
- `nuxt`: ^3.15.0 → ^4.0.0
- `vue`: ^3.5.33 (compatible with v4)
- `vitest`: ^3.0.0 (compatible with v4)
- `typescript`: ^5.0.0 (compatible with v4)
- `@tailwindcss/vite`: ^4.0.0 (compatible with v4)

New dependency:
- `@biomejs/biome`: latest

## Success Metrics

- All existing functionality preserved
- Development workflow improved with faster linting/formatting
- Code quality improved with consistent formatting and linting rules
- No regression in test coverage or build process
- Developer experience enhanced with modern tooling
