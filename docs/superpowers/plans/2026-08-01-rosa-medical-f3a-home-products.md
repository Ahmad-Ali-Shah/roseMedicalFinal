# Rosa Medical F3A Homepage and Products Overview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved Rosa Medical homepage and products-overview page as complete static, responsive, Figma-led compositions using typed fixtures, reusable catalogue components, neutral replaceable media, and no live backend dependency.

**Architecture:** The existing catch-all public route remains the route entry point, but `/` and `/products` delegate to feature entry components while every other route continues to use `RoutePlaceholder`. Homepage-only and products-only sections live in separate feature folders. Reusable family, product-preview, section-heading, media-placeholder, and procurement-panel components live in `features/public-catalogue`, consume validated presentation models, and never fetch data directly.

**Tech Stack:** Next.js 16.2.11 App Router, React 19.2, strict TypeScript 5.9, Tailwind CSS 4 plus existing CSS custom properties, Lora and Inter, pnpm 11.4.0, Vitest 3.2, React server rendering for component tests, Playwright 1.57 for responsive route checks.

## Global Constraints

- Read `README.md` at the start of execution and preserve the frontend/backend lane boundaries.
- Branch from `frontend/f3a-home-products-design`; implement on `frontend/f3a-home-products`.
- The public logo remains **ROSA** only; never append “Medical” to the logo lockup.
- Public positioning is medical instruments supplier and procurement partner.
- Primary families are Knives, Scissors, Punches, Chisels, and Cutters.
- The site is quotation-led, not ecommerce.
- Do not show prices, inventory, stock, checkout, payments, discounts, ratings, shipping, or orders.
- Do not publish unverified manufacturing, factory, certification, ownership, award, export, regulatory, legal, or clinical claims.
- Do not invent statistics, testimonials, customer logos, experience figures, or geographic reach.
- Use Rosa red `#E00815`, near-black `#191917`, white, warm off-white, and restrained steel/light greys through existing tokens.
- Use Lora for editorial headings and Inter for operational text.
- Product media remains neutral, replaceable placeholder media until verified client assets are supplied.
- Avoid generic medical gradients, blue healthcare styling, stock doctors, blobs, glassmorphism, excessive cards, excessive pills, and unnecessary rounded containers.
- English is implemented first; component structure and logical CSS must remain future RTL-compatible.
- No live API calls, MSW, inquiry state, search behavior, admin work, or Arabic activation belong in F3A.
- Preserve all existing routes and the existing public/admin shells.
- Use typed fixture data and frontend presentation selectors; components must not call `fetch`.
- Keep one `<main>` and one `<h1>` per upgraded route.
- Preserve visible keyboard focus, minimum practical 44 px targets, reduced-motion behavior, and zero horizontal overflow.
- Commit only meaningful, independently reviewable tasks.

---

## File Map

### Existing files to modify

- `apps/web/src/app/(public)/[[...segments]]/page.tsx` — dispatch `/` and `/products` to feature entry components while retaining placeholders for all other routes.
- `apps/web/src/app/globals.css` — import the F3A public-page stylesheet after existing foundations.
- `apps/web/src/styles/components.css` — only adjust shared primitive rules when a reusable component requirement cannot be expressed in the F3A stylesheet.
- `apps/web/src/test/design-foundations.static.test.mjs` — preserve Layer 1 regression coverage; add no page-specific assertions here.
- `apps/web/tests/e2e/route-smoke.spec.ts` — retain the 31-route landmark smoke suite.
- `README.md` on `main` after implementation — record F3A branch, commit, verification evidence, and unchanged Contract 0.1 status.

### New shared public-catalogue files

- `apps/web/src/features/public-catalogue/models.ts` — presentation types and validated route-safe slugs.
- `apps/web/src/features/public-catalogue/selectors.ts` — deterministic selectors over contract fixtures and safe static copy.
- `apps/web/src/features/public-catalogue/section-heading.tsx` — semantic heading block with optional eyebrow, copy, and action.
- `apps/web/src/features/public-catalogue/product-media-placeholder.tsx` — stable neutral media surface with accessible decorative/informative modes.
- `apps/web/src/features/public-catalogue/family-card.tsx` — complete linked family card.
- `apps/web/src/features/public-catalogue/product-preview-card.tsx` — linked product preview with code and family.
- `apps/web/src/features/public-catalogue/procurement-panel.tsx` — reusable CTA panel with one primary action and optional secondary link.
- `apps/web/src/features/public-catalogue/index.ts` — narrow public exports.

