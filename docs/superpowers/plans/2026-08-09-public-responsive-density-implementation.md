# Public-Site Responsive Density Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Propagate the homepage's viewport-aware density language to every non-admin ROSA route while preserving page structure, live behavior, Arabic support, motion, and the existing homepage feedback fixes.

**Architecture:** Extend the final-loaded `public-density.css` layer with shared internal-page tokens and bounded route-family composition rules. Add one focused Playwright suite that supplies geometry, overflow, redirect, localization, reduced-motion, and text-scaling evidence; keep React and backend behavior unchanged unless a missing semantic hook is proven by a failing test.

**Tech Stack:** Next.js 16.2, React 19.2, TypeScript 5.9, CSS custom properties/media queries/container-aware layout, Vitest 3.2, Playwright 1.57, pnpm 11.20.

## Global Constraints

- Work on `frontend/client-feedback-responsive-homepage-pr` and preserve every pre-existing dirty file.
- Treat commit `83e12ba` and `docs/superpowers/specs/2026-08-09-public-responsive-density-design.md` as the approved design baseline.
- Never use `transform: scale(...)`, CSS `zoom`, root-font shrinking, or a wrapper that scales the whole page as the density solution.
- Keep `/admin/**`, `services/api/**`, OpenAPI, Supabase, migrations, authentication, product data, quotation persistence, and contact persistence unchanged.
- Preserve the homepage carousel transition, persistent Knives-first family selection, mobile family rail, shared header, RTL behavior, and section density.
- Keep normal body copy near `1rem` to `1.06rem`, display text at or below approximately `4rem`, and practical interactive targets near 44px where appropriate.
- Use only a small coherent breakpoint set: phone/mobile composition, portrait-tablet transition, desktop composition, and short-height rules near 800px and 720px.
- Verify `360x800`, `390x844`, `430x932`, `768x1024`, `1024x768`, `1280x720`, `1366x768`, `1440x900`, `1536x864`, `1920x1080`, and `2560x1440`.
- Use `./node_modules/.bin/pnpm` when `pnpm` is not on the shell PATH.
- Before editing `public-density.css`, inspect its current diff so the existing uncommitted homepage work remains intact.

## Planned File Structure

- Create `apps/web/tests/e2e/public-responsive-density.spec.ts`: route inventory, geometry helpers, 11-viewport matrix, RTL, reduced-motion, 200% text, and redirect checks.
- Modify `apps/web/src/styles/public-density.css`: shared internal-page tokens followed by catalogue, product-detail, editorial, form/utility, accessibility, height, and width rules. Homepage-only composition stays in its existing section.
- Modify `README.md`: append the required factual frontend-to-backend coordination entry after verification.
- Create `docs/superpowers/completions/2026-08-09-public-responsive-density.md`: exact routes, viewports, visual findings, commands, counts, failures, commit, and boundary proof.
- Do not modify route components unless the Playwright suite demonstrates that an existing class cannot scope a required rule. If that happens, add only a top-level `public-page--<kind>` class and its server-rendered composition assertion.

---

### Task 1: Shared Internal-Page Density Foundation

**Files:**
- Create: `apps/web/tests/e2e/public-responsive-density.spec.ts`
- Modify: `apps/web/src/styles/public-density.css:1-42`
- Test: `apps/web/tests/e2e/public-responsive-density.spec.ts`

**Interfaces:**
- Consumes: existing `.section`, `.section--compact`, `.container`, public page classes, and homepage `--public-density-*` variables.
- Produces: shared `--public-density-intro-block`, `--public-density-card-gap`, `--public-density-media-block`, `--public-density-control-block`, and `--public-density-textarea-block` CSS variables plus reusable Playwright helpers.

- [ ] **Step 1: Confirm the owned dirty state before editing**

Run:

```bash
git status --short
git diff -- apps/web/src/styles/public-density.css apps/web/src/components/layout/public-shell.tsx apps/web/src/features/homepage/sections/home-family-gallery.tsx apps/web/src/features/homepage/sections/home-hero-carousel.tsx
```

