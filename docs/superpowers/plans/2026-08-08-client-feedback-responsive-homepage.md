# Rosa Medical Client-Feedback Responsive Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve the current premium Rosa public-site character while making the homepage materially more viewport-efficient through a width-and-height-aware density system, a four-slide editorial hero carousel, a responsive five-family gallery, shared social links, and refined Noto Sans Arabic typography.

**Architecture:** Add one bounded responsive-density style layer that is defined globally but consumed first by the homepage/shared public shell; do not globally rescale every public page. Replace the static hero with a small local client carousel whose data stays source-controlled, replace the homepage-only family collage with one semantic family gallery that becomes a CSS accordion on wide fine-pointer layouts and a native scroll-snap rail elsewhere, and keep the existing catalogue/Supabase/quotation boundaries untouched. Build and verify in an isolated worktree from the approved documentation branch; the four final hero images remain a deliberate user-supplied content dependency and are integrated before the phase can be called complete.

**Tech Stack:** Next.js 16.2.11, React 19.2, TypeScript 5.9, Motion 12.42.2, CSS custom properties/container queries/media queries, Next `Image` with `images.unoptimized: true`, Vitest 3.2, Playwright 1.57, OpenNext/Cloudflare.

## Global Constraints

- Authoritative implementation base: `ahmadx67676767`; the approved design was written against verified commit `e7c63bfc319560dcbf98ba713a1b1289e7e71f00`.
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
- Social platforms: Instagram, Facebook, LinkedIn, X; central shared registry; footer on every public page + dedicated Contact treatment; valid external placeholder destinations, never `href="#"`.
- Arabic font remains Noto Sans Arabic; refine weight, size, line-height, wrapping, and rhythm rather than replacing the family.
- Preserve bounded public catalogue reads, cookie-free public Supabase reads, reduced navigation prefetch, existing product media relationships, quotation/inquiry behavior, and protected `/admin/**` auth.
- No production Supabase DDL/DML, no Storage deletion, no schema migration, no OpenAPI change, no `services/api/**` change.
- No paid Cloudflare Images or other paid runtime image-transformation infrastructure.
- Development visual loop uses five sizes: 360×800, 390×844, 768×1024, 1366×768, 1920×1080.
- Final acceptance explicitly reviews all eleven: 360×800, 390×844, 430×932, 768×1024, 1024×768, 1280×720, 1366×768, 1440×900, 1536×864, 1920×1080, 2560×1440.
- Do not merge or deploy without explicit user instruction.

---

## File Structure Lock

Create or modify the following bounded units. Do not scatter the implementation across unrelated F3/F7 files unless an existing assertion must be updated.

### New files

- `apps/web/src/styles/public-density.css` — shared responsive-density tokens plus homepage/shared-shell consumption and short-viewport rules.
- `apps/web/src/features/homepage/home-hero-slides.ts` — hero slide types, localized source-controlled slide records, localization helper, and exact four-slide invariant.
- `apps/web/src/features/homepage/hero-carousel-state.ts` — pure carousel timing/index/autoplay helper functions that are easy to unit-test.
- `apps/web/src/features/homepage/sections/home-hero-carousel.tsx` — client carousel interaction and rendering boundary.
- `apps/web/src/features/homepage/sections/home-family-gallery.tsx` — semantic homepage-only five-family gallery; one markup tree, CSS switches accordion/rail.
- `apps/web/src/features/social-links/social-links.ts` — exact four-platform central data registry.
- `apps/web/src/features/social-links/social-links-row.tsx` — reusable external social-link renderer.
- `apps/web/src/features/social-links/index.ts` — public exports.
- `apps/web/src/test/home-hero-carousel-state.test.ts` — pure state/timing unit tests.
- `apps/web/src/test/client-feedback-homepage-contract.test.ts` — exact slide/family/social/font/static-source contracts.
- `apps/web/tests/e2e/client-feedback-homepage.spec.ts` — focused hero/family/social/RTL/reduced-motion behavior coverage.
- `apps/web/tests/e2e/client-feedback-responsive-matrix.spec.ts` — explicit eleven-size geometry/screenshot acceptance harness.
- `tools/prepare_home_hero_media.py` — local-only offline derivative generator for the four user-supplied hero images; no runtime use.

### Existing files to modify

- `apps/web/src/app/globals.css` — import `public-density.css` last after current owner-refinement styles so this approved phase has explicit cascade ownership.
- `apps/web/src/features/homepage/homepage.tsx` — render the new carousel and family-gallery implementation while retaining section order and bounded featured-product read.
- `apps/web/src/features/homepage/homepage.data.ts` — remove the old single-hero model ownership, simplify family intro copy, retain procurement/featured/catalogue/quotation models.
- `apps/web/src/features/homepage/sections/home-hero.tsx` — delete after callers and tests move to `home-hero-carousel.tsx`.
- `apps/web/src/features/homepage/sections/family-discovery.tsx` — render `HomeFamilyGallery` instead of `FamilyCard`/`Stagger` collage.
- `apps/web/src/features/localization/public-copy.ts` — update Arabic family-intro direction; hero source moves to `home-hero-slides.ts`.
- `apps/web/src/components/layout/public-shell.tsx` — render shared social links in the footer brand area.
- `apps/web/src/features/contact-preview/contact-page.tsx` — add dedicated Contact social treatment.
- `apps/web/src/features/contact-preview/contact-information-model.ts` — remove the fabricated generic social-profile row once dedicated shared social links exist.
- `apps/web/src/styles/rtl.css` — only keep existing direction behavior; add any narrowly needed direction-specific carousel/gallery fixes that cannot live in `public-density.css` without increasing cascade ambiguity.
- `apps/web/src/test/public-performance-policy.test.ts` — extend local-media/performance assertions for hero delivery if final slide assets live in a dedicated registry.
- `apps/web/tests/e2e/f7-homepage-polish.spec.ts` — remove old static-hero minimum-height/tilt assumptions that conflict with the approved compact carousel while retaining cinematic hierarchy assertions.
- `apps/web/tests/e2e/f7-responsive-restraint.spec.ts` — keep representative public-page restraint coverage compatible with the new homepage composition.

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
- Consumes: existing `--page-gutter`, spacing, colour, type, and motion tokens from `tokens.css`.
- Produces: `--public-density-*` custom properties consumed by later homepage/shared-shell tasks.

- [ ] **Step 1: Write the failing density/import contract**

Create `apps/web/src/test/client-feedback-homepage-contract.test.ts` with the first contract:

