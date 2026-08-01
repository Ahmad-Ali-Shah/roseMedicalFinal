# Rosa Medical F3E-C Truthful Admin Operations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Rosa Medical uses inline execution only.

**Goal:** Replace the Inquiries and Messages admin placeholders with truthful empty normal routes, strict operations routing, documented workflow guidance, and isolated synthetic demonstration previews.

**Architecture:** F3E-C adds two static feature pages under the existing F3E-A owner workspace and an exact operations resolver beside the F3E-B management resolver. Normal routes contain no records or detail links; populated lists, details, communication actions and confirmations live only in unmounted `data-preview-only` components using synthetic identities and existing catalogue-backed inquiry lines.

**Tech Stack:** Next.js 16 App Router, React 19, strict TypeScript, existing Rosa CSS tokens and shared stylesheets, F3E-A admin primitives, F3E-B route-dispatch pattern, Vitest server-render tests, Node static-policy tests and Playwright.

## Global Constraints

- Read `README.md` from `main` before implementation and preserve the backend-owned lane, decision ledger and prior messages.
- Read both approved F3E-C documents before implementation:
  - `docs/superpowers/specs/2026-08-01-rosa-medical-f3e-c-operations-design.md`
  - `docs/superpowers/specs/2026-08-01-rosa-medical-f3e-c-operations-design-review-corrections.md`
- Create `frontend/f3e-c-operations` from `frontend/f3e-c-operations-design` at commit `af6ce3de0fea2d25f7396bed5691e535cb2d7130`.
- Execute inline only. Do not offer or use subagent-driven execution.
- Normal routes are exactly `/admin/inquiries` and `/admin/messages`.
- Every deeper or malformed route under `inquiries` or `messages` returns not-found.
- Normal routes contain no inquiry/message array, including an exported empty array presented as live state.
- Normal routes contain no fictional identity, reference, organisation, email, telephone, country, timestamp, note, quantity, status history or communication history.
- Normal routes contain no numeric operational count and no wording implying a successful empty query.
- Normal routes contain no table rows, record cards, detail panels, detail links, native forms, file inputs, API calls, storage, client state or enabled operational actions.
- Normal routes must not mount F3E-A `AdminEmptyState`; it is preview-only.
- Create a dedicated non-preview `AdminOperationsEmptyState` for normal routes.
- Inquiry workflow vocabulary is exactly `New`, `Reviewed`, `Contacted`, `Closed`.
- Message workflow vocabulary is exactly `New`, `Read`, `Replied`, `Closed`.
- Workflow constants are vocabulary only, not record datasets.
- Every populated/detail/loading/failure/no-results/mutation/communication state is isolated and marked `data-preview-only="true"`.
- Every Inquiry preview visibly states `Demonstration preview only. No customer record was loaded or changed.`
- Every Message preview visibly states `Demonstration preview only. No message was classified, updated, replied to or converted.`
- Synthetic preview identities use only `EXAMPLE-*`, `Example *`, `example.invalid`, `Example submission time` and `Not supplied`.
- Preview product snapshots reuse `INQUIRY_PREVIEW_LINES` and the existing catalogue registry; do not create another product source.
- All preview controls remain disabled and have no handlers.
- Continue using the F3E-A shell, navigation and inherited `noindex`/`nofollow` metadata.
- Feature components render one `<h1>` and zero `<main>` elements; the shell owns the final route `<main>`.
- Target viewports are 1440 × 1000, 768 × 1024 and 390 × 844.
- Preserve the `ROSA` logo treatment; never add “Medical” to the logo lockup.
- Do not modify `services/api/**` or `packages/contracts/openapi/**`.
- Do not claim lint, typecheck, tests, build or Playwright passed without fresh command output and exit status.
- Keep commits meaningful and avoid unnecessary GitHub Actions runs.

---

## File Map

### Shared operations routing and normal empty state

- Create `apps/web/src/features/admin-operations-routing/admin-operations-empty-state.tsx` — non-preview normal-route empty state.
- Create `apps/web/src/features/admin-operations-routing/admin-operations-route-model.ts` — exact operations roots and resolver.
- Create `apps/web/src/features/admin-operations-routing/admin-operations-route-view.tsx` — route result rendering.
- Create `apps/web/src/features/admin-operations-routing/index.ts` — exports.
- Modify `apps/web/src/app/admin/(workspace)/[...segments]/page.tsx` — management → operations → owned-root 404 → deferred fallback order.

### Inquiries

- Create `apps/web/src/features/admin-inquiries/admin-inquiry-workflow.ts` — status vocabulary and descriptions.
- Create `apps/web/src/features/admin-inquiries/admin-inquiry-workflow-guide.tsx` — normal-route intended workflow.
- Create `apps/web/src/features/admin-inquiries/admin-inquiry-snapshot-policy.tsx` — immutable snapshot explanation.
- Create `apps/web/src/features/admin-inquiries/admin-inquiries-page.tsx` — truthful empty normal route.
- Create `apps/web/src/features/admin-inquiries/admin-inquiry-preview-fixture.ts` — synthetic preview-only identity and source-backed lines.
- Create `apps/web/src/features/admin-inquiries/admin-inquiry-list-preview.tsx` — populated demonstration list.
- Create `apps/web/src/features/admin-inquiries/admin-inquiry-detail-preview.tsx` — desktop/mobile-friendly synthetic detail.
- Create `apps/web/src/features/admin-inquiries/admin-inquiry-preview-states.tsx` — loading, failure, no-results and action previews.
- Create `apps/web/src/features/admin-inquiries/index.ts` — exports.

### Messages

- Create `apps/web/src/features/admin-messages/admin-message-workflow.ts` — status vocabulary and descriptions.
- Create `apps/web/src/features/admin-messages/admin-message-workflow-guide.tsx` — intended workflow.
- Create `apps/web/src/features/admin-messages/admin-message-separation-guide.tsx` — General Messages versus Quotation Inquiry guidance.
- Create `apps/web/src/features/admin-messages/admin-messages-page.tsx` — truthful empty normal route.
- Create `apps/web/src/features/admin-messages/admin-message-preview-fixture.ts` — synthetic preview-only message.
- Create `apps/web/src/features/admin-messages/admin-message-list-preview.tsx` — populated demonstration list.
- Create `apps/web/src/features/admin-messages/admin-message-detail-preview.tsx` — synthetic message detail.
- Create `apps/web/src/features/admin-messages/admin-message-preview-states.tsx` — loading, failure, no-results, guidance and action previews.
- Create `apps/web/src/features/admin-messages/index.ts` — exports.

