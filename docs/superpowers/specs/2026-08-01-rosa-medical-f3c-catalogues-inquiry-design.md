# Rosa Medical F3C — Catalogues, Inquiry and Quotation Design

**Date:** 2026-08-01  
**Owner:** Ahmad and Ahmad's frontend AI  
**Status:** Approved design awaiting implementation plan

## 1. Purpose

F3C completes the static public procurement path connecting technical catalogues, the inquiry list and the quotation-request experience.

Routes upgraded:

- `/catalogues`
- `/inquiry`
- `/request-quotation`

F3C remains a static composition milestone. It must follow the approved Figma designs without introducing fake basket contents, fake product selection, fake submission, fake email delivery, fake references or premature backend behavior.

Truthful public behavior:

- `/catalogues` renders five family documents and real family links.
- `/inquiry` defaults to the approved empty-inquiry state because F4 has not activated product selection.
- `/request-quotation` renders a blocked state when no selected products exist.
- Populated basket, form, validation, failure and success compositions exist as reusable preview components but are not mounted as normal F3C public-route states.

## 2. Source of truth

### Approved Figma frames

Catalogues:

- Desktop `14:181` — 1440 × 2850
- Mobile `14:265` — 390 × 3653

Inquiry:

- Populated desktop `16:3` — 1440 × 2450
- Empty desktop `16:85` — 1280 × 520
- Populated mobile `16:95` — 390 × 2986

Request quotation:

- Form desktop `16:153` — 1440 × 2550
- Success desktop `16:239` — 1280 × 620
- Form mobile `16:250` — 390 × 3150
- Success mobile `16:293` — 350 × 608

### Existing implementation foundations

F3C builds on:

- the shared public shell and its single `<main>` landmark
- F3A design tokens and public-page styling conventions
- the F3B catalogue registry with five families and twenty source-backed products
- route-safe family and product helpers
- neutral replaceable product-media placeholders
- existing `Button`, `ButtonLink`, `Container`, `Section` and public-layout primitives

F3C must not duplicate the F3A/F3B token system or create another catalogue registry.

## 3. Locked constraints

- Public logo treatment remains `ROSA` only.
- The website remains quotation-led, not ecommerce.
- Do not show monetary prices, unit prices, subtotals, financial totals, stock, availability, checkout, payment, shipping, discounts, ratings or orders.
- Product counts and total-quantity summaries are allowed because they describe procurement requirements, not monetary value.
- The truthful sentence `No prices are shown` is allowed where it clarifies the quotation workflow.
- Do not publish unsupported manufacturing, certification, regulatory, export, award, material or clinical claims.
- Do not fabricate catalogue update dates.
- Do not fabricate selected products on normal public routes before F4.
- Do not fabricate successful submission, confirmation email delivery or request references.
- Do not alter OpenAPI 0.1.
- Do not add backend implementation.
- Product media remains neutral and replaceable.
- English is implemented first; structure and ordering must remain suitable for later RTL adaptation.

## 4. Interaction boundary

F3C uses **static but honest** behavior.

### Active behavior

- Internal public navigation
- Catalogue-card navigation to family pages
- Empty-inquiry navigation to Products and Catalogues
- Blocked-quotation navigation to Products, Catalogues and Inquiry
- Catalogue-guidance navigation to Search and Request Quotation
- Native focus and keyboard behavior for real links

### Deferred to F4

- Add product to inquiry
- Persist inquiry state
- Change quantity
- Remove products
- Add line or general notes
- Update header inquiry count
- Expand populated summaries as application state
- Validate entered form data
- Submit a mocked request
- Show mocked success or failure as route state
- Generate an idempotency key
- Call the inquiry API

### Preview semantics

Unmounted preview controls use native truthful semantics:

- `disabled` for unavailable actions
- `readOnly` for static field values
- `<output>` or text for noneditable totals
- no empty links
- no click-looking text without an action
- no submit handler
- no changing count, success toast or confirmation claim

Preview components must be directly testable without becoming discoverable public routes.

## 5. Catalogue document model

F3C adds a frontend presentation model derived from the existing family registry.

Each document record contains:

- family slug
- sequence `01` through `05`
- family name
- restrained description
- cover label
- source-status label
- family-route destination
- optional future public PDF path

The public PDF path remains absent unless an actual application asset is deliberately committed and routed. The supplied PDFs are source material, but files outside the deployed application do not justify fake download URLs.

Descriptions:

- Knives — Precision cutting instruments and handles.
- Scissors — Scissors organised by listed pattern, size and configuration.
- Punches — Punch instruments organised by pattern and dimensions.
- Chisels — Chisels and osteotomes organised by form and size.
- Cutters — Cutting instruments organised by pattern, size and direction.

Do not use the Figma placeholder `Updated: [Month Year]`. Use `Technical family catalogue` or omit the metadata row.

