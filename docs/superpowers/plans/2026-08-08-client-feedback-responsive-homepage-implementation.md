# Rosa Medical Client-Feedback Responsive Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve the current premium Rosa public-site character while making the homepage materially more viewport-efficient through a width-and-height-aware density system, a four-slide editorial hero carousel, a responsive five-family gallery, shared social links, and refined Noto Sans Arabic typography.

**Architecture:** Add one bounded responsive-density layer that is defined globally but consumed first by the homepage and shared public shell. Replace the static hero with a local four-slide client carousel whose content stays source-controlled, replace the homepage-only family collage with one semantic gallery that becomes a CSS accordion on wide fine-pointer layouts and a native scroll-snap rail elsewhere, and preserve all existing catalogue/Supabase/quotation boundaries. Execute in an isolated worktree from the approved documentation branch; final hero imagery is a deliberate user-supplied dependency and must be integrated before completion.

**Tech Stack:** Next.js 16.2.11, React 19.2, TypeScript 5.9, Motion 12.42.2, CSS custom properties/container queries/media queries, Next `Image` with `images.unoptimized: true`, Vitest 3.2, Playwright 1.57, OpenNext/Cloudflare.

## Global Constraints

- Authoritative implementation base: `ahmadx67676767`; approved design was verified against commit `e7c63bfc319560dcbf98ba713a1b1289e7e71f00`.
- Approved design spec: `docs/superpowers/specs/2026-08-08-client-feedback-responsive-homepage-design.md`.
- Execute in an isolated worktree/feature branch created with `superpowers:using-git-worktrees`; do not implement directly on `ahmadx67676767`.
- Preserve ROSA branding; do not add “Medical” inside the approved ROSA logo mark.
- Preserve existing F7/F8 premium motion by default; only replace choreography that physically conflicts with the new hero/family interactions.
- Exactly four hero slides; user supplies the final four images.
- Hero copy is image-led and must be written after inspecting each supplied image; do not source random replacement hero imagery.
- Autoplay constant: `4_750` ms.
- Persistent hero controls: dots only; no permanent previous/next arrows.
- Maximum two CTAs per slide; one is preferred when one is enough.
- Desktop/laptop initial composition target: complete header + complete hero + approximately 8–15% of the next section visible where content safety permits.
- Responsive density must react to viewport width and height; never use global `transform: scale(...)` or one universal shrink percentage.
- Desktop family gallery: all five families visible simultaneously, active panel expands, inactive panels compress, image + family name only.
- Family-gallery behavior reference only: `https://reactbits.dev/components/accordion-gallery`; do not add React Bits as a runtime dependency.
- Mobile/coarse-pointer family gallery: horizontal native swipe/scroll-snap rail, dominant card plus visible next-card sliver.
- Keep the homepage Catalogue section’s existing visual identity; do not convert it into another accordion.
- Social platforms: Instagram, Facebook, LinkedIn, X; one central shared registry; footer on every public page + dedicated Contact treatment; valid external placeholder destinations, never `href="#"`.
- Arabic font remains Noto Sans Arabic; refine weight, size, line-height, wrapping, and rhythm rather than replacing the family.
- Preserve bounded public catalogue reads, cookie-free public Supabase reads, reduced navigation prefetch, existing product media relationships, quotation/inquiry behavior, and protected `/admin/**` auth.
- No production Supabase DDL/DML, no Storage deletion, no schema migration, no OpenAPI change, no `services/api/**` change.
- No paid Cloudflare Images or other paid runtime image-transformation infrastructure.
- Development visual loop uses five sizes: 360×800, 390×844, 768×1024, 1366×768, 1920×1080.
- Final acceptance explicitly reviews all eleven: 360×800, 390×844, 430×932, 768×1024, 1024×768, 1280×720, 1366×768, 1440×900, 1536×864, 1920×1080, 2560×1440.
- Do not merge or deploy without explicit user instruction.

---

## File Structure Lock

### New files

- `apps/web/src/styles/public-density.css` — reusable density tokens plus homepage/shared-shell consumption and short-viewport rules.
- `apps/web/src/features/homepage/home-hero-slides.ts` — exact four-slide source-controlled content/types, localized text, desktop/mobile media paths, focal points, tone, and physical copy side.
- `apps/web/src/features/homepage/hero-carousel-state.ts` — pure timing/index/autoplay helpers.
- `apps/web/src/features/homepage/sections/home-hero-carousel.tsx` — client carousel state, dots, keyboard, swipe, progressive loading, and active-slide rendering.
- `apps/web/src/features/homepage/sections/home-family-gallery.tsx` — semantic five-family homepage gallery; one DOM tree, CSS switches rail/accordion.
- `apps/web/src/features/social-links/social-links.ts` — exact four-platform central registry.
- `apps/web/src/features/social-links/social-links-row.tsx` — reusable renderer.
- `apps/web/src/features/social-links/index.ts` — exports.
- `apps/web/src/test/home-hero-carousel-state.test.ts` — pure state tests.
- `apps/web/src/test/client-feedback-homepage-contract.test.ts` — static/source contracts.
- `apps/web/tests/e2e/client-feedback-homepage.spec.ts` — hero/family/social/RTL/reduced-motion interaction coverage.
- `apps/web/tests/e2e/client-feedback-responsive-matrix.spec.ts` — explicit eleven-size geometry/screenshot harness.
- `tools/prepare_home_hero_media.py` — offline-only local derivative generator for the four supplied images.

### Existing files to modify

- `apps/web/src/app/globals.css`
- `apps/web/src/features/homepage/homepage.tsx`
- `apps/web/src/features/homepage/homepage.data.ts`
- `apps/web/src/features/homepage/sections/family-discovery.tsx`
- `apps/web/src/features/homepage/sections/home-hero.tsx` — delete only after replacement compiles.
- `apps/web/src/features/localization/public-copy.ts`
- `apps/web/src/components/layout/public-shell.tsx`
- `apps/web/src/features/contact-preview/contact-page.tsx`
- `apps/web/src/features/contact-preview/contact-information-model.ts`
- `apps/web/src/styles/rtl.css` only for narrow direction mechanics that cannot stay local.
- `apps/web/src/test/public-performance-policy.test.ts`
- `apps/web/tests/e2e/f7-homepage-polish.spec.ts`
- `apps/web/tests/e2e/f7-responsive-restraint.spec.ts`

### Deliberately unchanged

- `apps/web/src/features/catalogue-live/**`
- `apps/web/src/lib/supabase/**`
- `apps/web/src/features/admin-*/**`
- `packages/contracts/**`
- `services/api/**`
- database migrations
- product-media write paths

---

### Task 1: Create the Responsive-Density Foundation

**Files:**
- Create: `apps/web/src/styles/public-density.css`
- Modify: `apps/web/src/app/globals.css`
- Test: `apps/web/src/test/client-feedback-homepage-contract.test.ts`

**Interfaces:**
- Consumes existing colour/type/spacing/motion tokens.
- Produces `--public-density-*` tokens used by Tasks 4, 6, 7, 8, and 9.

- [ ] **Step 1: Write the failing import/token contract**

```ts
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

function source(path: string): string {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

describe("client-feedback responsive homepage contract", () => {
  it("loads the dedicated density layer after owner refinement", () => {
    const globals = source("src/app/globals.css");
    expect(globals.indexOf('../styles/public-density.css')).toBeGreaterThan(
      globals.indexOf('../styles/f8-owner-refinement.css')
    );

    const density = source("src/styles/public-density.css");
    expect(density).toContain("--public-density-section-block");
    expect(density).toContain("--public-density-hero-title");
    expect(density).toContain("@media (max-height: 800px)");
    expect(density).not.toContain("transform: scale(0.");
  });
});
```

