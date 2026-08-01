# Rosa Medical F3E-D Source-Backed Governance Design Specification

**Date:** 2026-08-02  
**Owner:** Ahmad and Ahmad's frontend AI  
**Status:** Approved design captured for implementation planning  
**Branch:** `frontend/f3e-d-governance-design`

## 1. Purpose

F3E-D completes the remaining static owner-admin experience for public content governance. It replaces the five remaining deferred admin compositions with truthful, source-backed routes:

- `/admin/content`
- `/admin/contact-details`
- `/admin/publishing`
- `/admin/revisions`
- `/admin/settings`

The milestone remains presentation-only. It does not create authentication, content persistence, contact-detail persistence, drafts, publishing, revision history, rollback, notification delivery, storage, deployment configuration, or backend contracts.

The normal routes must expose only facts supported by the current frontend source and accepted project decisions. Operational examples shown in Figma become isolated demonstration components and never appear on normal routes.

## 2. Locked project boundaries

F3E-D preserves all accepted Rosa Medical rules:

- Public logo treatment is `ROSA` only.
- Public positioning remains medical instruments supplier and procurement partner.
- The site is quotation-led and contains no ecommerce behavior.
- One future protected owner account exists; no registration or multiple roles.
- Product inquiries and general messages remain separate systems.
- Intended publishing sequence is Draft → Review → Public Preview → Explicit Publish → Revision History.
- Rollback creates a new revision and never erases history.
- Logo, typography, colours, spacing, components, templates, navigation and route structure remain protected from ordinary admin editing.
- English is implemented first while English/Arabic field structures remain separate.
- Unverified manufacturing, factory, certification, ownership, award, export, legal, regulatory, clinical and performance claims remain prohibited.
- Placeholder contact details and media remain explicitly unresolved until verified client data replaces them.

F3E-D changes no backend implementation and no OpenAPI operation or schema.

## 3. Truthfulness policy

The approved Figma frames contain example operational data that is not present in the repository:

- Draft and publishing queue counts
- Published/draft/review states
- Revision numbers
- Publication timestamps
- Saved timestamps
- Owner and notification email addresses
- Preview domains
- File names
- Arabic-completion states
- Recently published activity
- Validation-engine results
- Successful save, publish or rollback outcomes

Normal F3E-D routes must not copy or imply any of these values.

Every normal route follows these rules:

1. It uses current frontend source or accepted project policy only.
2. It does not imply that a live query, validation, save, preview build, deployment or publication occurred.
3. It does not show a numeric operational count unless that count is directly derived from a source registry.
4. It contains no native `<form>`, file input, mutation handler, API request, storage access, session access or persistence behavior.
5. It never mounts `data-preview-only`.
6. Every inactive control is disabled or represented as noninteractive guidance.
7. Real public-page links may remain active where the destination already exists.

## 4. Approved Figma evidence

The implementation should preserve the structural intent of these approved frames while rejecting their fictional operational values:

### Website Content and Contact Details

- Website Content desktop: `50:3`
- Contact Details desktop: `50:160`
- Contact Details mobile: `50:282`

### Publishing and Revisions

- Publishing Centre desktop: `51:3`
- Revision History desktop: `51:242`
- Publishing/revision states and handoff notes on page `28 Admin Publishing & Review`

### Settings

- Admin Settings desktop: `44:157`
- Admin Settings mobile: `44:229`
- Publishing-state and revision-record handoff notes on page `99 Handoff Notes`

Figma absolute positioning and Tailwind reference code are not copied into production source. The implementation must use the existing Next.js, React, CSS token and admin-component architecture.

## 5. Exact normal route ownership

F3E-D owns only these exact segment arrays:

```text
["content"]
["contact-details"]
["publishing"]
["revisions"]
["settings"]
```

Every deeper shape beneath one of these roots returns not-found:

```text
/admin/content/example
/admin/contact-details/example
/admin/publishing/example
/admin/revisions/example
/admin/settings/example
```

Unknown admin roots also return not-found after F3E-D. No approved sidebar route remains a generic placeholder.

Final catch-all resolution order:

