# Rosa Medical F3E-D Source-Backed Governance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Rosa Medical uses inline execution only.

**Goal:** Complete the static owner-admin experience with truthful Website Content, Contact Details, Publishing, Revision History and Settings routes, while extracting shared public copy and preserving all live-operation boundaries.

**Architecture:** F3E-D introduces one source-backed public-content registry consumed by both current public components and the read-only admin inventory, one shared launch-readiness model consumed by Dashboard and Publishing, and five focused governance features. The existing admin catch-all resolver gains exact F3E-D route ownership after F3E-B and F3E-C resolution; populated editing, publishing, revision and settings examples remain in preview-only modules that normal routes never import.

**Tech Stack:** Next.js 16 App Router, React 19, strict TypeScript, existing Rosa CSS tokens and F3E-A admin primitives, Vitest server-render tests, Node static-policy tests and Playwright.

## Global Constraints

- Read `README.md` from `main` before implementation and preserve the backend-owned lane, decision ledger and all previous messages.
- Read both approved F3E-D documents before implementation:
  - `docs/superpowers/specs/2026-08-02-rosa-medical-f3e-d-governance-design.md`
  - `docs/superpowers/specs/2026-08-02-rosa-medical-f3e-d-governance-design-review-corrections.md`
- Create `frontend/f3e-d-governance` from `frontend/f3e-d-governance-design` at commit `6cd257b42b2773401a212aa4f3262e2a3c26bf66`.
- Execute inline only. Do not offer or use subagent-driven execution.
- Use milestone/domain commits, not one commit per trivial step.
- Normal governance routes are exactly `/admin/content`, `/admin/contact-details`, `/admin/publishing`, `/admin/revisions` and `/admin/settings`.
- Every deeper path beneath `content`, `contact-details`, `publishing`, `revisions` or `settings` returns not-found.
- No known admin navigation route may fall back to the old generic deferred placeholder after F3E-D.
- Public logo treatment remains `ROSA` only.
- Public rendered text must remain byte-for-byte equivalent after shared-copy extraction except for JSX whitespace normalization already present in HTML.
- The public-content registry contains exactly six blocks: `home.hero`, `home.support`, `about.introduction`, `procurement.introduction`, `contact.introduction`, `footer.description`.
- Each public-content block contains one or more independent fields; do not concatenate unrelated eyebrow, heading, paragraph or label values.
- Public components and Admin Content consume the same exported values. Do not create a second copied admin content dataset.
- Contact Details consumes the existing `CONTACT_INFORMATION` model. Do not copy Figma’s Saudi address, +966 numbers, placeholder domains, hours, map URL or social profiles.
- Contact impact rows must distinguish current consumers from `Not implemented` future consumers.
- Extract F3E-A readiness items into one shared source model used by Dashboard and Publishing; do not duplicate the five blockers.
- Publishing contains no queue records, queue counts, validation-engine output, recent-publication history or operational timestamps.
- Revisions contains no normal revision records, revision numbers, timestamps, authors, filenames or changed values.
- Settings contains no owner email, notification address, quotation recipient, preview domain, provider, storage bucket, deployment branch or authenticated-session data.
- Workflow and policy guidance may use words such as Draft, Review, Publish, Restore and Save. Normal routes must not apply those states to a record or claim an operation occurred.
- Normal actions are real public links or disabled buttons with no handlers.
- Normal routes contain no native `<form>`, file input, API request, storage access, cookies, server action, mutation handler or persistence behavior.
- Normal route modules must not import preview modules or barrels that export preview modules.
- Every demonstration component uses `data-preview-only="true"` and visibly states that no operation occurred.
- Synthetic preview identifiers use only `Example *`, `EXAMPLE-*` and `example.invalid`.
- Preserve the F3E-A shell as the sole `<main>` owner; each governance page renders exactly one `<h1>`.
- Admin-wide `noindex` and `nofollow` metadata remains inherited.
- Target viewports are 1440 × 1000, 768 × 1024 and 390 × 844.
- Do not modify `services/api/**` or `packages/contracts/openapi/**`.
- Do not claim lint, typecheck, tests, build or Playwright passed without fresh command output and exit status.
- Avoid unnecessary GitHub Actions runs.

---

## File Map

### Shared public content source

- Create `apps/web/src/features/public-content-registry/public-content-values.ts` — six exact public copy value groups.
- Create `apps/web/src/features/public-content-registry/public-content-registry.ts` — typed six-block admin/public registry.
- Create `apps/web/src/features/public-content-registry/index.ts` — public-value and registry exports.
- Modify `apps/web/src/features/homepage/homepage.data.ts` — consume shared Home Hero and Home Support values.
- Modify `apps/web/src/features/about/about-page.tsx` — consume shared About introduction.
- Modify `apps/web/src/features/procurement-support/procurement-support-page.tsx` — consume shared Procurement introduction.
- Modify `apps/web/src/features/contact-preview/contact-page.tsx` — consume shared Contact introduction.
- Modify `apps/web/src/components/layout/public-shell.tsx` — consume shared footer description.

### Shared governance source

- Create `apps/web/src/features/admin-governance-source/admin-readiness-model.ts` — five accepted launch blockers.
- Create `apps/web/src/features/admin-governance-source/contact-impact-model.ts` — actual/current versus not-implemented contact consumers.
- Create `apps/web/src/features/admin-governance-source/index.ts` — source-model exports.
- Modify `apps/web/src/features/admin-dashboard/admin-dashboard-model.ts` — import shared readiness items.

### Website Content

- Create `apps/web/src/features/admin-content/admin-content-model.ts` — block/field presentation selectors and homepage composition selector.
- Create `apps/web/src/features/admin-content/admin-content-page.tsx` — normal read-only route.
- Create `apps/web/src/features/admin-content/admin-content-preview-states.tsx` — isolated editing and validation examples.
- Create `apps/web/src/features/admin-content/index.ts` — exports for direct tests only; route view imports the normal page file directly.

### Contact Details

- Create `apps/web/src/features/admin-contact-details/admin-contact-details-model.ts` — unresolved-count and impact selectors.
- Create `apps/web/src/features/admin-contact-details/admin-contact-details-page.tsx` — normal read-only route.
- Create `apps/web/src/features/admin-contact-details/admin-contact-preview-states.tsx` — isolated draft/validation/publication examples.
- Create `apps/web/src/features/admin-contact-details/index.ts` — test exports only.

### Publishing