```ts
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

function source(path: string): string {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

describe("client-feedback responsive homepage contract", () => {
  it("loads a dedicated public density layer after the existing owner refinement", () => {
    const globals = source("src/app/globals.css");
    const ownerIndex = globals.indexOf('../styles/f8-owner-refinement.css');
    const densityIndex = globals.indexOf('../styles/public-density.css');

    expect(ownerIndex).toBeGreaterThan(-1);
    expect(densityIndex).toBeGreaterThan(ownerIndex);

    const density = source("src/styles/public-density.css");
    expect(density).toContain("--public-density-section-block");
    expect(density).toContain("--public-density-hero-title");
    expect(density).toContain("@media (max-height: 800px)");
    expect(density).not.toContain("transform: scale(0.");
  });
});
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run:

```bash
pnpm --filter @rosa/web test -- src/test/client-feedback-homepage-contract.test.ts
```

Expected: FAIL because `public-density.css` is not imported/created.

- [ ] **Step 3: Add the bounded density token layer**

Create `apps/web/src/styles/public-density.css` with these starting tokens and scope rules:

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

.public-page--home .section {
  padding-block: var(--public-density-section-block);
}

.public-page--home .section--compact {
  padding-block: var(--public-density-section-block-compact);
}

.site-header__bar {
  min-height: var(--public-density-header-block);
}

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

Import it after `f8-owner-refinement.css` in `globals.css`:

```css
@import "../styles/f8-owner-refinement.css";
@import "../styles/public-density.css";
```

Do not reorder historical F3/F7/F8 imports in this task.

- [ ] **Step 4: Run focused tests and static lint**

Run:

```bash
pnpm --filter @rosa/web test -- src/test/client-feedback-homepage-contract.test.ts
pnpm --filter @rosa/web lint -- src/styles/public-density.css src/app/globals.css src/test/client-feedback-homepage-contract.test.ts
```

Expected: contract PASS; ESLint exits 0 (CSS is not linted by ESLint, but the command verifies touched TS/test scope without changing repo tooling).

- [ ] **Step 5: Commit the density foundation**

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
- Produces:

```ts
export type HeroCopySide = "left" | "right";
export type HeroTone = "dark" | "light";
export interface LocalizedHeroText { en: string; ar: string; }
export interface HomeHeroCta { label: LocalizedHeroText; href: Route<string>; variant?: "primary" | "secondary"; }
export interface HomeHeroSlide { id: string; image: HeroImage; copySide: HeroCopySide; tone: HeroTone; eyebrow: LocalizedHeroText; title: LocalizedHeroText; copy: LocalizedHeroText; ctas: readonly HomeHeroCta[]; }
export const HOME_HERO_SLIDES: readonly [HomeHeroSlide, HomeHeroSlide, HomeHeroSlide, HomeHeroSlide];
export function localizeHeroSlide(slide: HomeHeroSlide, locale: PublicLocale): LocalizedHomeHeroSlide;
```

- Consumes: `Route` from Next, `PublicLocale`, and current local hero media for the temporary development records.

- [ ] **Step 1: Extend the contract test first**

Append:

```ts
import { HOME_HERO_SLIDES, HERO_AUTOPLAY_MS } from "@/features/homepage/home-hero-slides";

it("defines exactly four bounded hero slides and never more than two CTAs", () => {
  expect(HOME_HERO_SLIDES).toHaveLength(4);
  expect(new Set(HOME_HERO_SLIDES.map((slide) => slide.id)).size).toBe(4);
  expect(HOME_HERO_SLIDES.every((slide) => slide.ctas.length >= 1 && slide.ctas.length <= 2)).toBe(true);
  expect(HERO_AUTOPLAY_MS).toBe(4_750);
});
```

- [ ] **Step 2: Run test and confirm RED**

```bash
pnpm --filter @rosa/web test -- src/test/client-feedback-homepage-contract.test.ts
```

Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement the source-controlled slide model**

Create `home-hero-slides.ts` using exact stable types. Before final user images arrive, use the existing local `HOME_HERO_MEDIA.src` for all four development records but give each a unique ID. Use the existing approved current homepage copy for slide 1 and restrained non-claiming development copy for slides 2–4. Mark this state with a named exported constant, not `TODO` comments:

```ts
import type { Route } from "next";
import type { PublicLocale } from "@/features/localization/locales";
import { HOME_HERO_MEDIA } from "@/features/public-media";

export const HERO_AUTOPLAY_MS = 4_750;

