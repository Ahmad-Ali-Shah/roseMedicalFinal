# `lived` + completed public-site integration report

Date: 2026-08-06  
Integration branch: `integration/lived-public-site-complete-2026-08-06`  
Worktree: `D:\Cloned\Rosa\.worktrees\public-site-motion-system`

## Executive summary

The `lived` backend line and the completed public-site/frontend line have been integrated on a new branch. The integration preserves the production Supabase, single-owner admin, and Cloudflare/OpenNext architecture from `lived`, while retaining the completed public frontend, media, motion, Arabic routes, search, inquiry, quotation, catalogue downloads, and public content work.

The Git relationship was important: `origin/lived` was not a divergent sibling. It was the exact ancestor of the frontend line. Therefore the safest integration was an explicit two-parent merge, not a file overlay, rebase, or manual backend transplant. This preserves both histories and avoids reverting the security improvements that were developed after `lived`.

The merged application has passed the complete production browser matrix and all code-level gates. Real authenticated Supabase CRUD, email delivery, and Cloudflare deployment still require the production account, real secrets, and a real owner session; those checks are listed explicitly under production acceptance.

At report-writing time, the merge and primary security correction are committed. A final verified routing/test reconciliation and this report remain in the worktree because the Git-write approval quota was exhausted after verification. No files were partially staged, and nothing has been pushed.

## Source refs and topology

| Role | Ref | Commit |
| --- | --- | --- |
| Backend/base authority | `origin/lived` | `4fec4fa534fc318ac8770dbad0e3287ea1b3e589` |
| Completed frontend source | `feature/public-site-motion-system` | `01b5167ff08daf1a2076e2135ee33876ccc61739` |
| Explicit integration merge | `integration/lived-public-site-complete-2026-08-06` | `e35feb63b2627db60bbfc6a0e9ea6772f7856825` |
| Committed integration hardening | same branch | `51fd8ff9af1e5531453de3891b18e6124bb01f94` |

The merge commit has the required parent order:

