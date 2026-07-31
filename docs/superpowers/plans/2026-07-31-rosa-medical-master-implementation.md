# Rosa Medical Master Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development when available or superpowers:executing-plans to implement this plan task-by-task. Both AIs must read `README.md` before every task and update their owned progress lane after meaningful work.

**Goal:** Build the approved Rosa Medical public website and single-owner admin system through parallel frontend and backend lanes, beginning with a bare navigable frontend layout and a contract-first backend boundary, then adding behavior, data, visual fidelity, publishing, Arabic, and production hardening in controlled layers.

**Architecture:** A pnpm workspace contains a Next.js frontend, a backend-owned service boundary, and a shared OpenAPI contract package. The frontend operates against typed deterministic mocks until each backend integration gate is accepted. The backend may choose its internal framework, but it must implement the shared OpenAPI behavior and preserve the product, publishing, security, and revision rules.

**Tech Stack:** Node.js 24 LTS for frontend tooling; pnpm workspaces; Next.js App Router; React; strict TypeScript; Tailwind CSS 4 plus CSS custom properties; OpenAPI 3.1; `openapi-typescript`; `openapi-fetch`; Mock Service Worker; Zod; Vitest; React Testing Library; Playwright; axe accessibility checks. Backend must provide PostgreSQL-backed persistence or an owner-approved equivalent, secure owner authentication, object/file storage, transactional email, migrations, contract tests, and production observability.

## Global Constraints

- Read and update `README.md` as the permanent AI-to-AI coordination channel.
- Ahmad and Ahmad's AI own frontend implementation; the partner and partner's AI own backend implementation.
- Shared contract files require both lanes to review breaking changes.
- Figma is the visual source of truth: `https://www.figma.com/design/L7LKGItaD2o6tZzHuw1GUQ`.
- The ROSA logo remains unchanged and must not gain a “Medical” lockup.
- Public experience is quotation-led, never ecommerce.
- No public prices, checkout, payments, inventory, stock, shipping, discounts, ratings, or orders.
- One protected owner admin account; no public registration or multi-admin roles in version one.
- Product inquiries and general messages remain separate.
- Publishing follows Draft → Review → Public Preview → Explicit Publish.
- Rollback creates a new revision and never erases history.
- English is implemented first; shared data models include English and Arabic fields from the beginning.
- Public design controls remain protected from admin editing.
- Unverified manufacturing, factory, certification, ownership, award, export, legal, and clinical claims remain blocked or explicitly warned.
- Begin frontend work with route and layout structure, not polished pages.
- Avoid unnecessary GitHub Actions usage; verify locally before pushing.
- Commits represent meaningful layers or features, not trivial adjustments.

---

## 1. Team topology and operating agreement

### Frontend lane

**Owner:** Ahmad and Ahmad's AI  
**Primary boundary:** `apps/web/**`  
**Secondary ownership:** frontend-generated files and fixtures inside `packages/contracts/**`

Responsibilities:

- Public and admin route architecture
- Figma implementation
- Responsive layouts
- Design tokens and components
- Local interactions and client validation
- Typed API adapter
- Mock handlers and deterministic fixtures
- Accessibility and RTL presentation
- Frontend testing, performance, and deployment

### Backend lane

**Owner:** backend partner and partner's AI  
**Primary boundary:** `services/api/**`  
**Secondary ownership:** backend contract proposals, schema examples, and backend runbooks

Responsibilities:

- Backend framework and service architecture
- PostgreSQL schema and migrations
- Secure owner authentication and recovery
- Public and admin APIs
- File/PDF storage
- Inquiry and contact persistence
- Transactional email
- Drafts, publishing, revisions, rollback, audit trail
- Backend validation, security, backups, observability, and deployment

### Shared boundary

**Primary boundary:** `packages/contracts/**`, root workspace files, `README.md`, integration runbooks

Rules:

- Frontend never imports backend internals.
- Backend never encodes UI layout assumptions into API payloads.
- Both use the same versioned contract examples.
- Every breaking shared change receives a decision-ledger entry in `README.md`.
- Each AI edits only its own progress lane and appends messages rather than rewriting the other lane's history.

