# Rosa Medical Public-Site Responsive Density Design

**Date:** 2026-08-09  
**Status:** Approved design; written-spec review pending  
**Implementation branch:** `frontend/client-feedback-responsive-homepage-pr`  
**Verified starting commit:** `bddfdd2e573394e64edc0d3190b3f1307694807b`  
**Reference implementation:** Current responsive homepage and `apps/web/src/styles/public-density.css`

## 1. Purpose

The homepage has established the approved responsive-density language for ROSA: controlled display typography, useful first viewports, width- and height-aware spacing, practical interaction targets, and firm large-screen ceilings. The remaining public website still uses older values that can make ordinary laptop viewports feel artificially enlarged.

This phase propagates the homepage's density principles to every non-admin route without redesigning page structure, changing catalogue truth, or touching backend behavior. The result should feel like one coherent ROSA site at phone, tablet, laptop, desktop, and large-monitor sizes.

The work uses native responsive layout. Global `transform: scale(...)`, CSS `zoom`, root-font shrinking, and indiscriminate page-wide scaling are prohibited.

## 2. Recovered Repository State

The worktree already contains uncommitted owner work that must be preserved, including:

- removal of header social links beside the Request a quote action;
- smoother homepage hero transitions;
- a persistent homepage family selection that starts on Knives and changes on hover or focus;
- current dependency, development configuration, media-hover, and density refinements.

The implementation must work with these changes and must not reset, replace, or silently include unrelated files in intermediate commits. Shared CSS changes require homepage regression checks.

The root `README.md` remains authoritative for frontend/backend ownership. No shared API contract, Supabase behavior, database schema, protected admin behavior, quotation persistence, or product data is changed by this design.

## 3. Public Route Inventory

### 3.1 Primary public content routes

- `/` and `/ar`: homepage regression baseline only;
- `/products`: products overview;
- `/products/{family}`: Knives, Scissors, Punches, Chisels, and Cutters listings;
- `/products/{family}/{product}`: every valid product detail route resolved from the catalogue manifest;
- `/catalogues`: technical catalogue index;
- `/about`: company/editorial page;
- `/procurement-support`: procurement guidance;
- `/contact`: live-settings contact page;
- `/search`: product search;
- `/inquiry`: inquiry review;
- `/request-quotation`: quotation form, blocked, and success states;
- `/privacy` and `/terms`: legal pages.

### 3.2 Public auth/account routes

- `/login` redirects to `/admin/login`;
- `/forgot-password` and `/reset-password` redirect to `/admin/recovery`;
- `/account` redirects to `/inquiry`.

These aliases are part of the public route audit, but they do not render public page compositions. Verification covers their existing redirect destinations only. The `/admin/login` and `/admin/recovery` destination UIs remain excluded with the rest of `/admin/**`.

### 3.3 Shared public states

Public loading, error, empty, validation, failure, success, and not-found surfaces are included where they share the affected components or can be reached through the public route tree.

Every applicable route is verified in English and Arabic. `/admin/**` is excluded.

## 4. Chosen Architecture

The approved approach is a layered density extension.

1. Extend `public-density.css` with reusable internal-page density tokens.
2. Apply shared component defaults where the same role appears across routes.
3. Add bounded page-family adjustments for composition-specific needs.
4. Use a small number of width and height exceptions only where the base fluid rules cannot express the target.

Existing page CSS remains responsible for brand treatment, colors, motion, imagery, and information hierarchy. The density layer controls measurements and responsive composition. Existing React components change only when a stable page wrapper or semantic hook is needed for clean scoping.

The implementation will not mechanically globalize homepage-only selectors. Homepage carousel and family-gallery composition remain homepage-specific.

## 5. Shared Density Vocabulary

The internal-page system will reuse or extend concepts for:

- public inline gutter and maximum content widths;
- compact and standard section block spacing;
- internal-page intro spacing;
- display, section-title, lead, and body scales;
- card and grid gaps;
- editorial and product-media ceilings;
- form-control and textarea sizing;
- compact short-viewport values.

