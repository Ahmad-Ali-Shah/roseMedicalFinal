# Rosa Medical F3E-B Source-Backed Catalogue Management Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Rosa Medical uses inline execution only.

**Goal:** Replace the Products, Families, Catalogues and Media admin placeholders with complete, read-only, source-backed management compositions that never invent publishing, translation, upload or media state.

**Architecture:** F3E-B derives transient presentation models from `CATALOGUE_PRODUCTS`, `CATALOGUE_FAMILIES` and `CATALOGUE_DOCUMENTS`, exposes typed admin/public route helpers, and resolves only the exact approved management paths through the existing admin catch-all route. Domain features remain isolated under `admin-products`, `admin-families`, `admin-catalogues` and `admin-media`; preview-only validation/upload states are exported but never mounted by normal routing.

**Tech Stack:** Next.js 16 App Router, React 19, strict TypeScript, existing Rosa CSS tokens and shared stylesheets, F3E-A admin primitives, Vitest server-render tests, Node static-policy tests and Playwright.

## Global Constraints

- Read `README.md` from `main` before implementation and preserve the backend-owned lane, decision ledger and prior messages.
- Read both approved documents before implementation:
  - `docs/superpowers/specs/2026-08-01-rosa-medical-f3e-b-catalogue-management-design.md`
  - `docs/superpowers/specs/2026-08-01-rosa-medical-f3e-b-catalogue-management-design-review-corrections.md`
- Create `frontend/f3e-b-catalogue-management` from `frontend/f3e-b-catalogue-management-design` at commit `1a964d1bdd0c8cb58056978a2d1deb68144da4af`.
- Execute inline only. Do not offer, request or use subagent-driven execution.
- Keep commits meaningful at domain or milestone boundaries; do not create one commit per trivial file edit.
- Normal routes use only `CATALOGUE_PRODUCTS`, `CATALOGUE_FAMILIES`, `CATALOGUE_DOCUMENTS`, existing public route helpers and F3E-A admin primitives.
- Do not create a second persistent product, family, catalogue or media dataset.
- Transient view models may be created by selector functions only.
- Current normal-route totals derive from source: 20 products, 5 families, 5 catalogue documents, and 30 media requirements.
- Current family product counts derive from the registry; tests may observe four per family but production code must not hard-code four.
- Products may expose only source name, code, family, description, sizes, variants, directions, primary option, catalogue reference and media requirement label.
- Families may expose only sequence, name, introduction, catalogue label and derived product membership/count.
- Catalogues may expose only family, name, description, cover label, source classification, public family link and optional `pdfPath` availability.
- Family imagery requirements are derived presentation requirements, not source media records.
- The protected ROSA identity is informational copy outside the media requirement collection and is not counted as an asset.
- Do not show invented publication, draft, review, readiness, visibility, featured, update, save-time, Arabic-completion, upload, processing, replacement or validation state on normal routes.
- Do not show invented filenames, file sizes, dimensions, formats, asset IDs, upload queues, usage history, duplicate results or crop results.
- All mutation, upload, reorder, filtering, search and pagination controls remain read-only or disabled with no handlers.
- Normal F3E-B routes contain no native `<form>`, file input, `fetch`, storage, session, API call or persistence behavior.
- Normal routes never mount `data-preview-only`.
- Preview-only states have no route and must state that no operation occurred.
- Exact management route shapes are:
  - `["products"]`
  - `["products", familySlug, productSlug]`
  - `["families"]`
  - `["families", familySlug]`
  - `["catalogues"]`
  - `["catalogues", familySlug]`
  - `["media"]`
- Every other shape under `products`, `families`, `catalogues` or `media` returns not-found and must not fall back to the broad F3E-A placeholder behavior.
- Continue using the F3E-A shell and admin-wide `noindex` metadata; no admin route is authenticated yet.
- Target viewports: 1440 × 1000, 768 × 1024 and 390 × 844.
- Preserve the `ROSA` logo treatment; never add “Medical” to the logo lockup.
- Do not modify `services/api/**` or `packages/contracts/openapi/**`.
- Do not claim lint, typecheck, tests, build or Playwright passed without fresh command output and exit status.
- Avoid unnecessary GitHub Actions runs.

---

## File Map

### Shared admin-management routing

- Create `apps/web/src/features/admin-management-routing/admin-management-hrefs.ts` — typed admin detail/list route helpers.
- Create `apps/web/src/features/admin-management-routing/admin-management-route-model.ts` — exact route union, management-root guard and resolver.
- Create `apps/web/src/features/admin-management-routing/admin-management-route-view.tsx` — render normal domain compositions from resolver results.
- Create `apps/web/src/features/admin-management-routing/index.ts` — exports.
- Modify `apps/web/src/app/admin/(workspace)/[...segments]/page.tsx` — exact F3E-B dispatch, strict not-found for owned roots, F3E-A fallback for unowned roots.

### Products

- Create `apps/web/src/features/admin-products/admin-product-model.ts` — product row/editor selectors and source-completeness model.
- Create `apps/web/src/features/admin-products/admin-products-list-page.tsx` — 20-record list, toolbar, table/list and family summary.
- Create `apps/web/src/features/admin-products/admin-product-editor-page.tsx` — read-only editor composition.
- Create `apps/web/src/features/admin-products/admin-product-options.tsx` — documented option groups.
- Create `apps/web/src/features/admin-products/admin-product-completeness.tsx` — source-presence checklist.
- Create `apps/web/src/features/admin-products/admin-product-preview-states.tsx` — isolated list/validation/confirmation states.
- Create `apps/web/src/features/admin-products/index.ts` — exports.

### Families

- Create `apps/web/src/features/admin-families/admin-family-model.ts` — family rows/editor selector.
- Create `apps/web/src/features/admin-families/admin-families-page.tsx` — five-card source-backed list.
- Create `apps/web/src/features/admin-families/admin-family-editor-page.tsx` — read-only family editor.
- Create `apps/web/src/features/admin-families/index.ts` — exports.

### Catalogues

- Create `apps/web/src/features/admin-catalogues/admin-catalogue-model.ts` — catalogue rows/detail selector and PDF availability.
- Create `apps/web/src/features/admin-catalogues/admin-catalogues-page.tsx` — five-record list.
- Create `apps/web/src/features/admin-catalogues/admin-catalogue-detail-page.tsx` — source metadata and disabled file-management panel.
- Create `apps/web/src/features/admin-catalogues/admin-catalogue-preview-states.tsx` — isolated upload/replacement states.
- Create `apps/web/src/features/admin-catalogues/index.ts` — exports.

### Media

- Create `apps/web/src/features/admin-media/admin-media-model.ts` — transient 30-item requirement selector.
- Create `apps/web/src/features/admin-media/admin-media-page.tsx` — honest empty library and requirement groups.
- Create `apps/web/src/features/admin-media/admin-media-preview-states.tsx` — isolated upload/warning states.
- Create `apps/web/src/features/admin-media/index.ts` — exports.

### Styles and tests

- Create `apps/web/src/styles/f3e-b-catalogue-management.css`.
- Modify `apps/web/src/app/globals.css` — import F3E-B stylesheet after F3E-A.
- Create `apps/web/src/test/admin-management-hrefs.test.ts`.
- Create `apps/web/src/test/admin-product-model.test.ts`.
- Create `apps/web/src/test/admin-products-pages.test.tsx`.
- Create `apps/web/src/test/admin-family-model.test.ts`.
- Create `apps/web/src/test/admin-families-pages.test.tsx`.
- Create `apps/web/src/test/admin-catalogue-model.test.ts`.
- Create `apps/web/src/test/admin-catalogues-pages.test.tsx`.
- Create `apps/web/src/test/admin-media.test.tsx`.
- Create `apps/web/src/test/admin-management-routing.test.tsx`.
- Create `apps/web/src/test/f3e-b-admin-policy.static.test.mjs`.
- Create `apps/web/src/test/f3e-b-admin-styles.static.test.mjs`.
- Create `apps/web/tests/e2e/f3e-b-catalogue-management.spec.ts`.
- Create `docs/superpowers/completions/2026-08-01-rosa-medical-f3e-b-catalogue-management.md`.

---

### Task 1: Create the implementation branch and typed admin management hrefs

**Files:**
- Create: `apps/web/src/features/admin-management-routing/admin-management-hrefs.ts`
- Create: `apps/web/src/features/admin-management-routing/index.ts`
- Create: `apps/web/src/test/admin-management-hrefs.test.ts`

