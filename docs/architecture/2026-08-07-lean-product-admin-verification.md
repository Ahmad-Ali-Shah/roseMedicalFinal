# Lean Product Admin Verification — 2026-08-07

## Scope

This checkpoint makes Product Admin read the same canonical live catalogue used by public product surfaces and introduces one bounded operational write path: replacing a product's existing primary image.

Product identity, family, public route, item code, exact code/size rows and catalogue display metadata remain read-only during the source-of-truth migration. The existing category-change mutation and broad draft/review/publish/archive/delete controls were removed from the Product editor rather than being left as misleading or unsafe operations.

## Preservation rules applied

- Production Supabase received no write during implementation or verification.
- No migration/DDL was applied.
- No RLS policy, index, function, trigger, bucket or Storage object was changed.
- No product UUID, slug, category, item code, variant row or existing image relationship was rewritten.
- The existing single-primary-image invariant is required before an image replacement may start.
- Previous images are not automatically deleted by the new action.

## Security changes

Privileged server operations no longer fall back to the public anonymous/publishable key.

`createAdminClient()` now requires:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

The image action first calls the cookie-bound authentication client and requires the authenticated user's `profiles.role` to equal the existing backend role `admin`. Live reconnaissance found one current `admin` profile; no new owner/admin role model was invented.

## Canonical Admin reads

Product Admin route classification now uses the explicit verified migration route manifest instead of a static product object.

The editor and list load the canonical Supabase-backed product collection:

- list image comes from the live primary `product_images` relationship;
- list option summary comes from verified product sizes/variants/directions;
- public links point to the exact product detail route;
- editor identity/specification/media values come from the same canonical product object used publicly.

The admin read path deliberately uses the strict live reader rather than the public outage fallback. An admin should see a catalogue read/parity failure rather than edit stale fallback data.

## Safe image replacement transaction shape

The write core validates before Storage is touched:

1. UUID-shaped product ID;
2. one of the five fixed family slugs;
3. safe public product slug;
4. non-empty file no larger than 8 MiB;
5. MIME restricted to JPEG, PNG, WebP or AVIF;
6. extension derived from MIME rather than the uploaded filename;
7. live product ID/family/DB-slug/active-state identity match;
8. exactly one existing `sort_order = 0` primary image row.

A new object is then uploaded under:

```text
product-media/products/<product-uuid>/<random-uuid>.<validated-extension>
```

with `upsert: false`.

Only the exact pre-existing primary-image row is updated. If that DB update fails or does not affect exactly one expected row, the newly uploaded object is removed as compensation and the action fails. The old image is not deleted.

Successful writes revalidate:

- `/`
- `/products`
- `/search`
- the exact family route
- the exact product route
- `/admin/products`
- the exact admin product editor route

## Remote image rendering

Next Image and the page CSP now allow only the configured HTTPS Supabase origin for the exact public `product-media` Storage path:

```text
/storage/v1/object/public/product-media/**
```

No broad remote-image wildcard was added.

## Verification evidence

A fresh isolated checkout of `integration/canonical-catalogue-source-of-truth` was used for executable verification.

The local checkpoint completed successfully with:

- 15 focused canonical/public/admin test files: **61 tests passed**;
- separate guarded live production Supabase read-only parity test: **1 test passed**, hydrating all 113 approved products;
- Web TypeScript check: passed;
- focused ESLint over the changed Product Admin/security/media files: passed;
- production Next.js build: passed.

The verification did not submit the admin media form and did not execute any production write.

A fresh read-only fingerprint comparison was also run against the frozen baseline after the checkpoint. The expected baseline remains:

- categories: `653cd90456d3c31ac61455979f4e7442`
- products: `e06862f03551d86942dc87bf86bd5929`
- product_variants: `e79d48cccd26c4a9d10f9fdc903a5e2c`
- product_images: `393262a999597ea7d0963e5365a98da0`
- site_settings: `b0d5389b83e30c869990f1e6aec1bb2f`

No intentional production mutation occurred in this checkpoint.

## Remaining write-integration gate

The action's transaction/compensation behavior is verified with injected fake repository/Storage dependencies, but a real upload/update must not be tested against production.

The connected Supabase organization reports a development-branch cost of **$0.01344 per hour**. A development branch should be created only after explicit cost approval, then used to verify the real database/Storage write behavior before production use.

The same short-lived development branch can also be used to validate the later additive catalogue-metadata migration, reducing risk and avoiding repeated production experimentation.