### New homepage files

- `apps/web/src/features/homepage/homepage.data.ts` — homepage-safe content model assembled from selectors and static approved copy.
- `apps/web/src/features/homepage/homepage.tsx` — homepage composition and page-level `<main>`.
- `apps/web/src/features/homepage/sections/home-hero.tsx`
- `apps/web/src/features/homepage/sections/family-discovery.tsx`
- `apps/web/src/features/homepage/sections/featured-instruments.tsx`
- `apps/web/src/features/homepage/sections/procurement-support.tsx`
- `apps/web/src/features/homepage/sections/catalogue-access.tsx`
- `apps/web/src/features/homepage/sections/quotation-cta.tsx`

### New products-overview files

- `apps/web/src/features/products/products.data.ts` — products-page-safe content model.
- `apps/web/src/features/products/products-overview.tsx` — products page composition and page-level `<main>`.
- `apps/web/src/features/products/sections/products-hero.tsx`
- `apps/web/src/features/products/sections/family-index.tsx`
- `apps/web/src/features/products/sections/discovery-toolbar-shell.tsx`
- `apps/web/src/features/products/sections/product-preview-grid.tsx`
- `apps/web/src/features/products/sections/products-procurement-cta.tsx`

### New styling and tests

- `apps/web/src/styles/public-pages.css` — all F3A page, section, card, placeholder, and responsive rules.
- `apps/web/src/test/public-catalogue-selectors.test.ts` — selector order, safe paths, and missing-data behavior.
- `apps/web/src/test/public-catalogue-components.test.tsx` — server-rendered semantic component tests.
- `apps/web/src/test/public-page-composition.test.tsx` — homepage/products hierarchy and prohibited-content tests.
- `apps/web/src/test/public-route-dispatch.test.ts` — route-dispatch behavior without browser execution.
- `apps/web/tests/e2e/f3a-public-pages.spec.ts` — desktop/mobile route, landmark, overflow, focus, and screenshot assertions.

---

### Task 1: Establish the isolated execution branch and lock the route-safe presentation interfaces

**Files:**
- Create: `apps/web/src/features/public-catalogue/models.ts`
- Create: `apps/web/src/test/public-catalogue-selectors.test.ts`

**Interfaces:**
- Consumes: `familyFixtures` from `@rosa/contracts`, `productFixtures` from `@rosa/contracts`, generated localized fixture fields.
- Produces:
  - `FAMILY_SLUGS`
  - `FamilySlug`
  - `FamilyCardModel`
  - `ProductPreviewModel`
  - `SectionActionModel`
  - `familyHref(slug: FamilySlug)`
  - `productHref(product: Pick<ProductPreviewModel, "familySlug" | "slug">)`

- [ ] **Step 1: Create the isolated implementation branch**

Run:

```bash
git fetch origin
git switch frontend/f3a-home-products-design
git pull --ff-only
git switch -c frontend/f3a-home-products
```

Expected: the new branch starts from the commit containing the approved F3A spec and this plan.

- [ ] **Step 2: Write the failing selector/model test**

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

- [ ] **Step 3: Run the focused test to verify red state**

Run:

```bash
pnpm --filter @rosa/web test -- public-catalogue-selectors.test.ts
```

Expected: FAIL because `@/features/public-catalogue/models` does not exist.

- [ ] **Step 4: Implement the route-safe presentation models**

Create `apps/web/src/features/public-catalogue/models.ts`:

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

export interface SectionActionModel<TPath extends string = string> {
  label: string;
  href: Route<TPath>;
}

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

export function productHref(product: Pick<ProductPreviewModel, "familySlug" | "slug">) {
  return `/products/${product.familySlug}/${product.slug}` as Route;
}
```

The single `Route` assertion is permitted only at this validated route-construction boundary. Components must consume these helpers instead of constructing arbitrary strings.

- [ ] **Step 5: Run the focused test to verify green state**

Run:

```bash
pnpm --filter @rosa/web test -- public-catalogue-selectors.test.ts
```

Expected: PASS with 2 tests.

- [ ] **Step 6: Commit the route-safe model boundary**

```bash
git add apps/web/src/features/public-catalogue/models.ts apps/web/src/test/public-catalogue-selectors.test.ts
git commit -m "feat: define public catalogue presentation models"
```

---

### Task 2: Build deterministic selectors from the shared fixtures

**Files:**
- Create: `apps/web/src/features/public-catalogue/selectors.ts`
- Modify: `apps/web/src/test/public-catalogue-selectors.test.ts`
- Create: `apps/web/src/features/public-catalogue/index.ts`

**Interfaces:**
- Consumes: `familyFixtures`, `productFixtures`, `FAMILY_SLUGS`, `FamilyCardModel`, `ProductPreviewModel`.
- Produces:
  - `selectFamilyCards(): readonly FamilyCardModel[]`
  - `selectFeaturedProducts(): readonly ProductPreviewModel[]`
  - `familyNameBySlug(slug: FamilySlug): string`

- [ ] **Step 1: Extend the failing test with fixture-order and validation cases**

Append to `public-catalogue-selectors.test.ts`:

```ts
import {
  familyNameBySlug,
  selectFamilyCards,
  selectFeaturedProducts
} from "@/features/public-catalogue/selectors";