1. Resolve F3E-B catalogue-management routes.
2. Resolve F3E-C operations routes.
3. Resolve F3E-D governance routes.
4. If the first segment belongs to any owned resolver but the exact shape does not resolve, call `notFound()`.
5. Return not-found for every remaining unknown admin path.

The route view must never return `null` for an internal model mismatch. It calls `notFound()` instead, preventing blank successful responses.

## 6. Shared public-content registry

F3E-D establishes one read-only `public-content-registry` used by both relevant public components and the Admin Content inventory.

This registry is not a CMS database, draft store, translation store or publication-state store. It is a typed frontend source of current approved copy.

### 6.1 Required block shape

```ts
export type PublicContentPageKey =
  | "home"
  | "about"
  | "procurement-support"
  | "contact"
  | "footer";

export type PublicContentSensitivity =
  | "standard"
  | "procurement"
  | "contact"
  | "legal-boundary";

export interface PublicContentBlock {
  blockKey:
    | "home.hero"
    | "home.support"
    | "about.introduction"
    | "procurement.introduction"
    | "contact.introduction"
    | "footer.description";
  pageKey: PublicContentPageKey;
  label: string;
  englishValue: string;
  arabicValue: null;
  publicHref: Route<string>;
  affectedComponent: string;
  characterGuidance: string;
  sensitivity: PublicContentSensitivity;
}
```

### 6.2 Exact six content blocks

1. Homepage hero
2. Homepage support copy
3. About introduction
4. Procurement Support introduction
5. Contact introduction
6. Footer description

The current values must be extracted from their actual public components into shared exported constants. Public components and admin models consume the same objects. Admin code must not duplicate the six strings.

Arabic values remain `null` and display as `Not supplied`. The registry contains no Arabic-completion percentage, workflow status, author, timestamp or revision ID.

### 6.3 Legal content exclusion

Privacy and Terms do not enter ordinary content editing. They remain legal templates requiring qualified review. Admin Content may include an informational protected-boundary panel linking to the public templates, but it does not render them as editable blocks.

## 7. `/admin/content`

### 7.1 Page purpose

Heading:

> Edit approved content, not the design.

Description:

> Current frontend copy is shown from shared source records. Editing, drafting and publishing are not connected.

### 7.2 Normal page structure

1. `AdminPageHeader`
   - Eyebrow: `Website Content`
   - One `<h1>`
   - Real `View public website` link to `/`
   - Disabled `Add content block`

2. Truthful source warning
   - `Static frontend content registry`
   - States that no draft, save, review or publication state is connected.

3. Disabled collection controls
   - Read-only search labelled `Search page or content block`
   - Disabled page filter
   - Disabled content-type filter
   - Disabled pagination only if visually useful; it must state no live collection exists.

4. Six source-backed content records
   - Label
   - Page label
   - Current English value
   - Arabic: `Not supplied`
   - Character guidance
   - Affected component
   - Sensitivity classification
   - Real public-page link
   - Disabled `Edit block`

5. Read-only field preview section
   - English and Arabic shown as separate fields
   - No native form
   - Disabled Save draft, Preview changes and Submit for review
   - No selected record unless represented as a general content-field anatomy example using the first registry block and labelled `Current source example`, not a draft.

6. Current frontend composition
   - Five families from `CATALOGUE_FAMILIES` in registry order
   - Homepage product selection from the existing homepage selector/model
   - Real public family and product links
   - Labelled `Current frontend composition`
   - Does not use `Featured`, `Selected by owner`, `Saved`, `Published` or similar workflow language.

7. Protected layout boundary
   - No page creation
   - No section creation, deletion, placement or reordering
   - No navigation changes
   - No template or component changes
   - No logo, typography, colour, spacing, card or motion controls
   - No HTML or CSS input
   - Legal templates require qualified review

### 7.3 Prohibited normal content-page copy

Normal route source must not contain:

- Published
- Draft
- Needs review
- Ready to publish
- AR complete
- AR in progress
- Last saved
- Last updated
- Revision
- Author
- Preview build generated
- Saved successfully
- Submitted for review

