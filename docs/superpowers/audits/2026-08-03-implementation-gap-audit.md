# Rosa Medical Implementation-Gap Audit

**Finalized:** 2026-08-03  
**Method:** code-only repository audit  
**Initial audited checkpoint:** `8ad8098e9999fbdd2ee65edeaa8410928922b8e8`  
**Final recheck checkpoint:** `f35fcb21f077a6e42105acad0f88d706008c21e6`  
**Runtime verification:** not performed  
**Status:** final; implementation should proceed from this report

## 1. Executive conclusion

Rosa Medical has a mature static frontend, a working Next.js/Supabase foundation, and several connected reads and mutations. It does not yet have one coherent, production-safe implementation of the approved product model.

The repository currently mixes three incompatible sources of truth:

1. Public catalogue pages mainly use contract fixtures and the static catalogue registry.
2. Several admin and operational pages read or mutate Supabase directly.
3. The OpenAPI 0.1 contract defines versioned `/v1` public catalogue and inquiry operations that the active application does not implement.

The latest `main` commits added public login, sign-up, account history, password recovery, checkout-oriented behavior, alert delivery, and more spam logic. These additions do not invalidate the original audit. They strengthen its main conclusion: security and product boundaries must be stabilized before adding broad CRUD or polish.

The exact next phase is **P0 Boundary Stabilization**. After that, implement the contract-aligned public procurement vertical slice.

## 2. Audit limitations

This audit did not use Supabase credentials, fabricate an owner session, send email, deploy Cloudflare, inspect DNS, exercise object storage, or verify a live database.

Therefore:

- connected Supabase code is classified as runtime-unverified unless a repository test proves the behavior;
- external RLS, tables, policies, triggers, cron jobs, and seeded data are not treated as reproducible evidence unless represented in the repository;
- historical build and test runs remain evidence for the exact commits they tested, not for later runtime behavior.

No application code, contract, database schema, environment variable, security rule, or deployment configuration was changed by this audit.

## 3. Final blocker register

### AUD-P0-01 — Single-owner authorization is not enforced

**Accepted rule:** one protected owner; no public registration and no multi-admin model.

**Evidence:**

- `apps/web/src/lib/supabase/auth-guard.ts` checks only whether a Supabase user exists.
- The admin login action accepts any valid Supabase credential.
- Sensitive inquiry and message API routes and server actions do not consistently call an owner guard.
- Latest `main` adds public sign-up/login and customer-account routes, increasing the number of authenticated non-owner users who may exist.

**Impact:** an authenticated customer or arbitrary Supabase user may satisfy the same condition used to protect the owner workspace. External RLS might reduce the impact, but no repository-owned policy proves it.

**Required correction:** implement one server-only `requireOwner()` rule based on a configured immutable owner identity, call it from every admin layout, handler, and server action, and back it with repository-owned RLS/policy evidence and owner/non-owner tests.

### AUD-P0-02 — Inquiry records can be exposed before client-side filtering

**Evidence from latest `main`:**

- `/account` fetches `/api/inquiries` and then filters the returned collection in the browser by `user_id`.
- `/api/inquiries` was already implemented as a broad query over `quote_requests` without an explicit owner or current-user restriction in the handler.

**Impact:** filtering after the response reaches the browser does not protect other customers' records. A caller may receive the complete inquiry set before the UI hides unrelated rows.

**Required correction:** separate endpoints and authorization rules:

- owner endpoint: owner-only, bounded collection;
- customer endpoint, only if customer accounts remain approved: server-filtered to `auth.uid()`;
- public quotation submission must not require an account under the currently accepted product rules.

### AUD-P0-03 — Public contact submission performs visitor-controlled server fetches

**Evidence:** `apps/web/src/app/api/contact/route.ts` extracts an `http` word from visitor content and fetches it server-side for spam inspection. Later commits retain and expand the crawler/spam logic.

**Impact:** this creates a server-side request forgery boundary without demonstrated private-IP blocking, redirect revalidation, DNS controls, content limits, or safe allowlisting.

**Required correction:** remove remote URL fetching from the synchronous public request path. Keep bounded text-only checks or use a vetted asynchronous service with explicit network restrictions.

### AUD-P0-04 — Public checkout, sign-up, account, and order semantics conflict with the approved product

**Accepted rule:** quotation-led website; no public checkout, orders, prices, payments, inventory, shipping, discounts, ratings, public registration, or customer-account dependency.

**Evidence:**

