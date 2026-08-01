# F3E-D Governance Design Review Corrections

**Date:** 2026-08-02  
**Status:** Binding corrections to `2026-08-02-rosa-medical-f3e-d-governance-design.md`  
**Execution rule:** Read this file immediately after the main specification. Where the documents conflict, this correction file controls.

## 1. Public content blocks use field collections, not one forced string

The main specification defines one `englishValue` and one `arabicValue` per content block. That is too narrow for public sections that may contain more than one approved textual field, such as an eyebrow, heading, supporting paragraph or CTA label.

F3E-D must preserve the exact existing public output and must not collapse or concatenate unrelated fields merely to fit the admin model.

Use this shape instead:

```ts
export interface PublicContentField {
  fieldKey: string;
  label: string;
  englishValue: string;
  arabicValue: null;
  fieldType: "short-text" | "long-text" | "label";
  characterGuidance: string;
}

export interface PublicContentBlock {
  blockKey:
    | "home.hero"
    | "home.support"
    | "about.introduction"
    | "procurement.introduction"
    | "contact.introduction"
    | "footer.description";
  pageKey: PublicContentPageKey;
  label: string;
  fields: readonly PublicContentField[];
  publicHref: Route<string>;
  affectedComponent: string;
  sensitivity: PublicContentSensitivity;
}
```

Rules:

- There are still exactly six approved block records.
- Each block contains one or more fields extracted from the actual public component.
- Every current public string governed by that block is exported from the shared record and consumed by the public component.
- The refactor must not change rendered public copy, punctuation, hierarchy or links.
- Admin Content renders every field separately with a visible label.
- No block or field receives draft, publication, translation-completion, author, timestamp or revision metadata.

Tests must compare public rendered output before and after extraction or assert exact source strings through the shared registry.

## 2. Workflow vocabulary is allowed only as clearly labelled guidance or disabled future actions

The main specification's prohibited-copy section is overly broad. Words such as `Draft`, `Review`, `Publish` and `Revision History` are required to document the intended governance model and label disabled future actions.

The corrected policy is:

### Allowed on normal routes

- `Save draft`, `Submit for review`, `Publish`, `Revision History` and similar text on disabled controls.
- Draft → Review → Public Preview → Explicit Publish → Revision History inside a section explicitly labelled `Intended workflow` or `Future governance model`.
- Policy statements explaining that publishing and revision history are not connected.

### Prohibited on normal routes

- A content block, queue item, contact value or settings record labelled as currently Draft, Published, Needs review, Ready, Current or Available.
- Numeric queue counts.
- A successful save, review, preview-build, publication, rollback or settings claim.
- A timestamp, author or revision identifier attached to a current record.
- Arabic completion statuses or percentages.

Static policy tests must target operational record markup and known fictional values rather than globally rejecting governance words.

Recommended normal-record markers:

```html
<article data-admin-content-record="true">...</article>
<section data-admin-publishing-empty-state="true">...</section>
<section data-admin-revision-empty-state="true">...</section>
```

Tests inspect those regions for current-state claims while permitting guidance sections elsewhere.

## 3. Contact impact mapping requires explicit source-supported consumers

The Contact Details page must not infer that a value is consumed merely because Figma says it is.

Create a typed impact mapping beside the existing public contact-information model:

```ts
export interface ContactInformationImpact {
  contactKey: ContactInformationKey;
  consumers: readonly {
    label: string;
    href?: Route<string>;
    implementationState: "current" | "preview-only" | "not-implemented";
  }[];
}
```

Rules:

- `current` is used only when a production public component imports or renders that contact value.
- `preview-only` is used only when an existing isolated preview imports or renders that value.
- `not-implemented` may document future email templates, but it must not claim that a template, recipient or delivery system exists.
- Counts shown in the impact map are derived from this mapping, not copied from Figma.
- The Footer appears only for values it actually consumes after the shared model refactor.
- Inquiry and Contact confirmation previews appear only if their modules are explicitly updated to consume the shared contact model.
- No impact row implies successful email delivery or active communication behavior.

## 4. Normal route imports must bypass preview-exporting barrels

A domain `index.ts` may export both normal and preview components for tests, but the route dependency graph must not import such a barrel.

The governance route view imports normal pages directly:

```ts
import { AdminContentPage } from "@/features/admin-content/admin-content-page";
import { AdminContactDetailsPage } from "@/features/admin-contact-details/admin-contact-details-page";
import { AdminPublishingPage } from "@/features/admin-publishing/admin-publishing-page";
import { AdminRevisionsPage } from "@/features/admin-revisions/admin-revisions-page";
import { AdminSettingsPage } from "@/features/admin-settings/admin-settings-page";
```

Normal page modules may import only normal models/components. They must not import:

- `*-previews.tsx`
- preview fixtures
- an index barrel that re-exports preview modules

The static policy test recursively checks direct imports for the route view and five normal page modules.

## 5. Shared-source extraction must be output-preserving

Moving public copy or contact values into shared registries is a refactor, not a content revision.

Implementation requirements:

- Preserve exact current English copy.
- Preserve current DOM hierarchy unless a minimal import substitution is required.
- Preserve route links and accessible labels.
- Do not add Arabic text.
- Do not replace current copy with the Figma example wording when the repository differs.
- Do not make unresolved contact values actionable.
- Add focused regression tests for each modified public component.

## 6. Launch-readiness blockers remain one shared source

The Publishing Centre must consume the existing F3E-A launch-readiness selector/model directly. It must not copy the five blocker objects into an F3E-D file.

If the existing model is embedded inside the dashboard module, extract it into a shared normal-only selector module and update the dashboard and publishing page to consume the same source. The visible dashboard output must remain unchanged.

## 7. Strict route completion

After F3E-D, the catch-all route must not use `AdminDeferredRoutePage` for any path.

- Exact F3E-B, F3E-C and F3E-D paths resolve.
- Malformed paths under owned roots call `notFound()`.
- Unknown roots call `notFound()`.
- The route view never returns `null`.

`AdminDeferredRoutePage` may remain temporarily in source if no normal route imports it, but the implementation plan should remove it when safe and update tests to prove zero route references remain.

## 8. Settings values are category states, not editable records

Normal Settings may use read-only fields for visual consistency, but they must be labelled as connection/configuration state. Do not present them as saved owner preferences.

Use exact categories and values:

- Owner authentication — `Not connected`
- Owner email — `Unavailable until authenticated configuration exists`
- Password management — `Not connected`
- Recovery configuration — `Not connected`
- General-message notification recipient — `Not configured`
- Quotation notification recipient — `Not configured`
- Email provider — `Not connected`
- Draft preview environment — `Not connected`
- Preview URL — `Not configured`
- Arabic public launch — `Deferred`
- Arabic fields — `Structurally supported`
- Arabic publishing — `Protected until content review and production gate`
- Managed uploads — `Not connected`
- Catalogue PDF storage — `Not connected`
- Deployment publishing — `Not connected`
- Revision persistence — `Not connected`

No switch, checkbox or select may imply that these values are currently changeable.

## 9. Self-review result

With these corrections, the approved design is internally consistent and implementable:

- six shared content blocks can represent exact multi-field public sections;
- public copy extraction remains output-preserving;
- workflow guidance is permitted without inventing record states;
- contact consumers are explicit and source-supported;
- publishing blockers remain one shared model;
- normal route imports cannot pull preview fixtures into their dependency graph;
- every remaining admin route has strict ownership;
- settings remain truthful connection-state documentation;
- no backend or OpenAPI contract is assumed.
