# Rosa Medical F3C — Catalogues, Inquiry and Quotation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the complete static F3C procurement path at `/catalogues`, `/inquiry`, and `/request-quotation`, with truthful empty and blocked public states plus reusable unmounted inquiry and quotation preview compositions.

**Architecture:** F3C derives catalogue documents and fixed preview lines from the existing F3B catalogue registry. Public routing mounts only the catalogue page, empty inquiry page, and blocked quotation page. Populated inquiry, quotation form, validation, failure, and success previews remain directly testable server components without public preview routes, state mutation, API calls, or OpenAPI changes.

**Tech Stack:** Next.js 16.2.11 App Router, React 19.2, strict TypeScript 5.9, the existing Rosa CSS token system with Tailwind CSS 4 available but no Tailwind utility reconstruction, Vitest 3.2, Node static tests, and Playwright 1.57.

## Global Constraints

- Work from `frontend/f3c-catalogues-inquiry-design` and create `frontend/f3c-catalogues-inquiry` for implementation.
- Public logo text remains `ROSA` only.
- Keep `PublicShell` as the sole `<main>` owner.
- Each upgraded public route renders exactly one `<h1>`.
- Do not expose preview routes such as `/inquiry/preview` or `/request-quotation/success`.
- Do not add client state, local storage, cookies, mutation handlers, server actions, API calls, idempotency keys, email behavior, or backend code.
- Do not alter `packages/contracts/openapi/**` or Contract 0.1.
- Do not fabricate selected products, catalogue dates, downloadable PDF URLs, submission success, email delivery, or request references.
- Do not show monetary pricing, checkout, payment, shipping, stock, discounts, order totals, or purchase language.
- Product counts and total quantities are allowed.
- Product names, codes, sizes, variants, and directions come from the existing F3B catalogue registry.
- Missing PDF paths render a disabled explanatory control, never an anchor with an empty or fake `href`.
- Public `/inquiry` renders the empty state.
- Public `/request-quotation` renders the blocked state.
- Preview controls use native `disabled`, `readOnly`, `<output>`, label, `aria-invalid`, and `aria-describedby` semantics.
- Product media remains neutral and replaceable.
- Reuse Lora, Inter, and the existing Rosa token values.
- Implement responsive layouts with grid and document flow, not absolute-position copies of generated Figma code.
- Runtime verification must not be claimed until commands run with zero failures.

## File Map

### Existing files to modify

- `apps/web/src/features/public-routing/resolve-public-page.tsx` — add the three truthful F3C public page kinds.
- `apps/web/src/test/public-route-dispatch.test.ts` — verify F3C dispatch and preserve F3A/F3B behavior.
- `apps/web/src/app/globals.css` — import the F3C stylesheet.
- `apps/web/tests/e2e/route-smoke.spec.ts` — preserve the one-main/one-h1 invariant.
- `README.md` on `main` after the implementation review — record exact status without changing backend-owned architecture fields.

### New catalogue files

- `apps/web/src/features/catalogues/catalogue-document-model.ts`
- `apps/web/src/features/catalogues/catalogue-cover.tsx`
- `apps/web/src/features/catalogues/catalogue-card.tsx`
- `apps/web/src/features/catalogues/catalogue-grid.tsx`
- `apps/web/src/features/catalogues/catalogue-guidance.tsx`
- `apps/web/src/features/catalogues/catalogues-page.tsx`

### New inquiry-preview files

- `apps/web/src/features/inquiry-preview/inquiry-preview-model.ts`
- `apps/web/src/features/inquiry-preview/inquiry-line-preview.tsx`
- `apps/web/src/features/inquiry-preview/inquiry-summary-preview.tsx`
- `apps/web/src/features/inquiry-preview/general-request-preview.tsx`
- `apps/web/src/features/inquiry-preview/populated-inquiry-preview.tsx`
- `apps/web/src/features/inquiry-preview/empty-inquiry-page.tsx`
- `apps/web/src/features/inquiry-preview/index.ts`

### New quotation-preview files

