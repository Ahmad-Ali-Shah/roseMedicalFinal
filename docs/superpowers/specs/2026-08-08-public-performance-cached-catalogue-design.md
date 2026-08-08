# Public Performance + Cached Catalogue Design

Date: 2026-08-08
Branch: `integration/canonical-catalogue-source-of-truth`

## Purpose

The Rosa public site currently pays unnecessary runtime costs in two places:

1. public navigation requests repeatedly pass through Supabase session validation even though ordinary public browsing does not require authentication;
2. the in-progress canonical catalogue cutover loads much more Supabase data than many pages need and currently rebuilds the complete catalogue too often.

The user also reported that images — including the header logo — visibly arrive late. The public deployment is Cloudflare Workers/OpenNext. The site uses `next/image`, but the current Wrangler configuration does not define a Cloudflare Images binding. OpenNext documents that image optimization on Cloudflare requires either that binding or a custom loader. The user does not want to add paid infrastructure for this optimization phase.

This design therefore optimizes the site without changing production catalogue data and without introducing a paid Supabase or Cloudflare service.

## Locked product/content ownership

Supabase remains canonical for data the owner must be able to manage operationally:

- products;
- product activation/archive state;
- product family assignment when that write model is formally enabled;
- product code and descriptive catalogue data when the canonical write model is ready;
- product variants/options;
- product image relationships;
- newly uploaded/replaced product images in Supabase Storage.

The public website must not make Supabase the asset source for presentation imagery that is part of the website design.

The following stay source-controlled/local under `apps/web/public/**`:

- ROSA logos and brand marks;
- homepage hero photography;
- About photography;
- procurement/support photography;
- family/category hero photography;
- family discovery-card imagery;
- catalogue-family presentation thumbnails;
- non-product decorative/editorial imagery;
- other website-composition imagery.

Only **actual product media** may become dynamically Supabase-managed.

Existing approved product images that are already local `/media/...` assets do **not** need to be bulk-migrated to Storage merely for consistency. Their canonical relation may remain in `product_images`, and a later admin replacement may point that record to a new versioned Supabase Storage URL. This avoids unnecessary migration risk and preserves the fastest path for existing media.

## Design goals

1. Public Home/About/Contact/Catalogues and other marketing pages should perform zero Supabase Auth calls merely to render.
2. Public non-product images should be served directly from Cloudflare static assets and require no Supabase request.
3. No public page should load the entire 113-product/322-variant catalogue unless that page genuinely needs a catalogue-wide search dataset.
4. A normal public page should use at most one bounded catalogue read on a cache miss.
5. Product catalogue data should be cached and reused; visitors should not reconstruct it from multiple tables on every navigation.
6. Admin product changes must remain possible. New products must be able to appear publicly without a source-code deployment once the canonical product-create workflow itself is enabled.
7. Product image replacement must continue to propagate everywhere that product is rendered.
8. The site must remain usable if a stale cached catalogue snapshot is available while Supabase is temporarily slow or unavailable.
9. No optimization may weaken the existing 113-product parity protections or silently rewrite production database data.
10. No paid Cloudflare Images/R2/KV/D1 dependency is introduced in this phase.

## Root causes being addressed

### Public authentication fan-out

The current middleware invokes `updateSession()` for essentially every non-static request, and `updateSession()` calls `supabase.auth.getUser()` unconditionally. Live Supabase logs showed large bursts of `GET /auth/v1/user` while the public site was being browsed.

Next.js Link prefetching/RSC navigation can multiply those requests even before a visitor explicitly opens every linked page.

### Catalogue over-fetching

The current canonical catalogue repository performs four separate reads for:

- products;
- categories;
- variants;
- images.

Homepage, Products overview, Search, family listing, and product detail currently enter the complete catalogue hydration path. That is safe for migration verification but too expensive as the permanent public request model.

### Runtime image path is not optimized for the deployed platform

The deployment uses OpenNext on Cloudflare Workers. The current `wrangler.jsonc` does not define the optional Cloudflare Images binding. OpenNext states that `<Image>` optimization on Cloudflare requires either that binding or a custom loader. Because the user does not want paid image infrastructure, the site should not depend on runtime image transformation for ordinary static assets.

### Oversized source media

The current header logo source is a 925×935 PNG while its rendered navigation size is approximately 56–64 CSS pixels. Similar local editorial images should be audited for byte size and dimensions rather than assuming `next/image` will repair them at runtime.

## Architecture

