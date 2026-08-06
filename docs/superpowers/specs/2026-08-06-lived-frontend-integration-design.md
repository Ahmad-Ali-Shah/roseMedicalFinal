# Lived and Public-Site Integration Design

**Date:** 2026-08-06  
**Target branch:** `integration/lived-public-site-complete-2026-08-06`  
**Backend source:** `origin/lived` at `4fec4fa534fc318ac8770dbad0e3287ea1b3e589`  
**Frontend source:** `feature/public-site-motion-system` at `48e8d742b89b6860b8689cb0c8d6a6490a32e456`, plus its reviewed working-tree completion

## Goal

Produce one reviewable integration branch that retains the live Supabase, Cloudflare, authentication, admin, and API foundation inherited from `lived` while preserving the completed public frontend, catalogue media, motion, localization, search, inquiry, and responsive work.

## Ancestry finding

The fetched `origin/lived` tip is the merge base of the two sources. The committed frontend branch is 380 commits ahead and `lived` is 0 commits ahead. The integration therefore does not need to reconcile two independently diverged histories. It still requires a semantic audit because later descendant commits and the frontend working tree can alter backend and security behavior without producing Git conflicts.

## Integration mechanism

1. Record this design and the executable plan on the frontend source branch.
2. Run a clean pre-merge verification of the completed frontend working tree.
3. Commit the entire reviewed frontend working tree as a source checkpoint.
4. Create `integration/lived-public-site-complete-2026-08-06` from the fetched `origin/lived` tip.
5. Merge the frontend source checkpoint with `--no-ff` so the new branch has an explicit, reviewable integration boundary even though a fast-forward is possible.
6. Apply and commit post-merge corrections identified by the semantic audit.
7. Run the complete verification matrix and write a detailed handoff report.

This approach preserves both source tips and their history. It avoids a filesystem overlay, which would hide provenance, and avoids a rebase, which would rewrite hundreds of already integrated commits without technical benefit.

## Authority matrix

### Backend and deployment authority

Retain the `lived` architecture for:

- Supabase browser and server clients;
- session refresh and authentication callback behavior;
- protected admin workspace routing and live admin queries;
- inquiry and contact database tables and existing data contracts;
- Cloudflare OpenNext and Wrangler deployment configuration;
- server-side API persistence and operational queues.

Where a later descendant change hardens the same boundary, retain the stronger implementation rather than mechanically restoring an older `lived` file.

### Frontend authority

Retain the completed frontend for:

- public routing and page compositions;
- responsive navigation and Rosa branding;
- homepage, products, family, catalogue, About, procurement, contact, legal, search, inquiry, and quotation experiences;
- product and catalogue registries;
- owner-provided PDFs and media;
- motion primitives, interaction polish, reduced-motion behavior, responsive styling, and RTL/Arabic support;
- accessible forms, error states, empty states, and mobile layouts.

### Security authority

Use the stricter verified behavior at every overlap:

- Keep owner identity enforcement for admin routes and owner APIs. `ROSA_OWNER_USER_ID` is authoritative when configured; normalized `ROSA_OWNER_EMAIL` is the fallback; missing configuration fails closed.
- Keep authentication on inquiry/message reads and inquiry mutations. Customer inquiry reads remain scoped to the authenticated user.
- Keep `ALERT_UNREAD_SECRET` bearer verification before service-role client construction and keep the destination email configurable.
- Keep bounded JSON bodies, strict payload validation, normalized fields, and non-disclosing API errors.
- Keep visitor-supplied URL crawling removed from the contact endpoint because the `lived` implementation permitted server-side requests to arbitrary visitor URLs, creating an SSRF boundary.
- Keep security headers and keep TypeScript/build failures enforced. Do not restore `ignoreBuildErrors` or `ignoreDuringBuilds`.
- Keep the Supabase service-role key server-only. No real or fake service-role credential may be committed as runtime configuration.

## Public quotation decision

Keep the completed anonymous quotation flow because it is the public site's intended procurement path and the frontend depends on it. The API continues to:

- read a bounded body;
- normalize and validate contact fields and immutable product snapshots;
- enforce item and quantity limits;
- reject malformed and fake telephone patterns;
- hash exact requests and return `409` for a detected duplicate;
- create the service-role client only on the server;
- store `user_id: null` and initial status `New` for public submissions.

Production edge rate limiting and real Supabase acceptance cannot be honestly simulated with committed placeholder credentials. They will be recorded as deployment acceptance items instead of being represented as completed by an unreliable in-memory limiter.

## Placeholder and secret policy

- Delete `.github/workflows/temporary-f7-checkpoint.yml`. It is explicitly temporary and injects placeholder Supabase, service-role, owner, alert, and Resend values into CI.
- Retain Playwright's local-only fallback URL/key values because they are scoped to the test server and permit non-persistent browser rendering. They are not imported by application runtime code.
- Do not add `.env`, Supabase secrets, owner credentials, temporary passwords, or production tokens to Git.
- Production and acceptance runs must obtain real values from the deployment secret store.

## Admin decision

Preserve the live `lived` admin foundation and its protected route/data boundaries. Preserve later frontend improvements to admin layout, authentication presentation, responsive behavior, and truthful readiness copy only when they do not replace live queries or enable fake management state. Protected routes must continue redirecting unauthenticated users to `/admin/login`, and owner authorization must remain enforced server-side.

## Validation matrix

The final integration branch must pass:

- `pnpm test` at repository root;
- `pnpm --filter @rosa/web test:foundation`;
- `pnpm lint`;
- `pnpm typecheck`;
- `pnpm build` with non-secret compile-time placeholders only where static generation requires configuration;
- focused security and backend-boundary tests;
- public and admin Playwright coverage at desktop and mobile sizes;
- the owner refinement browser audit with no broken images, page errors, console errors, or horizontal overflow;
- `git diff --check`;
- a tracked-file secret/placeholder scan;
- a final ancestry and merge-parent check.

Real Supabase writes, real owner authentication, Resend delivery, and production edge rate limiting remain deployment acceptance checks because this workspace does not contain production secrets or authority to change Cloudflare account rules.

## Decision record requirements

The final report must identify:

- both exact source commits and the final integration commits;
- the ancestry finding and why `--no-ff` was used;
- every backend/security overlap reviewed;
- which source won each material decision and why;
- removed temporary infrastructure;
- all commands and test counts from final verification;
- any remaining production-only acceptance work for the `lived` maintainer.
