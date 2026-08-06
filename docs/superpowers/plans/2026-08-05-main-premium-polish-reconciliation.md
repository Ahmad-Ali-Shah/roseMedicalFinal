# Main–Premium Polish Reconciliation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve every approved and implemented `frontend/premium-visual-polish` visual, motion, transition and responsive-restraint feature inside a new branch based on the current authoritative `main`, without replacing newer catalogue, inquiry, authentication, API, Supabase, deployment or security work.

**Architecture:** Git ancestry establishes `frontend/premium-visual-polish` as an ancestor of `main`, so this is a forensic reconciliation rather than a file-level two-way merge. The implementation branch starts from `main`; unchanged premium-owned files are preserved by ancestry, later-modified premium files are audited individually, and one integration-level static contract locks the complete premium feature surface against future regressions. No backend or shared-contract source is rewritten.

**Tech Stack:** Git/GitHub branch comparison, Next.js 16 App Router, React 19, Motion for React, strict TypeScript, CSS custom properties, Tailwind 4 pipeline, Node test runner, Vitest and Playwright.

## Global Constraints

- Authoritative baseline: current `main` at branch creation.
- Historical source branch: `frontend/premium-visual-polish` at `8707648430c2d7d9c696c27091138aaa915fb0b0`.
- Historical `lived` branch at `4fec4fa534fc318ac8770dbad0e3287ea1b3e589` contributes no unique commits and must never replace `main` files.
- Integration branch: `integration/main-premium-polish-reconciliation`.
- Preserve all current `main` behavior unless an exact premium feature is demonstrably missing or regressed.
- Do not modify `services/api/**`.
- Do not modify OpenAPI source operations or shared contract shapes.
- Do not replace current catalogue registries, catalogue media mappings, quotation payloads, authentication/session handling, Supabase boundaries, Cloudflare/OpenNext configuration or package versions with historical variants.
- Preserve the approved F7 motion language: **Editorial luxury with selective cinematic moments.**
- Preserve the Rosa-owned primitives: `MotionProvider`, `Reveal`, `Stagger`, `StaggerItem`, `TextReveal`, `Magnetic`, `TiltSurface`, `SpotlightSurface`, `ProgressiveBlur`, `MediaFrame`, `ScrollHeaderController` and `RouteTransition`.
- Preserve reduced-motion, coarse-pointer, touch, hydration and no-layout-shift protections.
- Preserve current Next.js `Image` integrations and current catalogue binaries.
- No GSAP, Three.js, Lenis, WebGL canvas or additional animation package.
- No broad formatting, data rewrites or unrelated cleanup.
- Keep commits meaningful and minimize GitHub Actions usage.

---

### Task 1: Freeze lineage and branch-dominance evidence

**Files:**
- Create: `docs/superpowers/audits/2026-08-05-main-premium-polish-reconciliation.md`

**Interfaces:**
- Consumes: GitHub comparisons `lived...frontend/premium-visual-polish`, `frontend/premium-visual-polish...main`, and the current branch tips.
- Produces: an immutable audit record explaining why `main` is the dominant tree and why no historical overwrite is permitted.

- [ ] **Step 1: Record exact refs and ancestry**

Record:

```text
lived:                           4fec4fa534fc318ac8770dbad0e3287ea1b3e589
frontend/premium-visual-polish: 8707648430c2d7d9c696c27091138aaa915fb0b0
main at branch creation:         74a81545fcd861d99d5f2ab81aaa4c890e40d4cd
```

Record the verified relationships:

```text
lived -> premium: premium is 258 ahead and 0 behind
premium -> main: main is 100 ahead and 0 behind
lived -> main: main is 358 ahead and 0 behind
```

- [ ] **Step 2: State the merge consequence**

Document that a normal merge or wholesale checkout from `lived`/premium would be either a no-op or a regression. The integration tree must therefore remain based on `main`, with only demonstrably missing premium behavior restored.

- [ ] **Step 3: Record protected boundaries**

Explicitly mark `services/api/**`, `packages/contracts/openapi/**`, generated contract semantics, authentication/session behavior, quotation persistence, catalogue registries and deployment configuration as preserved from `main`.

- [ ] **Step 4: Commit the lineage audit together with the complete reconciliation matrix in Task 2**

Commit after Task 2 so ancestry and feature evidence remain one reviewable document.

---

### Task 2: Build the complete premium-feature preservation matrix

**Files:**
- Create: `docs/superpowers/audits/2026-08-05-main-premium-polish-reconciliation.md`