### Styles and tests

- Create `apps/web/src/styles/f3e-c-operations.css`.
- Modify `apps/web/src/app/globals.css` — import F3E-C stylesheet after F3E-B.
- Create `apps/web/src/test/admin-operations-routing.test.tsx`.
- Create `apps/web/src/test/admin-operations-empty-state.test.tsx`.
- Create `apps/web/src/test/admin-inquiries-page.test.tsx`.
- Create `apps/web/src/test/admin-inquiry-previews.test.tsx`.
- Create `apps/web/src/test/admin-messages-page.test.tsx`.
- Create `apps/web/src/test/admin-message-previews.test.tsx`.
- Create `apps/web/src/test/f3e-c-admin-policy.static.test.mjs`.
- Create `apps/web/src/test/f3e-c-admin-styles.static.test.mjs`.
- Create `apps/web/tests/e2e/f3e-c-operations.spec.ts`.
- Create `docs/superpowers/completions/2026-08-01-rosa-medical-f3e-c-operations.md`.

---

### Task 1: Create the implementation branch, workflow vocabularies and shared normal empty state

**Files:**
- Create: `apps/web/src/features/admin-inquiries/admin-inquiry-workflow.ts`
- Create: `apps/web/src/features/admin-messages/admin-message-workflow.ts`
- Create: `apps/web/src/features/admin-operations-routing/admin-operations-empty-state.tsx`
- Create: `apps/web/src/features/admin-operations-routing/index.ts`
- Create: `apps/web/src/test/admin-operations-empty-state.test.tsx`

**Interfaces:**
- Produces: `ADMIN_INQUIRY_WORKFLOW`, `AdminInquiryStatus`, `ADMIN_MESSAGE_WORKFLOW`, `AdminMessageStatus`, `AdminOperationsEmptyStateProps`, `AdminOperationsEmptyState`.

- [ ] **Step 1: Create the implementation branch**

```bash
git switch frontend/f3e-c-operations-design
git pull --ff-only
git switch -c frontend/f3e-c-operations
```

Expected base:

```text
af6ce3de0fea2d25f7396bed5691e535cb2d7130
```

- [ ] **Step 2: Write the failing vocabulary and empty-state test**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ADMIN_INQUIRY_WORKFLOW } from "@/features/admin-inquiries";
import { ADMIN_MESSAGE_WORKFLOW } from "@/features/admin-messages";
import { AdminOperationsEmptyState } from "@/features/admin-operations-routing";

describe("F3E-C operations foundations", () => {
  it("locks the two independent workflow vocabularies", () => {
    expect(ADMIN_INQUIRY_WORKFLOW.map((step) => step.status)).toEqual([
      "New", "Reviewed", "Contacted", "Closed"
    ]);
    expect(ADMIN_MESSAGE_WORKFLOW.map((step) => step.status)).toEqual([
      "New", "Read", "Replied", "Closed"
    ]);
  });

  it("renders a truthful non-preview empty state", () => {
    const html = renderToStaticMarkup(
      <AdminOperationsEmptyState
        title="No live quotation inquiries are available."
        description="The current frontend has no persisted customer submissions to display."
        supportingText="Protected backend integration is required before records appear here."
      />
    );
    expect(html).toContain("<section");
    expect((html.match(/<h2/g) ?? [])).toHaveLength(1);
    expect(html).not.toContain("data-preview-only");
    expect(html).not.toContain("<button");
    expect(html).not.toContain("<a ");
  });
});
```

- [ ] **Step 3: Run the test and confirm the red state**

```bash
pnpm --filter @rosa/web test -- admin-operations-empty-state.test.tsx
```

Expected: failure because the new features do not exist.

- [ ] **Step 4: Implement exact workflow constants**

```ts
export const ADMIN_INQUIRY_WORKFLOW = [
  { status: "New", description: "Submission has entered the protected owner queue and needs review." },
  { status: "Reviewed", description: "Requirements and submitted snapshots have been checked." },
  { status: "Contacted", description: "The owner has initiated an external conversation." },
  { status: "Closed", description: "The inquiry no longer requires active follow-up." }
] as const;

export type AdminInquiryStatus = (typeof ADMIN_INQUIRY_WORKFLOW)[number]["status"];
```

```ts
export const ADMIN_MESSAGE_WORKFLOW = [
  { status: "New", description: "A message has entered the protected owner queue." },
  { status: "Read", description: "The owner has reviewed the message." },
  { status: "Replied", description: "The owner has responded through a future external communication workflow." },
  { status: "Closed", description: "The message no longer requires active follow-up." }
] as const;

export type AdminMessageStatus = (typeof ADMIN_MESSAGE_WORKFLOW)[number]["status"];
```

- [ ] **Step 5: Implement the dedicated normal empty state**

```tsx
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
  return (
    <section className="admin-operations-empty-state" aria-labelledby="admin-operations-empty-title">
      <p className="page-eyebrow">Live records unavailable</p>
      <h2 id="admin-operations-empty-title">{title}</h2>
      <p>{description}</p>
      <p className="admin-operations-empty-state__support">{supportingText}</p>
    </section>
  );
}
```

Do not use F3E-A `AdminEmptyState` here.

- [ ] **Step 6: Export, verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-operations-empty-state.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-inquiries/admin-inquiry-workflow.ts apps/web/src/features/admin-messages/admin-message-workflow.ts apps/web/src/features/admin-operations-routing apps/web/src/test/admin-operations-empty-state.test.tsx
git commit -m "feat: define F3E-C operations foundations"
```

---

### Task 2: Build the truthful Quotation Inquiries normal route composition

**Files:**
- Create: `apps/web/src/features/admin-inquiries/admin-inquiry-workflow-guide.tsx`
- Create: `apps/web/src/features/admin-inquiries/admin-inquiry-snapshot-policy.tsx`
- Create: `apps/web/src/features/admin-inquiries/admin-inquiries-page.tsx`
- Create: `apps/web/src/features/admin-inquiries/index.ts`
- Create: `apps/web/src/test/admin-inquiries-page.test.tsx`

**Interfaces:**
- Consumes: `ADMIN_INQUIRY_WORKFLOW`, F3E-A `AdminPageHeader`, `AdminAlert`, `AdminToolbar`, `AdminSearchPreview`, `AdminFilterPreview`, `AdminPaginationPreview`, and shared `AdminOperationsEmptyState`.
- Produces: `AdminInquiryWorkflowGuide`, `AdminInquirySnapshotPolicy`, `AdminInquiriesPage`.

