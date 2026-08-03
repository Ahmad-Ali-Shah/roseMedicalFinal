# Minimal Critical Security Patch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close four critical authorization/data-exposure issues without expanding into product or architecture work.

**Architecture:** Keep the existing Next.js/Supabase structure. Add one focused API authorization helper, apply it to the affected routes, scope customer inquiry reads server-side, protect the service-role alert route with a bearer secret, and delete contact-route remote crawling.

**Tech Stack:** Next.js 16, TypeScript, Supabase SSR, Vitest, Node 24, pnpm 11.4.0.

## Global Constraints

- Modify only the approved critical paths and focused tests.
- Do not change checkout, signup, account existence, OpenAPI, publishing, visuals, database schema, or unrelated architecture.
- Write failing tests before production changes.
- Preserve current admin search/status behavior after authorization.

---

### Task 1: Add failing security boundary tests

**Files:**
- Create: `apps/web/src/test/minimal-critical-security.test.ts`

**Interfaces:**
- Consumes: affected route source files and account page
- Produces: static regression assertions for required authorization/scoping behavior

- [ ] Assert `/account` calls `/api/inquiries?scope=mine` and contains no client-side user-ID filter.
- [ ] Assert admin inquiry/message/update routes call the owner authorization helper.
- [ ] Assert alert route checks `ALERT_UNREAD_SECRET` before `createAdminClient()`.
- [ ] Assert contact route contains no `fetch(url` or `crawled_urls` path.
- [ ] Run `pnpm --filter @rosa/web test -- src/test/minimal-critical-security.test.ts` and confirm failure.

### Task 2: Add minimal API authorization helper and protect admin routes

**Files:**
- Create: `apps/web/src/lib/supabase/api-auth.ts`
- Modify: `apps/web/src/app/api/inquiries/route.ts`
- Modify: `apps/web/src/app/api/inquiries/update/route.ts`
- Modify: `apps/web/src/app/api/messages/route.ts`

**Interfaces:**
- Produces: `requireApiUser()` and `requireApiOwner()` returning authenticated context or a JSON response

- [ ] Implement authenticated-user lookup with a 401 JSON response.
- [ ] Implement owner matching against `ROSA_OWNER_USER_ID` first, then normalized `ROSA_OWNER_EMAIL`; reject missing owner configuration and non-owner users with 403.
- [ ] In `/api/inquiries`, support `scope=mine` by applying `.eq("user_id", user.id)` and skip admin filters; otherwise require owner before querying all records.
- [ ] Require owner at the start of inquiry update and message list handlers.
- [ ] Run the focused test and keep remaining failures limited to later tasks.

### Task 3: Protect alert route and remove contact crawling

**Files:**
- Modify: `apps/web/src/app/api/alert-unread/route.ts`
- Modify: `apps/web/src/app/api/contact/route.ts`

**Interfaces:**
- Alert route consumes `Authorization: Bearer ...` and `ALERT_UNREAD_SECRET`.

- [ ] Validate the bearer token with constant-time comparison before creating the service-role client.
- [ ] Return 401 for missing/mismatched token and 503 when the secret is not configured.
- [ ] Remove all visitor-controlled URL extraction, remote fetch, HTML parsing, and `crawled_urls` writes.
- [ ] Preserve honeypot, keyword, and similarity checks.
- [ ] Run the focused test and confirm it passes.

### Task 4: Scope the account request and verify

**Files:**
- Modify: `apps/web/src/app/(public)/account/page.tsx`

**Interfaces:**
- Consumes: `GET /api/inquiries?scope=mine`

- [ ] Replace the broad inquiry request with the scoped endpoint.
- [ ] Remove client-side `user_id` filtering and handle non-array/error responses safely.
- [ ] Run focused test.
- [ ] Run `pnpm --filter @rosa/web lint`.
- [ ] Run `pnpm --filter @rosa/web typecheck`.
- [ ] Run `pnpm --filter @rosa/web test -- src/test/minimal-critical-security.test.ts src/test/backend-integration-boundary.test.ts`.
- [ ] Run `pnpm --filter @rosa/web build`.
- [ ] Record exact verification and changed paths in a completion note.