- [ ] **Step 2: Verify RED**

```bash
pnpm --filter @rosa/web test -- src/test/client-feedback-homepage-contract.test.ts
```

Expected: FAIL because the file/import does not exist.

- [ ] **Step 3: Add the density token layer**

```css
:root {
  --public-density-gutter: clamp(1.1rem, 3.25vw, 4rem);
  --public-density-header-block: clamp(4.25rem, 6.2vh, 4.75rem);
  --public-density-section-block: clamp(3.25rem, 6.2vw, 5.75rem);
  --public-density-section-block-compact: clamp(2.5rem, 4.5vw, 4.25rem);
  --public-density-hero-title: clamp(2.45rem, 4.2vw, 3.85rem);
  --public-density-section-title: clamp(2rem, 3.1vw, 2.75rem);
  --public-density-body: clamp(1rem, 0.3vw + 0.94rem, 1.06rem);
  --public-density-family-block: clamp(19rem, 33vw, 26rem);
}

.public-page--home .section { padding-block: var(--public-density-section-block); }
.public-page--home .section--compact { padding-block: var(--public-density-section-block-compact); }
.site-header__bar { min-height: var(--public-density-header-block); }

@media (max-height: 800px) and (min-width: 64.001rem) {
  :root {
    --public-density-section-block: clamp(2.75rem, 5.4vh, 4rem);
    --public-density-section-block-compact: clamp(2.2rem, 4.3vh, 3.25rem);
    --public-density-family-block: clamp(18rem, 42vh, 22rem);
  }
}

@media (max-width: 40rem) {
  :root {
    --public-density-gutter: clamp(1rem, 4.8vw, 1.35rem);
    --public-density-section-block: clamp(2.75rem, 10vw, 3.75rem);
    --public-density-hero-title: clamp(2.25rem, 10.7vw, 2.9rem);
    --public-density-section-title: clamp(1.9rem, 8.5vw, 2.4rem);
  }
}
```

Import after the current owner-refinement layer:

```css
@import "../styles/f8-owner-refinement.css";
@import "../styles/public-density.css";
```

- [ ] **Step 4: Run focused test, lint, and typecheck**

```bash
pnpm --filter @rosa/web test -- src/test/client-feedback-homepage-contract.test.ts
pnpm --filter @rosa/web lint
pnpm --filter @rosa/web typecheck
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/styles/public-density.css apps/web/src/app/globals.css apps/web/src/test/client-feedback-homepage-contract.test.ts
git commit -m "feat(web): add responsive public density foundation"
```

---

### Task 2: Define the Exact Four-Slide Hero Contract

**Files:**
- Create: `apps/web/src/features/homepage/home-hero-slides.ts`
- Modify: `apps/web/src/features/homepage/homepage.data.ts`
- Modify: `apps/web/src/features/localization/public-copy.ts`
- Test: `apps/web/src/test/client-feedback-homepage-contract.test.ts`

**Interfaces:**

```ts
export type HeroCopySide = "left" | "right";
export type HeroTone = "dark" | "light";
export interface LocalizedHeroText { en: string; ar: string; }
export interface HeroImage {
  desktopSrc: string;
  mobileSrc: string;
  alt: LocalizedHeroText;
  desktopFocalPoint: string;
  mobileFocalPoint: string;
}
export interface HomeHeroCta {
  label: LocalizedHeroText;
  href: Route<string>;
  variant?: "primary" | "secondary";
}
export interface HomeHeroSlide {
  id: string;
  image: HeroImage;
  copySide: HeroCopySide;
  tone: HeroTone;
  eyebrow: LocalizedHeroText;
  title: LocalizedHeroText;
  copy: LocalizedHeroText;
  ctas: readonly HomeHeroCta[];
}
export const HOME_HERO_SLIDES: readonly [HomeHeroSlide, HomeHeroSlide, HomeHeroSlide, HomeHeroSlide];
```

- [ ] **Step 1: Extend the failing contract test**

```ts
import { HOME_HERO_SLIDES } from "@/features/homepage/home-hero-slides";

it("defines exactly four bounded hero slides", () => {
  expect(HOME_HERO_SLIDES).toHaveLength(4);
  expect(new Set(HOME_HERO_SLIDES.map((slide) => slide.id)).size).toBe(4);
  expect(HOME_HERO_SLIDES.every((slide) => slide.ctas.length >= 1 && slide.ctas.length <= 2)).toBe(true);
  expect(HOME_HERO_SLIDES.every((slide) => slide.image.desktopSrc.startsWith("/media/"))).toBe(true);
  expect(HOME_HERO_SLIDES.every((slide) => slide.image.mobileSrc.startsWith("/media/"))).toBe(true);
});
```

- [ ] **Step 2: Verify RED**

```bash
pnpm --filter @rosa/web test -- src/test/client-feedback-homepage-contract.test.ts
```

- [ ] **Step 3: Implement the source-controlled slide types and temporary development records**

Use `HOME_HERO_MEDIA.src` for both `desktopSrc` and `mobileSrc` in all four development records until Task 5. Reuse the currently approved hero eyebrow/title/copy/CTAs for all four development records rather than inventing interim marketing claims. Give the four records unique IDs and alternate physical `copySide` values only so carousel behavior/composition can be implemented before final imagery arrives.

```ts
const developmentImage = {
  desktopSrc: HOME_HERO_MEDIA.src,
  mobileSrc: HOME_HERO_MEDIA.src,
  alt: { en: HOME_HERO_MEDIA.alt, ar: HOME_HERO_MEDIA.altAr ?? HOME_HERO_MEDIA.alt },
  desktopFocalPoint: HOME_HERO_MEDIA.focalPoint ?? "50% 50%",
  mobileFocalPoint: "58% 52%"
} as const;

const approvedDevelopmentCopy = {
  eyebrow: { en: "Medical instruments supplier", ar: "مورّد أدوات طبية" },
  title: { en: "Precision instruments. Procurement made clear.", ar: "أدوات دقيقة. ومشتريات أكثر وضوحًا." },
  copy: {
    en: "A composed catalogue and quotation experience for hospitals, distributors and procurement teams.",
    ar: "تجربة منظمة لاستعراض الكتالوجات وطلب عروض الأسعار للمستشفيات والموزعين وفرق المشتريات."
  },
  ctas: [
    { label: { en: "Explore Products", ar: "استعرض المنتجات" }, href: "/products" as const },
    { label: { en: "Request a Quote", ar: "اطلب عرض سعر" }, href: "/request-quotation" as const, variant: "secondary" as const }
  ]
} as const;

export const HOME_HERO_SLIDES = [
  { id: "hero-development-01", image: developmentImage, copySide: "left", tone: "dark", ...approvedDevelopmentCopy },
  { id: "hero-development-02", image: developmentImage, copySide: "right", tone: "dark", ...approvedDevelopmentCopy },
  { id: "hero-development-03", image: developmentImage, copySide: "left", tone: "dark", ...approvedDevelopmentCopy },
  { id: "hero-development-04", image: developmentImage, copySide: "right", tone: "dark", ...approvedDevelopmentCopy }
] as const satisfies readonly [HomeHeroSlide, HomeHeroSlide, HomeHeroSlide, HomeHeroSlide];
```

Add a localization helper that selects `en`/`ar` but does not mirror `copySide`.