- [ ] **Step 1: Write the failing normal-page test**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AdminInquiriesPage } from "@/features/admin-inquiries";

describe("F3E-C inquiries normal page", () => {
  it("renders one feature heading and no nested main", () => {
    const html = renderToStaticMarkup(<AdminInquiriesPage />);
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect((html.match(/<main/g) ?? [])).toHaveLength(0);
    expect(html).toContain("Product requirements awaiting connection.");
  });

  it("shows truthful empty state and disabled collection controls", () => {
    const html = renderToStaticMarkup(<AdminInquiriesPage />);
    expect(html).toContain("No live inquiry source is connected.");
    expect(html).toContain("No live quotation inquiries are available.");
    expect(html).toContain("readonly");
    expect((html.match(/disabled/g) ?? []).length).toBeGreaterThanOrEqual(5);
    expect(html).not.toContain("data-preview-only");
    expect(html).not.toContain("<form");
    expect(html).not.toContain("<table");
  });

  it("contains only intended workflow vocabulary and no operational counts", () => {
    const html = renderToStaticMarkup(<AdminInquiriesPage />);
    for (const status of ["New", "Reviewed", "Contacted", "Closed"]) {
      expect(html).toContain(status);
    }
    expect(html).not.toMatch(/0 inquiries|0 new|4 inquiries|20 latest submissions|No new inquiries today|Last synced/i);
  });

  it("documents immutable submitted snapshots without fake records", () => {
    const html = renderToStaticMarkup(<AdminInquiriesPage />);
    for (const label of ["Product name", "Product code", "Chosen option", "Quantity", "Line note", "General customer note"]) {
      expect(html).toContain(label);
    }
    expect(html).not.toMatch(/EXAMPLE-INQUIRY|Example buyer|example\.invalid/i);
  });
});
```

- [ ] **Step 2: Run and confirm failure**

```bash
pnpm --filter @rosa/web test -- admin-inquiries-page.test.tsx
```

- [ ] **Step 3: Implement the intended workflow guide**

Render a section labelled `Intended workflow`, map the four workflow constants into an ordered list, and render each status with `AdminStatusBadge`. Use the description from the vocabulary constant. Add visible copy:

```text
This vocabulary describes the planned owner workflow. It does not represent current inquiry activity.
```

Do not render arrows that depend on horizontal overflow; CSS may add separators at wide widths.

- [ ] **Step 4: Implement the snapshot policy**

Render a semantic section with heading `Preserved submitted snapshot` and a definition list containing exactly:

- Product name
- Product code
- Chosen option
- Quantity
- Line note
- General customer note

Add copy:

```text
Later catalogue edits must not rewrite customer-submitted inquiry values.
```

- [ ] **Step 5: Implement the normal page**

Required order:

1. `AdminPageHeader` — eyebrow `Quotation inquiries`, title `Product requirements awaiting connection.`.
2. Warning `AdminAlert` titled `No live inquiry source is connected.` stating no customer submission was queried or loaded.
3. Disabled toolbar:
   - `AdminSearchPreview label="Search inquiries" placeholder="Reference, customer or company"`
   - status filter with `All inquiry states`, `New`, `Reviewed`, `Contacted`, `Closed`
   - country filter with only `All countries`
4. Supporting copy: authenticated live records are required for collection controls.
5. `AdminOperationsEmptyState` with the exact approved title and description.
6. Disabled pagination preview.
7. Intended workflow guide.
8. Snapshot policy.
9. Lightweight owner scope section documenting planned bounded latest-submission pagination without an exact number.

No record list, row, card, table, reference, status attached to a record or detail link may appear.

- [ ] **Step 6: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-inquiries-page.test.tsx admin-operations-empty-state.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-inquiries apps/web/src/test/admin-inquiries-page.test.tsx
git commit -m "feat: build truthful F3E-C inquiries page"
```

---

### Task 3: Build the truthful General Messages normal route composition

**Files:**
- Create: `apps/web/src/features/admin-messages/admin-message-workflow-guide.tsx`
- Create: `apps/web/src/features/admin-messages/admin-message-separation-guide.tsx`
- Create: `apps/web/src/features/admin-messages/admin-messages-page.tsx`
- Create: `apps/web/src/features/admin-messages/index.ts`
- Create: `apps/web/src/test/admin-messages-page.test.tsx`

**Interfaces:**
- Consumes: `ADMIN_MESSAGE_WORKFLOW`, F3E-A primitives and shared `AdminOperationsEmptyState`.
- Produces: `AdminMessageWorkflowGuide`, `AdminMessageSeparationGuide`, `AdminMessagesPage`.

- [ ] **Step 1: Write the failing normal-page test**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AdminMessagesPage } from "@/features/admin-messages";

describe("F3E-C messages normal page", () => {
  it("renders one feature heading and no nested main", () => {
    const html = renderToStaticMarkup(<AdminMessagesPage />);
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect((html.match(/<main/g) ?? [])).toHaveLength(0);
    expect(html).toContain("Contact messages remain separate.");
  });

  it("shows truthful empty state without a country filter or records", () => {
    const html = renderToStaticMarkup(<AdminMessagesPage />);
    expect(html).toContain("No live message source is connected.");
    expect(html).toContain("No live general messages are available.");
    expect(html).toContain("Search messages");
    expect(html).not.toContain("All countries");
    expect(html).not.toContain("<table");
    expect(html).not.toContain("data-preview-only");
  });

  it("documents separation and intended message statuses only", () => {
    const html = renderToStaticMarkup(<AdminMessagesPage />);
    for (const status of ["New", "Read", "Replied", "Closed"]) expect(html).toContain(status);
    expect(html).toContain("Remain in General Messages");
    expect(html).toContain("Use the Quotation Inquiry flow");
    expect(html).not.toMatch(/0 messages|All caught up|Inbox empty|Last synced/i);
  });

  it("contains no fictional communication activity", () => {
    const html = renderToStaticMarkup(<AdminMessagesPage />);
    expect(html).not.toMatch(/Example sender|example\.invalid|Today|Yesterday|Open email|Mark read|Replied successfully/i);
    expect(html).not.toContain("mailto:");
  });
});
```

- [ ] **Step 2: Run and confirm failure**

```bash
pnpm --filter @rosa/web test -- admin-messages-page.test.tsx
```

- [ ] **Step 3: Implement the separation guide**

Render two semantic subsections:

`Remain in General Messages`:

- Company-information questions
- Catalogue-availability questions without products or quantities
- Contact-information questions
- Distributor or procurement introductions without structured product requirements
- Other general business communication

`Use the Quotation Inquiry flow`:

- Product pricing requests
- Product quantity requests
- Selected instrument codes
- Requested sizes, variants or directions
- Product-line notes
- Multiple product requirements needing immutable snapshots

End with:

```text
This is manual owner guidance. No classification or conversion has occurred.
```

- [ ] **Step 4: Implement the intended Message workflow guide**

Map exactly `New`, `Read`, `Replied`, `Closed` with status badges and descriptions. State that it is vocabulary only and does not indicate current messages or sent email.

- [ ] **Step 5: Implement the normal page**

Required order:

1. Header — eyebrow `General messages`, title `Contact messages remain separate.`.
2. Warning `No live message source is connected.` stating no contact submissions or email provider are connected.
3. Disabled toolbar with search and status filter only.
4. Supporting copy explaining that controls require authenticated live messages.
5. `AdminOperationsEmptyState` with approved copy.
6. Disabled pagination.
7. Separation guide.
8. Intended message workflow.

No country filter, record table, sender, subject, status history, open-email action or detail panel may appear.

- [ ] **Step 6: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-messages-page.test.tsx admin-operations-empty-state.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-messages apps/web/src/test/admin-messages-page.test.tsx
git commit -m "feat: build truthful F3E-C messages page"
```

