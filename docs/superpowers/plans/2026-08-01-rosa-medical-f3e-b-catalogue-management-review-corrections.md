# F3E-B Implementation Plan Review Corrections

**Status:** Binding corrections to `2026-08-01-rosa-medical-f3e-b-catalogue-management.md`  
**Reason:** Post-plan self-review found one route-failure ambiguity, one unsupported test selector, one responsive-grid contradiction and one missing metadata assertion.  
**Execution rule:** Read this file immediately after the main F3E-B implementation plan. Where this file conflicts with the main plan, this file controls.

## 1. Route view must never return a blank successful response

Task 8 currently permits `AdminManagementRouteView` to return `null` for an “impossible” selector mismatch. That would produce an empty 200 response and is not acceptable.

`AdminManagementRouteView` is a server component and must import `notFound` from `next/navigation`.

Use this behavior:

```tsx
import { notFound } from "next/navigation";

export function AdminManagementRouteView({
  result
}: {
  result: AdminManagementRouteResult;
}) {
  switch (result.kind) {
    case "products":
      return <AdminProductsListPage />;
    case "product": {
      const model = getAdminProductEditor(
        result.family.slug,
        result.product.slug
      );
      if (!model) notFound();
      return <AdminProductEditorPage model={model} />;
    }
    case "families":
      return <AdminFamiliesPage />;
    case "family": {
      const model = getAdminFamilyEditor(result.family.slug);
      if (!model) notFound();
      return <AdminFamilyEditorPage model={model} />;
    }
    case "catalogues":
      return <AdminCataloguesPage />;
    case "catalogue": {
      const model = getAdminCatalogueEditor(result.family.slug);
      if (!model) notFound();
      return <AdminCatalogueDetailPage model={model} />;
    }
    case "media":
      return <AdminMediaPage />;
    case "not-found":
      notFound();
  }
}
```

The catch-all route still prevents a normal `not-found` result from reaching the view, but the view remains safe when rendered directly or when a future internal mismatch occurs.

Add this source assertion to `admin-management-routing.test.tsx` by mocking `next/navigation` only for the direct mismatch test, or verify structurally in the static policy test:

```js
assert.match(routeViewSource, /notFound\(\)/);
assert.doesNotMatch(routeViewSource, /return\s+null/);
```

## 2. Catalogue row tests must use supported table semantics

The existing shared `AdminDataTable` does not accept row attributes. Do not modify it solely to support `data-admin-catalogue-row`.

Corrections:

- Remove the requirement to place `data-admin-catalogue-row` on normal Catalogue rows.
- In `admin-catalogue-model.test.ts`, keep the exact five-row selector assertion.
- In `admin-catalogues-pages.test.tsx`, assert that every `CATALOGUE_DOCUMENTS` name, family and admin href appears.
- In Playwright, count the visible desktop table rows at desktop width:

```ts
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto("/admin/catalogues");
await expect(page.locator(".admin-data-table__desktop tbody tr")).toHaveCount(5);
```

- At mobile width, count the visible record-list items instead:

```ts
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("/admin/catalogues");
await expect(page.locator(".admin-record-list > li")).toHaveCount(5);
```

The Product table follows the same desktop/mobile counting rule. Family and Media cards may retain their explicit data attributes because those components own their card markup.

## 3. Desktop Media grid is three columns, not five

Task 9’s requirements correctly state that Media requirements use three columns on desktop, but the representative CSS groups them with the five-column Family grid. Use separate rules:

```css
.admin-family-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--space-4);
}

.admin-media-requirements {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-4);
}

@media (max-width: 900px) {
  .admin-family-grid,
  .admin-media-requirements,
  .admin-editor-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .admin-family-grid,
  .admin-media-requirements,
  .admin-editor-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
```

Add static-style assertions that verify both desktop declarations independently:

```js
assert.match(css, /\.admin-family-grid\s*\{[^}]*repeat\(5,/s);
assert.match(css, /\.admin-media-requirements\s*\{[^}]*repeat\(3,/s);
```

## 4. Browser matrix must verify inherited admin metadata

Add this assertion to every successful F3E-B route/viewport case in Task 10:

```ts
await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
  "content",
  /noindex/i
);
```

This confirms that the existing admin root layout continues to apply `noindex` after the catch-all route is replaced.

## 5. Product and Catalogue record counts must account for dual responsive markup

`AdminDataTable` renders both the desktop table and mobile record list, with CSS `display` switching. Therefore:

- selector/model tests are the authoritative exact source-count tests;
- browser tests count only the representation visible at the current viewport;
- server-render tests must not count product names or rows as if only one representation exists;
- do not add `aria-hidden` to either representation; existing CSS display switching controls the accessibility tree.

## 6. Final self-review result

After applying these corrections, the plan has:

- no blank-success route path;
- exact strict not-found behavior;
- tests aligned with the existing semantic table primitive;
- separate five-column Family and three-column Media desktop grids;
- inherited admin metadata coverage;
- source-count assertions that do not double-count responsive markup;
- no unsupported source fields, fake media assets or normal-route mutation state.