The phrase `revision history` may appear only in governance guidance describing future policy, not as a current block state.

## 8. `/admin/contact-details`

### 8.1 Source model

The page consumes the existing public Contact information model. It must not create a copied list of business details.

Source-backed facts include:

- Public brand/business identity already present in source
- Existing contact-information rows
- Each row's current confirmation status
- Current public location/consumer mapping where source supports it

Every unresolved value displays the existing canonical phrase:

> Awaiting client confirmation

The unresolved total is derived from model rows. A numeric unresolved count is allowed only because it is calculated directly from the source model.

### 8.2 Normal page structure

1. Page header
   - Eyebrow: `Contact Details`
   - Heading: `Confirm public contact information safely.`
   - Description that values are unresolved until verified client data exists.

2. Warning
   - Current contact information is not publication-ready.
   - No live save or confirmation workflow exists.

3. Source-backed field inventory
   - One read-only field per existing contact model row
   - English/Arabic pairing only where the source model supports locale distinction
   - Confirmation status badge
   - No invented placeholder value
   - No telephone/email/WhatsApp/map/social link becomes actionable

4. Affected frontend locations
   - Public Contact page
   - Public footer, only for values actually consumed there
   - Inquiry confirmation preview
   - Contact-message confirmation preview
   - Future email templates labelled `Not implemented`

5. Disabled actions
   - Save draft
   - Preview affected pages
   - Submit for review
   - Add social profile
   - Confirm contact value
   - Publish contact details

6. Protected truthfulness note
   - Figma example address, telephone, WhatsApp, email, hours, map and social values are not source data and must not appear.

### 8.3 Prohibited normal contact values

- Riyadh or Saudi address placeholders
- `+966` numbers
- `contact@placeholder.com`
- `owner@rosa.example`
- `notifications@rosa.example`
- `sales@rosa.example`
- Example map URLs
- Example working hours
- Example social accounts
- Clickable `mailto:`, `tel:` or WhatsApp links

## 9. `/admin/publishing`

### 9.1 Empty live state

The normal route states:

> No publishing queue is connected.

It does not imply that an empty backend query succeeded. Supporting copy explains that drafts, validation, public previews and explicit publication require future authenticated backend workflows.

### 9.2 Publishing workflow guidance

Render the intended five-stage sequence:

1. Draft
2. Review
3. Public Preview
4. Explicit Publish
5. Revision History

This is policy documentation, not current operational state. Status pills may use neutral tones and must be introduced by `Intended workflow`.

### 9.3 Current source blockers

Reuse the existing F3E-A launch-readiness model rather than creating a second blocker list:

- Contact information — Awaiting confirmation
- Catalogue PDF paths — Awaiting publication
- Product media — Awaiting replacement
- Privacy and Terms — Awaiting legal approval
- Arabic content — Deferred

These are project dependencies, not results from a validation engine.

### 9.4 Governed public domains

The future publishing system covers:

- Products
- Families
- Catalogues
- Media
- Website Content
- Contact Details

It excludes:

- Inquiries
- General messages
- Authentication
- Owner settings
- Infrastructure settings

### 9.5 Sensitive-content boundary

Additional review is required for:

- Legal wording
- Certification statements
- Manufacturing or factory claims
- Clinical or performance claims
- Export or regulatory claims
- Ownership, history or experience claims
- Unconfirmed contact information

The page does not claim an automatic validator, legal review system, re-authentication flow, preview environment, deployment pipeline or publish endpoint exists.

### 9.6 Controls

- Real `View current public site` link to `/`
- Disabled `Open draft queue`
- Disabled `Run validation`
- Disabled `Generate public preview`
- Disabled `Publish selected changes`
- Disabled `View recently published`

No numeric queue cards, queue rows, recently published records or publication timestamps appear.

## 10. `/admin/revisions`

### 10.1 Empty state

The normal route states:

> No revision history is available.

Supporting copy explains that no frontend or connected backend revision records exist.

### 10.2 Append-only rollback policy

The route documents:

- Publishing creates one new immutable revision.
- Previous revisions remain available.
- Rollback does not update or erase an old record.
- Rollback creates another revision containing restored values.
- Comparison displays only changed fields.
- Sensitive restoration requires owner re-authentication after authentication exists.

### 10.3 Future revision record schema guidance

Display field names only, without example values:

- Record type
- Record identifier
- Changed fields
- Previous values
- Proposed values
- Save time
- Publish time
- Action
- Restored revision identifier
- Owner-session identifier

Use a definition list. It is schema guidance, not an active record.

### 10.4 Disabled controls

- Read-only search
- Disabled record-type filter
- Disabled action filter
- Disabled Compare
- Disabled Restore
- Disabled Rollback

No revision card, row, number, timestamp, filename, Arabic translation, publication history, current/available state or author appears on the normal route.

## 11. `/admin/settings`

### 11.1 Purpose

Heading:

> Owner and system settings.

Description:

> Configuration categories are shown without fictional credentials, providers or environments.

### 11.2 Owner account

Display:

- Owner authentication — `Not connected`
- Owner email — `Unavailable until authenticated configuration exists`
- Password management — `Not connected`
- Recovery configuration — `Not connected`

Disabled controls:

- Change password
- Recovery settings
- Sign out

No owner email, initials, session state, role claim, password age or security claim appears.

### 11.3 Notifications

Display:

- General-message notification recipient — `Not configured`
- Quotation notification recipient — `Not configured`
- Email provider — `Not connected`

No example address or provider name appears.

### 11.4 Public preview

Display:

- Current public composition — real link to `/`
- Draft preview environment — `Not connected`
- Preview URL — `Not configured`

No fake domain is shown.

### 11.5 Arabic publishing

Display:

- Arabic public launch — `Deferred`
- Arabic fields — `Structurally supported`
- Arabic publishing — `Protected until content review and production gate`

These are project constraints, not saved preferences.

### 11.6 Storage and deployment

Display:

- Managed uploads — `Not connected`
- Catalogue PDF storage — `Not connected`
- Deployment publishing — `Not connected`
- Revision persistence — `Not connected`

No provider, bucket, project, branch, environment, token or deployment URL appears.

### 11.7 Protected settings

Ordinary admin settings cannot edit:

- ROSA identity
- Lora and Inter typography
- Brand palette
- Design tokens
- Component library
- Public templates
- Route structure
- Navigation
- Security policy
- Data retention policy
- Backend infrastructure

### 11.8 Controls

- Disabled Save settings
- Disabled Change password
- Disabled Recovery settings
- Disabled Sign out

No native form, successful-save state or persisted preference appears.

## 12. Isolated preview systems

All examples of editing, validation, publication, revision history or successful settings behavior live in separate preview-only files. Normal route modules must not import preview fixtures, preview components or preview barrels.

Every preview root includes:

```html
data-preview-only="true"
```

Every preview visibly states one of these exact disclaimers:

- `Demonstration preview only. No content was edited, saved, reviewed or published.`
- `Demonstration preview only. No contact value was saved, confirmed or published.`
- `Demonstration preview only. No publishing validation, preview build or publication occurred.`
- `Demonstration preview only. No revision was compared, restored or created.`
- `Demonstration preview only. No setting was changed or saved.`

Synthetic labels use only:

- `Example content block`
- `Example contact field`
- `Example publication item`
- `Example revision A`
- `Example revision B`
- `EXAMPLE-*`
- `example.invalid`

No realistic person, company, email, phone number, domain, timestamp, revision number, filename or provider appears.

### 12.1 Content previews

- Block editor preview
- English/Arabic field-editing preview
- Validation warning preview
- Sensitive-copy warning preview
- Save loading preview
- Save failure preview
- Save confirmation preview
- Submit-for-review confirmation preview
- Public-preview comparison preview

### 12.2 Contact previews

- Edited contact draft preview
- Unresolved-value validation preview
- Affected-location comparison preview
- Save loading preview
- Save failure preview
- Submit-for-review confirmation preview
- Contact publication confirmation preview

### 12.3 Publishing previews