**Interfaces:**
- Consumes: the approved design `docs/superpowers/specs/2026-08-03-premium-visual-polish-design.md`, implementation plan `docs/superpowers/plans/2026-08-03-premium-visual-polish.md`, premium commit history, `frontend/premium-visual-polish...main` changed-file set, current `main` source and existing F7 tests.
- Produces: one row per premium capability classified as `preserved unchanged`, `preserved and improved`, `superseded safely`, `missing`, or `out of scope`.

- [ ] **Step 1: Inventory motion foundation**

Audit and record:

```text
apps/web/src/features/motion/motion-provider.tsx
apps/web/src/features/motion/motion.config.ts
apps/web/src/features/motion/types.ts
apps/web/src/features/motion/reveal.tsx
apps/web/src/features/motion/stagger.tsx
apps/web/src/features/motion/text-reveal.tsx
apps/web/src/features/motion/magnetic.tsx
apps/web/src/features/motion/tilt-surface.tsx
apps/web/src/features/motion/spotlight-surface.tsx
apps/web/src/features/motion/progressive-blur.tsx
apps/web/src/features/motion/media-frame.tsx
apps/web/src/features/motion/scroll-header-controller.tsx
apps/web/src/features/motion/route-transition.tsx
apps/web/src/features/motion/index.ts
```

For each file, compare the premium implementation to `main`. Record later changes to `Reveal`, `Stagger`, `TextReveal` and `RouteTransition` as deterministic hydration/reduced-motion improvements; record `MediaFrame` as improved through `next/image`; record pointer surfaces as preserved.

- [ ] **Step 2: Inventory global interaction styling**

Audit and record:

```text
apps/web/src/styles/f7-premium-polish.css
apps/web/src/styles/f7-product-polish.css
apps/web/src/styles/f7-story-polish.css
apps/web/src/styles/f7-conversion-polish.css
apps/web/src/styles/f7-reduced-motion-closeout.css
apps/web/src/styles/tokens.css
apps/web/src/app/globals.css
```

Confirm the premium stylesheet remains the final import, timing/easing variables remain available, coarse-pointer rules remove pointer transforms, reduced motion forces visible settled content, and no later catalogue stylesheet removes premium selectors.

- [ ] **Step 3: Inventory global shell behavior**

Audit and record:

```text
apps/web/src/app/layout.tsx
apps/web/src/components/layout/public-shell.tsx
apps/web/src/components/layout/mobile-navigation.tsx
apps/web/src/components/ui/button.tsx
```

Confirm root `MotionProvider`, compressing header, transparent home-header state, stable header/footer with route-only transitions, full-height mobile curtain, Escape close, focus return, body-scroll containment, stable accessible button labels, underline movement and press feedback.

- [ ] **Step 4: Inventory homepage choreography**

Audit and record:

```text
apps/web/src/features/homepage/sections/home-hero.tsx
apps/web/src/features/homepage/sections/family-discovery.tsx
apps/web/src/features/homepage/sections/procurement-support.tsx
apps/web/src/features/homepage/sections/featured-instruments.tsx
apps/web/src/features/homepage/sections/catalogue-access.tsx
apps/web/src/features/homepage/sections/quotation-cta.tsx
apps/web/src/features/public-catalogue/section-heading.tsx
apps/web/src/features/public-catalogue/family-card.tsx
apps/web/src/features/public-catalogue/product-preview-card.tsx
apps/web/src/features/public-catalogue/procurement-panel.tsx
```

Confirm eyebrow/title/copy/action/media sequencing, magnetic CTAs, masked text reveal, spotlight and low-amplitude tilt, staggered family/product cards, procurement opposing reveals and process line, catalogue paper-stack lift, progressive edge blur and one restrained final-CTA border trail.

- [ ] **Step 5: Inventory products and detail journeys**

Audit and record:

```text
apps/web/src/features/products/sections/products-hero.tsx
apps/web/src/features/products/sections/family-index.tsx
apps/web/src/features/products/sections/product-preview-grid.tsx
apps/web/src/features/family-listing/family-hero.tsx
apps/web/src/features/family-listing/family-product-card.tsx
apps/web/src/features/family-listing/family-product-grid.tsx
apps/web/src/features/product-detail/product-detail-page.tsx
apps/web/src/features/product-detail/product-gallery.tsx
apps/web/src/features/product-detail/product-procurement-summary.tsx
apps/web/src/features/product-detail/related-product-grid.tsx
apps/web/src/features/product-detail/mobile-inquiry-bar.tsx
apps/web/src/features/inquiry/add-to-inquiry-button.tsx
```

