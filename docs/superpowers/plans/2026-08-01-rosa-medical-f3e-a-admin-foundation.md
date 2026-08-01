# Rosa Medical F3E-A Static Admin Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Rosa Medical uses inline execution only.

**Goal:** Build the static owner-access routes, owner workspace shell, source-backed admin dashboard, reusable admin presentation primitives, and truthful isolated preview states approved for F3E-A.

**Architecture:** The Next.js App Router keeps `/admin/login` and `/admin/recovery` inside the owner-access layout, while `/admin` and all workspace routes use one admin shell that owns the sole workspace `<main>`. Shared admin presentation components live under focused feature boundaries, dashboard counts derive from the existing F3B/F3C registries, and preview-only states remain exported but unmounted from normal routes.

**Tech Stack:** Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS 4 bootstrap with project CSS custom properties, CSS modules-by-convention through shared stylesheet files, Vitest server-render tests, Node static-policy tests, and Playwright.

## Global Constraints

- Read `README.md` from `main` before implementation and preserve its backend-owned lane and previous messages.
- Create `frontend/f3e-a-admin-foundation` from `frontend/f3e-a-admin-foundation-design` at commit `928de52c034791a3e8f9f56beabccec6f5b1e06b`.
- Work only in frontend-owned files, F3E-A documentation, and the shared README coordination update.
- Use inline execution only; do not offer or dispatch subagents.
- Public and admin logo treatment remains `ROSA`; never add “Medical” to the logo lockup.
- There is one future protected owner account, no registration, no invitation flow, no social login, and no multiple roles.
- F3E-A is static composition only: no authentication, session, recovery submission, persistence, cookies, local storage, MSW, API calls, CRUD, uploads, publishing, or live operational data.
- Login and Recovery normal routes must not contain a native `<form>`.
- Every inactive action is disabled or rendered as explicitly noninteractive preview content.
- Dashboard counts derive from `CATALOGUE_FAMILIES`, `CATALOGUE_PRODUCTS`, and `CATALOGUE_DOCUMENTS`.
- Inquiries and messages display `Awaiting live data`; do not display numeric values.
- Normal routes do not mount preview-only authentication, collection, or mutation states.
- All `/admin/**` routes use `robots: { index: false, follow: false }`, with visible copy stating that `noindex` is not access control.
- Owner-access and workspace routes each contain exactly one `<main>` and one `<h1>`.
- English and Arabic preview fields remain separate; Arabic field containers may use `dir="rtl"`.
- Target viewports are 1440 × 1000, 768 × 1024, and 390 × 844.
- Do not change `services/api/**` or `packages/contracts/openapi/**`.
- Do not claim lint, typecheck, tests, build, or Playwright passed without fresh command output and exit status.
- Keep commits meaningful and avoid unnecessary GitHub Actions runs.

---

## File Map

### Admin route and metadata boundary

- Modify `apps/web/src/app/admin/layout.tsx` — admin-wide `noindex` metadata.
- Modify `apps/web/src/app/admin/(auth)/layout.tsx` — owner-access shell and sole `<main>`.
- Modify `apps/web/src/app/admin/(auth)/login/page.tsx` — static Login composition.
- Modify `apps/web/src/app/admin/(auth)/recovery/page.tsx` — static Recovery composition.
- Modify `apps/web/src/app/admin/(workspace)/layout.tsx` — pass workspace content through the rebuilt shell.
- Modify `apps/web/src/app/admin/(workspace)/page.tsx` — dashboard route.
- Modify `apps/web/src/app/admin/(workspace)/[...segments]/page.tsx` — deliberate deferred-route compositions.

### Admin navigation and shell

- Create `apps/web/src/features/admin-navigation/admin-navigation-model.ts` — immutable grouped route model and route lookup.
- Create `apps/web/src/features/admin-navigation/admin-navigation.tsx` — current-route-aware grouped navigation.
- Create `apps/web/src/features/admin-navigation/admin-workspace-header.tsx` — current route label, session status, disabled sign out.
- Create `apps/web/src/features/admin-navigation/index.ts` — exports.
- Modify `apps/web/src/components/layout/admin-shell.tsx` — desktop/mobile owner workspace composition.

### Shared admin primitives

- Create `apps/web/src/features/admin-primitives/admin-page-header.tsx`.
- Create `apps/web/src/features/admin-primitives/admin-section.tsx`.
- Create `apps/web/src/features/admin-primitives/admin-status.tsx`.
- Create `apps/web/src/features/admin-primitives/admin-feedback.tsx`.
- Create `apps/web/src/features/admin-primitives/admin-metrics.tsx`.
- Create `apps/web/src/features/admin-primitives/admin-controls.tsx`.
- Create `apps/web/src/features/admin-primitives/admin-data-table.tsx`.
- Create `apps/web/src/features/admin-primitives/admin-fields.tsx`.
- Create `apps/web/src/features/admin-primitives/admin-preview-states.tsx`.
- Create `apps/web/src/features/admin-primitives/index.ts`.

### Owner access

- Create `apps/web/src/features/admin-auth-preview/admin-owner-access-frame.tsx`.
- Create `apps/web/src/features/admin-auth-preview/admin-login-page.tsx`.
- Create `apps/web/src/features/admin-auth-preview/admin-recovery-page.tsx`.
- Create `apps/web/src/features/admin-auth-preview/admin-auth-state-previews.tsx`.
- Create `apps/web/src/features/admin-auth-preview/index.ts`.

### Dashboard and deferred routes

- Create `apps/web/src/features/admin-dashboard/admin-dashboard-model.ts`.
- Create `apps/web/src/features/admin-dashboard/admin-dashboard-page.tsx`.
- Create `apps/web/src/features/admin-dashboard/admin-workspace-status.tsx`.
- Create `apps/web/src/features/admin-dashboard/admin-catalogue-overview.tsx`.
- Create `apps/web/src/features/admin-dashboard/admin-launch-readiness.tsx`.
- Create `apps/web/src/features/admin-dashboard/admin-operational-data.tsx`.
- Create `apps/web/src/features/admin-dashboard/index.ts`.
- Create `apps/web/src/features/admin-routing/admin-deferred-route-page.tsx`.
- Create `apps/web/src/features/admin-routing/index.ts`.

### Styles and tests

- Create `apps/web/src/styles/f3e-admin-foundation.css`.
- Modify `apps/web/src/app/globals.css` — import F3E-A stylesheet after F3D styles.
- Create `apps/web/src/test/admin-navigation.test.tsx`.
- Create `apps/web/src/test/admin-primitives.test.tsx`.
- Create `apps/web/src/test/admin-auth-preview.test.tsx`.
- Create `apps/web/src/test/admin-dashboard.test.tsx`.
- Create `apps/web/src/test/admin-route-composition.test.tsx`.
- Create `apps/web/src/test/f3e-a-admin-policy.static.test.mjs`.
- Create `apps/web/src/test/f3e-a-admin-styles.static.test.mjs`.
- Create `apps/web/tests/e2e/f3e-a-admin-foundation.spec.ts`.
- Create `docs/superpowers/completions/2026-08-01-rosa-medical-f3e-a-admin-foundation.md`.

---

### Task 1: Create the implementation branch, admin metadata, and immutable navigation model

**Files:**
- Modify: `apps/web/src/app/admin/layout.tsx`
- Create: `apps/web/src/features/admin-navigation/admin-navigation-model.ts`
- Create: `apps/web/src/features/admin-navigation/index.ts`
- Create: `apps/web/src/test/admin-navigation.test.tsx`

**Interfaces:**
- Consumes: Next.js `Metadata` and typed `Route`.
- Produces: `AdminNavigationItem`, `AdminNavigationGroup`, `ADMIN_NAVIGATION_GROUPS`, `ADMIN_NAVIGATION_ITEMS`, `getAdminNavigationItem(pathname)` and admin-wide metadata.

- [ ] **Step 1: Create the implementation branch from the approved design/plan branch**