Normal desktop display text should operate near the homepage's scale language, generally around `2.45rem` to `3.85rem` with a ceiling near `4rem`. Section headings should generally stay near `2rem` to `2.75rem`. Body copy remains near `1rem` to `1.06rem`; density does not come from making reading text small.

The exact token assigned to a product name, legal title, form heading, or card title depends on its role. One font-size clamp will not be forced onto every component.

## 6. Responsive Composition

### 6.1 Short laptops

At approximately `1280x720` and `1366x768`, intro padding, section rhythm, large media, and card heights receive compact height-aware ceilings. A normal internal page should show the shared header, its title and essential context, and a meaningful beginning of real page content.

The implementation will use a small coherent set of height queries around 800px and, where needed, 720px. It will not create a breakpoint for every tested viewport.

### 6.2 Large monitors

At `1920x1080` and `2560x1440`, content widths, type, media, and section padding stop growing after sensible maximums. Extra viewport space reveals more content and creates measured breathing room rather than enlarging titles and images indefinitely.

### 6.3 Phones

At `360x800`, `390x844`, and `430x932`, composition becomes deliberately single-column where appropriate. Headings wrap safely, product information follows a useful order, controls retain practical touch targets, and forms stay comfortable. Mobile is not aggressively compressed to satisfy desktop continuation targets.

### 6.4 Tablets

Portrait `768x1024` and landscape `1024x768` are treated as distinct geometries. Responsive grids use usable space and pointer capability where necessary instead of assuming one raw-width breakpoint describes both experiences.

## 7. Page-Family Treatment

### 7.1 Products and family listings

Products and family pages receive shorter intro compositions, controlled display typography, compact search/filter rows, denser but still premium grids, and reduced inter-card gaps. Instrument imagery remains large enough for product evaluation. The first family or product content becomes materially visible on laptop viewports.

The locked five primary families and all catalogue inventory, grouping, codes, sizes, variants, and media relationships remain unchanged.

### 7.2 Product detail

The gallery and core product summary remain a balanced desktop composition. Gallery height receives a viewport-aware maximum; breadcrumbs, product identity, description, specifications, option fields, quantity, note, and inquiry action use tighter rhythm. Long names and specifications remain naturally wrapping.

On mobile, gallery, thumbnails, product identity, options, and inquiry controls follow a coherent reading and action order. The sticky inquiry bar must not hide content or footer actions. Product IDs, codes, live data behavior, and inquiry semantics remain unchanged.

### 7.3 About and procurement support

Editorial headings, hero media, company profile, buyer cards, process blocks, requirement lists, procurement panels, and final calls to action receive controlled type/media ceilings and tighter section rhythm. The pages retain their editorial character without using near-viewport-height blank space as decoration.

No company history, certification, manufacturing, factory, ownership, or clinical claim is added.

### 7.4 Contact and quotation

The Contact intro becomes compact enough for contact information or the form to begin in the first laptop viewport. Contact details, social links, map, form layout, input heights, textarea height, and supporting calls to action are tuned without reducing usability.

Quotation and inquiry surfaces use the same form-density language while preserving the quotation-led model. There are no prices, checkout, payments, orders, inventory UI, or ecommerce semantics. Live `site_settings`, validation, persistence, and Supabase behavior are presentation dependencies only and are not modified.

### 7.5 Catalogues, search, legal, and public states

Catalogue cards, search controls/results, legal navigation/content, empty states, success states, and error states receive restrained intros, readable line lengths, safe type ceilings, and route-appropriate grid density. Catalogue covers and product imagery retain their intended aspect ratios.

### 7.6 Auth and account

Login, recovery, reset-password, and account aliases retain their current redirects. Automated coverage confirms `/login` reaches `/admin/login`, both recovery aliases reach `/admin/recovery`, and `/account` reaches `/inquiry`. No `/admin/**` presentation, authentication, session, authorization, or redirect behavior is changed.

## 8. Shared Shell Boundaries

