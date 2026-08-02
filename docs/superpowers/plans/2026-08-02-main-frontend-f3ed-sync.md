# Main-First Frontend F3E-D Synchronization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve the current `main` branch as the authoritative backend, security, environment, proxy, deployment, and persistence baseline while transferring only the later verified frontend work from `frontend/f3e-d-governance` that was created after the shared integration checkpoint `e31b6e90267c193c8571ad5800117a57f8732f29`.

**Architecture:** Work from a branch created at current `main` commit `8ba83e42f796c44a34e8eed75e1643c1b808dcea`. Merge the frontend branch through Git history so only its 17 post-checkpoint commits are introduced. Resolve conflicts by retaining `main` for backend/security/environment/deployment decisions and retaining the frontend branch for verified presentation, typing, route-policy, regression-test, and generated-contract drift corrections unless those changes conflict with the current live implementation.

**Tech Stack:** GitHub branches and pull requests; Node.js 24; pnpm 11.4.0; Next.js 16; React 19; strict TypeScript; Vitest; Playwright; Supabase SSR; Cloudflare adapter.

## Global Constraints

- `main` is the daddy branch and remains the authority for backend implementation, Supabase configuration, authentication/session handling, environment placement, proxy or middleware decisions, deployment files, API routes, persistence, and security controls.
- Do not introduce a new product feature, endpoint, route, data model, UI workflow, abstraction, dependency, or redesign during this synchronization.
- Transfer only work already present in `frontend/f3e-d-governance` after merge base `e31b6e90267c193c8571ad5800117a57f8732f29`.
- Preserve all current backend additions on `main`, including live product/family/catalogue/media data, inquiries, messages, contact handling, Supabase authentication, API routes, and Cloudflare deployment configuration.
- Resolve only genuine integration conflicts and compatibility errors caused by joining the existing branches.
- Keep the backup branch `backup/main-before-frontend-f3ed-sync-2026-08-02` fixed at `8ba83e42f796c44a34e8eed75e1643c1b808dcea`.
- Work on `integration/main-frontend-f3ed-sync`; do not modify `main` until comparison and verification evidence is reviewed.
- Report every frontend change that cannot be transferred without changing backend behavior.

---

### Task 1: Lock the merge scope

**Files:**
- Inspect only: Git history from `e31b6e90267c193c8571ad5800117a57f8732f29` to `caef8027975f235a115c1d931cbec455645aa209`
- Inspect only: current `main` at `8ba83e42f796c44a34e8eed75e1643c1b808dcea`

**Interfaces:**
- Consumes: the current main branch, the verified frontend branch, and their common checkpoint.
- Produces: a finite transfer set of 17 frontend commits and their changed files.

- [ ] Confirm the backup branch points to the exact pre-sync main commit.
- [ ] Confirm the working integration branch starts from the same main commit.
- [ ] Compare `main...frontend/f3e-d-governance` and record every file introduced by the 17 frontend-only commits.
- [ ] Confirm no `services/api/**`, Supabase runtime, API route, middleware, Cloudflare, environment, or deployment file is part of the frontend-only transfer set.

**Verification:**

Use GitHub compare evidence. Expected: merge base `e31b6e90267c193c8571ad5800117a57f8732f29`; frontend ahead by 17 commits; transfer set limited to frontend verification corrections, tests, one safety stylesheet, generated contract output, and the consolidated verification record.

---

### Task 2: Merge the verified frontend history into the main-based working branch

**Files:**
- Merge source: `frontend/f3e-d-governance`
- Merge target: `integration/main-frontend-f3ed-sync`

**Interfaces:**
- Consumes: the scoped 17-commit frontend delta.
- Produces: one merge commit on the working branch preserving both histories.

- [ ] Open a pull request from `frontend/f3e-d-governance` into `integration/main-frontend-f3ed-sync`.
- [ ] Inspect the pull-request file list and unified diff before merging.
- [ ] Confirm that the pull request does not remove or replace current backend/security/deployment files.
- [ ] Attempt a normal merge commit; do not squash or rebase away either branch history.
- [ ] If GitHub reports conflicts, stop the merge and resolve only the conflicting files according to the main-first rules below.

