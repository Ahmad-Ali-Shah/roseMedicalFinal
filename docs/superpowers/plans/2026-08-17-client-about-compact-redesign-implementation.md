# Client About Compact Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Rosa Medical’s public About page into the approved client-faithful compact design, using production-shaped media/document placeholders, the existing Rosa motion system, dense responsive layouts, real contact/social/quotation routes, and no unsupported company or compliance claims.

**Architecture:** `about-page.tsx` becomes a thin composition root. A typed `createAboutPageModel(locale)` in `about.data.ts` owns all English/Arabic page content and section metadata. Focused components under `features/about/sections/` render the hero, introduction, three reusable story rows, contact band, compliance sequence, document gallery, quotation CTA and social strip. Styling lives in two About-only CSS files imported through `globals.css`; shared `Reveal`, `TextReveal`, `Stagger`, `StaggerItem`, `LocalizedButtonLink`, `SocialLinksRow`, `Container`, `Section` and public content registry remain authoritative.

**Tech Stack:** Next.js 16.2.11, React 19.2, TypeScript 5.9, Motion 12 through existing Rosa motion primitives, CSS, Vitest 3.2, Playwright 1.57.

## Global Constraints

- At execution time, first invoke `superpowers:using-git-worktrees` and create `frontend/client-about-compact-redesign` from the **then-current** `frontend/client-homepage-compact-redesign` tip. Never branch from `main`.
- Do not modify `services/api/**`, Supabase/auth behavior, OpenAPI/contracts semantics, admin behavior, catalogue data, quotation persistence or backend routes.
- Keep the global footer authoritative; do not build an About-only footer.
- Do not add YouTube. Current central social configuration supports Instagram, X, Facebook and LinkedIn.
- Do not claim founding years, factory/manufacturer status, years of experience, certification/approval status, guaranteed stock/delivery or exact market footprint unless supported by existing project/client evidence.
- `ISO`, `MDMA`, `MDEL`, `AR`, `WAREHOUSE` are client-provided document labels only in this phase. Render neutral document placeholders, never fake certificates, authority logos, numbers, seals or signatures.
- First implementation intentionally keeps nine production-shaped media slots: hero, three story images and five document images. Geometry and slot IDs are final so later media integration is asset-only.
- Exactly one `h1`.
- English and Arabic render complete copy. The existing public router confirms Arabic About is `/ar/about` and wraps content with `dir="rtl"`.
- Story rows are split at `min-width: 50rem` (800px) and stack below it in logical copy-first DOM order.
- Compliance: 6 columns desktop, 3 columns at ≤64rem, 2 columns at ≤40rem.
- Documents: 5 columns desktop, 3 columns at ≤64rem, horizontal snap rail at ≤40rem.
- Reuse current motion defaults: `MOTION_DURATION.section = 0.58`, standard easing `[0.22, 1, 0.36, 1]`, desktop reveal distance `28`.
- Motion uses transform/opacity only, is reduced-motion safe, does not block interaction, uses no new animation dependency, no custom RAF loop, no scroll-jacking and no persistent `will-change`.
- Target density: desktop section padding about 36–52px, body 15–16px with 1.45–1.55 line-height, story media height about 230–300px.
- Use existing tokens: `--color-rosa-red`, `--color-ink`, `--color-paper`, `--color-mist`, `--color-steel`, `--color-border`, existing motion variables and container variables.
- Minimize CI use; all verification is local first.

## Execution Preflight

After the worktree skill creates the isolated worktree/branch, run:

```bash
git status --short --branch
git merge-base --is-ancestor origin/frontend/client-homepage-compact-redesign HEAD
pnpm --filter @rosa/web exec vitest run src/test/about-page.test.tsx src/test/f7-story-pages.test.tsx
pnpm --filter @rosa/web typecheck
```

Record any unrelated pre-existing failures as baseline evidence. This About branch must not repair unrelated homepage/admin failures.

---

## File Map

### Create