Remove the old single `hero` object from `HOME_PAGE_MODEL` and `HOME_PAGE_MODEL_AR` because carousel data now owns hero content.

Update family intro direction to:

```ts
familyIntro: {
  eyebrow: "Our products",
  title: "Explore the ROSA instrument collection.",
  copy: "Five focused instrument collections, presented clearly for product browsing."
}
```

Arabic:

```ts
familyIntro: {
  eyebrow: "منتجاتنا",
  title: "استكشف مجموعة أدوات روزا.",
  copy: "خمس مجموعات مركزة من الأدوات، مقدمة بوضوح لاستعراض المنتجات."
}
```

- [ ] **Step 4: Run tests/typecheck**

```bash
pnpm --filter @rosa/web test -- src/test/client-feedback-homepage-contract.test.ts
pnpm --filter @rosa/web typecheck
```

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/features/homepage/home-hero-slides.ts apps/web/src/features/homepage/homepage.data.ts apps/web/src/features/localization/public-copy.ts apps/web/src/test/client-feedback-homepage-contract.test.ts
git commit -m "feat(web): define four-slide homepage hero contract"
```

---

### Task 3: Implement Testable Carousel State and Interaction

**Files:**
- Create: `apps/web/src/features/homepage/hero-carousel-state.ts`
- Create: `apps/web/src/features/homepage/sections/home-hero-carousel.tsx`
- Create: `apps/web/src/test/home-hero-carousel-state.test.ts`
- Modify: `apps/web/src/features/homepage/homepage.tsx`
- Delete: `apps/web/src/features/homepage/sections/home-hero.tsx`
- Modify: `apps/web/tests/e2e/f7-homepage-polish.spec.ts`

**Interfaces:**

```ts
export const HERO_AUTOPLAY_MS = 4_750;
export interface HeroAutoplayState {
  reducedMotion: boolean;
  hovered: boolean;
  focused: boolean;
  dragging: boolean;
  hidden: boolean;
}
export function nextHeroSlideIndex(index: number, count: number): number;
export function previousHeroSlideIndex(index: number, count: number): number;
export function shouldHeroAutoplay(state: HeroAutoplayState): boolean;
```

- [ ] **Step 1: Write failing pure-state tests**

```ts
import { describe, expect, it } from "vitest";
import {
  HERO_AUTOPLAY_MS,
  nextHeroSlideIndex,
  previousHeroSlideIndex,
  shouldHeroAutoplay
} from "@/features/homepage/hero-carousel-state";

describe("homepage hero carousel state", () => {
  it("uses the approved autoplay interval", () => expect(HERO_AUTOPLAY_MS).toBe(4_750));
  it("wraps forward and backward", () => {
    expect(nextHeroSlideIndex(3, 4)).toBe(0);
    expect(previousHeroSlideIndex(0, 4)).toBe(3);
  });
  it.each([
    { reducedMotion: true }, { hovered: true }, { focused: true }, { dragging: true }, { hidden: true }
  ])("pauses for blocked autoplay state %#", (override) => {
    expect(shouldHeroAutoplay({
      reducedMotion: false, hovered: false, focused: false, dragging: false, hidden: false, ...override
    })).toBe(false);
  });
  it("autoplays only while fully active", () => {
    expect(shouldHeroAutoplay({ reducedMotion: false, hovered: false, focused: false, dragging: false, hidden: false })).toBe(true);
  });
});
```

- [ ] **Step 2: Verify RED**

```bash
pnpm --filter @rosa/web test -- src/test/home-hero-carousel-state.test.ts
```

- [ ] **Step 3: Implement the pure helpers**

```ts
export const HERO_AUTOPLAY_MS = 4_750;

export interface HeroAutoplayState {
  reducedMotion: boolean;
  hovered: boolean;
  focused: boolean;
  dragging: boolean;
  hidden: boolean;
}

function assertCount(count: number): void {
  if (!Number.isInteger(count) || count < 1) throw new Error("Hero carousel requires at least one slide.");
}

export function nextHeroSlideIndex(index: number, count: number): number {
  assertCount(count);
  return (index + 1) % count;
}

export function previousHeroSlideIndex(index: number, count: number): number {
  assertCount(count);
  return (index - 1 + count) % count;
}

export function shouldHeroAutoplay(state: HeroAutoplayState): boolean {
  return !state.reducedMotion && !state.hovered && !state.focused && !state.dragging && !state.hidden;
}
```

- [ ] **Step 4: Run helper tests and confirm GREEN**

```bash
pnpm --filter @rosa/web test -- src/test/home-hero-carousel-state.test.ts
```

- [ ] **Step 5: Implement the client carousel**

`home-hero-carousel.tsx` must:

- use `"use client"`;
- localize `HOME_HERO_SLIDES` once per locale;
- use `useReducedMotion()` from `motion/react`;
- keep active index plus hover/focus/drag/document-hidden state;
- schedule one timeout only while `shouldHeroAutoplay(...)` is true;
- pause on hover, focus-within, drag, document hidden, and reduced motion;
- reset timer after manual selection;
- keep current slide visible while a requested not-yet-loaded image is preloaded;
- choose preload source using `window.matchMedia("(max-width: 40rem)")` so mobile loads `mobileSrc` and desktop loads `desktopSrc`;
- render exactly four dot buttons with 44px usable targets and `aria-current` on the active one;
- support Left/Right keys while dot group is focused;
- use pointer drag threshold 48px with `touch-action: pan-y` so vertical scrolling remains natural;
- render no permanent previous/next arrows;
- use one hero region with `aria-roledescription="carousel"` and one active slide with `aria-roledescription="slide"`;
- avoid an autoplay live-region announcement.

Hero image rendering must support separate desktop/mobile derivatives from Task 2:

```tsx
<div className="home-hero-carousel__media" data-media-slot="homepage-hero-active">
  <picture>
    <source media="(max-width: 40rem)" srcSet={slide.image.mobileSrc} />
    <Image
      src={slide.image.desktopSrc}
      alt={slide.image.alt}
      fill
      priority={activeIndex === 0}
      sizes="100vw"
      style={{ objectFit: "cover" }}
    />
  </picture>
</div>
```

Expose focal points as CSS variables on the active slide root:

```tsx
style={{
  "--hero-desktop-focal": slide.image.desktopFocalPoint,
  "--hero-mobile-focal": slide.image.mobileFocalPoint
} as React.CSSProperties}
```

Use stable hooks:

```tsx
<section
  className="home-hero public-hero home-hero-carousel"
  data-section="home-hero"
  data-home-choreography="carousel"
  data-active-slide={slide.id}
  aria-roledescription="carousel"
  aria-labelledby="home-title"
