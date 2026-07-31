# Rosa Medical F3C — Catalogues, Inquiry and Quotation Design

**Date:** 2026-08-01  
**Owner:** Ahmad and Ahmad's frontend AI  
**Status:** Approved design awaiting implementation plan

## 1. Purpose

F3C completes the static public procurement path that connects technical catalogues, the inquiry list and the quotation-request experience.

This milestone upgrades these routes:

- `/catalogues`
- `/inquiry`
- `/request-quotation`

F3C remains a static composition milestone. It must accurately represent the approved Figma designs without introducing fake basket contents, fake product selection, fake form submission, fake email delivery, fake request references or premature backend behavior.

The public route behavior is deliberately truthful:

- `/catalogues` renders the five approved family documents and real links to family pages.
- `/inquiry` defaults to the approved empty-inquiry state because F4 has not yet activated product selection.
- `/request-quotation` renders a blocked state when no selected products exist and cannot submit.
- Populated basket, quotation form, validation, failure and success compositions are implemented as reusable preview components but are not mounted as normal public route states in F3C.

## 2. Source of truth

### Approved Figma frames

Catalogues:

- Desktop: `14:181` — 1440 × 2850
- Mobile: `14:265` — 390 × 3653

Inquiry:

- Populated desktop: `16:3` — 1440 × 2450
- Empty desktop: `16:85` — 1280 × 520
- Populated mobile: `16:95` — 390 × 2986

Request quotation:

- Form desktop: `16:153` — 1440 × 2550
- Success desktop: `16:239` — 1280 × 620
- Form mobile: `16:250` — 390 × 3150
- Success mobile: `16:293` — 350 × 608

### Existing implementation foundations

F3C builds on:

- the shared public shell and single `<main>` landmark
- F3A design tokens and public-page styling conventions
- F3B catalogue registry with five families and twenty source-backed products
- route-safe family and product helpers
- neutral replaceable product-media placeholders
- `Button`, `ButtonLink`, `Container`, `Section` and existing public-layout primitives

The F3C implementation must not duplicate the F3A/F3B token system or create a second catalogue registry.

## 3. Locked constraints

- Public brand lockup remains `ROSA` only.
- The website remains quotation-led, not ecommerce.
- Do not show prices, totals, stock, availability, checkout, payment, shipping, discounts, ratings or orders.
- Do not claim manufacturing, certifications, regulatory status, export experience, awards, materials or clinical suitability without verified source content.
- Do not fabricate catalogue update dates.
- Do not fabricate selected products on public routes before F4.
- Do not fabricate successful submission, confirmation email delivery or request references.
- Do not alter OpenAPI 0.1 during F3C.
- Do not add backend implementation.
- Product media remains neutral and replaceable.
- English is implemented first; component structure and ordering must remain suitable for later RTL adaptation.

## 4. Interaction boundary

F3C uses **static but honest** behavior.

### Active behavior allowed in F3C

- Internal navigation between public routes
- Navigation from each catalogue card to its family route
- Navigation from empty inquiry to Products and Catalogues
- Navigation from blocked quotation state to Products, Catalogues and Inquiry
- Navigation from catalogue guidance to Search or Request Quotation
- Native focus and keyboard behavior for real links

### Behavior deferred to F4

- Add product to inquiry
- Persist inquiry state
- Update quantities
- Remove products
- Add line notes
- Add general notes
- Update header inquiry count
- Expand/collapse populated summaries as application state
- Validate user-entered quotation details
- Submit a mocked request
- Display mocked success or failure as route state
- Generate an idempotency key
- Call the inquiry API

### Disabled and preview controls

Controls shown in unmounted preview compositions must use truthful native semantics:

- `disabled` buttons where no action exists
- `readOnly` inputs for static values
- `<output>` for noneditable totals or selections
- no clickable-looking text without an action
- no form submission handler
- no success toast, confirmation state or changing count

Preview components must be directly testable without becoming discoverable public routes.

## 5. Catalogue document model

F3C adds a frontend-owned presentation model derived from the existing five-family registry.

Each document record contains:

- family slug
- sequence `01` through `05`
- family name
- restrained family description
- cover label
- source-status label
- family-route destination
- optional future public PDF path

The public PDF path is absent in F3C unless an actual application asset is deliberately committed and routed. The supplied catalogue PDFs are source material, but their existence outside the deployed application does not justify a fake download URL.

### Catalogue descriptions

Use restrained, source-compatible descriptions:

- Knives — Precision cutting instruments and handles.
- Scissors — Scissors organised by listed pattern, size and configuration.
- Punches — Punch instruments organised by pattern and dimensions.
- Chisels — Chisels and osteotomes organised by form and size.
- Cutters — Cutting instruments organised by pattern, size and direction.

Avoid the unverified Figma phrase `Updated: [Month Year]`. Replace it with a truthful source-status line such as `Technical family catalogue` or omit the metadata row.

## 6. `/catalogues` composition

### Desktop

The desktop page follows Figma node `14:181`:

1. Breadcrumb
2. Red eyebrow: `TECHNICAL CATALOGUES`
3. Editorial heading about document-led browsing
4. Supporting copy connecting codes and configurations to the web catalogue
5. Five catalogue cards
6. Final dark catalogue-to-quotation guidance panel

The first catalogue card may use the approved dark featured treatment. Remaining cards use warm/paper surfaces. Cutters may span the full width on the final row, matching the approved asymmetric desktop composition.

Each card contains:

- numbered document cover
- family eyebrow
- family heading
- restrained description
- source-status text
- disabled PDF control labelled clearly, for example `PDF not available online`
- active `Explore products` link to `/products/<family>`

A disabled PDF control must not be an anchor, must not expose an empty `href`, and must include nearby explanatory text accessible to assistive technology.

### Mobile

The mobile page follows node `14:265`:

- shortened hero copy
- one catalogue card per row
- cover above family details
- full-width or paired controls only where their labels remain legible
- no horizontal scrolling
- all five documents remain visible
- the disabled PDF state remains explicit

### Guidance panel

The final guidance panel explains that users may search a product code online or include it in a quotation request.

Actions:

- `Search products` → `/search`
- `Start a quotation request` → `/request-quotation`

The second action leads to the truthful blocked state until F4 creates a real inquiry.

## 7. `/inquiry` route behavior

### Public route

The normal F3C public route renders the approved empty state from node `16:85`.

It contains:

- eyebrow `EMPTY INQUIRY`
- heading `Your inquiry list is empty.`
- explanation that products must be selected for quotation
- `Browse Products` → `/products`
- `View Catalogues` → `/catalogues`
- neutral instrument visual

The page must call the collection an `inquiry list` or `product requirement list`, never a cart.

### Populated preview composition

Reusable preview components reproduce nodes `16:3` and `16:95` for later F4 activation.

The fixed preview fixture contains three source-backed products from the F3B registry:

- Scalpel Handle No. 3 — `18-0644`
- Mayo Scissors — `04-0402`
- Amputation Knife — `18-1202`

Any displayed size or variant must come from the F3B registry. Do not copy conflicting Figma placeholder details when the source-backed record differs.

The preview includes:

- page heading and explanatory copy
- three inquiry lines
- neutral media
- family, name and code
- source-backed option summary
- disabled quantity controls
- read-only line-note presentation
- disabled remove action
- summary panel
- general procurement-request panel
- empty-state component

The preview may use fixed quantities solely to demonstrate layout in tests, but the public `/inquiry` route must not mount this populated state.

### Totals

Totals are computed from the preview fixture, not hand-written independently. The summary must derive:

- unique product count
- total quantity

This prevents the heading, lines and summary from drifting apart.

## 8. `/request-quotation` route behavior

### Public blocked state

The normal route must not render a submit-ready form without selected products.

It contains:

- eyebrow `REQUEST QUOTATION`
- heading explaining that an inquiry list is required
- concise explanation that contact details are collected after instruments are selected
- `Browse Products` → `/products`
- `View Catalogues` → `/catalogues`
- `Review Inquiry` → `/inquiry`

No submit button, confirmation checkbox, form validation, email statement or reference number appears in the normal blocked state.

### Quotation form preview