Expected: the header-social, hero-transition, persistent-family, and current density changes described in the spec are present and remain unstaged.

- [ ] **Step 2: Create the failing shared-density acceptance test**

Create the test with these shared definitions and the first laptop/large-screen checks:

```ts
import { expect, test, type Page } from "@playwright/test";

const LAPTOP_VIEWPORTS = [
  { width: 1280, height: 720 },
  { width: 1366, height: 768 }
] as const;

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const geometry = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));
  expect(geometry.scrollWidth, JSON.stringify(geometry)).toBeLessThanOrEqual(geometry.clientWidth);
}

for (const viewport of LAPTOP_VIEWPORTS) {
  test(`shared internal density ${viewport.width}x${viewport.height}`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Geometry runs once in desktop Chromium.");
    await page.setViewportSize(viewport);
    await page.goto("/about");
    const compactPadding = await page.locator(".about-hero").evaluate(
      (node) => Number.parseFloat(getComputedStyle(node).paddingTop)
    );
    expect(compactPadding).toBeLessThanOrEqual(48);
    await expectNoHorizontalOverflow(page);
  });
}
```

- [ ] **Step 3: Run the test and verify the current oversized layout fails**

Run:

```bash
PLAYWRIGHT_REUSE_EXTERNAL=1 PLAYWRIGHT_BASE_URL=http://127.0.0.1:3000 ./node_modules/.bin/pnpm --dir apps/web exec playwright test tests/e2e/public-responsive-density.spec.ts --project=desktop
```

Expected: FAIL because the current compact About section uses more than 48px of top padding on a laptop.

- [ ] **Step 4: Add the shared internal-page tokens and defaults**

Append shared tokens to the existing `:root` block without changing homepage-specific rules:

```css
:root {
  --public-density-intro-block: clamp(2.5rem, 5vw, 4.75rem);
  --public-density-card-gap: clamp(1rem, 2vw, 1.5rem);
  --public-density-media-block: clamp(19rem, 36vw, 31rem);
  --public-density-control-block: 3rem;
  --public-density-textarea-block: clamp(7.5rem, 14vh, 10rem);
}

.public-page:not(.public-page--home) .section {
  padding-block: var(--public-density-section-block);
}

.public-page:not(.public-page--home) .section--compact,
.f3d-hero,
.catalogues-intro,
.contact-page .section--compact,
.search-default-page,
.legal-page__hero {
  padding-block: var(--public-density-intro-block);
}

@media (max-height: 800px) and (min-width: 64.001rem) {
  :root {
    --public-density-intro-block: clamp(2rem, 4.5vh, 3rem);
    --public-density-media-block: clamp(18rem, 55vh, 26rem);
  }
}
```

Adjust selectors if existing cascade evidence requires higher specificity, but keep all rules inside `public-density.css`.

- [ ] **Step 5: Run the shared test and homepage matrix**

Run:

```bash
PLAYWRIGHT_REUSE_EXTERNAL=1 PLAYWRIGHT_BASE_URL=http://127.0.0.1:3000 ./node_modules/.bin/pnpm --dir apps/web exec playwright test tests/e2e/public-responsive-density.spec.ts tests/e2e/client-feedback-responsive-matrix.spec.ts --project=desktop
```

Expected: the shared tests PASS and all 11 homepage matrix cases PASS. Do not commit while the new shared test is failing.

- [ ] **Step 6: Commit the shared foundation**

```bash
git add apps/web/src/styles/public-density.css apps/web/tests/e2e/public-responsive-density.spec.ts
git commit -m "refactor(web): add shared public density foundation"
```

### Task 2: Products, Families, and Catalogues

**Files:**
- Modify: `apps/web/tests/e2e/public-responsive-density.spec.ts`
- Modify: `apps/web/src/styles/public-density.css`
- Test: `apps/web/tests/e2e/f3b-catalogue-pages.spec.ts`
- Test: `apps/web/tests/e2e/f7-product-polish.spec.ts`

