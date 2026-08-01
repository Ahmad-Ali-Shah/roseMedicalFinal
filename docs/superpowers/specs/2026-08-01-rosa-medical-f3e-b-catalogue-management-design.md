# Rosa Medical F3E-B Source-Backed Catalogue Management Design

**Date:** 2026-08-01  
**Owner:** Ahmad and Ahmad's frontend AI  
**Status:** Approved design specification  
**Implementation mode:** Inline only

## 1. Goal

F3E-B replaces the F3E-A informational placeholders for Products, Families, Catalogues and Media with complete static admin compositions that are visually aligned with the approved Figma admin system while remaining strictly grounded in the existing frontend catalogue registries.

The milestone must look like a credible owner workspace without claiming that any record is authenticated, saved, published, uploaded, processed, translated, updated or connected to a backend.

## 2. Approved source-of-truth boundary

Normal F3E-B routes may use only:

- `CATALOGUE_PRODUCTS`
- `CATALOGUE_FAMILIES`
- `CATALOGUE_DOCUMENTS`
- existing public route helpers such as `familyHref()` and `productHref()`
- existing F3E-A admin shell and admin primitives

No second product, family, catalogue or media dataset may be created.

The current source supports:

- 20 product records
- 5 family records
- 5 catalogue-document records
- 4 products per family at the current registry state
- product identity, code, family, optional description, sizes, variants, directions, primary option, catalogue reference and media requirement label
- family sequence, name, introduction and catalogue label
- catalogue family, name, description, cover label, source classification, family link and optional public PDF path

The current source does not support:

- publication state
- draft or review state
- visibility state
- updated timestamps
- editor save timestamps
- Arabic content or completion percentages
- featured-product assignment
- media filenames, dimensions, sizes, alt text or usage history
- upload state, processing state or replacement state
- catalogue PDF filenames or file sizes
- backend validation results

## 3. Figma evidence and required truthfulness overrides

Primary Figma references:

- Products list desktop: `46:161`
- Family editor desktop: `46:301`
- Products mobile: `46:364`
- Product editor desktop: `47:3`
- Public product preview: `47:136`
- Product validation states: `47:163`
- Product review mobile: `47:194`
- Catalogues desktop: `48:3`
- Media library desktop: `48:110`
- Catalogues mobile: `48:208`

Figma controls visual hierarchy, density, spacing, typography, table-to-card adaptation, warning placement and editorial tone. It does not override repository truth.

The following Figma examples must not appear as factual normal-route data unless supported later by a live source:

- `126 products`
- invented records such as `Duplicate Code Record`
- `Published`, `Needs review`, `Ready`, `Draft`, `Blocking error`
- `Visible`, `Hidden`, `Featured: Yes/No`
- `Today`, `Yesterday`, `2 days ago`, saved times or revision comparisons
- Arabic-complete or Arabic-in-progress claims
- invented filenames such as `knives-catalogue.pdf`
- invented file sizes, image dimensions or upload results
- processing, failed, pending or replacement states
- invented media assets
- secure-session claims

Normal routes replace those values with source-backed fields or explicit unresolved statuses.

## 4. Route inventory

### 4.1 Products

- `/admin/products`
- `/admin/products/[familySlug]/[productSlug]`

All 20 known product combinations resolve. Unknown family slugs, unknown product slugs and mismatched family/product pairs use strict not-found behavior.

### 4.2 Families

- `/admin/families`
- `/admin/families/[familySlug]`

All five known family slugs resolve. Unknown family slugs use strict not-found behavior.

### 4.3 Catalogues

- `/admin/catalogues`
- `/admin/catalogues/[familySlug]`

All five known catalogue family slugs resolve. Unknown family slugs use strict not-found behavior.

### 4.4 Media

- `/admin/media`

Media has one honest normal route because no managed media registry exists.

## 5. Shared route and selector model

F3E-B introduces a single admin-management route resolver that returns one of:

```ts
export type AdminManagementRouteResult =
  | { kind: "products" }
  | { kind: "product"; family: CatalogueFamilyRecord; product: CatalogueProductRecord }
  | { kind: "families" }
  | { kind: "family"; family: CatalogueFamilyRecord; products: readonly CatalogueProductRecord[] }
  | { kind: "catalogues" }
  | { kind: "catalogue"; family: CatalogueFamilyRecord; document: CatalogueDocument }
  | { kind: "media" }
  | { kind: "not-found" };
```

