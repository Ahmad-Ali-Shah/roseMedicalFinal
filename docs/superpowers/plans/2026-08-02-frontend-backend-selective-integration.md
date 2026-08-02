# Rosa Medical Selective Frontend–Backend Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate only the backend behavior that already has an exact, safe frontend counterpart, while preserving the complete `frontend/f3e-d-governance` presentation and deferring every incompatible or backend-only feature.

**Architecture:** Keep the integration branch based on `frontend/f3e-d-governance`. Transfer the existing Supabase session and admin-authentication implementation from `phase-4-backend`, then connect it to the existing owner-access screens and admin shell with small local edits. Do not transfer catalogue, inquiry, contact, content, ecommerce, appointment, or public-account code unless its current backend data shape can represent the current frontend without losing fields or inventing mappings; the present audit shows those areas are not safe one-to-one integrations and therefore remain deferred.

**Tech Stack:** Next.js 16.2.11, React 19.2.0, TypeScript 5.9, pnpm 11.4.0, Supabase SSR 0.12.4, Supabase JS 2.111.0, Vitest 3.2, Playwright 1.57.

## Global Constraints

- Work only on `integration/f3e-d-phase4-backend`.
- Keep `frontend/f3e-d-governance` as the presentation and routing authority.
- Do not merge `phase-4-backend` wholesale.
- Do not redesign pages, rename approved routes, or replace feature modules wholesale.
- Do not add public prices, cart, checkout, payments, orders, stock, shipping, discounts, ratings, direct sale, public customer accounts, or appointments.
- Keep product inquiries and general messages separate.
- Keep the admin area as a protected owner workspace; do not add registration or multi-admin behavior.
- Do not invent a new owner allowlist, role table, database schema, migration, API, content key, product field, contact field, or fallback record.
- Preserve the five families: Knives, Scissors, Punches, Chisels, and Cutters.
- Preserve current English/Arabic intentions and all verified frontend wording.
- Preserve the root coordination README; append integration status without replacing other lane content.
- Treat a capability as integrated only when its existing frontend fields and workflow map one-to-one to existing backend behavior.
- Report tests as passed only when they were actually run successfully.

## File Structure and Responsibility Map

### Exact backend files to transfer

- `apps/web/src/lib/supabase/client.ts` — existing browser Supabase client.
- `apps/web/src/lib/supabase/server.ts` — existing cookie-aware server Supabase client.
- `apps/web/src/lib/supabase/middleware.ts` — existing session refresh logic.
- `apps/web/src/lib/supabase/auth-guard.ts` — existing authenticated-user guard.
- `apps/web/src/middleware.ts` — existing Next middleware entry point.
- `apps/web/src/app/admin/(auth)/login/action.ts` — existing password sign-in action.
- `apps/web/src/app/admin/(workspace)/logout-action.ts` — existing sign-out action.

### Existing frontend files to modify minimally

- `apps/web/package.json` — add only the two Supabase runtime dependencies required by transferred files.
- `pnpm-lock.yaml` — regenerate from the integration branch rather than copying the backend branch lockfile wholesale.
- `apps/web/src/features/admin-auth-preview/admin-login-page.tsx` — retain the current Rosa owner-access composition while applying the backend branch's existing loading/error/login behavior.
- `apps/web/src/app/admin/(workspace)/layout.tsx` — call the transferred `requireAdmin()` before rendering the existing shell.
- `apps/web/src/features/admin-navigation/admin-workspace-header.tsx` — retain current header composition while connecting the existing logout action.
- `apps/web/src/components/layout/admin-shell.tsx` — remove only the now-inaccurate static-authentication warning; preserve navigation, layout, branding, and public-site link.
- `apps/web/src/test/admin-auth-preview.test.tsx` — replace static-login expectations with connected-login expectations while keeping recovery static.
- `apps/web/src/test/admin-navigation.test.tsx` — assert protected-session and sign-out composition instead of static-session copy.

### Integration verification files