export type HeroCopySide = "left" | "right";
export type HeroTone = "dark" | "light";
export interface LocalizedHeroText { en: string; ar: string; }
export interface HeroImage {
  src: string;
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
export interface LocalizedHomeHeroSlide {
  id: string;
  image: { src: string; alt: string; desktopFocalPoint: string; mobileFocalPoint: string };
  copySide: HeroCopySide;
  tone: HeroTone;
  eyebrow: string;
  title: string;
  copy: string;
  ctas: readonly { label: string; href: Route<string>; variant?: "primary" | "secondary" }[];
}

const developmentImage = {
  src: HOME_HERO_MEDIA.src,
  alt: { en: HOME_HERO_MEDIA.alt, ar: HOME_HERO_MEDIA.altAr ?? HOME_HERO_MEDIA.alt },
  desktopFocalPoint: HOME_HERO_MEDIA.focalPoint ?? "50% 50%",
  mobileFocalPoint: "58% 52%"
} as const;

export const HOME_HERO_SLIDES = [
  {
    id: "precision-procurement",
    image: developmentImage,
    copySide: "left",
    tone: "dark",
    eyebrow: { en: "Medical instruments supplier", ar: "مورّد أدوات طبية" },
    title: { en: "Precision instruments. Procurement made clear.", ar: "أدوات دقيقة. ومشتريات أكثر وضوحًا." },
    copy: { en: "A composed catalogue and quotation experience for hospitals, distributors and procurement teams.", ar: "تجربة منظمة لاستعراض الكتالوجات وطلب عروض الأسعار للمستشفيات والموزعين وفرق المشتريات." },
    ctas: [
      { label: { en: "Explore Products", ar: "استعرض المنتجات" }, href: "/products" },
      { label: { en: "Request a Quote", ar: "اطلب عرض سعر" }, href: "/request-quotation", variant: "secondary" }
    ]
  },
  {
    id: "catalogue-guidance",
    image: developmentImage,
    copySide: "right",
    tone: "dark",
    eyebrow: { en: "Structured catalogue", ar: "كتالوج منظم" },
    title: { en: "Find the instrument family you need.", ar: "اعثر على عائلة الأدوات التي تحتاجها." },
    copy: { en: "Browse five focused instrument collections with clear product routes and catalogue access.", ar: "استعرض خمس مجموعات مركزة من الأدوات مع مسارات واضحة للمنتجات والكتالوجات." },
    ctas: [{ label: { en: "Browse Products", ar: "استعرض المنتجات" }, href: "/products" }]
  },
  {
    id: "quotation-clarity",
    image: developmentImage,
    copySide: "left",
    tone: "dark",
    eyebrow: { en: "Quotation support", ar: "دعم عروض الأسعار" },
    title: { en: "Turn product requirements into one clear request.", ar: "حوّل متطلبات المنتجات إلى طلب واحد واضح." },
    copy: { en: "Collect product codes, options, quantities and notes before sending a structured quotation request.", ar: "اجمع رموز المنتجات والخيارات والكميات والملاحظات قبل إرسال طلب عرض سعر منظم." },
    ctas: [{ label: { en: "Prepare an Inquiry", ar: "جهّز استفسارًا" }, href: "/inquiry" }]
  },
  {
    id: "professional-support",
    image: developmentImage,
    copySide: "right",
    tone: "dark",
    eyebrow: { en: "Rosa support", ar: "دعم روزا" },
    title: { en: "A calmer path through instrument sourcing.", ar: "مسار أوضح لتوريد الأدوات." },
    copy: { en: "Use catalogue, product and contact routes without ecommerce complexity.", ar: "استخدم مسارات الكتالوجات والمنتجات والتواصل دون تعقيد التجارة الإلكترونية." },
    ctas: [{ label: { en: "Contact Rosa", ar: "اتصل بروزا" }, href: "/contact" }]
  }
] as const satisfies readonly [HomeHeroSlide, HomeHeroSlide, HomeHeroSlide, HomeHeroSlide];

export function localizeHeroSlide(slide: HomeHeroSlide, locale: PublicLocale): LocalizedHomeHeroSlide {
  const key = locale === "ar" ? "ar" : "en";
  return {
    id: slide.id,
    image: {
      src: slide.image.src,
      alt: slide.image.alt[key],
      desktopFocalPoint: slide.image.desktopFocalPoint,
      mobileFocalPoint: slide.image.mobileFocalPoint
    },
    copySide: slide.copySide,
    tone: slide.tone,
    eyebrow: slide.eyebrow[key],
    title: slide.title[key],
    copy: slide.copy[key],
    ctas: slide.ctas.map((cta) => ({
      label: cta.label[key],
      href: cta.href,
      ...(cta.variant ? { variant: cta.variant } : {})
    }))
  };
}
```

Remove the old single `hero` ownership from `HOME_PAGE_MODEL` / `HOME_PAGE_MODEL_AR`; the new carousel receives `HOME_HERO_SLIDES` directly.

Update family intro copy now so later layout tests use the approved wording:

```ts
familyIntro: {
  eyebrow: "Our products",
  title: "Explore the ROSA instrument collection.",
  copy: "Five focused instrument collections, presented clearly for product browsing."
}
```

Arabic equivalent:

```ts
familyIntro: {
  eyebrow: "منتجاتنا",
  title: "استكشف مجموعة أدوات روزا.",
  copy: "خمس مجموعات مركزة من الأدوات، مقدمة بوضوح لاستعراض المنتجات."
}
```

- [ ] **Step 4: Run focused tests/typecheck**

```bash
pnpm --filter @rosa/web test -- src/test/client-feedback-homepage-contract.test.ts
pnpm --filter @rosa/web typecheck
```

Expected: PASS.

- [ ] **Step 5: Commit the hero data contract**

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
- `nextHeroSlideIndex(index: number, count: number): number`
- `shouldHeroAutoplay(state: HeroAutoplayState): boolean`
- `HomeHeroCarousel({ locale }: { locale?: PublicLocale }): ReactElement`

- [ ] **Step 1: Write pure failing tests for timing/index/pause rules**

Create:

```ts
import { describe, expect, it } from "vitest";
import {
  HERO_AUTOPLAY_MS,
  nextHeroSlideIndex,
  shouldHeroAutoplay
} from "@/features/homepage/hero-carousel-state";

describe("homepage hero carousel state", () => {
  it("uses the approved autoplay interval", () => {
    expect(HERO_AUTOPLAY_MS).toBe(4_750);
  });

  it("wraps forward across exactly four slides", () => {
    expect(nextHeroSlideIndex(0, 4)).toBe(1);
    expect(nextHeroSlideIndex(3, 4)).toBe(0);
  });

  it.each([
    ["reduced motion", { reducedMotion: true }],
    ["hover", { hovered: true }],
    ["focus", { focused: true }],
    ["dragging", { dragging: true }],
    ["hidden document", { hidden: true }]
  ])("pauses autoplay for %s", (_label, override) => {
    expect(shouldHeroAutoplay({
      reducedMotion: false,
      hovered: false,
      focused: false,
      dragging: false,
      hidden: false,
      ...override
    })).toBe(false);
  });

  it("autoplays only in the fully active state", () => {
    expect(shouldHeroAutoplay({ reducedMotion: false, hovered: false, focused: false, dragging: false, hidden: false })).toBe(true);
  });
});
```

- [ ] **Step 2: Verify RED**

```bash
pnpm --filter @rosa/web test -- src/test/home-hero-carousel-state.test.ts
```

Expected: module-not-found FAIL.

- [ ] **Step 3: Implement pure helpers**

```ts
export { HERO_AUTOPLAY_MS } from "./home-hero-slides";

export interface HeroAutoplayState {
  reducedMotion: boolean;
  hovered: boolean;
  focused: boolean;
  dragging: boolean;
  hidden: boolean;
}

export function nextHeroSlideIndex(index: number, count: number): number {
  if (!Number.isInteger(count) || count < 1) throw new Error("Hero carousel requires at least one slide.");
  return (index + 1) % count;
}

export function shouldHeroAutoplay(state: HeroAutoplayState): boolean {
  return !state.reducedMotion && !state.hovered && !state.focused && !state.dragging && !state.hidden;
}
```

- [ ] **Step 4: Run helper tests and confirm GREEN**

```bash
pnpm --filter @rosa/web test -- src/test/home-hero-carousel-state.test.ts
```

Expected: PASS.

- [ ] **Step 5: Implement the client carousel with no third-party slider**

`home-hero-carousel.tsx` must:

- use `"use client"`;
- localize `HOME_HERO_SLIDES` once per locale;
- use `useReducedMotion()` from `motion/react`;
- keep `activeIndex`, hover, focus-within, drag, and document-visibility state;
- schedule one `setTimeout(..., 4_750)` only while `shouldHeroAutoplay(...)` is true;
- reset the timeout after manual selection;
- render only the active slide as visible hero content;
- keep current slide visible while a manually requested not-yet-loaded image is preloaded with `new window.Image()`;
- render exactly four real `<button type="button">` dots with `aria-label="Show slide N of 4"` and `aria-current` on the active dot;
- support Enter/Space through native button semantics;
- support Left/Right arrow movement when focus is inside the dot group;
- set `aria-roledescription="carousel"` on the hero region and `aria-roledescription="slide"` on active slide;
- avoid an intrusive `aria-live` announcement for autoplay;
- use pointer/touch drag threshold of 48 px and CSS `touch-action: pan-y` so vertical scrolling stays natural;
- pause while hovered/focused/dragging/hidden;
- disable autoplay when reduced motion is active;
- use existing `LocalizedButtonLink`, `Magnetic`, `Reveal`/`TextReveal` only where they do not remount unpredictably on every pointer movement.

The active slide root must expose stable test hooks:

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

Dots:

```tsx
<div className="home-hero-carousel__dots" role="group" aria-label={ar ? "شرائح الواجهة" : "Homepage hero slides"}>
  {slides.map((candidate, index) => (
    <button
      key={candidate.id}
      type="button"
      className="home-hero-carousel__dot"
      aria-label={ar ? `اعرض الشريحة ${index + 1} من 4` : `Show slide ${index + 1} of 4`}
      aria-current={index === activeIndex ? "true" : undefined}
      onClick={() => requestSlide(index)}
    />
  ))}
</div>
```

- [ ] **Step 6: Wire Homepage to the new carousel and remove the old static component**

In `homepage.tsx`, replace:

```tsx
<HomeHero model={model.hero} locale={locale} />
```

with:

```tsx
<HomeHeroCarousel locale={locale} />
```

Keep `getFeaturedCatalogueProducts()` exactly once and retain the existing section order.

Delete `home-hero.tsx` only after imports compile.

- [ ] **Step 7: Update the old F7 homepage browser contract before running it**

Remove assertions that require the old static hero to have `>=420px` desktop media height or depend on a specific homepage family-card tilt count. Replace them with:

```ts
await expect(page.locator("[data-home-choreography='carousel']")).toHaveCount(1);
await expect(page.locator(".home-hero-carousel__dot")).toHaveCount(4);
await expect(page.locator(".home-hero-carousel__dot[aria-current='true']")).toHaveCount(1);
```

Retain the six-section presence, hero image natural-width, catalogue-presence, quotation-CTA, and no-horizontal-overflow assertions.

- [ ] **Step 8: Run focused unit/browser/type checks**

```bash
pnpm --filter @rosa/web test -- src/test/home-hero-carousel-state.test.ts src/test/client-feedback-homepage-contract.test.ts
pnpm --filter @rosa/web typecheck
pnpm --filter @rosa/web test:e2e -- tests/e2e/f7-homepage-polish.spec.ts --project=desktop
```

Expected: all PASS.

- [ ] **Step 9: Commit carousel behavior**

```bash
git add apps/web/src/features/homepage/hero-carousel-state.ts apps/web/src/features/homepage/sections/home-hero-carousel.tsx apps/web/src/features/homepage/homepage.tsx apps/web/src/features/homepage/sections/home-hero.tsx apps/web/src/test/home-hero-carousel-state.test.ts apps/web/tests/e2e/f7-homepage-polish.spec.ts
git commit -m "feat(web): add accessible four-slide homepage carousel"
```

---

### Task 4: Make the Hero and Shared Header Viewport-Aware

**Files:**
- Modify: `apps/web/src/styles/public-density.css`
- Modify: `apps/web/src/features/homepage/sections/home-hero-carousel.tsx`
- Create: `apps/web/tests/e2e/client-feedback-homepage.spec.ts`

**Interfaces:**
- Hero root exposes `data-active-slide` and copy-side/tone attributes.
- CSS consumes `--public-density-header-block` and density title/spacing variables.

- [ ] **Step 1: Write failing desktop/mobile geometry tests**

Start `client-feedback-homepage.spec.ts`:

```ts
import { expect, test, type Page } from "@playwright/test";

async function initialGeometry(page: Page) {
  return page.evaluate(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    const hero = document.querySelector<HTMLElement>("[data-section='home-hero']");
    const next = document.querySelector<HTMLElement>("[data-section='family-discovery']");
    if (!header || !hero || !next) throw new Error("Homepage geometry targets missing");
    const headerBox = header.getBoundingClientRect();
    const heroBox = hero.getBoundingClientRect();
    const nextBox = next.getBoundingClientRect();
    return { viewportHeight: innerHeight, headerBottom: headerBox.bottom, heroBottom: heroBox.bottom, nextTop: nextBox.top };
  });
}

