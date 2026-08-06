# Rosa Medical Final Production Closeout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish the remaining Rosa Medical frontend work by correcting reduced-motion hydration defects, integrating approved catalogue media without importing stale branch history, completing Punches media, replacing cinematic placeholders, restoring the approved scissors-evolution section, and shipping one verified production release.

**Architecture:** Begin from `frontend/premium-visual-polish`, because it is cleanly ahead of current `main` and contains the complete F7 polish implementation. Fix the shared motion layer first, then selectively import only the production-media files from the diverged catalogue branch rather than merging that branch wholesale. Add Punches through the existing catalogue-media boundary, wire non-product images through one typed media manifest, and finish with a complete browser, build, security, and deployment pass.

**Tech Stack:** Next.js 16.2.11, React 19.2, TypeScript 5.9, Motion 12.42.2, Vitest 3.2, Playwright 1.57, Python/Pillow image normalization, AVIF/WebP assets, Supabase, OpenNext/Cloudflare.

## Global Constraints

- Preserve the approved Rosa page structure, typography, colour system, quotation flow, and medical-procurement positioning.
- Do not add ecommerce, prices, checkout, payments, orders, inventory, shipping, discounts, ratings, or customer self-service features.
- Do not expand backend architecture, Supabase schema, OpenAPI contracts, or publishing behavior during this closeout.
- The supplied catalogues remain authoritative for product name, code, size, direction, finish, jaw, tip, angle, and visible configuration grouping.
- Size-only variants may share media; visibly different configurations must not share media.
- Do not use third-party runtime image hotlinks. Production output must reference local optimized assets or the later approved Supabase Storage location.
- Do not merge `preview/knives-image-batch-01` wholesale. It is heavily diverged from `main`; import only an explicit allowlist of production-media files.
- Reduced-motion users must receive fully visible, static content without hydration warnings, stagger delays, blur, transform, parallax, magnetic response, or tilt.
- Keep GitHub Actions usage minimal. Run locally first; use one temporary workflow only when local execution is genuinely unavailable.
- No unverified manufacturing, certification, historical-company, hospital, logistics, or regulatory claims.

## Current Baseline

- Current `main`: `729e45b705fa34e45cb3510bf40a43d813d3f401`.
- `frontend/premium-visual-polish` is 128 commits ahead and 0 behind `main`.
- F7 verification currently has 25 Playwright tests passing, 3 reduced-motion tests failing, and 2 intentionally skipped.
- Lint, 265 Vitest tests, strict TypeScript, and the production build passed in the latest checkpoint.
- `preview/knives-image-batch-01` contains the stacked Scissors, Chisels, Cutters, and Knives production-media work, but is 144 commits ahead and 151 behind `main`.
- No Punches production-media branch exists.
- Required non-product slots still render placeholders, including `homepage-hero`, `homepage-procurement`, five homepage catalogue covers, `about-hero`, and `about-procurement`.
- The About page does not currently render the previously approved scissors-evolution timeline.

---

### Task 1: Establish the Clean Closeout Branch and Reproduce the Baseline

**Files:**
- Reference: `docs/superpowers/specs/2026-08-03-premium-visual-polish-design.md`
- Reference: `docs/superpowers/specs/2026-08-02-production-catalogue-image-system-design.md`
- Reference: `docs/superpowers/plans/2026-08-04-final-production-closeout.md`

**Interfaces:**
- Consumes: `origin/frontend/premium-visual-polish` and current `origin/main`.
- Produces: `integration/final-production-closeout`, the only implementation branch used for this plan.

- [ ] **Step 1: Create the integration branch from the premium branch**

```bash
git fetch origin --prune
git switch -c integration/final-production-closeout origin/frontend/premium-visual-polish
```

- [ ] **Step 2: Confirm that current main is already contained in the branch**

```bash
git merge-base --is-ancestor origin/main HEAD
echo $?
```

Expected: `0`.

- [ ] **Step 3: Install the locked workspace dependencies**

```bash
corepack enable
pnpm install --frozen-lockfile
```

- [ ] **Step 4: Reproduce the reduced-motion failure only**

```bash
pnpm --filter @rosa/web exec playwright test tests/e2e/f7-reduced-motion.spec.ts
```

Expected before the fix: failures showing `.text-reveal__segment` or another `[data-motion]` element retaining `blur(...)` or a transform under `prefers-reduced-motion: reduce`.

