# Homepage Media + Smoothness Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the hero and Punches media delivery failures, replace the six approved placeholders with client-JPG-style clinical photography, strengthen catalogue hover feedback, and clean up motion/test regressions without changing the approved compact homepage structure.

**Architecture:** Replace raster-in-SVG delivery with direct AVIF/WebP assets and semantic `<picture>/<img>` rendering. Keep the existing homepage composition and motion primitives, but normalize motion to transform/opacity-only transitions. Treat failing tests as either genuine regressions or stale pre-redesign contracts and update only the latter.

**Tech Stack:** Next.js 16, React, TypeScript, `motion/react`, CSS, Vitest, Playwright, Pillow-based offline asset optimization.

## Global Constraints

- Work only on `frontend/client-homepage-compact-redesign`.
- Do not reintroduce retired homepage sections or old accordion behavior.
- Do not change backend/API/admin behavior.
- Preserve Arabic/RTL, reduced motion, keyboard/touch behavior, real social links and quotation flow.
- Use locally hosted optimized media; no runtime hotlinking.
- Hero source masters are the four exact user-provided PNG banners.
- Punches source master is the user-provided Punches catalogue cover JPEG.
- Placeholder imagery follows approved option B: same clinical concepts as the client JPG, with stronger photography and consistent grayscale treatment.

---

### Task 1: Direct hero and Punches media assets

**Files:**
- Create: `apps/web/public/media/editorial/home-hero/client-v4/hero-01-desktop.avif`
- Create: `apps/web/public/media/editorial/home-hero/client-v4/hero-01-desktop.webp`
- Create: `apps/web/public/media/editorial/home-hero/client-v4/hero-01-mobile.avif`
- Repeat for hero 02–04.
- Create: `apps/web/public/media/families/homepage-covers/punches-family-cover.avif`
- Create: `apps/web/public/media/families/homepage-covers/punches-family-cover.webp`
- Test: `apps/web/src/test/client-homepage-media-motion-refinement.test.ts`

**Interfaces:**
- Produces direct raster URLs consumed by hero and family gallery components.

- [ ] Add failing assertions that hero source paths end in `.avif`/`.webp`, no hero SVG wrapper path is referenced, and Punches uses a direct raster asset.
- [ ] Run the focused Vitest and confirm RED against current SVG-backed paths.
- [ ] Generate grayscale/low-saturation, high-quality AVIF/WebP derivatives from the exact four supplied banners and Punches cover; preserve desktop full-frame composition and create deliberate phone crops.
- [ ] Commit the binary assets to the existing branch.
- [ ] Re-run the focused test after Task 2 wiring.

### Task 2: Semantic hero and reliable Punches rendering

**Files:**
- Modify: `apps/web/src/features/homepage/home-hero-slides.ts`
- Modify: `apps/web/src/features/homepage/sections/home-hero-carousel.tsx`
- Modify: `apps/web/src/features/homepage/sections/home-family-gallery.tsx`
- Modify: `apps/web/src/styles/home-client-redesign-polish.css`
- Test: `apps/web/src/test/client-feedback-homepage-contract.test.ts`
- Test: `apps/web/src/test/localization.test.tsx`
- Test: `apps/web/src/test/client-homepage-media-motion-refinement.test.ts`

**Interfaces:**
- Hero slides expose desktop AVIF/WebP plus mobile AVIF/WebP and focal points.
- Hero carousel renders semantic `<picture><source/><img/></picture>` inside the existing motion media wrapper.
- Family gallery renders Punches through the same image path as every other cover.

- [ ] Add/update failing tests for four rendered hero `<img>` elements/resources, localized alt text, and direct Punches raster source.
- [ ] Run focused tests and verify failures are specifically caused by CSS-background/SVG-wrapper delivery.
- [ ] Replace CSS background-image hero rendering with semantic picture/image markup while retaining crossfade and slide-settle motion on the wrapper.
- [ ] Remove Punches-only CSS background fallback and image-opacity suppression.
- [ ] Keep next-slide preloading pointed at the real direct image URL.
- [ ] Run focused tests to GREEN.

### Task 3: Replace six placeholders with approved clinical photography

**Files:**
- Create: `apps/web/public/media/editorial/home-specialties/plastic-surgery.avif|webp`
- Create: `apps/web/public/media/editorial/home-specialties/orthopedics.avif|webp`
- Create: `apps/web/public/media/editorial/home-specialties/maxillofacial.avif|webp`
- Create: `apps/web/public/media/editorial/home-specialties/orthodontics.avif|webp`
- Create: `apps/web/public/media/editorial/home-specialties/spine.avif|webp`
- Create: `apps/web/public/media/editorial/home-specialties/securing-confidence.avif|webp`
- Create: `docs/media/homepage-specialty-media-provenance.md`
- Modify: `apps/web/src/features/homepage/homepage.data.ts`
- Modify: `apps/web/src/features/homepage/sections/client-home-sections.tsx`
- Modify: `apps/web/src/styles/home-client-redesign.css`
- Test: `apps/web/src/test/client-homepage-compact-redesign.test.tsx`

