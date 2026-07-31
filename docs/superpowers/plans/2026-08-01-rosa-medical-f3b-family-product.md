# Rosa Medical F3B Family Listing and Product Detail Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement complete static family-listing and product-detail compositions for all five Rosa instrument families using catalogue-derived frontend records, deterministic route resolution, honest read-only controls, responsive Figma-led layouts, and strict not-found behavior.

**Architecture:** F3B adds a frontend-owned catalogue registry under `features/catalogue-registry` without changing OpenAPI 0.1. Every family and product route resolves through this registry before composition. Shared family-listing and product-detail components remain stateless server components; search, filters, quantity, gallery selection, and inquiry mutation are presented as labelled read-only or disabled states until F4.

**Tech Stack:** Next.js 16.2.11 App Router, React 19.2, strict TypeScript 5.9, Tailwind CSS 4 plus the existing Rosa CSS token system, Vitest 3.2, Node built-in static tests, Playwright 1.57, Lora and Inter.

## Global Constraints

- Read the latest root `README.md` from `main` before execution.
- Branch from `frontend/f3b-family-product-design`; implement on `frontend/f3b-family-product`.
- Preserve `/` and `/products` from F3A.
- Upgrade all five family routes and every registered product-detail route.
- The public shell remains the only owner of `<main id="main-content">`.
- Each upgraded route contains exactly one `<h1>`.
- The public logo remains **ROSA** only.
- The site remains quotation-led, never ecommerce.
- Never render prices, stock, inventory, checkout, payments, discounts, ratings, shipping, or orders.
- Never add unverified manufacturing, factory, certification, regulatory, ownership, award, export, legal, or clinical claims.
- Use neutral replaceable product media only.
- Use catalogue terminology, codes, stated sizes, directions, variants, and page references only where supported.
- Keep detailed F3B records frontend-owned; do not change OpenAPI schemas or operation IDs.
- Search, sort, filters, quantity, gallery switching, notes, and inquiry mutation remain nonfunctional in F3B.
- Read-only controls must be labelled and must not submit, navigate, mutate URL state, or imply success.
- Disabled inquiry controls must explain that interaction activates in F4.
- Unknown family slugs, unknown product slugs, family/product mismatches, and unsupported route depths use `notFound()`.
- All registered products remain visible; do not add fake pagination or truncate mobile results.
- Family support navigates to `/contact`.
- Family catalogue navigation goes to `/catalogues`; it must not pretend to directly download a PDF.
- Preserve active-link focus visibility, 44 px practical targets, reduced-motion behavior, and zero horizontal overflow at 1440, 768, and 390 px.
- Commit meaningful, independently reviewable tasks only.

---

## File Map

### Existing files to modify

- `apps/web/src/app/(public)/[[...segments]]/page.tsx` — delegate valid F3B routes and call `notFound()` for invalid catalogue paths.
- `apps/web/src/features/public-routing/resolve-public-page.tsx` — resolve overview, family, product, placeholder, and not-found kinds.
- `apps/web/src/features/public-catalogue/models.ts` — reuse route-safe family/product route helpers; add no raw string construction in page components.
- `apps/web/src/features/public-catalogue/product-preview-card.tsx` — add an optional F3B card mode without nesting interactive elements.
- `apps/web/src/styles/public-pages.css` — append F3B family/detail styles and breakpoint rules.
- `apps/web/src/test/public-route-dispatch.test.ts` — expand route-kind coverage.
- `apps/web/tests/e2e/route-smoke.spec.ts` — preserve existing route smoke expectations.
- `apps/web/tests/e2e/f3a-public-pages.spec.ts` — retain F3A regression coverage.
- `README.md` on `main` after verification — record exact F3B evidence without editing the backend-owned section.

### New catalogue registry files

- `apps/web/src/features/catalogue-registry/types.ts`
- `apps/web/src/features/catalogue-registry/families.ts`
- `apps/web/src/features/catalogue-registry/products/knives.ts`
- `apps/web/src/features/catalogue-registry/products/scissors.ts`
- `apps/web/src/features/catalogue-registry/products/punches.ts`
- `apps/web/src/features/catalogue-registry/products/chisels.ts`
- `apps/web/src/features/catalogue-registry/products/cutters.ts`
- `apps/web/src/features/catalogue-registry/products/index.ts`
- `apps/web/src/features/catalogue-registry/registry.ts`
- `apps/web/src/features/catalogue-registry/index.ts`

### New family-listing files

- `apps/web/src/features/family-listing/family-listing-page.tsx`
- `apps/web/src/features/family-listing/family-listing.data.ts`
- `apps/web/src/features/family-listing/family-hero.tsx`
- `apps/web/src/features/family-listing/family-discovery-shell.tsx`
- `apps/web/src/features/family-listing/family-filter-preview.tsx`
- `apps/web/src/features/family-listing/family-product-grid.tsx`
- `apps/web/src/features/family-listing/family-loading-state.tsx`
- `apps/web/src/features/family-listing/family-no-results-state.tsx`
- `apps/web/src/features/family-listing/family-support-panel.tsx`
- `apps/web/src/features/family-listing/mobile-filter-sheet-preview.tsx`

### New product-detail files

