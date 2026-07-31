# Rosa Medical F3C Completion Record

**Date:** 2026-08-01  
**Owner:** Ahmad and Ahmad's frontend AI

## Branch and implementation state

- Branch: `frontend/f3c-catalogues-inquiry`
- Source implementation tip before this record: `e0912d9f76a17e76031a5839fc7333643b4e3b83`
- Design and plan base: `frontend/f3c-catalogues-inquiry-design`
- Design and plan base commit: `ac00f1d3915871aad67c85c859306de54e2498b4`
- Branch comparison at source review: 5 commits ahead, 0 behind
- OpenAPI changes: None
- Backend implementation changes: None

## Public routes upgraded

### `/catalogues`

- Complete five-document technical catalogue composition
- Catalogue records derived from the existing F3B family registry
- Ordered document sequence `01` through `05`
- Dark featured Knives treatment and asymmetric desktop grid
- Truthful source-status copy with no fabricated update dates
- Native disabled PDF controls with accessible explanatory text
- Active family links to all five product-family routes
- Search and blocked quotation guidance actions

### `/inquiry`

- Normal public route renders the approved empty-inquiry composition
- Browse Products and View Catalogues actions
- Neutral replaceable instrument media
- No fabricated selected products, quantities or inquiry count
- No populated preview content mounted on the normal route

### `/request-quotation`

- Normal public route renders a truthful blocked composition
- Explains that at least one selected instrument is required
- Links to Products, Catalogues and Inquiry
- No form, submit action, confirmation claim, email claim or request reference

## Reusable preview systems

### Populated inquiry preview

- Source-backed Scalpel Handle No. 3 (`18-0644`)
- Source-backed Mayo Scissors (`04-0402`)
- Source-backed Amputation Knife (`18-1202`)
- Quantities `2`, `4`, and `2`
- Derived totals: 3 unique products and 8 total instruments
- Read-only option and line-note presentation
- Disabled quantity and remove controls
- Summary and general procurement panels
- Desktop, tablet and mobile structures

### Quotation preview

- Accessible contact-information fields
- General request notes
- Disabled confirmation and submission controls
- Read-only selected-product summary using the inquiry preview fixture
- Accessible validation examples with `aria-invalid` and `aria-describedby`
- Static failure preview with disabled retry
- Static success preview that does not invent a reference or email delivery
- Result-driven success copy remains available for a later phase

Preview components are directly testable but are not public routes in F3C.

## Responsive and accessibility structure

- Figma-led 1440 px desktop, 768 px tablet and 390 px mobile rules
- Responsive grid and document-flow implementation rather than absolute Figma coordinates
- Existing `PublicShell` remains the sole `<main>` owner
- Exactly one route-level `<h1>` on each upgraded public route
- Semantic breadcrumb, list, definition-list, form, fieldset and output structures
- Native disabled and read-only semantics
- Focus behavior inherited from the shared Rosa component system
- Reduced-motion treatment
- Horizontal-overflow and footer-reachability Playwright assertions prepared

## Approved Figma references reviewed

- Catalogues desktop node `14:181` — 1440 × 2850
- Catalogues mobile node `14:265` — 390 × 3653
- Inquiry populated desktop node `16:3` — 1440 × 2450
- Inquiry empty desktop node `16:85` — 1280 × 520
- Inquiry populated mobile node `16:95` — 390 × 2986
- Request quotation desktop node `16:153` — 1440 × 2550
- Submission success desktop node `16:239` — 1280 × 620
- Request quotation mobile node `16:250` — 390 × 3150
- Submission success mobile node `16:293` — 350 × 608

## Source review evidence

- Compared `frontend/f3c-catalogues-inquiry-design...frontend/f3c-catalogues-inquiry`
- Result before this record: 5 commits ahead, 0 behind
- Changed files are contained to F3C frontend components, routing, styles and tests
- No files under `services/api/**` changed
- No files under `packages/contracts/openapi/**` changed
- F3B catalogue registry remains the single source for product identity and options
- Public route resolver mounts only Catalogues, Empty Inquiry and Blocked Quotation
- No public preview route was added
- No client state, storage, cookie, server action, API call or mutation handler was added
- Public-copy policy checks reject ecommerce offers and internal phase language
- CSS review confirmed existing token usage, responsive grids and no absolute-position reconstruction

## Automated verification status

The following checks are prepared but were not executed in the assistant environment:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm --filter @rosa/web test:foundation
node --test apps/web/src/test/public-page-styles.static.test.mjs
node --test apps/web/src/test/f3b-styles.static.test.mjs
node --test apps/web/src/test/f3c-styles.static.test.mjs
node --test apps/web/src/test/f3c-policy.static.test.mjs
pnpm test:e2e
```

These checks are **not passed** until their actual outputs are reviewed. Browser screenshots and pixel-level implementation comparison also remain pending.

## Known limitations

- PDF files are not exposed as public application assets yet.
- Public inquiry state is empty by design.
- Product selection, persistence, quantities, notes and header count remain deferred to F4.
- Quotation validation and submission remain preview-only.
- Email delivery, idempotency, persistence and success references require later backend integration.
- Product media remains neutral and replaceable.

## Next milestone

F3D — About, Procurement Support, Contact, Search, Privacy and Terms static public pages.
