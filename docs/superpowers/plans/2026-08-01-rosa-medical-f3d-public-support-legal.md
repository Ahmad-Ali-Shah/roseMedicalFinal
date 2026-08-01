# Rosa Medical F3D — Public Support, Search and Legal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the six remaining public placeholders with complete static About, Procurement Support, Contact, Search, Privacy and Terms compositions while keeping search, contact submission and legal publication truthfully inactive.

**Architecture:** F3D adds focused server-component feature folders for editorial pages, static contact and search states, and one reusable legal-document renderer. Shared editorial primitives consume the existing F3B family and product registry; public routing mounts only truthful normal states, while contact and search variants remain directly testable unmounted previews. No client state, API call, backend code or OpenAPI change is introduced.

**Tech Stack:** Next.js 16.2.11 App Router, React 19.2, strict TypeScript 5.9, existing Rosa CSS tokens and responsive layout primitives, Vitest 3.2, Node static tests and Playwright 1.57.

## Global Constraints

- Work from `frontend/f3d-public-support-legal-design` and create `frontend/f3d-public-support-legal` for implementation.
- Inline execution is the locked execution method for this project.
- Public logo text remains `ROSA` only.
- Public positioning remains medical instruments supplier and procurement partner.
- Keep `PublicShell` as the sole `<main>` owner.
- Each upgraded public route renders exactly one `<h1>`.
- Do not expose public preview routes such as `/search/results`, `/contact/success` or `/contact/error`.
- Do not add client state, local storage, cookies, mutation handlers, server actions, API calls, map scripts, email behavior or backend code.
- Do not alter `packages/contracts/openapi/**`, generated contract types or Contract 0.1.
- Do not publish fake address, telephone, WhatsApp, email, working-hours or social-profile values.
- Do not claim that a contact message, quotation request, email or confirmation was sent.
- Do not invent contact references.
- Do not activate catalogue search on the normal `/search` route.
- Do not publish unsupported ownership, company-history, manufacturing, factory, certification, regulatory, export, award, experience, clinical or material claims.
- Do not invent legal dates, company registration details, jurisdiction, governing law, processors, analytics providers, cookies, retention periods, liability terms or rights procedures.
- Legal pages visibly remain templates awaiting client confirmation and qualified legal review.
- Search preview products resolve from the existing F3B catalogue registry.
- All five family links resolve through the existing `familyHref` helper.
- Product links resolve through the existing `productHref` helper.
- Normal Contact fields use native `readOnly` or `disabled` semantics and no submit handler.
- Normal Search uses a read-only field and no result count, loading state, result state or error state.
- Unmounted validation previews use `aria-invalid` and `aria-describedby`.
- Product and editorial media remain neutral and replaceable.
- Reuse Lora, Inter and existing Rosa color, spacing, border and typography tokens.
- Translate Figma compositions into responsive grid and document flow; do not reproduce generated absolute coordinates.
- Runtime verification must not be claimed until the listed commands run with zero failures.

## Approved Figma References

- Search default `25:61`, typing `25:84`, results `25:95`, loading `25:115`, no results `25:130`, error `25:140`, mobile results `25:150`
- About desktop `27:3`, mobile `27:92`
- Procurement Support desktop `27:174`, mobile `27:270`
- Contact desktop `28:3`, mobile `28:79`, form states `28:141`, success desktop `31:2`, success mobile `31:48`
- Privacy desktop `29:50`, mobile `29:150`
- Terms desktop `29:218`, mobile `29:330`

## File Map

### Existing files to modify

- `apps/web/src/features/public-routing/resolve-public-page.tsx` — add six explicit F3D route kinds and compositions.
- `apps/web/src/test/public-route-dispatch.test.ts` — verify the six routes no longer use placeholder dispatch.
- `apps/web/src/app/globals.css` — import the F3D stylesheet.
- `README.md` on `main` after source review — record exact F3D state while preserving backend-owned fields.

### Shared editorial files to create

- `apps/web/src/features/public-editorial/numbered-editorial-list.tsx`
- `apps/web/src/features/public-editorial/family-index.tsx`
- `apps/web/src/features/public-editorial/index.ts`

### About files to create

- `apps/web/src/features/about/about.data.ts`
- `apps/web/src/features/about/buyer-expectations.tsx`
- `apps/web/src/features/about/supported-buyers.tsx`
- `apps/web/src/features/about/about-page.tsx`
- `apps/web/src/features/about/index.ts`

### Procurement Support files to create

- `apps/web/src/features/procurement-support/procurement-support.data.ts`
- `apps/web/src/features/procurement-support/procurement-process.tsx`
- `apps/web/src/features/procurement-support/requirement-types.tsx`
- `apps/web/src/features/procurement-support/information-checklist.tsx`
- `apps/web/src/features/procurement-support/procurement-support-page.tsx`
- `apps/web/src/features/procurement-support/index.ts`

### Contact files to create

- `apps/web/src/features/contact-preview/contact-information-model.ts`
- `apps/web/src/features/contact-preview/contact-information-panel.tsx`
- `apps/web/src/features/contact-preview/contact-field-preview.tsx`
- `apps/web/src/features/contact-preview/contact-form-preview.tsx`
- `apps/web/src/features/contact-preview/contact-focus-preview.tsx`
- `apps/web/src/features/contact-preview/contact-validation-preview.tsx`
- `apps/web/src/features/contact-preview/contact-loading-preview.tsx`
- `apps/web/src/features/contact-preview/contact-failure-preview.tsx`
- `apps/web/src/features/contact-preview/contact-success-preview.tsx`
- `apps/web/src/features/contact-preview/contact-page.tsx`
- `apps/web/src/features/contact-preview/index.ts`

### Search files to create

- `apps/web/src/features/search-preview/search-preview-model.ts`
- `apps/web/src/features/search-preview/search-family-shortcuts.tsx`
- `apps/web/src/features/search-preview/search-default-page.tsx`
- `apps/web/src/features/search-preview/search-result-preview.tsx`
- `apps/web/src/features/search-preview/search-typing-preview.tsx`
- `apps/web/src/features/search-preview/search-results-preview.tsx`
- `apps/web/src/features/search-preview/search-mobile-results-preview.tsx`
- `apps/web/src/features/search-preview/search-loading-preview.tsx`
- `apps/web/src/features/search-preview/search-no-results-preview.tsx`
- `apps/web/src/features/search-preview/search-error-preview.tsx`
- `apps/web/src/features/search-preview/index.ts`

### Legal files to create

- `apps/web/src/features/legal-pages/legal-document-model.ts`
- `apps/web/src/features/legal-pages/legal-section-navigation.tsx`
- `apps/web/src/features/legal-pages/legal-section.tsx`
- `apps/web/src/features/legal-pages/legal-page.tsx`
- `apps/web/src/features/legal-pages/index.ts`