**Interfaces:**
- Consumes: Task 1 tokens and helpers.
- Produces: laptop continuation and card/media ceilings for products, all five family templates, and catalogues.

- [ ] **Step 1: Add failing route-family geometry cases**

Extend the Playwright import with `type Locator`, then add:

```ts
async function expectTopBeforeViewportEnd(page: Page, locator: Locator, maximum = 1): Promise<void> {
  const ratio = await locator.evaluate((node) => node.getBoundingClientRect().top / innerHeight);
  expect(ratio).toBeLessThanOrEqual(maximum);
}

async function expectDisplayCeiling(page: Page): Promise<void> {
  const size = await page.getByRole("heading", { level: 1 }).evaluate(
    (node) => Number.parseFloat(getComputedStyle(node).fontSize)
  );
  expect(size).toBeLessThanOrEqual(64);
}

const CATALOGUE_ROUTES = [
  "/products",
  "/products/knives",
  "/products/scissors",
  "/products/punches",
  "/products/chisels",
  "/products/cutters",
  "/catalogues"
] as const;

for (const route of CATALOGUE_ROUTES) {
  test(`${route} exposes useful catalogue content on a laptop`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Geometry runs once in desktop Chromium.");
    await page.setViewportSize({ width: 1366, height: 768 });
    const response = await page.goto(route);
    expect(response?.ok()).toBe(true);
    await expectDisplayCeiling(page);
    await expectNoHorizontalOverflow(page);
    const continuation = route === "/products"
      ? page.locator("[data-section='family-index']")
      : route === "/catalogues"
        ? page.locator(".catalogues-content")
        : page.locator(".family-discovery-shell");
    await expectTopBeforeViewportEnd(page, continuation, 1.05);
  });
}
```

- [ ] **Step 2: Run and confirm failure**

Run the new cases with `--grep "useful catalogue content"`. Expected: at least `/products` and one family route FAIL their continuation threshold.

- [ ] **Step 3: Add catalogue-family density rules**

Use existing selectors to set:

```css
.products-hero__title,
.family-hero h1,
.catalogues-intro h1 {
  font-size: var(--public-density-hero-title);
  letter-spacing: 0;
}

.products-hero,
.family-hero {
  min-height: 0;
}

.family-hero__media {
  min-height: min(var(--public-density-media-block), 58vh);
}

.products-discovery-shell,
.family-discovery-shell {
  gap: var(--public-density-card-gap);
}

.products-family-grid,
.family-product-grid,
.catalogue-document-grid {
  gap: var(--public-density-card-gap);
}
```

Add route-specific card/media ceilings and short-height overrides while preserving current image focal rules in `f8-owner-refinement.css`.

- [ ] **Step 4: Add mobile and tablet composition assertions**

For `390x844`, assert one-column flow, no overflow, h1 width containment, and minimum 44px search/filter/inquiry controls. For `768x1024`, assert products cards use two columns and family controls remain usable without horizontal overflow.

- [ ] **Step 5: Run catalogue and homepage regression suites**

```bash
PLAYWRIGHT_REUSE_EXTERNAL=1 PLAYWRIGHT_BASE_URL=http://127.0.0.1:3000 ./node_modules/.bin/pnpm --dir apps/web exec playwright test tests/e2e/public-responsive-density.spec.ts tests/e2e/f3b-catalogue-pages.spec.ts tests/e2e/f7-product-polish.spec.ts tests/e2e/client-feedback-responsive-matrix.spec.ts
```

Expected: PASS in desktop, tablet, and mobile projects.

- [ ] **Step 6: Commit**

```bash
git add apps/web/src/styles/public-density.css apps/web/tests/e2e/public-responsive-density.spec.ts
git commit -m "refactor(web): tune catalogue page density"
```

### Task 3: Product Detail Composition

**Files:**
- Modify: `apps/web/tests/e2e/public-responsive-density.spec.ts`
- Modify: `apps/web/src/styles/public-density.css`
- Test: `apps/web/tests/e2e/f7-product-polish.spec.ts`
- Test: `apps/web/tests/e2e/public-quotation-slice.spec.ts`