- Create `apps/web/src/features/admin-publishing/admin-publishing-model.ts` — intended workflow, domains, safety-review rules and shared blockers.
- Create `apps/web/src/features/admin-publishing/admin-publishing-page.tsx` — normal truthful empty queue.
- Create `apps/web/src/features/admin-publishing/admin-publishing-preview-states.tsx` — isolated queue/review/publish examples.
- Create `apps/web/src/features/admin-publishing/index.ts` — test exports only.

### Revisions

- Create `apps/web/src/features/admin-revisions/admin-revision-policy.ts` — append-only policy and future schema fields.
- Create `apps/web/src/features/admin-revisions/admin-revisions-page.tsx` — normal truthful empty history.
- Create `apps/web/src/features/admin-revisions/admin-revision-preview-states.tsx` — isolated history/comparison/restore examples.
- Create `apps/web/src/features/admin-revisions/index.ts` — test exports only.

### Settings

- Create `apps/web/src/features/admin-settings/admin-settings-model.ts` — unresolved and protected configuration categories.
- Create `apps/web/src/features/admin-settings/admin-settings-page.tsx` — normal configuration-state route.
- Create `apps/web/src/features/admin-settings/admin-settings-preview-states.tsx` — isolated password/save/warning examples.
- Create `apps/web/src/features/admin-settings/index.ts` — test exports only.

### Governance routing

- Create `apps/web/src/features/admin-governance-routing/admin-governance-route-model.ts` — exact route resolver and owned-root guard.
- Create `apps/web/src/features/admin-governance-routing/admin-governance-route-view.tsx` — direct normal-only page imports.
- Create `apps/web/src/features/admin-governance-routing/index.ts` — resolver exports only; do not export preview modules.
- Modify `apps/web/src/app/admin/(workspace)/[...segments]/page.tsx` — final management → operations → governance order and strict unknown-route failure.

### Styles, tests and documentation

- Create `apps/web/src/styles/f3e-d-governance.css`.
- Modify `apps/web/src/app/globals.css` — import F3E-D stylesheet after F3E-C.
- Create `apps/web/src/test/public-content-registry.test.tsx`.
- Create `apps/web/src/test/admin-governance-source.test.ts`.
- Create `apps/web/src/test/admin-content.test.tsx`.
- Create `apps/web/src/test/admin-contact-details.test.tsx`.
- Create `apps/web/src/test/admin-publishing.test.tsx`.
- Create `apps/web/src/test/admin-revisions.test.tsx`.
- Create `apps/web/src/test/admin-settings.test.tsx`.
- Create `apps/web/src/test/admin-governance-routing.test.tsx`.
- Create `apps/web/src/test/f3e-d-governance-policy.static.test.mjs`.
- Create `apps/web/src/test/f3e-d-governance-styles.static.test.mjs`.
- Create `apps/web/tests/e2e/f3e-d-governance.spec.ts`.
- Create `docs/superpowers/completions/2026-08-02-rosa-medical-f3e-d-governance.md`.

---

### Task 1: Create the implementation branch and shared public-content registry

**Files:**
- Create: `apps/web/src/features/public-content-registry/public-content-values.ts`
- Create: `apps/web/src/features/public-content-registry/public-content-registry.ts`
- Create: `apps/web/src/features/public-content-registry/index.ts`
- Modify: `apps/web/src/features/homepage/homepage.data.ts`
- Modify: `apps/web/src/features/about/about-page.tsx`
- Modify: `apps/web/src/features/procurement-support/procurement-support-page.tsx`
- Modify: `apps/web/src/features/contact-preview/contact-page.tsx`
- Modify: `apps/web/src/components/layout/public-shell.tsx`
- Test: `apps/web/src/test/public-content-registry.test.tsx`

**Interfaces:**
- Produces: `PUBLIC_CONTENT_VALUES`, `PublicContentField`, `PublicContentBlock`, `PUBLIC_CONTENT_BLOCKS`, `getPublicContentBlock(blockKey)`.
- Consumed later by: Admin Content and static no-duplication checks.

- [ ] **Step 1: Create the implementation branch**

```bash
git switch frontend/f3e-d-governance-design
git pull --ff-only
git switch -c frontend/f3e-d-governance
```

Expected base commit: `6cd257b42b2773401a212aa4f3262e2a3c26bf66`.

- [ ] **Step 2: Write the failing registry test**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PublicShell } from "@/components/layout/public-shell";
import { AboutPage } from "@/features/about/about-page";
import { ContactPage } from "@/features/contact-preview/contact-page";
import { Homepage } from "@/features/homepage/homepage";
import { ProcurementSupportPage } from "@/features/procurement-support/procurement-support-page";
import {
  PUBLIC_CONTENT_BLOCKS,
  PUBLIC_CONTENT_VALUES
} from "@/features/public-content-registry";

describe("F3E-D public content registry", () => {
  it("contains exactly the six approved blocks", () => {
    expect(PUBLIC_CONTENT_BLOCKS.map((block) => block.blockKey)).toEqual([
      "home.hero",
      "home.support",
      "about.introduction",
      "procurement.introduction",
      "contact.introduction",
      "footer.description"
    ]);
  });

  it("preserves every shared value in the public renderers", () => {
    const homepage = renderToStaticMarkup(<Homepage />);
    expect(homepage).toContain(PUBLIC_CONTENT_VALUES.homeHero.title);
    expect(homepage).toContain(PUBLIC_CONTENT_VALUES.homeSupport.title);

    expect(renderToStaticMarkup(<AboutPage />)).toContain(
      PUBLIC_CONTENT_VALUES.aboutIntroduction.title
    );
    expect(renderToStaticMarkup(<ProcurementSupportPage />)).toContain(
      PUBLIC_CONTENT_VALUES.procurementIntroduction.title
    );
    expect(renderToStaticMarkup(<ContactPage />)).toContain(
      PUBLIC_CONTENT_VALUES.contactIntroduction.title
    );
    expect(renderToStaticMarkup(<PublicShell><p>Body</p></PublicShell>)).toContain(
      PUBLIC_CONTENT_VALUES.footerDescription.copy
    );
  });

  it("keeps fields independent and Arabic unresolved", () => {
    for (const block of PUBLIC_CONTENT_BLOCKS) {
      expect(block.fields.length).toBeGreaterThan(0);
      expect(block.fields.every((field) => field.arabicValue === null)).toBe(true);
      expect(new Set(block.fields.map((field) => field.fieldKey)).size).toBe(block.fields.length);
    }
  });
});
```

- [ ] **Step 3: Run the focused test and confirm the red state**

```bash
pnpm --filter @rosa/web test -- public-content-registry.test.tsx
```

Expected: failure because `@/features/public-content-registry` does not exist.

- [ ] **Step 4: Implement exact shared values**

```ts
export const PUBLIC_CONTENT_VALUES = {
  homeHero: {
    eyebrow: "Medical instruments supplier",
    title: "Precision instruments. Procurement made clear.",
    copy: "A composed catalogue and quotation experience for hospitals, distributors and procurement teams."
  },
  homeSupport: {
    eyebrow: "Procurement support",
    title: "A clearer route from catalogue to quotation.",
    copy: "Rosa Medical helps buyers identify, organise and submit instrument requirements without unnecessary complexity."
  },
  aboutIntroduction: {
    eyebrow: "About Rosa",
    title: "A clearer way to source medical instruments.",
    copy: "Rosa supports professional buyers with organised product information, catalogue access and structured quotation requests."
  },
  procurementIntroduction: {
    eyebrow: "Procurement Support",
    title: "Prepare a clearer instrument request.",
    copy: "Use product codes, size and variant information, quantities and notes to organise one request for quotation."
  },
  contactIntroduction: {
    eyebrow: "Contact Rosa",
    title: "Send a general business message.",
    copy: "Use this page for company, catalogue or support questions. Product quotation requests belong in the inquiry flow so product details remain attached."
  },
  footerDescription: {
    copy: "Medical instruments supplier and procurement partner."
  }
} as const;
```

- [ ] **Step 5: Implement typed six-block registry**

```ts
import type { Route } from "next";
import { PUBLIC_CONTENT_VALUES } from "./public-content-values";

