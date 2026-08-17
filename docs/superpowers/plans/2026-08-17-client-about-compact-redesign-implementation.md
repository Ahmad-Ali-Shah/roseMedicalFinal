# Client About Compact Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Rosa Medical’s public About page into the client-faithful compact design approved in `docs/superpowers/specs/2026-08-17-client-about-compact-redesign-design.md`, using production-shaped placeholders, existing Rosa motion primitives, responsive/RTL-safe layouts, real contact/social/quotation routes, and no unsupported company/compliance claims.

**Architecture:** Keep `about-page.tsx` as a thin composition root and move each client-redesign section into a focused component under `features/about/sections/`. Drive all bilingual copy and section metadata through a typed `createAboutPageModel(locale)` function in `about.data.ts`. Use the existing `Reveal`, `TextReveal`, `Stagger`, `StaggerItem`, `LocalizedButtonLink`, `SocialLinksRow`, `Container`, `Section`, and public content registry rather than creating parallel infrastructure.

**Tech Stack:** Next.js 16.2.11, React 19.2, TypeScript 5.9, Motion 12 (`motion/react` through existing Rosa primitives), CSS imported through `src/app/globals.css`, Vitest 3.2, Playwright 1.57.

## Global Constraints

- Implementation must branch from the latest committed `frontend/client-homepage-compact-redesign` tip at execution time; do **not** branch from `main`.
- Recommended implementation branch: `frontend/client-about-compact-redesign`.
- Do not modify `services/api/**`, Supabase/auth behavior, OpenAPI/contracts semantics, admin behavior, catalogue data, quotation persistence, or backend routes.
- Keep the global footer authoritative; do not create an About-only footer.
- Do not add YouTube. The central social configuration currently supports Instagram, X, Facebook and LinkedIn only.
- Do not claim founding years, factory/manufacturer status, years of experience, certification/approval status, guaranteed stock/delivery, or exact market footprint unless already supported by repository/client evidence.
- ISO / MDMA / MDEL / AR / WAREHOUSE are client-provided document labels only in this phase; render neutral placeholders, not fake certificates.
- First implementation intentionally uses placeholders for hero, Workflow, Business Growth, Experience Sharing and five document images. Their geometry/media-slot IDs must be production-final so the later media pass is asset-only.
- Exactly one `h1` on About.
- English and Arabic must both render complete copy; layouts must use logical alignment and preserve RTL behavior.
- Story rows stay two-column at `min-width: 800px`; below 800px they stack in logical reading order.
- Compliance: six-across where space permits on desktop, 3×2 on tablet, 2×3 on mobile.
- Documents: five across on desktop, 3+2 grid on tablet, horizontal snap rail on mobile.
- Reuse current motion defaults: section duration 0.58s, standard easing `[0.22, 1, 0.36, 1]`, desktop reveal distance 28px. Do not add a motion dependency.
- Motion is transform/opacity only, reduced-motion safe, non-blocking, with no persistent `will-change` and no scroll-jacking.
- Preserve compact density: desktop section padding roughly 36–52px, body ~15–16px / 1.45–1.55 line-height, story image height ~230–300px.
- Minimize CI usage. Perform local verification first; do not add or trigger a new GitHub Actions workflow for this work.

## Execution Preflight

At execution time, use `superpowers:using-git-worktrees` before editing. The isolated worktree/branch must originate from the then-current redesign branch, not the SHA written in this plan.

Example branch preparation after the worktree skill resolves the safe worktree location:

```bash
git fetch origin
git rev-parse origin/frontend/client-homepage-compact-redesign
git worktree add <resolved-worktree-path> -b frontend/client-about-compact-redesign origin/frontend/client-homepage-compact-redesign
cd <resolved-worktree-path>
git status --short --branch
```

Before Task 1, record the starting state without changing code:

```bash
pnpm --filter @rosa/web exec vitest run src/test/about-page.test.tsx src/test/f7-story-pages.test.tsx
pnpm --filter @rosa/web typecheck
```

If the base already has unrelated failures, preserve the output as baseline evidence. Do not “fix” unrelated homepage/admin failures inside this About branch.

---

## File Structure

### Create

- `apps/web/src/features/about/sections/about-compact-hero.tsx` — compact client-style hero and hero placeholder.
- `apps/web/src/features/about/sections/about-introduction.tsx` — centered “About Rosa” narrative.
- `apps/web/src/features/about/sections/about-story-section.tsx` — one reusable alternating story row.
- `apps/web/src/features/about/sections/about-contact-band.tsx` — WhatsApp/email interruption using real contact registry values.
- `apps/web/src/features/about/sections/about-compliance.tsx` — six native compliance principles and connector treatment.
- `apps/web/src/features/about/sections/about-documents.tsx` — five responsive document placeholders.
- `apps/web/src/features/about/sections/about-quotation-cta.tsx` — compact real quotation route CTA.
- `apps/web/src/features/about/sections/about-social-strip.tsx` — central social configuration above the global footer.
- `apps/web/src/styles/about-client-redesign.css` — layout, typography, density and responsive geometry.
- `apps/web/src/styles/about-client-interactions.css` — hover/focus/entrance polish and reduced-motion overrides.
- `apps/web/src/test/client-about-compact-redesign.test.tsx` — focused static/component acceptance contract.
- `apps/web/tests/e2e/client-about-compact-redesign.spec.ts` — responsive/browser contract.

### Modify

- `apps/web/src/features/about/about.data.ts` — typed English/Arabic redesign model while retaining existing exports if still imported elsewhere.
- `apps/web/src/features/about/about-page.tsx` — reduce to locale-model selection + exact section composition.
- `apps/web/src/app/globals.css` — import the two About redesign styles after the homepage/client refinement styles.
- `apps/web/src/test/about-page.test.tsx` — replace stale pre-redesign About assertions with client-redesign assertions.
- `apps/web/src/test/f7-story-pages.test.tsx` — update the About-specific test only; leave procurement/catalogues/contact/legal tests untouched.

### Explicitly do not delete in this phase

- `apps/web/src/features/about/company-profile.tsx`
- `apps/web/src/features/about/supported-buyers.tsx`
- reusable `FamilyIndex` or public editorial components

They stop rendering on About, but deletion is out of scope unless a separate dead-code audit proves they have no consumers.

---

### Task 1: Lock the typed About redesign model and RED acceptance contract

**Files:**
- Modify: `apps/web/src/features/about/about.data.ts`
- Create: `apps/web/src/test/client-about-compact-redesign.test.tsx`

**Interfaces:**
- Produces: `createAboutPageModel(locale?: PublicLocale): AboutPageModel`
- Produces: `AboutPageModel`, `AboutStoryModel`, `AboutDocumentModel`, `AboutComplianceItem`
- Later tasks consume those exact types/components; do not rename them after Task 1.

- [ ] **Step 1: Write the failing focused contract before changing `about.data.ts`**

Create `src/test/client-about-compact-redesign.test.tsx` with a model-only first test:

```tsx
import { describe, expect, it } from "vitest";
import { createAboutPageModel } from "@/features/about/about.data";

describe("client About compact redesign", () => {
  it("defines the approved English and Arabic client-redesign content model", () => {
    const en = createAboutPageModel("en");
    const ar = createAboutPageModel("ar");

    expect(en.hero.eyebrow).toBe("Medical Device Supplier");
    expect(en.introduction.title).toBe("About Rosa");
    expect(en.stories.map((story) => story.id)).toEqual([
      "workflow",
      "growth",
      "experience"
    ]);
    expect(en.stories.map((story) => story.mediaSide)).toEqual([
      "left",
      "right",
      "left"
    ]);
    expect(en.compliance.items.map((item) => item.id)).toEqual([
      "regulations",
      "legal-system",
      "standards",
      "law",
      "rules",
      "requirements"
    ]);
    expect(en.documents.map((document) => document.label)).toEqual([
      "ISO",
      "MDMA",
      "MDEL",
      "AR",
      "WAREHOUSE"
    ]);
    expect(en.quotation.primary.href).toBe("/request-quotation");
    expect(ar.hero.eyebrow).not.toBe("");
    expect(ar.stories).toHaveLength(3);
    expect(ar.compliance.items).toHaveLength(6);
    expect(ar.documents).toHaveLength(5);
  });

  it("keeps the client-inspired copy free of unsupported company claims", () => {
    const text = JSON.stringify(createAboutPageModel("en"));
    expect(text).not.toMatch(/\b(18|19|20)\d{2}\b/);
    expect(text).not.toMatch(/founded|since \d{4}|factory|manufacturer|years of experience|ISO-certified|SFDA-certified/i);
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

```bash
pnpm --filter @rosa/web exec vitest run src/test/client-about-compact-redesign.test.tsx
```

Expected: FAIL because `createAboutPageModel` and the redesign model do not exist.

- [ ] **Step 3: Add the exact model interfaces**

Append/replace the page-facing part of `about.data.ts` with these stable interfaces while keeping legacy constants only if other code imports them:

```ts
import type { Route } from "next";
import type { PublicLocale } from "@/features/localization";

export type AboutStoryId = "workflow" | "growth" | "experience";
export type AboutMediaSide = "left" | "right";

export interface AboutStoryModel {
  id: AboutStoryId;
  title: string;
  copy: string;
  mediaSide: AboutMediaSide;
  mediaSlot: `about-client-${AboutStoryId}`;
  mediaLabel: string;
}

export interface AboutComplianceItem {
  id: "regulations" | "legal-system" | "standards" | "law" | "rules" | "requirements";
  label: string;
}

export interface AboutDocumentModel {
  id: "iso" | "mdma" | "mdel" | "ar" | "warehouse";
  label: "ISO" | "MDMA" | "MDEL" | "AR" | "WAREHOUSE";
  mediaSlot: `about-client-document-${"iso" | "mdma" | "mdel" | "ar" | "warehouse"}`;
}

export interface AboutPageModel {
  hero: {
    eyebrow: string;
    title: string;
    copy: string;
    mediaSlot: "about-client-hero";
    mediaLabel: string;
    primary: { label: string; href: Route<string> };
    secondary: { label: string; href: Route<string> };
  };
  introduction: { title: string; copy: string };
  stories: readonly AboutStoryModel[];
  contact: {
    eyebrow: string;
    title: string;
    whatsappLabel: string;
    emailLabel: string;
  };
  compliance: { title: string; items: readonly AboutComplianceItem[] };
  documents: readonly AboutDocumentModel[];
  quotation: {
    eyebrow: string;
    title: string;
    copy: string;
    primary: { label: string; href: Route<string> };
  };
  social: { title: string };
}
```

- [ ] **Step 4: Add explicit English and Arabic model values**

Use copy that follows the client’s themes without adding unsupported history/credentials:

```ts
const ABOUT_PAGE_MODEL_EN: AboutPageModel = {
  hero: {
    eyebrow: "Medical Device Supplier",
    title: "Precision, clarity and dependable medical sourcing.",
    copy: "Rosa Medical brings structured product information, catalogue references and quotation support together for professional buyers.",
    mediaSlot: "about-client-hero",
    mediaLabel: "About Rosa editorial medical image pending",
    primary: { label: "Explore Products", href: "/products" },
    secondary: { label: "Request a Quote", href: "/request-quotation" }
  },
  introduction: {
    title: "About Rosa",
    copy: "At Rosa, we focus on clear product presentation, dependable communication and thoughtful support for professional medical sourcing. Our catalogue-led approach keeps instrument families, product references and inquiry details organised so buyers can move from discovery to follow-up with greater confidence."
  },
  stories: [
    {
      id: "workflow",
      title: "Our Workflow",
      copy: "Our workflow is built around clarity from the first catalogue review to the final inquiry. Product references, options, quantities and notes stay organised so requirements can be reviewed efficiently and communicated without unnecessary complexity.",
      mediaSide: "left",
      mediaSlot: "about-client-workflow",
      mediaLabel: "Workflow editorial image pending"
    },
    {
      id: "growth",
      title: "Business Growth",
      copy: "Sustainable business growth depends on reliable information, responsive follow-up and consistent service. Rosa supports that process by making product discovery and quotation preparation easier to navigate for professional buyers and trading partners.",
      mediaSide: "right",
      mediaSlot: "about-client-growth",
      mediaLabel: "Business growth editorial image pending"
    },
    {
      id: "experience",
      title: "Experience Sharing",
      copy: "We treat every inquiry as an opportunity to improve understanding. Clear communication between buyers, partners and our team helps turn product knowledge and practical requirements into better organised sourcing decisions.",
      mediaSide: "left",
      mediaSlot: "about-client-experience",
      mediaLabel: "Experience sharing editorial image pending"
    }
  ],
  contact: {
    eyebrow: "Direct support",
    title: "Get in Touch Now",
    whatsappLabel: "WhatsApp Chat",
    emailLabel: "Email"
  },
  compliance: {
    title: "COMPLIANCE",
    items: [
      { id: "regulations", label: "Regulations" },
      { id: "legal-system", label: "Legal System" },
      { id: "standards", label: "Standards" },
      { id: "law", label: "Law" },
      { id: "rules", label: "Rules" },
      { id: "requirements", label: "Requirements" }
    ]
  },
  documents: [
    { id: "iso", label: "ISO", mediaSlot: "about-client-document-iso" },
    { id: "mdma", label: "MDMA", mediaSlot: "about-client-document-mdma" },
    { id: "mdel", label: "MDEL", mediaSlot: "about-client-document-mdel" },
    { id: "ar", label: "AR", mediaSlot: "about-client-document-ar" },
    { id: "warehouse", label: "WAREHOUSE", mediaSlot: "about-client-document-warehouse" }
  ],
  quotation: {
    eyebrow: "REQUEST A QUOTATION",
    title: "Prepare your instruments inquiry.",
    copy: "Build a structured product list and send one clear request to Rosa Medical.",
    primary: { label: "Request a Quote", href: "/request-quotation" }
  },
  social: { title: "Follow Us" }
};
```

Arabic must be a complete sibling model, not a partial fallback. Use these values:

```ts
const ABOUT_PAGE_MODEL_AR: AboutPageModel = {
  hero: {
    eyebrow: "مورد أجهزة وأدوات طبية",
    title: "الدقة والوضوح لدعم توريد الأدوات الطبية.",
    copy: "تجمع روزا ميديكال معلومات المنتجات ومراجع الكتالوج ودعم طلبات عروض الأسعار في مسار واضح للمشترين المهنيين.",
    mediaSlot: "about-client-hero",
    mediaLabel: "صورة تحريرية عن روزا بانتظار الإضافة",
    primary: { label: "استعرض المنتجات", href: "/products" },
    secondary: { label: "اطلب عرض سعر", href: "/request-quotation" }
  },
  introduction: {
    title: "عن روزا",
    copy: "تركز روزا على عرض المنتجات بوضوح والتواصل الموثوق والدعم المنظم لعمليات التوريد الطبي المهنية. ويساعد نهجنا القائم على الكتالوج في ترتيب عائلات الأدوات ومراجع المنتجات وتفاصيل الاستفسار للانتقال من الاستكشاف إلى المتابعة بصورة أوضح."
  },
  stories: [
    {
      id: "workflow",
      title: "سير العمل",
      copy: "يعتمد سير العمل لدينا على الوضوح من مراجعة الكتالوج الأولى حتى إعداد الاستفسار. تبقى مراجع المنتجات والخيارات والكميات والملاحظات منظمة لتسهيل المراجعة والتواصل دون تعقيد غير ضروري.",
      mediaSide: "left",
      mediaSlot: "about-client-workflow",
      mediaLabel: "صورة سير العمل بانتظار الإضافة"
    },
    {
      id: "growth",
      title: "نمو الأعمال",
      copy: "يعتمد نمو الأعمال المستدام على المعلومات الموثوقة والمتابعة السريعة والخدمة المتسقة. وتدعم روزا هذه العملية عبر تسهيل اكتشاف المنتجات وتجهيز طلبات عروض الأسعار للمشترين المهنيين وشركاء التجارة.",
      mediaSide: "right",
      mediaSlot: "about-client-growth",
      mediaLabel: "صورة نمو الأعمال بانتظار الإضافة"
    },
    {
      id: "experience",
      title: "تبادل الخبرات",
      copy: "نتعامل مع كل استفسار كفرصة لتحسين الفهم. ويساعد التواصل الواضح بين المشترين والشركاء وفريقنا على تحويل معرفة المنتجات والمتطلبات العملية إلى قرارات توريد أكثر تنظيماً.",
      mediaSide: "left",
      mediaSlot: "about-client-experience",
      mediaLabel: "صورة تبادل الخبرات بانتظار الإضافة"
    }
  ],
  contact: {
    eyebrow: "دعم مباشر",
    title: "تواصل معنا الآن",
    whatsappLabel: "محادثة واتساب",
    emailLabel: "البريد الإلكتروني"
  },
  compliance: {
    title: "الامتثال",
    items: [
      { id: "regulations", label: "اللوائح" },
      { id: "legal-system", label: "النظام القانوني" },
      { id: "standards", label: "المعايير" },
      { id: "law", label: "القانون" },
      { id: "rules", label: "القواعد" },
      { id: "requirements", label: "المتطلبات" }
    ]
  },
  documents: ABOUT_PAGE_MODEL_EN.documents,
  quotation: {
    eyebrow: "اطلب عرض سعر",
    title: "جهّز استفسارك عن الأدوات.",
    copy: "أنشئ قائمة منظمة بالمنتجات وأرسل طلباً واضحاً إلى روزا ميديكال.",
    primary: { label: "اطلب عرض سعر", href: "/request-quotation" }
  },
  social: { title: "تابعنا" }
};