- [ ] **Step 5: Record the untouched baseline**

```bash
git status --short
git rev-parse HEAD
git log -1 --oneline
```

Expected: clean worktree before implementation.

---

### Task 2: Make the Motion Layer Hydration-Stable and Reduced-Motion Safe

**Files:**
- Modify: `apps/web/src/features/motion/motion-provider.tsx`
- Modify: `apps/web/src/features/motion/reveal.tsx`
- Modify: `apps/web/src/features/motion/stagger.tsx`
- Modify: `apps/web/src/features/motion/text-reveal.tsx`
- Modify: `apps/web/src/features/motion/route-transition.tsx`
- Modify: `apps/web/src/features/motion/magnetic.tsx`
- Modify: `apps/web/src/features/motion/tilt-surface.tsx`
- Modify: `apps/web/src/styles/f7-premium-polish.css`
- Test: `apps/web/src/test/f7-motion-primitives.test.tsx`
- Test: `apps/web/src/test/f7-motion-restraint.test.ts`
- Test: `apps/web/tests/e2e/f7-reduced-motion.spec.ts`

**Interfaces:**
- Consumes: existing `MOTION_DURATION`, `MOTION_EASING`, and `MOTION_DISTANCE` constants.
- Produces: stable server/client markup for every shared motion primitive and static computed styles under reduced motion.

- [ ] **Step 1: Add a browser assertion for hydration warnings**

Add this helper to `f7-reduced-motion.spec.ts` and call it before navigation:

```ts
function collectHydrationErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      /hydrated|hydration|server rendered html/i.test(message.text())
    ) {
      errors.push(message.text());
    }
  });
  return errors;
}
```

At the end of each reduced-motion journey:

```ts
expect(hydrationErrors).toEqual([]);
```

- [ ] **Step 2: Tighten the settled-style predicate**

Keep the requirement that all reduced-motion elements compute to:

```ts
{
  opacity: "1",
  filter: "none",
  transform: "none"
}
```

Do not weaken the test to accept `blur(0px)`; the production implementation should remove the filter entirely.

- [ ] **Step 3: Centralize user motion preference in `MotionProvider`**

Use one stable provider configuration:

```tsx
"use client";

import type { PropsWithChildren, ReactElement } from "react";
import { MotionConfig } from "motion/react";

export function MotionProvider({ children }: PropsWithChildren): ReactElement {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
```

- [ ] **Step 4: Remove render-time `useReducedMotion()` branches from shared markup**

`Reveal`, `StaggerItem`, `TextReveal`, and `RouteTransition` must render the same attributes and variant names on the server and first client render. Do not choose `initial`, inline `style`, or child structure from `useReducedMotion()`.

Use stable props such as:

```tsx
initial="hidden"
whileInView="visible"
viewport={{ once: true, amount: 0.18 }}
```

- [ ] **Step 5: Remove zero-strength filters from visible variants**

Across the motion primitives, change visible variants from:

```ts
filter: "blur(0px)"
```

To:

```ts
filter: "none"
```

- [ ] **Step 6: Add the global reduced-motion override**

Add to `f7-premium-polish.css`:

```css
@media (prefers-reduced-motion: reduce) {
  [data-motion],
  .text-reveal__segment {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    filter: none !important;
    transform: none !important;
  }
}
```

Keep existing touch/coarse-pointer overrides.

- [ ] **Step 7: Keep pointer effects behavior-only under reduced motion**

`Magnetic` and `TiltSurface` may read the user preference to suppress pointer calculations and event updates, but they must not emit different initial markup or different initial inline styles between SSR and hydration.

- [ ] **Step 8: Run focused unit and browser tests**

```bash
pnpm --filter @rosa/web test -- src/test/f7-motion-primitives.test.tsx src/test/f7-motion-restraint.test.ts
pnpm --filter @rosa/web exec playwright test tests/e2e/f7-reduced-motion.spec.ts
```

Expected: no failed test, no hydration warning, and all computed reduced-motion styles settled.

- [ ] **Step 9: Commit the motion fix**

```bash
git add apps/web/src/features/motion apps/web/src/styles/f7-premium-polish.css apps/web/src/test/f7-motion-primitives.test.tsx apps/web/src/test/f7-motion-restraint.test.ts apps/web/tests/e2e/f7-reduced-motion.spec.ts
git commit -m "fix: settle reduced motion without hydration drift"
```

