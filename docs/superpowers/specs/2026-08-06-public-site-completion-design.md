# Rosa Medical Public-Site Completion Design

**Date:** 2026-08-06
**Status:** Approved by the owner's single-run authorization
**Authoritative base:** `feature/public-site-motion-system`, based on `integration/main-premium-polish-reconciliation`

## Objective

Finish every repository-owned public frontend behavior that remains incomplete, repair the confirmed visual defects, and harden the site for realistic review without redesigning the existing Rosa composition. Product-image placeholders remain untouched. New Supabase infrastructure, database migrations, live email provisioning, and deployment-account setup remain outside this frontend completion run.

## Fixed decisions

- Preserve Rosa's existing routes, layout, typography, colors, content hierarchy, and quotation-led business model.
- Do not add prices, checkout language, stock, shipping, accounts as a quotation prerequisite, or public registration.
- Use the existing static catalogue registry as the frontend source for search, filters, listing interactions, and inquiry snapshots.
- Keep current Supabase-backed submission and owner boundaries intact; improve validation only where it does not require schema work.
- Use Riyadh, Saudi Arabia as the temporary map target.
- Replace user-facing contact placeholders with clearly generic example values that are centralized for later replacement.
- Implement Arabic as a public locale experience with correct `lang`, `dir`, navigation, shared-shell translation, core public-page translation, mixed-direction handling, and an Arabic-capable font stack. Product codes remain LTR.
- Preserve image placeholders and approved catalogue media.
- Add no new runtime dependency.

## Architecture

### Shared public application state

A small client-side public-state layer owns the inquiry item count and locale preference. Inquiry changes dispatch a same-tab custom event and continue using local storage, so the header, product actions, inquiry page, and quotation page remain synchronized without introducing a state library.

### Catalogue discovery

Search and family filtering run against normalized records from the existing catalogue registry. A shared pure search module handles tokenization, exact-code priority, family/name/option matching, stable ordering, and URL-query parsing. Client views own input, filter, empty, and reset states; product links remain normal Next links.

### Motion and shell

Large collections no longer depend on one impossible viewport threshold. Item visibility is staged in bounded groups or by item-level observation. Persistent blur is removed from hidden states; entrance motion uses opacity/transform and a short optional blur only where it cannot remain stuck. The header keeps a stable height and readable initial surface. Catalogue cards start light and transition to Rosa black only on hover/focus-capable devices, with explicit inverse button colors.

### Locale and RTL

Locale is route-derived using `/ar` as the Arabic prefix. A locale-aware public resolver maps `/ar/...` to the same page models while translating shared and page copy. The root document receives the correct language/direction for locale routes, and directional icons use logical CSS or mirror under RTL. English remains the default and independent.

### Contact, map, and legal content

Contact details live in one registry and expose usable `mailto:`, `tel:`, and WhatsApp links. A lightweight OpenStreetMap embed points to central Riyadh and is titled, lazy-loaded, and replaceable through centralized coordinates. Privacy and terms become honest example policies describing the current repository behavior without asserting unverified corporate or jurisdictional facts.

### Production hardening

Every public route receives meaningful metadata. Sitemap and robots endpoints cover public routes and exclude admin/account-only surfaces. Security headers are configured centrally. TypeScript build errors are no longer ignored. Error, not-found, and loading states reuse Rosa components. Public forms receive bounded client/server validation and safe status messages.

## Explicit external boundaries

The following cannot be truthfully completed without backend/environment authority and are not simulated:

- Supabase schema creation, migrations, RLS policies, storage buckets, or seed data.
- Transactional publishing, revision persistence, or rollback transactions.
- Real catalogue PDF files that are not present in the repository.
- Real contact ownership, legal approval, domain/DNS, email delivery, analytics selection, or deployment credentials.
- Production rate-limiter infrastructure and Cloudflare operational configuration.

The UI must not claim these external outcomes are complete.

## Acceptance criteria

1. Header is immediately readable, smooth, stable, and responsive.
2. No product grid can remain blurred after loading or scrolling.
3. Catalogue cards are light by default and turn dark on hover/focus with visible actions.
4. Search returns real registry products by name, code, family, size, and option.
5. Family filters work on desktop and mobile; clear/reset and no-result states work.
6. Products can be added from listings and details with quantity/notes, and header counts update immediately.
7. Inquiry and quotation flows remain functional and quotation-led.
8. Contact displays generic example details and a Riyadh map.
9. Arabic routes render with RTL shell, translated primary copy, correct metadata, and mixed-direction safety.
10. Public customer registration/account UI is removed from the public product flow; owner auth remains under `/admin`.
11. Legal, SEO, error, accessibility, and security-header gaps are addressed without invented claims.
12. Unit tests, lint, typecheck, production build, and targeted desktop/mobile/reduced-motion browser tests pass.

