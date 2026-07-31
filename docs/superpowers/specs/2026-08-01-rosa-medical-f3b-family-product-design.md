# Rosa Medical F3B — Family Listing and Product Detail Design

**Date:** 2026-08-01  
**Owner:** Ahmad and Ahmad's frontend AI  
**Design branch:** `frontend/f3b-family-product-design`  
**Implementation base:** `frontend/f3a-home-products`  
**Approved Figma file:** `https://www.figma.com/design/L7LKGItaD2o6tZzHuw1GUQ`

## 1. Purpose

F3B extends the static public catalogue system established in F3A. It replaces the structural placeholders for all five instrument-family routes and for catalogue-backed product-detail routes with complete, responsive, Figma-led compositions.

F3B remains a composition milestone. It establishes route resolution, catalogue-derived presentation data, page templates, responsive structures, disabled/read-only control states, loading/no-results components, and not-found behavior. It does not add live search, filtering, sorting, quantity mutation, inquiry state, form submission, API calls, or persistence. Those behaviors belong to F4 and later integration phases.

F3B must complete the family and product-detail layer for all five approved families rather than implementing only the Knives example shown in the category-template Figma frame.

## 2. Locked product and brand rules

All earlier Rosa decisions remain mandatory:

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

F3B is governed by these approved Figma frames:

### Category template

- Desktop: node `12:176`, 1440 × 3300
- Mobile: node `12:286`, 390 × 4100
- Mobile filter-sheet state: node `12:336`, 350 × 720

### Product detail

- Desktop: node `14:3`, 1440 × 3500
- Mobile: node `14:104`, 390 × 4050

The category desktop frame establishes the family hero, search/sort shell, filter sidebar, result grid, loading/no-results examples, and support CTA. The mobile frame establishes the simplified family intro, hero media, catalogue action, search shell, filter trigger, one-column result cards, and omission of nonessential desktop-only explanatory states from the main flow.

The product-detail desktop frame establishes the media gallery, procurement information panel, control fields, specification table, procurement note, related products, and final inquiry CTA. The mobile frame establishes reordered media-first flow, compact thumbnails, stacked controls, simplified specifications, two related products, and a fixed bottom inquiry action.

## 4. Route scope

### Family routes

F3B upgrades exactly these routes:

- `/products/knives`
- `/products/scissors`
- `/products/punches`
- `/products/chisels`
- `/products/cutters`

All five routes render one shared `FamilyListingPage` template driven by validated family presentation data.

### Product routes

F3B upgrades catalogue-backed routes with the pattern:

- `/products/{familySlug}/{productSlug}`

Every product route must resolve through the same validated product registry used by the family page. A product whose stored `familySlug` does not match the URL family segment is treated as not found. Unknown family slugs, unknown product slugs, malformed path depths, and mismatched combinations must not fall back to a generic placeholder.

### Existing routes

- `/` and `/products` retain their F3A implementations.
- All unrelated public and admin routes retain their current compositions.
- The existing public shell remains the sole owner of the `<main id="main-content">` landmark.

## 5. Catalogue-derived data policy

The supplied family catalogues are the source for product names, product codes, stated sizes, directions, variants, and catalogue references used in F3B.

Catalogue files:

- Knives catalogue
- Scissors catalogue
- Punches catalogue
- Chisels catalogue
- Cutters catalogue

Implementation must preserve catalogue terminology rather than silently renaming instruments. Product records may normalize whitespace, punctuation, slug format, and structured option fields, but must not rewrite the commercial identity of an instrument.

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

Descriptions must remain factual and restrained. When the catalogue supplies only a name, code, or size, the frontend must not infer material, use case, compatibility, sterility, finish, regulatory status, or clinical performance.

F3B requires enough representative catalogue records to make all five family routes meaningful. Minimum fixture coverage is four product records per family. The Knives route should preserve the approved Figma examples where supported: Scalpel Handle No. 3, Bard Parker Handle, Amputation Knife, and Resection Knife. Other family records must be copied from their supplied catalogues.

The OpenAPI 0.1 schema and operation set remain unchanged in F3B. Fixture expansion is allowed only when records continue to satisfy existing generated contract types or clearly separated frontend presentation types.

## 6. Architecture and component boundaries

F3B extends the existing feature-first structure.

### Catalogue registry

A dedicated catalogue registry owns route-safe family and product resolution. It provides deterministic selectors such as:

- `getFamilyListingModel(familySlug)`
- `getProductDetailModel(familySlug, productSlug)`
- `getRelatedProducts(productId, limit)`
- `isKnownFamilySlug(value)`

Page components do not search raw fixture arrays independently and do not construct arbitrary product routes.

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

### Existing F3A reuse

F3B reuses and extends, rather than duplicates:

- `ProductMediaPlaceholder`
- `ProductPreviewCard`
- `SectionHeading`
- `ProcurementPanel`
- Family/product route helpers
- Existing containers, sections, buttons, and token system

F3B-specific card variants may add a subordinate inquiry affordance visually, but no nested interactive control may be placed inside a linked product card.

## 7. Family listing design

### 7.1 Family introduction