export type PublicContentBlockKey =
  | "home.hero"
  | "home.support"
  | "about.introduction"
  | "procurement.introduction"
  | "contact.introduction"
  | "footer.description";

export type PublicContentPageKey = "home" | "about" | "procurement" | "contact" | "global";
export type PublicContentSensitivity = "standard" | "business-positioning" | "contact-routing";

export interface PublicContentField {
  fieldKey: string;
  label: string;
  englishValue: string;
  arabicValue: null;
  fieldType: "short-text" | "long-text" | "label";
  characterGuidance: string;
}

export interface PublicContentBlock {
  blockKey: PublicContentBlockKey;
  pageKey: PublicContentPageKey;
  label: string;
  fields: readonly PublicContentField[];
  publicHref: Route<string>;
  affectedComponent: string;
  sensitivity: PublicContentSensitivity;
}
```

Build `PUBLIC_CONTENT_BLOCKS` in the order tested. Each eyebrow/title/copy is its own field. Footer has one field. Use human-readable character guidance such as `Keep under 90 characters` and do not calculate a completion score.

- [ ] **Step 6: Replace inline public text with shared values**

Update only the approved fields:

- `HOME_PAGE_MODEL.hero.{eyebrow,title,copy}`
- `HOME_PAGE_MODEL.procurement.{eyebrow,title,copy}`
- About hero eyebrow/title/copy
- Procurement hero eyebrow/title/copy
- Contact hero eyebrow/title/copy
- Public footer description

Do not move CTA labels, secondary section copy or legal copy into the registry.

- [ ] **Step 7: Verify and commit**

```bash
pnpm --filter @rosa/web test -- public-content-registry.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/public-content-registry apps/web/src/features/homepage/homepage.data.ts apps/web/src/features/about/about-page.tsx apps/web/src/features/procurement-support/procurement-support-page.tsx apps/web/src/features/contact-preview/contact-page.tsx apps/web/src/components/layout/public-shell.tsx apps/web/src/test/public-content-registry.test.tsx
git commit -m "feat: establish F3E-D shared public content registry"
```

---

### Task 2: Extract shared readiness and contact-impact source models

**Files:**
- Create: `apps/web/src/features/admin-governance-source/admin-readiness-model.ts`
- Create: `apps/web/src/features/admin-governance-source/contact-impact-model.ts`
- Create: `apps/web/src/features/admin-governance-source/index.ts`
- Modify: `apps/web/src/features/admin-dashboard/admin-dashboard-model.ts`
- Test: `apps/web/src/test/admin-governance-source.test.ts`

**Interfaces:**
- Produces: `ADMIN_READINESS_ITEMS`, `ContactImpactStatus`, `ContactImpactRow`, `CONTACT_IMPACT_ROWS`, `getUnresolvedContactCount()`.
- Consumed later by: Contact Details and Publishing.

- [ ] **Step 1: Write the failing source-model tests**

```ts
import { describe, expect, it } from "vitest";
import { CONTACT_INFORMATION } from "@/features/contact-preview/contact-information-model";
import { getAdminDashboardModel } from "@/features/admin-dashboard";
import {
  ADMIN_READINESS_ITEMS,
  CONTACT_IMPACT_ROWS,
  getUnresolvedContactCount
} from "@/features/admin-governance-source";

describe("F3E-D governance source models", () => {
  it("keeps one shared five-item readiness model", () => {
    expect(ADMIN_READINESS_ITEMS).toHaveLength(5);
    expect(getAdminDashboardModel().readinessItems).toBe(ADMIN_READINESS_ITEMS);
  });

  it("derives the unresolved contact count", () => {
    expect(getUnresolvedContactCount()).toBe(
      CONTACT_INFORMATION.filter((row) => !row.confirmed).length
    );
  });

  it("distinguishes current and unimplemented consumers", () => {
    expect(CONTACT_IMPACT_ROWS.some((row) => row.status === "Current frontend consumer")).toBe(true);
    expect(CONTACT_IMPACT_ROWS.some((row) => row.status === "Not implemented")).toBe(true);
  });
});
```

- [ ] **Step 2: Run and confirm failure**

```bash
pnpm --filter @rosa/web test -- admin-governance-source.test.ts
```

- [ ] **Step 3: Move readiness items without changing values**

Export `ADMIN_READINESS_ITEMS` using the current five exact items from `getAdminDashboardModel()`. Type it as `readonly AdminReadinessItem[]`. Modify Dashboard to reference the exported array directly.

- [ ] **Step 4: Implement contact impact rows**

```ts
export type ContactImpactStatus = "Current frontend consumer" | "Not implemented";

export interface ContactImpactRow {
  key: "contact-page" | "footer" | "inquiry-confirmation" | "message-confirmation" | "email-templates";
  label: string;
  fields: readonly string[];
  status: ContactImpactStatus;
}
```

Use these truthful statuses:

- Contact page — `Current frontend consumer`
- Footer — `Not implemented`
- Inquiry confirmation — `Not implemented`
- Contact-message confirmation — `Not implemented`
- Email templates — `Not implemented`

Do not claim email templates or confirmation delivery exists.

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-governance-source.test.ts admin-dashboard.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-governance-source apps/web/src/features/admin-dashboard/admin-dashboard-model.ts apps/web/src/test/admin-governance-source.test.ts
git commit -m "refactor: share F3E-D governance source models"
```