**Interfaces:**
- Consumes: `FamilySlug`, `CatalogueProductRecord`, Next.js `Route<string>`.
- Produces: `adminProductsHref`, `adminProductHref`, `adminFamiliesHref`, `adminFamilyHref`, `adminCataloguesHref`, `adminCatalogueHref`, `adminMediaHref`.

- [ ] **Step 1: Create the implementation branch from the approved design branch**

```bash
git switch frontend/f3e-b-catalogue-management-design
git pull --ff-only
git switch -c frontend/f3e-b-catalogue-management
```

Expected base:

```text
1a964d1bdd0c8cb58056978a2d1deb68144da4af
```

- [ ] **Step 2: Write the failing href test**

```ts
import { describe, expect, it } from "vitest";
import {
  adminCatalogueHref,
  adminCataloguesHref,
  adminFamiliesHref,
  adminFamilyHref,
  adminMediaHref,
  adminProductHref,
  adminProductsHref
} from "@/features/admin-management-routing";
import { CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";

describe("F3E-B admin management hrefs", () => {
  it("builds the exact approved list routes", () => {
    expect(adminProductsHref()).toBe("/admin/products");
    expect(adminFamiliesHref()).toBe("/admin/families");
    expect(adminCataloguesHref()).toBe("/admin/catalogues");
    expect(adminMediaHref()).toBe("/admin/media");
  });

  it("builds source-backed detail routes", () => {
    const product = CATALOGUE_PRODUCTS[0];
    expect(adminProductHref(product)).toBe(
      `/admin/products/${product.familySlug}/${product.slug}`
    );
    expect(adminFamilyHref(product.familySlug)).toBe(
      `/admin/families/${product.familySlug}`
    );
    expect(adminCatalogueHref(product.familySlug)).toBe(
      `/admin/catalogues/${product.familySlug}`
    );
  });
});
```

- [ ] **Step 3: Run the focused test and confirm the red state**

```bash
pnpm --filter @rosa/web test -- admin-management-hrefs.test.ts
```

Expected: failure because the routing feature does not exist.

- [ ] **Step 4: Implement typed route helpers**

```ts
import type { Route } from "next";
import type { CatalogueProductRecord } from "@/features/catalogue-registry";
import type { FamilySlug } from "@/features/public-catalogue";

export const adminProductsHref = () => "/admin/products" as Route<string>;
export const adminFamiliesHref = () => "/admin/families" as Route<string>;
export const adminCataloguesHref = () => "/admin/catalogues" as Route<string>;
export const adminMediaHref = () => "/admin/media" as Route<string>;

export function adminProductHref(
  product: Pick<CatalogueProductRecord, "familySlug" | "slug">
): Route<string> {
  return `/admin/products/${product.familySlug}/${product.slug}` as Route<string>;
}

export function adminFamilyHref(familySlug: FamilySlug): Route<string> {
  return `/admin/families/${familySlug}` as Route<string>;
}

export function adminCatalogueHref(familySlug: FamilySlug): Route<string> {
  return `/admin/catalogues/${familySlug}` as Route<string>;
}
```

