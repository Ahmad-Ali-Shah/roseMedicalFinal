# Public Performance + Cached Catalogue Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Rosa public browsing substantially faster without paid infrastructure or production catalogue mutation, while keeping Supabase canonical for operational product data and product media.

**Architecture:** Ordinary public requests stop paying for Supabase session validation. Public catalogue reads move behind a non-session read boundary with page-scoped projections and a bounded 60-second best-effort in-process cache so a warm Cloudflare Worker does not repeatedly hit Supabase; every cold/cache-miss read remains bounded and one-query-per-projection. Because the current OpenNext deployment has no paid Cloudflare Images binding or persistent incremental-cache backing store, images are served directly from their already-approved source URLs and static assets receive Cloudflare cache headers rather than depending on unavailable runtime transformation.

**Tech Stack:** Next.js 16.2.11 App Router, React 19.2.0, `@supabase/supabase-js` 2.111.x, `@supabase/ssr`, OpenNext Cloudflare Workers, Vitest, TypeScript 5.9.

## Global Constraints

- Supabase remains canonical for products, variants/options, activation state, product image relationships, and future admin-created products.
- Only actual product media may be dynamically Supabase-managed; logo, homepage hero, family/category images, catalogue-family visuals, About/procurement/editorial imagery remain source-controlled/local.
- Do not create a paid Supabase development branch, Cloudflare Images binding, R2 bucket, KV namespace, or D1 database.
- Do not mutate production product/category/variant/image rows for performance work.
- Do not bulk move or delete existing approved product media.
- Do not weaken `/admin/**` authentication or authorization.
- Preserve the existing migration parity fail-closed behavior and known duplicate product code `18-0644`.
- Current migration fallback remains only for infrastructure read failure; parity failure must not silently fall back.
- Public catalogue freshness target is at most 60 seconds without relying on globally distributed paid cache storage.
- Product image replacement must continue to propagate to all product surfaces.
- Existing GitHub Actions budget is limited: use one final focused verification run after local/static review rather than CI on every commit.

---

## File Structure

### New files

- `apps/web/src/lib/supabase/public-read.ts` — cookie-free/non-session Supabase client used only for public RLS-protected catalogue reads.
- `apps/web/src/features/catalogue-live/catalogue-live.cache.ts` — bounded TTL/promise-deduplicating process-local cache; no global persistence assumption.
- `apps/web/src/features/catalogue-live/catalogue-live.projections.ts` — converts one nested products/categories/variants/images query result into the existing `LiveCatalogueSnapshot` shape.
- `apps/web/src/lib/supabase/session-route-policy.ts` — pure route policy defining which paths require session refresh.
- `apps/web/src/test/public-performance-policy.test.ts` — regression tests for auth gating, prefetch policy, image delivery policy and static-vs-Supabase media ownership.
- `apps/web/src/test/catalogue-live-projections.test.ts` — scoped repository/cache projection behavior.
- `apps/web/public/_headers` — Cloudflare static asset caching policy.
- `apps/web/public/media/brand/rosa-header-logo-v1.webp` — right-sized local header logo derivative from the approved Rosa source image.

### Modified files

