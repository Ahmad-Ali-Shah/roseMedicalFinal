# Lived and Public-Site Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a new branch that explicitly merges the completed public frontend into the fetched `lived` backend/security line, hardens the resulting deployment boundary, verifies it, and supplies a detailed maintainer report.

**Architecture:** The frontend source is first checkpointed without rewriting history. A new integration branch is then created at `origin/lived` and merges the frontend checkpoint with `--no-ff`. Semantic corrections are applied after the merge so the report can distinguish inherited behavior, frontend behavior, and integration-only decisions.

**Tech Stack:** Git linked worktrees, Next.js 16, React 19, TypeScript, Supabase SSR/JS, Cloudflare OpenNext/Wrangler, Vitest, Node test runner, Playwright, ESLint, pnpm.

## Global Constraints

- Backend/deployment authority starts with `origin/lived` at `4fec4fa534fc318ac8770dbad0e3287ea1b3e589`.
- Frontend authority starts with `feature/public-site-motion-system`, including its reviewed working tree.
- Preserve the stronger security control at every overlap; do not mechanically restore a weaker historical `lived` implementation.
- Never commit real Supabase, service-role, owner, Resend, alert, or password secrets.
- Do not rewrite, reset, or delete either source history.
- Do not push or open a pull request unless separately requested.
- Record every material integration decision in the final report.

---

### Task 1: Verify and checkpoint the frontend source

**Files:**
- Include: the complete reviewed working tree under `apps/web/**` and `docs/superpowers/**`
- Exclude: ignored build caches, local environment files, and secret files

**Interfaces:**
- Consumes: `feature/public-site-motion-system` and fetched `origin/lived`
- Produces: one clean frontend source commit reachable from `feature/public-site-motion-system`

- [ ] **Step 1: Reconfirm ancestry and source tips**

Run:

```powershell
git fetch origin lived
git rev-parse origin/lived
git merge-base HEAD origin/lived
git rev-list --left-right --count HEAD...origin/lived
```

Expected: `origin/lived` and the merge base are `4fec4fa...`; the frontend side is ahead and `lived` has no unique commits.

- [ ] **Step 2: Scan the source tree before staging**

Run:

```powershell
git status --short
git diff --check
rg -n -i --hidden -g '!node_modules/**' -g '!.next/**' -g '!.git/**' '(BEGIN (RSA|OPENSSH|EC) PRIVATE KEY|service_role[^A-Za-z]|supabase_service_role_key\s*=|resend_api_key\s*=|password\s*=)'
```

Expected: no committed secret value or private key. Environment-variable names in source and documentation are allowed.

- [ ] **Step 3: Run the pre-merge application baseline**

Run from `apps/web`:

```powershell
pnpm test
pnpm run test:foundation
pnpm run typecheck
pnpm run lint
```

Expected: all commands exit 0.

- [ ] **Step 4: Run the production build baseline**

Supply only non-secret compile-time placeholders in the process environment and run:

```powershell
pnpm run build
```

Expected: Next.js production build exits 0. The placeholders must not be written to a tracked file.

- [ ] **Step 5: Commit the complete frontend source**

Run:

```powershell
git add -A
git status --short
git commit -m "feat: complete public site and media integration source"
```

Expected: the worktree becomes clean and the new commit remains on `feature/public-site-motion-system`.

### Task 2: Create the explicit integration branch and merge boundary

**Files:**
- Git refs and merge metadata only

**Interfaces:**
- Consumes: `origin/lived` and the clean frontend source commit from Task 1
- Produces: `integration/lived-public-site-complete-2026-08-06` with an explicit two-parent merge commit

- [ ] **Step 1: Capture the source commit IDs**

Run:

```powershell
$frontendSource = git rev-parse feature/public-site-motion-system
$livedSource = git rev-parse origin/lived
Write-Output "frontend=$frontendSource"
Write-Output "lived=$livedSource"
```

- [ ] **Step 2: Create the new branch at `lived`**

Run:

```powershell
git switch --create integration/lived-public-site-complete-2026-08-06 origin/lived
```

Expected: the current branch is the new integration branch and `HEAD` equals the fetched `lived` tip.

- [ ] **Step 3: Merge the frontend source explicitly**

Run:

```powershell
git merge --no-ff feature/public-site-motion-system -m "merge: integrate lived backend with completed public site"
```

Expected: a merge commit is created. Because `lived` is an ancestor, Git should not require content conflict resolution.

- [ ] **Step 4: Verify merge parentage**

Run:

```powershell
git show --no-patch --format="%H%n%P%n%s" HEAD
git merge-base --is-ancestor origin/lived HEAD
git merge-base --is-ancestor feature/public-site-motion-system HEAD
```

Expected: the merge commit has two parents and both source tips are ancestors.

### Task 3: Add integration hygiene tests

**Files:**
- Create: `apps/web/src/test/admin-client-configuration.test.ts`
- Create: `apps/web/src/test/server-only.ts`
- Modify: `apps/web/src/lib/supabase/admin.ts`
- Modify: `apps/web/vitest.config.ts`
- Delete: `.github/workflows/temporary-f7-checkpoint.yml`

