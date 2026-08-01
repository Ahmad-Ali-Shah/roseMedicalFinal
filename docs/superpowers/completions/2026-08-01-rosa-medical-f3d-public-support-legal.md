# Rosa Medical F3D Completion Record

**Date:** 2026-08-01  
**Owner:** Ahmad and Ahmad's frontend AI

## Branch and implementation state

- Branch: `frontend/f3d-public-support-legal`
- Source implementation tip before this record: `7b5d62ead3dbd684e46020a5b464df2c1371e47a`
- Design and plan base: `frontend/f3d-public-support-legal-design`
- Design and plan base commit: `4ba418952539dc1057d09e73c8e46f1d78faf1c0`
- Branch comparison at source review: 6 commits ahead, 0 behind
- OpenAPI changes: None
- Backend implementation changes: None

## Public routes implemented

- `/about`
- `/procurement-support`
- `/contact`
- `/search`
- `/privacy`
- `/terms`

These six paths no longer use generic placeholder dispatch. Each route resolves through an explicit `PublicPageKind` and retains the shared public shell as the sole `<main>` owner.

## Normal public states

### About

- Editorial hero with neutral replaceable media
- Five buyer expectations
- Four professional buyer groups
- Five source-ordered family links
- Procurement Support preview
- Quotation-path CTA
- No company-history, manufacturing, certification or customer-history claims

### Procurement Support

- Six-step procurement process
- Four common requirement types
- Six-item information checklist
- Real links to Products, Inquiry, Contact and Request Quotation
- Process guidance is descriptive and does not claim active selection, submission or confirmation

### Contact

- General-business-message introduction
- Clear separation from product quotation inquiries
- Business name plus six explicit `Awaiting client confirmation` rows
- No realistic placeholder address, telephone, WhatsApp, email, hours or social links
- Seven labelled read-only form fields
- Disabled Send Message action and no submit handler
- Neutral location placeholder
- Real navigation to the product inquiry

### Search

- Read-only search field
- Five source-ordered family shortcuts
- Clear user-facing statement that interactive catalogue search is not currently available
- No mounted results, result count, loading, no-results or error state

### Privacy and Terms

- Shared legal-template renderer
- Privacy Policy with nine sections
- Terms of Website Use with eleven sections
- Same-page section navigation
- `Last updated: awaiting client and legal approval`
- Visible qualified-legal-review warning
- No invented jurisdiction, governing law, processors, analytics providers, retention periods, rights procedures or final liability wording

## Isolated preview states

The following server components are directly testable but are not exposed as public routes and are not mounted in normal public states.

### Contact previews

- Visible focus example
- Two-field accessible validation example
- Loading example
- Failure example
- Success example with optional caller-supplied reference

The default success preview does not claim a message was sent and does not fabricate a reference or email confirmation.

### Search previews

- Typing example
- Desktop results
- Mobile results
- Loading
- No results
- Error

Result previews resolve two F3B catalogue records:

- Scalpel Handle No. 3 — `18-0644`
- Bard Parker Handle — `18-0650`

Product links are real. Add-to-inquiry actions remain disabled.

## Implemented architecture

- Shared `NumberedEditorialList` with explicit semantic list treatment
- Shared registry-backed `FamilyIndex`
- Separate About and Procurement Support data and page composition files
- Separate Contact information model, form primitives and preview components
- Search preview model derived from the F3B catalogue registry
- One reusable legal document model and renderer
- Six explicit route kinds in the existing public resolver
- One dedicated responsive F3D stylesheet imported after F3C styles
- No duplicated product registry or design-token system
- No client state, local storage, server action, API request, email behavior or map integration

## Approved Figma references reviewed

- Search default `25:61`
- Search results `25:95`
- Search typing `25:84`
- Search loading `25:115`
- Search no results `25:130`
- Search error `25:140`
- Mobile search results `25:150`
- About desktop `27:3`
- About mobile `27:92`
- Procurement Support desktop `27:174`
- Procurement Support mobile `27:270`
- Contact desktop `28:3`
- Contact mobile `28:79`
- Contact form states `28:141`
- Contact success desktop `31:2`
- Contact success mobile `31:48`
- Privacy desktop `29:50`
- Privacy mobile `29:150`
- Terms desktop `29:218`
- Terms mobile `29:330`

Figma absolute positioning and placeholder business/legal values were not copied into production source. The implementation uses the existing token system, responsive grid and normal document flow.

## Test specifications added

- Editorial primitive tests
- About composition tests
- Procurement Support composition tests
- Contact normal-state and isolated-preview tests
- Search normal-state, registry and isolated-preview tests
- Legal document and section-count tests
- Route-dispatch tests
- Six-route composition tests
- F3D static CSS policy test
- F3D public-copy policy test
- Playwright coverage across all six routes at 1440, 768 and 390 pixels
- Browser assertions for one `<main>`, one `<h1>`, no horizontal overflow and reachable footer
- Browser assertions that Contact remains non-submitting and Search remains in discovery state

## Source review performed

- Compared `frontend/f3d-public-support-legal-design...frontend/f3d-public-support-legal`
- Result before this completion record: 6 commits ahead, 0 behind
- Changed files are contained to `apps/web/**` F3D features, routing, styles and tests
- No file under `services/api/**` changed
- No file under `packages/contracts/openapi/**` changed
- Normal Contact does not import or mount focus, validation, loading, failure or success previews
- Normal Search does not import or mount typing, results, mobile-results, loading, no-results or error previews
- Search result data is resolved through the existing catalogue registry
- Legal records remain explicit templates instead of model-generated final legal obligations
- Route fallthrough preserves strict catalogue not-found behavior and generic fallback for unrelated unsupported paths

## Automated verification not run

The following commands are prepared but were not executed in the assistant environment:

```bash
pnpm install --frozen-lockfile
pnpm contracts:generate
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm --filter @rosa/web test:foundation
node --test apps/web/src/test/public-page-styles.static.test.mjs
node --test apps/web/src/test/f3b-styles.static.test.mjs
node --test apps/web/src/test/f3c-styles.static.test.mjs
node --test apps/web/src/test/f3d-styles.static.test.mjs
node --test apps/web/src/test/f3d-policy.static.test.mjs
pnpm test:e2e
```

Reason: this implementation was performed through the GitHub connector without a local repository or dependency/runtime environment. These commands are **not passed** until their complete outputs are reviewed.

Browser-render screenshots and pixel-level comparison against Figma are also pending the local runtime gate.

## Known limitations

- Interactive global search remains deferred.
- Desktop mega-menu and mobile navigation state remain deferred.
- Contact fields remain read-only and message submission remains inactive.
- Inquiry mutation and live header count remain deferred.
- Real contact details and location remain client-supplied.
- Privacy and Terms are not publication-ready legal documents.
- Media remains neutral and replaceable.
- Runtime, browser behavior and visual fidelity remain unverified.

## Next milestone

F3E — Static Admin Experience.
