# Rosa Medical Phase 3 — Public Site Completion Report

Date: 2026-07-31
Figma file: `https://www.figma.com/design/L7LKGItaD2o6tZzHuw1GUQ`
Public-site prototype page: `20 Public Site Prototype`
Prototype page node: `33:2`

## Completed Figma pages

- `15 Global Navigation & Search`
- `16 About`
- `17 Procurement Support`
- `18 Contact`
- `19 Footer & Legal`
- `20 Public Site Prototype`
- Updated `99 Handoff Notes`

## Completed systems

### Global navigation

- Solid desktop header
- Products mega-menu
- Full-height mobile menu
- Product-family links
- Products, Catalogues, About, Contact, Search, and Inquiry routes
- Future language-switcher placement

### Global search

- Desktop search overlay
- Mobile search screen
- Default state
- Typing state
- Results state
- Loading state
- No-results state
- Error state
- Product result actions

### About Rosa

- Desktop and mobile layouts
- Credible supplier/procurement positioning
- Buyer-expectation structure
- Buyer audience structure
- Product-family navigation
- Procurement support routing
- No unverified company history, factory, certification, ownership, statistics, or testimonial claims

### Procurement Support

- Desktop and mobile layouts
- Six-step buyer process
- Requirement-type explanations
- Information checklist
- Routes to Products, Inquiry, and Contact
- No decorative timeline or response-time promises

### Contact

- Desktop and mobile layouts
- General-contact purpose clearly separated from product quotation inquiries
- Replaceable contact-detail placeholders
- Visible labels for all form fields
- Focus state
- Validation-error state
- Loading state
- Success state
- Failure state
- Full-page desktop/mobile contact confirmation
- Map/location placeholder

### Footer

- Desktop footer
- Mobile footer
- Product, company, support, contact, policy, and future-language groups
- Attached to About, Procurement Support, and Contact desktop/mobile source screens
- Attached to matching prototype frames

### Legal templates

- Privacy Policy desktop/mobile
- Terms desktop/mobile
- Desktop contents navigation
- Mobile section navigation
- Last-updated placeholder
- Client/legal-review annotations
- Placeholder jurisdiction, service, analytics, and governing-law fields

### Handoff

- Responsive transition rules
- Tablet behavior
- Accessibility rules
- Search accessibility behavior
- Form validation requirements
- Placeholder inventory
- Content restrictions
- Arabic/RTL readiness

## Prototype

The Phase 3 prototype contains 30 top-level frames:

- 12 desktop content screens
- 12 mobile content screens
- 4 desktop navigation/search states
- 2 mobile navigation/search states

Verified interaction count: **179**

Demonstrated routes include:

- Homepage → Products
- Homepage/header → About
- About → Procurement Support
- Homepage/header → Contact
- Products mega-menu → family/category
- Search default → results
- Search results → product detail
- Search result → inquiry
- Contact → success
- Footer → Privacy Policy
- Footer → Terms
- Return to Products
- Return to Inquiry
- Mobile menu and mobile search routes

The existing Phase 2 buyer-journey prototype remained unchanged. Its previously verified interaction count remained **20** before final Phase 3-only hotspot changes; Phase 2 was not edited afterward.

## Verification evidence

Full structural audit before the final hotspot-only resize:

- Text overflows: **0**
- Required screen/state coverage: **complete**
- Source footer attachment: **complete**
- Prototype top-level frames: **30**
- Prototype interactions: **179**
- Existing Phase 2 interactions: **20**
- Undersized linked controls: **7** — all were invisible desktop footer hotspots measuring 42 px high

Final corrective verification after resizing those seven hotspots:

- Prototype top-level frames: **30**
- Prototype interactions: **179**
- Linked controls below 44 px: **0**

No text or content layout changed after the zero-overflow audit; the only subsequent visual-system change was increasing the seven invisible hotspot heights from 42 px to 44 px.

## Placeholder policy preserved

The following remain explicitly replaceable:

- Business name details
- Saudi address
- Telephone
- WhatsApp
- Email
- Working hours
- Social links
- Map location
- Photography
- Last-updated dates
- Legal jurisdiction
- Third-party services
- Analytics/cookie policy
- Governing law

## Out of scope retained

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
- Public pricing
- Newsletter system
- Testimonials
- Certification pages

## Recommended next phase

Phase 4 should design the protected single-owner admin dashboard and content-management workflows for:

- Products
- Product variants
- Product categories
- Catalogue PDFs
- Contact details
- Featured content
- Editable approved page copy
- Quotation inquiries and statuses
- General contact messages
- Media uploads
- English/Arabic content fields

The admin must remain a structured content-management system rather than an unrestricted visual page builder.