- `apps/web/src/features/quotation-preview/quotation-field-preview.tsx`
- `apps/web/src/features/quotation-preview/quotation-product-summary.tsx`
- `apps/web/src/features/quotation-preview/quotation-validation-preview.tsx`
- `apps/web/src/features/quotation-preview/quotation-failure-preview.tsx`
- `apps/web/src/features/quotation-preview/quotation-form-preview.tsx`
- `apps/web/src/features/quotation-preview/quotation-success-preview.tsx`
- `apps/web/src/features/quotation-preview/quotation-blocked-page.tsx`
- `apps/web/src/features/quotation-preview/index.ts`

### New styles and tests

- `apps/web/src/styles/f3c-pages.css`
- `apps/web/src/test/catalogue-documents.test.ts`
- `apps/web/src/test/inquiry-preview.test.tsx`
- `apps/web/src/test/quotation-preview.test.tsx`
- `apps/web/src/test/f3c-page-composition.test.tsx`
- `apps/web/src/test/f3c-styles.static.test.mjs`
- `apps/web/tests/e2e/f3c-procurement-pages.spec.ts`
- `docs/superpowers/completions/2026-08-01-rosa-medical-f3c-catalogues-inquiry.md`

---

### Task 1: Create the implementation branch and catalogue document model

**Files:**
- Create: `apps/web/src/features/catalogues/catalogue-document-model.ts`
- Create: `apps/web/src/test/catalogue-documents.test.ts`

**Interfaces:**
- Consumes: `CATALOGUE_FAMILIES`, `CatalogueFamilyRecord`, and `familyHref`.
- Produces: `CatalogueDocument`, `CATALOGUE_DOCUMENTS`, and `getCatalogueDocument`.

- [ ] **Step 1: Create the implementation branch**

```bash
git fetch origin
git switch frontend/f3c-catalogues-inquiry-design
git pull --ff-only
git switch -c frontend/f3c-catalogues-inquiry
```

- [ ] **Step 2: Write the failing document-model test**

```ts
import { describe, expect, it } from "vitest";
import {
  CATALOGUE_DOCUMENTS,
  getCatalogueDocument
} from "@/features/catalogues/catalogue-document-model";

const descriptions = {
  knives: "Precision cutting instruments and handles.",
  scissors: "Scissors organised by listed pattern, size and configuration.",
  punches: "Punch instruments organised by pattern and dimensions.",
  chisels: "Chisels and osteotomes organised by form and size.",
  cutters: "Cutting instruments organised by pattern, size and direction."
} as const;

describe("F3C catalogue documents", () => {
  it("derives one ordered document for every registered family", () => {
    expect(CATALOGUE_DOCUMENTS.map((document) => document.sequence)).toEqual([
      "01", "02", "03", "04", "05"
    ]);
    expect(CATALOGUE_DOCUMENTS).toHaveLength(5);
  });

  it("uses restrained approved descriptions and no fabricated PDF path", () => {
    for (const document of CATALOGUE_DOCUMENTS) {
      expect(document.description).toBe(descriptions[document.familySlug]);
      expect(document.pdfPath).toBeUndefined();
      expect(document.familyHref).toBe(`/products/${document.familySlug}`);
    }
  });

  it("looks up a known family and rejects an unknown family", () => {
    expect(getCatalogueDocument("knives")?.name).toBe("Knives");
    expect(getCatalogueDocument("unknown")).toBeUndefined();
  });
});
```

- [ ] **Step 3: Verify the red state**

```bash
pnpm --filter @rosa/web test -- catalogue-documents.test.ts
```

Expected: failure because `catalogue-document-model.ts` does not exist.

- [ ] **Step 4: Implement the document model**