```bash
git switch frontend/f3e-a-admin-foundation-design
git pull --ff-only
git switch -c frontend/f3e-a-admin-foundation
```

Expected base commit:

```text
928de52c034791a3e8f9f56beabccec6f5b1e06b
```

- [ ] **Step 2: Write the failing navigation-model test**

```tsx
import { describe, expect, it } from "vitest";
import {
  ADMIN_NAVIGATION_GROUPS,
  ADMIN_NAVIGATION_ITEMS,
  getAdminNavigationItem
} from "@/features/admin-navigation";

const expectedRoutes = [
  "/admin",
  "/admin/products",
  "/admin/families",
  "/admin/catalogues",
  "/admin/media",
  "/admin/inquiries",
  "/admin/messages",
  "/admin/content",
  "/admin/contact-details",
  "/admin/publishing",
  "/admin/revisions",
  "/admin/settings"
] as const;

describe("F3E-A admin navigation model", () => {
  it("defines each approved workspace route exactly once", () => {
    expect(ADMIN_NAVIGATION_ITEMS.map((item) => item.href)).toEqual(expectedRoutes);
    expect(new Set(ADMIN_NAVIGATION_ITEMS.map((item) => item.href)).size).toBe(12);
  });

  it("preserves the approved navigation groups", () => {
    expect(ADMIN_NAVIGATION_GROUPS.map((group) => group.label)).toEqual([
      "Overview",
      "Catalogue",
      "Operations",
      "Website",
      "Publishing",
      "System"
    ]);
  });

  it("resolves exact and nested workspace paths", () => {
    expect(getAdminNavigationItem("/admin")?.key).toBe("dashboard");
    expect(getAdminNavigationItem("/admin/products/example")?.key).toBe("products");
    expect(getAdminNavigationItem("/admin/unknown")).toBeUndefined();
  });
});
```

- [ ] **Step 3: Run the test and confirm the red state**

```bash
pnpm --filter @rosa/web test -- admin-navigation.test.tsx
```

Expected: failure because `@/features/admin-navigation` does not exist.

- [ ] **Step 4: Implement the immutable navigation model**

```ts
import type { Route } from "next";

export interface AdminNavigationItem {
  key:
    | "dashboard"
    | "products"
    | "families"
    | "catalogues"
    | "media"
    | "inquiries"
    | "messages"
    | "content"
    | "contact-details"
    | "publishing"
    | "revisions"
    | "settings";
  label: string;
  shortLabel: string;
  href: Route;
}

export interface AdminNavigationGroup {
  key: "overview" | "catalogue" | "operations" | "website" | "publishing" | "system";
  label: string;
  items: readonly AdminNavigationItem[];
}

export const ADMIN_NAVIGATION_GROUPS = [
  {
    key: "overview",
    label: "Overview",
    items: [{ key: "dashboard", label: "Dashboard", shortLabel: "Dashboard", href: "/admin" }]
  },
  {
    key: "catalogue",
    label: "Catalogue",
    items: [
      { key: "products", label: "Products", shortLabel: "Products", href: "/admin/products" },
      { key: "families", label: "Families", shortLabel: "Families", href: "/admin/families" },
      { key: "catalogues", label: "Catalogues", shortLabel: "Catalogues", href: "/admin/catalogues" },
      { key: "media", label: "Media", shortLabel: "Media", href: "/admin/media" }
    ]
  },
  {
    key: "operations",
    label: "Operations",
    items: [
      { key: "inquiries", label: "Quotation Inquiries", shortLabel: "Inquiries", href: "/admin/inquiries" },
      { key: "messages", label: "General Messages", shortLabel: "Messages", href: "/admin/messages" }
    ]
  },
  {
    key: "website",
    label: "Website",
    items: [
      { key: "content", label: "Website Content", shortLabel: "Content", href: "/admin/content" },
      { key: "contact-details", label: "Contact Details", shortLabel: "Contact", href: "/admin/contact-details" }
    ]
  },
  {
    key: "publishing",
    label: "Publishing",
    items: [
      { key: "publishing", label: "Publishing Centre", shortLabel: "Publishing", href: "/admin/publishing" },
      { key: "revisions", label: "Revision History", shortLabel: "Revisions", href: "/admin/revisions" }
    ]
  },
  {
    key: "system",
    label: "System",
    items: [{ key: "settings", label: "Settings", shortLabel: "Settings", href: "/admin/settings" }]
  }
] as const satisfies readonly AdminNavigationGroup[];

export const ADMIN_NAVIGATION_ITEMS = ADMIN_NAVIGATION_GROUPS.flatMap(
  (group) => group.items
);

export function getAdminNavigationItem(pathname: string): AdminNavigationItem | undefined {
  return ADMIN_NAVIGATION_ITEMS.find((item) =>
    item.href === "/admin"
      ? pathname === "/admin"
      : pathname === item.href || pathname.startsWith(`${item.href}/`)
  );
}
```

Export the model from `index.ts`.

- [ ] **Step 5: Add admin-wide noindex metadata**

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Owner Workspace | ROSA",
    template: "%s | ROSA Owner Workspace"
  },
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

- [ ] **Step 6: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-navigation.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/app/admin/layout.tsx apps/web/src/features/admin-navigation apps/web/src/test/admin-navigation.test.tsx
git commit -m "feat: define F3E-A admin route model"
```

Do not call the test or typecheck passing unless fresh output confirms it.

---

### Task 2: Build shared admin structure, status, feedback, and metric primitives

**Files:**
- Create: `apps/web/src/features/admin-primitives/admin-page-header.tsx`
- Create: `apps/web/src/features/admin-primitives/admin-section.tsx`
- Create: `apps/web/src/features/admin-primitives/admin-status.tsx`
- Create: `apps/web/src/features/admin-primitives/admin-feedback.tsx`
- Create: `apps/web/src/features/admin-primitives/admin-metrics.tsx`
- Create: `apps/web/src/features/admin-primitives/index.ts`
- Create: `apps/web/src/test/admin-primitives.test.tsx`

**Interfaces:**
- Consumes: base `Alert`, `Button`, `ButtonLink`, React HTML attributes and nodes.
- Produces: `AdminPageHeader`, `AdminSection`, `AdminSectionHeader`, `AdminActionGroup`, `AdminStatusTone`, `AdminStatusBadge`, `AdminAlert`, `AdminStat`, and `AdminUnresolvedMetric`.

- [ ] **Step 1: Write failing primitive tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  AdminAlert,
  AdminPageHeader,
  AdminSection,
  AdminStat,
  AdminStatusBadge,
  AdminUnresolvedMetric
} from "@/features/admin-primitives";

describe("F3E-A admin primitives", () => {
  it("renders one page heading and described status text", () => {
    const html = renderToStaticMarkup(
      <>
        <AdminPageHeader eyebrow="Admin overview" title="Rosa workspace overview." description="Static owner workspace preview." />
        <AdminStatusBadge tone="warning">Backend not connected</AdminStatusBadge>
      </>
    );
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain("Backend not connected");
  });

  it("distinguishes source-backed and unresolved metrics", () => {
    const html = renderToStaticMarkup(
      <AdminSection title="Metrics">
        <AdminStat label="Products" value={20} href="/admin/products" />
        <AdminUnresolvedMetric label="Inquiries" />
      </AdminSection>
    );
    expect(html).toContain(">20<");
    expect(html).toContain("Awaiting live data");
    expect(html).toContain('href="/admin/products"');
  });

  it("uses an alert role only for danger feedback", () => {
    const warning = renderToStaticMarkup(<AdminAlert tone="warning" title="Preview">Static state.</AdminAlert>);
    const danger = renderToStaticMarkup(<AdminAlert tone="danger" title="Error">Unable to load.</AdminAlert>);
    expect(warning).toContain('role="status"');
    expect(danger).toContain('role="alert"');
  });
});
```

- [ ] **Step 2: Run the test and confirm failure**

```bash
pnpm --filter @rosa/web test -- admin-primitives.test.tsx
```

Expected: unresolved admin-primitives exports.

