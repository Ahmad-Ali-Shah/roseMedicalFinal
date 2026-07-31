# Rosa Medical Public Site Completion — Design Specification

Date: 2026-07-31
Status: Design approved in principle through continuation of the established Rosa Medical direction; awaiting written-spec review before implementation planning
Repository: `manbtd0-cloud/RosaMedical`
Figma source of truth: `https://www.figma.com/design/L7LKGItaD2o6tZzHuw1GUQ`

## 1. Goal

Complete the remaining public-facing Rosa Medical website system without weakening the approved homepage or the completed product-to-quotation journey.

This phase must produce a coherent corporate and support layer around the existing catalogue experience:

- About Rosa
- Procurement Support
- Contact
- Global products mega-menu
- Global search experience
- Footer system
- Privacy Policy
- Terms
- Shared navigation and responsive states
- Shared loading, empty, validation, and error behavior where applicable

The result must feel like one professionally designed website, not a homepage plus unrelated templates.

## 2. Fixed design benchmark

The following existing Figma work is binding:

- `05 Homepage Hi-Fi`
- `06 Mobile`
- Phase 2 product and inquiry pages
- Phase 2 buyer-journey prototype
- Existing foundations, components, handoff notes, accessibility rules, and RTL-readiness rules

New screens must inherit:

- Editorial-first composition
- Mostly light backgrounds
- Rosa red as a controlled accent
- Near-black typography
- Warm-white and steel-grey support colours
- Lora for editorial headings
- Inter for navigation, body, product data, forms, and controls
- Thin borders
- Minimal corner radii
- Restrained shadows
- Large but disciplined spacing
- Product and procurement credibility over decorative storytelling

The supplied ROSA logo remains unchanged. Do not add “Medical” to the logo.

## 3. Considered approaches

### Approach A — Separate corporate pages

Each remaining page would behave as an independent corporate template with conventional hero, content cards, and contact sections.

**Advantage:** quick to design and straightforward to implement.

**Problem:** likely to feel generic and disconnected from the approved editorial catalogue experience.

### Approach B — Full editorial storytelling

The About and Procurement pages would rely heavily on large photography, narrative sections, and expressive layouts.

**Advantage:** strong visual presence.

**Problem:** the client currently lacks verified company history, original photography, factory evidence, certifications, and detailed operational claims. This approach would encourage filler content or unsupported claims.

### Approach C — Integrated public-site system — selected

Use the existing editorial language, but keep every new section operationally useful. Corporate content remains concise, image-ready, and procurement-focused. Navigation, search, contact, and policies become shared systems rather than isolated pages.

**Why selected:** it preserves visual quality while remaining credible with limited verified content and placeholder assets.

## 4. Public positioning

Rosa Medical continues to present itself as:

> A medical instruments supplier and procurement partner.

Public language may describe:

- Product discovery
- Catalogue support
- Requirement organisation
- Quotation preparation
- Buyer communication
- Support for hospitals, clinics, distributors, wholesalers, and international buyers

Public language must not claim unverified:

- Manufacturing ownership
- Factory facilities
- Regulatory approvals
- Certifications
- Export statistics
- Years of experience
- Awards
- Clinical outcomes
- Exclusive partnerships
- Ownership relationships

Do not mention Rosa Sanitaryware, Rosa International, Throhi, a Rosa family, or any ownership structure.

## 5. Global navigation system

### 5.1 Desktop header

The header must support two states:

1. Transparent over the homepage hero
2. Solid white on inner pages and after homepage scrolling

Primary items:

- Products
- Catalogues
- About
- Contact
- Search
- Inquiry count

The ROSA logo remains visually dominant enough to identify the brand, but navigation must stay quiet.

### 5.2 Products mega-menu

The Products item opens a restrained mega-menu containing:

- Knives
- Scissors
- Punches
- Chisels
- Cutters
- Browse all products
- Download catalogues
- One optional image placeholder or representative product area

The mega-menu must prioritize navigation. It must not contain promotional copy, badges, fake counts, discounts, or decorative content blocks.

### 5.3 Mobile navigation

The mobile menu opens as a full-height sheet or panel with:

- Products expandable group
- Catalogues
- About
- Procurement Support
- Contact
- Search
- Inquiry count
- Future language switcher location

The inquiry action remains reachable without making the menu feel like ecommerce.

## 6. Global search experience

Search is a focused utility, not a decorative overlay.

### 6.1 Search entry

Desktop:

- Header search opens a large, calm overlay or dedicated search panel
- Keyboard focus moves directly into the input
- Escape closes the panel

