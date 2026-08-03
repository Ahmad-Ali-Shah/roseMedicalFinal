# Rosa Medical Premium Visual Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the approved Rosa Medical public frontend into a premium editorial experience through a coherent motion system, cinematic media-ready framing, refined interaction feedback and responsive visual restraint without changing unfinished product behavior or backend scope.

**Architecture:** A Rosa-owned motion layer wraps the existing server-rendered page structure. One `motion` dependency provides in-view, layout and pointer animation; reusable primitives isolate animation-library details from page sections. A shared `MediaFrame` preserves dimensions, crop, focal point, overlays and placeholder compatibility so product and cinematic asset branches can merge without redesigning layouts.

**Tech Stack:** Next.js 16 App Router, React 19, strict TypeScript, Motion for React, CSS custom properties, existing Tailwind 4 pipeline, Vitest, React DOM static rendering and Playwright.

## Global Constraints

- Motion language: **Editorial luxury with selective cinematic moments.**
- Existing approved layout, typography, spacing, colour and route structure remain authoritative.
- Add one animation dependency only: `motion`.
- Do not add GSAP, Three.js, Lenis, smooth-scroll replacement, WebGL canvases or multiple component libraries.
- Do not activate mocked admin publishing, public search, catalogue mutations or contact behavior in this phase.
- Do not add Supabase acceptance, rate-limit, email-delivery or deployment work.
- Preserve existing quotation behavior.
- Product-image branch owns product binaries and product-media mappings.
- Cinematic-image branch owns non-product binaries and final source/manifest data.
- Premium-polish branch owns motion primitives, wrappers, page composition changes and `f7-premium-polish.css`.
- Final media paths must be insertable without rewriting motion components.
- Respect `prefers-reduced-motion` globally.
- Essential content must never be invisible before hydration.
- Touch and mobile receive fewer simultaneous effects and no pointer-only dependence.
- Avoid transform-induced text blur and cumulative layout shift.
- Use transforms and opacity for frequent animation.
- No endless decorative loops near reading content.

---

### Task 1: Install the motion dependency and lock shared motion contracts

**Files:**
- Modify: `apps/web/package.json`
- Modify: `pnpm-lock.yaml`
- Create: `apps/web/src/features/motion/motion.config.ts`
- Create: `apps/web/src/features/motion/types.ts`
- Create: `apps/web/src/test/f7-motion-config.test.ts`

**Interfaces:**
- Produces: `MOTION_DURATION`, `MOTION_EASING`, `MOTION_DISTANCE`, `MotionDirection`, `MotionIntensity`.
- Later tasks consume these values rather than hard-coding timings.

- [ ] **Step 1: Write the failing configuration test**

```ts
import { describe, expect, it } from "vitest";
import { MOTION_DURATION, MOTION_DISTANCE } from "@/features/motion/motion.config";

describe("F7 motion configuration", () => {
  it("uses the approved restrained motion scale", () => {
    expect(MOTION_DURATION.micro).toBeGreaterThanOrEqual(0.12);
    expect(MOTION_DURATION.hero).toBeLessThanOrEqual(1.2);
    expect(MOTION_DISTANCE.mobile).toBeLessThan(MOTION_DISTANCE.desktop);
  });
});
```

- [ ] **Step 2: Run the focused test and confirm the missing module failure**

Run: `pnpm --filter @rosa/web test -- src/test/f7-motion-config.test.ts`

Expected: FAIL because `@/features/motion/motion.config` does not exist.

- [ ] **Step 3: Add `motion` to the web package**

Add `"motion": "^12.23.12"` to `apps/web/package.json` dependencies and regenerate `pnpm-lock.yaml` using the repository pnpm version.

- [ ] **Step 4: Implement exact shared values**

```ts
export const MOTION_DURATION = {
  micro: 0.16,
  component: 0.28,
  section: 0.58,
  hero: 0.96
} as const;

export const MOTION_EASING = {
  standard: [0.22, 1, 0.36, 1],
  emphasized: [0.16, 1, 0.3, 1]
} as const;

export const MOTION_DISTANCE = {
  mobile: 12,
  desktop: 24,
  hero: 36
} as const;
```

- [ ] **Step 5: Run focused test, typecheck and commit**

Run:

```bash
pnpm --filter @rosa/web test -- src/test/f7-motion-config.test.ts
pnpm --filter @rosa/web typecheck
```

Commit: `feat: establish premium motion configuration`

---

### Task 2: Build reduced-motion-safe reveal and stagger primitives

**Files:**
- Create: `apps/web/src/features/motion/motion-provider.tsx`
- Create: `apps/web/src/features/motion/reveal.tsx`
- Create: `apps/web/src/features/motion/stagger.tsx`
- Create: `apps/web/src/features/motion/index.ts`
- Modify: `apps/web/src/app/layout.tsx`
- Test: `apps/web/src/test/f7-motion-primitives.test.tsx`

**Interfaces:**
- `MotionProvider({ children }: PropsWithChildren): ReactElement`
- `Reveal({ children, direction?, delay?, className?, once? }): ReactElement`
- `Stagger({ children, className?, interval? }): ReactElement`
- Reduced motion renders final visible state immediately.

- [ ] **Step 1: Write static composition tests**

Assert that server markup contains content immediately, includes stable motion data attributes and does not emit `opacity:0` inline.

- [ ] **Step 2: Confirm tests fail because primitives do not exist**

Run: `pnpm --filter @rosa/web test -- src/test/f7-motion-primitives.test.tsx`

- [ ] **Step 3: Implement `MotionProvider`**

Use Motion’s reduced-motion configuration and expose no global animation loop. Wrap root body content while preserving the skip link.

- [ ] **Step 4: Implement `Reveal` and `Stagger`**

Use viewport-triggered animation, `once: true`, shared timings and final-state server markup. Keep direction distance responsive through CSS variables rather than reading window size during render.

- [ ] **Step 5: Export primitives and run focused verification**

Run:

```bash
pnpm --filter @rosa/web test -- src/test/f7-motion-primitives.test.tsx
pnpm --filter @rosa/web lint
pnpm --filter @rosa/web typecheck
```

Commit: `feat: add reduced-motion reveal primitives`

---

### Task 3: Build text, surface and media primitives

**Files:**
- Create: `apps/web/src/features/motion/text-reveal.tsx`
- Create: `apps/web/src/features/motion/magnetic.tsx`
- Create: `apps/web/src/features/motion/tilt-surface.tsx`
- Create: `apps/web/src/features/motion/spotlight-surface.tsx`
- Create: `apps/web/src/features/motion/progressive-blur.tsx`
- Create: `apps/web/src/features/motion/media-frame.tsx`
- Modify: `apps/web/src/features/motion/index.ts`
- Test: `apps/web/src/test/f7-motion-surfaces.test.tsx`

**Interfaces:**
- `TextReveal({ text, as?, className?, mode? }): ReactElement`
- `Magnetic({ children, className?, strength? }): ReactElement`
- `TiltSurface({ children, className?, maxDegrees? }): ReactElement`
- `SpotlightSurface({ children, className? }): ReactElement`
- `ProgressiveBlur({ edge, className? }): ReactElement`
- `MediaFrame({ src?, alt, aspect, focalPoint?, tone?, overlay?, className?, children? }): ReactElement`

- [ ] **Step 1: Write tests for semantic output and placeholder compatibility**

Prove headings retain one semantic element, images require meaningful alt text unless decorative, and missing `src` renders a stable placeholder frame.

- [ ] **Step 2: Confirm red tests**

Run: `pnpm --filter @rosa/web test -- src/test/f7-motion-surfaces.test.tsx`

- [ ] **Step 3: Implement pointer effects with local state only**

Pointer tracking must be local to hovered surfaces, clamped, disabled for coarse pointers and disabled under reduced motion.

- [ ] **Step 4: Implement `MediaFrame`**

Reserve aspect ratio, support `object-position` from `focalPoint`, keep overlays outside image binaries, and accept children so current geometric placeholders remain usable until cinematic assets arrive.

- [ ] **Step 5: Verify and commit**

Run focused tests, lint and typecheck.

Commit: `feat: add premium motion and media surfaces`

---

### Task 4: Add the F7 stylesheet and global interaction tokens

**Files:**
- Create: `apps/web/src/styles/f7-premium-polish.css`
- Modify: `apps/web/src/app/globals.css`
- Modify: `apps/web/src/styles/tokens.css`
- Modify: `apps/web/src/styles/components.css`
- Test: `apps/web/src/test/f7-premium-styles.static.test.mjs`

