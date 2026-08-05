# Rosa Medical Public-Site Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the remaining Rosa public-site frontend, repair all audited visual defects, add Arabic/RTL and production-facing polish, and verify the result without creating new Supabase infrastructure or replacing image placeholders.

**Architecture:** Extend the existing feature modules with pure catalogue/search utilities, a small event-driven inquiry shell state, route-derived localization, and shared accessible interaction components. Preserve the current App Router, static registry, Motion dependency, and Supabase API boundaries while removing preview-only public behavior where local data is sufficient.

**Tech Stack:** Next.js 16 App Router, React 19, strict TypeScript, Motion 12, CSS custom properties, Zod, Vitest, Playwright.

## Global Constraints

- Preserve the current design and quotation-led business model.
- Do not replace product image placeholders.
- Do not initialize or redesign Supabase/database infrastructure.
- Do not add a runtime dependency.
- Do not fabricate manufacturing, certification, legal, or corporate-history claims.
- Use Riyadh as the temporary map target and centralized example contact values.
- Keep all content available with JavaScript failure and under reduced motion.

---

### Task 1: Lock regression expectations for confirmed visual defects

**Files:**
- Modify: `apps/web/src/test/f7-public-shell.test.tsx`
- Modify: `apps/web/src/test/f7-motion-primitives.test.tsx`
- Modify: `apps/web/src/test/f7-story-pages.test.tsx`
- Modify: `apps/web/tests/e2e/f7-public-shell.spec.ts`
- Modify: `apps/web/tests/e2e/f7-story-pages.spec.ts`

**Produces:** Failing tests for initial header readability, stable header geometry, non-persistent collection blur, and light-to-dark catalogue interaction.

- [ ] Add static assertions that homepage initial header styling cannot be transparent white-on-white.
- [ ] Add a collection-motion assertion that large lists do not depend on a container intersection threshold.
- [ ] Add catalogue assertions for uniform default card state and explicit dark hover/focus state.
- [ ] Run the focused Vitest files and confirm they fail for the expected current rules.

### Task 2: Repair header, collection reveal, and catalogue motion

**Files:**
- Modify: `apps/web/src/features/motion/stagger.tsx`
- Modify: `apps/web/src/features/motion/reveal.tsx`
- Modify: `apps/web/src/features/motion/text-reveal.tsx`
- Modify: `apps/web/src/features/motion/scroll-header-controller.tsx`
- Modify: `apps/web/src/features/catalogues/catalogue-card.tsx`
- Modify: `apps/web/src/features/catalogues/catalogue-grid.tsx`
- Modify: `apps/web/src/styles/f7-premium-polish.css`
- Modify: `apps/web/src/styles/f7-story-polish.css`
- Modify: `apps/web/src/styles/f3c-pages.css`

**Produces:** Smooth readable shell; observable entrance effects; non-stuck cards; correct catalogue hover inversion.

- [ ] Replace large-container `whileInView` behavior with item-safe staging.
- [ ] Remove persistent blur failure modes while increasing tasteful visible entrance amplitude.
- [ ] Keep header height stable and give the homepage header an immediately readable surface.
- [ ] Remove permanent `featured` black state from the first catalogue card.
- [ ] Implement black background, white text, red cover accent, and visible inverse actions on hover/focus.
- [ ] Disable hover-only inversion on coarse pointers and flatten it for reduced motion.
- [ ] Run focused tests and confirm they pass.

### Task 3: Implement shared inquiry state and complete add-to-inquiry interactions