- `apps/web/src/test/backend-integration-boundary.test.ts` — source-level checks proving that only approved authentication/session files were transferred and prohibited backend-only routes remain absent.
- `docs/superpowers/completions/2026-08-02-frontend-backend-selective-integration.md` — exact integrated/deferred inventory and executed verification results.
- `README.md` — append a concise integration-lane status entry without replacing existing decisions or lane records.

### Backend files explicitly not transferred in this plan

- `apps/web/src/lib/cart/**`
- `apps/web/src/app/(public)/checkout/**`
- `apps/web/src/app/(public)/order-success/**`
- `apps/web/src/app/login/**`
- `apps/web/src/app/api/checkout/**`
- `apps/web/src/app/api/alert-unread/**`
- `apps/web/src/app/api/contact/**`
- `apps/web/src/app/(public)/contact/action.ts`
- `apps/web/src/app/admin/(auth)/recovery/action.ts`
- `apps/web/src/app/auth/callback/route.ts`
- `apps/web/src/lib/supabase/queries.ts`
- `apps/web/src/lib/supabase/types.ts`
- `apps/web/src/app/admin/(workspace)/categories/**`
- `apps/web/src/app/admin/(workspace)/products/**`
- `apps/web/src/app/admin/(workspace)/messages/**`
- `apps/web/src/app/admin/(workspace)/site-content/**`
- `apps/web/src/mocks/**`
- `apps/web/public/mockServiceWorker.js`

These files remain deferred because they either expose prohibited product behavior or require field/schema mappings that do not exist one-to-one in the current frontend.

---

### Task 1: Lock the selective-integration boundary with failing tests

**Files:**
- Create: `apps/web/src/test/backend-integration-boundary.test.ts`
- Modify: `apps/web/src/test/admin-auth-preview.test.tsx`
- Modify: `apps/web/src/test/admin-navigation.test.tsx`

**Interfaces:**
- Consumes: current integration-branch file tree and current static owner-access components.
- Produces: tests that require Supabase session files, a connected login form, a protected workspace layout, and a connected sign-out control while forbidding backend-only product routes.

- [ ] **Step 1: Create the source-boundary test before transferring backend files**

Create `apps/web/src/test/backend-integration-boundary.test.ts` with:

```ts
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const webRoot = process.cwd();
const source = (path: string) => readFileSync(join(webRoot, path), "utf8");

describe("selective backend integration boundary", () => {
  it("requires only the approved Supabase authentication infrastructure", () => {
    expect(existsSync(join(webRoot, "src/lib/supabase/client.ts"))).toBe(true);
    expect(existsSync(join(webRoot, "src/lib/supabase/server.ts"))).toBe(true);
    expect(existsSync(join(webRoot, "src/lib/supabase/middleware.ts"))).toBe(true);
    expect(existsSync(join(webRoot, "src/lib/supabase/auth-guard.ts"))).toBe(true);
    expect(existsSync(join(webRoot, "src/middleware.ts"))).toBe(true);
    expect(existsSync(join(webRoot, "src/app/admin/(auth)/login/action.ts"))).toBe(true);
    expect(existsSync(join(webRoot, "src/app/admin/(workspace)/logout-action.ts"))).toBe(true);
  });

  it("protects the existing workspace with the transferred guard", () => {
    const layout = source("src/app/admin/(workspace)/layout.tsx");
    expect(layout).toContain('import { requireAdmin } from "@/lib/supabase/auth-guard"');
    expect(layout).toContain("await requireAdmin()");
  });

  it("does not transfer backend-only public product behavior", () => {
    const prohibitedPaths = [
      "src/app/(public)/checkout/page.tsx",
      "src/app/(public)/checkout/checkout-client.tsx",
      "src/app/(public)/order-success/page.tsx",
      "src/app/login/page.tsx",
      "src/app/api/checkout/route.ts",
      "src/lib/cart/cart-context.tsx"
    ];

    for (const path of prohibitedPaths) {
      expect(existsSync(join(webRoot, path)), path).toBe(false);
    }
  });

  it("does not transfer incompatible data-management implementations", () => {
    const deferredPaths = [
      "src/lib/supabase/queries.ts",
      "src/lib/supabase/types.ts",
      "src/app/admin/(workspace)/categories/action.ts",
      "src/app/admin/(workspace)/products/action.ts",
      "src/app/admin/(workspace)/messages/action.ts",
      "src/app/admin/(workspace)/site-content/action.ts",
      "src/app/api/contact/route.ts"
    ];

    for (const path of deferredPaths) {
      expect(existsSync(join(webRoot, path)), path).toBe(false);
    }
  });
});
```

