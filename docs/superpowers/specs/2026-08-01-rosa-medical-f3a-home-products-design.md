# Rosa Medical F3A — Homepage and Products Overview Design

**Date:** 2026-08-01  
**Owner:** Ahmad and Ahmad's frontend AI  
**Branch:** `frontend/f3a-home-products-design`  
**Visual source of truth:** `https://www.figma.com/design/L7LKGItaD2o6tZzHuw1GUQ`  
**Parent plan:** `docs/superpowers/plans/2026-07-31-rosa-medical-master-implementation.md`

## 1. Purpose

F3A is the first production-facing visual implementation milestone for the Rosa Medical public website. It upgrades only the homepage and products-overview route from structural placeholders into complete static Figma-led compositions.

The milestone proves the public visual language, reusable catalogue components, responsive section behavior, safe placeholder-media strategy, and page-quality review process before the same patterns are reused on family listings and product detail pages.

F3A is not the end of public-page implementation. It is the first controlled milestone in this sequence:

1. F3A — Homepage and Products Overview
2. F3B — Family Listing and Product Detail
3. F3C — Inquiry Basket, Request Quotation, and Catalogues
4. F3D — About, Procurement Support, Contact, Search, Privacy, and Terms
5. F3E — Complete static admin experience
6. F4 — Mocked behavior and stateful flows
7. F5 onward — Live backend integration, visual refinement, Arabic/RTL, and production hardening

Every approved Figma page remains in scope across these phases.

## 2. Non-negotiable product and brand rules

The implementation must preserve all locked Rosa Medical decisions:

- The public logo remains **ROSA** only. Do not append “Medical” to the logo.
- Public positioning is medical instruments supplier and procurement partner.
- Primary families are Knives, Scissors, Punches, Chisels, and Cutters.
- The site is quotation-led, not ecommerce.
- Do not show public prices, inventory, stock, checkout, payments, discounts, ratings, shipping, or orders.
- Do not publish unverified manufacturing, factory, certification, ownership, award, export, regulatory, legal, or clinical claims.
- Do not invent statistics, testimonials, customer logos, experience figures, or geographic reach.
- Product media remains replaceable neutral placeholder media until verified client assets are supplied.
- Visual direction remains premium, light, editorial, precise, and product-led.
- Use Rosa red `#E00815`, near-black `#191917`, white, warm off-white, and restrained steel/light greys.
- Avoid generic medical gradients, blue healthcare styling, stock doctors, blobs, glassmorphism, excessive cards, excessive pills, and unnecessary rounded containers.
- Typography remains Lora for editorial display and Inter for operational text.
- English is implemented first while component and layout structure remains future RTL-compatible.

## 3. Scope

### 3.1 Routes upgraded

- `/`
- `/products`

All other public and admin routes remain operational using their existing structural placeholder presentation until their assigned milestone.

### 3.2 Included work

- Complete static homepage composition matching the approved Figma hierarchy
- Complete static products-overview composition matching the approved Figma hierarchy
- Shared public-page section primitives needed by both pages
- Reusable family-card and product-preview components for later F3B reuse
- Neutral media placeholder component and aspect-ratio rules
- Desktop, tablet, and mobile responsive behavior
- Correct semantic heading, landmark, link, and list structure
- Static typed fixture selectors only
- Empty-safe rendering for optional fixture fields
- Visual states needed by the two routes without adding live behavior
- Consolidated milestone review and verification checklist

### 3.3 Explicitly excluded

- Family listing route composition
- Product-detail route composition
- Working search or filtering behavior
- Inquiry basket state
- Request-quotation submission
- Catalogue download behavior
- Live API calls
- Mock Service Worker
- Admin screens
- Final product photography
- Arabic content and RTL activation
- Decorative animation beyond minimal safe CSS transitions
- Full global E2E acceptance before Ahmad chooses to run the consolidated test round

## 4. Architecture and file boundaries

Page-specific implementation must be isolated under feature folders rather than placed directly into route files.

```text
apps/web/src/
├── app/(public)/[[...segments]]/page.tsx
├── features/
│   ├── homepage/
│   │   ├── homepage.tsx
│   │   ├── homepage.data.ts
│   │   └── sections/
│   │       ├── home-hero.tsx
│   │       ├── family-discovery.tsx
│   │       ├── featured-instruments.tsx
│   │       ├── procurement-support.tsx
│   │       ├── catalogue-access.tsx
│   │       └── quotation-cta.tsx
│   ├── products/
│   │   ├── products-overview.tsx
│   │   ├── products.data.ts
│   │   └── sections/
│   │       ├── products-hero.tsx
│   │       ├── family-index.tsx
│   │       ├── discovery-toolbar-shell.tsx
│   │       ├── product-preview-grid.tsx
│   │       └── products-procurement-cta.tsx
│   └── public-catalogue/
│       ├── family-card.tsx
│       ├── product-preview-card.tsx
│       ├── product-media-placeholder.tsx
│       ├── section-heading.tsx
│       └── catalogue-link-panel.tsx
└── styles/
    └── public-pages.css
```