```ts
import type { Route } from "next";
import {
  CATALOGUE_FAMILIES,
  type CatalogueFamilyRecord
} from "@/features/catalogue-registry";
import { familyHref, type FamilySlug } from "@/features/public-catalogue";

export interface CatalogueDocument {
  familySlug: FamilySlug;
  sequence: CatalogueFamilyRecord["sequence"];
  name: string;
  description: string;
  coverLabel: string;
  sourceStatus: "Technical family catalogue";
  familyHref: Route<`/products/${FamilySlug}`>;
  pdfPath?: Route<string>;
}

const DESCRIPTION_BY_FAMILY: Record<FamilySlug, string> = {
  knives: "Precision cutting instruments and handles.",
  scissors: "Scissors organised by listed pattern, size and configuration.",
  punches: "Punch instruments organised by pattern and dimensions.",
  chisels: "Chisels and osteotomes organised by form and size.",
  cutters: "Cutting instruments organised by pattern, size and direction."
};

export const CATALOGUE_DOCUMENTS = CATALOGUE_FAMILIES.map((family) => ({
  familySlug: family.slug,
  sequence: family.sequence,
  name: family.name,
  description: DESCRIPTION_BY_FAMILY[family.slug],
  coverLabel: `${family.name} technical catalogue`,
  sourceStatus: "Technical family catalogue" as const,
  familyHref: familyHref(family.slug)
})) satisfies readonly CatalogueDocument[];

export function getCatalogueDocument(familySlug: string) {
  return CATALOGUE_DOCUMENTS.find((document) => document.familySlug === familySlug);
}
```

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- catalogue-documents.test.ts
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/catalogues/catalogue-document-model.ts apps/web/src/test/catalogue-documents.test.ts
git commit -m "feat: define F3C catalogue documents"
```

---

### Task 2: Build catalogue cards and the `/catalogues` composition

**Files:**
- Create all catalogue components listed in the file map.
- Modify: `apps/web/src/test/catalogue-documents.test.ts`

**Interfaces:**
- Consumes: `CatalogueDocument`, `CATALOGUE_DOCUMENTS`, `ButtonLink`, `Container`, and `Section`.
- Produces: `CatalogueCover`, `CatalogueCard`, `CatalogueGrid`, `CatalogueGuidance`, and `CataloguesPage`.

- [ ] **Step 1: Add failing component assertions**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { CatalogueCard } from "@/features/catalogues/catalogue-card";
import { CataloguesPage } from "@/features/catalogues/catalogues-page";

it("renders a real family link and a native disabled PDF control", () => {
  const html = renderToStaticMarkup(
    <CatalogueCard document={CATALOGUE_DOCUMENTS[0]} featured />
  );
  expect(html).toContain('href="/products/knives"');
  expect(html).toContain("PDF not available online");
  expect(html).toContain("disabled");
  expect(html).not.toContain('href=""');
  expect(html).not.toContain("[Month Year]");
});

it("renders all five documents with one page heading", () => {
  const html = renderToStaticMarkup(<CataloguesPage />);
  expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
  expect((html.match(/data-catalogue-document=/g) ?? [])).toHaveLength(5);
  expect(html).toContain('href="/search"');
  expect(html).toContain('href="/request-quotation"');
});
```

- [ ] **Step 2: Verify the red state**

```bash
pnpm --filter @rosa/web test -- catalogue-documents.test.ts
```

- [ ] **Step 3: Implement `CatalogueCover` and `CatalogueCard`**

`CatalogueCover` renders the sequence, family name, and `PDF` document label. `CatalogueCard` renders:

```tsx
<article
  className={`catalogue-document-card${featured ? " catalogue-document-card--featured" : ""}`}
  data-catalogue-document={document.familySlug}
>
  <CatalogueCover document={document} />
  <div className="catalogue-document-card__content">
    <p className="eyebrow">Instrument family {document.sequence}</p>
    <h2>{document.name}</h2>
    <p>{document.description}</p>
    <p className="catalogue-document-card__status">{document.sourceStatus}</p>
    <div className="catalogue-document-card__actions">
      {document.pdfPath ? (
        <ButtonLink href={document.pdfPath} size="small">View PDF</ButtonLink>
      ) : (
        <button type="button" className="button button--secondary button--small" disabled>
          PDF not available online
        </button>
      )}
      <ButtonLink href={document.familyHref} variant="secondary" size="small">
        Explore products
      </ButtonLink>
    </div>
  </div>
</article>
```

When `pdfPath` is absent, add visually associated explanatory text with a stable ID and connect it using `aria-describedby` on the disabled control.

- [ ] **Step 4: Implement the grid, guidance, and page**

