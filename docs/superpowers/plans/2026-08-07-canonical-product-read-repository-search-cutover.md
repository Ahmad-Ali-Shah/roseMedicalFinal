# Canonical Product Read Repository and Search Cutover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Introduce the first production-safe Supabase-backed canonical product read path and migrate public search to it, while preserving every existing database row, route, image relationship, variant, RLS policy, Storage object, and static-catalogue fallback until parity is proven.

**Architecture:** This slice is intentionally read-only against production Supabase. A focused server repository reads the existing `products`, `categories`, `product_variants`, and `product_images` tables and hydrates them into the existing catalogue-facing product shape so current UI components do not require a broad rewrite. Search becomes the first public live consumer: the server wrapper loads canonical products, the client performs local filtering over those hydrated records, and a temporary explicit static-registry fallback is used only when the live read fails. No DDL, no data backfill, no RLS changes, no Storage mutation, and no deletion are allowed in this plan.

**Tech Stack:** Next.js 16.2.11, React 19.2.0, TypeScript 5.9, Supabase JS 2.111, `@supabase/ssr` 0.12.4, Vitest 3.2, existing Rosa catalogue registry and public UI components.

## Global Constraints

- Base branch is `ahmadx67676767`; implementation branch is `integration/canonical-catalogue-source-of-truth`.
- The connected production project is `rosa-medical` / `hzwabrbrgcxodkqilgdi` in `ap-south-1`.
- **Zero-DDL first:** do not call `Supabase.apply_migration` in this plan.
- **Zero production writes:** do not insert, update, delete, truncate, reseed, rename, or drop any production database row/table/column/policy/index/function/bucket/object in this plan.
- Preserve the current live inventory: 113 products, 5 categories, 322 product variants, 113 product image rows, and the existing five `site_settings` rows.
- Preserve family counts: Knives 22, Scissors 42, Punches 15, Chisels 20, Cutters 14.
- Preserve all existing UUIDs and the family-prefixed database slugs. Do not rewrite `products.slug`.
- Public route identity is derived without mutation: a database slug such as `cutters-liston` maps to public route-local slug `liston` within family `cutters`.
- Preserve the known duplicate product item code `18-0644`; never deduplicate it implicitly.
- Existing Arabic product/category values are seed copies of English and must not be presented as verified Arabic translations.
- Existing approved `/media/...` paths in `product_images` remain valid canonical media references. Do not move all historical images to Storage.
- Do not delete either existing `product-media` Storage object, including the unreferenced JPEG and temporary text upload; orphan cleanup is a separate reviewed task.
- Do not alter current RLS policies or duplicate indexes in this slice even where reconnaissance found weaknesses/redundancy.
- Public repository queries must explicitly require `products.is_active = true` because current RLS also contains a broader public-read policy.
- Marketing content, hero imagery/copy, family presentation, branding, layout, typography, and navigation remain source-controlled.
- The static TypeScript catalogue is a temporary fallback/reference during migration only, not the final permanent live source.
- Follow TDD for production changes: write the failing test, observe the intended failure in an executable checkout, then implement the minimum change.
- Avoid unnecessary GitHub Actions runs; use focused local Vitest/typecheck commands before any broad CI checkpoint.

## Frozen live baseline for this slice

Read-only reconnaissance on 2026-08-07 established these production fingerprints. They are a safety tripwire, not values to rewrite:

| Dataset | Rows | Fingerprint |
| --- | ---: | --- |
| `categories` | 5 | `653cd90456d3c31ac61455979f4e7442` |
| `products` | 113 | `e06862f03551d86942dc87bf86bd5929` |
| `product_variants` | 322 | `e79d48cccd26c4a9d10f9fdc903a5e2c` |
| `product_images` | 113 | `393262a999597ea7d0963e5365a98da0` |
| `site_settings` | 5 | `b0d5389b83e30c869990f1e6aec1bb2f` |