---

### Task 3: Build the source-backed Website Content route

**Files:**
- Create: `apps/web/src/features/admin-content/admin-content-model.ts`
- Create: `apps/web/src/features/admin-content/admin-content-page.tsx`
- Create: `apps/web/src/features/admin-content/index.ts`
- Test: `apps/web/src/test/admin-content.test.tsx`

**Interfaces:**
- Consumes: `PUBLIC_CONTENT_BLOCKS`, `CATALOGUE_FAMILIES`, `selectFeaturedProducts()`, F3E-A admin primitives.
- Produces: `AdminContentBlockModel`, `AdminHomepageCompositionModel`, `getAdminContentBlocks()`, `getAdminHomepageComposition()`, `AdminContentPage`.

- [ ] **Step 1: Write failing model and page tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CATALOGUE_FAMILIES } from "@/features/catalogue-registry";
import { selectFeaturedProducts } from "@/features/public-catalogue";
import {
  AdminContentPage,
  getAdminContentBlocks,
  getAdminHomepageComposition
} from "@/features/admin-content";

describe("F3E-D Admin Content", () => {
  it("derives six blocks and current homepage composition", () => {
    expect(getAdminContentBlocks()).toHaveLength(6);
    const composition = getAdminHomepageComposition();
    expect(composition.families).toHaveLength(CATALOGUE_FAMILIES.length);
    expect(composition.products).toEqual(selectFeaturedProducts());
  });

  it("renders truthful read-only content records", () => {
    const html = renderToStaticMarkup(<AdminContentPage />);
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect((html.match(/data-admin-content-block=/g) ?? [])).toHaveLength(6);
    expect(html).toContain("Edit approved content, not the design.");
    expect(html).toContain("Current frontend composition");
    expect(html).not.toContain("data-preview-only");
    expect(html).not.toContain("<form");
    expect(html).not.toMatch(/Last saved|Revision \d+|Published today|Needs review/i);
  });
});
```

- [ ] **Step 2: Run and confirm failure**

```bash
pnpm --filter @rosa/web test -- admin-content.test.tsx
```

- [ ] **Step 3: Implement selectors**

`getAdminContentBlocks()` maps `PUBLIC_CONTENT_BLOCKS` without copying text. Each returned block includes the original `fields` array reference, real public route and affected component.

`getAdminHomepageComposition()` returns:

```ts
{
  families: CATALOGUE_FAMILIES,
  products: selectFeaturedProducts()
}
```

Do not label products as saved featured assignments.

- [ ] **Step 4: Implement normal page**

Required order:

1. `AdminPageHeader` — eyebrow `Website Content`, heading `Edit approved content, not the design.`
2. Static-source warning explaining no live CMS exists.
3. `AdminToolbar` with read-only search and disabled page/type filters.
4. Six content block cards using `data-admin-content-block="true"`.
5. For each field: English read-only preview and Arabic `Not supplied`; real public route link.
6. Disabled Edit, Save draft, Preview changes and Submit for review actions.
7. `Current frontend composition` section with five families and current selector-derived products.
8. Protected-layout boundary list.
9. Legal-template warning for Privacy and Terms.

No enabled management action or record status appears.

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-content.test.tsx public-content-registry.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-content apps/web/src/test/admin-content.test.tsx
git commit -m "feat: build F3E-D website content composition"
```

---

### Task 4: Build the source-backed Contact Details route

**Files:**
- Create: `apps/web/src/features/admin-contact-details/admin-contact-details-model.ts`
- Create: `apps/web/src/features/admin-contact-details/admin-contact-details-page.tsx`
- Create: `apps/web/src/features/admin-contact-details/index.ts`
- Test: `apps/web/src/test/admin-contact-details.test.tsx`

**Interfaces:**
- Consumes: `CONTACT_INFORMATION`, `CONTACT_IMPACT_ROWS`, `getUnresolvedContactCount()`, F3E-A primitives.
- Produces: `AdminContactDetailsModel`, `getAdminContactDetailsModel()`, `AdminContactDetailsPage`.

- [ ] **Step 1: Write failing tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CONTACT_INFORMATION } from "@/features/contact-preview/contact-information-model";
import {
  AdminContactDetailsPage,
  getAdminContactDetailsModel
} from "@/features/admin-contact-details";

describe("F3E-D Contact Details", () => {
  it("uses the existing contact model without replacement values", () => {
    const model = getAdminContactDetailsModel();
    expect(model.rows).toBe(CONTACT_INFORMATION);
    expect(model.unresolvedCount).toBe(CONTACT_INFORMATION.filter((row) => !row.confirmed).length);
  });

  it("renders no invented actionable contact data", () => {
    const html = renderToStaticMarkup(<AdminContactDetailsPage />);
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain("Replace unresolved contact values safely.");
    expect(html).toContain("Awaiting client confirmation");
    expect(html).not.toMatch(/\+966|Riyadh|Saudi Arabia|placeholder\.com|mailto:|tel:|wa\.me/i);
    expect(html).not.toContain("data-preview-only");
    expect(html).not.toContain("<form");
  });
});
```

- [ ] **Step 2: Run and confirm failure**

```bash
pnpm --filter @rosa/web test -- admin-contact-details.test.tsx
```

- [ ] **Step 3: Implement model**

Return direct references to `CONTACT_INFORMATION` and `CONTACT_IMPACT_ROWS`; derive unresolved count. Add no map URL, locale completion or social records.

- [ ] **Step 4: Implement normal page**

Required order:

1. Header `Contact Details` / `Replace unresolved contact values safely.`
2. Warning with derived unresolved count.
3. Seven source rows; business name confirmed and remaining values unresolved.
4. English/Arabic paired fields only where structurally meaningful; Arabic always `Not supplied`.
5. Impact map with explicit current/not-implemented badges.
6. Placeholder warning.
7. Disabled Save draft, Preview affected pages, Submit for review, Add social profile, Confirm contact value and Publish contact details.

Do not render featured content here; that Figma section is not part of Contact Details source truth.

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-contact-details.test.tsx admin-governance-source.test.ts
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-contact-details apps/web/src/test/admin-contact-details.test.tsx
git commit -m "feat: build F3E-D contact details composition"
```

---

### Task 5: Build the truthful Publishing Centre