Header changes remain centralized. Page-specific header scaling hacks are prohibited. The current removal of social links beside Request a quote is preserved. Footer density may be refined centrally if visual verification shows a repeated problem, while intentional footer/contact social placement remains intact.

The homepage remains the visual density baseline. Shared changes must not regress its hero, four-slide carousel, transition quality, persistent family selection, mobile family rail, section rhythm, RTL layout, or next-section visibility.

## 9. Accessibility, Localization, and Motion

### 9.1 Text scaling

Approximate 200% text scaling is a content-safety test. Fixed-height containers must not trap headings, labels, messages, or buttons. Exact first-viewport continuation targets yield to readable, non-overlapping content.

### 9.2 Arabic and RTL

Noto Sans Arabic remains the Arabic font. Arabic headings use approximately 600 weight with more generous line height; labels use approximately 700; body text uses approximately 400 to 500 and a longer line height than English. Explicit LTR strings such as email addresses, URLs, product codes, and measurements remain readable. Images and physical focal points are not blindly mirrored.

### 9.3 Motion

Existing reveals, hover treatment, route transitions, and carousel behavior remain intact. Density changes introduce no resize listeners or new motion system. Under `prefers-reduced-motion`, content remains visible without delayed reveals, unnecessary transforms, or layout instability.

## 10. Implementation and Commit Slices

Implementation proceeds incrementally:

1. baseline screenshot audit and failing acceptance coverage;
2. shared density tokens and internal-page hooks;
3. products, family listings, and catalogues;
4. product detail;
5. About and procurement support;
6. Contact, inquiry, and quotation;
7. search, legal, public states, and public redirect aliases;
8. full responsive, localization, accessibility, and regression closeout.

Commits remain coherent. Existing dirty homepage feedback work is preserved and either committed as its own already-owned slice or left untouched; it is not mixed accidentally into density commits. No destructive git operation is permitted.

## 11. Verification Strategy

### 11.1 Automated acceptance

Focused Playwright coverage will assert, as appropriate per route template:

- successful navigation and visible primary heading;
- no horizontal overflow;
- text containment and wrapping;
- practical interactive target sizes;
- first-viewport continuation on normal laptops;
- large-screen media/type ceilings;
- mobile product and form usability;
- unobscured footer and sticky controls;
- homepage regression safety.

Existing unit/component tests cover unchanged content, product, contact, quotation, localization, and routing contracts. New CSS or composition contracts are added only where they provide durable behavioral value.

### 11.2 Visual matrix

Screenshots are captured and manually reviewed at:

- `360x800`;
- `390x844`;
- `430x932`;
- `768x1024`;
- `1024x768`;
- `1280x720`;
- `1366x768`;
- `1440x900`;
- `1536x864`;
- `1920x1080`;
- `2560x1440`.

Every public route template is reviewed at the four audit anchors `390x844`, `768x1024`, `1366x768`, and `1920x1080`. The complete 11-viewport geometry matrix then covers representative pages from each route family. Representative full-page captures verify later sections, footer spacing, and sticky-action safety.

English and Arabic, reduced motion, keyboard/focus behavior, and approximate 200% text scaling receive explicit browser passes.

### 11.3 Regression commands

Before completion, run the repository equivalents of:

- focused frontend unit/component tests;
- the complete web Vitest suite;
- strict TypeScript;
- targeted and repository lint;
- public Playwright suites and the new density matrix;
- production build.

Any pre-existing failure is recorded with exact output and separated from failures introduced by this work. A final git boundary check confirms no `services/api/**`, OpenAPI, migration, Supabase policy, protected admin, or database behavior changed.

## 12. Acceptance Criteria

The phase is complete when every exposed non-admin route has been audited; internal pages use the homepage's responsive-density language; normal laptop layouts no longer feel enlarged; large screens remain controlled; phones and both tablet orientations remain comfortable; imagery and forms remain useful; English, Arabic, reduced motion, and 200% text scaling are safe; the homepage remains green; and frontend verification passes aside from precisely documented pre-existing constraints.