---

## 2. Target repository structure

```text
RosaMedical/
├── README.md
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── .editorconfig
├── .gitignore
├── .nvmrc
├── apps/
│   └── web/
│       ├── package.json
│       ├── next.config.ts
│       ├── postcss.config.mjs
│       ├── public/
│       │   ├── brand/
│       │   └── placeholders/
│       ├── src/
│       │   ├── app/
│       │   │   ├── (public)/
│       │   │   ├── admin/
│       │   │   ├── globals.css
│       │   │   └── layout.tsx
│       │   ├── components/
│       │   │   ├── ui/
│       │   │   ├── layout/
│       │   │   └── feedback/
│       │   ├── features/
│       │   │   ├── products/
│       │   │   ├── inquiry/
│       │   │   ├── contact/
│       │   │   ├── search/
│       │   │   ├── admin-auth/
│       │   │   ├── admin-content/
│       │   │   └── publishing/
│       │   ├── lib/
│       │   │   ├── api/
│       │   │   ├── env/
│       │   │   ├── i18n/
│       │   │   └── validation/
│       │   ├── mocks/
│       │   └── test/
│       └── tests/
│           └── e2e/
├── services/
│   └── api/
│       └── README.md
├── packages/
│   └── contracts/
│       ├── package.json
│       ├── openapi/
│       │   └── rosa-medical.v1.yaml
│       ├── src/
│       │   ├── generated/
│       │   ├── fixtures/
│       │   ├── client.ts
│       │   └── index.ts
│       ├── scripts/
│       │   └── generate.mjs
│       └── tests/
├── docs/
│   ├── architecture/
│   ├── runbooks/
│   └── superpowers/
└── .github/
    └── workflows/
```

`services/api/README.md` is created during Layer 0 as the backend lane's declaration point. The backend AI replaces it with exact setup and test instructions after selecting its stack.

---

## 3. Shared contract conventions

### Base conventions

- API base path: `/v1`
- JSON property naming: `camelCase`
- IDs: opaque non-empty strings; UUID is recommended internally
- Timestamps: ISO 8601 UTC strings
- Locales: `en` and `ar`
- Visibility: `visible`, `hidden`, `archived`
- Publish state: `draft`, `needsReview`, `ready`, `published`, `hidden`, `archived`
- Inquiry status: `new`, `reviewed`, `contacted`, `closed`
- General-message status: `new`, `read`, `replied`, `archived`
- Pagination: cursor-based for growing admin collections
- Public lists expose published records only
- Admin mutations require the owner session

### Shared error envelope

```json
{
  "error": {
    "code": "PRODUCT_CODE_DUPLICATE",
    "message": "A product with this code already exists.",
    "fieldErrors": {
      "productCode": ["Product code must be unique."]
    },
    "requestId": "req_opaque_identifier"
  }
}
```

### Contract release sequence

**Contract 0.1 — first public vertical slice**

- `GET /v1/health`
- `GET /v1/public/families`
- `GET /v1/public/products`
- `GET /v1/public/products/{slug}`
- `POST /v1/public/inquiries`

**Contract 0.2 — public completion and owner session**

- Catalogues, content, contact details, search, general messages
- Owner login, session, recovery, logout

**Contract 0.3 — admin content and publishing**

- Products, families, catalogues, media, inquiries, messages
- Website content and contact details
- Draft review, preview, publish, revisions, rollback

The contract file always includes example requests and responses used by frontend mocks and backend contract tests.

---

## 4. Frontend layer model

The frontend is intentionally built from structure upward.