>
```

- [ ] **Step 6: Wire Homepage to the carousel and remove old static hero**

Replace the old `<HomeHero model={model.hero} ... />` with:

```tsx
<HomeHeroCarousel locale={locale} />
```

Keep `getFeaturedCatalogueProducts()` exactly once and preserve all six section order positions.

- [ ] **Step 7: Update existing F7 homepage assumptions**

Replace old static-hero minimum-height/tilt assertions with:

```ts
await expect(page.locator("[data-home-choreography='carousel']")).toHaveCount(1);
await expect(page.locator(".home-hero-carousel__dot")).toHaveCount(4);
await expect(page.locator(".home-hero-carousel__dot[aria-current='true']")).toHaveCount(1);
```

Keep existing section presence, image natural-width, catalogue presence, quotation CTA, and horizontal-overflow checks.

- [ ] **Step 8: Run focused verification**

```bash
pnpm --filter @rosa/web test -- src/test/home-hero-carousel-state.test.ts src/test/client-feedback-homepage-contract.test.ts
pnpm --filter @rosa/web typecheck
pnpm --filter @rosa/web test:e2e -- tests/e2e/f7-homepage-polish.spec.ts --project=desktop
```

- [ ] **Step 9: Commit**

```bash
git add apps/web/src/features/homepage/hero-carousel-state.ts apps/web/src/features/homepage/sections/home-hero-carousel.tsx apps/web/src/features/homepage/homepage.tsx apps/web/src/features/homepage/sections/home-hero.tsx apps/web/src/test/home-hero-carousel-state.test.ts apps/web/tests/e2e/f7-homepage-polish.spec.ts
git commit -m "feat(web): add accessible four-slide homepage carousel"
```

---

### Task 4: Make Hero and Shared Header Viewport-Aware

**Files:**
- Modify: `apps/web/src/styles/public-density.css`
- Modify: `apps/web/src/features/homepage/sections/home-hero-carousel.tsx`
- Create: `apps/web/tests/e2e/client-feedback-homepage.spec.ts`

**Interfaces:**
- Consumes Task 1 density variables and Task 3 test hooks.

- [ ] **Step 1: Write failing short-laptop and mobile geometry tests**

```ts
import { expect, test, type Page } from "@playwright/test";

async function nextSectionRatio(page: Page): Promise<number> {
  return page.evaluate(() => {
    const next = document.querySelector<HTMLElement>("[data-section='family-discovery']");
    if (!next) throw new Error("Family discovery missing");
    return next.getBoundingClientRect().top / innerHeight;
  });
}

test("1366x768 exposes roughly 8-15 percent continuation after the hero", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/");
  const ratio = await nextSectionRatio(page);
  expect(ratio).toBeGreaterThanOrEqual(0.84);
  expect(ratio).toBeLessThanOrEqual(0.92);
});

test("390x844 keeps message CTA and image inside a compact integrated hero", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/");
  await expect(page.locator(".home-hero__title")).toBeVisible();
  await expect(page.locator("[data-media-slot='homepage-hero-active']")).toBeVisible();
  const hero = await page.locator("[data-section='home-hero']").boundingBox();
  expect(hero).not.toBeNull();
  expect(hero!.height).toBeLessThan(760);
});
```

- [ ] **Step 2: Verify RED against current scale**

```bash
pnpm --filter @rosa/web test:e2e -- tests/e2e/client-feedback-homepage.spec.ts --project=desktop --project=mobile
```

- [ ] **Step 3: Implement adaptive geometry without fixed-height clipping**

Use `min-height`, not a rigid `height`, so 200% text scaling can expand the hero safely:

```css
.home-hero-carousel {
  min-height: clamp(
    34rem,
    calc(100svh - var(--public-density-header-block) - 9svh),
    54rem
  );
  height: auto;
  padding-block: 0;
  display: grid;
  align-items: stretch;
  isolation: isolate;
  background: #0e0e0d;
  color: var(--color-paper);
}

.home-hero-carousel__slide {
  position: relative;
  min-height: inherit;
  display: grid;
  align-items: center;
  overflow: clip;
}

.home-hero-carousel__media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.home-hero-carousel__media img {
  object-position: var(--hero-desktop-focal, 50% 50%);
}

.home-hero-carousel__content {
  position: relative;
  z-index: 3;
  width: min(calc(100% - (2 * var(--public-density-gutter))), var(--container-wide));
  margin-inline: auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
}

.home-hero-carousel__copy {
  width: min(100%, 38rem);
  padding-block: clamp(2rem, 5vh, 4rem);
}

.home-hero-carousel__slide[data-copy-side="right"] .home-hero-carousel__copy {
  grid-column: 2;
  justify-self: end;
}

.home-hero__title {
  max-width: 12ch;
  font-size: var(--public-density-hero-title);
  line-height: 1.08;
}
```

Small-screen composition:

```css
@media (max-width: 40rem) {
  .home-hero-carousel {
    min-height: clamp(
      34rem,
      calc(100svh - var(--public-density-header-block) - 4svh),
      42rem
    );
  }

  .home-hero-carousel__content {
    min-height: inherit;
    grid-template-columns: 1fr;
    align-items: end;
    padding-bottom: clamp(4.25rem, 11vh, 6rem);
  }

  .home-hero-carousel__copy,
  .home-hero-carousel__slide[data-copy-side="right"] .home-hero-carousel__copy {
    grid-column: 1;
    justify-self: start;
    width: min(100%, 29rem);
    padding-block: 0;
  }

  .home-hero-carousel__media img {
    object-position: var(--hero-mobile-focal, 50% 50%);
  }
}
```

Add physical left/right overlays with `data-copy-side`; do not mirror them automatically for Arabic.

- [ ] **Step 4: Add dots/touch/reduced-motion CSS**

```css
.home-hero-carousel { touch-action: pan-y; }

.home-hero-carousel__dots {
  position: absolute;
  z-index: 5;
  inset: auto var(--public-density-gutter) clamp(1rem, 2.5vh, 1.6rem) auto;
  display: flex;
  gap: 0.35rem;
}

.home-hero-carousel__dot {
  width: 2.75rem;
  min-height: 2.75rem;
  display: grid;
  place-items: center;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
}

.home-hero-carousel__dot::before {
  content: "";
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.48);
}

.home-hero-carousel__dot[aria-current="true"]::before {
  width: 1.45rem;
  border-radius: 999px;
  background: var(--color-paper);
}

@media (prefers-reduced-motion: reduce) {
  .home-hero-carousel__slide,
  .home-hero-carousel__media img,
  .home-hero-carousel__dot::before {
    transition: none !important;
    transform: none !important;
  }
}
```

- [ ] **Step 5: Run browser checks at representative sizes**

```bash
pnpm --filter @rosa/web test:e2e -- tests/e2e/client-feedback-homepage.spec.ts --project=desktop --project=mobile
```

Then inspect 360×800, 390×844, 768×1024, 1366×768, 1920×1080 in the browser and capture local review screenshots.

- [ ] **Step 6: Commit**

```bash
git add apps/web/src/styles/public-density.css apps/web/src/features/homepage/sections/home-hero-carousel.tsx apps/web/tests/e2e/client-feedback-homepage.spec.ts
git commit -m "feat(web): fit homepage hero to viewport density"
```

---

### Task 5: Integrate the Four User-Supplied Hero Images and Final Image-Led Copy

**Files:**
- Create: `tools/prepare_home_hero_media.py`
- Create: `apps/web/public/media/editorial/home-hero/v1/home-hero-01-desktop.webp`
- Create: `apps/web/public/media/editorial/home-hero/v1/home-hero-01-mobile.webp`
- Create equivalent `02`, `03`, `04` desktop/mobile files.
- Modify: `apps/web/src/features/homepage/home-hero-slides.ts`
- Modify: `apps/web/src/test/client-feedback-homepage-contract.test.ts`
- Modify: `apps/web/src/test/public-performance-policy.test.ts`

**Interfaces:**
- Keeps Task 2 `HomeHeroSlide` shape unchanged.
- Final paths are deterministic `/media/editorial/home-hero/v1/home-hero-0N-{desktop|mobile}.webp`.

**External dependency:** Execute only after the user provides four actual hero images. If execution reaches this task first, stop here and request those four files. Do not substitute web-sourced images.

- [ ] **Step 1: Review each supplied image before editing code**

Record for each image: source dimensions, subject placement, negative space, desktop focal point, mobile focal point, overlay strength, physical copy side, image-supported marketing/editorial message, CTA opportunity, slide order, and medical-homepage suitability.

- [ ] **Step 2: Create the complete offline derivative script**

```py
from __future__ import annotations