**Files:**
- Modify: `apps/web/src/features/inquiry/inquiry-store.ts`
- Create: `apps/web/src/features/inquiry/inquiry-count.tsx`
- Modify: `apps/web/src/features/inquiry/add-to-inquiry-button.tsx`
- Modify: `apps/web/src/components/layout/public-shell.tsx`
- Modify: `apps/web/src/features/products/products.data.ts`
- Modify: `apps/web/src/features/family-listing/family-product-card.tsx`
- Modify: `apps/web/src/features/product-detail/static-quantity-field.tsx`
- Modify: `apps/web/src/features/product-detail/product-procurement-note.tsx`
- Modify: `apps/web/src/features/product-detail/product-procurement-summary.tsx`
- Modify: `apps/web/src/test/f7-conversion-polish.test.tsx`
- Create: `apps/web/src/test/inquiry-shell-state.test.tsx`

**Produces:** Immediate shell counts and working listing/detail actions with quantity and notes.

- [ ] Define one inquiry-change event and dispatch it after add, update, remove, and clear operations.
- [ ] Render a hydration-safe inquiry count in desktop and mobile navigation.
- [ ] Replace family-card disabled text with an accessible add action.
- [ ] Make product-detail quantity adjustable and include the selected quantity in the stored item.
- [ ] Make “Add with note” functional without duplicating products.
- [ ] Preserve snapshot identity, selected options, and quantity boundaries.
- [ ] Run inquiry-focused tests and verify add/update/remove/count behavior.

### Task 4: Implement real static-registry search

**Files:**
- Create: `apps/web/src/features/search/search-catalogue.ts`
- Create: `apps/web/src/features/search/search-page.tsx`
- Modify: `apps/web/src/features/search-preview/index.ts`
- Modify: `apps/web/src/features/public-routing/resolve-public-page.tsx`
- Modify: `apps/web/src/styles/f7-story-polish.css`
- Create: `apps/web/src/test/search-catalogue.test.ts`
- Modify: `apps/web/src/test/search-preview.test.tsx`
- Create: `apps/web/tests/e2e/public-search.spec.ts`

**Produces:** Search by product name, code, family, size, and option with query URL, result count, clear, empty, and keyboard behavior.

- [ ] Write ranking tests for exact code, prefix name, family, size, option, normalization, and empty query.
- [ ] Implement pure search normalization and stable ranking against `CATALOGUE_PRODUCTS`.
- [ ] Replace the read-only page with a client search view using a real form and URL query.
- [ ] Render accessible result summaries and normal product links.
- [ ] Add family shortcuts, clear action, no-results recovery, and mobile layout.
- [ ] Run unit and Playwright search tests.

### Task 5: Implement family discovery and mobile filters

**Files:**
- Create: `apps/web/src/features/family-listing/filter-family-products.ts`
- Create: `apps/web/src/features/family-listing/family-product-discovery.tsx`
- Modify: `apps/web/src/features/family-listing/family-listing-page.tsx`
- Modify: `apps/web/src/features/family-listing/family-discovery-shell.tsx`
- Modify: `apps/web/src/features/family-listing/family-filter-preview.tsx`
- Modify: `apps/web/src/features/family-listing/mobile-filter-sheet-preview.tsx`
- Modify: `apps/web/src/features/family-listing/family-no-results-state.tsx`
- Modify: `apps/web/src/styles/public-pages.css`
- Modify: `apps/web/src/styles/f7-product-polish.css`
- Create: `apps/web/src/test/family-filtering.test.ts`
- Create: `apps/web/tests/e2e/family-discovery.spec.ts`

**Produces:** Functional query and documented option filters on all five families, including mobile sheet behavior.

- [ ] Define pure family filter semantics and tests.
- [ ] Build a client discovery wrapper around the existing hero and product cards.
- [ ] Implement desktop search/filter controls with real result counts.
- [ ] Implement an accessible mobile filter dialog with apply, clear, Escape, and focus return.
- [ ] Replace disabled no-results controls with working reset actions.
- [ ] Verify all five family routes at desktop and mobile widths.

### Task 6: Complete contact details, Riyadh map, and public content placeholders