- [ ] **Step 2: Change the owner-access test to describe the approved connected/static split**

In `apps/web/src/test/admin-auth-preview.test.tsx`, replace the first normal-route test with:

```tsx
it("connects login while leaving recovery explicitly static", () => {
  const login = renderToStaticMarkup(<AdminLoginPage />);
  const recovery = renderToStaticMarkup(<AdminRecoveryPage />);

  expect((login.match(/<h1/g) ?? [])).toHaveLength(1);
  expect(login).toContain("Sign in to the Rosa workspace.");
  expect(login).toContain("<form");
  expect(login).toContain('name="email"');
  expect(login).toContain('name="password"');
  expect(login).not.toContain("readonly");
  expect(login).not.toContain("Authentication not connected");

  expect((recovery.match(/<h1/g) ?? [])).toHaveLength(1);
  expect(recovery).toContain("Recover owner access.");
  expect(recovery).not.toContain("<form");
  expect(recovery).toContain("readonly");
  expect(recovery).toContain("disabled");
  expect(recovery).toContain("Recovery not connected");
});
```

Keep the existing tests for no account creation, approved route links, and isolated preview-state claims.

- [ ] **Step 3: Change the admin-shell session test to require connected sign-out composition**

In `apps/web/src/test/admin-navigation.test.tsx`, add this module mock before importing `AdminShell`:

```ts
vi.mock("@/app/admin/(workspace)/logout-action", () => ({
  logout: vi.fn()
}));
```

Replace the existing session-status test with:

```tsx
it("owns the sole workspace main and exposes connected session controls", () => {
  const html = renderToStaticMarkup(<AdminShell><h1>Dashboard</h1></AdminShell>);
  expect((html.match(/<main/g) ?? [])).toHaveLength(1);
  expect(html).toContain("Owner session active");
  expect(html).toContain("Sign out");
  expect(html).toContain("<form");
  expect(html).not.toContain("Owner session not connected");
  expect(html).not.toContain("Static preview");
});
```

- [ ] **Step 4: Run the focused tests and confirm they fail for the intended missing integration**

Run:

```bash
pnpm --filter @rosa/web test -- \
  src/test/backend-integration-boundary.test.ts \
  src/test/admin-auth-preview.test.tsx \
  src/test/admin-navigation.test.tsx
```

Expected: FAIL because the Supabase files and actions do not exist, the login remains read-only, the workspace is not guarded, and sign out remains disabled.

- [ ] **Step 5: Commit the failing integration tests**

```bash
git add \
  apps/web/src/test/backend-integration-boundary.test.ts \
  apps/web/src/test/admin-auth-preview.test.tsx \
  apps/web/src/test/admin-navigation.test.tsx
git commit -m "test: lock selective backend integration boundary"
```

---

### Task 2: Transfer only the existing Supabase session infrastructure

**Files:**
- Modify: `apps/web/package.json`
- Modify: `pnpm-lock.yaml`
- Create from backend source: `apps/web/src/lib/supabase/client.ts`
- Create from backend source: `apps/web/src/lib/supabase/server.ts`
- Create from backend source: `apps/web/src/lib/supabase/middleware.ts`
- Create from backend source: `apps/web/src/lib/supabase/auth-guard.ts`
- Create from backend source: `apps/web/src/middleware.ts`

**Interfaces:**
- Consumes: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables already used by `phase-4-backend`.
- Produces: `createClient()` for browser/server use, `updateSession(request)`, and `requireAdmin()` with the same signatures as the backend branch.

- [ ] **Step 1: Add only the dependencies required by the transferred authentication code**

Run:

```bash
pnpm --filter @rosa/web add @supabase/ssr@^0.12.4 @supabase/supabase-js@^2.111.0
```

