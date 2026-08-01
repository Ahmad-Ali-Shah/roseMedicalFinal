# Rosa Medical F3D — Public Support, Search and Legal Design

**Date:** 2026-08-01  
**Owner:** Ahmad and Ahmad's frontend AI  
**Status:** Approved design awaiting implementation plan

## 1. Purpose

F3D replaces the remaining public-route placeholders with deliberate, responsive compositions while preserving the project’s static-but-honest F3 boundary.

Routes upgraded:

- `/about`
- `/procurement-support`
- `/contact`
- `/search`
- `/privacy`
- `/terms`

F3D completes public-page composition only. It does not activate catalogue search, contact submission, navigation overlays, mobile-menu state, product inquiry behavior, legal publication readiness, backend requests or email delivery.

## 2. Source of truth

### Approved Figma frames

Search and navigation reference:

- Search default `25:61`
- Search typing `25:84`
- Search results `25:95`
- Search loading `25:115`
- Search no-results `25:130`
- Search error `25:140`
- Mobile search results `25:150`

About:

- Desktop `27:3` — 1440 × 4920
- Mobile `27:92` — 390 × 5490

Procurement Support:

- Desktop `27:174` — 1440 × 4820
- Mobile `27:270` — 390 × 5640

Contact:

- Desktop `28:3` — 1440 × 3920
- Mobile `28:79` — 390 × 4690
- Contact form states `28:141`
- Success desktop `31:2`
- Success mobile `31:48`

Legal:

- Privacy desktop `29:50` — 1440 × 4300
- Privacy mobile `29:150` — 390 × 5200
- Terms desktop `29:218` — 1440 × 4300
- Terms mobile `29:330` — 390 × 5200
- Shared footer reference desktop `29:6`
- Shared footer reference mobile `29:33`

### Existing implementation foundations

F3D builds on:

- the shared public shell and its single `<main>` landmark
- F3A design tokens, public layout and responsive conventions
- the F3B five-family, twenty-product catalogue registry
- F3C truthful empty inquiry and blocked quotation states
- existing route resolver, `Container`, `Section`, `Button`, `ButtonLink`, field and media-placeholder primitives
- the existing shared header and footer

F3D must not create a second catalogue registry, duplicate design tokens or replace the public shell.

## 3. Locked constraints

- Public logo treatment remains `ROSA` only.
- Public positioning remains medical instruments supplier and procurement partner.
- Do not publish unsupported ownership, company-history, manufacturing, factory, certification, regulatory, export, award, experience, clinical or material claims.
- Do not publish fake contact details that resemble usable address, telephone, WhatsApp or email data.
- Do not claim that a contact message, quotation request, email or confirmation was sent.
- Do not invent contact references.
- Do not activate search or display generated search results on the normal `/search` route during F3D.
- Do not invent legal dates, registration details, jurisdiction, governing law, processors, analytics providers, cookie behavior, data-retention periods, liability terms or user-rights procedures.
- Legal pages remain explicit templates pending client and qualified legal review.
- Do not change OpenAPI 0.1.
- Do not add backend implementation.
- English is implemented first; layout, field order and component structure remain suitable for later RTL work.

## 4. Interaction boundary

F3D uses **static but honest** public behavior.

### Active behavior

- Internal public navigation
- Real links from About and Procurement Support to Products, families, Catalogues, Inquiry, Contact and Request Quotation
- Real product-detail links inside isolated search-result previews
- Legal section anchor navigation where the section exists on the same page
- Native keyboard and focus behavior for active links

### Deferred to F4

- Header search overlay opening and closing
- Desktop product mega-menu behavior
- Mobile menu open/close and accordion behavior
- Search input state, filtering, matching, result announcements and clear/retry behavior
- Add-to-inquiry from search results
- Contact field editing, validation and mocked submission
- Contact loading, success and failure as public route state
- Contact reference generation
- Any integration with a map provider

### Preview semantics

Isolated preview components must use truthful native semantics:

- `readOnly` for static fields
- `disabled` for unavailable buttons or checkboxes
- real anchors only when a valid destination exists
- no empty `href`
- no submit handler
- no fake live-region announcement on the normal public route
- no result count on the normal public route
- no fake success claim without supplied result data

Preview components remain directly testable without becoming public routes.

## 5. Shared editorial models

F3D may introduce focused frontend presentation records for:

- numbered editorial items
- supported buyer groups
- procurement steps
- requirement types
- information-checklist items
- contact-information status rows
- search preview states
- legal documents and legal sections

These are presentation records, not API models. They must remain separate from live backend state and must not duplicate catalogue product data.

## 6. `/about`

Follow desktop node `27:3` and mobile node `27:92`.

### Page structure

1. Breadcrumb
2. `ABOUT ROSA` eyebrow
3. Editorial hero heading
4. Restrained positioning copy
5. Replaceable editorial media placeholder
6. Five buyer expectations
7. Four supported buyer groups
8. Five-family catalogue index
9. Procurement Support preview
10. Final inquiry CTA

### Buyer expectations

Use the approved restrained themes:

1. Clear product codes
2. Organised families
3. Catalogue access
4. Structured requests
5. Responsive communication

The implementation must describe website and procurement-process structure only. It must not transform these into guarantees, service-level commitments or company-history claims.

### Supported buyers

- Hospitals and clinics
- Procurement teams
- Distributors and wholesalers
- International buyers

These are audience categories, not claims of existing customers or export history.

### Family index

Render all five registered families in source order using real family links:

- Knives
- Scissors
- Punches
- Chisels
- Cutters

### CTA behavior

- Procurement Support → `/procurement-support`
- Browse Products → `/products`
- Request a Quote → `/request-quotation`

The quotation destination remains the truthful blocked F3C state when no products are selected.

## 7. `/procurement-support`

Follow desktop node `27:174` and mobile node `27:270`.

### Page structure

1. Breadcrumb
2. Procurement Support hero
3. Replaceable procurement media
4. Six-step process
5. Four common requirement types
6. Six-item information checklist
7. Support-route panel
8. Final quotation CTA

### Six-step process

1. Browse by family
2. Review codes and options
3. Add products to inquiry
4. Add useful notes
5. Submit contact details
6. Receive confirmation

During F3D, these are process explanations. Steps 3 through 6 must not imply that interaction is already enabled or that confirmation delivery is guaranteed.

### Requirement types

- Product-specific inquiry
- Multiple-product list
- Catalogue-led inquiry
- Unlisted product request

### Information checklist

- Product codes
- Sizes
- Variants
- Quantities
- Destination country
- Packing, finish and additional notes

The checklist describes information that may help review a request. It must not imply mandatory certification, availability or shipping commitments.

### Support routes

- Browse Products → `/products`
- Open Inquiry → `/inquiry`
- Contact Rosa → `/contact`
- Request a Quote → `/request-quotation`

## 8. `/contact`

Follow desktop node `28:3` and mobile node `28:79`.

### Normal public composition

1. Breadcrumb
2. `CONTACT ROSA` eyebrow
3. General-business-message heading
4. Clear separation from product quotation inquiries
5. `Open Product Inquiry` link to `/inquiry`
6. Contact-information status panel
7. Read-only general contact-form composition
8. Location/media placeholder
9. Product-quotation redirect panel

### Contact-information status panel

Do not render realistic placeholder contact values. Use explicit status wording:

- Business name — Rosa Medical
- Address — Awaiting client confirmation
- Telephone — Awaiting client confirmation
- WhatsApp — Awaiting client confirmation
- Email — Awaiting client confirmation
- Working hours — Awaiting client confirmation
- Social profiles — Awaiting client confirmation

Unconfirmed rows are text only. They must not use `mailto:`, `tel:`, WhatsApp or social-profile links.

### General contact-form composition

Fields:

- Name
- Company or organisation
- Email
- Telephone
- Country
- Subject
- Message

Normal-route fields are read-only or disabled presentation controls. The submit action is disabled and accompanied by truthful copy explaining that online submission is not yet active.