**Files:**
- Modify: `apps/web/src/features/contact-preview/contact-information-model.ts`
- Modify: `apps/web/src/features/contact-preview/contact-information-panel.tsx`
- Create: `apps/web/src/features/contact-preview/riyadh-map.tsx`
- Modify: `apps/web/src/features/contact-preview/contact-page.tsx`
- Modify: `apps/web/src/components/layout/public-shell.tsx`
- Modify: `apps/web/src/styles/f7-story-polish.css`
- Modify: `apps/web/src/test/contact-preview.test.tsx`
- Modify: `apps/web/tests/e2e/f7-story-pages.spec.ts`

**Produces:** Central example contact data, actionable links, and a lightweight accessible Riyadh map.

- [ ] Replace every “Awaiting client confirmation” row with centralized example data.
- [ ] Render telephone, WhatsApp, and email as correctly formatted links.
- [ ] Add an OpenStreetMap iframe centered on Riyadh with lazy loading, title, fallback link, and replaceable constants.
- [ ] Replace footer launch-warning copy with neutral business copy and current year.
- [ ] Verify map and contact links on desktop/mobile.

### Task 7: Implement public Arabic and RTL foundation

**Files:**
- Create: `apps/web/src/features/localization/locales.ts`
- Create: `apps/web/src/features/localization/public-copy.ts`
- Create: `apps/web/src/features/localization/locale-link.tsx`
- Create: `apps/web/src/features/localization/language-switcher.tsx`
- Modify: `apps/web/src/app/layout.tsx`
- Modify: `apps/web/src/app/(public)/[[...segments]]/page.tsx`
- Modify: `apps/web/src/features/public-routing/resolve-public-page.tsx`
- Modify: `apps/web/src/components/layout/public-shell.tsx`
- Modify: public page components and data modules under `apps/web/src/features/{homepage,products,about,procurement-support,contact-preview,catalogues,legal-pages,search}`
- Create: `apps/web/src/styles/rtl.css`
- Modify: `apps/web/src/app/globals.css`
- Create: `apps/web/src/test/localization.test.tsx`
- Create: `apps/web/tests/e2e/public-arabic.spec.ts`

**Produces:** `/ar` public routes with Arabic shell/core copy, RTL direction, locale switcher, Arabic typography, LTR codes/contact tokens, and localized metadata.

- [ ] Define locale parsing, route prefixing, and translation fallback tests.
- [ ] Add Arabic translations for shared shell and all fixed public editorial/legal/contact/search copy.
- [ ] Translate the five family names and generic product-interface labels; preserve registered catalogue names/codes when no approved Arabic product value exists.
- [ ] Render `lang=ar` and `dir=rtl` for Arabic routes without making English publication dependent on Arabic completeness.
- [ ] Add language switching that preserves the current route.
- [ ] Mirror directional layout/icons and isolate codes, phone, email, and numbers with `dir=ltr`.
- [ ] Verify homepage, products, family, product, catalogue, contact, inquiry, quotation, and legal Arabic routes at 390px and 1440px.

### Task 8: Resolve public account conflict and finish legal/route states

**Files:**
- Modify: `apps/web/src/app/(public)/login/page.tsx`
- Modify: `apps/web/src/app/(public)/account/page.tsx`
- Modify: `apps/web/src/app/(public)/forgot-password/page.tsx`
- Modify: `apps/web/src/app/(public)/reset-password/page.tsx`
- Modify: `apps/web/src/features/legal-pages/legal-document-model.ts`
- Modify: `apps/web/src/features/legal-pages/legal-page.tsx`
- Modify: `apps/web/src/app/error.tsx`
- Modify: `apps/web/src/app/not-found.tsx`
- Create: `apps/web/src/app/loading.tsx`
- Modify: related route/static tests

**Produces:** No public signup/account/checkout conflict; usable example legal content; Rosa-consistent application states.