### Styles, tests and documentation to create

- `apps/web/src/styles/f3d-pages.css`
- `apps/web/src/test/f3d-editorial-components.test.tsx`
- `apps/web/src/test/about-page.test.tsx`
- `apps/web/src/test/procurement-support-page.test.tsx`
- `apps/web/src/test/contact-preview.test.tsx`
- `apps/web/src/test/search-preview.test.tsx`
- `apps/web/src/test/legal-pages.test.tsx`
- `apps/web/src/test/f3d-page-composition.test.tsx`
- `apps/web/src/test/f3d-policy.static.test.mjs`
- `apps/web/src/test/f3d-styles.static.test.mjs`
- `apps/web/tests/e2e/f3d-public-support-pages.spec.ts`
- `docs/superpowers/completions/2026-08-01-rosa-medical-f3d-public-support-legal.md`

---

### Task 1: Create the implementation branch and shared editorial primitives

**Files:**
- Create: `apps/web/src/features/public-editorial/numbered-editorial-list.tsx`
- Create: `apps/web/src/features/public-editorial/family-index.tsx`
- Create: `apps/web/src/features/public-editorial/index.ts`
- Create: `apps/web/src/test/f3d-editorial-components.test.tsx`

**Interfaces:**
- Consumes: `CATALOGUE_FAMILIES`, `familyHref`, `Link` and React server rendering.
- Produces: `NumberedEditorialItem`, `NumberedEditorialList` and `FamilyIndex`.

- [ ] **Step 1: Create the implementation branch**

```bash
git fetch origin
git switch frontend/f3d-public-support-legal-design
git pull --ff-only
git switch -c frontend/f3d-public-support-legal
```

- [ ] **Step 2: Write the failing shared-component test**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  FamilyIndex,
  NumberedEditorialList
} from "@/features/public-editorial";

const items = [
  { sequence: "01", title: "First", description: "First description." },
  { sequence: "02", title: "Second", description: "Second description." }
] as const;

describe("F3D public editorial primitives", () => {
  it("renders numbered items as a semantic list with an explicit kind", () => {
    const html = renderToStaticMarkup(
      <NumberedEditorialList items={items} ariaLabel="Example steps" kind="example" />
    );
    expect(html).toContain("<ol");
    expect((html.match(/data-editorial-kind="example"/g) ?? [])).toHaveLength(2);
    expect(html).toContain("First description.");
  });

  it("renders all five registered families with route-safe links", () => {
    const html = renderToStaticMarkup(<FamilyIndex />);
    expect((html.match(/data-family-index-row=/g) ?? [])).toHaveLength(5);
    expect(html).toContain('href="/products/knives"');
    expect(html).toContain('href="/products/cutters"');
  });
});
```

- [ ] **Step 3: Run the focused test and verify the red state**

```bash
pnpm --filter @rosa/web test -- f3d-editorial-components.test.tsx
```

Expected: failure because `@/features/public-editorial` does not exist.

- [ ] **Step 4: Implement the numbered editorial list**

```tsx
import type { ReactElement } from "react";

export interface NumberedEditorialItem {
  sequence: string;
  title: string;
  description?: string;
}