- Populated review queue preview
- Validation-failure queue preview
- Review detail preview
- Owner re-authentication preview
- Explicit publish confirmation preview
- Publish failure preview
- Publish success preview
- Recently-published list preview

### 12.4 Revision previews

- Populated revision list preview
- Field comparison preview
- Restore confirmation preview
- Restore failure preview
- Restore success preview

### 12.5 Settings previews

- Password-change preview
- Notification-validation preview
- Save loading preview
- Save failure preview
- Save success preview
- Protected-setting warning preview

All buttons in previews remain disabled unless a component is a harmless real public-page link. No preview has a route.

## 13. Architecture

```text
features/
├── public-content-registry/
│   ├── public-content-blocks.ts
│   ├── public-content-selectors.ts
│   └── index.ts
├── admin-content/
│   ├── admin-content-model.ts
│   ├── admin-content-page.tsx
│   ├── admin-content-composition.tsx
│   ├── admin-content-protected-boundary.tsx
│   ├── admin-content-previews.tsx
│   └── index.ts
├── admin-contact-details/
│   ├── admin-contact-details-model.ts
│   ├── admin-contact-details-page.tsx
│   ├── admin-contact-impact-map.tsx
│   ├── admin-contact-details-previews.tsx
│   └── index.ts
├── admin-publishing/
│   ├── admin-publishing-model.ts
│   ├── admin-publishing-page.tsx
│   ├── admin-publishing-workflow.tsx
│   ├── admin-publishing-previews.tsx
│   └── index.ts
├── admin-revisions/
│   ├── admin-revisions-page.tsx
│   ├── admin-revision-policy.tsx
│   ├── admin-revision-previews.tsx
│   └── index.ts
├── admin-settings/
│   ├── admin-settings-model.ts
│   ├── admin-settings-page.tsx
│   ├── admin-settings-protected-boundary.tsx
│   ├── admin-settings-previews.tsx
│   └── index.ts
└── admin-governance-routing/
    ├── admin-governance-route-model.ts
    ├── admin-governance-route-view.tsx
    └── index.ts
```

Existing public components are modified only enough to consume the shared public-content registry. Their rendered copy and route behavior remain unchanged.

## 14. Dependency boundaries

### Normal route dependency graph

Normal governance routes may import:

- F3E-A admin primitives
- F3E-A launch-readiness selector/model
- Existing public contact-information model
- Existing catalogue registry
- Existing homepage selector/model
- Shared public-content registry
- Typed route helpers

Normal routes must not import:

- Preview fixtures
- Preview component modules
- Preview-only barrels
- Synthetic records
- API clients
- Authentication/session modules
- Storage/deployment modules

### Preview dependency graph

Preview modules may import source-backed catalogue products and the shared content/contact schemas for shape fidelity, but they must keep synthetic operational metadata local and explicit.

## 15. Accessibility requirements

- The F3E-A shell remains the sole `<main>` owner.
- Each governance feature page renders exactly one `<h1>`.
- Sections use labelled `<section>` elements or fieldsets with legends.
- Read-only controls have visible labels and associated hint text.
- Disabled actions are actual disabled buttons.
- Status is conveyed by text and non-colour indicators.
- Workflow and schema sequences use semantic ordered lists or definition lists.
- Arabic fields use `dir="rtl"` only on the Arabic field container/value.
- Mobile cards preserve labels through `<dl>`, `<dt>` and `<dd>`.
- No content is hidden behind fixed navigation.
- Focus-visible styles remain visible on real links.
- Reduced-motion behavior follows existing admin styles.

## 16. Responsive requirements

Target viewports:

- Desktop: 1440 × 1000
- Tablet: 768 × 1024
- Mobile: 390 × 844

Required behavior:

- Content records stack into labelled cards below table width.
- English and Arabic fields stack vertically below tablet width.
- Contact fields and affected-location rows become one column.
- Publishing workflow becomes a vertical sequence on mobile.
- Launch-readiness blockers become one-column cards on mobile.
- Revision schema uses a single-column definition list on mobile.
- Settings categories stack and actions become full-width.
- Long content values, block keys, component labels and status explanations use safe wrapping.
- Existing visible admin navigation remains in document flow with no dead toggle.
- No page-level horizontal overflow.
- No fixed-height content panel clips long text.

