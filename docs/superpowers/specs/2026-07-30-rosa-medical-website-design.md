# Rosa Medical Website — Approved Design Specification

Date: 2026-07-30
Status: Approved design direction, pending final written-spec review
Repository: `manbtd0-cloud/RosaMedical`

## 1. Project objective

Create a new, professional, elegant, bilingual-ready website for Rosa Medical. The website must support medical-instrument discovery, structured quotation requests, and future self-service content management through a protected single-owner admin dashboard.

Rosa Sanitaryware is a behavioral and compositional reference only. The new website may borrow its calm commercial character, full-width visual presentation, clear navigation, and composed corporate tone, but must correct its weak template content, inconsistent information, generic sections, visual clutter, and outdated interaction patterns.

The final public experience must feel intentionally designed by a professional studio rather than generated from a generic AI website template.

## 2. Brand rules

- Public brand name: **Rosa Medical**.
- The supplied logo artwork reads **ROSA** and must be used as-is.
- Do not add “Medical” into, beneath, or beside the logo.
- Do not publicly mention Rosa Sanitaryware, Rosa International, Throhi, ownership relationships, partner relationships, or a “Rosa family.”
- Brand palette is derived from the supplied logo and Rosa Sanitaryware:
  - Rosa red: approximately `#E00815`
  - Near-black: approximately `#191917`
  - White: `#FFFFFF`
  - Supporting warm whites, light greys, and steel greys
- Rosa red must be used selectively. It is an accent for important controls and brand details, not a dominant page background.
- The supplied raster logo must be cleaned for transparent-background use. A faithful vector recreation may be produced later without changing the symbol, wordmark, proportions, or identity.

## 3. Positioning and audience

Rosa Medical will present itself as a:

> Medical instruments supplier and procurement partner.

Primary audience coverage:

1. Saudi and GCC hospitals, clinics, and procurement teams
2. Medical distributors and wholesalers
3. International buyers
4. OEM/private-label buyers where applicable in future verified content

Saudi/GCC buyers receive priority in tone and conversion flow, but the design must remain credible internationally.

Do not claim unverified manufacturing ownership, factories, regulatory registrations, certifications, export figures, awards, years of experience, or clinical outcomes.

## 4. Product scope

Initial verified product navigation is by instrument family:

- Knives
- Scissors
- Punches
- Chisels
- Cutters

Instrument-family navigation is primary. Medical-specialty navigation must not be invented before accurate classifications are supplied.

The uploaded catalogues provide product naming, codes, dimensions, directions, and variations. Product photography must not be extracted from the PDFs for the first design/build unless later requested. Neutral image placeholders will be used until proper product assets are supplied.

## 5. Visual direction

### 5.1 Overall character

The public site must be:

- Editorial-first
- Premium and composed
- Mostly light
- Product-led
- Credible for medical procurement
- Elegant without feeling decorative or fashion-oriented
- Technical where product data is presented

### 5.2 Explicit anti-patterns

Do not use:

- Generic healthcare blues and greens as the main identity
- Meaningless section labels
- Oversized filler typography without business purpose
- Fake statistics
- Fake certifications
- Generic testimonials
- Repeated rounded cards for every section
- Excessive gradients
- Decorative blobs
- Glassmorphism as a primary style
- Constant floating elements
- Dramatic cursor effects
- Heavy parallax
- Unnecessary loading animations
- Promotional pricing, discounts, star ratings, or ecommerce language
- Random doctor stock photos used as credibility substitutes

### 5.3 Layout system

- Desktop design frame: 1440 px
- Main content width: approximately 1240–1280 px
- Grid: 12 columns with generous gutters
- Mobile design frame: 390 px
- Mobile grid: 4 columns
- Large, deliberate spacing between sections
- Mostly square geometry or lightly softened corners
- Thin borders and restrained shadows

### 5.4 Typography

- Editorial serif for hero and major section headings
- Modern, highly legible sans-serif for navigation, body copy, product specifications, forms, search, and admin UI
- Arabic will later use a compatible Arabic type system designed for RTL, not a forced reuse of the English font

## 6. Hero design

The homepage hero must provide a strong visual opening.

Approved direction:

- One dominant large editorial visual
- Transparent navigation over the hero
- Header transitions to solid white after scrolling
- Elegant, restrained headline
- Short supporting positioning statement
- Two calls to action:
  - Explore Products
  - Request a Quote