import argparse
from pathlib import Path
from PIL import Image, ImageOps

DESKTOP_MAX = (1920, 1080)
MOBILE_MAX = (960, 1200)
QUALITY = 88


def render(source: Path, output: Path, max_size: tuple[int, int]) -> None:
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        image.thumbnail(max_size, Image.Resampling.LANCZOS)
        output.parent.mkdir(parents=True, exist_ok=True)
        image.save(output, "WEBP", quality=QUALITY, method=6)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("sources", nargs=4, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()

    for index, source in enumerate(args.sources, start=1):
        if not source.is_file():
            raise SystemExit(f"Missing hero source: {source}")
        stem = f"home-hero-{index:02d}"
        render(source, args.output / f"{stem}-desktop.webp", DESKTOP_MAX)
        render(source, args.output / f"{stem}-mobile.webp", MOBILE_MAX)


if __name__ == "__main__":
    main()
```

Install local-only Pillow if the execution environment does not already provide it:

```bash
python -m pip install Pillow
```

Run with the four exact mounted/uploaded source paths returned by the current environment:

```bash
python tools/prepare_home_hero_media.py "$SLIDE_01" "$SLIDE_02" "$SLIDE_03" "$SLIDE_04" \
  --output apps/web/public/media/editorial/home-hero/v1
```

This script resizes only; it does not blindly crop. Focal crop remains CSS `object-position` unless visual review justifies a deliberate manual crop for a specific source.

- [ ] **Step 3: Replace development records with final media and image-led copy**

For each slide, set exact desktop/mobile paths, actual alt text, reviewed focal points, physical copy side, overlay/tone, and copy/CTA(s) supported by that photograph. Preserve one or two CTAs only. Do not retain the repeated Task 2 development copy unless the image genuinely supports it.

- [ ] **Step 4: Add final-asset contracts**

Assert all eight files exist, all paths are local `/media/`, slide IDs no longer use `hero-development-*`, and exactly one rendered hero image is priority/eager.

- [ ] **Step 5: Audit bytes and visual quality**

```bash
find apps/web/public/media/editorial/home-hero/v1 -maxdepth 1 -type f -print0 | xargs -0 ls -lh
```

Targets: desktop ideally ≤350 KB each; mobile ideally ≤220 KB each. If a file must exceed target to preserve professional detail, record the reason in completion evidence.

Review every slide at 390×844, 1366×768, and 1920×1080 before commit.

- [ ] **Step 6: Run tests and commit**

```bash
pnpm --filter @rosa/web test -- src/test/client-feedback-homepage-contract.test.ts src/test/public-performance-policy.test.ts
pnpm --filter @rosa/web typecheck
git add tools/prepare_home_hero_media.py apps/web/public/media/editorial/home-hero/v1 apps/web/src/features/homepage/home-hero-slides.ts apps/web/src/test/client-feedback-homepage-contract.test.ts apps/web/src/test/public-performance-policy.test.ts
git commit -m "feat(web): integrate client-supplied homepage hero media"
```

---

### Task 6: Replace the Homepage Family Collage with One Responsive Five-Family Gallery

**Files:**
- Create: `apps/web/src/features/homepage/sections/home-family-gallery.tsx`
- Modify: `apps/web/src/features/homepage/sections/family-discovery.tsx`
- Modify: `apps/web/src/styles/public-density.css`
- Modify: `apps/web/src/test/client-feedback-homepage-contract.test.ts`
- Modify: `apps/web/tests/e2e/client-feedback-homepage.spec.ts`

**Interfaces:**

```ts
export function HomeFamilyGallery({
  families,
  locale
}: {
  families: readonly FamilyCardModel[];
  locale?: PublicLocale;
}): ReactElement;
```

- [ ] **Step 1: Add failing family contracts**

```ts
it("uses a dedicated five-family homepage gallery instead of FamilyCard collage", () => {
  const discovery = source("src/features/homepage/sections/family-discovery.tsx");
  const gallery = source("src/features/homepage/sections/home-family-gallery.tsx");
  expect(discovery).toContain("HomeFamilyGallery");
  expect(discovery).not.toContain("FamilyCard");
  expect(gallery).toContain("data-home-family-gallery");
  expect(gallery).not.toContain("Explore collection");
});
```

- [ ] **Step 2: Verify RED**

```bash
pnpm --filter @rosa/web test -- src/test/client-feedback-homepage-contract.test.ts
```

- [ ] **Step 3: Render one semantic markup tree**

```tsx
export function HomeFamilyGallery({ families, locale = "en" }: {
  families: readonly FamilyCardModel[];
  locale?: PublicLocale;
}): ReactElement {
  return (
    <div className="home-family-gallery-shell">
      <ul className="home-family-gallery" data-home-family-gallery aria-label={locale === "ar" ? "منتجات روزا" : "ROSA products"}>
        {families.map((family) => (
          <li key={family.slug} className="home-family-gallery__panel" data-family-panel data-family={family.slug}>
            <LocaleLink className="home-family-gallery__link" href={familyHref(family.slug)}>
              <MediaFrame
                src={family.media.src}
                alt={publicMediaAlt(family.media, locale)}
                aspect="landscape"
                focalPoint={family.media.focalPoint}
                fit={family.media.fit}
                tone="light"
                className="home-family-gallery__media"
                sizes="(max-width: 56rem) 84vw, 28vw"
              />
              <h3 className="home-family-gallery__title">{family.name}</h3>
            </LocaleLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

`FamilyDiscovery` retains the section heading and renders this gallery. Remove homepage-only `Stagger`, `StaggerItem`, and `FamilyCard` usage from this section.

- [ ] **Step 4: Implement native rail as the default**

```css
.home-family-gallery-shell { container-type: inline-size; min-width: 0; overflow: hidden; }
.home-family-gallery {
  display: flex;
  gap: clamp(0.8rem, 2.5vw, 1.25rem);
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  list-style: none;
  margin: 0;
  padding: 0 var(--public-density-gutter) 0 0;
}
.home-family-gallery::-webkit-scrollbar { display: none; }
.home-family-gallery__panel {
  flex: 0 0 min(84%, 24rem);
  min-width: 0;
  height: clamp(14rem, 47vw, 18rem);
  scroll-snap-align: start;
  overflow: hidden;
  background: var(--color-ink);
}
.home-family-gallery__link { position: relative; height: 100%; display: block; overflow: hidden; color: var(--color-paper); text-decoration: none; }
.home-family-gallery__media { position: absolute; inset: 0; width: 100%; height: 100%; aspect-ratio: auto !important; }
.home-family-gallery__title {
  position: absolute;
  z-index: 2;
  inset: auto 1.25rem 1.1rem;
  margin: 0;
  font-family: var(--font-editorial);
  font-size: clamp(1.8rem, 6.5vw, 2.35rem);
  font-weight: 400;
  line-height: 1.05;
}
```

- [ ] **Step 5: Add wide fine-pointer accordion mode**

```css
@media (hover: hover) and (pointer: fine) {
  @container (min-width: 56rem) {
    .home-family-gallery {
      height: var(--public-density-family-block);
      overflow: hidden;
      padding: 0;
      gap: 0.65rem;
      scroll-snap-type: none;
    }
    .home-family-gallery__panel {
      flex: 1 1 0;
      height: 100%;
      transition: flex-grow var(--motion-section) var(--motion-ease-emphasized);
    }
    .home-family-gallery__panel:first-child { flex-grow: 2.8; }
    .home-family-gallery:has(.home-family-gallery__panel:hover, .home-family-gallery__panel:focus-within) .home-family-gallery__panel { flex-grow: 1; }
    .home-family-gallery:has(.home-family-gallery__panel:hover, .home-family-gallery__panel:focus-within) .home-family-gallery__panel:hover,
    .home-family-gallery:has(.home-family-gallery__panel:hover, .home-family-gallery__panel:focus-within) .home-family-gallery__panel:focus-within { flex-grow: 2.8; }
    .home-family-gallery__title { font-size: clamp(1.5rem, 2.25vw, 2.15rem); }
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-family-gallery__panel,
  .home-family-gallery__media img { transition: none !important; }
}
```

Knives is the deterministic initial expanded panel. Focus changes active width without JavaScript. All five links remain visible/focusable.

- [ ] **Step 6: Add explicit browser mode checks**

Verify:

- 768×1024 = horizontal rail;
- 1024×768 desktop/fine pointer = accordion when usable container ≥56rem;
- coarse pointer uses rail even when wide;
- mobile first card ~82–86% width and next-card sliver visible;
- focus/hover on Chisels makes it wider than an inactive panel;
- exactly five links, image + family name only.

- [ ] **Step 7: Run and commit**

```bash
pnpm --filter @rosa/web test -- src/test/client-feedback-homepage-contract.test.ts
pnpm --filter @rosa/web test:e2e -- tests/e2e/client-feedback-homepage.spec.ts --project=desktop --project=tablet --project=mobile
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/homepage/sections/home-family-gallery.tsx apps/web/src/features/homepage/sections/family-discovery.tsx apps/web/src/styles/public-density.css apps/web/src/test/client-feedback-homepage-contract.test.ts apps/web/tests/e2e/client-feedback-homepage.spec.ts
git commit -m "feat(web): add responsive homepage family gallery"
```

---

### Task 7: Tune Remaining Homepage Density Without Redesigning Sections

**Files:**
- Modify: `apps/web/src/styles/public-density.css`
- Modify: `apps/web/tests/e2e/client-feedback-homepage.spec.ts`
- Modify existing homepage section components only if a semantic test hook is required.

- [ ] **Step 1: Add preservation assertions first**

```ts
const sections = ["home-hero", "family-discovery", "procurement-support", "featured-instruments", "catalogue-access", "quotation-cta"];
for (const section of sections) {
  await expect(page.locator(`[data-section='${section}']`)).toHaveCount(1);
}
await expect(page.locator("[data-section='catalogue-access'] [data-media-slot^='homepage-catalogue-']")).toHaveCount(5);
```

- [ ] **Step 2: Apply homepage-scoped density only**

```css
.public-page--home .public-section-heading { margin-bottom: clamp(1.75rem, 4vw, 3rem); }
.public-page--home .public-section-heading__title,
.public-page--home .procurement-panel__title,
.public-page--home .procurement-editorial__title { font-size: var(--public-density-section-title); }
.public-page--home .public-section-heading__copy,
.public-page--home .procurement-editorial__body,
.public-page--home .procurement-panel__copy { font-size: var(--public-density-body); }
.public-page--home .procurement-editorial,
.public-page--home .product-preview-grid { gap: clamp(1.25rem, 3vw, 2.25rem); }
.public-page--home .procurement-editorial__media-reveal,
.public-page--home .procurement-editorial__visual { min-height: clamp(20rem, 34vw, 28rem); }
.public-page--home .product-preview-card__body { min-height: clamp(8.5rem, 14vw, 10.5rem); }
.public-page--home .catalogue-card { min-height: clamp(14rem, 22vw, 17rem); }
.public-page--home .procurement-panel { padding: clamp(2rem, 4vw, 3.25rem); }

@media (max-height: 800px) and (min-width: 64.001rem) {
  .public-page--home .procurement-editorial__media-reveal,
  .public-page--home .procurement-editorial__visual { min-height: 20rem; }
  .public-page--home .catalogue-card { min-height: 13.5rem; }
}
```

Do not convert Catalogue Access into an accordion or rail.

- [ ] **Step 3: Review the five development viewports**

Review 360×800, 390×844, 768×1024, 1366×768, 1920×1080 for section rhythm, image height, title wrapping, and preservation of current Catalogue visual identity.

- [ ] **Step 4: Run regression specs and commit**

```bash
pnpm --filter @rosa/web test:e2e -- tests/e2e/f7-homepage-polish.spec.ts tests/e2e/f7-responsive-restraint.spec.ts tests/e2e/client-feedback-homepage.spec.ts
pnpm --filter @rosa/web typecheck
git add apps/web/src/styles/public-density.css apps/web/tests/e2e/client-feedback-homepage.spec.ts apps/web/tests/e2e/f7-homepage-polish.spec.ts apps/web/tests/e2e/f7-responsive-restraint.spec.ts
git commit -m "refactor(web): tune homepage information density"
```

---

### Task 8: Add Central Social Registry, Footer Row, and Contact Treatment

**Files:**
- Create: `apps/web/src/features/social-links/social-links.ts`
- Create: `apps/web/src/features/social-links/social-links-row.tsx`
- Create: `apps/web/src/features/social-links/index.ts`
- Modify: `apps/web/src/components/layout/public-shell.tsx`
- Modify: `apps/web/src/features/contact-preview/contact-page.tsx`
- Modify: `apps/web/src/features/contact-preview/contact-information-model.ts`
- Modify: `apps/web/src/styles/public-density.css`
- Modify: `apps/web/src/test/client-feedback-homepage-contract.test.ts`
- Modify: `apps/web/tests/e2e/client-feedback-homepage.spec.ts`

**Interfaces:**

```ts
export type SocialPlatform = "instagram" | "facebook" | "linkedin" | "x";
export interface SocialLink { platform: SocialPlatform; label: string; labelAr: string; href: string; }
export const SOCIAL_LINKS: readonly SocialLink[];
```

- [ ] **Step 1: Write failing social registry contract**

```ts
import { SOCIAL_LINKS } from "@/features/social-links";

it("centralizes exactly four valid social placeholders", () => {
  expect(SOCIAL_LINKS.map((item) => item.platform)).toEqual(["instagram", "facebook", "linkedin", "x"]);
  expect(SOCIAL_LINKS).toHaveLength(4);
  for (const item of SOCIAL_LINKS) {
    expect(item.href).toMatch(/^https:\/\//);
    expect(item.href).not.toBe("#");
  }
});
```

- [ ] **Step 2: Verify RED**

```bash
pnpm --filter @rosa/web test -- src/test/client-feedback-homepage-contract.test.ts
```

- [ ] **Step 3: Implement exact central registry**

```ts
export const SOCIAL_LINKS = [
  { platform: "instagram", label: "Instagram", labelAr: "إنستغرام", href: "https://www.instagram.com/" },
  { platform: "facebook", label: "Facebook", labelAr: "فيسبوك", href: "https://www.facebook.com/" },
  { platform: "linkedin", label: "LinkedIn", labelAr: "لينكدإن", href: "https://www.linkedin.com/" },
  { platform: "x", label: "X / Twitter", labelAr: "إكس / تويتر", href: "https://x.com/" }
] as const;
```

`SocialLinksRow` renders one `<ul>` with external anchors using `target="_blank" rel="noopener noreferrer"` and localized text labels. Add no icon package.

- [ ] **Step 4: Integrate footer and Contact**

Footer: render `SocialLinksRow` inside `.site-footer__brand`; retain existing three navigation columns.

Contact: add a compact explicit section between main contact/form content and location:

```tsx
<Section tone="paper" spacing="compact" className="contact-social-section">
  <Container size="wide">
    <Reveal direction="up">
      <div className="contact-social-panel">
        <div>
          <p className="page-eyebrow">{ar ? "تابع روزا" : "Follow Rosa"}</p>
          <h2>{ar ? "ابق على اتصال." : "Stay connected."}</h2>
        </div>
        <SocialLinksRow locale={locale} className="contact-social-links" />
      </div>
    </Reveal>
  </Container>
</Section>
```

Remove only the fabricated `Social profiles` row with `@rosamedicalexample` from `CONTACT_INFORMATION`.

- [ ] **Step 5: Add exact compact social styling**

```css
.social-links-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.8rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.social-links-row a {
  min-height: 2.75rem;
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-size: 0.82rem;
  font-weight: 650;
  text-decoration: none;
  border-bottom: 1px solid transparent;
}
.social-links-row a:hover,
.social-links-row a:focus-visible { border-bottom-color: currentColor; }
.contact-social-panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: end;
}
@media (max-width: 40rem) {
  .contact-social-panel { grid-template-columns: 1fr; align-items: start; }
}
```

- [ ] **Step 6: Add browser assertions**

Verify four social links in footer on `/`, another four in Contact section, all HTTPS, all `_blank`, all safe rel attributes, and no `@rosamedicalexample` text.

- [ ] **Step 7: Run and commit**

```bash
pnpm --filter @rosa/web test -- src/test/client-feedback-homepage-contract.test.ts
pnpm --filter @rosa/web test:e2e -- tests/e2e/client-feedback-homepage.spec.ts --project=desktop --project=mobile
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/social-links apps/web/src/components/layout/public-shell.tsx apps/web/src/features/contact-preview/contact-page.tsx apps/web/src/features/contact-preview/contact-information-model.ts apps/web/src/styles/public-density.css apps/web/src/test/client-feedback-homepage-contract.test.ts apps/web/tests/e2e/client-feedback-homepage.spec.ts
git commit -m "feat(web): add shared Rosa social links"
```

---

### Task 9: Refine Noto Sans Arabic Density and RTL Behavior

**Files:**
- Modify: `apps/web/src/styles/public-density.css`
- Modify: `apps/web/src/styles/rtl.css` only if direction mechanics require it.
- Modify: `apps/web/src/test/client-feedback-homepage-contract.test.ts`
- Modify: `apps/web/tests/e2e/client-feedback-homepage.spec.ts`

- [ ] **Step 1: Add failing Arabic contracts**

```ts
it("keeps Noto Sans Arabic and adds dedicated Arabic density rules", () => {
  const layout = source("src/app/layout.tsx");
  const density = source("src/styles/public-density.css");
  expect(layout).toContain("Noto_Sans_Arabic");
  expect(density).toContain('html[dir="rtl"] .home-hero-carousel');
  expect(density).toContain("font-family: var(--font-arabic)");
});
```

- [ ] **Step 2: Verify RED**

```bash
pnpm --filter @rosa/web test -- src/test/client-feedback-homepage-contract.test.ts
```

- [ ] **Step 3: Add explicit Arabic typography values**

```css
html[dir="rtl"] .public-page--home,
html[dir="rtl"] .site-footer,
html[dir="rtl"] .contact-social-panel {
  font-family: var(--font-arabic), var(--font-interface), sans-serif;
}

html[dir="rtl"] .home-hero__title,
html[dir="rtl"] .public-page--home .public-section-heading__title,
html[dir="rtl"] .home-family-gallery__title,
html[dir="rtl"] .contact-social-panel h2 {
  font-family: var(--font-arabic), var(--font-interface), sans-serif;
  font-weight: 600;
  line-height: 1.32;
  letter-spacing: 0;
}

html[dir="rtl"] .home-hero__title { font-size: clamp(2.25rem, 3.8vw, 3.45rem); }
html[dir="rtl"] .home-hero__copy-text,
html[dir="rtl"] .public-page--home .public-section-heading__copy { font-weight: 400; line-height: 1.72; }
html[dir="rtl"] .public-eyebrow,
html[dir="rtl"] .page-eyebrow,
html[dir="rtl"] .site-footer__title { font-weight: 700; letter-spacing: 0; text-transform: none; }

@media (max-width: 40rem) {
  html[dir="rtl"] .home-hero__title { font-size: clamp(2.1rem, 9.8vw, 2.65rem); line-height: 1.36; }
}
```

Hero `data-copy-side` remains physical and unchanged between English/Arabic for the same slide; only text direction/alignment changes.

- [ ] **Step 4: Add browser checks and review**

On `/ar`, assert `lang="ar"`, `dir="rtl"`, Noto Sans Arabic computed family, no overflow, same active slide/copy-side metadata as English, and proper RTL family/social layout. Visually review 390×844 and 1366×768 Arabic.

- [ ] **Step 5: Run and commit**

```bash
pnpm --filter @rosa/web test -- src/test/client-feedback-homepage-contract.test.ts
pnpm --filter @rosa/web test:e2e -- tests/e2e/client-feedback-homepage.spec.ts --project=desktop --project=mobile
git add apps/web/src/styles/public-density.css apps/web/src/styles/rtl.css apps/web/src/test/client-feedback-homepage-contract.test.ts apps/web/tests/e2e/client-feedback-homepage.spec.ts
git commit -m "refactor(web): refine Arabic responsive typography"
```

---

### Task 10: Lock Carousel Accessibility, Autoplay, Swipe, and Reduced Motion

**Files:**
- Modify: `apps/web/tests/e2e/client-feedback-homepage.spec.ts`
- Modify only if tests prove necessary: `apps/web/src/features/homepage/sections/home-hero-carousel.tsx`
- Modify only if tests prove necessary: `apps/web/src/styles/public-density.css`

- [ ] **Step 1: Add browser tests before fixes**

Cover all of these explicitly:

- dot click selects exact slide;
- Left/Right on focused dots wraps correctly;
- idle autoplay advances after ~4.75s;
- focus-within prevents advance over 5.2s;
- desktop hover prevents advance over 5.2s;
- reduced-motion context does not advance over 5.2s;
- horizontal mobile swipe >48px changes one slide;
- mostly vertical gesture does not change slide;
- no permanent arrow buttons exist;
- all four dot buttons have ≥44px usable boxes;
- active CTA(s) and family links show visible focus.

Use `5_200ms` waits for autoplay tests to reduce timer flakiness.

- [ ] **Step 2: Run tests and observe actual failures**

```bash
pnpm --filter @rosa/web test:e2e -- tests/e2e/client-feedback-homepage.spec.ts --project=desktop --project=mobile
```

- [ ] **Step 3: Fix only proven behavior defects**

Use one timeout lifecycle:

```ts
useEffect(() => {
  if (!shouldHeroAutoplay(autoplayState)) return;
  const timer = window.setTimeout(
    () => setActiveIndex((index) => nextHeroSlideIndex(index, slides.length)),
    HERO_AUTOPLAY_MS
  );
  return () => window.clearTimeout(timer);
}, [activeIndex, autoplayState, slides.length]);
```

Visibility lifecycle:

```ts
useEffect(() => {
  const sync = () => setHidden(document.visibilityState !== "visible");
  sync();
  document.addEventListener("visibilitychange", sync);
  return () => document.removeEventListener("visibilitychange", sync);
}, []);
```

Do not introduce overlapping intervals or rewrite global `MotionProvider`.

- [ ] **Step 4: Run unit + E2E regression**

```bash
pnpm --filter @rosa/web test -- src/test/home-hero-carousel-state.test.ts
pnpm --filter @rosa/web test:e2e -- tests/e2e/client-feedback-homepage.spec.ts --project=desktop --project=mobile
```

- [ ] **Step 5: Commit**

```bash
git add apps/web/tests/e2e/client-feedback-homepage.spec.ts apps/web/src/features/homepage/sections/home-hero-carousel.tsx apps/web/src/styles/public-density.css
git commit -m "test(web): lock homepage carousel accessibility behavior"
```

---

### Task 11: Add Explicit Eleven-Viewport Responsive Acceptance Harness

**Files:**
- Create: `apps/web/tests/e2e/client-feedback-responsive-matrix.spec.ts`
- Modify `apps/web/src/styles/public-density.css` only for defects proven by the matrix.

- [ ] **Step 1: Create the matrix harness**

```ts
import { expect, test } from "@playwright/test";

const VIEWPORTS = [
  [360, 800], [390, 844], [430, 932], [768, 1024], [1024, 768],
  [1280, 720], [1366, 768], [1440, 900], [1536, 864], [1920, 1080], [2560, 1440]
] as const;

for (const [width, height] of VIEWPORTS) {
  test(`${width}x${height} homepage responsive acceptance`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Geometry matrix runs once in desktop Chromium; touch behavior is covered separately.");
    await page.setViewportSize({ width, height });
    await page.goto("/");

    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
    await expect(page.locator("[data-section='home-hero']")).toBeVisible();
    await expect(page.locator("[data-home-family-gallery]")).toBeVisible();
    await expect(page.locator("[data-section='catalogue-access']")).toBeAttached();

    await testInfo.attach(`home-${width}x${height}`, {
      body: await page.screenshot({ fullPage: true }),
      contentType: "image/png"
    });
  });
}
```

Add helper assertions for title/CTA clipping, dot bounds, family name clipping, large-screen hero ceiling, 768 rail mode, 1024+ fine-pointer accordion mode where container width ≥56rem, and 1280/1366 continuation ratio between approximately `0.84` and `0.92`.

- [ ] **Step 2: Run matrix and visually inspect every screenshot**

```bash
pnpm --filter @rosa/web test:e2e -- tests/e2e/client-feedback-responsive-matrix.spec.ts --project=desktop
```

Review crop, whitespace, heading wrapping, CTA fit, family proportions, Catalogue preservation, footer density, and overall composition for all eleven.

- [ ] **Step 3: Run mobile/coarse-pointer visual behavior separately**

```bash
pnpm --filter @rosa/web test:e2e -- tests/e2e/client-feedback-homepage.spec.ts --project=tablet --project=mobile
```

- [ ] **Step 4: Fix only matrix-proven responsive defects**

Prefer changing shared clamps/ceilings or the existing short-viewport rule. Do not add one-off breakpoints solely to make one listed resolution pass. After a fix, also test an intermediate size such as 1180×820.

- [ ] **Step 5: Commit**

```bash
git add apps/web/tests/e2e/client-feedback-responsive-matrix.spec.ts apps/web/src/styles/public-density.css
git commit -m "test(web): add responsive homepage acceptance matrix"
```

---

### Task 12: Final Regression, Performance, Build, and Completion Evidence

**Files:**
- Create: `docs/superpowers/completions/2026-08-08-client-feedback-responsive-homepage.md`
- Modify `README.md` frontend communication section only if the established coordination protocol requires a meaningful handoff entry.
- Modify implementation files only if final verification finds a defect.

- [ ] **Step 1: Run focused contracts**

```bash
pnpm --filter @rosa/web test -- src/test/home-hero-carousel-state.test.ts src/test/client-feedback-homepage-contract.test.ts src/test/public-performance-policy.test.ts
```

- [ ] **Step 2: Run homepage/public responsive browser regression**

```bash
pnpm --filter @rosa/web test:e2e -- tests/e2e/f7-homepage-polish.spec.ts tests/e2e/f7-responsive-restraint.spec.ts tests/e2e/client-feedback-homepage.spec.ts
```

- [ ] **Step 3: Run the eleven-size matrix one final time**

```bash
pnpm --filter @rosa/web test:e2e -- tests/e2e/client-feedback-responsive-matrix.spec.ts --project=desktop
```

Open/review all eleven screenshots; assertions alone are insufficient.

- [ ] **Step 4: Verify public performance/network boundaries**

On `/`, verify:

- no `/auth/v1/user` request;
- no slide-transition Supabase request;
- no new full-catalogue homepage request;
- only first hero is aggressively prioritized/eager;
- other hero images load progressively;
- family interaction causes no network call until normal route navigation;
- non-product imagery remains local `/media/...`;
- no runtime image service/config was added.

- [ ] **Step 5: Run full local repository verification**

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
cd apps/web
npx opennextjs-cloudflare build
cd ../..
```

Do not claim success without current command output.

- [ ] **Step 6: Write completion evidence**

The completion file must record:

- source branch and final commit;
- design spec path and plan path;
- final eight hero derivative paths + byte sizes;
- exact five-development-viewport and eleven-final-viewport results;
- English/Arabic/reduced-motion/coarse-pointer evidence;
- exact unit/E2E/lint/typecheck/build/OpenNext counts/results;
- confirmation that no `services/api/**`, OpenAPI, migration, production DDL/DML, or Storage deletion occurred;
- any pre-existing non-blocking warnings;
- explicit statement that site-wide density propagation is a separate future phase.

- [ ] **Step 7: Update README only if coordination warrants it**

Append one concise frontend→backend message stating that this phase changed only public frontend presentation/shared shell, did not alter backend contracts/data, and preserved bounded catalogue/runtime behavior. Do not rewrite historical entries.

- [ ] **Step 8: Commit completion evidence**

```bash
git add docs/superpowers/completions/2026-08-08-client-feedback-responsive-homepage.md README.md
git commit -m "docs: record responsive homepage verification"
```

If README requires no change, omit it from `git add`.

- [ ] **Step 9: Stop before merge/deploy**

Report feature-branch tip, exact verification output, visual matrix status, and any remaining client-image/content blocker. Do not fast-forward `ahmadx67676767`, merge, or deploy without explicit instruction.

---

## Execution Order and Gates

1. Tasks 1–4 can run with the existing hero image reused as a deterministic development fixture.
2. Task 5 is the mandatory user-image gate; final acceptance cannot occur without the four supplied images.
3. Tasks 6–10 may proceed once carousel structure is stable, but Task 11 must run against final hero imagery.
4. Task 11 is the responsive visual gate.
5. Task 12 is the complete code/test/build/performance gate.
6. After Task 12, stop and evaluate the homepage density system before planning propagation to the rest of the public site.

## Plan Self-Review Result

This corrected plan was checked against the approved spec for coverage, placeholders, type consistency, and scope. The responsive hero type now explicitly supports both desktop and mobile source files, the 8–15% continuation target is enforced by the initial-section ratio rather than a weaker hero-height proxy, mobile/desktop hero geometry uses `min-height` so text scaling can expand safely, interim carousel records reuse already-approved copy instead of inventing unreviewed marketing content, and social-link styling/hero derivative generation are specified concretely. No backend/database/admin/catalogue-truth work is introduced.