export function NumberedEditorialList({
  items,
  ariaLabel,
  kind,
  className = ""
}: {
  items: readonly NumberedEditorialItem[];
  ariaLabel: string;
  kind: string;
  className?: string;
}): ReactElement {
  return (
    <ol className={`numbered-editorial-list ${className}`.trim()} aria-label={ariaLabel}>
      {items.map((item) => (
        <li
          key={`${item.sequence}-${item.title}`}
          data-editorial-item={item.sequence}
          data-editorial-kind={kind}
        >
          <span className="numbered-editorial-list__sequence">{item.sequence}</span>
          <div>
            <h3>{item.title}</h3>
            {item.description ? <p>{item.description}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
```

- [ ] **Step 5: Implement the family index from the registry**

```tsx
import Link from "next/link";
import type { ReactElement } from "react";
import { CATALOGUE_FAMILIES } from "@/features/catalogue-registry";
import { familyHref } from "@/features/public-catalogue";

export function FamilyIndex(): ReactElement {
  return (
    <ol className="public-family-index" aria-label="Instrument families">
      {CATALOGUE_FAMILIES.map((family) => (
        <li key={family.slug} data-family-index-row={family.slug}>
          <span>{family.sequence}</span>
          <strong>{family.name}</strong>
          <Link href={familyHref(family.slug)}>Explore family →</Link>
        </li>
      ))}
    </ol>
  );
}
```

Export both components and `NumberedEditorialItem` from `index.ts`.

- [ ] **Step 6: Verify and commit**

```bash
pnpm --filter @rosa/web test -- f3d-editorial-components.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/public-editorial apps/web/src/test/f3d-editorial-components.test.tsx
git commit -m "feat: add F3D editorial primitives"
```

---

### Task 2: Build the complete About composition

**Files:**
- Create all files under `apps/web/src/features/about/` listed in the file map.
- Create: `apps/web/src/test/about-page.test.tsx`

**Interfaces:**
- Consumes: `NumberedEditorialList`, `FamilyIndex`, `Container`, `Section`, `ButtonLink`, `ProductMediaPlaceholder`.
- Produces: `BUYER_EXPECTATIONS`, `SUPPORTED_BUYERS`, `BuyerExpectations`, `SupportedBuyers` and `AboutPage`.

- [ ] **Step 1: Write the failing About test**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { AboutPage } from "@/features/about";

it("renders the approved About structure without unsupported claims", () => {
  const html = renderToStaticMarkup(<AboutPage />);

  expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
  expect((html.match(/data-editorial-kind="buyer-expectation"/g) ?? [])).toHaveLength(5);
  expect((html.match(/data-supported-buyer=/g) ?? [])).toHaveLength(4);
  expect((html.match(/data-family-index-row=/g) ?? [])).toHaveLength(5);
  expect(html).toContain('href="/procurement-support"');
  expect(html).toContain('href="/products"');
  expect(html).toContain('href="/request-quotation"');
  expect(html).not.toMatch(/factory|manufacturer|certified|years of experience/i);
});
```

- [ ] **Step 2: Verify the red state**

```bash
pnpm --filter @rosa/web test -- about-page.test.tsx
```

- [ ] **Step 3: Define the approved About records**

```ts
import type { NumberedEditorialItem } from "@/features/public-editorial";

export const BUYER_EXPECTATIONS = [
  { sequence: "01", title: "Clear product codes", description: "Identify instruments without relying on vague descriptions." },
  { sequence: "02", title: "Organised families", description: "Browse Knives, Scissors, Punches, Chisels and Cutters." },
  { sequence: "03", title: "Catalogue access", description: "Use technical catalogues alongside the website catalogue." },
  { sequence: "04", title: "Structured requests", description: "Prepare products, quantities, variants and notes in one inquiry." },
  { sequence: "05", title: "Responsive communication", description: "Send complete requirements through a clear business process." }
] as const satisfies readonly NumberedEditorialItem[];

export const SUPPORTED_BUYERS = [
  { sequence: "01", title: "Hospitals and clinics" },
  { sequence: "02", title: "Procurement teams" },
  { sequence: "03", title: "Distributors and wholesalers" },
  { sequence: "04", title: "International buyers" }
] as const;
```

- [ ] **Step 4: Implement the About sections**

`BuyerExpectations` must render:

```tsx
<NumberedEditorialList
  items={BUYER_EXPECTATIONS}
  ariaLabel="What buyers can expect"
  kind="buyer-expectation"
  className="buyer-expectations"
/>
```

`SupportedBuyers` renders one ordered list of four rows with `data-supported-buyer={buyer.sequence}`.

`AboutPage` renders, in order:

1. Breadcrumb and two-column editorial hero
2. Neutral portrait media
3. Five buyer expectations
4. Four supported buyer groups
5. Five-family index
6. Dark Procurement Support preview
7. Final inquiry CTA

Use this restrained hero copy:

```tsx
<p className="page-eyebrow">About Rosa</p>
<h1>A clearer way to source medical instruments.</h1>
<p>Rosa supports professional buyers with organised product information, catalogue access and structured quotation requests.</p>
```

Use real actions only:

```tsx
<ButtonLink href="/procurement-support">View Procurement Support</ButtonLink>
<ButtonLink href="/products" variant="secondary">Browse Products</ButtonLink>
<ButtonLink href="/request-quotation">Request a Quote</ButtonLink>
```

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- about-page.test.tsx f3d-editorial-components.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/about apps/web/src/test/about-page.test.tsx
git commit -m "feat: build F3D About page"
```

---

### Task 3: Build the Procurement Support composition

**Files:**
- Create all files under `apps/web/src/features/procurement-support/` listed in the file map.
- Create: `apps/web/src/test/procurement-support-page.test.tsx`

**Interfaces:**
- Consumes: `NumberedEditorialList`, `Container`, `Section`, `ButtonLink`, `ProductMediaPlaceholder`.
- Produces: `PROCUREMENT_STEPS`, `REQUIREMENT_TYPES`, `INFORMATION_CHECKLIST`, section components and `ProcurementSupportPage`.

- [ ] **Step 1: Write the failing page test**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { ProcurementSupportPage } from "@/features/procurement-support";

it("renders six steps, four requirement types and six checklist items", () => {
  const html = renderToStaticMarkup(<ProcurementSupportPage />);

  expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
  expect((html.match(/data-editorial-kind="procurement-step"/g) ?? [])).toHaveLength(6);
  expect((html.match(/data-editorial-kind="requirement-type"/g) ?? [])).toHaveLength(4);
  expect((html.match(/data-information-item=/g) ?? [])).toHaveLength(6);
  expect(html).toContain('href="/products"');
  expect(html).toContain('href="/inquiry"');
  expect(html).toContain('href="/contact"');
  expect(html).toContain('href="/request-quotation"');
  expect(html).not.toContain("guaranteed confirmation");
});
```

- [ ] **Step 2: Verify the red state**

```bash
pnpm --filter @rosa/web test -- procurement-support-page.test.tsx
```

- [ ] **Step 3: Define the exact process records**

```ts
import type { NumberedEditorialItem } from "@/features/public-editorial";

export const PROCUREMENT_STEPS = [
  { sequence: "01", title: "Browse by family", description: "Start with Knives, Scissors, Punches, Chisels or Cutters." },
  { sequence: "02", title: "Review codes and options", description: "Check product codes, sizes, shapes and listed variants." },
  { sequence: "03", title: "Add products to inquiry", description: "A product inquiry is intended to collect the instruments and quantities required." },
  { sequence: "04", title: "Add useful notes", description: "Include line notes or general packing, finish and destination details." },
  { sequence: "05", title: "Submit contact details", description: "A complete request includes the business information needed for follow-up." },
  { sequence: "06", title: "Receive confirmation", description: "A completed submission can provide a record for Rosa follow-up." }
] as const satisfies readonly NumberedEditorialItem[];

export const REQUIREMENT_TYPES = [
  { sequence: "01", title: "Product-specific inquiry", description: "One identified instrument with exact code and options." },
  { sequence: "02", title: "Multiple-product list", description: "Several products, quantities and line-level notes." },
  { sequence: "03", title: "Catalogue-led inquiry", description: "A request prepared while reviewing technical catalogues." },
  { sequence: "04", title: "Unlisted product request", description: "A general requirement described when the exact product is not listed." }
] as const satisfies readonly NumberedEditorialItem[];

export const INFORMATION_CHECKLIST = [
  "Product codes",
  "Sizes",
  "Variants",
  "Quantities",
  "Destination country",
  "Packing, finish and additional notes"
] as const;
```

- [ ] **Step 4: Implement the section components and page**

`ProcurementProcess` and `RequirementTypes` call `NumberedEditorialList` with `kind="procurement-step"` and `kind="requirement-type"`. `InformationChecklist` renders an ordered list with `data-information-item` on each row.

`ProcurementSupportPage` renders:

1. Breadcrumb, hero and neutral procurement media
2. Six-step process
3. Four requirement types
4. Dark six-item information checklist
5. Support-route panel
6. Final quotation CTA

Use these exact route actions:

```tsx
<ButtonLink href="/products">Browse Products</ButtonLink>
<ButtonLink href="/inquiry" variant="secondary">Open Inquiry</ButtonLink>
<ButtonLink href="/contact" variant="quiet">Contact Rosa</ButtonLink>
<ButtonLink href="/request-quotation">Request a Quote</ButtonLink>
```

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- procurement-support-page.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/procurement-support apps/web/src/test/procurement-support-page.test.tsx
git commit -m "feat: build F3D procurement support page"
```

---

### Task 4: Build the truthful static Contact page

**Files:**
- Create: `apps/web/src/features/contact-preview/contact-information-model.ts`
- Create: `apps/web/src/features/contact-preview/contact-information-panel.tsx`
- Create: `apps/web/src/features/contact-preview/contact-field-preview.tsx`
- Create: `apps/web/src/features/contact-preview/contact-form-preview.tsx`
- Create: `apps/web/src/features/contact-preview/contact-page.tsx`
- Create: `apps/web/src/features/contact-preview/index.ts`
- Create: `apps/web/src/test/contact-preview.test.tsx`

**Interfaces:**
- Consumes: `Container`, `Section`, `Button`, `ButtonLink`, `ProductMediaPlaceholder`.
- Produces: `CONTACT_INFORMATION`, `ContactFieldPreview`, `ContactFormPreview`, `ContactInformationPanel` and `ContactPage`.

- [ ] **Step 1: Write the failing normal-state tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  CONTACT_INFORMATION,
  ContactPage
} from "@/features/contact-preview";

describe("F3D contact normal state", () => {
  it("keeps unconfirmed contact values explicit", () => {
    expect(CONTACT_INFORMATION.map((row) => row.value)).toEqual([
      "Rosa Medical",
      "Awaiting client confirmation",
      "Awaiting client confirmation",
      "Awaiting client confirmation",
      "Awaiting client confirmation",
      "Awaiting client confirmation",
      "Awaiting client confirmation"
    ]);
  });

  it("renders one heading, a disabled form and no fake contact links", () => {
    const html = renderToStaticMarkup(<ContactPage />);
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain("General contact form preview");
    expect(html).toContain("readonly");
    expect(html).toContain("disabled");
    expect(html).not.toMatch(/mailto:|tel:|wa\.me|contact@placeholder|\+966 XX/i);
    expect(html).not.toContain("MESSAGE SENT");
    expect(html).toContain('href="/inquiry"');
  });
});
```

- [ ] **Step 2: Verify the red state**

```bash
pnpm --filter @rosa/web test -- contact-preview.test.tsx
```

- [ ] **Step 3: Define the contact-information records**

```ts
export interface ContactInformationRow {
  label: string;
  value: string;
  confirmed: boolean;
}

export const CONTACT_INFORMATION = [
  { label: "Business name", value: "Rosa Medical", confirmed: true },
  { label: "Address", value: "Awaiting client confirmation", confirmed: false },
  { label: "Telephone", value: "Awaiting client confirmation", confirmed: false },
  { label: "WhatsApp", value: "Awaiting client confirmation", confirmed: false },
  { label: "Email", value: "Awaiting client confirmation", confirmed: false },
  { label: "Working hours", value: "Awaiting client confirmation", confirmed: false },
  { label: "Social profiles", value: "Awaiting client confirmation", confirmed: false }
] as const satisfies readonly ContactInformationRow[];
```

- [ ] **Step 4: Implement reusable read-only fields**

```tsx
export interface ContactFieldPreviewProps {
  id: string;
  label: string;
  placeholder: string;
  value?: string;
  error?: string;
  multiline?: boolean;
  focused?: boolean;
}

export function ContactFieldPreview({
  id,
  label,
  placeholder,
  value = "",
  error,
  multiline = false,
  focused = false
}: ContactFieldPreviewProps): ReactElement {
  const errorId = error ? `${id}-error` : undefined;
  const props = {
    id,
    name: id,
    value,
    placeholder,
    readOnly: true,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": errorId
  } as const;

  return (
    <div className={`contact-preview-field${error ? " contact-preview-field--error" : ""}${focused ? " contact-preview-field--focused" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {multiline ? <textarea {...props} rows={6} /> : <input {...props} type="text" />}
      {error ? <p id={errorId}>{error}</p> : null}
    </div>
  );
}
```

- [ ] **Step 5: Implement the static form and page**

The form has seven labelled fields and no `action` or `onSubmit`:

```tsx
<form className="contact-form-preview" aria-label="General contact form preview">
  <div className="contact-form-preview__grid">
    <ContactFieldPreview id="contact-name" label="Name" placeholder="Your full name" />
    <ContactFieldPreview id="contact-company" label="Company" placeholder="Company or organisation" />
    <ContactFieldPreview id="contact-email" label="Email" placeholder="Business email" />
    <ContactFieldPreview id="contact-telephone" label="Telephone" placeholder="Country code and number" />
    <ContactFieldPreview id="contact-country" label="Country" placeholder="Country" />
    <ContactFieldPreview id="contact-subject" label="Subject" placeholder="General message subject" />
  </div>
  <ContactFieldPreview id="contact-message" label="Message" placeholder="Write your message" multiline />
  <Button disabled>Send Message</Button>
  <p>Online message submission is not currently available. This form is separate from product quotation inquiries.</p>
</form>
```

`ContactPage` renders breadcrumb, general-message introduction, `/inquiry` action, contact-information panel, static form, a neutral location visual labelled `Location awaiting confirmation`, and a product-quotation redirect panel.

- [ ] **Step 6: Verify and commit**

```bash
pnpm --filter @rosa/web test -- contact-preview.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/contact-preview apps/web/src/test/contact-preview.test.tsx
git commit -m "feat: build truthful F3D contact page"
```

---

### Task 5: Add isolated Contact focus, validation, loading, failure and success previews

**Files:**
- Create: `apps/web/src/features/contact-preview/contact-focus-preview.tsx`
- Create: `apps/web/src/features/contact-preview/contact-validation-preview.tsx`
- Create: `apps/web/src/features/contact-preview/contact-loading-preview.tsx`
- Create: `apps/web/src/features/contact-preview/contact-failure-preview.tsx`
- Create: `apps/web/src/features/contact-preview/contact-success-preview.tsx`
- Modify: `apps/web/src/features/contact-preview/index.ts`
- Modify: `apps/web/src/test/contact-preview.test.tsx`

**Interfaces:**
- Consumes: `ContactFieldPreview`, `Button`, `ButtonLink`.
- Produces: `ContactFocusPreview`, `ContactValidationPreview`, `ContactLoadingPreview`, `ContactFailurePreview`, `ContactSuccessResult` and `ContactSuccessPreview`.

- [ ] **Step 1: Add failing preview assertions**

```tsx
import {
  ContactFailurePreview,
  ContactFocusPreview,
  ContactLoadingPreview,
  ContactSuccessPreview,
  ContactValidationPreview
} from "@/features/contact-preview";

it("renders a visible isolated focus example", () => {
  const html = renderToStaticMarkup(<ContactFocusPreview />);
  expect(html).toContain("contact-preview-field--focused");
  expect(html).toContain("data-preview-only");
});

it("connects contact validation errors to invalid fields", () => {
  const html = renderToStaticMarkup(<ContactValidationPreview />);
  expect((html.match(/aria-invalid="true"/g) ?? [])).toHaveLength(2);
  expect(html).toContain('aria-describedby="contact-invalid-email-error"');
  expect(html).toContain('id="contact-invalid-email-error"');
});

it("keeps loading and failure previews noninteractive", () => {
  const html = renderToStaticMarkup(<><ContactLoadingPreview /><ContactFailurePreview /></>);
  expect(html).toContain("Sending preview");
  expect(html).toContain("disabled");
  expect(html).not.toContain("onSubmit");
});

it("does not invent a sent message or reference in the default success preview", () => {
  const html = renderToStaticMarkup(<ContactSuccessPreview />);
  expect(html).not.toContain("CONTACT-PLACEHOLDER");
  expect(html).not.toContain("Your general message has been sent");
  expect(html).toContain("Confirmation details appear after a successful submission");
});
```

- [ ] **Step 2: Verify the red state**

```bash
pnpm --filter @rosa/web test -- contact-preview.test.tsx
```

- [ ] **Step 3: Implement focus and validation previews**

```tsx
export function ContactFocusPreview(): ReactElement {
  return (
    <section data-preview-only="true" aria-labelledby="contact-focus-title">
      <h2 id="contact-focus-title">Focus example</h2>
      <ContactFieldPreview
        id="contact-focused-email"
        label="Email"
        placeholder="Business email"
        focused
      />
    </section>
  );
}
```

Validation preview renders two `ContactFieldPreview` components with IDs `contact-invalid-email` and `contact-invalid-telephone`, values `name@company` and `Number required`, and exact errors `Enter a valid email address` and `Enter a valid telephone number`.

- [ ] **Step 4: Implement loading, failure and success previews**

Loading and failure previews use `data-preview-only="true"`, disabled actions and copy that explicitly describes a preview rather than a real request attempt.

Success preview:

```tsx
export interface ContactSuccessResult {
  reference?: string;
}

export function ContactSuccessPreview({ result }: { result?: ContactSuccessResult }): ReactElement {
  return (
    <section className="contact-success-preview" data-preview-only="true" aria-labelledby="contact-success-title">
      <p>{result?.reference ? "Message received" : "Success-state preview"}</p>
      <h2 id="contact-success-title">
        {result?.reference ? "Your general message has been received." : "Confirmation details appear after a successful submission."}
      </h2>
      {result?.reference ? <p>Reference: {result.reference}</p> : <p>No message delivery or reference is represented in this static preview.</p>}
      <ButtonLink href="/">Return Home</ButtonLink>
      <ButtonLink href="/products" variant="secondary">Browse Products</ButtonLink>
    </section>
  );
}
```

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- contact-preview.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/contact-preview apps/web/src/test/contact-preview.test.tsx
git commit -m "feat: add F3D contact state previews"
```

---

### Task 6: Build the default Search page and source-backed preview model

**Files:**
- Create: `apps/web/src/features/search-preview/search-preview-model.ts`
- Create: `apps/web/src/features/search-preview/search-family-shortcuts.tsx`
- Create: `apps/web/src/features/search-preview/search-default-page.tsx`
- Create: `apps/web/src/features/search-preview/index.ts`
- Create: `apps/web/src/test/search-preview.test.tsx`

**Interfaces:**
- Consumes: `CATALOGUE_FAMILIES`, `CatalogueProductRecord`, `getProductDetailModel`, `familyHref`, `Container`, `Section`.
- Produces: `SEARCH_PREVIEW_QUERY`, `SEARCH_PREVIEW_RESULTS`, `SearchFamilyShortcuts` and `SearchDefaultPage`.

- [ ] **Step 1: Write the failing model and default-page tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  SEARCH_PREVIEW_RESULTS,
  SearchDefaultPage
} from "@/features/search-preview";

describe("F3D search default and preview data", () => {
  it("resolves the approved preview products from the catalogue registry", () => {
    expect(SEARCH_PREVIEW_RESULTS.map((product) => product.code)).toEqual([
      "18-0644",
      "18-0650"
    ]);
  });

  it("renders discovery only on the normal search page", () => {
    const html = renderToStaticMarkup(<SearchDefaultPage />);
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect((html.match(/data-search-family-shortcut=/g) ?? [])).toHaveLength(5);
    expect(html).toContain("readonly");
    expect(html).not.toContain("18-0644");
    expect(html).not.toContain("2 results");
    expect(html).not.toContain("Search could not be completed");
  });
});
```

- [ ] **Step 2: Verify the red state**

```bash
pnpm --filter @rosa/web test -- search-preview.test.tsx
```

- [ ] **Step 3: Implement the source-backed model**

```ts
import {
  getProductDetailModel,
  type CatalogueProductRecord
} from "@/features/catalogue-registry";

function requireSearchProduct(
  familySlug: string,
  productSlug: string
): CatalogueProductRecord {
  const result = getProductDetailModel(familySlug, productSlug);
  if (result.kind !== "product") {
    throw new Error(`Missing search preview product: ${familySlug}/${productSlug}`);
  }
  return result.product;
}

export const SEARCH_PREVIEW_QUERY = "scalpel";

export const SEARCH_PREVIEW_RESULTS = [
  requireSearchProduct("knives", "scalpel-handle-no-3"),
  requireSearchProduct("knives", "bard-parker-handle")
] as const satisfies readonly CatalogueProductRecord[];
```

- [ ] **Step 4: Implement family shortcuts and the default page**

`SearchFamilyShortcuts` maps all `CATALOGUE_FAMILIES` to `Link` components using `familyHref` and `data-search-family-shortcut={family.slug}`.

`SearchDefaultPage` renders:

```tsx
<Section tone="paper" className="search-default-page">
  <Container size="wide">
    <p className="page-eyebrow">Global search</p>
    <h1>Find an instrument.</h1>
    <label className="search-default-page__field">
      <span>Search the catalogue</span>
      <input type="search" readOnly placeholder="Product name, code, family, size or variant" />
    </label>
    <p>Interactive catalogue search is not currently available. Start with an instrument family below.</p>
    <SearchFamilyShortcuts />
  </Container>
</Section>
```

Do not include close, clear, retry, result count or add-to-inquiry controls on the normal route.

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- search-preview.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/search-preview apps/web/src/test/search-preview.test.tsx
git commit -m "feat: build F3D default search page"
```

---

### Task 7: Add isolated Search typing, desktop/mobile results, loading, no-results and error previews

**Files:**
- Create all remaining files under `apps/web/src/features/search-preview/` listed in the file map.
- Modify: `apps/web/src/features/search-preview/index.ts`
- Modify: `apps/web/src/test/search-preview.test.tsx`

**Interfaces:**
- Consumes: `SEARCH_PREVIEW_QUERY`, `SEARCH_PREVIEW_RESULTS`, `productHref`, `ProductMediaPlaceholder`, `Button` and `ButtonLink`.
- Produces: `SearchResultPreview`, `SearchTypingPreview`, `SearchResultsPreview`, `SearchMobileResultsPreview`, `SearchLoadingPreview`, `SearchNoResultsPreview` and `SearchErrorPreview`.

- [ ] **Step 1: Add failing isolated-state tests**

```tsx
import {
  SearchErrorPreview,
  SearchLoadingPreview,
  SearchMobileResultsPreview,
  SearchNoResultsPreview,
  SearchResultsPreview,
  SearchTypingPreview
} from "@/features/search-preview";

it("renders source-backed desktop and mobile search results", () => {
  const desktop = renderToStaticMarkup(<SearchResultsPreview />);
  const mobile = renderToStaticMarkup(<SearchMobileResultsPreview />);
  expect((desktop.match(/data-search-result=/g) ?? [])).toHaveLength(2);
  expect((mobile.match(/data-search-result=/g) ?? [])).toHaveLength(2);
  expect(desktop).toContain('href="/products/knives/scalpel-handle-no-3"');
  expect(desktop).toContain('href="/products/knives/bard-parker-handle"');
  expect(desktop).toContain("18-0644");
  expect(desktop).toContain("18-0650");
  expect(desktop).toContain("disabled");
  expect(mobile).toContain("data-mobile-search-preview");
});

it("marks every non-default state as preview-only", () => {
  const html = renderToStaticMarkup(
    <>
      <SearchTypingPreview />
      <SearchLoadingPreview />
      <SearchNoResultsPreview />
      <SearchErrorPreview />
    </>
  );
  expect((html.match(/data-preview-only=/g) ?? [])).toHaveLength(4);
  expect(html).not.toContain("onChange");
});
```

- [ ] **Step 2: Verify the red state**

```bash
pnpm --filter @rosa/web test -- search-preview.test.tsx
```

- [ ] **Step 3: Implement a result row**

```tsx
import Link from "next/link";
import type { ReactElement } from "react";
import { Button } from "@/components/ui";
import type { CatalogueProductRecord } from "@/features/catalogue-registry";
import { ProductMediaPlaceholder, productHref } from "@/features/public-catalogue";

export function SearchResultPreview({ product }: { product: CatalogueProductRecord }): ReactElement {
  const option = product.sizes[0] ?? product.variants[0] ?? product.directions[0];
  return (
    <article className="search-result-preview" data-search-result={product.id}>
      <ProductMediaPlaceholder label={product.mediaLabel} decorative aspect="square" />
      <div>
        <p>{product.familySlug}</p>
        <h2>{product.name}</h2>
        <p>Code {product.code}{option ? ` · ${option}` : ""}</p>
      </div>
      <Link href={productHref(product)}>View product →</Link>
      <Button variant="quiet" disabled>Add to inquiry</Button>
    </article>
  );
}
```

- [ ] **Step 4: Implement the six preview compositions**

Each preview uses `data-preview-only="true"`.

- `SearchTypingPreview` shows `SEARCH_PREVIEW_QUERY` and compact source-backed identities without claiming live updates.
- `SearchResultsPreview` maps `SEARCH_PREVIEW_RESULTS` through `SearchResultPreview` and shows a derived count.
- `SearchMobileResultsPreview` wraps the same two records in `<section data-mobile-search-preview="true">` and uses the mobile class structure from Figma node `25:150`.
- `SearchLoadingPreview` renders three `aria-hidden="true"` skeleton rows and visible text `Search loading preview`.
- `SearchNoResultsPreview` uses demonstration phrase `thoracic clamp`, a disabled Clear Search button and a real `/products` link.
- `SearchErrorPreview` states `Search could not be completed in this preview`, with a disabled Try Again button.

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- search-preview.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/search-preview apps/web/src/test/search-preview.test.tsx
git commit -m "feat: add F3D search state previews"
```

---

### Task 8: Build the reusable Privacy and Terms legal-template system

**Files:**
- Create all files under `apps/web/src/features/legal-pages/` listed in the file map.
- Create: `apps/web/src/test/legal-pages.test.tsx`

**Interfaces:**
- Consumes: `Container`, `Section`, `Link`.
- Produces: `LegalSectionRecord`, `LegalDocumentRecord`, `PRIVACY_DOCUMENT`, `TERMS_DOCUMENT`, `LegalSectionNavigation`, `LegalSection` and `LegalPage`.

- [ ] **Step 1: Write the failing model and page tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  PRIVACY_DOCUMENT,
  TERMS_DOCUMENT,
  LegalPage
} from "@/features/legal-pages";

describe("F3D legal templates", () => {
  it("defines the approved section counts", () => {
    expect(PRIVACY_DOCUMENT.sections).toHaveLength(9);
    expect(TERMS_DOCUMENT.sections).toHaveLength(11);
  });

  it.each([
    [PRIVACY_DOCUMENT, 9],
    [TERMS_DOCUMENT, 11]
  ] as const)("renders a legal template with %i sections", (document, count) => {
    const html = renderToStaticMarkup(<LegalPage document={document} />);
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect((html.match(/data-legal-section=/g) ?? [])).toHaveLength(count);
    expect(html).toContain("awaiting client and legal approval");
    expect(html).toContain("qualified legal review");
    expect(html).not.toMatch(/Saudi law governs|retained for \d+ years|Google Analytics|Mailchimp/i);
  });
});
```

- [ ] **Step 2: Verify the red state**

```bash
pnpm --filter @rosa/web test -- legal-pages.test.tsx
```

- [ ] **Step 3: Define the legal records**

```ts
export interface LegalSectionRecord {
  sequence: string;
  id: string;
  title: string;
  body: string;
}

export interface LegalDocumentRecord {
  slug: "privacy" | "terms";
  title: string;
  breadcrumbLabel: string;
  sections: readonly LegalSectionRecord[];
}

function section(sequence: string, id: string, title: string): LegalSectionRecord {
  return {
    sequence,
    id,
    title,
    body: `Template guidance for ${title.toLowerCase()}. Confirm the actual website behavior, service providers, applicable jurisdiction and approved client wording through qualified legal review before publication.`
  };
}

export const PRIVACY_DOCUMENT: LegalDocumentRecord = {
  slug: "privacy",
  title: "Privacy Policy",
  breadcrumbLabel: "Privacy Policy",
  sections: [
    section("01", "information-collected", "Information collected"),
    section("02", "information-use", "How information is used"),
    section("03", "submissions", "Inquiry and contact submissions"),
    section("04", "email-communication", "Email communication"),
    section("05", "data-storage", "Data storage"),
    section("06", "cookies-analytics", "Cookies or analytics"),
    section("07", "third-party-services", "Third-party services"),
    section("08", "data-rights", "Data rights and contact route"),
    section("09", "policy-updates", "Policy updates")
  ]
};

export const TERMS_DOCUMENT: LegalDocumentRecord = {
  slug: "terms",
  title: "Terms of Website Use",
  breadcrumbLabel: "Terms of Website Use",
  sections: [
    section("01", "website-purpose", "Website purpose"),
    section("02", "product-information", "Product information"),
    section("03", "quotation-requests", "Quotation requests"),
    section("04", "no-public-pricing", "No public pricing"),
    section("05", "no-contract", "No contract formed by inquiry submission"),
    section("06", "accuracy-availability", "Accuracy and availability disclaimer"),
    section("07", "intellectual-property", "Intellectual property"),
    section("08", "external-links", "External links"),
    section("09", "liability", "Limitation of liability — awaiting legal wording"),
    section("10", "governing-law", "Governing law — awaiting legal decision"),
    section("11", "contact", "Contact")
  ]
};
```

- [ ] **Step 4: Implement navigation, sections and page rendering**

`LegalSectionNavigation` renders an ordered list of links using `href={`#${section.id}`}`. `LegalSection` renders:

```tsx
<section id={section.id} data-legal-section={section.id} tabIndex={-1}>
  <span>{section.sequence}</span>
  <h2>{section.title}</h2>
  <p>{section.body}</p>
</section>
```

`LegalPage` renders breadcrumb, `LEGAL TEMPLATE` eyebrow, one `h1`, visible warning copy, `Last updated: awaiting client and legal approval`, section navigation, numbered sections and a final panel stating that the document is not launch-ready legal advice.

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- legal-pages.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/legal-pages apps/web/src/test/legal-pages.test.tsx
git commit -m "feat: build F3D legal templates"
```

---

### Task 9: Wire all six routes and add the responsive F3D stylesheet

**Files:**
- Modify: `apps/web/src/features/public-routing/resolve-public-page.tsx`
- Modify: `apps/web/src/test/public-route-dispatch.test.ts`
- Create: `apps/web/src/test/f3d-page-composition.test.tsx`
- Create: `apps/web/src/styles/f3d-pages.css`
- Modify: `apps/web/src/app/globals.css`
- Create: `apps/web/src/test/f3d-styles.static.test.mjs`

**Interfaces:**
- Consumes: `AboutPage`, `ProcurementSupportPage`, `ContactPage`, `SearchDefaultPage`, `LegalPage`, `PRIVACY_DOCUMENT`, `TERMS_DOCUMENT`.
- Produces: six explicit `PublicPageKind` variants and responsive F3D compositions.

- [ ] **Step 1: Extend route and composition tests first**

```ts
it.each([
  ["about", "about"],
  ["procurement-support", "procurement-support"],
  ["contact", "contact-static"],
  ["search", "search-default"],
  ["privacy", "privacy-template"],
  ["terms", "terms-template"]
] as const)("maps %s to %s", (key, expected) => {
  expect(resolvePublicPageKind(key)).toBe(expected);
});
```

```tsx
it.each([
  ["about", "A clearer way to source medical instruments."],
  ["procurement-support", "Prepare a clearer instrument request."],
  ["contact", "Send a general business message."],
  ["search", "Find an instrument."],
  ["privacy", "Privacy Policy"],
  ["terms", "Terms of Website Use"]
] as const)("renders %s with one heading", (key, heading) => {
  const html = renderToStaticMarkup(
    resolvePublicPage({ key, path: `/${key}`, title: heading })
  );
  expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
  expect(html).toContain(heading);
  expect(html).not.toContain("Route scaffold");
});
```

- [ ] **Step 2: Verify the red state**

```bash
pnpm --filter @rosa/web test -- public-route-dispatch.test.ts f3d-page-composition.test.tsx
```

- [ ] **Step 3: Implement explicit route kinds and compositions**

Add these variants to `PublicPageKind`:

```ts
| "about"
| "procurement-support"
| "contact-static"
| "search-default"
| "privacy-template"
| "terms-template"
```

Resolve the six exact keys before generic segment handling and mount:

```tsx
case "about": return <AboutPage />;
case "procurement-support": return <ProcurementSupportPage />;
case "contact-static": return <ContactPage />;
case "search-default": return <SearchDefaultPage />;
case "privacy-template": return <LegalPage document={PRIVACY_DOCUMENT} />;
case "terms-template": return <LegalPage document={TERMS_DOCUMENT} />;
```

Delete the current `NON_CATALOGUE_PLACEHOLDERS` set and its lookup because all six entries receive explicit route kinds. Preserve the existing generic fallback for unknown non-product paths and strict not-found behavior for invalid product paths.

- [ ] **Step 4: Write the stylesheet static test**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../styles/f3d-pages.css", import.meta.url), "utf8");

test("F3D styles include desktop, tablet, mobile and reduced-motion rules", () => {
  assert.match(css, /\.about-hero/);
  assert.match(css, /\.procurement-support-hero/);
  assert.match(css, /\.contact-page/);
  assert.match(css, /\.search-default-page/);
  assert.match(css, /\.legal-page/);
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 520px\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(css, /position:\s*absolute[^}]*top:\s*\d{3,}px/s);
});
```

- [ ] **Step 5: Implement responsive CSS by system**

The stylesheet must include:

- two-column editorial heroes at desktop, one column below 900 px
- expectation and requirement grids with `minmax(0, 1fr)`
- four-column supported-buyer grid, two columns at tablet, one column at mobile
- three-column procurement process grid, two columns at tablet, one column at mobile
- contact status/form split at desktop and one flow below 900 px
- full-width read-only contact fields below 520 px
- five search shortcuts in a safe responsive grid
- a distinct compact mobile-results preview class
- legal contents/content split at desktop and stacked layout below 900 px
- legal headings with `overflow-wrap: anywhere`
- no fixed content widths larger than their container
- visible `:focus-visible` treatment
- reduced-motion treatment

Representative rules:

```css
.about-hero__layout,
.procurement-support-hero__layout,
.contact-page__layout,
.legal-page__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: var(--space-12);
}

.legal-page__layout {
  grid-template-columns: minmax(14rem, 18rem) minmax(0, 1fr);
}

@media (max-width: 900px) {
  .about-hero__layout,
  .procurement-support-hero__layout,
  .contact-page__layout,
  .legal-page__layout {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 520px) {
  .supported-buyers,
  .procurement-process,
  .search-family-shortcuts {
    grid-template-columns: minmax(0, 1fr);
  }
}
```

Import `../styles/f3d-pages.css` after `f3c-pages.css` in `globals.css`.

- [ ] **Step 6: Verify and commit**

```bash
pnpm --filter @rosa/web test -- public-route-dispatch.test.ts f3d-page-composition.test.tsx about-page.test.tsx procurement-support-page.test.tsx contact-preview.test.tsx search-preview.test.tsx legal-pages.test.tsx
node --test apps/web/src/test/f3d-styles.static.test.mjs
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/public-routing apps/web/src/app/globals.css apps/web/src/styles/f3d-pages.css apps/web/src/test/public-route-dispatch.test.ts apps/web/src/test/f3d-page-composition.test.tsx apps/web/src/test/f3d-styles.static.test.mjs
git commit -m "feat: wire and style F3D public routes"
```

---

### Task 10: Add policy checks, exact browser coverage, completion evidence and coordination update

**Files:**
- Create: `apps/web/src/test/f3d-policy.static.test.mjs`
- Create: `apps/web/tests/e2e/f3d-public-support-pages.spec.ts`
- Create: `docs/superpowers/completions/2026-08-01-rosa-medical-f3d-public-support-legal.md`
- Update after source review: `README.md` on `main`

**Interfaces:**
- Consumes: all six public routes and all normal-state source files.
- Produces: policy regression coverage, 1440/768/390 viewport coverage, exact completion record and AI-to-AI status update.

- [ ] **Step 1: Add the static policy test**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve("apps/web/src/features");
const files = [
  "about/about-page.tsx",
  "about/about.data.ts",
  "procurement-support/procurement-support-page.tsx",
  "procurement-support/procurement-support.data.ts",
  "contact-preview/contact-information-model.ts",
  "contact-preview/contact-page.tsx",
  "search-preview/search-default-page.tsx",
  "legal-pages/legal-document-model.ts"
];

const content = (
  await Promise.all(files.map((file) => readFile(path.join(root, file), "utf8")))
).join("\n");

const prohibited = [
  /contact@placeholder/i,
  /\+966 XX/i,
  /mailto:/i,
  /tel:/i,
  /wa\.me/i,
  /CONTACT-PLACEHOLDER/i,
  /Saudi law governs/i,
  /retained for \d+ years/i,
  /Google Analytics/i,
  /Mailchimp/i,
  /certified manufacturer/i,
  /our factory/i,
  /years of experience/i,
  /\bF3D\b|\bF4\b|implementation phase/i
];

test("F3D public copy avoids fake business, legal and internal-phase claims", () => {
  for (const pattern of prohibited) assert.doesNotMatch(content, pattern);
  assert.match(content, /awaiting client confirmation/i);
  assert.match(content, /qualified legal review/i);
});
```

- [ ] **Step 2: Add exact browser tests for all routes and viewports**

```ts
import { expect, test } from "@playwright/test";

const routes = [
  "/about",
  "/procurement-support",
  "/contact",
  "/search",
  "/privacy",
  "/terms"
] as const;

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

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      expect(overflow).toBeLessThanOrEqual(0);

      await page.locator("footer").scrollIntoViewIfNeeded();
      await expect(page.locator("footer")).toBeVisible();
    });
  }
}