---

### Task 4: Build the synthetic Inquiry demonstration fixture and populated previews

**Files:**
- Create: `apps/web/src/features/admin-inquiries/admin-inquiry-preview-fixture.ts`
- Create: `apps/web/src/features/admin-inquiries/admin-inquiry-list-preview.tsx`
- Create: `apps/web/src/features/admin-inquiries/admin-inquiry-detail-preview.tsx`
- Modify: `apps/web/src/features/admin-inquiries/index.ts`
- Create: `apps/web/src/test/admin-inquiry-previews.test.tsx`

**Interfaces:**
- Consumes: `INQUIRY_PREVIEW_LINES`, `AdminInquiryStatus`, read-only admin fields and product placeholders.
- Produces: `AdminInquiryPreviewFixture`, `getAdminInquiryPreviewFixture()`, `AdminInquiryListPreview`, `AdminInquiryDetailPreview`, `AdminInquiryMobileDetailPreview`.

- [ ] **Step 1: Write the failing preview fixture and rendering tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  AdminInquiryDetailPreview,
  AdminInquiryListPreview,
  AdminInquiryMobileDetailPreview,
  getAdminInquiryPreviewFixture
} from "@/features/admin-inquiries";
import { INQUIRY_PREVIEW_LINES } from "@/features/inquiry-preview";

describe("F3E-C inquiry previews", () => {
  it("uses only synthetic identity with source-backed product lines", () => {
    const fixture = getAdminInquiryPreviewFixture();
    expect(fixture.reference).toBe("EXAMPLE-INQUIRY");
    expect(fixture.email).toBe("buyer@example.invalid");
    expect(fixture.lines.map((line) => line.product.id)).toEqual(
      INQUIRY_PREVIEW_LINES.map((line) => line.product.id)
    );
    expect(JSON.stringify(fixture)).not.toMatch(/Nora|Al Noor|Saudi Arabia|RM-\d+/i);
  });

  it.each([
    <AdminInquiryListPreview key="list" />,
    <AdminInquiryDetailPreview key="detail" />,
    <AdminInquiryMobileDetailPreview key="mobile" />
  ])("marks populated inquiry compositions preview-only", (view) => {
    const html = renderToStaticMarkup(view);
    expect(html).toContain('data-preview-only="true"');
    expect(html).toContain("Demonstration preview only. No customer record was loaded or changed.");
    expect(html).toContain("EXAMPLE-INQUIRY");
    expect(html).not.toContain("<form");
    expect(html).not.toMatch(/Nora|Khalid|Sara|Daniel|@alnoor|\+966|Today|Yesterday/i);
  });
});
```

- [ ] **Step 2: Run and confirm failure**

```bash
pnpm --filter @rosa/web test -- admin-inquiry-previews.test.tsx
```

- [ ] **Step 3: Implement the fixture factory**

```ts
export interface AdminInquiryPreviewFixture {
  reference: "EXAMPLE-INQUIRY";
  buyer: "Example buyer";
  organisation: "Example organisation";
  email: "buyer@example.invalid";
  telephone: "Not supplied";
  country: "Example country";
  submittedAt: "Example submission time";
  status: AdminInquiryStatus;
  generalNote: "Example customer note for layout review.";
  internalNote: "Example private owner note.";
  lines: readonly InquiryPreviewLine[];
}

export function getAdminInquiryPreviewFixture(): AdminInquiryPreviewFixture {
  return {
    reference: "EXAMPLE-INQUIRY",
    buyer: "Example buyer",
    organisation: "Example organisation",
    email: "buyer@example.invalid",
    telephone: "Not supplied",
    country: "Example country",
    submittedAt: "Example submission time",
    status: "New",
    generalNote: "Example customer note for layout review.",
    internalNote: "Example private owner note.",
    lines: INQUIRY_PREVIEW_LINES.map((line) => ({
      ...line,
      note: "Example line note for layout review."
    }))
  };
}
```

Do not export a constant named `ADMIN_INQUIRIES` or an empty normal collection.

- [ ] **Step 4: Implement the populated list preview**

Render one synthetic list row using the fixture, labelled `Example record`. Display reference, buyer, organisation, country, source-backed product count, total synthetic quantity, status and disabled Open action. The preview root owns the disclaimer and `data-preview-only`.

- [ ] **Step 5: Implement desktop and mobile detail previews**

Display:

- Synthetic reference, identity and status
- Read-only email, telephone, country and organisation fields
- Source-backed product names/codes/options from fixture lines
- Synthetic quantities and line notes
- General note and internal note fields
- Disabled status selector
- Disabled Open email, Save note, Mark reviewed, Mark contacted and Close inquiry controls
- Snapshot-protection warning

Both detail variants use the same fixture factory. Mobile variant changes structure/class names only; it does not duplicate fixture data.

- [ ] **Step 6: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-inquiry-previews.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-inquiries apps/web/src/test/admin-inquiry-previews.test.tsx
git commit -m "feat: add F3E-C inquiry demonstration previews"
```

---

### Task 5: Add isolated Inquiry loading, failure, no-results and action previews

