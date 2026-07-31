# Rosa Medical F3A Homepage and Products Overview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved Rosa Medical homepage and products-overview page as complete static, responsive, Figma-led compositions using typed fixtures, reusable catalogue components, neutral replaceable media, and no live backend dependency.

**Architecture:** The existing public catch-all route remains the route entry point, but `/` and `/products` delegate to isolated feature entry components while all other routes continue to render `RoutePlaceholder`. Homepage-only and products-only sections live in separate feature folders. Reusable family, product-preview, section-heading, media-placeholder, and procurement-panel components live in `features/public-catalogue`, consume validated presentation models, and never fetch data directly.

**Tech Stack:** Next.js 16.2.11 App Router, React 19.2, strict TypeScript 5.9, Tailwind CSS 4 plus the existing CSS token system, Lora and Inter, pnpm 11.4.0, Vitest 3.2, React server rendering for component tests, and Playwright 1.57 for desktop, tablet, and mobile route checks.

## Global Constraints

- Read `README.md` at the start of execution and preserve frontend/backend ownership boundaries.
- Branch from `frontend/f3a-home-products-design`; implement on `frontend/f3a-home-products`.
- The public logo remains **ROSA** only; never append “Medical” to the logo lockup.
- Public positioning is medical instruments supplier and procurement partner.
- Primary families are Knives, Scissors, Punches, Chisels, and Cutters.
- The site is quotation-led, not ecommerce.
- Do not show prices, inventory, stock, checkout, payments, discounts, ratings, shipping, or orders.
- Do not publish unverified manufacturing, factory, certification, ownership, award, export, regulatory, legal, or clinical claims.
- Do not invent statistics, testimonials, customer logos, experience figures, or geographic reach.
- Use the existing Rosa tokens: red `#E00815`, near-black `#191917`, white, warm off-white, and restrained steel/light greys.
- Use Lora for editorial headings and Inter for operational text.
- Product media remains neutral, replaceable placeholder media until verified client assets are supplied.
- Avoid generic medical gradients, blue healthcare styling, stock doctors, blobs, glassmorphism, excessive cards, excessive pills, and unnecessary rounded containers.
- English is implemented first; component structure and logical CSS must remain future RTL-compatible.
- No live API calls, MSW, inquiry state, search behavior, admin work, or Arabic activation belong in F3A.
- Preserve all existing routes and the existing public/admin shells.
- Use typed fixture data from `@rosa/contracts/fixtures`; components must not call `fetch`.
- Keep exactly one `<main>` and one `<h1>` per upgraded route.
- Preserve visible keyboard focus, practical 44 px targets, reduced-motion behavior, and zero horizontal overflow.
- Commit only meaningful, independently reviewable tasks.

---

## File Map

### Existing files to modify

- `apps/web/src/app/(public)/[[...segments]]/page.tsx` — dispatch `/` and `/products` to feature entry components while retaining placeholders elsewhere.
- `apps/web/src/app/globals.css` — import `public-pages.css` after the existing foundation styles.
- `apps/web/playwright.config.ts` — add a permanent 768 × 1024 tablet project.
- `README.md` on `main` after implementation — record F3A evidence and unchanged Contract 0.1 status.

### New shared public-catalogue files

- `apps/web/src/features/public-catalogue/models.ts`
- `apps/web/src/features/public-catalogue/selectors.ts`
- `apps/web/src/features/public-catalogue/section-heading.tsx`
- `apps/web/src/features/public-catalogue/product-media-placeholder.tsx`
- `apps/web/src/features/public-catalogue/family-card.tsx`
- `apps/web/src/features/public-catalogue/product-preview-card.tsx`
- `apps/web/src/features/public-catalogue/procurement-panel.tsx`
- `apps/web/src/features/public-catalogue/index.ts`

### New homepage files

- `apps/web/src/features/homepage/homepage.data.ts`
- `apps/web/src/features/homepage/homepage.tsx`
- `apps/web/src/features/homepage/sections/home-hero.tsx`
- `apps/web/src/features/homepage/sections/family-discovery.tsx`
- `apps/web/src/features/homepage/sections/featured-instruments.tsx`
- `apps/web/src/features/homepage/sections/procurement-support.tsx`
- `apps/web/src/features/homepage/sections/catalogue-access.tsx`
- `apps/web/src/features/homepage/sections/quotation-cta.tsx`

### New products-overview files

- `apps/web/src/features/products/products.data.ts`
- `apps/web/src/features/products/products-overview.tsx`
- `apps/web/src/features/products/sections/products-hero.tsx`
- `apps/web/src/features/products/sections/family-index.tsx`
- `apps/web/src/features/products/sections/discovery-toolbar-shell.tsx`
- `apps/web/src/features/products/sections/product-preview-grid.tsx`
- `apps/web/src/features/products/sections/products-procurement-cta.tsx`