Exact file names may be consolidated when two files would contain trivial code, but the feature boundaries must remain clear:

- Homepage sections know homepage composition only.
- Products sections know products-overview composition only.
- Shared catalogue components contain no page-specific layout assumptions.
- Route code performs route selection and renders the feature entry component; it does not contain full page markup.
- Components do not call `fetch`.
- Components receive typed data through props.

## 5. Data and fixture strategy

F3A uses existing typed shared fixtures where possible and adds frontend-owned presentation selectors where the OpenAPI fixture shape is too low-level for composition.

### 5.1 Data sources

- Family identity and slugs derive from `packages/contracts/src/fixtures/families.ts`.
- Representative product identity and codes derive from `packages/contracts/src/fixtures/products.ts`.
- Page copy that is not part of Contract 0.1 lives in frontend-owned static content modules until Contract 0.2 defines editable website content.
- No copy may imply unsupported certifications, manufacturing, clinical performance, or market history.

### 5.2 Presentation models

Pages consume explicit presentation models, for example:

```ts
interface FamilyCardModel {
  name: string;
  slug: string;
  description: string;
  imageLabel: string;
  href: Route;
}

interface ProductPreviewModel {
  name: string;
  code: string;
  family: string;
  imageLabel: string;
  href: Route;
}
```

Selectors must:

- return deterministic ordering;
- preserve the approved five-family sequence;
- expose only safe public text;
- avoid unsafe casts;
- fail clearly in development when a required fixture is missing;
- render optional descriptive copy defensively without collapsing layout.

## 6. Shared public component design

### 6.1 Section heading

The section-heading component provides consistent eyebrow, title, supporting copy, optional action, and width behavior.

Requirements:

- Semantic heading level is supplied by the caller.
- Eyebrow appears only where it adds navigation or category meaning.
- No generic labels such as “Our Solutions,” “What We Offer,” or “Explore More.”
- Supporting copy uses a readable line length.
- Actions use existing `ButtonLink` or semantic text links.

### 6.2 Instrument family card

Family cards represent Knives, Scissors, Punches, Chisels, and Cutters.

Requirements:

- Entire card is a clear navigation target.
- Family name remains the dominant label.
- Description is concise and factual.
- Media placeholder uses a stable aspect ratio.
- Hover treatment remains restrained: border, text, or media movement only; no heavy shadow.
- Focus state remains at least as visible as hover.
- Card geometry must not depend on copy length being identical.
- Mobile layout does not require horizontal scrolling.

### 6.3 Product preview card

Product previews support representative instruments and later reuse on family pages.

Requirements:

- Show product name, product code, family, and media placeholder.
- Do not show price, stock, ratings, or commerce badges.
- Product code remains selectable text.
- Link target covers the intended interactive region without nested interactive elements.
- Cards align predictably when names wrap to different lengths.

### 6.4 Product media placeholder

Placeholder media must look intentional without pretending to be final product imagery.

Requirements:

- Use neutral warm-white or light-grey surfaces.
- Use a restrained instrument silhouette, line marker, or textual asset label only when available in the repository.
- Never use random stock imagery.
- Preserve final expected aspect ratio so later asset replacement does not change layout.
- Include accessible alternative text or mark purely decorative placeholder treatment as hidden.
- No generated claims, certificates, factory imagery, or doctors.

### 6.5 Catalogue and procurement panels

These components provide navigation toward catalogues, procurement support, inquiry, and quotation.

Requirements:

- One primary action per panel.
- Secondary links remain visually subordinate.
- Copy focuses on browsing specifications, selecting instruments, and requesting a quotation.
- No fake urgency, promotional pricing, or conversion clichés.

## 7. Homepage composition

The homepage follows this controlled sequence.

### 7.1 Editorial hero

Purpose: establish Rosa as a precise medical-instrument supply and procurement partner and give visitors two immediate paths.

Content hierarchy:

1. Short factual eyebrow or category line when present in Figma
2. Large Lora headline
3. Compact supporting statement
4. Primary action: browse instruments
5. Secondary action: request a quotation or view catalogues, following the approved Figma order
6. Product-led neutral media composition

Rules:

- Hero avoids oversized empty spectacle that pushes useful content too far below the fold.
- Headline remains readable at 390 px without awkward orphan words.
- Hero media must not imply final photography.
- Primary action remains visible without scrolling on common desktop heights when reasonably possible.
- Mobile order prioritizes text and action before nonessential media.

### 7.2 Family discovery