---

### Task 3: Remove the Remaining F7 Warning and Close the Polish Checkpoint

**Files:**
- Modify: `apps/web/src/features/motion/media-frame.tsx`
- Modify: `apps/web/src/styles/f7-premium-polish.css`
- Modify: all `MediaFrame` call sites that need explicit responsive sizes
- Test: `apps/web/src/test/f7-motion-surfaces.test.tsx`
- Delete: `.github/workflows/temporary-f7-checkpoint.yml`

**Interfaces:**
- Consumes: local public media paths and focal-point strings.
- Produces: optimized responsive media rendering without the `@next/next/no-img-element` warning.

- [ ] **Step 1: Extend `MediaFrame` with responsive sizing**

Add:

```ts
sizes?: string;
```

Default it to:

```ts
sizes = "(max-width: 768px) 100vw, 50vw"
```

- [ ] **Step 2: Replace the raw `<img>` with Next Image**

```tsx
import Image from "next/image";

<Image
  className="media-frame__image"
  src={src}
  alt={alt}
  fill
  sizes={sizes}
  priority={loading === "eager"}
  style={{ objectPosition: focalPoint }}
/>
```

Keep the placeholder branch unchanged.

- [ ] **Step 3: Ensure the frame reserves layout space**

The media container must remain `position: relative`, and `.media-frame__image` must use `object-fit: cover` without changing existing aspect-ratio rules.

- [ ] **Step 4: Update the surface test**

Assert that a ready `MediaFrame` renders a Next image with the supplied `src`, `alt`, `sizes`, and focal point, while a missing `src` retains the accessible placeholder state.

- [ ] **Step 5: Run the complete F7 verification matrix**

```bash
node --test apps/web/src/test/f7-premium-styles.static.test.mjs
pnpm --filter @rosa/web lint
pnpm --filter @rosa/web test
pnpm --filter @rosa/web typecheck
pnpm --filter @rosa/web build
pnpm --filter @rosa/web exec playwright test \
  tests/e2e/f7-public-shell.spec.ts \
  tests/e2e/f7-homepage-polish.spec.ts \
  tests/e2e/f7-product-polish.spec.ts \
  tests/e2e/f7-story-pages.spec.ts \
  tests/e2e/f7-conversion-polish.spec.ts \
  tests/e2e/f7-reduced-motion.spec.ts \
  tests/e2e/f7-responsive-restraint.spec.ts
```

Expected: no failures; the two existing intentional skips may remain only when their documented conditions still apply.

- [ ] **Step 6: Remove the temporary workflow after local success**

```bash
git rm .github/workflows/temporary-f7-checkpoint.yml
```

- [ ] **Step 7: Commit the F7 closeout**

```bash
git add apps/web/src/features/motion/media-frame.tsx apps/web/src/styles/f7-premium-polish.css apps/web/src/test/f7-motion-surfaces.test.tsx .github/workflows/temporary-f7-checkpoint.yml
git commit -m "chore: close premium polish checkpoint"
```

---

### Task 4: Selectively Import the Existing Catalogue-Media System

**Files imported from `origin/preview/knives-image-batch-01`:**
- Import: `apps/web/public/media/catalogue-preview/scissors/**`
- Import: `apps/web/public/media/catalogue-preview/chisels/**`
- Import: `apps/web/public/media/catalogue-preview/cutters/**`
- Import: `apps/web/public/media/catalogue-preview/knives/**`
- Import: `apps/web/scripts/catalogue_media_normalize.py`
- Import: `apps/web/scripts/prepare_scissors_wave2.py`
- Import: `apps/web/scripts/prepare_scissors_wave3.py`
- Import: `apps/web/scripts/prepare_chisels_batch1.py`
- Import: `apps/web/scripts/prepare_cutters_batch1.py`
- Import: `apps/web/scripts/prepare_knives_batch1.py`
- Import: `apps/web/scripts/requirements-catalogue-media.txt`
- Import: `apps/web/src/features/catalogue-media/**`
- Import: `apps/web/src/features/catalogue-registry/products/scissors-batch-01.ts`
- Import: `apps/web/src/features/catalogue-registry/products/chisels-batch-01.ts`
- Import: `apps/web/src/features/catalogue-registry/products/cutters-batch-01.ts`
- Import: `apps/web/src/features/catalogue-registry/products/knives-batch-01.ts`
- Import: family-specific inventory, media, preview, approval, and E2E tests
- Import: `docs/review/catalogue-media/**`
- Import: existing catalogue-media completion documents