### New routing, styling, tests, and completion files

- `apps/web/src/features/public-routing/resolve-public-page.tsx`
- `apps/web/src/styles/public-pages.css`
- `apps/web/src/test/public-catalogue-selectors.test.ts`
- `apps/web/src/test/public-catalogue-components.test.tsx`
- `apps/web/src/test/public-page-composition.test.tsx`
- `apps/web/src/test/public-page-styles.static.test.mjs`
- `apps/web/src/test/public-route-dispatch.test.ts`
- `apps/web/tests/e2e/f3a-public-pages.spec.ts`
- `docs/superpowers/completions/2026-08-01-rosa-medical-f3a-home-products.md`

---

### Task 1: Create the implementation branch and route-safe presentation models

**Files:**
- Create: `apps/web/src/features/public-catalogue/models.ts`
- Create: `apps/web/src/test/public-catalogue-selectors.test.ts`

**Interfaces:**
- Produces `FAMILY_SLUGS`, `FamilySlug`, `FamilyCardModel`, `ProductPreviewModel`, `familyHref`, and `productHref`.

- [ ] **Step 1: Create the isolated branch**

```bash
git fetch origin
git switch frontend/f3a-home-products-design
git pull --ff-only
git switch -c frontend/f3a-home-products
```

Expected: branch starts from the approved F3A spec and corrected plan.

- [ ] **Step 2: Write the failing route-model test**

Create `apps/web/src/test/public-catalogue-selectors.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  FAMILY_SLUGS,
  familyHref,
  productHref,
  type ProductPreviewModel
} from "@/features/public-catalogue/models";

describe("public catalogue route models", () => {
  it("locks the approved family order", () => {
    expect(FAMILY_SLUGS).toEqual([
      "knives",
      "scissors",
      "punches",
      "chisels",
      "cutters"
    ]);
  });

  it("builds deterministic family and product paths", () => {
    const product: ProductPreviewModel = {
      id: "product_scalpel_handle_3",
      slug: "scalpel-handle-no-3",
      familySlug: "knives",
      familyName: "Knives",
      name: "Scalpel Handle No. 3",
      code: "18-0644",
      description: "Reusable surgical instrument handle presented for quotation review.",
      imageLabel: "Scalpel handle placeholder"
    };

    expect(familyHref("knives")).toBe("/products/knives");
    expect(productHref(product)).toBe("/products/knives/scalpel-handle-no-3");
  });
});
```

- [ ] **Step 3: Verify the test is red**

```bash
pnpm --filter @rosa/web test -- public-catalogue-selectors.test.ts
```

Expected: FAIL because `models.ts` does not exist.

- [ ] **Step 4: Implement the models and route helpers**

Create `models.ts`:

```ts
import type { Route } from "next";

export const FAMILY_SLUGS = [
  "knives",
  "scissors",
  "punches",
  "chisels",
  "cutters"
] as const;

export type FamilySlug = (typeof FAMILY_SLUGS)[number];

export interface FamilyCardModel {
  id: string;
  slug: FamilySlug;
  name: string;
  description?: string;
  imageLabel: string;
}

export interface ProductPreviewModel {
  id: string;
  slug: string;
  familySlug: FamilySlug;
  familyName: string;
  name: string;
  code: string;
  description?: string;
  imageLabel: string;
}

export function familyHref(slug: FamilySlug) {
  return `/products/${slug}` as const;
}

export function productHref<TSlug extends string>(
  product: Pick<ProductPreviewModel, "familySlug"> & { slug: TSlug }
): Route<`/products/${FamilySlug}/${TSlug}`> {
  return `/products/${product.familySlug}/${product.slug}` as Route<
    `/products/${FamilySlug}/${TSlug}`
  >;
}
```

The only typed-route assertion lives at this validated route-construction boundary.

- [ ] **Step 5: Verify green state and commit**

```bash
pnpm --filter @rosa/web test -- public-catalogue-selectors.test.ts
git add apps/web/src/features/public-catalogue/models.ts apps/web/src/test/public-catalogue-selectors.test.ts
git commit -m "feat: define public catalogue presentation models"
```

Expected: 2 tests PASS.

---

### Task 2: Build deterministic selectors from shared fixtures

**Files:**
- Create: `apps/web/src/features/public-catalogue/selectors.ts`
- Create: `apps/web/src/features/public-catalogue/index.ts`
- Modify: `apps/web/src/test/public-catalogue-selectors.test.ts`

**Interfaces:**
- Consumes `familyFixtures` and `productFixtures` from `@rosa/contracts/fixtures`.
- Produces `selectFamilyCards`, `selectFeaturedProducts`, and `familyNameBySlug`.

- [ ] **Step 1: Add failing selector cases**

Append to the test:

```ts
import {
  familyNameBySlug,
  selectFamilyCards,
  selectFeaturedProducts
} from "@/features/public-catalogue/selectors";

it("maps all five shared families in approved order", () => {
  expect(selectFamilyCards().map((family) => family.slug)).toEqual(FAMILY_SLUGS);
  expect(selectFamilyCards()).toHaveLength(5);
});

it("maps shared products with family names and codes", () => {
  expect(selectFeaturedProducts()).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ code: "18-0644", familyName: "Knives" }),
      expect.objectContaining({ code: "04-0402", familyName: "Scissors" })
    ])
  );
});

it("rejects unknown family data at the selector boundary", () => {
  expect(() => familyNameBySlug("unknown" as never)).toThrow(
    "Unknown Rosa family slug: unknown"
  );
});
```

- [ ] **Step 2: Verify red state**

```bash
pnpm --filter @rosa/web test -- public-catalogue-selectors.test.ts
```

Expected: FAIL because `selectors.ts` does not exist.

- [ ] **Step 3: Implement deterministic selectors**

Create `selectors.ts`:

```ts
import { familyFixtures, productFixtures } from "@rosa/contracts/fixtures";
import {
  FAMILY_SLUGS,
  type FamilyCardModel,
  type FamilySlug,
  type ProductPreviewModel
} from "./models";

function isFamilySlug(value: string): value is FamilySlug {
  return FAMILY_SLUGS.some((slug) => slug === value);
}

export function familyNameBySlug(slug: FamilySlug): string {
  const fixture = familyFixtures.find((family) => family.slug === slug);
  if (!fixture) throw new Error(`Unknown Rosa family slug: ${slug}`);
  return fixture.name.en;
}

export function selectFamilyCards(): readonly FamilyCardModel[] {
  return FAMILY_SLUGS.map((slug) => {
    const fixture = familyFixtures.find((family) => family.slug === slug);
    if (!fixture) throw new Error(`Missing Rosa family fixture: ${slug}`);
    return {
      id: fixture.id,
      slug,
      name: fixture.name.en,
      description: fixture.introduction.en || undefined,
      imageLabel: `${fixture.name.en} instrument placeholder`
    };
  });
}

export function selectFeaturedProducts(): readonly ProductPreviewModel[] {
  return productFixtures.map((product) => {
    if (!isFamilySlug(product.familySlug)) {
      throw new Error(`Unknown Rosa family slug: ${product.familySlug}`);
    }
    return {
      id: product.id,
      slug: product.slug,
      familySlug: product.familySlug,
      familyName: familyNameBySlug(product.familySlug),
      name: product.name.en,
      code: product.code,
      description: product.shortDescription.en || undefined,
      imageLabel: `${product.name.en} placeholder`
    };
  });
}
```

Create `index.ts`:

```ts
export * from "./models";
export * from "./selectors";
```

- [ ] **Step 4: Verify and commit**

```bash
pnpm --filter @rosa/web test -- public-catalogue-selectors.test.ts
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/public-catalogue apps/web/src/test/public-catalogue-selectors.test.ts
git commit -m "feat: add deterministic public catalogue selectors"
```

Expected: selector tests and typecheck PASS.

---

### Task 3: Implement reusable catalogue components

**Files:**
- Create: `apps/web/src/features/public-catalogue/section-heading.tsx`
- Create: `apps/web/src/features/public-catalogue/product-media-placeholder.tsx`
- Create: `apps/web/src/features/public-catalogue/family-card.tsx`
- Create: `apps/web/src/features/public-catalogue/product-preview-card.tsx`
- Create: `apps/web/src/features/public-catalogue/procurement-panel.tsx`
- Modify: `apps/web/src/features/public-catalogue/index.ts`
- Create: `apps/web/src/test/public-catalogue-components.test.tsx`

**Interfaces:**
- Produces `SectionHeading`, `ProductMediaPlaceholder`, `FamilyCard`, `ProductPreviewCard`, and `ProcurementPanel`.

- [ ] **Step 1: Write failing server-rendered semantic tests**

Create `public-catalogue-components.test.tsx`:

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  FamilyCard,
  ProductMediaPlaceholder,
  ProductPreviewCard,
  SectionHeading
} from "@/features/public-catalogue";

const family = {
  id: "family_knives",
  slug: "knives" as const,
  name: "Knives",
  description: "Precision cutting instruments organised for professional inquiry.",
  imageLabel: "Knives instrument placeholder"
};

const product = {
  id: "product_scalpel_handle_3",
  slug: "scalpel-handle-no-3",
  familySlug: "knives" as const,
  familyName: "Knives",
  name: "Scalpel Handle No. 3",
  code: "18-0644",
  description: "Reusable surgical instrument handle presented for quotation review.",
  imageLabel: "Scalpel handle placeholder"
};