test("contact stays read-only and search stays in discovery state", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contact");
  await expect(page.getByRole("button", { name: "Send Message" })).toBeDisabled();
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);

  await page.goto("/search");
  await expect(page.locator("[data-search-family-shortcut]")).toHaveCount(5);
  await expect(page.locator("[data-search-result]")).toHaveCount(0);
});
```

- [ ] **Step 3: Run focused source checks**

```bash
node --test apps/web/src/test/f3d-policy.static.test.mjs
node --test apps/web/src/test/f3d-styles.static.test.mjs
pnpm --filter @rosa/web test -- f3d-editorial-components.test.tsx about-page.test.tsx procurement-support-page.test.tsx contact-preview.test.tsx search-preview.test.tsx legal-pages.test.tsx f3d-page-composition.test.tsx public-route-dispatch.test.ts
```

Expected: zero failures. When the environment cannot run the commands, record them as **not run** rather than passed.

- [ ] **Step 4: Run the consolidated frontend gate before any runtime-completion claim**

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
pnpm test:e2e
```

Read every command's complete output and record exit codes. Correct real F3A, F3B, F3C or F3D regressions before integration.

- [ ] **Step 5: Review branch containment**

```bash
git diff --name-status frontend/f3d-public-support-legal-design...HEAD
git log --oneline frontend/f3d-public-support-legal-design..HEAD
```

