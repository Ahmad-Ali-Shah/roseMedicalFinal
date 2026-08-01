# Rosa Medical F3E-C Quotation Inquiries and General Messages Design Specification

**Status:** Approved design specification  
**Date:** 2026-08-01  
**Implementation phase:** F3E-C  
**Design source:** Figma page `26 Admin Inquiries & Messages`, especially nodes `49:3`, `49:101`, `49:194`, `49:277`, and `49:325`  
**Base branch:** `frontend/f3e-b-catalogue-management`  
**Design branch:** `frontend/f3e-c-operations-design`

## 1. Purpose

F3E-C replaces the remaining Inquiries and Messages admin placeholders with complete, truthful operations compositions while no live inquiry or general-message source exists.

The milestone must:

- preserve quotation inquiries and general messages as separate systems;
- explain their future workflows without implying current customer activity;
- show honest empty normal routes;
- keep every populated list, detail, mutation, classification and communication state isolated as a demonstration preview;
- preserve the immutable submitted-product-snapshot rule for future inquiries;
- introduce no backend contract, API call, persistence, authentication or communication behavior.

F3E-C is a static design and composition milestone. It is not an operational inbox, CRM, email client or submission system.

## 2. Locked honesty decision

The approved approach is **truthful empty normal routes**.

Normal routes must not display:

- fictional inquiry or message rows;
- fictional references or IDs;
- fictional people, organisations, emails, telephone numbers or countries;
- fictional timestamps, submission dates or communication history;
- fictional product quantities or customer notes;
- fictional status distribution or record counts;
- fictional internal notes;
- fake open-email, copy, reply, conversion, save-note or status-change actions;
- fake detection, classification or conversion results.

The populated Figma records are visual and workflow references only. They must not become normal-route application data.

## 3. Normal route inventory

F3E-C owns exactly these normal routes:

```text
/admin/inquiries
/admin/messages
```

No record detail route is public in F3E-C because no real record ID exists.

These paths must return not-found:

```text
/admin/inquiries/[id]
/admin/messages/[id]
/admin/inquiries/[id]/...
/admin/messages/[id]/...
```

Any malformed or deeper route under `inquiries` or `messages` is also not-found.

The existing F3E-A shell remains the sole workspace layout. Every normal F3E-C route therefore inherits:

- one owner-workspace `<main>`;
- grouped admin navigation;
- visible static-preview and authentication warnings;
- disabled sign-out control;
- admin-wide `noindex` and `nofollow` metadata;
- explicit copy that `noindex` is not access control.

## 4. Quotation Inquiries normal route

### 4.1 Page identity

`/admin/inquiries` renders:

- eyebrow: `Quotation inquiries`;
- heading: `Product requirements awaiting connection.`;
- description: future submitted product snapshots remain attached to the inquiry even if catalogue records change later.

The page contains exactly one `<h1>` and does not create another `<main>`.

### 4.2 Connection warning

The first operational panel states:

- `No live inquiry source is connected.`
- The frontend has not queried or loaded customer submissions.
- No current record count, status count or last-sync time is available.
- Authentication and protected admin inquiry endpoints remain future work.

The panel must not display `0 inquiries`, `0 new`, `No new inquiries today`, or any wording that implies a successful live query returned an empty collection.

### 4.3 Disabled collection controls

The page displays the future collection-control shape using F3E-A primitives:

- read-only search labelled `Search inquiries`;
- disabled status filter with options `All inquiry states`, `New`, `Reviewed`, `Contacted`, `Closed`;
- disabled country filter containing only `All countries`;
- disabled pagination preview.

Visible supporting copy states that search, filtering and pagination require authenticated live records.

No control has an action, handler, query parameter, client state or persistence.

### 4.4 Empty state

The normal collection body renders a single truthful empty state:

- heading: `No live quotation inquiries are available.`;
- description: `The current frontend has no persisted customer submissions to display.`;
- supporting copy directs the owner to the future backend integration rather than a fake create-record action.

It renders no table, mobile record list, customer row, reference, open link or detail card.

### 4.5 Intended inquiry workflow

The page documents exactly four future statuses:

1. `New` — submission has entered the protected owner queue and needs review.
2. `Reviewed` — requirements and submitted snapshots have been checked.
3. `Contacted` — the owner has initiated an external conversation.
4. `Closed` — the inquiry no longer requires active follow-up.

This section is labelled `Intended workflow`, not `Current workflow`, and explicitly states that it describes future status vocabulary rather than current records.

The workflow does not add:

- sales stages;
- assigned agents;
- reminders;
- priorities;
- lead scores;
- opportunities;
- conversion probability;
- revenue forecasting;
- automatic follow-up.