**Interfaces:**
- Consumes: the merged deployment and security boundary
- Produces: behavioral regression coverage for fail-closed service-role configuration, plus production-build and repository-hygiene verification for the server-only boundary and removal of temporary credential injection

- [ ] **Step 1: Write the failing integration security test**

Create a test that stubs both required environment values to empty strings, calls the real factory, and asserts the integration-owned failure:

```ts
vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "");

expect(() => createAdminClient()).toThrowError(
  "Supabase admin client is not configured."
);
```

The production change that makes this test pass is an explicit configuration guard before Supabase client construction. Removing that guard later makes the test fail with the dependency's different error.

- [ ] **Step 2: Run the focused test and verify RED**

Run from `apps/web`:

```powershell
pnpm exec vitest run src/test/admin-client-configuration.test.ts
```

Expected: assertion failure because `admin.ts` lacks the integration-owned fail-closed guard.

- [ ] **Step 3: Apply the minimal integration corrections**

Delete `.github/workflows/temporary-f7-checkpoint.yml`.

Add an empty `apps/web/src/test/server-only.ts` test adapter and map `server-only` to it in `apps/web/vitest.config.ts`. This keeps the test runner in its Node test context while the real Next.js production build consumes the actual `server-only` marker.

Update `apps/web/src/lib/supabase/admin.ts` to:

```ts
import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase admin client is not configured.");
  }

  return createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run:

```powershell
pnpm exec vitest run src/test/admin-client-configuration.test.ts src/test/minimal-critical-security.test.ts src/test/backend-integration-boundary.test.ts
```

Expected: all focused integration/security tests pass.

- [ ] **Step 5: Commit the integration corrections**

Run:

```powershell
git add -A -- .github/workflows/temporary-f7-checkpoint.yml apps/web/src/lib/supabase/admin.ts apps/web/vitest.config.ts apps/web/src/test/admin-client-configuration.test.ts apps/web/src/test/server-only.ts
git commit -m "security: harden merged runtime configuration"
```

### Task 4: Verify the merged application

**Files:**
- Read: complete repository and generated test/build output
- Update only when a verified merge regression is found

**Interfaces:**
- Consumes: the corrected integration branch
- Produces: fresh evidence for all code, build, browser, and security claims

- [ ] **Step 1: Run the repository test suite**

Run from repository root:

```powershell
pnpm test
```

Expected: all contract and web test files pass with zero failures.

- [ ] **Step 2: Run foundation, type, and lint gates**

Run:

```powershell
pnpm --filter @rosa/web run test:foundation
pnpm typecheck
pnpm lint
```

Expected: all commands exit 0.

- [ ] **Step 3: Run the final production build**

Use process-only non-secret placeholders where static compilation requires configuration, then run:

```powershell
pnpm build
```

Expected: the production build exits 0 without ignored TypeScript or ESLint failures.

- [ ] **Step 4: Run focused browser coverage**

Run the maintained public/admin Playwright suite with a local test server and then:

```powershell
node scripts/qa-owner-refinement.mjs
node scripts/qa-latest-media.mjs
```

Expected: public and admin routes render at desktop/mobile sizes with no broken images, console errors, page errors, or horizontal overflow.

- [ ] **Step 5: Run final repository hygiene checks**

Run:

```powershell
git diff --check HEAD^..HEAD
git status --short
git grep -n -i -E '(placeholder-service-role-key|placeholder-resend-key|placeholder-alert-secret|BEGIN (RSA|OPENSSH|EC) PRIVATE KEY)' HEAD -- ':!apps/web/playwright.config.ts' ':!apps/web/src/test/**' ':!docs/**'
git merge-base --is-ancestor origin/lived HEAD
git merge-base --is-ancestor feature/public-site-motion-system HEAD
```

Expected: clean worktree, no runtime/CI placeholder secret values, and both sources are ancestors.

### Task 5: Produce the maintainer handoff report

**Files:**
- Create: `docs/superpowers/reports/2026-08-06-lived-frontend-integration-report.md`

**Interfaces:**
- Consumes: source audit, merge commits, corrections, and fresh verification evidence
- Produces: a standalone review package for the `lived` branch maintainer

- [ ] **Step 1: Write the report**

Include exact source/final commit IDs, ancestry, branch mechanics, authority matrix, file-level backend/security decisions, removed temporary configuration, verification commands/counts, screenshots/report paths, and production-only acceptance items.

- [ ] **Step 2: Self-review the report**

Verify that it contains no unresolved marker, unsupported completion claim, real credential, or omitted critical decision.

- [ ] **Step 3: Commit the report**

Run:

```powershell
git add -- docs/superpowers/reports/2026-08-06-lived-frontend-integration-report.md
git commit -m "docs: report lived frontend integration"
```

- [ ] **Step 4: Re-run the final evidence commands after the report commit**

Run at least `pnpm test`, `pnpm typecheck`, `pnpm lint`, the production build, `git status --short`, the ancestry checks, and the tracked secret scan. Record the final commit ID in the handoff response.