Confirm title reveals, row-order stagger, restrained product depth, product-code stability, gallery/summary entrance order, Add-to-inquiry state morph, mobile action behavior and current catalogue-media paths. Classify later catalogue-media wiring as a safe improvement.

- [ ] **Step 6: Inventory story, utility and conversion pages**

Audit and record:

```text
apps/web/src/features/about/about-page.tsx
apps/web/src/features/about/buyer-expectations.tsx
apps/web/src/features/about/supported-buyers.tsx
apps/web/src/features/about/scissors-evolution.tsx
apps/web/src/features/procurement-support/**
apps/web/src/features/catalogues/**
apps/web/src/features/contact-preview/**
apps/web/src/features/legal-pages/**
apps/web/src/features/inquiry/inquiry-page.tsx
apps/web/src/features/inquiry/quotation-page.tsx
```

Confirm media-ready story framing, calm legal motion, staggered lists, contact focus lines, inquiry layout animation, smooth removal, quantity/summary transitions, sticky summaries, fieldset-level form reveal, pending-label morph and restrained success state. Classify `ScissorsEvolution` as a later additive improvement.

- [ ] **Step 7: Inventory verification coverage**

Record the existing unit/static/browser files covering F7 configuration, primitives, surfaces, shell, homepage, products, story pages, conversion, motion restraint, reduced motion and responsive behavior.

Record successful run `30853574029` at `98eae790d6ee271721c3e5bc42c3351798aa4b28`:

```text
4/4 F7 stylesheet checks passed
lint passed
75 Vitest files passed
344 Vitest tests passed
strict TypeScript passed
production build passed
58 Playwright tests passed
2 intentional Playwright skips
0 Playwright failures
```

Record that the 24 commits from that verified checkpoint to current `main` changed only CI, tests, route manifests and completion documentation; no premium runtime source changed.

- [ ] **Step 8: Commit audit**

```bash
git add docs/superpowers/audits/2026-08-05-main-premium-polish-reconciliation.md
git commit -m "docs: audit premium polish preservation on main"
```

---

### Task 3: Add one integration-level premium preservation gate

**Files:**
- Create: `apps/web/src/test/f7-premium-reconciliation.static.test.mjs`

**Interfaces:**
- Consumes: current source files and CSS imports only.
- Produces: a fast Node test included automatically by `pnpm --filter @rosa/web test:foundation`.

- [ ] **Step 1: Create the static test**

Create the file with this structure:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

function assertContains(source, values) {
  for (const value of values) assert.match(source, new RegExp(value));
}

test("reconciliation preserves the complete Rosa motion boundary", async () => {
  const [layout, index, globals, reduced, mediaFrame] = await Promise.all([
    read("app/layout.tsx"),
    read("features/motion/index.ts"),
    read("app/globals.css"),
    read("styles/f7-reduced-motion-closeout.css"),
    read("features/motion/media-frame.tsx")
  ]);

  assert.match(layout, /MotionProvider/);
  assertContains(index, [
    "motion-provider", "reveal", "stagger", "text-reveal", "magnetic",
    "tilt-surface", "spotlight-surface", "progressive-blur", "media-frame",
    "scroll-header-controller", "route-transition"
  ]);
  assert.equal(
    globals.trim().endsWith('@import "../styles/f7-premium-polish.css";'),
    true
  );
  assertContains(reduced, ["opacity:\\s*1", "filter:\\s*none", "transform:\\s*none"]);
  assert.match(mediaFrame, /from "next\/image"/);
});
```

Add separate tests for the shell, homepage, product journey, story pages and conversion flow. Each test must assert exact imports or stable class/data markers already present in source; it must not duplicate behavioral tests already covered by Vitest and Playwright.

- [ ] **Step 2: Run the focused gate**

Run:

```bash
node --test apps/web/src/test/f7-premium-reconciliation.static.test.mjs
```

Expected: all reconciliation tests pass.

- [ ] **Step 3: Run the complete static foundation suite**

Run:

```bash
pnpm --filter @rosa/web test:foundation
```

Expected: every `*.static.test.mjs` file passes.

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/test/f7-premium-reconciliation.static.test.mjs
git commit -m "test: lock premium polish reconciliation"
```

---

### Task 4: Apply only evidence-backed runtime repairs

**Files:**
- Modify only files classified `missing` or `partially regressed` in the audit.
- Do not modify a file classified `preserved`, `improved`, or `superseded safely`.

**Interfaces:**
- Consumes: the completed matrix and failing reconciliation gate.
- Produces: the smallest possible frontend-only repair set.

- [ ] **Step 1: Check the matrix for missing runtime behavior**

If every premium capability is `preserved` or `improved`, record **no runtime repair required** and make no source edit.