**Files manually reconciled, never overwritten wholesale:**
- Modify: `apps/web/src/features/catalogue-registry/products/scissors.ts`
- Modify: `apps/web/src/features/catalogue-registry/products/chisels.ts`
- Modify: `apps/web/src/features/catalogue-registry/products/cutters.ts`
- Modify: `apps/web/src/features/catalogue-registry/products/knives.ts`
- Modify: `apps/web/src/features/catalogue-registry/types.ts`
- Modify: `apps/web/src/features/family-listing/family-product-card.tsx`
- Modify: `apps/web/src/features/product-detail/product-gallery.tsx`
- Modify: `apps/web/src/features/public-catalogue/product-media-placeholder.tsx`
- Modify only when required: `apps/web/src/test/catalogue-registry.test.ts`
- Modify only when required: `apps/web/src/test/admin-media.test.tsx`

**Explicit denylist:**
- Do not import the old branch versions of `README.md`, `apps/web/src/middleware.ts`, `apps/web/src/app/globals.css`, `apps/web/vitest.config.ts`, `pnpm-lock.yaml`, or unrelated route/page files.

**Interfaces:**
- Consumes: `CatalogueProduct.media`, the existing catalogue registry, and premium motion wrappers.
- Produces: four locally hosted, normalized, code-accurate product-image families inside the current application.

- [ ] **Step 1: Fetch the source branch without merging it**

```bash
git fetch origin preview/knives-image-batch-01
```

- [ ] **Step 2: Import only the allowlisted new directories and files**

Use `git checkout origin/preview/knives-image-batch-01 -- <exact-path>` for files that do not exist on the integration branch.

- [ ] **Step 3: Reconcile overlapping application files manually**

For every overlapping file, preserve the premium branch component composition and add only the media lookup, grouped variants, types, or rendering behavior required by the image system.

- [ ] **Step 4: Confirm no denylisted stale file was changed**

```bash
git diff --name-only origin/frontend/premium-visual-polish...HEAD
```

Review the output before committing.

- [ ] **Step 5: Run the catalogue structure tests**

```bash
pnpm --filter @rosa/web test -- \
  src/test/catalogue-registry.test.ts \
  src/test/scissors-batch-01-inventory.test.ts \
  src/test/scissors-batch-01-media.test.ts \
  src/test/chisels-batch-01-inventory.test.ts \
  src/test/chisels-batch-01-media.test.ts \
  src/test/cutters-batch-01-inventory.test.ts \
  src/test/cutters-batch-01-media.test.ts \
  src/test/knives-batch-01-inventory.test.ts \
  src/test/knives-batch-01-media.test.ts
```

- [ ] **Step 6: Commit the clean media-system import**

```bash
git add apps/web/public/media/catalogue-preview apps/web/scripts apps/web/src/features/catalogue-media apps/web/src/features/catalogue-registry apps/web/src/features/family-listing/family-product-card.tsx apps/web/src/features/product-detail/product-gallery.tsx apps/web/src/features/public-catalogue/product-media-placeholder.tsx apps/web/src/test apps/web/tests/e2e docs/review docs/superpowers/completions
git commit -m "feat: integrate approved catalogue media batches"
```

---

### Task 5: Verify and Close Scissors, Chisels, Cutters, and Knives

**Files:**
- Test: `apps/web/tests/e2e/scissors-image-batch-01.spec.ts`
- Test: `apps/web/tests/e2e/chisels-image-batch-01.spec.ts`
- Test: `apps/web/tests/e2e/cutters-image-batch-01.spec.ts`
- Test: `apps/web/tests/e2e/knives-image-batch-01.spec.ts`
- Create when absent: `apps/web/src/test/knives-batch-01-approval.test.ts`
- Create when absent: `docs/superpowers/completions/2026-08-04-cutters-batch-01-production-media.md`
- Create when absent: `docs/superpowers/completions/2026-08-04-knives-batch-01-production-media.md`

**Interfaces:**
- Consumes: four imported media registries and exact catalogue-code groupings.
- Produces: four release-approved families with automated inventory, media, preview, and browser coverage.

- [ ] **Step 1: Run each family independently**