describe("public catalogue components", () => {
  it("renders caller-controlled semantic headings", () => {
    const html = renderToStaticMarkup(
      <SectionHeading level={2} title="Instrument families" copy="Browse by family." />
    );
    expect(html).toContain("<h2");
    expect(html).toContain("Instrument families");
  });

  it("renders family and product cards without commerce language", () => {
    const html = renderToStaticMarkup(
      <><FamilyCard family={family} /><ProductPreviewCard product={product} /></>
    );
    expect(html).toContain("/products/knives");
    expect(html).toContain("18-0644");
    expect(html).not.toMatch(/price|stock|rating|buy now/i);
  });

  it("hides decorative media from assistive technology", () => {
    const html = renderToStaticMarkup(
      <ProductMediaPlaceholder label="Decorative instrument marker" decorative />
    );
    expect(html).toContain('aria-hidden="true"');
  });
});
```

- [ ] **Step 2: Verify red state**

```bash
pnpm --filter @rosa/web test -- public-catalogue-components.test.tsx
```

Expected: FAIL because the components are missing.

- [ ] **Step 3: Implement the component signatures**

Use `ReactElement` rather than the global `JSX.Element` type:

```tsx
import type { ReactElement, ReactNode } from "react";

export function SectionHeading(props: {
  level: 2 | 3;
  eyebrow?: string;
  title: string;
  copy?: string;
  action?: ReactNode;
  align?: "start" | "center";
}): ReactElement;

export function ProductMediaPlaceholder(props: {
  label: string;
  decorative?: boolean;
  aspect?: "landscape" | "portrait" | "square";
}): ReactElement;

export function FamilyCard(props: { family: FamilyCardModel }): ReactElement;

export function ProductPreviewCard(props: {
  product: ProductPreviewModel;
}): ReactElement;
```

Implementation rules:

- `SectionHeading` selects `h2` or `h3` from the `level` prop.
- Family and product cards render one linked `<article>` with no nested interaction.
- `FamilyCard` uses `familyHref(family.slug)`.
- `ProductPreviewCard` uses `productHref(product)`.
- Product code renders in `<span className="product-code">`.
- Optional descriptions disappear cleanly.
- Informative media uses `role="img" aria-label={label}`.
- Decorative media uses `aria-hidden="true"` and no role.

- [ ] **Step 4: Implement `ProcurementPanel`**

```tsx
import type { Route } from "next";
import type { ReactElement } from "react";

export interface ProcurementPanelProps<
  TPrimary extends string,
  TSecondary extends string = TPrimary
> {
  eyebrow?: string;
  title: string;
  copy: string;
  primary: { label: string; href: Route<TPrimary> };
  secondary?: { label: string; href: Route<TSecondary> };
  tone?: "paper" | "dark";
}

export function ProcurementPanel<
  TPrimary extends string,
  TSecondary extends string = TPrimary
>(props: ProcurementPanelProps<TPrimary, TSecondary>): ReactElement;
```

Render exactly one primary `ButtonLink`; render the secondary action as a subordinate `Link`.

- [ ] **Step 5: Export, verify, and commit**

Update `index.ts` to export every shared component, then run:

```bash
pnpm --filter @rosa/web test -- public-catalogue-components.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/public-catalogue apps/web/src/test/public-catalogue-components.test.tsx
git commit -m "feat: add reusable public catalogue components"
```

Expected: component tests and typecheck PASS.

---

### Task 4: Add the F3A page styling system

**Files:**
- Create: `apps/web/src/styles/public-pages.css`
- Modify: `apps/web/src/app/globals.css`
- Create: `apps/web/src/test/public-page-styles.static.test.mjs`

**Interfaces:**
- Consumes existing tokens from `tokens.css` and existing layout/UI classes.
- Produces all F3A page, section, card, media, CTA, and responsive classes.

- [ ] **Step 1: Write failing style invariants**

Create `public-page-styles.static.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("F3A stylesheet defines required systems", async () => {
  const css = await read("styles/public-pages.css");
  for (const selector of [
    ".public-hero",
    ".family-card",
    ".product-preview-card",
    ".product-media-placeholder",
    ".procurement-panel",
    ".products-discovery-shell"
  ]) assert.match(css, new RegExp(selector.replaceAll(".", "\\.")));
});

test("F3A stylesheet includes tablet, mobile and reduced-motion rules", async () => {
  const css = await read("styles/public-pages.css");
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 640px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});