- `apps/web/src/features/product-detail/product-detail-page.tsx`
- `apps/web/src/features/product-detail/product-detail.data.ts`
- `apps/web/src/features/product-detail/product-breadcrumbs.tsx`
- `apps/web/src/features/product-detail/product-gallery.tsx`
- `apps/web/src/features/product-detail/product-procurement-summary.tsx`
- `apps/web/src/features/product-detail/static-option-field.tsx`
- `apps/web/src/features/product-detail/static-quantity-field.tsx`
- `apps/web/src/features/product-detail/product-specification-table.tsx`
- `apps/web/src/features/product-detail/product-procurement-note.tsx`
- `apps/web/src/features/product-detail/related-product-grid.tsx`
- `apps/web/src/features/product-detail/mobile-inquiry-bar.tsx`
- `apps/web/src/features/product-detail/added-feedback-preview.tsx`

### New tests and completion record

- `apps/web/src/test/catalogue-registry.test.ts`
- `apps/web/src/test/family-listing-components.test.tsx`
- `apps/web/src/test/product-detail-components.test.tsx`
- `apps/web/src/test/f3b-page-composition.test.tsx`
- `apps/web/src/test/f3b-styles.static.test.mjs`
- `apps/web/tests/e2e/f3b-catalogue-pages.spec.ts`
- `docs/superpowers/completions/2026-08-01-rosa-medical-f3b-family-product.md`

---

### Task 1: Create the isolated implementation branch and lock catalogue record types

**Files:**
- Create: `apps/web/src/features/catalogue-registry/types.ts`
- Create: `apps/web/src/test/catalogue-registry.test.ts`

**Interfaces:**
- Consumes: `FamilySlug` from `@/features/public-catalogue`.
- Produces: `CatalogueFamilyRecord`, `CatalogueProductRecord`, `CatalogueOption`, `CatalogueReference`, and `CatalogueRouteResult`.

- [ ] **Step 1: Create the implementation branch**

```bash
git fetch origin
git switch frontend/f3b-family-product-design
git pull --ff-only
git switch -c frontend/f3b-family-product
```

Expected: branch starts at the approved F3B specification and plan.

- [ ] **Step 2: Write the failing type-surface test**

Create `apps/web/src/test/catalogue-registry.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import type {
  CatalogueFamilyRecord,
  CatalogueProductRecord
} from "@/features/catalogue-registry/types";

it("accepts explicit catalogue-derived family and product records", () => {
  const family: CatalogueFamilyRecord = {
    slug: "knives",
    sequence: "01",
    name: "Knives",
    introduction: "Precision cutting instruments presented with clear product codes.",
    catalogueLabel: "Knives catalogue"
  };

  const product: CatalogueProductRecord = {
    id: "product_scalpel_handle_3",
    familySlug: "knives",
    slug: "scalpel-handle-no-3",
    name: "Scalpel Handle No. 3",
    code: "18-0644",
    description: "Reusable instrument handle presented for quotation review.",
    sizes: ["14.5 cm"],
    variants: ["Standard"],
    directions: [],
    primaryOption: "14.5 cm",
    catalogueReference: { family: "Knives", page: "6" },
    mediaLabel: "Scalpel Handle No. 3 placeholder"
  };

  expect(family.slug).toBe(product.familySlug);
});
```

- [ ] **Step 3: Verify red state**

```bash
pnpm --filter @rosa/web test -- catalogue-registry.test.ts
```

Expected: FAIL because `catalogue-registry/types.ts` does not exist.

- [ ] **Step 4: Implement the types**

Create `types.ts`:

```ts
import type { FamilySlug } from "@/features/public-catalogue";

export interface CatalogueReference {
  family: string;
  page?: string;
}

export interface CatalogueFamilyRecord {
  slug: FamilySlug;
  sequence: "01" | "02" | "03" | "04" | "05";
  name: string;
  introduction: string;
  catalogueLabel: string;
}

export interface CatalogueProductRecord {
  id: string;
  familySlug: FamilySlug;
  slug: string;
  name: string;
  code: string;
  description?: string;
  sizes: readonly string[];
  variants: readonly string[];
  directions: readonly string[];
  primaryOption?: string;
  catalogueReference: CatalogueReference;
  mediaLabel: string;
}

export type CatalogueRouteResult =
  | { kind: "family"; family: CatalogueFamilyRecord; products: readonly CatalogueProductRecord[] }
  | { kind: "product"; family: CatalogueFamilyRecord; product: CatalogueProductRecord; related: readonly CatalogueProductRecord[] }
  | { kind: "not-found" };
```

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- catalogue-registry.test.ts
git add apps/web/src/features/catalogue-registry/types.ts apps/web/src/test/catalogue-registry.test.ts
git commit -m "feat: define F3B catalogue record types"
```

Expected: focused test PASS.

---

### Task 2: Add the five catalogue-derived family records and twenty product records

**Files:**
- Create: `apps/web/src/features/catalogue-registry/families.ts`
- Create: all five files under `apps/web/src/features/catalogue-registry/products/`
- Create: `apps/web/src/features/catalogue-registry/products/index.ts`
- Modify: `apps/web/src/test/catalogue-registry.test.ts`

**Interfaces:**
- Produces: `CATALOGUE_FAMILIES` and `CATALOGUE_PRODUCTS`.
- Every product record satisfies `CatalogueProductRecord`.

- [ ] **Step 1: Add failing source-integrity assertions**

Append to `catalogue-registry.test.ts`:

```ts
import {
  CATALOGUE_FAMILIES,
  CATALOGUE_PRODUCTS
} from "@/features/catalogue-registry";

it("registers five families and four products per family", () => {
  expect(CATALOGUE_FAMILIES).toHaveLength(5);
  for (const family of CATALOGUE_FAMILIES) {
    expect(CATALOGUE_PRODUCTS.filter((product) => product.familySlug === family.slug)).toHaveLength(4);
  }
});