Expected changes:

```json
"dependencies": {
  "@rosa/contracts": "workspace:*",
  "@supabase/ssr": "^0.12.4",
  "@supabase/supabase-js": "^2.111.0",
  "next": "16.2.11",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "zod": "^4.0.0"
}
```

Do not add `msw`, `resend`, cart dependencies, or any backend-only development dependency.

- [ ] **Step 2: Copy the five approved infrastructure files exactly from `phase-4-backend`**

```bash
mkdir -p apps/web/src/lib/supabase

git show 'phase-4-backend:apps/web/src/lib/supabase/client.ts' \
  > apps/web/src/lib/supabase/client.ts
git show 'phase-4-backend:apps/web/src/lib/supabase/server.ts' \
  > apps/web/src/lib/supabase/server.ts
git show 'phase-4-backend:apps/web/src/lib/supabase/middleware.ts' \
  > apps/web/src/lib/supabase/middleware.ts
git show 'phase-4-backend:apps/web/src/lib/supabase/auth-guard.ts' \
  > apps/web/src/lib/supabase/auth-guard.ts
git show 'phase-4-backend:apps/web/src/middleware.ts' \
  > apps/web/src/middleware.ts
```

Do not alter their behavior in this task.

- [ ] **Step 3: Run dependency, type, and boundary checks**

```bash
pnpm --filter @rosa/web typecheck
pnpm --filter @rosa/web test -- src/test/backend-integration-boundary.test.ts
```

Expected: typecheck may still fail because login/logout actions and workspace wiring are not present; the boundary test must now fail only on the missing actions and guard invocation, while the transferred infrastructure assertions pass.

- [ ] **Step 4: Commit the infrastructure transfer**

```bash
git add \
  apps/web/package.json \
  pnpm-lock.yaml \
  apps/web/src/lib/supabase/client.ts \
  apps/web/src/lib/supabase/server.ts \
  apps/web/src/lib/supabase/middleware.ts \
  apps/web/src/lib/supabase/auth-guard.ts \
  apps/web/src/middleware.ts
git commit -m "feat: integrate existing Supabase session infrastructure"
```

---

### Task 3: Transfer the existing login and logout actions

**Files:**
- Create from backend source: `apps/web/src/app/admin/(auth)/login/action.ts`
- Create from backend source: `apps/web/src/app/admin/(workspace)/logout-action.ts`

**Interfaces:**
- Consumes: server `createClient()` from `@/lib/supabase/server`.
- Produces: `login(formData: FormData)` and `logout()` with the exact backend-branch behavior.

- [ ] **Step 1: Copy the existing actions exactly from `phase-4-backend`**

```bash
mkdir -p 'apps/web/src/app/admin/(auth)/login'
mkdir -p 'apps/web/src/app/admin/(workspace)'

git show 'phase-4-backend:apps/web/src/app/admin/(auth)/login/action.ts' \
  > 'apps/web/src/app/admin/(auth)/login/action.ts'
git show 'phase-4-backend:apps/web/src/app/admin/(workspace)/logout-action.ts' \
  > 'apps/web/src/app/admin/(workspace)/logout-action.ts'
```

Do not copy the recovery action or auth callback route in this task. Their current redirect behavior does not map safely to the existing static recovery screen without additional behavior that the user prohibited.

- [ ] **Step 2: Run the boundary test**

```bash
pnpm --filter @rosa/web test -- src/test/backend-integration-boundary.test.ts
```

Expected: the approved-file existence test passes; the workspace-guard assertion still fails until Task 5.

- [ ] **Step 3: Commit the exact action transfer**

```bash
git add \
  'apps/web/src/app/admin/(auth)/login/action.ts' \
  'apps/web/src/app/admin/(workspace)/logout-action.ts'
git commit -m "feat: integrate existing admin auth actions"
```

---

### Task 4: Connect the existing Rosa login composition to the existing action

**Files:**
- Modify: `apps/web/src/features/admin-auth-preview/admin-login-page.tsx`
- Test: `apps/web/src/test/admin-auth-preview.test.tsx`