Export from `index.ts`.

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-management-hrefs.test.ts
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-management-routing apps/web/src/test/admin-management-hrefs.test.ts
git commit -m "feat: define F3E-B admin management routes"
```

Do not call either command passing unless fresh output confirms it.

---

### Task 2: Build source-backed product row and editor selectors

**Files:**
- Create: `apps/web/src/features/admin-products/admin-product-model.ts`
- Create: `apps/web/src/features/admin-products/index.ts`
- Create: `apps/web/src/test/admin-product-model.test.ts`

**Interfaces:**
- Consumes: `CATALOGUE_PRODUCTS`, `CATALOGUE_FAMILIES`, `getProductDetailModel`, `familyHref`, `productHref`, admin href helpers.
- Produces: `AdminProductRow`, `AdminProductEditorModel`, `AdminProductCompletenessItem`, `getAdminProductRows()`, `getAdminProductEditor(familySlug, productSlug)`, `getDocumentedOptionSummary(product)`.

- [ ] **Step 1: Write failing selector tests**

```ts
import { describe, expect, it } from "vitest";
import { CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";
import {
  getAdminProductEditor,
  getAdminProductRows,
  getDocumentedOptionSummary
} from "@/features/admin-products";

describe("F3E-B product selectors", () => {
  it("derives exactly one row for every source product", () => {
    const rows = getAdminProductRows();
    expect(rows).toHaveLength(CATALOGUE_PRODUCTS.length);
    expect(rows.map((row) => row.id)).toEqual(
      CATALOGUE_PRODUCTS.map((product) => product.id)
    );
  });

  it("preserves source identity and uses real route helpers", () => {
    const source = CATALOGUE_PRODUCTS[0];
    const row = getAdminProductRows()[0];
    expect(row).toMatchObject({
      id: source.id,
      name: source.name,
      code: source.code,
      familySlug: source.familySlug,
      mediaLabel: source.mediaLabel
    });
    expect(row.publicHref).toBe(`/products/${source.familySlug}/${source.slug}`);
    expect(row.adminHref).toBe(`/admin/products/${source.familySlug}/${source.slug}`);
  });

  it("resolves every known editor and rejects mismatched families", () => {
    for (const product of CATALOGUE_PRODUCTS) {
      expect(getAdminProductEditor(product.familySlug, product.slug)?.product.id).toBe(product.id);
    }
    const product = CATALOGUE_PRODUCTS[0];
    expect(getAdminProductEditor("scissors", product.slug)).toBeUndefined();
  });

  it("deduplicates documented options and provides an explicit fallback", () => {
    const source = CATALOGUE_PRODUCTS[0];
    expect(getDocumentedOptionSummary(source).length).toBeGreaterThan(0);
    expect(getDocumentedOptionSummary({
      ...source,
      sizes: [],
      variants: [],
      directions: [],
      primaryOption: undefined
    })).toEqual(["Not documented in source"]);
  });

  it("does not introduce unsupported workflow fields", () => {
    const serialized = JSON.stringify(getAdminProductRows());
    expect(serialized).not.toMatch(/published|draft|review|visible|featured|updatedAt|arabicComplete/i);
  });
});
```

- [ ] **Step 2: Run the focused test and confirm failure**

```bash
pnpm --filter @rosa/web test -- admin-product-model.test.ts
```

- [ ] **Step 3: Define the exact product view-model interfaces**

```ts
import type { Route } from "next";
import type {
  CatalogueFamilyRecord,
  CatalogueProductRecord
} from "@/features/catalogue-registry";

export interface AdminProductRow {
  id: string;
  name: string;
  code: string;
  familySlug: CatalogueProductRecord["familySlug"];
  familyName: string;
  optionSummary: readonly string[];
  catalogueReference: string;
  mediaLabel: string;
  publicHref: Route<string>;
  familyHref: Route<string>;
  adminHref: Route<string>;
}

export interface AdminProductCompletenessItem {
  key:
    | "name"
    | "code"
    | "family"
    | "description"
    | "options"
    | "catalogue"
    | "arabic"
    | "media";
  label: string;
  state: "Present" | "Not supplied" | "Not registered";
}

export interface AdminProductEditorModel {
  family: CatalogueFamilyRecord;
  product: CatalogueProductRecord;
  publicHref: Route<string>;
  publicFamilyHref: Route<string>;
  adminCatalogueHref: Route<string>;
  optionGroups: readonly {
    key: "sizes" | "variants" | "directions" | "primary";
    label: string;
    values: readonly string[];
  }[];
  completeness: readonly AdminProductCompletenessItem[];
}
```

- [ ] **Step 4: Implement option and catalogue-reference derivation**

```ts
export function getDocumentedOptionSummary(
  product: CatalogueProductRecord
): readonly string[] {
  const values = [
    ...product.sizes,
    ...product.variants,
    ...product.directions,
    product.primaryOption
  ].filter((value): value is string => Boolean(value?.trim()));

  const unique = [...new Set(values)];
  return unique.length > 0 ? unique : ["Not documented in source"];
}

function formatCatalogueReference(product: CatalogueProductRecord): string {
  const page = product.catalogueReference.page?.trim();
  return page
    ? `${product.catalogueReference.family} · ${page}`
    : product.catalogueReference.family;
}
```

- [ ] **Step 5: Implement rows and editor selector**

Use a `Map` derived from `CATALOGUE_FAMILIES`; do not create a copied family constant. `getAdminProductEditor()` must call `getProductDetailModel()` and return `undefined` unless it returns `kind: "product"`.

Completeness states:

- name/code/family/catalogue: `Present`
- description: `Present` or `Not supplied`
- options: `Present` unless all option arrays and `primaryOption` are empty, then `Not supplied`
- Arabic: always `Not supplied`
- managed media: always `Not registered`

- [ ] **Step 6: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-product-model.test.ts
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-products apps/web/src/test/admin-product-model.test.ts
git commit -m "feat: derive F3E-B product admin models"
```

---

### Task 3: Build the Products list composition

**Files:**
- Create: `apps/web/src/features/admin-products/admin-products-list-page.tsx`
- Create: `apps/web/src/test/admin-products-pages.test.tsx`
- Modify: `apps/web/src/features/admin-products/index.ts`

**Interfaces:**
- Consumes: `getAdminProductRows()`, `getAdminFamilyRows()` after Task 5 is not yet available, so the Products page derives its family summary locally from `CATALOGUE_FAMILIES` and the already-created product rows only in this task. Task 5 later replaces that local mapping with `getAdminFamilyRows()` without changing rendered output.
- Produces: `AdminProductsListPage`.

- [ ] **Step 1: Write the failing composition test**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";
import { AdminProductsListPage } from "@/features/admin-products";

describe("F3E-B products list", () => {
  it("renders one heading and source-backed catalogue records", () => {
    const html = renderToStaticMarkup(<AdminProductsListPage />);
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain("Manage the instrument catalogue.");
    expect(html).toContain(`${CATALOGUE_PRODUCTS.length} source products`);
    for (const product of CATALOGUE_PRODUCTS) {
      expect(html).toContain(product.name);
      expect(html).toContain(product.code);
      expect(html).toContain(`/admin/products/${product.familySlug}/${product.slug}`);
      expect(html).toContain(`/products/${product.familySlug}/${product.slug}`);
    }
  });

  it("keeps every collection control noninteractive", () => {
    const html = renderToStaticMarkup(<AdminProductsListPage />);
    expect(html).not.toContain("<form");
    expect(html).toContain("readonly");
    expect((html.match(/disabled/g) ?? []).length).toBeGreaterThanOrEqual(4);
    expect(html).not.toContain("data-preview-only");
  });

  it("does not show unsupported workflow or demonstration data", () => {
    const html = renderToStaticMarkup(<AdminProductsListPage />);
    expect(html).not.toMatch(/126 products|Duplicate Code Record|Needs review|Blocking error|Today|Yesterday|Featured:/i);
    expect(html).not.toMatch(/EN complete|AR complete|AR in progress/i);
  });
});
```

- [ ] **Step 2: Run the test and confirm failure**

```bash
pnpm --filter @rosa/web test -- admin-products-pages.test.tsx
```

- [ ] **Step 3: Implement the table columns**

Use `AdminDataTable<AdminProductRow>` with columns:

1. `Product` — name, code and neutral `ProductMediaPlaceholder` labelled with `mediaLabel`; the placeholder is not an uploaded thumbnail.
2. `Family` — family name and public family link.
3. `Documented options` — joined option summary.
4. `Catalogue reference` — formatted source reference.
5. `Media requirement` — source `mediaLabel`.
6. `Record` — `AdminStatusBadge tone="neutral"` with `Source record`.
7. `Actions` — real `View public` and `Open editor` links.

Use `captionVisibility="screen-reader"`. Do not add selection, sort or bulk controls.

- [ ] **Step 4: Implement the page composition**

Required order:

1. `AdminPageHeader` with eyebrow `Products`, title `Manage the instrument catalogue.`, source-registry description and disabled `Add product` button.
2. `AdminAlert` warning: `Static source registry` and copy stating this is not a live CMS.
3. `AdminToolbar` with `AdminSearchPreview` and disabled family filter using family names.
4. Count text: `${rows.length} source products`.
5. Product table/mobile list.
6. Disabled `AdminPaginationPreview`.
7. Family summary cards derived from current source rows and family records.

The family summary displays sequence, name, derived count, public family link and admin family link. Do not display featured, visibility, media or publication state.

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-products-pages.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-products apps/web/src/test/admin-products-pages.test.tsx
git commit -m "feat: build F3E-B products list"
```

---

### Task 4: Build the read-only Product editor and isolated Product previews

**Files:**
- Create: `apps/web/src/features/admin-products/admin-product-options.tsx`
- Create: `apps/web/src/features/admin-products/admin-product-completeness.tsx`
- Create: `apps/web/src/features/admin-products/admin-product-editor-page.tsx`
- Create: `apps/web/src/features/admin-products/admin-product-preview-states.tsx`
- Modify: `apps/web/src/features/admin-products/index.ts`
- Modify: `apps/web/src/test/admin-products-pages.test.tsx`

**Interfaces:**
- Consumes: `AdminProductEditorModel`, F3E-A fields/sections/status/alerts, `ProductMediaPlaceholder`, `Button`, `ButtonLink`.
- Produces: `AdminProductEditorPage`, `AdminProductOptions`, `AdminProductCompleteness`, and nine isolated Product preview components.

- [ ] **Step 1: Add failing editor tests**

```tsx
import { getAdminProductEditor } from "@/features/admin-products";

it("renders a source-backed product editor without mutation behavior", () => {
  const model = getAdminProductEditor("knives", "scalpel-handle-no-3");
  expect(model).toBeDefined();
  const html = renderToStaticMarkup(<AdminProductEditorPage model={model!} />);
  expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
  expect(html).toContain(model!.product.name);
  expect(html).toContain(model!.product.code);
  expect(html).toContain("Not supplied");
  expect(html).toContain("No managed media file is registered");
  expect(html).toContain("current source-backed public composition");
  expect(html).not.toContain("<form");
  expect(html).not.toContain("data-preview-only");
  expect(html).not.toMatch(/Last saved|Draft differs|Needs review|Publishable|Approved|Complete record/i);
});

it("disables every future product mutation", () => {
  const model = getAdminProductEditor("knives", "scalpel-handle-no-3")!;
  const html = renderToStaticMarkup(<AdminProductEditorPage model={model} />);
  for (const label of [
    "Save draft",
    "Submit for review",
    "Publish",
    "Archive",
    "Delete",
    "Add option",
    "Upload media",
    "Replace media"
  ]) {
    expect(html).toContain(label);
  }
  expect((html.match(/disabled/g) ?? []).length).toBeGreaterThanOrEqual(8);
});
```

- [ ] **Step 2: Add failing preview-boundary tests**

```tsx
import {
  AdminProductArchiveConfirmationPreview,
  AdminProductDuplicateCodePreview,
  AdminProductListLoadingPreview,
  AdminProductMissingImagePreview,
  AdminProductNoMatchesPreview,
  AdminProductPublishConfirmationPreview,
  AdminProductSensitiveClaimPreview,
  AdminProductTitleWarningPreview,
  AdminProductsLoadFailurePreview
} from "@/features/admin-products";

it("marks every product operational state as preview-only and truthful", () => {
  const html = renderToStaticMarkup(
    <>
      <AdminProductListLoadingPreview />
      <AdminProductNoMatchesPreview />
      <AdminProductsLoadFailurePreview />
      <AdminProductDuplicateCodePreview />
      <AdminProductMissingImagePreview />
      <AdminProductTitleWarningPreview />
      <AdminProductSensitiveClaimPreview />
      <AdminProductArchiveConfirmationPreview />
      <AdminProductPublishConfirmationPreview />
    </>
  );
  expect((html.match(/data-preview-only=/g) ?? [])).toHaveLength(9);
  expect(html).toContain("No validation or operation occurred");
  expect(html).not.toMatch(/Saved successfully|Published successfully|Deleted successfully/i);
});
```

- [ ] **Step 3: Implement documented option groups**

`AdminProductOptions` renders one section per option group. Each group uses a heading and `<ul>`; an empty group displays `Not documented in source`. Disabled `Reorder` and `Remove` controls may appear only beside real values and must have no handlers. One disabled `Add option` button appears after all groups.

- [ ] **Step 4: Implement the source-completeness checklist**

Render an `<ol className="admin-source-checklist">`. Each item contains the source-presence label and `AdminStatusBadge`:

- `Present` → neutral tone
- `Not supplied` → warning tone
- `Not registered` → warning tone

Heading copy: `Source presence`. Description: `This checklist describes fields present in the current registry. It is not a publishing or approval decision.`

- [ ] **Step 5: Implement the editor composition**

Required sections:

1. Header with product name, `Source record`, public product link and public family link.
2. Static-registry warning.
3. Identity using `AdminLocaleFieldPair` for name; Arabic value `Not supplied`; read-only code/family fields; paired descriptions where English uses source/fallback and Arabic is `Not supplied`.
4. Documented options.
5. Catalogue reference with source family/page, admin catalogue link and public family link.
6. Media requirement with neutral `ProductMediaPlaceholder`, source `mediaLabel`, `No managed media file is registered`, disabled upload/replace.
7. Public context with real public links and explicit current-source wording.
8. Source-presence checklist.
9. Disabled action bar: Save draft, Submit for review, Publish, Archive and Delete.

Do not render a native form or tabs that imply editable sections.

- [ ] **Step 6: Implement isolated previews**

Each preview renders `<section data-preview-only="true">`, one `<h2>`, and exact disclaimer `No validation or operation occurred in this static preview.`

Preview titles:

- `Product-list loading preview`
- `No-matching-products preview`
- `Product data-load failure preview`
- `Duplicate-code validation preview`
- `Missing-image validation preview`
- `Long-title warning preview`
- `Sensitive-claim warning preview`
- `Archive or delete confirmation preview`
- `Publish confirmation preview`

Confirmation buttons remain disabled.

- [ ] **Step 7: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-products-pages.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-products apps/web/src/test/admin-products-pages.test.tsx
git commit -m "feat: build F3E-B product source editor"
```

---

### Task 5: Build Family selectors, list and editor

**Files:**
- Create: `apps/web/src/features/admin-families/admin-family-model.ts`
- Create: `apps/web/src/features/admin-families/admin-families-page.tsx`
- Create: `apps/web/src/features/admin-families/admin-family-editor-page.tsx`
- Create: `apps/web/src/features/admin-families/index.ts`
- Create: `apps/web/src/test/admin-family-model.test.ts`
- Create: `apps/web/src/test/admin-families-pages.test.tsx`
- Modify: `apps/web/src/features/admin-products/admin-products-list-page.tsx` — use `getAdminFamilyRows()` for summary cards.

**Interfaces:**
- Consumes: `CATALOGUE_FAMILIES`, `CATALOGUE_PRODUCTS`, `getFamilyListingModel`, `getCatalogueDocument`, public/admin href helpers.
- Produces: `AdminFamilyRow`, `AdminFamilyEditorModel`, `getAdminFamilyRows()`, `getAdminFamilyEditor(familySlug)`, `AdminFamiliesPage`, `AdminFamilyEditorPage`.

- [ ] **Step 1: Write failing model tests**

```ts
import { describe, expect, it } from "vitest";
import {
  CATALOGUE_FAMILIES,
  CATALOGUE_PRODUCTS
} from "@/features/catalogue-registry";
import {
  getAdminFamilyEditor,
  getAdminFamilyRows
} from "@/features/admin-families";

describe("F3E-B family selectors", () => {
  it("derives all families and product counts from source", () => {
    const rows = getAdminFamilyRows();
    expect(rows).toHaveLength(CATALOGUE_FAMILIES.length);
    expect(rows.reduce((sum, row) => sum + row.productCount, 0)).toBe(CATALOGUE_PRODUCTS.length);
    for (const row of rows) {
      expect(row.productCount).toBe(
        CATALOGUE_PRODUCTS.filter((product) => product.familySlug === row.slug).length
      );
    }
  });

  it("resolves every known family editor and no unknown family", () => {
    for (const family of CATALOGUE_FAMILIES) {
      const editor = getAdminFamilyEditor(family.slug);
      expect(editor?.family.slug).toBe(family.slug);
      expect(editor?.products).toHaveLength(
        CATALOGUE_PRODUCTS.filter((product) => product.familySlug === family.slug).length
      );
    }
    expect(getAdminFamilyEditor("unknown")).toBeUndefined();
  });
});
```

- [ ] **Step 2: Write failing page tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { CATALOGUE_FAMILIES } from "@/features/catalogue-registry";
import {
  AdminFamiliesPage,
  AdminFamilyEditorPage,
  getAdminFamilyEditor
} from "@/features/admin-families";

it("renders five source-backed family cards", () => {
  const html = renderToStaticMarkup(<AdminFamiliesPage />);
  expect((html.match(/data-admin-family-card=/g) ?? [])).toHaveLength(CATALOGUE_FAMILIES.length);
  for (const family of CATALOGUE_FAMILIES) {
    expect(html).toContain(family.name);
    expect(html).toContain(family.introduction);
    expect(html).toContain(`/admin/families/${family.slug}`);
    expect(html).toContain(`/products/${family.slug}`);
  }
  expect(html).not.toContain("data-preview-only");
});

it("renders a read-only family editor", () => {
  const model = getAdminFamilyEditor("knives")!;
  const html = renderToStaticMarkup(<AdminFamilyEditorPage model={model} />);
  expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
  expect(html).toContain(model.family.name);
  expect(html).toContain("Not supplied");
  expect(html).toContain("No managed asset registered");
  expect(html).toContain("Awaiting publication");
  expect(html).not.toContain("<form");
  expect(html).not.toMatch(/Featured products|Published|Last updated/i);
});
```

- [ ] **Step 3: Implement model interfaces and selectors**

```ts
export interface AdminFamilyRow {
  slug: CatalogueFamilyRecord["slug"];
  sequence: CatalogueFamilyRecord["sequence"];
  name: string;
  introduction: string;
  catalogueLabel: string;
  productCount: number;
  publicHref: Route<string>;
  adminHref: Route<string>;
}

export interface AdminFamilyEditorModel {
  family: CatalogueFamilyRecord;
  products: readonly CatalogueProductRecord[];
  productCount: number;
  publicHref: Route<string>;
  adminCatalogueHref: Route<string>;
  pdfAvailability: "Public PDF path registered" | "Awaiting publication";
}
```

`getAdminFamilyEditor()` calls `getFamilyListingModel()` and `getCatalogueDocument()`. It returns `undefined` unless both family and document resolve.

- [ ] **Step 4: Implement the list page**

Render:

- Header `Families` / `Organise the five instrument families.`
- Static source warning.
- Disabled Add family button.
- Five cards with `data-admin-family-card="true"`.
- Sequence, name, introduction, catalogue label, derived product count, public and editor links.

No media, publication, visibility or featured state appears.

- [ ] **Step 5: Implement the family editor**

Sections:

1. Header and real public/admin catalogue links.
2. English/Arabic name pair; Arabic `Not supplied`.
3. English/Arabic introduction pair; Arabic `Not supplied`.
4. Read-only sequence and catalogue label.
5. Product membership list containing all source products and links to their admin editors.
6. Family imagery requirement: `Family imagery requirement — no managed asset registered`.
7. Catalogue PDF availability from `pdfPath` only.
8. Disabled actions: Save draft, Preview family changes, Publish changes, Select featured products, Upload hero media, Replace catalogue PDF.

No featured assignments are rendered.

- [ ] **Step 6: Replace Products-page family summary derivation**

Import `getAdminFamilyRows()` and render those rows, removing any duplicate family-count mapping from `AdminProductsListPage`.

- [ ] **Step 7: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-family-model.test.ts admin-families-pages.test.tsx admin-products-pages.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-families apps/web/src/features/admin-products/admin-products-list-page.tsx apps/web/src/test/admin-family-model.test.ts apps/web/src/test/admin-families-pages.test.tsx
git commit -m "feat: build F3E-B family management compositions"
```

---

### Task 6: Build Catalogue selectors, list, detail and isolated replacement previews

**Files:**
- Create: `apps/web/src/features/admin-catalogues/admin-catalogue-model.ts`
- Create: `apps/web/src/features/admin-catalogues/admin-catalogues-page.tsx`
- Create: `apps/web/src/features/admin-catalogues/admin-catalogue-detail-page.tsx`
- Create: `apps/web/src/features/admin-catalogues/admin-catalogue-preview-states.tsx`
- Create: `apps/web/src/features/admin-catalogues/index.ts`
- Create: `apps/web/src/test/admin-catalogue-model.test.ts`
- Create: `apps/web/src/test/admin-catalogues-pages.test.tsx`

**Interfaces:**
- Consumes: `CATALOGUE_DOCUMENTS`, `CATALOGUE_FAMILIES`, `getCatalogueDocument`, admin/public href helpers.
- Produces: `AdminCatalogueAvailability`, `AdminCatalogueRow`, `AdminCatalogueEditorModel`, `getAdminCatalogueRows()`, `getAdminCatalogueEditor(familySlug)`, list/detail pages and five isolated previews.

- [ ] **Step 1: Write failing selector tests**

```ts
import { describe, expect, it } from "vitest";
import { CATALOGUE_DOCUMENTS } from "@/features/catalogues";
import {
  getAdminCatalogueEditor,
  getAdminCatalogueRows
} from "@/features/admin-catalogues";

describe("F3E-B catalogue selectors", () => {
  it("derives exactly one admin row for each catalogue document", () => {
    const rows = getAdminCatalogueRows();
    expect(rows).toHaveLength(CATALOGUE_DOCUMENTS.length);
    expect(rows.map((row) => row.familySlug)).toEqual(
      CATALOGUE_DOCUMENTS.map((document) => document.familySlug)
    );
  });

  it("derives availability only from pdfPath", () => {
    for (const document of CATALOGUE_DOCUMENTS) {
      const editor = getAdminCatalogueEditor(document.familySlug)!;
      expect(editor.availability).toBe(
        document.pdfPath ? "Public PDF path registered" : "Awaiting publication"
      );
    }
  });

  it("rejects unknown catalogue families", () => {
    expect(getAdminCatalogueEditor("unknown")).toBeUndefined();
  });
});
```

- [ ] **Step 2: Write failing composition and preview tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import {
  AdminCatalogueDetailPage,
  AdminCatalogueProcessingPreview,
  AdminCatalogueReplacementFailurePreview,
  AdminCatalogueReplacementPendingPreview,
  AdminCataloguesPage,
  AdminCatalogueSafeReplacementPreview,
  AdminCatalogueUploadSelectionPreview,
  getAdminCatalogueEditor
} from "@/features/admin-catalogues";

it("renders five catalogue records without fake file metadata", () => {
  const html = renderToStaticMarkup(<AdminCataloguesPage />);
  expect((html.match(/data-admin-catalogue-row=/g) ?? [])).toHaveLength(5);
  expect(html).not.toMatch(/\.pdf|\bKB\b|\bMB\b|Processing|Replacement pending|Upload failed|Today|Yesterday/i);
  expect(html).not.toContain("data-preview-only");
});

it("renders a truthful catalogue detail", () => {
  const model = getAdminCatalogueEditor("knives")!;
  const html = renderToStaticMarkup(<AdminCatalogueDetailPage model={model} />);
  expect(html).toContain(model.document.name);
  expect(html).toContain(model.availability);
  expect(html).toContain("No upload or replacement operation is active");
  expect(html).not.toContain("<form");
  expect((html.match(/disabled/g) ?? []).length).toBeGreaterThanOrEqual(5);
});

it("keeps upload and replacement states isolated", () => {
  const html = renderToStaticMarkup(
    <>
      <AdminCatalogueUploadSelectionPreview />
      <AdminCatalogueProcessingPreview />
      <AdminCatalogueReplacementPendingPreview />
      <AdminCatalogueReplacementFailurePreview />
      <AdminCatalogueSafeReplacementPreview />
    </>
  );
  expect((html.match(/data-preview-only=/g) ?? [])).toHaveLength(5);
  expect(html).toContain("No upload or replacement occurred");
});
```

- [ ] **Step 3: Implement catalogue view models**

```ts
export type AdminCatalogueAvailability =
  | "Public PDF path registered"
  | "Awaiting publication";

export interface AdminCatalogueRow {
  familySlug: CatalogueDocument["familySlug"];
  sequence: CatalogueDocument["sequence"];
  familyName: string;
  name: string;
  description: string;
  coverLabel: string;
  sourceStatus: CatalogueDocument["sourceStatus"];
  availability: AdminCatalogueAvailability;
  publicCataloguesHref: Route<string>;
  publicFamilyHref: Route<string>;
  adminHref: Route<string>;
}

export interface AdminCatalogueEditorModel {
  family: CatalogueFamilyRecord;
  document: CatalogueDocument;
  availability: AdminCatalogueAvailability;
  publicCataloguesHref: Route<string>;
  publicFamilyHref: Route<string>;
}
```

Availability depends only on the presence of `document.pdfPath`.

- [ ] **Step 4: Implement the Catalogues list**

Render:

- Header `Catalogues` / `Maintain technical document records.`
- Disabled Upload catalogue action.
- Static source warning.
- Read-only search and disabled availability filter.
- Five semantic table/mobile rows with `data-admin-catalogue-row="true"`.
- Family/name/description/cover label/source classification/PDF availability.
- Real public catalogues, public family and admin detail links.

Do not show filename, size, date, processing, replacement or publication state.

- [ ] **Step 5: Implement the Catalogue detail**

Sections:

1. Header and real public links.
2. Source metadata fields.
3. Cover requirement placeholder labelled with `coverLabel`, not an uploaded cover.
4. PDF availability panel.
5. Safe-replacement policy copy: retain the last verified public file until a replacement succeeds.
6. Explicit copy: `No upload or replacement operation is active in this static composition.`
7. Disabled Upload, Replace, Remove, Publish and Begin safe replacement buttons.

No file input or selected filename appears.

- [ ] **Step 6: Implement isolated previews**

Each uses `data-preview-only="true"` and exact disclaimer `No upload or replacement occurred in this static preview.`

Titles:

- `Catalogue upload-selection preview`
- `Catalogue processing preview`
- `Catalogue replacement-pending preview`
- `Catalogue replacement-failure preview`
- `Safe-replacement confirmation preview`

- [ ] **Step 7: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-catalogue-model.test.ts admin-catalogues-pages.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-catalogues apps/web/src/test/admin-catalogue-model.test.ts apps/web/src/test/admin-catalogues-pages.test.tsx
git commit -m "feat: build F3E-B catalogue management compositions"
```

---

### Task 7: Build the transient Media requirement selector, empty library and isolated warnings

**Files:**
- Create: `apps/web/src/features/admin-media/admin-media-model.ts`
- Create: `apps/web/src/features/admin-media/admin-media-page.tsx`
- Create: `apps/web/src/features/admin-media/admin-media-preview-states.tsx`
- Create: `apps/web/src/features/admin-media/index.ts`
- Create: `apps/web/src/test/admin-media.test.tsx`

**Interfaces:**
- Consumes: `CATALOGUE_PRODUCTS`, `CATALOGUE_DOCUMENTS`, `CATALOGUE_FAMILIES`, admin href helpers.
- Produces: `AdminMediaRequirement`, `getAdminMediaRequirements()`, `AdminMediaPage` and five isolated Media previews.

- [ ] **Step 1: Write failing requirement-selector tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CATALOGUE_FAMILIES, CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";
import { CATALOGUE_DOCUMENTS } from "@/features/catalogues";
import {
  AdminMediaPage,
  getAdminMediaRequirements
} from "@/features/admin-media";

describe("F3E-B media requirements", () => {
  it("derives thirty transient requirements from current source", () => {
    const requirements = getAdminMediaRequirements();
    expect(requirements).toHaveLength(
      CATALOGUE_PRODUCTS.length + CATALOGUE_DOCUMENTS.length + CATALOGUE_FAMILIES.length
    );
    expect(requirements.filter((item) => item.kind === "product")).toHaveLength(20);
    expect(requirements.filter((item) => item.kind === "catalogue-cover")).toHaveLength(5);
    expect(requirements.filter((item) => item.kind === "family-imagery")).toHaveLength(5);
  });

  it("keeps family imagery explicitly derived and excludes ROSA identity", () => {
    const requirements = getAdminMediaRequirements();
    for (const item of requirements.filter((candidate) => candidate.kind === "family-imagery")) {
      expect(item.sourceLabel).toBe("No managed asset registered");
      expect(item.label).toContain("Family imagery requirement");
    }
    expect(requirements.some((item) => /ROSA/i.test(item.label))).toBe(false);
  });

  it("renders an honest empty library rather than asset cards", () => {
    const html = renderToStaticMarkup(<AdminMediaPage />);
    expect((html.match(/data-admin-media-requirement=/g) ?? [])).toHaveLength(30);
    expect(html).toContain("No managed media assets are registered.");
    expect(html).toContain("Protected ROSA identity");
    expect(html).not.toContain("data-preview-only");
    expect(html).not.toMatch(/\.jpg|\.png|\.svg|\.tif|\bKB\b|\bMB\b|\d+ × \d+/i);
  });
});
```

- [ ] **Step 2: Write failing preview tests**

```tsx
import {
  AdminMediaImageInUsePreview,
  AdminMediaPossibleDuplicatePreview,
  AdminMediaProtectedAssetPreview,
  AdminMediaUnsupportedFormatPreview,
  AdminMediaUploadSelectionPreview
} from "@/features/admin-media";

it("keeps media operational states isolated", () => {
  const html = renderToStaticMarkup(
    <>
      <AdminMediaUploadSelectionPreview />
      <AdminMediaUnsupportedFormatPreview />
      <AdminMediaPossibleDuplicatePreview />
      <AdminMediaProtectedAssetPreview />
      <AdminMediaImageInUsePreview />
    </>
  );
  expect((html.match(/data-preview-only=/g) ?? [])).toHaveLength(5);
  expect(html).toContain("No upload, validation or replacement occurred");
});
```

- [ ] **Step 3: Implement the exact requirement union**

```ts
import type { Route } from "next";

export type AdminMediaRequirement =
  | {
      kind: "product";
      key: string;
      label: string;
      sourceLabel: string;
      adminHref: Route<string>;
    }
  | {
      kind: "catalogue-cover";
      key: string;
      label: string;
      sourceLabel: string;
      adminHref: Route<string>;
    }
  | {
      kind: "family-imagery";
      key: string;
      label: string;
      sourceLabel: "No managed asset registered";
      adminHref: Route<string>;
    };
```

`getAdminMediaRequirements()` returns a fresh mapped array. Do not export `ADMIN_MEDIA_ASSETS`, `ADMIN_MEDIA_REQUIREMENTS` or any persistent parallel constant.

Mapping rules:

- Product label: `${product.name} product media requirement`; `sourceLabel: product.mediaLabel`; admin product href.
- Catalogue label: `${document.name} cover requirement`; `sourceLabel: document.coverLabel`; admin catalogue href.
- Family label: `${family.name} family imagery requirement`; `sourceLabel: "No managed asset registered"`; admin family href.

- [ ] **Step 4: Implement the Media page**

Required order:

1. Header `Media library` / `Purpose-led media requirements.` with disabled Upload media.
2. Empty-state `No managed media assets are registered.`
3. Static warning that requirement cards are not asset records.
4. Disabled search, type filter and completeness filter.
5. Three grouped requirement sections with counts 20, 5 and 5 derived from arrays.
6. Each card uses `data-admin-media-requirement="true"`, status `Awaiting managed asset`, source label and real related admin link.
7. Informational protected-identity alert outside the requirement collection.

No filename, dimensions, size, format, alt text, asset ID, upload state or usage history appears.

- [ ] **Step 5: Implement isolated previews**

Each preview uses `data-preview-only="true"` and disclaimer `No upload, validation or replacement occurred in this static preview.`

Titles:

- `Media upload-selection preview`
- `Unsupported-format warning preview`
- `Possible-duplicate warning preview`
- `Protected-asset warning preview`
- `Image-in-use warning preview`

- [ ] **Step 6: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-media.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-media apps/web/src/test/admin-media.test.tsx
git commit -m "feat: build F3E-B media requirement library"
```

---

### Task 8: Implement exact management route resolution and wire the admin catch-all page

**Files:**
- Create: `apps/web/src/features/admin-management-routing/admin-management-route-model.ts`
- Create: `apps/web/src/features/admin-management-routing/admin-management-route-view.tsx`
- Modify: `apps/web/src/features/admin-management-routing/index.ts`
- Modify: `apps/web/src/app/admin/(workspace)/[...segments]/page.tsx`
- Create: `apps/web/src/test/admin-management-routing.test.tsx`

**Interfaces:**
- Consumes: existing catalogue registry resolvers, catalogue documents, all F3E-B selectors/pages, F3E-A `getAdminNavigationItem()` and `AdminDeferredRoutePage`.
- Produces: `AdminManagementRoot`, `ADMIN_MANAGEMENT_ROOTS`, `isAdminManagementRoot(value)`, `AdminManagementRouteResult`, `resolveAdminManagementRoute(segments)`, `AdminManagementRouteView`.

- [ ] **Step 1: Write failing exact-route tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CATALOGUE_FAMILIES, CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";
import {
  AdminManagementRouteView,
  isAdminManagementRoot,
  resolveAdminManagementRoute
} from "@/features/admin-management-routing";

describe("F3E-B management routing", () => {
  it("resolves every approved list and detail shape", () => {
    expect(resolveAdminManagementRoute(["products"]).kind).toBe("products");
    expect(resolveAdminManagementRoute(["families"]).kind).toBe("families");
    expect(resolveAdminManagementRoute(["catalogues"]).kind).toBe("catalogues");
    expect(resolveAdminManagementRoute(["media"]).kind).toBe("media");

    for (const product of CATALOGUE_PRODUCTS) {
      expect(resolveAdminManagementRoute(["products", product.familySlug, product.slug]).kind).toBe("product");
    }
    for (const family of CATALOGUE_FAMILIES) {
      expect(resolveAdminManagementRoute(["families", family.slug]).kind).toBe("family");
      expect(resolveAdminManagementRoute(["catalogues", family.slug]).kind).toBe("catalogue");
    }
  });

  it.each([
    [],
    ["products", "knives"],
    ["products", "knives", "scalpel-handle-no-3", "extra"],
    ["families", "knives", "extra"],
    ["catalogues", "knives", "extra"],
    ["media", "extra"],
    ["products", "scissors", "scalpel-handle-no-3"],
    ["unknown"]
  ])("returns not-found for unsupported shape %j", (segments) => {
    expect(resolveAdminManagementRoute(segments).kind).toBe("not-found");
  });

  it("identifies only the four F3E-B roots", () => {
    expect(["products", "families", "catalogues", "media"].every(isAdminManagementRoot)).toBe(true);
    expect(isAdminManagementRoot("inquiries")).toBe(false);
  });

  it("renders normal routes without preview-only states", () => {
    const result = resolveAdminManagementRoute(["products"]);
    const html = renderToStaticMarkup(<AdminManagementRouteView result={result} />);
    expect(html).not.toContain("data-preview-only");
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run the test and confirm failure**

```bash
pnpm --filter @rosa/web test -- admin-management-routing.test.tsx
```

- [ ] **Step 3: Define exact route types**

```ts
export const ADMIN_MANAGEMENT_ROOTS = [
  "products",
  "families",
  "catalogues",
  "media"
] as const;

export type AdminManagementRoot = (typeof ADMIN_MANAGEMENT_ROOTS)[number];

export type AdminManagementRouteResult =
  | { kind: "products" }
  | { kind: "product"; family: CatalogueFamilyRecord; product: CatalogueProductRecord }
  | { kind: "families" }
  | { kind: "family"; family: CatalogueFamilyRecord; products: readonly CatalogueProductRecord[] }
  | { kind: "catalogues" }
  | { kind: "catalogue"; family: CatalogueFamilyRecord; document: CatalogueDocument }
  | { kind: "media" }
  | { kind: "not-found" };
```

- [ ] **Step 4: Implement the strict resolver**

Use only exact `segments.length` checks:

```ts
export function resolveAdminManagementRoute(
  segments: readonly string[]
): AdminManagementRouteResult {
  if (segments.length === 1 && segments[0] === "products") return { kind: "products" };
  if (segments.length === 3 && segments[0] === "products") {
    const result = getProductDetailModel(segments[1] ?? "", segments[2] ?? "");
    return result.kind === "product"
      ? { kind: "product", family: result.family, product: result.product }
      : { kind: "not-found" };
  }
  if (segments.length === 1 && segments[0] === "families") return { kind: "families" };
  if (segments.length === 2 && segments[0] === "families") {
    const result = getFamilyListingModel(segments[1] ?? "");
    return result.kind === "family"
      ? { kind: "family", family: result.family, products: result.products }
      : { kind: "not-found" };
  }
  if (segments.length === 1 && segments[0] === "catalogues") return { kind: "catalogues" };
  if (segments.length === 2 && segments[0] === "catalogues") {
    const familyResult = getFamilyListingModel(segments[1] ?? "");
    const document = getCatalogueDocument(segments[1] ?? "");
    return familyResult.kind === "family" && document
      ? { kind: "catalogue", family: familyResult.family, document }
      : { kind: "not-found" };
  }
  if (segments.length === 1 && segments[0] === "media") return { kind: "media" };
  return { kind: "not-found" };
}
```

- [ ] **Step 5: Implement the route view**

Switch on `result.kind`:

- list kinds render list pages;
- product uses `getAdminProductEditor()` and renders editor or returns `null` only for an impossible registry mismatch;
- family uses `getAdminFamilyEditor()`;
- catalogue uses `getAdminCatalogueEditor()`;
- media renders `AdminMediaPage`;
- not-found returns `null` and is never mounted by the route page.

Keep the component server-compatible.

- [ ] **Step 6: Wire the catch-all page**

```tsx
export default async function Page({ params }: { params: Promise<{ segments: string[] }> }) {
  const { segments } = await params;
  const management = resolveAdminManagementRoute(segments);

  if (management.kind !== "not-found") {
    return <AdminManagementRouteView result={management} />;
  }

  const root = segments[0] ?? "";
  if (isAdminManagementRoot(root)) notFound();

  const pathname = `/admin/${segments.join("/")}`;
  const item = getAdminNavigationItem(pathname);
  if (!item || item.key === "dashboard") notFound();

  return <AdminDeferredRoutePage routeKey={item.key} />;
}
```

This preserves F3E-A placeholders for Inquiries, Messages, Website Content, Contact Details, Publishing, Revisions and Settings while making malformed F3E-B paths strict 404s.

- [ ] **Step 7: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-management-routing.test.tsx admin-product-model.test.ts admin-family-model.test.ts admin-catalogue-model.test.ts
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-management-routing apps/web/src/app/admin/'(workspace)'/'[...segments]'/page.tsx apps/web/src/test/admin-management-routing.test.tsx
git commit -m "feat: route F3E-B catalogue management pages"
```

---

### Task 9: Add responsive F3E-B styling

**Files:**
- Create: `apps/web/src/styles/f3e-b-catalogue-management.css`
- Modify: `apps/web/src/app/globals.css`
- Create: `apps/web/src/test/f3e-b-admin-styles.static.test.mjs`

**Interfaces:**
- Consumes: F3E-B class names and existing Rosa tokens.
- Produces: desktop/tablet/mobile management layouts with no page-level overflow.

- [ ] **Step 1: Write the failing static style test**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(
  new URL("../styles/f3e-b-catalogue-management.css", import.meta.url),
  "utf8"
);
const globals = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("F3E-B styles cover all management domains and breakpoints", () => {
  assert.match(css, /\.admin-products-page/);
  assert.match(css, /\.admin-product-editor/);
  assert.match(css, /\.admin-family-grid/);
  assert.match(css, /\.admin-family-editor/);
  assert.match(css, /\.admin-catalogues-page/);
  assert.match(css, /\.admin-catalogue-detail/);
  assert.match(css, /\.admin-media-page/);
  assert.match(css, /\.admin-media-requirements/);
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.match(css, /@media \(max-width: 520px\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /overflow-wrap:\s*anywhere/);
  assert.match(globals, /@import "\.\.\/styles\/f3e-b-catalogue-management\.css";/);
});
```

- [ ] **Step 2: Run the test and confirm failure**

```bash
node --test apps/web/src/test/f3e-b-admin-styles.static.test.mjs
```

- [ ] **Step 3: Implement styles using existing tokens**

Required layout rules:

- `.admin-products-page`, `.admin-product-editor`, `.admin-families-page`, `.admin-family-editor`, `.admin-catalogues-page`, `.admin-catalogue-detail`, `.admin-media-page`: grid flow with consistent section gaps.
- Product and catalogue tables reuse F3E-A `.admin-data-table` desktop/mobile switching.
- `.admin-family-grid`: five columns at wide desktop, two at tablet, one at mobile.
- `.admin-editor-grid`: two columns desktop, one below 900 px.
- `.admin-option-groups`: two columns desktop, one below 720 px.
- `.admin-source-checklist`: two columns desktop, one mobile.
- `.admin-media-requirements`: three columns desktop, two tablet, one mobile.
- `.admin-management-actions`: wrapping row desktop; full-width stacked controls below 520 px.
- Neutral placeholders use `--color-mist`, `--color-border` and no fake image treatment.
- Requirement cards use paper background, restrained border and no stock-photo styling.
- Long product codes, route links, media labels and catalogue references use `overflow-wrap: anywhere` and `min-width: 0`.
- Disabled controls retain visible disabled styling.
- No fixed-height content panels, fixed sidebar changes, horizontal page scrolling, gradients or glass effects.
- Reduced-motion rule removes nonessential transitions.

Representative rules:

```css
.admin-family-grid,
.admin-media-requirements {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--space-4);
}

.admin-editor-grid,
.admin-option-groups,
.admin-source-checklist {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);
}