Mobile:

- Search opens a full-width screen or sheet
- Input and close action remain visible above results

### 6.2 Search coverage

Initial search covers:

- Product name
- Product code
- Instrument family
- Size or variant text where indexed
- Catalogue family

### 6.3 Search states

Required states:

- Empty/default with useful family shortcuts
- Typing
- Results
- No results
- Loading
- Search error

Results show only useful fields:

- Product image placeholder
- Family
- Product name
- Product code
- Size or variant summary
- View product
- Add to inquiry where appropriate

## 7. About Rosa page

The About page must be concise, credible, and safe for later client editing.

### 7.1 Page purpose

Explain what Rosa Medical does, whom it supports, and how the website helps buyers.

### 7.2 Approved section structure

1. Editorial page introduction
   - Rosa Medical as a medical-instrument supplier and procurement partner
   - One large replaceable image placeholder

2. What buyers can expect
   - Clear product codes
   - Organised instrument families
   - Catalogue access
   - Structured quotation requests
   - Responsive communication

3. Who the website serves
   - Hospitals and clinics
   - Procurement teams
   - Distributors and wholesalers
   - International buyers

4. Product-family overview
   - Compact links to Knives, Scissors, Punches, Chisels, and Cutters

5. Procurement-support CTA
   - Link to Procurement Support
   - Link to Products
   - Request a Quote

### 7.3 Exclusions

Do not add:

- Founder biographies
- Team profiles
- Company timeline
- Fake history
- Factory footage claims
- Mission/vision filler
- Fake statistics
- Testimonials
- Certification logos

These may be added later only when verified content exists.

## 8. Procurement Support page

This page explains the buyer process without repeating the homepage.

### 8.1 Page purpose

Help buyers understand how to identify products, prepare quantities and variants, submit requirements, and receive a quotation.

### 8.2 Approved structure

1. Editorial introduction
2. Procurement process
   - Browse by family
   - Review codes and options
   - Add products to inquiry
   - Add line or general notes
   - Submit contact details
   - Receive confirmation and follow-up
3. Common requirement types
   - Product-specific inquiry
   - Multiple-product list
   - Catalogue-led inquiry
   - Unlisted product request
4. Information that helps Rosa respond
   - Product codes
   - Sizes
   - Variants
   - Quantities
   - Destination country
   - Packing, finish, or other notes
5. Support CTA
   - Browse products
   - Open inquiry
   - Contact Rosa

### 8.3 Tone

The page must feel operational and composed. Avoid decorative timelines, generic service cards, consulting language, or promises about response time unless confirmed.

## 9. Contact page

### 9.1 Page purpose

Provide direct company-contact routes and a simple non-product-specific message form.

### 9.2 Contact information fields

Use clearly marked placeholders until confirmed:

- Business name
- Saudi address
- Telephone
- WhatsApp
- Email
- Working hours
- Social links
- Map location

These fields must later be editable through the admin dashboard.

### 9.3 Contact form

Fields:

- Name
- Company
- Email
- Telephone
- Country
- Subject
- Message

The form is for general contact only. Product quotation requests must be directed to the inquiry flow.

### 9.4 Form states

- Default
- Focus
- Validation error
- Submission loading
- Submission success
- Submission failure

### 9.5 Layout

Desktop:

- Editorial introduction
- Contact details in one controlled column
- Form in a larger primary column
- Optional map/image placeholder below or beside details

Mobile:

- Contact details first
- Form second
- No dense two-column compression

## 10. Footer system

The footer must be reusable across all public pages.

### 10.1 Content groups

- ROSA logo
- Short supplier/procurement description
- Products
- Company
- Support
- Contact
- Policies
- Future language control

### 10.2 Product links

- Knives
- Scissors
- Punches
- Chisels
- Cutters
- Catalogues

### 10.3 Company/support links

- About
- Procurement Support
- Contact
- Inquiry
- Privacy Policy
- Terms

### 10.4 Contact placeholders

- Address
- Email
- Telephone
- Working hours

The footer must remain compact enough to feel professional. Avoid newsletter signup, fake awards, trust badges, app links, social feeds, and excessive link density.

## 11. Privacy Policy and Terms

The design phase provides professional legal-document templates, not final legal advice.

### 11.1 Privacy Policy template sections

- Information collected
- How information is used
- Inquiry and contact submissions
- Email communication
- Data storage
- Cookies or analytics placeholder
- Third-party services placeholder
- Data rights/contact route
- Policy updates

