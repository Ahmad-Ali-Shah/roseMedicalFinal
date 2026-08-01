# F3E-C Implementation Plan Review Corrections

**Status:** Binding corrections to `2026-08-01-rosa-medical-f3e-c-operations.md`  
**Date:** 2026-08-01  
**Reason:** Post-plan self-review found a repeated-ID risk, one incorrect disabled-control assertion, one preview-inventory wording error and one missing hard-failure structural check.  
**Execution rule:** Read this file immediately after the main F3E-C implementation plan. Where this file conflicts with the main plan, this file controls.

## 1. `AdminOperationsEmptyState` must generate a unique heading ID

The main plan hard-codes `admin-operations-empty-title`. The component is shared and may appear more than once in a composed test or future story, so use `useId()`.

Correct implementation:

```tsx
import { useId } from "react";

export interface AdminOperationsEmptyStateProps {
  title: string;
  description: string;
  supportingText: string;
}

export function AdminOperationsEmptyState({
  title,
  description,
  supportingText
}: AdminOperationsEmptyStateProps) {
  const headingId = useId();
  return (
    <section
      className="admin-operations-empty-state"
      aria-labelledby={headingId}
    >
      <p className="page-eyebrow">Live records unavailable</p>
      <h2 id={headingId}>{title}</h2>
      <p>{description}</p>
      <p className="admin-operations-empty-state__support">
        {supportingText}
      </p>
    </section>
  );
}
```

The component remains server-renderable and must not render `data-preview-only`.

## 2. Inquiry normal-page disabled-control assertion is four, not five

The normal Inquiry toolbar contains:

- one read-only search input;
- one disabled status select;
- one disabled country select;
- two disabled pagination buttons.

Therefore the markup contains four `disabled` attributes, not five. Replace:

```ts
expect((html.match(/disabled/g) ?? []).length).toBeGreaterThanOrEqual(5);
```

with explicit assertions:

```ts
expect((html.match(/readonly/g) ?? [])).toHaveLength(1);
expect((html.match(/<select[^>]*disabled/g) ?? [])).toHaveLength(2);
expect((html.match(/<button[^>]*disabled/g) ?? [])).toHaveLength(2);
```

For Messages, assert one read-only search input, one disabled select and two disabled pagination buttons.

## 3. Inquiry preview inventory wording

Task 5’s file produces **ten isolated state components**, not thirteen. The total Inquiry preview inventory is thirteen only when combined with Task 4’s three populated compositions:

- populated list;
- desktop detail;
- mobile detail;
- ten state previews.

Change the Task 5 interface wording to:

```text
Produces: ten isolated Inquiry loading, failure, no-results, mutation, communication and warning previews. Together with Task 4, the Inquiry preview system contains thirteen exported compositions.
```

No component is missing from the approved specification.

## 4. Exact status-tone mapping

Workflow guides must not choose tones ad hoc. Use these mappings:

```ts
export function getInquiryStatusTone(
  status: AdminInquiryStatus
): AdminStatusTone {
  switch (status) {
    case "New": return "warning";
    case "Reviewed": return "review";
    case "Contacted": return "ready";
    case "Closed": return "archived";
  }
}
```

```ts
export function getMessageStatusTone(
  status: AdminMessageStatus
): AdminStatusTone {
  switch (status) {
    case "New": return "warning";
    case "Read": return "review";
    case "Replied": return "ready";
    case "Closed": return "archived";
  }
}
```

Export these helpers from their respective workflow modules and unit-test all four mappings. The tone communicates intended vocabulary only; it is not attached to normal-route records.

## 5. Operations route view must have a structural no-blank-200 test

Add a source-level assertion to `admin-operations-routing.test.tsx` or the static policy test:

```js
const routeViewSource = await readFile(
  new URL(
    "../features/admin-operations-routing/admin-operations-route-view.tsx",
    import.meta.url
  ),
  "utf8"
);

assert.match(routeViewSource, /case\s+["']not-found["']:\s*notFound\(\)/);
assert.doesNotMatch(routeViewSource, /return\s+null/);
```

This is required in addition to the resolver tests. A future internal mismatch must produce not-found, never an empty successful response.

## 6. Preview fixture import boundary test

The static policy test must verify that normal route files do not import preview fixture modules:

```js
assert.doesNotMatch(content, /admin-(?:inquiry|message)-preview-fixture/);
```

Also scan the operations route model and route view. Preview fixture factories may be imported only by preview components and preview tests.

## 7. Final self-review result

After applying these corrections, the plan has:

- unique accessible empty-state heading IDs;
- exact normal-control assertions;
- accurate preview inventory accounting;
- deterministic status-tone mapping;
- explicit protection against blank successful route responses;
- a tested boundary preventing preview fixtures from entering normal routes;
- complete coverage of the approved truthful-empty, strict-routing and preview-only specification.