@media (max-width: 900px) {
  .admin-family-grid,
  .admin-media-requirements,
  .admin-editor-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .admin-option-groups,
  .admin-source-checklist {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 520px) {
  .admin-family-grid,
  .admin-media-requirements,
  .admin-editor-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
```

- [ ] **Step 4: Import the stylesheet**

Append after F3E-A:

```css
@import "../styles/f3e-b-catalogue-management.css";
```

- [ ] **Step 5: Verify and commit**

```bash
node --test apps/web/src/test/f3e-b-admin-styles.static.test.mjs
pnpm --filter @rosa/web typecheck
git add apps/web/src/styles/f3e-b-catalogue-management.css apps/web/src/app/globals.css apps/web/src/test/f3e-b-admin-styles.static.test.mjs
git commit -m "feat: style F3E-B catalogue management"
```

---

### Task 10: Add policy regression checks and exact browser coverage

**Files:**
- Create: `apps/web/src/test/f3e-b-admin-policy.static.test.mjs`
- Create: `apps/web/tests/e2e/f3e-b-catalogue-management.spec.ts`
- Modify: relevant F3E-B component tests only when a policy gap is discovered.

**Interfaces:**
- Consumes: all normal F3E-B source files and rendered admin routes.
- Produces: no-invention, no-mutation, exact-route and responsive regression evidence.

- [ ] **Step 1: Create the static normal-route policy test**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve("apps/web/src");
const normalFiles = [
  "features/admin-products/admin-product-model.ts",
  "features/admin-products/admin-products-list-page.tsx",
  "features/admin-products/admin-product-editor-page.tsx",
  "features/admin-families/admin-family-model.ts",
  "features/admin-families/admin-families-page.tsx",
  "features/admin-families/admin-family-editor-page.tsx",
  "features/admin-catalogues/admin-catalogue-model.ts",
  "features/admin-catalogues/admin-catalogues-page.tsx",
  "features/admin-catalogues/admin-catalogue-detail-page.tsx",
  "features/admin-media/admin-media-model.ts",
  "features/admin-media/admin-media-page.tsx",
  "features/admin-management-routing/admin-management-route-model.ts",
  "features/admin-management-routing/admin-management-route-view.tsx"
];
const content = (
  await Promise.all(normalFiles.map((file) => readFile(path.join(root, file), "utf8")))
).join("\n");

const prohibited = [
  /126 products/i,
  /Duplicate Code Record/i,
  /Needs review|Blocking error|Secure session/i,
  /\bToday\b|\bYesterday\b|2 days ago/i,
  /EN complete|AR complete|AR in progress/i,
  /knives-catalogue\.pdf|scissors-catalogue\.pdf/i,
  /\b\d+(?:\.\d+)?\s*(?:KB|MB)\b/i,
  /\b\d+\s*[×x]\s*\d+\b/i,
  /type=["']file["']/i,
  /onSubmit=|action=|fetch\(|localStorage|sessionStorage/i,
  /ADMIN_MEDIA_ASSETS|ADMIN_MEDIA_REQUIREMENTS/i,
  /data-preview-only/i
];

test("F3E-B normal source contains no fabricated state or behavior", () => {
  for (const pattern of prohibited) assert.doesNotMatch(content, pattern);
  assert.match(content, /Source record/);
  assert.match(content, /No managed media assets are registered/);
  assert.match(content, /Awaiting publication/);
});
```

Preview files are intentionally excluded from this scan.

- [ ] **Step 2: Add exact Playwright route matrix**

```ts
import { expect, test } from "@playwright/test";

const routes = [
  "/admin/products",
  "/admin/products/knives/scalpel-handle-no-3",
  "/admin/families",
  "/admin/families/knives",
  "/admin/catalogues",
  "/admin/catalogues/knives",
  "/admin/media"
] as const;

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 }
] as const;

for (const viewport of viewports) {
  for (const route of routes) {
    test(`${route} is truthful and overflow-safe at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      const response = await page.goto(route);
      expect(response?.ok()).toBe(true);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("[data-preview-only]")).toHaveCount(0);
      await expect(page.locator("form, input[type=file]")).toHaveCount(0);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      const finalContent = page.locator("main > *").last();
      await finalContent.scrollIntoViewIfNeeded();
      await expect(finalContent).toBeVisible();
    });
  }
}
```

- [ ] **Step 3: Add exact record-count and disabled-control browser checks**

```ts
test("products, families, catalogues and media reflect current source totals", async ({ page }) => {
  await page.goto("/admin/products");
  await expect(page.getByText("20 source products")).toBeVisible();
  await expect(page.locator(".admin-data-table__desktop tbody tr")).toHaveCount(20);

  await page.goto("/admin/families");
  await expect(page.locator("[data-admin-family-card]")).toHaveCount(5);

  await page.goto("/admin/catalogues");
  await expect(page.locator("[data-admin-catalogue-row]")).toHaveCount(5);

  await page.goto("/admin/media");
  await expect(page.locator("[data-admin-media-requirement]")).toHaveCount(30);
  await expect(page.getByText("No managed media assets are registered.")).toBeVisible();
});
```

Check representative mutation buttons are disabled on each editor/detail page.

- [ ] **Step 4: Add strict not-found browser checks**

```ts
for (const route of [
  "/admin/products/knives",
  "/admin/products/scissors/scalpel-handle-no-3",
  "/admin/products/knives/scalpel-handle-no-3/extra",
  "/admin/families/knives/extra",
  "/admin/catalogues/knives/extra",
  "/admin/media/extra"
]) {
  test(`${route} is not found`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
  });
}
```

- [ ] **Step 5: Run focused checks**

```bash
node --test apps/web/src/test/f3e-b-admin-policy.static.test.mjs
node --test apps/web/src/test/f3e-b-admin-styles.static.test.mjs
pnpm --filter @rosa/web test -- admin-management-hrefs.test.ts admin-product-model.test.ts admin-products-pages.test.tsx admin-family-model.test.ts admin-families-pages.test.tsx admin-catalogue-model.test.ts admin-catalogues-pages.test.tsx admin-media.test.tsx admin-management-routing.test.tsx
```

Expected: zero failures. If unavailable, record as not run.

- [ ] **Step 6: Commit verification specifications**

```bash
git add apps/web/src/test/f3e-b-admin-policy.static.test.mjs apps/web/tests/e2e/f3e-b-catalogue-management.spec.ts
git commit -m "test: add F3E-B catalogue management coverage"
```

---

### Task 11: Consolidated verification, source review, completion record and README coordination

**Files:**
- Create: `docs/superpowers/completions/2026-08-01-rosa-medical-f3e-b-catalogue-management.md`
- Update after feature-branch completion: `README.md` on `main`

**Interfaces:**
- Consumes: complete F3E-B branch, tests, branch comparison and current coordination protocol.
- Produces: exact evidence, known limitations and the next F3E-C handoff.

- [ ] **Step 1: Run the complete frontend verification gate before any runtime-success claim**

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
node --test apps/web/src/test/f3c-styles.static.test.mjs
node --test apps/web/src/test/f3d-styles.static.test.mjs
node --test apps/web/src/test/f3d-policy.static.test.mjs
node --test apps/web/src/test/f3e-a-admin-styles.static.test.mjs
node --test apps/web/src/test/f3e-a-admin-policy.static.test.mjs
node --test apps/web/src/test/f3e-b-admin-styles.static.test.mjs
node --test apps/web/src/test/f3e-b-admin-policy.static.test.mjs
pnpm test:e2e
```

