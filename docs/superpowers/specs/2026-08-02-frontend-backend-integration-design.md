# Rosa Medical Frontend–Backend Integration Design

**Date:** 2026-08-02  
**Integration branch:** `integration/f3e-d-phase4-backend`  
**Frontend source:** `frontend/f3e-d-governance`  
**Backend source:** `phase-4-backend`

## Purpose

Join the existing frontend and backend implementations without redesigning either side, adding new product behavior, correcting unrelated implementation problems, or expanding the current feature scope.

The integration must preserve the documented Rosa Medical intent:

- ROSA remains a quotation-led medical instruments supplier and procurement partner.
- Public prices, cart, checkout, payments, orders, stock, shipping, discounts, ratings, public customer accounts, and appointment workflows remain outside the current integrated product.
- The five product families remain Knives, Scissors, Punches, Chisels, and Cutters.
- Product inquiries and general contact messages remain separate workflows.
- The admin area remains a protected single-owner workspace.
- Draft, review, preview, publish, and revision concepts remain as documented; no missing runtime implementation will be invented during this integration.
- Existing English and Arabic field intentions remain intact.
- Unverified business, manufacturing, certification, contact, or product claims must not be introduced.

## Integration Strategy

The integration branch starts from `frontend/f3e-d-governance` because it contains the approved and most complete public and admin presentation layer.

Backend work will be transferred selectively. A full Git merge is intentionally avoided because the backend branch also contains an alternative frontend and several features that conflict with the documented product direction.

For each backend capability:

1. Locate the matching frontend route, screen, form, state, or workflow.
2. Confirm that the capability matches the approved documentation and shared contract.
3. Preserve the frontend composition, route structure, visual system, terminology, and user flow.
4. Connect the existing backend behavior with the smallest practical edit.
5. Do not replace entire frontend components where a local data or action connection is sufficient.
6. Defer backend capabilities that have no corresponding frontend or cannot be mapped safely without inventing behavior.

## Scope Included Now

### Runtime and session infrastructure

- Existing Supabase browser client.
- Existing Supabase server client.
- Existing session middleware.
- Existing environment-variable access needed by the integrated code.
- Existing dependencies required by transferred compatible backend code.

### Owner authentication

- Connect the existing admin login screen to the existing backend login action.
- Connect the existing recovery screen to the existing backend recovery action where compatible.
- Connect logout behavior to the existing backend logout action.
- Protect the existing admin workspace only with authorization behavior already present in the backend implementation.
- Preserve the documented single-owner intent and do not expose public registration or customer authentication.
- Do not invent a new owner-role system, owner allowlist, or authorization mechanism during this pass. If the existing backend cannot enforce the documented owner-only boundary through behavior already present in its code or configuration, that authorization portion remains explicitly deferred rather than being silently claimed as complete.

### Public catalogue reads

- Connect existing frontend family and product views only to compatible existing backend reads.
- Preserve current frontend product terminology, layouts, procurement framing, inquiry actions, and static fallbacks where live backend data is not compatible or complete.
- Do not expose backend price, stock, direct-sale, or ecommerce fields.

### Product inquiries

- Connect only the existing frontend inquiry and quotation request flow that can be represented by the existing compatible backend data and actions.
- Preserve structured product and variant context already represented in the frontend.
- Keep inquiry submissions separate from general messages.
- Do not convert the inquiry flow into checkout, order placement, or appointment scheduling.

### General contact messages

- Connect the existing public contact form to compatible existing message persistence.
- Preserve the existing frontend fields and validation presentation.
- Keep general messages separate from product inquiries in the admin area.

### Existing admin management surfaces

Connect existing compatible backend actions and reads only where a corresponding frontend surface already exists:

- Families.
- Products.
- Product inquiries.
- General messages.
- Website content.
- Contact details.

The frontend’s current route names, visual components, status labels, and workflow structure remain authoritative.

## Explicitly Deferred

The following backend work will not be exposed or integrated in this pass because no matching approved frontend exists or because it conflicts with the documented product model:

- Cart state and `CartProvider`.
- Checkout pages or checkout APIs.
- Order-success pages.
- Price totals or payment behavior.
- Public customer login or registration.
- Appointment request, approval, or decline behavior.
- Direct-sale mode.
- Public stock status.
- Backend-only pages that do not match an existing approved frontend route.
- New media upload behavior.
- New email workflows without an existing matching frontend workflow.
- New publishing persistence.
- New revision storage or rollback implementation.
- New database schema or migration behavior beyond what already exists and is required by a matching frontend capability.
- New owner-role or authorization behavior not already present in the backend.
- New product, contact, certification, manufacturing, or business data.

Deferred files may remain absent from the integration branch. They will not be represented by placeholder UI or newly invented interfaces.

## Conflict Resolution Rules

### Frontend files

When both branches changed the same frontend file:

- Keep the `frontend/f3e-d-governance` structure and styling.
- Transfer only the minimal backend import, server action, query, provider, middleware, or data adaptation required for an existing frontend interaction.
- Do not transplant the backend branch’s alternate page or component wholesale.

### Backend files

When a backend file is compatible and has no frontend equivalent:

- Transfer it without broad refactoring.
- Change only imports, types, route placement, field mapping, or return shape needed to connect it to an existing frontend.
- Do not correct unrelated security, validation, architecture, or data-model problems during this integration pass.
- If an existing problem prevents safe connection without changing the feature’s behavior, defer that capability and document the reason.

### Data-model differences

- Follow the approved frontend terminology and documented product behavior.
- Follow the existing shared OpenAPI contract where it applies.
- Do not expose or preserve conflicting ecommerce fields merely because they exist in the backend schema.
- Do not silently create new fields to reconcile mismatches.
- Where a safe one-to-one mapping does not exist, leave that capability deferred.

### Documentation conflicts

Use this priority order:

1. Owner’s latest explicit instruction.
2. Root coordination README accepted decisions.
3. Approved website and admin design specifications.
4. Shared OpenAPI contract.
5. Approved implementation plans.
6. Existing implementation details.
7. Branch-specific notes and older assumptions.

Partner notes remain valuable implementation guidance, but conflicting product behavior is not imported.

## Route and Workflow Mapping

The implementation plan must build an explicit mapping before changing runtime code:

| Frontend workflow | Existing backend source | Integration action |
|---|---|---|
| Admin login | Existing Supabase login action | Connect existing form without replacing page |
| Admin recovery | Existing recovery action | Connect only compatible reset behavior |
| Admin logout | Existing logout action | Connect existing workspace action |
| Protected admin routes | Existing server session utilities | Apply only the protection already implemented; document any owner-only gap |
| Family listing | Existing category/family query | Adapt output to existing family model where safe |
| Product listing/detail | Existing product queries | Adapt only compatible procurement fields |
| Product inquiry | Existing quote/inquiry persistence | Connect without checkout, totals, orders, or appointments |
| General contact form | Existing contact persistence/API | Connect to existing contact UI and keep separate from inquiries |
| Admin families | Existing category actions | Connect to existing family screens with minimal field mapping |
| Admin products | Existing product actions | Connect only fields represented by existing product editor |
| Admin inquiries | Existing compatible inquiry records | Render through existing inquiry workflow and statuses |
| Admin messages | Existing contact-message records | Render separately through existing message workflow |
| Admin content | Existing site-content storage | Connect matching content keys only |
| Admin contact details | Existing settings/content storage | Connect matching fields only |

## Error Handling

- Preserve the frontend’s existing loading, validation, empty, success, and failure states.
- Translate backend failures into the frontend’s existing state model rather than introducing new UI.
- Do not hide backend failures by replacing them with invented data.
- Do not claim successful persistence when the corresponding backend operation is unavailable.
- Keep existing user-entered data intact after recoverable submission failures where the frontend already supports that behavior.

## Change-Control Limits

The integration must not:

- Redesign pages or components.
- Rename routes without a direct compatibility requirement.
- Rewrite large feature modules.
- Refactor unrelated code.
- Add speculative abstractions.
- Implement deferred features.
- Replace documented language with ecommerce or appointment terminology.
- Modify the shared contract unless an existing frontend/backend connection cannot comply and a separate owner decision is obtained.
- Merge directly into `main`.

Every runtime change must be traceable to one existing frontend surface and one existing backend capability.

## Verification

After integration, run the repository’s existing checks without adding unrelated test infrastructure:

- Dependency installation or lockfile consistency check.
- Frontend lint.
- Typecheck.
- Existing unit and static policy tests.
- Existing contract tests.
- Production build.
- Existing end-to-end tests where the environment supports them.
- Targeted manual route checks for login, catalogue reads, contact submission, inquiry submission, and the matching admin records.

The final review must also search the integrated branch for accidental exposure of:

- Prices.
- Cart or checkout.
- Orders or payment language.
- Public registration or customer login.
- Appointment workflow.
- Stock, direct sale, shipping, discounts, or ratings.

A check is reported as passed only when it was actually executed successfully. Environment-blocked checks and capabilities deferred because existing backend behavior is incompatible must be reported separately.

## Completion Criteria

The integration is complete only when:

- The branch is based on `frontend/f3e-d-governance`.
- The current frontend presentation and navigation remain intact.
- Compatible existing backend behavior is connected to matching existing frontend workflows.
- No backend-only feature has been surfaced through newly created frontend work.
- Product inquiries and general messages remain separate.
- No ecommerce, appointment, or public-account behavior appears in the integrated product.
- Existing compatible authentication and data-management mechanics function through the approved frontend, with any owner-only authorization gap documented rather than hidden.
- The final diff contains only integration, compatibility, documentation, and required dependency changes.
- Verification results and deferred backend capabilities are documented accurately.