- `apps/web/src/middleware.ts` — skip `updateSession()` for ordinary public paths.
- `apps/web/src/lib/supabase/middleware.ts` — preserve authenticated session-refresh behavior for protected paths only; no permission changes.
- `apps/web/src/features/catalogue-live/catalogue-live.repository.ts` — add page-scoped public reads while retaining full live read for parity/admin verification.
- `apps/web/src/features/catalogue-live/catalogue-live.types.ts` — nested projection row types.
- `apps/web/src/features/catalogue-live/index.ts` — export scoped read APIs.
- `apps/web/src/features/homepage/homepage.tsx` — request only featured canonical products.
- `apps/web/src/features/products/products-overview.tsx` — request only representative/featured canonical products.
- `apps/web/src/features/family-listing/family-listing-page.tsx` — request one family only.
- `apps/web/src/features/product-detail/product-detail-page.tsx` — request one family context instead of the full catalogue.
- `apps/web/src/features/search-preview/search-default-page.tsx` — use one compact cached search projection.
- `apps/web/src/features/localization/locale-link.tsx` — default public links to `prefetch={false}` unless explicitly overridden.
- `apps/web/src/components/layout/public-navigation-link.tsx` — prevent speculative route work from header navigation.
- `apps/web/src/components/ui/button.tsx` — expose optional `prefetch` and default public button links to no speculative prefetch where routed through localized wrapper.
- `apps/web/src/features/localization/localized-button-link.tsx` — pass `prefetch={false}` by default.
- `apps/web/next.config.ts` — disable Next runtime image optimization globally for this deployment while preserving restricted Supabase remote origin/CSP.
- `apps/web/src/features/public-media/public-media.ts` — point header logo at the optimized local derivative; all non-product URLs remain local.
- `apps/web/src/features/admin-products/actions.ts` — long cache-control for immutable UUID product uploads; best-effort cache invalidation after successful write.
- `apps/web/src/features/admin-products/product-media-write.ts` — tighten upload byte ceiling without changing compensation/identity semantics.
- existing public/live/admin tests — adapt to scoped read APIs where needed.

---

### Task 1: Stop public Supabase auth fan-out

**Files:**
- Create: `apps/web/src/lib/supabase/session-route-policy.ts`
- Modify: `apps/web/src/middleware.ts`
- Test: `apps/web/src/test/public-performance-policy.test.ts`

**Interfaces:**
- Produces: `requiresSupabaseSession(pathname: string): boolean`
- Rule: `/admin` and `/admin/**` require session refresh; ordinary public routes do not. Keep the policy deliberately narrow until another authenticated route actually exists.

- [ ] **Step 1: Write the failing route-policy test**

```ts
import { describe, expect, it } from "vitest";
import { requiresSupabaseSession } from "@/lib/supabase/session-route-policy";

describe("public performance session policy", () => {
  it.each(["/", "/products", "/products/knives", "/search", "/about", "/contact", "/request-quotation"])(
    "does not require Supabase session refresh for %s",
    (pathname) => expect(requiresSupabaseSession(pathname)).toBe(false)
  );

  it.each(["/admin", "/admin/products", "/admin/products/knives/foo"])(
    "keeps admin session refresh for %s",
    (pathname) => expect(requiresSupabaseSession(pathname)).toBe(true)
  );
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
pnpm --filter @rosa/web test -- src/test/public-performance-policy.test.ts
```

Expected: FAIL because `session-route-policy.ts` does not yet exist.

- [ ] **Step 3: Implement the pure policy**

```ts
export function requiresSupabaseSession(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}
```

- [ ] **Step 4: Gate middleware before the auth call**

In `apps/web/src/middleware.ts`, preserve 404 rewriting first, then:

```ts
if (!requiresSupabaseSession(request.nextUrl.pathname)) {
  return NextResponse.next({ request });
}
return updateSession(request);
```

Do not alter `updateSession()` authentication semantics itself.

- [ ] **Step 5: Run focused tests**

```bash
pnpm --filter @rosa/web test -- src/test/public-performance-policy.test.ts src/test/public-routing.test.ts
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add apps/web/src/lib/supabase/session-route-policy.ts apps/web/src/middleware.ts apps/web/src/test/public-performance-policy.test.ts
git commit -m "perf(web): skip auth refresh on public routes"
```

---

### Task 2: Add cookie-free public catalogue read boundary and 60-second warm-isolate cache

**Files:**
- Create: `apps/web/src/lib/supabase/public-read.ts`
- Create: `apps/web/src/features/catalogue-live/catalogue-live.cache.ts`
- Create: `apps/web/src/features/catalogue-live/catalogue-live.projections.ts`
- Modify: `apps/web/src/features/catalogue-live/catalogue-live.types.ts`
- Modify: `apps/web/src/features/catalogue-live/catalogue-live.repository.ts`
- Modify: `apps/web/src/features/catalogue-live/index.ts`
- Test: `apps/web/src/test/catalogue-live-projections.test.ts`
- Test: `apps/web/src/test/catalogue-live-repository.test.ts`

