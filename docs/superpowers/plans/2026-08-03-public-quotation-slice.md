# Rosa Medical Public Quotation Slice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a minimal live product-to-quotation journey that stores selected product snapshots in the browser, submits one validated request to Supabase and shows it in the existing owner inquiry queue.

**Architecture:** A small client-side inquiry store owns local-storage serialization and immutable item snapshots. Product detail actions call the store, `/inquiry` and `/request-quotation` become client pages, and the existing `/api/checkout` route becomes the anonymous controlled insertion boundary using the server-only Supabase admin client. The existing `quote_requests` schema and admin queue are retained.

**Tech Stack:** Next.js App Router, React, strict TypeScript, browser localStorage, Supabase, Vitest and React Testing Library.

## Global Constraints

- Do not commit the supplied temporary password.
- Keep `ROSA_OWNER_USER_ID` preferred and `ROSA_OWNER_EMAIL` configurable.
- Use `ahmadaliofficial1155@gmail.com` only as the temporary fallback owner email.
- No database migration, OpenAPI rewrite, email delivery, customer-account requirement, Arabic, publishing or visual redesign.
- Preserve existing public design classes and admin inquiry rendering.
- Clear browser inquiry state only after confirmed submission success.

---

### Task 1: Inquiry storage and product actions

**Files:**
- Create: `apps/web/src/features/inquiry/inquiry-store.ts`
- Create: `apps/web/src/features/inquiry/add-to-inquiry-button.tsx`
- Create: `apps/web/src/features/inquiry/index.ts`
- Modify: `apps/web/src/features/product-detail/product-procurement-summary.tsx`
- Modify: `apps/web/src/features/product-detail/mobile-inquiry-bar.tsx`
- Modify: `apps/web/src/features/product-detail/product-detail-page.tsx`
- Test: `apps/web/src/test/inquiry-store.test.ts`

**Interfaces:**
- `InquiryItem` contains product identity, option snapshots, quantity and notes.
- `readInquiry(): InquiryItem[]`
- `addInquiryItem(item: InquiryItem): InquiryItem[]`
- `updateInquiryItem(id: string, patch: Partial<Pick<InquiryItem, "quantity" | "notes">>): InquiryItem[]`
- `removeInquiryItem(id: string): InquiryItem[]`
- `clearInquiry(): void`

- [ ] Write store tests proving first add, duplicate merge, quantity clamp, note update, removal and clear behavior.
- [ ] Verify the tests fail because the module does not exist.
- [ ] Implement the storage functions with defensive JSON parsing and a stable storage key.
- [ ] Implement a client Add button that saves the product snapshot, changes its label to `Added to inquiry`, and links users to `/inquiry` after success.
- [ ] Pass the product snapshot to desktop and mobile actions; remove the disabled preview state.
- [ ] Run focused tests and commit.

### Task 2: Live inquiry review page

**Files:**
- Create: `apps/web/src/features/inquiry/inquiry-page.tsx`
- Modify: `apps/web/src/features/public-routing/resolve-public-page.tsx`
- Test: `apps/web/src/test/public-quotation-slice.test.tsx`

**Interfaces:**
- `InquiryPage` loads stored items after mount.
- Quantity controls call `updateInquiryItem`.
- Notes persist on change.
- Removal and clearing update both local storage and rendered state.
- Empty state reuses `EmptyInquiryPage`.

- [ ] Write a failing component test proving stored items render, quantity changes, removal works and `/request-quotation` is available only when items exist.
- [ ] Implement `InquiryPage` with existing inquiry CSS classes and accessible controls.
- [ ] Route `/inquiry` to `InquiryPage`.
- [ ] Run focused tests and commit.

### Task 3: Live quotation form and controlled Supabase insertion

**Files:**
- Create: `apps/web/src/features/inquiry/quotation-page.tsx`
- Create: `apps/web/src/features/inquiry/quotation-payload.ts`
- Modify: `apps/web/src/features/public-routing/resolve-public-page.tsx`
- Modify: `apps/web/src/app/api/checkout/route.ts`
- Modify: `apps/web/src/lib/supabase/api-auth.ts`
- Test: `apps/web/src/test/quotation-payload.test.ts`
- Test: `apps/web/src/test/public-quotation-slice.test.tsx`

**Interfaces:**
- `normalizeQuotationPayload(value: unknown)` returns a validated contact/item payload or a field-safe error.
- `formatQuotationMessage(payload)` returns the human-readable immutable snapshot stored in `quote_requests.message`.
- `createQuotationHash(payload)` hashes normalized email and immutable item snapshots.
- API responses: 201 success, 400 validation, 409 duplicate, 500 generic persistence failure.

- [ ] Write failing payload tests for valid normalization, empty items, invalid contact fields, readable snapshot formatting and stable hashes.
- [ ] Implement payload validation and formatting without adding dependencies.
- [ ] Replace the checkout API auth requirement with strict anonymous payload validation followed by service-role duplicate lookup and controlled insert.
- [ ] Set `user_id` to `null`, initial `status` to `New`, and store name, email, phone, message and cart hash only.
- [ ] Add the temporary fallback owner email while preserving environment overrides; never store the password.
- [ ] Implement `QuotationPage` using existing quotation form classes, confirmation checkbox, submission states and current inquiry summary.
- [ ] Clear local storage only after a 201 response and show a success state.
- [ ] Route `/request-quotation` to `QuotationPage` and retain the blocked state for an empty inquiry.
- [ ] Run focused tests and commit.

### Task 4: Integration verification and coordination

**Files:**
- Modify: `apps/web/tests/e2e/f3b-catalogue-pages.spec.ts`
- Create: `apps/web/tests/e2e/public-quotation-slice.spec.ts`
- Modify: `README.md`
- Create: `docs/superpowers/completions/2026-08-03-public-quotation-slice.md`

- [ ] Update the product-detail browser assertion from `/checkout` to active Add-to-inquiry behavior on desktop and mobile.
- [ ] Add a browser flow covering add, inquiry review and quotation form without requiring a live submission when Supabase credentials are unavailable.
- [ ] Run focused Vitest tests, lint, typecheck and build when the environment supports them.
- [ ] Record exactly which checks ran and which runtime checks remain unavailable.
- [ ] Append a concise README coordination entry without rewriting history.
- [ ] Compare the branch against latest `main`; resolve only relevant conflicts.
- [ ] Commit the completion record.