- [ ] **Step 3: Implement structure primitives**

`AdminPageHeader` props:

```ts
export interface AdminPageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}
```

Render one `<header className="admin-page-header">`, one eyebrow paragraph, one `<h1>`, optional description and optional `AdminActionGroup` container. Do not render `<main>`.

`AdminSection` props:

```ts
export interface AdminSectionProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  eyebrow?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}
```

Render `<section>` and use `useId()` for a generated heading ID when `title` exists. `AdminSectionHeader` renders an `<h2>`, and `AdminActionGroup` renders a non-landmark `<div>`.

- [ ] **Step 4: Implement status and feedback primitives**

```ts
export type AdminStatusTone =
  | "neutral"
  | "warning"
  | "danger"
  | "success"
  | "draft"
  | "review"
  | "ready"
  | "published"
  | "hidden"
  | "archived";
```

`AdminStatusBadge` renders a `<span data-admin-status={tone}>`. `AdminAlert` wraps the existing `Alert`; map `draft`, `review`, `ready`, `published`, `hidden`, and `archived` to a visually neutral base alert tone while retaining the exact admin status in `data-admin-alert-tone`.

- [ ] **Step 5: Implement metric primitives**

```tsx
import Link from "next/link";
import type { Route } from "next";

export function AdminStat({
  label,
  value,
  href,
  note
}: {
  label: string;
  value: string | number;
  href?: Route;
  note?: string;
}) {
  const content = (
    <>
      <span className="admin-stat__label">{label}</span>
      <strong className="admin-stat__value">{value}</strong>
      {note ? <span className="admin-stat__note">{note}</span> : null}
    </>
  );
  return href ? <Link className="admin-stat" href={href}>{content}</Link> : <div className="admin-stat">{content}</div>;
}

export function AdminUnresolvedMetric({ label }: { label: string }) {
  return <div className="admin-unresolved-metric"><span>{label}</span><strong>Awaiting live data</strong></div>;
}
```

- [ ] **Step 6: Export, verify, and commit**

```bash
pnpm --filter @rosa/web test -- admin-primitives.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-primitives apps/web/src/test/admin-primitives.test.tsx
git commit -m "feat: add F3E-A admin structure primitives"
```

---

### Task 3: Add collection controls, semantic tables, record lists, and locale field previews

**Files:**
- Create: `apps/web/src/features/admin-primitives/admin-controls.tsx`
- Create: `apps/web/src/features/admin-primitives/admin-data-table.tsx`
- Create: `apps/web/src/features/admin-primitives/admin-fields.tsx`
- Modify: `apps/web/src/features/admin-primitives/index.ts`
- Modify: `apps/web/src/test/admin-primitives.test.tsx`

**Interfaces:**
- Consumes: `Button`, React nodes, generic row records.
- Produces: `AdminToolbar`, `AdminSearchPreview`, `AdminFilterPreview`, `AdminPaginationPreview`, `AdminDataTableColumn<Row>`, `AdminDataTable<Row>`, `AdminRecordList`, `AdminFormSection`, `AdminFieldPreview`, `AdminTextareaPreview`, `AdminSelectPreview`, and `AdminLocaleFieldPair`.

- [ ] **Step 1: Add failing accessibility and static-boundary tests**

```tsx
import {
  AdminDataTable,
  AdminFieldPreview,
  AdminLocaleFieldPair,
  AdminPaginationPreview,
  AdminSearchPreview,
  AdminSelectPreview
} from "@/features/admin-primitives";

it("renders a semantic table and labelled stacked records", () => {
  const rows = [{ id: "alpha", name: "Alpha", status: "Draft" }];
  const html = renderToStaticMarkup(
    <AdminDataTable
      caption="Example records"
      rows={rows}
      getRowKey={(row) => row.id}
      columns={[
        { key: "name", header: "Name", render: (row) => row.name },
        { key: "status", header: "Status", render: (row) => row.status }
      ]}
    />
  );
  expect(html).toContain("<table");
  expect(html).toContain("<caption");
  expect((html.match(/scope="col"/g) ?? [])).toHaveLength(2);
  expect(html).toContain("data-admin-record-list");
  expect(html).toContain("Name");
});

it("keeps collection controls and field previews noninteractive", () => {
  const html = renderToStaticMarkup(
    <>
      <AdminSearchPreview label="Search products" />
      <AdminSelectPreview id="status" label="Status" options={["All statuses"]} />
      <AdminPaginationPreview />
      <AdminFieldPreview id="title" label="Title" value="Example" />
    </>
  );
  expect(html).toContain("readonly");
  expect((html.match(/disabled/g) ?? [])).toBeGreaterThanOrEqual(3);
  expect(html).not.toContain("<form");
});

it("renders English and Arabic preview fields separately", () => {
  const html = renderToStaticMarkup(
    <AdminLocaleFieldPair id="name" label="Name" englishValue="Scissors" arabicValue="" />
  );
  expect(html).toContain("Name — English");
  expect(html).toContain("Name — Arabic");
  expect(html).toContain('dir="rtl"');
});
```

- [ ] **Step 2: Run the test and confirm the red state**

```bash
pnpm --filter @rosa/web test -- admin-primitives.test.tsx
```

Expected: missing collection and field exports.

- [ ] **Step 3: Implement disabled collection controls**

`AdminToolbar` renders a `<div className="admin-toolbar">` and accepts `children`.

`AdminSearchPreview` renders a labelled `<input type="search" readOnly aria-readonly="true">` with visible hint `Search preview — not connected`.

`AdminFilterPreview` and `AdminSelectPreview` render disabled `<select>` controls. `AdminPaginationPreview` renders disabled Previous and Next buttons plus visible `Pagination preview — live collection unavailable`.

- [ ] **Step 4: Implement the generic semantic table**

```ts
export interface AdminDataTableColumn<Row> {
  key: string;
  header: string;
  render: (row: Row) => ReactNode;
  align?: "start" | "end";
}

export interface AdminDataTableProps<Row> {
  caption: string;
  rows: readonly Row[];
  columns: readonly AdminDataTableColumn<Row>[];
  getRowKey: (row: Row) => string;
}
```

Render both:

1. `<div className="admin-data-table__desktop">` containing a semantic table with caption, `<thead>`, `<th scope="col">`, and `<tbody>`.
2. `<ol className="admin-record-list" data-admin-record-list>` containing one `<li>` per row and one `<dl>` per row. Each column header becomes `<dt>` and rendered value becomes `<dd>`.

CSS will switch between desktop table and stacked record list. Do not add selection checkboxes or sorting controls.

- [ ] **Step 5: Implement field preview primitives**

`AdminFieldPreview` props:

```ts
export interface AdminFieldPreviewProps {
  id: string;
  label: string;
  value?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "url";
  hint?: string;
  error?: string;
  direction?: "ltr" | "rtl";
}
```

Render a visible `<label>`, read-only input, and associated hint/error ID. `AdminTextareaPreview` follows the same pattern with `<textarea readOnly>`. `AdminFormSection` is a semantic `<section>` or `<fieldset>` depending on props, never a native form.

`AdminLocaleFieldPair` renders English and Arabic `AdminFieldPreview` components with IDs `${id}-en` and `${id}-ar`, labels `${label} — English` and `${label} — Arabic`, and Arabic wrapper `dir="rtl"`.