- `apps/web/src/features/about/sections/about-compact-hero.tsx`
- `apps/web/src/features/about/sections/about-introduction.tsx`
- `apps/web/src/features/about/sections/about-story-section.tsx`
- `apps/web/src/features/about/sections/about-contact-band.tsx`
- `apps/web/src/features/about/sections/about-compliance.tsx`
- `apps/web/src/features/about/sections/about-documents.tsx`
- `apps/web/src/features/about/sections/about-quotation-cta.tsx`
- `apps/web/src/features/about/sections/about-social-strip.tsx`
- `apps/web/src/styles/about-client-redesign.css`
- `apps/web/src/styles/about-client-interactions.css`
- `apps/web/src/test/client-about-compact-redesign.test.tsx`
- `apps/web/tests/e2e/client-about-compact-redesign.spec.ts`

### Modify

- `apps/web/src/features/about/about.data.ts`
- `apps/web/src/features/about/about-page.tsx`
- `apps/web/src/app/globals.css`
- `apps/web/src/test/about-page.test.tsx`
- `apps/web/src/test/f7-story-pages.test.tsx`

### Do not delete in this phase

- `apps/web/src/features/about/company-profile.tsx`
- `apps/web/src/features/about/supported-buyers.tsx`
- shared `FamilyIndex` / public editorial components

They stop rendering on About; source deletion is a separate dead-code decision.

---

### Task 1: Define the typed redesign model with a RED contract

**Files:**
- Modify: `apps/web/src/features/about/about.data.ts`
- Create: `apps/web/src/test/client-about-compact-redesign.test.tsx`

**Produces:**

```ts
createAboutPageModel(locale?: PublicLocale): AboutPageModel
AboutPageModel
AboutStoryModel
AboutDocumentModel
AboutComplianceItem
```

- [ ] **Step 1: Write the failing model contract**

```tsx
import { describe, expect, it } from "vitest";
import { createAboutPageModel } from "@/features/about/about.data";

describe("client About compact redesign", () => {
  it("defines complete English and Arabic page models", () => {
    const en = createAboutPageModel("en");
    const ar = createAboutPageModel("ar");

    expect(en.hero.eyebrow).toBe("Medical Device Supplier");
    expect(en.introduction.title).toBe("About Rosa");
    expect(en.stories.map((item) => item.id)).toEqual(["workflow", "growth", "experience"]);
    expect(en.stories.map((item) => item.mediaSide)).toEqual(["left", "right", "left"]);
    expect(en.compliance.items.map((item) => item.id)).toEqual([
      "regulations", "legal-system", "standards", "law", "rules", "requirements"
    ]);
    expect(en.documents.map((item) => item.label)).toEqual(["ISO", "MDMA", "MDEL", "AR", "WAREHOUSE"]);
    expect(en.quotation.primary.href).toBe("/request-quotation");
    expect(ar.stories).toHaveLength(3);
    expect(ar.compliance.items).toHaveLength(6);
    expect(ar.documents).toHaveLength(5);
  });

  it("does not add unsupported company claims", () => {
    const text = JSON.stringify(createAboutPageModel("en"));
    expect(text).not.toMatch(/\b(18|19|20)\d{2}\b/);
    expect(text).not.toMatch(/founded|since \d{4}|factory|manufacturer|years of experience|ISO-certified|SFDA-certified/i);
  });
});
```

- [ ] **Step 2: Run RED**

```bash
pnpm --filter @rosa/web exec vitest run src/test/client-about-compact-redesign.test.tsx
```

Expected: FAIL because the new model API is absent.

- [ ] **Step 3: Add stable model types**

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
  contact: { eyebrow: string; title: string; whatsappLabel: string; emailLabel: string };
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

- [ ] **Step 4: Add the explicit English model**

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

- [ ] **Step 5: Add the complete Arabic sibling model**

Use these exact safe values:

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

- [ ] **Step 6: Run GREEN and commit**

```bash
pnpm --filter @rosa/web exec vitest run src/test/client-about-compact-redesign.test.tsx
git add apps/web/src/features/about/about.data.ts apps/web/src/test/client-about-compact-redesign.test.tsx
git commit -m "feat(web): define compact About redesign model"
```

---

### Task 2: Build compact hero, introduction and reusable story rows