**Main-first conflict rules:**

1. Keep `main` for Supabase clients, middleware/proxy, authentication guards/actions, API routes, live queries, environment access, Cloudflare files, package dependency decisions, and server/client component boundaries introduced by backend integration.
2. Keep frontend corrections for UI models, strict typing, semantic selectors, truthful copy, accessibility, responsive overflow, strict route inventories, static policies, and tests when they do not disable current live behavior.
3. For generated contract output, regenerate from the current source contract rather than choosing an arbitrary side.
4. For stale README coordination content, preserve current factual backend state and append the verified frontend history; do not restore claims that production code or backend work is not started.
5. Do not delete a live backend behavior merely because an older static frontend test expected it to be absent; update only the inherited verification expectation needed to represent the already-existing integrated behavior.

**Verification:**

The working branch must contain current main history plus the 17 frontend-only commits, with no unreviewed backend deletion.

---

### Task 3: Repair merge-caused incompatibilities only

**Files:**
- Modify only files that fail because the two existing branches were joined.
- Do not create new application features.

**Interfaces:**
- Consumes: merge conflicts, TypeScript errors, test failures, or build failures caused by branch integration.
- Produces: minimal compatibility fixes preserving both existing feature sets.

- [ ] Run contract generation and drift checks.
- [ ] Run lint and strict TypeScript.
- [ ] Run the complete unit/static test suite.
- [ ] Run the production build.
- [ ] Run Playwright if the available environment supports the configured browsers and required variables.
- [ ] For each failure, identify whether it existed on current main before the merge or was caused by the frontend transfer.
- [ ] Fix only failures caused by the transfer, using the smallest change that preserves current main behavior and the verified frontend intent.
- [ ] Record every pre-existing main failure separately instead of masking it.

**Verification commands:**

```bash
pnpm contracts:generate
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Expected: commands execute under Node.js 24 and pnpm 11.4.0. Any unavailable credentials, services, browsers, or environment variables are reported explicitly.

---

### Task 4: Perform feature-parity comparison

**Files:**
- Inspect: `main`
- Inspect: `frontend/f3e-d-governance`
- Inspect: `integration/main-frontend-f3ed-sync`

**Interfaces:**
- Consumes: final working branch and both source branches.
- Produces: evidence that current main features remain and the complete post-checkpoint frontend delta is represented.

- [ ] Compare the working branch against current `main` and confirm all differences are frontend transfer, merge-resolution, verification, or coordination files.
- [ ] Compare the working branch against `frontend/f3e-d-governance` and confirm backend/security/deployment differences are expected main-owned additions.
- [ ] Check that every file in the 17-commit frontend transfer set is either identical to the frontend branch or deliberately reconciled with a documented main-owned live implementation.
- [ ] Check that current main API routes, Supabase files, live queries, middleware/proxy files, Cloudflare files, and backend-added page behavior remain present.
- [ ] List any frontend feature or correction that could not be transferred and state the exact reason.

**Verification:**

No missing frontend-only file is left unexplained. No main-owned backend/security/deployment file is unexpectedly removed.

---

### Task 5: Record the synchronized checkpoint and prepare main integration

**Files:**
- Modify: `README.md`
- Create: `docs/superpowers/completions/2026-08-02-main-frontend-f3ed-sync.md`

**Interfaces:**
- Consumes: actual branch, commit, comparison, verification, and blocker evidence.
- Produces: the new agreed continuation checkpoint.

- [ ] Update the README with factual current frontend and backend status without deleting accepted decisions.
- [ ] Record exact source branches, merge base, backup branch, working branch, commits, tests, preserved backend boundaries, reconciled files, and unresolved failures.
- [ ] Open a pull request from `integration/main-frontend-f3ed-sync` to `main` for final review.
- [ ] Do not merge that pull request until the branch comparison and available verification evidence support it.

**Verification:**

The completion record must distinguish passed checks, unavailable checks, pre-existing failures, merge-caused failures, and unresolved feature-transfer gaps. No completion claim may rely on the earlier frontend-only verification run alone.
