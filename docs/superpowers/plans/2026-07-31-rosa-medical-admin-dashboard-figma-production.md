# Rosa Medical Admin Dashboard Figma Production Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Design a complete single-owner Rosa Medical admin dashboard that safely manages public content, inquiries, media and publishing while protecting the approved public design and brand credibility.

**Architecture:** Build one restrained operational design system inside the existing Rosa Figma file. Use a fixed admin shell and reusable form, table, status, validation, preview and publishing components. Every editable public record follows Draft → Review → Preview → Publish and retains revision history.

**Tech Stack:** Figma Design, reusable components, Auto Layout, desktop 1440 px frames, mobile 390 px critical flows, Lora headings, Inter operational UI, existing Rosa colour system.

## Global Constraints

- One owner account only; no registration or roles.
- The ROSA logo, public layout, typography, spacing, colours, animation and component structure are protected.
- Structured fields only; no page builder, arbitrary HTML, CSS or theme controls.
- English and Arabic fields are paired from the beginning.
- Public changes remain drafts until reviewed, previewed and explicitly published.
- Inquiries and general messages remain separate.
- No prices, payments, orders, inventory, shipping, discounts, ratings or ecommerce terminology.
- Sensitive claims and unresolved placeholders require prominent review warnings.
- Published records use hide/archive by default; destructive deletion requires explicit confirmation.
- Desktop is the primary admin target; mobile supports urgent and review tasks.
- All interactive targets are at least 44 px where practical.
- Commits occur only at meaningful documentation milestones.

---

### Task 1: Admin Foundations and Shell

**Figma areas:**
- Create: `21 Admin Foundations`
- Update: `02 Components`
- Update: `99 Handoff Notes`

**Produces:** admin shell, navigation, tokens, status language and reusable controls.

- [ ] Create the desktop shell with 240 px light sidebar, compact top bar, content canvas and persistent public-preview action.
- [ ] Create mobile shell with top bar, menu sheet and urgent-action navigation.
- [ ] Define status treatments for Draft, Needs review, Ready, Published, Hidden, Archived, New, Reviewed, Contacted, Closed, Read, Replied and Failed.
- [ ] Build reusable form fields, paired EN/AR fields, tables, stacked mobile records, buttons, alerts, validation panels, confirmation dialogs and toast states.
- [ ] Create blocking-error and recommendation treatments with text and icon meaning, never colour alone.
- [ ] Annotate protected-design boundaries and publish-state rules.

**Review gate:** the system must resemble Rosa through typography, spacing and restrained red accents without becoming a marketing page or generic blue SaaS dashboard.

---

### Task 2: Authentication and Settings

**Figma areas:**
- Create: `29 Admin Authentication & Settings`

**Produces:** login, recovery, reset, expiry, settings and sign-out flows.

- [ ] Design login with owner email, password, show/hide, forgot password and no registration link.
- [ ] Design neutral recovery success, reset form, expired-link and reset-success states.
- [ ] Design session-expired and re-authentication dialogs.
- [ ] Design settings for owner email display, password change, notification destination, inquiry recipient, preview URL and Arabic publishing state.
- [ ] Design unsaved-change warning and sign-out confirmation.
- [ ] Create mobile login and settings-critical screens.

**Review gate:** authentication must feel secure and composed, with no promotional content or account-creation path.

---

### Task 3: Operational Overview

**Figma areas:**
- Create: `22 Admin Overview`

**Produces:** desktop overview, mobile overview, loading and empty states.

- [ ] Present actionable totals for drafts, published/hidden products, new inquiries, new messages, catalogue issues, placeholders and Arabic completion.
- [ ] Add recent publishing activity with record type, action and time.
- [ ] Add quick actions: Add product, Review inquiries, Update contact details, Upload catalogue and Preview public site.
- [ ] Add an Attention required queue that separates blocking items from recommendations.
- [ ] Design loading, no-activity and partial-error states.
- [ ] Design mobile overview prioritising new inquiries, warnings and quick actions.

**Review gate:** no decorative charts or vanity metrics; every displayed item must support a management action.

---

### Task 4: Products, Families and Product Editor

**Figma areas:**
- Create: `23 Admin Products`
- Create: `24 Admin Product Editor`

**Produces:** product list, family management, product editor, validation, preview and destructive states.

- [ ] Design products table with thumbnail, name, code, family, options, EN/AR status, visibility, featured, updated date and publish state.
- [ ] Add search, family, publish-state, visibility, language and sort controls.
- [ ] Design loading, empty, no-results and bulk-action states.
- [ ] Design family list/editor for Knives, Scissors, Punches, Chisels and Cutters with EN/AR fields, imagery, catalogue, featured products, order and visibility.
- [ ] Design product editor sections: Identity, Media, Options, Catalogue reference, Display and Publishing.
- [ ] Add duplicate-code, missing image, missing alt text, long title, incomplete Arabic and sensitive-claim warnings.
- [ ] Design public previews for product card, product detail, family page and homepage feature.
- [ ] Design Save draft, Submit for review, Publish, Hide, Archive and permanent-delete confirmation.
- [ ] Create mobile product visibility/featured toggle and draft-review screens.

**Review gate:** the editor must contain no price, stock, rating, discount or purchase controls and must make preview/review mandatory before publish.

---

### Task 5: Catalogues and Media

**Figma areas:**
- Create: `25 Admin Catalogues & Media`

**Produces:** catalogue list/editor, upload states, media library and protected brand assets.