**Files:**
- Create: `apps/web/src/features/admin-publishing/admin-publishing-model.ts`
- Create: `apps/web/src/features/admin-publishing/admin-publishing-page.tsx`
- Create: `apps/web/src/features/admin-publishing/index.ts`
- Test: `apps/web/src/test/admin-publishing.test.tsx`

**Interfaces:**
- Consumes: `ADMIN_READINESS_ITEMS`, F3E-A primitives and real public `/` link.
- Produces: `PUBLISHING_WORKFLOW`, `PUBLISHABLE_DOMAINS`, `SENSITIVE_REVIEW_RULES`, `getAdminPublishingModel()`, `AdminPublishingPage`.

- [ ] **Step 1: Write failing tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ADMIN_READINESS_ITEMS } from "@/features/admin-governance-source";
import {
  AdminPublishingPage,
  getAdminPublishingModel
} from "@/features/admin-publishing";

describe("F3E-D Publishing Centre", () => {
  it("uses the accepted workflow and shared blockers", () => {
    const model = getAdminPublishingModel();
    expect(model.workflow.map((step) => step.label)).toEqual([
      "Draft",
      "Review",
      "Public preview",
      "Explicit publish",
      "Revision history"
    ]);
    expect(model.blockers).toBe(ADMIN_READINESS_ITEMS);
  });

  it("renders a truthful empty queue without operational metrics", () => {
    const html = renderToStaticMarkup(<AdminPublishingPage />);
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain("No publishing queue is connected.");
    expect(html).toContain("View current public site");
    expect(html).not.toContain("data-preview-only");
    expect(html).not.toMatch(/Recently published|Open queue|Published \d|Drafts:\s*\d|Needs review:\s*\d/i);
  });
});
```

- [ ] **Step 2: Run and confirm failure**

```bash
pnpm --filter @rosa/web test -- admin-publishing.test.tsx
```

- [ ] **Step 3: Implement model**

Define immutable arrays for:

- five workflow steps;
- six publishable domains: Products, Families, Catalogues, Media, Website Content, Contact Details;
- seven sensitive-review categories from the approved spec;
- `blockers: ADMIN_READINESS_ITEMS` by reference.

Do not add queue arrays, publication records or validation results.

- [ ] **Step 4: Implement normal page**

Required order:

1. Header `Publishing Centre` / `Review every public change.` with real link to `/`.
2. Truthful non-preview empty state `No publishing queue is connected.`
3. Five-step intended workflow.
4. Five shared source blockers.
5. Six publishable domains.
6. Non-publishable systems boundary.
7. Sensitive-review list.
8. Disabled Open draft preview, Run validation and Publish actions.

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-publishing.test.tsx admin-governance-source.test.ts
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-publishing apps/web/src/test/admin-publishing.test.tsx
git commit -m "feat: build F3E-D publishing centre composition"
```

---

### Task 6: Build truthful Revision History and Settings routes

**Files:**
- Create: `apps/web/src/features/admin-revisions/admin-revision-policy.ts`
- Create: `apps/web/src/features/admin-revisions/admin-revisions-page.tsx`
- Create: `apps/web/src/features/admin-revisions/index.ts`
- Create: `apps/web/src/features/admin-settings/admin-settings-model.ts`
- Create: `apps/web/src/features/admin-settings/admin-settings-page.tsx`
- Create: `apps/web/src/features/admin-settings/index.ts`
- Test: `apps/web/src/test/admin-revisions.test.tsx`
- Test: `apps/web/src/test/admin-settings.test.tsx`

**Interfaces:**
- Produces: `REVISION_POLICY_ITEMS`, `REVISION_SCHEMA_FIELDS`, `AdminRevisionsPage`, `ADMIN_SETTINGS_GROUPS`, `PROTECTED_SYSTEM_SETTINGS`, `AdminSettingsPage`.

- [ ] **Step 1: Write failing Revision tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  AdminRevisionsPage,
  REVISION_POLICY_ITEMS,
  REVISION_SCHEMA_FIELDS
} from "@/features/admin-revisions";

describe("F3E-D Revision History", () => {
  it("documents append-only policy and future field names", () => {
    expect(REVISION_POLICY_ITEMS).toHaveLength(6);
    expect(REVISION_SCHEMA_FIELDS).toContain("Changed fields");
    expect(REVISION_SCHEMA_FIELDS).toContain("Restored revision identifier");
  });

  it("renders no normal revision record", () => {
    const html = renderToStaticMarkup(<AdminRevisionsPage />);
    expect(html).toContain("No revision history is available.");
    expect(html).not.toContain("data-admin-revision-record");
    expect(html).not.toMatch(/Revision \d+|Published today|Restore revision \d+/i);
    expect(html).not.toContain("data-preview-only");
  });
});
```

- [ ] **Step 2: Write failing Settings tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  AdminSettingsPage,
  ADMIN_SETTINGS_GROUPS,
  PROTECTED_SYSTEM_SETTINGS
} from "@/features/admin-settings";

describe("F3E-D Settings", () => {
  it("defines unresolved configuration groups and protected boundaries", () => {
    expect(ADMIN_SETTINGS_GROUPS.map((group) => group.key)).toEqual([
      "owner",
      "notifications",
      "preview",
      "arabic",
      "storage-deployment"
    ]);
    expect(PROTECTED_SYSTEM_SETTINGS).toContain("ROSA identity");
  });

  it("renders no fictional configuration", () => {
    const html = renderToStaticMarkup(<AdminSettingsPage />);
    expect(html).toContain("Owner authentication not connected");
    expect(html).toContain("Not configured");
    expect(html).toContain("Not connected");
    expect(html).not.toMatch(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    expect(html).not.toMatch(/preview\.[a-z]|Cloudflare|Supabase|S3|bucket/i);
    expect(html).not.toContain("<form");
    expect(html).not.toContain("data-preview-only");
  });
});
```

- [ ] **Step 3: Run and confirm failure**

```bash
pnpm --filter @rosa/web test -- admin-revisions.test.tsx admin-settings.test.tsx
```

- [ ] **Step 4: Implement Revision policy and page**

Policy items:

1. Publishing creates a new immutable revision.
2. Previous revisions remain available.
3. Rollback never edits or deletes old history.
4. Rollback creates a new revision from restored values.
5. Comparison shows only changed fields.
6. Sensitive restoration requires future owner re-authentication.

Schema field labels are the ten approved labels from the specification. Page includes read-only search, disabled type/action filters, truthful empty state, policy, schema guidance and disabled Compare/Restore/Rollback controls.

