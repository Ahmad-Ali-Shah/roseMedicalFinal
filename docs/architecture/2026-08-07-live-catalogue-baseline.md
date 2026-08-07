# Live Catalogue Preservation Baseline — 2026-08-07

## Purpose

This document freezes the production catalogue state observed immediately before the canonical source-of-truth migration begins. It is a preservation tripwire, not a request to rewrite production back to these values later.

The connected production Supabase project is:

- Project: `rosa-medical`
- Project ref: `hzwabrbrgcxodkqilgdi`
- Region: `ap-south-1`
- Status at reconnaissance: `ACTIVE_HEALTHY`
- PostgreSQL: 17

The first implementation slice is intentionally read-only against this project.

## Dataset baseline

| Dataset | Rows | Fingerprint |
| --- | ---: | --- |
| `categories` | 5 | `653cd90456d3c31ac61455979f4e7442` |
| `products` | 113 | `e06862f03551d86942dc87bf86bd5929` |
| `product_variants` | 322 | `e79d48cccd26c4a9d10f9fdc903a5e2c` |
| `product_images` | 113 | `393262a999597ea7d0963e5365a98da0` |
| `site_settings` | 5 | `b0d5389b83e30c869990f1e6aec1bb2f` |

Derived public-route fingerprint: `0acd7d0c9941198cc818382a49027b92`.

The fingerprints include existing IDs and values. If a later read differs, the difference must be investigated. An agent must never overwrite newer legitimate data merely to restore a historical fingerprint.

## Family inventory

| Family | Live products |
| --- | ---: |
| Knives | 22 |
| Scissors | 42 |
| Punches | 15 |
| Chisels | 20 |
| Cutters | 14 |
| **Total** | **113** |

These counts exactly match the approved current public catalogue inventory.

## Product identity and routing observations

- 113/113 products currently have a category.
- 113/113 products currently have a non-empty item code.
- 113/113 products currently have a non-empty slug.
- 113/113 products are currently active.
- 113/113 database slugs are family-prefixed.
- Stripping only the matching family prefix produces 113 distinct existing public `family/local-product-slug` routes.
- Database slugs must not be rewritten merely to match public route-local slugs. Route identity is derived in application code during migration.

Representative mapping:

```text
DB slug:       cutters-liston
Family:        cutters
Public slug:   liston
Public route:  /products/cutters/liston
Item code:     36-5101
```

## Known duplicate catalogue code

`18-0644` currently belongs to two separate product records/routes:

- `knives-round-straight`
- `knives-scalpel-handle-no-3`

This is known source data. Migration code must preserve both records and must not infer product uniqueness from `item_code` alone.

## Variant observations

- Total `product_variants`: 322.
- Every current variant has a non-empty SKU and size.
- Variant-type distribution:
  - Straight: 123
  - Curved: 88
  - Angled to side: 1
  - Null/not specified: 110
- `knives-scalpel-handle-no-3` is the only current product with zero variant rows.

Per family:

| Family | Products | Variants |
| --- | ---: | ---: |
| Knives | 22 | 35 |
| Scissors | 42 | 132 |
| Punches | 15 | 33 |
| Chisels | 20 | 99 |
| Cutters | 14 | 23 |

## Product media observations

- `product_images` contains 113 rows.
- Every current product has exactly one `sort_order = 0` image relationship.
- 113/113 current image paths begin with `/media/` and reference approved static public assets.
- Existing approved static assets do not need to be copied into Supabase Storage merely to make the database relationship canonical.

The `product-media` Storage bucket currently contains two objects:

1. `knives-number-3/1786121559101.jpeg`
2. `uploads/1786135189846_temp.txt`

Neither object is to be deleted automatically. Their ownership/reference state can be reviewed in a later explicit cleanup task.

## Arabic seed-data observation

Current database Arabic product/category values are not verified translation evidence:

- 113/113 `products.name_ar` values equal `name_en`.
- 113/113 populated `products.description_ar` values equal `description_en`.
- All five category `name_ar` values are the English family names.