Desktop uses an editorial split inside a warm panel:

- Breadcrumb above the panel
- Family sequence label such as `INSTRUMENT FAMILY 01`
- Family title as the route’s sole `<h1>`
- Restrained family introduction
- Displayed product-count summary derived from the registered family products
- Catalogue pathway
- Neutral hero media on the right

Mobile stacks the same content in this order:

1. Breadcrumb
2. Family label
3. `<h1>`
4. Introduction
5. Neutral media
6. Catalogue pathway

The number shown is the number of F3B registered products for that family, not a fabricated total catalogue count. The UI must not display the Figma example’s `24 products` unless 24 validated records actually exist.

### 7.2 Search, sort, and filter preview

F3B uses **Approach A: static but interaction-honest**.

The desktop search/sort shell visually matches the Figma hierarchy but is not presented as a functioning search form:

- Search field is read-only and excluded from form submission.
- Sort field is rendered as a read-only presentation control.
- Filter values are visible in the desktop sidebar.
- A short helper communicates that interactive catalogue controls activate in the next behavior phase.

The mobile route shows:

- Read-only search field
- Disabled `Filters (0)` control
- Result count

The mobile filter-sheet component is implemented as a standalone visual state for testing and future F4 activation. It is not deceptively opened by a dead trigger in F3B.

Disabled/read-only controls must retain accessible labels and use `aria-disabled`, `disabled`, or `readOnly` as appropriate. They must not invoke navigation, mutate URL state, or change displayed products.

### 7.3 Product results

Desktop uses a filter sidebar plus a three-column product grid at 1440 px. Tablet collapses to two product columns with a compact filter preview. Mobile uses one column.

Product cards show only procurement-relevant information:

- Family label
- Product name
- Product code
- Primary size/option summary
- `View details` route
- Visually subordinate disabled `Add to inquiry` affordance in F3B

The full card must not be both a link and contain another button. The card uses separate sibling affordances or a non-nested layout that preserves valid semantics.

### 7.4 Loading and no-results components

F3B implements reusable visual states matching the desktop Figma examples:

- Loading state with neutral media/text skeletons
- No-results state with clear title, explanatory text, and disabled/read-only clear-filter treatment in F3B

These states are components and test targets. The default family routes render the populated state.

### 7.5 Family support CTA

The family route ends with the dark support panel:

- “Need help identifying an instrument?”
- Procurement-safe explanatory copy
- Link to `/contact` or `/inquiry` as defined in the implementation plan

This CTA is a real navigation path and may remain active because the destination route already exists.

## 8. Product-detail design

### 8.1 Breadcrumb and media

Desktop displays:

- Breadcrumb path: Products → Family → Product
- Four neutral thumbnail states
- One large neutral product media panel
- Nonfunctional zoom label presented as descriptive text, not a clickable control

Mobile displays the large media first, followed by a horizontal thumbnail row.

The gallery is static in F3B. One thumbnail is marked selected using `aria-current="true"` or an equivalent noninteractive selected-state pattern. Other thumbnails are visual samples and are not buttons until F4.

### 8.2 Procurement summary

The summary includes:

- Family label
- Product name as the route’s sole `<h1>`
- Product code
- Restrained description
- Default size
- Default variant
- Quantity value `1`
- Catalogue reference
- No-public-price / quotation-required note

Size, variant, and quantity controls are static/read-only in F3B. They must be labelled and visibly structured, but they do not update state.

The desktop `Add to inquiry` action and mobile sticky action are disabled with explanatory accessible text. The Figma added-success feedback panel is implemented as a standalone visual state for testing and F4 reuse, not displayed as though a product has actually been added.

### 8.3 Specification table

Specifications use a semantic `<table>` on desktop and may retain table semantics on mobile with stacked visual rows.

Rows appear only when supported by the catalogue-derived product model:

- Product code
- Instrument family
- Available size
- Compatible options or listed variant
- Direction / shape
- Catalogue reference

A missing value removes its row. The frontend does not fill missing fields with assumptions.

### 8.4 Procurement note

Desktop includes the approved warm procurement-note panel explaining how a buyer can request another size, finish, packing configuration, or unlisted requirement. The note action is disabled/read-only in F3B because note collection belongs to F4.

The mobile default route may omit this secondary panel where the approved mobile frame simplifies the flow.

### 8.5 Related products

Related products are deterministic products from the same family excluding the current item.

- Desktop: up to three cards
- Tablet: up to two or three depending on available width
- Mobile: two cards

Related product links are active and route to their product-detail pages. Related cards reuse the F3A/F3B product-card system.

### 8.6 Final inquiry CTA

Desktop ends with the dark “Continue building your product list” panel and a real link to `/inquiry`.

Mobile uses the approved fixed bottom bar:

- Left: `1 item selected` is not allowed in F3B because no item has been selected.
- F3B label: `Inquiry controls activate next phase` or another concise truthful status.
- Right: disabled `Add to inquiry` action.

F4 may replace this status with actual selected-item state.

## 9. Responsive behavior

### Desktop — 1440 px