**Interfaces:**
- Consumes: shared media, gap, control, and type tokens.
- Produces: balanced desktop gallery/summary geometry and content-safe mobile ordering.

- [ ] **Step 1: Add failing desktop and mobile product checks**

Add assertions that at `1366x768` `.product-gallery__primary` and `.product-procurement-summary` begin in the same viewport, the Add to inquiry action ends before `innerHeight`, and at `1920x1080` the gallery does not exceed 85% of viewport height. At `390x844`, assert the gallery, thumbnails, h1, and sticky inquiry bar are visible in document order and the bar does not overlap the footer after scrolling.

- [ ] **Step 2: Run and confirm current geometry failure**

Run with `--grep "product detail density"`. Expected: FAIL on the current mobile first-view composition or large-screen heading/media ceiling.

- [ ] **Step 3: Implement product-detail density**

Add bounded rules using existing selectors:

```css
.product-detail-layout {
  gap: clamp(1.75rem, 4vw, 4rem);
  align-items: start;
}

.product-gallery__primary,
.product-gallery__image {
  max-height: min(46rem, calc(100svh - var(--public-density-header-block) - 7rem));
}

.product-procurement-summary h1 {
  font-size: var(--public-density-hero-title);
  letter-spacing: 0;
}

.product-procurement-summary__options {
  gap: var(--public-density-card-gap);
}

.product-procurement-summary textarea {
  min-height: var(--public-density-textarea-block);
}
```

Use mobile overrides that remove desktop max-height assumptions, keep natural image ratio, and reserve bottom space for `.mobile-inquiry-bar` without hiding footer links.

- [ ] **Step 4: Run interaction and visual regressions**

Run the density, product polish, public quotation slice, and responsive-restraint suites across all projects. Expected: Add to inquiry, quantity, notes, route navigation, and sticky-bar safety PASS unchanged.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/styles/public-density.css apps/web/tests/e2e/public-responsive-density.spec.ts
git commit -m "refactor(web): balance product detail density"
```

### Task 4: About and Procurement Editorial Rhythm

**Files:**
- Modify: `apps/web/tests/e2e/public-responsive-density.spec.ts`
- Modify: `apps/web/src/styles/public-density.css`
- Test: `apps/web/tests/e2e/f7-story-pages.spec.ts`
- Test: `apps/web/tests/e2e/f3d-public-support-pages.spec.ts`

**Interfaces:**
- Consumes: shared section, display, media, and gap tokens.
- Produces: compact editorial heroes and controlled section/card rhythm without altering copy or imagery.

- [ ] **Step 1: Add failing editorial continuation checks**

At both laptop viewports, assert `.about-company-section` and `.procurement-process-section` begin at or before the viewport end. At `2560x1440`, assert h1 remains at or below 64px and hero media remains at or below 720px. At phone widths, assert h1 and brand/support media remain within their parent bounds.

- [ ] **Step 2: Run and verify current About failure**

Expected: the current About section continuation and oversized display rules FAIL.

- [ ] **Step 3: Add editorial density rules**

Use:

```css
.f3d-hero__copy h1,
.company-profile__introduction h2,
.f3d-final-cta h2 {
  font-size: var(--public-density-hero-title);
  letter-spacing: 0;
}

.f3d-hero__layout {
  gap: clamp(1.75rem, 5vw, 5rem);
  padding-block: var(--public-density-intro-block);
}

.f3d-hero__media,
.supported-buyers__item {
  min-height: min(var(--public-density-media-block), 62vh);
}

.company-profile,
.numbered-editorial-list,
.supported-buyers {
  gap: var(--public-density-card-gap);
}
```

Retain sticky editorial behavior only when the viewport is tall enough to support it; disable or lower its offset for short laptops.

- [ ] **Step 4: Run story, support, and homepage tests**

Expected: English content, media-ready states, all buyer/process counts, RTL structure, and homepage regression remain PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/styles/public-density.css apps/web/tests/e2e/public-responsive-density.spec.ts
git commit -m "refactor(web): tighten public editorial rhythm"
```