**Interfaces:**
- Produces: `createPublicReadClient()` — Supabase client created from `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` with session persistence/refresh disabled.
- Produces: `getCachedCatalogueProjection<T>(key: string, loader: () => Promise<T>, options?: { ttlMs?: number; now?: () => number }): Promise<T>`.
- Produces: `clearCatalogueProjectionCache(): void`.
- Produces public repository APIs:
  - `getFeaturedCatalogueProducts(): Promise<readonly CatalogueProductRecord[]>`
  - `getFamilyCatalogueProducts(familySlug: string): Promise<readonly CatalogueProductRecord[]>`
  - `getProductCatalogueContext(familySlug: string, productSlug: string): Promise<readonly CatalogueProductRecord[]>`
  - `getSearchCatalogueProducts(): Promise<readonly CatalogueProductRecord[]>`
- Retains: `getLiveCatalogueProducts()` as full read-only parity/admin verification API.

- [ ] **Step 1: Write RED tests for cache hit, TTL expiry and concurrent de-duplication**

```ts
it("reuses a warm projection within 60 seconds", async () => {
  let loads = 0;
  const loader = async () => { loads += 1; return ["ok"] as const; };
  await getCachedCatalogueProjection("x", loader, { now: () => 1_000 });
  await getCachedCatalogueProjection("x", loader, { now: () => 59_000 });
  expect(loads).toBe(1);
});

it("reloads after TTL", async () => {
  let now = 1_000;
  let loads = 0;
  const loader = async () => { loads += 1; return loads; };
  expect(await getCachedCatalogueProjection("ttl", loader, { ttlMs: 60_000, now: () => now })).toBe(1);
  now = 61_001;
  expect(await getCachedCatalogueProjection("ttl", loader, { ttlMs: 60_000, now: () => now })).toBe(2);
});
```

Also test two simultaneous calls share one loader promise.

- [ ] **Step 2: Run RED tests**

```bash
pnpm --filter @rosa/web test -- src/test/catalogue-live-projections.test.ts
```

Expected: FAIL because cache/projection modules do not exist.

- [ ] **Step 3: Implement bounded cache**

Use a module-level `Map<string, { expiresAt: number; value?: unknown; pending?: Promise<unknown> }>` with:

```ts
const DEFAULT_TTL_MS = 60_000;
const MAX_ENTRIES = 256;
```

Requirements:
- return cached value when fresh;
- share `pending` promise for concurrent misses;
- remove a failed load so errors are not cached;
- expire stale entries;
- evict oldest insertion when above `MAX_ENTRIES`;
- expose `clearCatalogueProjectionCache()` for tests/best-effort same-isolate admin invalidation.

- [ ] **Step 4: Implement non-session public Supabase client**

```ts
import { createClient } from "@supabase/supabase-js";

export function createPublicReadClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new Error("Public Supabase catalogue credentials are not configured.");
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });
}
```

No cookies, service role, user token or auth call is permitted here.

- [ ] **Step 5: Add one-query nested projection reader**

Use the verified FK relationships:
- `products.category_id -> categories.id`
- `product_variants.product_id -> products.id`
- `product_images.product_id -> products.id`

Base select:

```ts
const PUBLIC_PRODUCT_SELECT = `
  id,category_id,item_code,name_en,description_en,is_active,slug,created_at,
  category:categories!inner(id,slug,name_en,is_active,deleted_at),
  variants:product_variants(product_id,sku,size,variant_type,created_at),
  images:product_images(product_id,image_path,sort_order)
`;
```

Normalize the nested row into the existing `LiveCatalogueSnapshot` arrays and feed that snapshot through the existing `mapLiveCatalogue()` parity/migration bridge. Do not create a second mapping implementation.

- [ ] **Step 6: Add scoped repository loaders**