Read complete output and record exit codes. If the GitHub-only environment cannot run commands, record every command as not run rather than passed.

- [ ] **Step 2: Review branch containment**

```bash
git diff --name-status frontend/f3e-b-catalogue-management-design...HEAD
git log --oneline frontend/f3e-b-catalogue-management-design..HEAD
```

Confirm:

- only F3E-B frontend features, one existing admin route file, styles, tests and completion documentation changed;
- no backend or OpenAPI files changed;
- all source-backed selectors import the existing registries rather than copied constants;
- no persistent media collection exists;
- all 20 known product routes, 5 family routes and 5 catalogue routes resolve;
- malformed F3E-B paths are strict not-found;
- normal routes mount no preview state;
- no normal route includes a native form, file input, mutation handler or fake operation claim;
- media requirements total 30 and exclude the protected ROSA identity note.

- [ ] **Step 3: Perform a compile-risk and accessibility source review**

Inspect:

- `Route<string>` typing and admin/public href construction;
- server/client boundaries; no client component is needed for static F3E-B pages;
- generic `AdminDataTable` render callbacks;
- exactly one `h1` per route and one `main` from the F3E-A shell;
- no nested interactive controls inside links;
- disabled buttons use `type="button"` through the base `Button`;
- table/mobile record duplication is controlled through CSS `display` switching;
- preview components remain unreferenced by route view;
- route resolver exact segment lengths;
- unknown/mismatched route handling;
- long product codes and media labels wrap safely;
- tests do not count both desktop and hidden mobile representations as one collection.