```text
                         ADMIN
                           |
                           v
                    Supabase canonical
             +-------------+--------------+
             |                            |
        product data                 product_images
             |                            |
             |                      Supabase Storage
             |                     (new replacements)
             |                            |
             +-------------+--------------+
                           |
                    bounded public read
                           |
                    short-lived cache
                           |
                           v
                     PUBLIC PAGES

Local source-controlled assets --------------------> Cloudflare static assets
(logo, hero, families, editorial, etc.)              (no Supabase dependency)
```

## Public authentication policy

Middleware continues to perform local public route-policy/404 handling where needed, but it must not perform a Supabase auth round trip for normal public browsing.

Supabase session refresh/auth validation is restricted to paths that actually require identity, primarily:

- `/admin/**`;
- owner/account/auth-sensitive routes;
- authentication callback/recovery flows where session state is required.

Public paths should return from middleware without calling `auth.getUser()`.

This change must preserve the existing protected-admin behavior. It is not permission to weaken admin authentication.

## Public link-prefetch policy

Automatic viewport prefetch can cause dynamic product/family routes to execute in the background and can fan out network work before the user clicks.

During this optimization phase:

- automatic prefetch is disabled for catalogue-heavy product/family links unless there is strong evidence it improves measured navigation latency;
- header/footer public navigation should not trigger Supabase work simply by becoming visible;
- optional intent-based prefetch on hover/focus can be considered later once target routes are demonstrably cheap and cached.

The default is to eliminate speculative database work first.

## Catalogue read model

The public catalogue gets a dedicated **public, non-session Supabase read boundary**. It must not depend on request cookies or user session state.

The repository is divided by use case instead of one global `getPublicCatalogueProducts()` call:

### Homepage

Fetch only the selected featured product records and their primary images/summary fields. Family cards and hero/editorial content remain completely local.

### Products overview

Fetch only the summary fields the grid actually renders. Do not fetch full product-detail metadata for every row unless required by the current UI.

### Family listing

Fetch the requested family's products and the option/image information needed by that family page only.

### Product detail

Fetch the requested product detail and a small bounded related-product set. Do not hydrate all 113 products merely to render one detail page.

### Search

Search is the one surface that may need a catalogue-wide searchable snapshot. It should receive one cached, compact search projection rather than four uncached table reads per page visit.

## Query consolidation

Where the current schema permits it safely, public catalogue reads should use one PostgREST/Supabase relation query with nested category/variant/image relations instead of four independent network round trips.

The public projection must select only fields that are actually needed. Pricing/stock fields remain excluded from public catalogue behavior because Rosa is quotation-led rather than ecommerce.

The existing migration manifest remains a temporary enrichment/parity source only for catalogue fields that are not yet represented safely in the current schema. It must not be used to hide live parity drift.

## Cache strategy — free tier / no new paid backing store

The public repository uses framework fetch/data caching with a conservative maximum freshness window rather than requiring R2/KV/D1.

Target behavior:

- catalogue reads are cacheable across repeated requests where the deployed runtime supports the Next/OpenNext cache;
- a short maximum revalidation interval (initial target: **60 seconds**) guarantees that a new or edited product does not remain globally stale indefinitely even if explicit on-demand invalidation is not globally distributed;
- admin server actions call the appropriate Next cache/path invalidation APIs after successful writes for best-effort immediate local/read-your-own-write freshness;
- public rendering may serve the previous validated cached snapshot during a transient upstream refresh where safe, rather than blocking every visitor on Supabase;
- parity failures are still fail-closed and are never converted into silent stale fallback.

This phase deliberately avoids adding an R2/KV/D1 cache resource. If the project later needs globally immediate cache invalidation at much larger traffic, that can be evaluated separately.

## Product creation compatibility

This performance architecture must not bake in the current 113 products as a permanent public allow-list.

The current migration manifest is a temporary parity bridge for the existing catalogue. When the canonical add-product workflow is enabled:

1. admin creates the product in Supabase through validated server-side logic;
2. required variants/media relations are persisted;
3. the product cache is invalidated;
4. public cached queries include the new record without a code deployment;
5. the 113-record migration manifest is retired as the authoritative population constraint once the schema contains all required catalogue metadata.

This optimization phase does **not** activate product creation before the canonical write schema is complete. It only ensures the public caching architecture will support it.

## Static image strategy

Because the deployment is Cloudflare Workers without a configured paid image transformation service, local website assets are optimized **before deployment**, not at visitor request time.

### Asset audit