- Family hero uses the approved editorial split.
- Family results use a 250 px filter column and three product columns.
- Product detail uses thumbnail rail, large media, and procurement summary in a wide split.
- Specification table spans the content width.
- Related products use three columns.

### Tablet — 768 px

- Family hero remains two-part only when each region stays readable; otherwise it stacks before mobile.
- Filter content becomes a compact summary above a two-column grid.
- Product detail stacks media above the summary or uses a balanced two-column split only when controls remain at least 44 px high.
- No horizontal overflow is permitted.

### Mobile — 390 px

- Family and product flows follow the approved mobile order.
- Product grids use one column.
- Only essential family products are shown in the first static composition when fixture volume is high; the registered model still preserves the complete family dataset for later interactive pagination.
- Product detail uses a fixed bottom action with sufficient page-bottom padding.
- Focus order follows visual order.

## 10. Accessibility and semantics

F3B requires:

- Exactly one public-shell `<main>` and one route-level `<h1>`.
- Breadcrumbs inside `<nav aria-label="Breadcrumb">`.
- Family/product collections inside semantic lists.
- Product cards with valid, non-nested interaction structure.
- All read-only and disabled controls labelled programmatically.
- No dead clickable controls.
- Semantic specification table with caption or associated heading.
- Visible keyboard focus on all active links.
- Disabled controls distinguishable without relying only on opacity.
- Minimum practical 44 px active targets.
- Reduced-motion handling inherited and extended where needed.
- Mobile sticky bar must not obscure content or browser focus targets.
- Zero horizontal overflow at 1440, 768, and 390 px.

## 11. Error and not-found handling

The route registry returns a discriminated result:

- Family listing found
- Product detail found
- Not found

Not-found conditions include:

- Unknown family slug
- Unknown product slug
- Product/family mismatch
- Extra unsupported route segments
- Registry data that references an unknown family

The Next.js route entry uses `notFound()` for invalid catalogue paths. It does not render a placeholder that could imply the product exists.

Selector/registry construction should fail clearly during tests when duplicate IDs, duplicate slugs within a family, invalid family references, missing names, or missing product codes are introduced.

## 12. Testing and review strategy

F3B adds test coverage for:

### Registry and source integrity

- All five family slugs resolve.
- Every family has at least four catalogue-derived products.
- Product IDs and family-local slugs are unique.
- Product code and family assignment are present.
- Known Figma example routes resolve.
- Unknown and mismatched routes return not found.

### Component and composition semantics

- Family route has one `<h1>`.
- Product route has one `<h1>`.
- Read-only controls do not render inside functioning forms.
- Disabled inquiry controls cannot be activated.
- Specification rows disappear when data is absent.
- Related products exclude the current product.
- No price, stock, checkout, rating, certification, or unsupported claim language appears.

### Browser checks

At desktop, tablet, and mobile widths:

- All five family routes render.
- Representative product-detail routes render.
- Invalid product combinations return 404.
- No horizontal overflow.
- Active links expose visible focus.
- Sticky mobile inquiry bar does not cover final content.
- Family/product breadcrumbs are present.

### Figma fidelity review

Compare implementation screenshots against nodes `12:176`, `12:286`, `14:3`, and `14:104` for:

- Section order
- Container alignment
- Editorial hierarchy
- Family hero proportions
- Filter/product-grid relationship
- Media/detail relationship
- Specification rhythm
- Related-product card proportions
- Dark CTA treatment
- Mobile simplification and sticky-bar spacing

Runtime verification postponed from F3A remains a blocker before integration or merge. F3B source work may continue, but no lint, typecheck, build, unit-test, or Playwright result may be described as passing without fresh command evidence.

## 13. Explicitly deferred to F4 or later

F3B does not implement:

- Search query state
- Sorting
- Filter state or filter-sheet opening
- Pagination or load-more behavior
- Thumbnail switching or zoom
- Size/variant selection
- Quantity mutation
- Inquiry basket state
- Add/remove inquiry actions
- Added-success feedback tied to state
- Procurement-note entry
- URL query synchronization
- Live API fetching
- Loading caused by actual requests
- Contact or quotation submission
- Analytics
- Arabic activation

F4 activates the approved controls using typed mocked behavior. F5 and later replace mocks with live backend integration.

## 14. Acceptance criteria

F3B design is satisfied only when:

- All five family routes use one reusable, family-specific catalogue template.
- Catalogue-backed product routes use one reusable detail template.
- Names, codes, sizes, variants, and references are derived from supplied catalogues or omitted.
- Unknown and mismatched catalogue paths produce not-found behavior.
- Controls look intentional but are truthfully read-only or disabled.
- No dead control pretends to search, filter, sort, select, zoom, or add products.
- Family pages include hero, discovery shell, filter preview, product grid, reusable result states, and support CTA.
- Product pages include gallery, procurement summary, specifications, related products, and responsive inquiry treatment.
- The public shell retains sole `<main>` ownership.
- Desktop, tablet, and mobile structures follow approved Figma hierarchy.
- F3A routes remain intact.
- OpenAPI 0.1 remains unchanged.
- Remaining work is clearly handed to F4 behavior activation.