```text
e35feb63b2627db60bbfc6a0e9ea6772f7856825
|- 4fec4fa534fc318ac8770dbad0e3287ea1b3e589  origin/lived
`- 01b5167ff08daf1a2076e2135ee33876ccc61739  completed frontend
```

Both ancestry checks return success:

```text
git merge-base --is-ancestor origin/lived HEAD                       # exit 0
git merge-base --is-ancestor feature/public-site-motion-system HEAD # exit 0
```

The merge used Git's `ort` strategy and produced no textual conflicts. That did not remove the need for a semantic audit, because several backend/security files had legitimately evolved after the `lived` snapshot.

## Authority decisions

### 1. Backend architecture: retain `lived`

The integration keeps the real Supabase and deployment architecture introduced by `lived`:

- Supabase SSR session refresh and server clients.
- Single-owner admin workspace and protected admin routes.
- Admin product, family, catalogue, media, inquiry, message, content, contact-detail, publishing, revision, and settings domains.
- Contact, quotation, inquiry, message, and unread-alert API boundaries.
- Cloudflare/OpenNext configuration in `apps/web/wrangler.jsonc` and `apps/web/open-next.config.ts`.
- Database-facing models and contracts rather than invented browser-only admin state.

Reason: these are production system boundaries, so a visual branch must not replace them with mocks or temporary local state.

### 2. Security behavior: retain the stronger post-`lived` implementation

Where current code was demonstrably safer than the historical `lived` snapshot, the stronger implementation won. This is consistent with treating `lived` as the architectural authority without intentionally restoring an older vulnerability.

| Area | Historical `lived` behavior | Integrated behavior | Decision reason |
| --- | --- | --- | --- |
| Unread alert endpoint | Unauthenticated invocation and hard-coded recipient | Timing-safe `ALERT_UNREAD_SECRET` validation, configurable owner recipient, service-role use only after authorization | Prevent unauthorized alert triggering and remove hard-coded operational identity |
| Inquiry/message APIs | Authenticated behavior was not consistently owner-gated | `requireApiOwner` and owner-scoped access | Single-owner admin must fail closed |
| Owner identity | Any authenticated user could reach owner surfaces | Prefer `ROSA_OWNER_USER_ID`; normalized `ROSA_OWNER_EMAIL` fallback; deny when neither matches | Explicit least-privilege owner boundary |
| Contact processing | Visitor-supplied URLs could be fetched | No visitor URL crawling; bounded Zod-validated JSON | Removes SSRF-style request behavior |
| Build policy | TypeScript/ESLint failures could be ignored | Production build enforces both | Invalid application code must not deploy silently |
| Browser headers | Limited hardening | CSP, frame denial, content-type protection, referrer policy, permissions policy, COOP, and HSTS | Stronger default browser boundary |
| Admin Supabase client | Dependency could throw an indirect missing-URL error | Explicit server-only, trimmed configuration, fail-closed error, no session persistence/refresh | Predictable server-only secret handling |

### 3. Frontend authority: retain the completed public-site line

The completed frontend remains authoritative for:

- The full-width, edge-faded homepage hero and restrained premium motion system.
- Product-family presentation and all supplied editorial/family imagery.
- Complete product media across Knives, Scissors, Punches, Chisels, and Cutters.
- Five downloadable technical catalogue PDFs and their catalogue artwork.
- Logo-based header branding and about-page identity treatment.
- The revised Rosa company profile and removal of the superseded buyer-steps/scissors-evolution content.
- Riyadh map, example contact details, live contact form, and working catalogue search.
- Browser inquiry state and the public quotation flow.
- English and Arabic public route support, RTL foundations, reduced-motion handling, responsive behavior, and accessibility landmarks.

Reason: these are the approved public experience and do not replace the production backend boundaries.

### 4. Public quotation submissions remain anonymous by design

The public request route remains usable without an account. It validates and normalizes bounded data, limits line counts and quantities, performs duplicate detection, and inserts through the server-side admin client with `user_id` unset and status `New`.

Reason: requiring an authenticated buyer would contradict the approved public procurement flow. Protection for an anonymous production endpoint should be enforced with schema validation, database constraints, duplicate handling, and Cloudflare edge rate limiting rather than a customer login requirement.

### 5. Temporary fake-credential workflow was removed

`.github/workflows/temporary-f7-checkpoint.yml` was deleted. It embedded placeholder service-role, owner, alert, and email values into a temporary CI path.

Reason: placeholder values are acceptable as process-local build/test inputs, but they must not become a production-looking CI contract or a substitute for secret configuration.

## Integration mechanics

1. Fetched and verified `origin/lived` at `4fec4fa534fc318ac8770dbad0e3287ea1b3e589`.
2. Audited graph ancestry and established that `origin/lived` was the frontend branch's merge base and exact ancestor.
3. Committed the completed frontend source at `01b5167ff08daf1a2076e2135ee33876ccc61739` so the merge had an auditable source boundary.
4. Created `integration/lived-public-site-complete-2026-08-06` from `origin/lived`.
5. Performed an explicit non-fast-forward merge, producing `e35feb63b2627db60bbfc6a0e9ea6772f7856825`.
6. Applied the integration-only server configuration hardening and removed the temporary credential workflow in `51fd8ff9af1e5531453de3891b18e6124bb01f94`.
7. Ran the full post-merge browser audit. It exposed old assertions that still expected placeholders, unavailable PDFs, missing preserved-product images, the framed hero, and the preview-only contact/search state.
8. Reconciled those tests with the approved completed frontend and added a pure public-route policy. Invalid public/product routes now render the branded not-found state, disclose no mismatched product, skip Supabase session work, and return `X-Robots-Tag: noindex, nofollow`.

## Public not-found behavior

Next 16's streamed catch-all response was observed to keep transport status `200` even when `notFound()` renders the correct not-found body. The integration therefore verifies the security/SEO contract directly:

- The branded “This page is not in the catalogue.” state is rendered.
- The requested mismatched product is not rendered.
- The proxy classifies unknown public paths before Supabase session refresh.
- The response includes `X-Robots-Tag: noindex, nofollow`.
- Browser tests accept either a framework soft-404 `200` or a future hard `404`, but reject missing no-index protection or product disclosure.

If a hard transport-level `404` is an absolute deployment requirement, validate Cloudflare's deployed behavior and add an edge status rule or dedicated 404 response. Do not replace the current branded page with an unstyled JSON/blank response merely to change the status code.

## Verification evidence

All commands below were run from the integration worktree. Placeholder values were supplied only to the command process and were not written to tracked configuration.

### Unit and contract tests

```text
corepack.cmd pnpm -r test