The page must state that a general contact message is separate from a product quotation request.

### Isolated contact previews

Reusable previews reproduce the approved states without exposing them on the normal route:

- focused field
- validation error
- loading
- failure
- success

Validation previews use `aria-invalid="true"` and error text connected through `aria-describedby`.

The default success preview:

- does not claim a message was sent
- does not show `CONTACT-PLACEHOLDER` as a real reference
- displays a reference only when a later caller supplies one
- does not claim email confirmation

### Location placeholder

Use a clearly labelled neutral media block. Do not embed a real map, pin, address or third-party map script until a confirmed location exists.

## 9. `/search`

F3D implements a dedicated public search page based on the approved global-search compositions. It does not activate the header search overlay or search logic.

### Normal public route

Render the default discovery state based on node `25:61`:

- `GLOBAL SEARCH` eyebrow
- `Find an instrument.` heading
- read-only search field
- close action omitted because this is a page, not an active overlay
- five family shortcuts using real family links
- clear explanation that interactive catalogue search is activated in F4

The normal `/search` route must not mount product results, loading rows, no-results copy, error copy or a result count.

### Isolated search previews

Reusable previews reproduce:

- typing state `25:84`
- results state `25:95`
- loading state `25:115`
- no-results state `25:130`
- error state `25:140`
- mobile results state `25:150`

Preview result products resolve from the F3B catalogue registry. They may use source-backed examples such as:

- Scalpel Handle No. 3 — `18-0644`
- Bard Parker Handle — `18-0650`

When source labels differ from Figma placeholders, the catalogue registry controls the product name, code, family and options.

Each result may contain:

- neutral media
- family
- product name
- code
- source-backed option summary
- real product-detail link
- disabled Add to inquiry action

### Search-state rules

- Loading preview uses nonanimated or reduced-motion-safe skeleton treatment.
- No-results preview uses a demonstration query only inside the isolated preview.
- Error preview states that search could not be completed but does not claim a real network attempt.
- Result count and errors are announced only when F4 activates actual state.

## 10. `/privacy` and `/terms`

Use one reusable legal-template system following nodes `29:50`, `29:150`, `29:218` and `29:330`.

### Shared structure

1. Breadcrumb
2. `LEGAL TEMPLATE` eyebrow
3. Document title
4. Visible legal-review warning
5. Unresolved updated-date status
6. Section navigation
7. Numbered legal sections
8. Final legal-review annotation

### Updated date

Do not publish `LAST UPDATED: REPLACE DATE` as if it were real. Use explicit wording such as:

`Last updated: awaiting client and legal approval`

### Privacy sections — nine

1. Information collected
2. How information is used
3. Inquiry and contact submissions
4. Email communication
5. Data storage
6. Cookies or analytics
7. Third-party services
8. Data rights and contact route
9. Policy updates

### Terms sections — eleven

1. Website purpose
2. Product information
3. Quotation requests
4. No public pricing
5. No contract formed by inquiry submission
6. Accuracy and availability disclaimer
7. Intellectual property
8. External links
9. Limitation of liability — awaiting legal wording
10. Governing law — awaiting legal decision
11. Contact

### Legal-copy policy

Each section uses restrained template copy explaining what must be confirmed. Do not present model-generated legal obligations as final terms.

The templates must visibly state that final language requires:

- client confirmation
- actual system and provider review
- jurisdiction confirmation
- qualified legal review
- explicit publication approval

The public implementation is a design and content template, not legal advice and not launch-ready legal copy.

## 11. Component boundaries

Recommended structure:

```text
apps/web/src/features/about/
  about-page.tsx
  buyer-expectations.tsx
  supported-buyers.tsx
  family-index.tsx

apps/web/src/features/procurement-support/
  procurement-support-page.tsx
  procurement-process.tsx
  requirement-types.tsx
  information-checklist.tsx

apps/web/src/features/contact-preview/
  contact-information-model.ts
  contact-information-panel.tsx
  contact-form-preview.tsx
  contact-field-preview.tsx
  contact-validation-preview.tsx
  contact-loading-preview.tsx
  contact-failure-preview.tsx
  contact-success-preview.tsx
  contact-page.tsx

apps/web/src/features/search-preview/
  search-preview-model.ts
  search-default-page.tsx
  search-result-preview.tsx
  search-results-preview.tsx
  search-loading-preview.tsx
  search-no-results-preview.tsx
  search-error-preview.tsx

apps/web/src/features/legal-pages/
  legal-document-model.ts
  legal-page.tsx
  legal-section-navigation.tsx
  legal-section.tsx
```

Exact filenames may change in the implementation plan to fit repository conventions, but responsibilities stay isolated:

- page composition does not own mutable state
- contact records do not own form rendering
- search previews consume the catalogue registry rather than duplicating products
- legal document records do not contain final legal advice
- routing chooses the normal truthful public composition

## 12. Routing

Add explicit route kinds:

- `about`
- `procurement-support`
- `contact-static`
- `search-default`
- `privacy-template`
- `terms-template`

Remove these six paths from generic placeholder dispatch.

Do not expose preview routes such as:

- `/search/results`
- `/contact/success`
- `/contact/error`

Unknown product paths retain strict not-found behavior. Other unsupported public paths retain the existing placeholder or not-found policy defined by the route resolver.

## 13. Global navigation boundary

F3D references the approved navigation and search system but does not activate it.

Deferred to F4:

- Products mega-menu
- mobile menu
- menu accordion
- search overlay
- Escape-to-close behavior
- focus trapping and restoration
- live inquiry count

The existing shared header remains in use. F3D route pages must not duplicate a second header or footer inside their feature components.

## 14. Responsive design

### Desktop — 1440 px

- About and Procurement Support use editorial two-column hero structures.
- Numbered systems use balanced grids and readable text measures.
- Contact uses a narrow status panel plus wider form region.
- Search default uses a wide, restrained discovery panel.
- Legal pages use a contents column and reading column.
- Layout uses grid and normal flow, not absolute Figma coordinates.

### Tablet — 768 px

- Hero media moves below or beside copy only while readable.
- Three-column process grids collapse before cards become cramped.
- Contact status panel and form become a single flow.
- Legal contents navigation moves above legal sections.
- No fixed width exceeds the container.

### Mobile — 390 px

- All editorial sections become one column.
- Numbered cards become compact vertical rows.
- Family index links remain full-width and easy to target.
- Contact fields and actions span the available content width.
- Search family shortcuts stack or use a safe two-column grid.
- Legal navigation becomes a wrapped list above content.
- Legal headings and long labels wrap without clipping.
- No horizontal overflow.
- Footer remains reachable.

## 15. Accessibility

- `PublicShell` remains the only `<main>` owner.
- Each public route contains exactly one `<h1>`.
- Breadcrumbs use `<nav aria-label="Breadcrumb">`.
- Editorial numbered groups use ordered or semantic list structures.
- Family shortcuts and family index rows are real links.
- Contact fields use native labels.
- Read-only and disabled controls use native semantics.
- Validation previews connect errors with `aria-describedby`.
- Search default does not claim a live result count.
- Activated search in F4 must later announce result count and errors.
- Legal section navigation uses real fragment links and stable section IDs.
- Decorative media is hidden from assistive technology.
- Visible focus remains present.
- Reduced-motion preferences are respected.

## 16. Defensive rendering

- Missing family records fail the shared catalogue registry validation.
- Search preview records must resolve to known products or fail preview construction.
- Missing optional product details are omitted rather than invented.
- Unconfirmed contact details render status text, never broken links.
- Missing legal section IDs fail legal-document validation.
- Duplicate legal section IDs or numbers fail validation.
- Empty legal sections are rejected.
- No contact success reference or delivery claim renders without supplied result data.
- Unknown route depth retains existing route-resolver behavior.

## 17. Styling