**Interfaces:**
- CSS custom properties: `--motion-micro`, `--motion-component`, `--motion-section`, `--motion-ease`, `--motion-distance`.
- Utility classes: `.motion-reveal`, `.motion-stagger`, `.media-frame`, `.premium-surface`, `.premium-link`.

- [ ] **Step 1: Add a static test for import order and reduced-motion rules**

The test must assert `f7-premium-polish.css` is imported last and contains a global `@media (prefers-reduced-motion: reduce)` block.

- [ ] **Step 2: Confirm the test fails**

Run: `pnpm --filter @rosa/web test:foundation`

- [ ] **Step 3: Add motion variables and interaction styles**

Include button lift, press feedback, underline travel, focus retention, media overlay layers and coarse-pointer fallbacks. Do not add neon, glassmorphism or large shadows.

- [ ] **Step 4: Add reduced-motion reset**

Disable parallax, tilt, magnetic transforms, delayed reveals and animated scroll behavior without hiding content.

- [ ] **Step 5: Verify and commit**

Commit: `style: establish F7 premium interaction layer`

---

### Task 5: Refine the global public shell

**Files:**
- Create: `apps/web/src/features/motion/scroll-header-controller.tsx`
- Create: `apps/web/src/features/motion/route-transition.tsx`
- Create: `apps/web/src/components/layout/mobile-navigation.tsx`
- Modify: `apps/web/src/components/layout/public-shell.tsx`
- Modify: `apps/web/src/components/ui/button.tsx`
- Test: `apps/web/src/test/f7-public-shell.test.tsx`
- Test: `apps/web/tests/e2e/f7-public-shell.spec.ts`

**Interfaces:**
- `ScrollHeaderController` toggles `data-scrolled` after a restrained threshold and never owns navigation content.
- `RouteTransition` wraps only `<main>` content; header and footer remain stable.
- `MobileNavigation` owns open/close state, focus return and route-close behavior.

- [ ] **Step 1: Write failing shell tests**

Assert one header, one main, one footer, no `<details>` mobile menu, preserved navigation labels and stable button text.

- [ ] **Step 2: Implement scroll-state header**

Homepage starts transparent over the hero; other pages start solid. Scrolled state compresses header height slightly and increases backdrop separation without hiding content.

- [ ] **Step 3: Replace `<details>` with an accessible editorial curtain menu**

Use a real button with `aria-expanded`, a labelled panel, Escape close, focus return and body-scroll containment only while open.

- [ ] **Step 4: Refine buttons and links**

Add internal label/arrow spans where needed while preserving accessible names. Magnetic behavior is opt-in and used only for principal CTAs.

- [ ] **Step 5: Add route entrance**

Keep transition below 320ms for ordinary pages and disable it under reduced motion.

- [ ] **Step 6: Run shell unit and browser tests**

Commit: `feat: polish public navigation and route shell`

---

### Task 6: Execute the homepage cinematic pass

**Files:**
- Modify: `apps/web/src/features/homepage/homepage.tsx`
- Modify: `apps/web/src/features/homepage/sections/home-hero.tsx`
- Modify: `apps/web/src/features/homepage/sections/family-discovery.tsx`
- Modify: `apps/web/src/features/homepage/sections/procurement-support.tsx`
- Modify: `apps/web/src/features/homepage/sections/featured-instruments.tsx`
- Modify: `apps/web/src/features/homepage/sections/catalogue-access.tsx`
- Modify: `apps/web/src/features/homepage/sections/quotation-cta.tsx`
- Modify: `apps/web/src/features/public-catalogue/section-heading.tsx`
- Modify: `apps/web/src/features/public-catalogue/family-card.tsx`
- Modify: `apps/web/src/features/public-catalogue/product-preview-card.tsx`
- Modify: `apps/web/src/features/public-catalogue/procurement-panel.tsx`
- Test: `apps/web/src/test/f7-homepage-motion.test.tsx`
- Test: `apps/web/tests/e2e/f7-homepage-polish.spec.ts`

**Interfaces:**
- Homepage sections consume motion primitives only; no page-specific observers.
- Hero `MediaFrame` must accept placeholder geometry now and a final cinematic asset later.