packages/contracts: 1 file, 3 tests passed
apps/web:           85 files, 407 tests passed
```

### Foundation/static safeguards

```text
corepack.cmd pnpm --filter @rosa/web test:foundation

44 passed, 0 failed
```

These cover design tokens, public/admin shells, route composition, live-vs-preview boundaries, owner auth, responsive safeguards, and motion restraint.

### Type and lint gates

```text
corepack.cmd pnpm -r typecheck  # passed for contracts and web
corepack.cmd pnpm -r lint       # passed for contracts and web
```

### Production build

```text
corepack.cmd pnpm build

Next.js 16.2.11
Compiled successfully
TypeScript passed
18/18 static pages generated
All dynamic public, admin, auth, and API routes emitted
Proxy emitted
```

The production build also proves that the real `server-only` marker is valid. Vitest uses a test adapter only because `server-only` intentionally throws outside a server build.

### Production route smoke

The built server returned HTTP 200 and expected titles for:

- `/`
- `/products`
- `/catalogues`
- `/about`
- `/contact`
- `/procurement-support`
- `/search`
- `/inquiry`
- `/request-quotation`
- `/admin/login`

All five catalogue PDFs returned `application/pdf` from their tracked `/media/catalogues/pdf/` paths.

### Complete Playwright matrix

```text
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3100
PLAYWRIGHT_REUSE_EXTERNAL=1
corepack.cmd pnpm exec playwright test --reporter=line

432 total cases
426 passed
6 expected project-specific skips
0 failed
```

Coverage includes desktop, tablet, and mobile projects; homepage and product composition; all product imagery; catalogue downloads; contact, search, inquiry, and quotation behavior; reduced motion; coarse pointers; viewport overflow; public shell landmarks; legal/support pages; admin authentication surfaces; and fail-closed access to every admin domain.

### Admin coverage proven without production credentials

The automated matrix verifies:

- Login and recovery render correctly.
- No account-creation path is exposed.
- `/admin` and every workspace domain redirect/fail closed without an owner session.
- Nested and malformed admin paths do not disclose workspace routing before authentication.
- Protected surfaces expose no enabled mutation/file controls to unauthenticated users.
- Admin APIs and server actions use the owner boundary in code-level tests.
- Admin data domains use source-backed/live models instead of fictional browser persistence.

## Secret and configuration audit

- No committed real Supabase key, JWT-shaped secret, Resend key, private key, or alert secret was detected in the source audit.
- Placeholder values used for build/test existed only in the invoking process.
- The temporary fake-credential workflow is absent.
- `SUPABASE_SERVICE_ROLE_KEY` is consumed only by server-only code.
- The admin client fails explicitly if the URL or service-role key is missing.
- Public rendering remains possible without Supabase configuration where intentionally supported; protected/live operations fail closed.
- Cloudflare/OpenNext configuration from `lived` was retained.

## Production acceptance checks requiring the real environment

These cannot be truthfully completed with placeholder credentials. The `lived` maintainer should run them in staging/production:

1. Configure real secrets and public configuration:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ROSA_OWNER_USER_ID` (preferred immutable owner identity)
   - `ROSA_OWNER_EMAIL` (fallback/operational recipient as applicable)
   - `ALERT_UNREAD_SECRET`
   - `RESEND_API_KEY`
   - the real site URL and deployment bindings