**Files:** create `about-compact-hero.tsx`, `about-introduction.tsx`, `about-story-section.tsx`; modify `about-page.tsx`; extend focused test.

**Interfaces:**

```ts
AboutCompactHero({ model }: { model: AboutPageModel["hero"] })
AboutIntroduction({ model }: { model: AboutPageModel["introduction"] })
AboutStorySection({ model }: { model: AboutStoryModel })
```

- [ ] **Step 1: Add RED structure assertions**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { AboutPage } from "@/features/about";

it("renders the compact hero, introduction and three story rows", () => {
  const html = renderToStaticMarkup(<AboutPage locale="en" />);
  expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
  expect(html).toContain('data-section="about-client-hero"');
  expect(html).toContain('data-media-slot="about-client-hero"');
  expect(html).toContain('data-section="about-client-introduction"');
  expect((html.match(/data-about-story=/g) ?? [])).toHaveLength(3);
  for (const id of ["workflow", "growth", "experience"]) {
    expect(html).toContain(`data-about-story="${id}"`);
    expect(html).toContain(`data-media-slot="about-client-${id}"`);
  }
  expect(html).toContain('data-motion="text-reveal"');
  expect((html.match(/data-motion="reveal"/g) ?? []).length).toBeGreaterThanOrEqual(8);
});
```

Run RED:

```bash
pnpm --filter @rosa/web exec vitest run src/test/client-about-compact-redesign.test.tsx
```

- [ ] **Step 2: Implement `AboutCompactHero`**

Use `Section`, `Container`, `Reveal`, `TextReveal`, `LocalizedButtonLink`. The media surface is a real layout placeholder with `role="img"`, `aria-label={model.mediaLabel}`, `data-media-slot={model.mediaSlot}`, `data-media-state="placeholder"`. Keep headline/copy/CTA choreography in the shared motion system:

```tsx
<Section className="about-client-hero" data-section="about-client-hero" spacing="compact">
  <div className="about-client-hero__media" data-media-slot={model.mediaSlot} data-media-state="placeholder" role="img" aria-label={model.mediaLabel}>
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
```

- [ ] **Step 3: Implement `AboutIntroduction`**

Centered red H2 and one readable paragraph, both via `Reveal`.

- [ ] **Step 4: Implement `AboutStorySection` with copy-first DOM order**

```tsx
const copyDirection = model.mediaSide === "left" ? "left" : "right";
const mediaDirection = model.mediaSide === "left" ? "right" : "left";

<Section className={`about-client-story about-client-story--media-${model.mediaSide}`} tone="paper" data-section={`about-client-${model.id}`}>
  <Container className="about-client-story__grid" size="wide">
    <Reveal className="about-client-story__copy" direction={copyDirection}>
      <h2>{model.title}</h2>
      <p>{model.copy}</p>
    </Reveal>
    <Reveal className="about-client-story__media-reveal" direction={mediaDirection} delay={0.05}>
      <div className="about-client-story__media" data-about-story={model.id} data-media-slot={model.mediaSlot} data-media-state="placeholder" role="img" aria-label={model.mediaLabel}>
        <span className="about-client-placeholder__accent" aria-hidden="true" />
      </div>
    </Reveal>
  </Container>