Selectors derive all list and editor models from the three existing registries. They must not copy source records into a parallel constant.

Required selectors:

- `getAdminProductRows()`
- `getAdminProductEditor(familySlug, productSlug)`
- `getAdminFamilyRows()`
- `getAdminFamilyEditor(familySlug)`
- `getAdminCatalogueRows()`
- `getAdminCatalogueEditor(familySlug)`
- `getAdminMediaRequirements()`
- `resolveAdminManagementRoute(segments)`

## 6. Products list

`/admin/products` renders one `AdminPageHeader` with:

- eyebrow: `Products`
- heading: `Manage the instrument catalogue.`
- description stating that the page reflects the current source registry and is not a live CMS

The page renders:

1. A static workspace warning
2. A toolbar containing:
   - read-only search preview
   - disabled family filter
   - disabled Add product action
3. A source-backed count equal to `CATALOGUE_PRODUCTS.length`
4. A semantic desktop table and labelled mobile record list
5. Disabled pagination preview
6. A family summary section derived from the registry

### 6.1 Product row fields

Each row shows only:

- product name
- product code
- family name
- documented option summary derived from sizes, variants, directions and primary option
- catalogue family and optional page/section reference
- media requirement label
- `Source record` status badge
- real public product-detail link
- real admin editor link

### 6.2 Prohibited row fields

Normal rows must not show:

- publication state
- draft/review/readiness state
- visibility
- featured state
- update date
- Arabic completeness
- fake thumbnail or filename
- upload state

### 6.3 Product list controls

- Search input is read-only.
- Family filter is disabled.
- Add product is disabled.
- No sort, bulk selection or destructive action is mounted.
- Pagination controls are disabled.
- No native form is present.

## 7. Product editor

Each product editor route is a complete read-only composition using the selected registry record.

### 7.1 Header

The page header includes:

- eyebrow: `Product source record`
- product name as the only `h1`
- `Source record` status
- real public product-detail link
- real public family link

It does not show save time, draft difference, publication status or review status.

### 7.2 Identity section

Read-only fields:

- Product name — English
- Product name — Arabic: `Not supplied`
- Product code
- Instrument family
- Short description — English, or `Not documented in source`
- Short description — Arabic: `Not supplied`

### 7.3 Documented options section

Displays separate labelled groups for:

- sizes
- variants
- directions or shapes
- primary option

Empty arrays render `Not documented in source`. Option rows are not reorderable or removable.

Disabled controls may show the future actions `Add option`, `Reorder` and `Remove`, but they must be visibly marked as unavailable and have no handlers.

### 7.4 Catalogue reference section

Shows:

- catalogue family
- page or section if supplied
- `Not supplied` if page/section is absent
- link to the matching admin catalogue route
- link to the public family route

No PDF filename or file size is inferred.

### 7.5 Media requirement section

Shows:

- the existing `mediaLabel`
- neutral media placeholder
- `No managed media file is registered`
- disabled `Upload media` and `Replace media` actions

The placeholder is not described as an uploaded image.

### 7.6 Public context section

Shows real links to:

- current public product detail
- current public family page

Copy states that these links show the current source-backed public composition, not an unpublished draft preview.

### 7.7 Source-completeness section

The checklist reports only source presence:

- English product name present
- product code present
- family present
- description present or not supplied
- documented options present or not supplied
- catalogue reference present
- Arabic content not supplied
- managed media not registered

The checklist must not label the record publishable, reviewed, complete, approved or blocked.

### 7.8 Editor actions

The following actions are disabled and non-submitting:

- Save draft
- Submit for review
- Publish
- Archive
- Delete
- Add option
- Reorder
- Remove
- Upload media
- Replace media

No native form, mutation handler, unsaved-changes warning, confirmation result or fake operation reference is mounted.

## 8. Families list

`/admin/families` renders five family cards from `CATALOGUE_FAMILIES`.

Each card includes:

- sequence
- family name
- existing introduction
- existing catalogue label
- product count derived from `CATALOGUE_PRODUCTS`
- real public family link
- real admin family-editor link

At the current registry state, every family count resolves to four. Tests compare the UI model to the registry rather than hard-coding four as a permanent product rule.