- product detail links “Add to inquiry” to `/checkout` on desktop/tablet;
- `/api/checkout` requires an authenticated user;
- duplicate detection returns “You have already placed this exact order”;
- latest `main` includes `/login`, sign-up behavior, `/account`, inquiry history, password reset, and redirects that default toward `/checkout`;
- mobile “Add to inquiry” remains disabled.

**Impact:** the active implementation represents a customer-commerce/account workflow rather than the approved anonymous procurement-inquiry workflow.

**Required correction:** retire checkout/order/cart terminology and public registration dependencies. Implement `/inquiry` and `/request-quotation` as the approved structured, anonymous procurement flow.

### AUD-P0-05 — Privileged alert delivery requires explicit protection

**Evidence from latest changes:** an alert route reads unread-message data, sends email through Resend, and later commits introduce a service-role Supabase client. The route shown in repository history has no explicit owner check or signed scheduler-secret validation and includes a fixed recipient address.

**Impact:** a public caller may be able to trigger privileged reads and outbound email. Service-role credentials bypass RLS and must never sit behind an unguarded public handler.

**Required correction:** either remove the route until needed or require a server-only scheduler secret, strict method/body validation, rate limits, and no user-controlled recipients. Keep the service-role client isolated from ordinary request handlers.

## 4. Core P1 gaps

### AUD-P1-01 — No complete public procurement journey

Current states:

- public browsing works from static fixtures/registry;
- desktop/tablet product action goes to `/checkout`;
- mobile action is disabled;
- `/inquiry` renders an empty composition;
- `/request-quotation` renders a blocked composition;
- no product selection is transferred into a structured request;
- no successful anonymous product-to-owner inquiry journey is demonstrated.

### AUD-P1-02 — Active inquiry handler does not implement Contract 0.1

The OpenAPI contract requires `POST /v1/public/inquiries` with:

- `Idempotency-Key`;
- customer details;
- one or more structured items;
- product IDs, quantities, selected options, and line notes;
- immutable submitted snapshots;
- shared error envelopes.

The active `/api/checkout` handler accepts contact fields plus free text, requires authentication, hashes only the message, and stores no immutable item collection.

### AUD-P1-03 — Public and admin catalogue data are disconnected

- Public families/products use contract fixtures or the static catalogue registry.
- Admin collection pages read Supabase `categories` and `products`.
- Admin editors remain read-only source-registry compositions.
- No demonstrated publish path makes a Supabase edit become the public product safely.

### AUD-P1-04 — Publishing, revisions, and rollback are presentation-only

The approved sequence exists in UI and tests:

`Draft → Review → Public Preview → Explicit Publish → Revision History`

But current controls are disabled and no transactional draft, validation, preview, publication, revision, or rollback persistence is connected.

### AUD-P1-05 — Database security and setup are not reproducible from the repository

Repository history claims tables were seeded and columns were added, but the inspected repository does not provide a complete migration/RLS/seed path that can recreate and review the current Supabase state.

## 5. Journey status matrix

| Journey | Final status | Main reason |
|---|---|---|
| Homepage and public editorial pages | Verified static implementation | strong component and browser evidence; not live-managed |
| Products overview, families, product detail | Partially implemented | polished fixture/registry-backed UI; no published live adapter |
| Product inquiry and quotation | Product-rule conflict | checkout/account path; no structured anonymous selection/submission |
| General contact submission | Implemented, runtime-unverified and security-blocked | connected UI/API/Supabase path; SSRF and validation gaps |
| Public customer login/account/history | Product-rule conflict | contradicts no-public-registration decision; inquiry exposure risk |
| Owner login/session/logout | Partially implemented and security-blocked | Supabase auth connected; sole-owner proof absent |
| Owner recovery | Implemented in later code, runtime-unverified | email/callback runtime not proven; public/admin boundaries overlap |
| Admin dashboard | Partially implemented | live counts exist; depends on unverified authorization/data |
| Admin products and families | Partially implemented | live collection reads; add/edit/publish controls unavailable |
| Admin catalogues and media | Static/derived plus live source counts | no upload, replacement, storage, or publication workflow |
| Admin inquiries | Partially implemented and security-blocked | live list/filter/status behavior; endpoint authorization and snapshots missing |
| Admin general messages | Partially implemented and security-blocked | live list/status/note behavior; guard and delivery semantics incomplete |
| Website content | Static/read overlay | Supabase values may display; save/review/publish disabled |
| Contact details | Static only | unresolved source model; no persistence/publication |
| Publishing centre | Static only | documented workflow; no queue or transaction |
| Revisions and rollback | Static only | policy/previews only |
| Search | Static only | read-only field and family shortcuts |
| Arabic/RTL | Structural readiness only | paired fields/previews exist; complete content and acceptance missing |
| Cloudflare/OpenNext deployment | Partially implemented | configuration/build work exists; production security and operational proof absent |