- [ ] **Step 6: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-primitives.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-primitives apps/web/src/test/admin-primitives.test.tsx
git commit -m "feat: add F3E-A admin collection and field primitives"
```

---

### Task 4: Build static Login and Recovery routes without native forms

**Files:**
- Create: `apps/web/src/features/admin-auth-preview/admin-owner-access-frame.tsx`
- Create: `apps/web/src/features/admin-auth-preview/admin-login-page.tsx`
- Create: `apps/web/src/features/admin-auth-preview/admin-recovery-page.tsx`
- Create: `apps/web/src/features/admin-auth-preview/index.ts`
- Modify: `apps/web/src/app/admin/(auth)/layout.tsx`
- Modify: `apps/web/src/app/admin/(auth)/login/page.tsx`
- Modify: `apps/web/src/app/admin/(auth)/recovery/page.tsx`
- Create: `apps/web/src/test/admin-auth-preview.test.tsx`

**Interfaces:**
- Consumes: `AdminAlert`, `AdminFieldPreview`, base `Button`, Next.js `Link`.
- Produces: `AdminOwnerAccessFrame`, `AdminLoginPage`, and `AdminRecoveryPage`.

- [ ] **Step 1: Write failing normal-route tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  AdminLoginPage,
  AdminRecoveryPage
} from "@/features/admin-auth-preview";

describe("F3E-A owner-access normal routes", () => {
  it.each([
    [<AdminLoginPage key="login" />, "Sign in to the Rosa workspace."],
    [<AdminRecoveryPage key="recovery" />, "Recover owner access."]
  ])("renders one heading without a native form", (page, heading) => {
    const html = renderToStaticMarkup(page);
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain(heading);
    expect(html).not.toContain("<form");
    expect(html).toContain("readonly");
    expect(html).toContain("disabled");
  });

  it("contains no account-creation or fake owner identity", () => {
    const html = renderToStaticMarkup(<><AdminLoginPage /><AdminRecoveryPage /></>);
    expect(html).not.toMatch(/Create account|Sign up|Invite user/i);
    expect(html).not.toMatch(/mailto:|owner@|admin@|\*{2,}@/i);
    expect(html).not.toContain("Recovery email sent");
  });

  it("links only between approved owner-access routes", () => {
    const login = renderToStaticMarkup(<AdminLoginPage />);
    const recovery = renderToStaticMarkup(<AdminRecoveryPage />);
    expect(login).toContain('href="/admin/recovery"');
    expect(recovery).toContain('href="/admin/login"');
  });
});
```

- [ ] **Step 2: Run the test and confirm failure**

```bash
pnpm --filter @rosa/web test -- admin-auth-preview.test.tsx
```

Expected: missing admin-auth-preview exports.

- [ ] **Step 3: Implement the owner-access layout frame**

`AdminOwnerAccessFrame` renders the brand and route content but not `<main>`:

```tsx
export function AdminOwnerAccessFrame({
  eyebrow,
  title,
  description,
  children,
  footer
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <article className="admin-auth-card">
      <Link className="admin-auth-card__brand" href="/">ROSA</Link>
      <p className="page-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
      <footer className="admin-auth-card__footer">{footer}</footer>
    </article>
  );
}
```

The auth layout remains the sole main owner:

```tsx
export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="admin-auth-shell" id="main-content">
      <div className="admin-auth-shell__inner">{children}</div>
    </main>
  );
}
```

- [ ] **Step 4: Implement Login**

Render:

- Eyebrow `Owner access`.
- Heading `Sign in to the Rosa workspace.`
- Description restricted to the single verified owner account.
- `<fieldset className="admin-auth-fields" aria-label="Owner sign-in field preview">`.
- Empty read-only email and password `AdminFieldPreview` controls.
- Disabled `Sign in` button.
- Real link to `/admin/recovery`.
- Warning alert: `Authentication not connected`.
- Security copy: `Production access requires server-enforced owner authentication.`

Do not render a native form.

- [ ] **Step 5: Implement Recovery**

Render:

- Eyebrow `Owner recovery`.
- Heading `Recover owner access.`
- One empty read-only email field inside a labelled fieldset.
- Disabled `Send recovery link` button.
- Link to `/admin/login`.
- Warning alert: `No recovery email is sent from this static preview.`
- Copy stating that production recovery must not reveal whether an address belongs to the owner.

Do not render masked addresses, tokens, timers, reset fields, or a native form.

- [ ] **Step 6: Wire route pages**

```tsx
import { AdminLoginPage } from "@/features/admin-auth-preview";
export default function Page() { return <AdminLoginPage />; }
```

```tsx
import { AdminRecoveryPage } from "@/features/admin-auth-preview";
export default function Page() { return <AdminRecoveryPage />; }
```

- [ ] **Step 7: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-auth-preview.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/app/admin/'(auth)' apps/web/src/features/admin-auth-preview apps/web/src/test/admin-auth-preview.test.tsx
git commit -m "feat: build F3E-A owner access routes"
```

---

### Task 5: Add isolated authentication, collection, and mutation preview states

**Files:**
- Create: `apps/web/src/features/admin-auth-preview/admin-auth-state-previews.tsx`
- Modify: `apps/web/src/features/admin-auth-preview/index.ts`
- Create: `apps/web/src/features/admin-primitives/admin-preview-states.tsx`
- Modify: `apps/web/src/features/admin-primitives/index.ts`
- Modify: `apps/web/src/test/admin-auth-preview.test.tsx`
- Modify: `apps/web/src/test/admin-primitives.test.tsx`

**Interfaces:**
- Consumes: `AdminAlert`, `AdminFieldPreview`, `AdminDataTable`, `Button`, `ButtonLink`.
- Produces: `AdminLoginLoadingPreview`, `AdminInvalidCredentialsPreview`, `AdminUnauthorizedPreview`, `AdminRecoverySentPreview`, `AdminRecoveryFailurePreview`, `AdminInvalidRecoveryTokenPreview`, `AdminExpiredRecoveryLinkPreview`, `AdminLoadingPreview`, `AdminEmptyState`, `AdminErrorPreview`, `AdminConfirmationPreview`, and `AdminConfirmationResult`.

- [ ] **Step 1: Add failing preview-boundary tests**

```tsx
import {
  AdminExpiredRecoveryLinkPreview,
  AdminInvalidCredentialsPreview,
  AdminLoginLoadingPreview,
  AdminRecoverySentPreview
} from "@/features/admin-auth-preview";
import {
  AdminConfirmationPreview,
  AdminEmptyState,
  AdminErrorPreview,
  AdminLoadingPreview
} from "@/features/admin-primitives";

it("marks authentication previews as preview-only", () => {
  const html = renderToStaticMarkup(
    <>
      <AdminLoginLoadingPreview />
      <AdminInvalidCredentialsPreview />
      <AdminRecoverySentPreview />
      <AdminExpiredRecoveryLinkPreview />
    </>
  );
  expect((html.match(/data-preview-only=/g) ?? [])).toHaveLength(4);
  expect(html).not.toContain("A recovery email has been sent");
  expect(html).not.toContain("Session active");
});

it("keeps generic collection and confirmation previews truthful", () => {
  const html = renderToStaticMarkup(
    <>
      <AdminLoadingPreview label="Products" />
      <AdminEmptyState title="No records preview" description="This state appears when a live collection is empty." />
      <AdminErrorPreview title="Data-load failure preview" />
      <AdminConfirmationPreview kind="save" />
    </>
  );
  expect((html.match(/data-preview-only=/g) ?? [])).toHaveLength(4);
  expect(html).toContain("No change has been made");
  expect(html).not.toContain("Saved successfully");
});
```

- [ ] **Step 2: Run focused tests and confirm failure**

```bash
pnpm --filter @rosa/web test -- admin-auth-preview.test.tsx admin-primitives.test.tsx
```

- [ ] **Step 3: Implement authentication previews**

Each component renders a `<section data-preview-only="true">` with one `<h2>`.

Exact default copy:

- Login loading: `Sign-in loading preview` and disabled `Checking access preview` button.
- Invalid credentials: `Invalid-credentials preview` and `No credential check occurred in this static state.`
- Unauthorized: `Unauthorized-session preview` and `No session or route protection is represented.`
- Recovery sent: `Recovery-sent preview` and `Delivery details appear only after a verified backend response.`
- Recovery failure: `Recovery-failure preview` and `No recovery request was attempted.`
- Invalid token: `Invalid-token preview` and `No token was checked.`
- Expired link: `Expired-link preview` and `No recovery link was validated.`

- [ ] **Step 4: Implement generic admin previews**

```ts
export interface AdminConfirmationResult {
  reference?: string;
  message?: string;
}