Add a repeatable media audit that records:

- path;
- format;
- width/height;
- file bytes;
- rendering class/usage where known.

The audit identifies especially oversized PNG/JPEG assets and prevents future regressions.

### Offline derivatives

Generate source-controlled optimized WebP/AVIF derivatives for large local imagery, with sizes appropriate to the actual layout. Keep originals where useful for source provenance, but public code should reference the optimized derivatives.

Initial target classes:

- navigation logo: 2× displayed resolution, target under ~25 KB where visually lossless;
- family cards: responsive card-sized derivatives;
- homepage/editorial hero: responsive mobile/tablet/desktop derivatives;
- About/procurement imagery: responsive derivatives;
- catalogue-family presentation images: right-sized derivatives.

### Runtime rendering

For already-optimized local assets, avoid routing every request through an unavailable/expensive runtime image transform. Use direct static asset delivery with explicit dimensions, responsive `srcset`/`picture` where multiple derivatives exist, and native lazy loading below the fold.

Above-the-fold/LCP imagery may use eager loading/fetch priority. Everything else remains lazy.

### Static cache headers

Add `public/_headers` appropriate for OpenNext/Cloudflare static assets:

- `/_next/static/*`: `public,max-age=31536000,immutable`;
- versioned optimized `/media/**` assets: long-lived immutable caching where filenames are content/version-specific.

Files that may be overwritten under the same filename must not receive unsafe immutable semantics. The optimization pass should prefer new/versioned filenames for changed derivatives.

## Header logo specifically

The current 925×935 navigation PNG is replaced in public rendering by a tiny source-controlled derivative sized for the actual header, with a 2× density version for high-DPI screens.

The logo remains local and must never wait on Supabase.

The header logo should be one of the earliest static asset requests and should not depend on JavaScript hydration to become visible.

## Product image strategy

Product images are the only image class that may be dynamically managed through Supabase.

### Existing product media

Existing local `/media/...` product images remain valid and fast. Do not bulk-upload all 113 images to Supabase Storage just to normalize their URLs.

### New/replaced product media

When an admin replaces a product image:

- validate raster type and dimensions;
- prevent enormous source uploads;
- create/store an optimized web delivery image rather than an unbounded camera-resolution file;
- use a versioned/unique object path so a replacement has a new URL;
- set long cache-control on the Storage object because the URL is immutable once published;
- update only the canonical primary `product_images` relation;
- invalidate product/catalogue cache after the DB update succeeds;
- retain compensation semantics if upload succeeds but the relation update fails.

Initial target delivery constraints:

- WebP preferred for admin-uploaded raster product media when conversion is safe;
- approximately 1000–1200 px maximum long edge unless a product-specific reason requires more;
- practical byte target around 100–200 KB for typical product imagery, with quality chosen to preserve surgical-instrument detail;
- transparent PNG-like imagery may use WebP alpha.

No destructive conversion of existing approved assets occurs during this phase.

## Image loading policy

- Header logo: eager/high priority, tiny local asset.
- Homepage hero: eager/high priority responsive local derivative.
- First visible product/family imagery: browser-prioritized only when it contributes to LCP.
- Below-fold family/product cards: lazy.
- Product detail primary image: eager when above fold.
- Related products: lazy.
- Search result images: lazy except the initial visible viewport may naturally load immediately.

`loading="eager"` must not be applied broadly because that causes bandwidth contention and delays the truly important media.

## Failure behavior

### Supabase read unavailable

If a validated cached public product projection exists, serve it during the short refresh window rather than making every request fail.

If no valid cached value exists, the existing temporary static migration fallback may remain only for infrastructure read failure during the current migration stage.

### Parity mismatch

Parity mismatch is not an infrastructure outage. Do not silently serve stale/static data when the live data itself violates migration invariants. Fail closed and investigate.

### Product image unavailable

A single product image failure must not block the page shell, logo, hero, family imagery, navigation, or text. Product media components retain graceful placeholder/fallback behavior.

## Performance instrumentation

Add lightweight repeatable checks rather than optimizing by feel:

- count Supabase requests for representative public routes;
- assert no `/auth/v1/user` call on public browsing;
- record catalogue-query count per route type;
- measure static media bytes/dimensions;
- verify logo request is local;
- verify non-product media URLs do not reference Supabase;
- optionally record LCP/TTFB in local/preview smoke runs when a browser environment is available.

## Acceptance gates

The optimization is not complete until all of the following are true:

### Network/data

