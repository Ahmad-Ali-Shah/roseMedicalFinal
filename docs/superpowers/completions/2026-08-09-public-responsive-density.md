# Public Responsive Density Completion Record

**Date:** 2026-08-09
**Branch:** `frontend/client-feedback-responsive-homepage-pr`
**Approved design:** `docs/superpowers/specs/2026-08-09-public-responsive-density-design.md`
**Approved plan:** `docs/superpowers/plans/2026-08-09-public-responsive-density-implementation.md`
**Implementation commit:** `1107638` (`refactor(web): tune public route density`)

## Delivered

- Extended the homepage density language to every non-admin public route without changing route components, catalogue data, submission behavior or protected admin behavior.
- Added shared internal-page tokens for intro spacing, card gaps, media bounds, control height and textarea height.
- Bounded display typography, media and first-viewport composition for products, all five family listings, product detail, catalogues, About, Procurement Support, Contact, Inquiry, Request Quotation, Search, legal pages and public empty/error states.
- Preserved practical 44px controls, natural mobile flow, laptop continuation, large-screen ceilings, sticky mobile product actions and tall-screen editorial behavior.
- Added Arabic typography safety, RTL containment, reduced-motion settlement, 200% text checks, public redirect coverage and strict not-found coverage.
- Preserved the approved homepage carousel transition, five-family interaction, shared shell, social links and existing homepage responsive matrix.

## Shared density tokens

The final-loaded `apps/web/src/styles/public-density.css` owns:

- `--public-density-intro-block`
- `--public-density-card-gap`
- `--public-density-media-block`
- `--public-density-control-block`
- `--public-density-textarea-block`

Route-family rules use existing semantic selectors such as `.products-hero`, `.family-hero`, `.product-detail-layout`, `.f3d-hero__layout`, `.contact-main-layout`, `.quotation-page`, `.search-default-page`, `.legal-page` and the existing public state classes. No wrapper scaling, CSS zoom or root-font shrinking was introduced as a density technique.

## Route audit

English route templates reviewed at all four anchor widths:

- `/`
- `/products`
- `/products/{family}` using `/products/knives`
- `/products/{family}/{product}` using `/products/knives/scalpel-handle-no-3`
- `/catalogues`
- `/about`
- `/procurement-support`
- `/contact`
- `/search`
- `/inquiry` empty state and seeded state
- `/request-quotation` blocked state and seeded form state
- `/privacy`
- `/terms`
- strict not-found using `/products/scissors/scalpel-handle-no-3`

Arabic runtime coverage included `/ar/products`, all major catalogue/detail/editorial/form/utility templates, both legal pages and seeded inquiry/quotation states. Public redirects were verified exactly: `/login` to `/admin/login`, `/forgot-password` and `/reset-password` to `/admin/recovery`, and `/account` to `/inquiry`.

## Responsive and visual acceptance

The exact matrix passed at:

- 360x800
- 390x844
- 430x932
- 768x1024
- 1024x768
- 1280x720
- 1366x768
- 1440x900
- 1536x864
- 1920x1080
- 2560x1440

Every public template was separately captured at `390x844`, `768x1024`, `1366x768` and `1920x1080`. Together with the exact matrix, **67 distinct settled viewport captures** were retained and manually inspected. Review covered header mode, first-viewport content, heading wrapping, media framing, card proportions, section continuation, form controls, footer layout and sticky actions. No horizontal overflow, clipping, incoherent overlap or blank media was found.

Focused visual results:

- Four-anchor route audit: **4 passed**, 56 route/viewport captures, 0 failures.
- Exact 11-viewport matrix: **1 passed**, 11 captures, 0 failures.
- Homepage 11-size acceptance remained green.
- Arabic RTL audit, 200% text audit and reduced-motion route-family audit each passed.
- Existing reduced-motion and responsive-restraint suites: **10 passed, 2 project-inapplicable skips**.

## Verification evidence

### Vitest

`./node_modules/.bin/pnpm --filter @rosa/web test`

- **101 files passed**
- **1 integration file skipped**
- **491 tests passed**
- **2 intentional Supabase integration tests skipped**
- **0 failures**

The targeted-file invocation resolves to the repository's complete Vitest run under the current script, so this result also serves as the full web-unit baseline.

### Playwright

The focused closeout batch covered the new density suite plus homepage, homepage matrix, public shell, reduced motion, responsive restraint and quotation flow across desktop, tablet and mobile projects:

- **87 passed**
- **108 project-inapplicable skips**
- **0 failures**

The live catalogue endpoint was unavailable in the sandbox; the application's intended deterministic static fallback supplied catalogue content throughout the browser run.

### TypeScript

`./node_modules/.bin/pnpm --filter @rosa/web typecheck`: **PASS**.

### ESLint

Repository-wide ESLint reproduces the accepted pre-existing baseline only:

- `src/test/admin-publishing.test.tsx`: 1 `no-require-imports` error
- `src/test/test-runtime.setup.ts`: 2 `no-explicit-any` errors
- 6 unrelated admin warnings

Neither changed responsive file has a lint finding.

### Production build

The first sandboxed build could not read local network interfaces while evaluating the existing `next.config.ts` (`uv_interface_addresses`, system error 1). The unchanged command was rerun outside that restriction and passed:

- Next.js 16.2.11 production compile: **PASS**
- TypeScript build stage: **PASS**
- static generation: **18/18 PASS**
- final route optimization: **PASS**

The build-generated `apps/web/next-env.d.ts` rewrite was restored to the user's exact pre-existing dirty content from the safety stash.

## Ownership boundary

`git diff -- services/api packages/contracts apps/web/src/app/admin` is empty for this phase. No backend service, OpenAPI source, Supabase migration, authentication/session behavior, catalogue persistence, quotation/contact persistence, product relationship or protected admin UI behavior changed.

Pre-existing dirty frontend/tooling files remain unstaged and recognizable. The safety stash `codex-pre-public-density-preserve-2026-08-09` remains available through final verification.

## Result

The public site now shares one responsive density system from phone through large monitor while retaining the existing information architecture and interactions. Backend integration gates remain unchanged; this work is ready for owner review as a presentation and responsive-behavior update only.