test("global CSS imports F3A styles after foundations", async () => {
  const css = await read("app/globals.css");
  assert.ok(css.indexOf("../styles/public-pages.css") > css.indexOf("../styles/components.css"));
});
```

- [ ] **Step 2: Verify red state**

```bash
node --test apps/web/src/test/public-page-styles.static.test.mjs
```

Expected: FAIL because `public-pages.css` is missing.

- [ ] **Step 3: Create token-correct CSS foundations**

Use only existing token names:

```css
.public-page { min-width: 0; }
.public-hero { position: relative; overflow: clip; }
.public-hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(20rem, .95fr);
  gap: var(--space-7);
  align-items: center;
}
.public-eyebrow {
  color: var(--color-steel);
  font-family: var(--font-interface);
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.public-section-heading__copy {
  max-width: 42rem;
  color: var(--color-steel);
}
.family-card,
.product-preview-card {
  min-width: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-surface);
  background: var(--color-paper);
}
.product-media-placeholder {
  display: grid;
  place-items: center;
  overflow: hidden;
  background: var(--color-mist);
}
.procurement-panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--space-6);
  align-items: end;
}
.products-discovery-shell { border-block: 1px solid var(--color-border); }
```

Add explicit `:focus-within` styles at least as visible as hover. Do not add heavy shadows.

- [ ] **Step 4: Add responsive rules**

At `max-width: 900px`, collapse fragile editorial splits and use stable two-column family/product grids. At `max-width: 640px`, use one content column and stack CTA actions. Add reduced-motion overrides for all card/media transforms.

- [ ] **Step 5: Import, verify, and commit**

Append after existing imports in `globals.css`:

```css
@import "../styles/public-pages.css";
```

Run:

```bash
node --test apps/web/src/test/public-page-styles.static.test.mjs
pnpm --filter @rosa/web test:foundation
git add apps/web/src/styles/public-pages.css apps/web/src/app/globals.css apps/web/src/test/public-page-styles.static.test.mjs
git commit -m "feat: add responsive public page styling system"
```

Expected: style invariants and Layer 1 foundation tests PASS.

---

### Task 5: Compose the static homepage

**Files:**
- Create all files under `apps/web/src/features/homepage/` listed in the file map.
- Create: `apps/web/src/test/public-page-composition.test.tsx`

**Interfaces:**
- Produces `HOME_PAGE_MODEL`, `Homepage`, and six focused sections.

- [ ] **Step 1: Write failing homepage composition tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Homepage } from "@/features/homepage/homepage";

describe("Rosa homepage composition", () => {
  it("renders one main, one h1 and all approved sections", () => {
    const html = renderToStaticMarkup(<Homepage />);
    expect((html.match(/<main/g) || [])).toHaveLength(1);
    expect((html.match(/<h1/g) || [])).toHaveLength(1);
    for (const marker of [
      "home-hero",
      "family-discovery",
      "featured-instruments",
      "procurement-support",
      "catalogue-access",
      "quotation-cta"
    ]) expect(html).toContain(`data-section="${marker}"`);
  });

  it("shows five families without prohibited claims or commerce", () => {
    const html = renderToStaticMarkup(<Homepage />);
    for (const family of ["Knives", "Scissors", "Punches", "Chisels", "Cutters"]) {
      expect(html).toContain(family);
    }
    expect(html).not.toMatch(/price|in stock|rating|checkout|certified|years of experience|trusted by/i);
  });
});
```

Run and expect red:

```bash
pnpm --filter @rosa/web test -- public-page-composition.test.tsx
```

- [ ] **Step 2: Define safe homepage data**

Create `homepage.data.ts`:

```ts
import { selectFamilyCards, selectFeaturedProducts } from "@/features/public-catalogue";

export const HOME_PAGE_MODEL = {
  hero: {
    eyebrow: "Medical instruments for professional procurement",
    title: "A clearer way to review instruments and request a quotation.",
    copy: "Browse Rosa instrument families, review product references, and prepare a focused procurement inquiry.",
    primary: { label: "Browse instruments", href: "/products" as const },
    secondary: { label: "Request a quotation", href: "/request-quotation" as const }
  },
  families: selectFamilyCards(),
  featuredProducts: selectFeaturedProducts(),
  procurement: {
    eyebrow: "Procurement support",
    title: "Move from catalogue review to a focused inquiry.",
    copy: "Use family, product code, size, and variant references to prepare a clear request for quotation."
  },
  catalogue: {
    eyebrow: "Technical catalogues",
    title: "Review instrument families through structured catalogue references.",
    copy: "Open the catalogue library to continue product and specification review.",
    action: { label: "View catalogues", href: "/catalogues" as const }
  },
  quotation: {
    eyebrow: "Request a quotation",
    title: "Have an instrument family or product reference in mind?",
    copy: "Send the details available to you and Rosa will receive a structured quotation request.",
    primary: { label: "Start quotation request", href: "/request-quotation" as const },
    secondary: { label: "Contact Rosa", href: "/contact" as const }
  }
} as const;
```

Copy may be tightened for Figma line length, but its meaning and claim safety must remain unchanged.

- [ ] **Step 3: Implement the six sections and page entry**