- ordinary public pages do not perform Supabase auth validation;
- Home uses no Supabase-backed hero/family/editorial imagery;
- About/Contact/Catalogues/family presentation imagery stays local;
- public product data uses bounded repository methods rather than unconditional full-catalogue hydration;
- product detail does not fetch all 113 products;
- family listing does not fetch unrelated families;
- homepage does not fetch all variants/images for all 113 products;
- Search performs no more than one compact catalogue-wide network projection on a cache miss;
- repeated public requests reuse cached data where supported;
- best-effort admin invalidation plus the 60-second maximum freshness window preserves dynamic product visibility.

### Images

- navigation logo is served from local `/media/...`, not Supabase;
- navigation logo source used in production is right-sized rather than the 925×935 source;
- no non-product public image points at Supabase Storage;
- above-fold images are prioritized selectively;
- below-fold imagery is lazy;
- large local JPEG/PNG assets have optimized public derivatives where beneficial;
- static versioned assets receive long-lived Cloudflare cache headers;
- new/replaced product images use unique/versioned URLs and long cache-control.

### Product/admin behavior

- current 113 products remain accounted for during migration;
- known duplicate code `18-0644` remains preserved;
- product image replacement still propagates to Search, family listing, Products overview, homepage selected-product card when applicable, related card and product detail;
- the caching layer does not make the current 113-product manifest a permanent limit;
- future canonical product creation can appear publicly without redeploy once that write workflow is enabled.

### Safety

- no production product/category/variant/image rows are rewritten merely for performance;
- no existing product media is bulk moved or deleted;
- no RLS/auth protection is weakened for admin routes;
- production database fingerprints are checked before/after read-only performance work where relevant;
- no paid Cloudflare Images/R2/KV/D1 resource is created by this phase;
- tests, typecheck, focused lint and production build pass before merge.

## Testing strategy

Use TDD for behavior changes.

Required regression coverage includes:

1. public middleware path does not call Supabase auth;
2. admin/auth-sensitive path still calls session/auth boundary;
3. public catalogue reader uses non-session credentials/context;
4. homepage loader requests only featured-product projection;
5. family loader scopes to one family;
6. detail loader scopes to one product plus bounded related items;
7. Search uses one compact cached projection;
8. non-product media registry contains no Supabase URL;
9. brand mark uses local optimized derivative;
10. below-fold image components default lazy;
11. product upload accepts only bounded supported formats/sizes;
12. replacement path remains versioned/unique;
13. Storage upload sets long cache-control;
14. successful admin media write invalidates relevant public catalogue cache/path;
15. existing 113-product parity suite continues passing;
16. live Supabase parity integration test remains read-only.

## Rollout sequence

1. Establish performance/request-count tests and static media audit.
2. Remove public Supabase auth round trips while preserving protected routes.
3. Disable speculative catalogue-heavy link prefetch where it causes background DB work.
4. Introduce public non-session catalogue read client/boundary.
5. Split catalogue queries into homepage/overview/family/detail/search projections.
6. Consolidate each projection to the minimum number of Supabase/PostgREST network calls.
7. Add short-lived cache semantics and admin invalidation hooks without paid persistent cache infrastructure.
8. Optimize header logo and high-impact local assets offline; update public references.
9. Add Cloudflare static asset cache headers.
10. Tighten product-media upload delivery constraints/cache-control without mutating existing media.
11. Run focused performance regression tests + existing catalogue parity suite + typecheck/lint/build.
12. Recheck production read-only fingerprints and Supabase logs before considering merge.

## Non-goals

- no paid Cloudflare Images setup;
- no new R2/KV/D1 cache resource;
- no production schema redesign merely for speed;
- no bulk migration of existing 113 product images;
- no visual redesign;
- no removal of Supabase as canonical product data source;
- no activation of Add Product until the canonical write schema/validation work is ready;
- no ecommerce behavior;
- no weakening of owner/admin authentication.

## Resulting system

After this work, the public site should behave as follows:

```text
Logo / heroes / family photos / editorial photos
          -> local optimized Cloudflare static assets
          -> long browser/CDN caching
          -> zero Supabase dependency

Public product catalogue
          -> small route-specific cached projection
          -> Supabase only on cache miss/refresh
          -> no public auth request

Admin product operation
          -> validated Supabase write
          -> versioned optimized product media when applicable
          -> cache invalidation
          -> public site refreshes from canonical data
```

This keeps the owner-facing catalogue dynamic while removing Supabase from the critical path of most visual/page loading work.