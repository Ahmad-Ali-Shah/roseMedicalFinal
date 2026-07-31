# Rosa Medical F3B Family Listing and Product Detail Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement complete static family-listing and product-detail compositions for all five Rosa instrument families using source-backed frontend records, deterministic route resolution, honest noninteractive controls, responsive Figma-led layouts, and strict not-found behavior.

**Architecture:** F3B adds a frontend-owned catalogue registry under `features/catalogue-registry` without changing OpenAPI 0.1. Every family and product route resolves through this registry before composition. Family-listing and product-detail components remain stateless server components; search, filters, quantity, gallery switching, notes, and inquiry mutation remain read-only or disabled until F4.

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
- Preserve source terminology. Do not append generic product words to source names such as `LISTON`, `CLEVELAND`, `BOHLER`, `CODMAN`, or `LAMBOTTE`.
- Keep detailed F3B records frontend-owned; do not change OpenAPI schemas or operation IDs.
- Search, sort, filters, quantity, gallery switching, notes, and inquiry mutation remain nonfunctional in F3B.
- Noninteractive summaries use native text, `<output>`, `readOnly`, or `disabled` semantics; do not apply unsupported ARIA attributes to generic roles.
- Disabled inquiry controls explain that interaction activates in F4.
- Unknown family slugs, unknown product slugs, family/product mismatches, and unsupported route depths use `notFound()`.
- All registered products remain visible; do not add fake pagination or truncate mobile results.
- Family support navigates to `/contact`.
- Family catalogue navigation goes to `/catalogues`; it must not pretend to directly download a PDF.
- Preserve active-link focus visibility, 44 px practical targets, reduced-motion behavior, and zero horizontal overflow at 1440, 768, and 390 px.
- Commit meaningful, independently reviewable tasks only.

---

## File Map

### Existing files to modify

- `apps/web/src/app/(public)/[[...segments]]/page.tsx`
- `apps/web/src/features/public-routing/resolve-public-page.tsx`
- `apps/web/src/styles/public-pages.css`
- `apps/web/src/test/public-route-dispatch.test.ts`
- `README.md` on `main` after verification

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
- `apps/web/src/features/family-listing/family-product-card.tsx`
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

### Task 1: Create the implementation branch and catalogue record types

**Files:**
- Create: `apps/web/src/features/catalogue-registry/types.ts`
- Create: `apps/web/src/test/catalogue-registry.test.ts`

**Interfaces:**
- Consumes: `FamilySlug` from `@/features/public-catalogue`.
- Produces: `CatalogueReference`, `CatalogueFamilyRecord`, `CatalogueProductRecord`, and `CatalogueRouteResult`.

- [ ] **Step 1: Create the branch**

```bash
git fetch origin
git switch frontend/f3b-family-product-design
git pull --ff-only
git switch -c frontend/f3b-family-product
```

- [ ] **Step 2: Write the failing type-surface test**

