# Rosa Medical Single-Owner Admin Dashboard — Design Specification

Date: 2026-07-31
Status: Proposed design for review
Repository: `manbtd0-cloud/RosaMedical`
Figma source of truth: `https://www.figma.com/design/L7LKGItaD2o6tZzHuw1GUQ`

## 1. Goal

Design a professional single-owner admin dashboard that lets Rosa Medical maintain the public website safely without exposing layout, typography, spacing, motion, or brand styling controls.

The dashboard must protect Rosa’s public credibility and goodwill while allowing the owner to manage:

- Products
- Instrument families
- Sizes and variants
- Catalogues
- Product and editorial media
- Product inquiries
- General contact messages
- Contact details
- Featured products and families
- Selected editable public-site copy
- English and Arabic content fields
- Drafts, previews, publishing, and revision history

The result must feel like the internal operating side of the same Rosa system: precise, quiet, credible, and review-led.

## 2. Fixed decisions

- One owner account only
- No public registration
- No multi-role permissions in version one
- Protected `/admin` route
- Password recovery through the verified owner email
- Structured content management, not a visual page builder
- No direct control over public layout, fonts, spacing, colour tokens, animations, or component structure
- English and Arabic fields exist together from the beginning
- Public publishing requires a reviewable draft state
- Inquiry submissions are stored in the dashboard and emailed to Rosa Medical
- General contact messages remain separate from product quotation inquiries
- The public site remains quotation-led, not ecommerce

## 3. Design approaches considered

### Approach A — Generic CMS dashboard

A conventional sidebar, tables, forms, and direct save actions.

**Advantage:** fast and familiar.

**Problem:** weak brand relationship, easy accidental publishing, and insufficient protection against low-quality or unverified content.

### Approach B — Highly branded editorial dashboard

A visually expressive internal interface mirroring the public website closely.

**Advantage:** distinctive.

**Problem:** decorative styling could reduce data density and make routine administration slower.

### Approach C — Rosa operational system — selected

Use the public website’s typography, spacing discipline, warm-neutral palette, thin borders, and restrained Rosa-red accents, but adapt them into a practical operating interface. Add deliberate review, preview, content-quality, and publishing safeguards.

**Why selected:** it preserves brand goodwill while remaining fast, understandable, and safe for a non-technical owner.

## 4. Brand and goodwill protection

The dashboard must actively prevent avoidable damage to the public site.

### 4.1 Protected design system

The owner may change content and records, but cannot change:

- ROSA logo construction
- Public colour palette
- Public typography
- Grid and spacing system
- Card structure
- Button styling
- Animation behaviour
- Navigation layout
- Page templates

### 4.2 Review before publish

Editable records use these states:

- Draft
- Needs review
- Ready to publish
- Published
- Hidden
- Archived

Content changes are not public until the owner explicitly publishes them.

### 4.3 Public preview

Every publishable record must support preview in its real public context:

- Product card
- Product detail page
- Instrument-family page
- Homepage featured section
- Catalogue card
- Contact/footer information
- About or procurement content block

### 4.4 Quality guardrails

The interface must flag, not silently accept:

- Missing product code
- Missing family
- Missing English name
- Missing main image
- Empty size or variant selections when the product requires them
- Duplicate product code
- Unusually long titles that may damage layout
- Missing image alt text
- Arabic field incomplete when Arabic publishing is enabled
- Contact placeholders still present
- Empty catalogue file
- Unverified certification, manufacturing, legal, award, ownership, or clinical claims

Warnings must distinguish between blocking errors and non-blocking recommendations.

### 4.5 Sensitive claims

The owner may not casually publish certification badges, legal policy changes, manufacturing claims, factory claims, awards, export statistics, ownership relationships, or clinical claims.

Such fields must show a clear review warning and remain isolated from ordinary content editing. Final implementation may require an explicit confirmation step before publishing sensitive content.

## 5. Information architecture

Primary admin navigation:

- Overview
- Products
- Families
- Catalogues
- Media
- Inquiries
- Messages
- Website Content
- Contact Details
- Publishing
- Settings

A compact persistent inquiry indicator may appear in the sidebar or header, but the dashboard must not feel like a sales CRM.

## 6. Authentication

### 6.1 Login

The login screen uses:

- ROSA logo unchanged
- Owner email
- Password
- Show/hide password
- Forgot password
- Secure-session note

No registration link appears.

### 6.2 Recovery

Password recovery contains:

- Verified-email entry
- Neutral success state that does not expose account existence unnecessarily
- Reset-password form
- Invalid or expired link state
- Successful reset state

### 6.3 Session behaviour

Design annotations must cover:

- Session expiry
- Re-authentication before sensitive actions where appropriate
- Sign out
- Unsaved-change warning
- Safe return after login

## 7. Overview dashboard

The dashboard overview is operational, not decorative.

It shows:

- Draft products requiring attention
- Published and hidden product totals
- New quotation inquiries
- New general messages
- Catalogue issues
- Contact placeholders still unresolved
- Arabic completion summary
- Recent publishing activity
- Quick actions

Quick actions:

- Add product
- Review inquiries
- Update contact details
- Upload catalogue
- Preview public site

Metrics must be presented as management information, not celebratory vanity statistics.

## 8. Products management

### 8.1 Products list

Desktop list includes:

- Thumbnail
- Product name
- Product code
- Instrument family
- Size or variant summary
- English status
- Arabic status
- Visibility
- Featured status
- Updated date
- Publish state

Controls:

- Search by name or code
- Filter by family
- Filter by publish state
- Filter by visibility
- Filter by language completeness
- Sort by updated date, name, code, or manual order
- Bulk hide, publish, archive, or family assignment only where safe

### 8.2 Product editor

Sections:

1. Identity
   - Product name EN
   - Product name AR
   - Product code
   - Instrument family
   - Short description EN
   - Short description AR

2. Media
   - Main image
   - Gallery
   - Alt text EN
   - Alt text AR
   - Crop preview

3. Options
   - Sizes
   - Variants
   - Direction or shape
   - Option order

4. Catalogue reference
   - Catalogue family
   - Page or section reference
   - Catalogue link

5. Display
   - Featured
   - Visibility
   - Manual sort order

6. Publishing
   - Draft status
   - Validation summary
   - Public preview
   - Save draft
   - Submit for review
   - Publish
   - Hide
   - Archive

No public price, stock, discount, rating, or direct-purchase field appears.

### 8.3 Deletion policy

Published products should normally be hidden or archived, not permanently deleted. Permanent deletion requires a strong confirmation and should be unavailable while the item is referenced by an inquiry unless safely detached.

## 9. Instrument families

The owner can manage the five verified families:

- Knives
- Scissors
- Punches
- Chisels
- Cutters

Family editor fields:

- Family name EN/AR
- Short introduction EN/AR
- Hero image
- Alt text EN/AR
- Catalogue PDF
- Featured products
- Sort order
- Visibility
- Public preview

Creating additional families may be supported, but must use the same fixed template and require a complete English name before publishing.

## 10. Catalogues

Catalogue records include:

- Family
- Document title EN/AR
- PDF file
- Cover image
- Description EN/AR
- Updated-date field
- Visibility
- Sort order
- Download filename
- File size and upload status

Required states:

- Uploading
- Processing
- Ready
- Replacement pending
- Failed
- Hidden

Replacing a catalogue must not break existing public links without warning.

## 11. Media library

The media library is purpose-led, not a loose dumping ground.

Media fields:

- File
- Type
- Dimensions
- File size
- Usage locations
- Alt text EN/AR
- Upload date
- Replacement status

Media categories:

- Product images
- Category images
- Editorial images
- Catalogue covers
- Documents
- Brand assets

The ROSA logo and protected brand assets must be visibly locked from accidental deletion.

