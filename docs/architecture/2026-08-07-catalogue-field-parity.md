# Catalogue Field Parity Audit — 2026-08-07

## Purpose

This audit compares the approved TypeScript catalogue model with the current live Supabase representation before any public read cutover. It exists specifically to prevent a superficially successful migration that silently drops product detail/search semantics.

No production database or Storage mutation was performed while producing this audit.

## What live Supabase already represents well

The current backend work is substantial and should be preserved rather than rebuilt.

The live schema already represents these product facts well:

- stable database UUID
- category/family relationship
- family-prefixed database slug
- primary item code
- English product name
- English product description
- active state
- exact SKU rows for the great majority of code options
- size on each existing SKU row
- a limited `variant_type` field, currently used mainly for Straight/Curved/Angled direction semantics
- one canonical primary `product_images` relationship per product

The database inventory exactly matches the approved public family counts: 113 total products across 22 Knives, 42 Scissors, 15 Punches, 20 Chisels and 14 Cutters.

## Material fields in the approved public Product model that are not fully represented

The TypeScript `CatalogueProductRecord` contains several display/catalogue semantics not faithfully carried by the current tables:

1. **Display variants / product attributes**
   - `variants[]` is not equivalent to current `product_variants.variant_type`.
   - Knives use values such as `No. 3`, `Micro surgery`, `Long`, `Hexagonal`, `Individual punches`, and `Six interchangeable tips with handle and rack`.
   - Punches use values such as `Code group 21-10xx`, `Horizontal cutting`, `Spoon-shaped`, `Biopsy, straight`, `8.0 cm shaft`, and `9.5 cm shaft, 1.5 mm opening`.
   - Scissors use **two product-level attributes**: finish (`Regular`, `Super Cut`, `Tungsten Carbide`) and point style (`Sharp`, `Blunt`, `Sharp/Sharp`, `Sharp/Blunt`, `Blunt/Blunt`). Current DB `variant_type` carries direction instead.
   - Chisels use instrument kind (`Osteotome`, `Chisel`, `Gouge`) separately from direction.
   - Cutter batch products generally need only direction, but the preserved `SC-01T` product has the additional variant `Fine point`, which is absent from its live DB row.

2. **Primary option**
   - The current public product model has an explicit `primaryOption` selected from source semantics.
   - It is not always equivalent to first size or current DB `variant_type`.

3. **Catalogue page reference**
   - The current public product detail can show a source catalogue page.
   - No live product column currently stores this page reference.

4. **Exceptional display size data**
   - Most exact code/size mappings are faithfully represented in `product_variants`.
   - `knives-scalpel-handle-no-3` is intentionally a second product with code `18-0644`. Because `product_variants.sku` is unique and `18-0644` is already used by `knives-round-straight`, this preserved product currently has zero variant rows even though the public source records size `14.5 cm`.
   - This is not an error to "fix" by deduplicating either product.

5. **Media label / alternate fallback media**
   - The canonical primary image path is represented by `product_images` and is sufficient to render the current approved image.
   - Rich source media labels and WebP fallback paths live only in the TypeScript media registry.
   - These are lower priority than product option/page parity. Historical assets do not need to be moved into Storage merely for consistency.

6. **Legacy static product IDs**
   - Static IDs differ from live database UUIDs.
   - They should not become another permanent DB field merely to preserve an implementation detail.
   - The inquiry migration compatibility fix instead treats `familySlug + public slug` as the stable same-product identity when merging an existing local inquiry line.

## Concrete read-cutover blocker found during audit

The preserved cutter product `SC-01T` demonstrates why counts alone are not enough.

Approved source model:

```text
Product: SC-01T
Size: 12.5 cm
Variant: Fine point
Direction: Straight
Primary option: 12.5 cm
Catalogue page: 10
```

Current live database representation:

```text
Product: SC-01T
Size: 12.5 cm
variant_type: Straight
```

`Fine point` and catalogue page `10` are not represented. Switching the whole public product model to the DB as-is would therefore lose approved product detail. Search also indexes `variants[]`, so source-specific search terms can disappear even if every row count still matches.