`CatalogueGrid` renders all documents as a semantic list. The first item is featured. `CataloguesPage` renders breadcrumb, eyebrow, one `<h1>`, introduction, catalogue grid, and guidance panel. `CatalogueGuidance` contains active links to `/search` and `/request-quotation`.

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- catalogue-documents.test.ts
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/catalogues apps/web/src/test/catalogue-documents.test.ts
git commit -m "feat: compose the technical catalogues page"
```

---

### Task 3: Define the fixed inquiry preview model and derived totals

**Files:**
- Create: `apps/web/src/features/inquiry-preview/inquiry-preview-model.ts`
- Create: `apps/web/src/test/inquiry-preview.test.tsx`

**Interfaces:**
- Consumes: `getProductDetailModel` from the catalogue registry.
- Produces: `InquiryPreviewLine`, `INQUIRY_PREVIEW_LINES`, `InquiryPreviewTotals`, and `getInquiryPreviewTotals`.

- [ ] **Step 1: Write the failing model test**

```ts
import { describe, expect, it } from "vitest";
import {
  INQUIRY_PREVIEW_LINES,
  getInquiryPreviewTotals
} from "@/features/inquiry-preview/inquiry-preview-model";

describe("F3C inquiry preview fixture", () => {
  it("uses the three approved source-backed products", () => {
    expect(INQUIRY_PREVIEW_LINES.map((line) => line.product.code)).toEqual([
      "18-0644", "04-0402", "18-1202"
    ]);
  });

  it("derives totals from line quantities", () => {
    expect(getInquiryPreviewTotals(INQUIRY_PREVIEW_LINES)).toEqual({
      uniqueProducts: 3,
      totalQuantity: 8
    });
  });
});
```

- [ ] **Step 2: Verify the red state**

```bash
pnpm --filter @rosa/web test -- inquiry-preview.test.tsx
```

- [ ] **Step 3: Implement exact fixture resolution**

```ts
import {
  getProductDetailModel,
  type CatalogueProductRecord
} from "@/features/catalogue-registry";

export interface InquiryPreviewLine {
  id: string;
  product: CatalogueProductRecord;
  quantity: number;
  lineNote: string;
}

function requireProduct(familySlug: string, productSlug: string) {
  const result = getProductDetailModel(familySlug, productSlug);
  if (result.kind !== "product") {
    throw new Error(`Missing F3C preview product: ${familySlug}/${productSlug}`);
  }
  return result.product;
}

export const INQUIRY_PREVIEW_LINES = [
  {
    id: "preview_scalpel_handle_3",
    product: requireProduct("knives", "scalpel-handle-no-3"),
    quantity: 2,
    lineNote: "Optional requirement"
  },
  {
    id: "preview_mayo_scissors",
    product: requireProduct("scissors", "mayo-scissors"),
    quantity: 4,
    lineNote: "Optional requirement"
  },
  {
    id: "preview_amputation_knife",
    product: requireProduct("knives", "amputation-knife"),
    quantity: 2,
    lineNote: "Optional requirement"
  }
] as const satisfies readonly InquiryPreviewLine[];

export function getInquiryPreviewTotals(lines: readonly InquiryPreviewLine[]) {
  return {
    uniqueProducts: lines.length,
    totalQuantity: lines.reduce((total, line) => total + line.quantity, 0)
  } as const;
}
```

- [ ] **Step 4: Verify and commit**

```bash
pnpm --filter @rosa/web test -- inquiry-preview.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/inquiry-preview/inquiry-preview-model.ts apps/web/src/test/inquiry-preview.test.tsx
git commit -m "feat: define derived inquiry preview data"
```

---

### Task 4: Build empty and populated inquiry components

**Files:**
- Create remaining inquiry-preview components listed in the file map.
- Modify: `apps/web/src/test/inquiry-preview.test.tsx`

**Interfaces:**
- Consumes: `INQUIRY_PREVIEW_LINES`, `getInquiryPreviewTotals`, product media placeholder, and route-safe links.
- Produces: `EmptyInquiryPage`, `InquiryLinePreview`, `InquirySummaryPreview`, `GeneralRequestPreview`, and `PopulatedInquiryPreview`.

- [ ] **Step 1: Add failing semantic tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { EmptyInquiryPage } from "@/features/inquiry-preview/empty-inquiry-page";
import { PopulatedInquiryPreview } from "@/features/inquiry-preview/populated-inquiry-preview";

it("renders the truthful empty public inquiry state", () => {
  const html = renderToStaticMarkup(<EmptyInquiryPage />);
  expect(html).toContain("Your inquiry list is empty.");
  expect(html).toContain('href="/products"');
  expect(html).toContain('href="/catalogues"');
  expect(html).not.toContain("Scalpel Handle No. 3");
  expect(html).not.toContain("shopping cart");
});

it("renders a populated preview with derived totals and disabled controls", () => {
  const html = renderToStaticMarkup(<PopulatedInquiryPreview />);
  expect((html.match(/data-inquiry-line=/g) ?? [])).toHaveLength(3);
  expect(html).toContain("8 total instruments");
  expect(html).toContain("disabled");
  expect(html).not.toContain("<form");
});
```