Correct defects in focused commits before documenting status.

- [ ] **Step 4: Write the completion record**

The record must state:

- implementation branch and source tip;
- design/plan base commit;
- normal route inventory;
- exact source totals and derivation;
- Product, Family, Catalogue and Media composition boundaries;
- strict route behavior;
- isolated preview states;
- unchanged backend/OpenAPI boundary;
- branch comparison;
- commands run and exact results;
- commands not run and reason;
- known limitations;
- next milestone: F3E-C Inquiries and General Messages.

Commit:

```bash
git add docs/superpowers/completions/2026-08-01-rosa-medical-f3e-b-catalogue-management.md
git commit -m "docs: record F3E-B catalogue management status"
```

- [ ] **Step 5: Update the shared README on `main`**

Read the latest `README.md` from `main` immediately before editing. Preserve backend-owned content and prior messages. Update only:

- coordination timestamp;
- G5 frontend evidence to include static source-backed catalogue-management compositions while stating no CRUD/live API exists;
- frontend current status, branch, commit, completed work, verification evidence, next work and blockers;
- current repository state;
- one dated Frontend AI → Backend AI message.

Message facts:

- no OpenAPI or backend change;
- 20 products, 5 families and 5 catalogues derive from existing frontend registries;
- Media is an empty managed-asset state with 30 transient requirements;
- no CRUD, uploads, publishing, authentication or persistence exists;
- G5 remains not started as a live integration gate.