### 4.6 Preserved snapshot policy

The page contains a policy section explaining that each future inquiry line preserves the customer-submitted snapshot of:

- product name;
- product code;
- chosen size, variant, direction or other documented option when supplied;
- quantity;
- line note when supplied.

The inquiry also preserves the general customer note when supplied.

Later catalogue edits must not rewrite these submitted values. The admin detail view may link to the current public product, but the submitted snapshot remains the inquiry record shown for review.

### 4.7 Lightweight owner scope

The normal page states that the planned first owner queue is lightweight:

- latest submissions;
- basic search;
- status filtering;
- country filtering only when the future contract supplies country;
- read-only submitted details;
- private owner note;
- four statuses.

The normal route must not claim that a latest-20 limit already exists. It may document `The initial live queue is planned to request a bounded latest-submission page` without asserting an exact backend limit before contract agreement.

## 5. General Messages normal route

### 5.1 Page identity

`/admin/messages` renders:

- eyebrow: `General messages`;
- heading: `Contact messages remain separate.`;
- description: general company, catalogue and contact questions are not quotation inquiries unless structured product pricing, quantities, variants or instrument requirements are involved.

The page contains exactly one `<h1>` and inherits the shell `<main>`.

### 5.2 Connection warning

The first operational panel states:

- `No live message source is connected.`
- The frontend has not loaded contact-form submissions.
- No unread, read, replied or closed count is available.
- No email or reply provider is connected.

It must not display `0 messages`, `Inbox empty`, `All caught up`, or any wording that implies a successful live inbox query.

### 5.3 Disabled collection controls

The page displays:

- read-only search labelled `Search messages`;
- disabled status filter with `All message states`, `New`, `Read`, `Replied`, `Closed`;
- disabled pagination preview.

A country filter is excluded from the normal Messages page until a future message contract explicitly includes country.

No control has a handler, action, query state or persistence.

### 5.4 Empty state

The normal collection body renders:

- heading: `No live general messages are available.`;
- description: `The current frontend has no persisted contact messages to display.`

It renders no fictional sender, company, subject, country, timestamp, status badge, row, open action or detail panel.

### 5.5 Message separation guidance

The page explains:

**Remain in General Messages**

- company-information questions;
- catalogue-availability questions that do not identify products or quantities;
- contact-information questions;
- distributor or procurement introduction messages without a structured product requirement;
- other general business communication.

**Use the Quotation Inquiry flow**

- product pricing requests;
- product quantity requests;
- selected instrument codes;
- requested sizes, variants or directions;
- product-line notes;
- multiple product requirements that need an immutable submission snapshot.

This is owner guidance only. F3E-C does not implement automatic classification, keyword detection, message conversion or record creation.

### 5.6 Intended message workflow

The page documents exactly four future statuses:

1. `New` — a message has entered the protected owner queue.
2. `Read` — the owner has reviewed the message.
3. `Replied` — the owner has responded using a future external communication workflow.
4. `Closed` — the message no longer requires active follow-up.

The page must not claim that email was opened, sent, delivered or replied to.

## 6. Shared normal-route operational boundaries

Both normal routes:

- contain no native `<form>`;
- contain no enabled operational button;
- contain no `mailto:`, `tel:`, WhatsApp or external communication action;
- contain no file input;
- contain no API request;
- contain no local or session storage;
- contain no client-side record dataset;
- contain no detail route link;
- contain no `data-preview-only` content;
- contain no fake success, failure, loading or mutation state;
- display no numeric operational count;
- preserve the existing static owner-session warning.

## 7. Inquiry demonstration-preview system

Populated and operational inquiry states exist only as exported, unmounted preview components. Every root preview component renders:

```html
data-preview-only="true"
```

Every preview contains the visible disclaimer:

> Demonstration preview only. No customer record was loaded or changed.

### 7.1 Inquiry previews

Required isolated components:

- populated inquiry-list preview;
- inquiry-list loading preview;
- inquiry-list load-failure preview;
- inquiry no-results preview;
- inquiry-detail preview;
- mobile inquiry-detail preview;
- status-transition preview;
- internal-note editing preview;
- mark-reviewed confirmation preview;
- mark-contacted confirmation preview;
- close-inquiry confirmation preview;
- open-email action preview;
- snapshot-preservation warning preview.

### 7.2 Synthetic preview identity rules

Preview records use unmistakably synthetic values only:

- reference: `EXAMPLE-INQUIRY`;
- buyer: `Example buyer`;
- organisation: `Example organisation`;
- email: `buyer@example.invalid`;
- telephone: `Not supplied`;
- country: `Example country`;
- timestamp label: `Example submission time`;
- general note: `Example customer note for layout review.`;
- internal note: `Example private owner note.`

No realistic customer identity, business, telephone number, country/timestamp combination or email domain may be used.

### 7.3 Source-backed product snapshots

The inquiry detail preview may reuse the existing public `INQUIRY_PREVIEW_LINES` structure and catalogue registry records. It must not create a second product catalogue.

Each snapshot displays:

- source-backed product name;
- source-backed code;
- one source-backed size or variant when available;
- synthetic preview quantity;
- synthetic line-note placeholder;
- `Submitted snapshot` label;
- statement that the snapshot is a demonstration only.

Preview quantities are layout fixtures, not customer data.

### 7.4 Inquiry detail structure

The isolated detail preview follows the approved visual hierarchy:

1. Reference and synthetic preview identity.
2. One intended workflow status.
3. Read-only contact fields.
4. Source-backed submitted product snapshots.
5. Synthetic general customer note.
6. Read-only internal-note preview.
7. Disabled status selector.
8. Disabled Open email, Save note, Mark reviewed, Mark contacted and Close inquiry actions.
9. Snapshot-preservation warning.

No native form is mounted.

### 7.5 Inquiry confirmation rules

Confirmation previews state that no operation occurred. They may show the proposed target status but must not display:

- success references;
- saved timestamps;
- changed-by identity;
- sent-email claims;
- persisted notes;
- updated counters.

## 8. Message demonstration-preview system

Every Message preview root renders:

```html
data-preview-only="true"
```

Every preview contains:

> Demonstration preview only. No message was classified, updated, replied to or converted.

### 8.1 Message previews

Required isolated components:

- populated message-list preview;
- message-list loading preview;
- message-list failure preview;
- message no-results preview;
- general-message detail preview;
- mobile message-detail preview;
- pricing-and-quantity guidance preview;
- mark-read confirmation preview;
- mark-replied confirmation preview;
- close-message confirmation preview;
- internal-note preview;
- convert-to-inquiry guidance preview.

### 8.2 Synthetic message identity rules

Use only:

- subject: `Example general message`;
- sender: `Example sender`;
- organisation: `Example organisation`;
- email: `sender@example.invalid`;
- country: `Not supplied` unless a preview explicitly demonstrates an optional field, in which case use `Example country`;
- timestamp: `Example submission time`;
- body: `Example message body for layout review.`;
- internal note: `Example private owner note.`

No Figma customer names, companies, countries, dates or realistic contact details enter source code.

### 8.3 Manual classification guidance

The pricing-and-quantity state is labelled `Manual review guidance`.

It may explain that a message mentioning product pricing, quantities, variants or instrument codes should be routed into a structured quotation workflow. It must not claim:

- detection occurred;
- AI classified the message;
- keywords were scanned;
- an inquiry was created;
- data was copied;
- the original message was linked or closed.

The `Create inquiry route` control remains disabled and its preview states that the conversion contract does not exist.

### 8.4 Message detail structure

The isolated detail preview contains:

1. Synthetic subject and sender identity.
2. Intended message status.
3. Read-only email, organisation and optional country fields.
4. Synthetic message body.
5. Separation/quotation guidance.
6. Read-only internal-note preview.
7. Disabled status selector.
8. Disabled Open email, Create inquiry route, Save note, Mark read, Mark replied and Close message actions.

No native form or email composer is mounted.

## 9. Status vocabularies

### 9.1 Inquiry statuses

```ts
export const ADMIN_INQUIRY_WORKFLOW = [
  "New",
  "Reviewed",
  "Contacted",
  "Closed"
] as const;
```

### 9.2 Message statuses

```ts
export const ADMIN_MESSAGE_WORKFLOW = [
  "New",
  "Read",
  "Replied",
  "Closed"
] as const;
```

These constants are workflow vocabulary, not record datasets.

Status tone guidance:

- `New`: warning/accent attention;
- `Reviewed` and `Read`: neutral or review tone;
- `Contacted` and `Replied`: success-ready tone without claiming completion;
- `Closed`: neutral/archived tone.

Normal-route workflow guides may render these status labels. Normal routes must not show a current status badge attached to a record.

## 10. Architecture