```tsx
export function Homepage() {
  return (
    <main id="main-content" className="public-page public-page--home">
      <HomeHero model={HOME_PAGE_MODEL.hero} />
      <FamilyDiscovery families={HOME_PAGE_MODEL.families} />
      <FeaturedInstruments products={HOME_PAGE_MODEL.featuredProducts} />
      <ProcurementSupport model={HOME_PAGE_MODEL.procurement} />
      <CatalogueAccess model={HOME_PAGE_MODEL.catalogue} />
      <QuotationCta model={HOME_PAGE_MODEL.quotation} />
    </main>
  );
}
```

Rules:

- Hero uses one `<h1>`, two actions, and a restrained product-led placeholder composition.
- Family discovery uses a semantic `<ul>` with all five families; no carousel.
- Featured instruments explicitly says the products are representative references, not the full catalogue.
- Procurement support uses an editorial split and textual process, not generic icon cards.
- Catalogue access links to `/catalogues` without fake PDF metadata.
- Final CTA uses one primary action and one subordinate contact link.

- [ ] **Step 4: Verify and commit**

```bash
pnpm --filter @rosa/web test -- public-page-composition.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/homepage apps/web/src/test/public-page-composition.test.tsx
git commit -m "feat: compose Rosa public homepage"
```

Expected: homepage tests and typecheck PASS.

---

### Task 6: Compose the static products overview

**Files:**
- Create all files under `apps/web/src/features/products/` listed in the file map.
- Modify: `apps/web/src/test/public-page-composition.test.tsx`

**Interfaces:**
- Produces `PRODUCTS_PAGE_MODEL`, `ProductsOverview`, and five focused sections.

- [ ] **Step 1: Add failing products-page tests**

```tsx
import { ProductsOverview } from "@/features/products/products-overview";

describe("Rosa products overview composition", () => {
  it("renders one main, one h1 and all approved products sections", () => {
    const html = renderToStaticMarkup(<ProductsOverview />);
    expect((html.match(/<main/g) || [])).toHaveLength(1);
    expect((html.match(/<h1/g) || [])).toHaveLength(1);
    for (const marker of [
      "products-hero",
      "family-index",
      "discovery-toolbar",
      "product-preview-grid",
      "products-procurement-cta"
    ]) expect(html).toContain(`data-section="${marker}"`);
  });

  it("uses search navigation rather than a deceptive static form", () => {
    const html = renderToStaticMarkup(<ProductsOverview />);
    expect(html).not.toContain("<form");
    expect(html).toContain("/search");
  });
});
```

Run and expect only products cases to fail:

```bash
pnpm --filter @rosa/web test -- public-page-composition.test.tsx
```

- [ ] **Step 2: Define safe products-page data**

Create `products.data.ts`:

```ts
import { selectFamilyCards, selectFeaturedProducts } from "@/features/public-catalogue";

export const PRODUCTS_PAGE_MODEL = {
  hero: {
    eyebrow: "Instrument catalogue",
    title: "Browse Rosa instruments by family and product reference.",
    copy: "Start with an instrument family, then continue to product codes, sizes, and available variants.",
    action: { label: "View technical catalogues", href: "/catalogues" as const }
  },
  families: selectFamilyCards(),
  discovery: {
    title: "Looking for a specific instrument?",
    copy: "Use catalogue search to review available product names and codes.",
    action: { label: "Open catalogue search", href: "/search" as const }
  },
  products: selectFeaturedProducts(),
  procurement: {
    eyebrow: "Quotation support",
    title: "Use product references to prepare a focused request.",
    copy: "Include the family, product code, size, and variant information available to you.",
    primary: { label: "Request a quotation", href: "/request-quotation" as const },
    secondary: { label: "Send an inquiry", href: "/inquiry" as const }
  }
} as const;
```

- [ ] **Step 3: Implement the five products sections and entry**

```tsx
export function ProductsOverview() {
  return (
    <main id="main-content" className="public-page public-page--products">
      <ProductsHero model={PRODUCTS_PAGE_MODEL.hero} />
      <FamilyIndex families={PRODUCTS_PAGE_MODEL.families} />
      <DiscoveryToolbarShell model={PRODUCTS_PAGE_MODEL.discovery} />
      <ProductPreviewGrid products={PRODUCTS_PAGE_MODEL.products} />
      <ProductsProcurementCta model={PRODUCTS_PAGE_MODEL.procurement} />
    </main>
  );
}
```

Rules:

- Products hero is smaller than the homepage hero.
- All five families remain visible in deterministic order.
- Discovery shell is a navigation panel to `/search`, never a fake form.
- Product previews are labelled as representative references.
- Final CTA copy differs from the homepage CTA.

- [ ] **Step 4: Verify and commit**