export interface AdminConfirmationPreviewProps {
  kind: "save" | "delete" | "publish";
  result?: AdminConfirmationResult;
}
```

Without `result`, render:

- Eyebrow `${kind} confirmation preview`.
- Heading `Confirmation details appear after a successful operation.`
- Body `No change has been made in this static preview.`
- Disabled confirm button.

With a future explicit `result`, display only the supplied safe message and optional reference. Do not generate an ID.

`AdminLoadingPreview` uses `aria-busy="true"`, visible text, and three `aria-hidden` skeleton rows. `AdminErrorPreview` uses `role="alert"`. `AdminEmptyState` uses a normal section and no fake action unless a real `ButtonLink` child is supplied.

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-auth-preview.test.tsx admin-primitives.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-auth-preview apps/web/src/features/admin-primitives apps/web/src/test/admin-auth-preview.test.tsx apps/web/src/test/admin-primitives.test.tsx
git commit -m "feat: add F3E-A admin preview states"
```

---

### Task 6: Rebuild the admin shell with grouped, fully visible navigation

**Files:**
- Create: `apps/web/src/features/admin-navigation/admin-navigation.tsx`
- Create: `apps/web/src/features/admin-navigation/admin-workspace-header.tsx`
- Modify: `apps/web/src/features/admin-navigation/index.ts`
- Modify: `apps/web/src/components/layout/admin-shell.tsx`
- Modify: `apps/web/src/app/admin/(workspace)/layout.tsx`
- Modify: `apps/web/src/test/admin-navigation.test.tsx`

**Interfaces:**
- Consumes: `ADMIN_NAVIGATION_GROUPS`, `getAdminNavigationItem`, Next.js `usePathname`, `Button`, `ButtonLink`.
- Produces: `AdminNavigation`, `AdminWorkspaceHeader`, and rebuilt `AdminShell`.

- [ ] **Step 1: Add failing shell tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { AdminShell } from "@/components/layout/admin-shell";

it("renders every approved admin route and no dead disclosure control", () => {
  const html = renderToStaticMarkup(<AdminShell><p>Dashboard content</p></AdminShell>);
  for (const item of ADMIN_NAVIGATION_ITEMS) {
    expect(html).toContain(`href="${item.href}"`);
  }
  expect(html).toContain('href="/"');
  expect(html).not.toContain("<details");
  expect(html).not.toContain("<summary");
  expect(html).not.toMatch(/hamburger|menu toggle/i);
});

it("owns the sole workspace main and exposes truthful session status", () => {
  const html = renderToStaticMarkup(<AdminShell><h1>Dashboard</h1></AdminShell>);
  expect((html.match(/<main/g) ?? [])).toHaveLength(1);
  expect(html).toContain("Owner session not connected");
  expect(html).toContain("Production access requires server-enforced owner authentication");
  expect(html).toContain("disabled");
});
```

Because `usePathname` requires a client boundary, test the route-agnostic static output of the navigation components and unit-test `getAdminNavigationItem` separately.

- [ ] **Step 2: Run the tests and confirm the current shell fails**

```bash
pnpm --filter @rosa/web test -- admin-navigation.test.tsx
```

Expected failures include the current `<details>` menu and false `Secure session` copy.

- [ ] **Step 3: Implement current-route-aware navigation**

`admin-navigation.tsx` is a client component:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAVIGATION_GROUPS } from "./admin-navigation-model";

export function AdminNavigation() {
  const pathname = usePathname();
  return (
    <nav className="admin-navigation" aria-label="Owner workspace navigation">
      {ADMIN_NAVIGATION_GROUPS.map((group) => (
        <section className="admin-navigation__group" key={group.key} aria-labelledby={`admin-nav-${group.key}`}>
          <h2 id={`admin-nav-${group.key}`}>{group.label}</h2>
          <ul>
            {group.items.map((item) => {
              const active = item.href === "/admin"
                ? pathname === "/admin"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return <li key={item.key}><Link href={item.href} aria-current={active ? "page" : undefined}>{item.label}</Link></li>;
            })}
          </ul>
        </section>
      ))}
    </nav>
  );
}
```

Do not add a menu toggle. The navigation remains in document flow at all widths.

- [ ] **Step 4: Implement the workspace header**

`AdminWorkspaceHeader` is a client component that uses `getAdminNavigationItem(usePathname())` and renders:

- Current label or `Owner Workspace`.
- `Owner session not connected`.
- Disabled `Sign out` button.

Do not render an avatar with initials, email, session expiry, or secure-session claim.

- [ ] **Step 5: Rebuild AdminShell**

Required structure:

```tsx
<div className="admin-shell">
  <aside className="admin-sidebar">
    <Link className="admin-sidebar__brand" href="/admin">ROSA</Link>
    <p>Owner workspace</p>
    <AdminNavigation />
    <ButtonLink href="/" variant="secondary" size="small">View public website</ButtonLink>
  </aside>
  <div className="admin-workspace">
    <AdminWorkspaceHeader />
    <div className="admin-workspace__warning" role="status">
      Static preview. Production access requires server-enforced owner authentication.
    </div>
    <main className="admin-content" id="main-content">{children}</main>
  </div>
</div>
```

The workspace layout continues to return `<AdminShell>{children}</AdminShell>` and does not create another `<main>`.