Confirm:

- only F3D frontend components, routing, styles, tests and completion documentation changed
- no file under `services/api/**` changed
- no file under `packages/contracts/openapi/**` changed
- normal `/contact` does not mount focus/validation/loading/failure/success previews
- normal `/search` does not mount typing/results/mobile-results/loading/no-results/error previews
- legal documents remain visibly unapproved templates

- [ ] **Step 6: Write the completion record and commit**

The completion record must state:

- implementation branch and source tip
- all six public routes
- exact normal public states
- isolated preview states
- Figma references reviewed
- branch comparison
- OpenAPI/backend isolation
- commands actually run and results
- commands not run and reason
- known limitations
- next milestone: F3E static admin experience

```bash
git add apps/web/src/test/f3d-policy.static.test.mjs apps/web/tests/e2e/f3d-public-support-pages.spec.ts docs/superpowers/completions/2026-08-01-rosa-medical-f3d-public-support-legal.md
git commit -m "test: document F3D public support coverage"
```

- [ ] **Step 7: Update the shared README on `main` after branch review**

Update only the frontend lane, integration evidence, current repository state and append one dated Frontend AI → Backend AI message. Preserve the backend-owned section and previous messages. State clearly whether runtime checks were run or deferred.

Commit message:

```bash
git commit -m "docs: coordinate F3D frontend status"
```