## 6. Frontend layer assessment F0–F9

| Layer | Status |
|---|---|
| F0 — workspace, routes, contract package | Verified foundation, but backend boundary is unresolved |
| F1 — layout and responsive primitives | Verified implemented |
| F2 — design foundations | Verified implemented |
| F3 — static public/admin pages | Substantially verified implemented |
| F4 — mocked/local interactions | Partial; many preview states exist, no coherent mock/live adapter |
| F5 — first public vertical slice | Not accepted; current checkout/account route conflicts with product rules |
| F6 — full live integration | Not achieved; data sources and interfaces are split |
| F7 — visual refinement | Substantial, but some later operational pages use ad hoc inline styling |
| F8 — Arabic/RTL | Structural only |
| F9 — production hardening | Blocked by authorization, SSRF, data exposure, migration, and operational gaps |

## 7. Integration gate assessment G0–G7

| Gate | Final status |
|---|---|
| G0 — Workspace and contract | Partially accepted: workspace and contract exist; implementation does not follow contract |
| G1 — Health and fixtures | Frontend fixture evidence exists; no active `/v1/health` service evidence |
| G2 — Public catalogue reads | Not accepted: public reads remain fixture/registry-backed |
| G3 — Public submissions | Blocked: contact has P0 security issue; inquiry conflicts with contract/product rules |
| G4 — Owner authentication | Blocked P0: authenticated user is not proven to be the sole owner |
| G5 — Admin content | Partial: some live reads/mutations; CRUD/publishing/authorization incomplete |
| G6 — Publishing and revisions | Not operational |
| G7 — Arabic and production | Blocked |

## 8. What existing tests actually prove

The synchronized checkpoint previously passed frozen installation, contract drift checks, lint, strict TypeScript, 207 unit/contract/static tests, production build, and 121 public Playwright cases with two intentional skips.

That evidence proves:

- compilation at the tested checkpoint;
- route and component composition;
- selected responsive behavior;
- static design and policy assertions;
- existence and shape of the OpenAPI document.

It does not prove:

- latest-main build/test health after the later commits;
- sole-owner authorization;
- RLS behavior;
- customer data isolation;
- live inquiry/contact persistence;
- SSRF prevention;
- service-role route protection;
- contract-conformant handlers;
- publishing transactions;
- migrations, backups, email delivery, or production deployment.

## 9. Exact next implementation batch

# P0 Boundary Stabilization

This is one focused implementation phase, not another audit.

### Required work

1. Implement and test `requireOwner()`.
2. Guard every owner page, owner API route, owner server action, and privileged service-role path.
3. Split owner inquiry access from any customer access; filter customer records server-side.
4. Remove server-side crawling from public contact submission.
5. Add bounded schema validation, request-size limits, rate controls, and consistent safe errors.
6. Remove or quarantine public sign-up/account/checkout/order behavior unless the owner explicitly reverses the locked product decision.
7. Add repository-owned migrations, RLS policies, and seed/setup documentation for the boundaries used by the application.
8. Add focused tests for anonymous, non-owner, owner, cross-user access, SSRF payloads, and privileged alert invocation.

### Explicitly out of scope

- broad product CRUD;
- visual redesign;
- Arabic rollout;
- full publishing;
- general refactoring;
- new customer-commerce features.

### Acceptance criteria

- anonymous and authenticated non-owner callers cannot read or mutate owner data;
- one configured owner can perform the intended owner operations;
- a customer cannot receive another customer's inquiry records;
- public contact cannot cause arbitrary outbound server requests;
- service-role routes cannot be triggered publicly;
- no active public flow presents checkout, order, cart, or required customer registration;
- repository migrations/policies can recreate the protected boundary;
- focused security tests, lint, typecheck, tests, and production build pass on the implementation branch.

## 10. After P0 stabilization

Implement the first real procurement slice:

`Products → Family → Product detail → Inquiry list → Structured anonymous quotation request → Immutable submitted snapshot → Guarded owner queue`

Use the generated Contract 0.1 types or revise the contract explicitly before implementation. Do not create another parallel ad hoc handler.

## 11. Audit closure

This audit is complete. No additional implementation-gap audit phase is required before coding.

Future discoveries should be handled inside the relevant implementation phase as ordinary defects or scope decisions. The project should now move directly to **P0 Boundary Stabilization**.