it("maps all five shared families in the approved order", () => {
  expect(selectFamilyCards().map((family) => family.slug)).toEqual(FAMILY_SLUGS);
  expect(selectFamilyCards()).toHaveLength(5);
});

it("maps shared products with family names and codes", () => {
  expect(selectFeaturedProducts()).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        code: "18-0644",
        familyName: "Knives",
        familySlug: "knives"
      }),
      expect.objectContaining({
        code: "04-0402",
        familyName: "Scissors",
        familySlug: "scissors"
      })
    ])
  );
});

it("rejects an unknown family slug at the selector boundary", () => {
  expect(() => familyNameBySlug("unknown" as never)).toThrow(
    "Unknown Rosa family slug: unknown"
  );
});
```

- [ ] **Step 2: Run the focused test to verify red state**

Run:

```bash
pnpm --filter @rosa/web test -- public-catalogue-selectors.test.ts
```

Expected: FAIL because the selector module does not exist.

- [ ] **Step 3: Implement deterministic selectors**

Create `apps/web/src/features/public-catalogue/selectors.ts`:

```ts
import { familyFixtures, productFixtures } from "@rosa/contracts";
import {
  FAMILY_SLUGS,
  type FamilyCardModel,
  type FamilySlug,
  type ProductPreviewModel
} from "./models";