All loaders must filter `products.is_active = true`, `category.is_active = true`, `category.deleted_at is null`.

Featured:
- derive the current source-controlled featured route identities from `productFixtures`;
- translate each to current DB slug `${familySlug}-${slug}`;
- one `.in("slug", dbSlugs)` nested query;
- cache key `catalogue:featured`.

Family:
- validate `familySlug` against fixed five families;
- one nested products query filtered by `category.slug`;
- cache key `catalogue:family:<slug>`.

Product context:
- use the same one-family cached projection and select target + related products in memory; this avoids a second Supabase call while bounding the maximum query to one family (largest current family: 42 products), not all 113.

Search:
- one nested compact whole-catalogue query;
- cache key `catalogue:search`;
- this is the only public surface permitted to read all active products on a cache miss.

- [ ] **Step 7: Preserve infrastructure-vs-parity error semantics**

Every scoped loader must:
- wrap query/network errors as `CatalogueLiveReadError`;
- map/manifest mismatch as `CatalogueLiveParityError`;
- only infrastructure errors may use current temporary static fallback;
- parity errors rethrow/fail closed.

- [ ] **Step 8: Run focused catalogue tests**

```bash
pnpm --filter @rosa/web test -- \
  src/test/catalogue-live-projections.test.ts \
  src/test/catalogue-live-repository.test.ts \
  src/test/catalogue-live-mapper.test.ts \
  src/test/catalogue-live-selectors.test.ts \
  src/test/catalogue-metadata-manifest.test.ts
```

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add apps/web/src/lib/supabase/public-read.ts apps/web/src/features/catalogue-live apps/web/src/test/catalogue-live-projections.test.ts apps/web/src/test/catalogue-live-repository.test.ts
git commit -m "perf(catalogue): add scoped cached public reads"
```

---

### Task 3: Move public surfaces off full-catalogue hydration

**Files:**
- Modify: `apps/web/src/features/homepage/homepage.tsx`
- Modify: `apps/web/src/features/products/products-overview.tsx`
- Modify: `apps/web/src/features/family-listing/family-listing-page.tsx`
- Modify: `apps/web/src/features/product-detail/product-detail-page.tsx`
- Modify: `apps/web/src/features/search-preview/search-default-page.tsx`
- Test: `apps/web/src/test/public-product-live-cutover.test.ts`
- Test: `apps/web/src/test/search-preview.test.tsx`

**Interfaces:** Consumes the scoped APIs from Task 2. The existing pure page-model/data functions keep accepting product arrays so business/presentation logic stays unchanged.

- [ ] **Step 1: Extend the cutover test to reject `getPublicCatalogueProducts()` imports from public page components**

The test should read the five page-component sources and assert:
- Home imports `getFeaturedCatalogueProducts`;
- Products imports `getFeaturedCatalogueProducts`;
- family imports `getFamilyCatalogueProducts`;
- detail imports `getProductCatalogueContext`;
- Search imports `getSearchCatalogueProducts`;
- none imports `getPublicCatalogueProducts`.

- [ ] **Step 2: Run RED test**

```bash
pnpm --filter @rosa/web test -- src/test/public-product-live-cutover.test.ts
```

Expected: FAIL because current pages use the full loader.

- [ ] **Step 3: Replace only the data call at each page boundary**

Keep model functions and UI markup unchanged.

Examples:

```ts
const products = await getFeaturedCatalogueProducts();
```

```ts
const products = await getFamilyCatalogueProducts(familySlug);
```

```ts
const products = await getProductCatalogueContext(familySlug, productSlug);
```

- [ ] **Step 4: Run public surface tests**

```bash
pnpm --filter @rosa/web test -- \
  src/test/public-product-live-cutover.test.ts \
  src/test/search-preview.test.tsx \
  src/test/public-catalogue-selectors.test.ts \
  src/test/catalogue-downloads-and-product-media.test.tsx
