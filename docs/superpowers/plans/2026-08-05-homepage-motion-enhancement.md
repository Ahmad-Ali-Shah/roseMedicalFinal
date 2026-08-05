# Homepage Motion Enhancement Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Repair the homepage mobile hero and add a faithful layer of professional, performant motion and visual depth across the existing homepage.

**Architecture:** Preserve the existing six React section components and the shared motion primitives. Add only small semantic/decorative hooks in homepage components, then implement the visual system in the existing public and F7 polish stylesheets. Protect the mobile composition with a real-browser bounding-box test and retain the existing component hierarchy tests.

**Tech Stack:** Next.js, React, TypeScript, Motion for React, Vitest, Playwright, CSS custom properties and media queries.

---

### Task 1: Protect the mobile hero composition

**Files:**
- Modify: `apps/web/tests/e2e/f7-homepage-polish.spec.ts`
- Modify: `apps/web/src/styles/public-pages.css`
- Modify: `apps/web/src/styles/f7-premium-polish.css`

**Step 1: Write the failing browser test**

Add a mobile-only test that opens `/`, reads the bounding boxes of `.home-hero__title` and `.home-hero__visual`, and asserts that they do not overlap. Also assert the visual follows the copy vertically and the document has no horizontal overflow.

**Step 2: Run the test to verify RED**

Run:

`corepack pnpm --filter @rosa/web exec playwright test tests/e2e/f7-homepage-polish.spec.ts --project=mobile --grep "mobile hero"`

Expected: FAIL because the current absolutely positioned visual intersects the hero heading.

**Step 3: Implement the responsive composition**

At the phone breakpoint, move `.home-hero__visual` into normal flow, give the hero grid an explicit vertical gap, reduce the visual stage height, normalize the copy spacing, and preserve full-width actions. Add narrow-screen overrides after the F7 tablet rules so the premium media minimum heights cannot reintroduce the overlap.

**Step 4: Run the test to verify GREEN**

Run the same Playwright command. Expected: PASS.

### Task 2: Add the homepage editorial signature

**Files:**
- Modify: `apps/web/src/test/f7-homepage-motion.test.tsx`
- Modify: `apps/web/src/features/homepage/sections/home-hero.tsx`
- Modify: `apps/web/src/features/homepage/sections/family-discovery.tsx`
- Modify: `apps/web/src/features/homepage/sections/procurement-support.tsx`
- Modify: `apps/web/src/features/homepage/sections/featured-instruments.tsx`
- Modify: `apps/web/src/features/homepage/sections/catalogue-access.tsx`
- Modify: `apps/web/src/features/homepage/sections/quotation-cta.tsx`
- Modify: `apps/web/src/styles/f7-premium-polish.css`

**Step 1: Write the failing component test**

Render the real `Homepage` and assert the public behavior of the signature: six sections expose ordered homepage indices, the hero stage exposes an accessible-neutral visual caption, and every decorative signature element is hidden from assistive technology. Keep assertions independent from implementation helpers.

**Step 2: Run the test to verify RED**

Run:

`corepack pnpm --filter @rosa/web test -- src/test/f7-homepage-motion.test.tsx`

Expected: FAIL because ordered section signatures and hero-stage caption do not yet exist.

**Step 3: Implement minimal semantic hooks**

Add static ordered `data-home-index` attributes to the six existing sections. Add an `aria-hidden` hero-stage caption containing a short index and material description. Do not change headings, copy, links, or section order.

**Step 4: Add faithful visual depth**

Style the section indices as fine editorial markers; strengthen the hero frame and metallic composition; give family/product grids a controlled perspective and focus/hover depth; refine the procurement axis, catalogue paper stack, and final CTA background. Use only opacity/transform/border/gradient transitions, with no new animation loop.

**Step 5: Run the focused tests to verify GREEN**

Run:

`corepack pnpm --filter @rosa/web test -- src/test/f7-homepage-motion.test.tsx`

Expected: PASS.

### Task 3: Verify restraint, accessibility, and production health

**Files:**
- Modify if required by a discovered regression: `apps/web/src/styles/f7-premium-polish.css`
- Modify if required by a discovered regression: `apps/web/tests/e2e/f7-responsive-restraint.spec.ts`

**Step 1: Run focused browser coverage**

Run:

`corepack pnpm --filter @rosa/web exec playwright test tests/e2e/f7-homepage-polish.spec.ts tests/e2e/f7-responsive-restraint.spec.ts --project=desktop --project=tablet --project=mobile`

Expected: PASS with no overflow, coarse-pointer effects disabled, and mobile hero geometry separated.

**Step 2: Run automated project checks**

Run:

- `corepack pnpm --filter @rosa/web test`
- `corepack pnpm --filter @rosa/web lint`
- `corepack pnpm --filter @rosa/web typecheck`
- `corepack pnpm --filter @rosa/web build`

Expected: all commands exit 0.

**Step 3: Perform visual verification**

Capture the homepage at 1440×1000, 768×1024, and 390×844. Inspect the hero fold and full page for overlap, clipping, content order, excessive density, and motion-only affordances. Correct only verified regressions and rerun affected checks.

**Step 4: Review the final diff**

Confirm that no dependency, route, copy, family/product link, or unrelated file changed. Confirm no placeholder TODO, permanent animation, or new asset was introduced.