| Layer | Purpose | Visible result | Live backend dependency |
|---|---|---|---|
| F0 | Workspace and route skeleton | Every approved route opens and displays a plain route label | None |
| F1 | Layout foundations | Public header/footer, admin shell, containers, grids, responsive breakpoints | None |
| F2 | Design foundations | Fonts, tokens, spacing, buttons, fields, cards, focus and feedback states | None |
| F3 | Static page composition | Figma structure appears with neutral placeholder media and fixture copy | None |
| F4 | Mocked behavior | Search, inquiry, forms, admin editing and publishing work against MSW | Contract examples only |
| F5 | First live vertical slice | Public product → inquiry and admin product publish work with live API | G1–G6 endpoints |
| F6 | Full live integration | Remaining public/admin systems use live API | All accepted endpoints |
| F7 | Visual refinement | Final media behavior, motion, micro-interactions and detailed polish | No new interface dependency |
| F8 | Arabic and RTL | Arabic content, mirrored layouts and language control | Locale fields ready |
| F9 | Production hardening | Accessibility, performance, security, observability and deployment | Production backend ready |

A layer may not hide structural problems under visual polish. F0 and F1 are deliberately plain.

---

## 5. Backend layer model

| Layer | Purpose | Evidence for frontend |
|---|---|---|
| B0 | Declare stack and local workflow | Updated backend lane in `README.md` and `services/api/README.md` |
| B1 | Database and migration foundation | Repeatable migration and seed commands |
| B2 | Contract harness and health | `/v1/health`, contract tests, deterministic development fixtures |
| B3 | Public catalogue reads | Families, product list/detail, catalogues, content, contact details |
| B4 | Public submissions | Inquiry/message persistence, immutable inquiry snapshots, email delivery |
| B5 | Owner authentication | Login, recovery, session, logout and protected route checks |
| B6 | Admin records | Product/family/catalogue/media/content/contact CRUD and validation |
| B7 | Publishing and revisions | Draft review, publish transaction, revision comparison and rollback |
| B8 | Production services | Storage, backups, rate limits, security headers, logs, alerts and deployment |

Backend internal sequencing may change, but integration evidence must still satisfy the gates in `README.md`.

---

# Execution tasks

## Task 1: Establish root workspace and lane boundaries

**Owner:** Frontend lane, with backend acknowledgement

**Files:**

- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `tsconfig.base.json`
- Create: `.nvmrc`
- Create: `.editorconfig`
- Create or update: `.gitignore`
- Create: `services/api/README.md`
- Modify: `README.md`

**Produces:** A Node 24/pnpm workspace where frontend, backend, and contract packages have stable ownership boundaries.

- [ ] Add `.nvmrc` containing `24`.
- [ ] Add root `package.json` with `private: true`, the exact locked pnpm version, and scripts for `dev`, `lint`, `typecheck`, `test`, `test:e2e`, `build`, and `contracts:generate`.
- [ ] Add `pnpm-workspace.yaml` covering `apps/*`, `packages/*`, and `services/*` without requiring the backend service to use Node internally.
- [ ] Add strict shared TypeScript defaults in `tsconfig.base.json`.
- [ ] Add editor and ignore files that exclude environment secrets, build output, coverage, generated caches, uploads, and local databases.
- [ ] Add `services/api/README.md` with the required backend declaration fields from the main README.
- [ ] Run `pnpm install` and commit the lockfile.
- [ ] Update the frontend lane and G0 status in `README.md`.

**Verification:**

```bash
node --version
pnpm --version
pnpm install --frozen-lockfile
```

Expected: Node major version 24, one reproducible workspace install, and no application build yet.

---

## Task 2: Create the versioned contract package

**Owner:** Shared; frontend creates initial package, backend reviews contract behavior

**Files:**

- Create: `packages/contracts/package.json`
- Create: `packages/contracts/openapi/rosa-medical.v1.yaml`
- Create: `packages/contracts/scripts/generate.mjs`
- Create: `packages/contracts/src/generated/schema.ts`
- Create: `packages/contracts/src/client.ts`
- Create: `packages/contracts/src/index.ts`
- Create: `packages/contracts/src/fixtures/health.ts`
- Create: `packages/contracts/src/fixtures/families.ts`
- Create: `packages/contracts/src/fixtures/products.ts`
- Create: `packages/contracts/src/fixtures/inquiry.ts`
- Create: `packages/contracts/tests/contract-smoke.test.ts`