function isFamilySlug(value: string): value is FamilySlug {
  return FAMILY_SLUGS.includes(value as FamilySlug);
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

- [ ] **Step 4: Add narrow public exports**

Create `apps/web/src/features/public-catalogue/index.ts`:

```ts
export * from "./models";
export * from "./selectors";
```

Do not export page-specific content models from this barrel.

- [ ] **Step 5: Run selector tests and typecheck**

Run:

```bash
pnpm --filter @rosa/web test -- public-catalogue-selectors.test.ts
pnpm --filter @rosa/web typecheck
```

Expected: selector tests PASS; typecheck PASS. If typecheck exposes the pre-existing typed-route wrapper defect, correct that defect in its existing dedicated file before continuing and record the fix in this task’s commit.

- [ ] **Step 6: Commit fixture selectors**

```bash
git add apps/web/src/features/public-catalogue apps/web/src/test/public-catalogue-selectors.test.ts
git commit -m "feat: add deterministic public catalogue selectors"
```

---

### Task 3: Implement and test the reusable catalogue components

**Files:**
- Create: `apps/web/src/features/public-catalogue/section-heading.tsx`
- Create: `apps/web/src/features/public-catalogue/product-media-placeholder.tsx`
- Create: `apps/web/src/features/public-catalogue/family-card.tsx`
- Create: `apps/web/src/features/public-catalogue/product-preview-card.tsx`
- Create: `apps/web/src/features/public-catalogue/procurement-panel.tsx`
- Modify: `apps/web/src/features/public-catalogue/index.ts`
- Create: `apps/web/src/test/public-catalogue-components.test.tsx`

**Interfaces:**
- Consumes: Layer 1 `ButtonLink`, `Stack`, presentation models, route helpers.
- Produces:
  - `SectionHeading`
  - `ProductMediaPlaceholder`
  - `FamilyCard`
  - `ProductPreviewCard`
  - `ProcurementPanel`

- [ ] **Step 1: Write failing server-rendered semantic tests**

Create `apps/web/src/test/public-catalogue-components.test.tsx`:

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
  it("renders semantic section headings with caller-controlled level", () => {
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

- [ ] **Step 2: Run the focused test to verify red state**

Run:

```bash
pnpm --filter @rosa/web test -- public-catalogue-components.test.tsx
```

Expected: FAIL because the components are not exported.

- [ ] **Step 3: Implement `SectionHeading`**

Create `section-heading.tsx` with an explicit heading-level union:

```tsx
import type { ReactNode } from "react";
import { Stack } from "@/components/layout";

interface SectionHeadingProps {
  level: 2 | 3;
  eyebrow?: string;
  title: string;
  copy?: string;
  action?: ReactNode;
  align?: "start" | "center";
}

export function SectionHeading({
  level,
  eyebrow,
  title,
  copy,
  action,
  align = "start"
}: SectionHeadingProps) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <div className={`public-section-heading public-section-heading--${align}`}>
      <Stack gap="var(--space-3)">
        {eyebrow ? <p className="public-eyebrow">{eyebrow}</p> : null}
        <Heading>{title}</Heading>
        {copy ? <p className="public-section-heading__copy">{copy}</p> : null}
        {action ? <div className="public-section-heading__action">{action}</div> : null}
      </Stack>
    </div>
  );
}
```

- [ ] **Step 4: Implement media and linked cards**

Implement the components with these public signatures:

```tsx
export function ProductMediaPlaceholder(props: {
  label: string;
  decorative?: boolean;
  aspect?: "landscape" | "portrait" | "square";
}): JSX.Element;

export function FamilyCard(props: { family: FamilyCardModel }): JSX.Element;

export function ProductPreviewCard(props: {
  product: ProductPreviewModel;
}): JSX.Element;
```

Required markup rules:

- Family and product collections are list items supplied by the parent section; the card itself is an `<article>` with one `<Link>` target.
- `FamilyCard` uses `familyHref(family.slug)`.
- `ProductPreviewCard` uses `productHref(product)`.
- Product code renders in `<span className="product-code">` and remains selectable.
- The cards contain no nested buttons or links.
- Optional descriptions are omitted cleanly.
- Media placeholder uses `role="img" aria-label={label}` when informative and `aria-hidden="true"` when decorative.

- [ ] **Step 5: Implement `ProcurementPanel`**

Use this signature:

```tsx
import type { Route } from "next";

interface ProcurementPanelProps<TPrimary extends string, TSecondary extends string = string> {
  eyebrow?: string;
  title: string;
  copy: string;
  primary: { label: string; href: Route<TPrimary> };
  secondary?: { label: string; href: Route<TSecondary> };
  tone?: "paper" | "dark";
}
```

Render exactly one primary `ButtonLink`. Render the secondary action as a subordinate text link, not a second primary button.

- [ ] **Step 6: Export the components and run focused tests**

Update `index.ts`:

```ts
export * from "./family-card";
export * from "./models";
export * from "./procurement-panel";
export * from "./product-media-placeholder";
export * from "./product-preview-card";
export * from "./section-heading";
export * from "./selectors";
```

Run:

```bash
pnpm --filter @rosa/web test -- public-catalogue-components.test.tsx
pnpm --filter @rosa/web typecheck
```

Expected: component tests PASS; typecheck PASS.

- [ ] **Step 7: Commit reusable catalogue components**

```bash
git add apps/web/src/features/public-catalogue apps/web/src/test/public-catalogue-components.test.tsx
git commit -m "feat: add reusable public catalogue components"
```

---

### Task 4: Add the F3A page-level styling system and responsive primitives

**Files:**
- Create: `apps/web/src/styles/public-pages.css`
- Modify: `apps/web/src/app/globals.css`
- Create: `apps/web/src/test/public-page-styles.static.test.mjs`

**Interfaces:**
- Consumes: existing Layer 1 tokens, `.container`, `.section`, `.stack`, `.layout-grid`, `.button`, focus and reduced-motion rules.
- Produces: classes used by all F3A sections and shared catalogue components.

- [ ] **Step 1: Write failing static style invariants**

Create `apps/web/src/test/public-page-styles.static.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("F3A stylesheet defines public page, family, product and CTA systems", async () => {
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

- [ ] **Step 2: Run the static test to verify red state**

Run:

```bash
node --test apps/web/src/test/public-page-styles.static.test.mjs
```

Expected: FAIL because `public-pages.css` is missing and not imported.

- [ ] **Step 3: Create the stylesheet skeleton using existing tokens**

Create `public-pages.css` with explicit systems for:

```css
.public-page { min-width: 0; }
.public-hero { position: relative; overflow: clip; }
.public-hero__grid { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(20rem, .95fr); }
.public-eyebrow { font: var(--text-label); letter-spacing: .08em; text-transform: uppercase; }
.public-section-heading__copy { max-width: 42rem; color: var(--color-text-muted); }
.family-card,
.product-preview-card { min-width: 0; border: 1px solid var(--color-border); background: var(--color-paper); }
.product-media-placeholder { display: grid; place-items: center; overflow: hidden; background: var(--color-mist); }
.procurement-panel { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: end; }
.products-discovery-shell { border-block: 1px solid var(--color-border); }
```

Use only token-backed spacing, colors, type, and radii. Where a missing token is genuinely required, add one reusable token to `tokens.css` rather than hardcoding the same value repeatedly.

- [ ] **Step 4: Add robust responsive behavior**

At `max-width: 900px`:

- Collapse hero/editorial splits to one column.
- Change five-family editorial layouts into stable two-column grids.
- Keep CTA text and actions in one readable flow.

At `max-width: 640px`:

- Use a single-column hero and editorial splits.
- Use one family/product column unless tested minimum width permits two.
- Stack CTA actions.
- Reduce nonessential media height without changing aspect-ratio contracts.

Add:

```css
@media (prefers-reduced-motion: reduce) {
  .family-card,
  .product-preview-card,
  .product-media-placeholder__marker {
    transition: none;
    transform: none;
  }
}
```

Every interactive card must use `:focus-within` styling at least as visible as hover. Do not use hover-only disclosure.

- [ ] **Step 5: Import the stylesheet last**

Append to `apps/web/src/app/globals.css` after the existing foundation imports:

```css
@import "../styles/public-pages.css";
```

- [ ] **Step 6: Run style and foundation regression tests**

Run:

```bash
node --test apps/web/src/test/public-page-styles.static.test.mjs
pnpm --filter @rosa/web test:foundation
```

Expected: all style invariants PASS; all existing foundation tests PASS.

- [ ] **Step 7: Commit the F3A styling foundation**

```bash
git add apps/web/src/styles/public-pages.css apps/web/src/app/globals.css apps/web/src/test/public-page-styles.static.test.mjs
git commit -m "feat: add responsive public page styling system"
```

---

### Task 5: Compose the complete static homepage

**Files:**
- Create: `apps/web/src/features/homepage/homepage.data.ts`
- Create: `apps/web/src/features/homepage/homepage.tsx`
- Create: `apps/web/src/features/homepage/sections/home-hero.tsx`
- Create: `apps/web/src/features/homepage/sections/family-discovery.tsx`
- Create: `apps/web/src/features/homepage/sections/featured-instruments.tsx`
- Create: `apps/web/src/features/homepage/sections/procurement-support.tsx`
- Create: `apps/web/src/features/homepage/sections/catalogue-access.tsx`
- Create: `apps/web/src/features/homepage/sections/quotation-cta.tsx`
- Create: `apps/web/src/test/public-page-composition.test.tsx`

**Interfaces:**
- Consumes: `selectFamilyCards`, `selectFeaturedProducts`, shared public-catalogue components, Layer 1 layout primitives.
- Produces:
  - `HOME_PAGE_MODEL`
  - `Homepage`
  - six isolated homepage sections.

- [ ] **Step 1: Write failing homepage hierarchy and prohibited-content tests**

Create `public-page-composition.test.tsx`:

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Homepage } from "@/features/homepage/homepage";

describe("Rosa homepage composition", () => {
  it("renders one main, one h1 and all six approved homepage sections", () => {
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

  it("shows all five families and no prohibited commerce or trust claims", () => {
    const html = renderToStaticMarkup(<Homepage />);
    for (const family of ["Knives", "Scissors", "Punches", "Chisels", "Cutters"]) {
      expect(html).toContain(family);
    }
    expect(html).not.toMatch(/price|in stock|rating|checkout|certified|years of experience|trusted by/i);
  });
});
```

- [ ] **Step 2: Run the focused test to verify red state**

Run:

```bash
pnpm --filter @rosa/web test -- public-page-composition.test.tsx
```

Expected: FAIL because `Homepage` does not exist.

- [ ] **Step 3: Define the safe homepage content model**

Create `homepage.data.ts` with exact safe copy and deterministic data:

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

Do not add unsupported claims while adjusting line length to match Figma.

- [ ] **Step 4: Implement each homepage section as a focused component**

Required composition:

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

Section rules:

- `HomeHero`: `Section tone="warm"`, `Container size="wide"`, one `<h1>`, two actions, product-led placeholder composition.
- `FamilyDiscovery`: semantic `<ul>` containing five `<li>` family cards; no carousel.
- `FeaturedInstruments`: semantic product list; limit to fixture count; explicitly label as representative instruments rather than full catalogue.
- `ProcurementSupport`: editorial split with text and a restrained three-step textual sequence, not icon cards.
- `CatalogueAccess`: one catalogue navigation action; no fake PDF metadata.
- `QuotationCta`: dark or high-contrast section only if it matches the Figma hierarchy; one primary and one subordinate action.

- [ ] **Step 5: Run homepage tests and inspect static HTML**

Run:

```bash
pnpm --filter @rosa/web test -- public-page-composition.test.tsx
pnpm --filter @rosa/web typecheck
```

Expected: homepage tests PASS; typecheck PASS.

- [ ] **Step 6: Commit the homepage composition**

```bash
git add apps/web/src/features/homepage apps/web/src/test/public-page-composition.test.tsx
git commit -m "feat: compose Rosa public homepage"
```

---

### Task 6: Compose the complete static products overview

**Files:**
- Create: `apps/web/src/features/products/products.data.ts`
- Create: `apps/web/src/features/products/products-overview.tsx`
- Create: `apps/web/src/features/products/sections/products-hero.tsx`
- Create: `apps/web/src/features/products/sections/family-index.tsx`
- Create: `apps/web/src/features/products/sections/discovery-toolbar-shell.tsx`
- Create: `apps/web/src/features/products/sections/product-preview-grid.tsx`
- Create: `apps/web/src/features/products/sections/products-procurement-cta.tsx`
- Modify: `apps/web/src/test/public-page-composition.test.tsx`

**Interfaces:**
- Consumes: selectors, shared catalogue components, layout primitives.
- Produces: `PRODUCTS_PAGE_MODEL`, `ProductsOverview`, five isolated products sections.

- [ ] **Step 1: Extend the composition test with products-page red cases**

Append:

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

  it("does not present the static discovery shell as a working form", () => {
    const html = renderToStaticMarkup(<ProductsOverview />);
    expect(html).not.toContain("<form");
    expect(html).toContain("/search");
  });
});
```

- [ ] **Step 2: Run the focused test to verify red state**

Run:

```bash
pnpm --filter @rosa/web test -- public-page-composition.test.tsx
```

Expected: homepage cases PASS and products cases FAIL because `ProductsOverview` is missing.

- [ ] **Step 3: Define safe products-page content**

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

- [ ] **Step 4: Implement the products sections**

Required composition:

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

- Products hero is visually smaller than homepage hero.
- Family index displays all five families with deterministic order.
- Discovery shell is not a fake form. It is a clearly labelled static navigation panel linking to `/search`.
- Representative products are labelled as examples and cannot imply the complete catalogue contains only two products.
- Final CTA copy differs from homepage quotation CTA.

- [ ] **Step 5: Run products tests and typecheck**

Run:

```bash
pnpm --filter @rosa/web test -- public-page-composition.test.tsx
pnpm --filter @rosa/web typecheck
```

Expected: all public page composition tests PASS; typecheck PASS.

- [ ] **Step 6: Commit products overview**

```bash
git add apps/web/src/features/products apps/web/src/test/public-page-composition.test.tsx
git commit -m "feat: compose products overview page"
```

---

### Task 7: Integrate feature pages into the existing catch-all route without breaking other routes

**Files:**
- Create: `apps/web/src/features/public-routing/resolve-public-page.tsx`
- Modify: `apps/web/src/app/(public)/[[...segments]]/page.tsx`
- Create: `apps/web/src/test/public-route-dispatch.test.ts`

**Interfaces:**
- Consumes: `Homepage`, `ProductsOverview`, existing `RoutePlaceholder`.
- Produces: `resolvePublicPage(key: string, path: string): ReactNode`.

- [ ] **Step 1: Write the failing route-dispatch test**

Create `public-route-dispatch.test.ts`:

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

- [ ] **Step 2: Run the focused test to verify red state**

Run:

```bash
pnpm --filter @rosa/web test -- public-route-dispatch.test.ts
```

Expected: FAIL because the resolver does not exist.

- [ ] **Step 3: Implement explicit route-kind resolution**

Create `resolve-public-page.tsx`:

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
    case "homepage":
      return <Homepage />;
    case "products":
      return <ProductsOverview />;
    default:
      return <RoutePlaceholder eyebrow="Public route" title={args.title} path={args.path} />;
  }
}
```

- [ ] **Step 4: Reduce the route file to parameter parsing and delegation**

Modify `page.tsx`:

```tsx
import { resolvePublicPage } from "@/features/public-routing/resolve-public-page";

const routeTitles: Record<string, string> = {
  "": "Homepage",
  products: "Products overview",
  catalogues: "Technical catalogues",
  about: "About Rosa",
  "procurement-support": "Procurement support",
  contact: "Contact Rosa",
  search: "Search the catalogue",
  inquiry: "Instrument inquiry",
  "request-quotation": "Request a quotation",
  privacy: "Privacy Policy",
  terms: "Terms"
};

export default async function Page({ params }: { params: Promise<{ segments?: string[] }> }) {
  const { segments = [] } = await params;
  const key = segments.join("/");
  const path = `/${key}`;
  const title = routeTitles[key] ?? (segments.at(-1)?.replaceAll("-", " ") || "Homepage");
  return resolvePublicPage({ key, path, title });
}
```

- [ ] **Step 5: Run dispatch, route inventory, typecheck and build**

Run:

```bash
pnpm --filter @rosa/web test -- public-route-dispatch.test.ts route-inventory.test.ts
pnpm --filter @rosa/web typecheck
pnpm --filter @rosa/web build
```

Expected: dispatch and inventory tests PASS; typecheck PASS; production build PASS.

- [ ] **Step 6: Commit route integration**

```bash
git add apps/web/src/app apps/web/src/features/public-routing apps/web/src/test/public-route-dispatch.test.ts
git commit -m "feat: route homepage and products compositions"
```

---

### Task 8: Add responsive browser verification for the two upgraded routes

**Files:**
- Create: `apps/web/tests/e2e/f3a-public-pages.spec.ts`
- Modify: `apps/web/playwright.config.ts` only if a tablet project is added.

**Interfaces:**
- Consumes: running Next dev server, homepage and products routes.
- Produces: browser-level evidence for landmarks, overflow, keyboard focus, mobile hierarchy, and screenshots.

- [ ] **Step 1: Write the browser checks**

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
    const active = page.locator(":focus");
    await expect(active).toBeVisible();
  });
}