- [ ] **Step 5: Implement Settings model and page**

Groups and values:

- Owner: authentication not connected; email unavailable; Change password, Recovery settings and Sign out disabled.
- Notifications: two recipients not configured; email provider not connected.
- Public preview: real `/` link; draft preview not connected; preview URL not configured.
- Arabic: launch deferred; fields structurally supported; publishing protected.
- Storage/deployment: managed uploads, PDF storage, deployment publishing and revision persistence not connected.

Render protected-system list and disabled Save settings. Do not render a native form.

- [ ] **Step 6: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-revisions.test.tsx admin-settings.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-revisions apps/web/src/features/admin-settings apps/web/src/test/admin-revisions.test.tsx apps/web/src/test/admin-settings.test.tsx
git commit -m "feat: build F3E-D revisions and settings compositions"
```

---

### Task 7: Add isolated governance preview systems

**Files:**
- Create: `apps/web/src/features/admin-content/admin-content-preview-states.tsx`
- Create: `apps/web/src/features/admin-contact-details/admin-contact-preview-states.tsx`
- Create: `apps/web/src/features/admin-publishing/admin-publishing-preview-states.tsx`
- Create: `apps/web/src/features/admin-revisions/admin-revision-preview-states.tsx`
- Create: `apps/web/src/features/admin-settings/admin-settings-preview-states.tsx`
- Modify: domain `index.ts` files for direct test exports only.
- Modify: five domain tests to cover previews.

**Interfaces:**
- Consumes: F3E-A preview/field/alert primitives and source-backed product/content values where required.
- Produces: 35 isolated preview components listed in the approved specification.

- [ ] **Step 1: Add failing preview inventory tests**

For each domain, render all preview exports and assert:

```tsx
expect((html.match(/data-preview-only=/g) ?? [])).toHaveLength(expectedCount);
expect(html).toContain("No content, contact, publishing, revision or setting operation occurred");
expect(html).not.toMatch(/owner@rosa|notifications@rosa|sales@rosa|Published today|Revision 18/i);
```

Expected counts:

- Content: 9
- Contact: 7
- Publishing: 8
- Revisions: 5
- Settings: 6

- [ ] **Step 2: Run tests and confirm failure**

```bash
pnpm --filter @rosa/web test -- admin-content.test.tsx admin-contact-details.test.tsx admin-publishing.test.tsx admin-revisions.test.tsx admin-settings.test.tsx
```

- [ ] **Step 3: Implement one shared preview-frame pattern per file**

Every component renders:

```tsx
<section data-preview-only="true" className="admin-governance-preview">
  <p className="page-eyebrow">Demonstration preview only</p>
  <h2>{title}</h2>
  <p>No content, contact, publishing, revision or setting operation occurred in this static preview.</p>
  {children}
</section>
```

Use unique heading IDs only when an `aria-labelledby` relationship exists. All action buttons are disabled.

- [ ] **Step 4: Implement exact inventories**

Content: block editor, locale editing, validation warning, sensitive-copy warning, save loading/failure/confirmation, review confirmation, public-preview comparison.

Contact: edited draft, unresolved validation, affected-location comparison, save loading/failure, review confirmation, publication confirmation.

Publishing: populated queue, validation-failure queue, review detail, re-authentication, publish confirmation/failure/success, recently-published list.

Revisions: populated list, field comparison, restore confirmation/failure/success.

Settings: password change, notification validation, save loading/failure/success, protected-setting warning.

Use only synthetic labels. Do not use realistic timestamps, filenames, revision numbers, email addresses or domains.

- [ ] **Step 5: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-content.test.tsx admin-contact-details.test.tsx admin-publishing.test.tsx admin-revisions.test.tsx admin-settings.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-content apps/web/src/features/admin-contact-details apps/web/src/features/admin-publishing apps/web/src/features/admin-revisions apps/web/src/features/admin-settings apps/web/src/test/admin-content.test.tsx apps/web/src/test/admin-contact-details.test.tsx apps/web/src/test/admin-publishing.test.tsx apps/web/src/test/admin-revisions.test.tsx apps/web/src/test/admin-settings.test.tsx
git commit -m "feat: add F3E-D governance preview states"
```

---

### Task 8: Add exact governance routing and remove generic known-route fallback

**Files:**
- Create: `apps/web/src/features/admin-governance-routing/admin-governance-route-model.ts`
- Create: `apps/web/src/features/admin-governance-routing/admin-governance-route-view.tsx`
- Create: `apps/web/src/features/admin-governance-routing/index.ts`
- Modify: `apps/web/src/app/admin/(workspace)/[...segments]/page.tsx`
- Test: `apps/web/src/test/admin-governance-routing.test.tsx`

**Interfaces:**
- Produces: `ADMIN_GOVERNANCE_ROOTS`, `AdminGovernanceRoot`, `AdminGovernanceRouteResult`, `isAdminGovernanceRoot()`, `resolveAdminGovernanceRoute()`, `AdminGovernanceRouteView`.

- [ ] **Step 1: Write failing route tests**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  AdminGovernanceRouteView,
  isAdminGovernanceRoot,
  resolveAdminGovernanceRoute
} from "@/features/admin-governance-routing";

describe("F3E-D governance routing", () => {
  it.each([
    ["content"],
    ["contact-details"],
    ["publishing"],
    ["revisions"],
    ["settings"]
  ])("resolves exact route %j", (segments) => {
    expect(resolveAdminGovernanceRoute(segments).kind).toBe(segments[0]);
  });

  it.each([
    [],
    ["content", "example"],
    ["contact-details", "example"],
    ["publishing", "example"],
    ["revisions", "example"],
    ["settings", "example"],
    ["unknown"]
  ])("rejects unsupported shape %j", (segments) => {
    expect(resolveAdminGovernanceRoute(segments).kind).toBe("not-found");
  });

  it("renders normal route views without preview-only states", () => {
    const html = renderToStaticMarkup(
      <AdminGovernanceRouteView result={{ kind: "content" }} />
    );
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).not.toContain("data-preview-only");
  });

  it("owns only the five governance roots", () => {
    expect(isAdminGovernanceRoot("content")).toBe(true);
    expect(isAdminGovernanceRoot("products")).toBe(false);
  });
});
```

- [ ] **Step 2: Run and confirm failure**

```bash
pnpm --filter @rosa/web test -- admin-governance-routing.test.tsx
```

- [ ] **Step 3: Implement exact route model**

```ts
export const ADMIN_GOVERNANCE_ROOTS = [
  "content",
  "contact-details",
  "publishing",
  "revisions",
  "settings"
] as const;

