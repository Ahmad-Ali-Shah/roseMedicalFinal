# Canonical Catalogue Safety Foundation and Search Cutover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans in this environment. Execute task-by-task; do not skip the red/green gates when an executable checkout is available.

**Goal:** Fix the current missing product images in Search and introduce the first read-only Supabase-backed public product consumer without creating mixed product-identity bugs or modifying the production database.

**Architecture:** Production Supabase already contains a valuable, substantially complete catalogue: 113 products, 322 variants and 113 primary image relationships. This plan preserves it exactly. A pure mapper and read-only repository adapt the existing tables into the public catalogue shape. Before Search starts consuming DB UUIDs, the inquiry basket is made migration-safe by identifying the same product by its stable public route (`familySlug + slug`) when merging lines and by excluding the transient internal ID from exact-request hashing. Search then receives live products from a server wrapper, with one explicit temporary static fallback at the repository boundary. The database, RLS, indexes, functions and Storage remain untouched.

**Tech Stack:** Next.js 16.2.11, React 19.2, TypeScript 5.9, Supabase JS 2.111, Vitest 3.2.

## Non-negotiable preservation guardrails

- Production project: `rosa-medical` / `hzwabrbrgcxodkqilgdi` / `ap-south-1`.
- Base source: `ahmadx67676767`; work branch: `integration/canonical-catalogue-source-of-truth`.
- **No `Supabase.apply_migration` in this plan.**
- **No production INSERT/UPDATE/DELETE/UPSERT/TRUNCATE.**
- **No Storage upload/update/delete.**
- No table/column/policy/index/function/bucket changes.
- Do not edit or rerun `apps/web/catalogue-seed.sql` against production.
- Do not rewrite any product UUID or DB slug.
- Do not delete the two current `product-media` objects.
- Preserve known duplicate code `18-0644` as two different public products/routes.
- Treat copied English `name_ar` / `description_ar` values as unverified placeholders.
- Explicitly filter `products.is_active = true` in public reads despite current broad RLS SELECT policy.
- Static registry remains a temporary migration fallback/reference only.
- Do not start family/detail/homepage/admin/catalogue/contact cutover in this plan.

## Frozen production baseline

Before implementation, read-only inspection showed:

| Dataset | Count | Fingerprint |
| --- | ---: | --- |
| categories | 5 | `653cd90456d3c31ac61455979f4e7442` |
| products | 113 | `e06862f03551d86942dc87bf86bd5929` |
| product_variants | 322 | `e79d48cccd26c4a9d10f9fdc903a5e2c` |
| product_images | 113 | `393262a999597ea7d0963e5365a98da0` |
| site_settings | 5 | `b0d5389b83e30c869990f1e6aec1bb2f` |

Family counts: Knives 22, Scissors 42, Punches 15, Chisels 20, Cutters 14.

All 113 product DB slugs are family-prefixed and derive 113 unique current public routes by stripping the matching family prefix. Derived route fingerprint: `0acd7d0c9941198cc818382a49027b92`.

## Files

**Create**
- `docs/architecture/2026-08-07-live-catalogue-baseline.md`
- `apps/web/src/features/catalogue-live/catalogue-live.types.ts`
- `apps/web/src/features/catalogue-live/map-live-product.ts`
- `apps/web/src/features/catalogue-live/catalogue-live.repository.ts`
- `apps/web/src/features/catalogue-live/index.ts`
- `apps/web/src/test/catalogue-live-mapper.test.ts`
- `apps/web/src/test/catalogue-live-repository.test.ts`

**Modify**
- `README.md` (only by safe append/targeted edit in a real checkout; never blind-replace the large coordination file)
- `apps/web/src/features/search-preview/search-result-preview.tsx`
- `apps/web/src/test/search-preview.test.tsx`
- `apps/web/src/features/inquiry/inquiry-store.ts`
- `apps/web/src/test/inquiry-store.test.ts`
- `apps/web/src/features/inquiry/quotation-payload.ts`
- `apps/web/src/test/quotation-payload.test.ts`
- `apps/web/src/features/search/search-page.tsx`
- `apps/web/src/features/search-preview/search-default-page.tsx`
- `apps/web/src/test/search-catalogue.test.ts` if needed