2. Confirm one authorized owner can log in, recover access, and use every admin domain.
3. Confirm a non-owner authenticated Supabase user is denied everywhere, including APIs and server actions.
4. Exercise live reads and mutations for products, families, catalogues, media, inquiries, messages, content, contact details, publishing, revisions, and settings.
5. Submit a real quotation; confirm the inquiry record and line items are atomic, normalized, and visible to the owner.
6. Repeat the exact quotation and confirm the duplicate contract (`409`) and database uniqueness behavior under concurrency.
7. Submit a contact message and confirm the anti-spam fields, RLS/service permissions, and owner visibility.
8. Invoke the unread-alert endpoint with wrong and correct secrets; confirm wrong requests are denied and the correct email is delivered.
9. Validate any scheduled retention/cleanup job against real data.
10. Configure Cloudflare edge rate limiting for anonymous `/api/checkout` and `/api/contact`.
11. Run an OpenNext/Cloudflare staging deployment and smoke-test cookies, auth callback, PDFs/media, CSP, map iframe, API routes, and soft/hard 404 behavior at the edge.

## Known non-production warning

Vitest's isolated React renderer logs `next/image` quality warnings because it does not load `next.config.ts`. The production configuration explicitly permits qualities `[75, 92]`, and the real production build succeeds without this configuration defect. These warnings do not represent a runtime image error.

## Files added or changed by the final audit correction

- `apps/web/src/features/public-routing/public-route-policy.ts`
- `apps/web/src/test/public-route-policy.test.ts`
- `apps/web/src/proxy.ts`
- `apps/web/src/app/(public)/[[...segments]]/page.tsx`
- Product-media E2E assertions for Knives, Punches, Chisels, and Cutters
- Catalogue, contact/search, homepage, story-page, route-smoke, and catalogue-route E2E contracts

These corrections are fully verified but were not committed at report-writing time because the environment's Git-write approval quota was exhausted. The intended commit message is:

```text
fix: reconcile merged routing and browser contracts
```

Commit that set, then commit this report (or include the report in the same final audit commit) once Git-write approval is available.

## Maintainer review commands

```powershell
Set-Location 'D:\Cloned\Rosa\.worktrees\public-site-motion-system'

git status --short
git show --stat e35feb63b2627db60bbfc6a0e9ea6772f7856825
git show -s --format='%H%n%P%n%s' e35feb63b2627db60bbfc6a0e9ea6772f7856825
git merge-base --is-ancestor origin/lived HEAD
git merge-base --is-ancestor feature/public-site-motion-system HEAD

corepack.cmd pnpm -r test
corepack.cmd pnpm --filter @rosa/web test:foundation
corepack.cmd pnpm -r typecheck
corepack.cmd pnpm -r lint
```

For the browser suite, start a production server with real staging configuration or process-local non-secret placeholders, then run:

```powershell
$env:PLAYWRIGHT_BASE_URL='http://127.0.0.1:3100'
$env:PLAYWRIGHT_REUSE_EXTERNAL='1'
corepack.cmd pnpm --filter @rosa/web exec playwright test --reporter=line
```

## Delivery state

- New integration branch created: yes.
- Explicit merge commit with both source parents: yes.
- `lived` backend/deployment architecture retained: yes.
- Stronger current security improvements retained: yes.
- Completed frontend/media/motion retained: yes.
- Post-merge semantic audit and corrections: yes.
- Full automated verification: green.
- Pushed to a remote: no; not requested.
- Remaining work: commit the verified final correction/report once Git-write approval is available, then run the real-environment acceptance list above.