**Files:**
- Create: `apps/web/src/features/admin-inquiries/admin-inquiry-preview-states.tsx`
- Modify: `apps/web/src/features/admin-inquiries/index.ts`
- Modify: `apps/web/src/test/admin-inquiry-previews.test.tsx`

**Interfaces:**
- Produces thirteen required isolated states from the approved specification.

- [ ] **Step 1: Add the failing state-count and disclaimer test**

```tsx
import {
  AdminInquiryCloseConfirmationPreview,
  AdminInquiryInternalNotePreview,
  AdminInquiryListFailurePreview,
  AdminInquiryListLoadingPreview,
  AdminInquiryMarkContactedPreview,
  AdminInquiryMarkReviewedPreview,
  AdminInquiryNoResultsPreview,
  AdminInquiryOpenEmailPreview,
  AdminInquirySnapshotWarningPreview,
  AdminInquiryStatusTransitionPreview
} from "@/features/admin-inquiries";

it("keeps every inquiry operational state isolated and non-mutating", () => {
  const html = renderToStaticMarkup(
    <>
      <AdminInquiryListLoadingPreview />
      <AdminInquiryListFailurePreview />
      <AdminInquiryNoResultsPreview />
      <AdminInquiryStatusTransitionPreview />
      <AdminInquiryInternalNotePreview />
      <AdminInquiryMarkReviewedPreview />
      <AdminInquiryMarkContactedPreview />
      <AdminInquiryCloseConfirmationPreview />
      <AdminInquiryOpenEmailPreview />
      <AdminInquirySnapshotWarningPreview />
    </>
  );
  expect((html.match(/data-preview-only=/g) ?? [])).toHaveLength(10);
  expect((html.match(/No customer record was loaded or changed/g) ?? [])).toHaveLength(10);
  expect(html).not.toMatch(/Saved successfully|Status updated|Email opened|Inquiry closed/i);
});
```

- [ ] **Step 2: Run and confirm failure**

```bash
pnpm --filter @rosa/web test -- admin-inquiry-previews.test.tsx
```

- [ ] **Step 3: Implement one shared private preview wrapper**

Inside the preview-state file:

```tsx
function InquiryPreviewState({ title, children, busy }: {
  title: string;
  children: ReactNode;
  busy?: boolean;
}) {
  return (
    <section className="admin-operation-preview" data-preview-only="true" aria-busy={busy || undefined}>
      <h2>{title}</h2>
      <p>Demonstration preview only. No customer record was loaded or changed.</p>
      {children}
    </section>
  );
}
```

- [ ] **Step 4: Implement exact state titles**

- `Inquiry-list loading preview`
- `Inquiry-list load-failure preview`
- `Inquiry no-results preview`
- `Inquiry status-transition preview`
- `Internal-note editing preview`
- `Mark-reviewed confirmation preview`
- `Mark-contacted confirmation preview`
- `Close-inquiry confirmation preview`
- `Open-email action preview`
- `Snapshot-preservation warning preview`

Every button is disabled. Open-email preview explicitly states that no address was opened and no provider exists. Confirmation previews state the proposed target status but no update occurred.

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-inquiry-previews.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-inquiries/admin-inquiry-preview-states.tsx apps/web/src/features/admin-inquiries/index.ts apps/web/src/test/admin-inquiry-previews.test.tsx
git commit -m "feat: add F3E-C inquiry operation states"
```

---

### Task 6: Build synthetic Message fixtures, populated previews and isolated states

**Files:**
- Create: `apps/web/src/features/admin-messages/admin-message-preview-fixture.ts`
- Create: `apps/web/src/features/admin-messages/admin-message-list-preview.tsx`
- Create: `apps/web/src/features/admin-messages/admin-message-detail-preview.tsx`
- Create: `apps/web/src/features/admin-messages/admin-message-preview-states.tsx`
- Modify: `apps/web/src/features/admin-messages/index.ts`
- Create: `apps/web/src/test/admin-message-previews.test.tsx`

**Interfaces:**
- Produces: `AdminMessagePreviewFixture`, `getAdminMessagePreviewFixture()`, populated list/detail/mobile previews and twelve required isolated states.

- [ ] **Step 1: Write the failing fixture and preview tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  AdminMessageDetailPreview,
  AdminMessageListPreview,
  AdminMessageMobileDetailPreview,
  getAdminMessagePreviewFixture
} from "@/features/admin-messages";

describe("F3E-C message previews", () => {
  it("uses only unmistakably synthetic identity", () => {
    expect(getAdminMessagePreviewFixture()).toEqual({
      subject: "Example general message",
      sender: "Example sender",
      organisation: "Example organisation",
      email: "sender@example.invalid",
      country: "Not supplied",
      submittedAt: "Example submission time",
      body: "Example message body for layout review.",
      internalNote: "Example private owner note.",
      status: "New"
    });
  });

  it.each([
    <AdminMessageListPreview key="list" />,
    <AdminMessageDetailPreview key="detail" />,
    <AdminMessageMobileDetailPreview key="mobile" />
  ])("isolates populated message previews", (view) => {
    const html = renderToStaticMarkup(view);
    expect(html).toContain('data-preview-only="true"');
    expect(html).toContain("No message was classified, updated, replied to or converted.");
    expect(html).not.toMatch(/Amal|Omar|Fatima|Luis|Riyadh|MedImport|Today|Yesterday/i);
    expect(html).not.toContain("<form");
  });
});
```

- [ ] **Step 2: Run and confirm failure**

```bash
pnpm --filter @rosa/web test -- admin-message-previews.test.tsx
```

- [ ] **Step 3: Implement the fixture factory**

```ts
export interface AdminMessagePreviewFixture {
  subject: "Example general message";
  sender: "Example sender";
  organisation: "Example organisation";
  email: "sender@example.invalid";
  country: "Not supplied";
  submittedAt: "Example submission time";
  body: "Example message body for layout review.";
  internalNote: "Example private owner note.";
  status: AdminMessageStatus;
}

export function getAdminMessagePreviewFixture(): AdminMessagePreviewFixture {
  return {
    subject: "Example general message",
    sender: "Example sender",
    organisation: "Example organisation",
    email: "sender@example.invalid",
    country: "Not supplied",
    submittedAt: "Example submission time",
    body: "Example message body for layout review.",
    internalNote: "Example private owner note.",
    status: "New"
  };
}
```

- [ ] **Step 4: Implement populated list/detail/mobile previews**

The list shows one synthetic row. Detail variants show subject, sender, organisation, email, optional country, body, manual quotation-route guidance, internal note and disabled actions:

- Open email
- Create inquiry route
- Save note
- Mark read
- Mark replied
- Close message

Every root contains the exact Message disclaimer and `data-preview-only`.

- [ ] **Step 5: Add failing state coverage**

Test exported states:

- Message-list loading
- Message-list failure
- Message no-results
- Pricing-and-quantity guidance
- Mark-read confirmation
- Mark-replied confirmation
- Close-message confirmation
- Internal-note preview
- Convert-to-inquiry guidance

Each root must contain `data-preview-only`, the exact disclaimer, and no success claim.

- [ ] **Step 6: Implement state wrapper and states**

Use a private `MessagePreviewState` wrapper analogous to Inquiry previews. The pricing state title is `Manual review guidance`, not `Pricing request detected`. Conversion copy states that no conversion contract exists and the disabled action cannot create an inquiry.

- [ ] **Step 7: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-message-previews.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-messages apps/web/src/test/admin-message-previews.test.tsx
git commit -m "feat: add F3E-C message demonstration previews"
```

---

### Task 7: Add strict operations route resolution and integrate the admin catch-all

**Files:**
- Create: `apps/web/src/features/admin-operations-routing/admin-operations-route-model.ts`
- Create: `apps/web/src/features/admin-operations-routing/admin-operations-route-view.tsx`
- Modify: `apps/web/src/features/admin-operations-routing/index.ts`
- Modify: `apps/web/src/app/admin/(workspace)/[...segments]/page.tsx`
- Create: `apps/web/src/test/admin-operations-routing.test.tsx`

**Interfaces:**
- Produces: `ADMIN_OPERATIONS_ROOTS`, `AdminOperationsRoot`, `AdminOperationsRouteResult`, `isAdminOperationsRoot()`, `resolveAdminOperationsRoute()`, `AdminOperationsRouteView`.

- [ ] **Step 1: Write failing strict route tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  AdminOperationsRouteView,
  isAdminOperationsRoot,
  resolveAdminOperationsRoute
} from "@/features/admin-operations-routing";

describe("F3E-C operations routing", () => {
  it("resolves only the two exact list routes", () => {
    expect(resolveAdminOperationsRoute(["inquiries"])).toEqual({ kind: "inquiries" });
    expect(resolveAdminOperationsRoute(["messages"])).toEqual({ kind: "messages" });
  });

  it.each([
    [],
    ["inquiries", "example"],
    ["messages", "example"],
    ["inquiries", "example", "extra"],
    ["messages", "example", "extra"],
    ["unknown"]
  ])("returns not-found for unsupported shape %j", (segments) => {
    expect(resolveAdminOperationsRoute(segments)).toEqual({ kind: "not-found" });
  });

  it("owns only inquiries and messages roots", () => {
    expect(isAdminOperationsRoot("inquiries")).toBe(true);
    expect(isAdminOperationsRoot("messages")).toBe(true);
    expect(isAdminOperationsRoot("content")).toBe(false);
  });

  it("renders normal route views without preview states", () => {
    for (const result of [{ kind: "inquiries" }, { kind: "messages" }] as const) {
      const html = renderToStaticMarkup(<AdminOperationsRouteView result={result} />);
      expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
      expect(html).not.toContain("data-preview-only");
    }
  });
});
```

- [ ] **Step 2: Run and confirm failure**

```bash
pnpm --filter @rosa/web test -- admin-operations-routing.test.tsx
```

- [ ] **Step 3: Implement the exact resolver**

```ts
export const ADMIN_OPERATIONS_ROOTS = ["inquiries", "messages"] as const;
export type AdminOperationsRoot = (typeof ADMIN_OPERATIONS_ROOTS)[number];

export type AdminOperationsRouteResult =
  | { kind: "inquiries" }
  | { kind: "messages" }
  | { kind: "not-found" };

export function isAdminOperationsRoot(value: string): value is AdminOperationsRoot {
  return (ADMIN_OPERATIONS_ROOTS as readonly string[]).includes(value);
}

export function resolveAdminOperationsRoute(
  segments: readonly string[]
): AdminOperationsRouteResult {
  if (segments.length === 1 && segments[0] === "inquiries") return { kind: "inquiries" };
  if (segments.length === 1 && segments[0] === "messages") return { kind: "messages" };
  return { kind: "not-found" };
}
```

- [ ] **Step 4: Implement the route view with hard not-found fallback**

```tsx
import { notFound } from "next/navigation";

export function AdminOperationsRouteView({ result }: { result: AdminOperationsRouteResult }) {
  switch (result.kind) {
    case "inquiries": return <AdminInquiriesPage />;
    case "messages": return <AdminMessagesPage />;
    case "not-found": notFound();
  }
}
```

Never return `null`.

- [ ] **Step 5: Integrate the catch-all in the binding order**

```tsx
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

Then retain the existing navigation/deferred-route fallback for Content, Contact Details, Publishing, Revisions and Settings.

- [ ] **Step 6: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-operations-routing.test.tsx admin-management-routing.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-operations-routing apps/web/src/app/admin/'(workspace)'/'[...segments]'/page.tsx apps/web/src/test/admin-operations-routing.test.tsx
git commit -m "feat: route F3E-C operations pages"
```

---

### Task 8: Add responsive F3E-C styling and static style coverage

**Files:**
- Create: `apps/web/src/styles/f3e-c-operations.css`
- Modify: `apps/web/src/app/globals.css`
- Create: `apps/web/src/test/f3e-c-admin-styles.static.test.mjs`

**Interfaces:**
- Consumes: classes introduced by Tasks 1–7 and existing tokens.
- Produces: responsive normal routes and preview detail layouts.

- [ ] **Step 1: Write the failing style test**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../styles/f3e-c-operations.css", import.meta.url), "utf8");
const globals = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("F3E-C styles cover normal operations and preview layouts", () => {
  assert.match(css, /\.admin-inquiries-page/);
  assert.match(css, /\.admin-messages-page/);
  assert.match(css, /\.admin-operations-empty-state/);
  assert.match(css, /\.admin-operation-workflow/);
  assert.match(css, /\.admin-inquiry-detail-preview/);
  assert.match(css, /\.admin-message-detail-preview/);
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 520px\)/);
  assert.match(css, /overflow-wrap:\s*anywhere/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(globals, /@import "\.\.\/styles\/f3e-c-operations\.css";/);
});
```

- [ ] **Step 2: Run and confirm failure**

```bash
node --test apps/web/src/test/f3e-c-admin-styles.static.test.mjs
```

- [ ] **Step 3: Implement the stylesheet**

Required behavior:

- Normal pages use vertical grid flow and existing admin section spacing.
- Collection controls use three columns for Inquiries and two for Messages at desktop; one column below 900 px.
- `.admin-operations-empty-state` uses a restrained white panel, border, generous padding and no excessive fixed height.
- Workflow guide uses four columns desktop, two tablet and one mobile.
- Snapshot policy and separation guide use two columns desktop, one mobile.
- Preview list rows use responsive grid but never fixed-width overflow.
- Detail previews use two columns desktop and one below 900 px.
- Product snapshot details use definition-list layout.
- Disabled action bars wrap and become full-width stacked below 520 px.
- Long references, email fixtures, notes and labels use `overflow-wrap: anywhere` and `min-width: 0`.
- No fixed-height content panels, gradients, glass effects or page-level horizontal scrolling.
- Reduced-motion removes nonessential transitions.

Representative rules:

```css
.admin-operation-workflow {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-4);
}