- Crop-safe layout that supports later replacement with:
  - Macro surgical instrument photography
  - Editorial multi-instrument arrangement
  - Clinical photography
  - Manufacturing/procurement photography
- The initial implementation may use a single static image placeholder
- Architecture may support a slow crossfade or restrained slideshow later without redesigning the hero
- Readability must remain stable across image replacements through controlled overlays, safe text areas, and responsive positioning

## 7. Homepage structure

The approved homepage order is:

1. **Transparent header over hero**
   - ROSA logo
   - Products
   - Catalogues
   - About
   - Contact
   - Search
   - Inquiry basket
   - Future language switcher

2. **Large editorial hero**
   - Strong image placeholder
   - Editorial headline
   - Concise supplier/procurement positioning
   - Explore Products
   - Request a Quote

3. **Instrument families**
   - Knives
   - Scissors
   - Punches
   - Chisels
   - Cutters
   - Large image-led editorial tiles rather than tiny repeated cards

4. **Procurement introduction**
   - Concise explanation of Rosa Medical as a medical-instrument supplier and procurement partner
   - One strong supporting visual placeholder

5. **Selected instruments**
   - Limited preview only
   - Product name
   - Product code
   - Size or variant summary
   - View Details
   - Add to Inquiry
   - No prices

6. **Catalogue access**
   - Professional presentation of the five downloadable PDF catalogues
   - Must not resemble a generic file archive

7. **Procurement process**
   - Browse products
   - Prepare inquiry
   - Receive quotation
   - Restrained presentation, no decorative timeline clutter

8. **Final quotation section**
   - One controlled high-contrast or dark section
   - Direct quotation call to action

9. **Professional footer**
   - Contact placeholders
   - Navigation
   - Catalogue links
   - Business hours
   - Policies
   - Future language controls

## 8. Public information architecture

### 8.1 Main navigation

- Home
- Products
- Catalogues
- About
- Contact
- Search
- Inquiry Basket
- Language switcher in Arabic phase

### 8.2 Public pages

- Homepage
- Products overview
- Knives category
- Scissors category
- Punches category
- Chisels category
- Cutters category
- Product detail
- Catalogue downloads
- About Rosa
- Procurement support
- Inquiry basket
- Request quotation
- Contact
- Privacy policy
- Terms

### 8.3 Products mega-menu

The Products navigation item opens a restrained mega-menu containing:

- Five instrument families
- One supporting visual area
- Browse all products
- Download catalogues

The mega-menu must remain practical and composed, not decorative.

## 9. Product interface

### 9.1 Product cards

Each card may contain only useful content:

- Product image placeholder
- Instrument name
- Product code
- Size or available variant summary
- View Details
- Add to Inquiry

Do not include:

- Prices
- Ratings
- Discounts
- Promotional badges
- Fake availability claims
- Decorative tags without procurement value

### 9.2 Product detail

The product-detail design must be prepared for:

- Main product image
- Supporting image gallery
- Product name
- Product code
- Instrument family
- Technical description
- Size and variant options
- Straight/curved or other applicable distinctions
- Quantity input
- Add to Inquiry
- Downloadable catalogue reference where applicable
- Related products within the same family

All data fields must be structured so the admin can later edit them safely.

## 10. Inquiry and quotation system

The site is B2B inquiry-led, not direct ecommerce.

Approved flow:

> Browse category → open product → select variant → add to inquiry → review inquiry → submit quotation request

An inquiry contains:

- Product name
- Product code
- Selected variant
- Quantity
- Optional product notes
- Customer name
- Company name
- Email
- Telephone
- Country
- General request notes

Submission behavior:

- Save inquiry in the admin dashboard
- Email the inquiry to Rosa Medical
- Send a simple confirmation email to the customer
- Do not automate WhatsApp submission

Admin inquiry statuses:

- New
- Reviewed
- Contacted
- Closed

## 11. Content and placeholder policy

The client currently has no complete asset library or confirmed contact dataset.

The design may use:

- Professional image placeholders
- Realistic placeholder contact fields
- Placeholder Saudi location
- Placeholder telephone, email, WhatsApp, working hours, and social fields
- Representative product data derived from uploaded catalogues

Every placeholder must be clearly marked in Figma and in implementation seed data.

The design must assume final photography exists and use realistic production-ready image ratios. Replacing placeholder images must not require layout redesign.

Do not invent:

