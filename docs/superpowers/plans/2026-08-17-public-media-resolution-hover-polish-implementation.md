# Public Media Resolution & Hover Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Increase visible image fidelity across the approved About and homepage designs while adding an obvious-but-controlled zoom interaction to the three About story images.

**Architecture:** Preserve every existing media slot, route, section, crop/focal-point contract, and Next.js component structure. Upgrade source assets in-place where the same composition is available, keep responsive hero desktop/mobile variants, and implement the About story hover entirely in CSS with a reduced-motion fallback.

**Tech Stack:** Next.js 16, React, `next/image`, CSS, Vitest/Playwright contracts already present in `apps/web`.

## Global Constraints

- Work from `frontend/client-about-compact-redesign` and keep changes frontend/media-only.
- Do not alter the approved About section order or homepage content/layout.
- Keep the five About document/certificate media slots as neutral placeholders.
- Reuse the already approved generated About artwork; upgrade resolution rather than changing composition.
- About story hover must be clearly visible but controlled: target `scale(1.14)` with the existing premium easing.
- Disable the zoom interaction under `prefers-reduced-motion: reduce`.
- Preserve homepage hero desktop/mobile focal-point behavior.
- Prefer higher-resolution source media over simply increasing Next.js quality settings.
- Do not introduce new dependencies.

---

### Task 1: Upgrade About editorial source assets

**Files:**
- Replace: `apps/web/public/media/editorial/about-client-hero.webp`
- Replace: `apps/web/public/media/editorial/about-client-workflow.webp`
- Replace: `apps/web/public/media/editorial/about-client-growth.webp`
- Replace: `apps/web/public/media/editorial/about-client-experience.webp`
- Test: `apps/web/src/test/about-generated-media.test.tsx`

**Interfaces:**
- Consumes the existing stable media paths already rendered by `AboutCompactHero` and `AboutStorySection`.
- Produces the same four URLs with materially higher-resolution source files.

- [ ] Replace each compressed asset with the higher-resolution approved WebP source while preserving the exact file path.
- [ ] Confirm the hero remains a wide 3:1 composition and each story asset remains 4:3.
- [ ] Confirm all four slots still render as `data-media-state="ready"` and five document slots remain placeholders.
- [ ] Commit the media replacements without changing About copy or layout.

### Task 2: Add obvious premium hover zoom to About story media

**Files:**
- Modify: `apps/web/src/styles/about-client-interactions.css`
- Modify: `apps/web/src/test/client-about-compact-redesign.test.tsx`

**Interfaces:**
- Consumes `.about-client-story__media` and its `next/image` child.
- Produces a CSS-only hover/focus zoom with no layout shift.

- [ ] Extend the static contract to require a transform-only story-image zoom and reduced-motion reset.
- [ ] Add a base image transition using `420ms cubic-bezier(0.22, 1, 0.36, 1)`.
- [ ] On pointer hover/focus-within, scale the image to `1.14` inside the already-clipped media frame.
- [ ] Under reduced motion, remove both transition and zoom transform.
- [ ] Commit the interaction and contract together.

### Task 3: Upgrade homepage hero source fidelity without changing the approved carousel

**Files:**
- Audit/replace in place: `apps/web/public/media/editorial/home-hero/client-v5/hero-01-*`
- Audit/replace in place: `apps/web/public/media/editorial/home-hero/client-v5/hero-02-*`
- Audit/replace in place: `apps/web/public/media/editorial/home-hero/client-v5/hero-03-*`
- Audit/replace in place: `apps/web/public/media/editorial/home-hero/client-v5/hero-04-*`
- Verify: `apps/web/src/features/homepage/home-hero-slides.ts`

**Interfaces:**
- Preserve every existing `desktopSrc`, `desktopAvifSrc`, `mobileSrc`, desktop focal point, and mobile focal point.
- Produce higher-fidelity binaries at those same URLs.

- [ ] Compare current `client-v5` assets with earlier/source variants before replacement so composition does not regress.
- [ ] Upgrade each desktop source to a higher-resolution/high-quality export while retaining the v5 crop and treatment.
- [ ] Upgrade each mobile source from the corresponding approved artwork/crop rather than stretching desktop media.
- [ ] Keep AVIF/WebP pairing where the carousel already expects it.
- [ ] Commit only after all four slides retain their current path and focal-point contracts.

### Task 4: Upgrade the homepage supporting clinical images

**Files:**
- Audit/replace: `apps/web/public/media/editorial/home-specialties/plastic-surgery.webp`
- Audit/replace: `apps/web/public/media/editorial/home-specialties/orthopedics.webp`
- Audit/replace: `apps/web/public/media/editorial/home-specialties/maxillofacial.webp`
- Audit/replace: `apps/web/public/media/editorial/home-specialties/orthodontics.webp`
- Audit/replace: `apps/web/public/media/editorial/home-specialties/spine.webp`
- Audit/replace: `apps/web/public/media/editorial/home-specialties/securing-confidence.webp`
- Verify: `apps/web/src/features/homepage/sections/client-home-sections.tsx`

**Interfaces:**
- Preserve `SPECIALTY_MEDIA` paths and focal points.
- Produce higher-resolution media without changing section geometry or captions.

- [ ] Locate the highest-quality truthful source for each of the six rendered homepage images.
- [ ] Re-export WebP assets at a resolution appropriate for their rendered desktop size and high-DPI displays.
- [ ] Preserve each current composition/focal point.
- [ ] Do not replace imagery with unrelated stock simply to make the byte size larger.
- [ ] Commit the source-fidelity upgrade.

### Task 5: Verification

**Files:**
- Verify the final diff and relevant tests only; no unrelated refactors.

- [ ] Re-read the final branch diff against `frontend/client-about-compact-redesign`.
- [ ] Verify the four About files are higher-resolution than the previous compressed variants.
- [ ] Verify all twelve homepage hero responsive paths still exist and the six specialty media paths still exist.
- [ ] Run focused Vitest/Playwright, lint, typecheck, and build if a runnable checkout is available.
- [ ] If the runtime still cannot execute the repository, report repository-side verification separately and do not claim the test/build suite is green.
