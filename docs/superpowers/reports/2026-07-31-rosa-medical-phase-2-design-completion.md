# Rosa Medical Phase 2 Design Completion

Date: 2026-07-31
Status: Complete and reviewed
Figma file: https://www.figma.com/design/L7LKGItaD2o6tZzHuw1GUQ/Rosa-Medical-%E2%80%94-Website-Design-System---Homepage
Prototype page node: `20:6` (`14 Buyer Journey Prototype`)

## Completed scope

Phase 2 extends the approved homepage into the complete public product-to-quotation journey.

### Product system

- Product and category data-field inventory
- Standard, compact, featured, added, focus, and missing-image product-card states
- Search, family, size, variant, and sort controls
- Active-filter summary and mobile filter trigger
- Product gallery thumbnails
- Size and variant selectors
- Quantity stepper
- Add-to-inquiry feedback
- Editable inquiry-line component

### Public screens

- Products Overview — desktop and mobile
- Instrument Family Category Template — desktop and mobile
- Mobile filter sheet
- Default, loading, filtered, no-result, and search-mismatch behavior
- Product Detail — desktop and mobile
- Product gallery, technical information, procurement note, related products, and mobile sticky action
- Catalogue Downloads — desktop and mobile
- Inquiry Basket — desktop and mobile
- Empty inquiry state
- Request Quotation — desktop and mobile
- Inline validation, submission failure, and confirmation states

### Prototype

A dedicated page named `14 Buyer Journey Prototype` contains the complete desktop and mobile flows on one canvas.

Linked journey:

> Homepage → Products Overview → Knives Category → Product Detail → Inquiry Basket → Request Quotation → Confirmation

The prototype contains:

- 7 desktop frames
- 7 mobile frames
- 20 working click interactions

### Developer handoff

The `99 Handoff Notes` page now includes:

- Visible product and category data mapping
- Inquiry-record mapping
- Interaction behavior
- Responsive rules
- Accessibility requirements
- RTL-readiness requirements
- Placeholder-image replacement policy
- Phase completion gate

## Final audit

The Figma structural audit returned:

- Text overflows: `0`
- Buttons below practical touch-target size: `0`
- Prototype interactions: `20`
- Desktop/mobile screen coverage: complete
- Loading state: present
- No-results state: present
- Empty state: present
- Validation and failure states: present
- Submission-success state: present
- Mobile filter sheet: present
- Final verdict: `PASS`

## Constraints preserved

- ROSA logo remains unchanged and receives no “Medical” lockup.
- The brand remains a medical-instrument supplier and procurement partner.
- Primary navigation remains Knives, Scissors, Punches, Chisels, and Cutters.
- No public prices, ratings, discounts, stock claims, fake certifications, statistics, or testimonials were added.
- Product imagery remains safely replaceable.
- The experience remains quotation-led, not ecommerce-led.
- English screens are complete and structurally ready for later Arabic/RTL adaptation.
- Admin dashboard remains outside this phase.
