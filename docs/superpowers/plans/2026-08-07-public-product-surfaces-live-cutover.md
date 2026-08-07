# Remaining Public Product Surfaces Live Cutover Implementation Plan

> **Execution:** Continue the approved canonical-catalogue design using the already-verified read-only Supabase repository and temporary validated metadata bridge. No production database mutation is permitted in this plan.

**Goal:** Move every remaining public product-rendering surface from the TypeScript product registry/fixtures to the same validated Supabase-backed product collection already used by Search: family listings, product detail, related products, Products overview representative cards, and Homepage selected-product cards.

**Architecture:** Product identity/text/code/exact code options/primary media come from the live Supabase snapshot. Missing display metadata continues to come only from the explicit `CATALOGUE_METADATA_MANIFEST` bridge until a later additive database migration is separately proven. The five family presentation records remain source-controlled because family marketing/presentation was explicitly removed from admin scope. Featured product route selection may remain source-controlled, but featured product contents must be hydrated from the canonical live product collection rather than contract fixtures/static catalogue records.

## Guardrails

- No Supabase DDL/DML/RLS/index/function/Storage changes.
- No seed execution.
- Preserve all 113 live product identities, routes and media relationships.
- Do not alter family hero/marketing content or imagery.
- Do not alter page layout/motion/design.
- Do not change inquiry semantics beyond using the already-verified canonical product objects.
- Live parity drift fails closed; only an infrastructure read outage may use the existing temporary static fallback.
- Family records are fixed source-controlled presentation data; product records are live operational data.
- Source-controlled featured-product selection is allowed, but selected product name/code/description/options/media/ID must come from live canonical products.
- Avoid broad refactors outside product-data ownership.

## Task 1 — Generalize the verified public catalogue read boundary

**Modify:** `apps/web/src/features/catalogue-live/catalogue-live.repository.ts`

Add a canonical public read name:

```ts
export async function getPublicCatalogueProducts(): Promise<readonly CatalogueProductRecord[]>
```

Behavior is identical to the verified Search read boundary:
- live read + full manifest parity validation;
- `CatalogueLiveParityError` throws;
- `CatalogueLiveReadError` may use the one temporary migration fallback;
- no consumer adds its own fallback.

Keep `getSearchCatalogueProducts()` as a thin compatibility alias during this branch if useful, or update Search to call the general function.

Add/extend repository tests to prove Search and other consumers share one policy.

## Task 2 — Add pure selectors over an injected canonical product collection

**Create:** `apps/web/src/features/catalogue-live/catalogue-live.selectors.ts`
**Modify:** `apps/web/src/features/catalogue-live/index.ts`
**Create:** `apps/web/src/test/catalogue-live-selectors.test.ts`

Expose pure helpers:

```ts
getFamilyProducts(products, familySlug)
getProductByPublicRoute(products, familySlug, productSlug)
getRelatedProductsFromCatalogue(products, product, limit)
```

Rules:
- preserve canonical array order so related-product behavior remains deterministic;
- route identity is `familySlug + public slug`, never item code or internal ID;
- related products must share family and exclude the current product by public route;
- unknown fixed family returns empty/null as appropriate;
- duplicate `18-0644` routes remain independent.

TDD cases include:
- Cutters family returns all injected cutters only;
- exact route returns DB-UUID-backed product;
- duplicate item code does not confuse route lookup;
- related products exclude current route and respect limit.

## Task 3 — Cut Family Listing to injected canonical products

**Modify:**
- `apps/web/src/features/family-listing/family-listing.data.ts`
- `apps/web/src/features/family-listing/family-listing-page.tsx`

`createFamilyListingData` becomes pure over an injected product collection:

```ts
createFamilyListingData(familySlug, products)
```

Family presentation metadata comes from `CATALOGUE_FAMILIES` directly, not `getFamilyListingModel()`/`registry.ts`.

`FamilyListingPage` becomes async:

```tsx
const products = await getPublicCatalogueProducts();
const data = createFamilyListingData(familySlug, products);
```

No UI markup/content changes.

Add a focused data test proving a synthetic live product appears and an unrelated static registry product cannot leak into the result.

## Task 4 — Cut Product Detail and Related Products to canonical products

**Modify:**
- `apps/web/src/features/product-detail/product-detail.data.ts`
- `apps/web/src/features/product-detail/product-detail-page.tsx`

`createProductDetailData` becomes:

```ts
createProductDetailData(familySlug, productSlug, products)
```

Family presentation comes from fixed `CATALOGUE_FAMILIES`.
Product and related products come only from injected canonical data.
Specification-building logic remains unchanged.

`ProductDetailPage` becomes async and loads `getPublicCatalogueProducts()` once.
The resulting inquiry item uses the canonical DB UUID but the already-fixed inquiry store merges same public route across old/new IDs.