```ts
import { expect, it } from "vitest";
import type { CatalogueFamilyRecord, CatalogueProductRecord } from "@/features/catalogue-registry/types";

it("accepts explicit catalogue records", () => {
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

Expected: FAIL because `types.ts` does not exist.

- [ ] **Step 4: Implement the types**

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

---

### Task 2: Add five family records and twenty source-backed product records

**Files:**
- Create: `apps/web/src/features/catalogue-registry/families.ts`
- Create: five modules under `apps/web/src/features/catalogue-registry/products/`
- Create: `apps/web/src/features/catalogue-registry/products/index.ts`
- Modify: `apps/web/src/test/catalogue-registry.test.ts`

**Interfaces:**
- Produces: `CATALOGUE_FAMILIES` and `CATALOGUE_PRODUCTS`.

- [ ] **Step 1: Add failing integrity assertions**

```ts
import { CATALOGUE_FAMILIES, CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";

it("registers five families and four products per family", () => {
  expect(CATALOGUE_FAMILIES).toHaveLength(5);
  for (const family of CATALOGUE_FAMILIES) {
    expect(CATALOGUE_PRODUCTS.filter((product) => product.familySlug === family.slug)).toHaveLength(4);
  }
});

it("keeps IDs and family-local routes unique", () => {
  expect(new Set(CATALOGUE_PRODUCTS.map((product) => product.id)).size).toBe(20);
  const routes = CATALOGUE_PRODUCTS.map((product) => `${product.familySlug}/${product.slug}`);
  expect(new Set(routes).size).toBe(routes.length);
  expect(CATALOGUE_PRODUCTS.every((product) => product.code.trim())).toBe(true);
});
```

- [ ] **Step 2: Verify red state**

```bash
pnpm --filter @rosa/web test -- catalogue-registry.test.ts
```

- [ ] **Step 3: Create the family records**

```ts
import type { CatalogueFamilyRecord } from "./types";

export const CATALOGUE_FAMILIES = [
  { slug: "knives", sequence: "01", name: "Knives", introduction: "Precision cutting instruments presented with clear product codes, stated sizes and available variants for quotation preparation.", catalogueLabel: "Knives catalogue" },
  { slug: "scissors", sequence: "02", name: "Scissors", introduction: "Surgical scissors organised by product code, length, direction and listed variant.", catalogueLabel: "Scissors catalogue" },
  { slug: "punches", sequence: "03", name: "Punches", introduction: "Punch instruments organised by jaw pattern, shaft length and catalogue reference.", catalogueLabel: "Punches catalogue" },
  { slug: "chisels", sequence: "04", name: "Chisels", introduction: "Chisels and osteotomes organised by pattern, width, length and listed direction.", catalogueLabel: "Chisels catalogue" },
  { slug: "cutters", sequence: "05", name: "Cutters", introduction: "Cutting instruments organised by named pattern, length and listed direction or profile.", catalogueLabel: "Cutters catalogue" }
] as const satisfies readonly CatalogueFamilyRecord[];
```

- [ ] **Step 4: Create the exact product records**

Use these names and source-supported fields. When a page is not confirmed, omit `page` rather than guessing it.

| Family | Name | Slug | Code | Source-supported details | Reference |
|---|---|---|---|---|---|
| Knives | Scalpel Handle No. 3 | `scalpel-handle-no-3` | `18-0644` | `14.5 cm`; Standard | Knives, page 6 |
| Knives | Bard Parker Handle | `bard-parker-handle` | `18-0650` | `14.5 cm`; Standard | Knives |
| Knives | Amputation Knife | `amputation-knife` | `18-1202` | `14.5 cm`; Standard | Knives |
| Knives | Resection Knife | `resection-knife` | `18-1404` | `14.5 cm`; Standard | Knives |
| Scissors | Mayo Scissors | `mayo-scissors` | `04-0402` | `17 cm`; Straight; Regular | Scissors, page 2 |
| Scissors | Iris Scissors | `iris-scissors` | `04-0901` | `10.5 cm`; Straight; Sharp; Regular | Scissors, page 1 |
| Scissors | Sims Scissors | `sims-scissors` | `04-0701` | `20 cm`; Straight; Regular | Scissors, page 4 |
| Scissors | Pottsmith Scissors | `pottsmith-scissors` | `04-3701` | `25° angled`; Regular | Scissors, page 10 |
| Punches | Yeoman | `yeoman` | `21-1001` | `28.0 cm`; standard jaw illustration | Punches, page 1 |
| Punches | Yeoman, Perforated | `yeoman-perforated` | `21-1101` | `28.0 cm`; perforated jaw illustration | Punches, page 1 |
| Punches | Yeoman, Rectangular | `yeoman-rectangular` | `21-1201` | `28.0 cm`; rectangular jaw illustration | Punches, page 1 |
| Punches | Biopsy Punch | `biopsy-punch` | `23-1204` | `4 mm` | Punches |
| Chisels | Codman | `codman` | `36-7101` | `28 cm`; Straight | Chisels, page 5 |
| Chisels | Lambotte | `lambotte` | `36-7201` | `25.0 cm`; `4 mm`; Straight | Chisels, page 5 |
| Chisels | Mini Lambotte | `mini-lambotte` | `36-7214` | `12.5 cm`; `2 mm`; Straight | Chisels, page 6 |
| Chisels | Farabeuf | `farabeuf` | `37-0701` | `15.0 cm`; Straight | Chisels, page 10 |
| Cutters | Liston | `liston` | `36-5101` | `14.0 cm`; Straight | Cutters, page 1 |
| Cutters | Cleveland | `cleveland` | `36-5401` | `15.0 cm` | Cutters, page 1 |
| Cutters | Bohler | `bohler` | `36-5501` | `15.0 cm`; Straight | Cutters, page 1 |
| Cutters | SC-01T | `sc-01t` | `SC-01T` | `12.5 cm`; Fine point; Straight | Cutters, page 10 |

Each family module uses `as const satisfies readonly CatalogueProductRecord[]`. Descriptions must be restrained, such as `"Mayo Scissors presented with the listed length and direction."`; do not infer product usage.

- [ ] **Step 5: Aggregate records**

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
git commit -m "feat: add source-backed F3B product records"
```

---

### Task 3: Implement deterministic registry and route resolution

**Files:**
- Create: `apps/web/src/features/catalogue-registry/registry.ts`
- Create: `apps/web/src/features/catalogue-registry/index.ts`
- Modify: `apps/web/src/test/catalogue-registry.test.ts`

**Interfaces:**
- Produces `isKnownFamilySlug`, `getFamilyListingModel`, `getProductDetailModel`, `getRelatedProducts`, and `resolveCataloguePath`.

- [ ] **Step 1: Add failing resolution tests**

```ts
import { getFamilyListingModel, getProductDetailModel, resolveCataloguePath } from "@/features/catalogue-registry";

it("resolves all five families", () => {
  for (const slug of ["knives", "scissors", "punches", "chisels", "cutters"]) {
    expect(getFamilyListingModel(slug).kind).toBe("family");
  }
});

it("resolves products and rejects mismatches", () => {
  expect(getProductDetailModel("knives", "scalpel-handle-no-3").kind).toBe("product");
  expect(getProductDetailModel("scissors", "scalpel-handle-no-3").kind).toBe("not-found");
});

it("rejects unsupported depths", () => {
  expect(resolveCataloguePath(["products", "knives"]).kind).toBe("family");
  expect(resolveCataloguePath(["products", "knives", "scalpel-handle-no-3"]).kind).toBe("product");
  expect(resolveCataloguePath(["products", "knives", "scalpel-handle-no-3", "extra"]).kind).toBe("not-found");
});
```

- [ ] **Step 2: Verify red state**

```bash
pnpm --filter @rosa/web test -- catalogue-registry.test.ts
```

- [ ] **Step 3: Implement integrity validation and maps**

```ts
const familyBySlug = new Map(CATALOGUE_FAMILIES.map((family) => [family.slug, family]));
const productByRoute = new Map(CATALOGUE_PRODUCTS.map((product) => [`${product.familySlug}/${product.slug}`, product]));

function assertRegistryIntegrity(): void {
  const ids = new Set<string>();
  for (const product of CATALOGUE_PRODUCTS) {
    if (!familyBySlug.has(product.familySlug)) throw new Error(`Unknown catalogue family: ${product.familySlug}`);
    if (!product.name.trim()) throw new Error(`Missing product name: ${product.id}`);
    if (!product.code.trim()) throw new Error(`Missing product code: ${product.id}`);
    if (ids.has(product.id)) throw new Error(`Duplicate product id: ${product.id}`);
    ids.add(product.id);
  }
  if (productByRoute.size !== CATALOGUE_PRODUCTS.length) throw new Error("Duplicate catalogue product route");
}

assertRegistryIntegrity();
```

`getRelatedProducts` returns same-family records, excludes the current ID, preserves registry order, and slices to the requested limit.

- [ ] **Step 4: Export and verify**

```ts
export * from "./types";
export * from "./families";
export * from "./products";
export * from "./registry";
```

```bash
pnpm --filter @rosa/web test -- catalogue-registry.test.ts
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/catalogue-registry apps/web/src/test/catalogue-registry.test.ts
git commit -m "feat: add deterministic catalogue registry"
```

---

### Task 4: Build honest static control and preview components

**Files:**
- Create the static option, quantity, filter, loading, no-results, filter-sheet, and feedback files listed in the file map.
- Create: `apps/web/src/test/family-listing-components.test.tsx`
- Create: `apps/web/src/test/product-detail-components.test.tsx`

**Interfaces:**
- Produces noninteractive components reusable by F4.

- [ ] **Step 1: Write failing semantic tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { StaticOptionField } from "@/features/product-detail/static-option-field";
import { StaticQuantityField } from "@/features/product-detail/static-quantity-field";

it("uses native output and disabled-button semantics", () => {
  const html = renderToStaticMarkup(
    <><StaticOptionField label="Size" value="14.5 cm" /><StaticQuantityField value={1} /></>
  );
  expect(html).toContain("<output");
  expect(html).toContain("disabled");
  expect(html).not.toContain('role="group" aria-readonly');
  expect(html).not.toContain("<form");
});
```

- [ ] **Step 2: Verify red state**

```bash
pnpm --filter @rosa/web test -- family-listing-components.test.tsx product-detail-components.test.tsx
```

- [ ] **Step 3: Implement exact semantics**

- `StaticOptionField`: `<div className="static-field"><span id={labelId}>…</span><output aria-labelledby={labelId}>…</output></div>`.
- Family search preview: `<input readOnly aria-label={searchLabel}>` outside a form.
- Sort/filter summaries: labelled text or `<output>`, not fake `<select>` elements.
- `StaticQuantityField`: disabled minus and plus buttons around `<output aria-label="Quantity">1</output>`.
- `MobileFilterSheetPreview`: standalone `<aside aria-label="Filter preview">`, not mounted as an open dialog.
- `FamilyLoadingState`: static skeleton preview with an accessible label.
- `FamilyNoResultsState`: disabled Clear filters button.
- `AddedFeedbackPreview`: test/F4 export only; never mounted on the default detail route.

- [ ] **Step 4: Verify and commit**

```bash
pnpm --filter @rosa/web test -- family-listing-components.test.tsx product-detail-components.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/family-listing apps/web/src/features/product-detail apps/web/src/test
git commit -m "feat: add honest static catalogue controls"
```

---

### Task 5: Compose the shared family-listing template

**Files:**
- Create all family-listing page files listed in the file map.
- Create: `apps/web/src/test/f3b-page-composition.test.tsx`

**Interfaces:**
- Consumes `getFamilyListingModel`.
- Produces `FamilyListingPage({ familySlug }: { familySlug: string })`.

- [ ] **Step 1: Write failing composition tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { FamilyListingPage } from "@/features/family-listing/family-listing-page";

it.each(["knives", "scissors", "punches", "chisels", "cutters"])(
  "renders %s with one h1 and four products",
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

- [ ] **Step 3: Implement data mapping**

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

- [ ] **Step 4: Implement Figma order**

1. Breadcrumb.
2. Family hero with the sole `<h1>`, actual registered count, `/catalogues` link, and neutral media.
3. Read-only search/sort shell.
4. Desktop filter preview plus three-column grid; tablet two columns; mobile one column.
5. Desktop-only loading/no-results review section.
6. Dark support panel linking to `/contact`.

`FamilyProductCard` is a dedicated F3B component. It uses separate sibling affordances and never nests a button inside a link:

```tsx
<article data-product-card={product.id} className="family-product-card">
  <ProductMediaPlaceholder label={product.mediaLabel} decorative />
  <p className="public-eyebrow">{family.name}</p>
  <h2>{product.name}</h2>
  <p>{[product.code, product.primaryOption].filter(Boolean).join(" · ")}</p>
  <div className="family-product-card__actions">
    <Link href={productHref(product)}>View details →</Link>
    <span className="disabled-text-action" aria-disabled="true">Add to inquiry — available next phase</span>
  </div>
</article>
```

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- f3b-page-composition.test.tsx family-listing-components.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/family-listing apps/web/src/test
git commit -m "feat: compose all five family listing pages"
```

---

### Task 6: Compose the shared product-detail template

**Files:**
- Create all product-detail files listed in the file map.
- Modify: `apps/web/src/test/f3b-page-composition.test.tsx`

**Interfaces:**
- Consumes `getProductDetailModel`.
- Produces `ProductDetailPage({ familySlug, productSlug }: { familySlug: string; productSlug: string })`.

- [ ] **Step 1: Add failing product tests**

```tsx
import { ProductDetailPage } from "@/features/product-detail/product-detail-page";

it("renders specifications and same-family related products", () => {
  const html = renderToStaticMarkup(<ProductDetailPage familySlug="knives" productSlug="scalpel-handle-no-3" />);
  expect((html.match(/<h1/g) || [])).toHaveLength(1);
  expect(html).toContain("18-0644");
  expect(html).toContain("<table");
  expect(html).toContain("More from Knives");
  expect(html).not.toContain("Added to your inquiry");
});

it("omits absent specification rows", () => {
  const html = renderToStaticMarkup(<ProductDetailPage familySlug="cutters" productSlug="cleveland" />);
  expect(html).not.toContain("Direction / shape</th><td></td>");
});
```

- [ ] **Step 2: Verify red state**

```bash
pnpm --filter @rosa/web test -- f3b-page-composition.test.tsx product-detail-components.test.tsx
```

- [ ] **Step 3: Implement view-data mapping**

```ts
export function createProductDetailData(familySlug: string, productSlug: string) {
  const result = getProductDetailModel(familySlug, productSlug);
  if (result.kind !== "product") return null;
  const { family, product, related } = result;
  const specifications = [
    ["Product code", product.code],
    ["Instrument family", family.name],
    product.sizes.length ? ["Available size", product.sizes.join(", ")] : null,
    product.variants.length ? ["Listed options", product.variants.join(", ")] : null,
    product.directions.length ? ["Direction / shape", product.directions.join(", ")] : null,
    ["Catalogue reference", `${product.catalogueReference.family}${product.catalogueReference.page ? ` · Page ${product.catalogueReference.page}` : ""}`]
  ].filter((row): row is [string, string] => Boolean(row));
  return { family, product, related, specifications } as const;
}
```

- [ ] **Step 4: Implement Figma order**

1. Breadcrumb navigation.
2. Static gallery with one current thumbnail and three decorative samples.
3. Procurement summary with sole `<h1>`, code, restrained description, static fields, quantity `1`, disabled Add to inquiry, catalogue reference, and quotation-required note.
4. Semantic specification table.
5. Desktop procurement-note panel with disabled Add with note.
6. Same-family related products: three desktop, two mobile.
7. Desktop dark CTA linking to `/inquiry`.
8. Mobile fixed bar with `Inquiry controls activate next phase` and disabled Add to inquiry.

The page adds mobile bottom padding equal to the sticky bar plus safe-area inset.

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- f3b-page-composition.test.tsx product-detail-components.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/product-detail apps/web/src/test
git commit -m "feat: compose catalogue product detail pages"
```

---

### Task 7: Add responsive F3B styling and static invariants

**Files:**
- Modify: `apps/web/src/styles/public-pages.css`
- Create: `apps/web/src/test/f3b-styles.static.test.mjs`

- [ ] **Step 1: Write failing selectors/breakpoint tests**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("F3B defines family and detail systems", async () => {
  const css = await read("styles/public-pages.css");
  for (const selector of [".family-hero", ".family-results-layout", ".family-filter-preview", ".product-detail-layout", ".product-gallery", ".product-specification-table", ".mobile-inquiry-bar"]) {
    assert.match(css, new RegExp(selector.replaceAll(".", "\\.")));
  }
});

test("F3B includes breakpoints and sticky safety", async () => {
  const css = await read("styles/public-pages.css");
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 640px\)/);
  assert.match(css, /env\(safe-area-inset-bottom\)/);
});
```

- [ ] **Step 2: Verify red state**

```bash
node --test apps/web/src/test/f3b-styles.static.test.mjs
```

- [ ] **Step 3: Implement exact layouts**

Desktop:

- Family hero split: `minmax(0, 1fr) minmax(28rem, .82fr)`.
- Results: `250px minmax(0, 1fr)` with three product columns.
- Detail: thumbnail rail, large media, and `minmax(28rem, .88fr)` summary.
- Three related cards.

Tablet:

- Stacked hero where needed.
- Compact filter summary and two product columns.
- Stacked detail media/summary and two related columns.

Mobile:

- One product column.
- Hide desktop filter sidebar and review-state examples.
- Preserve all four products.
- Visually stack table rows while retaining `<table>` semantics.
- Show fixed inquiry bar.
- Add `.public-page--product-detail { padding-bottom: calc(6.5rem + env(safe-area-inset-bottom)); }`.

Disabled controls use border/background/text differences, not opacity alone.

- [ ] **Step 4: Verify and commit**

```bash
node --test apps/web/src/test/f3b-styles.static.test.mjs
node --test apps/web/src/test/public-page-styles.static.test.mjs
pnpm --filter @rosa/web test:foundation
git add apps/web/src/styles/public-pages.css apps/web/src/test/f3b-styles.static.test.mjs
git commit -m "feat: add responsive F3B catalogue styles"
```

---

### Task 8: Route F3B pages and enforce `notFound()`

**Files:**
- Modify: `apps/web/src/features/public-routing/resolve-public-page.tsx`
- Modify: `apps/web/src/app/(public)/[[...segments]]/page.tsx`
- Modify: `apps/web/src/test/public-route-dispatch.test.ts`

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

- [ ] **Step 3: Implement resolution**

Extend `PublicPageKind` with `family`, `product`, and `not-found`. Delegate keys beginning with `products/` to `resolveCataloguePath`. `resolvePublicPage` returns the family/detail component for valid results and `null` for not-found. The catch-all page calls `notFound()` when the kind is `not-found` or the rendered result is `null`.

- [ ] **Step 4: Verify and commit**

```bash
pnpm --filter @rosa/web test -- public-route-dispatch.test.ts route-inventory.test.ts f3b-page-composition.test.tsx
pnpm --filter @rosa/web typecheck
pnpm --filter @rosa/web build
git add apps/web/src/app apps/web/src/features/public-routing apps/web/src/test/public-route-dispatch.test.ts
git commit -m "feat: route F3B pages with strict not found handling"
```

---

### Task 9: Add desktop, tablet, and mobile browser verification

**Files:**
- Create: `apps/web/tests/e2e/f3b-catalogue-pages.spec.ts`

- [ ] **Step 1: Test every family route**

```ts
import { expect, test } from "@playwright/test";
const families = ["knives", "scissors", "punches", "chisels", "cutters"] as const;

for (const family of families) {
  test(`${family} family page is stable`, async ({ page }) => {
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

- [ ] **Step 2: Test product and 404 behavior**

```ts
test("detail exposes specifications and disabled inquiry actions", async ({ page }) => {
  await page.goto("/products/knives/scalpel-handle-no-3");
  await expect(page.locator("h1")).toHaveText("Scalpel Handle No. 3");
  await expect(page.locator("table")).toBeVisible();
  for (const button of await page.getByRole("button", { name: /add to inquiry/i }).all()) {
    await expect(button).toBeDisabled();
  }
});

test("family/product mismatch returns 404", async ({ page }) => {
  const response = await page.goto("/products/scissors/scalpel-handle-no-3");
  expect(response?.status()).toBe(404);
});
```

- [ ] **Step 3: Test mobile sticky safety**

On the mobile project, scroll the last footer link into view and assert it is not covered by `.mobile-inquiry-bar`.

- [ ] **Step 4: Run and commit**

```bash
pnpm --filter @rosa/web exec playwright install chromium
pnpm --filter @rosa/web test:e2e -- f3b-catalogue-pages.spec.ts
git add apps/web/tests/e2e/f3b-catalogue-pages.spec.ts
git commit -m "test: verify F3B catalogue pages across breakpoints"
```

After layout stabilizes, add snapshots for Knives, Scissors, Scalpel Handle No. 3, and Mayo Scissors in all three Playwright projects.

---

### Task 10: Run the consolidated gate and document completion

**Files:**
- Create: `docs/superpowers/completions/2026-08-01-rosa-medical-f3b-family-product.md`
- Modify: `README.md` on `main` after branch verification.

- [ ] **Step 1: Run the full gate**

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

If Playwright is postponed, record it as **not run**, never passed.

- [ ] **Step 2: Review Figma fidelity**

Compare 1440, 768, and 390 px renders against nodes `12:176`, `12:286`, `14:3`, and `14:104`. Treat wrong hierarchy, proportions, grid relationships, sticky obstruction, horizontal overflow, fake interaction, or unsupported facts as blocking.

- [ ] **Step 3: Create the completion record**

Record the actual final SHA, exact five family routes, exact twenty product routes, exact test results/omissions, Figma review evidence, `Contract changes: None`, known neutral-media/read-only limitations, and `Next milestone: F3C Inquiry Basket, Request Quotation, and Catalogues`.

- [ ] **Step 4: Update README coordination**

Preserve the backend-owned section. Record F3B branch/commit, route coverage, registry validation, exact verification, unchanged Contract 0.1, and F3C next.

- [ ] **Step 5: Commit and compare scope**

```bash
git add docs/superpowers/completions/2026-08-01-rosa-medical-f3b-family-product.md
git commit -m "docs: record F3B catalogue page completion"
git diff --check frontend/f3b-family-product-design...frontend/f3b-family-product
git diff --stat frontend/f3b-family-product-design...frontend/f3b-family-product
git log --oneline frontend/f3b-family-product-design..frontend/f3b-family-product
```

---

## F3B Acceptance Criteria

- Five family routes use one validated template.
- Each family displays four source-backed products.
- Twenty detail routes resolve through one registry.
- Unknown families, products, mismatches, and extra depths return 404.
- F3A homepage and products overview remain unchanged.
- Search, sort, filters, quantity, gallery switching, notes, and inquiry mutation remain honest and nonfunctional.
- No dead clickable controls or false success feedback appear.
- Catalogue navigation goes to `/catalogues`; support goes to `/contact`.
- Specification rows render only supported values.
- Related products exclude the current product and stay in-family.
- Every page has one public-shell main and one route-level h1.
- Desktop 1440, tablet 768, and mobile 390 layouts have no horizontal overflow.
- Mobile sticky action does not cover content or focus targets.
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
