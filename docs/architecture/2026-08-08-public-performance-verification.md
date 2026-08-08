# Public Performance Verification — 2026-08-08

## Scope

This record covers the preservation-first public performance work on `integration/canonical-catalogue-source-of-truth`. The approved architecture keeps Supabase canonical for product records and product media while keeping branding, hero, family, catalogue-family, About, procurement, and other editorial imagery source-controlled/local.

No production database DDL/DML or Supabase Storage write was performed during this verification. No paid Supabase development branch or paid Cloudflare image/storage resource was created.

## Verified source

- Feature head exercised by the final gate: `ae1500c8054d4106b4fac617aa1907b8a2439891`
- Verification PR merge commit: `b934fcae064dd44d59a5d8fb2861d3159c57235c`
- GitHub Actions run: `31255804925`
- Verification job: `93098859248`

The draft PR was verification-only and was not merged.

## Final automated gate

The final run completed successfully with:

- Full web Vitest suite: **99 test files passed, 1 skipped**.
- Full web Vitest assertions: **477 passed, 2 skipped**.
- Guarded production read-only catalogue integration: **2/2 passed**.
  - hydrated all **113** approved active products without parity loss;
  - exercised the bounded public projection APIs against live rows;
  - confirmed the product-detail context contains the requested product plus only **3 related products** rather than the entire family.
- TypeScript: `tsc --noEmit` passed.
- Performance-focused ESLint passed.
- Next.js 16.2.11 production build passed.
- OpenNext Cloudflare 1.20.2 build passed and emitted `.open-next/worker.js`.

The build still reports the existing Next.js middleware-to-proxy deprecation warning and the OpenNext Wrangler compatibility-date advisory. Neither warning blocked compilation or the Cloudflare bundle and neither was changed as part of this performance slice.

The isolated Vitest renderer also emits Next Image quality warnings because it does not load the project image-quality configuration. The actual production `next.config.ts` contains the required qualities and both production builds passed.

## Request-path changes verified

Ordinary public browsing now follows the intended model:

```text
public request
  -> no Supabase session refresh
  -> page-specific cached product projection where product data is needed
  -> local static URL for all non-product media
  -> local approved product URL or Supabase product-media URL for product media
```

Protected admin routes still pass through the existing Supabase session machinery.

The public catalogue projection layer uses a cookie-free Supabase read client, a bounded 60-second in-process projection cache, concurrent-request sharing, error eviction, and page-specific read APIs for featured products, one family, one product-plus-related context, and search.

The product-detail projection is now explicitly bounded to **4 live rows maximum** for the current detail composition: the requested product plus three related products. It no longer reuses the whole-family result merely to render one product page.

The middleware matcher also excludes common static asset formats including WebP, AVIF, PDF, ICO and WOFF/WOFF2 so those local asset requests do not enter application middleware unnecessarily.

## Static-media delivery

Non-product imagery remains local/source-controlled. Runtime Next image transformation is not required by this deployment path; the application is configured for direct delivery and the Cloudflare static cache policy provides long-lived caching for versioned/static media.

Verified local byte reductions for the optimized assets introduced in this slice:

| Asset | Previous bytes | Optimized bytes | Reduction |
| --- | ---: | ---: | ---: |
| Header logo | 444,430 | 3,361 | ~99.2% |
| Procurement support | 913,490 | 60,282 | ~93.4% |
| Cutters family | 476,442 | 12,474 | ~97.4% |
| About hospitals | 2,680,550 | 60,282 | ~97.8% |
| About procurement | 451,140 | 46,540 | ~89.7% |
| About distributors | 3,305,692 | 184,480 | ~94.4% |

The homepage hero was retained as its existing local JPG because its approximately 291 KB payload did not justify unrelated visual churn during this preservation pass. Catalogue PDFs remain downloadable source documents and were not rewritten as image assets.

## Product-media write policy

The implemented Product Admin primary-image replacement path remains guarded and was tested without a live production write. It currently enforces:

- supported JPEG/PNG/WebP/AVIF MIME types;
- maximum upload size of **3 MiB**;
- versioned UUID object paths;
- `upsert: false`;
- one-year Storage cache-control;
- exact product/family/public-route identity checks;
- exactly one existing primary image row;
- compensating deletion of only the newly uploaded object if the database update fails;
- catalogue projection cache invalidation plus public/admin route revalidation after a successful write.

Automatic server-side image transcoding/resizing on upload is intentionally deferred rather than introducing an unverified runtime dependency in this phase.

## Production structural preservation

Read-only production checks after the performance work reported:

- `categories`: **5**
- `products`: **113**
- `product_variants`: **322**
- `product_images`: **113**
- `site_settings`: **5**
- active family counts: knives 22, scissors 42, punches 15, chisels 20, cutters 14
- all 113 active products have exactly one primary image row
- the known duplicate catalogue code `18-0644` remains present for both `knives-round-straight` and `knives-scalpel-handle-no-3`

Historical frozen fingerprints remain investigation tripwires. Their original hashing procedure was not documented, so this verification does **not** claim that those exact legacy digest strings were independently recomputed. The guarded live catalogue parity test and the structural checks above are the current evidence.

## Remaining migration boundary

The live catalogue metadata bridge still represents the existing approved **113-product** set. Product Admin image replacement is implemented, but arbitrary brand-new product creation is **not yet an end-to-end supported production workflow**. That capability remains gated on the separately planned additive catalogue-metadata migration/backfill and its preservation checks.

This limitation is intentional: the performance optimization does not weaken catalogue identity/parity safeguards merely to expose premature CRUD.