- [ ] Fail current tests that expose public signup/account commerce behavior.
- [ ] Remove public registration and redirect obsolete public account routes to safe public destinations; keep owner recovery only under `/admin`.
- [ ] Replace legal “template/awaiting” copy with clearly generic, behavior-aligned example policies and no unsupported jurisdiction claim.
- [ ] Rebuild error, 404, and loading states from shared Rosa primitives with navigation recovery.
- [ ] Run route, legal, and auth-boundary tests.

### Task 9: Harden metadata, indexing, headers, and form boundaries

**Files:**
- Modify: `apps/web/src/app/layout.tsx`
- Modify: `apps/web/src/app/(public)/[[...segments]]/page.tsx`
- Create: `apps/web/src/app/sitemap.ts`
- Create: `apps/web/src/app/robots.ts`
- Modify: `apps/web/next.config.ts`
- Modify: `apps/web/src/app/api/contact/route.ts`
- Modify: `apps/web/src/app/api/checkout/route.ts`
- Create: `apps/web/src/lib/http/public-request.ts`
- Modify: related tests

**Produces:** Per-route metadata, public sitemap/robots, standard security headers, strict production typing, and bounded public requests.

- [ ] Add metadata generation for root public route kinds and locale variants.
- [ ] Add canonical URLs, descriptions, Open Graph defaults, and no-index rules for obsolete/auth/admin surfaces.
- [ ] Generate sitemap entries for static, family, and product paths in English and Arabic.
- [ ] Configure CSP-compatible baseline, nosniff, referrer, frame, permissions, and transport headers.
- [ ] Remove `typescript.ignoreBuildErrors`.
- [ ] Add content-length checks, Zod request schemas, normalized limits, and safe errors to contact and quotation routes without changing database schema.
- [ ] Add tests for oversized, malformed, and boundary-valid submissions.

### Task 10: Performance, accessibility, and visual maintenance pass

**Files:**
- Modify: motion and card styles under `apps/web/src/styles/f7-*.css`
- Modify: relevant shared components
- Modify: `apps/web/tests/e2e/f7-motion-closeout.spec.ts`
- Create: `apps/web/tests/e2e/public-completion-accessibility.spec.ts`

**Produces:** Bounded animation layer count, stable focus/touch behavior, responsive acceptance, and no persistent filters.

- [ ] Remove blanket `will-change` from large card collections and apply it only during interaction.
- [ ] Avoid layout-changing header animation and expensive backdrop filters on low-capability/coarse-pointer contexts.
- [ ] Verify keyboard navigation, focus visibility, dialogs, forms, map fallback, and skip link.
- [ ] Verify reduced-motion and coarse-pointer fallbacks.
- [ ] Verify zero horizontal overflow at 390, 768, and 1440 widths.
- [ ] Verify no hydration/console errors and no permanent `blur()` on visible content.

### Task 11: Full review, criticism, correction, and final verification

**Files:**
- Modify only files implicated by review findings.
- Update: `docs/superpowers/completions/2026-08-06-public-site-completion.md`

**Produces:** Evidence-backed completion record and clean feature branch.

- [ ] Run focused tests after every task and the complete Vitest suite after integration.
- [ ] Run ESLint and strict TypeScript.
- [ ] Run production build with placeholder environment variables.
- [ ] Run the complete targeted public Playwright matrix in desktop/mobile/reduced-motion modes.
- [ ] Capture and inspect homepage, family grid, catalogues, search, contact/map, inquiry, and Arabic screenshots.
- [ ] Criticize the result against the design: visibility, restraint, responsiveness, content truthfulness, incomplete copy, and interaction consistency.
- [ ] Fix every discovered repository-owned regression and rerun its failing gate.
- [ ] Search source for remaining user-visible “available next phase,” “not currently available,” “awaiting client,” public signup, hardcoded inquiry zero, and stuck blur states.
- [ ] Record external Supabase/email/legal/domain/image dependencies separately without claiming them complete.
- [ ] Commit coherent implementation checkpoints; do not push without explicit instruction.