**Produces:** OpenAPI 0.1, generated TypeScript types, a typed fetch client, and deterministic examples shared by mocks and backend tests.

- [ ] Define `GET /v1/health` and Contract 0.1 endpoints.
- [ ] Define `FamilySummary`, `ProductSummary`, `ProductDetail`, localized text pairs, media reference, product option, inquiry request, immutable inquiry-item snapshot, inquiry response, and error schemas.
- [ ] Include successful and error examples for every operation.
- [ ] Generate TypeScript types using `openapi-typescript`.
- [ ] Create an `openapi-fetch` client factory accepting `baseUrl` and `fetch` implementation.
- [ ] Add fixtures that satisfy generated types without unsafe casts.
- [ ] Add tests that parse the OpenAPI document, generate the client types, and validate operation IDs are unique.
- [ ] Backend AI reviews operation names, status codes, and validation semantics; accepted changes are recorded in `README.md`.

**Verification:**

```bash
pnpm --filter @rosa/contracts generate
pnpm --filter @rosa/contracts test
pnpm --filter @rosa/contracts typecheck
```

Expected: generation is deterministic, contract tests pass, and fixture objects satisfy generated types.

---

## Task 3: Scaffold the frontend application without design polish

**Owner:** Frontend lane

**Files:**

- Create: `apps/web/**` using current stable `create-next-app`
- Create: `apps/web/src/app/layout.tsx`
- Create: `apps/web/src/app/globals.css`
- Create: `apps/web/src/app/(public)/layout.tsx`
- Create: `apps/web/src/app/admin/layout.tsx`
- Create: `apps/web/src/test/routes.ts`
- Create: `apps/web/tests/e2e/route-smoke.spec.ts`

**Produces:** A plain Next.js application with every approved route present and no attempt at final page design.

Public route shells:

- `/`
- `/products`
- `/products/[family]`
- `/products/[family]/[slug]`
- `/catalogues`
- `/about`
- `/procurement-support`
- `/contact`
- `/search`
- `/inquiry`
- `/request-quotation`
- `/privacy`
- `/terms`

Admin route shells:

- `/admin/login`
- `/admin/recovery`
- `/admin`
- `/admin/products`
- `/admin/products/new`
- `/admin/products/[id]`
- `/admin/families`
- `/admin/catalogues`
- `/admin/media`
- `/admin/inquiries`
- `/admin/inquiries/[id]`
- `/admin/messages`
- `/admin/messages/[id]`
- `/admin/content`
- `/admin/contact-details`
- `/admin/publishing`
- `/admin/revisions`
- `/admin/settings`

- [ ] Scaffold with TypeScript, ESLint, App Router, `src` directory, Tailwind, and `@/*` alias.
- [ ] Add one minimal route component per route that renders only route identity and `<main>`.
- [ ] Add public and admin layout boundaries with no final styling.
- [ ] Add `not-found.tsx`, route loading boundaries, and error boundaries.
- [ ] Add a Playwright route-smoke list that verifies each static route returns a page and contains one main landmark.
- [ ] Keep dynamic routes backed by deterministic fixture slugs.

**Verification:**

```bash
pnpm --filter @rosa/web lint
pnpm --filter @rosa/web typecheck
pnpm --filter @rosa/web test
pnpm --filter @rosa/web build
pnpm --filter @rosa/web test:e2e -- route-smoke.spec.ts
```

Expected: every route resolves, each page has one main landmark, and pages still look intentionally bare.

---

## Task 4: Build structural layout primitives

**Owner:** Frontend lane

**Files:**

- Create: `apps/web/src/components/layout/container.tsx`
- Create: `apps/web/src/components/layout/section.tsx`
- Create: `apps/web/src/components/layout/public-header.tsx`
- Create: `apps/web/src/components/layout/public-footer.tsx`
- Create: `apps/web/src/components/layout/admin-shell.tsx`
- Create: `apps/web/src/components/layout/admin-sidebar.tsx`
- Create: `apps/web/src/components/layout/mobile-admin-header.tsx`
- Create: `apps/web/src/components/layout/page-intro.tsx`
- Create: `apps/web/src/components/layout/split-layout.tsx`
- Create: `apps/web/src/components/layout/content-grid.tsx`
- Test: corresponding component tests