The dashboard must warn about:

- Oversized uploads
- Unsupported file types
- Missing alt text
- Duplicate files
- Images in use
- Unsafe replacement crops

## 12. Inquiries

Quotation inquiries contain:

- Inquiry reference
- Submitted date
- Customer name
- Company
- Email
- Telephone
- Country
- Selected products
- Chosen sizes and variants
- Quantities
- Line notes
- General notes
- Status
- Internal note

Status workflow:

- New
- Reviewed
- Contacted
- Closed

The interface must preserve the submitted snapshot even if a product changes later.

Actions:

- View full inquiry
- Copy contact information
- Open email action
- Add internal note
- Change status
- Print or export a clean inquiry summary later

Do not introduce order, payment, shipping, revenue, or cart terminology.

## 13. General messages

Messages remain separate from quotation inquiries.

Fields:

- Sender name
- Company
- Email
- Telephone
- Country
- Subject
- Message
- Submitted date
- Status
- Internal note

Statuses:

- New
- Read
- Replied
- Archived

The interface provides a clear route to open a product inquiry if the message is actually asking for product pricing or quantities.

## 14. Website content

Only approved fields are editable.

Editable areas may include:

- Homepage headline and supporting copy
- Homepage featured families and products
- About introduction and approved buyer-expectation blocks
- Procurement Support copy
- Contact-page introduction
- Footer supplier description
- Legal text only through a separately warned editor

Every content block includes:

- English field
- Arabic field
- Character guidance
- Public preview
- Last published content
- Current draft
- Revision history

The interface must not expose freeform section creation, page ordering, arbitrary HTML, custom CSS, or visual-builder controls.

## 15. Contact details

Editable fields:

- Business name
- Address EN/AR
- Telephone
- WhatsApp
- Email
- Working hours EN/AR
- Map location URL or coordinates
- Social links

The editor shows where each value appears publicly:

- Contact page
- Footer
- Inquiry confirmation
- General-message confirmation
- Email templates where applicable

Placeholder values must be clearly marked and must trigger a publish warning.

## 16. Featured content

The owner can choose:

- Featured instrument families
- Featured products
- Homepage order within protected slots
- Visibility dates only if later required

The number of slots, card layouts, and section placement remain fixed by the public design.

The dashboard must preview overlong names and missing images before allowing publication.

## 17. English and Arabic workflow

Each translatable record contains paired EN and AR fields.

Language states:

- English complete
- Arabic not started
- Arabic in progress
- Arabic complete
- Arabic needs review

Version one may allow English publishing while Arabic remains incomplete, because the public Arabic site is a later phase. Once Arabic publishing is enabled, records missing required Arabic fields become blocking errors for Arabic publication only.

The admin interface itself is designed English-first but must be layout-ready for future Arabic/RTL administration.

## 18. Publishing centre

A dedicated Publishing area provides:

- All drafts
- Items needing review
- Ready-to-publish items
- Recently published items
- Validation failures
- Placeholder warnings
- Arabic completeness warnings
- Sensitive-claim warnings

Publish flow:

1. Review changes
2. Review validation
3. Open public preview
4. Confirm affected public locations
5. Publish
6. Show success with timestamp
7. Allow rollback to the prior published revision

Bulk publish is limited to safe content types and must still show a change summary.

## 19. Revision history and audit trail

Every publishable record shows:

- Changed fields
- Previous value
- New value
- Saved date
- Published date
- Publishing action
- Restored revision where applicable

Because there is one owner account, the audit trail identifies the account and session rather than multiple staff roles.

A rollback creates a new revision; it does not erase history.

## 20. Settings

Version-one settings include:

- Owner profile email display
- Password change
- Session and sign-out controls
- Email notification destination
- Default inquiry recipient
- Site preview URL
- Arabic publishing enablement state
- Safe upload limits and supported formats shown as information

No theme customisation or public-design controls are exposed.