**Do not modify**
- static product registry data
- seed SQL
- admin write actions
- Supabase schema/data/security/storage
- public family/detail/homepage data loaders

---

## Task 1 — Freeze preservation evidence

- [ ] Create `docs/architecture/2026-08-07-live-catalogue-baseline.md` containing the exact baseline above plus:
  - 113/113 products have category, slug, item code and one `sort_order=0` image;
  - all 113 image paths currently start `/media/`;
  - one product (`knives-scalpel-handle-no-3`) has zero variants;
  - `18-0644` appears on both `knives-round-straight` and `knives-scalpel-handle-no-3`;
  - all 113 product Arabic names and descriptions are copied English seed values;
  - no Supabase migrations are registered;
  - `product-media` contains the existing JPEG and `uploads/...temp.txt` object;
  - a section titled **Forbidden in this slice** stating no DDL/DML/RLS/Storage cleanup/slug rewrite.

- [ ] Append to the README shared decision ledger **only from a proper checkout where the complete file can be preserved**:

```markdown
| DEC-007 | 2026-08-07 | Supabase becomes the sole live source for operational product/catalogue/contact data after verified migration. Broad Website Content editing, Publishing Centre, general Revision History, and admin control of marketing/hero/family presentation are retired. Migration is preservation-first: no destructive database change, no slug rewrite, and temporary static fallback only while parity is proven. | Accepted by Ahmad | Both |
```

Also append one dated coordination message that this first slice is read-only against production and changes no OpenAPI source, `services/api/**`, schema, RLS or Storage.

- [ ] Commit documentation as one meaningful checkpoint.

---

## Task 2 — Fix Search image rendering first

**Test first:** `apps/web/src/test/search-preview.test.tsx`

Add a regression assertion that the first preview product's real `mediaFallbackPath ?? mediaPath` is present in rendered search-result HTML. Against current code this must fail because `SearchResultPreview` passes no image source.

Run:

```bash
pnpm --filter @rosa/web test -- src/test/search-preview.test.tsx
```

Expected RED: expected media path absent.

**Implementation:** update only the media placeholder in `search-result-preview.tsx`:

```tsx
<ProductMediaPlaceholder
  label={product.mediaLabel}
  decorative
  aspect="square"
  src={product.mediaPath}
  fallbackSrc={product.mediaFallbackPath}
  spriteIndex={product.mediaIndex}
/>
```

Re-run the same test. Expected GREEN.

Commit:

```text
fix(search): render catalogue product images
```

---

## Task 3 — Make inquiry identity compatible with a gradual source cutover

This is required before Search may use DB UUIDs while other pages still use static IDs.

### 3A. Basket merge identity

**Test first:** add to `apps/web/src/test/inquiry-store.test.ts`:

```ts
it("merges the same public product across static and live internal IDs", () => {
  addInquiryItem(item);
  const result = addInquiryItem({ ...item, id: "live-db-uuid", quantity: 2 });

  expect(result).toHaveLength(1);
  expect(result[0]).toMatchObject({
    familySlug: "knives",
    slug: "scalpel-handle-no-3",
    quantity: 3
  });
});

it("keeps different public routes separate even when the catalogue code matches", () => {
  addInquiryItem(item);
  const result = addInquiryItem({
    ...item,
    id: "other-db-uuid",
    slug: "round-straight",
    code: item.code
  });
  expect(result).toHaveLength(2);
});
```

Run focused test and verify RED.

**Implementation:** in `inquiry-store.ts`, change only the existing-item matching rule. Add a small pure helper:

```ts
function isSameInquiryProduct(a: InquiryItem, b: InquiryItem): boolean {
  return a.familySlug === b.familySlug && a.slug === b.slug;
}
```

Then:

```ts
const existingIndex = items.findIndex((candidate) =>
  isSameInquiryProduct(candidate, normalized)
);
```

Preserve the already-stored line's ID when merging. Update/remove behavior remains by the stored line ID.

Re-run `inquiry-store.test.ts`; expected GREEN.

### 3B. Exact-request hash stability across internal IDs

**Test first:** add to `quotation-payload.test.ts`:

```ts
it("does not change an exact request hash when only the internal product id changes", () => {
  const first = normalizeQuotationPayload(validPayload);
  const second = normalizeQuotationPayload({
    ...validPayload,
    items: [{ ...validPayload.items[0], id: "live-db-uuid" }]
  });
  expect(first.ok && second.ok).toBe(true);
  if (!first.ok || !second.ok) return;
  expect(createQuotationHash(first.value)).toBe(createQuotationHash(second.value));
});
```

Run focused test and verify RED.

**Implementation:** remove `id` from the object used only for `createQuotationHash`; keep the immutable snapshot ID in the normalized payload itself. Hash identity remains family + route + snapshot fields + quantity/notes.

Run:

```bash
pnpm --filter @rosa/web test -- src/test/inquiry-store.test.ts src/test/quotation-payload.test.ts
```

Expected GREEN.

Commit:

```text
fix(inquiry): preserve identity across catalogue cutover
```

---

## Task 4 — Add a pure mapper over the existing schema

Create narrow raw-row types; do not replace the project's existing Supabase types yet.

`catalogue-live.types.ts` should expose:

```ts
export interface LiveProductRow {
  id: string;
  category_id: string | null;
  item_code: string | null;
  name_en: string;
  description_en: string | null;
  is_active: boolean;
  slug: string;
}

export interface LiveCategoryRow {
  id: string;
  slug: string;
  name_en: string;
  is_active: boolean;
  deleted_at: string | null;
}

export interface LiveVariantRow {
  product_id: string;
  sku: string | null;
  size: string | null;
  variant_type: string | null;
}

export interface LiveImageRow {
  product_id: string;
  image_path: string;
  sort_order: number;
}

export interface LiveCatalogueSnapshot {
  products: readonly LiveProductRow[];
  categories: readonly LiveCategoryRow[];
  variants: readonly LiveVariantRow[];
  images: readonly LiveImageRow[];
}
```

**Test first:** `catalogue-live-mapper.test.ts` must cover:
- `cutters-liston` -> route-local slug `liston`;
- a non-prefixed slug is preserved unchanged;
- primary image selected by `sort_order === 0`;
- exact SKU/size pairs become `catalogueCodes`;
- sizes and direction labels deduplicate in source order;
- zero-variant product maps successfully;
- two products with code `18-0644` remain two products;
- unknown/missing category fails explicitly instead of silently inventing a family.

Run test: expected RED before implementation.

Implement pure functions:

```ts
export function derivePublicProductSlug(familySlug: string, dbSlug: string): string
export function mapLiveCatalogue(snapshot: LiveCatalogueSnapshot): readonly CatalogueProductRecord[]
```

Mapping rules:
- include only `is_active === true` products;
- include only active/non-deleted fixed categories;
- validate category slug through existing `isKnownFamilySlug`;
- use DB UUID as `CatalogueProductRecord.id`;
- derive public local slug from matching family prefix;
- `name` = `name_en`;
- `description` = non-empty `description_en`;
- `code` = `item_code` and fail clearly if absent;
- `catalogueCodes` = variants with non-empty sku + size;
- `sizes` = unique non-empty sizes;
- `directions` = unique non-empty `variant_type` values;
- `variants` remains empty in this slice because current `variant_type` is direction/shape data;
- `primaryOption` = first direction, else first size when present;
- `catalogueReference.family` = category name; page remains absent because live schema does not carry it;
- `mediaLabel` = product name;
- `mediaPath` = `sort_order=0` image path when present;
- never synthesize Arabic data.

Run mapper test; expected GREEN.

Commit:

```text
feat(catalogue): map existing live product schema
```

---

## Task 5 — Add a read-only Supabase repository with one temporary fallback

Use separate simple table reads rather than a clever nested relationship query; this minimizes coupling to relationship inference and makes the existing schema easier to reason about.

Create an injected adapter interface:

```ts
export interface CatalogueSnapshotReader {
  read(): Promise<LiveCatalogueSnapshot>;
}
```

Pure repository function:

```ts
export async function loadCatalogueProducts(
  reader: CatalogueSnapshotReader
): Promise<readonly CatalogueProductRecord[]>
```

Production reader:

```ts
const supabase = await createClient();
const [products, categories, variants, images] = await Promise.all([
  supabase.from("products")
    .select("id,category_id,item_code,name_en,description_en,is_active,slug")
    .eq("is_active", true),
  supabase.from("categories")
    .select("id,slug,name_en,is_active,deleted_at")
    .eq("is_active", true)
    .is("deleted_at", null),
  supabase.from("product_variants")
    .select("product_id,sku,size,variant_type"),
  supabase.from("product_images")
    .select("product_id,image_path,sort_order")
]);
```

Check every response error. Any error throws `CatalogueLiveReadError`; infrastructure failure must not silently become an empty product list.

**Tests first:** `catalogue-live-repository.test.ts` using an injected reader:
- maps one valid snapshot;
- preserves both duplicate-code routes;
- propagates reader failure as an error rather than `[]`.

Then add:

```ts
export async function getLiveCatalogueProducts()
export async function getSearchCatalogueProducts()
```

`getSearchCatalogueProducts()` is the **single temporary migration fallback boundary**:

```ts
try {
  return await getLiveCatalogueProducts();
} catch (error) {
  console.warn("[catalogue-migration] live product read failed; using temporary static fallback", error);
  return CATALOGUE_PRODUCTS;
}
```

No component may add its own fallback.

Run mapper + repository tests and `pnpm --filter @rosa/web typecheck`.

Commit:

```text
feat(catalogue): add read-only live product repository
```

---

## Task 6 — Cut Search to the live repository

`SearchPage` remains a client component but receives products as a prop.

Target signature:

```ts
export function SearchPage({
  products,
  initialQuery = "",
  locale = "en"
}: {
  products: readonly CatalogueProductRecord[];
  initialQuery?: string;
  locale?: PublicLocale;
}): ReactElement
```

Remove its direct import of `CATALOGUE_PRODUCTS` and search only the supplied list.

`SearchDefaultPage` becomes an async server component:

```tsx
export async function SearchDefaultPage(props: Props) {
  const products = await getSearchCatalogueProducts();
  return <SearchPage products={products} {...props} />;
}
```

**Tests first:**
- render/search a deliberately small supplied list and prove no hidden global product appears;
- static/source assertion that `search-page.tsx` no longer imports `CATALOGUE_PRODUCTS` if an existing static-test pattern is available;
- existing result links, codes and inquiry button behavior remain unchanged;
- image regression remains green.

Run:

```bash
pnpm --filter @rosa/web test -- \
  src/test/search-preview.test.tsx \
  src/test/search-catalogue.test.ts \
  src/test/inquiry-store.test.ts \
  src/test/quotation-payload.test.ts \
  src/test/catalogue-live-mapper.test.ts \
  src/test/catalogue-live-repository.test.ts
pnpm --filter @rosa/web typecheck
```

Commit:

```text
feat(search): use canonical live product reads
```

---

## Task 7 — Read-only production acceptance gate

After code is ready, re-run production SQL **read-only**.

Confirm:
- 113 active products;
- exact family counts 22/42/15/20/14;
- 113 distinct derived public routes;
- 113 products with exactly one primary image;
- 322 variants;
- both `18-0644` products present;
- baseline fingerprints remain identical unless another authorized actor changed data during the implementation.

If a fingerprint changed, investigate the delta. **Never write old data back merely to restore a fingerprint.**

Append results to the baseline doc with exact read time and statement:

```text
No production DDL, DML, RLS, function, index, bucket or Storage-object mutation was performed by this implementation slice.
```

Run the focused tests, existing family inventory/media tests, web typecheck, lint and build in a real checkout. Avoid a broad GitHub Actions run unless local execution is unavailable and one checkpoint run is justified.

If this agent environment cannot execute the repository, do not call the implementation fully verified. Leave the branch unmerged and report the exact remaining verification commands.

---

## Next plan only after this gate

The next bounded plan migrates Family listing, Product detail, Products overview, homepage selected-product cards and related-product cards together. Before that cutover, reconcile the one material public field not represented in the live schema: catalogue page reference. Any database change must be separately justified, additive, idempotent and backed by the frozen 113-product manifest; no destructive migration is assumed.