test("homepage exposes all five family links", async ({ page }) => {
  await page.goto("/");
  for (const slug of ["knives", "scissors", "punches", "chisels", "cutters"]) {
    await expect(page.locator(`a[href="/products/${slug}"]`)).toBeVisible();
  }
});

test("products discovery shell links to search without pretending to be a form", async ({ page }) => {
  await page.goto("/products");
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.locator('a[href="/search"]')).toBeVisible();
});
```

- [ ] **Step 2: Install Playwright Chromium when it is not present**

Run once per machine:

```bash
pnpm --filter @rosa/web exec playwright install chromium
```

Expected: Chromium is available under the Playwright cache. Do not use `--with-deps` unless the browser later reports a missing Linux system library.

- [ ] **Step 3: Run the F3A browser suite at desktop and mobile**

Run:

```bash
pnpm --filter @rosa/web test:e2e -- f3a-public-pages.spec.ts
```

Expected: all F3A browser checks PASS in the existing desktop and mobile projects.

- [ ] **Step 4: Add explicit tablet evidence**

Run the same suite with a one-off viewport before changing project configuration:

```bash
pnpm --filter @rosa/web exec playwright test f3a-public-pages.spec.ts --project=desktop --headed
```

During the visual review, set the browser viewport to 768 px using Playwright inspector or add a temporary local project. If repeatable tablet defects are found, permanently add:

```ts
{ name: "tablet", use: { viewport: { width: 768, height: 1024 } } }
```

Only commit the tablet project when it provides lasting regression value; do not add configuration solely for one screenshot.

- [ ] **Step 5: Capture comparison screenshots**

Add screenshot assertions after layout stabilizes:

```ts
await expect(page).toHaveScreenshot("homepage.png", { fullPage: true });
await expect(page).toHaveScreenshot("products-overview.png", { fullPage: true });
```

Store snapshots under Playwright’s generated snapshot directory. Review differences against the approved Figma desktop and mobile frames before accepting them.

- [ ] **Step 6: Commit browser verification**

```bash
git add apps/web/tests/e2e/f3a-public-pages.spec.ts apps/web/tests/e2e/f3a-public-pages.spec.ts-snapshots apps/web/playwright.config.ts
git commit -m "test: verify F3A public pages across breakpoints"
```

If no Playwright config or snapshot files changed, omit them from `git add`.

---

### Task 9: Perform the consolidated F3A quality gate and document completion

**Files:**
- Modify: `README.md` on `main` after implementation branch verification.
- Create: `docs/superpowers/completions/2026-08-01-rosa-medical-f3a-home-products.md`

**Interfaces:**
- Consumes: all preceding tasks.
- Produces: one verified F3A milestone commit, completion record, and an explicit handoff into F3B.

- [ ] **Step 1: Run the full local quality gate once**

Run from repository root:

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
- Route smoke and F3A Playwright suites pass at desktop/mobile.

If Playwright remains intentionally postponed by Ahmad, record it as **not run**, not passed. Do not claim browser verification without evidence.

- [ ] **Step 2: Perform a manual Figma fidelity review**

Review `/` and `/products` at 1440, 768, and 390 px against the approved Figma frames. Record the result for each category:

- Section order
- Headline hierarchy
- Container width and alignment
- Vertical rhythm
- Family and product grid behavior
- CTA hierarchy
- Header/footer continuity
- Placeholder-media stability
- No horizontal overflow
- Focus and keyboard order
- No unsupported claims or commerce language

Any mismatch that changes hierarchy, business meaning, interaction clarity, or responsive usability is blocking. Minor one-pixel anti-aliasing differences are not blocking.

- [ ] **Step 3: Create the completion record**

Create `docs/superpowers/completions/2026-08-01-rosa-medical-f3a-home-products.md` with:

```md
# Rosa Medical F3A Completion

