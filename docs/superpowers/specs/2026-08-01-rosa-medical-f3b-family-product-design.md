# Rosa Medical F3B — Family Listing and Product Detail Design

**Date:** 2026-08-01  
**Owner:** Ahmad and Ahmad's frontend AI  
**Design branch:** `frontend/f3b-family-product-design`  
**Implementation base:** `frontend/f3a-home-products`  
**Approved Figma file:** `https://www.figma.com/design/L7LKGItaD2o6tZzHuw1GUQ`

## 1. Purpose

F3B extends the static public catalogue system established in F3A. It replaces the structural placeholders for all five instrument-family routes and for catalogue-backed product-detail routes with complete, responsive, Figma-led compositions.

F3B remains a composition milestone. It establishes route resolution, catalogue-derived presentation data, page templates, responsive structures, disabled/read-only control states, loading/no-results components, and not-found behavior. It does not add live search, filtering, sorting, quantity mutation, inquiry state, form submission, API calls, or persistence. Those behaviors belong to F4 and later integration phases.

F3B completes all five approved family routes rather than implementing only the Knives example shown in Figma.

## 2. Locked product and brand rules

- The public logo remains **ROSA** only.
- Rosa is positioned as a medical instruments supplier and procurement partner.
- Approved families are Knives, Scissors, Punches, Chisels, and Cutters.
- The public experience is quotation-led, not ecommerce.
- Do not show prices, stock, inventory, checkout, payments, discounts, ratings, shipping, or orders.
- Do not publish unverified manufacturing, factory, certification, regulatory, ownership, award, export, legal, or clinical claims.
- Do not invent testimonials, customer logos, experience statistics, market reach, or performance claims.
- Real product imagery is not introduced in F3B; neutral replaceable media remains in use.
- Rosa red `#E00815`, near-black `#191917`, white, warm off-white, and restrained steel greys remain the visual palette.
- Lora remains the editorial face; Inter remains the operational face.
- English is rendered first, but presentation models and logical CSS remain future RTL-compatible.

## 3. Approved visual references

### Category template

- Desktop: node `12:176`, 1440 × 3300
- Mobile: node `12:286`, 390 × 4100
- Mobile filter-sheet state: node `12:336`, 350 × 720

### Product detail

- Desktop: node `14:3`, 1440 × 3500
- Mobile: node `14:104`, 390 × 4050

The category frames establish the family hero, catalogue path, search/sort shell, filter preview, result grid, loading/no-results states, and support CTA. The product-detail frames establish the gallery, procurement summary, option fields, specification table, procurement note, related products, final CTA, and mobile sticky action.

## 4. Route scope

### Family routes

F3B upgrades:

- `/products/knives`
- `/products/scissors`
- `/products/punches`
- `/products/chisels`
- `/products/cutters`

All five render one shared `FamilyListingPage` template driven by validated family presentation data.

### Product routes

F3B upgrades catalogue-backed routes with the pattern:

- `/products/{familySlug}/{productSlug}`

Every product route resolves through the same validated registry used by family pages. A product whose stored family does not match the URL family segment is treated as not found. Unknown family slugs, unknown product slugs, malformed depths, extra segments, and mismatched combinations must never fall back to a generic placeholder.

### Existing routes

- `/` and `/products` retain their F3A implementations.
- Unrelated public and admin routes retain their current compositions.
- The existing public shell remains the sole owner of `<main id="main-content">`.

## 5. Catalogue-derived data policy

The supplied Knives, Scissors, Punches, Chisels, and Cutters catalogues are the source for product names, codes, stated sizes, directions, variants, and catalogue references used in F3B.

Implementation must preserve catalogue terminology. Records may normalize whitespace, punctuation, slug format, and structured option fields, but must not rewrite an instrument's commercial identity.

Each product presentation record contains:

- Stable frontend fixture ID
- Family slug
- Product slug
- English product name
- Product code
- Primary size or option summary when explicitly supplied
- Structured available sizes
- Structured direction/shape options when explicitly supplied
- Structured variant/finish options when explicitly supplied
- Catalogue family and page reference when known
- Neutral media label
- Optional concise procurement-safe description

When a catalogue supplies only a name, code, or size, the frontend must not infer material, use case, compatibility, sterility, finish, regulatory status, or clinical performance. If a PDF page or OCR result is ambiguous, the record is omitted until manually verified; uncertainty is not silently repaired with model knowledge.

F3B registers four to six representative products per family. Every registered product appears on its family page and has a reachable product-detail route; no registered product is hidden behind nonexistent pagination. The Knives set should preserve the approved examples where the catalogue supports them: Scalpel Handle No. 3, Bard Parker Handle, Amputation Knife, and Resection Knife. Other records must be copied from their supplied catalogues.

The displayed family result count is the number of registered F3B records for that family. It must not display the Figma example's `24 products` unless 24 verified records actually exist.

OpenAPI 0.1 remains unchanged. Fixture expansion is allowed only when records continue to satisfy existing generated contract types or clearly separated frontend presentation types.