test("1366x768 keeps the complete hero in view with next-section continuation", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/");
  const geometry = await initialGeometry(page);
  expect(geometry.heroBottom).toBeLessThanOrEqual(geometry.viewportHeight * 0.94);
  expect(geometry.nextTop).toBeLessThan(geometry.viewportHeight);
});

test("390x844 keeps message CTA and meaningful hero image in a compact integrated stage", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/");
  await expect(page.locator(".home-hero__title")).toBeVisible();
  await expect(page.locator("[data-media-slot='homepage-hero-active']")).toBeVisible();
  expect((await page.locator("[data-section='home-hero']").boundingBox())!.height).toBeLessThan(770);
});
```

- [ ] **Step 2: Run both tests and confirm RED against the old scale**

```bash
pnpm --filter @rosa/web test:e2e -- tests/e2e/client-feedback-homepage.spec.ts --project=desktop --project=mobile
```

Expected: at least the 1366×768 continuation/hero-height contract fails before the new CSS.

- [ ] **Step 3: Implement adaptive hero geometry**

In `public-density.css`, override the old 51rem/static composition with actual layout values:

```css
.home-hero-carousel {
  min-height: 0;
  height: clamp(34rem, calc(100svh - var(--public-density-header-block) - 9svh), 52rem);
  padding-block: 0;
  display: grid;
  align-items: stretch;
  isolation: isolate;
  background: #0e0e0d;
  color: var(--color-paper);
}