**Produces:** Responsive page skeletons that establish hierarchy and dimensions before detailed components.

- [ ] Implement semantic public header, footer, mobile navigation trigger, admin sidebar, and admin mobile header.
- [ ] Implement container widths, page gutters, section spacing, two-column collapse, and grid primitives.
- [ ] Add skip-to-content link and stable main-content target.
- [ ] Use text labels and neutral boxes only; no hero imagery or polished card styling.
- [ ] Apply the layout primitives to every route shell.
- [ ] Verify desktop 1440, tablet 768, and mobile 390 widths for overflow.

**Verification:** component tests, Playwright screenshots at three breakpoints, keyboard navigation through header/sidebar, and zero horizontal overflow.

---

## Task 5: Encode Figma design foundations

**Owner:** Frontend lane

**Files:**

- Modify: `apps/web/src/app/globals.css`
- Create: `apps/web/src/styles/tokens.css`
- Create: `apps/web/src/styles/utilities.css`
- Create: `apps/web/src/components/ui/button.tsx`
- Create: `apps/web/src/components/ui/link-button.tsx`
- Create: `apps/web/src/components/ui/input.tsx`
- Create: `apps/web/src/components/ui/textarea.tsx`
- Create: `apps/web/src/components/ui/select.tsx`
- Create: `apps/web/src/components/ui/status.tsx`
- Create: `apps/web/src/components/feedback/alert.tsx`
- Create: `apps/web/src/components/feedback/empty-state.tsx`
- Create: `apps/web/src/components/feedback/skeleton.tsx`

**Produces:** The visual grammar used by all later screens without yet composing full pages.

- [ ] Load Lora for editorial headings and Inter for operational text through Next font handling.
- [ ] Define Rosa red, near-black, warm-white, mist, steel, borders, spacing, type scale, widths, focus ring, and motion-duration variables.
- [ ] Implement variants for public and admin controls with minimum 44 px practical targets.
- [ ] Implement persistent labels, field errors, blocking errors, review warnings, ready states, empty states, and loading skeletons.
- [ ] Add Storybook only if both frontend owner and plan reviewer decide it improves review speed; otherwise use a dedicated internal component-gallery route excluded from production navigation.
- [ ] Add reduced-motion behavior and high-contrast focus treatment.

**Verification:** unit and accessibility tests for primitives; visual comparison against Figma foundations; no generic blue SaaS styling.

---

## Task 6: Compose all public pages with static fixtures

**Owner:** Frontend lane

**Files:**

- Create feature folders and page sections under `apps/web/src/features/`
- Modify all public page routes
- Create public fixture selectors under `packages/contracts/src/fixtures/`
- Add public page component and screenshot tests

**Produces:** Complete Figma-matched public layouts using fixture data and neutral placeholder media, with no live backend dependency.

Implementation order:

1. Homepage
2. Products overview
3. Family listing
4. Product detail
5. Inquiry and quotation forms
6. Catalogues
7. About
8. Procurement Support
9. Contact
10. Search states
11. Privacy and Terms

- [ ] Match section order, typography hierarchy, spacing, and responsive composition before animation.
- [ ] Keep placeholder media replaceable without changing layout.
- [ ] Avoid filler sections and unsupported claims.
- [ ] Implement public header states, mega-menu, mobile menu, footer, and search panel.
- [ ] Verify all Figma-required loading, empty, no-result, validation, success, and failure states.

**Verification:** Figma comparison at desktop/mobile nodes, axe checks, keyboard flows, and route screenshots.

---

## Task 7: Compose the complete admin experience with static fixtures

**Owner:** Frontend lane

**Files:**

- Create admin feature folders under `apps/web/src/features/`
- Modify all admin routes
- Add admin fixture selectors and screen tests

**Produces:** The complete single-owner admin interface using local fixtures and protected design boundaries.

Implementation order:

1. Login, recovery, session and settings
2. Overview
3. Products list, family editor and product editor
4. Product validation and public preview
5. Catalogues and media
6. Inquiries and general messages
7. Website content, contact details and featured slots
8. Publishing centre, change review, revision history and rollback
9. Critical mobile workflows

- [ ] Keep product inquiries and general messages separate.
- [ ] Keep public design controls absent.
- [ ] Show sensitive-claim and placeholder warnings.
- [ ] Support EN/AR fields and language-completeness states.
- [ ] Keep revision history visible and rollback non-destructive.

**Verification:** complete mocked prototype journey, keyboard and mobile checks, no prohibited commerce controls.

---

## Task 8: Add mock server and typed frontend data adapters

**Owner:** Frontend lane, contract shared

**Files:**

- Create: `apps/web/src/lib/api/config.ts`
- Create: `apps/web/src/lib/api/public-client.ts`
- Create: `apps/web/src/lib/api/admin-client.ts`
- Create: `apps/web/src/lib/api/result.ts`
- Create: `apps/web/src/mocks/browser.ts`
- Create: `apps/web/src/mocks/server.ts`
- Create: `apps/web/src/mocks/handlers/public.ts`
- Create: `apps/web/src/mocks/handlers/admin.ts`
- Create: `apps/web/src/mocks/state/store.ts`
- Create integration tests using MSW

**Produces:** One typed API adapter that switches between mock and live backends without page rewrites.

- [ ] Add `NEXT_PUBLIC_API_MODE=mock|live` and validated API base URL.
- [ ] Ensure components call feature repositories, not `fetch` directly.
- [ ] Derive request/response types from the contract package.
- [ ] Implement deterministic mock latency and explicit error scenarios.
- [ ] Implement local draft, publish, inquiry-status, and rollback state transitions for UI testing.
- [ ] Fail tests when a handler does not match the OpenAPI example shape.

**Verification:** all public/admin flows work in mock mode with network requests visible; changing to live mode changes only adapter configuration.

---

## Task 9: Backend declares architecture and establishes service foundation

**Owner:** Backend lane

**Files:**

- Modify: `README.md` backend lane
- Replace: `services/api/README.md`
- Create backend service files under `services/api/**`
- Create backend architecture record under `docs/architecture/backend.md`
- Create migration and seed directories according to chosen stack

**Produces:** A reproducible backend service that can run migrations, tests, contract checks, and a health endpoint.

- [ ] Record framework, language/runtime, database library, migration system, authentication approach, object storage, email provider, deployment target, and commands.
- [ ] Configure environment validation and secret handling.
- [ ] Create initial owner, content, product, inquiry, message, revision, and media migration strategy.
- [ ] Implement `/v1/health` from Contract 0.1.
- [ ] Load deterministic seed records matching shared fixtures.
- [ ] Add backend OpenAPI conformance tests.
- [ ] Update `README.md` with G0/G1 evidence.

**Verification:** fresh database migration, seed, backend test suite, health response, and contract test all pass from documented commands.

---

## Task 10: Deliver the first public vertical slice

**Owners:** Both lanes

**Flow:** Homepage → Products → Family → Product detail → Add to inquiry → Submit quotation

**Frontend files:** product/inquiry features, typed repositories, tests  
**Backend files:** public catalogue read endpoints, inquiry persistence, email delivery, tests

**Produces:** The first end-to-end business flow using live data.

- [ ] Backend implements published family/product list/detail endpoints.
- [ ] Backend implements inquiry submission with immutable item snapshots and idempotency protection.
- [ ] Backend stores inquiry before sending notification email.
- [ ] Frontend replaces mock reads and submission with live adapter calls in integration environment.
- [ ] Frontend displays loading, validation, success, retryable failure, and non-retryable failure states.
- [ ] Both lanes verify contract examples against live responses.
- [ ] Update G2 and G3 evidence in `README.md`.

**Verification:** Playwright completes the full flow against the real backend; database contains one inquiry snapshot; one owner email and one customer confirmation are recorded by the test email environment.

---

## Task 11: Deliver the first admin publishing vertical slice

