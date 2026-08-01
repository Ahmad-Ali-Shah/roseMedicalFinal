# Rosa Medical F3E-A Static Admin Foundation Design

**Date:** 2026-08-01  
**Owner:** Ahmad and Ahmad's frontend AI  
**Status:** Approved design specification  
**Repository:** `manbtd0-cloud/RosaMedical`  
**Figma source:** `https://www.figma.com/design/L7LKGItaD2o6tZzHuw1GUQ`

## 1. Purpose

F3E-A establishes the static, owner-only admin foundation for Rosa Medical without introducing authentication, persistence, backend calls or mocked state transitions.

The milestone replaces the current generic admin placeholders for owner access and the dashboard with deliberate, accessible compositions. It also creates the shared admin component system used by F3E-B, F3E-C and F3E-D.

F3E-A is a design and composition preview only. It must never be presented as a secure or operational administration system.

## 2. Scope

### Routes completed in this milestone

- `/admin/login`
- `/admin/recovery`
- `/admin`

### Shared systems completed in this milestone

- Owner-access layout and presentation
- Admin workspace shell
- Grouped admin navigation
- Dashboard overview
- Shared admin headings, sections, statuses, alerts, tables, records, field groups and state previews
- Responsive desktop, tablet and mobile admin foundations
- Admin `noindex` metadata

### Routes deliberately deferred

The shell must link to these routes, but their full management compositions belong to later F3E milestones:

- `/admin/products`
- `/admin/families`
- `/admin/catalogues`
- `/admin/media`
- `/admin/inquiries`
- `/admin/messages`
- `/admin/content`
- `/admin/contact-details`
- `/admin/publishing`
- `/admin/revisions`
- `/admin/settings`

Deferred routes keep deliberate admin placeholders. They must not expose fields or controls that imply working CRUD, publishing or operational behavior.

## 3. Interaction boundary

F3E-A uses the approved static, interaction-honest approach.

### Allowed behavior

- Real internal navigation between admin routes
- Real link back to the public website
- Keyboard focus on links and read-only fields
- Native page scrolling
- Anchor navigation where useful

### Prohibited behavior

- Login submission
- Credential checking
- Session creation or persistence
- Password recovery submission
- Recovery email claims
- Sign-out behavior
- Search, filter, pagination or bulk-action behavior
- Saved changes
- Record deletion
- Publishing actions
- Local storage
- API requests
- MSW handlers
- Cookies or session tokens
- Dedicated routes for preview-only states

Every inactive control must be either disabled or clearly rendered as a noninteractive preview. No control may look enabled while doing nothing.

The normal Login and Recovery compositions must not use a native HTML `<form>`. They use labelled field groups so Enter cannot trigger a browser-native submission. Future interactive milestones may replace those groups with real forms when submission behavior exists.

## 4. Owner-access routes

## 4.1 `/admin/login`

The page contains:

1. ROSA brand identity using the approved unchanged logo treatment
2. `OWNER ACCESS` eyebrow
3. One `h1`: `Sign in to the Rosa workspace.`
4. Short explanation that access is restricted to the single verified owner account
5. One labelled owner-access field group
6. Read-only, labelled email field
7. Read-only, labelled password field
8. Real link to `/admin/recovery`
9. Disabled `Sign in` button
10. Visible notice: authentication is not connected in this static preview
11. Security note that production access requires server-enforced authentication

The page must not include:

- Account-creation links or copy
- Invite-user flow
- Social login
- Multiple roles
- Remember-me state
- Biometric login
- A realistic owner email
- Default credentials
- A successful-login claim

The password field may use `type="password"`, but it remains read-only and empty.

## 4.2 `/admin/recovery`

The page contains:

1. ROSA brand identity
2. `OWNER RECOVERY` eyebrow
3. One `h1`: `Recover owner access.`
4. Explanation that recovery is restricted to the verified owner email configured by the backend
5. One labelled owner-recovery field group
6. Read-only, labelled email field
7. Disabled `Send recovery link` button
8. Real link back to `/admin/login`
9. Visible notice that no email is sent from this static preview
10. Security guidance that the page must not reveal whether an entered address belongs to the owner

The normal route must not show:

- A real owner email
- A partially masked owner email
- A sent-message confirmation
- A countdown
- A token
- An expired-link state
- A reset-password field group

### Isolated recovery previews

Reusable, unmounted components may represent:

- Recovery-sent presentation
- Recovery failure
- Invalid token
- Expired link

Default preview props must not claim that an actual email was delivered or a real token was checked.

## 5. Admin workspace shell

The existing admin shell is replaced with one consistent owner-workspace composition.

### 5.1 Desktop structure

- Left sidebar
- Main workspace column
- Compact top bar inside the workspace column
- Main content region
- Static-preview warning

The sidebar contains:

- ROSA wordmark
- `Owner workspace` label
- Grouped navigation
- Public-site link

The top bar contains:

- Current route label
- Owner-account status: `Owner session not connected`
- Disabled `Sign out` button

The shell is not proof of authorization. A visible warning states that route protection must be enforced by the backend before launch.

### 5.2 Navigation groups

#### Overview

- Dashboard → `/admin`

#### Catalogue

- Products → `/admin/products`
- Families → `/admin/families`
- Catalogues → `/admin/catalogues`
- Media → `/admin/media`

#### Operations

- Inquiries → `/admin/inquiries`
- Messages → `/admin/messages`

#### Website

- Website Content → `/admin/content`
- Contact Details → `/admin/contact-details`

#### Publishing

- Publishing Centre → `/admin/publishing`
- Revisions → `/admin/revisions`

#### System

- Settings → `/admin/settings`

The navigation model is defined once and reused by desktop and mobile layouts. Each item has a stable key, label, href and group.

### 5.3 Current-route treatment

The shell may mark the current route with `aria-current="page"` when the route is known. It must not infer authorization or data availability from the active route.

### 5.4 Mobile structure

Below the tablet breakpoint:

- Sidebar and workspace become one stacked flow
- Navigation is fully visible as grouped links
- No hamburger, disclosure or menu button is shown
- No fixed element hides content
- The public-site link remains available
- The top bar stacks safely

F3E-A does not introduce a menu toggle because interactive shell state belongs to F4.

## 6. Dashboard route

The normal `/admin` route is a source-backed overview, not an analytics dashboard.

### 6.1 Heading

- Eyebrow: `ADMIN OVERVIEW`
- One `h1`: `Rosa workspace overview.`
- Supporting copy explains that this static workspace previews the future owner CMS

### 6.2 Workspace status

A prominent status panel lists:

- Static admin preview
- Backend not connected
- Authentication not active
- Publishing actions unavailable

The panel must not use green success styling.

### 6.3 Catalogue overview

Three facts are derived from existing frontend registries:

- 5 product families
- 20 registered products
- 5 catalogue documents

Each metric links to its relevant admin route.

These counts must be computed from imported records, not copied as unrelated dashboard constants. Tests must prove that the dashboard values match the registries.

### 6.4 Operational data

Inquiries and general messages use unresolved states:

- `Awaiting live data`

They must not display zero, sample counts, trends, percentages or recent activity. Zero would incorrectly imply a live query returned no records.

### 6.5 Launch-readiness queue

The dashboard lists five known dependencies:

1. Contact information awaiting confirmation
2. Catalogue PDF paths awaiting publication
3. Product media awaiting replacement
4. Privacy and Terms awaiting client and qualified legal approval
5. Arabic content deferred

Each item uses a neutral or warning status. None may be presented as completed.

### 6.6 Quick routes

- Products
- Inquiries
- Website Content
- Publishing Centre

Quick routes are navigation links only. They do not carry action verbs such as `Create`, `Publish`, `Resolve` or `Approve` in F3E-A.

### 6.7 Excluded dashboard content

- Revenue
- Orders
- Sales
- Conversion rates
- Traffic charts
- Growth percentages
- Customer names
- Recent inquiry records
- Recent messages
- User activity
- Storage usage
- Uptime claims
- Audit-log events

## 7. Shared admin component system

F3E-A creates reusable, presentation-only components with narrow interfaces.

### 7.1 Structure and headings

- `AdminPageHeader`
- `AdminSection`
- `AdminSectionHeader`
- `AdminActionGroup`

### 7.2 Status and feedback

- `AdminStatusBadge`
- `AdminAlert`
- `AdminEmptyState`
- `AdminLoadingPreview`
- `AdminErrorPreview`
- `AdminUnauthorizedPreview`
- `AdminConfirmationPreview`

Status values required now:

- `neutral`
- `warning`
- `danger`
- `success`
- `draft`
- `review`
- `ready`
- `published`
- `hidden`
- `archived`

F3E-A normal routes may use only states justified by current source. Success, published and destructive confirmation treatments remain component previews.

### 7.3 Metrics

- `AdminStat`
- `AdminUnresolvedMetric`

`AdminUnresolvedMetric` displays a label and `Awaiting live data`; it does not accept a numeric value.

### 7.4 Toolbars and collection controls

- `AdminToolbar`
- `AdminSearchPreview`
- `AdminFilterPreview`
- `AdminPaginationPreview`

Search, filters and pagination are disabled or noninteractive. They include visible text identifying them as preview controls where necessary.

### 7.5 Tables and records

- `AdminDataTable`
- `AdminRecordList`

Requirements:

- Semantic `<table>` structure at desktop where tabular relationships matter
- Visible or screen-reader caption
- `<thead>`, `<th scope="col">` and `<tbody>`
- No clickable row unless a real route is supplied
- No checkbox unless disabled
- No sortable header unless disabled and labelled as preview-only
- Stacked labelled records at narrow widths
- No page-level horizontal overflow