- [ ] **Step 2: Verify the red state**

```bash
pnpm --filter @rosa/web test -- inquiry-preview.test.tsx
```

- [ ] **Step 3: Implement `EmptyInquiryPage`**

Render one route-level heading, recovery links to `/products` and `/catalogues`, and decorative neutral media. Do not import `INQUIRY_PREVIEW_LINES` into this component.

- [ ] **Step 4: Implement populated preview components**

`InquiryLinePreview` renders source-backed family/name/code/options. Quantity decrement, increment, remove, and note controls are native disabled controls. Quantity is rendered using `<output aria-label="Quantity">`.

`InquirySummaryPreview` receives totals as props and renders the quotation explanation plus a disabled `Proceed to Request` button. `GeneralRequestPreview` uses a disabled button. `PopulatedInquiryPreview` derives totals once and passes them to headings and summary.

- [ ] **Step 5: Export, verify, and commit**

```bash
pnpm --filter @rosa/web test -- inquiry-preview.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/inquiry-preview apps/web/src/test/inquiry-preview.test.tsx
git commit -m "feat: add truthful inquiry compositions"
```

---

### Task 5: Build accessible quotation fields and selected-product summary

**Files:**
- Create: `quotation-field-preview.tsx`
- Create: `quotation-product-summary.tsx`
- Create: `quotation-validation-preview.tsx`
- Create: `apps/web/src/test/quotation-preview.test.tsx`

**Interfaces:**
- Consumes: `INQUIRY_PREVIEW_LINES`, `getInquiryPreviewTotals`, and the shared product media placeholder.
- Produces: `QuotationFieldPreview`, `QuotationProductSummary`, and `QuotationValidationPreview`.

- [ ] **Step 1: Write failing accessibility tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { QuotationFieldPreview } from "@/features/quotation-preview/quotation-field-preview";
import { QuotationValidationPreview } from "@/features/quotation-preview/quotation-validation-preview";

it("associates labels with read-only preview controls", () => {
  const html = renderToStaticMarkup(
    <QuotationFieldPreview id="customer-name" label="Customer name" placeholder="Your full name" />
  );
  expect(html).toContain('for="customer-name"');
  expect(html).toContain('id="customer-name"');
  expect(html).toContain("readonly");
});

it("associates validation messages with invalid controls", () => {
  const html = renderToStaticMarkup(<QuotationValidationPreview />);
  expect(html).toContain('aria-invalid="true"');
  expect(html).toContain("aria-describedby");
  expect(html).toContain("Invalid email address");
});
```

- [ ] **Step 2: Verify the red state**

```bash
pnpm --filter @rosa/web test -- quotation-preview.test.tsx
```

- [ ] **Step 3: Implement `QuotationFieldPreview`**

Support `input`, `textarea`, and `select` visual variants while keeping controls `readOnly` or `disabled`. Use stable IDs and render errors with `${id}-error`. When `error` exists, set `aria-invalid="true"` and `aria-describedby` to the error ID.

- [ ] **Step 4: Implement summary and validation examples**

`QuotationProductSummary` derives totals from the supplied lines and renders each product with source-backed name/code and quantity. Its edit actions are disabled. `QuotationValidationPreview` renders only the email and telephone invalid examples from the approved design.

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- quotation-preview.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/quotation-preview apps/web/src/test/quotation-preview.test.tsx
git commit -m "feat: add accessible quotation preview fields"
```

---

### Task 6: Build quotation form, failure, success, and blocked public state

**Files:**
- Create remaining quotation-preview components listed in the file map.
- Modify: `apps/web/src/test/quotation-preview.test.tsx`