- [ ] Design catalogue records with family, EN/AR title, PDF, cover, description, updated date, visibility, order, filename, file size and status.
- [ ] Design Uploading, Processing, Ready, Replacement pending, Failed and Hidden states.
- [ ] Add replacement warning showing existing public-link impact.
- [ ] Design media library filters for product, category, editorial, catalogue, document and brand assets.
- [ ] Show dimensions, file size, use locations, EN/AR alt text, upload date and replacement status.
- [ ] Lock ROSA logo and protected brand assets against deletion.
- [ ] Design duplicate, oversized, unsupported, missing-alt, in-use and unsafe-crop warnings.

**Review gate:** media management must be purpose-led and prevent accidental deletion or damaging replacements.

---

### Task 6: Inquiries and General Messages

**Figma areas:**
- Create: `26 Admin Inquiries & Messages`

**Produces:** inquiry and message lists/details, status flows and mobile urgent review.

- [ ] Design separate navigation and lists for quotation inquiries and general messages.
- [ ] Inquiry list shows reference, date, customer, company, country, product count and status.
- [ ] Inquiry detail preserves submitted product snapshot, options, quantities, notes and contact data.
- [ ] Add New → Reviewed → Contacted → Closed status workflow, internal note and email action.
- [ ] Message list/detail uses New → Read → Replied → Archived and provides a route to product inquiry when appropriate.
- [ ] Design loading, empty, error and archival confirmation states.
- [ ] Design mobile inquiry and message review with reachable status update and contact actions.

**Review gate:** do not use order, cart, revenue, payment, shipping or CRM-sales terminology.

---

### Task 7: Website Content, Contact and Featured Slots

**Figma areas:**
- Create: `27 Admin Website Content`

**Produces:** structured content editor, contact editor, featured-content editor and public-location mapping.

- [ ] Design content-block list for homepage, About, Procurement Support, Contact and footer copy.
- [ ] Each block shows current published text, draft EN/AR fields, character guidance, revision history and public preview.
- [ ] Design contact-details editor for business name, address EN/AR, phone, WhatsApp, email, hours EN/AR, map and social links.
- [ ] Show every public location affected by each contact value.
- [ ] Flag unresolved placeholder values as publish warnings.
- [ ] Design featured families/products selection within fixed public slots and protected ordering.
- [ ] Add overlong-name and missing-image preview warnings.
- [ ] Isolate legal and sensitive-claim editing behind stronger warnings and confirmation.

**Review gate:** no freeform sections, page ordering, HTML, CSS, layout or component controls appear.

---

### Task 8: Publishing Centre, Review and Revision History

**Figma areas:**
- Create: `28 Admin Publishing & Review`

**Produces:** publishing queues, change review, validation, preview, success, revision history and rollback.

- [ ] Design queues for Drafts, Needs review, Ready, Recently published and Validation failures.
- [ ] Create change-summary view with previous and proposed values.
- [ ] Create validation summary separating blockers, warnings and recommendations.
- [ ] Create affected-public-locations summary and public preview launcher.
- [ ] Design final publish confirmation, success timestamp and failure state.
- [ ] Design revision history with changed fields, old/new values, saved/published time and session.
- [ ] Design rollback confirmation and restored-as-new-revision success.
- [ ] Restrict bulk publish to safe record types and show combined change summary.

**Review gate:** publish cannot be represented as an immediate save action; preview, validation and explicit confirmation remain visible.

---

### Task 9: Mobile Critical Flows and Accessibility Review

**Figma areas:**
- Modify all admin pages
- Update: `99 Handoff Notes`

**Produces:** mobile urgent flows, responsive annotations, accessibility and RTL-readiness notes.

- [ ] Confirm mobile support for overview, inquiry/message review, contact editing, product visibility/featured controls and publishing confirmation.
- [ ] Replace desktop tables with stacked records rather than compressed tables.
- [ ] Annotate keyboard focus, persistent labels, errors, destructive confirmations, session expiry and unsaved changes.
- [ ] Annotate tablet collapse points, sidebar behaviour and form-column changes.
- [ ] Annotate future RTL shell mirroring, EN/AR field order, directional icon mirroring and long-label support.
- [ ] Verify all primary controls reach 44 px and no task depends on hover alone.

**Review gate:** critical admin tasks must remain practical on mobile without pretending complex bulk media work belongs there.

---

### Task 10: Admin Prototype and Final Audit

**Figma areas:**
- Create: `30 Admin Prototype`
- Modify all Phase 4 pages

**Produces:** complete clickable admin journey and verified handoff package.

- [ ] Assemble top-level prototype frames for desktop and mobile critical journeys.
- [ ] Link Login → Overview → Add Product → Validation → Public Preview → Publish.
- [ ] Link Overview → Inquiry → Status update.
- [ ] Link Overview → Contact Details → Save draft → Review → Publish.
- [ ] Link Website Content → Review draft → Publish.
- [ ] Link Publishing → Revision history → Rollback.
- [ ] Link Settings → Sign out → Login.
- [ ] Run visual review of overview, product editor, inquiry detail, publishing centre and mobile critical flows.
- [ ] Run structural audit for required screens/states, text overflow, interactive target sizes and prototype interactions.
- [ ] Record one repository milestone only after the audit passes.

## Completion Criteria

Phase 4 is complete only when:

- Every approved public editable field maps to a controlled admin field.
- Public design controls remain inaccessible.
- EN/AR product, family and content workflows exist.
- Inquiry and message systems remain separate.
- Review, preview, publish and rollback are represented.
- Placeholder and sensitive-claim safeguards are visible.
- Desktop and mobile critical flows exist.
- Required empty, loading, validation, failure, success, unsaved and destructive states exist.
- No clipped text or undersized primary controls remain.
- Prototype interactions complete the required admin journeys.
- The dashboard visually correlates with Rosa while remaining operational and credible.