### Task 5: Contact, Inquiry, and Quotation Forms

**Files:**
- Modify: `apps/web/tests/e2e/public-responsive-density.spec.ts`
- Modify: `apps/web/src/styles/public-density.css`
- Test: `apps/web/tests/e2e/f3c-procurement-pages.spec.ts`
- Test: `apps/web/tests/e2e/f3d-public-support-pages.spec.ts`
- Test: `apps/web/tests/e2e/public-quotation-slice.spec.ts`

**Interfaces:**
- Consumes: shared control, textarea, section, display, and gap tokens.
- Produces: useful first viewport for Contact plus usable inquiry/quotation grids and form controls.

- [ ] **Step 1: Add failing first-viewport and control checks**

At `1366x768`, assert `.contact-main-section` begins before the viewport ends. Seed the inquiry local-storage key used by `public-quotation-slice.spec.ts`, then assert the inquiry and quotation h1 sizes stay within the display ceiling. For all visible input, select, textarea, button, and primary link controls, assert a minimum bounding-box height of 44px except checkboxes and inline text links.

- [ ] **Step 2: Run and verify Contact currently fails**

Expected: `.contact-main-section` begins too late at the laptop viewport.

- [ ] **Step 3: Implement form-page density**

Add:

```css
.contact-hero__copy h1,
.inquiry-preview-intro h1,
.quotation-form-preview__introduction h1,
.quotation-blocked-page h1 {
  font-size: var(--public-density-hero-title);
  letter-spacing: 0;
}

.contact-main-layout,
.inquiry-preview-layout,
.quotation-page .quotation-form-preview,
.quotation-form-preview__field-grid {
  gap: var(--public-density-card-gap);
}

.contact-form-preview input,
.contact-form-preview select,
.quotation-field input,
.quotation-field select {
  min-height: var(--public-density-control-block);
}

.contact-form-preview textarea,
.quotation-field textarea {
  min-height: var(--public-density-textarea-block);
}
```

Reduce intro/fieldset spacing, not control usability. Preserve live contact values, form action, validation messages, submission states, and local inquiry data.

- [ ] **Step 4: Run contact and quotation behavior tests**

Expected: contact mock submission, inquiry mutation, quotation navigation, enabled submit state, and all geometry checks PASS on desktop, tablet, and mobile.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/styles/public-density.css apps/web/tests/e2e/public-responsive-density.spec.ts
git commit -m "refactor(web): compact public form layouts"
```

### Task 6: Search, Legal, Public States, and Redirect Aliases

**Files:**
- Modify: `apps/web/tests/e2e/public-responsive-density.spec.ts`
- Modify: `apps/web/src/styles/public-density.css`
- Test: `apps/web/tests/e2e/f3d-public-support-pages.spec.ts`
- Test: `apps/web/tests/e2e/route-smoke.spec.ts`

**Interfaces:**
- Consumes: shared intro, display, section, control, and gap tokens.
- Produces: compact utility pages and explicit audit evidence for every public redirect alias.

- [ ] **Step 1: Add utility and redirect tests**

Add:

```ts
const PUBLIC_REDIRECTS = [
  ["/login", /\/admin\/login$/],
  ["/forgot-password", /\/admin\/recovery$/],
  ["/reset-password", /\/admin\/recovery$/],
  ["/account", /\/inquiry$/]
] as const;