**Interfaces:**
- Consumes: quotation field components and fixed inquiry preview lines.
- Produces: `QuotationFormPreview`, `QuotationFailurePreview`, `QuotationSuccessPreview`, and `QuotationBlockedPage`.

- [ ] **Step 1: Add failing route-safety and truthfulness tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { QuotationBlockedPage } from "@/features/quotation-preview/quotation-blocked-page";
import { QuotationFormPreview } from "@/features/quotation-preview/quotation-form-preview";
import { QuotationSuccessPreview } from "@/features/quotation-preview/quotation-success-preview";

it("blocks the public quotation route without a selected inquiry", () => {
  const html = renderToStaticMarkup(<QuotationBlockedPage />);
  expect(html).toContain("Select instruments before requesting a quotation.");
  expect(html).toContain('href="/products"');
  expect(html).toContain('href="/catalogues"');
  expect(html).toContain('href="/inquiry"');
  expect(html).not.toContain("<form");
  expect(html).not.toContain("Submit Quotation Request");
});

it("keeps the isolated form preview non-submitting", () => {
  const html = renderToStaticMarkup(<QuotationFormPreview />);
  expect(html).toContain("Submit Quotation Request");
  expect(html).toContain("disabled");
  expect(html).not.toContain('action="');
});

it("does not invent success evidence", () => {
  const html = renderToStaticMarkup(<QuotationSuccessPreview />);
  expect(html).not.toContain("RM-2026-000123");
  expect(html).not.toContain("email has been sent");
});
```

- [ ] **Step 2: Verify the red state**

```bash
pnpm --filter @rosa/web test -- quotation-preview.test.tsx
```

- [ ] **Step 3: Implement the isolated form preview**

Render the approved fields, notes, disabled confirmation checkbox, disabled submit button, selected-product summary, validation preview, and failure preview. Use a semantic `<form>` with `onSubmit` absent and the submit control `type="button"` and disabled, or use a non-form section. The selected product summary is collapsed with native `<details>` only in the mobile presentation.

- [ ] **Step 4: Implement success and blocked states**

`QuotationSuccessPreview` accepts optional props:

```ts
export interface QuotationSuccessPreviewProps {
  reference?: string;
  confirmationEmail?: string;
}
```

Render reference and email copy only when the corresponding prop is supplied. Without props, render `Reference shown after submission` and neutral copy that does not claim delivery.

`QuotationBlockedPage` renders one `<h1>` and links to Products, Catalogues, and Inquiry, with no form controls.

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- quotation-preview.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/quotation-preview apps/web/src/test/quotation-preview.test.tsx
git commit -m "feat: add static quotation states"
```

---

### Task 7: Wire truthful F3C route dispatch

**Files:**
- Modify: `apps/web/src/features/public-routing/resolve-public-page.tsx`
- Modify: `apps/web/src/test/public-route-dispatch.test.ts`
- Create: `apps/web/src/test/f3c-page-composition.test.tsx`

**Interfaces:**
- Consumes: `CataloguesPage`, `EmptyInquiryPage`, and `QuotationBlockedPage`.
- Produces public page kinds `catalogues`, `inquiry-empty`, and `quotation-blocked`.

- [ ] **Step 1: Add failing dispatch assertions**

```ts
it.each([
  ["catalogues", "catalogues"],
  ["inquiry", "inquiry-empty"],
  ["request-quotation", "quotation-blocked"]
] as const)("maps %s to %s", (key, expected) => {
  expect(resolvePublicPageKind(key)).toBe(expected);
});
```

Add a composition test that renders each normal F3C route through `resolvePublicPage` and verifies:

```tsx
expect(cataloguesHtml).toContain("Technical catalogues");
expect(inquiryHtml).toContain("Your inquiry list is empty.");
expect(inquiryHtml).not.toContain("Mayo Scissors");
expect(quotationHtml).toContain("Select instruments before requesting a quotation.");
expect(quotationHtml).not.toContain("Submit Quotation Request");
```

- [ ] **Step 2: Verify the red state**

```bash
pnpm --filter @rosa/web test -- public-route-dispatch.test.ts f3c-page-composition.test.tsx
```