## 6. `/catalogues`

### Desktop

Follow Figma node `14:181`:

1. Breadcrumb
2. `TECHNICAL CATALOGUES` eyebrow
3. Editorial document-led heading
4. Supporting copy connecting codes and configurations to the web catalogue
5. Five catalogue cards
6. Dark catalogue-to-quotation guidance panel

The first card may use the approved dark featured treatment. Remaining cards use warm or paper surfaces. Cutters may span the final desktop row.

Each card contains:

- numbered cover
- family eyebrow and heading
- restrained description
- source-status text
- disabled PDF control such as `PDF not available online`
- active `Explore products` link to `/products/<family>`

A missing PDF path renders a disabled non-anchor control with accessible explanatory text. It must never produce an empty or broken `href`.

### Mobile

Follow node `14:265`:

- shortened hero copy
- one catalogue card per row
- cover above family details
- legible full-width or paired controls
- all five documents visible
- explicit disabled PDF state
- no horizontal scrolling

### Guidance panel

Explain that users may search a product code or include it in a quotation request.

- `Search products` → `/search`
- `Start a quotation request` → `/request-quotation`

The quotation link leads to the truthful blocked state until F4 creates a real inquiry.

## 7. `/inquiry`

### Normal public route

Render the approved empty state from node `16:85`:

- `EMPTY INQUIRY` eyebrow
- `Your inquiry list is empty.` heading
- explanation that products must be selected for quotation
- `Browse Products` → `/products`
- `View Catalogues` → `/catalogues`
- neutral instrument visual

Use `inquiry list` or `product requirement list`, never `cart`.

### Populated preview

Reusable preview components reproduce nodes `16:3` and `16:95` for F4 activation.

The fixed preview fixture resolves these F3B records:

- Scalpel Handle No. 3 — `18-0644`
- Mayo Scissors — `04-0402`
- Amputation Knife — `18-1202`

Displayed sizes and variants come from the F3B registry. Conflicting Figma placeholder details must not override source-backed records.

Preview contents:

- page heading and quotation explanation
- three inquiry lines
- neutral media
- family, name, code and source-backed option summary
- disabled quantity controls
- read-only line-note presentation
- disabled remove action
- summary panel
- general procurement-request panel
- reusable empty state

The preview may use fixed quantities for layout testing. The normal `/inquiry` route must never mount this populated state during F3C.

### Derived totals

Unique-product count and total quantity are computed from preview lines rather than repeated as independent literals.

The summary may state `No prices are shown. Rosa will review the selected instruments and respond with a quotation.` This is a truthful absence-of-pricing statement, not an ecommerce price display.

## 8. `/request-quotation`

### Normal blocked state

Do not render a submit-ready form without selected products.

The blocked state contains:

- `REQUEST QUOTATION` eyebrow
- heading explaining that an inquiry list is required
- concise explanation that contact details are collected after instruments are selected
- `Browse Products` → `/products`
- `View Catalogues` → `/catalogues`
- `Review Inquiry` → `/inquiry`

It contains no submit button, confirmation checkbox, validation state, email statement or reference number.

### Quotation form preview

Reusable preview components reproduce nodes `16:153` and `16:250` without activating submission.

Fields:

- customer name
- company or organisation
- email
- telephone
- country
- general request notes
- confirmation checkbox

Preview fields may be empty and read-only or use explicit demonstration values in isolated tests. They must not contain real personal data.

The preview includes:

- contact-information section
- request-notes section
- confirmation section
- disabled submit button
- read-only product summary derived from the inquiry fixture
- return-to-inquiry link
- validation-example component
- submission-failure component
- mobile collapsed-summary component

### Validation preview

Visual only in F3C:

- visible label
- `aria-invalid="true"`
- error text referenced through `aria-describedby`
- no simultaneous validation errors on the normal public route

### Failure preview

State that entered information has not been lost and show a disabled retry control. Do not imply that a real request was attempted.

### Success preview

Reproduce nodes `16:239` and `16:293` as isolated previews.

- Do not fabricate `RM-2026-000123` as a real request.
- Render a reference only when a caller supplies one.
- Do not claim an email was sent unless a later caller supplies a successful submission result.
- Without supplied result data, show neutral explanatory copy such as `A reference and confirmation details appear after successful submission.`

## 9. Component boundaries

Recommended structure:

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

Exact filenames may change in the implementation plan to follow existing conventions, but responsibilities remain separated:

- catalogue records do not own page layout
- inquiry calculations do not own visual components
- quotation fields do not own submission state
- public routing decides which truthful composition is mounted

## 10. Routing

Add explicit route kinds:

- `catalogues`
- `inquiry-empty`
- `quotation-blocked`

Preserve existing homepage, products, family, product, placeholder and not-found kinds.