.home-hero-carousel__slide {
  position: relative;
  min-height: 100%;
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

.home-hero-carousel__media .media-frame__image {
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

.home-hero__copy-text {
  max-width: 34rem;
  margin-top: clamp(1rem, 2.4vh, 1.5rem);
  font-size: var(--public-density-body);
}

.home-hero__actions {
  margin-top: clamp(1.25rem, 3vh, 2rem);
}

.home-hero-carousel__dots {
  position: absolute;
  z-index: 5;
  inset: auto var(--public-density-gutter) clamp(1rem, 2.5vh, 1.6rem) auto;
  display: flex;
  gap: 0.55rem;
}

.home-hero-carousel__dot {
  width: 2.75rem;
  min-height: 2.75rem;
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
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
```

Add overlay classes for left/right physical copy regions; do not mirror copy-side automatically in RTL.

For small screens:

```css
@media (max-width: 40rem) {
  .home-hero-carousel {
    height: clamp(34rem, 84svh, 42rem);
    min-height: 0;
  }

  .home-hero-carousel__content {
    min-height: 100%;
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

  .home-hero-carousel__media .media-frame__image {
    object-position: var(--hero-mobile-focal, 50% 50%);
  }

  .home-hero__actions {
    display: flex;
    flex-wrap: wrap;
  }

  .home-hero__actions .button {
    width: auto;
    min-height: 2.75rem;
  }
}
```

Use inline CSS variables from the slide metadata:

```tsx
style={{
  "--hero-desktop-focal": slide.image.desktopFocalPoint,
  "--hero-mobile-focal": slide.image.mobileFocalPoint
} as React.CSSProperties}
```

- [ ] **Step 4: Preserve reduced-motion and coarse-pointer behavior**

Add to `public-density.css`:

```css
.home-hero-carousel { touch-action: pan-y; }

@media (prefers-reduced-motion: reduce) {
  .home-hero-carousel__slide,
  .home-hero-carousel__media .media-frame__image,
  .home-hero-carousel__dot::before {
    transition: none !important;
    transform: none !important;
  }
}
```

Do not weaken the existing global F7 reduced-motion rules.

- [ ] **Step 5: Run targeted browser tests at the five development sizes**

Use the existing projects plus manual viewport override:

```bash
pnpm --filter @rosa/web test:e2e -- tests/e2e/client-feedback-homepage.spec.ts --project=desktop --project=mobile
```

Then run a local server once and inspect the five sizes with Playwright/browser tooling: 360×800, 390×844, 768×1024, 1366×768, 1920×1080. Record screenshots as test attachments or local review artifacts; do not push temporary screenshot binaries unless the repo already tracks visual evidence for this phase.

- [ ] **Step 6: Commit adaptive hero geometry**

```bash
git add apps/web/src/styles/public-density.css apps/web/src/features/homepage/sections/home-hero-carousel.tsx apps/web/tests/e2e/client-feedback-homepage.spec.ts
git commit -m "feat(web): fit homepage hero to responsive viewport density"
```

---

### Task 5: Integrate the Four User-Supplied Hero Images and Final Image-Led Copy

**Files:**
- Create: `tools/prepare_home_hero_media.py`
- Create: `apps/web/public/media/editorial/home-hero/v1/home-hero-01-desktop.webp`
- Create: `apps/web/public/media/editorial/home-hero/v1/home-hero-01-mobile.webp`
- Create analogous `02`, `03`, `04` desktop/mobile files (8 derivative files total)
- Modify: `apps/web/src/features/homepage/home-hero-slides.ts`
- Modify: `apps/web/src/test/client-feedback-homepage-contract.test.ts`
- Modify: `apps/web/src/test/public-performance-policy.test.ts`

**Interfaces:**
- Final `HOME_HERO_SLIDES` keeps the Task 2 type/API unchanged; only media and image-led editorial values change.
- Each slide uses deterministic `/media/editorial/home-hero/v1/home-hero-0N-{desktop|mobile}.webp` assets.

**Explicit dependency:** Do not execute this task until the user has supplied four candidate hero images. If execution reaches this task before those assets exist, stop here, ask for the four images, and continue from this task after they are provided. Do not substitute web-sourced images.

- [ ] **Step 1: Inspect each supplied image before modifying code**

For slides 1–4, record in the execution notes:

- source dimensions and aspect ratio;
- whether resolution is sufficient for 1920px desktop delivery;
- subject location;
- negative-space side;
- desktop focal point;
- mobile focal point;
- required overlay intensity;
- physical copy side;
- image-supported message;
- one or two justified CTAs;
- suitability for a professional medical/procurement homepage;
- final slide order.

Reject an image rather than forcing unsuitable content into the hero.

- [ ] **Step 2: Create a reproducible offline-only derivative script**

`tools/prepare_home_hero_media.py` uses Pillow locally and is never imported by Next/Cloudflare. It should accept four positional source paths and write eight deterministic WebP files. Core implementation:

```py
from pathlib import Path
from PIL import Image, ImageOps
import argparse

DESKTOP = (1920, 1080)
MOBILE = (960, 1200)
QUALITY = 88

def render(source: Path, output: Path, size: tuple[int, int]) -> None:
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        image.thumbnail(size, Image.Resampling.LANCZOS)
        output.parent.mkdir(parents=True, exist_ok=True)
        image.save(output, "WEBP", quality=QUALITY, method=6)
```

The script must not crop automatically; focal cropping remains CSS `object-position`, preserving source information. If a particular supplied image requires a different crop for quality/composition, create that crop explicitly after visual review rather than applying one blind crop to all four.

Local setup/command:

```bash
python -m pip install Pillow
python tools/prepare_home_hero_media.py \
  /absolute/path/slide-01 \
  /absolute/path/slide-02 \
  /absolute/path/slide-03 \
  /absolute/path/slide-04 \
  --output apps/web/public/media/editorial/home-hero/v1
```

- [ ] **Step 3: Replace development slide media/copy with image-led final values**

For each slide, use the inspected physical copy side, focal points, alt text describing the actual image, and copy that the image truthfully supports. Preserve the exact four-slide tuple and 1–2 CTA limit.

Do not retain the Task 2 development copy merely because it already exists. Do not invent manufacturing, factory, certification, clinical, award, legal, export, or ownership claims.

- [ ] **Step 4: Update media/performance tests**

Add an invariant that all eight final hero derivatives exist and are local `/media/` paths; assert exactly one carousel image is marked priority/eager in rendered browser behavior.

Use static file-size checks during execution:

```bash
find apps/web/public/media/editorial/home-hero/v1 -type f -maxdepth 1 -print0 | xargs -0 ls -lh
```

Targets:

- desktop files ideally ≤350 KB;
- mobile files ideally ≤220 KB;
- exceeding target is acceptable only when visual review shows lower quality is materially harmful; record the reason in the completion note.

- [ ] **Step 5: Visually review all four slides at desktop and mobile before committing**

Minimum review:

- 390×844 mobile;
- 1366×768 short laptop;
- 1920×1080 desktop.

Check negative space, text overlap, focal point, overlay, CTA contrast, and image quality for every slide.

- [ ] **Step 6: Run focused tests and commit final hero assets/content**

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
- `HomeFamilyGallery({ families, locale }: { families: readonly FamilyCardModel[]; locale?: PublicLocale }): ReactElement`
- Same five existing family routes/media; no new data fetch.

- [ ] **Step 1: Add failing family contract tests**

```ts
it("keeps the exact five family routes and removes the old homepage collage dependency", () => {
  const discovery = source("src/features/homepage/sections/family-discovery.tsx");
  const gallery = source("src/features/homepage/sections/home-family-gallery.tsx");

  expect(discovery).toContain("HomeFamilyGallery");
  expect(discovery).not.toContain("FamilyCard");
  expect(gallery).toContain("home-family-gallery");
  expect(gallery).not.toContain("Explore collection");
  expect(gallery).not.toContain("product count");
});
```

Add browser assertions:

```ts
await expect(page.locator("[data-home-family-gallery] [data-family-panel]")).toHaveCount(5);
await expect(page.locator("[data-home-family-gallery] a")).toHaveCount(5);
```

- [ ] **Step 2: Run and confirm RED**

```bash
pnpm --filter @rosa/web test -- src/test/client-feedback-homepage-contract.test.ts
```

- [ ] **Step 3: Implement one semantic markup tree**

`home-family-gallery.tsx` should render one `<ul>` only; do not duplicate desktop/mobile links:

```tsx
import type { ReactElement } from "react";
import { MediaFrame } from "@/features/motion";
import { LocaleLink, type PublicLocale } from "@/features/localization";
import { publicMediaAlt } from "@/features/public-media";
import { familyHref, type FamilyCardModel } from "@/features/public-catalogue";

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

`FamilyDiscovery` keeps `SectionHeading` and calls this component. Remove homepage-only `Stagger`/`StaggerItem` from this section.

- [ ] **Step 4: Implement rail as the default presentation**

```css
.home-family-gallery-shell {
  container-type: inline-size;
  min-width: 0;
  overflow: hidden;
}

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

.home-family-gallery__link {
  position: relative;
  height: 100%;
  display: block;
  overflow: hidden;
  color: var(--color-paper);
  text-decoration: none;
}

.home-family-gallery__media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  aspect-ratio: auto !important;
}

.home-family-gallery__link::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgb(10 10 9 / 0.78), transparent 58%);
}

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

This default covers 360/390/430 phones, 768×1024, and coarse-pointer devices.

- [ ] **Step 5: Add the wide fine-pointer accordion mode**

Use media + container queries, no React mode detection:

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

    .home-family-gallery:has(.home-family-gallery__panel:hover, .home-family-gallery__panel:focus-within) .home-family-gallery__panel {
      flex-grow: 1;
    }

    .home-family-gallery:has(.home-family-gallery__panel:hover, .home-family-gallery__panel:focus-within) .home-family-gallery__panel:hover,
    .home-family-gallery:has(.home-family-gallery__panel:hover, .home-family-gallery__panel:focus-within) .home-family-gallery__panel:focus-within {
      flex-grow: 2.8;
    }

    .home-family-gallery__title {
      font-size: clamp(1.5rem, 2.25vw, 2.15rem);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-family-gallery__panel,
  .home-family-gallery__media .media-frame__image {
    transition: none !important;
  }
}
```

The first panel (Knives) is the deterministic initial expanded state. Focus activates another panel without JavaScript. All five links remain visible/focusable.

- [ ] **Step 6: Add explicit mode tests**

In the E2E spec:

- 768×1024 project must report `overflowX` as `auto`/`scroll` and first panel width around 80–88% of gallery width;
- 1024×768 desktop project with fine pointer must show all five panel bounding boxes in one row with no horizontal scrolling;
- desktop hover/focus of Chisels must increase its width relative to an inactive panel;
- mobile next panel must intersect the viewport enough to create the sliver/peek affordance;
- focused family link must have visible outline.

- [ ] **Step 7: Run focused tests and commit**

```bash
pnpm --filter @rosa/web test -- src/test/client-feedback-homepage-contract.test.ts
pnpm --filter @rosa/web test:e2e -- tests/e2e/client-feedback-homepage.spec.ts --project=desktop --project=tablet --project=mobile
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/homepage/sections/home-family-gallery.tsx apps/web/src/features/homepage/sections/family-discovery.tsx apps/web/src/styles/public-density.css apps/web/src/test/client-feedback-homepage-contract.test.ts apps/web/tests/e2e/client-feedback-homepage.spec.ts
git commit -m "feat(web): add responsive homepage family gallery"
```

---

### Task 7: Tune the Rest of the Homepage Without Redesigning It

**Files:**
- Modify: `apps/web/src/styles/public-density.css`
- Modify only if needed for semantic hooks: existing homepage section components under `apps/web/src/features/homepage/sections/`
- Modify: `apps/web/tests/e2e/client-feedback-homepage.spec.ts`

**Interfaces:**
- No new data interfaces.
- Existing section order and Catalogue component remain unchanged.

- [ ] **Step 1: Add preservation and density assertions before CSS changes**

E2E assertions must keep:

```ts
const sections = ["home-hero", "family-discovery", "procurement-support", "featured-instruments", "catalogue-access", "quotation-cta"];
for (const section of sections) await expect(page.locator(`[data-section='${section}']`)).toHaveCount(1);
await expect(page.locator("[data-section='catalogue-access'] [data-media-slot^='homepage-catalogue-']")).toHaveCount(5);
```

Add a 1366×768 density check that the family section heading + visible gallery occupy a materially smaller block than the previous stacked collage. Do not assert one fragile pixel value; assert no section exceeds `1.35 * viewportHeight` at this representative size except where actual content requires it.

- [ ] **Step 2: Run the focused browser spec to establish baseline**

```bash
pnpm --filter @rosa/web test:e2e -- tests/e2e/client-feedback-homepage.spec.ts --project=desktop
```

- [ ] **Step 3: Apply homepage-scoped density to existing sections**

In `public-density.css`, target only `.public-page--home` versions of existing components:

```css
.public-page--home .public-section-heading {
  margin-bottom: clamp(1.75rem, 4vw, 3rem);
}

.public-page--home .public-section-heading__title,
.public-page--home .procurement-panel__title,
.public-page--home .procurement-editorial__title {
  font-size: var(--public-density-section-title);
}

.public-page--home .public-section-heading__copy,
.public-page--home .procurement-editorial__body,
.public-page--home .procurement-panel__copy {
  font-size: var(--public-density-body);
}

.public-page--home .procurement-editorial,
.public-page--home .product-preview-grid {
  gap: clamp(1.25rem, 3vw, 2.25rem);
}

.public-page--home .procurement-editorial__media-reveal,
.public-page--home .procurement-editorial__visual {
  min-height: clamp(20rem, 34vw, 28rem);
}

.public-page--home .product-preview-card__body {
  min-height: clamp(8.5rem, 14vw, 10.5rem);
}

.public-page--home .catalogue-card {
  min-height: clamp(14rem, 22vw, 17rem);
}

.public-page--home .procurement-panel {
  padding: clamp(2rem, 4vw, 3.25rem);
}
```

Short laptop override:

```css
@media (max-height: 800px) and (min-width: 64.001rem) {
  .public-page--home .procurement-editorial__media-reveal,
  .public-page--home .procurement-editorial__visual {
    min-height: 20rem;
  }

  .public-page--home .catalogue-card {
    min-height: 13.5rem;
  }
}
```

Do not alter the Catalogue layout into an accordion or swipe rail.

- [ ] **Step 4: Review the five development viewports visually**

Review 360×800, 390×844, 768×1024, 1366×768, 1920×1080. Specifically compare before/after section density, not just correctness.

- [ ] **Step 5: Run F7 regression specs and commit**

```bash
pnpm --filter @rosa/web test:e2e -- tests/e2e/f7-homepage-polish.spec.ts tests/e2e/f7-responsive-restraint.spec.ts tests/e2e/client-feedback-homepage.spec.ts
pnpm --filter @rosa/web typecheck
git add apps/web/src/styles/public-density.css apps/web/tests/e2e/client-feedback-homepage.spec.ts apps/web/tests/e2e/f7-homepage-polish.spec.ts apps/web/tests/e2e/f7-responsive-restraint.spec.ts
git commit -m "refactor(web): tune homepage information density"
```

---

### Task 8: Add the Central Social Registry, Footer Row, and Contact Treatment

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
export function SocialLinksRow({ locale, className }: { locale?: PublicLocale; className?: string }): ReactElement;
```

- [ ] **Step 1: Write failing registry/static contracts**

```ts
import { SOCIAL_LINKS } from "@/features/social-links";

it("centralizes exactly four valid placeholder social destinations", () => {
  expect(SOCIAL_LINKS.map((item) => item.platform)).toEqual(["instagram", "facebook", "linkedin", "x"]);
  expect(SOCIAL_LINKS).toHaveLength(4);
  for (const item of SOCIAL_LINKS) {
    expect(item.href).toMatch(/^https:\/\//);
    expect(item.href).not.toBe("#");
  }
});
```

Also assert `contact-information-model.ts` no longer contains `@rosamedicalexample` after implementation.

- [ ] **Step 2: Verify RED**

```bash
pnpm --filter @rosa/web test -- src/test/client-feedback-homepage-contract.test.ts
```

- [ ] **Step 3: Implement exact social registry**

```ts
export const SOCIAL_LINKS = [
  { platform: "instagram", label: "Instagram", labelAr: "إنستغرام", href: "https://www.instagram.com/" },
  { platform: "facebook", label: "Facebook", labelAr: "فيسبوك", href: "https://www.facebook.com/" },
  { platform: "linkedin", label: "LinkedIn", labelAr: "لينكدإن", href: "https://www.linkedin.com/" },
  { platform: "x", label: "X / Twitter", labelAr: "إكس / تويتر", href: "https://x.com/" }
] as const;
```

`SocialLinksRow` renders a `<nav>`/`<ul>` with one external `<a target="_blank" rel="noopener noreferrer">` per item and localized accessible text. Do not fabricate icons from third-party packages; use text labels in the first implementation so no icon dependency is added.

- [ ] **Step 4: Integrate footer without adding a noisy fifth column**

In `PublicShell`, render `SocialLinksRow` inside `.site-footer__brand` after the footer description and before/after the quote CTA according to visual review. The existing three navigation columns remain intact.

- [ ] **Step 5: Integrate dedicated Contact socials**

Add a small social section between the Contact information/form section and location section:

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

Remove only the old fabricated `Social profiles` row from `CONTACT_INFORMATION`; leave business/contact rows untouched.

- [ ] **Step 6: Style compact footer/contact rows**

Use inline wrap, separators/underline motion, and existing colours; preserve ≥44px usable target height without making the footer taller than necessary.

- [ ] **Step 7: Add browser assertions and run tests**

Assert footer has four social links on `/` and Contact has a second four-link dedicated group; all eight rendered links use `_blank`, `noopener`, `noreferrer`, and valid HTTPS hrefs.

```bash
pnpm --filter @rosa/web test -- src/test/client-feedback-homepage-contract.test.ts
pnpm --filter @rosa/web test:e2e -- tests/e2e/client-feedback-homepage.spec.ts --project=desktop --project=mobile
pnpm --filter @rosa/web typecheck
```

- [ ] **Step 8: Commit social integration**

```bash
git add apps/web/src/features/social-links apps/web/src/components/layout/public-shell.tsx apps/web/src/features/contact-preview/contact-page.tsx apps/web/src/features/contact-preview/contact-information-model.ts apps/web/src/styles/public-density.css apps/web/src/test/client-feedback-homepage-contract.test.ts apps/web/tests/e2e/client-feedback-homepage.spec.ts
git commit -m "feat(web): add shared Rosa social links"
```

---

### Task 9: Refine Noto Sans Arabic Density and RTL Carousel/Gallery Behavior

**Files:**
- Modify: `apps/web/src/styles/public-density.css`
- Modify: `apps/web/src/styles/rtl.css` only for direction mechanics that cannot remain local
- Modify: `apps/web/src/test/client-feedback-homepage-contract.test.ts`
- Modify: `apps/web/tests/e2e/client-feedback-homepage.spec.ts`

**Interfaces:**
- Font family remains `var(--font-arabic)` from existing `Noto_Sans_Arabic` setup.
- Hero copy side remains physical image metadata and is not auto-mirrored by locale.

- [ ] **Step 1: Add failing Arabic font/direction contracts**

Static test:

```ts
it("keeps Noto Sans Arabic and adds dedicated Arabic density rules", () => {
  const layout = source("src/app/layout.tsx");
  const density = source("src/styles/public-density.css");
  expect(layout).toContain("Noto_Sans_Arabic");
  expect(density).toContain('html[dir="rtl"] .home-hero-carousel');
  expect(density).toContain("font-family: var(--font-arabic)");
});
```

Browser test on `/ar`:

- `<html dir="rtl" lang="ar">`;
- active hero title uses Noto Sans Arabic computed family;
- hero copy-side data attribute stays identical to the English slide for the same slide ID;
- no horizontal overflow;
- family rail/accordion text direction is RTL but physical image/copy metadata is not blindly mirrored.

- [ ] **Step 2: Run and confirm RED for new density rule**

```bash
pnpm --filter @rosa/web test -- src/test/client-feedback-homepage-contract.test.ts
```

- [ ] **Step 3: Add explicit Arabic typography values**

In `public-density.css`:

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

html[dir="rtl"] .home-hero__title {
  font-size: clamp(2.25rem, 3.8vw, 3.45rem);
}

html[dir="rtl"] .home-hero__copy-text,
html[dir="rtl"] .public-page--home .public-section-heading__copy {
  font-weight: 450;
  line-height: 1.72;
}

html[dir="rtl"] .public-eyebrow,
html[dir="rtl"] .page-eyebrow,
html[dir="rtl"] .site-footer__title {
  font-weight: 700;
  letter-spacing: 0;
  text-transform: none;
}

@media (max-width: 40rem) {
  html[dir="rtl"] .home-hero__title {
    font-size: clamp(2.1rem, 9.8vw, 2.65rem);
    line-height: 1.36;
  }
}
```

Do not add global RTL transforms that swap left/right `data-copy-side` behavior. The active slide’s overlay classes should be physical, while text alignment inside the copy region is RTL.

- [ ] **Step 4: Run Arabic desktop/mobile browser coverage**

```bash
pnpm --filter @rosa/web test:e2e -- tests/e2e/client-feedback-homepage.spec.ts --project=desktop --project=mobile
```

Review at least 390×844 and 1366×768 visually in Arabic.

- [ ] **Step 5: Commit Arabic refinement**

```bash
git add apps/web/src/styles/public-density.css apps/web/src/styles/rtl.css apps/web/src/test/client-feedback-homepage-contract.test.ts apps/web/tests/e2e/client-feedback-homepage.spec.ts
git commit -m "refactor(web): refine Arabic responsive typography"
```

---

### Task 10: Lock Accessibility, Autoplay, Swipe, and Reduced-Motion Browser Behavior

**Files:**
- Modify: `apps/web/tests/e2e/client-feedback-homepage.spec.ts`
- Modify as required by failures: `apps/web/src/features/homepage/sections/home-hero-carousel.tsx`
- Modify as required by failures: `apps/web/src/styles/public-density.css`

**Interfaces:**
- No new public API; hardens Task 3/4 behavior.

- [ ] **Step 1: Add browser tests before changing implementation**

Add explicit tests for:

1. dot click selects exact slide;
2. Left/Right on focused dot selects neighbor;
3. autoplay advances after ~4.75s when idle;
4. focus within the carousel prevents advance over >5.2s;
5. hover prevents advance on desktop;
6. `document.visibilityState="hidden"` path pauses when testable by page lifecycle; if browser cannot safely force real visibility, unit-test the pure `hidden` state and leave actual lifecycle listener covered by source contract;
7. reduced-motion context (`page.emulateMedia({ reducedMotion: "reduce" })`) does not advance over >5.2s;
8. mobile horizontal swipe >48px changes one slide;
9. mostly vertical gesture does not change slide;
10. no persistent arrow buttons exist;
11. four dots have ≥44px bounding boxes even though visual indicators are smaller;
12. active slide CTA(s) and family links have visible focus states.

Use tolerant timer bounds to avoid flaky exact-millisecond tests: wait `5_200ms`, not `4_751ms`.

- [ ] **Step 2: Run the new tests and observe any failures**

```bash
pnpm --filter @rosa/web test:e2e -- tests/e2e/client-feedback-homepage.spec.ts --project=desktop --project=mobile
```

- [ ] **Step 3: Fix only behavior proven failing**

Common fixes must stay local to `HomeHeroCarousel` and `public-density.css`; do not rewrite global MotionProvider.

Use one timeout cleanup pattern:

```ts
useEffect(() => {
  if (!shouldHeroAutoplay(autoplayState)) return;
  const timer = window.setTimeout(() => setActiveIndex((index) => nextHeroSlideIndex(index, slides.length)), HERO_AUTOPLAY_MS);
  return () => window.clearTimeout(timer);
}, [activeIndex, autoplayState, slides.length]);
```

Visibility listener:

```ts
useEffect(() => {
  const sync = () => setHidden(document.visibilityState !== "visible");
  sync();
  document.addEventListener("visibilitychange", sync);
  return () => document.removeEventListener("visibilitychange", sync);
}, []);
```

Do not introduce multiple overlapping intervals.

- [ ] **Step 4: Run focused unit + E2E regression**

```bash
pnpm --filter @rosa/web test -- src/test/home-hero-carousel-state.test.ts
pnpm --filter @rosa/web test:e2e -- tests/e2e/client-feedback-homepage.spec.ts --project=desktop --project=mobile
```

- [ ] **Step 5: Commit behavior hardening**

```bash
git add apps/web/tests/e2e/client-feedback-homepage.spec.ts apps/web/src/features/homepage/sections/home-hero-carousel.tsx apps/web/src/styles/public-density.css
git commit -m "test(web): lock homepage carousel accessibility behavior"
```

---

### Task 11: Add the Explicit Eleven-Viewport Responsive Acceptance Harness

**Files:**
- Create: `apps/web/tests/e2e/client-feedback-responsive-matrix.spec.ts`
- Modify: `apps/web/src/styles/public-density.css` only for defects found by the matrix

**Interfaces:**
- Test-only viewport matrix; no production API.

- [ ] **Step 1: Write the matrix harness**

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

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
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

Add helper assertions for:

- hero title/CTA visible and not clipped;
- four dots inside hero bounds;
- family name(s) not clipped;
- 1024×768 and wider fine-pointer layouts fit all five accordion panels on one row when usable container width ≥56rem;
- 768×1024 remains horizontal rail;
- large screens never exceed hero max ceiling;
- 1280×720 and 1366×768 show next-section continuation;
- no accidental global giant heading beyond the defined density ceiling.

- [ ] **Step 2: Run matrix and review every screenshot**

```bash
pnpm --filter @rosa/web test:e2e -- tests/e2e/client-feedback-responsive-matrix.spec.ts --project=desktop
```

Do not call the test complete solely because assertions pass. Open/review every attached screenshot for composition, crop, whitespace, text wrapping, family proportions, catalogue preservation, footer density, and overall balance.

- [ ] **Step 3: Run a separate mobile/coarse-pointer visual check**

```bash
pnpm --filter @rosa/web test:e2e -- tests/e2e/client-feedback-homepage.spec.ts --project=tablet --project=mobile
```

Review 360×800/390×844/430×932 mobile-sized captures using a coarse-pointer/mobile context where possible; the matrix’s desktop-Chromium geometry run does not replace touch-mode review.

- [ ] **Step 4: Fix only matrix-proven responsive defects**

Add no arbitrary breakpoint unless one of the eleven sizes or an interpolated size exposes a real composition failure. Prefer adjusting shared `clamp()`, max ceilings, or the existing short-viewport rule over adding one-off media queries.

After any fix, test at an intermediate size not in the matrix (for example 1180×820) to ensure the correction is fluid rather than hardcoded to the acceptance resolutions.

- [ ] **Step 5: Commit the acceptance harness and verified responsive fixes**

```bash
git add apps/web/tests/e2e/client-feedback-responsive-matrix.spec.ts apps/web/src/styles/public-density.css
git commit -m "test(web): add responsive homepage acceptance matrix"
```

---

### Task 12: Final Regression, Performance, Build, and Completion Evidence

**Files:**
- Modify only if verification reveals defects: files already owned by Tasks 1–11.
- Create: `docs/superpowers/completions/2026-08-08-client-feedback-responsive-homepage.md`
- Modify: `README.md` frontend communication/progress section only if the established coordination protocol requires a meaningful frontend handoff entry at completion.

**Interfaces:**
- No new runtime interface.

- [ ] **Step 1: Run complete focused unit contracts**

```bash
pnpm --filter @rosa/web test -- \
  src/test/home-hero-carousel-state.test.ts \
  src/test/client-feedback-homepage-contract.test.ts \
  src/test/public-performance-policy.test.ts
```

Expected: PASS.

- [ ] **Step 2: Run existing public homepage/responsive browser regression**

```bash
pnpm --filter @rosa/web test:e2e -- \
  tests/e2e/f7-homepage-polish.spec.ts \
  tests/e2e/f7-responsive-restraint.spec.ts \
  tests/e2e/client-feedback-homepage.spec.ts
```

Expected: PASS across applicable desktop/tablet/mobile projects, with only intentional skips based on project guards.

- [ ] **Step 3: Run the full eleven-size visual matrix one final time**

```bash
pnpm --filter @rosa/web test:e2e -- tests/e2e/client-feedback-responsive-matrix.spec.ts --project=desktop
```

Open/review all eleven screenshots and record pass/fail notes in the completion document.

- [ ] **Step 4: Verify performance boundaries in the browser/network log**

On `/` verify:

- no `/auth/v1/user` request;
- no transition-driven Supabase fetch when hero slide changes;
- no full-catalogue homepage request introduced;
- only first hero image is priority/eager;
- additional slides load progressively;
- family gallery interactions trigger no network request except normal route navigation when clicked;
- non-product hero/family imagery remains local `/media/...`;
- no new runtime image service hostname/config.

- [ ] **Step 5: Run full repository verification locally**

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Then verify Cloudflare/OpenNext packaging from the web workspace because deployment constraints are part of the preserved performance boundary:

```bash
cd apps/web
npx opennextjs-cloudflare build
cd ../..
```

Do not claim success without the actual command outputs.

- [ ] **Step 6: Write the completion record with exact evidence**

Create `docs/superpowers/completions/2026-08-08-client-feedback-responsive-homepage.md` containing:

- source branch and final commit;
- approved design/spec path and implementation-plan path;
- final four image asset paths + byte sizes;
- exact viewport matrix results;
- English/Arabic/reduced-motion/coarse-pointer evidence;
- exact unit/E2E/lint/typecheck/build/OpenNext results;
- confirmation that no `services/api/**`, OpenAPI, migration, production DDL/DML, or Storage deletion occurred;
- known warnings that are pre-existing and non-blocking, if any;
- explicit statement that density propagation to the rest of the public site is **not** included and requires a separate follow-up decision/spec.

Do not write “all tests passed” without exact counts/output from the current run.

- [ ] **Step 7: Update README coordination only if completion is meaningful for the partner lane**

If the work is complete and verified, append one concise frontend→backend message stating that the phase changed only public frontend presentation/shared shell, did not change backend contracts/data, and preserved bounded catalogue/runtime behavior. Do not rewrite historical ledger entries.

- [ ] **Step 8: Final commit**

```bash
git add docs/superpowers/completions/2026-08-08-client-feedback-responsive-homepage.md README.md
git commit -m "docs: record responsive homepage verification"
```

If README required no update, omit it from `git add`.

- [ ] **Step 9: Stop before merge/deploy**

Report the feature-branch tip, verification evidence, visual matrix status, and any remaining client-image/content blocker. Do not fast-forward `ahmadx67676767`, merge, open a deployment, or trigger production changes without explicit user instruction.

---

## Execution Order and Review Gates

1. Tasks 1–4 can proceed with the current source-controlled hero image as a development fixture.
2. Task 5 is the mandatory user-image gate; the phase cannot be declared complete without four supplied hero images and image-led slide review/copy.
3. Tasks 6–10 may proceed independently of final image optimization once the hero interaction contract is stable, but Task 11 visual acceptance should use the final four images.
4. Task 11 is the responsive visual gate.
5. Task 12 is the code/test/build/performance completion gate.
6. After Task 12, stop and evaluate the homepage density system before any site-wide propagation plan.

## Self-Review Checklist for the Implementer

Before reporting completion, confirm all of these are true:

- Exactly four hero slide records exist.
- `HERO_AUTOPLAY_MS === 4_750`.
- No permanent previous/next arrows were added.
- Every slide has 1–2 CTAs only.
- User-supplied final hero imagery replaced the development fixture.
- Only the first hero is aggressive priority/eager; others are progressive.
- Reduced motion disables autoplay and nonessential choreography.
- Focus/hover/drag/hidden states pause autoplay.
- 1366×768 and 1280×720 do not look like 125% zoom and show next-section continuation where content allows.
- 2560×1440 obeys large-screen ceilings.
- The family gallery has exactly five links and one semantic markup tree.
- 768×1024/coarse pointer uses the swipe rail.
- Wide fine-pointer layout shows all five panels with active expansion.
- Family panels contain image + family name only.
- Catalogue section remains distinct and is not an accordion.
- Footer + Contact use one four-platform social registry.
- No fabricated `@rosamedicalexample` social row remains.
- Noto Sans Arabic remains the Arabic font.
- Hero physical `copySide` is not auto-mirrored in RTL.
- No horizontal overflow at all eleven acceptance sizes.
- All eleven screenshots were visually reviewed.
- No paid runtime image infrastructure was added.
- No public Supabase auth refresh was reintroduced.
- No backend contract/schema/data/storage mutation occurred.
- Full lint/typecheck/test/build/OpenNext evidence exists from the final branch state.
