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

## Explicitly unchanged

- No database migration.
- No OpenAPI source change.
- No `services/api/**` change.
- No customer-account requirement.
- No email-delivery implementation.
- No product publishing, media, Arabic/RTL or visual-redesign work.
- No permanent quotation-specific GitHub Actions workflow; the temporary verification workflow was removed after success.

## Verification

Final verified implementation commit before temporary-workflow removal: `e4efb2e38fbf73ef428c83180404872794fcb775`.

GitHub Actions run `30815597518` passed:

- `pnpm install --frozen-lockfile`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
  - Contracts: 3 passed
  - Web: 223 passed across 49 files
  - Combined: 226 passed, 0 failed
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
3. The protected owner can sign in and see the submitted snapshot in `/admin/inquiries`.
4. A configured `ROSA_OWNER_USER_ID` denies every other authenticated account, including an account matching only the fallback email.
5. Production abuse protection/rate limiting is accepted for the anonymous submission endpoint.

## Next exact batch

Run the real Supabase quotation acceptance pass using the protected owner account, then add production abuse protection and transactional inquiry notification without expanding into ecommerce.