**Owners:** Both lanes

**Flow:** Login → Product draft → Validate → Public preview → Publish → Public product reflects new revision

**Produces:** Proof of secure authentication, guarded editing, preview, transactional publishing, and revision history.

- [ ] Backend implements owner login/session/logout and protected product endpoints.
- [ ] Backend implements draft revision, validation result, publish transaction, and revision retrieval.
- [ ] Frontend integrates login/session states and route protection.
- [ ] Frontend integrates product editor, validation, preview, publish confirmation, and success state.
- [ ] Public cache or rendering strategy invalidates only after successful publication.
- [ ] Failed publication leaves current published content unchanged.
- [ ] Update G4, G5, and G6 evidence.

**Verification:** unauthorized requests fail; successful publication changes public output; failed publication does not; revision history records both attempts correctly.

---

## Task 12: Complete public data and communication systems

**Owners:** Both lanes

- [ ] Catalogues and safe PDF downloads
- [ ] Website content and contact details
- [ ] Search with indexed name, code, family, size and variant fields
- [ ] General contact submission separate from quotation inquiries
- [ ] About, Procurement Support, Contact and legal content integration
- [ ] Contact and inquiry confirmation data
- [ ] Rate limits, spam controls, input limits, safe file/content headers

**Verification:** contract tests, page integration tests, submission idempotency tests, search relevance cases, and public-only visibility tests.

---

## Task 13: Complete admin management systems

**Owners:** Both lanes

- [ ] Families and featured slots
- [ ] Catalogues and replacement workflow
- [ ] Media upload, usage mapping, protected assets and alt text
- [ ] Inquiry and message status/internal notes
- [ ] Website content and contact details
- [ ] Publishing centre and validation queues
- [ ] Revision comparison and rollback-as-new-revision
- [ ] Mobile critical admin actions

**Verification:** every approved editable Figma field maps to one controlled backend field; no layout/theme controls exist; destructive actions require confirmation.

---

## Task 14: Implement Arabic and RTL

**Owners:** Both lanes

- [ ] Backend exposes paired English/Arabic data and per-locale completeness.
- [ ] Frontend adds locale routing or accepted locale strategy.
- [ ] Mirror directional layouts and icons under RTL.
- [ ] Preserve product codes, numbers, email, telephone and mixed-direction content correctly.
- [ ] Add Arabic font selection approved for professional legibility.
- [ ] Keep English publication independent until Arabic publication is enabled.
- [ ] Add locale-specific metadata, validation, screenshots and end-to-end tests.

**Verification:** all major public routes work in English and Arabic; admin language-completeness states are accurate; no clipping at 390 px RTL.

---

## Task 15: Security, accessibility, performance and resilience hardening

**Owners:** Both lanes

Frontend:

- WCAG-oriented keyboard, focus, landmark, label, contrast and reduced-motion audit
- Image sizing and loading strategy
- Route-level performance budgets
- CSP-compatible client behavior
- Error boundaries and user-safe messages

Backend:

- Password hashing and session security review
- CSRF/session-cookie strategy
- Rate limiting and abuse controls
- File validation and safe download headers
- Database constraints, transaction review and concurrency tests
- Secret rotation, backup and restore drill
- Structured logs, request IDs, metrics and alerts

Shared:

- Threat model
- Staging smoke tests
- Dependency and license review
- Incident and rollback runbooks

**Verification:** no critical accessibility violations, security checklist signed by both lanes, backup restore proven, and production-like load test stays within accepted budgets.

---

## Task 16: Staging, production and client handoff

**Owners:** Both lanes

- [ ] Select deployment targets using compatibility, cost, region, backup, preview, and operational criteria recorded in an architecture decision.
- [ ] Configure separate local, test, staging, and production environments.
- [ ] Configure migrations as an explicit deployment step with rollback guidance.
- [ ] Configure staging owner account and test email/storage providers.
- [ ] Deploy frontend and backend staging.
- [ ] Complete full public/admin acceptance testing.
- [ ] Replace verified contact details, media and approved legal content when received.
- [ ] Deploy production and verify forms, email, storage, search, authentication, publishing and rollback.
- [ ] Deliver admin operating guide and incident contacts.

