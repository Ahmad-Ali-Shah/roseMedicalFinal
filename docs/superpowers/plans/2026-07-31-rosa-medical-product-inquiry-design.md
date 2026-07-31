# Rosa Medical Product & Inquiry Design Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the approved Rosa Medical homepage into a complete, professional product-discovery and quotation-request journey across desktop and mobile.

**Architecture:** Keep the approved homepage on Figma page `05 Homepage Hi-Fi` as the visual source of truth. Build the rest of the public buying flow as reusable Figma components and screen templates, then annotate data requirements and interaction states for later React/Supabase implementation.

**Tech Stack:** Figma Design, Figma variables/styles, Auto Layout, reusable components, desktop 1440 px frames, mobile 390 px frames, English-first RTL-ready content structure.

## Global Constraints

- The supplied ROSA logo remains unchanged and must not receive a “Medical” lockup.
- Public positioning remains “medical instruments supplier and procurement partner.”
- Primary product navigation is by instrument family: Knives, Scissors, Punches, Chisels, Cutters.
- The visual direction remains editorial-first, mostly light, premium, restrained, and credible for medical procurement.
- Rosa red is an accent, not a dominant page background.
- Do not introduce prices, ratings, discounts, fake availability, fake certifications, fake statistics, testimonials, or ecommerce language.
- Product images remain replaceable placeholders until real assets are supplied.
- The site remains quotation-led, not direct ecommerce.
- English screens are designed now; Arabic and full RTL adaptation remain a later phase.
- Admin dashboard design is excluded from this phase.
- Commits are created only at meaningful milestones, not for every trivial Figma edit.

---

## Phase Scope

This phase includes:

- Product-system components
- Products overview page
- Instrument-family category template
- Product search and filtering states
- Product detail page
- Catalogue downloads page
- Inquiry basket
- Request quotation form
- Submission confirmation
- Empty, loading, validation, and error states
- Desktop and mobile layouts
- Clickable prototype and developer handoff annotations

This phase excludes:

- Admin dashboard
- Arabic screens
- About and contact page redesign
- Authentication
- Public prices
- Customer accounts
- Direct payments
- Inventory management

---

### Task 1: Product Information Model and Design Inventory

**Figma areas:**
- Modify: `02 Components`
- Modify: `99 Handoff Notes`
- Reference: `05 Homepage Hi-Fi`
- Reference: `07 Phase 2 Planning`

**Produces:**
- Approved product-field inventory
- Approved category-field inventory
- Component/state list for all later screens

- [ ] **Step 1: Define product fields**

Document these exact fields in the handoff page:

- Product name
- Product code
- Instrument family
- Short description
- Main image
- Gallery images
- Available sizes
- Available variants
- Direction or shape where applicable
- Quantity
- Catalogue reference
- Visibility status for future admin use
- Featured status for future admin use

- [ ] **Step 2: Define category fields**

Document:

- Family name
- Short introduction
- Category hero image
- Product count
- Sort order
- Catalogue PDF
- Featured products

- [ ] **Step 3: Define screen-state inventory**

List the required states:

- Default
- Hover
- Keyboard focus
- Selected
- Added to inquiry
- Empty
- Loading
- No search results
- Validation error
- Submission success
- Submission failure

- [ ] **Step 4: Review against homepage components**

Confirm that every existing homepage product card, category tile, catalogue card, header, and CTA can evolve into the new system without changing the visual language.

**Review gate:** no product field may be decorative or unsupported by the current catalogue structure.

---

### Task 2: Product Component System

**Figma areas:**
- Modify: `02 Components`

**Produces:**
- Product card variants
- Filter controls
- Search control
- Quantity and variant controls
- Inquiry status feedback

- [ ] **Step 1: Build product card variants**

Create reusable components for:

- Standard card
- Compact list card
- Featured card
- Added-to-inquiry state
- Unavailable-image state

Each card contains only:

- Image
- Family label
- Product name
- Product code
- Size or variant summary
- View details
- Add to inquiry where appropriate

- [ ] **Step 2: Build search and filter controls**

Create:

- Search field with clear action
- Family select
- Size select
- Variant select
- Sort select
- Mobile filter trigger
- Active-filter summary
- Clear filters action

Avoid decorative filter chips and excessive pill styling.

- [ ] **Step 3: Build product-detail controls**

Create:

- Image thumbnail selector
- Size selector
- Variant selector
- Quantity stepper
- Add to Inquiry button
- Added confirmation
- Catalogue-reference link

- [ ] **Step 4: Build inquiry-line component**

Include:

- Product thumbnail
- Name and code
- Chosen size/variant
- Editable quantity
- Optional line note
- Remove action

**Review gate:** all components must match the homepage’s typography, border weight, corner treatment, spacing, and restrained motion.

---

### Task 3: Products Overview Page

**Figma areas:**
- Create page: `08 Products Overview`

**Produces:**
- Desktop products overview
- Mobile products overview

- [ ] **Step 1: Design desktop page header**

Include:

- Solid white navigation state
- Breadcrumb where useful
- Editorial page title
- Concise procurement-focused introduction
- Search entry point

- [ ] **Step 2: Present the five product families**

Use an editorial layout rather than five identical small cards. Preserve the visual rhythm established on the homepage while making each family useful as a navigation destination.

- [ ] **Step 3: Add representative products**

Show a restrained product grid with clear product codes and direct inquiry access.

- [ ] **Step 4: Add catalogue support**

Provide a compact path to the five downloadable catalogues without turning the page into a document archive.

- [ ] **Step 5: Design mobile composition**

Ensure category discovery, search, and inquiry access remain obvious within the first screenfuls.

**Review gate:** the page must feel like a continuation of the homepage, not a separate catalogue template.

---

### Task 4: Instrument-Family Category Template

**Figma areas:**
- Create page: `09 Category Template`

**Produces:**
- Desktop category listing
- Mobile category listing
- Filter and no-result states

- [ ] **Step 1: Design category introduction**

Include:

- Family name
- Short verified-style description placeholder
- Product count
- Catalogue download action
- Supporting category image placeholder

- [ ] **Step 2: Design desktop listing system**

Use a restrained two-area layout:

- Compact filter/sort area
- Product results grid

- [ ] **Step 3: Design mobile filter behavior**

Use a filter drawer or sheet. Do not permanently consume mobile width with a sidebar.

- [ ] **Step 4: Design result states**

Create:

- Default results
- Loading skeleton
- No results
- Search mismatch
- Filtered results

- [ ] **Step 5: Confirm scalability**

The template must handle small and large product counts without redesign.

**Review gate:** filtering remains practical and quiet; it must not dominate product discovery.

---

### Task 5: Product Detail Page

**Figma areas:**
- Create page: `10 Product Detail`

**Produces:**
- Desktop product detail
- Mobile product detail
- Variant and gallery states

- [ ] **Step 1: Design product media area**

Include:

- Main image placeholder
- Supporting thumbnails
- Image zoom affordance
- Safe layout for portrait and landscape product images

- [ ] **Step 2: Design procurement information area**

Include:

- Family
- Product name
- Product code
- Short technical description
- Size options
- Variant options
- Quantity
- Add to Inquiry
- Catalogue reference

- [ ] **Step 3: Design specification section**

Use a readable technical table or definition-list treatment for dimensions and options.

- [ ] **Step 4: Design related products**

Show a limited same-family selection. Avoid algorithmic-looking carousels unless required by space.

- [ ] **Step 5: Design mobile sticky action**

Keep Add to Inquiry accessible without covering content or reducing readability.

**Review gate:** the page must feel premium while prioritising exact product information over decoration.

---

### Task 6: Catalogue Downloads Page

**Figma areas:**
- Create page: `11 Catalogues`

**Produces:**
- Desktop catalogue page
- Mobile catalogue page

- [ ] **Step 1: Design editorial catalogue introduction**

Explain that the catalogues support technical browsing and quotation preparation.

- [ ] **Step 2: Present five catalogue documents**

For each family, show:

- Family name
- Cover placeholder
- Short description
- PDF format indication
- View/download action
- Updated-date placeholder field

- [ ] **Step 3: Add cross-navigation**

Allow users to move from a catalogue to the corresponding web product family.

- [ ] **Step 4: Design mobile layout**

Keep cards readable without oversized cover art or excessive vertical waste.

**Review gate:** the page must remain part of the product experience, not resemble a generic downloads directory.

---

### Task 7: Inquiry Basket

**Figma areas:**
- Create page: `12 Inquiry Basket`

**Produces:**
- Desktop inquiry basket
- Mobile inquiry basket
- Empty basket state