Do not expose public preview routes such as `/inquiry/preview` or `/request-quotation/success`. Preview components are unit-rendered unless an existing nonproduction test harness can mount them without changing the public route inventory.

## 11. Responsive design

### Desktop — 1440 px

- Catalogue grid uses two columns plus a full-width final card.
- Inquiry preview uses an approximately 840 px content region and 360 px summary.
- Quotation preview uses an approximately 820 px form region and 380 px product summary.
- Use responsive flow and grid, not absolute-position reconstruction.

### Tablet — 768 px

- Catalogue cards become one column or a balanced two-column layout only where legible.
- Inquiry and quotation summaries move below primary content.
- No fixed width exceeds the container.
- Active targets preserve at least 44 px height.

### Mobile — 390 px

- Catalogue cards stack.
- Inquiry preview lines become image-first vertical cards.
- Quotation fields become one column.
- Collapsed product-summary treatment appears only in preview composition.
- Empty and blocked public routes require no sticky action.
- Footer remains reachable.
- Page scroll width must not exceed viewport width.

## 12. Accessibility

- `PublicShell` remains the only `<main>` owner.
- Each public route has exactly one `<h1>`.
- Breadcrumbs use `<nav aria-label="Breadcrumb">`.
- Catalogue-card headings follow document order.
- Disabled controls use native `disabled` semantics.
- Totals use text or `<output>`.
- Empty and blocked states provide clear recovery links.
- Preview form fields use native labels.
- Validation messages use `aria-invalid` and `aria-describedby`.
- Decorative media is hidden from assistive technology.
- Meaningful media receives concise labels.
- Focus indicators remain visible.
- Reduced-motion preferences are respected.

## 13. Defensive rendering

- Missing catalogue families fail registry validation.
- Duplicate sequence or family slug fails validation.
- Missing PDF paths render a disabled state, never a broken link.
- Empty inquiry data renders `EmptyInquiryPage`.
- Zero selected products render `QuotationBlockedPage`.
- Preview totals derive from line data.
- Missing optional product details are omitted rather than invented.
- Unknown route depths retain Next.js not-found behavior.

## 14. Styling

- Reuse Lora and Inter.
- Reuse Rosa red, near-black, paper, warm-white, mist, steel, border and danger tokens.
- Catalogue covers use editorial document treatment rather than generic cards.
- The first catalogue may use the approved dark featured state.
- Avoid glassmorphism, gradients, decorative shadows, oversized rounding and dashboard styling.
- Forms remain rectangular, precise and restrained.
- Do not reproduce generated Figma absolute coordinates; translate them into responsive grid and flow layouts.

## 15. Test strategy

### Registry and model tests

- five catalogue records
- unique ordered sequences
- every catalogue family exists in F3B
- route-safe family links
- absent PDF paths produce disabled state
- preview totals derive correctly
- preview products resolve from F3B

### Component tests

- active family links and no fake PDF anchors
- empty inquiry contains Products and Catalogues actions
- blocked quotation contains no form or submit button
- normal route resolver never mounts populated inquiry preview
- form preview uses labels and read-only/disabled semantics without submission handler
- validation previews expose accessible relationships
- success preview does not invent a reference or email claim

### Procurement-policy checks

Reject actionable ecommerce content such as:

- unit price or monetary price values
- subtotal or financial total
- checkout
- payment
- shipping
- in stock or out of stock
- order total
- buy now

Allow:

- `No prices are shown`
- product count
- unique-product count
- total quantity
- quotation
- inquiry

### Browser checks

At 1440, 768 and 390 px:

- `/catalogues` shows all five documents
- family links resolve
- no disabled PDF control navigates
- `/inquiry` shows the empty state
- `/request-quotation` shows the blocked state
- exactly one `<main>` and one `<h1>`
- no horizontal overflow
- footer reachable
- visible keyboard focus on active actions

### Consolidated verification

Before any runtime-completion claim:

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

F3C source implementation is ready for runtime verification when:

- all three routes use explicit F3C compositions
- `/catalogues` presents five truthful documents
- missing PDF assets produce disabled controls
- `/inquiry` defaults to empty state
- `/request-quotation` defaults to blocked state
- populated inquiry and quotation states exist only as previews
- preview data comes from F3B
- preview totals are derived
- no fake submission, reference or email claim exists
- no OpenAPI or backend files change
- responsive and accessibility tests are prepared
- completion documentation distinguishes source review from actual runtime verification

## 17. Deferred work

F4 activates:

- inquiry add/remove/update behavior
- local persistence
- notes
- header inquiry count
- form validation
- mocked submission states

F5 and G3 activate:

- typed API submission
- `Idempotency-Key`
- backend persistence
- Rosa notification email
- customer confirmation email
- real request reference
- live failure handling and retry

Public PDF delivery may be activated when catalogue assets, filenames, hosting policy and accessibility labels are approved.