```bash
pnpm --filter @rosa/web exec playwright test tests/e2e/scissors-image-batch-01.spec.ts
pnpm --filter @rosa/web exec playwright test tests/e2e/chisels-image-batch-01.spec.ts
pnpm --filter @rosa/web exec playwright test tests/e2e/cutters-image-batch-01.spec.ts
pnpm --filter @rosa/web exec playwright test tests/e2e/knives-image-batch-01.spec.ts
```

- [ ] **Step 2: Verify every media record**

For every family, automated tests must confirm:

```ts
expect(new Set(allCatalogueCodes).size).toBe(allCatalogueCodes.length);
expect(mediaRecords.every((record) => record.sourcePageUrl.length > 0)).toBe(true);
expect(mediaRecords.every((record) => record.matchGrade !== "Reject")).toBe(true);
expect(mediaRecords.every((record) => record.avifSrc && record.webpSrc)).toBe(true);
```

- [ ] **Step 3: Perform the Knives visual approval gate**

Review the family page and every product-detail gallery at desktop and mobile widths. Reject mismatched blade shape, handle pattern, direction, number, or configuration. Record Ahmad's approval only after the actual rendered assets are reviewed.

- [ ] **Step 4: Add the Knives approval test after approval**

The approval test must enumerate the exact reviewed asset IDs and assert the recorded reviewer and approval date; it must not use a blanket boolean disconnected from the reviewed set.

- [ ] **Step 5: Write missing completion records**

Each completion document must list exact configuration count, exact code count, asset count, commands run, known accepted-similar substitutions, and the reviewer decision.

- [ ] **Step 6: Commit family closeout**

```bash
git add apps/web/src/test apps/web/tests/e2e docs/superpowers/completions
git commit -m "docs: close reviewed catalogue media families"
```

---

### Task 6: Build the Punches Catalogue Inventory from the Supplied 31-Page PDF

**Files:**
- Source: supplied `Punches Catalog(1).pdf`
- Create: `apps/web/src/features/catalogue-registry/products/punches-batch-01.ts`
- Modify: `apps/web/src/features/catalogue-registry/products/punches.ts`
- Create: `apps/web/src/test/punches-batch-01-inventory.test.ts`
- Create: `docs/review/catalogue-media/punches-batch-01-sources.md`

**Interfaces:**
- Consumes: rendered Punches catalogue pages and the existing `CatalogueProduct` model.
- Produces: one frozen grouped inventory in which every catalogue code appears exactly once and each visibly distinct configuration has its own product record.

- [ ] **Step 1: Render the catalogue for visual authority**

```bash
python /home/oai/skills/pdfs/scripts/render_pdf.py \
  "Punches Catalog(1).pdf" \
  --out_dir .tmp/punches-pages \
  --dpi 200
```

- [ ] **Step 2: Audit pages in catalogue order**

For every visible product configuration, record:

```text
page
instrument name
visible configuration key
exact codes
sizes
straight/curved/angled direction
jaw/tip/diameter pattern
shared-image scope
notes requiring manual review
```

- [ ] **Step 3: Group size-only variants and separate visible changes**

A single grouped product may contain several sizes only when the instrument geometry is otherwise the same. Different direction, jaw, tip, diameter, angle, or working-end pattern must create a separate grouped product.

- [ ] **Step 4: Write the inventory test before media sourcing**

The test must assert:

```ts
const allCodes = PUNCHES_BATCH_01.flatMap((product) => product.codes);
expect(new Set(allCodes).size).toBe(allCodes.length);
expect(PUNCHES_BATCH_01.every((product) => product.codes.length > 0)).toBe(true);
expect(PUNCHES_BATCH_01.every((product) => product.sizes.length > 0)).toBe(true);
expect(PUNCHES_BATCH_01.every((product) => product.slug.startsWith("punches-"))).toBe(true);
```

Also assert unique product IDs, slugs, and media IDs.

- [ ] **Step 5: Run and freeze the audited inventory**

```bash
pnpm --filter @rosa/web test -- src/test/punches-batch-01-inventory.test.ts
```

Expected: pass only after the catalogue-derived inventory is complete.

- [ ] **Step 6: Commit the inventory independently**

```bash
git add apps/web/src/features/catalogue-registry/products/punches-batch-01.ts apps/web/src/features/catalogue-registry/products/punches.ts apps/web/src/test/punches-batch-01-inventory.test.ts docs/review/catalogue-media/punches-batch-01-sources.md
git commit -m "feat: inventory Punches catalogue configurations"
```