## 17. Verification requirements

### 17.1 Source/model tests

- Exactly six content blocks exist.
- Every block key is unique.
- Every block has a real public route.
- Arabic values are `null` and never represented as completion percentages.
- Public components and Admin Content consume the same exported block records.
- Five family items derive from `CATALOGUE_FAMILIES`.
- Homepage products derive from the existing homepage model/selector.
- Contact fields derive from the existing contact-information model.
- Contact unresolved count is derived rather than hard-coded.
- Publishing blockers come from the existing launch-readiness model.
- Settings categories contain no email, domain, provider, bucket, project, environment or credential value.

### 17.2 Composition tests

- Each normal feature page renders one `<h1>` and no `<main>`.
- No normal route renders `data-preview-only`.
- No normal route contains a native form or file input.
- Content shows six source records and no workflow status.
- Contact shows only source-backed values and canonical unresolved wording.
- Publishing shows no queue row or numeric queue count.
- Revisions shows no revision record.
- Settings shows no owner identity or fictional configuration.
- Every mutation action is disabled.
- Real public links remain valid.

### 17.3 Route tests

- All five exact routes resolve.
- Every deeper route under an owned root is not-found.
- Unknown admin roots are not-found.
- F3E-B and F3E-C routes continue resolving.
- Route view calls `notFound()` instead of returning `null` for internal mismatch.

### 17.4 Static policy tests

Scan normal-route source and reject:

- Fictional Figma emails/domains
- `+966`
- Riyadh/Saudi placeholder address copy
- Revision numbers and publication timestamps
- Queue counts and recently-published records
- File names and file sizes
- `data-preview-only`
- `type="file"`
- `fetch(`
- `localStorage`
- `sessionStorage`
- cookie access
- submit handlers
- mutation handlers
- copied second content registry

Preview modules are excluded from normal-route scans and separately checked for required disclaimers and `data-preview-only`.

### 17.5 Browser coverage

For each normal route at 1440, 768 and 390 pixels:

- Response succeeds.
- Exactly one `<main>` exists through the shell.
- Exactly one `<h1>` exists.
- No `data-preview-only` exists.
- No native form or file input exists.
- Robots metadata includes `noindex`.
- No horizontal document overflow exists.
- Final content is reachable and visible.
- Representative mutation controls are disabled.

Strict 404 checks cover every deeper owned route.

## 18. Backend and OpenAPI boundary

F3E-D does not define, assume or implement:

- Content CRUD endpoints
- Contact-details endpoints
- Draft endpoints
- Review endpoints
- Preview-build endpoints
- Validation endpoints
- Publish endpoints
- Revision-list endpoints
- Revision-detail endpoints
- Revision-comparison endpoints
- Rollback endpoints
- Settings endpoints
- Password-management endpoints
- Notification configuration
- Email-provider configuration
- Upload/storage configuration
- Deployment configuration

Any future contract must be proposed through the shared README and versioned OpenAPI package before frontend integration.

## 19. Out of scope

- Live content editing
- Content drafts
- Arabic translation editing
- Content validation engine
- Sensitive-claim detection
- Authenticated owner re-entry
- Draft public preview environment
- Publish execution
- Deployment execution
- Revision persistence
- Field comparison using real history
- Rollback
- Settings persistence
- Password changes
- Notification delivery
- Email provider integration
- Upload storage
- Catalogue PDF storage
- Production environment configuration

## 20. Acceptance summary

F3E-D is complete at design level when:

- the five exact governance routes have truthful normal compositions;
- the six public copy blocks use one shared source consumed by public and admin views;
- contact details reuse the existing contact model without fabricated values;
- publishing and revisions contain no fake activity;
- settings contain no fake identity, email, domain, provider or environment;
- all operational examples remain isolated preview-only components;
- strict routing prevents nested placeholder leakage;
- responsive, accessibility and policy tests are specified;
- no backend or OpenAPI boundary changes.