```text
apps/web/src/features/
├── admin-inquiries/
│   ├── admin-inquiry-workflow.ts
│   ├── admin-inquiries-page.tsx
│   ├── admin-inquiry-empty-state.tsx
│   ├── admin-inquiry-detail-preview.tsx
│   ├── admin-inquiry-list-preview.tsx
│   ├── admin-inquiry-preview-states.tsx
│   └── index.ts
├── admin-messages/
│   ├── admin-message-workflow.ts
│   ├── admin-messages-page.tsx
│   ├── admin-message-separation-guide.tsx
│   ├── admin-message-empty-state.tsx
│   ├── admin-message-detail-preview.tsx
│   ├── admin-message-list-preview.tsx
│   ├── admin-message-preview-states.tsx
│   └── index.ts
└── admin-operations-routing/
    ├── admin-operations-route-model.ts
    ├── admin-operations-route-view.tsx
    └── index.ts
```

F3E-C reuses:

- F3E-A admin shell and navigation;
- F3E-A page header, sections, alerts, status badges, disabled collection controls, fields, empty/loading/error and confirmation primitives;
- F3E-B catch-all route composition pattern;
- existing public `inquiry-preview` product structures;
- existing catalogue registry and public product helpers.

F3E-C does not create:

- `ADMIN_INQUIRIES`;
- `ADMIN_MESSAGES`;
- mock normal-route record arrays;
- fake inbox fixtures;
- a second product source;
- a communication provider abstraction;
- an API adapter.

## 11. Exact route resolution

The operations resolver owns only:

```text
["inquiries"]
["messages"]
```

Its result union is:

```ts
type AdminOperationsRouteResult =
  | { kind: "inquiries" }
  | { kind: "messages" }
  | { kind: "not-found" };
```

The catch-all route resolves in this order:

1. F3E-B Product, Family, Catalogue and Media routes.
2. F3E-C Inquiries and Messages exact list routes.
3. If the first segment belongs to either resolver but the exact shape failed, return not-found.
4. Keep F3E-A informational placeholders for Website Content, Contact Details, Publishing, Revisions and Settings.
5. Unknown roots return not-found.

`AdminOperationsRouteView` must call `notFound()` rather than return `null` for a `not-found` result.

No detail preview component is referenced by the normal route resolver.

## 12. Visual direction

The approved Figma layout is adapted to the existing Rosa admin system rather than copied literally.

Preserve:

- warm off-white workspace background;
- editorial Lora headings;
- compact Inter labels and body text;
- white bordered operational panels;
- restrained red accents;
- clear separation between controls, empty state, workflow and policy guidance;
- dense but readable owner-workspace rhythm.

Correct Figma assumptions:

- replace `Secure session` with the existing truthful session warning;
- remove fictional rows and details from normal routes;
- remove realistic customer contact information;
- remove current counts and timestamps;
- remove enabled email and status controls;
- remove dead mobile menu behavior;
- use the existing F3E-A shell rather than duplicating sidebar/topbar markup.

No gradients, glassmorphism, stock medical imagery, oversized cards or dashboard charts enter this milestone.

## 13. Responsive behavior

Target viewports:

- desktop: 1440 × 1000;
- tablet: 768 × 1024;
- mobile: 390 × 844.

Normal-route requirements:

- toolbar controls use a three-column Inquiry layout and two-column Message layout at desktop;
- controls stack at tablet and mobile widths;
- empty states remain compact and do not force an artificial full-screen panel;
- workflow steps use a horizontal sequence at desktop and a vertical ordered list at mobile;
- policy and separation guidance switch from columns to one stacked flow;
- disabled pagination controls remain readable and wrap safely;
- admin navigation remains fully visible through the F3E-A shell with no menu toggle;
- no page-level horizontal overflow.

Preview-detail requirements:

- contact and metadata definition lists collapse to one column;
- inquiry product snapshots use a compact labelled layout;
- note and internal-review sections stack;
- disabled action groups become full-width stacked controls on mobile;
- long synthetic references, notes and disclaimers use `overflow-wrap: anywhere`;
- no fixed content heights;
- reduced-motion preference removes nonessential transitions.

## 14. Accessibility requirements

- One `<main>` per route, owned by the shell.
- One `<h1>` per normal route.
- Workflow sections use ordered lists.
- Workflow status explanation remains available in text, not colour alone.
- Empty states use headings and descriptive paragraphs.
- Search previews have visible labels and read-only semantics.
- Filters and pagination are actually disabled.
- No disabled control is represented as an active link.
- Preview disclaimers are visible text, not only data attributes.
- Loading previews use `aria-busy="true"`.
- Failure previews use `role="alert"`.
- Informational connection warnings use `role="status"` or the existing nonurgent alert semantics.
- Synthetic detail fields use semantic definition lists or labelled read-only fields.
- No copied-value button exists without real clipboard behavior.
- Focus-visible styling remains inherited from the admin system.

## 15. Verification requirements