The shared API must not force every future admin collection into the same columns.

### 7.6 Field and editor previews

- `AdminFormSection`
- `AdminFieldPreview`
- `AdminTextareaPreview`
- `AdminSelectPreview`
- `AdminLocaleFieldPair`

Requirements:

- The F3E-A primitives render labelled field groups, not submitting forms
- Every field has a visible label
- Preview values are read-only
- Select previews are disabled
- Hints and errors use associated IDs
- English and Arabic fields remain separate
- Arabic field containers may use `dir="rtl"`
- No Save button is enabled
- No browser-native form submission is possible

`AdminLocaleFieldPair` establishes future paired `en` and `ar` fields without activating translation workflows.

## 8. Preview-state boundaries

Preview-only components are exported for testing and later F4 activation but are not mounted on normal routes.

### 8.1 Authentication previews

- Login loading
- Invalid credentials
- Unauthorized session
- Recovery sent
- Recovery failure
- Invalid recovery token
- Expired recovery link

### 8.2 Collection previews

- Table loading
- Empty collection
- Data-load failure
- Disabled pagination

### 8.3 Mutation previews

- Save confirmation
- Destructive confirmation
- Publish confirmation

Default mutation previews must state that no change has been made. A confirmation component may accept explicit future result props, but default rendering must not invent a saved record, deletion, publication or reference ID.

### 8.4 Route exposure

No preview-only route, query parameter, environment switch or hidden navigation item is added in F3E-A.

## 9. Data architecture

### 9.1 Dashboard sources

- Families derive from `CATALOGUE_FAMILIES`
- Products derive from the F3B catalogue product registry
- Catalogue documents derive from the F3C catalogue-document registry

A focused dashboard selector returns presentation records. The dashboard must not import individual product fixtures directly.

### 9.2 Admin navigation source

One immutable navigation record defines every group and route. Desktop, mobile and tests consume the same record.

### 9.3 No new backend contract

F3E-A does not change:

- `packages/contracts/openapi/**`
- Generated contract types
- Backend service files
- Authentication endpoints
- Admin CRUD endpoints

Authentication and admin endpoints remain future shared-contract work.

## 10. Route architecture

### 10.1 Authentication layout

`/admin/login` and `/admin/recovery` use the owner-access layout. This layout owns the sole `<main>` for those pages.

Each route owns exactly one `<h1>`.

### 10.2 Workspace layout

`/admin` and all workspace subroutes use `AdminShell`. `AdminShell` owns the sole `<main>` for workspace routes.

Dashboard content must not add a nested `<main>`.

### 10.3 Metadata

All `/admin/**` routes include:

```ts
robots: {
  index: false,
  follow: false
}
```

A specification comment and visible warning make clear that `noindex` is not access control.

## 11. Visual system

The admin experience uses the existing Rosa design tokens with a denser operational rhythm.

### 11.1 Colour

- Near-black for primary text and sidebar surfaces
- White and warm off-white for work surfaces
- Rosa red for selected navigation, key labels and controlled emphasis
- Steel greys for metadata and unresolved values
- Warning and danger colours only for real semantic states

The design avoids generic blue SaaS styling, gradients, glassmorphism and excessive rounded cards.

### 11.2 Typography

- Lora for page titles and selected editorial headings
- Inter for navigation, fields, tables, statuses and operational copy
- Compact but readable line lengths

### 11.3 Density

Admin pages are denser than public pages but retain:

- Minimum 44 px interactive targets where controls are enabled
- Clear section spacing
- Readable table rows
- Strong focus visibility
- No information hidden solely behind hover

## 12. Responsive behavior

Target widths:

- Desktop: 1440 px
- Tablet: 768 px
- Mobile: 390 px

### Desktop

- Sidebar and workspace columns
- Multi-column dashboard where content permits
- Semantic tables
- Field pairs

### Tablet

- Stacked shell
- Two-column dashboard sections where safe
- Navigation groups remain fully visible
- Tables may remain tabular only when they fit without page overflow

### Mobile

- Single-column dashboard
- Full-width fields and actions
- Stacked labelled record presentation
- Navigation groups in document flow
- Long labels use `overflow-wrap: anywhere`
- No fixed-height content panels
- End-of-content remains reachable

### Motion and focus

- Existing reduced-motion rules apply
- New transitions are optional and nonessential
- `:focus-visible` remains clearly visible against light and dark surfaces

## 13. Security and honesty requirements

Normal F3E-A routes must never imply:

- A user is authenticated
- Admin routes are protected
- Credentials were checked
- A session exists
- Recovery email was sent
- A reset token was validated
- Data was loaded from a backend
- Changes were saved
- Records were deleted
- Content was published
- Inquiry or message numbers are live