The migration must not present these copied seed values as verified Arabic translations.

## Contact/settings observation

The five current `site_settings` keys are:

- `about_us`
- `contact_address`
- `contact_email`
- `contact_phone`
- `contact_whatsapp`

Their current English/Arabic values are empty. The public hard-coded example contact values therefore must not be mistaken for verified Supabase truth during later contact canonicalization.

## Security/schema observations to preserve for later review

- All current public application tables have RLS enabled.
- `is_admin()` exists and checks the authenticated profile role.
- `products` currently has both an active-only public SELECT policy and a broader public SELECT policy. Public read code must explicitly filter `is_active = true`; this first slice does not alter policies.
- Some product/category foreign-key indexes are duplicated. This first slice does not perform index cleanup.
- No public table triggers were found.
- No Supabase migrations are currently registered for this project.
- The existing database schema therefore receives no speculative cleanup or restructuring in the first cutover slice.

## Forbidden in this slice

The canonical Search/read-foundation slice must not perform any of the following against production:

- DDL migration
- table/column rename or drop
- INSERT, UPDATE, UPSERT, DELETE, TRUNCATE or reseed
- product UUID change
- database slug rewrite
- RLS policy change
- function or trigger change
- index cleanup
- bucket creation/deletion/configuration change
- Storage upload/update/delete
- automatic orphan cleanup
- catalogue seed execution

Any later database change must be independently justified by a field-level parity gap, additive where possible, idempotent, and reviewed before production application.

## Migration principle

The production database is not an empty target to rebuild. It already contains substantial backend work that must be preserved. The migration direction is:

```text
existing live Supabase data
        +
verified static catalogue reference
        |
        v
carefully mapped canonical domain
        |
        v
public consumers migrated one bounded slice at a time
```

Static catalogue data remains a temporary verification/fallback source until the full 113-product acceptance gate passes. It is not permission to overwrite live records blindly.

## Search/read foundation verification — 2026-08-07

The first live-read cutover checkpoint was verified on the isolated `integration/canonical-catalogue-source-of-truth` branch before any production mutation.

Verification evidence:

- 8 focused catalogue/search/inquiry test files passed: **40/40 tests**.
- A guarded integration test queried the live production Supabase project with browser-safe public read credentials only and hydrated all **113** approved products through the same application mapper used by the Search repository.
- Live family counts passed exactly: Knives 22, Scissors 42, Punches 15, Chisels 20, Cutters 14.
- Every hydrated product had its required primary media relationship.
- Both products with code `18-0644` remained separate.
- Missing structured display metadata such as SC-01T `Fine point` and catalogue page `10` survived through the explicitly temporary validated metadata bridge.
- Web TypeScript check passed.
- Focused ESLint over every changed migration file passed.
- Production web build passed.
- A full-project lint attempt remains independently blocked by a pre-existing unchanged `require()` import lint error in `src/test/admin-publishing.test.tsx`; this migration intentionally did not alter that unrelated Publishing Centre area, which is outside the newly approved admin scope.
- The temporary verification pull request was closed without merge after evidence was collected.
- The temporary verification workflow was deleted after the successful checkpoint so it cannot continue consuming GitHub Actions runs.

Fresh read-only production fingerprints after verification still matched the initial baseline exactly:

| Dataset | Rows | Post-verification fingerprint |
| --- | ---: | --- |
| `categories` | 5 | `653cd90456d3c31ac61455979f4e7442` |
| `products` | 113 | `e06862f03551d86942dc87bf86bd5929` |
| `product_variants` | 322 | `e79d48cccd26c4a9d10f9fdc903a5e2c` |
| `product_images` | 113 | `393262a999597ea7d0963e5365a98da0` |
| `site_settings` | 5 | `b0d5389b83e30c869990f1e6aec1bb2f` |

The derived public-route fingerprint also remained `0acd7d0c9941198cc818382a49027b92` across 113/113 distinct routes.

**No production DDL, DML, RLS, function, trigger, index, bucket, or Storage-object mutation was performed by this implementation slice.**