```bash
pnpm --filter @rosa/web test -- public-page-composition.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/products apps/web/src/test/public-page-composition.test.tsx
git commit -m "feat: compose products overview page"
```

Expected: all composition tests and typecheck PASS.

---

### Task 7: Route the upgraded pages and preserve all other routes

**Files:**
- Create: `apps/web/src/features/public-routing/resolve-public-page.tsx`
- Modify: `apps/web/src/app/(public)/[[...segments]]/page.tsx`
- Create: `apps/web/src/test/public-route-dispatch.test.ts`

**Interfaces:**
- Produces `resolvePublicPageKind` and `resolvePublicPage`.

- [ ] **Step 1: Write the failing dispatch test**

```ts
import { describe, expect, it } from "vitest";
import { resolvePublicPageKind } from "@/features/public-routing/resolve-public-page";

describe("public route dispatch", () => {
  it.each([
    ["", "homepage"],
    ["products", "products"],
    ["catalogues", "placeholder"],
    ["products/knives", "placeholder"]
  ])("maps %s to %s", (key, expected) => {
    expect(resolvePublicPageKind(key)).toBe(expected);
  });
});
```

Run and expect red:

```bash
pnpm --filter @rosa/web test -- public-route-dispatch.test.ts
```

- [ ] **Step 2: Implement explicit page resolution**

```tsx
import type { ReactNode } from "react";
import { RoutePlaceholder } from "@/components/layout/route-placeholder";
import { Homepage } from "@/features/homepage/homepage";
import { ProductsOverview } from "@/features/products/products-overview";

export type PublicPageKind = "homepage" | "products" | "placeholder";

export function resolvePublicPageKind(key: string): PublicPageKind {
  if (key === "") return "homepage";
  if (key === "products") return "products";
  return "placeholder";
}

export function resolvePublicPage(args: {
  key: string;
  path: string;
  title: string;
}): ReactNode {
  switch (resolvePublicPageKind(args.key)) {
    case "homepage": return <Homepage />;
    case "products": return <ProductsOverview />;
    default:
      return <RoutePlaceholder eyebrow="Public route" title={args.title} path={args.path} />;
  }
}
```

- [ ] **Step 3: Reduce the catch-all page to parsing and delegation**

Keep the existing `routeTitles` map. Replace direct placeholder rendering with:

```tsx
const key = segments.join("/");
const path = `/${key}`;
const title = routeTitles[key] ?? (segments.at(-1)?.replaceAll("-", " ") || "Homepage");
return resolvePublicPage({ key, path, title });
```

- [ ] **Step 4: Verify build safety and commit**

```bash
pnpm --filter @rosa/web test -- public-route-dispatch.test.ts route-inventory.test.ts
pnpm --filter @rosa/web typecheck
pnpm --filter @rosa/web build
git add apps/web/src/app apps/web/src/features/public-routing apps/web/src/test/public-route-dispatch.test.ts
git commit -m "feat: route homepage and products compositions"
```

Expected: dispatch and route inventory tests, typecheck, and production build PASS.

---

### Task 8: Add deterministic desktop, tablet, and mobile browser verification

**Files:**
- Modify: `apps/web/playwright.config.ts`
- Create: `apps/web/tests/e2e/f3a-public-pages.spec.ts`
- Create: Playwright snapshots after layout stabilizes.

**Interfaces:**
- Produces browser evidence for semantics, overflow, focus, family links, search-shell honesty, and visual snapshots.

- [ ] **Step 1: Add the tablet project permanently**

Add between desktop and mobile:

```ts
{
  name: "tablet",
  use: { viewport: { width: 768, height: 1024 } }
}
```

- [ ] **Step 2: Write browser checks**

Create `f3a-public-pages.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

for (const route of ["/", "/products"] as const) {
  test(`${route} has stable F3A semantics and no horizontal overflow`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("body")).not.toContainText(/price|in stock|rating|checkout/i);
    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflow).toBe(false);
  });

  test(`${route} exposes visible keyboard focus`, async ({ page }) => {
    await page.goto(route);
    await page.keyboard.press("Tab");
    await expect(page.locator(":focus")).toBeVisible();
  });
}

test("homepage exposes all five family links", async ({ page }) => {
  await page.goto("/");
  for (const slug of ["knives", "scissors", "punches", "chisels", "cutters"]) {
    await expect(page.locator(`a[href="/products/${slug}"]`)).toBeVisible();
  }
});

test("products discovery shell links to search without a fake form", async ({ page }) => {
  await page.goto("/products");
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.locator('a[href="/search"]')).toBeVisible();
});
```

- [ ] **Step 3: Install Chromium once when missing**

```bash
pnpm --filter @rosa/web exec playwright install chromium
```

Do not use `--with-deps` unless Chromium reports a missing Linux system library.

- [ ] **Step 4: Run all three projects**