export type AdminGovernanceRoot = (typeof ADMIN_GOVERNANCE_ROOTS)[number];
export type AdminGovernanceRouteResult =
  | { kind: AdminGovernanceRoot }
  | { kind: "not-found" };
```

Resolve only `segments.length === 1` and an approved root.

- [ ] **Step 4: Implement route view with direct normal-only imports**

Import page modules directly, for example:

```ts
import { AdminContentPage } from "@/features/admin-content/admin-content-page";
```

Do not import domain barrels. Switch every kind; `not-found` calls `notFound()`. Never return `null`.

- [ ] **Step 5: Finalize catch-all order**

1. Management resolver.
2. Operations resolver.
3. Governance resolver.
4. If any resolver owns the root but returns not-found, call `notFound()`.
5. For all remaining unknown roots, call `notFound()`.

Remove `AdminDeferredRoutePage` and `getAdminNavigationItem` imports from this route file. After F3E-D no known or unknown admin route uses the generic fallback.

- [ ] **Step 6: Verify and commit**

```bash
pnpm --filter @rosa/web test -- admin-governance-routing.test.tsx admin-management-routing.test.tsx admin-operations-routing.test.tsx
pnpm --filter @rosa/web typecheck
git add apps/web/src/features/admin-governance-routing apps/web/src/app/admin/'(workspace)'/'[...segments]'/page.tsx apps/web/src/test/admin-governance-routing.test.tsx
git commit -m "feat: route F3E-D governance pages"
```

---

### Task 9: Add responsive governance styling

**Files:**
- Create: `apps/web/src/styles/f3e-d-governance.css`
- Modify: `apps/web/src/app/globals.css`
- Test: `apps/web/src/test/f3e-d-governance-styles.static.test.mjs`

**Interfaces:**
- Consumes: F3E-D class names and existing Rosa tokens.
- Produces: desktop/tablet/mobile layouts without page-level overflow.

- [ ] **Step 1: Write failing style test**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../styles/f3e-d-governance.css", import.meta.url), "utf8");
const globals = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("F3E-D styles cover all governance domains and breakpoints", () => {
  for (const selector of [
    ".admin-content-page",
    ".admin-contact-details-page",
    ".admin-publishing-page",
    ".admin-revisions-page",
    ".admin-settings-page",
    ".admin-governance-preview"
  ]) assert.match(css, new RegExp(selector.replace(".", "\\.")));
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.match(css, /@media \(max-width: 520px\)/);
  assert.match(css, /overflow-wrap:\s*anywhere/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(globals, /@import "\.\.\/styles\/f3e-d-governance\.css";/);
});
```

- [ ] **Step 2: Run and confirm failure**

```bash
node --test apps/web/src/test/f3e-d-governance-styles.static.test.mjs
```

- [ ] **Step 3: Implement styles**

Required behavior:

- consistent grid-flow page roots;
- two-column content/contact field layouts at desktop, one column below 900 px;
- content cards and impact rows stack at mobile;
- publishing workflow is five columns desktop, vertical below 720 px;
- readiness cards are responsive without fixed heights;
- revision schema is a definition-list grid and one column mobile;
- settings groups use two columns desktop, one below 900 px;
- action rows wrap and buttons become full-width below 520 px;
- long copy, routes and statuses use `overflow-wrap: anywhere` and `min-width: 0`;
- no gradients, glass effects, fixed content heights or page-level horizontal scrolling;
- disabled controls remain visibly disabled;
- reduced-motion removes nonessential transitions.

- [ ] **Step 4: Import stylesheet and verify**

```css
@import "../styles/f3e-d-governance.css";
```

```bash
node --test apps/web/src/test/f3e-d-governance-styles.static.test.mjs
pnpm --filter @rosa/web typecheck
git add apps/web/src/styles/f3e-d-governance.css apps/web/src/app/globals.css apps/web/src/test/f3e-d-governance-styles.static.test.mjs
git commit -m "feat: style F3E-D governance pages"
```

---

### Task 10: Add policy regression and exact browser coverage

**Files:**
- Create: `apps/web/src/test/f3e-d-governance-policy.static.test.mjs`
- Create: `apps/web/tests/e2e/f3e-d-governance.spec.ts`
- Modify: focused component tests only when a discovered policy gap requires it.

**Interfaces:**
- Consumes: normal F3E-D source modules and rendered routes.
- Produces: no-invention, no-preview-leak, strict-route and responsive evidence.

- [ ] **Step 1: Create static policy test**

Scan only normal source files, route model/view, shared registry and shared source models. Assert absence of:

```js
const prohibited = [
  /\+966|Riyadh|Saudi Arabia|placeholder\.com/i,
  /owner@|notifications@|sales@|preview\.rosa/i,
  /Published today|Published yesterday|Recently published/i,
  /Revision \d+|Published \d{1,2}:\d{2}/i,
  /\b\d+(?:\.\d+)?\s*(?:KB|MB)\b/i,
  /type=["']file["']/i,
  /onSubmit=|fetch\(|localStorage|sessionStorage|document\.cookie/i,
  /data-preview-only/i,
  /preview-states|preview-fixtures/i
];
```

Also assert:

- six content block keys;
- route view contains no `return null`;
- route view imports direct page paths;
- catch-all contains no `AdminDeferredRoutePage`;
- normal source contains `No publishing queue is connected`, `No revision history is available`, `Not configured` and `Not connected`.

- [ ] **Step 2: Add exact Playwright matrix**

Routes:

- `/admin/content`
- `/admin/contact-details`
- `/admin/publishing`
- `/admin/revisions`
- `/admin/settings`

At 1440 × 1000, 768 × 1024 and 390 × 844 verify:

- response is successful;
- one `<main>` and one `<h1>`;
- no `[data-preview-only]`;
- no `<form>` or file input;
- inherited `meta[name="robots"]` contains `noindex`;
- no horizontal overflow;
- final main child can scroll into view.

- [ ] **Step 3: Add route-specific browser checks**

- Content: six `[data-admin-content-block]`; five family entries; current product selection visible.
- Contact: seven contact rows; unresolved warning; no `mailto:`, `tel:` or WhatsApp link.
- Publishing: zero queue records; five workflow steps; five blockers; View current public site link works.
- Revisions: no revision record; append-only policy visible.
- Settings: no email-looking text; Save settings and account actions disabled.

- [ ] **Step 4: Add strict 404 matrix**

Verify 404 for:

- `/admin/content/example`
- `/admin/contact-details/example`
- `/admin/publishing/example`
- `/admin/revisions/example`
- `/admin/settings/example`
- `/admin/unknown`

