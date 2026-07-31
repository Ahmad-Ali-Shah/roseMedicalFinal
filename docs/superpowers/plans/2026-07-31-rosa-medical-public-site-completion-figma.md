# Rosa Medical Public Site Completion — Figma Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the remaining Rosa Medical public-site design system in Figma, including global navigation, search, About, Procurement Support, Contact, footer, legal templates, responsive states, prototype links, and final handoff annotations.

**Architecture:** Use the approved homepage and completed Phase 2 buyer journey as immutable visual benchmarks. Build shared global components first, then page groups in dependency order, then assemble a dedicated public-site prototype and run a structural audit across desktop and mobile source screens and prototype clones.

**Tech Stack:** Figma Design, Figma Plugin API, reusable components, Auto Layout-ready structure, desktop 1440 px frames, mobile 390 px frames, Lora editorial typography, Inter interface typography, English-first RTL-ready layouts.

## Global Constraints

- The supplied ROSA logo remains unchanged; do not add “Medical” to the logo.
- Public positioning remains “medical instruments supplier and procurement partner.”
- New work must match the existing `05 Homepage Hi-Fi`, `06 Mobile`, and Phase 2 system.
- Visual direction remains editorial-first, mostly light, premium, restrained, and procurement-focused.
- Rosa red is a controlled accent, not a dominant page background.
- Lora is used for editorial headings; Inter is used for navigation, body, forms, data, and controls.
- Do not introduce unverified manufacturing, factory, certification, registration, history, statistics, awards, partnerships, ownership, or clinical claims.
- Do not mention Rosa Sanitaryware, Rosa International, Throhi, a Rosa family, or ownership structures.
- Contact details, photography, map location, social links, and legal content remain clearly annotated placeholders.
- General contact and quotation inquiry remain separate systems.
- No blog, careers, newsletter, testimonials, prices, payments, accounts, or inventory features are added.
- Arabic high-fidelity screens remain out of scope, but every new layout must be RTL-ready.
- Interactive targets must be at least 44 px where practical.
- No hover-only behavior.
- Commits are created only for meaningful documentation milestones.

---

## Figma Page Map

Create or update these exact pages:

- Modify: `02 Components`
- Modify: `99 Handoff Notes`
- Create: `15 Global Navigation & Search`
- Create: `16 About`
- Create: `17 Procurement Support`
- Create: `18 Contact`
- Create: `19 Footer & Legal`
- Create: `20 Public Site Prototype`

Each public content page must contain both a `Desktop` and a `Mobile` top-level frame.

---

### Task 1: Global Navigation, Mega-menu, Mobile Menu, and Search System

**Figma areas:**
- Modify: `02 Components`
- Create: `15 Global Navigation & Search`

**Consumes:**
- Header typography, spacing, border, and button language from the approved homepage and Phase 2 screens.
- Five product families: Knives, Scissors, Punches, Chisels, Cutters.

**Produces:**
- Desktop header states
- Products mega-menu
- Mobile navigation sheet
- Desktop search overlay
- Mobile search screen
- Search default, typing, results, loading, no-results, and error states

- [ ] **Step 1: Build solid desktop header**

Create a 1440 px header with:

- ROSA logo
- Products
- Catalogues
- About
- Contact
- Search
- Inquiry count

Use a white background, near-black text, thin bottom border, and restrained active state.

- [ ] **Step 2: Build products mega-menu**

Create a navigation-first panel containing:

- Knives
- Scissors
- Punches
- Chisels
- Cutters
- Browse all products
- Download catalogues
- One optional image placeholder area

Do not add promotional copy, badges, fake counts, prices, or decorative cards.

- [ ] **Step 3: Build mobile menu sheet**

Create a full-height 390 px navigation sheet with:

- Close action
- Products expandable group
- Five product families
- Catalogues
- About
- Procurement Support
- Contact
- Search
- Inquiry count
- Future language-switcher location

Ensure logical reading order and 44 px minimum tap targets.

- [ ] **Step 4: Build desktop search overlay**

Create a calm large overlay with:

- Search input
- Close action
- Family shortcuts in default state
- Product result rows
- Product image placeholder
- Family
- Product name
- Product code
- Size/variant summary
- View product
- Add to inquiry where appropriate

- [ ] **Step 5: Build search state frames**

Create separate clearly labelled states:

- Search / Default
- Search / Typing
- Search / Results
- Search / Loading
- Search / No Results
- Search / Error

- [ ] **Step 6: Build mobile search screen**

Keep search input and close action fixed at the top of the screen while results flow below.

**Review gate:** navigation and search must remain quieter than page content and must not resemble an ecommerce promotion layer.

---

### Task 2: About Rosa Page

**Figma areas:**
- Create: `16 About`

**Consumes:**
- Shared header and footer components
- Approved positioning and placeholder policy

**Produces:**
- About / Desktop
- About / Mobile