- [ ] **Step 1: Add failing composition tests**

Assert hero text remains semantically ordered, each major section has one motion boundary, family cards preserve links and no image path is hard-coded before asset delivery.

- [ ] **Step 2: Choreograph hero entry**

Eyebrow → line-masked title → copy → actions → visual. Keep one-time pointer depth local to hero media and no looping text effect.

- [ ] **Step 3: Polish family and product cards**

Add restrained stagger, image scale, title/arrow separation, dark-card spotlight and maximum 3° desktop tilt. Touch receives press feedback only.

- [ ] **Step 4: Polish procurement, catalogue and final CTA sections**

Draw process/divider lines, add paper-stack depth, progressive blur where useful and one optional border trail on the final CTA only.

- [ ] **Step 5: Run homepage browser checks at desktop, tablet and mobile**

Verify no horizontal overflow and hero content remains readable with placeholder geometry.

Commit: `feat: deliver homepage cinematic polish`

---

### Task 7: Polish product discovery and product detail without touching image ownership

**Files:**
- Modify: `apps/web/src/features/products/products-overview.tsx`
- Modify: `apps/web/src/features/family-listing/family-listing-page.tsx`
- Modify: `apps/web/src/features/public-catalogue/product-media-placeholder.tsx`
- Modify: `apps/web/src/features/product-detail/product-detail-page.tsx`
- Modify: `apps/web/src/features/product-detail/product-procurement-summary.tsx`
- Modify: `apps/web/src/features/product-detail/mobile-inquiry-bar.tsx`
- Modify: `apps/web/src/features/inquiry/add-to-inquiry-button.tsx`
- Test: `apps/web/src/test/f7-product-polish.test.tsx`
- Test: `apps/web/tests/e2e/f7-product-polish.spec.ts`

**Interfaces:**
- Product media wrapper remains compatible with incoming clean-background image mappings.
- Add-to-inquiry morph preserves current storage behavior and accessible name changes.

- [ ] **Step 1: Write tests proving functional invariants**

Preserve product codes, family links, Add-to-inquiry behavior and mobile footer reachability.

- [ ] **Step 2: Add page-title and grid choreography**

Use spatial row order, not arbitrary delays. Do not activate filters or search.

- [ ] **Step 3: Add restrained product media depth**

Keep transforms small enough for sharp cut-out imagery and avoid editing product mapping data.

- [ ] **Step 4: Refine product detail and mobile action**

Reveal breadcrumbs/title before controls, enter summary after media, morph Add state and show sticky mobile action only where it does not cover footer content.

- [ ] **Step 5: Run product journey tests and commit**

Commit: `feat: polish product discovery journey`

---

### Task 8: Polish About, procurement support, catalogues, contact and legal pages

**Files:**
- Modify: `apps/web/src/features/about/about-page.tsx`
- Modify: `apps/web/src/features/about/buyer-expectations.tsx`
- Modify: `apps/web/src/features/about/supported-buyers.tsx`
- Modify: `apps/web/src/features/procurement-support/**`
- Modify: `apps/web/src/features/catalogues/**`
- Modify: `apps/web/src/features/contact-preview/**`
- Modify: `apps/web/src/features/legal-pages/**`
- Test: `apps/web/src/test/f7-story-pages.test.tsx`
- Test: `apps/web/tests/e2e/f7-story-pages.spec.ts`

**Interfaces:**
- About and procurement media use `MediaFrame` without final paths.
- Contact remains behaviorally unchanged.
- Legal pages receive minimal entrance only.

- [ ] **Step 1: Add story-page composition tests**

Assert all current headings, claims and links remain unchanged and no fabricated timeline milestone is introduced.

- [ ] **Step 2: Build About cinematic framing**

Use media-ready hero and procurement frames. Add timeline/progress treatment only around existing verified content; do not invent dates or history.

- [ ] **Step 3: Polish procurement and catalogue pages**

Sequence process numbers, draw connectors, use paper lift and document indicators without fake page counts or statuses.

- [ ] **Step 4: Polish contact and legal presentation**

Add focus-line, section reveal and card stagger. Keep legal motion minimal.

- [ ] **Step 5: Verify and commit**