```bash
pnpm --filter @rosa/web test:e2e -- f3a-public-pages.spec.ts
```

Expected: desktop, tablet, and mobile checks PASS.

- [ ] **Step 5: Add full-page screenshot assertions**

After layout stabilizes, add one screenshot per route:

```ts
await expect(page).toHaveScreenshot("homepage.png", { fullPage: true });
await expect(page).toHaveScreenshot("products-overview.png", { fullPage: true });
```

Because Playwright stores snapshots per project, this creates independent desktop, tablet, and mobile baselines.

- [ ] **Step 6: Commit browser evidence**

```bash
git add apps/web/playwright.config.ts apps/web/tests/e2e/f3a-public-pages.spec.ts apps/web/tests/e2e/f3a-public-pages.spec.ts-snapshots
git commit -m "test: verify F3A public pages across breakpoints"
```

---

### Task 9: Run the consolidated F3A gate and document completion

**Files:**
- Create: `docs/superpowers/completions/2026-08-01-rosa-medical-f3a-home-products.md`
- Modify: `README.md` on `main` after branch verification.

- [ ] **Step 1: Run the complete local gate once**

```bash
pnpm install --frozen-lockfile
pnpm contracts:generate
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm --filter @rosa/web test:foundation
node --test apps/web/src/test/public-page-styles.static.test.mjs
pnpm test:e2e
```

Expected:

- Install completes without ignored-build errors.
- Contract generation succeeds.
- Lint has 0 errors and 0 warnings.
- Typecheck passes for contracts and web.
- Unit/static suites pass.
- Next production build passes.
- Route smoke and F3A Playwright suites pass in desktop, tablet, and mobile projects.

If Ahmad postpones Playwright, record it as **not run**, never passed.

- [ ] **Step 2: Perform Figma fidelity review at 1440, 768, and 390 px**

Record evidence for section order, typography hierarchy, container alignment, vertical rhythm, grids, CTA hierarchy, header/footer continuity, placeholder stability, overflow, focus order, and claim safety. Hierarchy, business-meaning, interaction-clarity, or responsive-usability mismatches are blocking.

- [ ] **Step 3: Create the completion record with actual evidence**

```md
# Rosa Medical F3A Completion

- Branch: `frontend/f3a-home-products`
- Final commit: actual SHA
- Routes completed: `/`, `/products`
- Reusable components: actual component list
- Tests run: exact commands and results
- Tests not run: exact omissions and reason, or None
- Figma review: desktop, tablet, and mobile evidence
- Known limitations: neutral product media; remaining routes intentionally retain structural placeholders
- Contract changes: None
- Next milestone: F3B Family Listing and Product Detail
```

The committed file must contain actual values and no template markers.

- [ ] **Step 4: Update README coordination without touching the backend-owned section**

Record branch, commit, routes completed, reusable components, exact verification, omitted checks, unchanged contract, and F3B as next work.

- [ ] **Step 5: Commit and compare branch scope**

```bash
git add docs/superpowers/completions/2026-08-01-rosa-medical-f3a-home-products.md
git commit -m "docs: record F3A public page completion"
git diff --check frontend/f3a-home-products-design...frontend/f3a-home-products
git diff --stat frontend/f3a-home-products-design...frontend/f3a-home-products
git log --oneline frontend/f3a-home-products-design..frontend/f3a-home-products
```

Expected: no whitespace errors; scope is limited to F3A frontend files, tests, and completion documentation.

---

## F3A Acceptance Criteria

F3A is complete only when:

- `/` is a complete static Figma-led homepage.
- `/products` is a complete static Figma-led products overview.
- All other routes still resolve through existing structural placeholders.
- Five approved families appear in fixed order.
- Representative products use shared typed fixtures and show product codes.
- No commerce UI or unsupported trust/manufacturing claims appear.
- Shared cards and panels are reusable by F3B.
- No component fetches data directly.
- Desktop 1440, tablet 768, and mobile 390 layouts have no horizontal overflow.
- Each upgraded page has exactly one `<main>` and one `<h1>`.
- Keyboard focus is visible and follows visual order.
- Neutral media placeholders preserve stable aspect ratios.
- Lint, typecheck, unit/static tests, and production build pass.
- Playwright evidence is passed or explicitly recorded as postponed.
- Contract 0.1 remains unchanged.
- Completion documentation names F3B as the next milestone.

## Deferred Sequence After F3A

1. F3B — Family Listing and Product Detail
2. F3C — Inquiry Basket, Request Quotation, and Catalogues
3. F3D — About, Procurement Support, Contact, Search, Privacy, and Terms
4. F3E — Complete static admin experience
5. F4 — Mocked interactions and stateful flows
6. F5 onward — Live backend integration, visual refinement, Arabic/RTL, accessibility/performance hardening, and production deployment
