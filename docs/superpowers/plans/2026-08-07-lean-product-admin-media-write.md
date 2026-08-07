# Lean Product Admin + Safe Primary Media Write Plan

**Goal:** Make Product Admin consume the same canonical live product data as the public site and enable one carefully bounded write operation—primary product image replacement—without changing product identity, category, codes, variants, database schema, RLS, or existing production data during verification.

**Why the scope is narrow:** The current public mapper intentionally validates live product slug/family/code/name against the frozen 113-product manifest. Editing those fields before missing catalogue metadata is persisted would correctly trip the parity gate. Image replacement is already a canonical live field (`product_images.image_path`) and can be enabled safely once authorization, validation, one-primary-image invariants, remote-image rendering, failure cleanup, and public revalidation are correct.

## Guardrails

- No production write is performed by this implementation/verification plan.
- No Supabase migration/DDL/RLS/index/function/Storage cleanup.
- Product identity, family, slug, primary code, size/code rows and display metadata stay read-only in admin for now.
- Remove/retire the current `updateProductCategory` operational form rather than leaving an unsafe write path.
- Never infer product identity from item code (`18-0644` is duplicated).
- Admin authorization follows the existing backend model: authenticated user + `profiles.role === "admin"`. Live schema currently has exactly one admin profile.
- Privileged service client must require `SUPABASE_SERVICE_ROLE_KEY`; never fall back to anonymous/publishable credentials.
- Product image replacement must update the existing single `sort_order=0` row rather than upserting a second primary row.
- If image upload succeeds but the DB row update fails, remove only the newly uploaded object as compensation.
- Do not delete the previous historical/static image during this first write slice.
- Supabase-hosted product image URLs must be allowed narrowly by Next Image and CSP.
- Public routes and all current 113 product records remain unchanged.

## Task 1 — Harden privileged server access

**Modify:** `apps/web/src/lib/supabase/admin.ts`
**Create:** `apps/web/src/lib/supabase/admin-auth.ts`
**Create tests:** focused security/static unit tests.

`createAdminClient()` must require both:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

No anonymous/publishable fallback.

`requireAdminUser()`:
1. uses the normal cookie-bound server client;
2. calls `auth.getUser()`;
3. reads `profiles.role` for that exact user ID;
4. requires role exactly `admin`;
5. throws before any privileged client is created on unauthenticated/unauthorized/error state.

Export a small pure `isAdminProfile` helper for direct tests.

## Task 2 — Make Admin product routing/content canonical

**Modify:**
- `admin-management-route-model.ts`
- `admin-management-route-view.tsx`
- `admin-products/admin-product-model.ts`

Product route classification uses fixed family slugs + `CATALOGUE_METADATA_MANIFEST`, not `getProductDetailModel()`.

Product route result carries route identity, not a stale static product object.

Route view:
- loads canonical products using `getLiveCatalogueProducts()` (no emergency static fallback in admin);
- resolves exact public route with `getProductByPublicRoute`;
- builds admin model from that canonical product + fixed source-controlled family presentation;
- no second raw products/product_images query needed.

Admin model must be pure over `CatalogueProductRecord` and preserve current display/specification helpers.

## Task 3 — Simplify Product editor to actual supported operations

**Modify:** `admin-product-editor-page.tsx`

Remove:
- category change form;
- Save draft / Send to review / Publish / Archive / Delete controls;
- misleading "static source registry" and future publishing workflow messaging.

Keep:
- identity details read-only;
- exact codes/sizes/options read-only;
- catalogue reference read-only;
- current primary image;
- image replacement form.

Explain briefly in UI that product identity/catalogue fields are protected during source-of-truth migration while primary image is operational.

Image form sends:
- stable `product_id` UUID;
- family slug;
- public product slug;
- file.

Do not send/accept a mutable DB slug from the browser as authority.

## Task 4 — Implement safe image replacement core

**Create:** `admin-products/product-media-write.ts`
**Modify:** `admin-products/actions.ts`
**Create tests:** `admin-product-media-write.test.ts`

Pure/injected write core contract:

```ts
replacePrimaryProductImage(input, dependencies)
```

Validate before upload:
- product ID is UUID-shaped;
- family slug is one of five fixed families;
- public slug is non-empty/safe;
- file size > 0 and <= 8 MiB;
- MIME exactly one of JPEG, PNG, WebP, AVIF;
- extension derived from MIME, never trusted filename.

Identity lookup through privileged client must confirm:
- product ID exists;
- active product;
- joined/fetched category slug equals supplied family;
- DB slug equals `${familySlug}-${publicSlug}` for current migration identity.

Primary-image invariant:
- read all `product_images` rows for product with `sort_order=0`;
- require exactly one row;
- store its row ID and previous path.

Upload:
- bucket `product-media`;
- path `products/<product-uuid>/<crypto-random-uuid>.<derived-ext>`;
- `upsert: false`;
- explicit validated content type.

Then update only the existing primary-image row by row ID and product ID.

Failure compensation:
- if DB update fails or affects no expected row, delete only the newly uploaded object;
- throw/surface failure;
- never report false success.

Do not delete the previous image in this slice.

Server action order:
1. parse form;
2. `requireAdminUser()`;
3. create service-role client;
4. execute safe write core;
5. revalidate `/`, `/products`, `/search`, exact family/product public routes, `/admin/products`, and exact editor route.

## Task 5 — Allow only Rosa Supabase product-media remote images

**Modify:** `apps/web/next.config.ts`

Derive Supabase hostname/origin from `NEXT_PUBLIC_SUPABASE_URL` when valid.

Next Image:
- append one HTTPS `remotePatterns` entry for that exact hostname;
- pathname `/storage/v1/object/public/product-media/**`.

CSP `img-src`:
- append only the exact Supabase HTTPS origin;
- keep existing `'self' data: blob:`.

No wildcard `https://*.supabase.co` for images.

Tests/static assertions ensure configured project images can render and unrelated remote hosts are not broadly allowed.

## Task 6 — Make Product list canonical and useful

**Modify:** `admin-products-list-page.tsx`

Use `getLiveCatalogueProducts()` rather than raw partial product/category reads.

For each canonical product:
- image placeholder receives `src={product.mediaPath}` and fallback/sprite if available;
- public link is exact `/products/<family>/<slug>`;
- admin link exact `/admin/products/<family>/<slug>`;
- option summary comes from documented sizes/variants/directions, not `stock_status`/`sell_mode`;
- catalogue reference shows family + page when present;
- media status says primary image connected rather than `Image required`.

Keep Add product disabled; adding products is outside this slice.

Family summary may stay as current fixed summary until the later admin-scope cleanup.

## Task 7 — Verification without production mutation

Focused tests:
- admin service client refuses missing service role;
- auth role predicate/guard behavior;
- product route classification;
- canonical admin model/list data;
- image input validation;
- identity mismatch fails before upload;
- missing/duplicate primary image fails before upload;
- successful core calls upload then updates exact row;
- update failure removes newly uploaded object only;
- no old image deletion;
- public media rendering accepts canonical Supabase URL config;
- existing public 50-test canonical cutover suite remains green.

Then:
- web typecheck;
- focused ESLint for changed files;
- production build;
- guarded live read-only 113-product parity test;
- re-read production fingerprints and require no change.

No admin image write is executed against production during verification.

## End-to-end write verification gate

True write-path integration testing requires an isolated writable database/Storage environment. The connected Supabase organization reports a development branch cost of **$0.01344/hour**. Do not create one without Ahmad explicitly authorizing that cost.

Until then, the write path can be unit/integration-tested with injected fakes and build-verified, while production remains untouched.