## 6. Architecture and boundaries

A dedicated catalogue registry owns route-safe resolution and deterministic selection. It provides interfaces equivalent to:

- `getFamilyListingModel(familySlug)`
- `getProductDetailModel(familySlug, productSlug)`
- `getRelatedProducts(productId, limit)`
- `isKnownFamilySlug(value)`

Page components do not search raw fixture arrays independently and do not construct arbitrary product paths.

### Shared family-listing components

- `FamilyHero`
- `FamilyDiscoveryShell`
- `FamilyFilterPreview`
- `FamilyProductGrid`
- `FamilyLoadingState`
- `FamilyNoResultsState`
- `FamilySupportPanel`

### Shared product-detail components

- `ProductBreadcrumbs`
- `ProductGallery`
- `ProductProcurementSummary`
- `StaticOptionField`
- `StaticQuantityField`
- `ProductSpecificationTable`
- `ProductProcurementNote`
- `RelatedProductGrid`
- `MobileInquiryBar`

F3B reuses `ProductMediaPlaceholder`, `ProductPreviewCard`, `SectionHeading`, `ProcurementPanel`, route helpers, containers, sections, buttons, and existing tokens. It must not duplicate the F3A visual system.

Product-card links and disabled inquiry affordances are siblings. No linked card may contain a nested button or link.

## 7. Family listing design

### 7.1 Family introduction

Desktop uses an editorial split inside a warm panel:

- Breadcrumb
- Sequence label such as `INSTRUMENT FAMILY 01`
- Family title as the route's sole `<h1>`
- Restrained introduction
- Registered-product count
- Active catalogue navigation to `/catalogues`
- Neutral hero media

The catalogue action must say `View family catalogue` or `Open catalogues`, not `Download`, because direct public PDF delivery belongs to F3C.

Mobile order:

1. Breadcrumb
2. Family label
3. `<h1>`
4. Introduction
5. Neutral media
6. Catalogue navigation

### 7.2 Search, sort, and filter preview

F3B uses **Approach A: static but interaction-honest**.

Desktop:

- Search field is read-only and outside a functioning form.
- Sort field is a read-only presentation control.
- Filter values are visible in the sidebar.
- Helper text states that interactive catalogue controls activate in the next behavior phase.

Mobile:

- Read-only search field
- Disabled `Filters (0)` control
- Registered result count

The mobile filter-sheet component is implemented as a unit-rendered visual state for tests and F4 reuse. It is not exposed through a dead public trigger in F3B.

Disabled/read-only controls retain accessible labels and use `disabled`, `readOnly`, or `aria-disabled` correctly. They do not navigate, mutate URL state, submit forms, or change results.

### 7.3 Product results

- Desktop: 250 px filter column plus three product columns
- Tablet: compact filter preview plus two columns
- Mobile: one column

Every registered product is rendered.

Product cards show:

- Family label
- Product name
- Product code
- Primary size/option summary
- Active `View details` link
- Visually subordinate disabled `Add to inquiry` affordance

### 7.4 Loading and no-results components

F3B implements reusable visual states matching the approved desktop examples:

- Loading state with neutral media/text skeletons
- No-results state with title, explanation, and disabled clear-filter preview

They are component and test targets. Default family routes render populated results.

### 7.5 Family support CTA

Every family route ends with the dark `Need help identifying an instrument?` panel. Its active action is fixed to `/contact`, because this is identification/procurement support rather than an already-selected product inquiry.

## 8. Product-detail design

### 8.1 Breadcrumb and media

Desktop displays Products → Family → Product breadcrumbs, four neutral thumbnails, one large neutral media surface, and a descriptive `Zoom` label that is not clickable.

Mobile displays large media first and a horizontal thumbnail row.

The gallery is static. One thumbnail uses a noninteractive selected-state marker such as `aria-current="true"`; other thumbnails are visual samples, not buttons.

### 8.2 Procurement summary

The summary includes:

- Family label
- Product name as the route's sole `<h1>`
- Product code
- Restrained description
- Default size
- Default variant
- Quantity value `1`
- Catalogue reference
- No-public-price / quotation-required note

Size, variant, and quantity controls are labelled read-only fields. Desktop and mobile `Add to inquiry` actions are disabled with explanatory accessible text.

The Figma added-success feedback panel is implemented as a unit-rendered visual state for F4 reuse and tests. It is not displayed as though an item has been added.

### 8.3 Specification table

Specifications use a semantic `<table>` associated with the section heading. Rows appear only when supported by the catalogue-derived model:

- Product code
- Instrument family
- Available size
- Compatible options or listed variant
- Direction / shape
- Catalogue reference

Missing values remove their rows. The frontend does not substitute assumptions.

### 8.4 Procurement note

Desktop includes the approved warm note panel for another size, finish, packing configuration, or unlisted requirement. Its action is disabled in F3B because note capture belongs to F4. The approved mobile simplification may omit this secondary panel.

### 8.5 Related products

Related products are deterministic same-family records excluding the current item.