- [ ] **Step 5: Run focused checks and commit**

```bash
node --test apps/web/src/test/f3e-d-governance-policy.static.test.mjs
node --test apps/web/src/test/f3e-d-governance-styles.static.test.mjs
pnpm --filter @rosa/web test -- public-content-registry.test.tsx admin-governance-source.test.ts admin-content.test.tsx admin-contact-details.test.tsx admin-publishing.test.tsx admin-revisions.test.tsx admin-settings.test.tsx admin-governance-routing.test.tsx
```

If unavailable, record as not run.

```bash
git add apps/web/src/test/f3e-d-governance-policy.static.test.mjs apps/web/tests/e2e/f3e-d-governance.spec.ts
git commit -m "test: add F3E-D governance coverage"
```

---

### Task 11: Consolidated verification, source review, completion record and README coordination

**Files:**
- Create: `docs/superpowers/completions/2026-08-02-rosa-medical-f3e-d-governance.md`
- Update after feature completion: `README.md` on `main`

**Interfaces:**
- Consumes: complete F3E-D branch, test evidence and shared coordination protocol.
- Produces: exact milestone record and F4 handoff.

- [ ] **Step 1: Run the full frontend gate before any runtime-success claim**

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
node --test apps/web/src/test/f3e-c-operations-styles.static.test.mjs
node --test apps/web/src/test/f3e-c-operations-policy.static.test.mjs
node --test apps/web/src/test/f3e-d-governance-styles.static.test.mjs
node --test apps/web/src/test/f3e-d-governance-policy.static.test.mjs
pnpm test:e2e
```

Record complete outputs and exit codes. If the GitHub-only environment cannot execute them, every command remains not run.

- [ ] **Step 2: Review branch containment and architecture**

```bash
git diff --name-status frontend/f3e-d-governance-design...HEAD
git log --oneline frontend/f3e-d-governance-design..HEAD
```

Confirm:

- changes are limited to F3E-D frontend features, approved public-copy extraction, dashboard readiness refactor, one existing route file, styles, tests and completion documentation;
- no backend or OpenAPI file changed;
- public output is preserved;
- normal routes import no preview module or preview-exporting barrel;
- exactly six public content blocks exist;
- one readiness array is shared;
- all five governance routes resolve and all nested paths fail closed;
- no generic known-route placeholder remains;
- no normal queue, revision or settings fixture exists.

- [ ] **Step 3: Perform compile-risk and accessibility review**

Inspect:

- no import cycles between public registry and public features;
- `Route<string>` typing;
- server-only route view and `notFound()` behavior;
- one feature `<h1>` per route and shell-only `<main>`;
- stable IDs in field/preview components;
- disabled buttons use `type="button"`;
- no nested interactive controls;
- Arabic field direction where shown;
- long text and mobile overflow;
- no duplicate data hidden behind responsive markup;
- public-copy extraction does not alter punctuation or casing.

Correct defects in focused commits before documenting status.

- [ ] **Step 4: Write completion record**

Record:

- branch and source tip;
- design/plan base commits;
- five normal routes;
- six shared public blocks;
- contact and blocker source reuse;
- empty Publishing and Revision boundaries;
- unresolved Settings boundaries;
- isolated preview inventory;
- final strict admin routing;
- branch comparison;
- unchanged backend/OpenAPI boundary;
- commands actually run and results;
- commands not run and reason;
- known limitations;
- next stage: consolidated verification, then F4 mocked interactions.

Commit:

```bash
git add docs/superpowers/completions/2026-08-02-rosa-medical-f3e-d-governance.md
git commit -m "docs: record F3E-D governance status"
```

- [ ] **Step 5: Update shared README on `main`**

Read current `README.md` from `main` immediately before editing. Preserve backend-owned content, accepted decisions and prior messages. Update only:

- coordination timestamp;
- G5 frontend evidence with static Content and Contact compositions;
- G6 frontend evidence with truthful Publishing and Revision compositions while stating no live workflow exists;
- frontend branch, tip, completed work, verification state, next work and blockers;
- current repository state;
- one dated Frontend AI → Backend AI message.

Message facts:

- no backend/OpenAPI change;
- six public content blocks are shared by public and admin source;
- contact details still await client confirmation;
- publishing and revisions are documentation-only, not live;
- settings contain no real provider or owner configuration;
- next work is consolidated frontend verification followed by F4 mocked interaction behavior.

Commit message:

```bash
git commit -m "docs: coordinate F3E-D frontend status"
```

---

## Final Verification Checklist

- [ ] Exactly six public content blocks exist and public components consume their values.
- [ ] Public rendered text remains unchanged for the extracted fields.
- [ ] Admin Content shows six read-only blocks with separate English and Arabic fields.
- [ ] Homepage family and product composition derives from existing selectors.
- [ ] Contact Details uses `CONTACT_INFORMATION` directly and derives unresolved count.
- [ ] No invented address, phone, email, hours, map or social value appears.
- [ ] Contact impact rows distinguish current and unimplemented consumers.
- [ ] Dashboard and Publishing reference the same readiness array.
- [ ] Publishing has no queue records or numeric operational metrics.
- [ ] Publishing shows five workflow steps, five blockers and six public content domains.
- [ ] Revision History has no normal revision record, number, timestamp, filename or author.
- [ ] Settings has no email address, preview domain, provider, bucket, deployment branch or authenticated owner identity.
- [ ] All normal action buttons are disabled; only current public-page links are active.
- [ ] Preview inventories match 9 Content, 7 Contact, 8 Publishing, 5 Revision and 6 Settings examples.
- [ ] Every preview is marked `data-preview-only` and states no operation occurred.
- [ ] Normal route dependency modules import no preview file or preview-exporting barrel.
- [ ] Exact governance roots resolve; every nested governance path returns 404.
- [ ] Unknown admin routes return 404; generic deferred routing is removed from the catch-all page.
- [ ] Every normal governance route has one feature h1, inherits one main and noindex metadata.
- [ ] Desktop, tablet and mobile routes are overflow-safe.
- [ ] No backend or OpenAPI file changed.
- [ ] Completion documentation distinguishes source review from runtime verification.

## Deferred Scope

- Live content/contact CRUD
- Draft persistence and review queues
- Unpublished preview builds
- Validation engine
- Publish deployment
- Revision persistence, comparison and rollback
- Owner re-authentication
- Settings persistence
- Notification/email provider configuration
- Upload/storage configuration
- Arabic publishing
- Backend API integration