```

Expected: PASS with unchanged visible product/card semantics.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/features/homepage/homepage.tsx apps/web/src/features/products/products-overview.tsx apps/web/src/features/family-listing/family-listing-page.tsx apps/web/src/features/product-detail/product-detail-page.tsx apps/web/src/features/search-preview/search-default-page.tsx apps/web/src/test/public-product-live-cutover.test.ts
git commit -m "perf(web): scope public catalogue reads by page"
```

---

### Task 4: Eliminate speculative public route work

**Files:**
- Modify: `apps/web/src/features/localization/locale-link.tsx`
- Modify: `apps/web/src/components/layout/public-navigation-link.tsx`
- Modify: `apps/web/src/components/ui/button.tsx`
- Modify: `apps/web/src/features/localization/localized-button-link.tsx`
- Test: `apps/web/src/test/public-performance-policy.test.ts`

**Interfaces:**
- `LocaleLink` accepts normal Next `Link` props but applies `prefetch={false}` when caller did not specify a value.
- `ButtonLinkProps` gains `prefetch?: boolean | null` and passes it to Next `Link`.
- `LocalizedButtonLink` defaults `prefetch={false}`.

- [ ] **Step 1: Write RED source/renderer assertions for no automatic prefetch**

Assert the shared localized/public link wrappers explicitly suppress automatic prefetch by default while allowing an explicit caller override.

- [ ] **Step 2: Run RED test**

```bash
pnpm --filter @rosa/web test -- src/test/public-performance-policy.test.ts
```

- [ ] **Step 3: Implement default-no-prefetch wrappers**

For `LocaleLink`:

```tsx
export function LocaleLink({ href, prefetch = false, ...props }: LocaleLinkProps) {
  const locale = getLocaleFromPathname(usePathname());
  return <Link href={localizePath(href, locale) as Route<string>} prefetch={prefetch} {...props} />;
}
```

Apply equivalent explicit behavior to `PublicNavigationLink`/localized buttons.

- [ ] **Step 4: Run navigation/localization tests**

```bash
pnpm --filter @rosa/web test -- src/test/public-performance-policy.test.ts src/test/localization.test.tsx src/test/public-shell.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/features/localization apps/web/src/components/layout/public-navigation-link.tsx apps/web/src/components/ui/button.tsx apps/web/src/test/public-performance-policy.test.ts
git commit -m "perf(web): stop speculative public route prefetch"
```

---

### Task 5: Serve images directly and cache static media on Cloudflare

**Files:**
- Modify: `apps/web/next.config.ts`
- Modify: `apps/web/src/features/public-media/public-media.ts`
- Modify: `apps/web/src/components/layout/public-brand-mark.tsx`
- Create: `apps/web/public/media/brand/rosa-header-logo-v1.webp`
- Create: `apps/web/public/_headers`
- Test: `apps/web/src/test/public-performance-policy.test.ts`
- Test: `apps/web/src/test/catalogue-downloads-and-product-media.test.tsx`

**Interfaces:**
- `next.config.ts` sets `images.unoptimized = true` so `<Image>` renders original local/Supabase URLs directly instead of routing through `/_next/image` on a deployment without a Cloudflare Images binding.
- Keep the existing exact Supabase `remotePatterns` restriction and CSP origin restriction; `unoptimized` is a delivery optimization, not an origin-permission expansion.

- [ ] **Step 1: Write RED assertions for direct image delivery and media ownership**

Tests must assert:
- `next.config.ts` has `images.unoptimized: true`;
- `ROSA_HEADER_LOGO_MEDIA.src` starts with `/media/brand/` and is not a Supabase URL;
- every entry in `FAMILY_MEDIA_BY_SLUG`, `HOME_CATALOGUE_MEDIA_BY_SLUG`, `CATALOGUE_MEDIA_BY_SLUG`, `SUPPORTED_BUYER_MEDIA`, plus homepage/procurement hero media starts with `/media/`;
- only product records may carry remote Supabase media URLs;
- `_headers` includes immutable `_next/static` caching and a safe public `/media` cache policy.