The page includes a disabled Add family action. It excludes publication, visibility, update, featured and media states.

## 9. Family editor

Each family editor displays:

- English family name
- Arabic family name: `Not supplied`
- English introduction
- Arabic introduction: `Not supplied`
- sequence
- catalogue label
- derived list of all products in the family
- derived product count
- public family link
- admin catalogue link
- hero media status: `No managed asset registered`
- catalogue PDF status: `Awaiting publication`

`Awaiting publication` means no public `pdfPath` exists. If a future source provides `pdfPath`, the composition may display `Public PDF path registered`; it still must not infer processing or publication history.

Disabled actions:

- Save draft
- Preview family changes
- Publish changes
- Select featured products
- Upload hero media
- Replace catalogue PDF

No featured assignments are fabricated.

## 10. Catalogues list

`/admin/catalogues` renders exactly five records from `CATALOGUE_DOCUMENTS`.

Each record shows:

- family name
- document name
- description
- cover label
- source classification: `Technical family catalogue`
- PDF availability:
  - `Public PDF path registered` when `pdfPath` exists
  - `Awaiting publication` when `pdfPath` is absent
- real public `/catalogues` link
- real public family link
- real admin catalogue-detail link

The page includes read-only search and disabled availability filtering.

Normal records do not show:

- filenames
- file sizes
- upload state
- processing state
- replacement state
- publication state
- dates

## 11. Catalogue detail

Each catalogue detail displays:

- family name
- document name
- description
- cover label
- source classification
- family link
- public catalogues link
- current PDF-path availability

The file-management panel states:

- `No public PDF path is registered` when `pdfPath` is absent
- `A public PDF path is registered` when `pdfPath` exists
- `No upload or replacement operation is active in this static composition`
- future safe replacement must retain the last verified public file until a replacement succeeds

Disabled actions:

- Upload catalogue
- Replace catalogue
- Remove catalogue
- Publish catalogue
- Begin safe replacement

No fake file input, selected filename, progress bar or completion message is mounted.

## 12. Media library

`/admin/media` renders an honest empty management state.

Primary message:

> No managed media assets are registered.

The page derives requirement summaries from existing records:

- 20 product media requirement labels
- 5 catalogue cover labels
- 5 family hero-media requirements
- protected ROSA identity note

The normal route may display requirement cards, but those cards represent requirements, not uploaded assets.

Each requirement card must be labelled `Requirement` or `Awaiting managed asset` and may show:

- related product/family/document
- source media label or cover label
- real route to the related admin editor

The media route must not fabricate:

- filename
- asset ID
- dimensions
- file size
- format
- alt text
- upload queue
- usage history
- duplicate result
- crop result

Search, type filter, completeness filter and Upload media controls remain disabled.

The ROSA logo is described as a protected identity asset outside ordinary media-management scope. The route does not create a fake logo asset record.

## 13. Preview-only states

The following components exist as isolated, unmounted previews with `data-preview-only="true"`:

### Products

- product-list loading
- no matching products
- product data-load failure
- duplicate-code validation
- missing-image validation
- long-title warning
- sensitive-claim warning
- archive/delete confirmation
- publish confirmation

### Catalogues

- upload selection
- processing
- replacement pending
- replacement failure
- safe-replacement confirmation

### Media

- upload selection
- unsupported-format warning
- possible-duplicate warning
- protected-asset warning
- image-in-use warning

Every preview must state that no validation, upload, replacement, save, archive, deletion or publication occurred.

Preview components have no dedicated public or admin route and are never mounted by the normal route resolver.

## 14. Architecture

```text
features/
├── admin-products/
├── admin-families/
├── admin-catalogues/
├── admin-media/
└── admin-management-routing/
```

Recommended internal boundaries:

- `admin-products`: selectors, list, editor, option list, completeness checklist and preview states
- `admin-families`: selectors, family grid, editor and product membership list
- `admin-catalogues`: selectors, list, detail, availability status and replacement previews
- `admin-media`: requirement selector, empty library, requirement cards and upload warnings
- `admin-management-routing`: route resolution only

F3E-A primitives remain shared. F3E-B should add a new primitive only when it is clearly reusable across at least two management areas.

## 15. Normal-route state boundary

Normal F3E-B routes mount only:

- source-backed list pages
- source-backed editor/detail pages
- disabled controls
- real public/admin navigation links
- explicit unresolved status copy

Normal routes never mount:

- `data-preview-only`
- loading state
- error state
- validation result
- confirmation dialog
- upload selection
- processing result
- mutation result
- success message

## 16. Responsive behavior

Target widths:

- desktop: 1440 px
- tablet: 768 px
- mobile: 390 px

Required behavior:

- desktop product and catalogue tables switch to labelled stacked records below the existing admin-table breakpoint
- editor two-column field pairs stack at tablet width
- option lists become definition-list records on narrow screens
- disabled actions become full-width on mobile
- family cards move from five columns to two columns, then one column
- media requirement cards move from three columns to two, then one
- long codes, labels and references use safe wrapping
- `min-width: 0` is applied to grid children
- no fixed content heights
- admin navigation remains fully visible with no dead toggle
- no page-level horizontal overflow
- focus-visible and reduced-motion behavior remain consistent with F3E-A

## 17. Accessibility requirements

- one route-level `<main>` remains owned by the F3E-A shell
- one `<h1>` per normal route
- tables use captions, `<thead>`, `<th scope="col">` and `<tbody>`
- mobile records use labelled definition lists
- read-only inputs have visible labels and `aria-readonly="true"`
- disabled selects and buttons are actually disabled
- status text is not communicated by colour alone
- empty states and warnings use appropriate heading hierarchy
- no native form exists on normal routes
- public and admin links have descriptive accessible names
- media placeholders are decorative or have truthful labels, never fake asset alt text

## 18. Verification requirements

### 18.1 Data and selector tests

- exactly 20 product list records derive from `CATALOGUE_PRODUCTS`
- exactly five family list records derive from `CATALOGUE_FAMILIES`
- exactly five catalogue list records derive from `CATALOGUE_DOCUMENTS`
- family counts equal the current registry distribution
- current distribution resolves to four products per family
- media requirement totals derive from product, family and document registries
- no second catalogue dataset exists

### 18.2 Route tests

- all 20 product editor routes resolve
- all five family editor routes resolve
- all five catalogue detail routes resolve
- unknown family slugs return not-found
- unknown product slugs return not-found
- mismatched family/product pairs return not-found
- `/admin/media` resolves to the honest empty library

### 18.3 Composition and policy tests

- normal routes contain no `data-preview-only`
- normal routes contain no native form
- all mutation and upload actions are disabled
- no invented filename, size, date, publication state, visibility state, save state or Arabic-completion claim appears
- media normal route contains no uploaded-asset card
- product rows use `Source record`
- catalogue availability derives only from `pdfPath`
- public links use existing route helpers
- no secure-session claim appears

### 18.4 Browser tests

At 1440 × 1000, 768 × 1024 and 390 × 844:

- `/admin/products`
- one representative product editor
- `/admin/families`
- one representative family editor
- `/admin/catalogues`
- one representative catalogue detail
- `/admin/media`

Each browser case checks:

- successful route response
- one main and one h1
- no horizontal page overflow
- reachable final content
- no enabled mutation/upload action
- no preview-only state
- visible admin navigation

## 19. Backend and contract boundary

F3E-B changes no backend implementation and no OpenAPI operation or schema.

It does not define future CRUD, upload, publishing or media-storage contracts. Those contracts require explicit frontend/backend negotiation before live integration.

## 20. Deferred scope

- product creation or editing
- family creation or editing
- catalogue upload or replacement
- media upload, selection or deletion
- search, filters, sorting or pagination behavior
- draft/review/publish workflow
- visibility and featured assignments
- Arabic editing
- validation execution
- archive and permanent deletion
- revision history
- local persistence
- API integration
- object storage
- processing jobs

## 21. Acceptance criteria

F3E-B is source-complete when:

- the four F3E-A catalogue-management placeholders are replaced by deliberate source-backed normal routes
- all supported detail routes resolve strictly
- every visible record comes from the existing registries
- all unsupported state is shown as unresolved rather than invented
- all future actions remain disabled
- isolated previews remain unmounted
- responsive and accessibility specifications exist
- backend and OpenAPI boundaries remain unchanged

Runtime verification is a separate evidence gate. No implementation may be described as passing lint, typecheck, tests, build or Playwright without fresh command output.
