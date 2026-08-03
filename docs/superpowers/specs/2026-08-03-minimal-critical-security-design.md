# Minimal Critical Security Patch Design

**Date:** 2026-08-03
**Branch:** `fix/minimal-critical-security`

## Goal

Close only the four immediately exploitable or data-exposing paths identified in the implementation audit, without changing product architecture, checkout/account behavior, contracts, publishing, visuals, or unrelated code.

## Approved scope

1. Protect admin inquiry/message reads and inquiry updates with the existing authenticated admin guard.
2. Make `/api/inquiries` return only the signed-in customer's records for customer account requests, while allowing guarded admin queries for the admin workspace.
3. Protect `/api/alert-unread` with an internal bearer secret before constructing the service-role client or sending email.
4. Remove visitor-controlled remote URL fetching from `/api/contact`; retain honeypot, keyword, and similarity spam checks.

## Design

- Add a small API-oriented authorization helper that returns the current authenticated user or a JSON 401 response, and an owner check using `ROSA_OWNER_USER_ID` or `ROSA_OWNER_EMAIL`.
- `/api/inquiries` accepts `scope=mine` for customer history. Without `scope=mine`, it requires the configured owner and supports existing admin search/status filters.
- `/api/inquiries/update` and `/api/messages` require the configured owner.
- `/api/alert-unread` requires `Authorization: Bearer <ALERT_UNREAD_SECRET>` and rejects missing/mismatched configuration before creating a service-role client.
- `/account` requests `/api/inquiries?scope=mine` and no longer receives or filters all inquiry records.
- `/api/contact` performs no outbound fetch based on user content.

## Explicitly excluded

- Checkout, signup, account removal, contract alignment, inquiry snapshots, publishing, migrations/RLS, redesign, broad validation refactors, and architecture cleanup.

## Verification

Focused tests prove route authorization, customer query scoping, internal-secret enforcement, account endpoint usage, and absence of visitor-controlled remote crawling. Then run lint, typecheck, focused tests, and production build.