it("keeps IDs, family-local slugs and codes complete", () => {
  expect(new Set(CATALOGUE_PRODUCTS.map((product) => product.id)).size).toBe(20);
  expect(CATALOGUE_PRODUCTS.every((product) => product.code.trim().length > 0)).toBe(true);

  for (const family of CATALOGUE_FAMILIES) {
    const slugs = CATALOGUE_PRODUCTS
      .filter((product) => product.familySlug === family.slug)
      .map((product) => product.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  }
});
```

- [ ] **Step 2: Verify red state**

```bash
pnpm --filter @rosa/web test -- catalogue-registry.test.ts
```

Expected: FAIL because the registry exports do not exist.

- [ ] **Step 3: Create exact family records**

Create `families.ts` with this order and copy:

```ts
import type { CatalogueFamilyRecord } from "./types";

export const CATALOGUE_FAMILIES = [
  { slug: "knives", sequence: "01", name: "Knives", introduction: "Precision cutting instruments presented with clear product codes, stated sizes and available variants for quotation preparation.", catalogueLabel: "Knives catalogue" },
  { slug: "scissors", sequence: "02", name: "Scissors", introduction: "Surgical scissors organised by product code, length, direction and listed construction variant.", catalogueLabel: "Scissors catalogue" },
  { slug: "punches", sequence: "03", name: "Punches", introduction: "Punch instruments organised by jaw pattern, shaft length and catalogue reference for procurement review.", catalogueLabel: "Punches catalogue" },
  { slug: "chisels", sequence: "04", name: "Chisels", introduction: "Chisels and osteotomes organised by pattern, width, length and listed direction.", catalogueLabel: "Chisels catalogue" },
  { slug: "cutters", sequence: "05", name: "Cutters", introduction: "Cutting instruments organised by named pattern, length and listed jaw direction or profile.", catalogueLabel: "Cutters catalogue" }
] as const satisfies readonly CatalogueFamilyRecord[];
```

- [ ] **Step 4: Create the exact twenty product records**

Use these records. Do not add unlisted compatibility, material, finish, sterility, clinical-use, certification, or performance text.

| Family | Name | Code | Listed information | Catalogue reference |
|---|---|---|---|---|
| Knives | Scalpel Handle No. 3 | `18-0644` | `14.5 cm`; Standard | Knives, page 6 |
| Knives | Bard Parker Handle | `18-0650` | `14.5 cm`; Standard | Knives |
| Knives | Amputation Knife | `18-1202` | `14.5 cm`; Standard | Knives |
| Knives | Resection Knife | `18-1404` | `14.5 cm`; Standard | Knives |
| Scissors | Mayo Scissors | `04-0402` | `17 cm`; Straight; Regular | Scissors, page 2 |
| Scissors | Iris Scissors | `04-0901` | `10.5 cm`; Straight; Sharp; Regular | Scissors, page 1 |
| Scissors | Sims Scissors | `04-0701` | `20 cm`; Straight; Regular | Scissors, page 4 |
| Scissors | Pottsmith Scissors | `04-3701` | `25° angled`; Regular | Scissors, page 10 |
| Punches | Yeoman Punch | `21-1001` | `28.0 cm`; Standard jaw | Punches, page 1 |
| Punches | Yeoman Punch, Perforated | `21-1101` | `28.0 cm`; Perforated jaw | Punches, page 1 |
| Punches | Rectangular Yeoman Punch | `21-1201` | `28.0 cm`; Rectangular jaw | Punches, page 1 |
| Punches | Biopsy Punch | `23-1204` | `4 mm` | Punches |
| Chisels | Codman Chisel | `36-7101` | `28 cm`; Straight | Chisels, page 5 |
| Chisels | Lambotte Chisel | `36-7201` | `25.0 cm`; `4 mm`; Straight | Chisels, page 5 |
| Chisels | Mini Lambotte Chisel | `36-7214` | `12.5 cm`; `2 mm`; Straight | Chisels, page 6 |
| Chisels | Farabeuf Chisel | `37-0701` | `15.0 cm`; Straight | Chisels, page 10 |
| Cutters | Liston Cutter | `36-5101` | `14.0 cm`; Straight | Cutters, page 1 |
| Cutters | Cleveland Cutter | `36-5401` | `15.0 cm` | Cutters, page 1 |
| Cutters | Bohler Cutter | `36-5501` | `15.0 cm`; Straight | Cutters, page 1 |
| Cutters | SC-01T Cutter | `SC-01T` | `12.5 cm`; Fine point; Straight | Cutters, page 10 |

Create one module per family. Example `products/scissors.ts`:

```ts
import type { CatalogueProductRecord } from "../types";

export const SCISSOR_PRODUCTS = [
  {
    id: "product_mayo_scissors",
    familySlug: "scissors",
    slug: "mayo-scissors",
    name: "Mayo Scissors",
    code: "04-0402",
    description: "Mayo Scissors presented with the listed length and direction for quotation review.",
    sizes: ["17 cm"],
    variants: ["Regular"],
    directions: ["Straight"],
    primaryOption: "17 cm",
    catalogueReference: { family: "Scissors", page: "2" },
    mediaLabel: "Mayo Scissors placeholder"
  },
  {
    id: "product_iris_scissors",
    familySlug: "scissors",
    slug: "iris-scissors",
    name: "Iris Scissors",
    code: "04-0901",
    description: "Iris Scissors presented with the listed length, direction and point information.",
    sizes: ["10.5 cm"],
    variants: ["Regular", "Sharp"],
    directions: ["Straight"],
    primaryOption: "10.5 cm",
    catalogueReference: { family: "Scissors", page: "1" },
    mediaLabel: "Iris Scissors placeholder"
  },
  {
    id: "product_sims_scissors",
    familySlug: "scissors",
    slug: "sims-scissors",
    name: "Sims Scissors",
    code: "04-0701",
    description: "Sims Scissors presented with the listed length and direction.",
    sizes: ["20 cm"],
    variants: ["Regular"],
    directions: ["Straight"],
    primaryOption: "20 cm",
    catalogueReference: { family: "Scissors", page: "4" },
    mediaLabel: "Sims Scissors placeholder"
  },
  {
    id: "product_pottsmith_scissors",
    familySlug: "scissors",
    slug: "pottsmith-scissors",
    name: "Pottsmith Scissors",
    code: "04-3701",
    description: "Pottsmith Scissors presented with the listed angle.",
    sizes: [],
    variants: ["Regular"],
    directions: ["25° angled"],
    primaryOption: "25° angled",
    catalogueReference: { family: "Scissors", page: "10" },
    mediaLabel: "Pottsmith Scissors placeholder"
  }
] as const satisfies readonly CatalogueProductRecord[];
```

Follow the same field rules for the other four modules using the table exactly.

- [ ] **Step 5: Aggregate and export records**

Create `products/index.ts`:

```ts
import { KNIFE_PRODUCTS } from "./knives";
import { SCISSOR_PRODUCTS } from "./scissors";
import { PUNCH_PRODUCTS } from "./punches";
import { CHISEL_PRODUCTS } from "./chisels";
import { CUTTER_PRODUCTS } from "./cutters";

export const CATALOGUE_PRODUCTS = [
  ...KNIFE_PRODUCTS,
  ...SCISSOR_PRODUCTS,
  ...PUNCH_PRODUCTS,
  ...CHISEL_PRODUCTS,
  ...CUTTER_PRODUCTS
] as const;
```

- [ ] **Step 6: Verify and commit**

```bash
pnpm --filter @rosa/web test -- catalogue-registry.test.ts
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/catalogue-registry apps/web/src/test/catalogue-registry.test.ts
git commit -m "feat: add catalogue-derived F3B product records"
```

Expected: registry tests and typecheck PASS.

---

### Task 3: Implement deterministic family, product, related-product, and route resolution

**Files:**
- Create: `apps/web/src/features/catalogue-registry/registry.ts`
- Create: `apps/web/src/features/catalogue-registry/index.ts`
- Modify: `apps/web/src/test/catalogue-registry.test.ts`

**Interfaces:**
- Produces:
  - `isKnownFamilySlug(value: string): value is FamilySlug`
  - `getFamilyListingModel(familySlug: string): CatalogueRouteResult`
  - `getProductDetailModel(familySlug: string, productSlug: string): CatalogueRouteResult`
  - `getRelatedProducts(productId: string, limit: number): readonly CatalogueProductRecord[]`
  - `resolveCataloguePath(segments: readonly string[]): CatalogueRouteResult`

- [ ] **Step 1: Add failing resolution tests**

Append:

```ts
import {
  getFamilyListingModel,
  getProductDetailModel,
  resolveCataloguePath
} from "@/features/catalogue-registry";

it("resolves all five family routes", () => {
  for (const slug of ["knives", "scissors", "punches", "chisels", "cutters"]) {
    expect(getFamilyListingModel(slug).kind).toBe("family");
  }
});

it("resolves known products and rejects mismatches", () => {
  expect(getProductDetailModel("knives", "scalpel-handle-no-3").kind).toBe("product");
  expect(getProductDetailModel("scissors", "scalpel-handle-no-3").kind).toBe("not-found");
  expect(getProductDetailModel("knives", "missing-product").kind).toBe("not-found");
});

it("rejects unsupported catalogue path depths", () => {
  expect(resolveCataloguePath(["products", "knives"]).kind).toBe("family");
  expect(resolveCataloguePath(["products", "knives", "scalpel-handle-no-3"]).kind).toBe("product");
  expect(resolveCataloguePath(["products", "knives", "scalpel-handle-no-3", "extra"]).kind).toBe("not-found");
});
```

- [ ] **Step 2: Verify red state**

```bash
pnpm --filter @rosa/web test -- catalogue-registry.test.ts
```

Expected: FAIL because resolver functions are missing.

- [ ] **Step 3: Implement the registry with validation**

`registry.ts` must validate once at module construction:

```ts
const familyBySlug = new Map(CATALOGUE_FAMILIES.map((family) => [family.slug, family]));
const productsByFamily = new Map(
  CATALOGUE_FAMILIES.map((family) => [
    family.slug,
    CATALOGUE_PRODUCTS.filter((product) => product.familySlug === family.slug)
  ])
);

function assertRegistryIntegrity(): void {
  const ids = new Set<string>();
  const routeKeys = new Set<string>();

  for (const product of CATALOGUE_PRODUCTS) {
    if (!familyBySlug.has(product.familySlug)) throw new Error(`Unknown catalogue family: ${product.familySlug}`);
    if (!product.name.trim()) throw new Error(`Missing product name: ${product.id}`);
    if (!product.code.trim()) throw new Error(`Missing product code: ${product.id}`);
    if (ids.has(product.id)) throw new Error(`Duplicate product id: ${product.id}`);
    ids.add(product.id);

    const routeKey = `${product.familySlug}/${product.slug}`;
    if (routeKeys.has(routeKey)) throw new Error(`Duplicate product route: ${routeKey}`);
    routeKeys.add(routeKey);
  }
}

assertRegistryIntegrity();
```

`getRelatedProducts` filters by the same family, excludes the current product, preserves registry order, and slices to `limit`.

- [ ] **Step 4: Export the registry**

Create `index.ts`:

```ts
export * from "./types";
export * from "./families";
export * from "./products";
export * from "./registry";
```

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- catalogue-registry.test.ts
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/catalogue-registry apps/web/src/test/catalogue-registry.test.ts
git commit -m "feat: add deterministic catalogue route registry"
```

Expected: all registry tests and typecheck PASS.

---

### Task 4: Build honest static controls and preview states

**Files:**
- Create: `apps/web/src/features/product-detail/static-option-field.tsx`
- Create: `apps/web/src/features/product-detail/static-quantity-field.tsx`
- Create: `apps/web/src/features/product-detail/added-feedback-preview.tsx`
- Create: `apps/web/src/features/family-listing/family-filter-preview.tsx`
- Create: `apps/web/src/features/family-listing/mobile-filter-sheet-preview.tsx`
- Create: `apps/web/src/features/family-listing/family-loading-state.tsx`
- Create: `apps/web/src/features/family-listing/family-no-results-state.tsx`
- Create: `apps/web/src/test/family-listing-components.test.tsx`
- Create: `apps/web/src/test/product-detail-components.test.tsx`

**Interfaces:**
- Produces labelled, noninteractive fields and state previews reusable in F4.

- [ ] **Step 1: Write failing semantic tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { StaticOptionField } from "@/features/product-detail/static-option-field";
import { StaticQuantityField } from "@/features/product-detail/static-quantity-field";
import { FamilyFilterPreview } from "@/features/family-listing/family-filter-preview";

it("renders labelled read-only fields without a functioning form", () => {
  const html = renderToStaticMarkup(
    <>
      <StaticOptionField label="Size" value="14.5 cm" />
      <StaticQuantityField value={1} />
      <FamilyFilterPreview />
    </>
  );
  expect(html).not.toContain("<form");
  expect(html).toContain('aria-readonly="true"');
  expect(html).toContain('aria-disabled="true"');
});
```

- [ ] **Step 2: Verify red state**

```bash
pnpm --filter @rosa/web test -- family-listing-components.test.tsx product-detail-components.test.tsx
```

Expected: FAIL because components do not exist.

- [ ] **Step 3: Implement exact behavior**

Rules:

- `StaticOptionField` renders a labelled `div role="group" aria-readonly="true"`; it is not a `<select>`.
- `StaticQuantityField` renders minus/value/plus presentation with both controls as `<button disabled aria-label="... activates in the interaction phase">`.
- `FamilyFilterPreview` renders Size, Direction, Variant, and Catalogue section labels with read-only values.
- `MobileFilterSheetPreview` is a standalone `<aside aria-label="Filter preview">`; it is not mounted as an open dialog on default routes.
- `FamilyLoadingState` uses `aria-label="Catalogue loading-state preview"` and no animation when reduced motion is requested.
- `FamilyNoResultsState` includes a disabled Clear filters button.
- `AddedFeedbackPreview` is exported for tests/F4 reuse but is not mounted on the default product route.

- [ ] **Step 4: Verify and commit**

```bash
pnpm --filter @rosa/web test -- family-listing-components.test.tsx product-detail-components.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/family-listing apps/web/src/features/product-detail apps/web/src/test
git commit -m "feat: add honest static catalogue control states"
```

Expected: focused component tests and typecheck PASS.

---

### Task 5: Compose the shared family-listing template for all five families

**Files:**
- Create all family-listing files listed in the file map.
- Modify: `apps/web/src/features/public-catalogue/product-preview-card.tsx`
- Create: `apps/web/src/test/f3b-page-composition.test.tsx`

**Interfaces:**
- Consumes: family route results from `getFamilyListingModel`.
- Produces: `FamilyListingPage({ familySlug }: { familySlug: string })`.

- [ ] **Step 1: Write failing family composition tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FamilyListingPage } from "@/features/family-listing/family-listing-page";

it.each(["knives", "scissors", "punches", "chisels", "cutters"])(
  "renders the %s family with one h1 and four products",
  (familySlug) => {
    const html = renderToStaticMarkup(<FamilyListingPage familySlug={familySlug} />);
    expect((html.match(/<h1/g) || [])).toHaveLength(1);
    expect((html.match(/data-product-card=/g) || [])).toHaveLength(4);
    expect(html).not.toContain("<form");
    expect(html).not.toMatch(/price|in stock|checkout|rating|certified/i);
  }
);
```

- [ ] **Step 2: Verify red state**

```bash
pnpm --filter @rosa/web test -- f3b-page-composition.test.tsx
```

Expected: FAIL because the page does not exist.

- [ ] **Step 3: Implement family data mapping**

`family-listing.data.ts` exports:

```ts
export function createFamilyListingData(familySlug: string) {
  const result = getFamilyListingModel(familySlug);
  if (result.kind !== "family") return null;
  return {
    family: result.family,
    products: result.products,
    countLabel: `${result.products.length} products`,
    searchLabel: `Search within ${result.family.name}`
  } as const;
}
```

- [ ] **Step 4: Implement Figma-led sections**

`FamilyListingPage` renders, in order:

1. Breadcrumb navigation.
2. `FamilyHero` with sole `<h1>`, count, `/catalogues` link, and neutral media.
3. `FamilyDiscoveryShell` with read-only search and sort presentation.
4. Desktop `FamilyFilterPreview` plus `FamilyProductGrid`.
5. Standalone loading/no-results examples inside a desktop-only review section, matching Figma.
6. `FamilySupportPanel` linking to `/contact`.

Product cards use separate sibling links:

```tsx
<article className="family-product-card" data-product-card={product.id}>
  <ProductMediaPlaceholder label={product.mediaLabel} decorative />
  <p className="public-eyebrow">{family.name}</p>
  <h2>{product.name}</h2>
  <p>{[product.code, product.primaryOption].filter(Boolean).join(" · ")}</p>
  <div className="family-product-card__actions">
    <Link href={productHref(product)}>View details →</Link>
    <span aria-disabled="true" className="disabled-text-action">Add to inquiry — available next phase</span>
  </div>
</article>
```

Do not wrap the whole article in a link.

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- f3b-page-composition.test.tsx family-listing-components.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/family-listing apps/web/src/features/public-catalogue/product-preview-card.tsx apps/web/src/test
git commit -m "feat: compose all five family listing pages"
```

Expected: family composition tests and typecheck PASS.

---

### Task 6: Compose the shared product-detail template for every registered product

**Files:**
- Create all product-detail files listed in the file map.
- Modify: `apps/web/src/test/f3b-page-composition.test.tsx`

**Interfaces:**
- Consumes: product route results from `getProductDetailModel`.
- Produces: `ProductDetailPage({ familySlug, productSlug }: { familySlug: string; productSlug: string })`.

- [ ] **Step 1: Add failing product composition tests**

```tsx
import { ProductDetailPage } from "@/features/product-detail/product-detail-page";

it("renders a product detail with one h1, specifications and related products", () => {
  const html = renderToStaticMarkup(
    <ProductDetailPage familySlug="knives" productSlug="scalpel-handle-no-3" />
  );
  expect((html.match(/<h1/g) || [])).toHaveLength(1);
  expect(html).toContain("18-0644");
  expect(html).toContain("<table");
  expect(html).toContain("More from Knives");
  expect(html).not.toContain("Added to your inquiry");
});

it("omits unsupported specification rows", () => {
  const html = renderToStaticMarkup(
    <ProductDetailPage familySlug="cutters" productSlug="cleveland-cutter" />
  );
  expect(html).not.toContain("Direction / shape</th><td></td>");
});
```

- [ ] **Step 2: Verify red state**

```bash
pnpm --filter @rosa/web test -- f3b-page-composition.test.tsx product-detail-components.test.tsx
```

Expected: product cases FAIL because the page does not exist.

- [ ] **Step 3: Implement product-detail data mapping**

`product-detail.data.ts` converts registry records to view data and creates specification rows only when values exist:

```ts
export function createProductDetailData(familySlug: string, productSlug: string) {
  const result = getProductDetailModel(familySlug, productSlug);
  if (result.kind !== "product") return null;

  const { family, product, related } = result;
  const specifications = [
    ["Product code", product.code],
    ["Instrument family", family.name],
    product.sizes.length ? ["Available size", product.sizes.join(", ")] : null,
    product.variants.length ? ["Compatible options", product.variants.join(", ")] : null,
    product.directions.length ? ["Direction / shape", product.directions.join(", ")] : null,
    ["Catalogue reference", `${product.catalogueReference.family}${product.catalogueReference.page ? ` · Page ${product.catalogueReference.page}` : ""}`]
  ].filter((row): row is [string, string] => Boolean(row));

  return { family, product, related, specifications } as const;
}
```

- [ ] **Step 4: Implement the Figma-led product flow**

Render in order:

1. `ProductBreadcrumbs` as `<nav aria-label="Breadcrumb">`.
2. Desktop media/summary split; mobile media-first stack.
3. `ProductGallery` with one noninteractive selected thumbnail marked `aria-current="true"` and three decorative sample thumbnails.
4. `ProductProcurementSummary` with sole `<h1>`, code, description, static option fields, static quantity, disabled Add to inquiry, catalogue reference, and quotation-required note.
5. `ProductSpecificationTable` with semantic `<table>` and associated heading.
6. Desktop `ProductProcurementNote` with disabled Add with note.
7. `RelatedProductGrid`, maximum three desktop and two mobile through CSS visibility only; all links remain present in DOM.
8. Desktop dark inquiry CTA linking to `/inquiry`.
9. Mobile fixed `MobileInquiryBar` with status `Inquiry controls activate next phase` and disabled Add to inquiry.

The page must add bottom padding equal to the sticky bar plus safe-area inset on mobile.

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- f3b-page-composition.test.tsx product-detail-components.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/product-detail apps/web/src/test
git commit -m "feat: compose catalogue product detail pages"
```

Expected: composition/component tests and typecheck PASS.

---

### Task 7: Add F3B family and product-detail styling with static invariants

**Files:**
- Modify: `apps/web/src/styles/public-pages.css`
- Create: `apps/web/src/test/f3b-styles.static.test.mjs`

**Interfaces:**
- Produces F3B layout, control, state, gallery, table, related-grid, CTA, and sticky-bar classes.

- [ ] **Step 1: Write failing static style tests**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("F3B stylesheet defines family and detail systems", async () => {
  const css = await read("styles/public-pages.css");
  for (const selector of [
    ".family-hero",
    ".family-results-layout",
    ".family-filter-preview",
    ".product-detail-layout",
    ".product-gallery",
    ".product-specification-table",
    ".mobile-inquiry-bar"
  ]) assert.match(css, new RegExp(selector.replaceAll(".", "\\.")));
});

test("F3B includes tablet, mobile, sticky-safe and reduced-motion rules", async () => {
  const css = await read("styles/public-pages.css");
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 640px\)/);
  assert.match(css, /env\(safe-area-inset-bottom\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});
```

- [ ] **Step 2: Verify red state**

```bash
node --test apps/web/src/test/f3b-styles.static.test.mjs
```

Expected: FAIL because required selectors are missing.

- [ ] **Step 3: Implement exact responsive structure**

Desktop 1440:

- Family hero: `grid-template-columns: minmax(0, 1fr) minmax(28rem, .82fr)`.
- Family result layout: `250px minmax(0, 1fr)`.
- Product grid: three equal columns.
- Product detail: thumbnail rail + `minmax(0, 1.12fr)` media + `minmax(28rem, .88fr)` summary.
- Related grid: three columns.

Tablet 768:

- Hero may stack.
- Filters become a horizontal/compact summary above a two-column product grid.
- Product detail stacks media and summary.
- Related grid uses two columns.

Mobile 390:

- One product column.
- Hide desktop filter sidebar and desktop review-state section.
- Show mobile read-only filter row.
- Stack specifications visually while preserving table semantics.
- Show fixed sticky inquiry bar.
- Add `.public-page--product-detail { padding-bottom: calc(6.5rem + env(safe-area-inset-bottom)); }`.

Disabled controls must use border/background/text treatment, not opacity alone.

- [ ] **Step 4: Verify and commit**

```bash
node --test apps/web/src/test/f3b-styles.static.test.mjs
node --test apps/web/src/test/public-page-styles.static.test.mjs
pnpm --filter @rosa/web test:foundation
git add apps/web/src/styles/public-pages.css apps/web/src/test/f3b-styles.static.test.mjs
git commit -m "feat: add responsive F3B catalogue page styles"
```

Expected: F3B, F3A, and foundation static tests PASS.

---

### Task 8: Route F3B pages and enforce Next.js not-found behavior

**Files:**
- Modify: `apps/web/src/features/public-routing/resolve-public-page.tsx`
- Modify: `apps/web/src/app/(public)/[[...segments]]/page.tsx`
- Modify: `apps/web/src/test/public-route-dispatch.test.ts`

**Interfaces:**
- Extends `PublicPageKind` to `homepage | products | family | product | placeholder | not-found`.
- Produces route resolution without constructing unvalidated catalogue paths.

- [ ] **Step 1: Add failing dispatch cases**

```ts
it.each([
  ["products/knives", "family"],
  ["products/scissors", "family"],
  ["products/knives/scalpel-handle-no-3", "product"],
  ["products/scissors/scalpel-handle-no-3", "not-found"],
  ["products/unknown", "not-found"],
  ["products/knives/scalpel-handle-no-3/extra", "not-found"]
])("maps %s to %s", (key, expected) => {
  expect(resolvePublicPageKind(key)).toBe(expected);
});
```

- [ ] **Step 2: Verify red state**

```bash
pnpm --filter @rosa/web test -- public-route-dispatch.test.ts
```

Expected: new cases FAIL.

- [ ] **Step 3: Implement route-kind resolution**

`resolvePublicPageKind` splits `key` on `/` and delegates catalogue paths to `resolveCataloguePath`.

`resolvePublicPage` returns:

- `<Homepage />` for homepage.
- `<ProductsOverview />` for products overview.
- `<FamilyListingPage familySlug={segments[1]} />` for family.
- `<ProductDetailPage familySlug={segments[1]} productSlug={segments[2]} />` for product.
- Existing placeholder for unrelated paths.
- `null` for not-found.

The catch-all page calls `notFound()` when kind is `not-found` or when `resolvePublicPage()` returns `null`.

- [ ] **Step 4: Verify routes and production build**

```bash
pnpm --filter @rosa/web test -- public-route-dispatch.test.ts route-inventory.test.ts f3b-page-composition.test.tsx
pnpm --filter @rosa/web typecheck
pnpm --filter @rosa/web build
```

Expected: tests, typecheck, and build PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/app apps/web/src/features/public-routing apps/web/src/test/public-route-dispatch.test.ts
git commit -m "feat: route F3B catalogue pages with strict not found handling"
```

---

### Task 9: Add desktop, tablet, and mobile browser verification

**Files:**
- Create: `apps/web/tests/e2e/f3b-catalogue-pages.spec.ts`
- Modify snapshots only after rendered layout stabilizes.

**Interfaces:**
- Uses the existing 1440 desktop, 768 tablet, and 390 mobile Playwright projects.

- [ ] **Step 1: Write family-route browser checks**

```ts
import { expect, test } from "@playwright/test";

const families = ["knives", "scissors", "punches", "chisels", "cutters"] as const;

for (const family of families) {
  test(`${family} family page is stable and honest`, async ({ page }) => {
    await page.goto(`/products/${family}`);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("[data-product-card]")).toHaveCount(4);
    await expect(page.locator("form")).toHaveCount(0);
    await expect(page.locator('a[href="/catalogues"]')).toBeVisible();
    await expect(page.locator('a[href="/contact"]')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
  });
}
```

- [ ] **Step 2: Write product and 404 checks**

```ts
test("product detail exposes specifications and disabled inquiry action", async ({ page }) => {
  await page.goto("/products/knives/scalpel-handle-no-3");
  await expect(page.locator("h1")).toHaveText("Scalpel Handle No. 3");
  await expect(page.locator("table")).toBeVisible();
  await expect(page.getByRole("button", { name: /add to inquiry/i })).toBeDisabled();
});

test("family product mismatch returns 404", async ({ page }) => {
  const response = await page.goto("/products/scissors/scalpel-handle-no-3");
  expect(response?.status()).toBe(404);
});
```

- [ ] **Step 3: Add mobile sticky-bar obstruction check**

On the mobile project, scroll to the last focusable footer link and verify its bounding box ends above the sticky bar or remains scrollable into view.

- [ ] **Step 4: Run browser tests**

```bash
pnpm --filter @rosa/web exec playwright install chromium
pnpm --filter @rosa/web test:e2e -- f3b-catalogue-pages.spec.ts
```

Do not use `--with-deps` unless Chromium reports a missing Linux library.

Expected: family, product, 404, focus, overflow, and sticky-bar checks PASS across desktop, tablet, and mobile.

- [ ] **Step 5: Add visual snapshots and commit**

After layout stabilizes, add full-page snapshots for:

- Knives family page.
- Scissors family page as a second-family template check.
- Scalpel Handle No. 3 detail.
- Mayo Scissors detail as a second-family detail check.

```bash
git add apps/web/tests/e2e/f3b-catalogue-pages.spec.ts apps/web/tests/e2e/f3b-catalogue-pages.spec.ts-snapshots
git commit -m "test: verify F3B catalogue pages across breakpoints"
```

---

### Task 10: Run the consolidated F3A/F3B gate and record exact completion evidence

**Files:**
- Create: `docs/superpowers/completions/2026-08-01-rosa-medical-f3b-family-product.md`
- Modify: `README.md` on `main` after branch verification.

- [ ] **Step 1: Run the complete verification gate**

```bash
pnpm install --frozen-lockfile
pnpm contracts:generate
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm --filter @rosa/web test:foundation
node --test apps/web/src/test/public-page-styles.static.test.mjs
node --test apps/web/src/test/f3b-styles.static.test.mjs
pnpm test:e2e
```

Expected:

- Lint: zero errors and zero warnings.
- Typecheck: contracts and web PASS.
- Unit/static tests: PASS.
- Next production build: PASS.
- F3A browser regressions: PASS.
- F3B family/product/404 checks: PASS across all three projects.

If Ahmad postpones Playwright again, record it as **not run**, never passed.

- [ ] **Step 2: Perform Figma fidelity review**

Compare rendered pages at 1440, 768, and 390 px against:

- Category desktop node `12:176`.
- Category mobile node `12:286`.
- Product detail desktop node `14:3`.
- Product detail mobile node `14:104`.

Blocking mismatches:

- Wrong section order.
- Incorrect hero/media proportions.
- Broken filter/grid relationship.
- Product controls implying functionality.
- Missing or incorrect specification hierarchy.
- Related-card proportion drift.
- Sticky bar obscuring content.
- Horizontal overflow.
- Unsupported catalogue facts or claims.

- [ ] **Step 3: Write the completion record with actual values**

The record must include:

```md
# Rosa Medical F3B Completion

- Branch: `frontend/f3b-family-product`
- Final commit: actual SHA
- Family routes completed: exact five routes
- Product routes completed: exact twenty routes
- Tests run: exact commands and results
- Tests not run: exact omissions and reason, or None
- Figma review: exact desktop/tablet/mobile evidence
- Contract changes: None
- Known limitations: neutral product media and read-only F3B controls
- Next milestone: F3C Inquiry Basket, Request Quotation, and Catalogues
```

No template markers may remain in the committed file.

- [ ] **Step 4: Update README coordination**

Preserve the backend-owned section. Record:

- F3B branch and final commit.
- Five family routes and twenty product routes.
- Catalogue registry and route-validation behavior.
- Exact verification evidence or omissions.
- Contract 0.1 unchanged.
- F3C as next work.

- [ ] **Step 5: Commit and compare scope**

```bash
git add docs/superpowers/completions/2026-08-01-rosa-medical-f3b-family-product.md
git commit -m "docs: record F3B catalogue page completion"
git diff --check frontend/f3b-family-product-design...frontend/f3b-family-product
git diff --stat frontend/f3b-family-product-design...frontend/f3b-family-product
git log --oneline frontend/f3b-family-product-design..frontend/f3b-family-product
```

Expected: no whitespace errors; changes remain limited to F3B frontend records, routes, components, styles, tests, and completion documentation.

---

## F3B Acceptance Criteria

F3B is complete only when:

- All five family routes use one validated family-listing template.
- Each family displays four catalogue-derived products.
- All twenty product-detail routes resolve through one validated registry.
- Unknown families, products, mismatches, and unsupported path depths return 404.
- `/` and `/products` retain their F3A compositions.
- Other routes remain unchanged.
- Search, sort, filters, quantity, gallery switching, notes, and inquiry mutation are visibly honest and nonfunctional.
- No dead clickable controls or false success feedback appear.
- Family catalogue paths navigate to `/catalogues` without fake downloads.
- Family support navigates to `/contact`.
- Product specifications render only supported rows.
- Related products exclude the current product and stay in-family.
- Every page has one public-shell main and one route-level h1.
- Desktop 1440, tablet 768, and mobile 390 layouts have no horizontal overflow.
- Mobile sticky action does not obscure content or focus targets.
- Lint, typecheck, unit/static tests, and production build pass.
- Playwright passes or is explicitly recorded as postponed.
- OpenAPI 0.1 remains unchanged.
- Completion documentation identifies F3C as the next milestone.

## Deferred Sequence After F3B

1. F3C — Inquiry Basket, Request Quotation, and Catalogues
2. F3D — About, Procurement Support, Contact, Search, Privacy, and Terms
3. F3E — Complete static admin experience
4. F4 — Mocked interactions and stateful flows
5. F5 onward — Live backend integration, visual refinement, Arabic/RTL, accessibility/performance hardening, and production deployment
