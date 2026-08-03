# Rosa Medical Public Quotation Slice Completion

**Date:** 2026-08-03  
**Branch:** `frontend/public-quotation-slice`  
**Pull request:** `#15`  
**Base:** `main` at `945fe0eecf7a4e4e40a98924afda1b081d8d9d11`

## Completed

The first usable public procurement journey is implemented:

`Product detail → Add to inquiry → Review inquiry → Request quotation → quote_requests persistence → existing owner inquiry queue`

### Public interaction

- Desktop and mobile product-detail actions add an immutable product snapshot to browser local storage.
- Repeated additions merge quantity for the same stored line.
- `/inquiry` now loads selected products, supports quantity changes, line notes, removal, clearing and continuation to quotation.
- `/request-quotation` now renders a live contact form only when selected products exist.
- Failed or unreachable submissions retain the inquiry and return the form to a recoverable error state.
- Confirmed successful submissions clear the browser inquiry and show a reference state.

### Submission boundary

- The existing internal `/api/checkout` route now accepts the quotation-led public payload; no ecommerce UI, public pricing, payment, order, inventory or shipping behavior was added.
- Payload validation normalizes contact fields and immutable item snapshots.
- Telephone validation accepts one optional leading `+` followed only by digits, then applies length and fake-number checks.
- Exact-request hashing provides duplicate detection against the existing `quote_requests.cart_hash` field.
- The existing `quote_requests.message` field stores a readable submitted snapshot, so the existing owner inquiry queue can display the request without a database migration.
- Anonymous submission uses the server-only Supabase admin client after validation; `user_id` is stored as `null` and initial status is `New`.

### Owner boundary

- `ROSA_OWNER_USER_ID` is authoritative when configured.
- `ROSA_OWNER_EMAIL` is used only when no owner ID is configured.
- The approved temporary owner email is the final fallback.
- The temporary password was not committed, logged or placed in documentation.

### Supporting corrections required for verification

- Removed the obsolete Next.js `eslint` configuration property and allowed the configured local Playwright development origin.
- Added type-safe contact-message vector indexing without changing contact behavior.
- Added missing admin-login input names and aligned stale static tests with the already-live authentication forms.
- Added a test-time `next/navigation` mock for live client authentication components.
- Stabilized the browser journey by waiting for the post-write inquiry link before navigating.

## Review result

A final structured review covered the approved design, anonymous insertion boundary, owner authorization, inquiry persistence, failure clearing rules and changed tests.

- One concrete defect was found: malformed telephone strings containing multiple `+` characters were accepted.
- The regression test failed first in run `30816482709`, then passed after the minimal normalizer correction.
- No remaining Critical or Important code-level defect was identified inside the approved slice.
- Production abuse controls and real Supabase acceptance remain release blockers, not completed work.

## Explicitly unchanged

- No database migration.
- No OpenAPI source change.
- No `services/api/**` change.
- No customer-account requirement.
- No email-delivery implementation.
- No product publishing, media, Arabic/RTL or visual-redesign work.
- No permanent quotation-specific GitHub Actions workflow; the temporary review workflow was removed after success.

## Verification

Final verified application-code commit: `7b880dd0f6329c35e8e6e40f74def0c5d69d86d8`.  
Full verification carrier commit: `7f94e4f5c0f0258410f19fbaae0c44587f9fb650`.  
Temporary workflow removal commit: `21a0b2c60ce8e3b7be98f4e5861e0f93b3440e21`.

GitHub Actions run `30816803869` passed:

- `pnpm install --frozen-lockfile`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
  - Contracts: 3 passed
  - Web: 224 passed across 49 files
  - Combined: 227 passed, 0 failed
- `pnpm build`
- Targeted Playwright desktop/mobile matrix:
  - 21 passed
  - 1 intentional mobile-only skip
  - 0 failed

The run used non-secret placeholder Supabase values for compile/build and browser rendering only. It did not perform a real Supabase insert or authenticate the real owner.

## Runtime verification still required

Before production release, configure real Supabase values and verify:

1. One quotation request inserts into the real `quote_requests` table.
2. An exact repeat receives HTTP 409.
3. Concurrent identical submissions cannot create duplicate rows under the real database constraints.
4. The protected owner can sign in and see the submitted snapshot in `/admin/inquiries`.
5. A configured `ROSA_OWNER_USER_ID` denies every other authenticated account, including an account matching only the fallback email.
6. Production abuse protection/rate limiting is accepted for the anonymous submission endpoint.

## Next exact batch

Run the real Supabase quotation acceptance pass using the protected owner account, then add production abuse protection and transactional inquiry notification without expanding into ecommerce.