- [ ] **Step 6: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-navigation.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/components/layout/admin-shell.tsx apps/web/src/app/admin/'(workspace)'/layout.tsx apps/web/src/features/admin-navigation apps/web/src/test/admin-navigation.test.tsx
git commit -m "feat: rebuild F3E-A owner workspace shell"
```

---

### Task 7: Create the source-backed dashboard model

**Files:**
- Create: `apps/web/src/features/admin-dashboard/admin-dashboard-model.ts`
- Create: `apps/web/src/features/admin-dashboard/index.ts`
- Create: `apps/web/src/test/admin-dashboard.test.tsx`

**Interfaces:**
- Consumes: `CATALOGUE_FAMILIES`, `CATALOGUE_PRODUCTS`, `CATALOGUE_DOCUMENTS`, typed admin routes.
- Produces: `AdminDashboardMetric`, `AdminReadinessItem`, `AdminDashboardModel`, `getAdminDashboardModel()`.

- [ ] **Step 1: Write failing selector tests**

```tsx
import { describe, expect, it } from "vitest";
import { CATALOGUE_FAMILIES, CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";
import { CATALOGUE_DOCUMENTS } from "@/features/catalogues";
import { getAdminDashboardModel } from "@/features/admin-dashboard";

describe("F3E-A dashboard model", () => {
  it("derives catalogue metrics from existing registries", () => {
    const model = getAdminDashboardModel();
    expect(model.catalogueMetrics).toEqual([
      { key: "families", label: "Product families", value: CATALOGUE_FAMILIES.length, href: "/admin/families" },
      { key: "products", label: "Registered products", value: CATALOGUE_PRODUCTS.length, href: "/admin/products" },
      { key: "catalogues", label: "Catalogue documents", value: CATALOGUE_DOCUMENTS.length, href: "/admin/catalogues" }
    ]);
  });

  it("keeps operational data unresolved", () => {
    const model = getAdminDashboardModel();
    expect(model.operationalMetrics).toEqual([
      { key: "inquiries", label: "Quotation inquiries" },
      { key: "messages", label: "General messages" }
    ]);
    expect(JSON.stringify(model.operationalMetrics)).not.toMatch(/value|count|total/);
  });

  it("contains the five approved readiness dependencies", () => {
    expect(getAdminDashboardModel().readinessItems).toHaveLength(5);
  });
});
```

- [ ] **Step 2: Run the test and confirm failure**

```bash
pnpm --filter @rosa/web test -- admin-dashboard.test.tsx
```

- [ ] **Step 3: Implement the dashboard model**

```ts
import type { Route } from "next";
import { CATALOGUE_FAMILIES, CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";
import { CATALOGUE_DOCUMENTS } from "@/features/catalogues";
import type { AdminStatusTone } from "@/features/admin-primitives";

export interface AdminDashboardMetric {
  key: "families" | "products" | "catalogues";
  label: string;
  value: number;
  href: Route;
}

export interface AdminOperationalMetric {
  key: "inquiries" | "messages";
  label: string;
}

export interface AdminReadinessItem {
  key: string;
  label: string;
  status: "Awaiting confirmation" | "Awaiting publication" | "Awaiting replacement" | "Awaiting legal approval" | "Deferred";
  tone: Extract<AdminStatusTone, "neutral" | "warning">;
}

export interface AdminDashboardModel {
  catalogueMetrics: readonly AdminDashboardMetric[];
  operationalMetrics: readonly AdminOperationalMetric[];
  readinessItems: readonly AdminReadinessItem[];
  quickRoutes: readonly { label: string; href: Route }[];
}

export function getAdminDashboardModel(): AdminDashboardModel {
  return {
    catalogueMetrics: [
      { key: "families", label: "Product families", value: CATALOGUE_FAMILIES.length, href: "/admin/families" },
      { key: "products", label: "Registered products", value: CATALOGUE_PRODUCTS.length, href: "/admin/products" },
      { key: "catalogues", label: "Catalogue documents", value: CATALOGUE_DOCUMENTS.length, href: "/admin/catalogues" }
    ],
    operationalMetrics: [
      { key: "inquiries", label: "Quotation inquiries" },
      { key: "messages", label: "General messages" }
    ],
    readinessItems: [
      { key: "contact", label: "Contact information", status: "Awaiting confirmation", tone: "warning" },
      { key: "pdfs", label: "Catalogue PDF paths", status: "Awaiting publication", tone: "warning" },
      { key: "media", label: "Product media", status: "Awaiting replacement", tone: "warning" },
      { key: "legal", label: "Privacy and Terms", status: "Awaiting legal approval", tone: "warning" },
      { key: "arabic", label: "Arabic content", status: "Deferred", tone: "neutral" }
    ],
    quickRoutes: [
      { label: "Products", href: "/admin/products" },
      { label: "Inquiries", href: "/admin/inquiries" },
      { label: "Website Content", href: "/admin/content" },
      { label: "Publishing Centre", href: "/admin/publishing" }
    ]
  };
}
```

Export the model from `index.ts`.

- [ ] **Step 4: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-dashboard.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-dashboard apps/web/src/test/admin-dashboard.test.tsx
git commit -m "feat: add source-backed F3E-A dashboard model"
```

---

### Task 8: Build the Dashboard and deliberate deferred admin route pages

**Files:**
- Create: `apps/web/src/features/admin-dashboard/admin-workspace-status.tsx`
- Create: `apps/web/src/features/admin-dashboard/admin-catalogue-overview.tsx`
- Create: `apps/web/src/features/admin-dashboard/admin-launch-readiness.tsx`
- Create: `apps/web/src/features/admin-dashboard/admin-operational-data.tsx`
- Create: `apps/web/src/features/admin-dashboard/admin-dashboard-page.tsx`
- Modify: `apps/web/src/features/admin-dashboard/index.ts`
- Create: `apps/web/src/features/admin-routing/admin-deferred-route-page.tsx`
- Create: `apps/web/src/features/admin-routing/index.ts`
- Modify: `apps/web/src/app/admin/(workspace)/page.tsx`
- Modify: `apps/web/src/app/admin/(workspace)/[...segments]/page.tsx`
- Modify: `apps/web/src/test/admin-dashboard.test.tsx`
- Create: `apps/web/src/test/admin-route-composition.test.tsx`

**Interfaces:**
- Consumes: `getAdminDashboardModel`, admin primitives, `ADMIN_NAVIGATION_ITEMS`.
- Produces: `AdminDashboardPage` and `AdminDeferredRoutePage`.

- [ ] **Step 1: Add failing dashboard composition tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { AdminDashboardPage } from "@/features/admin-dashboard";

it("renders the source-backed dashboard without fake analytics", () => {
  const html = renderToStaticMarkup(<AdminDashboardPage />);
  expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
  expect(html).toContain("Rosa workspace overview.");
  expect(html).toContain("Product families");
  expect(html).toContain(">5<");
  expect(html).toContain(">20<");
  expect(html).toContain("Awaiting live data");
  expect((html.match(/Awaiting live data/g) ?? [])).toHaveLength(2);
  expect(html).not.toMatch(/revenue|orders|sales|growth|conversion|uptime/i);
  expect(html).not.toContain("data-preview-only");
});
```

- [ ] **Step 2: Add failing route-composition tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { AdminDeferredRoutePage } from "@/features/admin-routing";

it("renders a truthful deferred route without management controls", () => {
  const html = renderToStaticMarkup(
    <AdminDeferredRoutePage routeKey="products" />
  );
  expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
  expect(html).toContain("Products management composition is scheduled for the next admin catalogue milestone.");
  expect(html).not.toMatch(/Create product|Save|Delete|Publish now/i);
  expect(html).not.toContain("<form");
});
```

- [ ] **Step 3: Run tests and confirm failure**

```bash
pnpm --filter @rosa/web test -- admin-dashboard.test.tsx admin-route-composition.test.tsx
```

- [ ] **Step 4: Implement dashboard sections**

`AdminWorkspaceStatus` uses a warning `AdminAlert` and lists exactly:

- Static admin preview
- Backend not connected
- Authentication not active
- Publishing actions unavailable

`AdminCatalogueOverview` maps `model.catalogueMetrics` to `AdminStat`.

`AdminOperationalData` maps unresolved operational metrics to `AdminUnresolvedMetric` and never accepts a numeric prop.

`AdminLaunchReadiness` renders an ordered list with `AdminStatusBadge` for all five dependencies.

`AdminDashboardPage` renders, in order:

1. `AdminPageHeader` with `Admin overview`, `Rosa workspace overview.`, and static CMS explanation.
2. Workspace status.
3. Catalogue overview.
4. Operational data.
5. Launch-readiness queue.
6. Quick routes using `ButtonLink` with quiet or secondary treatment.

Do not render `<main>`.

- [ ] **Step 5: Implement deliberate deferred route mapping**

```ts
export type DeferredAdminRouteKey = Exclude<
  AdminNavigationItem["key"],
  "dashboard"
>;

const COPY: Record<DeferredAdminRouteKey, { title: string; description: string }> = {
  products: { title: "Products", description: "Products management composition is scheduled for the next admin catalogue milestone." },
  families: { title: "Families", description: "Family management composition is scheduled for the next admin catalogue milestone." },
  catalogues: { title: "Catalogues", description: "Catalogue management composition is scheduled for the next admin catalogue milestone." },
  media: { title: "Media", description: "Media management composition is scheduled for the next admin catalogue milestone." },
  inquiries: { title: "Quotation Inquiries", description: "Inquiry operations composition is scheduled for the admin operations milestone." },
  messages: { title: "General Messages", description: "Message operations composition is scheduled for the admin operations milestone." },
  content: { title: "Website Content", description: "Website content composition is scheduled for the admin content and publishing milestone." },
  "contact-details": { title: "Contact Details", description: "Contact details composition is scheduled for the admin content and publishing milestone." },
  publishing: { title: "Publishing Centre", description: "Publishing composition is scheduled for the admin content and publishing milestone." },
  revisions: { title: "Revision History", description: "Revision history composition is scheduled for the admin content and publishing milestone." },
  settings: { title: "Settings", description: "Settings composition is scheduled for the admin content and publishing milestone." }
};
```

The public UI must not show internal labels such as `F3E-B`; use the natural milestone descriptions above.

`AdminDeferredRoutePage` renders an `AdminPageHeader`, one neutral warning that data/actions are unavailable, and real navigation back to `/admin`. It renders no fields, forms, tables, upload controls, or mutation buttons.

- [ ] **Step 6: Wire route pages**

Dashboard:

```tsx
import { AdminDashboardPage } from "@/features/admin-dashboard";
export default function Page() { return <AdminDashboardPage />; }
```

Dynamic route:

```tsx
import { notFound } from "next/navigation";
import { getAdminNavigationItem } from "@/features/admin-navigation";
import { AdminDeferredRoutePage } from "@/features/admin-routing";

export default async function Page({ params }: { params: Promise<{ segments: string[] }> }) {
  const { segments } = await params;
  const pathname = `/admin/${segments.join("/")}`;
  const item = getAdminNavigationItem(pathname);
  if (!item || item.key === "dashboard") notFound();
  return <AdminDeferredRoutePage routeKey={item.key} />;
}
```

Nested paths under known roots remain deliberate placeholders. Unknown roots use `notFound()`.

- [ ] **Step 7: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-dashboard.test.tsx admin-route-composition.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-dashboard apps/web/src/features/admin-routing apps/web/src/app/admin/'(workspace)' apps/web/src/test/admin-dashboard.test.tsx apps/web/src/test/admin-route-composition.test.tsx
git commit -m "feat: build F3E-A dashboard and deferred routes"
```

---

### Task 9: Add responsive admin styling and static style checks

**Files:**
- Create: `apps/web/src/styles/f3e-admin-foundation.css`
- Modify: `apps/web/src/app/globals.css`
- Create: `apps/web/src/test/f3e-a-admin-styles.static.test.mjs`

**Interfaces:**
- Consumes: class names introduced by Tasks 2–8 and existing Rosa design tokens.
- Produces: desktop, tablet, mobile, focus, table/record switching, and reduced-motion presentation.

- [ ] **Step 1: Write the failing stylesheet test**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(
  new URL("../styles/f3e-admin-foundation.css", import.meta.url),
  "utf8"
);

const globals = await readFile(
  new URL("../app/globals.css", import.meta.url),
  "utf8"
);

test("F3E-A styles cover auth, shell, dashboard, tables and responsive rules", () => {
  assert.match(css, /\.admin-auth-shell/);
  assert.match(css, /\.admin-shell/);
  assert.match(css, /\.admin-navigation/);
  assert.match(css, /\.admin-dashboard/);
  assert.match(css, /\.admin-data-table/);
  assert.match(css, /\.admin-record-list/);
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 520px\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /:focus-visible/);
  assert.doesNotMatch(css, /position:\s*fixed[^}]*height:\s*100vh/s);
  assert.match(globals, /@import "\.\.\/styles\/f3e-admin-foundation\.css";/);
});
```

- [ ] **Step 2: Run the static test and confirm failure**

```bash
node --test apps/web/src/test/f3e-a-admin-styles.static.test.mjs
```

Expected: missing stylesheet.

- [ ] **Step 3: Implement the stylesheet using existing tokens**

Required rules:

- `.admin-auth-shell`: full minimum viewport, centered content, warm-white background, page gutter.
- `.admin-auth-card`: white surface, restrained border, max width no greater than `34rem`, no gradient or glass treatment.
- `.admin-shell`: desktop grid `minmax(14rem, 17rem) minmax(0, 1fr)`.
- `.admin-sidebar`: dark surface, white text, no fixed positioning.
- `.admin-navigation__group ul`: reset list and grid flow.
- `[aria-current="page"]`: Rosa-red accent plus non-colour indicator such as left border or font weight.
- `.admin-workspace-header`: compact horizontal layout, stacked below 900 px.
- `.admin-dashboard__metrics`: three columns desktop, two at tablet, one mobile.
- `.admin-data-table__desktop`: visible desktop; hidden below 720 px.
- `.admin-record-list`: hidden desktop; visible below 720 px.
- `.admin-locale-field-pair`: two columns desktop, one below 900 px.
- Inputs and textareas: width 100%, `min-width: 0`.
- Long labels/headings: `overflow-wrap: anywhere`.
- No fixed heights for content panels.
- No page-level horizontal scrolling.
- Disabled controls remain visibly disabled and meet contrast requirements.
- Existing `:focus-visible` treatment remains visible on dark sidebar and light workspace.
- Reduced-motion rule disables nonessential transitions.

Representative layout rules:

```css
.admin-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(14rem, 17rem) minmax(0, 1fr);
  background: var(--color-mist);
}

.admin-dashboard__metrics,
.admin-dashboard__operations,
.admin-dashboard__quick-routes {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-4);
}

@media (max-width: 900px) {
  .admin-shell {
    grid-template-columns: minmax(0, 1fr);
  }

  .admin-dashboard__metrics,
  .admin-dashboard__operations,
  .admin-dashboard__quick-routes {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .admin-dashboard__metrics,
  .admin-dashboard__operations,
  .admin-dashboard__quick-routes,
  .admin-locale-field-pair {
    grid-template-columns: minmax(0, 1fr);
  }
}
```

- [ ] **Step 4: Import the stylesheet**

Append after the F3D import:

```css
@import "../styles/f3e-admin-foundation.css";
```

- [ ] **Step 5: Verify and commit**

```bash
node --test apps/web/src/test/f3e-a-admin-styles.static.test.mjs
pnpm --filter @rosa/web typecheck
git add apps/web/src/styles/f3e-admin-foundation.css apps/web/src/app/globals.css apps/web/src/test/f3e-a-admin-styles.static.test.mjs
git commit -m "feat: style F3E-A admin foundation"
```

---

### Task 10: Add route, policy, and exact browser coverage

**Files:**
- Create: `apps/web/src/test/f3e-a-admin-policy.static.test.mjs`
- Create: `apps/web/tests/e2e/f3e-a-admin-foundation.spec.ts`
- Modify: `apps/web/src/test/admin-route-composition.test.tsx`

**Interfaces:**
- Consumes: all normal F3E-A route source files and browser routes.
- Produces: policy regression coverage and 9 normal-route viewport cases plus shell/deferred-route checks.

- [ ] **Step 1: Add normal-route source composition assertions**

Add tests that render the route-level feature components and confirm:

```tsx
it("normal owner-access and dashboard pages never mount preview-only states", () => {
  const html = renderToStaticMarkup(
    <>
      <AdminLoginPage />
      <AdminRecoveryPage />
      <AdminDashboardPage />
    </>
  );
  expect(html).not.toContain("data-preview-only");
  expect(html).not.toContain("<form");
  expect(html).not.toMatch(/Recovery-sent preview|Invalid-credentials preview|Saved successfully/i);
});
```

- [ ] **Step 2: Create the static policy test**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve("apps/web/src");
const normalFiles = [
  "features/admin-auth-preview/admin-login-page.tsx",
  "features/admin-auth-preview/admin-recovery-page.tsx",
  "features/admin-dashboard/admin-dashboard-page.tsx",
  "features/admin-dashboard/admin-dashboard-model.ts",
  "components/layout/admin-shell.tsx",
  "features/admin-navigation/admin-navigation-model.ts",
  "features/admin-routing/admin-deferred-route-page.tsx"
];

const content = (
  await Promise.all(normalFiles.map((file) => readFile(path.join(root, file), "utf8")))
).join("\n");

const prohibited = [
  /href=["']\/(?:admin\/register|register|signup)/i,
  /Create account|Sign up|Invite user/i,
  /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i,
  /default password|password123|admin123/i,
  /localStorage|sessionStorage|document\.cookie/i,
  /fetch\(|openapi|apiClient|createClient/i,
  /Recovery email sent|A recovery email has been sent/i,
  /Saved successfully|Deleted successfully|Published successfully/i,
  /revenue|orders|sales|checkout|payment|inventory/i,
  /\bF3E\b|\bF4\b|implementation phase/i
];

test("F3E-A normal admin source avoids fake auth, data and mutation claims", () => {
  for (const pattern of prohibited) assert.doesNotMatch(content, pattern);
  assert.match(content, /Authentication not connected/i);
  assert.match(content, /Backend not connected/i);
  assert.match(content, /Awaiting live data/i);
});
```

The test scans only user-visible normal-route source, not specifications or preview-only files.

- [ ] **Step 3: Add exact Playwright coverage**

```ts
import { expect, test } from "@playwright/test";

const routes = ["/admin/login", "/admin/recovery", "/admin"] as const;
const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 }
] as const;

for (const viewport of viewports) {
  for (const route of routes) {
    test(`${route} is safe at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      const response = await page.goto(route);
      expect(response?.ok()).toBe(true);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveCount(1);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/i);
      await page.locator("main").evaluate((element) => element.scrollTo(0, element.scrollHeight));
    });
  }
}

test("owner-access controls are static and there is no account creation", async ({ page }) => {
  await page.goto("/admin/login");
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Sign in" })).toBeDisabled();
  await expect(page.locator('a[href*="register"], a[href*="signup"]')).toHaveCount(0);

  await page.goto("/admin/recovery");
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Send recovery link" })).toBeDisabled();
});

test("mobile admin navigation is fully visible without a toggle", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/admin");
  await expect(page.locator(".admin-navigation a")).toHaveCount(12);
  await expect(page.locator("details, summary")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /menu/i })).toHaveCount(0);
});
```

Add one deferred route smoke check for `/admin/products`: one `<main>`, one `<h1>`, no form, no enabled mutation action.

- [ ] **Step 4: Run focused checks**

```bash
node --test apps/web/src/test/f3e-a-admin-policy.static.test.mjs
node --test apps/web/src/test/f3e-a-admin-styles.static.test.mjs
pnpm --filter @rosa/web test -- admin-navigation.test.tsx admin-primitives.test.tsx admin-auth-preview.test.tsx admin-dashboard.test.tsx admin-route-composition.test.tsx
```

Expected: zero failures. If the environment cannot run them, record them as **not run** rather than passed.

- [ ] **Step 5: Commit tests**

```bash
git add apps/web/src/test/f3e-a-admin-policy.static.test.mjs apps/web/src/test/admin-route-composition.test.tsx apps/web/tests/e2e/f3e-a-admin-foundation.spec.ts
git commit -m "test: add F3E-A admin foundation coverage"
```

---

### Task 11: Run the consolidated gate, review scope, document completion, and update coordination

**Files:**
- Create: `docs/superpowers/completions/2026-08-01-rosa-medical-f3e-a-admin-foundation.md`
- Update after source review: `README.md` on `main`

**Interfaces:**
- Consumes: all F3E-A code, tests, branch history, and current README protocol.
- Produces: exact verification evidence, completion record, and Frontend AI → Backend AI coordination update.

- [ ] **Step 1: Run the complete frontend verification gate before any runtime-success claim**

```bash
pnpm install --frozen-lockfile
pnpm contracts:generate
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm --filter @rosa/web test:foundation
node --test apps/web/src/test/public-page-styles.static.test.mjs
node --test apps/web/src/test/f3b-styles.static.test.mjs
node --test apps/web/src/test/f3c-styles.static.test.mjs
node --test apps/web/src/test/f3d-styles.static.test.mjs
node --test apps/web/src/test/f3d-policy.static.test.mjs
node --test apps/web/src/test/f3e-a-admin-styles.static.test.mjs
node --test apps/web/src/test/f3e-a-admin-policy.static.test.mjs
pnpm test:e2e
```

Read complete output and record exit codes. Fix real regressions before claiming a verified milestone. If the GitHub-only environment cannot execute these commands, state every command as not run.

- [ ] **Step 2: Review branch containment**

```bash
git diff --name-status frontend/f3e-a-admin-foundation-design...HEAD
git log --oneline frontend/f3e-a-admin-foundation-design..HEAD
```

Confirm:

- only F3E-A admin frontend files, route files, styles, tests, and completion documentation changed;
- no `services/api/**` file changed;
- no `packages/contracts/openapi/**` file changed;
- normal Login and Recovery contain no native form;
- normal routes contain no preview-only state;
- no fake auth, session, recovery, mutation, publication, inquiry count, or message count appears;
- dashboard counts derive from current registries;
- all 12 workspace navigation links remain present;
- no dead mobile menu control exists.

- [ ] **Step 3: Perform a source-level compile-risk review**

Inspect:

- typed `Route` values and generic table signatures;
- server/client component boundaries around `usePathname`;
- `useId()` stability in server rendering;
- exact single-main ownership in auth and workspace layouts;
- button default `type="button"` behavior;
- no nested interactive controls inside linked stats;
- no `aria-current` on inactive routes;
- no invalid `aria-readonly` usage on generic elements;
- metadata inheritance for all admin routes;
- CSS token names against `tokens.css`;
- long-label and mobile overflow safety.

Correct source defects in focused commits before writing the final record.

- [ ] **Step 4: Write the completion record**

The record must state:

- implementation branch and source tip;
- design/plan base commit;
- `/admin/login`, `/admin/recovery`, `/admin`, and deferred workspace route behavior;
- shared primitive systems added;
- source-derived dashboard counts;
- unresolved operational metrics;
- isolated preview states;
- admin `noindex` behavior and its security limitation;
- branch comparison;
- backend/OpenAPI isolation;
- commands actually run and exact results;
- commands not run and reason;
- known limitations;
- next milestone: F3E-B Products, Families, Catalogues, and Media.

Commit:

```bash
git add docs/superpowers/completions/2026-08-01-rosa-medical-f3e-a-admin-foundation.md
git commit -m "docs: record F3E-A admin foundation status"
```

- [ ] **Step 5: Update the shared README on `main`**

Read current `README.md` from `main` immediately before editing. Update only:

- last coordination timestamp;
- frontend lane current status, branch, commit, completed items, verification evidence, next work, blockers, and message to backend;
- G4 frontend evidence to state that static owner-access states exist but no authentication is connected;
- current repository state;
- append one dated Frontend AI → Backend AI message.

Preserve the backend-owned section, decision ledger, and all previous messages. State clearly whether runtime checks were run or deferred.

Commit message:

```bash
git commit -m "docs: coordinate F3E-A frontend status"
```

---

## Final Verification Checklist

- [ ] `/admin/login` has one main, one h1, labelled read-only email/password fields, disabled Sign in, recovery link, and no native form.
- [ ] `/admin/recovery` has one main, one h1, labelled read-only email field, disabled recovery action, login link, and no native form.
- [ ] Neither owner-access route exposes account creation, owner email, default credentials, delivery claims, tokens, or timers.
- [ ] `/admin` uses the rebuilt shell and owns exactly one main.
- [ ] The shell exposes all 12 approved workspace routes exactly once.
- [ ] Mobile navigation is fully visible with no details, summary, hamburger, or inactive menu button.
- [ ] The shell states `Owner session not connected` and uses a disabled Sign out action.
- [ ] Dashboard catalogue metrics equal the current family, product, and catalogue registries.
- [ ] Inquiry and message metrics display `Awaiting live data` and accept no numeric value.
- [ ] Dashboard excludes analytics, revenue, orders, sales, growth, customer activity, storage, uptime, and audit claims.
- [ ] Five readiness dependencies appear with neutral/warning status.
- [ ] Deferred admin routes show deliberate informational compositions without CRUD or publishing controls.
- [ ] Shared admin table output is semantic and has a stacked mobile record representation.
- [ ] English and Arabic field previews remain separate and static.
- [ ] All default confirmation previews state that no change occurred.
- [ ] No preview-only state is mounted on a normal route.
- [ ] All admin routes emit noindex/nofollow metadata, while visible copy states that this is not access control.
- [ ] Desktop, tablet, and mobile pages have no page-level horizontal overflow.
- [ ] No backend or OpenAPI file changed.
- [ ] Completion documentation distinguishes source review from runtime verification.

## Deferred Scope

- Mocked or real authentication and route guards
- Session expiry and logout
- Password reset interaction
- Search, filters, pagination, bulk actions, and persistence
- Product, family, catalogue, and media management composition beyond placeholders
- Inquiry and message operations
- Website content and contact editors
- Publishing, revisions, rollback, and settings
- Uploads and storage
- Arabic editing behavior
- Live API integration