**Interfaces:**
- Consumes: `login(formData: FormData)` from `@/app/admin/(auth)/login/action`.
- Produces: the existing `AdminLoginPage()` export with live email/password submission, loading state, and backend error display.

- [ ] **Step 1: Replace only the static fieldset/action block with the backend branch's existing login state behavior**

At the top of `apps/web/src/features/admin-auth-preview/admin-login-page.tsx`, add:

```tsx
"use client";

import { useState } from "react";
import { login } from "@/app/admin/(auth)/login/action";
```

Inside `AdminLoginPage`, before `return`, add the same state and submission flow already implemented on `phase-4-backend`:

```tsx
const [error, setError] = useState<string | null>(null);
const [loading, setLoading] = useState(false);

async function handleSubmit(formData: FormData) {
  setError(null);
  setLoading(true);
  const result = await login(formData);
  if (result?.error) {
    setError(result.error);
    setLoading(false);
  }
}
```

Replace the current read-only fieldset, disabled button, and static warning with this markup while keeping `AdminOwnerAccessFrame`, its eyebrow/title/description/footer, and the recovery link unchanged:

```tsx
<form action={handleSubmit} className="admin-auth-fields">
  <div className="admin-field-preview">
    <label htmlFor="owner-email">Owner email</label>
    <input
      id="owner-email"
      name="email"
      type="email"
      required
      autoComplete="username"
    />
  </div>
  <div className="admin-field-preview">
    <label htmlFor="owner-password">Password</label>
    <input
      id="owner-password"
      name="password"
      type="password"
      required
      autoComplete="current-password"
    />
  </div>
  {error ? (
    <AdminAlert tone="danger" title="Sign-in failed">
      {error}
    </AdminAlert>
  ) : null}
  <div className="admin-auth-card__actions">
    <Button type="submit" disabled={loading}>
      {loading ? "Signing in…" : "Sign in"}
    </Button>
    <Link href="/admin/recovery">Recover owner access</Link>
  </div>
</form>
```

Remove only the now-unused `AdminFieldPreview` import. Do not alter the recovery component or add registration, owner-email placeholders, remembered credentials, or customer-login links.

- [ ] **Step 2: Run the owner-access tests**

```bash
pnpm --filter @rosa/web test -- src/test/admin-auth-preview.test.tsx
```

Expected: PASS. The login renders one active form with `email` and `password`; recovery remains explicitly static and disabled; no account-creation copy appears.

- [ ] **Step 3: Run typecheck**

```bash
pnpm --filter @rosa/web typecheck
```

Expected: PASS for the login integration and transferred actions. If TypeScript reports that `login()` can redirect and therefore has a broader return type, narrow only the local result check without changing the action implementation:

```tsx
const result = await login(formData);
if (result && "error" in result && result.error) {
  setError(result.error);
  setLoading(false);
}
```

- [ ] **Step 4: Commit the connected login**

```bash
git add \
  apps/web/src/features/admin-auth-preview/admin-login-page.tsx \
  apps/web/src/test/admin-auth-preview.test.tsx
git commit -m "feat: connect existing owner login"
```

---

### Task 5: Protect the existing workspace and connect sign out

**Files:**
- Modify: `apps/web/src/app/admin/(workspace)/layout.tsx`
- Modify: `apps/web/src/features/admin-navigation/admin-workspace-header.tsx`
- Modify: `apps/web/src/components/layout/admin-shell.tsx`
- Test: `apps/web/src/test/admin-navigation.test.tsx`
- Test: `apps/web/src/test/backend-integration-boundary.test.ts`

**Interfaces:**
- Consumes: `requireAdmin()` and `logout()` from the transferred backend files.
- Produces: existing admin routes protected by the current backend guard and the existing admin header with a working sign-out form.

- [ ] **Step 1: Apply the backend branch's existing guard call to the current workspace layout**

Replace `apps/web/src/app/admin/(workspace)/layout.tsx` with the backend guard structure while retaining the current `AdminShell`:

```tsx
import { AdminShell } from "@/components/layout/admin-shell";
import { requireAdmin } from "@/lib/supabase/auth-guard";

export default async function AdminWorkspaceLayout({
  children
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  return <AdminShell>{children}</AdminShell>;
}
```