---

### Task 7: Source, Normalize, Attach, and Approve Punches Media

**Files:**
- Create: `apps/web/scripts/prepare_punches_batch1.py`
- Create: `apps/web/src/features/catalogue-media/punches-batch-01.ts`
- Modify: `apps/web/src/features/catalogue-media/index.ts`
- Modify: `apps/web/src/features/catalogue-media/types.ts` only when Punches requires an existing optional field
- Add: `apps/web/public/media/catalogue-preview/punches/*.avif`
- Add: `apps/web/public/media/catalogue-preview/punches/*.webp`
- Create: `apps/web/src/test/punches-batch-01-media.test.ts`
- Create: `apps/web/src/test/punches-image-preview.test.ts`
- Create: `apps/web/tests/e2e/punches-image-batch-01.spec.ts`
- Create after review: `apps/web/src/test/punches-batch-01-approval.test.ts`
- Create: `docs/superpowers/completions/2026-08-04-punches-batch-01-production-media.md`

**Interfaces:**
- Consumes: the frozen Punches inventory from Task 6.
- Produces: one approved local media record and optimized AVIF/WebP pair for every Punches visible configuration.

- [ ] **Step 1: Search exact configuration names and compare working-end geometry**

Use the catalogue drawing as authority. Record source URL, original image URL, rights mode, match grade, background processing, orientation, and any accepted-similar difference.

- [ ] **Step 2: Reject unsafe candidates**

Reject any image with a watermark, burned-in supplier logo, incomplete instrument, wrong jaw/tip, visible geometric mismatch, unusable crop, or damaged fine edges after background removal.

- [ ] **Step 3: Normalize assets through the shared pipeline**

The script must produce a centered, undistorted full instrument with transparent background when safe, standardized orientation, and both AVIF and WebP derivatives.

- [ ] **Step 4: Attach media by stable media ID**

Every grouped Punches product must reference exactly one media record unless a verified alternate gallery image is intentionally added.

- [ ] **Step 5: Run media and preview tests**

```bash
pnpm --filter @rosa/web test -- \
  src/test/punches-batch-01-inventory.test.ts \
  src/test/punches-batch-01-media.test.ts \
  src/test/punches-image-preview.test.ts
pnpm --filter @rosa/web exec playwright test tests/e2e/punches-image-batch-01.spec.ts
```

- [ ] **Step 6: Obtain and encode visual approval**

Review all Punches configurations in the real Rosa family-card and product-gallery layouts. Only then add the explicit approval test and completion record.

- [ ] **Step 7: Commit Punches production media**

```bash
git add apps/web/scripts/prepare_punches_batch1.py apps/web/public/media/catalogue-preview/punches apps/web/src/features/catalogue-media apps/web/src/test apps/web/tests/e2e/punches-image-batch-01.spec.ts docs/review/catalogue-media/punches-batch-01-sources.md docs/superpowers/completions/2026-08-04-punches-batch-01-production-media.md
git commit -m "feat: complete Punches production media"
```

---

### Task 8: Replace All Required Cinematic and Catalogue-Cover Placeholders

**Files:**
- Create: `apps/web/src/features/cinematic-media/cinematic-media.ts`
- Create: `apps/web/src/features/cinematic-media/index.ts`
- Add: `apps/web/public/media/cinematic/**`
- Add: `apps/web/public/media/catalogue-covers/**`
- Modify: `apps/web/src/features/homepage/sections/home-hero.tsx`
- Modify: `apps/web/src/features/homepage/sections/procurement-support.tsx`
- Modify: `apps/web/src/features/homepage/sections/catalogue-access.tsx`
- Modify: `apps/web/src/features/about/about-page.tsx`
- Test: `apps/web/src/test/f7-homepage-motion.test.tsx`
- Test: `apps/web/src/test/f7-story-pages.test.tsx`
- Create: `apps/web/src/test/cinematic-media-manifest.test.ts`
- Create: `docs/review/cinematic-media-sources.md`

**Interfaces:**
- Consumes: approved user-supplied cinematic images and cover pages extracted from the five supplied catalogues.
- Produces: one typed local manifest used by all `MediaFrame` slots.

- [ ] **Step 1: Define the manifest type**