- Reuse Lora and Inter.
- Reuse Rosa red, near-black, paper, warm-white, mist, steel, border and danger tokens.
- Editorial items use restrained borders, rules and spacing rather than generic card walls.
- Contact and legal pages remain precise and document-led.
- Search is quiet and functional-looking without pretending interaction exists.
- Avoid gradients, glassmorphism, decorative shadows, oversized rounding, fake badges and dashboard styling.
- Translate Figma coordinates into responsive grid and flow layouts.

## 18. Test strategy

### Model and registry tests

- About contains five expectations and four supported buyer groups.
- Family index contains all five registry families in source order.
- Procurement Support contains six steps, four requirement types and six checklist items.
- Contact status model contains no realistic placeholder address, telephone, email or WhatsApp value.
- Search preview products resolve from the F3B registry.
- Privacy contains nine unique sections.
- Terms contains eleven unique sections.
- Legal section IDs and numbers are unique.

### Component and route tests

- All six routes resolve to explicit F3D kinds rather than placeholders.
- Normal `/search` renders default discovery only.
- Normal `/search` contains no result count, product result or error state.
- Search preview results use real product-detail links and disabled inquiry controls.
- Normal `/contact` contains no active submit handler.
- Contact status rows contain no `mailto:`, `tel:` or WhatsApp link before confirmation.
- Contact success preview does not invent a reference or delivery claim.
- Legal pages show unresolved updated-date status and legal-review warnings.
- Public route resolver never mounts contact or search preview states.

### Claim and content-policy checks

Reject public copy that asserts:

- factory or manufacturing ownership
- certifications or regulatory approvals
- export markets or years of experience
- existing hospital customers
- guaranteed response times
- confirmed address, telephone, email, WhatsApp or working hours without supplied data
- legal jurisdiction, governing law, processors, analytics vendors or retention periods
- successful message or email delivery

Allow restrained audience, catalogue, process and quotation descriptions supported by the approved design.

### Browser checks

At 1440, 768 and 390 px:

- all six routes return successfully
- exactly one `<main>` and one `<h1>` per route
- About exposes four buyer groups and five family links
- Procurement Support exposes six process steps
- Contact uses status text and disabled/read-only controls
- Search exposes five family shortcuts and no normal-route results
- Privacy exposes nine sections
- Terms exposes eleven sections
- legal anchor navigation targets existing IDs
- no horizontal overflow
- footer reachable
- visible keyboard focus on active links

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
node --test apps/web/src/test/f3c-styles.static.test.mjs
node --test apps/web/src/test/f3c-policy.static.test.mjs
pnpm test:e2e
```

F3A, F3B and F3C regressions must be corrected before F3D is merged or integrated.

## 19. Completion criteria

F3D source implementation is ready for runtime verification when:

- all six routes use explicit F3D compositions
- About and Procurement Support follow the approved editorial structures
- Contact exposes only confirmed business name plus explicit awaiting-confirmation statuses
- Contact form and state previews remain noninteractive and isolated
- Search defaults to family discovery and does not mount results
- Search previews resolve products from F3B
- Privacy contains nine template sections
- Terms contains eleven template sections
- legal copy is visibly pending client and qualified legal review
- no fake contact, search, submission, reference, email or legal claim exists
- no OpenAPI or backend files change
- responsive, accessibility and policy tests are prepared
- completion documentation distinguishes source review from actual runtime verification

## 20. Deferred work

F4 activates:

- global navigation interactions
- mobile menu
- search overlay and local catalogue search
- result announcements
- add-to-inquiry from search
- contact editing, validation and mocked submission states

F5 and later gates activate:

- live catalogue search
- contact API submission
- backend persistence
- transactional email
- confirmed contact records
- approved legal content
- final map/location integration

## 21. Out of scope

- Backend contact endpoint design or implementation
- OpenAPI changes
- Inquiry behavior activation
- Public PDF deployment
- Real contact data
- Real social links
- Map provider integration
- Final privacy policy
- Final terms of use
- Arabic copy or RTL activation
- Admin composition or behavior