- [ ] **Step 1: Create editorial introduction**

Include:

- Breadcrumb
- Small red section label
- Heading describing Rosa Medical as a supplier and procurement partner
- Concise supporting paragraph
- One large replaceable editorial image placeholder

- [ ] **Step 2: Create buyer-expectation section**

Present these five operational expectations without generic service-card styling:

- Clear product codes
- Organised instrument families
- Catalogue access
- Structured quotation requests
- Responsive communication

- [ ] **Step 3: Create audience section**

Include:

- Hospitals and clinics
- Procurement teams
- Distributors and wholesalers
- International buyers

- [ ] **Step 4: Create compact product-family navigation**

Link to Knives, Scissors, Punches, Chisels, and Cutters using a compact editorial list or grid consistent with the homepage.

- [ ] **Step 5: Create procurement CTA**

Provide:

- Procurement Support
- Browse Products
- Request a Quote

- [ ] **Step 6: Adapt to mobile**

Stack image and copy in logical reading order; ensure headings wrap naturally and all links remain reachable.

**Review gate:** no founder, history, mission, vision, factory, certification, testimonial, or statistics content may appear.

---

### Task 3: Procurement Support Page

**Figma areas:**
- Create: `17 Procurement Support`

**Produces:**
- Procurement Support / Desktop
- Procurement Support / Mobile

- [ ] **Step 1: Create editorial introduction**

Explain that the page helps buyers identify instruments, organise requirements, and prepare quotation requests.

- [ ] **Step 2: Create six-step procurement process**

Use a composed numbered sequence for:

1. Browse by family
2. Review codes and options
3. Add products to inquiry
4. Add line or general notes
5. Submit contact details
6. Receive confirmation and follow-up

Avoid decorative timeline graphics.

- [ ] **Step 3: Create requirement-type section**

Include:

- Product-specific inquiry
- Multiple-product list
- Catalogue-led inquiry
- Unlisted product request

- [ ] **Step 4: Create response-information checklist**

Include:

- Product codes
- Sizes
- Variants
- Quantities
- Destination country
- Packing, finish, and additional notes

- [ ] **Step 5: Create support CTA**

Provide:

- Browse products
- Open inquiry
- Contact Rosa

- [ ] **Step 6: Adapt to mobile**

Use a vertical numbered sequence with no horizontal dependence.

**Review gate:** page must be operational, not consultancy-style, and must contain no response-time promises.

---

### Task 4: Contact Page and General Contact Form States

**Figma areas:**
- Create: `18 Contact`

**Produces:**
- Contact / Desktop
- Contact / Mobile
- Contact form focus, validation, loading, success, and failure states

- [ ] **Step 1: Create contact introduction**

Include a clear statement that general messages use this form while product quotation requests use the inquiry flow.

- [ ] **Step 2: Create contact-details column**

Use visibly annotated placeholders for:

- Business name
- Saudi address
- Telephone
- WhatsApp
- Email
- Working hours
- Social links
- Map location

- [ ] **Step 3: Create general contact form**

Fields:

- Name
- Company
- Email
- Telephone
- Country
- Subject
- Message

- [ ] **Step 4: Create form states**

Create separate examples for:

- Default
- Focus
- Validation error
- Submission loading
- Submission success
- Submission failure

- [ ] **Step 5: Create map/image placeholder**

Use a restrained replaceable block and annotate that final map integration is not part of the design phase.

- [ ] **Step 6: Adapt to mobile**

Order content as contact details first, form second, map/image last.

**Review gate:** contact page must not duplicate the quotation form and must not contain fake branch details.

---

### Task 5: Footer System and Legal Templates

**Figma areas:**
- Create: `19 Footer & Legal`
- Modify: `02 Components`

**Produces:**
- Footer / Desktop
- Footer / Mobile
- Privacy Policy / Desktop
- Privacy Policy / Mobile
- Terms / Desktop
- Terms / Mobile

- [ ] **Step 1: Build desktop footer**

Include:

- ROSA logo
- Short supplier/procurement description
- Products links
- Company links
- Support links
- Contact placeholders
- Policies
- Future language control

Keep the footer compact and avoid newsletters, badges, social feeds, and excessive links.

- [ ] **Step 2: Build mobile footer**

Reflow groups in a clear vertical order with expandable-group behavior annotated only where needed.

- [ ] **Step 3: Build Privacy Policy template**

Include:

- Last-updated placeholder
- Desktop contents navigation
- Mobile section navigation
- Information collected
- How information is used
- Inquiry and contact submissions
- Email communication
- Data storage
- Cookies/analytics placeholder
- Third-party services placeholder
- Data rights/contact route
- Policy updates

- [ ] **Step 4: Build Terms template**

Include:

- Website purpose
- Product information
- Quotation requests
- No public pricing
- No contract formed by inquiry submission
- Accuracy and availability disclaimer
- Intellectual property
- External links
- Limitation placeholder
- Governing-law placeholder
- Contact