**Verification:** production smoke checklist passes, owner can publish one safe content revision, inquiry submission reaches dashboard and email, and rollback restores the prior public revision.

---

## 6. Integration gate checklist

### G0 — Workspace and contract

- [ ] Frontend workspace installs and builds
- [ ] Backend architecture declared
- [ ] OpenAPI 0.1 accepted
- [ ] Both lanes update README

### G1 — Health and fixtures

- [ ] Frontend mock/live adapter works
- [ ] Backend health endpoint conforms
- [ ] Shared fixture examples match live development responses

### G2 — Public catalogue reads

- [ ] Family/product public UI uses typed client
- [ ] Backend exposes published records only
- [ ] Contract, integration and page tests pass

### G3 — Public submissions

- [ ] Inquiry and contact flows validate correctly
- [ ] Backend persists before email
- [ ] Idempotency and retry behavior proven

### G4 — Owner authentication

- [ ] Frontend handles login, recovery, expiry and logout
- [ ] Backend protects admin endpoints and rotates/revokes sessions correctly

### G5 — Admin content

- [ ] Controlled fields integrate live
- [ ] Media, catalogues, content and contact management work
- [ ] No public design controls are exposed

### G6 — Publishing and revisions

- [ ] Review/preview/publish/rollback work live
- [ ] Transactions preserve old public state on failure
- [ ] Audit history remains immutable

### G7 — Arabic and production

- [ ] English/Arabic and RTL acceptance passes
- [ ] Security, accessibility, performance, backup and deployment checks pass

---

## 7. Verification matrix

| Area | Unit | Component | Contract | Integration | E2E | Accessibility |
|---|---:|---:|---:|---:|---:|---:|
| Layout primitives | Yes | Yes | No | No | Smoke | Yes |
| Products/catalogues | Yes | Yes | Yes | Yes | Yes | Yes |
| Inquiry/contact | Yes | Yes | Yes | Yes | Yes | Yes |
| Admin authentication | Yes | Yes | Yes | Yes | Yes | Yes |
| Content management | Yes | Yes | Yes | Yes | Yes | Yes |
| Publishing/revisions | Yes | Yes | Yes | Yes | Yes | Yes |
| Search | Yes | Yes | Yes | Yes | Yes | Yes |
| Arabic/RTL | Yes | Yes | Yes | Yes | Yes | Yes |

Minimum frontend commands before a meaningful push:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Run Playwright locally before integration and release pushes. GitHub Actions should run only on meaningful PRs or manual release verification, not every trivial commit.

Backend AI must document equivalent commands in `services/api/README.md` and the backend lane of `README.md`.

---

## 8. First execution batch

The immediate batch is intentionally small and structural:

1. Task 1 — root workspace and lane boundaries
2. Task 2 — Contract 0.1 package
3. Task 3 — all route shells
4. Task 4 — public/admin structural layouts
5. Backend Task 9 begins in parallel after reading the README and accepting or proposing contract changes

The first batch ends before high-fidelity page sections. Its deliverable is a boring but correct navigable application skeleton, typed shared boundary, and independent backend starting point.

---

## 9. Plan self-review

- Team split is explicit and file ownership is non-overlapping.
- README communication is required before and after meaningful work.
- Frontend can reach F4 without a live backend.
- Backend can begin B0–B4 without waiting for visual implementation.
- Shared API changes have a single contract and decision process.
- Layout-first frontend layering is explicit.
- Public and admin vertical slices prove architecture before full expansion.
- Design goodwill and publishing safeguards remain represented.
- No ecommerce, inventory, payment, pricing, ratings or order scope was introduced.
- Arabic is present in the data model before high-fidelity RTL work.
- Verification and integration gates define evidence rather than vague completion.

## Execution decision

Ahmad has already directed the frontend AI to begin work after this master plan. Execute the **First execution batch** inline unless the owner pauses or the backend AI records a blocking shared-contract concern in `README.md`.