- [ ] **Step 1: Design basket header**

Include item count, concise explanation, and continue-browsing access.

- [ ] **Step 2: Design inquiry-line editing**

Users can:

- Review product
- Change quantity
- Change variant where valid
- Add line notes
- Remove item

- [ ] **Step 3: Design inquiry summary**

Show:

- Total unique products
- Total quantity
- Continue browsing
- Proceed to quotation request

Do not show money totals.

- [ ] **Step 4: Design empty basket state**

Use direct guidance back to product families. Avoid decorative illustration unless it supports the brand.

- [ ] **Step 5: Design mobile behavior**

Keep product details readable and actions reachable without dense table layouts.

**Review gate:** users must understand that this is an inquiry list, not a shopping cart.

---

### Task 8: Request Quotation Form and Confirmation

**Figma areas:**
- Create page: `13 Request Quotation`

**Produces:**
- Desktop quotation form
- Mobile quotation form
- Validation states
- Success and failure states

- [ ] **Step 1: Design form structure**

Required fields:

- Customer name
- Company name
- Email
- Telephone
- Country
- General request notes

Include a read-only summary of selected products.

- [ ] **Step 2: Design validation**

Create clear inline validation for:

- Missing required field
- Invalid email
- Invalid telephone format
- Empty inquiry
- Submission failure

- [ ] **Step 3: Design confirmation state**

Show:

- Clear success message
- Inquiry reference placeholder
- Confirmation-email notice
- Return to products
- Return home

- [ ] **Step 4: Design mobile flow**

Keep product summary collapsible but always recoverable before submission.

**Review gate:** the form must feel trustworthy, concise, and businesslike rather than like a lead-generation template.

---

### Task 9: Responsive, Accessibility, and RTL-Readiness Review

**Figma areas:**
- Modify all Phase 2 pages
- Modify: `99 Handoff Notes`

**Produces:**
- Final responsive states
- Accessibility annotations
- RTL-readiness annotations

- [ ] **Step 1: Review typography and spacing**

Confirm readable mobile body sizes, heading hierarchy, and no text collisions.

- [ ] **Step 2: Review interaction accessibility**

Annotate:

- Keyboard focus
- Tap targets
- Form labels
- Error association
- Reduced-motion alternatives

- [ ] **Step 3: Review responsive image behavior**

Confirm all placeholders support real assets with safe cropping.

- [ ] **Step 4: Review RTL readiness**

Confirm:

- Flexible text widths
- Mirrored directional controls
- Non-directional icon choices where possible
- Forms remain usable when labels expand

**Review gate:** no screen may depend on hover alone or English-only spatial assumptions.

---

### Task 10: Prototype and Developer Handoff

**Figma areas:**
- Modify all Phase 2 pages
- Modify: `99 Handoff Notes`

**Produces:**
- Clickable prototype
- Component and data annotations
- Final design-review package

- [ ] **Step 1: Link the complete buyer journey**

Prototype:

> Homepage → Products overview → Category → Product detail → Add to Inquiry → Inquiry basket → Request quotation → Confirmation

- [ ] **Step 2: Add interaction notes**

Document:

- Header state change
- Search behavior
- Filter drawer
- Add-to-inquiry feedback
- Basket updates
- Form validation
- Confirmation behavior

- [ ] **Step 3: Add implementation data notes**

Map visible UI fields to future product, category, catalogue, inquiry, and contact records.

- [ ] **Step 4: Run final design review**

Check:

- Visual consistency with approved homepage
- No filler content
- No unsupported claims
- Product discovery clarity
- Inquiry conversion clarity
- Mobile quality
- Placeholder replacement safety
- Accessibility
- RTL readiness

- [ ] **Step 5: Create one milestone repository update**

Update project documentation only after the Phase 2 design package passes final review.

---

## Completion Criteria

Phase 2 is complete only when:

- A buyer can browse all five instrument families.
- A buyer can search and filter a family listing.
- A buyer can understand a product’s code, sizes, and variants.
- A buyer can add products to an inquiry and edit them.
- A buyer can submit a complete quotation request.
- Desktop and mobile flows are both designed.
- Empty, loading, validation, success, and failure states exist.
- The design remains visually consistent with the approved homepage.
- All screens are implementation-ready and Arabic-ready without yet designing the Arabic version.