export function createAboutPageModel(locale: PublicLocale = "en"): AboutPageModel {
  return locale === "ar" ? ABOUT_PAGE_MODEL_AR : ABOUT_PAGE_MODEL_EN;
}
```

- [ ] **Step 5: Run RED/GREEN test**

```bash
pnpm --filter @rosa/web exec vitest run src/test/client-about-compact-redesign.test.tsx
```

Expected: PASS for the model tests.

- [ ] **Step 6: Commit Task 1**

```bash
git add apps/web/src/features/about/about.data.ts apps/web/src/test/client-about-compact-redesign.test.tsx
git commit -m "feat(web): define compact About redesign model"
```

---

### Task 2: Build the compact hero, introduction and reusable story rows

**Files:**
- Create: `apps/web/src/features/about/sections/about-compact-hero.tsx`
- Create: `apps/web/src/features/about/sections/about-introduction.tsx`
- Create: `apps/web/src/features/about/sections/about-story-section.tsx`
- Modify: `apps/web/src/features/about/about-page.tsx`
- Test: `apps/web/src/test/client-about-compact-redesign.test.tsx`

**Interfaces:**
- `AboutCompactHero({ model }: { model: AboutPageModel["hero"] })`
- `AboutIntroduction({ model }: { model: AboutPageModel["introduction"] })`
- `AboutStorySection({ model }: { model: AboutStoryModel })`
- `AboutPage({ locale = "en" }: { locale?: PublicLocale })`

- [ ] **Step 1: Extend the focused test with RED top-half structure assertions**

Add:

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { AboutPage } from "@/features/about";

it("renders the compact hero, introduction and three alternating client story rows", () => {
  const html = renderToStaticMarkup(<AboutPage locale="en" />);

  expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
  expect(html).toContain('data-section="about-client-hero"');
  expect(html).toContain('data-media-slot="about-client-hero"');
  expect(html).toContain('data-section="about-client-introduction"');
  expect(html).toContain("About Rosa");
  expect((html.match(/data-about-story=/g) ?? [])).toHaveLength(3);
  expect(html).toContain('data-about-story="workflow"');
  expect(html).toContain('data-about-story="growth"');
  expect(html).toContain('data-about-story="experience"');
  expect(html).toContain('data-media-slot="about-client-workflow"');
  expect(html).toContain('data-media-slot="about-client-growth"');
  expect(html).toContain('data-media-slot="about-client-experience"');
  expect(html).toContain('data-motion="text-reveal"');
  expect((html.match(/data-motion="reveal"/g) ?? []).length).toBeGreaterThanOrEqual(8);
});
```

- [ ] **Step 2: Run and verify RED**

```bash
pnpm --filter @rosa/web exec vitest run src/test/client-about-compact-redesign.test.tsx
```

Expected: FAIL because current About still renders the old profile/buyers/family structure.

- [ ] **Step 3: Implement `AboutCompactHero`**

Use the existing layout/motion primitives and a production-shaped placeholder:

```tsx
import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { LocalizedButtonLink } from "@/features/localization";
import { Reveal, TextReveal } from "@/features/motion";
import type { AboutPageModel } from "../about.data";

export function AboutCompactHero({ model }: { model: AboutPageModel["hero"] }): ReactElement {
  return (
    <Section className="about-client-hero" data-section="about-client-hero" spacing="compact">
      <div
        className="about-client-hero__media"
        data-media-slot={model.mediaSlot}
        data-media-state="placeholder"
        role="img"
        aria-label={model.mediaLabel}
      >
        <span className="about-client-placeholder__accent" aria-hidden="true" />
      </div>
      <div className="about-client-hero__overlay" aria-hidden="true" />
      <Container className="about-client-hero__inner" size="wide">
        <div className="about-client-hero__copy">
          <Reveal direction="up"><p className="about-client-eyebrow">{model.eyebrow}</p></Reveal>
          <TextReveal as="h1" text={model.title} mode="words" delay={0.05} />
          <Reveal direction="up" delay={0.12}><p className="about-client-hero__summary">{model.copy}</p></Reveal>
          <Reveal direction="up" delay={0.18} className="about-client-hero__actions">
            <LocalizedButtonLink href={model.primary.href}>{model.primary.label}</LocalizedButtonLink>
            <LocalizedButtonLink href={model.secondary.href} variant="secondary">{model.secondary.label}</LocalizedButtonLink>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4: Implement `AboutIntroduction`**

```tsx
export function AboutIntroduction({ model }: { model: AboutPageModel["introduction"] }): ReactElement {
  return (
    <Section className="about-client-introduction" tone="paper" data-section="about-client-introduction">
      <Container size="wide">
        <Reveal direction="up"><h2>{model.title}</h2></Reveal>
        <Reveal direction="up" delay={0.06}><p>{model.copy}</p></Reveal>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 5: Implement reusable `AboutStorySection` with logical DOM order**

The DOM always renders copy then media for accessibility. CSS controls visual column placement above 800px; on mobile the stack is always heading/copy then media.

```tsx
export function AboutStorySection({ model }: { model: AboutStoryModel }): ReactElement {
  const copyDirection = model.mediaSide === "left" ? "left" : "right";
  const mediaDirection = model.mediaSide === "left" ? "right" : "left";

  return (
    <Section
      className={`about-client-story about-client-story--media-${model.mediaSide}`}
      tone="paper"
      data-section={`about-client-${model.id}`}
    >
      <Container className="about-client-story__grid" size="wide">
        <Reveal className="about-client-story__copy" direction={copyDirection}>
          <h2>{model.title}</h2>
          <p>{model.copy}</p>
        </Reveal>
        <Reveal className="about-client-story__media-reveal" direction={mediaDirection} delay={0.05}>
          <div
            className="about-client-story__media about-client-placeholder"
            data-media-slot={model.mediaSlot}
            data-media-state="placeholder"
            role="img"
            aria-label={model.mediaLabel}
          >
            <span className="about-client-placeholder__accent" aria-hidden="true" />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 6: Recompose only the top half of `AboutPage`**

At this intermediate checkpoint render the new hero/introduction/stories, then leave existing lower sections temporarily below them so the task is independently reviewable. `AboutPage` must obtain one model:

```tsx
const model = createAboutPageModel(locale);

<AboutCompactHero model={model.hero} />
<AboutIntroduction model={model.introduction} />
{model.stories.map((story) => <AboutStorySection key={story.id} model={story} />)}
```

Do not delete old imports/sections yet unless TypeScript reports them unused; Task 4 performs the final composition cutover.

- [ ] **Step 7: Run focused test**

```bash
pnpm --filter @rosa/web exec vitest run src/test/client-about-compact-redesign.test.tsx
```

Expected: new top-half assertions PASS.

- [ ] **Step 8: Commit Task 2**

```bash
git add apps/web/src/features/about apps/web/src/test/client-about-compact-redesign.test.tsx
git commit -m "feat(web): build compact About story hierarchy"
```

---

### Task 3: Build real contact actions, native compliance UI and document placeholders

**Files:**
- Create: `apps/web/src/features/about/sections/about-contact-band.tsx`
- Create: `apps/web/src/features/about/sections/about-compliance.tsx`
- Create: `apps/web/src/features/about/sections/about-documents.tsx`
- Modify: `apps/web/src/features/about/about-page.tsx`
- Test: `apps/web/src/test/client-about-compact-redesign.test.tsx`

**Interfaces:**
- `AboutContactBand({ model }: { model: AboutPageModel["contact"] })`
- `AboutCompliance({ model }: { model: AboutPageModel["compliance"] })`
- `AboutDocuments({ documents }: { documents: readonly AboutDocumentModel[] })`

- [ ] **Step 1: Add RED assertions**

```tsx
it("renders real contact actions, six compliance principles and five neutral document placeholders", () => {
  const html = renderToStaticMarkup(<AboutPage locale="en" />);

  expect(html).toContain('data-section="about-client-contact"');
  expect(html).toMatch(/https:\/\/wa\.me\//);
  expect(html).toMatch(/mailto:/);
  expect((html.match(/data-about-compliance-item=/g) ?? [])).toHaveLength(6);
  expect((html.match(/data-about-document=/g) ?? [])).toHaveLength(5);
  for (const slot of [
    "about-client-document-iso",
    "about-client-document-mdma",
    "about-client-document-mdel",
    "about-client-document-ar",
    "about-client-document-warehouse"
  ]) expect(html).toContain(`data-media-slot="${slot}"`);
  expect(html).not.toMatch(/certificate number|approval number|licensed by|certified by/i);
});
```

- [ ] **Step 2: Run and verify RED**

```bash
pnpm --filter @rosa/web exec vitest run src/test/client-about-compact-redesign.test.tsx
```

- [ ] **Step 3: Implement `AboutContactBand` using authoritative contact values**

Import `PUBLIC_CONTENT_VALUES` and derive WhatsApp exactly as the homepage currently does:

```ts
const contact = PUBLIC_CONTENT_VALUES.contactDetails;
const whatsappHref = `https://wa.me/${contact.phone.replace(/\D/g, "")}`;
```

Component structure:

```tsx
<section className="about-client-contact" data-section="about-client-contact" aria-labelledby="about-client-contact-title">
  <Container size="wide">
    <Reveal className="about-client-contact__surface" direction="up">
      <div className="about-client-contact__actions">
        <a href={whatsappHref} target="_blank" rel="noreferrer">…{model.whatsappLabel}</a>
        <a href={contact.emailHref}>…{model.emailLabel}</a>
      </div>
      <div>
        <p>{model.eyebrow}</p>
        <h2 id="about-client-contact-title">{model.title}</h2>
      </div>
    </Reveal>
  </Container>
</section>
```

Use the same accessible inline WhatsApp/email SVG language as the homepage component, but keep the About component independent rather than importing a homepage-internal section.

- [ ] **Step 4: Implement `AboutCompliance`**

Use one local `ComplianceIcon` switch keyed by `AboutComplianceItem["id"]`. Every SVG:

```tsx
const common = {
  width: 34,
  height: 34,
  viewBox: "0 0 34 34",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true
};
```

Use simple document/scales/checklist/gavel/rules geometry; do not import an icon package. Render:

```tsx
<Section className="about-client-compliance" tone="paper" data-section="about-client-compliance">
  <Container size="wide">
    <Reveal direction="up"><h2>{model.title}</h2></Reveal>
    <div className="about-client-compliance__connector" aria-hidden="true" />
    <Stagger as="ul" className="about-client-compliance__grid" interval={0.055}>
      {model.items.map((item) => (
        <StaggerItem as="li" key={item.id}>
          <div data-about-compliance-item={item.id} className="about-client-compliance__item">
            <span className="about-client-compliance__icon"><ComplianceIcon id={item.id} /></span>
            <span>{item.label}</span>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  </Container>
</Section>
```

- [ ] **Step 5: Implement `AboutDocuments` as semantic list**

```tsx
<Section className="about-client-documents" tone="paper" data-section="about-client-documents">
  <Container size="wide">
    <Stagger as="ul" className="about-client-documents__grid" interval={0.045} aria-label="Compliance documents">
      {documents.map((document) => (
        <StaggerItem as="li" key={document.id}>
          <article className="about-client-document" data-about-document={document.id}>
            <h3>{document.label}</h3>
            <div
              className="about-client-document__preview"
              data-media-slot={document.mediaSlot}
              data-media-state="placeholder"
              aria-label={`${document.label} document image pending`}
              role="img"
            >
              <span /><span /><span /><span /><span />
            </div>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  </Container>
</Section>
```

Do not make placeholder documents downloadable/clickable. Actual file behavior is a later requirements decision when real documents exist.

- [ ] **Step 6: Add these three sections after the story rows in `AboutPage`**

Exact order at this checkpoint:

```tsx
<AboutContactBand model={model.contact} />
<AboutCompliance model={model.compliance} />
<AboutDocuments documents={model.documents} />
```

- [ ] **Step 7: Run focused test**

```bash
pnpm --filter @rosa/web exec vitest run src/test/client-about-compact-redesign.test.tsx
```

Expected: PASS.

- [ ] **Step 8: Commit Task 3**

```bash
git add apps/web/src/features/about apps/web/src/test/client-about-compact-redesign.test.tsx
git commit -m "feat(web): add About compliance and contact sections"
```

---

### Task 4: Complete the page cutover with quotation CTA and social strip

**Files:**
- Create: `apps/web/src/features/about/sections/about-quotation-cta.tsx`
- Create: `apps/web/src/features/about/sections/about-social-strip.tsx`
- Modify: `apps/web/src/features/about/about-page.tsx`
- Test: `apps/web/src/test/client-about-compact-redesign.test.tsx`

**Interfaces:**
- `AboutQuotationCta({ model }: { model: AboutPageModel["quotation"] })`
- `AboutSocialStrip({ model, locale }: { model: AboutPageModel["social"]; locale: PublicLocale })`

- [ ] **Step 1: Add final-composition RED test**

```tsx
it("uses the exact approved section order and retires the old About composition", () => {
  const html = renderToStaticMarkup(<AboutPage locale="en" />);
  const order = [
    "about-client-hero",
    "about-client-introduction",
    "about-client-workflow",
    "about-client-growth",
    "about-client-experience",
    "about-client-contact",
    "about-client-compliance",
    "about-client-documents",
    "about-client-quotation",
    "about-client-social"
  ];
  let cursor = -1;
  for (const section of order) {
    const next = html.indexOf(`data-section="${section}"`);
    expect(next).toBeGreaterThan(cursor);
    cursor = next;
  }

  expect(html).not.toContain('data-company-profile="true"');
  expect(html).not.toContain("data-supported-buyer=");
  expect(html).not.toContain("data-family-index-row=");
  expect(html).not.toContain('href="/procurement-support"');
  expect(html).toContain('href="/request-quotation"');
  expect(html).toContain('href="/products"');
  expect(html).not.toMatch(/youtube/i);
});
```

- [ ] **Step 2: Run and verify RED**

```bash
pnpm --filter @rosa/web exec vitest run src/test/client-about-compact-redesign.test.tsx
```

- [ ] **Step 3: Implement quotation CTA**

```tsx
export function AboutQuotationCta({ model }: { model: AboutPageModel["quotation"] }): ReactElement {
  return (
    <section className="about-client-quotation" data-section="about-client-quotation" aria-labelledby="about-client-quotation-title">
      <Container size="wide">
        <Reveal className="about-client-quotation__surface" direction="up">
          <div>
            <p>{model.eyebrow}</p>
            <h2 id="about-client-quotation-title">{model.title}</h2>
            <span>{model.copy}</span>
          </div>
          <LocalizedButtonLink href={model.primary.href}>{model.primary.label}</LocalizedButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Implement social strip through central social config**

```tsx
export function AboutSocialStrip({
  model,
  locale
}: {
  model: AboutPageModel["social"];
  locale: PublicLocale;
}): ReactElement {
  return (
    <aside className="about-client-social" data-section="about-client-social" aria-label={model.title}>
      <Container className="about-client-social__inner" size="wide">
        <h2>- {model.title} -</h2>
        <SocialLinksRow locale={locale} className="about-client-social__links" />
      </Container>
    </aside>
  );
}
```

Do not copy `SOCIAL_LINKS` into About. The current central configuration contains Instagram, X, Facebook and LinkedIn only.

- [ ] **Step 5: Replace `AboutPage` with the final thin composition root**

It should be structurally equivalent to:

```tsx
export function AboutPage({ locale = "en" }: { locale?: PublicLocale }): ReactElement {
  const model = createAboutPageModel(locale);

  return (
    <>
      <AboutCompactHero model={model.hero} />
      <AboutIntroduction model={model.introduction} />
      {model.stories.map((story) => <AboutStorySection key={story.id} model={story} />)}
      <AboutContactBand model={model.contact} />
      <AboutCompliance model={model.compliance} />
      <AboutDocuments documents={model.documents} />
      <AboutQuotationCta model={model.quotation} />
      <AboutSocialStrip model={model.social} locale={locale} />
    </>
  );
}
```

Remove now-unused imports of `CompanyProfile`, `SupportedBuyers`, `FamilyIndex`, old About media, breadcrumbs and procurement preview from `about-page.tsx`. Do not delete their source files.

- [ ] **Step 6: Run focused test**

```bash
pnpm --filter @rosa/web exec vitest run src/test/client-about-compact-redesign.test.tsx
```

Expected: PASS including section order and old-section absence.

- [ ] **Step 7: Commit Task 4**

```bash
git add apps/web/src/features/about apps/web/src/test/client-about-compact-redesign.test.tsx
git commit -m "feat(web): complete client About page composition"
```

---

### Task 5: Implement compact visual system and responsive geometry

**Files:**
- Create: `apps/web/src/styles/about-client-redesign.css`
- Modify: `apps/web/src/app/globals.css`
- Test: `apps/web/src/test/client-about-compact-redesign.test.tsx`

**Interfaces:** CSS classes emitted by Tasks 2–4. No new React interface.

- [ ] **Step 1: Add RED stylesheet contract**

```tsx
import { readFileSync } from "node:fs";
import { join } from "node:path";

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

it("locks compact responsive About geometry", () => {
  const css = source("src/styles/about-client-redesign.css");
  const globals = source("src/app/globals.css");

  expect(globals).toContain('@import "../styles/about-client-redesign.css";');
  expect(css).toContain(".about-client-hero");
  expect(css).toContain(".about-client-story__grid");
  expect(css).toMatch(/@media \(min-width: 50rem\)/);
  expect(css).toMatch(/grid-template-columns:\s*minmax\(0,\s*2fr\)\s*minmax\(0,\s*3fr\)/);
  expect(css).toMatch(/\.about-client-compliance__grid[^}]*grid-template-columns:\s*repeat\(6,/s);
  expect(css).toMatch(/@media \(max-width: 64rem\)[\s\S]*\.about-client-compliance__grid[\s\S]*repeat\(3,/);
  expect(css).toMatch(/@media \(max-width: 40rem\)[\s\S]*\.about-client-compliance__grid[\s\S]*repeat\(2,/);
  expect(css).toMatch(/@media \(max-width: 40rem\)[\s\S]*scroll-snap-type:\s*inline mandatory/);
  expect(css).not.toContain("text-align: justify");
});
```

- [ ] **Step 2: Run and verify RED**

```bash
pnpm --filter @rosa/web exec vitest run src/test/client-about-compact-redesign.test.tsx
```

- [ ] **Step 3: Add base visual rules**

Create `about-client-redesign.css` with these design anchors; use existing variables already defined by Rosa rather than introducing a new palette:

```css
.about-client-hero {
  position: relative;
  min-height: clamp(22rem, 42vw, 28.75rem);
  overflow: clip;
  background: var(--color-ink);
  color: var(--color-paper);
}

.about-client-hero__media,
.about-client-hero__overlay {
  position: absolute;
  inset: 0;
}

.about-client-hero__media {
  background:
    radial-gradient(circle at 74% 38%, rgb(255 255 255 / 0.12), transparent 30%),
    linear-gradient(110deg, #111 0%, #292929 48%, #111 100%);
}

.about-client-hero__overlay {
  background: linear-gradient(90deg, rgb(0 0 0 / 0.78) 0%, rgb(0 0 0 / 0.5) 48%, rgb(0 0 0 / 0.18) 100%);
}

.about-client-hero__inner {
  position: relative;
  z-index: 1;
  display: flex;
  min-height: inherit;
  align-items: center;
}

.about-client-hero__copy {
  max-width: min(46rem, 72%);
  padding-block: clamp(2.5rem, 5vw, 4rem);
}

.about-client-hero h1 {
  max-width: 18ch;
  font-size: clamp(2.1rem, 4.3vw, 4rem);
  line-height: 1.04;
  letter-spacing: -0.035em;
}

.about-client-hero__summary {
  max-width: 58ch;
  margin-top: 1rem;
  font-size: clamp(0.92rem, 1.1vw, 1rem);
  line-height: 1.5;
}

.about-client-introduction,
.about-client-story,
.about-client-compliance,
.about-client-documents {
  padding-block: clamp(2.25rem, 4vw, 3.25rem);
}

.about-client-introduction h2,
.about-client-story h2 {
  color: var(--color-rosa-red);
}

.about-client-introduction h2 {
  text-align: center;
  font-size: clamp(1.45rem, 2.3vw, 1.85rem);
}

.about-client-introduction p {
  max-width: 78ch;
  margin: 0.7rem auto 0;
  font-size: clamp(0.94rem, 1vw, 1rem);
  line-height: 1.52;
  text-align: start;
}

.about-client-story__grid {
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.75rem);
  align-items: center;
}

.about-client-story__copy h2 {
  margin: 0 0 0.55rem;
  font-size: clamp(1.35rem, 2vw, 1.7rem);
}

.about-client-story__copy p {
  margin: 0;
  font-size: clamp(0.94rem, 1vw, 1rem);
  line-height: 1.5;
  text-align: start;
}

.about-client-story__media {
  position: relative;
  min-height: clamp(14.5rem, 23vw, 18.75rem);
  overflow: hidden;
  background:
    linear-gradient(135deg, rgb(255 255 255 / 0.08), transparent 40%),
    linear-gradient(145deg, #1c1c1c, #555);
}

.about-client-placeholder__accent {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  width: 2.75rem;
  height: 0.42rem;
  background: var(--color-rosa-red);
  transform: translate(-50%, -50%);
}

.about-client-contact,
.about-client-quotation {
  padding-block: clamp(1.25rem, 2.5vw, 2rem);
}

.about-client-contact__surface,
.about-client-quotation__surface {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  padding: clamp(1rem, 2vw, 1.5rem) clamp(1.1rem, 2.8vw, 2rem);
  background: var(--color-ink);
  color: var(--color-paper);
}

.about-client-compliance h2 {
  text-align: center;
  color: var(--color-rosa-red);
  font-size: clamp(2rem, 4vw, 3.2rem);
  letter-spacing: 0.02em;
}

.about-client-compliance__grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.35rem;
}

.about-client-compliance__item {
  display: grid;
  justify-items: center;
  gap: 0.45rem;
  min-width: 0;
  text-align: center;
  color: var(--color-rosa-red);
}

.about-client-documents__grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: clamp(0.8rem, 1.5vw, 1.25rem);
}

.about-client-document h3 {
  margin: 0;
  padding: 0.45rem 0.6rem;
  background: var(--color-ink);
  color: var(--color-paper);
  text-align: center;
  font-size: 0.9rem;
}

.about-client-document__preview {
  position: relative;
  aspect-ratio: 0.707 / 1;
  overflow: hidden;
  border: 1px solid var(--color-line);
  background: var(--color-paper);
}

.about-client-document__preview > span {
  display: block;
  height: 2px;
  margin: 12% 12% 0;
  background: color-mix(in srgb, var(--color-ink) 16%, transparent);
}

.about-client-social {
  background: var(--color-rosa-red);
  color: var(--color-paper);
}

.about-client-social__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  min-height: 4.25rem;
}
```

- [ ] **Step 4: Add exact breakpoint behavior**

```css
@media (min-width: 50rem) {
  .about-client-story__grid {
    grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  }

  .about-client-story--media-left .about-client-story__media-reveal { grid-column: 1; grid-row: 1; }
  .about-client-story--media-left .about-client-story__copy { grid-column: 2; grid-row: 1; }
  .about-client-story--media-right .about-client-story__copy { grid-column: 1; grid-row: 1; }
  .about-client-story--media-right .about-client-story__media-reveal { grid-column: 2; grid-row: 1; }
}

@media (max-width: 64rem) {
  .about-client-compliance__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .about-client-compliance__connector { display: none; }
  .about-client-documents__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (max-width: 49.99rem) {
  .about-client-story__copy { grid-row: 1; }
  .about-client-story__media-reveal { grid-row: 2; }
  .about-client-hero__copy { max-width: min(38rem, 90%); }
}

@media (max-width: 40rem) {
  .about-client-hero { min-height: 24rem; }
  .about-client-hero__copy { max-width: 100%; }
  .about-client-hero__actions,
  .about-client-contact__surface,
  .about-client-quotation__surface,
  .about-client-social__inner { align-items: flex-start; flex-direction: column; }
  .about-client-compliance__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .about-client-documents { overflow: hidden; }
  .about-client-documents__grid {
    display: flex;
    gap: 0.9rem;
    overflow-x: auto;
    padding-inline: max(1rem, calc((100vw - 100%) / 2));
    padding-block-end: 0.75rem;
    scroll-snap-type: inline mandatory;
    overscroll-behavior-inline: contain;
  }
  .about-client-documents__grid > li {
    flex: 0 0 min(80vw, 19rem);
    scroll-snap-align: start;
  }
}
```

For RTL, use logical properties. Add only targeted `[dir="rtl"]` corrections if visual testing proves necessary; do not duplicate the whole stylesheet.

- [ ] **Step 5: Import the stylesheet in `globals.css`**

Append after the current homepage client styles:

```css
@import "../styles/about-client-redesign.css";
@import "../styles/about-client-interactions.css";
```

The second file is created in Task 6; during this task either create it empty only if the build requires the import to resolve, or delay the second import until Task 6. Prefer delaying it to avoid empty scaffolding commits.

- [ ] **Step 6: Run the style contract**

```bash
pnpm --filter @rosa/web exec vitest run src/test/client-about-compact-redesign.test.tsx
```

Expected: PASS.

- [ ] **Step 7: Commit Task 5**

```bash
git add apps/web/src/styles/about-client-redesign.css apps/web/src/app/globals.css apps/web/src/test/client-about-compact-redesign.test.tsx
git commit -m "feat(web): style compact responsive About layout"
```

---

### Task 6: Add premium interaction polish and reduced-motion-safe entrance behavior

**Files:**
- Create: `apps/web/src/styles/about-client-interactions.css`
- Modify: `apps/web/src/app/globals.css`
- Test: `apps/web/src/test/client-about-compact-redesign.test.tsx`

**Interfaces:** Existing data attributes and class names only.

- [ ] **Step 1: Add RED interaction contract**

```tsx
it("uses restrained transform-only About polish with reduced-motion fallback", () => {
  const css = source("src/styles/about-client-interactions.css");
  const globals = source("src/app/globals.css");

  expect(globals).toContain('@import "../styles/about-client-interactions.css";');
  expect(css).toContain("@keyframes about-client-hero-settle");
  expect(css).toMatch(/\.about-client-document[^}]*transition:[^}]*(transform|box-shadow)/s);
  expect(css).toMatch(/\.about-client-document:hover[^{]*\{[^}]*translateY\(-4px\)/s);
  expect(css).toMatch(/\.about-client-document:hover[\s\S]*scale\(1\.02\)/);
  expect(css).toContain("prefers-reduced-motion: reduce");
  expect(css).not.toMatch(/rotate\(/);
  expect(css).not.toMatch(/will-change:\s*(transform|opacity)/);
});
```

- [ ] **Step 2: Run and verify RED**

```bash
pnpm --filter @rosa/web exec vitest run src/test/client-about-compact-redesign.test.tsx
```

- [ ] **Step 3: Implement interaction stylesheet**

```css
@keyframes about-client-hero-settle {
  from { transform: scale(1.025) translate3d(10px, 0, 0); }
  to { transform: scale(1) translate3d(0, 0, 0); }
}

.about-client-hero__media {
  animation: about-client-hero-settle 0.96s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.about-client-document {
  transition:
    transform 0.42s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.42s cubic-bezier(0.22, 1, 0.36, 1);
}

.about-client-document__preview {
  transition:
    transform 0.42s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.3s ease;
}

.about-client-document:hover,
.about-client-document:focus-within {
  transform: translateY(-4px);
  box-shadow: 0 16px 34px rgb(0 0 0 / 0.11);
}

.about-client-document:hover .about-client-document__preview,
.about-client-document:focus-within .about-client-document__preview {
  transform: scale(1.02);
}

.about-client-compliance__connector {
  transform-origin: center;
  transition: transform 0.58s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.58s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-reduced-motion: reduce) {
  .about-client-hero__media { animation: none; }
  .about-client-document,
  .about-client-document__preview,
  .about-client-compliance__connector { transition: none; }
  .about-client-document:hover,
  .about-client-document:focus-within,
  .about-client-document:hover .about-client-document__preview,
  .about-client-document:focus-within .about-client-document__preview { transform: none; }
}
```

No custom JavaScript animation is needed. Story/heading/item entrances already use the shared motion system from the React components.

- [ ] **Step 4: Import the interaction stylesheet after base About styles**

```css
@import "../styles/about-client-redesign.css";
@import "../styles/about-client-interactions.css";
```

- [ ] **Step 5: Run focused test**

```bash
pnpm --filter @rosa/web exec vitest run src/test/client-about-compact-redesign.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit Task 6**

```bash
git add apps/web/src/styles/about-client-interactions.css apps/web/src/app/globals.css apps/web/src/test/client-about-compact-redesign.test.tsx
git commit -m "feat(web): polish About motion and interactions"
```

---

### Task 7: Update stale About unit/story contracts without weakening unrelated tests

**Files:**
- Modify: `apps/web/src/test/about-page.test.tsx`
- Modify: `apps/web/src/test/f7-story-pages.test.tsx`
- Test: same files + focused redesign test

**Interfaces:** No production interface changes.

- [ ] **Step 1: Replace the old `about-page.test.tsx` expectations**

The current test asserts `CompanyProfile`, four supported buyers, five family rows and old media. Replace those stale expectations with:

```tsx
it("renders the approved client About structure without unsupported claims", () => {
  const html = renderToStaticMarkup(<AboutPage />);
  const visibleText = html.replace(/<[^>]+>/g, " ");

  expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
  expect((html.match(/data-about-story=/g) ?? [])).toHaveLength(3);
  expect((html.match(/data-about-compliance-item=/g) ?? [])).toHaveLength(6);
  expect((html.match(/data-about-document=/g) ?? [])).toHaveLength(5);
  expect(html).toContain("Precision, clarity and dependable medical sourcing.");
  expect(html).toContain("About Rosa");
  expect(html).toContain("Our Workflow");
  expect(html).toContain("Business Growth");
  expect(html).toContain("Experience Sharing");
  expect(html).toContain("COMPLIANCE");
  expect(html).toContain('href="/products"');
  expect(html).toContain('href="/request-quotation"');
  expect(html).toMatch(/https:\/\/wa\.me\//);
  expect(html).toMatch(/mailto:/);
  expect(html).not.toContain('data-company-profile="true"');
  expect(html).not.toContain("data-supported-buyer=");
  expect(html).not.toContain("data-family-index-row=");
  expect(visibleText).not.toMatch(/\b(18|19|20)\d{2}\b/);
  expect(visibleText).not.toMatch(/founded|since|factory|manufacturer|ISO-certified|SFDA-certified|years of experience/i);
});
```

- [ ] **Step 2: Replace only the About case in `f7-story-pages.test.tsx`**

Keep every other test in that file untouched. New About assertions:

```tsx
it("frames the client-approved compact About story without inventing company history", () => {
  const html = renderToStaticMarkup(<AboutPage />);
  const styles = source("src/styles/about-client-redesign.css");
  const interactions = source("src/styles/about-client-interactions.css");

  expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
  expect(html).toContain('data-section="about-client-hero"');
  expect(html).toContain('data-media-slot="about-client-hero"');
  expect((html.match(/data-about-story=/g) ?? [])).toHaveLength(3);
  expect((html.match(/data-about-compliance-item=/g) ?? [])).toHaveLength(6);
  expect((html.match(/data-about-document=/g) ?? [])).toHaveLength(5);
  expect(html).toContain('data-motion="text-reveal"');
  expect(html).toContain('data-motion="stagger"');
  expect(html).toContain('data-motion="reveal"');
  expect(styles).toContain("grid-template-columns: repeat(5");
  expect(interactions).toContain("translateY(-4px)");
  expect(html).not.toContain("Built around professional buying needs.");
  expect(html).not.toContain('href="/procurement-support"');
  expect(html).not.toMatch(/founded|since \d{4}|factory|manufacturer|ISO-certified|SFDA-certified|years of experience/i);
});
```

- [ ] **Step 3: Run all About-owned Vitest contracts**

```bash
pnpm --filter @rosa/web exec vitest run \
  src/test/client-about-compact-redesign.test.tsx \
  src/test/about-page.test.tsx \
  src/test/f7-story-pages.test.tsx
```

Expected: PASS.

- [ ] **Step 4: Run typecheck now, before browser work**

```bash
pnpm --filter @rosa/web typecheck
```

Expected: PASS, or only baseline failures documented before Task 1. Any new failure in `features/about/**`, About styles/tests or imports must be fixed before proceeding.

- [ ] **Step 5: Commit Task 7**

```bash
git add apps/web/src/test/about-page.test.tsx apps/web/src/test/f7-story-pages.test.tsx
git commit -m "test(web): align About contracts with client redesign"
```

---

### Task 8: Add responsive/RTL/reduced-motion browser acceptance matrix

**Files:**
- Create: `apps/web/tests/e2e/client-about-compact-redesign.spec.ts`

**Interfaces:** Uses public About route and stable data attributes from Tasks 2–4.

- [ ] **Step 1: Write browser tests before responsive fixes**

Create:

```ts
import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { name: "phone-390", width: 390, height: 844 },
  { name: "phone-430", width: 430, height: 932 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "tablet-1024", width: 1024, height: 768 },
  { name: "laptop-1366", width: 1366, height: 768 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-1920", width: 1920, height: 1080 },
  { name: "wide-2560", width: 2560, height: 1440 }
] as const;

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const result = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));
  expect(result.scrollWidth).toBeLessThanOrEqual(result.innerWidth + 1);
}

for (const viewport of viewports) {
  test(`About client redesign composes at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    const response = await page.goto("/about");
    expect(response?.ok()).toBe(true);

    await expect(page.locator("[data-section='about-client-hero']")).toBeVisible();
    await expect(page.locator("[data-about-story]")).toHaveCount(3);
    await expect(page.locator("[data-about-compliance-item]")).toHaveCount(6);
    await expect(page.locator("[data-about-document]")).toHaveCount(5);
    await expect(page.getByRole("link", { name: "Request a Quote" }).first()).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
}

test("mobile About uses a document snap rail without page overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/about");
  const rail = page.locator(".about-client-documents__grid");
  await expect(rail).toHaveCSS("display", "flex");
  await expect(rail).toHaveCSS("overflow-x", "auto");
  await expect(rail).toHaveCSS("scroll-snap-type", /inline/);
  await expectNoHorizontalOverflow(page);
});

test("Arabic About keeps complete RTL structure", async ({ page }) => {
  await page.setViewportSize({ width: 430, height: 932 });
  await page.goto("/ar/about");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("[data-about-story]")).toHaveCount(3);
  await expect(page.locator("[data-about-compliance-item]")).toHaveCount(6);
  await expect(page.locator("[data-about-document]")).toHaveCount(5);
  await expectNoHorizontalOverflow(page);
});

test("reduced motion preserves complete About content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/about");
  await expect(page.locator("[data-section='about-client-hero']")).toBeVisible();
  await expect(page.locator("[data-about-story]")).toHaveCount(3);
  await expect(page.locator("[data-about-document]")).toHaveCount(5);
  const heroMedia = page.locator(".about-client-hero__media");
  await expect(heroMedia).toHaveCSS("animation-name", "none");
});
```

If the actual Arabic public route shape differs, inspect existing localization route tests and use the repository’s authoritative route. Do not invent a new route.

- [ ] **Step 2: Run the new E2E file and observe RED failures**

```bash
pnpm --filter @rosa/web exec playwright test tests/e2e/client-about-compact-redesign.spec.ts
```

Expected before final polish: at least one responsive CSS assertion may fail. Structural failures must be fixed in the owning component, not hidden in the test.

- [ ] **Step 3: Fix only observed responsive defects**

Allowed fixes:

- tune `clamp()` values;
- reduce hero min-height on short laptops;
- adjust story gaps;
- hide desktop compliance connector below 1024px;
- adjust tablet document columns;
- tune mobile rail card width between 72–82vw;
- add targeted `[dir="rtl"]` logical-direction rules;
- fix button wrapping/overflow.

Do not change the approved section order or reintroduce old About sections to satisfy tests.

- [ ] **Step 4: Re-run E2E until GREEN**

```bash
pnpm --filter @rosa/web exec playwright test tests/e2e/client-about-compact-redesign.spec.ts
```

Expected: PASS for all matrix cases.

- [ ] **Step 5: Commit Task 8**

```bash
git add apps/web/tests/e2e/client-about-compact-redesign.spec.ts apps/web/src/styles/about-client-redesign.css apps/web/src/styles/about-client-interactions.css
git commit -m "test(web): verify responsive client About redesign"
```

---

### Task 9: Final regression, quality and scope verification

**Files:** No new feature files expected. Fix only failures owned by this About redesign.

- [ ] **Step 1: Run the focused About suite**

```bash
pnpm --filter @rosa/web exec vitest run \
  src/test/client-about-compact-redesign.test.tsx \
  src/test/about-page.test.tsx \
  src/test/f7-story-pages.test.tsx
```

Expected: PASS.

- [ ] **Step 2: Run all web unit tests to detect stale cross-page assumptions**

```bash
pnpm --filter @rosa/web test
```

Expected: no new About-owned failures. If unrelated failures exactly match the preflight baseline, record them rather than modifying unrelated areas. If an existing cross-page test legitimately asserts About composition, update only its About expectation and rerun it.

- [ ] **Step 3: Run lint**

```bash
pnpm --filter @rosa/web lint
```

Expected: PASS. Fix all new About-owned lint issues.

- [ ] **Step 4: Run strict TypeScript**

```bash
pnpm --filter @rosa/web typecheck
```

Expected: PASS relative to baseline; no About-owned errors.

- [ ] **Step 5: Run production build**

```bash
pnpm --filter @rosa/web build
```

Expected: Next.js production build succeeds. No missing CSS import, client/server-boundary error or route-generation failure.

- [ ] **Step 6: Run focused browser matrix once more against production-equivalent app behavior**

```bash
pnpm --filter @rosa/web exec playwright test tests/e2e/client-about-compact-redesign.spec.ts
```

Expected: PASS.

- [ ] **Step 7: Manually inspect the required representative screenshots**

At minimum inspect:

- 390×844 English
- 430×932 Arabic
- 768×1024 English
- 1366×768 English
- 1920×1080 English
- 2560×1440 English

Acceptance checklist:

- hero does not dominate a full viewport;
- About Rosa paragraph stays readable and compact;
- story sections alternate visually on desktop but read copy-first on mobile;
- no justified-text gaps;
- red accents are controlled, not overwhelming;
- contact band and quotation CTA feel like the redesigned homepage family;
- compliance reads as native web UI, not a pasted presentation graphic;
- document placeholders are readable and balanced;
- mobile rail exposes part of the next document but does not overflow the page;
- social strip contains no YouTube;
- footer remains the shared global footer;
- animations are subtle and do not visibly reduce scrolling smoothness;
- reduced motion shows all content immediately.

- [ ] **Step 8: Audit branch scope against the implementation base**

```bash
git diff --name-only origin/frontend/client-homepage-compact-redesign...HEAD
git status --short
git log --oneline --decorate origin/frontend/client-homepage-compact-redesign..HEAD
```

Expected changed production scope: `apps/web/src/features/about/**`, About-specific CSS/import, About-related tests/E2E and approved docs. No backend/admin/API/catalogue data changes.

- [ ] **Step 9: Final verification commit only if Task 9 required code/test corrections**

```bash
git add <only-files-corrected-during-verification>
git commit -m "fix(web): close About redesign verification gaps"
```

Do not create an empty “verification” commit.

---

## Review Checkpoints During Execution

After Tasks 4, 6 and 8, stop for a reviewer-style inline audit before proceeding:

### Checkpoint A — structure after Task 4

Confirm:

- exact section sequence;
- all old public About sections are gone from composition;
- one H1;
- no unsupported claims;
- real routes/contact values;
- placeholders have final media-slot IDs.

### Checkpoint B — visual/motion system after Task 6

Confirm:

- density follows client feedback;
- typography is not oversized;
- no text justification;
- `Reveal`/`TextReveal`/`Stagger` are reused rather than replaced;
- CSS motion is transform-only and reduced-motion safe;
- no permanent `will-change`.

### Checkpoint C — browser behavior after Task 8

Confirm:

- no overflow at all target widths;
- story split/stack transition at 800px is clean;
- compliance 6 → 3 → 2 columns is intentional;
- documents 5 → 3 → mobile rail works;
- Arabic is structurally complete;
- short laptop hero remains compact.

## Deferred Follow-Up: Real Media Pass

Do **not** source or integrate final media inside this implementation plan. Once the placeholder redesign is visually approved, a separate media refinement spec/plan should replace exactly these stable slots:

- `about-client-hero`
- `about-client-workflow`
- `about-client-growth`
- `about-client-experience`
- `about-client-document-iso`
- `about-client-document-mdma`
- `about-client-document-mdel`
- `about-client-document-ar`
- `about-client-document-warehouse`

That later pass must not redesign section geometry.
