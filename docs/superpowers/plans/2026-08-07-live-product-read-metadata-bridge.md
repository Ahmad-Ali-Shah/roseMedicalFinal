# Validated Live Product Read + Temporary Metadata Bridge Plan

**Goal:** Make Search the first Supabase-backed public product consumer without losing any approved product options/catalogue-page semantics and without writing to production.

**Why this plan exists:** Field-level parity proved the current live tables do not yet represent all `CatalogueProductRecord` display metadata. Instead of either (a) losing data or (b) rushing a production schema change, this plan treats the checked-in `CATALOGUE_METADATA_MANIFEST` as an explicit temporary migration bridge. Supabase remains authoritative for product identity, text, category, active state, exact variant rows and primary image relationship. The manifest supplies only the fields proven absent from the current schema and validates that the live row still matches the approved slug/code/name before hydration.

## Guardrails

- Read-only Supabase queries only.
- No migration/DDL/DML/Storage actions.
- A live row with no manifest entry or mismatched code/name must fail closed; never silently mix unrelated source data.
- The bridge must live in one mapper/repository layer, never scattered through UI components.
- The entire static `CATALOGUE_PRODUCTS` array remains the emergency migration fallback only if the live read fails.
- Search receives DB UUIDs, so the already-added inquiry route-identity compatibility is a prerequisite.
- This bridge is temporary and is deleted after `catalogue_metadata` is safely persisted and verified in Supabase.

## Task 1 — Raw live snapshot types

Create `apps/web/src/features/catalogue-live/catalogue-live.types.ts` with narrow types for existing rows:

- product: id, category_id, item_code, name_en, description_en, is_active, slug, created_at
- category: id, slug, name_en, is_active, deleted_at
- variant: product_id, sku, size, variant_type, created_at
- image: product_id, image_path, sort_order
- snapshot: arrays of all four

No schema-generation refactor.

## Task 2 — Pure validated mapper

Create `map-live-product.ts` and tests.

Mapper inputs:

```ts
mapLiveCatalogue(
  snapshot: LiveCatalogueSnapshot,
  manifest: readonly CatalogueMetadataManifestEntry[]
): readonly CatalogueProductRecord[]
```

Rules:

1. filter to `is_active === true` products;
2. category must exist, be active/non-deleted and be one of five known families;
3. DB slug must equal the manifest `dbSlug`;
4. DB `item_code` and `name_en` must exactly equal manifest expected values;
5. output `id` is live DB UUID;
6. output public slug is manifest `publicSlug` (not string guessing once validated);
7. output description comes from live `description_en`;
8. sizes/variants/directions/primaryOption/catalogue page/media label come from the manifest bridge;
9. exact `catalogueCodes` are built from live variant rows with sku + size, ordered by `created_at`;
10. primary image comes from live `product_images` row with `sort_order = 0`;
11. duplicate code `18-0644` survives because mapping is keyed by slug, never code;
12. every manifest entry must have exactly one matching live product; extra/missing live products fail the 113-product gate.

Tests must cover Liston, SC-01T, a Scissors product with two display variants, duplicate `18-0644`, missing manifest and identity mismatch.

## Task 3 — Read-only Supabase snapshot reader

Create `catalogue-live.repository.ts` with an injected reader seam for tests.

Production reader performs four simple SELECTs in parallel:

```ts
products: id,category_id,item_code,name_en,description_en,is_active,slug,created_at
categories: id,slug,name_en,is_active,deleted_at
product_variants: product_id,sku,size,variant_type,created_at
product_images: product_id,image_path,sort_order
```

Product query explicitly applies `.eq("is_active", true)`.
Category query explicitly applies active/non-deleted filters.
Variant query orders by `created_at` ascending.
Image query orders by `sort_order` ascending.

Any Supabase error throws `CatalogueLiveReadError`. Do not return `[]` on infrastructure failure.

`getSearchCatalogueProducts()` catches only the live-read/mapping failure at one boundary, logs a migration warning, and returns `CATALOGUE_PRODUCTS` as the temporary emergency fallback.

## Task 4 — Search cutover

- `SearchPage` accepts `products` prop and no longer imports `CATALOGUE_PRODUCTS`.
- `SearchDefaultPage` becomes async server component and calls `getSearchCatalogueProducts()`.
- Browser filtering remains local and instant.
- Existing Search image fix remains.
- Existing routes, ranking, Arabic labels and Add-to-inquiry UI remain.

Tests prove that a deliberately supplied product list is the only searchable set.

## Task 5 — Read-only acceptance

Use Supabase read queries to confirm after code changes:

- 113 active live products;
- 113 manifest identities already independently matched by slug + primary code + name (22/42/15/20/14 exact family checks completed read-only on 2026-08-07);
- 322 variants;
- 113 primary image relationships;
- both `18-0644` routes remain;
- baseline production fingerprints unchanged.

Do not call this branch merge-ready unless the repository test/typecheck/build commands are executed in a real checkout. This chat environment has GitHub/Supabase connectors but no executable Rosa repository checkout, so source changes may be prepared here while final runtime verification remains an explicit gate.