**Interfaces:**
- `homepage.data.ts` provides localized labels and direct local image paths/focal points.
- `client-home-sections.tsx` renders semantic images instead of `HomeMediaPlaceholder`.

- [ ] Update the homepage test to require six real media slots and zero placeholder markers; run and verify RED.
- [ ] Download the approved Pexels sources: facial/gloved-hands plastic-surgery concept, knee arthroscopy, skull/denture maxillofacial model, braces examination, spine X-ray review, and gloved surgical-instrument close-up.
- [ ] Produce consistent grayscale/near-monochrome AVIF/WebP derivatives with crops matching the existing slot geometry.
- [ ] Record Pexels photo page, photographer, and source URL in the provenance note.
- [ ] Replace placeholder renderer usage with a small semantic `HomeClinicalMedia` picture component.
- [ ] Run focused homepage/localization tests to GREEN.

### Task 4: Stronger catalogue hover and smoother motion

**Files:**
- Modify: `apps/web/src/styles/home-client-redesign.css`
- Modify: `apps/web/src/styles/home-client-redesign-polish.css`
- Modify: `apps/web/src/features/homepage/sections/home-hero-carousel.tsx`
- Modify if needed: `apps/web/src/features/motion/motion.config.ts`
- Test: `apps/web/src/test/client-homepage-media-motion-refinement.test.ts`
- Test: `apps/web/src/test/f7-motion-restraint.test.ts`

**Interfaces:**
- Fine-pointer catalogue hover uses `transform: scale(1.11)` with 520–580ms emphasized easing.
- Reduced motion disables the transform.

- [ ] Add a failing contract assertion for an obvious 1.10–1.12 hover scale and reduced-motion override.
- [ ] Verify RED against the current `1.035` final override.
- [ ] Set the final homepage cover hover/focus scale to approximately `1.11`, with a 560ms emphasized ease and clipped overflow.
- [ ] Remove contradictory earlier/final hover overrides where possible so one rule owns the effect.
- [ ] Keep hero/lower-section entrances transform+opacity-only and remove unnecessary persistent `will-change` declarations.
- [ ] Run motion-focused tests to GREEN.

### Task 5: Genuine typecheck regressions and stale test contracts

**Files:**
- Modify: `apps/web/src/features/homepage/sections/catalogue-access.tsx`
- Modify: `apps/web/src/features/homepage/sections/featured-instruments.tsx`
- Modify: `apps/web/src/features/homepage/sections/procurement-support.tsx`
- Modify: `apps/web/src/test/catalogue-live-projections.test.ts`
- Modify: `apps/web/src/test/public-product-live-cutover.test.ts`
- Modify: `apps/web/src/test/media-refinement.test.tsx`
- Modify: `apps/web/tests/e2e/client-feedback-homepage.spec.ts`
- Modify: `apps/web/tests/e2e/client-feedback-owner-fixes.spec.ts`
- Modify: `apps/web/tests/e2e/client-feedback-responsive-matrix.spec.ts`

**Interfaces:**
- Retired homepage components remain compile-safe without being rendered by the homepage.
- Current tests assert the approved eight-section compact homepage and current five-family order: Scissors, Cutters, Punches, Chisels, Knives.

- [ ] Fix compile-only imports/types in retired section modules without putting them back on the homepage.
- [ ] Remove the stale homepage featured-products model assertion from `public-product-live-cutover.test.ts` instead of recreating a retired homepage `products` field.
- [ ] Update media-refinement tests to direct hero/specialty/family media contracts.
- [ ] Update Playwright homepage tests from the old six-section/accordion contract to the approved compact structure and current family order.
- [ ] Preserve genuine responsive assertions: no horizontal overflow, compact hero density, family media visible/reachable, Arabic RTL, carousel interactions, social/footer integrity.

### Task 6: Verification

- [ ] Run `pnpm --filter @rosa/web test -- src/test/client-homepage-media-motion-refinement.test.ts src/test/client-homepage-compact-redesign.test.tsx src/test/client-feedback-homepage-contract.test.ts src/test/localization.test.tsx src/test/f7-homepage-motion.test.tsx`.
- [ ] Run `pnpm --filter @rosa/web lint`.
- [ ] Run `pnpm --filter @rosa/web typecheck`.
- [ ] Run the full `pnpm --filter @rosa/web test` and classify any remaining failures before changing code.
- [ ] Run targeted Playwright homepage specs first, then the full e2e suite if targeted specs are green.
- [ ] Verify 360×800, 390×844, 768×1024, 1024×768, 1366×768, and 1920×1080 visually when a browser is available.