- Desktop: up to three
- Tablet: two or three according to width
- Mobile: two

Related links are active and route to real F3B detail pages.

### 8.6 Final inquiry treatment

Desktop ends with the dark `Continue building your product list` panel and an active link to `/inquiry`.

Mobile uses the approved fixed bottom structure with sufficient page-bottom padding. It must not claim `1 item selected`. F3B shows a truthful status such as `Inquiry controls activate next phase` and a disabled `Add to inquiry` action.

## 9. Responsive behavior

### Desktop — 1440 px

- Editorial family hero split
- Filter sidebar and three product columns
- Thumbnail rail, large media, and procurement summary split
- Full-width specification table
- Three related-product cards

### Tablet — 768 px

- Family hero remains split only while both sides remain readable; otherwise it stacks.
- Filter content becomes a compact summary above a two-column grid.
- Product media and summary stack when a split would compress controls below practical width.
- No horizontal overflow.

### Mobile — 390 px

- Approved mobile content order
- One-column family grid with every registered product
- Large media followed by thumbnails and stacked procurement information
- Two related products
- Fixed bottom action with page-bottom clearance
- Focus order follows visual order

## 10. Accessibility and semantics

F3B requires:

- Exactly one public-shell `<main>` and one route-level `<h1>`.
- Breadcrumbs inside `<nav aria-label="Breadcrumb">`.
- Family/product collections inside semantic lists.
- Valid non-nested interaction structure.
- Programmatic labels for all read-only and disabled controls.
- No dead clickable controls.
- Semantic specification table with caption or associated heading.
- Visible focus on active links.
- Disabled controls distinguished without relying only on opacity.
- Practical 44 px active targets.
- Reduced-motion handling.
- Sticky mobile bar that does not obscure content or focus targets.
- Zero horizontal overflow at 1440, 768, and 390 px.

## 11. Error and not-found handling

The registry returns a discriminated result: family found, product found, or not found.

Not-found conditions:

- Unknown family
- Unknown product
- Product/family mismatch
- Extra unsupported segments
- Registry product referencing an unknown family

Next.js uses `notFound()` for invalid catalogue paths. Registry tests fail clearly for duplicate IDs, duplicate family-local slugs, unknown family references, missing names, or missing product codes.

## 12. Testing and review strategy

### Registry integrity

- All five family slugs resolve.
- Every family has four to six catalogue-derived products.
- IDs are globally unique.
- Product slugs are unique within their family.
- Every product has a code and valid family.
- Known Figma example routes resolve.
- Unknown and mismatched routes return not found.

### Component and composition semantics

- Family and product routes each have one `<h1>`.
- Read-only controls are outside functioning forms.
- Disabled inquiry controls cannot activate.
- Specification rows disappear when data is absent.
- Related products exclude the current item.
- No price, stock, checkout, rating, certification, or unsupported claim language appears.

### Browser checks

At 1440, 768, and 390 px:

- All five family routes render.
- Representative detail routes from each family render.
- Invalid combinations return 404.
- No horizontal overflow.
- Active links expose visible focus.
- Sticky mobile bar does not cover final content.
- Breadcrumbs are present.

### Figma fidelity review

Compare against nodes `12:176`, `12:286`, `14:3`, and `14:104` for section order, container alignment, hierarchy, family-hero proportions, filter/grid relationship, media/detail relationship, specification rhythm, related-card proportions, dark CTA treatment, and mobile sticky spacing.

The postponed F3A runtime gate remains a blocker before integration or merge. No lint, typecheck, build, unit-test, or Playwright result may be described as passing without fresh command evidence.

## 13. Deferred to F4 or later

- Search query state
- Sorting
- Filter state or filter-sheet opening
- Pagination
- Thumbnail switching or zoom
- Size/variant selection
- Quantity mutation
- Inquiry basket state
- Add/remove inquiry actions
- State-driven success feedback
- Procurement-note entry
- URL query synchronization
- Live API fetching
- Request-driven loading
- Contact or quotation submission
- Analytics
- Arabic activation

F4 activates the approved controls with typed mocked behavior. F5 and later replace mocks with live backend integration.

## 14. Acceptance criteria

F3B is ready for implementation only when:

- All five family routes use one reusable family-specific template.
- Every registered product is visible and has a reusable detail route.
- Names, codes, sizes, variants, and references are catalogue-derived or omitted.
- Unknown and mismatched paths produce not-found behavior.
- Controls are truthfully read-only or disabled.
- No dead control pretends to search, filter, sort, select, zoom, or add products.
- Family pages include hero, discovery shell, filter preview, product grid, result-state components, and `/contact` support CTA.
- Product pages include gallery, procurement summary, specifications, related products, and responsive inquiry treatment.
- Catalogue actions navigate to `/catalogues` until F3C implements direct document delivery.
- The public shell retains sole `<main>` ownership.
- Desktop, tablet, and mobile structures follow approved Figma hierarchy.
- F3A routes remain intact.
- OpenAPI 0.1 remains unchanged.
- F4 owns interaction activation.