- [ ] **Step 2: For any failure, write a focused failing test before editing source**

Use the nearest existing F7 unit/static/browser test. Do not create a page-specific workaround when a shared primitive owns the behavior.

- [ ] **Step 3: Implement the minimal repair**

Preserve current data, API, auth, media and deployment boundaries. Restore only the exact missing premium wrapper, selector, data marker or motion primitive usage.

- [ ] **Step 4: Run focused tests**

Run the new failing test plus its existing F7 domain suite.

- [ ] **Step 5: Commit each independently reviewable repair**

Use one meaningful commit per rejected/accepted repair group. If no runtime repair is required, do not create an empty commit.

---

### Task 5: Record completion and coordination state

**Files:**
- Create: `docs/superpowers/completions/2026-08-05-main-premium-polish-reconciliation.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: final audit matrix, branch diff and verification evidence.
- Produces: a durable handoff showing exactly what was preserved, changed and not changed.

- [ ] **Step 1: Write the completion record**

Include:

- exact branch tips and ancestry;
- why the result is `main`-dominant;
- premium feature domains and classifications;
- every runtime file changed, or the explicit statement that no runtime repair was required;
- the added reconciliation test;
- exact verification commands and outcomes;
- known pre-existing failures not caused by this branch;
- confirmation that `services/api/**`, OpenAPI source and shared contract semantics were untouched.

- [ ] **Step 2: Append one concise README coordination message**

Use the required format:

```md
### 2026-08-05 — Frontend AI → Backend AI

- Branch: `integration/main-premium-polish-reconciliation`
- Completed: Main-dominant reconciliation proving the complete premium F7 motion and presentation system remains integrated.
- Changed shared files/contracts: None. No `services/api/**` or OpenAPI source changes.
- Verification run and result: <exact results>
- Ready integration gate: Frontend visual-preservation review.
- Blockers: <exact blockers or None>
- Decision or response needed: None unless backend-owned files are proposed later.
```

- [ ] **Step 3: Commit**

```bash
git add README.md docs/superpowers/completions/2026-08-05-main-premium-polish-reconciliation.md
git commit -m "docs: complete main premium polish reconciliation"
```

---

### Task 6: Final verification and branch audit

**Files:**
- No planned source changes.

**Interfaces:**
- Consumes: complete integration branch.
- Produces: final evidence that the branch preserves `main` and premium behavior.

- [ ] **Step 1: Verify branch scope**

Compare `main...integration/main-premium-polish-reconciliation` and confirm changes are limited to:

```text
apps/web/src/test/f7-premium-reconciliation.static.test.mjs
docs/superpowers/plans/2026-08-05-main-premium-polish-reconciliation.md
docs/superpowers/audits/2026-08-05-main-premium-polish-reconciliation.md
docs/superpowers/completions/2026-08-05-main-premium-polish-reconciliation.md
README.md
```

plus any explicitly justified runtime repairs from Task 4.

- [ ] **Step 2: Run deterministic checks**

```bash
pnpm install --frozen-lockfile
pnpm --filter @rosa/web test:foundation
pnpm --filter @rosa/web lint
pnpm --filter @rosa/web test
pnpm --filter @rosa/web typecheck
pnpm --filter @rosa/web build
```

- [ ] **Step 3: Run the premium browser matrix**

```bash
pnpm --filter @rosa/web exec playwright test \
  tests/e2e/f7-public-shell.spec.ts \
  tests/e2e/f7-homepage-polish.spec.ts \
  tests/e2e/f7-product-polish.spec.ts \
  tests/e2e/f7-story-pages.spec.ts \
  tests/e2e/f7-conversion-polish.spec.ts \
  tests/e2e/f7-reduced-motion.spec.ts \
  tests/e2e/f7-responsive-restraint.spec.ts
```

- [ ] **Step 4: Recompare against both source refs**

Confirm:

- every premium-owned runtime file exists in the integration branch;
- every premium file not changed after `8707648` remains byte-preserved through ancestry;
- each later-changed premium file is documented as an improvement or justified repair;
- no `lived` file overwrote a newer `main` file;
- no backend or shared-contract source changed.

- [ ] **Step 5: Update the completion record with exact final counts**

Do not claim a command passed unless its output was observed. Distinguish prior successful run evidence from fresh branch verification.

## Self-review result

- Spec coverage: all approved premium design sections are mapped to Tasks 2–4.
- Placeholder scan: no implementation placeholder remains; conditional runtime repair is explicitly evidence-gated.
- Type consistency: the plan preserves existing component names and interfaces without inventing replacements.