Purpose: expose all five instrument families as the primary catalogue navigation.

Rules:

- All families appear without hidden carousel-only access.
- Desktop may use an editorial asymmetric grid only when it matches Figma and remains robust.
- Tablet resolves into balanced two-column or mixed layout without stranded cards.
- Mobile becomes one column or a deliberate two-column layout only where text remains readable.

### 7.3 Featured instruments

Purpose: provide concrete product examples and prove the product-preview language.

Rules:

- Use existing safe fixture products.
- Keep count limited to what the approved layout supports.
- Product cards link to their future detail routes even while those routes remain structural placeholders.
- The section cannot look like a retail shop grid.

### 7.4 Procurement support

Purpose: explain that Rosa assists buyers in identifying suitable instruments and preparing quotation requests.

Rules:

- Avoid unsupported service guarantees.
- Use a structured editorial split rather than generic icon cards.
- Copy may mention specification review, catalogue navigation, and inquiry preparation only when stated carefully.

### 7.5 Catalogue access

Purpose: route users toward the five supplied catalogue families.

Rules:

- Do not claim downloadable PDFs are finalized until the catalogue route implements safe asset handling.
- F3A may render a navigation panel leading to `/catalogues`.
- Visual treatment should reference technical documents without displaying fake certification marks.

### 7.6 Final quotation CTA

Purpose: close the homepage with one direct procurement action.

Rules:

- Use a decisive headline and short factual supporting sentence.
- Primary action links to `/request-quotation`.
- Secondary contact path is included only if approved by Figma.
- No filler statistics or decorative trust badges.

## 8. Products overview composition

### 8.1 Products hero

Purpose: introduce the catalogue and clarify navigation by instrument family.

Requirements:

- Editorial heading, compact description, and optional catalogue action.
- No duplicated homepage hero copy.
- Hero scale is smaller than homepage hero.

### 8.2 Five-family index

Purpose: provide the main route into product browsing.

Requirements:

- All five families visible.
- Family order remains deterministic.
- Each card links to `/products/<family-slug>`.
- Card descriptions remain parallel in information density without forced identical wording.

### 8.3 Discovery toolbar shell

Purpose: reserve the approved search/filter presentation area before F4 behavior.

Requirements:

- Controls are visibly nonfunctional presentation shells only when the Figma design requires them.
- Do not render deceptive enabled inputs that appear functional but do nothing.
- Prefer a clear route to `/search` or disabled/static preview with explanatory semantics.
- Real filtering state belongs to F4.

### 8.4 Representative product previews

Purpose: show how products are presented across families.

Requirements:

- Use typed fixture products only.
- Include product code and family.
- Link to existing deterministic detail placeholder routes.
- Do not imply that two fixture products represent the full catalogue.

### 8.5 Products procurement CTA

Purpose: help buyers proceed when they know a family or product but need quotation support.

Requirements:

- Link to inquiry or request quotation according to Figma hierarchy.
- Avoid duplicate wording from the homepage final CTA.
- Keep the panel visually integrated with the products page rather than appearing as a generic banner.

## 9. Responsive behavior

Implementation targets are desktop 1440 px, tablet 768 px, and mobile 390 px, with fluid behavior between them.

### 9.1 Global rules

- No horizontal page overflow.
- Containers use existing `wide`, `standard`, and `reading` widths.
- Section spacing scales through existing tokens.
- No breakpoint-specific duplicate content.
- Grid collapse follows information priority, not arbitrary column counts.
- Touch targets remain practically at least 44 px.
- Important actions must not become tiny text links on mobile.
- Product codes and long labels must wrap without clipping.

### 9.2 Desktop

- Preserve approved editorial whitespace and asymmetric compositions.
- Avoid excessively wide body copy.
- Keep product and family grids aligned to the page rhythm.
- Ensure header and hero do not compete for vertical space.

### 9.3 Tablet

- Derive behavior between approved desktop and mobile designs.
- Convert fragile asymmetry into stable two-column structures.
- Prevent headings and media from producing awkward narrow columns.
- Maintain clear reading order in the DOM.

### 9.4 Mobile

- One clear content column for hero and editorial splits.
- Family and product cards may use one or two columns only when minimum readable width is preserved.
- Media follows text when media is supportive rather than essential.
- CTA groups stack without full-width duplication when one action is secondary.
- Footer and existing mobile navigation remain usable without F3A-specific overrides.

## 10. Accessibility and semantics

F3A must establish production-quality public-page semantics.

Requirements:

- Exactly one `<main>` landmark per route.
- One logical `<h1>` per page.
- Heading levels do not skip for visual convenience.
- Section landmarks receive accessible names only when useful.
- Lists of families and products use semantic lists.
- Linked cards expose one understandable accessible name.
- Decorative media remains hidden from assistive technology.
- Informative media placeholders receive concise alt text.
- Focus order follows visual order.
- Focus indicators remain visible on light and dark surfaces.
- Colour is not the sole indicator of interactivity.
- Reduced-motion preferences disable nonessential transforms and transitions.
- Text contrast must remain suitable against warm-white, paper, red, and dark surfaces.

## 11. Error prevention and defensive rendering

Even though F3A is static, its components must be safe for later dynamic data.

- Required family and product identities are validated at selector boundaries.
- Missing optional description text removes the description block cleanly.
- Missing media uses the stable neutral placeholder.
- Unknown family slugs never generate broken URLs silently.
- Shared card components do not accept arbitrary HTML.
- All links use typed internal routes.
- No component assumes arrays are non-empty unless the selector guarantees it.
- Empty product-preview data produces an intentional empty-safe section or omits the section according to the page contract.
- Long names, codes, and translated strings are considered in CSS sizing.

## 12. Styling strategy

- Reuse Layer 1 tokens and primitives.
- Add page-level classes to `public-pages.css` or narrowly scoped CSS modules if isolation is clearer.
- Do not introduce a second token system.
- Do not hardcode repeated arbitrary pixel values where an existing token fits.
- Do not create page-specific button variants.
- Shadows remain absent or nearly imperceptible.
- Border radii remain restrained and consistent with existing control/surface tokens.
- Red is reserved for identity, emphasis, focus, and primary action rather than large decorative flooding.
- Dark sections are limited and intentional.

## 13. Quality and verification strategy

Ahmad has chosen to postpone repeated local test execution while implementation proceeds. This does not remove verification requirements; it consolidates them at the milestone gate.

### 13.1 During implementation

The frontend AI must still perform repository-side review after each meaningful batch:

- inspect committed diffs;
- verify route and component boundaries;
- run available dependency-free static regression checks;
- avoid knowingly stacking new code on unresolved type assumptions;
- keep the current typed-route verification debt recorded.

### 13.2 F3A completion gate

F3A cannot be declared complete until the following consolidated checks are run in Ahmad's npm-enabled environment:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm --filter @rosa/web exec playwright install chromium
pnpm test:e2e
```

Additional F3A-specific checks:

- homepage renders at 1440, 768, and 390 widths;
- products overview renders at 1440, 768, and 390 widths;
- no horizontal overflow;
- one main landmark per page;
- one h1 per page;
- keyboard navigation reaches every interactive element;
- all family and product links resolve;
- reduced-motion mode avoids nonessential movement;
- fixture copy contains no unsupported claims;
- visual comparison is performed against the approved Figma frames.

The currently deferred typed-route wrapper fix must pass `pnpm typecheck` and `pnpm build` before F3A is accepted.

## 14. Acceptance criteria

F3A is accepted only when all statements below are true:

1. `/` is a complete approved homepage composition rather than a placeholder.
2. `/products` is a complete approved products-overview composition rather than a placeholder.
3. All five families appear and link to deterministic family routes.
4. Representative products use typed fixtures and link to deterministic detail routes.
5. No live backend dependency exists.
6. No unsafe public claim, fake proof point, price, inventory, or ecommerce control appears.
7. Shared family, product, media, heading, catalogue, and procurement components are reusable by F3B.
8. Desktop, tablet, and mobile layouts preserve hierarchy without overflow.
9. Semantic landmarks, headings, lists, focus behavior, and alternative text are correct.
10. Existing header, footer, admin routes, and non-F3A public routes remain intact.
11. Consolidated lint, typecheck, unit, build, and E2E checks pass before milestone acceptance.
12. The final visual review confirms close alignment with the approved Figma design rather than generic approximation.

## 15. Risks and controls

### Risk: Page implementation drifts into generic AI website patterns

Control: Figma controls section order and visual hierarchy; this specification explicitly forbids filler labels, fake proof, generic icon-card sections, and decorative medical clichés.

### Risk: Placeholder media determines the final visual direction incorrectly

Control: placeholders preserve aspect ratio and spacing but remain visibly neutral and replaceable.

### Risk: Homepage implementation creates components too specific for reuse

Control: catalogue cards, media, headings, and procurement panels live under a shared public-catalogue feature boundary.

### Risk: Deferred tests allow defects to accumulate

Control: defer repeated user-run commands, not the final milestone gate. Keep code batches small, review diffs, preserve regression checks, and run one complete verification round before F3A acceptance.

### Risk: F3A expands into later phases

Control: family pages, product details, active filters, inquiry behavior, catalogues, company pages, and admin remain explicitly excluded.

## 16. Implementation decision

Proceed with F3A using the approved approach: implement the homepage and products overview first, establish reusable public catalogue components, preserve fixture-only data isolation, and require a consolidated quality gate before moving to F3B.