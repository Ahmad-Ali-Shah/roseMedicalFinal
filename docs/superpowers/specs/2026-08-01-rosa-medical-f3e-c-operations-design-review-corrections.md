# F3E-C Design Specification Review Corrections

**Status:** Binding corrections to `2026-08-01-rosa-medical-f3e-c-operations-design.md`  
**Date:** 2026-08-01  
**Reason:** Post-spec self-review found one normal-route/preview primitive contradiction and two verification ambiguities.  
**Execution rule:** Read this file immediately after the main F3E-C specification. Where this file conflicts with the main specification, this file controls.

## 1. Normal routes must not use F3E-A `AdminEmptyState`

The existing F3E-A `AdminEmptyState` is implemented through `PreviewSection` and always renders:

```html
data-preview-only="true"
```

It is therefore reserved for isolated preview states and must not be mounted by `/admin/inquiries` or `/admin/messages`.

F3E-C must create a dedicated normal-route component:

```text
features/admin-operations-routing/admin-operations-empty-state.tsx
```

Suggested interface:

```ts
export interface AdminOperationsEmptyStateProps {
  title: string;
  description: string;
  supportingText: string;
}
```

Required behavior:

- renders a semantic `<section>`;
- renders one `<h2>`;
- contains no `data-preview-only` attribute;
- contains no action unless a future real route exists;
- contains no count, timestamp, sync result or fake create-record control;
- uses class `admin-operations-empty-state`;
- is shared by the two normal operations pages.

F3E-A `AdminLoadingPreview`, `AdminErrorPreview`, `AdminConfirmationPreview` and `AdminEmptyState` remain valid only inside isolated F3E-C preview compositions.

## 2. Feature composition tests and shell integration tests have different ownership

`AdminInquiriesPage` and `AdminMessagesPage` are feature components rendered inside the existing F3E-A `AdminShell`. They must not render their own `<main>`.

Unit/server-render tests for these feature components must assert:

- exactly one `<h1>`;
- zero nested `<main>` elements;
- truthful normal empty-state copy;
- no `data-preview-only`;
- no native form or record rows.

Playwright route tests for `/admin/inquiries` and `/admin/messages` must assert:

- exactly one final page `<main>` supplied by the shell;
- exactly one final page `<h1>`;
- inherited `noindex` metadata;
- shell navigation and session-warning behavior remain present.

Do not write a component-level test that expects `AdminInquiriesPage` or `AdminMessagesPage` to contain a `<main>`.

## 3. Numeric-count verification must target operational-count copy

The normal pages legitimately contain ordered workflow steps and may contain semantic list numbering in browser rendering. “No numeric operational count” must therefore be tested against explicit collection-count patterns rather than all digits.

Prohibited normal-route copy patterns include:

```text
0 inquiries
0 messages
0 new
4 inquiries
20 latest submissions
No new inquiries today
All caught up
Last synced
```

Tests should not reject numeric CSS values, heading levels, ordered-list semantics or route-independent shell content.

## 4. Exact route ownership correction

The catch-all route must evaluate the resolvers as follows:

```ts
const management = resolveAdminManagementRoute(segments);
if (management.kind !== "not-found") {
  return <AdminManagementRouteView result={management} />;
}

const operations = resolveAdminOperationsRoute(segments);
if (operations.kind !== "not-found") {
  return <AdminOperationsRouteView result={operations} />;
}

const root = segments[0] ?? "";
if (isAdminManagementRoot(root) || isAdminOperationsRoot(root)) {
  notFound();
}
```

Then and only then may the route fall back to F3E-A deferred pages for Content, Contact Details, Publishing, Revisions and Settings.

This guarantees that `/admin/inquiries/example` and `/admin/messages/example` cannot inherit the broad F3E-A placeholder route.

`AdminOperationsRouteView` must call `notFound()` for its `not-found` branch and must never return `null`.

## 5. Preview fixture boundary

Synthetic populated previews may use a local preview-fixture factory, but the factory must:

- live under `admin-inquiries` or `admin-messages` preview files;
- be imported only by preview components and preview tests;
- use `EXAMPLE-*`, `Example *`, `example.invalid` and `Not supplied` values;
- never be imported by `AdminInquiriesPage`, `AdminMessagesPage`, the normal operations route model or the normal route view;
- never be named `ADMIN_INQUIRIES`, `ADMIN_MESSAGES`, `LIVE_INQUIRIES` or `LIVE_MESSAGES`.

The normal operations routes have no record array, including an empty exported array presented as if it were a live collection.

## 6. Final self-review result

After applying these corrections, the F3E-C design has:

- truthful non-preview empty normal routes;
- isolated preview-only loading, error, populated and confirmation states;
- exact shell/feature landmark ownership;
- count tests that do not create false positives;
- strict operations-root not-found behavior;
- no normal-route record dataset;
- no fictional customer or communication history;
- no backend/OpenAPI expansion.
