# F3E-D Governance Implementation Plan Review Corrections

**Date:** 2026-08-02  
**Status:** Binding corrections to `2026-08-02-rosa-medical-f3e-d-governance.md`  
**Execution rule:** Read this file immediately after the main plan. Where these documents conflict, this file controls.

## 1. Move the readiness type with the shared data to avoid an import cycle

The main plan says to type `ADMIN_READINESS_ITEMS` as `AdminReadinessItem[]` while that interface currently lives in `admin-dashboard-model.ts`. Importing the type from Dashboard and importing the array back into Dashboard creates a circular ownership boundary.

Task 2 must move the type into the shared source file.

```ts
import type { AdminStatusTone } from "@/features/admin-primitives";

export type AdminReadinessKey = "contact" | "pdfs" | "media" | "legal" | "arabic";

export type AdminReadinessStatus =
  | "Awaiting confirmation"
  | "Awaiting publication"
  | "Awaiting replacement"
  | "Awaiting legal approval"
  | "Deferred";

export interface AdminReadinessItem {
  key: AdminReadinessKey;
  label: string;
  status: AdminReadinessStatus;
  tone: Extract<AdminStatusTone, "neutral" | "warning">;
}

export const ADMIN_READINESS_ITEMS = [
  {
    key: "contact",
    label: "Contact information",
    status: "Awaiting confirmation",
    tone: "warning"
  },
  {
    key: "pdfs",
    label: "Catalogue PDF paths",
    status: "Awaiting publication",
    tone: "warning"
  },
  {
    key: "media",
    label: "Product media",
    status: "Awaiting replacement",
    tone: "warning"
  },
  {
    key: "legal",
    label: "Privacy and Terms",
    status: "Awaiting legal approval",
    tone: "warning"
  },
  {
    key: "arabic",
    label: "Arabic content",
    status: "Deferred",
    tone: "neutral"
  }
] as const satisfies readonly AdminReadinessItem[];
```

`admin-dashboard-model.ts` removes its local `AdminReadinessItem` declaration and imports both the interface and array from `@/features/admin-governance-source/admin-readiness-model`.

`AdminDashboardModel.readinessItems` remains `readonly AdminReadinessItem[]`.

## 2. Exact public-content block assignments

Task 1 must create the six blocks with these exact metadata assignments.

| Block key | Page key | Label | Public href | Affected component | Sensitivity | Fields |
|---|---|---|---|---|---|---|
| `home.hero` | `home` | `Homepage hero` | `/` | `HomeHero` | `business-positioning` | `eyebrow`, `title`, `copy` |
| `home.support` | `home` | `Homepage procurement support` | `/` | `ProcurementSupport` | `standard` | `eyebrow`, `title`, `copy` |
| `about.introduction` | `about` | `About introduction` | `/about` | `AboutPage` | `business-positioning` | `eyebrow`, `title`, `copy` |
| `procurement.introduction` | `procurement` | `Procurement Support introduction` | `/procurement-support` | `ProcurementSupportPage` | `standard` | `eyebrow`, `title`, `copy` |
| `contact.introduction` | `contact` | `Contact introduction` | `/contact` | `ContactPage` | `contact-routing` | `eyebrow`, `title`, `copy` |
| `footer.description` | `global` | `Footer description` | `/` | `PublicShell` | `business-positioning` | `copy` |

Field keys must be unique within each block. Use these field types:

- eyebrow → `label`
- title → `short-text`
- copy → `long-text`

Use exact character guidance:

- eyebrow: `Keep under 40 characters.`
- title: `Keep under 90 characters.`
- copy: `Keep under 220 characters.`

`getPublicContentBlock(blockKey)` returns the matching block or `undefined` and never fabricates a fallback.

## 3. Exact Contact Details field treatment

Task 4 must not invent a generic locale rule. Render these structures:

- Business name: `AdminLocaleFieldPair`; English uses `Rosa Medical`; Arabic uses `Not supplied`.
- Address: `AdminLocaleFieldPair`; English uses `Awaiting client confirmation`; Arabic uses `Not supplied`.
- Working hours: `AdminLocaleFieldPair`; English uses `Awaiting client confirmation`; Arabic uses `Not supplied`.
- Telephone: one `AdminFieldPreview` using the existing unresolved value.
- WhatsApp: one `AdminFieldPreview` using the existing unresolved value.
- Email: one `AdminFieldPreview` using the existing unresolved value.
- Social profiles: one `AdminFieldPreview` using the existing unresolved value.

No map field exists in the current contact model and none may be added.

The impact map uses these exact rows:

```ts
export const CONTACT_IMPACT_ROWS = [
  {
    key: "contact-page",
    label: "Public Contact page",
    fields: ["Business name", "Address", "Telephone", "WhatsApp", "Email", "Working hours", "Social profiles"],
    status: "Current frontend consumer"
  },
  {
    key: "footer",
    label: "Public footer contact column",
    fields: ["Address", "Telephone", "Email", "Working hours"],
    status: "Not implemented"
  },
  {
    key: "inquiry-confirmation",
    label: "Inquiry confirmation",
    fields: ["Business name", "Email"],
    status: "Not implemented"
  },
  {
    key: "message-confirmation",
    label: "Contact-message confirmation",
    fields: ["Business name", "Email"],
    status: "Not implemented"
  },
  {
    key: "email-templates",
    label: "Future email templates",
    fields: ["Business name", "Email"],
    status: "Not implemented"
  }
] as const satisfies readonly ContactImpactRow[];
```

## 4. Exact Revision schema and protected Settings values

Task 6 must use these ten Revision schema labels in this exact order:

```ts
export const REVISION_SCHEMA_FIELDS = [
  "Record type",
  "Record identifier",
  "Changed fields",
  "Previous values",
  "Proposed values",
  "Save time",
  "Publish time",
  "Action",
  "Restored revision identifier",
  "Owner-session identifier"
] as const;
```

These are documentation labels only. No example values accompany them.

Use these protected Settings values in this exact order:

```ts
export const PROTECTED_SYSTEM_SETTINGS = [
  "ROSA identity",
  "Lora and Inter typography",
  "Brand palette",
  "Design tokens",
  "Component library",
  "Public templates",
  "Route structure",
  "Navigation",
  "Security policy",
  "Data retention",
  "Backend infrastructure"
] as const;
```

The expected count is eleven, not ten.

## 5. Stable preview component export names

Task 7 must use these exact exports so tests and later F4 work have stable interfaces.

### Content — 9

- `AdminContentBlockEditorPreview`
- `AdminContentLocaleEditingPreview`
- `AdminContentValidationWarningPreview`
- `AdminContentSensitiveCopyWarningPreview`
- `AdminContentSaveLoadingPreview`
- `AdminContentSaveFailurePreview`
- `AdminContentSaveConfirmationPreview`
- `AdminContentReviewConfirmationPreview`
- `AdminContentPublicComparisonPreview`

### Contact — 7

- `AdminContactEditedDraftPreview`
- `AdminContactUnresolvedValidationPreview`
- `AdminContactAffectedLocationsPreview`
- `AdminContactSaveLoadingPreview`
- `AdminContactSaveFailurePreview`
- `AdminContactReviewConfirmationPreview`
- `AdminContactPublicationConfirmationPreview`

### Publishing — 8

- `AdminPublishingPopulatedQueuePreview`
- `AdminPublishingValidationFailuresPreview`
- `AdminPublishingReviewDetailPreview`
- `AdminPublishingReauthenticationPreview`
- `AdminPublishingConfirmationPreview`
- `AdminPublishingFailurePreview`
- `AdminPublishingSuccessPreview`
- `AdminPublishingRecentListPreview`

### Revisions — 5

- `AdminRevisionPopulatedListPreview`
- `AdminRevisionFieldComparisonPreview`
- `AdminRevisionRestoreConfirmationPreview`
- `AdminRevisionRestoreFailurePreview`
- `AdminRevisionRestoreSuccessPreview`

### Settings — 6

- `AdminSettingsPasswordChangePreview`
- `AdminSettingsNotificationValidationPreview`
- `AdminSettingsSaveLoadingPreview`
- `AdminSettingsSaveFailurePreview`
- `AdminSettingsSaveSuccessPreview`
- `AdminSettingsProtectedWarningPreview`

Each domain test imports these components directly from its preview file, not from the normal route module.

## 6. Exact static-policy scan boundary

Task 10 scans only these normal or shared files:

```js
const normalFiles = [
  "features/public-content-registry/public-content-values.ts",
  "features/public-content-registry/public-content-registry.ts",
  "features/admin-governance-source/admin-readiness-model.ts",
  "features/admin-governance-source/contact-impact-model.ts",
  "features/admin-content/admin-content-model.ts",
  "features/admin-content/admin-content-page.tsx",
  "features/admin-contact-details/admin-contact-details-model.ts",
  "features/admin-contact-details/admin-contact-details-page.tsx",
  "features/admin-publishing/admin-publishing-model.ts",
  "features/admin-publishing/admin-publishing-page.tsx",
  "features/admin-revisions/admin-revision-policy.ts",
  "features/admin-revisions/admin-revisions-page.tsx",
  "features/admin-settings/admin-settings-model.ts",
  "features/admin-settings/admin-settings-page.tsx",
  "features/admin-governance-routing/admin-governance-route-model.ts",
  "features/admin-governance-routing/admin-governance-route-view.tsx",
  "app/admin/(workspace)/[...segments]/page.tsx"
];
```

Do not scan preview files with the normal-route prohibited patterns because preview files intentionally contain operational example labels. Add a separate preview-policy test section that checks all five preview files for `data-preview-only` and the no-operation disclaimer.

## 7. Catch-all route structural assertion

The static policy test must read the catch-all source separately and assert:

```js
assert.doesNotMatch(catchAllSource, /AdminDeferredRoutePage/);
assert.doesNotMatch(catchAllSource, /getAdminNavigationItem/);
assert.match(catchAllSource, /resolveAdminManagementRoute/);
assert.match(catchAllSource, /resolveAdminOperationsRoute/);
assert.match(catchAllSource, /resolveAdminGovernanceRoute/);
assert.match(catchAllSource, /notFound\(\)/);
```

The route-view source must satisfy:

```js
assert.doesNotMatch(routeViewSource, /return\s+null/);
assert.doesNotMatch(routeViewSource, /from ["'][^"']+\/index["']/);
assert.match(routeViewSource, /admin-content-page/);
assert.match(routeViewSource, /admin-contact-details-page/);
assert.match(routeViewSource, /admin-publishing-page/);
assert.match(routeViewSource, /admin-revisions-page/);
assert.match(routeViewSource, /admin-settings-page/);
```

## 8. Final self-review result

After applying these corrections, the plan has:

- no shared-readiness import cycle;
- exact six-block public-content metadata and field treatment;
- exact source-backed Contact Details fields and impact rows;
- explicit Revision and protected Settings inventories;
- stable preview component interfaces and counts;
- a policy scan that distinguishes normal source from intentional previews;
- final catch-all routing that cannot silently retain a generic known-route placeholder or return a blank successful response.
