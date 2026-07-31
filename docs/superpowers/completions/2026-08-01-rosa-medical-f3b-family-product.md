# Rosa Medical F3B Completion Record

**Date:** 2026-08-01  
**Owner:** Ahmad and Ahmad's frontend AI

## Branch and implementation state

- Branch: `frontend/f3b-family-product`
- Source implementation tip before this record: `7818dd4c7325ae7038a012e4b7becb1a52c0571b`
- Design and plan base: `frontend/f3b-family-product-design`
- Design and plan base commit: `5693e409787903df728948ce3977223de4e154a5`
- Branch comparison at review: 6 commits ahead, 0 behind
- OpenAPI changes: None
- Backend implementation changes: None

## Family routes completed

- `/products/knives`
- `/products/scissors`
- `/products/punches`
- `/products/chisels`
- `/products/cutters`

All five routes use one validated `FamilyListingPage` template and display four source-backed product records each.

## Product routes completed

### Knives

- `/products/knives/scalpel-handle-no-3`
- `/products/knives/bard-parker-handle`
- `/products/knives/amputation-knife`
- `/products/knives/resection-knife`

### Scissors

- `/products/scissors/mayo-scissors`
- `/products/scissors/iris-scissors`
- `/products/scissors/sims-scissors`
- `/products/scissors/pottsmith-scissors`

### Punches

- `/products/punches/yeoman`
- `/products/punches/yeoman-perforated`
- `/products/punches/yeoman-rectangular`
- `/products/punches/biopsy-punch`

### Chisels

- `/products/chisels/codman`
- `/products/chisels/lambotte`
- `/products/chisels/mini-lambotte`
- `/products/chisels/farabeuf`

### Cutters

- `/products/cutters/liston`
- `/products/cutters/cleveland`
- `/products/cutters/bohler`
- `/products/cutters/sc-01t`

All twenty detail routes use one validated `ProductDetailPage` template. Unknown families, unknown products, family/product mismatches and unsupported catalogue path depths resolve to Next.js not-found behavior.

## Implemented architecture

### Catalogue registry

- Five source-backed family records
- Twenty source-backed product records
- Unique product-ID and family-local route validation
- Required name/code validation
- Deterministic family and product lookup
- Deterministic same-family related-product selection
- No OpenAPI or backend dependency

### Family listing

- Breadcrumb and family introduction
- Source-backed family count
- Neutral family media
- Real `/catalogues` navigation without fake download behavior
- Read-only search and sort presentation
- Disabled mobile filter trigger
- Desktop filter preview
- Responsive four-product grid
- Reusable loading and no-results previews
- Real `/contact` procurement-support navigation

### Product detail

- Breadcrumbs
- Static media gallery and thumbnail states
- Product name, family, code and restrained description
- Native output and disabled quantity semantics
- Disabled inquiry controls with explanatory copy
- Catalogue reference navigation
- Semantic specification table with unsupported rows omitted
- Procurement-note preview
- Same-family related products
- Desktop inquiry navigation
- Truthful fixed mobile inquiry bar

### Responsive and accessibility structure

- Figma-led desktop 1440 px, tablet 768 px and mobile 390 px rules
- Existing public shell remains the sole `<main>` owner
- One route-level `<h1>` per upgraded page
- Semantic breadcrumb navigation, product lists and specification tables
- No nested product-card interactions
- Reduced-motion treatment
- Mobile sticky-bar and footer safety spacing
- Horizontal-overflow assertions prepared in Playwright

## Approved Figma references reviewed

- Category desktop node `12:176` — 1440 × 3300
- Category mobile node `12:286` — 390 × 4100
- Mobile filter preview node `12:336` — 350 × 720
- Product detail desktop node `14:3` — 1440 × 3500
- Product detail mobile node `14:104` — 390 × 4050

The source composition follows the approved family hero, filter/result relationship, media/detail split, specification hierarchy, related-product structure and mobile sticky-action treatment.

## Verification status

### Source review performed

- Compared `frontend/f3b-family-product-design...frontend/f3b-family-product`
- Result: 6 commits ahead, 0 behind at source review
- Changed files remain inside F3B frontend records, routes, components, styles and tests
- No files under `services/api/**` changed
- No OpenAPI schema or operation changed
- Source-backed product names, codes and stated options were checked against the supplied family catalogues
- Likely TypeScript tuple inference issue in specification rows was corrected before this record
- Route fallthrough, typed links, CSS token names, server-component semantics and mobile sticky safety were manually reviewed

### Automated verification not run

The following are prepared but not executed in the assistant environment:

```bash
pnpm install --frozen-lockfile
pnpm contracts:generate
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm --filter @rosa/web test:foundation
node --test apps/web/src/test/public-page-styles.static.test.mjs
node --test apps/web/src/test/f3b-styles.static.test.mjs
pnpm test:e2e
```

Reason: the assistant runtime cannot resolve GitHub/npm hosts, and Ahmad previously chose to defer the consolidated local verification round. These checks are **not passed** until their actual outputs are reviewed.

Browser-render screenshots and pixel-level implementation comparison are also pending the local build and Playwright run.

## Known limitations

- Product media remains neutral and replaceable.
- Search, sort, filters, gallery switching, quantity changes, notes and inquiry mutation remain nonfunctional by design until F4.
- Catalogue cards navigate to the catalogue route; direct PDF behavior belongs to F3C.
- Contact, catalogue and inquiry destinations still use their current placeholder compositions until their planned milestones.
- Runtime and browser fidelity remain unverified.

## Next milestone

F3C — Inquiry Basket, Request Quotation and Catalogues.