Do not add role, profile, email-allowlist, registration, or multi-owner behavior. The integration completion record must state that this is the backend branch's existing authenticated-user guard and that repository code does not independently prove a stronger owner-role check.

- [ ] **Step 2: Connect the existing sign-out control without replacing the header**

In `apps/web/src/features/admin-navigation/admin-workspace-header.tsx`, add:

```tsx
import { logout } from "@/app/admin/(workspace)/logout-action";
```

Replace only the current session block:

```tsx
<div className="admin-workspace-header__session">
  <span>Owner session active</span>
  <form action={logout}>
    <Button type="submit" size="small" variant="secondary">
      Sign out
    </Button>
  </form>
</div>
```

Keep the current path-aware section label and all surrounding markup unchanged.

- [ ] **Step 3: Remove the inaccurate static-auth warning without changing the shell layout**

Delete only this block from `apps/web/src/components/layout/admin-shell.tsx`:

```tsx
<div className="admin-workspace__warning" role="status">
  Static preview. Search-engine noindex metadata is not access control. Production access requires server-enforced owner authentication.
</div>
```

Do not alter the sidebar, approved navigation, ROSA brand treatment, public-site link, main-content ID, or layout classes.

- [ ] **Step 4: Run the focused integration tests**

```bash
pnpm --filter @rosa/web test -- \
  src/test/backend-integration-boundary.test.ts \
  src/test/admin-navigation.test.tsx \
  src/test/admin-auth-preview.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Run lint and typecheck for the complete authentication slice**

```bash
pnpm --filter @rosa/web lint
pnpm --filter @rosa/web typecheck
```

Expected: PASS.

- [ ] **Step 6: Commit the workspace connection**

```bash
git add \
  'apps/web/src/app/admin/(workspace)/layout.tsx' \
  apps/web/src/features/admin-navigation/admin-workspace-header.tsx \
  apps/web/src/components/layout/admin-shell.tsx \
  apps/web/src/test/admin-navigation.test.tsx \
  apps/web/src/test/backend-integration-boundary.test.ts
git commit -m "feat: protect existing admin workspace"
```

---

### Task 6: Verify every deferred backend area remains absent

**Files:**
- Inspect only; do not modify runtime files unless an accidental transfer is found.
- Test: `apps/web/src/test/backend-integration-boundary.test.ts`

**Interfaces:**
- Consumes: final integration-branch tree after Tasks 1–5.
- Produces: evidence that no incompatible backend feature entered the integration branch.

- [ ] **Step 1: Compare the integration branch against the frontend source**

```bash
git diff --stat frontend/f3e-d-governance...HEAD
git diff --name-status frontend/f3e-d-governance...HEAD
```

Expected changed runtime paths are limited to:

```text
apps/web/package.json
pnpm-lock.yaml
apps/web/src/lib/supabase/client.ts
apps/web/src/lib/supabase/server.ts
apps/web/src/lib/supabase/middleware.ts
apps/web/src/lib/supabase/auth-guard.ts
apps/web/src/middleware.ts
apps/web/src/app/admin/(auth)/login/action.ts
apps/web/src/app/admin/(workspace)/logout-action.ts
apps/web/src/app/admin/(workspace)/layout.tsx
apps/web/src/features/admin-auth-preview/admin-login-page.tsx
apps/web/src/features/admin-navigation/admin-workspace-header.tsx
apps/web/src/components/layout/admin-shell.tsx
apps/web/src/test/admin-auth-preview.test.tsx
apps/web/src/test/admin-navigation.test.tsx
apps/web/src/test/backend-integration-boundary.test.ts
```

Documentation files from this design/plan/completion are also expected.

- [ ] **Step 2: Search changed runtime files for prohibited product behavior**

```bash
git diff --unified=0 frontend/f3e-d-governance...HEAD -- apps/web \
  | grep -Ein 'add to cart|cartprovider|checkout|place order|payment|appointment|direct sale|stock status|public registration|sign up|price total' \
  && exit 1 || true