</Section>
```

- [ ] **Step 5: Recompose the top of `AboutPage`**

Obtain `const model = createAboutPageModel(locale)` and render hero → introduction → three stories. The old lower sections may remain only until Task 4 final cutover.

- [ ] **Step 6: Run GREEN and commit**

```bash
pnpm --filter @rosa/web exec vitest run src/test/client-about-compact-redesign.test.tsx
git add apps/web/src/features/about apps/web/src/test/client-about-compact-redesign.test.tsx
git commit -m "feat(web): build compact About story hierarchy"
```

---

### Task 3: Build real contact band, compliance sequence and document gallery

**Files:** create `about-contact-band.tsx`, `about-compliance.tsx`, `about-documents.tsx`; modify page; extend focused test.

- [ ] **Step 1: Add RED assertions**

```tsx
it("renders real contact actions, six compliance principles and five document placeholders", () => {
  const html = renderToStaticMarkup(<AboutPage locale="en" />);
  expect(html).toContain('data-section="about-client-contact"');
  expect(html).toMatch(/https:\/\/wa\.me\//);
  expect(html).toMatch(/mailto:/);
  expect((html.match(/data-about-compliance-item=/g) ?? [])).toHaveLength(6);
  expect((html.match(/data-about-document=/g) ?? [])).toHaveLength(5);
  for (const id of ["iso", "mdma", "mdel", "ar", "warehouse"]) {
    expect(html).toContain(`data-media-slot="about-client-document-${id}"`);
  }
  expect(html).not.toMatch(/certificate number|approval number|licensed by|certified by/i);
});
```

Run RED with the focused Vitest command.

- [ ] **Step 2: Implement `AboutContactBand` from authoritative contact data**

```ts
const contact = PUBLIC_CONTENT_VALUES.contactDetails;
const whatsappHref = `https://wa.me/${contact.phone.replace(/\D/g, "")}`;
```

Render a black surface inside `Container size="wide"`, real WhatsApp/email anchors, accessible inline icons, model labels, and one `Reveal direction="up"`. Do not import the homepage-internal component.

- [ ] **Step 3: Implement `AboutCompliance`**

Use a local `ComplianceIcon` switch keyed by `AboutComplianceItem["id"]`, with shared SVG attributes:

```ts
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

Render H2 via `Reveal`, one decorative connector, and six items via `Stagger`/`StaggerItem`. Every item gets `data-about-compliance-item={item.id}`. Use simple local line paths representing regulation/document, legal scales, standards/checklist, law/gavel, rules/list and requirements/checklist; no icon library.

- [ ] **Step 4: Implement `AboutDocuments`**

Semantic `ul` → `li` → `article`. Each article gets `data-about-document={document.id}`, a black H3 strip, and portrait preview:

```tsx
<div
  className="about-client-document__preview"
  data-media-slot={document.mediaSlot}
  data-media-state="placeholder"
  role="img"
  aria-label={`${document.label} document image pending`}
>
  <span /><span /><span /><span /><span />
</div>
```

Do not make placeholder documents links/downloads.

- [ ] **Step 5: Add contact → compliance → documents after the story rows**

- [ ] **Step 6: Run GREEN and commit**

```bash
pnpm --filter @rosa/web exec vitest run src/test/client-about-compact-redesign.test.tsx
git add apps/web/src/features/about apps/web/src/test/client-about-compact-redesign.test.tsx
git commit -m "feat(web): add About compliance and contact sections"
```

---

### Task 4: Add quotation/social and perform the final About composition cutover

**Files:** create `about-quotation-cta.tsx`, `about-social-strip.tsx`; modify page; extend focused test.

- [ ] **Step 1: Add RED section-order/old-section removal test**

```tsx
it("renders the approved section order and retires the previous About composition", () => {
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
  expect(html).toContain('href="/products"');
  expect(html).toContain('href="/request-quotation"');
  expect(html).not.toMatch(/youtube/i);
});
```

- [ ] **Step 2: Implement compact quotation CTA**

Black surface, red eyebrow, H2, one support line and `LocalizedButtonLink` to the model’s `/request-quotation` route. Entire surface enters through one `Reveal direction="up"`.

- [ ] **Step 3: Implement social strip through `SocialLinksRow`**

```tsx
<aside className="about-client-social" data-section="about-client-social" aria-label={model.title}>
  <Container className="about-client-social__inner" size="wide">
    <h2>- {model.title} -</h2>
    <SocialLinksRow locale={locale} className="about-client-social__links" />
  </Container>
</aside>
```

Do not duplicate `SOCIAL_LINKS`.

- [ ] **Step 4: Replace `AboutPage` with the final thin composition**

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

Remove unused old imports from `about-page.tsx`; do not delete their source files.

- [ ] **Step 5: Run GREEN and commit**

```bash
pnpm --filter @rosa/web exec vitest run src/test/client-about-compact-redesign.test.tsx
git add apps/web/src/features/about apps/web/src/test/client-about-compact-redesign.test.tsx
git commit -m "feat(web): complete client About page composition"
```

**Checkpoint A:** Review exact section order, one H1, old composition absence, safe claims, real routes/contact and all nine stable media slots before styling.

---

### Task 5: Implement the compact visual system and responsive geometry

**Files:** create `about-client-redesign.css`; modify `globals.css`; extend focused test.

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
  expect(css).toMatch(/@media \(min-width: 50rem\)/);
  expect(css).toMatch(/grid-template-columns:\s*minmax\(0,\s*2fr\)\s*minmax\(0,\s*3fr\)/);
  expect(css).toMatch(/\.about-client-compliance__grid[\s\S]*repeat\(6,/);
  expect(css).toMatch(/@media \(max-width: 64rem\)[\s\S]*repeat\(3,/);
  expect(css).toMatch(/@media \(max-width: 40rem\)[\s\S]*repeat\(2,/);
  expect(css).toMatch(/@media \(max-width: 40rem\)[\s\S]*scroll-snap-type:\s*inline mandatory/);
  expect(css).not.toContain("text-align: justify");
});
```

Run RED.

- [ ] **Step 2: Build base density/layout CSS using real Rosa tokens**

Required anchors:

```css
.about-client-hero {
  position: relative;
  min-height: clamp(22rem, 42vw, 28.75rem);
  overflow: clip;
  background: var(--color-ink);
  color: var(--color-paper);
}

.about-client-hero__media,
.about-client-hero__overlay { position: absolute; inset: 0; }

.about-client-hero__media {
  background:
    radial-gradient(circle at 74% 38%, rgb(255 255 255 / 0.12), transparent 30%),
    linear-gradient(110deg, #111 0%, #292929 48%, #111 100%);
}

.about-client-hero__overlay {
  background: linear-gradient(90deg, rgb(0 0 0 / 0.78), rgb(0 0 0 / 0.5) 48%, rgb(0 0 0 / 0.18));
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

.about-client-introduction,
.about-client-story,
.about-client-compliance,
.about-client-documents { padding-block: clamp(2.25rem, 4vw, 3.25rem); }

.about-client-introduction h2,
.about-client-story h2 { color: var(--color-rosa-red); }

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
  background: linear-gradient(145deg, #1c1c1c, #555);
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
.about-client-quotation { padding-block: clamp(1.25rem, 2.5vw, 2rem); }

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
}

.about-client-compliance__grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.35rem;
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
  aspect-ratio: 0.707 / 1;
  overflow: hidden;
  border: 1px solid var(--color-border);
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
```

- [ ] **Step 3: Add exact breakpoint rules**

```css
@media (min-width: 50rem) {
  .about-client-story__grid { grid-template-columns: minmax(0, 2fr) minmax(0, 3fr); }
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

- [ ] **Step 4: Import after homepage client styles**

```css
@import "../styles/about-client-redesign.css";
```

- [ ] **Step 5: Run GREEN and commit**

```bash
pnpm --filter @rosa/web exec vitest run src/test/client-about-compact-redesign.test.tsx
git add apps/web/src/styles/about-client-redesign.css apps/web/src/app/globals.css apps/web/src/test/client-about-compact-redesign.test.tsx
git commit -m "feat(web): style compact responsive About layout"
```

---

### Task 6: Add premium interaction polish and reduced-motion behavior

**Files:** create `about-client-interactions.css`; modify `globals.css`; extend test.

- [ ] **Step 1: Add RED interaction contract**

```tsx
it("uses restrained transform-only About polish with reduced-motion fallback", () => {
  const css = source("src/styles/about-client-interactions.css");
  expect(css).toContain("@keyframes about-client-hero-settle");
  expect(css).toMatch(/translateY\(-4px\)/);
  expect(css).toContain("scale(1.02)");
  expect(css).toContain("prefers-reduced-motion: reduce");
  expect(css).not.toMatch(/rotate\(/);
  expect(css).not.toMatch(/will-change:\s*(transform|opacity)/);
});
```

- [ ] **Step 2: Implement exact polish**

```css
@keyframes about-client-hero-settle {
  from { transform: scale(1.025) translate3d(10px, 0, 0); }
  to { transform: scale(1) translate3d(0, 0, 0); }
}

.about-client-hero__media {
  animation: about-client-hero-settle var(--motion-hero) var(--motion-ease-emphasized) both;
}

.about-client-document {
  transition: transform 420ms var(--motion-ease), box-shadow 420ms var(--motion-ease);
}

.about-client-document__preview {
  transition: transform 420ms var(--motion-ease), border-color var(--transition-fast);
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

- [ ] **Step 3: Import immediately after base About stylesheet**

```css
@import "../styles/about-client-redesign.css";
@import "../styles/about-client-interactions.css";
```

- [ ] **Step 4: Run GREEN and commit**

```bash
pnpm --filter @rosa/web exec vitest run src/test/client-about-compact-redesign.test.tsx
git add apps/web/src/styles/about-client-interactions.css apps/web/src/app/globals.css apps/web/src/test/client-about-compact-redesign.test.tsx
git commit -m "feat(web): polish About motion and interactions"
```

**Checkpoint B:** Verify no oversized type, no justified text, motion still comes primarily from Rosa primitives, CSS animation is transform-only, reduced motion is complete, and no persistent `will-change` exists.

---

### Task 7: Replace stale About contracts without weakening unrelated tests

**Files:** modify `about-page.test.tsx` and only the About test case inside `f7-story-pages.test.tsx`.

- [ ] **Step 1: Replace `about-page.test.tsx` assertions**

The test must assert one H1, 3 stories, 6 compliance items, 5 documents, the new hero/section copy, products/quotation/contact routes, absence of old company-profile/buyer/family markers, and the unsupported-claim regex.

Use:

```tsx
expect((html.match(/data-about-story=/g) ?? [])).toHaveLength(3);
expect((html.match(/data-about-compliance-item=/g) ?? [])).toHaveLength(6);
expect((html.match(/data-about-document=/g) ?? [])).toHaveLength(5);
expect(html).toContain("Precision, clarity and dependable medical sourcing.");
expect(html).toContain("Our Workflow");
expect(html).toContain("Business Growth");
expect(html).toContain("Experience Sharing");
expect(html).not.toContain('data-company-profile="true"');
expect(html).not.toContain("data-supported-buyer=");
expect(html).not.toContain("data-family-index-row=");
```

- [ ] **Step 2: Replace only the About test in `f7-story-pages.test.tsx`**

New assertions must check the client section/media markers, `text-reveal`, `stagger`, `reveal`, 5-column document CSS, document hover lift, absence of the previous “Built around professional buying needs.” copy and absence of `/procurement-support` in About.

Do not modify procurement/catalogues/contact/legal tests in that file.

- [ ] **Step 3: Run About-owned tests and typecheck**

```bash
pnpm --filter @rosa/web exec vitest run \
  src/test/client-about-compact-redesign.test.tsx \
  src/test/about-page.test.tsx \
  src/test/f7-story-pages.test.tsx
pnpm --filter @rosa/web typecheck
```

Expected: all About-owned tests pass and no new About-owned TypeScript error exists.

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/test/about-page.test.tsx apps/web/src/test/f7-story-pages.test.tsx
git commit -m "test(web): align About contracts with client redesign"
```

---

### Task 8: Add responsive, RTL and reduced-motion browser acceptance

**File:** create `apps/web/tests/e2e/client-about-compact-redesign.spec.ts`.

- [ ] **Step 1: Write the browser matrix before responsive corrections**

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
  const dimensions = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth + 1);
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
    await expectNoHorizontalOverflow(page);
  });
}

test("mobile documents use a snap rail", async ({ page }) => {
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
  await expect(page.locator(".public-locale-boundary")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("[data-about-story]")).toHaveCount(3);
  await expect(page.locator("[data-about-compliance-item]")).toHaveCount(6);
  await expect(page.locator("[data-about-document]")).toHaveCount(5);
  await expectNoHorizontalOverflow(page);
});

test("reduced motion leaves the complete About page visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/about");
  await expect(page.locator("[data-section='about-client-hero']")).toBeVisible();
  await expect(page.locator("[data-about-story]")).toHaveCount(3);
  await expect(page.locator("[data-about-document]")).toHaveCount(5);
  await expect(page.locator(".about-client-hero__media")).toHaveCSS("animation-name", "none");
});
```

- [ ] **Step 2: Run E2E RED/GREEN loop**

```bash
pnpm --filter @rosa/web exec playwright test tests/e2e/client-about-compact-redesign.spec.ts
```

Fix only observed About issues: clamp values, short-laptop hero height, story gap, connector visibility, tablet document columns, mobile rail width, logical RTL properties or button wrapping. Do not change section order or reintroduce old sections.

- [ ] **Step 3: Re-run until all cases pass and commit**

```bash
pnpm --filter @rosa/web exec playwright test tests/e2e/client-about-compact-redesign.spec.ts
git add apps/web/tests/e2e/client-about-compact-redesign.spec.ts apps/web/src/styles/about-client-redesign.css apps/web/src/styles/about-client-interactions.css
git commit -m "test(web): verify responsive client About redesign"
```

**Checkpoint C:** Inspect 390×844, 430×932 RTL, 768×1024, 1366×768, 1920×1080 and 2560×1440. Confirm no overflow, compact hero, clean split/stack transition, 6→3→2 compliance, 5→3→rail documents and smooth scroll behavior.

---

### Task 9: Final verification and scope audit

- [ ] **Step 1: Focused About suite**

```bash
pnpm --filter @rosa/web exec vitest run \
  src/test/client-about-compact-redesign.test.tsx \
  src/test/about-page.test.tsx \
  src/test/f7-story-pages.test.tsx