```ts
export interface CinematicMediaAsset {
  slot: string;
  src: string;
  alt: string;
  focalPoint: string;
  sizes: string;
  sourceRecord: string;
}
```

- [ ] **Step 2: Define the required slots**

The manifest must contain exactly these required release slots:

```ts
[
  "homepage-hero",
  "homepage-procurement",
  "homepage-catalogue-knives",
  "homepage-catalogue-scissors",
  "homepage-catalogue-punches",
  "homepage-catalogue-chisels",
  "homepage-catalogue-cutters",
  "about-hero",
  "about-procurement"
]
```

- [ ] **Step 3: Use previously approved cinematic images first**

Locate the exact approved files from the Rosa project conversation/File Library. Do not replace them with newly generated approximations. Verify instrument geometry, crop, resolution, logos, text, people, and usage notes before import.

- [ ] **Step 4: Extract catalogue covers from the supplied PDFs**

Render each cover at high resolution, crop only the page boundary, and create optimized local cover assets. Keep the original catalogue title and design intact; do not invent page counts or cover text.

- [ ] **Step 5: Wire manifest records into `MediaFrame`**

Example:

```tsx
const media = CINEMATIC_MEDIA["homepage-hero"];

<MediaFrame
  src={media.src}
  alt={media.alt}
  focalPoint={media.focalPoint}
  sizes={media.sizes}
  loading="eager"
  aspect="cinematic"
  tone="dark"
  overlay="soft"
  mediaSlot={media.slot}
/>
```

- [ ] **Step 6: Assert no required slot remains a placeholder**

```ts
expect(REQUIRED_CINEMATIC_SLOTS.every((slot) => CINEMATIC_MEDIA[slot]?.src)).toBe(true);
expect(Object.values(CINEMATIC_MEDIA).every((asset) => asset.src.startsWith("/media/"))).toBe(true);
```

- [ ] **Step 7: Run homepage and story browser reviews**

Verify desktop, tablet, mobile, and reduced-motion layouts for crop, contrast, loading, layout shift, focal point, and text readability.

- [ ] **Step 8: Commit the final non-product media**

```bash
git add apps/web/public/media/cinematic apps/web/public/media/catalogue-covers apps/web/src/features/cinematic-media apps/web/src/features/homepage apps/web/src/features/about apps/web/src/test docs/review/cinematic-media-sources.md
git commit -m "feat: replace cinematic media placeholders"
```

---

### Task 9: Restore the Approved Scissors-Evolution Section on About

**Files:**
- Create: `apps/web/src/features/about/scissors-evolution.tsx`
- Modify: `apps/web/src/features/about/about-page.tsx`
- Modify: `apps/web/src/features/public-content-registry/public-content.ts` or the existing About content source
- Modify: `apps/web/src/styles/f7-story-polish.css`
- Test: `apps/web/src/test/about-page.test.tsx`
- Test: `apps/web/src/test/f7-story-pages.test.tsx`
- Test: `apps/web/tests/e2e/f7-story-pages.spec.ts`

**Interfaces:**
- Consumes: generic instrument-development concepts and approved Rosa motion primitives.
- Produces: one truthful, non-company-history timeline that complements the About page.

- [ ] **Step 1: Add five non-dated editorial stages**

Use these stages without claiming Rosa created them:

```ts
[
  {
    title: "Forged cutting forms",
    copy: "Early scissor forms established the paired-blade action that still defines the instrument."
  },
  {
    title: "Ring handles and pivot control",
    copy: "Handle and joint refinement improved leverage, balance and repeatable control."
  },
  {
    title: "Specialised surgical patterns",
    copy: "Operating, dissecting and fine scissors developed around distinct working needs."
  },
  {
    title: "Edge and material refinement",
    copy: "Modern regular, Super Cut and tungsten-carbide options distinguish cutting feel and durability."
  },
  {
    title: "Clearer procurement",
    copy: "Codes, sizes, directions and finishes now help buyers compare the correct configuration."
  }
]
```

- [ ] **Step 2: Implement the timeline as a bounded component**

Use `Reveal` and `Stagger` only. Do not add a new animation dependency or scroll listener.

- [ ] **Step 3: Keep reduced-motion output static**

The timeline must remain fully visible and ordered when motion is reduced.

- [ ] **Step 4: Test wording and placement**

Assert the five headings render between the buyer-support content and final procurement/CTA sections, with no invented company dates or certifications.