```

Expected: no matches in added runtime lines.

- [ ] **Step 3: Confirm incompatible backend files remain absent**

```bash
for path in \
  'apps/web/src/app/(public)/checkout/page.tsx' \
  'apps/web/src/app/(public)/order-success/page.tsx' \
  'apps/web/src/app/login/page.tsx' \
  'apps/web/src/app/api/checkout/route.ts' \
  'apps/web/src/app/api/contact/route.ts' \
  'apps/web/src/lib/cart/cart-context.tsx' \
  'apps/web/src/lib/supabase/queries.ts' \
  'apps/web/src/lib/supabase/types.ts' \
  'apps/web/src/app/admin/(workspace)/categories/action.ts' \
  'apps/web/src/app/admin/(workspace)/products/action.ts' \
  'apps/web/src/app/admin/(workspace)/messages/action.ts' \
  'apps/web/src/app/admin/(workspace)/site-content/action.ts'; do
  test ! -e "$path" || { echo "Unexpected transferred file: $path"; exit 1; }
done
```

Expected: exit code 0.

- [ ] **Step 4: Run the boundary test again**

```bash
pnpm --filter @rosa/web test -- src/test/backend-integration-boundary.test.ts
```

Expected: PASS.

No commit is needed unless this review removes an accidental file. If removal is required:

```bash
git add -A
git commit -m "fix: preserve selective integration boundary"
```

---

### Task 7: Run complete repository verification

**Files:**
- No planned source changes.

**Interfaces:**
- Consumes: completed selective integration slice.
- Produces: actual lint, typecheck, test, contract, build, and optional browser-test evidence.

- [ ] **Step 1: Install from the updated lockfile**

```bash
pnpm install --frozen-lockfile
```

Expected: PASS with no lockfile modification.

- [ ] **Step 2: Regenerate and verify contracts without accepting unrelated generated drift**

```bash
pnpm contracts:generate
git diff --exit-code -- packages/contracts
```

Expected: PASS and no generated contract changes. Do not copy the backend branch's generated schema over the current contract output.

- [ ] **Step 3: Run lint**

```bash
pnpm lint
```

Expected: PASS.

- [ ] **Step 4: Run typecheck**

```bash
pnpm typecheck
```

Expected: PASS.

- [ ] **Step 5: Run all unit and policy tests**

```bash
pnpm test
```

Expected: PASS.

- [ ] **Step 6: Run the production build**

```bash
pnpm build
```

Expected: PASS with `/admin/login` public, `/admin/**` workspace routes compiled, and middleware included.

- [ ] **Step 7: Run end-to-end tests only when the browser environment is available**

```bash
pnpm test:e2e
```

Expected: PASS. If Playwright browsers or required environment variables are unavailable, record the exact command output as environment-blocked rather than claiming success.

- [ ] **Step 8: Perform targeted environment-backed checks when Supabase credentials are available**

Run the app:

```bash
pnpm dev
```

Check exactly:

```text
1. Anonymous request to /admin redirects to /admin/login.
2. Invalid credentials remain on the Rosa login composition and display the backend error.
3. Valid configured credentials redirect to /admin.
4. Existing admin navigation and all current frontend pages remain visually intact.
5. Sign out redirects to /admin/login.
6. /admin/recovery remains the existing truthful static preview.
7. No /checkout, /order-success, or public /login route exists.
```

Do not create test users, alter Supabase configuration, or claim owner-only authorization beyond what the existing guard and external configuration demonstrably enforce.

---

### Task 8: Record exact integration and deferred scope

**Files:**
- Create: `docs/superpowers/completions/2026-08-02-frontend-backend-selective-integration.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: final diff and actual verification outputs.
- Produces: durable project coordination record for both frontend and backend contributors.

- [ ] **Step 1: Write the completion record with only verified facts**

Create `docs/superpowers/completions/2026-08-02-frontend-backend-selective-integration.md` with these sections and fill them from actual results:

```markdown
# Frontend–Backend Selective Integration Completion

## Branches
- Integration: `integration/f3e-d-phase4-backend`
- Frontend base: `frontend/f3e-d-governance`
- Backend source: `phase-4-backend`

## Integrated
- Supabase browser client.
- Supabase server client.
- Supabase session middleware.
- Existing authenticated-user workspace guard.
- Existing admin password-login action connected to the approved Rosa login composition.
- Existing logout action connected to the approved workspace header.

## Intentionally Deferred
- Recovery email and callback runtime.
- Public catalogue database reads.
- Product/family CRUD.
- Product inquiry persistence.
- General contact persistence.
- Admin inquiry/message persistence.
- Website content/contact-detail persistence.
- Publishing/revision persistence.
- Cart, checkout, orders, prices, stock, direct sale, appointments, public accounts, and all other backend-only behavior.

## Deferral Reasons
- Current frontend and backend fields/workflows are not one-to-one.
- Integrating them would require new schema, field loss, invented mappings, new UI, or prohibited product behavior.
- Those changes are outside this integration pass.

## Authorization Boundary
- Repository code now enforces the backend branch's existing authenticated-user guard for `/admin/**`.
- A stronger owner-role or owner-email allowlist is not claimed unless independently proven by external Supabase configuration or future repository code.

## Verification
- `pnpm install --frozen-lockfile`: [actual result]
- `pnpm contracts:generate`: [actual result]
- `pnpm lint`: [actual result]
- `pnpm typecheck`: [actual result]
- `pnpm test`: [actual result]
- `pnpm build`: [actual result]
- `pnpm test:e2e`: [actual result or exact environment blocker]
- Supabase-backed manual checks: [actual result or not run]
```

Replace bracketed result markers before committing; do not leave placeholders.

- [ ] **Step 2: Append an integration-lane entry to the existing root README**

Append, without replacing any existing README section:

```markdown
## Frontend–Backend Integration Lane — 2026-08-02

- Branch: `integration/f3e-d-phase4-backend`
- Base: `frontend/f3e-d-governance`
- Source reviewed: `phase-4-backend`
- Integrated scope: existing Supabase session infrastructure, existing admin login action, existing authenticated-user workspace guard, and existing logout action.
- Presentation authority: current F3E-D frontend routes, components, design system, and terminology remain intact.
- Deferred scope: every backend capability lacking a safe one-to-one frontend/data mapping, including catalogue CRUD, inquiry/message persistence, content persistence, recovery runtime, ecommerce, appointments, and public accounts.
- Completion evidence: `docs/superpowers/completions/2026-08-02-frontend-backend-selective-integration.md`
```

- [ ] **Step 3: Run documentation and final diff checks**

```bash
grep -RInE 'TBD|TODO|\[actual result\]|\[actual result or' \
  docs/superpowers/completions/2026-08-02-frontend-backend-selective-integration.md \
  README.md && exit 1 || true

git diff --check
git status --short
```

Expected: no placeholders, no whitespace errors, and only the completion record plus README are uncommitted.

- [ ] **Step 4: Commit completion documentation**

```bash
git add \
  README.md \
  docs/superpowers/completions/2026-08-02-frontend-backend-selective-integration.md
git commit -m "docs: record selective frontend backend integration"
```

- [ ] **Step 5: Perform the final verification-before-completion pass**

```bash
pnpm verify
git diff --check frontend/f3e-d-governance...HEAD
git status --short
```

Expected: `pnpm verify` passes, diff check reports no whitespace errors, and the working tree is clean.

## Plan Self-Review

- **Spec coverage:** The plan preserves the frontend base, transfers only compatible backend behavior, protects the existing workspace, connects existing login/logout behavior, and explicitly defers every non-one-to-one area required by the approved design.
- **No placeholders:** Runtime tasks contain exact paths, commands, signatures, markup, expected failures, expected passes, and commit commands. The completion-template result markers are explicitly required to be replaced before commit.
- **Type consistency:** `createClient()`, `updateSession(request)`, `requireAdmin()`, `login(formData)`, and `logout()` match the existing backend branch signatures. Existing frontend exports and route names remain unchanged.
- **Scope:** No catalogue, contact, inquiry, content, publishing, revision, ecommerce, appointment, or public-account implementation is added.