Commit: `feat: polish public story and utility pages`

---

### Task 9: Polish inquiry and quotation conversion flow

**Files:**
- Modify: `apps/web/src/features/inquiry/inquiry-page.tsx`
- Modify: `apps/web/src/features/inquiry/quotation-page.tsx`
- Modify: `apps/web/src/styles/f7-premium-polish.css`
- Test: `apps/web/src/test/f7-conversion-polish.test.tsx`
- Test: `apps/web/tests/e2e/f7-conversion-polish.spec.ts`

**Interfaces:**
- Quantity values animate visually while DOM outputs remain immediately accurate.
- Removed lines collapse without delaying storage updates.
- Submission state preserves existing API behavior.

- [ ] **Step 1: Write functional-regression tests**

Prove add, quantity update, note persistence, removal, quotation navigation and enabled submit remain intact.

- [ ] **Step 2: Add line, total and sidebar motion**

Use layout animation for lines, short number transition for totals and a gently sticky desktop summary.

- [ ] **Step 3: Add form and success-state polish**

Reveal by fieldset, morph pending text within the button and use one restrained success check/reveal.

- [ ] **Step 4: Run the existing quotation journey plus new polish checks**

Commit: `feat: polish quotation conversion flow`

---

### Task 10: Responsive restraint, performance and reduced-motion pass

**Files:**
- Modify: `apps/web/src/styles/f7-premium-polish.css`
- Modify: motion primitives as concrete issues are found
- Create: `apps/web/tests/e2e/f7-reduced-motion.spec.ts`
- Create: `apps/web/tests/e2e/f7-responsive-restraint.spec.ts`

**Interfaces:**
- Reduced-motion screenshots and journeys must show all content immediately.
- Coarse-pointer mode removes magnetic, tilt and spotlight tracking.

- [ ] **Step 1: Add browser tests with `reducedMotion: "reduce"`**

Verify homepage, product detail, About, inquiry and quotation content is visible and navigation works.

- [ ] **Step 2: Add coarse-pointer/mobile assertions**

Check no hover-only instructions, no horizontal overflow and no sticky control covering footer links.

- [ ] **Step 3: Review animation density**

Remove effects that repeat without adding hierarchy. Homepage and About may remain memorable; legal, forms and product specifications remain calm.

- [ ] **Step 4: Review performance mechanics**

Confirm no permanent requestAnimationFrame loop, no layout-property scroll animation, local pointer listeners only and reserved media dimensions.

- [ ] **Step 5: Run representative desktop/tablet/mobile journeys and commit**

Commit: `fix: enforce responsive motion restraint`

---

### Task 11: Integrate incoming asset branches without broad conflicts

**Files:**
- Modify only after asset delivery: section media models or one cinematic media manifest
- Avoid broad rewrites of product registry and source data
- Create: `docs/superpowers/completions/2026-08-03-premium-visual-polish.md`
- Modify: `README.md`

**Interfaces:**
- Product branch provides stable product image mappings.
- Cinematic branch provides stable filenames, sources and focal-point recommendations.
- `MediaFrame` consumes final paths, alt text and focal points.

- [ ] **Step 1: Merge or rebase against product-image changes first**

Resolve only wrapper-level conflicts. Preserve product agent mappings and binaries.

- [ ] **Step 2: Integrate cinematic assets through one manifest/model boundary**

Do not scatter hard-coded paths across section components.

- [ ] **Step 3: Apply final crops and overlays**

Use CSS focal points and frame overlays; do not destructively edit source images inside code.

- [ ] **Step 4: Run final visual and functional verification**

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm --filter @rosa/web test:e2e
```

Record exact pass counts and any unavailable environment checks.

- [ ] **Step 5: Update coordination records and commit**

Commit: `docs: complete premium visual polish phase`

## Execution checkpoints

- **Checkpoint 1:** Tasks 1–5 — motion foundation and global shell.
- **Checkpoint 2:** Task 6 — homepage cinematic pass.
- **Checkpoint 3:** Tasks 7–9 — product, story and conversion pages.
- **Checkpoint 4:** Tasks 10–11 — restraint, assets and completion.

At every checkpoint, compare against current `main` and incoming asset branches before broad composition edits. Do not merge unfinished admin workflow or phase-C public behavior into this branch.