```

- [ ] **Step 2: Full web tests**

```bash
pnpm --filter @rosa/web test
```

No new About-owned failure is acceptable. Pre-existing unrelated failures must match preflight evidence; do not modify unrelated code to hide them.

- [ ] **Step 3: Lint, strict TypeScript and production build**

```bash
pnpm --filter @rosa/web lint
pnpm --filter @rosa/web typecheck
pnpm --filter @rosa/web build
```

- [ ] **Step 4: Final focused browser matrix**

```bash
pnpm --filter @rosa/web exec playwright test tests/e2e/client-about-compact-redesign.spec.ts
```

- [ ] **Step 5: Manual visual acceptance**

Check representative screenshots at 390×844 EN, 430×932 AR, 768×1024 EN, 1366×768 EN, 1920×1080 EN and 2560×1440 EN. Accept only when:

- hero is compact rather than full-screen;
- About Rosa paragraph remains readable, not justified;
- desktop rows alternate visually while mobile stays copy-first;
- red accents are controlled;
- contact/quotation/social feel like the redesigned homepage family;
- compliance reads as native web UI rather than a pasted slide;
- document placeholders are balanced and readable;
- mobile rail reveals neighboring content without page overflow;
- no YouTube appears;
- shared footer remains unchanged;
- motion is subtle and does not visibly reduce smoothness;
- reduced motion exposes complete content immediately.

- [ ] **Step 6: Audit branch scope**

```bash
git diff --name-only origin/frontend/client-homepage-compact-redesign...HEAD
git status --short
git log --oneline --decorate origin/frontend/client-homepage-compact-redesign..HEAD
```

Expected production scope: `apps/web/src/features/about/**`, About CSS/import, About-related tests/E2E and the approved design/plan docs only. No backend/admin/API/catalogue-data changes.

- [ ] **Step 7: If verification required corrections, stage them interactively and commit only the reviewed hunks**

```bash
git add -p
git diff --cached --name-only
git diff --cached --check
git commit -m "fix(web): close About redesign verification gaps"
```

Skip this commit when verification required no correction.

---

## Deferred Media Pass

Do not source or integrate final images/certificate files inside this implementation plan. After the placeholder redesign is visually approved, a separate media pass replaces exactly these stable slots without changing section geometry:

- `about-client-hero`
- `about-client-workflow`
- `about-client-growth`
- `about-client-experience`
- `about-client-document-iso`
- `about-client-document-mdma`
- `about-client-document-mdel`
- `about-client-document-ar`
- `about-client-document-warehouse`