- [ ] **Step 3: Extend the resolver**

Update `PublicPageKind` and resolve exact keys before placeholder handling:

```ts
if (key === "catalogues") return "catalogues";
if (key === "inquiry") return "inquiry-empty";
if (key === "request-quotation") return "quotation-blocked";
```

Add switch cases returning the three new page components. Remove these keys from `NON_CATALOGUE_PLACEHOLDERS`. Do not add public preview keys.

- [ ] **Step 4: Verify and commit**

```bash
pnpm --filter @rosa/web test -- public-route-dispatch.test.ts f3c-page-composition.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/public-routing/resolve-public-page.tsx apps/web/src/test/public-route-dispatch.test.ts apps/web/src/test/f3c-page-composition.test.tsx
git commit -m "feat: route truthful F3C public states"
```

---

### Task 8: Implement Figma-led responsive F3C styling

**Files:**
- Create: `apps/web/src/styles/f3c-pages.css`
- Modify: `apps/web/src/app/globals.css`
- Create: `apps/web/src/test/f3c-styles.static.test.mjs`

**Interfaces:**
- Consumes: existing Rosa tokens and F3C class names.
- Produces responsive desktop, tablet, and mobile presentation.

- [ ] **Step 1: Write the failing static stylesheet test**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const cssPath = path.join(root, "styles/f3c-pages.css");
const globalsPath = path.join(root, "app/globals.css");

test("imports and defines the F3C responsive layout", async () => {
  const [css, globals] = await Promise.all([
    readFile(cssPath, "utf8"),
    readFile(globalsPath, "utf8")
  ]);
  assert.match(globals, /@import "\.\.\/styles\/f3c-pages\.css";/);
  assert.match(css, /\.catalogue-document-grid/);
  assert.match(css, /\.inquiry-empty-state/);
  assert.match(css, /\.quotation-blocked-state/);
  assert.match(css, /\.quotation-preview-layout/);
  assert.match(css, /@media \(max-width: 768px\)/);
  assert.match(css, /@media \(max-width: 480px\)/);
  assert.doesNotMatch(css, /linear-gradient|backdrop-filter|border-radius:\s*(?:1[6-9]|[2-9]\d)px/);
});
```

- [ ] **Step 2: Verify the red state**

```bash
node --test apps/web/src/test/f3c-styles.static.test.mjs
```

- [ ] **Step 3: Implement desktop styling**

Use responsive grid and flow layouts matching Figma:

- `.catalogue-document-grid`: two equal columns; final card spans both columns.
- `.catalogue-document-card`: document cover plus copy/action area.
- `.catalogue-document-card--featured`: near-black surface, red cover, white copy.
- `.inquiry-preview-layout`: primary list region plus summary region.
- `.quotation-preview-layout`: form region plus selected-products region.
- Empty and blocked public states use editorial split compositions with restrained neutral media.
- Forms use rectangular borders and existing control radii only.

- [ ] **Step 4: Implement tablet/mobile rules**

At `768px`, stack primary and summary regions. At `480px`, use one-column catalogue cards with the cover above content, stack buttons when labels would wrap, use image-first inquiry cards, one-column form fields, and prevent fixed widths. Add reduced-motion rules for any hover transition.

- [ ] **Step 5: Import, verify, and commit**

```bash
node --test apps/web/src/test/f3c-styles.static.test.mjs
pnpm --filter @rosa/web typecheck
git add apps/web/src/styles/f3c-pages.css apps/web/src/app/globals.css apps/web/src/test/f3c-styles.static.test.mjs
git commit -m "feat: style F3C procurement pages"
```

---

### Task 9: Add browser policy and responsive coverage

**Files:**
- Create: `apps/web/tests/e2e/f3c-procurement-pages.spec.ts`
- Preserve: `apps/web/playwright.config.ts`
- Preserve: `apps/web/tests/e2e/route-smoke.spec.ts`

**Interfaces:**
- Consumes the existing `desktop`, `tablet`, and `mobile` Playwright projects.
- Produces browser assertions for the three F3C public routes.

- [ ] **Step 1: Add route and truthfulness checks**

```ts
import { expect, test } from "@playwright/test";

const publicRoutes = ["/catalogues", "/inquiry", "/request-quotation"] as const;