Derived public-route fingerprint: `0acd7d0c9941198cc818382a49027b92` across 113 distinct `family/local-slug` routes.

---

## File structure for this slice

### Create

- `apps/web/src/features/catalogue-live/catalogue-live.types.ts` — minimal raw row and joined-row types used by the read mapper; no generated schema replacement yet.
- `apps/web/src/features/catalogue-live/map-live-product.ts` — pure mapping helpers from existing database rows to `CatalogueProductRecord`-compatible products.
- `apps/web/src/features/catalogue-live/catalogue-live.repository.ts` — server-only Supabase read repository with explicit temporary fallback and active-product filtering.
- `apps/web/src/features/catalogue-live/index.ts` — focused exports.
- `apps/web/src/test/catalogue-live-mapper.test.ts` — pure mapper/route/media/variant regression tests.
- `apps/web/src/test/catalogue-live-repository.test.ts` — repository behavior tests using an injected query adapter, not network mocks.
- `docs/architecture/2026-08-07-live-catalogue-baseline.md` — preservation record for the production state observed before cutover.

### Modify

- `README.md` — append the approved superseding lean-admin/canonical-source decision and current migration guardrails; do not rewrite historical decisions.
- `apps/web/src/features/search/search-page.tsx` — accept hydrated products as input; stop importing `CATALOGUE_PRODUCTS` as the normal live data source.
- `apps/web/src/features/search-preview/search-default-page.tsx` — become the server boundary that loads canonical search products and passes them to the client search page.
- `apps/web/src/features/search-preview/search-result-preview.tsx` — pass canonical media fields into `ProductMediaPlaceholder`.
- `apps/web/src/test/search-preview.test.tsx` — add the missing-image regression assertion and adapt search wrapper expectations.
- `apps/web/src/test/search-catalogue.test.ts` — add a live-shaped product case if needed to prove search ranking/filtering is independent of static-registry identity.

### Explicitly do not modify in this slice

- `apps/web/catalogue-seed.sql`
- `apps/web/src/features/catalogue-registry/products/**`
- `apps/web/src/features/catalogue-registry/registry.ts`
- Supabase production schema/data/policies/indexes/functions/Storage
- Admin mutation actions
- Catalogue PDF/contact persistence
- Inquiry persistence schema

---

### Task 1: Record the production preservation baseline and coordination decision