.admin-operation-detail-grid,
.admin-operation-guidance-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-5);
}

@media (max-width: 900px) {
  .admin-operation-workflow,
  .admin-operation-detail-grid,
  .admin-operation-guidance-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .admin-operation-workflow,
  .admin-operation-detail-grid,
  .admin-operation-guidance-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
```

- [ ] **Step 4: Import after F3E-B**

```css
@import "../styles/f3e-c-operations.css";
```

- [ ] **Step 5: Verify and commit**

```bash
node --test apps/web/src/test/f3e-c-admin-styles.static.test.mjs
pnpm --filter @rosa/web typecheck
git add apps/web/src/styles/f3e-c-operations.css apps/web/src/app/globals.css apps/web/src/test/f3e-c-admin-styles.static.test.mjs
git commit -m "feat: style F3E-C operations compositions"
```

---

### Task 9: Add no-fiction policy checks and exact browser coverage

**Files:**
- Create: `apps/web/src/test/f3e-c-admin-policy.static.test.mjs`
- Create: `apps/web/tests/e2e/f3e-c-operations.spec.ts`
- Modify: feature tests only when a real policy gap is discovered.

**Interfaces:**
- Consumes: all normal F3E-C route source files and rendered routes.
- Produces: regression protection for honesty, strict routing, inherited metadata and responsive safety.

- [ ] **Step 1: Create the static normal-source policy test**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve("apps/web/src");
const normalFiles = [
  "features/admin-inquiries/admin-inquiries-page.tsx",
  "features/admin-inquiries/admin-inquiry-workflow.ts",
  "features/admin-inquiries/admin-inquiry-workflow-guide.tsx",
  "features/admin-inquiries/admin-inquiry-snapshot-policy.tsx",
  "features/admin-messages/admin-messages-page.tsx",
  "features/admin-messages/admin-message-workflow.ts",
  "features/admin-messages/admin-message-workflow-guide.tsx",
  "features/admin-messages/admin-message-separation-guide.tsx",
  "features/admin-operations-routing/admin-operations-empty-state.tsx",
  "features/admin-operations-routing/admin-operations-route-model.ts",
  "features/admin-operations-routing/admin-operations-route-view.tsx"
];
const content = (await Promise.all(normalFiles.map((file) => readFile(path.join(root, file), "utf8")))).join("\n");

const prohibited = [
  /ADMIN_INQUIRIES|ADMIN_MESSAGES|LIVE_INQUIRIES|LIVE_MESSAGES/,
  /EXAMPLE-INQUIRY|Example buyer|Example sender|example\.invalid/i,
  /Nora|Khalid|Sara|Daniel|Amal|Omar|Fatima|Luis/i,
  /Al Noor|MediSource|EuroMed|MedImport|Riyadh Health/i,
  /RM-\d+|Today|Yesterday|\+966/i,
  /0 inquiries|0 messages|0 new|4 inquiries|20 latest submissions/i,
  /No new inquiries today|All caught up|Inbox empty|Last synced/i,
  /data-preview-only/i,
  /mailto:|tel:|wa\.me/i,
  /onSubmit=|type=["']file["']|fetch\(|localStorage|sessionStorage/i
];

test("F3E-C normal operations source contains no fictional or live behavior", () => {
  for (const pattern of prohibited) assert.doesNotMatch(content, pattern);
  assert.match(content, /No live inquiry source is connected/);
  assert.match(content, /No live message source is connected/);
  assert.match(content, /No live quotation inquiries are available/);
  assert.match(content, /No live general messages are available/);
});
```

Preview files are intentionally excluded.

- [ ] **Step 2: Add the exact successful-route browser matrix**

```ts
import { expect, test } from "@playwright/test";

const routes = ["/admin/inquiries", "/admin/messages"] as const;
const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 }
] as const;

for (const viewport of viewports) {
  for (const route of routes) {
    test(`${route} is truthful at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      const response = await page.goto(route);
      expect(response?.ok()).toBe(true);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("[data-preview-only]")).toHaveCount(0);
      await expect(page.locator("form, table, [data-admin-record-list]")).toHaveCount(0);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/i);
      await expect(page.getByText("Owner session not connected")).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      const finalContent = page.locator("main > *").last();
      await finalContent.scrollIntoViewIfNeeded();
      await expect(finalContent).toBeVisible();
    });
  }
}
```

- [ ] **Step 3: Add route-specific browser assertions**

Inquiries:

- exact empty-state copy visible;
- New, Reviewed, Contacted and Closed visible;
- search input read-only;
- status/country filters disabled;
- no `0 inquiries`, detail link or fictional reference.

Messages:

- exact empty-state copy visible;
- New, Read, Replied and Closed visible;
- search input read-only;
- status filter disabled;
- no country filter, mailto link, sender row or fictional subject.

- [ ] **Step 4: Add strict not-found checks**

```ts
for (const route of [
  "/admin/inquiries/example",
  "/admin/inquiries/example/extra",
  "/admin/messages/example",
  "/admin/messages/example/extra"
]) {
  test(`${route} is not found`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
  });
}
```

- [ ] **Step 5: Run focused verification**

```bash
node --test apps/web/src/test/f3e-c-admin-policy.static.test.mjs
node --test apps/web/src/test/f3e-c-admin-styles.static.test.mjs
pnpm --filter @rosa/web test -- admin-operations-empty-state.test.tsx admin-inquiries-page.test.tsx admin-inquiry-previews.test.tsx admin-messages-page.test.tsx admin-message-previews.test.tsx admin-operations-routing.test.tsx
```

If unavailable, record as not run rather than passed.

- [ ] **Step 6: Commit verification specifications**

```bash
git add apps/web/src/test/f3e-c-admin-policy.static.test.mjs apps/web/tests/e2e/f3e-c-operations.spec.ts
git commit -m "test: add F3E-C operations coverage"
```

---

### Task 10: Run the consolidated gate, review scope, document completion and coordinate the backend lane

**Files:**
- Create: `docs/superpowers/completions/2026-08-01-rosa-medical-f3e-c-operations.md`
- Update after feature completion: `README.md` on `main`

**Interfaces:**
- Consumes: complete F3E-C branch, branch comparison, test output and current communication protocol.
- Produces: exact evidence, limitations and F3E-D handoff.

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
node --test apps/web/src/test/f3e-b-admin-styles.static.test.mjs
node --test apps/web/src/test/f3e-b-admin-policy.static.test.mjs
node --test apps/web/src/test/f3e-c-admin-styles.static.test.mjs
node --test apps/web/src/test/f3e-c-admin-policy.static.test.mjs
pnpm test:e2e
```