for (const route of publicRoutes) {
  test(`${route} has one main, one h1 and no overflow`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.ok()).toBe(true);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflow).toBe(false);
  });
}

test("catalogues exposes five documents and no fake PDF link", async ({ page }) => {
  await page.goto("/catalogues");
  await expect(page.locator("[data-catalogue-document]")).toHaveCount(5);
  await expect(page.getByRole("link", { name: /Explore products/i })).toHaveCount(5);
  await expect(page.getByRole("link", { name: /View PDF/i })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /PDF not available online/i })).toHaveCount(5);
});

test("inquiry and quotation public routes remain truthful", async ({ page }) => {
  await page.goto("/inquiry");
  await expect(page.getByRole("heading", { name: "Your inquiry list is empty." })).toBeVisible();
  await expect(page.getByText("Mayo Scissors")).toHaveCount(0);
  await page.goto("/request-quotation");
  await expect(page.getByRole("heading", { name: /Select instruments/i })).toBeVisible();
  await expect(page.getByRole("button", { name: "Submit Quotation Request" })).toHaveCount(0);
});
```

- [ ] **Step 2: Add footer and keyboard checks**

Scroll each page to the bottom and assert the footer is visible. Tab through active links on each public page and verify the focused element has a visible outline or box shadow using `getComputedStyle`.

- [ ] **Step 3: Commit the browser specification**

```bash
git add apps/web/tests/e2e/f3c-procurement-pages.spec.ts
git commit -m "test: specify F3C procurement routes"
```

Do not claim the Playwright tests pass until Chromium is installed and the command exits with zero failures.

---

### Task 10: Run consolidated verification, review the branch, and document status

**Files:**
- Create: `docs/superpowers/completions/2026-08-01-rosa-medical-f3c-catalogues-inquiry.md`
- Modify: `README.md` on `main` after branch review.

**Interfaces:**
- Produces exact verification evidence and the next F3D handoff.

- [ ] **Step 1: Run focused verification**

```bash
pnpm --filter @rosa/web test -- catalogue-documents.test.ts inquiry-preview.test.tsx quotation-preview.test.tsx public-route-dispatch.test.ts f3c-page-composition.test.tsx
node --test apps/web/src/test/f3c-styles.static.test.mjs
```

- [ ] **Step 2: Run the consolidated frontend gate**

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm --filter @rosa/web test:foundation
node --test apps/web/src/test/public-page-styles.static.test.mjs
node --test apps/web/src/test/f3b-styles.static.test.mjs
node --test apps/web/src/test/f3c-styles.static.test.mjs
```

Stop on the first actual failure, diagnose it using the systematic-debugging workflow, add a regression assertion where applicable, and rerun the failed command before continuing.

- [ ] **Step 3: Install the browser once if required and run Playwright**

```bash
pnpm --filter @rosa/web exec playwright install chromium
pnpm test:e2e
```

- [ ] **Step 4: Review source scope**

```bash
git diff --stat frontend/f3c-catalogues-inquiry-design...HEAD
git diff --name-only frontend/f3c-catalogues-inquiry-design...HEAD
```

Confirm:

- only F3C frontend components, styles, tests, documentation, and route dispatch changed
- no file under `services/api/**` changed
- no OpenAPI file changed
- no public preview route exists
- no fake PDF path exists
- normal inquiry and quotation routes do not mount preview data

- [ ] **Step 5: Write the completion record**

Record exact branch/commit SHAs, implemented routes, preview components, Figma nodes, commands, exit results, known limitations, and any deferred verification. Never convert an unrun check into a pass claim.

- [ ] **Step 6: Commit documentation**

```bash
git add docs/superpowers/completions/2026-08-01-rosa-medical-f3c-catalogues-inquiry.md
git commit -m "docs: record F3C implementation status"
```

- [ ] **Step 7: Update shared coordination on `main`**

Preserve the backend-owned section. Update the frontend lane, integration evidence, blockers, current branch/commit, next work, and append one dated frontend-to-backend message. State explicitly that F3C changes no OpenAPI shape or endpoint.

- [ ] **Step 8: Prepare the next milestone**

Next milestone: F3D — About, Procurement Support, Contact, Search, Privacy, and Terms.