## Family-level parity summary

### Knives

- 22 product records match live inventory.
- Exact codes/sizes are largely present.
- All approved products have meaningful `variants[]` source semantics, while live `variant_type` is null for almost all knife rows.
- Catalogue pages are missing from DB.
- The duplicate `18-0644` preserved product cannot express its display size through the current unique-SKU variant table.

**Conclusion:** current DB is not yet sufficient for lossless public Knife Product hydration.

### Scissors

- 42 products and 132 exact code rows match the approved inventory.
- Current DB captures direction well (66 Straight / 66 Curved).
- Finish and point style are not independently represented as structured fields.
- English descriptions happen to include finish/direction/point style, so free-text search may still find many terms, but structured product-detail options would regress if derived only from current rows.
- Catalogue pages are missing from DB.

**Conclusion:** exact code/size/direction parity is strong; structured display metadata still needs a canonical representation.

### Punches

- 15 products and 33 exact code rows match inventory.
- Product-level variants such as code-group labels, cutting orientation, spoon shape, shaft length and opening detail are not faithfully stored in current variant rows.
- Catalogue pages are missing.

**Conclusion:** current DB is not sufficient for lossless public Punch Product hydration.

### Chisels

- 20 products and 99 exact code rows match inventory.
- Size data is strong and direction is represented for many rows.
- Approved product-level instrument kind is a separate structured concept from direction; current schema does not preserve that distinction as product metadata.
- Explicit `primaryOption` and catalogue page are missing.

**Conclusion:** current DB preserves the hard code/size catalogue well but needs compact display metadata for exact public parity.

### Cutters

- 14 products and 23 exact code rows match inventory.
- Direction is represented well for batch products.
- `SC-01T` proves an additional variant can exist outside direction.
- Catalogue pages are missing.

**Conclusion:** closest family to lossless current-schema hydration, but still not fully equivalent.

## Minimal schema direction to evaluate

The audit does **not** justify rebuilding the existing normalized tables. The current product/category/variant/image relationships should remain.

The smallest coherent additive option is one validated product-level JSONB field for source/display metadata, for example:

```json
{
  "sizes": ["12.5 cm"],
  "variants": ["Fine point"],
  "directions": ["Straight"],
  "primaryOption": "12.5 cm",
  "cataloguePage": "10",
  "mediaLabel": "SC-01T"
}
```

Working name: `catalogue_metadata`.

This would complement, not replace:

- `products` for identity/text/state
- `product_variants` for exact SKU/size mappings
- `product_images` for product-media relationships
- `categories` for fixed family identity

Advantages of one additive metadata field:

- no destructive rewrite of partner-built tables;
- heterogeneous family-specific attributes can be preserved exactly;
- duplicate-code exceptional display size can be represented without weakening the existing unique SKU constraint;
- public domain hydration can reproduce the approved Product shape exactly;
- later admin forms can validate typed metadata rather than exposing raw JSON;
- migration can be idempotent and keyed by existing stable database slug.

Risks/requirements before applying it:

- generate all 113 metadata payloads directly from the approved TypeScript source, not by guessing from names/descriptions;
- compare every generated slug/code/name to live data before backfill;
- add the field through a tracked additive migration only;
- backfill in a transaction and abort on missing/unexpected products;
- verify the 113-product/family/route/code/image baseline again after migration;
- never alter existing IDs, slugs, variants, image rows, RLS policies, indexes or Storage during that migration.

## Decision for current implementation slice

Do **not** switch Search or other public Product consumers to live Supabase hydration until this metadata parity gap is resolved.

Safe work already independent of that blocker:

- Search result renderer can and should display the existing product media fields.
- Inquiry basket/hash identity can be made compatible with the future transition from static IDs to DB UUIDs.
- Read-only repository/mapping experiments may continue behind tests, but they must not become the authoritative public Product source until lossless metadata parity exists.

This pause is intentional preservation work, not a rollback of the Supabase-as-sole-live-source decision.