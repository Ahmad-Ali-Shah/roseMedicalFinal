# Rosa Medical Selective Frontend–Backend Integration Status

**Date:** 2026-08-02  
**Branch:** `integration/f3e-d-phase4-backend`  
**Frontend base:** `frontend/f3e-d-governance`  
**Backend source:** `phase-4-backend`  
**Status:** Implementation present; runtime completion is not claimed because the required verification environment is unavailable in this session.

## Integrated

Only existing backend behavior with a direct frontend counterpart was transferred:

- Supabase browser client.
- Supabase cookie-aware server client.
- Supabase session-refresh middleware.
- Next.js middleware entry point.
- Existing authenticated-user guard for the admin workspace.
- Existing password login server action.
- Existing logout server action.
- Existing frontend owner-login composition connected to the login action.
- Existing frontend admin workspace layout connected to the guard.
- Existing frontend workspace header connected to logout.
- Two existing Supabase runtime dependencies added to `apps/web/package.json`.

The current public and admin presentation structure remains based on `frontend/f3e-d-governance`.

## Explicitly Deferred

No frontend was created for backend-only behavior. The following remain outside this integration pass:

- Public cart, checkout, order-success, prices, totals, payments, stock, direct sale, and customer login.
- Appointment request, approval, and decline behavior.
- Public contact persistence and the backend contact API.
- Product-inquiry persistence.
- Catalogue, family, and product database reads or CRUD.
- General-message administration.
- Site-content persistence.
- Contact-details persistence.
- Media uploads.
- Publishing persistence, revision storage, and rollback.
- Password recovery runtime and auth callback.
- New owner allowlists, role tables, schemas, migrations, endpoints, or data mappings.

These capabilities were deferred because their backend shapes either conflict with the documented product model or do not map one-to-one to the existing frontend fields and workflows.

## Authorization Boundary

The transferred `requireAdmin()` implementation verifies that a Supabase user is authenticated. It does not independently prove that the authenticated user is the one documented owner. No new allowlist or role mechanism was invented during this integration. Owner-only authorization therefore remains only as strong as the existing Supabase project configuration and is not claimed as a fully verified G4 implementation.

## Integration Boundary Evidence

`apps/web/src/test/backend-integration-boundary.test.ts` records the approved boundary:

- The transferred authentication/session files must exist.
- The existing admin workspace must call `requireAdmin()`.
- Prohibited checkout, order, public-login, and cart paths must remain absent.
- Incompatible query, type, admin-CRUD, and contact-API paths must remain absent.

Existing frontend tests were adjusted only for the login and logout states that are now connected. Recovery remains explicitly static.

## Verification Attempts

The required repository checks could not be executed in this session:

- Available Node.js: `v22.16.0`.
- Repository engine requirement: Node.js `>=24 <25`.
- `pnpm` is not installed in the execution environment.
- `corepack pnpm --version` attempted to resolve pnpm from `registry.npmjs.org` and failed with `getaddrinfo EAI_AGAIN` because outbound DNS was unavailable.
- The integration branch has no GitHub status checks or workflow runs providing replacement evidence.

Because dependency installation could not run, `pnpm-lock.yaml` was not generated. The backend branch lockfile was not copied because it includes the deferred Mock Service Worker dependency and would not match the integration branch package manifest.

## Verification Still Required

Run in a checkout of `integration/f3e-d-phase4-backend` with Node.js 24 and pnpm 11.4.0:

```bash
pnpm install
pnpm --filter @rosa/web test -- src/test/backend-integration-boundary.test.ts
pnpm --filter @rosa/web test -- src/test/admin-auth-preview.test.tsx src/test/admin-navigation.test.tsx
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Then perform environment-backed route checks with valid Supabase variables:

- Unauthenticated `/admin` redirects to `/admin/login`.
- Invalid owner credentials remain on login and display the existing error state.
- Valid configured credentials reach `/admin`.
- Sign out clears the session and returns to `/admin/login`.
- Existing public routes remain unchanged.

Do not mark G4 accepted or merge this branch into `main` until those checks have fresh successful evidence and the owner-only Supabase configuration is confirmed.