Read complete output and record exit codes. If the GitHub-only environment cannot run commands, record every command as not run.

- [ ] **Step 2: Review branch containment**

```bash
git diff --name-status frontend/f3e-c-operations-design...HEAD
git log --oneline frontend/f3e-c-operations-design..HEAD
```

Confirm:

- only F3E-C frontend features, the existing catch-all route, styles, tests and completion documentation changed;
- no backend or OpenAPI file changed;
- normal route files import no preview fixture;
- normal route source contains no inquiry/message array;
- preview fixtures are imported only by preview components/tests;
- every operations detail/deeper path is strict not-found;
- F3E-B management routes and F3E-A remaining deferred routes still resolve;
- normal routes contain no preview marker, record row, form, communication action or numeric count;
- preview-only states use synthetic identity and exact disclaimers.

- [ ] **Step 3: Perform compile-risk and accessibility source review**

Inspect:

- server/client boundaries; no normal F3E-C page needs client state;
- resolver ordering and owned-root strict 404 behavior;
- `AdminOperationsRouteView` calls `notFound()` and never returns `null`;
- feature pages own one h1 and zero mains;
- shell route owns one final main;
- workflow labels and descriptions remain separate between systems;
- disabled controls use base Button `type="button"` behavior;
- no nested interactive elements;
- preview detail fields have visible labels;
- preview lists and details have unique heading IDs when needed;
- CSS layout does not create page-level overflow;
- policy tests scan only normal route source;
- Playwright tests do not mistake workflow ordered-list numbers for operational counts.

Correct real defects in focused commits before writing completion documentation.

- [ ] **Step 4: Write and commit the completion record**

Record:

- implementation branch and source tip;
- design/plan base commit;
- `/admin/inquiries` and `/admin/messages` behavior;
- strict detail-path 404 behavior;
- workflow vocabularies;
- normal empty-state boundary;
- isolated preview inventory and synthetic fixture rules;
- unchanged backend/OpenAPI boundary;
- branch comparison;
- commands run and exact results;
- commands not run and reason;
- known limitations;
- next milestone: F3E-D Website Content, Contact Details, Publishing, Revisions and Settings.

```bash
git add docs/superpowers/completions/2026-08-01-rosa-medical-f3e-c-operations.md
git commit -m "docs: record F3E-C operations status"
```

- [ ] **Step 5: Update the shared README on `main`**

Read the latest `README.md` from `main` immediately before editing. Preserve backend-owned content and all previous messages. Update only:

- coordination timestamp;
- G3 frontend evidence to include static truthful admin Inquiry/Message empty routes while stating no live submission/admin reads exist;
- frontend current status, branch, commit, completed work, verification evidence, next work and blockers;
- Figma evidence with page 26 nodes;
- current repository state;
- one dated Frontend AI → Backend AI message.

Backend handoff facts:

- no OpenAPI or backend change;
- normal admin Inquiry and Message routes contain no records;
- inquiry and message workflows remain separate;
- no list/detail/status/note/email/conversion endpoint is assumed;
- immutable inquiry snapshots remain a required future contract rule;
- G3 remains not started as a live integration gate.

Commit message:

```bash
git commit -m "docs: coordinate F3E-C frontend status"
```

---

## Final Verification Checklist

- [ ] `/admin/inquiries` renders one final main through the shell and one h1.
- [ ] `/admin/messages` renders one final main through the shell and one h1.
- [ ] Feature components render no nested main.
- [ ] Both normal routes show exact truthful connection and empty-state copy.
- [ ] Neither normal route implies a successful live empty query.
- [ ] Neither normal route displays a numeric operational count.
- [ ] Inquiry normal route documents exactly New, Reviewed, Contacted and Closed.
- [ ] Message normal route documents exactly New, Read, Replied and Closed.
- [ ] Inquiry snapshot policy covers product name, code, option, quantity, line note and general note.
- [ ] Message separation guidance distinguishes general communication from structured product requirements.
- [ ] Normal routes contain no record rows, tables, detail cards, fictional identities or detail links.
- [ ] Normal routes contain no native form, API request, storage, mailto, tel or enabled operational action.
- [ ] Normal routes do not mount `data-preview-only` or F3E-A `AdminEmptyState`.
- [ ] Every Inquiry preview contains the exact Inquiry disclaimer.
- [ ] Every Message preview contains the exact Message disclaimer.
- [ ] Preview identities use only synthetic `Example`/`example.invalid` values.
- [ ] Inquiry product snapshots reuse `INQUIRY_PREVIEW_LINES` and the existing catalogue registry.
- [ ] Preview controls remain disabled and no success claim appears.
- [ ] `/admin/inquiries/*` and `/admin/messages/*` malformed/detail routes return 404.
- [ ] Existing management and deferred admin routes remain intact.
- [ ] Admin noindex metadata remains inherited.
- [ ] Desktop, tablet and mobile routes have no page-level overflow.
- [ ] No `services/api/**` or `packages/contracts/openapi/**` file changed.
- [ ] Completion documentation distinguishes source review from runtime verification.

## Deferred Scope

- Public General Message submission endpoint
- Admin Inquiry and Message list/detail endpoints
- Owner authentication and route guards
- Live record counts and pagination
- Search, filters and sorting
- Inquiry/message status mutation
- Internal-note persistence
- Email, reply or communication-provider integration
- Message-to-inquiry conversion
- Automated classification or detection
- Audit history and assigned-owner workflow
- CRM, reminders, lead scoring, analytics or revenue forecasting