Reusable preview components reproduce Figma nodes `16:153` and `16:250` without activating submission.

Fields:

- customer name
- company or organisation
- email
- telephone
- country
- general request notes
- confirmation checkbox

Preview inputs may be empty and read-only, or use clearly labelled demonstration values in isolated tests. They must not be prefilled with real personal information.

The preview includes:

- contact-information section
- request-notes section
- confirmation section
- disabled submit button
- read-only selected-product summary derived from the same preview inquiry fixture
- return-to-inquiry link
- validation-example component
- submission-failure component
- mobile collapsed-summary component

### Validation examples

Validation examples are visual states only in F3C. They must use accessible field relationships:

- visible label
- invalid state
- error text with `aria-describedby`
- `aria-invalid="true"`

They must not appear as simultaneous errors on the normal public route.

### Failure preview

The failure component states that entered information has not been lost and provides a disabled retry control. It does not claim that any actual request failed.

### Success preview

The success component reproduces Figma nodes `16:239` and `16:293` as an isolated preview.

It must not fabricate `RM-2026-000123` as a real submitted reference. Use an explicit demonstration token such as `Reference shown after submission` in the static preview, or render the reference field only when a caller supplies a value.

It must not claim that an email was sent unless a caller explicitly supplies a successful submission result during a later phase.

## 9. Component boundaries

Recommended feature boundaries:

```text
apps/web/src/features/catalogues/
  catalogue-document-model.ts
  catalogue-cover.tsx
  catalogue-card.tsx
  catalogue-grid.tsx
  catalogue-guidance.tsx
  catalogues-page.tsx

apps/web/src/features/inquiry-preview/
  inquiry-preview-model.ts
  inquiry-line-preview.tsx
  inquiry-summary-preview.tsx
  populated-inquiry-preview.tsx
  empty-inquiry-page.tsx
  general-request-preview.tsx

apps/web/src/features/quotation-preview/
  quotation-field-preview.tsx
  quotation-form-preview.tsx
  quotation-product-summary.tsx
  quotation-validation-preview.tsx
  quotation-failure-preview.tsx
  quotation-success-preview.tsx
  quotation-blocked-page.tsx
```

Exact filenames may be adjusted in the implementation plan when required by existing conventions, but responsibilities must remain separated:

- catalogue records do not own page layout
- inquiry calculations do not own visual components
- quotation form fields do not own submission state
- public routing decides which truthful route composition is mounted

## 10. Routing

The public route resolver gains explicit kinds:

- `catalogues`
- `inquiry-empty`
- `quotation-blocked`

Existing kinds remain unchanged:

- homepage
- products overview
- family
- product
- placeholder
- not-found

Do not expose public preview routes such as `/inquiry/preview` or `/request-quotation/success` in F3C. Preview components are exercised through component tests and browser test fixtures only if a nonproduction test harness already exists. Otherwise they remain unit-rendered components until F4.

## 11. Responsive design

### Desktop — 1440 px

- Catalogue grid follows the approved two-column plus full-width final-card arrangement.
- Inquiry preview uses an 840 px content region and a 360 px summary region.
- Quotation preview uses an 820 px form region and a 380 px selected-product summary.
- Editorial headings retain the Figma hierarchy without absolute positioning.

### Tablet — 768 px

- Catalogue cards become a single column or balanced two-column layout only when content remains legible.
- Inquiry and quotation summaries move below primary content.
- No fixed widths exceed the container.
- Buttons preserve at least 44 px target height.

### Mobile — 390 px

- Catalogue cards stack vertically.
- Inquiry preview lines become image-first vertical cards.
- Quotation fields become one column.
- Product summary uses a truthful collapsed presentation only in the preview composition.
- No sticky action is required for the empty or blocked public states.
- Footer remains fully reachable.
- `document.documentElement.scrollWidth` must not exceed viewport width.

## 12. Accessibility