- [ ] **Step 2: Run RED test**

```bash
pnpm --filter @rosa/web test -- src/test/public-performance-policy.test.ts
```

- [ ] **Step 3: Generate right-sized header derivative**

Use the approved Rosa logo source, preserve aspect/appearance, and create a roughly 160×160 WebP suitable for a 56–64px header at high DPI. Target well under 25 KB without visible degradation.

Example local generation command:

```bash
python - <<'PY'
from PIL import Image
src = Image.open("approved-rosa-logo-source.jpeg").convert("RGB")
src.thumbnail((160, 160), Image.Resampling.LANCZOS)
canvas = Image.new("RGB", (160, 160), "white")
canvas.paste(src, ((160-src.width)//2, (160-src.height)//2))
canvas.save("apps/web/public/media/brand/rosa-header-logo-v1.webp", "WEBP", quality=88, method=6)
PY
```

Visually inspect before updating the registry. Do not change logo artwork/copy.

- [ ] **Step 4: Update header media registry**

```ts
export const ROSA_HEADER_LOGO_MEDIA = {
  src: "/media/brand/rosa-header-logo-v1.webp",
  ...
};
```

Keep `PublicBrandMark` priority/eager behavior because the tiny logo is above fold.

- [ ] **Step 5: Disable unavailable runtime transformation**

In `next.config.ts`:

```ts
images: {
  unoptimized: true,
  qualities: [75, 92],
  remotePatterns: ...
}
```

This follows Next.js semantics: `unoptimized: true` serves the source URL as-is. It avoids depending on OpenNext image optimization, which requires a Cloudflare Images binding/custom Cloudflare Images loader and may incur extra cost.

- [ ] **Step 6: Add Cloudflare static headers**

Create `apps/web/public/_headers`:

```text
/_next/static/*
  Cache-Control: public,max-age=31536000,immutable

/media/*
  Cache-Control: public,max-age=86400,stale-while-revalidate=604800

/media/brand/rosa-header-logo-v1.webp
  Cache-Control: public,max-age=31536000,immutable
```

Do not mark all existing `/media/*` immutable because several filenames are human-stable rather than content-hashed/versioned.

- [ ] **Step 7: Run image/media tests**

```bash
pnpm --filter @rosa/web test -- src/test/public-performance-policy.test.ts src/test/catalogue-downloads-and-product-media.test.tsx
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add apps/web/next.config.ts apps/web/public/_headers apps/web/public/media/brand/rosa-header-logo-v1.webp apps/web/src/features/public-media/public-media.ts apps/web/src/components/layout/public-brand-mark.tsx apps/web/src/test/public-performance-policy.test.ts
git commit -m "perf(media): serve cached source images directly"
```

---

### Task 6: Make new Supabase product-image URLs safely long-cacheable

**Files:**
- Modify: `apps/web/src/features/admin-products/actions.ts`
- Modify: `apps/web/src/features/admin-products/product-media-write.ts`
- Test: `apps/web/src/test/admin-product-media-write.test.ts`
- Test: `apps/web/src/test/admin-product-editor-scope.test.ts`

**Interfaces:** Existing UUID object-path strategy remains. Existing database compensation behavior remains. Only delivery constraints/cache-control change.

- [ ] **Step 1: Write RED tests for immutable upload behavior**

Test that generated paths remain unique UUID paths under `products/<productId>/...`, and source-level action test asserts storage upload uses:

```ts
cacheControl: "31536000"
```

Add validation case that product uploads above the new practical ceiling are rejected before storage. Use **3 MiB** as the server ceiling for this phase; it prevents unbounded camera files without introducing a native image-processing dependency that may not run on Cloudflare Workers.

- [ ] **Step 2: Run RED tests**

```bash
pnpm --filter @rosa/web test -- src/test/admin-product-media-write.test.ts src/test/admin-product-editor-scope.test.ts
```

- [ ] **Step 3: Tighten upload ceiling and long cache-control**

Change:

```ts
const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
```

and:

```ts
cacheControl: "31536000"
```

Keep `upsert: false` and UUID paths so a replacement always has a new URL and old browser/CDN cache entries cannot mask the replacement.

Do **not** add `sharp` or another native image processor in this phase because the deployment target is Cloudflare Workers and runtime compatibility must not be guessed. A later client-side preprocessing UX may be added separately while server-side size/MIME checks remain authoritative.

- [ ] **Step 4: Add best-effort same-isolate cache clear after successful DB update**

After `replacePrimaryProductImage()` succeeds and before `revalidatePath()` calls:

```ts
clearCatalogueProjectionCache();
```

This gives immediate freshness when the admin action and public request hit the same warm isolate; the 60-second TTL is still the cross-isolate safety bound.

- [ ] **Step 5: Run admin media tests**

```bash
pnpm --filter @rosa/web test -- src/test/admin-product-media-write.test.ts src/test/admin-product-editor-scope.test.ts src/test/admin-product-security.test.ts
```

Expected: PASS; no production write is performed.

- [ ] **Step 6: Commit**

```bash
git add apps/web/src/features/admin-products/actions.ts apps/web/src/features/admin-products/product-media-write.ts apps/web/src/test/admin-product-media-write.test.ts apps/web/src/test/admin-product-editor-scope.test.ts
git commit -m "perf(admin): make product image URLs long-cacheable"
```

---

### Task 7: Performance regression and migration safety verification

**Files:**
- Modify: `docs/architecture/2026-08-07-live-catalogue-baseline.md`
- Remove before merge if still present: `.github/workflows/lean-product-admin-review.yml`

**Interfaces:** No runtime interface; verification gate only.

- [ ] **Step 1: Run all focused performance/canonical tests**

```bash
pnpm --filter @rosa/web test -- \
  src/test/public-performance-policy.test.ts \
  src/test/catalogue-live-projections.test.ts \
  src/test/catalogue-live-repository.test.ts \
  src/test/catalogue-live-mapper.test.ts \
  src/test/catalogue-live-selectors.test.ts \
  src/test/catalogue-metadata-manifest.test.ts \
  src/test/public-product-live-cutover.test.ts \
  src/test/public-catalogue-selectors.test.ts \
  src/test/search-preview.test.tsx \
  src/test/catalogue-downloads-and-product-media.test.tsx \
  src/test/admin-product-media-write.test.ts \
  src/test/admin-product-security.test.ts \
  src/test/admin-product-canonical.test.ts \
  src/test/admin-product-editor-scope.test.ts \
  src/test/inquiry-store.test.ts \
  src/test/quotation-payload.test.ts \
  src/test/legacy-inquiry-hash.test.ts
```

- [ ] **Step 2: Run live Supabase parity test read-only**

```bash
RUN_LIVE_CATALOGUE_PARITY=1 \
NEXT_PUBLIC_SUPABASE_URL="$NEXT_PUBLIC_SUPABASE_URL" \
NEXT_PUBLIC_SUPABASE_ANON_KEY="$NEXT_PUBLIC_SUPABASE_ANON_KEY" \
pnpm --filter @rosa/web test -- src/test/catalogue-live-supabase.integration.test.ts
```

Expected: all 113 approved products hydrate and parity passes. This is read-only.

- [ ] **Step 3: Verify TypeScript**

```bash
pnpm --filter @rosa/web typecheck
```

Expected: PASS.

- [ ] **Step 4: Run focused ESLint over every changed source/test file**

```bash
pnpm --filter @rosa/web exec eslint \
  src/middleware.ts \
  src/lib/supabase/session-route-policy.ts \
  src/lib/supabase/public-read.ts \
  src/features/catalogue-live \
  src/features/homepage/homepage.tsx \
  src/features/products/products-overview.tsx \
  src/features/family-listing/family-listing-page.tsx \
  src/features/product-detail/product-detail-page.tsx \
  src/features/search-preview/search-default-page.tsx \
  src/features/localization/locale-link.tsx \
  src/features/localization/localized-button-link.tsx \
  src/components/layout/public-navigation-link.tsx \
  src/components/ui/button.tsx \
  src/features/admin-products/actions.ts \
  src/features/admin-products/product-media-write.ts \
  src/test/public-performance-policy.test.ts \
  src/test/catalogue-live-projections.test.ts
```