- Certifications
- Regulatory approvals
- Manufacturing facilities
- Factory capabilities
- Team biographies
- Export markets
- Awards
- Quantitative claims

## 12. Language strategy

Phase 1 launches in English.

The architecture must be Arabic-ready from the beginning:

- English and Arabic database fields for editable content
- RTL-safe layout components
- Mirrored navigation and directional controls where appropriate
- Flexible text containers for Arabic expansion
- Locale-aware forms
- Arabic-ready search and product data model

Arabic design and content are completed near the end of the project after the English experience is stable.

## 13. Admin dashboard

### 13.1 Access model

- One owner account only
- No public registration
- Protected `/admin` area
- Secure session handling
- Password recovery through verified owner email
- Data permissions restricted to the owner account
- Architecture may support additional accounts later without requiring a rebuild

### 13.2 Editable content

The owner can:

- Add products
- Edit products
- Hide/show products
- Reorder products
- Delete products with safe confirmation
- Manage product variants
- Manage instrument categories
- Upload and replace product images
- Upload and replace PDF catalogues
- Update telephone, WhatsApp, email, address, social links, and working hours
- Select featured categories and featured products
- Review quotation inquiries
- Change inquiry status
- Edit selected approved homepage and page text
- Manage English and Arabic fields separately in the Arabic phase

### 13.3 Protected design controls

The owner must not have unrestricted control over:

- Layout
- Typography
- Brand colours
- Spacing
- Animations
- Component structure
- Page-builder blocks

The dashboard is a structured content-management interface, not a visual page builder.

## 14. Technical architecture direction

Recommended baseline:

- React
- TypeScript
- Cloudflare deployment
- Supabase database, authentication, and storage
- Single-owner Supabase authentication
- Structured product/category/inquiry/contact tables
- Storage buckets for product images and catalogues
- Transactional email provider selected during implementation planning

Final framework and integration decisions are confirmed in the implementation plan, not improvised during visual design.

## 15. Motion and interaction

Allowed motion:

- Transparent-to-solid header transition
- Controlled image reveal
- Minor text entrance
- Subtle category-tile hover
- Subtle product-card hover
- Inquiry-basket confirmation feedback
- Smooth menu and search transitions

Requirements:

- Reduced-motion support
- No interaction may delay product access
- No autoplay motion that competes with medical information
- Mobile interactions must remain immediate and touch-friendly

## 16. Accessibility and responsive requirements

- Strong colour contrast
- Readable body sizes
- Visible keyboard focus
- Logical heading hierarchy
- Practical tap targets
- Complete keyboard navigation
- Semantic form labels
- Clear validation and error states
- Reduced-motion support
- Responsive image cropping
- No hover-only functionality
- RTL readiness

## 17. Figma deliverables

The design phase will proceed in controlled stages:

1. Brand and asset audit
2. Visual direction board
3. Navigation and information architecture map
4. Homepage low-fidelity wireframe
5. Homepage high-fidelity desktop design
6. Homepage mobile design
7. Product overview and category templates
8. Product-detail template
9. Catalogue page
10. Inquiry basket and quotation flow
11. About and contact pages
12. Core responsive states
13. Admin dashboard foundations
14. Arabic/RTL adaptation near project end

The Figma file must include:

- Named pages
- Reusable components
- Auto Layout
- Variables/styles for colour, typography, spacing, radius, and elevation
- Desktop and mobile breakpoints
- Clear placeholder labels
- Interaction notes
- Content-management notes
- Developer handoff annotations where behavior is not visually obvious

## 18. Quality gates

Before a design stage is approved:

- No filler sections
- No unverified claims
- No generic AI visual patterns
- Clear purpose for every section
- Product discovery remains obvious
- Inquiry action remains accessible
- Mobile behavior is intentional
- Reusable component logic is consistent
- Placeholder replacement is safe
- English layout remains ready for Arabic conversion

## 19. Out of scope for initial release

- Direct online payments
- Public prices
- Customer accounts
- Live inventory
- Customer dashboards
- Unrestricted page builder
- Blog or news system
- Careers
- Testimonials without verified content
- Certification pages without verified documents
- Medical-specialty categorisation without verified mappings
- WhatsApp quotation automation

## 20. Immediate next step after approval

Create the detailed implementation/design-production plan, then begin the Figma visual direction board and homepage wireframe using this specification as the fixed source of truth.
