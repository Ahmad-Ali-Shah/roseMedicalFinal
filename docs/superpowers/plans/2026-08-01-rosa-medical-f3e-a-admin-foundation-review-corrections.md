# F3E-A Implementation Plan Review Corrections

**Status:** Binding corrections to `2026-08-01-rosa-medical-f3e-a-admin-foundation.md`  
**Reason:** Post-plan self-review found a client-hook test hazard and underspecified shared interfaces.  
**Execution rule:** Read this file immediately after the main F3E-A plan. Where this file conflicts with the main plan, this file controls.

## 1. Typed route correction

Every admin route-bearing interface in the main plan uses `Route<string>`, not unparameterized `Route`.

Correct signatures:

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
  href: Route<string>;
}
```

```ts
export interface AdminDashboardMetric {
  key: "families" | "products" | "catalogues";
  label: string;
  value: number;
  href: Route<string>;
}

export interface AdminDashboardModel {
  catalogueMetrics: readonly AdminDashboardMetric[];
  operationalMetrics: readonly AdminOperationalMetric[];
  readinessItems: readonly AdminReadinessItem[];
  quickRoutes: readonly { label: string; href: Route<string> }[];
}
```

`AdminStat.href` is also `Route<string> | undefined`.

## 2. Exact collection-control interfaces

Task 3 must implement these exact interfaces:

```ts
export interface AdminToolbarProps {
  label: string;
  children: ReactNode;
}

export interface AdminSearchPreviewProps {
  id?: string;
  label: string;
  placeholder?: string;
}

export interface AdminFilterPreviewProps {
  id: string;
  label: string;
  options: readonly string[];
}

export interface AdminPaginationPreviewProps {
  label?: string;
}
```

Rules:

- `AdminToolbar` renders `<section aria-label={label}>`, not a generic unlabeled div.
- `AdminSearchPreview` generates a stable ID with `useId()` only when `id` is omitted, renders a visible label, a read-only empty search input, and visible copy `Search preview — not connected`.
- `AdminFilterPreview` renders a visible label and disabled select with all supplied options.
- `AdminPaginationPreview` renders a labelled region, disabled Previous and Next buttons, and visible copy `Pagination preview — live collection unavailable`.
- No control receives an `onChange`, `onClick`, `action`, or submit handler.

## 3. Exact field-section interfaces

Task 3 must implement:

```ts
export interface AdminFormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  asFieldset?: boolean;
}
```

Behavior:

- `asFieldset=false` renders a `<section aria-labelledby={headingId}>` with one `<h2>`.
- `asFieldset=true` renders `<fieldset>` with one `<legend>` and optional description.
- It never renders `<form>`.

`AdminSelectPreview` uses:

```ts
export interface AdminSelectPreviewProps {
  id: string;
  label: string;
  options: readonly string[];
  hint?: string;
}
```

`AdminTextareaPreview` uses the same label/hint/error/direction model as `AdminFieldPreview`, plus `rows?: number` defaulting to `6`.

## 4. Client-hook test correction for Task 6

The shell test shown in the main plan must explicitly mock `next/navigation` before importing `AdminShell`.

Use this complete test setup:

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

let pathname = "/admin";

vi.mock("next/navigation", () => ({
  usePathname: () => pathname
}));

import { AdminShell } from "@/components/layout/admin-shell";
import {
  ADMIN_NAVIGATION_ITEMS,
  getAdminNavigationItem
} from "@/features/admin-navigation";

describe("F3E-A admin shell", () => {
  beforeEach(() => {
    pathname = "/admin";
  });

  it("renders every approved admin route and no dead disclosure control", () => {
    const html = renderToStaticMarkup(
      <AdminShell><p>Dashboard content</p></AdminShell>
    );
    for (const item of ADMIN_NAVIGATION_ITEMS) {
      expect(html).toContain(`href="${item.href}"`);
    }
    expect(html).toContain('href="/"');
    expect(html).not.toContain("<details");
    expect(html).not.toContain("<summary");
    expect(html).not.toMatch(/hamburger|menu toggle/i);
  });

  it("owns the sole workspace main and exposes truthful session status", () => {
    const html = renderToStaticMarkup(
      <AdminShell><h1>Dashboard</h1></AdminShell>
    );
    expect((html.match(/<main/g) ?? [])).toHaveLength(1);
    expect(html).toContain("Owner session not connected");
    expect(html).toContain("Production access requires server-enforced owner authentication");
    expect(html).toContain("disabled");
  });

  it("marks only the current navigation link", () => {
    pathname = "/admin/products/example";
    const html = renderToStaticMarkup(
      <AdminShell><h1>Product</h1></AdminShell>
    );
    expect((html.match(/aria-current="page"/g) ?? [])).toHaveLength(1);
    expect(getAdminNavigationItem(pathname)?.key).toBe("products");
  });
});
```

This mock is test-only. Production code still uses `usePathname()` inside client components.

## 5. Admin metadata source test

Add this test to `admin-route-composition.test.tsx`:

```tsx
import { metadata as adminMetadata } from "@/app/admin/layout";

it("marks the complete admin tree noindex and nofollow", () => {
  expect(adminMetadata.robots).toEqual({
    index: false,
    follow: false
  });
});
```

Playwright still verifies the rendered `<meta name="robots">` tag.

## 6. AdminDataTable responsive semantics

The table and stacked list represent the same records, so avoid duplicate announcements:

- Desktop table wrapper: `aria-hidden` must not be used because the table is the accessible representation at desktop.
- Mobile record list receives `aria-label={`${caption} — mobile records`}`.
- CSS uses `display: none`, not visibility-only hiding, so only one representation participates in the accessibility tree at each breakpoint.
- The table caption remains present and may use the existing visually-hidden utility only when the caller requests a nonvisual caption.

Add this optional prop:

```ts
captionVisibility?: "visible" | "screen-reader";
```

Default is `visible`.

## 7. Browser end-of-content correction

Replace the no-op main scroll line in Task 10 with:

```ts
const finalContent = page.locator("main > *").last();
await finalContent.scrollIntoViewIfNeeded();
await expect(finalContent).toBeVisible();
```

For the dashboard, additionally verify the `Launch readiness` section is reachable on mobile.

## 8. Final self-review result

After applying these corrections, the plan covers every approved specification boundary:

- static owner access without native forms;
- owner-only shell without fake session claims;
- source-backed catalogue counts and unresolved operations;
- shared admin structures, semantic collections, fields, locale pairs, and preview states;
- no preview-state route exposure;
- no backend/OpenAPI expansion;
- exact 1440, 768, and 390 browser coverage;
- completion and README coordination with runtime claims gated by fresh evidence.