## 21. Visual system

The admin dashboard must correlate with the public site without copying its marketing composition.

Use:

- Warm white and white surfaces
- Near-black typography
- Rosa red for primary actions, active navigation, critical status, and controlled highlights
- Steel grey for metadata and secondary information
- Lora only for major page titles and high-level empty states
- Inter for navigation, tables, forms, metadata, and actions
- Thin borders
- Minimal corner radii
- Restrained shadows
- Generous but practical spacing

Avoid:

- Generic blue SaaS styling
- Excessive coloured status chips
- Oversized analytics cards
- Dense dark sidebars
- Gradient dashboards
- Decorative charts without operational value
- Floating glass cards
- Gamification
- Celebratory success confetti

## 22. Responsive behaviour

Primary design target:

- Desktop 1440 px

Secondary targets:

- Tablet management layout
- Mobile 390 px for urgent tasks

Mobile must support at least:

- Overview
- Inquiry review and status update
- Message review
- Contact-detail editing
- Product visibility and featured toggle
- Draft review and publishing confirmation

Complex media management and bulk product editing may adapt into simplified mobile flows rather than compressed desktop tables.

All interactive targets must be at least 44 px where practical.

## 23. Accessibility

Required:

- Keyboard-accessible navigation
- Visible focus states
- Persistent labels
- Clear error association
- No colour-only status meaning
- Logical reading order
- Table alternatives or stacked mobile records
- Unsaved-change warnings
- Destructive-action confirmation
- Reduced-motion support
- Screen-reader labels for icon actions

## 24. Figma deliverables

Create or update:

- `21 Admin Foundations`
- `22 Admin Overview`
- `23 Admin Products`
- `24 Admin Product Editor`
- `25 Admin Catalogues & Media`
- `26 Admin Inquiries & Messages`
- `27 Admin Website Content`
- `28 Admin Publishing & Review`
- `29 Admin Authentication & Settings`
- `30 Admin Prototype`
- Update `02 Components`
- Update `99 Handoff Notes`

Required screen groups:

- Login and recovery
- Desktop and mobile admin shell
- Overview
- Products list and states
- Product editor and validation
- Families
- Catalogues
- Media library
- Inquiry list and detail
- Message list and detail
- Website-content editor
- Contact-details editor
- Featured-content editor
- Publishing centre
- Public preview
- Revision history and rollback
- Settings
- Loading, empty, error, success, unsaved, and destructive-confirmation states

## 25. Prototype scope

The clickable admin prototype must demonstrate:

- Login
- Overview
- Add product
- Validate product
- Preview product publicly
- Publish product
- Review inquiry
- Update inquiry status
- Update contact details
- Review website-copy draft
- Publish reviewed changes
- View revision history
- Roll back a revision
- Sign out

## 26. Quality gates

Phase 4 design is not complete until:

- Every editable public field is mapped to a controlled admin field
- Public design controls remain protected
- Product and family records support English and Arabic
- Inquiries and messages remain separate
- Publishing requires review and preview
- Placeholder and sensitive-claim warnings exist
- Revision history and rollback exist
- No public price, payment, inventory, discount, rating, or order fields appear
- Desktop and mobile critical flows exist
- No clipped text or undersized primary controls remain
- The dashboard visually belongs to Rosa without sacrificing operational clarity
- Accessibility and RTL-readiness annotations exist
- Prototype interactions work

## 27. Out of scope

- Multi-admin roles
- Customer accounts
- Public registration
- Direct ecommerce
- Payments
- Inventory management
- Shipping management
- Revenue analytics
- Marketing automation
- Newsletter management
- Visual page builder
- Custom themes
- Arbitrary HTML or CSS editing
- Final Arabic admin interface
- Final legal approval

## 28. Next step

After approval of this written specification, create the detailed Phase 4 Figma production plan using the writing-plans skill, then execute the admin design in controlled screen groups with visual review gates and one repository milestone after the final audit.
