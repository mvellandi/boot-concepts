# Nuxt v4 + Biome Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Nuxt from v3.15.0 to v4.0.0 and configure Biome for unified linting and formatting.

**Architecture:** Straightforward dependency upgrade and tooling addition. Biome provides a single configuration file for both linting and formatting, replacing the need for separate ESLint and Prettier setups.

**Tech Stack:** Nuxt v4, Vue 3.5, TypeScript, Biome, pnpm, Vitest, Tailwind CSS v4

---

### Task 1: Create Backup Commit

**Files:**
- None (git operation)

- [ ] **Step 1: Check current git status**

Run: `git status`
Expected: Shows uncommitted changes or clean working directory

- [ ] **Step 2: Commit any uncommitted changes**

If there are uncommitted changes:
```bash
git add .
git commit -m "backup: save state before Nuxt v4 and Biome setup"
```
If working directory is clean, skip this step.

- [ ] **Step 3: Create backup commit**

Run: `git commit --allow-empty -m "backup: pre-upgrade checkpoint for Nuxt v4 + Biome setup"`
Expected: Empty commit created as rollback point

- [ ] **Step 4: Verify backup commit**

Run: `git log --oneline -1`
Expected: Shows the backup commit message

### Task 2: Update Nuxt Dependencies in package.json

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Read current package.json**

Run: `cat package.json`
Expected: Shows current dependencies including nuxt@^3.15.0

- [ ] **Step 2: Update nuxt dependency**

Edit `package.json`, change line 14:
```json
"nuxt": "^4.0.0"
```

- [ ] **Step 3: Verify the change**

Run: `grep '"nuxt":' package.json`
Expected: Shows `"nuxt": "^4.0.0"`

### Task 3: Add Biome to package.json

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add Biome to devDependencies**

Edit `package.json`, add to devDependencies section (after "vue-tsc"):
```json
"@biomejs/biome": "^1.9.4"
```

- [ ] **Step 2: Add linting and formatting scripts**

Edit `package.json`, modify scripts section (lines 5-11):
```json
"scripts": {
  "build": "nuxt build",
  "dev": "nuxt dev",
  "generate": "nuxt generate",
  "preview": "nuxt preview",
  "test": "vitest run",
  "test:watch": "vitest",
  "lint": "biome check .",
  "lint:fix": "biome check --write .",
  "format": "biome format --write .",
  "format:check": "biome format ."
}
```

- [ ] **Step 3: Verify changes**

Run: `cat package.json | grep -A 3 "scripts"`
Expected: Shows the new lint and format scripts

### Task 4: Create Biome Configuration

**Files:**
- Create: `biome.json`

- [ ] **Step 1: Create biome.json with full configuration**

Write to `biome.json`:
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

- [ ] **Step 2: Verify file was created**

Run: `cat biome.json`
Expected: Shows the complete Biome configuration

### Task 5: Update Nuxt Configuration

**Files:**
- Modify: `nuxt.config.ts`

- [ ] **Step 1: Read current nuxt.config.ts**

Run: `cat nuxt.config.ts`
Expected: Shows current config with compatibilityDate: '2024-11-01'

- [ ] **Step 2: Update compatibilityDate**

Edit `nuxt.config.ts`, change line 4:
```typescript
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  }
})
```

- [ ] **Step 3: Verify the change**

Run: `grep compatibilityDate nuxt.config.ts`
Expected: Shows `compatibilityDate: '2025-01-01'`

### Task 6: Install Dependencies

**Files:**
- None (pnpm operation)

- [ ] **Step 1: Install updated dependencies**

Run: `pnpm install`
Expected: Successful installation with no errors, shows packages being installed/upgraded

- [ ] **Step 2: Verify Nuxt version**

Run: `pnpm list nuxt`
Expected: Shows nuxt version 4.x.x

- [ ] **Step 3: Verify Biome installation**

Run: `pnpm list @biomejs/biome`
Expected: Shows @biomejs/biome version 1.9.4 or later

### Task 7: Format Existing Code with Biome

**Files:**
- All source files (auto-formatted)

- [ ] **Step 1: Check what files need formatting**

Run: `pnpm run format:check`
Expected: Lists files that are not formatted according to Biome rules

- [ ] **Step 2: Format all files**

Run: `pnpm run format`
Expected: Biome formats all files, shows number of files changed

- [ ] **Step 3: Verify formatting was applied**

Run: `git diff --stat`
Expected: Shows which files were modified by formatting