- Branch: `frontend/f3a-home-products`
- Final commit: `<actual final commit SHA>`
- Routes completed: `/`, `/products`
- Reusable components: `<actual component list>`
- Tests run: `<exact commands and results>`
- Tests not run: `<exact omitted commands and reason, or None>`
- Figma review: `<desktop/tablet/mobile evidence>`
- Known limitations: neutral product media; remaining routes intentionally retain structural placeholders
- Contract changes: None
- Next milestone: F3B Family Listing and Product Detail
```

Replace every angle-bracket field with actual evidence before committing. The completion file must contain no placeholders.

- [ ] **Step 4: Update the shared README coordination channel**

On `main`, update the frontend lane and append a dated message containing:

- Branch and final commit
- Homepage/products completion
- Reusable components added
- Exact verification results
- Contract unchanged
- Remaining blocker or omitted tests
- Next phase F3B

Do not alter the backend AI’s owned section.

- [ ] **Step 5: Commit the completion record**

On the implementation branch:

```bash
git add docs/superpowers/completions/2026-08-01-rosa-medical-f3a-home-products.md
git commit -m "docs: record F3A public page completion"
```

Commit the README coordination update separately on `main` with:

```bash
git commit -m "docs: record F3A frontend progress"
```

- [ ] **Step 6: Compare the implementation branch against its design base**

Run:

```bash
git diff --check frontend/f3a-home-products-design...frontend/f3a-home-products
git diff --stat frontend/f3a-home-products-design...frontend/f3a-home-products
git log --oneline frontend/f3a-home-products-design..frontend/f3a-home-products
```

Expected: no whitespace errors; changes are limited to F3A frontend files, tests, and completion documentation; commits correspond to the task boundaries above.

---

## F3A Acceptance Criteria

F3A is complete only when all applicable conditions are true:

- `/` is a complete static Figma-led homepage.
- `/products` is a complete static Figma-led products overview.
- All other routes still resolve through their prior structural placeholders.
- The five approved families appear in the fixed sequence.
- Representative products use shared typed fixtures and display product codes.
- No commerce UI or unsupported trust/manufacturing claims appear.
- Shared cards and panels are reusable by F3B.
- No component fetches data directly.
- Desktop 1440, tablet 768, and mobile 390 layouts have no horizontal overflow.
- Each upgraded page has exactly one `<main>` and one `<h1>`.
- Keyboard focus is visible and follows the visual order.
- Neutral media placeholders preserve stable aspect ratios.
- Lint, typecheck, unit/static tests, and production build pass.
- Playwright evidence is either passed or explicitly recorded as postponed; it is never silently assumed.
- Contract 0.1 remains unchanged.
- Completion documentation names F3B as the next milestone.

## Deferred Work After F3A

The following remains explicitly scheduled and must not be forgotten:

1. F3B — Family Listing and Product Detail
2. F3C — Inquiry Basket, Request Quotation, and Catalogues
3. F3D — About, Procurement Support, Contact, Search, Privacy, and Terms
4. F3E — Complete static admin experience
5. F4 — Mocked interactions and stateful flows
6. F5 onward — Live backend integration, visual refinement, Arabic/RTL, accessibility/performance hardening, and production deployment
