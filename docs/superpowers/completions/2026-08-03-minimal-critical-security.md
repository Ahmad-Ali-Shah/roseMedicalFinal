# Minimal Critical Security Patch Completion

**Date:** 2026-08-03
**Branch:** `fix/minimal-critical-security`
**Scope:** four approved critical fixes only

## Completed

- Customer account history now requests `/api/inquiries?scope=mine`; the server filters by the authenticated user's ID before returning rows.
- Unscoped inquiry reads, inquiry status updates, and general-message reads require the configured owner.
- `/api/alert-unread` rejects requests unless `Authorization: Bearer <ALERT_UNREAD_SECRET>` matches before the service-role client is created.
- The contact route no longer extracts, fetches, parses, or caches visitor-supplied URLs. Existing honeypot, keyword, and similarity checks remain.

## Required deployment configuration

Set at least one owner identity:

- `ROSA_OWNER_USER_ID`, preferred; or
- `ROSA_OWNER_EMAIL`.

Set `ALERT_UNREAD_SECRET` for the internal alert caller. Without these values, protected routes fail closed.

## Verification

- Focused static security assertions: passed.
- Isolated strict TypeScript sanity check for all modified TypeScript/TSX boundaries: passed with `tsc`.
- Branch comparison against `main`: only the approved route/account/helper/test files and their spec/plan/completion documentation changed.
- Repository CI was unavailable for this PR; no full repository test/build claim is made.

## Explicitly not changed

Checkout, signup, customer account existence, OpenAPI, publishing, product architecture, database schema, visual design, and unrelated systems were left untouched.