- [ ] **Step 5: Commit the About requirement**

```bash
git add apps/web/src/features/about apps/web/src/features/public-content-registry apps/web/src/styles/f7-story-polish.css apps/web/src/test apps/web/tests/e2e/f7-story-pages.spec.ts
git commit -m "feat: restore scissors evolution story"
```

---

### Task 10: Run the Full Production Verification Matrix

**Files:**
- Modify only when a test exposes a real defect.
- Create: `docs/superpowers/completions/2026-08-04-final-production-closeout.md`

**Interfaces:**
- Consumes: all prior tasks.
- Produces: one evidence-backed release candidate with documented commands and results.

- [ ] **Step 1: Run workspace lint and type checking**

```bash
pnpm -r lint
pnpm -r typecheck
```

Expected: zero errors and zero unreviewed warnings.

- [ ] **Step 2: Run all unit and static tests**

```bash
pnpm -r test
pnpm --filter @rosa/web test:foundation
```

Expected: all tests pass.

- [ ] **Step 3: Build the production application**

```bash
pnpm --filter @rosa/web build
```

Expected: optimized build succeeds with no missing asset, route, or type error.

- [ ] **Step 4: Run all Playwright tests**

```bash
pnpm --filter @rosa/web exec playwright test
```

Expected: zero failures across desktop, tablet, and mobile projects; only explicitly documented conditional skips may remain.

- [ ] **Step 5: Perform manual release journeys**

Verify:

```text
Homepage -> Products -> each of five family pages
Each family -> representative product detail
Add product -> Inquiry -> Request quotation
Catalogues -> all five PDF links
About -> scissors evolution
Contact form basic behavior
Admin login and owner-only routes
Customer inquiry history scoped to the authenticated user
Unauthorized admin inquiry/message/API access rejected
Alert route rejects missing or incorrect bearer secret
Reduced motion and keyboard navigation
```

- [ ] **Step 6: Verify deployment configuration**

Required production variables:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ROSA_OWNER_USER_ID or ROSA_OWNER_EMAIL
ALERT_UNREAD_SECRET
RESEND_API_KEY
```

Never place actual secret values in the repository or completion document.

- [ ] **Step 7: Verify asset integrity**

Confirm:

```text
No third-party runtime image URLs
No missing AVIF/WebP pair
No placeholder state for required cinematic slots
No duplicate catalogue code
No product mapped to the wrong visible configuration
No temporary review binary in the public build
No temporary GitHub workflow
```

- [ ] **Step 8: Write the completion record**

Record the exact final commit SHA, test counts, Playwright results, build result, asset counts by family, approval status, environment-variable checklist, and any intentionally deferred production-storage migration.

- [ ] **Step 9: Commit verification evidence**

```bash
git add docs/superpowers/completions/2026-08-04-final-production-closeout.md
git commit -m "docs: record final production verification"
```

---

### Task 11: Review, Merge, Deploy, and Smoke-Test

**Files:**
- No application changes unless final verification finds a release-blocking defect.

**Interfaces:**
- Consumes: verified `integration/final-production-closeout`.
- Produces: merged `main` and a production deployment that matches the reviewed release candidate.

- [ ] **Step 1: Review the complete diff against main**

```bash
git fetch origin
git diff --stat origin/main...HEAD
git diff --name-status origin/main...HEAD
```

Confirm no unintended backend, schema, checkout, pricing, or unrelated files entered the branch.

- [ ] **Step 2: Push and open one final review PR**

```bash
git push -u origin integration/final-production-closeout
```

The PR body must summarize motion fixes, imported media families, Punches completion, cinematic assets, evolution timeline, test evidence, and deployment variables.

- [ ] **Step 3: Merge only after the final head SHA is verified**

Use squash merge unless preserving the task commits is intentionally preferred. Do not force-update `main`.

- [ ] **Step 4: Deploy the merged main commit**

Use the existing OpenNext/Cloudflare deployment path and the verified production environment variables.

- [ ] **Step 5: Run production smoke checks**

Check the deployed homepage, all five product families, one product detail per family, catalogue downloads, inquiry/quotation path, About timeline, Contact, admin login, authenticated inquiry history, and protected API behavior.

- [ ] **Step 6: Close temporary branches only after successful smoke testing**

Keep source media branches until the production deployment and Supabase Storage handoff are confirmed. Then archive or delete obsolete preview and temporary plan branches.