Expected: PASS. Do not modify unrelated pre-existing Publishing Centre lint failures merely to make whole-project lint green.

- [ ] **Step 5: Build production Next app and OpenNext target**

```bash
pnpm --filter @rosa/web build
cd apps/web && npx opennextjs-cloudflare build
```

Expected: PASS without requiring an `IMAGES` binding because image optimization is disabled and sources are served directly.

- [ ] **Step 6: Confirm static delivery configuration**

Inspect built HTML/network output where available and verify:
- logo `src` is `/media/brand/rosa-header-logo-v1.webp`, not `/_next/image?...`;
- family/editorial media remains `/media/...`;
- Supabase URLs appear only for products whose canonical `product_images.image_path` is a Supabase Storage URL;
- public HTML/RSC requests do not trigger `/auth/v1/user`.

- [ ] **Step 7: Re-check production DB preservation fingerprints read-only**

Compare against baseline:
- categories: `653cd90456d3c31ac61455979f4e7442`
- products: `e06862f03551d86942dc87bf86bd5929`
- product_variants: `e79d48cccd26c4a9d10f9fdc903a5e2c`
- product_images: `393262a999597ea7d0963e5365a98da0`
- site_settings: `b0d5389b83e30c869990f1e6aec1bb2f`
- routes: `0acd7d0c9941198cc818382a49027b92`

If any differ, investigate whether another legitimate actor changed production; **do not write old values back automatically**.

- [ ] **Step 8: Append measured verification evidence to baseline doc**

Record exact test counts, build result, live parity result, before/after fingerprints and the new public request model. Do not claim latency numbers that were not measured.

- [ ] **Step 9: Remove temporary branch-only review workflow before eventual merge**

Delete `.github/workflows/lean-product-admin-review.yml` from the feature branch after final CI evidence is captured so it cannot consume future Actions budget.

- [ ] **Step 10: Final commit**

```bash
git add docs/architecture/2026-08-07-live-catalogue-baseline.md .github/workflows/lean-product-admin-review.yml
git commit -m "docs: record public performance verification"
```

---

## Self-Review Against Approved Spec

- **Public auth:** Task 1 removes public `auth.getUser()` fan-out while preserving admin refresh.
- **Supabase ownership:** Task 2 retains product data as canonical Supabase data; Task 5 asserts all non-product media remains local.
- **Bounded data:** Tasks 2–3 remove whole-catalogue hydration from Home/Products/family/detail; only Search may read all active products.
- **No-paid cache:** Task 2 deliberately uses a bounded warm-isolate TTL cache. It does not pretend that Next/OpenNext has a globally persistent data cache when the project has no R2/KV/D1 incremental-cache binding.
- **Dynamic admin/new products:** scoped queries read live Supabase rows and are not a permanent compiled product database; current manifest parity bridge remains temporary until the catalogue metadata migration is safely completed.
- **Images:** Task 5 bypasses the unavailable runtime image optimizer and adds static Cloudflare headers; header logo becomes right-sized local media.
- **Product images:** Task 6 preserves versioned Supabase image URLs and makes them long-cacheable without destructive migration.
- **Failure semantics:** existing `CatalogueLiveReadError` vs `CatalogueLiveParityError` behavior remains required.
- **Production safety:** no DDL/DML performance mutation; final fingerprints are read-only checks.
- **Budget:** no paid infra and one final necessary CI verification window only.

No placeholder steps remain. The only deferred functionality is image transcoding at admin upload time; that is explicitly excluded because adding a native processor without proving Cloudflare Worker compatibility would violate the preservation-first requirement. Server upload size/MIME limits plus immutable versioned URLs still prevent the current performance path from regressing.