---

## Final Verification Checklist

- [ ] `/about` renders the complete editorial composition.
- [ ] About contains five expectations, four audience groups and five family links.
- [ ] `/procurement-support` renders six process steps, four requirement types and six checklist items.
- [ ] `/contact` exposes no realistic fake contact data or actionable unconfirmed contact links.
- [ ] The normal Contact form is labelled, read-only and non-submitting.
- [ ] Contact focus, validation, loading, failure and success states exist only as isolated previews.
- [ ] Default Contact success preview makes no delivery or reference claim.
- [ ] `/search` shows only default discovery and five real family shortcuts.
- [ ] Search typing, desktop results, mobile results, loading, no-results and error states exist only as isolated previews.
- [ ] Search preview results resolve from the F3B registry and use real product links.
- [ ] Search Add to inquiry controls remain disabled.
- [ ] `/privacy` renders exactly nine template sections.
- [ ] `/terms` renders exactly eleven template sections.
- [ ] Both legal pages show unresolved update status and qualified-review warnings.
- [ ] No invented jurisdiction, provider, retention, governing-law or liability wording is published as final.
- [ ] Each route contains one `<h1>` and the shared shell remains the only `<main>` owner.
- [ ] Desktop 1440, tablet 768 and mobile 390 layouts have no horizontal overflow.
- [ ] Footer remains reachable at every viewport.
- [ ] No backend or OpenAPI file changed.
- [ ] Completion documentation distinguishes source review from runtime verification.

## Deferred Scope

The following belongs to the approved interaction milestone after F3 composition:

- desktop product mega-menu behavior
- mobile menu and accordion state
- global search overlay, local matching and result announcements
- search clear, retry and add-to-inquiry actions
- editable contact fields and mocked contact submission
- public contact validation, loading, success and failure route states
- live inquiry count

Live search, contact persistence, transactional email and backend integration remain governed by the shared OpenAPI and integration gates.