**Files:**
- Create: `docs/architecture/2026-08-07-live-catalogue-baseline.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: the read-only Supabase reconnaissance already completed against project `hzwabrbrgcxodkqilgdi`.
- Produces: a durable safety record that every later migration task must compare against before mutating production.

- [ ] **Step 1: Add the baseline record**

Create the architecture note with the exact counts/fingerprints from this plan, plus these observed facts:

```text
113/113 products have a category, slug, item code, active state, and exactly one sort_order=0 product image.
113/113 product image paths currently begin with /media/.
113/113 database slugs are family-prefixed and derive 113 unique existing public routes by stripping the family prefix.
113/113 name_ar values equal name_en and 113/113 populated description_ar values equal description_en; treat them as seed placeholders, not verified translations.
Only knives-scalpel-handle-no-3 has zero product_variants rows.
18-0644 is deliberately present on both knives-round-straight and knives-scalpel-handle-no-3.
product-media contains two objects; neither may be deleted by this slice.
No Supabase migrations are currently registered for the project.
```

Include a `Forbidden in this slice` section listing DDL, DML, RLS changes, Storage cleanup, and slug rewrites.

- [ ] **Step 2: Append, do not rewrite, a new README decision**

Append a new accepted decision in the shared decision ledger, preserving the old CMS decision as historical context:

```markdown
| DEC-007 | 2026-08-07 | Supabase becomes the sole live source for operational product/catalogue/contact data after verified migration. Broad Website Content editing, Publishing Centre, general Revision History, and admin control of marketing/hero/family presentation are retired. Migration is preservation-first: no destructive database change, no slug rewrite, and temporary static fallback only while parity is proven. | Accepted by Ahmad | Both |
```

Append a dated frontend-to-backend coordination message saying this first slice is **read-only against production** and does not change `services/api/**`, OpenAPI source, database schema, RLS, or Storage.

- [ ] **Step 3: Review the diff for accidental historical rewrites**

Run:

```bash
git diff -- README.md docs/architecture/2026-08-07-live-catalogue-baseline.md
```

Expected: only one new ledger row, one new dated coordination message, and the new baseline document.

- [ ] **Step 4: Commit the documentation checkpoint**

```bash
git add README.md docs/architecture/2026-08-07-live-catalogue-baseline.md
git commit -m "docs: freeze live catalogue migration baseline"
```

---

### Task 2: Fix the immediate search-result image regression before changing its data source

**Files:**
- Modify: `apps/web/src/test/search-preview.test.tsx`
- Modify: `apps/web/src/features/search-preview/search-result-preview.tsx`

**Interfaces:**
- Consumes: existing `CatalogueProductRecord.mediaPath`, `.mediaFallbackPath`, `.mediaIndex` and `ProductMediaPlaceholder` props.
- Produces: search cards that render the same approved product media already used by family/detail cards.

- [ ] **Step 1: Write the failing regression test**

Extend the existing `renders source-backed desktop and mobile search results` test with assertions proving a real product-media URL reaches the rendered markup. Use the current `SEARCH_PREVIEW_RESULTS[0]` data instead of hard-coding an invented asset:

```tsx
const expectedMedia = SEARCH_PREVIEW_RESULTS[0]?.mediaFallbackPath
  ?? SEARCH_PREVIEW_RESULTS[0]?.mediaPath;
expect(expectedMedia).toBeTruthy();
expect(desktop).toContain(expectedMedia!);
```

If the preview product uses a sprite instead of a direct image, assert the sprite source appears in `background-image` instead. The test must fail against the current component because `SearchResultPreview` drops all media props.

- [ ] **Step 2: Run the focused test and verify RED**

```bash
pnpm --filter @rosa/web test -- src/test/search-preview.test.tsx
```

Expected: FAIL specifically because the expected media source is absent from the search-result markup, while the existing count/link/code assertions remain green.

- [ ] **Step 3: Pass existing media through the renderer**

Change only the placeholder invocation:

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

Do not alter search ranking, routes, inquiry behavior, or CSS in this task.

- [ ] **Step 4: Run the focused test and verify GREEN**

```bash
pnpm --filter @rosa/web test -- src/test/search-preview.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit the visible bug fix**

```bash
git add apps/web/src/features/search-preview/search-result-preview.tsx apps/web/src/test/search-preview.test.tsx
git commit -m "fix(search): render catalogue product images"
```

---

### Task 3: Add pure canonical mapping over the existing live schema

**Files:**
- Create: `apps/web/src/features/catalogue-live/catalogue-live.types.ts`
- Create: `apps/web/src/features/catalogue-live/map-live-product.ts`
- Create: `apps/web/src/features/catalogue-live/index.ts`
- Create: `apps/web/src/test/catalogue-live-mapper.test.ts`

**Interfaces:**
- Consumes: existing table fields from `products`, `categories`, `product_variants`, `product_images`.
- Produces:
  - `derivePublicProductSlug(familySlug: string, dbSlug: string): string`
  - `mapLiveProduct(row: LiveProductAggregate): CatalogueProductRecord`
  - `mapLiveProducts(rows: readonly LiveProductAggregate[]): readonly CatalogueProductRecord[]`

Define raw types narrowly rather than replacing all Supabase types:

```ts
export interface LiveProductVariantRow {
  sku: string | null;
  size: string | null;
  variant_type: string | null;
}

export interface LiveProductImageRow {
  image_path: string;
  sort_order: number;
}

export interface LiveProductAggregate {
  id: string;
  slug: string;
  item_code: string | null;
  name_en: string;
  description_en: string | null;
  is_active: boolean;
  category: {
    slug: string;
    name_en: string;
  };
  product_variants: readonly LiveProductVariantRow[];
  product_images: readonly LiveProductImageRow[];
}
```

- [ ] **Step 1: Write mapper tests first**

Test at least these behaviors:

```ts
it("derives the existing public route slug without mutating the database slug", () => {
  expect(derivePublicProductSlug("cutters", "cutters-liston")).toBe("liston");
  expect(derivePublicProductSlug("cutters", "sc-01t")).toBe("sc-01t");
});

it("hydrates exact sku/size options and the sort_order zero image", () => {
  const product = mapLiveProduct({
    id: "uuid-liston",
    slug: "cutters-liston",
    item_code: "36-5101",
    name_en: "Liston",
    description_en: "Catalogue-listed Liston.",
    is_active: true,
    category: { slug: "cutters", name_en: "Cutters" },
    product_variants: [
      { sku: "36-5101", size: "14.0 cm", variant_type: "Straight" },
      { sku: "36-5102", size: "17.0 cm", variant_type: "Straight" }
    ],
    product_images: [
      { image_path: "/media/catalogue-preview/cutters/example-secondary.avif", sort_order: 1 },
      { image_path: "/media/catalogue-preview/cutters/cutters-liston-straight.avif", sort_order: 0 }
    ]
  });

  expect(product.slug).toBe("liston");
  expect(product.code).toBe("36-5101");
  expect(product.catalogueCodes).toEqual([
    { code: "36-5101", size: "14.0 cm" },
    { code: "36-5102", size: "17.0 cm" }
  ]);
  expect(product.sizes).toEqual(["14.0 cm", "17.0 cm"]);
  expect(product.directions).toEqual(["Straight"]);
  expect(product.mediaPath).toBe("/media/catalogue-preview/cutters/cutters-liston-straight.avif");
});
```

Also test that duplicate sizes/directions are de-duplicated without reordering and that a product with zero variants still maps successfully.

- [ ] **Step 2: Run mapper tests and verify RED**

```bash
pnpm --filter @rosa/web test -- src/test/catalogue-live-mapper.test.ts
```

Expected: FAIL because the new module/functions do not exist yet.

- [ ] **Step 3: Implement the minimal pure mapper**

Rules:

```ts
export function derivePublicProductSlug(familySlug: string, dbSlug: string): string {
  const prefix = `${familySlug}-`;
  return dbSlug.startsWith(prefix) ? dbSlug.slice(prefix.length) : dbSlug;
}
```

For `mapLiveProduct`:
- reject unknown family slugs with a clear error rather than casting arbitrary strings;
- choose the primary image by `sort_order === 0`;
- build `catalogueCodes` from variants where both `sku` and `size` are non-empty;
- build unique sizes from non-empty `size` values;
- build unique direction/shape labels from non-empty `variant_type` values;
- keep `variants: []` in this first mapper because the existing DB's `variant_type` currently represents direction/shape semantics; do not duplicate it into two UI fields;
- set `catalogueReference.family` from category name and leave page absent because the live schema does not currently store catalogue page;
- set `mediaLabel` to the product name;
- set `mediaPath` only when a primary image exists;
- never read `name_ar` as verified Arabic in this slice.

- [ ] **Step 4: Run mapper tests and verify GREEN**

```bash
pnpm --filter @rosa/web test -- src/test/catalogue-live-mapper.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit the mapper**

```bash
git add apps/web/src/features/catalogue-live apps/web/src/test/catalogue-live-mapper.test.ts
git commit -m "feat(catalogue): map live product records safely"
```

---

### Task 4: Add a server-only live product repository with explicit migration fallback

**Files:**
- Create: `apps/web/src/features/catalogue-live/catalogue-live.repository.ts`
- Modify: `apps/web/src/features/catalogue-live/index.ts`
- Create: `apps/web/src/test/catalogue-live-repository.test.ts`

**Interfaces:**
- Produces:
  - `getLiveCatalogueProducts(): Promise<readonly CatalogueProductRecord[]>`
  - `getSearchCatalogueProducts(): Promise<readonly CatalogueProductRecord[]>`
- Internal testable seam:
  - `loadCatalogueProducts(query: CatalogueProductQuery): Promise<readonly CatalogueProductRecord[]>`

Use a narrow adapter so tests validate behavior without faking Supabase internals:

```ts
export interface CatalogueProductQuery {
  fetchActiveProductAggregates(): Promise<readonly LiveProductAggregate[]>;
}
```

- [ ] **Step 1: Write repository tests first**

Required tests:

```ts
it("returns only mapped active product rows from the query adapter", async () => {
  // adapter returns one known aggregate; expect one mapped CatalogueProductRecord
});

it("does not silently accept a non-active aggregate", async () => {
  // defensive assertion: mapper/repository must filter or reject is_active=false
});

it("preserves two products that share the same item code when their IDs/routes differ", async () => {
  // two 18-0644 aggregates must both survive
});
```

Do not mock `CATALOGUE_PRODUCTS` in these pure repository tests.

- [ ] **Step 2: Run tests and verify RED**

```bash
pnpm --filter @rosa/web test -- src/test/catalogue-live-repository.test.ts
```

Expected: FAIL because repository functions do not exist.

- [ ] **Step 3: Implement the Supabase query adapter**

The production query must be read-only and explicitly filter active products:

```ts
const { data, error } = await supabase
  .from("products")
  .select(`
    id,
    slug,
    item_code,
    name_en,
    description_en,
    is_active,
    category:categories!products_category_id_fkey(slug,name_en),
    product_variants(sku,size,variant_type),
    product_images(image_path,sort_order)
  `)
  .eq("is_active", true);
```

If Supabase's inferred relationship alias differs in the actual project, use the simplest relationship syntax accepted by the existing client; do not change schema to accommodate the query.

Validate `error` before mapping and throw a contextual `CatalogueLiveReadError`; do not return an empty array on infrastructure failure because that would turn a backend outage into a false "no products" state.

- [ ] **Step 4: Add the temporary migration fallback at one boundary only**

`getSearchCatalogueProducts()` may catch `CatalogueLiveReadError`, emit one server-side warning containing no credentials/user data, and return `CATALOGUE_PRODUCTS` as the temporary migration fallback:

```ts
export async function getSearchCatalogueProducts() {
  try {
    return await getLiveCatalogueProducts();
  } catch (error) {
    console.warn("[catalogue-migration] live product read failed; using temporary static fallback", error);
    return CATALOGUE_PRODUCTS;
  }
}
```

Do not scatter fallback logic across components. Later cutover plans remove this one boundary after parity acceptance.

- [ ] **Step 5: Run repository + mapper tests and verify GREEN**

```bash
pnpm --filter @rosa/web test -- src/test/catalogue-live-mapper.test.ts src/test/catalogue-live-repository.test.ts
```

Expected: PASS.

- [ ] **Step 6: Run typecheck**

```bash
pnpm --filter @rosa/web typecheck
```

Expected: PASS.

- [ ] **Step 7: Commit the repository**

```bash
git add apps/web/src/features/catalogue-live apps/web/src/test/catalogue-live-repository.test.ts
git commit -m "feat(catalogue): add read-only live product repository"
```

---

### Task 5: Migrate public search from static runtime data to the live repository

**Files:**
- Modify: `apps/web/src/features/search/search-page.tsx`
- Modify: `apps/web/src/features/search-preview/search-default-page.tsx`
- Modify: `apps/web/src/test/search-preview.test.tsx`
- Modify if required: `apps/web/src/test/search-catalogue.test.ts`

**Interfaces:**
- `SearchPage` changes from self-loading static data to:

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

- `SearchDefaultPage` becomes async and calls `getSearchCatalogueProducts()` once on the server.

- [ ] **Step 1: Add a failing ownership test**

Add a focused static/runtime test that fails while `search-page.tsx` imports the registry directly. Prefer an existing static-test pattern in `src/test/*.static.test.mjs`; if none fits, add a Vitest source assertion:

```ts
expect(searchPageSource).not.toContain('CATALOGUE_PRODUCTS');
```

Also render `SearchPage` with a deliberately tiny supplied product list and verify only those supplied products are searchable. This proves the component no longer reaches hidden static global data.

- [ ] **Step 2: Run the focused tests and verify RED**

```bash
pnpm --filter @rosa/web test -- src/test/search-preview.test.tsx src/test/search-catalogue.test.ts
```

Expected: FAIL because `SearchPage` still owns `CATALOGUE_PRODUCTS`.

- [ ] **Step 3: Inject products into the client component**

Remove:

```ts
import { CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";
```

Replace the search memo with:

```ts
const results = useMemo(
  () => searchCatalogue(products, trimmedQuery),
  [products, trimmedQuery]
);
```

Do not change the input UX, Arabic labels, ranking algorithm, motion wrappers, inquiry buttons, or public product href behavior.

- [ ] **Step 4: Make the server wrapper load canonical data**

Implement:

```tsx
export async function SearchDefaultPage({ initialQuery = "", locale = "en" }: Props) {
  const products = await getSearchCatalogueProducts();
  return <SearchPage products={products} initialQuery={initialQuery} locale={locale} />;
}
```

This is the only new network boundary for search. The browser still filters instantly with no request per keystroke.

- [ ] **Step 5: Run focused tests and verify GREEN**

```bash
pnpm --filter @rosa/web test -- src/test/search-preview.test.tsx src/test/search-catalogue.test.ts src/test/catalogue-live-mapper.test.ts src/test/catalogue-live-repository.test.ts
```

Expected: PASS.

- [ ] **Step 6: Run typecheck**

```bash
pnpm --filter @rosa/web typecheck
```

Expected: PASS.

- [ ] **Step 7: Commit the search cutover**

```bash
git add apps/web/src/features/search apps/web/src/features/search-preview apps/web/src/test/search-preview.test.tsx apps/web/src/test/search-catalogue.test.ts
git commit -m "feat(search): read products from canonical Supabase repository"
```

---

### Task 6: Verify production parity for the Search slice without mutating production

**Files:**
- Modify: `docs/architecture/2026-08-07-live-catalogue-baseline.md`

**Interfaces:**
- Consumes: live Supabase read access and the repository assumptions from Tasks 3–5.
- Produces: explicit evidence that the current DB can safely back Search before broader product-page cutover.

- [ ] **Step 1: Re-run read-only production invariants**

Execute read-only SQL equivalent to:

```sql
select c.slug as family_slug, count(*) as products
from products p
join categories c on c.id = p.category_id
where p.is_active = true
group by c.slug, c.sort_order
order by c.sort_order;
```

Expected:

```text
knives   22
scissors 42
punches  15
chisels  20
cutters  14
```

- [ ] **Step 2: Re-check mapper-critical invariants**

Read-only checks must confirm:
- 113 active products;
- 113 distinct derived public routes;
- 113 products with exactly one `sort_order=0` image;
- 0 products without category, slug, or item code;
- 322 variant rows;
- both `18-0644` products still exist;
- all current image paths remain unchanged unless an independently authorized admin edit occurred during the work.

- [ ] **Step 3: Recompute the pre-change fingerprints**

Because this entire plan performs no production writes, the five baseline fingerprints should still match exactly. If they differ, stop and investigate whether another authorized user/admin changed production during the implementation; do **not** overwrite anything to force the old fingerprint back.

- [ ] **Step 4: Record the verification result**

Append a dated `Search cutover verification` section to the baseline document including:
- exact read time;
- counts;
- whether fingerprints matched;
- any externally caused drift;
- explicit statement: `No production DDL/DML/Storage mutation was performed by this slice.`

- [ ] **Step 5: Commit verification evidence**

```bash
git add docs/architecture/2026-08-07-live-catalogue-baseline.md
git commit -m "docs: verify live search catalogue parity"
```

---

### Task 7: Run the slice gate without spending unnecessary CI budget

**Files:**
- No production file changes expected unless a test exposes a defect.

**Interfaces:**
- Produces: a verified checkpoint suitable for the next plan (family/product-detail/overview cutover) without touching production data.

- [ ] **Step 1: Run focused unit tests**

```bash
pnpm --filter @rosa/web test -- \
  src/test/catalogue-live-mapper.test.ts \
  src/test/catalogue-live-repository.test.ts \
  src/test/search-catalogue.test.ts \
  src/test/search-preview.test.tsx
```

Expected: all focused tests pass, 0 failures.

- [ ] **Step 2: Run the existing catalogue inventory/media tests**

Run the existing inventory/media tests for all five families. At minimum include the already-established scissors and cutters inventory/media suites; locate the equivalent knives/punches/chisels files before executing rather than guessing filenames.

Expected: all existing catalogue invariants remain green.

- [ ] **Step 3: Run strict typecheck and lint**

```bash
pnpm --filter @rosa/web typecheck
pnpm --filter @rosa/web lint
```

Expected: PASS.

- [ ] **Step 4: Run production build**

```bash
pnpm --filter @rosa/web build
```

Expected: PASS with no new runtime/static-render error caused by the async search server boundary.

- [ ] **Step 5: Perform one live browser smoke test if credentials are configured**

Verify `/search?q=cutters`:
- returns the expected 14 cutter results;
- product images render;
- `View product` URLs remain `/products/cutters/<route-local-slug>`;
- `Add to inquiry` still works;
- Arabic search layout still renders correctly.

Do not change production data during the smoke test.

- [ ] **Step 6: Inspect the branch diff against the source branch**

```bash
git diff --stat ahmadx67676767...HEAD
git diff ahmadx67676767...HEAD -- \
  apps/web/src/features/catalogue-live \
  apps/web/src/features/search \
  apps/web/src/features/search-preview \
  README.md \
  docs/architecture/2026-08-07-live-catalogue-baseline.md
```

Expected: no admin mutation changes, no seed changes, no schema SQL, no storage cleanup, no unrelated frontend refactors.

- [ ] **Step 7: Do not merge yet if verification is unavailable**

If the execution environment cannot run the repo test suite, leave the branch unmerged and report the exact commands that remain unexecuted. Never label this slice fully verified merely because source review looks correct.

---

## Follow-up plans after this slice

This plan intentionally stops after the first live public consumer. The approved design continues through separate independently reviewable plans:

1. **Family listing + Product detail + Products overview + Homepage/related-product cutover.** Before that plan, decide how to preserve catalogue page references that are present in the TypeScript catalogue but not in the current live schema. Additive DDL is allowed only if parity proves it is required.
2. **Lean Product Admin + product media writes.** Secure the privileged client, enforce owner authorization and file validation, use the same canonical records as public pages, and revalidate public consumers. No admin visual redesign beyond removing false/obsolete controls required for correctness.
3. **Catalogue PDF + Contact canonicalization + retired CMS surfaces.** Unify five catalogue PDF references and operational contact data; retire Publishing Centre/Revision History/Website Content/generic Media from the normal admin workflow.
4. **Inquiry persistence normalization, if still desired.** Preserve immutable submitted product snapshots; do not block catalogue cutover on this later schema improvement.

The broader TypeScript runtime fallback is removed only after all public catalogue consumers pass the approved 113-product acceptance gate.