Required user-visible admin warnings:

- Static preview
- Authentication not connected
- Backend not connected
- Production access requires server-enforced owner authentication

These warnings may be concise but cannot be hidden in developer-only comments.

## 14. Accessibility requirements

- Exactly one `<main>` per route
- Exactly one `<h1>` per route
- Labelled owner-access and editor field groups
- Labelled input controls
- Disabled state exposed natively
- Semantic navigation landmarks
- `aria-current="page"` for active admin navigation
- Semantic tables and captions
- Status information not communicated by colour alone
- Loading previews include visible text and appropriate `aria-busy`
- Error previews use an alert role where appropriate
- Confirmation previews use descriptive headings and do not auto-focus in static rendering
- Mobile record labels remain programmatically associated with values
- No inaccessible dead buttons

## 15. Testing and verification

### 15.1 Source and component tests

Tests must prove:

- Login and Recovery each render one `<main>` and one `<h1>`
- Login and Recovery contain no native `<form>`
- Login and Recovery contain no account-creation link or copy such as `Create account`, `Sign up` or `Invite user`
- Owner email values remain empty or generic
- Sign-in, recovery and sign-out buttons are disabled
- Dashboard family count equals the family registry length
- Dashboard product count equals the product registry length
- Dashboard catalogue count equals the catalogue-document registry length
- Inquiry and message metrics render `Awaiting live data`
- Navigation contains every approved admin route exactly once
- Normal routes do not mount preview-only states
- Default confirmations do not claim a mutation occurred
- Locale field pairs expose English and Arabic labels separately
- Tables use semantic headers and captions
- No OpenAPI or backend file is changed

### 15.2 Static policy checks

Static tests reject:

- Account-creation hrefs such as `/admin/register`, `/register` or `/signup`
- User-visible account-creation copy such as `Create account`, `Sign up` or `Invite user`
- Hard-coded owner email addresses
- Default passwords
- Fake sessions
- `localStorage`
- Cookie writes
- Authentication API calls
- Recovery-sent claims on normal routes
- Saved, deleted or published claims on normal routes
- Numeric inquiry or message metrics
- Ecommerce terminology
- Internal phase names in user-visible application copy

The policy test does not reject internal specifications or security documentation merely for discussing the absence of registration.

### 15.3 Browser coverage

Run all three normal routes at:

- 1440 × 1000
- 768 × 1024
- 390 × 844

Browser checks confirm:

- Successful route response
- One main landmark
- One page heading
- No horizontal overflow
- Visible end of content
- Disabled controls remain disabled
- No native form on Login or Recovery
- No account-creation link
- Mobile navigation is fully visible without a dead toggle
- Admin routes contain `noindex` metadata

### 15.4 Runtime evidence

No lint, typecheck, unit, build or Playwright result may be called passing unless the command has been run and its complete output reviewed.

## 16. File organization

Expected feature boundaries:

```text
apps/web/src/features/
├── admin-auth-preview/
├── admin-dashboard/
├── admin-navigation/
├── admin-primitives/
└── admin-routing/
```

Expected supporting style and test boundaries:

```text
apps/web/src/styles/f3e-admin-foundation.css
apps/web/src/test/admin-*.test.tsx
apps/web/src/test/f3e-a-*.static.test.mjs
apps/web/tests/e2e/f3e-a-admin-foundation.spec.ts
```

The implementation plan may adjust exact filenames to match existing conventions, but the architectural boundaries and route behavior are fixed.

## 17. Deferred scope

The following is explicitly outside F3E-A:

- Real or mocked authentication
- Protected-route redirects
- Session expiry
- Working logout
- Password reset fields
- Search and filtering
- Pagination
- CRUD
- Uploads
- Inquiry or message handling
- Draft editing
- Review workflow
- Public preview
- Publishing
- Revision comparison
- Rollback
- Audit log
- Settings mutation
- Arabic editing behavior
- Live API integration

These belong to F4, F5 or the later F3E admin composition milestones.

## 18. Acceptance criteria

F3E-A is source-complete when:

1. Login, Recovery and Dashboard have deliberate static compositions.
2. Owner-access and workspace layouts each own exactly one main landmark.
3. Login and Recovery use labelled field groups rather than submitting forms.
4. The admin shell exposes every approved route without dead navigation toggles.
5. Dashboard catalogue facts derive from existing source registries.
6. Operational metrics remain unresolved instead of fabricated.
7. Shared admin primitives exist for later management screens.
8. Preview-only states remain unmounted on normal routes.
9. No authentication, persistence, mutation or publishing behavior is introduced.
10. Admin metadata is `noindex` and the UI states that this is not security.
11. Desktop, tablet and mobile rules prevent page-level overflow.
12. No backend or OpenAPI file changes.
13. Completion documentation distinguishes source review from runtime verification.