### 11.2 Terms template sections

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

Every legal placeholder must be visibly marked for client/legal review. Do not present placeholder text as finalized legal policy.

### 11.3 Legal-page layout

- Solid white header
- Narrow readable content column
- Sticky or compact contents navigation on desktop
- Simple in-page section navigation on mobile
- Last-updated placeholder
- Contact/legal review note in handoff annotations, not public-facing copy

## 12. Global responsive behavior

### 12.1 Desktop

- 1440 px design frame
- 1240–1280 px main content width
- 12-column grid
- Solid white inner-page header

### 12.2 Mobile

- 390 px design frame
- 24 px page margins where possible
- 4-column grid
- Minimum practical 44 px interactive targets
- No hover-only functionality
- Editorial headings wrap naturally and expand their frames

### 12.3 Tablet readiness

No separate high-fidelity tablet screen is required for every page, but handoff notes must specify:

- Grid collapse points
- Two-column to one-column transitions
- Mega-menu adaptation
- Footer reflow
- Form-column collapse
- Search-panel sizing

## 13. Accessibility

All new screens must include:

- Visible keyboard focus
- Semantic heading hierarchy
- Strong contrast
- Form labels that remain visible
- Error text associated with the relevant field
- Search results announced conceptually for later implementation
- Close buttons with meaningful labels
- No hover-only navigation
- Reduced-motion alternatives
- Clear skip-to-content implementation note
- Logical mobile reading order

## 14. Arabic and RTL readiness

Arabic screens remain a later phase, but Phase 3 must not create English-only constraints.

Requirements:

- Flexible navigation widths
- Mega-menu columns that can mirror
- Search-result layout that can reverse
- Non-directional icons where possible
- Directional arrows mirrored in RTL
- Contact and legal layouts that support longer Arabic labels
- Footer groups that can reorder cleanly
- Forms with locale-aware telephone and country fields

## 15. Placeholder policy

The client currently lacks finalized company copy, contact details, photography, map location, and legal text.

Allowed placeholders:

- Professional editorial image blocks
- Saudi address field
- Telephone
- WhatsApp
- Email
- Working hours
- Map location
- Social links
- Legal-review fields

Every placeholder must be identified in Figma annotations and later seed data.

Do not use placeholder content to imply verified facts.

## 16. Figma deliverables

Create the following Figma pages or clearly separated sections:

- `15 Global Navigation & Search`
- `16 About`
- `17 Procurement Support`
- `18 Contact`
- `19 Footer & Legal`
- `20 Public Site Prototype`
- Update `02 Components`
- Update `99 Handoff Notes`

Deliverables include:

- Desktop and mobile About
- Desktop and mobile Procurement Support
- Desktop and mobile Contact
- Desktop and mobile Privacy Policy template
- Desktop and mobile Terms template
- Desktop and mobile header states
- Products mega-menu
- Mobile menu
- Search overlay/screen and all search states
- Footer desktop/mobile
- Contact-form states
- Clickable public-site prototype
- Accessibility, responsive, content, and RTL annotations

## 17. Prototype scope

The Phase 3 prototype must demonstrate:

- Header navigation
- Products mega-menu
- Mobile menu
- Search open, results, and no-results state
- Homepage to About
- Homepage to Procurement Support
- Homepage to Contact
- Contact form success path
- Footer navigation to policies
- Policy table-of-contents interaction where practical
- Return paths to Products and Inquiry

The existing Phase 2 buyer journey remains intact.

## 18. Quality gates

Phase 3 is not complete until:

- All new pages visually match the approved homepage and Phase 2 system
- No unsupported company claims appear
- No filler sections appear
- Search remains useful and restrained
- Navigation remains clear on desktop and mobile
- Contact details are visibly treated as replaceable placeholders
- General contact and quotation inquiry remain clearly separated
- Footer is complete without becoming bloated
- Legal pages are readable and marked for legal review
- Desktop and mobile designs both exist
- No text clipping or undersized buttons remain
- Accessibility and RTL-readiness annotations are present
- Prototype interactions work

## 19. Out of scope

- Admin dashboard
- Arabic high-fidelity screens
- Final legal approval
- Final contact details
- Real map integration
- Final photography
- Blog/news
- Careers
- Customer accounts
- Payments
- Live inventory
- Public prices
- Newsletter system
- Testimonials
- Certification pages

## 20. Next step after written-spec approval

Create the detailed Phase 3 Figma production plan using the writing-plans skill, then execute the design in meaningful screen groups with visual review gates and one repository milestone after final audit.