### Task 8: Test Dev Server

**Files:**
- None (testing)

- [ ] **Step 1: Start dev server**

Run: `pnpm run dev` (in background or new terminal)
Expected: Server starts successfully, shows "Nuxt development server is running on http://localhost:3000"

- [ ] **Step 2: Check for console errors**

Open http://localhost:3000 in browser, open DevTools console
Expected: No errors in console, page loads correctly

- [ ] **Step 3: Test navigation**

Navigate between home page and testimonials page
Expected: Both pages load without errors, components render correctly

- [ ] **Step 4: Stop dev server**

Press Ctrl+C in the terminal running the dev server
Expected: Server shuts down cleanly

### Task 9: Run Existing Tests

**Files:**
- None (testing)

- [ ] **Step 1: Run all tests**

Run: `pnpm run test`
Expected: All tests pass, shows success message

- [ ] **Step 2: Verify test output**

Check that no tests failed or were skipped
Expected: Test summary shows passing tests with no failures

- [ ] **Step 3: Run lint check**

Run: `pnpm run lint`
Expected: Biome check passes with no errors or warnings

### Task 10: Test Production Build

**Files:**
- None (testing)

- [ ] **Step 1: Build for production**

Run: `pnpm run build`
Expected: Build completes successfully, shows "Built in Xms" message

- [ ] **Step 2: Verify build output**

Run: `ls -la .output/`
Expected: Shows generated build files including server and client directories

- [ ] **Step 3: Preview production build**

Run: `pnpm run preview` (in background or new terminal)
Expected: Preview server starts on http://localhost:3000

- [ ] **Step 4: Test production build in browser**

Open http://localhost:3000 in browser
Expected: Pages load correctly, components render, no console errors

- [ ] **Step 5: Stop preview server**

Press Ctrl+C in the terminal running the preview server
Expected: Server shuts down cleanly

### Task 11: Commit All Changes

**Files:**
- All modified and new files

- [ ] **Step 1: Review all changes**

Run: `git status`
Expected: Shows modified package.json, nuxt.config.ts, and new biome.json, plus any formatted files

- [ ] **Step 2: Review diff of package.json**

Run: `git diff package.json`
Expected: Shows Nuxt upgrade, Biome addition, and new scripts

- [ ] **Step 3: Review diff of nuxt.config.ts**

Run: `git diff nuxt.config.ts`
Expected: Shows only the compatibilityDate change

- [ ] **Step 4: Review new biome.json**

Run: `cat biome.json`
Expected: Shows the complete Biome configuration

- [ ] **Step 5: Stage all changes**

Run: `git add .`
Expected: All changes are staged

- [ ] **Step 6: Commit the upgrade**

Run: `git commit -m "feat: upgrade to Nuxt v4 and configure Biome

- Upgrade Nuxt from v3.15.0 to v4.0.0
- Add Biome for unified linting and formatting
- Update compatibilityDate to 2025-01-01
- Add lint, lint:fix, format, and format:check scripts
- Format all existing code with Biome

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"`
Expected: Commit is created successfully

- [ ] **Step 7: Verify commit**

Run: `git log --oneline -1`
Expected: Shows the upgrade commit message

- [ ] **Step 8: View commit details**

Run: `git show --stat HEAD`
Expected: Shows all files that were changed in the commit

### Task 12: Final Verification

**Files:**
- None (verification)

- [ ] **Step 1: Verify clean working directory**

Run: `git status`
Expected: Shows "nothing to commit, working tree clean"

- [ ] **Step 2: Check that all scripts work**

Run: `pnpm run lint && pnpm run format:check`
Expected: Both commands complete successfully with no errors

- [ ] **Step 3: Confirm Biome CLI is available**

Run: `pnpm exec biome --version`
Expected: Shows Biome version number

- [ ] **Step 4: Verify Nuxt version**

Run: `pnpm exec nuxi info`
Expected: Shows Nuxt 4.x.x information

---

## Success Criteria

- [ ] All tasks completed without errors
- [ ] Dev server starts and pages load correctly
- [ ] All tests pass
- [ ] Production build completes successfully
- [ ] Biome formatting and linting work correctly
- [ ] No regressions in existing functionality
- [ ] Clean git commit with all changes

## Rollback Plan

If critical issues are encountered after Task 11:
```bash
git reset --hard <backup-commit-hash>
pnpm install
```

This will restore the project to its pre-upgrade state.