- [ ] **Step 5: Annotate legal review requirements**

Clearly mark all legal content as template copy requiring client/legal review. This annotation must live in Figma handoff notes, not as a misleading public claim.

**Review gate:** legal content must be readable, narrow-column, and visibly treated as a template rather than final legal advice.

---

### Task 6: Shared Responsive, Accessibility, Content, and RTL Handoff

**Figma areas:**
- Modify: `99 Handoff Notes`
- Modify all Phase 3 pages

**Produces:**
- Phase 3 handoff board
- Tablet behavior notes
- Accessibility notes
- Placeholder inventory
- RTL-readiness notes

- [ ] **Step 1: Document responsive transitions**

Specify:

- 1240–1280 px desktop content width
- Two-column to one-column collapse
- Mega-menu adaptation
- Footer reflow
- Form-column collapse
- Search-panel sizing
- 24 px mobile margins where possible

- [ ] **Step 2: Document accessibility behavior**

Specify:

- Visible keyboard focus
- Skip-to-content link
- Semantic heading order
- Search-result announcements
- Associated error messages
- Meaningful close labels
- Reduced-motion alternatives
- Logical mobile reading order

- [ ] **Step 3: Document RTL behavior**

Specify:

- Mirrored mega-menu columns
- Reversed search-result layout
- Mirrored directional arrows
- Flexible navigation widths
- Footer group reordering
- Longer Arabic labels
- Locale-aware telephone and country inputs

- [ ] **Step 4: Document placeholder records**

Inventory:

- Address
- Telephone
- WhatsApp
- Email
- Working hours
- Social links
- Map location
- Photography
- Legal-review fields

**Review gate:** no English-only spatial assumption may remain unannotated.

---

### Task 7: Public Site Prototype

**Figma areas:**
- Create: `20 Public Site Prototype`

**Produces:**
- Desktop public-site prototype flow
- Mobile public-site prototype flow

- [ ] **Step 1: Assemble prototype clones on one page**

Include top-level clones for:

- Homepage
- Products overview
- About
- Procurement Support
- Contact
- Contact success
- Privacy Policy
- Terms

Include navigation/search state frames beside the journey.

- [ ] **Step 2: Link desktop navigation**

Demonstrate:

- Products mega-menu
- Search open
- Search results
- Search no-results
- Homepage to About
- Homepage to Procurement Support
- Homepage to Contact
- Contact form success
- Footer to Privacy Policy
- Footer to Terms
- Return to Products
- Return to Inquiry

- [ ] **Step 3: Link mobile navigation**

Demonstrate:

- Menu open/close
- Products group expansion
- Search screen
- About
- Procurement Support
- Contact
- Contact success
- Policies

- [ ] **Step 4: Preserve Phase 2 prototype**

Do not modify or break the existing Phase 2 buyer journey.

**Review gate:** every prototype destination must be a top-level frame on the prototype page and every primary path must have a return route.

---

### Task 8: Final Visual and Structural Audit

**Figma areas:**
- Review every Phase 3 source frame and prototype clone

**Produces:**
- Clean final audit
- One final repository milestone document

- [ ] **Step 1: Run visual screenshot review**

Inspect desktop and mobile versions of:

- About
- Procurement Support
- Contact
- Privacy Policy
- Terms
- Global navigation/search
- Footer

Check hierarchy, density, clipping, and consistency with the approved homepage.

- [ ] **Step 2: Run automated structural audit**

Confirm:

- Zero text overflows
- Zero interactive frames below 44 px unless semantically non-interactive
- Desktop/mobile coverage for every required page
- Search states all exist
- Contact form states all exist
- Footer desktop/mobile exist
- Privacy and Terms desktop/mobile exist
- Prototype reactions exist

- [ ] **Step 3: Repair every audit failure**

Fix source screens and corresponding prototype clones, then rerun the audit until the verdict is `PASS`.

- [ ] **Step 4: Record one repository milestone**

Create one completion document summarizing Figma pages, prototype node, audit results, exclusions, and next phase.

---

## Completion Criteria

Phase 3 is complete only when:

- Desktop and mobile About pages exist.
- Desktop and mobile Procurement Support pages exist.
- Desktop and mobile Contact pages exist.
- General contact and quotation inquiry are clearly separated.
- Desktop header, mega-menu, mobile menu, and all search states exist.
- Desktop and mobile footer systems exist.
- Desktop and mobile Privacy Policy and Terms templates exist.
- Contact form states include focus, validation, loading, success, and failure.
- Accessibility, responsive, placeholder, content, and RTL notes are complete.
- The Phase 2 buyer journey remains intact.
- The Phase 3 public-site prototype works.
- Final audit reports zero text overflows and zero undersized interactive controls.
- New screens visually match the approved homepage and Phase 2 system.
- No unsupported claims or filler sections appear.