Tests:
- route resolves a synthetic DB UUID product;
- missing product returns null;
- related products are from the injected collection only;
- catalogue page / display variants from metadata bridge still appear in specifications;
- `18-0644` does not resolve the wrong product.

## Task 5 — Make featured-product selection hydrate from canonical products

**Modify:** `apps/web/src/features/public-catalogue/selectors.ts`
**Create/modify tests:** focused selector test.

Remove `CATALOGUE_PRODUCTS` as the source of featured product contents.
Use the existing three contract fixture routes only as the source-controlled **selection list/order** during migration:

```text
knives/scalpel-handle-no-3
scissors/mayo-scissors
punches/biopsy-punch
```

For each selected route, find the canonical live product and build `ProductPreviewModel` from that product:
- `id` = live DB UUID;
- `name` = live canonical name;
- `code` = live canonical primary code;
- description = live canonical description when available;
- media = live canonical media;
- option summary = concise canonical product metadata, preserving current card intent.

The contract fixture must not override live name/code/media.
If a selected route is missing from canonical products, throw rather than silently use stale fixture contents.

Preferred option-summary rule:
1. first size if present;
2. first display variant, else first direction if present;
3. remove duplicates/empty values.

This fixes the current Mayo fixture drift (`04-0402`) by displaying the actual canonical live product code instead of a stale fixture code.

## Task 6 — Cut Products Overview representative cards to canonical products

**Modify:**
- `apps/web/src/features/products/products.data.ts`
- `apps/web/src/features/products/products-overview.tsx`

Do not change static page copy/family cards/catalogue CTA.
Change model creation so representative `products` are supplied from `selectFeaturedProducts(canonicalProducts)`.

Recommended API:

```ts
createProductsPageModel(products, locale)
```

`ProductsOverview` becomes async, loads `getPublicCatalogueProducts()` once and builds the localized model.

Remove module-evaluation calls that construct product previews from static data.

Tests prove:
- representative card IDs/codes/media come from supplied live-shaped products;
- Arabic family labels remain localized;
- static marketing copy is unchanged.

## Task 7 — Cut Homepage selected-product cards to canonical products

**Modify:**
- `apps/web/src/features/homepage/homepage.data.ts`
- `apps/web/src/features/homepage/homepage.tsx`
- `apps/web/src/features/localization/public-copy.ts` only as needed to stop module-time static product hydration.

Keep hero/family/procurement/catalogue/quotation copy source-controlled exactly as approved.
Remove static product-card construction from `HOME_PAGE_MODEL` / `HOME_PAGE_MODEL_AR` module initialization.

Recommended model API:

```ts
createHomePageModel(products, locale)
```

`Homepage` becomes async, loads `getPublicCatalogueProducts()` once, and injects the same canonical featured-product models used by Products overview.

No hero text/image/admin behavior changes.

Tests prove representative homepage product code/media is canonical while hard-coded hero content is unchanged.

## Task 8 — Remove direct public runtime product-registry ownership

**Modify:** `apps/web/src/features/public-routing/resolve-public-page.tsx` only if needed.

Do not use `resolveCataloguePath()` merely to source product data after Tasks 3–7.
During the temporary metadata-bridge period, route classification may use the fixed five-family list plus the validated metadata manifest route set, because the manifest is already an explicit migration bridge. It must not use `CATALOGUE_PRODUCTS` as live product truth.

Preferred:
- `/products/<known-family>` => family route;
- `/products/<known-family>/<manifest-known-public-slug>` => product route;
- otherwise not-found.

Actual page product contents still come from Supabase.

Add a route regression test for representative products from all five families plus an unknown route.

## Task 9 — Verification gate

Run focused unit/component tests for:
- metadata manifest
- live mapper/repository/live selectors
- Search
- family listing
- product detail/related
- public featured selectors
- Products overview
- Homepage
- inquiry store/hash compatibility

Then:

```bash
pnpm --filter @rosa/web typecheck
```

Run focused ESLint only over changed files if the known unrelated `admin-publishing.test.tsx` full-lint failure remains.
Run:

```bash
pnpm --filter @rosa/web build
```

Run guarded live read-only parity again against production and confirm all 113 still hydrate.

Recompute the frozen production fingerprints. They must remain unchanged unless another authorized actor made a legitimate concurrent change. Never write data back to force fingerprint equality.

Record verification in `docs/architecture/2026-08-07-live-catalogue-baseline.md`.

## Completion criterion

After this plan passes, every public surface that renders an individual product uses the same validated Supabase-backed product collection:

- Search
- family listing
- product detail
- related products
- Products representative cards
- Homepage selected-product cards

The TypeScript product registry remains only as migration/reference/fallback material, not the normal product-content source for these public surfaces. The remaining major product task after this is the **lean Product Admin write path**, where owner edits/media replacements must write the same canonical records consumed here.