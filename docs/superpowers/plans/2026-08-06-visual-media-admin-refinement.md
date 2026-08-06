# Rosa Medical Visual, Media, Quotation, and Admin Refinement Implementation Plan

> **Execution mode:** One approved uninterrupted pass. Follow test-driven development and finish with evidence-based verification.

**Goal:** Integrate the owner's supplied images, correct About and family composition, smooth catalogue interactions, rebuild the quotation form presentation, refine Procurement Support, and deeply verify the admin workspace.

**Architecture:** Add one typed public-media registry, extend existing models with media metadata, reuse `MediaFrame`, `Reveal`, and `Stagger`, and isolate final visual overrides in a new refinement stylesheet imported last. Preserve existing APIs, routes, localization, and auth boundaries.

**Tech stack:** Next.js 16, React 19, strict TypeScript, Motion 12, CSS custom properties, Vitest, Playwright.

## Task 1: Lock requested behavior with failing tests

**Modify:** public catalogue selector, About, catalogue, story, conversion, and procurement tests.
**Create:** a focused visual-media refinement test if separation improves clarity.

- Assert family-card visible order: knives, scissors, cutters, chisels, punches.
- Assert every family model has a stable media record.
- Assert About omits buyer expectations/evolution and renders the company profile, logo, and four buyer images.
- Assert home and catalogue pages render the requested media slots/paths.
- Assert catalogue family-index links are neutral by default through CSS and red on hover/focus.
- Assert the live quotation inputs use the styled field component/wrapper and intentional span classes.
- Assert Procurement Support contains the supplied editorial image and preserved routes.
- Run focused tests and capture the expected failures before implementation.

## Task 2: Import and register supplied media

**Create:** `apps/web/public/media/brand`, `editorial`, and `families` assets.
**Create:** `apps/web/src/features/public-media/public-media.ts` and index export.

- Copy every user-provided file under stable public names.
- Define alt text, fit mode, focal point, and priority policy.
- Give the cutter family image a crop that excludes its source mark while keeping the complete useful instrument silhouette.
- Verify every copied file exists and is decodable.

## Task 3: Implement family order and media cards

**Modify:** public catalogue models/selectors/card, Home and Products composition, relevant CSS.

- Keep canonical family slugs intact for registry/auth/data behavior.
- Introduce a display-order constant used only by visual family-card selectors.
- Add explicit visible sequence and media metadata to the card model.
- Render the supplied images through `MediaFrame`/Next Image with per-family fit and position.
- Preserve card dimensions, links, tilt restraint, keyboard focus, and mobile layout.

## Task 4: Rebuild About content and imagery

**Create:** polished company-profile component.
**Modify:** About page/data, Supported Buyers, About tests, refinement CSS.

- Remove both unwanted modules from the page composition and exports where unused.
- Write honest English and Arabic company-profile copy with owner-editable data boundaries.
- Replace the hero placeholder with the Rosa logo.
- Render the four buyer photographs with overlays, sequence, label, and accessible text.
- Replace the About procurement placeholder with the supplied collaboration photograph.
- Remove obsolete scissors-evolution stylesheet import if no other consumer needs it.

## Task 5: Refine both catalogue experiences

**Modify:** home catalogue model/section, catalogue document model/cover/card, family index, catalogue CSS.

- Attach a representative image to every catalogue item/document.
- Replace abstract document geometry with image-led editorial covers while keeping PDF status truthful.
- Make light-to-ink inversion gradual and ensure descriptions/buttons remain readable throughout.
- Remove permanent first-item red state from the document-led family index.
- Add red hover/focus transition to exactly the active family row.
- Validate coarse-pointer and reduced-motion fallbacks.

## Task 6: Rebuild live quotation form presentation

**Modify:** quotation page and conversion/refinement CSS.
**Optional create:** a small reusable live quotation field component within the inquiry feature.

- Preserve `fetch('/api/checkout')`, validation attributes, error messages, success reference, and post-success inquiry clearing.
- Add explicit form header, grouped panels, field wrappers, full-width field rules, descriptions, required indicators, autocomplete attributes, and input modes.
- Add a deliberate summary header/count, line details, total, and edit action.
- Improve submitting, failure, and success focus/announcement behavior without delaying state.
- Verify at 1440, 1024, 768, and 390 px.

## Task 7: Refine Procurement Support

**Modify:** procurement page/components/data and refinement CSS.

- Use the supplied collaboration image in the hero.
- Give the process a connected editorial rail and measured stagger.
- Differentiate requirement types from process steps without introducing new content claims.
- Improve checklist and route-card focus/hover behavior.
- Preserve every approved route and Arabic copy.

## Task 8: Admin audit and hardening

**Inspect/modify as findings require:** all `admin-*` features, admin App Router files, Supabase middleware/auth helpers, admin API actions, and admin CSS/tests.

- Enumerate the 12 navigation destinations and every detail/invalid route.
- Run all admin unit/static tests and E2E coverage with repository-safe placeholder environment configuration.
- Check desktop/mobile overflow, focus order, labels, disabled controls, empty/loading/error states, and route fallback behavior.
- Confirm auth redirects, no-index metadata, anti-signup policy, and owner-only mutations.
- Fix only evidenced defects; add a regression test before each admin code change.
- Record external Supabase operations that remain unverifiable without credentials.

## Task 9: Browser QA, critique, and final repair

- Start the app using safe placeholder Supabase values if real values are unavailable.
- Use the in-app browser workflow to exercise Home, Products, About, Catalogues, Procurement Support, Inquiry, Request Quotation, Arabic variants, and all accessible admin routes.
- Test catalogue hover/focus, family links, quotation fields/validation, mobile stacking, reduced motion, and no horizontal overflow.
- Capture representative desktop/mobile screenshots and inspect them visually.
- Run lint, typecheck, full Vitest, foundation static tests, production build, and relevant Playwright suites.
- Review the diff for accidental redesign, unverified claims, broken asset paths, mojibake, source marks, placeholder regressions, and user-owned change conflicts.
- Fix every confirmed issue, rerun the affected gate, and only then hand off.