### 15.1 Normal-route composition

Tests must confirm:

- `/admin/inquiries` route composition has one `<h1>` and no nested `<main>`;
- `/admin/messages` route composition has one `<h1>` and no nested `<main>`;
- Inquiry empty-state heading is present;
- Message empty-state heading is present;
- neither page contains a native form;
- neither page contains a table, record-list row or detail card;
- neither page contains a numeric operational count;
- normal routes contain no `data-preview-only`;
- normal routes contain no fictional identity, reference, email, telephone, timestamp or company;
- normal routes contain no `mailto:`, `tel:` or enabled operational action;
- all search controls are read-only;
- all filters and pagination controls are disabled.

### 15.2 Workflow vocabulary

Tests must confirm:

- inquiry workflow is exactly `New`, `Reviewed`, `Contacted`, `Closed`;
- message workflow is exactly `New`, `Read`, `Replied`, `Closed`;
- the two systems use separate constants and components;
- normal routes describe intended workflow rather than current activity.

### 15.3 Route strictness

Tests must confirm:

- `["inquiries"]` resolves to Inquiries;
- `["messages"]` resolves to Messages;
- `["inquiries", "example"]` returns not-found;
- `["messages", "example"]` returns not-found;
- every deeper shape under either root returns not-found;
- F3E-B routes continue to resolve unchanged;
- untouched F3E-A roots continue to use their informational placeholders.

### 15.4 Preview isolation

Tests must confirm:

- every required Inquiry preview root has `data-preview-only="true"`;
- every required Message preview root has `data-preview-only="true"`;
- every Inquiry preview includes its exact no-record-loaded disclaimer;
- every Message preview includes its exact no-classification/update/reply/conversion disclaimer;
- previews contain no realistic identity or contact data;
- preview detail components are absent from the normal route view imports and switch cases;
- all preview mutation and communication actions are disabled;
- preview components contain no native form.

### 15.5 Source reuse

Tests must confirm:

- inquiry product snapshots derive from the existing inquiry-preview/catalogue registry structures;
- no new product catalogue constant is introduced;
- normal operations routes introduce no record dataset;
- workflow constants contain only status vocabulary.

### 15.6 Browser coverage

At 1440 × 1000, 768 × 1024 and 390 × 844, Playwright must verify:

- successful response for `/admin/inquiries` and `/admin/messages`;
- exactly one `<main>` and one `<h1>`;
- inherited `noindex` metadata;
- no `data-preview-only`;
- no native form;
- no horizontal page overflow;
- empty-state content is visible;
- final workflow/policy content is reachable;
- no enabled operational button;
- strict detail paths return 404.

Runtime checks may only be reported as passed after fresh command output confirms them.

## 16. Backend and OpenAPI boundary

F3E-C does not define, assume or modify:

- admin inquiry-list endpoint;
- admin inquiry-detail endpoint;
- admin inquiry-status endpoint;
- admin inquiry-internal-note endpoint;
- admin message-list endpoint;
- admin message-detail endpoint;
- admin message-status endpoint;
- admin message-internal-note endpoint;
- public general-message submission endpoint;
- message-to-inquiry conversion endpoint;
- email/reply endpoint;
- clipboard endpoint;
- customer-contact provider;
- pagination, search or filter query contract.

No file under `services/api/**` or `packages/contracts/openapi/**` changes in F3E-C.

A later shared contract decision must establish:

- protected owner authentication requirements;
- list/detail response models;
- stable status enums;
- immutable inquiry snapshot shape;
- internal-note privacy and audit rules;
- pagination and filtering semantics;
- idempotent status/note mutation behavior;
- message submission and separation behavior;
- whether message-to-inquiry conversion exists;
- email integration responsibilities.

## 17. Deferred scope

- Real inquiry or message records
- Detail routes for real IDs
- Authentication and route guards
- Search, filters and pagination behavior
- Live record counts
- Status mutations
- Internal-note saving
- Email opening, sending or reply tracking
- Clipboard behavior
- Automatic message classification
- Message-to-inquiry conversion
- Customer communication history
- Assignments, reminders, priorities or CRM features
- Audit logs
- Backend integration
- Arabic operations content

## 18. Acceptance boundary

F3E-C is complete at source level when:

- both normal operations routes replace their F3E-A placeholders;
- both normal routes remain truthfully empty;
- the two workflow vocabularies and separation rules are clearly documented;
- all populated and operational states remain isolated demonstrations;
- route ownership is strict;
- responsive and accessibility requirements are represented in code and tests;
- no backend/OpenAPI changes occur;
- completion documentation distinguishes source review from runtime verification.