- Existing `PublicShell` remains the only `<main>` owner.
- Each public route has exactly one `<h1>`.
- Breadcrumbs use `<nav aria-label="Breadcrumb">`.
- Catalogue cards use headings in document order.
- Disabled controls use native `disabled` behavior.
- Read-only totals use text or `<output>`.
- Empty and blocked states have clear headings and recovery actions.
- Form-preview labels use native `<label>` associations.
- Validation messages use `aria-invalid` and `aria-describedby`.
- Decorative media is hidden from assistive technology.
- Meaningful media receives concise labels.
- Focus indicators remain visible.
- Reduced-motion preferences are respected.

## 13. Defensive rendering and error handling

- Missing catalogue family records fail loudly during registry validation.
- Duplicate catalogue sequence or family slug fails registry validation.
- Missing PDF paths render the disabled explanatory state, never a broken link.
- Empty inquiry data renders `EmptyInquiryPage`.
- Quotation requests with zero products render `QuotationBlockedPage`.
- Preview totals are derived from line data.
- Missing optional product options are omitted rather than replaced with invented values.
- Unknown public route depths continue to use Next.js not-found behavior.

## 14. Styling requirements

- Reuse Lora and Inter.
- Reuse Rosa red, near-black, paper, warm-white, mist, steel and border tokens.
- Catalogue covers use editorial document treatment, not generic cards.
- The first catalogue may use the approved dark featured state.
- Avoid glassmorphism, gradients, shadows used as decoration, oversized rounding and generic dashboard styling.
- Forms are precise and restrained, with rectangular bordered controls.
- Preview errors use the existing danger token system.
- Do not use inline pixel-position reconstruction from generated Figma code; translate the composition into responsive grid and flow layouts.

## 15. Test strategy

### Registry and model tests

- five catalogue records exist
- sequence values are unique and ordered
- every catalogue family exists in the F3B registry
- every family link is route-safe
- absent PDF paths produce disabled state
- preview totals are derived correctly
- preview products resolve from the F3B registry

### Component tests

- catalogue cards contain active family links and no fake PDF anchor
- empty inquiry contains Products and Catalogues actions
- blocked quotation contains no form or submit button
- populated inquiry preview is not rendered by the normal route resolver
- quotation form preview uses labels, read-only/disabled semantics and no submission handler
- validation previews expose accessible error relationships
- success preview does not invent a reference or email claim without supplied result data

### Static policy checks

Reject public F3C content containing ecommerce terminology such as:

- price
- checkout
- payment
- shipping
- stock
- order total
- buy now

Contextual words such as `quotation` and `total quantity` remain allowed.

### Browser checks

At 1440, 768 and 390 px:

- `/catalogues` renders all five documents
- family links resolve successfully
- no PDF action navigates
- `/inquiry` renders the empty state
- `/request-quotation` renders the blocked state
- one `<main>` and one `<h1>` exist
- no horizontal overflow
- footer is reachable
- keyboard focus is visible on all active actions

### Consolidated verification

Before claiming F3C runtime completion:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm --filter @rosa/web test:foundation
node --test apps/web/src/test/public-page-styles.static.test.mjs
node --test apps/web/src/test/f3b-styles.static.test.mjs
pnpm test:e2e
```

F3A and F3B regressions must be corrected before F3C is merged or integrated.

## 16. Completion criteria

F3C source implementation is ready for runtime verification only when:

- all three public routes use explicit F3C compositions
- `/catalogues` presents five truthful catalogue documents
- PDF actions are disabled unless backed by real application assets
- `/inquiry` defaults to the empty state
- `/request-quotation` defaults to the blocked state
- populated inquiry and quotation states exist only as reusable previews
- preview data comes from the F3B registry
- preview totals are derived
- no fake submission, reference or email claim exists
- no OpenAPI or backend files change
- responsive and accessibility tests are prepared
- the completion record distinguishes source review from actual runtime verification

## 17. Deferred work

F4 activates:

- inquiry add/remove/update behavior
- local persistence
- line and general notes
- header inquiry count
- quotation form validation
- mocked submission states

F5 and integration gate G3 activate:

- typed API submission
- `Idempotency-Key`
- backend persistence
- Rosa notification email
- customer confirmation email
- real request reference
- live error handling and retry

Actual public PDF delivery may be activated when the catalogue assets, filenames, hosting policy and accessibility labels are approved.