Commit message:

```bash
git commit -m "docs: coordinate F3E-B frontend status"
```

---

## Final Verification Checklist

- [ ] Products list derives exactly 20 rows from `CATALOGUE_PRODUCTS`.
- [ ] Every product row uses the real source name, code, family, options, catalogue reference and media label.
- [ ] All 20 product editor routes resolve and mismatched families return not-found.
- [ ] Product editors contain no save time, publication state, review state, visibility, featured assignment or Arabic-completion claim.
- [ ] Product editor mutation/upload controls are disabled and non-submitting.
- [ ] Families list derives exactly five cards and counts from current product membership.
- [ ] Family editors show source identity, four current products through derivation, unresolved Arabic content, unresolved family imagery and PDF availability from `pdfPath` only.
- [ ] Catalogues list derives exactly five rows from `CATALOGUE_DOCUMENTS`.
- [ ] Catalogue pages contain no invented filenames, sizes, dates, processing, replacement or publication history.
- [ ] Catalogue file-management actions are disabled and no file input exists.
- [ ] Media route states that no managed media assets exist.
- [ ] Media selector derives 20 product, 5 catalogue-cover and 5 family-imagery requirements.
- [ ] Family imagery is labelled as a derived presentation requirement, not a source media field.
- [ ] Protected ROSA identity is informational and excluded from the 30-item requirement count.
- [ ] No persistent media-assets or media-requirements constant is introduced.
- [ ] Preview-only Product, Catalogue and Media states are exported but not mounted by normal routes.
- [ ] Exact route-segment matching rejects every unsupported nested shape.
- [ ] F3E-A deferred routes outside the four F3E-B roots continue to resolve.
- [ ] All normal routes contain one h1, inherit one main and noindex metadata from the F3E-A shell/layout.
- [ ] No normal route contains a native form, file input, API request, storage or mutation handler.
- [ ] Desktop, tablet and mobile routes are page-overflow safe.
- [ ] No `services/api/**` or `packages/contracts/openapi/**` file changed.
- [ ] Completion documentation distinguishes source review from runtime verification.

## Deferred Scope

- Live product, family, catalogue or media CRUD
- Authentication and route guards
- Draft/review/publish state
- Revision history and rollback
- Search, filtering, sorting, pagination and bulk actions
- Product creation and deletion
- Media upload, replacement, duplicate detection, crop review and alt-text editing
- Catalogue PDF upload, processing and safe replacement
- Featured-product assignment
- Arabic content editing
- Live public preview of unpublished drafts
- Backend API integration