for (const [source, destination] of PUBLIC_REDIRECTS) {
  test(`${source} preserves its public redirect`, async ({ page }) => {
    await page.goto(source);
    await expect(page).toHaveURL(destination);
  });
}
```

Add laptop/mobile geometry checks for `/search`, `/privacy`, `/terms`, the empty inquiry, blocked quotation, and one strict not-found route. Search results must remain usable after filling `Mayo`.

- [ ] **Step 2: Run and confirm utility density failure**

Expected: at least one search/legal/empty-state display or spacing ceiling FAILS before CSS changes; all redirect assertions already PASS and protect behavior.

- [ ] **Step 3: Implement utility density rules**

Apply the shared display token to `.search-default-page h1`, `.legal-page__hero h1`, and public empty/success headings. Tighten `.legal-page__layout`, `.legal-page__content`, `.search-catalogue-form`, `.search-results-preview__list`, and public-state action gaps using shared tokens. Preserve sticky legal navigation when space permits and allow it to become static on narrow/short viewports.

- [ ] **Step 4: Run support, route-smoke, and density suites**

Expected: search interaction, legal section counts, updated dates, strict not-found behavior, and public redirects PASS. Do not add CSS for `/admin/login` or `/admin/recovery`.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/styles/public-density.css apps/web/tests/e2e/public-responsive-density.spec.ts
git commit -m "refactor(web): tune public utility page density"
```

### Task 7: Arabic, Reduced Motion, and 200% Text Safety

**Files:**
- Modify: `apps/web/tests/e2e/public-responsive-density.spec.ts`
- Modify: `apps/web/src/styles/public-density.css`
- Test: `apps/web/tests/e2e/f7-reduced-motion.spec.ts`
- Test: `apps/web/tests/e2e/f7-responsive-restraint.spec.ts`

**Interfaces:**
- Consumes: every page-family rule from Tasks 1-6.
- Produces: content-safe locale, motion-preference, and text-scaling behavior.

- [ ] **Step 1: Add Arabic representative-route coverage**

For `/ar/products`, `/ar/products/knives`, one Arabic product detail, `/ar/catalogues`, `/ar/about`, `/ar/procurement-support`, `/ar/contact`, `/ar/search`, `/ar/inquiry`, `/ar/request-quotation`, `/ar/privacy`, and `/ar/terms`, assert `html[dir='rtl']`, visible h1, no horizontal overflow, and h1 containment. Assert explicit product codes, email, telephone, and measurements retain readable direction where present.

- [ ] **Step 2: Add 200% text and reduced-motion checks**

Use:

```ts
test("representative pages remain content-safe at 200% text", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Text scaling runs once in desktop Chromium.");
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const route of ["/products", "/products/knives/scalpel-handle-no-3", "/about", "/contact", "/request-quotation", "/privacy"]) {
    await page.goto(route);
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    await expectNoHorizontalOverflow(page);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});
```

Add a reduced-motion loop over representative route families and assert visible content has no opacity below `0.99` or non-none transform after navigation settles.

- [ ] **Step 3: Run and identify exact failures**

Run the density, reduced-motion, and responsive-restraint suites. Record the exact selector and viewport for each failure before changing CSS.

- [ ] **Step 4: Add content-safety overrides only where proven necessary**

Use `min-height: 0`, natural block growth, safe wrapping, `minmax(0, 1fr)`, and Arabic-specific line height/weight rules. Do not impose fixed hero heights to preserve first-viewport continuation at 200% text.

- [ ] **Step 5: Run the accessibility-oriented suites**

Expected: Arabic, 200% text, reduced motion, keyboard focus, and responsive-restraint checks PASS with no hidden content or overlap.

- [ ] **Step 6: Commit**

```bash
git add apps/web/src/styles/public-density.css apps/web/tests/e2e/public-responsive-density.spec.ts
git commit -m "fix(web): preserve public density accessibility"
```

### Task 8: Full Visual Matrix and Regression Closeout

**Files:**
- Modify: `apps/web/tests/e2e/public-responsive-density.spec.ts`
- Modify: `README.md`
- Create: `docs/superpowers/completions/2026-08-09-public-responsive-density.md`
- Modify if evidence requires: `apps/web/src/styles/public-density.css`

**Interfaces:**
- Consumes: all route-family implementations and acceptance helpers.
- Produces: complete screenshot evidence, regression results, coordination record, and final audit report.

- [ ] **Step 1: Add the exact 11-viewport matrix**

Add:

```ts
const VIEWPORTS = [
  [360, 800], [390, 844], [430, 932], [768, 1024], [1024, 768],
  [1280, 720], [1366, 768], [1440, 900], [1536, 864],
  [1920, 1080], [2560, 1440]
] as const;
```

Loop representative routes from each page family, attach viewport screenshots with `testInfo.attach`, and assert no overflow, visible h1, safe heading containment, and page-family geometry. Keep the four-anchor audit routes separate so every route template is captured at `390x844`, `768x1024`, `1366x768`, and `1920x1080` without multiplying all 11 viewports across every route.

- [ ] **Step 2: Run the four-anchor route audit and inspect screenshots**

Run the density suite with a line/grep filter for the audit cases. Manually inspect header, first viewport, typography, wrapping, imagery, card proportions, section rhythm, CTA usability, footer, and sticky controls for every captured route. Record each correction in the completion document as it is made.

- [ ] **Step 3: Run the complete 11-viewport matrix and inspect screenshots**

Expected: all matrix cases PASS. Inspect every attachment; generated-but-unreviewed screenshots do not satisfy this step.

- [ ] **Step 4: Run focused unit and browser regressions**

```bash
./node_modules/.bin/pnpm --filter @rosa/web test -- src/test/public-page-composition.test.tsx src/test/family-listing-components.test.tsx src/test/product-detail-components.test.tsx src/test/contact-preview.test.tsx src/test/inquiry-shell-state.test.tsx src/test/public-quotation-slice.test.tsx src/test/localization.test.tsx src/test/legal-pages.test.tsx
PLAYWRIGHT_REUSE_EXTERNAL=1 PLAYWRIGHT_BASE_URL=http://127.0.0.1:3000 ./node_modules/.bin/pnpm --dir apps/web exec playwright test tests/e2e/public-responsive-density.spec.ts tests/e2e/client-feedback-homepage.spec.ts tests/e2e/client-feedback-responsive-matrix.spec.ts tests/e2e/f7-public-shell.spec.ts tests/e2e/f7-reduced-motion.spec.ts tests/e2e/f7-responsive-restraint.spec.ts tests/e2e/public-quotation-slice.spec.ts
```

Expected: all focused suites PASS, with only already-documented project-inapplicable skips.

- [ ] **Step 5: Run full static and production verification**

```bash
./node_modules/.bin/pnpm --filter @rosa/web test
./node_modules/.bin/pnpm --filter @rosa/web typecheck
./node_modules/.bin/pnpm --filter @rosa/web lint
./node_modules/.bin/pnpm --filter @rosa/web build
```

Expected: Vitest and strict TypeScript PASS. Record the exact pre-existing repository-wide lint baseline if the known admin-test errors remain. If the unmodified build is blocked by Google Fonts network access, preserve the source and record the same environmental limitation with any approved isolated diagnostic evidence.

- [ ] **Step 6: Prove the ownership boundary**

Run:

```bash
git diff --name-only 83e12ba..HEAD
git diff -- services/api packages/contracts apps/web/src/app/admin
git status --short
```

Expected: no backend, OpenAPI, database, Supabase, or protected admin behavior change. Pre-existing dirty files remain recognizable and no owner work has been reset.

- [ ] **Step 7: Write completion and README evidence**

The completion record must include branch, final commit, every audited route pattern, significant selectors/files, shared tokens, page-family changes, exact viewport matrix, screenshot review result, RTL, reduced motion, 200% text, test counts, TypeScript, lint, build, pre-existing failures, homepage status, and the backend/admin boundary confirmation. Append one concise README entry using the repository's required format.

- [ ] **Step 8: Commit closeout documentation**

```bash
git add README.md docs/superpowers/completions/2026-08-09-public-responsive-density.md apps/web/tests/e2e/public-responsive-density.spec.ts apps/web/src/styles/public-density.css
git commit -m "docs: record public density verification"
```

- [ ] **Step 9: Re-run the final evidence commands after the documentation commit**

Run `git status --short`, `git rev-parse HEAD`, the focused density Playwright suite, strict TypeScript, and `git diff --check`. Use those post-commit results in the final user report.
