# Canonical Catalogue Source of Truth and Lean Admin Design

Date: 2026-08-07
Status: Approved design, pending implementation plan
Base branch: `ahmadx67676767`
Working branch: `integration/canonical-catalogue-source-of-truth`
Live Supabase project: `rosa-medical` (`hzwabrbrgcxodkqilgdi`, `ap-south-1`)

## 1. Purpose

Rosa Medical currently has a split-brain data architecture. The public catalogue primarily renders from TypeScript registries and fixtures, while the admin writes selected fields into Supabase. This allows an admin action to report success without changing what the public website actually renders.

This design makes Supabase the sole live source of editable operational data after a carefully verified migration. The existing TypeScript catalogue remains available only as migration input, verification reference, test fixture material, and temporary cutover fallback. It must not remain a permanent runtime source after the migration gate passes.

The admin is intentionally reduced from a broad website CMS to a lean operational catalogue manager. Marketing presentation, homepage hero content, family hero content, branding, navigation, layout, typography, and other design-controlled website content remain source-controlled in code.

## 2. Verified live project identity

The connected Supabase project is the correct Rosa Medical project.

Current live database evidence:

- Project name: `rosa-medical`
- Project ref: `hzwabrbrgcxodkqilgdi`
- Region: `ap-south-1`
- Status: `ACTIVE_HEALTHY`
- PostgreSQL: 17
- `products`: 113 rows
- `categories`: 5 rows
- `product_images`: 113 rows
- `product_variants`: 322 rows
- `site_settings`: 5 rows
- `quote_requests`: 5 rows
- Family counts:
  - Chisels: 20
  - Cutters: 14
  - Knives: 22
  - Punches: 15
  - Scissors: 42

Those family counts exactly match the approved public catalogue inventory currently represented by the TypeScript catalogue. Representative records also match known catalogue entries, including `cutters-liston` with item code `36-5101` and a seeded approved media path.

Storage currently contains two objects in the `product-media` bucket, while most seeded `product_images.image_path` values point to static public media paths. This confirms that database rows exist but runtime media ownership is not yet consistently centralized.

## 3. Scope boundary

### 3.1 Admin capabilities to keep

The admin remains responsible for operational data that is expected to change without a developer deployment:

1. Dashboard
   - Keep.
   - Simplification/redesign is deferred.
   - It should eventually show useful operational counts and shortcuts only.

2. Products
   - Keep and make fully canonical.
   - Editable operational fields include product identity, English/Arabic product copy, family assignment, item codes, exact size/variant options, catalogue reference, active/archive state, and product media.
   - Product image changes must automatically affect every public surface that renders that product.

3. Catalogues
   - Keep as a narrow five-family document manager.
   - The admin may replace the public PDF for Knives, Scissors, Punches, Chisels, or Cutters.
   - No generic document-management system is required.

4. Contact details
   - Keep.
   - Operational contact fields such as business name, address, phone, WhatsApp, email, and working hours are editable.
   - Public Contact and footer surfaces must read the same canonical records.

5. Inquiries and messages
   - Keep as operational business data.
   - Their deeper workflow can be improved separately after catalogue canonicalization is stable.

### 3.2 Admin capabilities to remove or reduce

1. Publishing Centre
   - Remove from the intended admin scope.
   - No site-wide Draft -> Review -> Preview -> Publish workflow is required for marketing content.

2. Revision History
   - Remove from the intended admin scope.
   - A general CMS revision engine is not required.

3. Website Content editing
   - Remove.
   - Homepage hero text, homepage hero media, About marketing copy, procurement marketing copy, family hero text/media, and similar presentation content remain hard-coded/source-controlled.

4. Families
   - Reduce heavily.
   - The five families are fixed: Knives, Scissors, Punches, Chisels, Cutters.
   - Admin users do not edit family branding, family hero media, marketing copy, layout, or navigation.
   - Product editors may assign a product to one of the fixed families.
   - A read-only family summary may remain if operationally useful.

5. Standalone Media Library
   - Remove from the normal workflow.
   - Product media is managed inside the product editor.
   - Catalogue PDFs are managed inside catalogue management.
   - This prevents generic uploads from becoming orphaned assets with no semantic ownership.

6. General CMS/settings controls
   - Remove unless a specific operational setting proves necessary later.

### 3.3 Presentation that stays source-controlled

The following remain outside admin control:

- ROSA brand identity
- logo usage
- typography
- color system
- spacing system
- navigation structure
- page layouts
- homepage hero text and imagery
- family hero text and imagery
- About/procurement marketing content
- component composition
- design-system behavior

This boundary is deliberate. The admin manages changing business/catalogue data, not the visual website system.

## 4. Canonical domain architecture

Supabase becomes the canonical persistence layer, but public and admin components must not query raw tables independently. A repository/domain layer hydrates normalized database records into stable application models.

Target flow:

```text
Supabase normalized tables
        |
        v
Catalogue / Contact repositories
        |
        v
Hydrated domain models
        |
        +--> Search
        +--> Products overview
        +--> Family listings
        +--> Product detail
        +--> Related products
        +--> Homepage product cards
        +--> Inquiry item creation
        +--> Admin product editor
```

The same product identity must be used across all consumers.

## 5. Canonical Product model

The application-facing Product is one coherent object even if persistence is normalized across multiple tables.

A hydrated Product must contain at least:

- stable product ID
- canonical public slug
- fixed family identity
- English name
- Arabic name when verified/available
- English description
- Arabic description when verified/available
- primary item code
- exact catalogue codes/options
- sizes
- variant type/value information
- direction where applicable
- catalogue reference
- primary image
- gallery images
- active/archive/public visibility state

Product media must be represented as relationships to the product rather than as unrelated generic files.

### 5.1 Product identity and slugs

The current database uses family-prefixed slugs such as `cutters-liston`, while the static public registry uses route-local slugs such as `liston` under a family route. This mismatch currently breaks or complicates admin/public linking.

The migration must establish one canonical route identity. Existing public URLs must remain valid. Any database-only identifier used for internal uniqueness must not leak into a changed public route unless an explicit redirect strategy preserves the previous URL.

The migration plan must generate and verify a route manifest before changing runtime reads.

### 5.2 Product variants and exact codes

The database schema must preserve the catalogue semantics already represented in the static registry. A variant is not merely a generic size string if the catalogue distinguishes size, direction, blade/shape type, or exact item code.

The implementation may normalize these semantics into rows, but the repository must reconstruct the same externally visible product options and exact code mappings.

No valid existing catalogue configuration may be silently merged or dropped.

## 6. Media architecture

### 6.1 Ownership

Every managed product image must belong to a product through a database relationship.

Each relationship must support:

- product ID
- image path or public URL
- sort order
- primary-image selection
- stable image record identity
- localized alt text when available
- enough metadata to render safely and consistently

A generic upload endpoint that creates a Storage object without recording ownership is not part of the target architecture.

### 6.2 Existing static media

Existing approved public assets are migration inputs and must not be discarded merely because they currently live under `/public/media/...` rather than Supabase Storage.

The cutover may initially keep those paths as valid canonical media references in `product_images` while the repository becomes canonical. Moving every historical asset into Storage is not required to achieve source-of-truth consistency.

New admin uploads should use the product-media bucket and immediately update the corresponding product image relationship.

### 6.3 Public behavior

Changing a product's primary image in admin must change that same product image everywhere that consumes the canonical Product:

- search results
- homepage product cards
- Products overview
- family listing
- product detail
- related-product cards

No surface may maintain a separate hard-coded media mapping once cutover is complete.

## 7. Catalogue PDF architecture

There are exactly five operational catalogue documents, one per fixed family.

The current split between static `CATALOGUE_DOCUMENTS`, `site_settings`, and hypothetical category `pdf_path` ownership must be eliminated.

The target model stores one canonical catalogue document reference per family in Supabase. The repository resolves that record for both public and admin views.

Admin replacement flow:

1. validate family and PDF file
2. upload managed PDF
3. update the canonical family catalogue record
4. revalidate affected public catalogue/family surfaces
5. surface any failure instead of reporting false success

The public catalogue grid and download links then read that same canonical record.

## 8. Contact information architecture

Operational contact data becomes canonical in Supabase.

The current public hard-coded `CONTACT_INFORMATION` and admin `site_settings` split is removed from runtime behavior.

Contact keys must be namespaced and unambiguous. Generic keys such as `title`, `copy`, and `eyebrow` must not be reused for unrelated content blocks.

The target contact repository provides typed fields such as:

- business name
- address
- phone
- WhatsApp
- email
- working hours

Only verified values should be presented as verified public data. Placeholder/example values must not silently become authoritative during migration.

## 9. Marketing content and publishing workflow

Marketing website content remains source-controlled.

The existing admin Website Content page, Publishing Centre, and Revision History are outside the target operational scope. Their current partial implementations must not become dependencies of the canonical catalogue migration.

The implementation plan may hide/remove their navigation entries and retire dead write paths in a later bounded task, but catalogue cutover must not be blocked on an admin visual redesign.

Operational product/contact/catalogue edits use immediate validated persistence rather than a site-wide publishing workflow.

## 10. Inquiry snapshots

The mutable canonical Product must not be used as the historical truth for already-submitted inquiries.

At submission time the application creates an immutable inquiry item snapshot containing at least:

- source product ID
- product slug/code at submission
- product name at submission
- selected exact size/code/options
- quantity
- notes

Later product edits must not rewrite historical inquiry meaning.

The existing contract direction for `InquiryItemSnapshot` is retained.

A future persistence improvement may normalize inquiry items into `quote_request_items`, but catalogue cutover must preserve current inquiry functionality first.

## 11. Security and server-side writes

Privileged admin mutations must use a true privileged server credential and must not silently fall back to the public anonymous key.

All operational writes must:

- verify owner/admin authorization server-side
- validate identifiers against allowed fixed families/products
- validate file type and size before Storage writes
- validate text/input lengths and formats
- surface failed persistence instead of presenting success
- avoid exposing service-role credentials to browser code

RLS/advisor findings must be reviewed after any DDL changes.

## 12. Migration strategy

The migration is deliberately staged.

### Phase A: establish a frozen verification manifest

Generate a machine-checkable manifest from the approved TypeScript catalogue before runtime changes.

The manifest must cover all 113 visible product records and preserve:

- family
- current public route
- product identity
- primary item code
- exact catalogue codes
- sizes/options/directions
- catalogue reference
- approved primary media reference

Known duplicate catalogue codes, including `18-0644`, must be explicitly represented rather than silently deduplicated.

### Phase B: inspect and repair Supabase representation

Compare all live database product/category/variant/image rows against the frozen manifest.

The current row counts already align at 113 products and five families, but count equality is not sufficient. Field-level equivalence must be proven.

Any schema changes required to preserve catalogue semantics are applied through migrations, not ad-hoc DDL.

### Phase C: canonical repository layer

Introduce focused server-side repositories that expose stable domain operations, for example:

- list products
- list family products
- get product by public route identity
- search products
- get related products
- get family catalogue document
- get contact information

Components consume these repositories/domain models rather than raw tables or static registries.

### Phase D: temporary verified dual-read cutover

During migration only, Supabase is the preferred source and the TypeScript registry remains an explicit fallback/reference.

Automated parity checks compare Supabase against the frozen manifest.

Fallback use must be observable in tests/logging and must never become a silent permanent architecture.

### Phase E: migrate public consumers one at a time

Recommended order:

1. search results
2. family listings
3. product detail
4. Products overview
5. homepage product cards
6. related-product cards
7. inquiry item creation
8. catalogue document surfaces
9. public contact/footer

Each consumer receives focused tests before the next cutover step.

### Phase F: wire lean admin to canonical data

Product edits, media replacement, catalogue PDF replacement, and contact updates must use the same canonical records consumed publicly.

Static-registry-derived admin product identities and hard-coded public media mappings are removed from live behavior.

### Phase G: remove runtime fallback

The temporary registry fallback is removed only after the acceptance gate passes.

The TypeScript registry may remain in the repository as migration/reference/test data, but no public/admin runtime path may treat it as the canonical live store.

## 13. Acceptance gate

The migration is complete only when all of the following are true:

1. Exactly 113 approved visible product records are accounted for unless an explicitly reviewed reconciliation changes that number.
2. Family counts match the approved inventory or an explicitly reviewed reconciliation.
3. Every existing public product route resolves successfully.
4. Every product retains its intended family.
5. Exact catalogue codes/options remain equivalent to the approved source.
6. Known duplicate catalogue codes are handled explicitly rather than silently removed.
7. Every product has the intended primary media relationship or an explicitly recorded missing-media exception.
8. Search results render product images from the canonical Product model.
9. Family listings, product detail, Products overview, homepage cards, and related-product cards use the same canonical media source.
10. Replacing a product primary image in admin changes that product on all public consumers after normal revalidation/cache behavior.
11. Replacing a catalogue PDF changes the public catalogue download source.
12. Updating contact information changes the public Contact/footer source.
13. Marketing hero/family presentation remains unaffected and source-controlled.
14. Inquiry submissions preserve an immutable product snapshot.
15. No public runtime consumer imports the TypeScript registry as live authoritative data after fallback removal.
16. Privileged admin mutations do not fall back to the anonymous key.
17. Relevant unit/integration/browser tests pass.
18. Supabase security/performance advisors are checked after schema changes and material findings are addressed or documented.

## 14. Testing strategy

Implementation follows test-driven changes per consumer.

Required layers:

- manifest/parity tests for all 113 records
- repository unit/integration tests
- route preservation tests
- exact option/code mapping tests
- media relationship tests
- search-result image regression test
- family/product-detail image tests
- admin product-media mutation tests
- catalogue PDF canonical-source tests
- contact canonical-source tests
- inquiry snapshot tests
- browser smoke tests for representative products from all five families

The current search bug receives a regression test before its renderer is changed.

## 15. Non-goals

This work does not include:

- admin visual redesign
- general-purpose CMS
- Publishing Centre implementation
- Revision History implementation
- editable homepage/family hero content
- public user accounts
- ecommerce, prices, checkout, stock purchasing, or payments
- moving every historical static media asset into Supabase Storage merely for consistency
- broad unrelated frontend refactors

## 16. Resulting system

After the final gate:

- Supabase is the sole live source for products, product media relationships, catalogue PDFs, and operational contact details.
- Public pages and admin consume the same hydrated domain models.
- Product media updates propagate consistently everywhere.
- Static catalogue data remains only as reference/test/migration material.
- Website presentation remains controlled by the codebase.
- The admin is materially smaller and safer because it controls only data that should actually be operationally editable.
