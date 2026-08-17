# Rosa Medical — Client-Faithful Compact About Page Redesign

Date: 2026-08-17
Design status: approved direction B — client-faithful premium rebuild
Reference: client-supplied `2. About Us.jpg.jpeg`
Implementation base: latest committed `frontend/client-homepage-compact-redesign` state at implementation start; do not branch from `main`

## 1. Goal

Redesign the public About page so it is immediately recognisable as the client-supplied About concept while correcting the reference image's weak typography, spacing, responsiveness, visual consistency and low-fidelity presentation details.

The page must feel like the same website as the already-redesigned homepage: compact, information-dense, professional, mostly light, ROSA red/black accents, grayscale editorial media, restrained premium motion and strong conversion paths.

The client’s repeated density feedback is a hard requirement:

- reduce oversized typography;
- reduce excessive line-height and vertical whitespace;
- expose more useful information per viewport;
- avoid forcing long scrolling for basic company information;
- remain readable and visually composed rather than merely compressed.

## 2. Source-of-truth hierarchy

Use the following precedence:

1. Client-supplied About JPG for page hierarchy, visual intent, density and section sequence.
2. Existing Rosa design system and the approved compact homepage redesign for typography, motion, responsive behavior, shell, navigation, conversion patterns and footer behavior.
3. Current repository content/contracts for verified routes, contact details, localisation and supported claims.
4. Model judgement only to correct visible design defects, improve responsiveness or prevent unsupported claims.

Do **not** blindly copy errors from the JPG.

## 3. Current About page disposition

The current About page renders a split hero, `CompanyProfile`, `SupportedBuyers`, `FamilyIndex`, procurement preview and a generic final CTA.

For the client redesign:

- stop rendering those existing About sections in the public About composition;
- do not delete their reusable components unless later proven dead elsewhere;
- keep backend, catalogue, quotation, admin, auth and API behavior unchanged;
- preserve locale routing and Arabic support architecture.

## 4. Final public section order

The redesigned About page will render, in this exact order:

1. Compact About hero
2. About Rosa introduction
3. Our Workflow story row
4. Business Growth story row
5. Experience Sharing story row
6. Direct contact band
7. Compliance principles
8. Compliance/certificate document gallery
9. Compact quotation CTA
10. Follow Us social strip
11. Existing global site footer

This sequence preserves the client’s narrative:

**identity → operations → growth → knowledge → contact → compliance → evidence → conversion**.

## 5. Section design

### 5.1 Compact About hero

Purpose: establish the page without consuming a full viewport.

Desktop:

- full-width dark/grayscale media surface below the global header;
- target hero height roughly 360–460 px depending viewport height;
- text anchored left inside the wide site container;
- controlled dark overlay for legibility;
- no breadcrumb inside the hero;
- no large standalone ROSA-logo visual;
- two small CTAs consistent with homepage sizing.

Content hierarchy:

- eyebrow: `Medical Device Supplier` or locale equivalent;
- About-focused headline derived from current verified company positioning, not unsupported history;
- one concise support sentence;
- `Explore Products` → `/products`;
- `Request a Quote` → `/request-quotation`.

Initial implementation uses a production-shaped placeholder media surface. Final photography is a later media-only pass.

Motion:

- background settles with a restrained scale/translation entrance;
- eyebrow rises;
- headline uses existing `TextReveal` word choreography;
- support copy rises after headline;
- CTAs rise last;
- no heavy parallax or continuous animation.

### 5.2 About Rosa introduction

Match the client’s centered red heading and compact narrative block while improving readability.

- centered ROSA-red heading;
- one editorial paragraph block;
- max text width about 72–78ch on wide screens;
- no full-width justified text;
- `text-align: start` for English/Arabic; never browser justification;
- compact vertical spacing.

Content should retain the client’s intended themes—quality, clarity, customer focus, integrity, collaboration and growth—but wording must not invent unverifiable founding dates, manufacturing status, factory claims, years of experience or certification status.

Motion: heading rise, paragraph rise with short delay.

### 5.3 Story rows

Create one reusable `AboutStorySection` component driven by data instead of three duplicated layouts.

Rows:

1. `Our Workflow` — media left, copy right.
2. `Business Growth` — copy left, media right.
3. `Experience Sharing` — media left, copy right.

Desktop geometry:

- compact two-column layout;
- approximately 40/60 media-to-copy balance;
- image target height roughly 230–300 px;
- consistent media aspect and vertical alignment across all three sections;
- red section heading, black body copy;
- no card shells unless needed for placeholder framing.

Placeholders:

- grayscale neutral media block;
- restrained ROSA-red accent mark identifying the future focal area;
- exact final aspect ratio so later image replacement causes no layout shift;
- explicit `data-media-slot` value for each future asset.

Motion:

- Workflow: media from left, copy from right;
- Growth: copy from left, media from right;
- Experience: media from left, copy from right;
- existing `Reveal` only; translation distances remain aligned with the shared motion config (~28 px desktop);
- no custom intersection observer or new animation library.

### 5.4 Direct contact band

Visually match the compact homepage contact interruption without coupling About to homepage-internal components.

- black surface;
- WhatsApp and Email actions using the real public contact values;
- `Get in Touch Now` title;
- no decorative hand PNG from the client mockup;
- accessible inline icons;
- locale-aware labels and direction.

Motion: one `Reveal direction="up"` for the surface; avoid independent button motion.

### 5.5 Compliance principles

The client’s COMPLIANCE diagram has the correct message but presentation-slide styling. Rebuild it as native responsive UI.

Heading:

- centered `COMPLIANCE`;
- ROSA red;
- slightly stronger scale than normal section headings, but not poster-sized.

Six principles:

1. Regulations
2. Legal System
3. Standards
4. Law
5. Rules
6. Requirements

Desktop:

- six items in one horizontal sequence;
- line icon above/within each item;
- subtle connector running through the sequence;
- label below;
- no boxed cards.

Tablet:

- 3 × 2 grid;
- connectors simplify or disappear rather than drawing misleading cross-row lines.

Mobile:

- 2 × 3 grid;
- generous minimum touch/reading space;
- no forced horizontal overflow.

Animation:

- heading rises;
- connector fades/draws in with CSS opacity/scale only;
- principle items stagger in using existing `Stagger`/`StaggerItem`;
- reduced-motion mode must show final state immediately.

Icons are local inline SVGs with a consistent 1.5–1.75 stroke treatment. No icon-library dependency is required.

### 5.6 Compliance/certificate document gallery

Client-provided labels:

- ISO
- MDMA
- MDEL
- AR
- WAREHOUSE

These labels come from the client’s supplied About redesign. They do **not** by themselves prove certification/approval. The first implementation therefore uses document placeholders only.

Each document card:

- black title strip;
- portrait A4-like placeholder below;
- muted document-line skeleton;
- stable aspect ratio near 0.707;
- no fake seal, signature, approval number or authority logo;
- optional `Document image pending` accessibility text where needed.

Desktop:

- five equal columns;
- readable documents, not tiny thumbnails;
- constrained wide container.

Tablet:

- 3 + 2 responsive grid.

Mobile:

- horizontal snap rail with roughly 72–82vw card width;
- visible next-card affordance through partial neighboring card;
- keyboard/focus access retained.

Hover/focus treatment:

- 3–4 px lift;
- very small preview scale (~1.02);
- subtle shadow/border increase;
- no tilt/rotation.

Later media replacement must be a data/asset swap only. Layout must not change.

### 5.7 Quotation CTA

Use the same compact visual language and real route as the redesigned homepage:

- black surface;
- small red eyebrow: `REQUEST A QUOTATION`;
- title: `Prepare your instruments inquiry.`;
- one-line support copy;
- red `Request a Quote` button to `/request-quotation`.

No new quotation behavior is introduced.

Motion: single upward reveal.

### 5.8 Social strip + footer

Add the red `Follow Us` strip immediately above the global footer.

- use existing `SocialLinksRow`/central social configuration;
- only render supported Rosa profiles;
- do not add YouTube merely because it appears in the JPG;
- preserve locale direction and accessible labels.

The existing global footer remains authoritative. Do not reproduce incorrect client-mockup links or create a second About-only footer.

## 6. Content model

Create a typed About-page model in `features/about/about.data.ts` containing English and Arabic variants for:

- hero;
- introduction;
- three story rows;
- contact band labels;
- compliance principle labels;
- document labels;
- quotation CTA;
- social strip title.

The implementation must avoid hardcoding large blocks of bilingual copy directly in JSX.

### Claims safety

The client JPG includes broad commercial/compliance language. Treat it as design/content direction, not independent evidence.

Rules:

- preserve client-approved wording when it does not create a new factual/legal claim;
- prefer existing repository wording where it is already approved and semantically equivalent;
- do not add founding years, factory/manufacturer claims, exact market footprint, certifications or regulatory approvals unless already supported by project content or client-supplied documentary media;
- document cards remain placeholders until actual client files are provided/approved;
- if real documents are later supplied, display them accurately without extrapolating what they prove.

## 7. Component architecture

Keep `about-page.tsx` as composition only.

Recommended structure:

```text
apps/web/src/features/about/
  about-page.tsx
  about.data.ts
  sections/
    about-compact-hero.tsx
    about-introduction.tsx
    about-story-section.tsx
    about-contact-band.tsx
    about-compliance.tsx
    about-documents.tsx
    about-quotation-cta.tsx
    about-social-strip.tsx
```

Responsibilities:

- `about-page.tsx`: obtains locale model and composes sections in order.
- `about-compact-hero.tsx`: hero markup + placeholder media + hero motion.
- `about-introduction.tsx`: centered introduction only.
- `about-story-section.tsx`: reusable alternating media/copy row.
- `about-contact-band.tsx`: real public contact actions.
- `about-compliance.tsx`: six principles and native icon/connector UI.
- `about-documents.tsx`: responsive document placeholder gallery.
- `about-quotation-cta.tsx`: conversion strip only.
- `about-social-strip.tsx`: social row only.

Do not modify homepage behavior merely to deduplicate small amounts of markup during this phase. Stability is more important than abstraction purity.

## 8. Styling architecture

Create About-specific compact redesign styles rather than overloading old F3D story-page selectors.

Recommended files:

```text
apps/web/src/styles/about-client-redesign.css
apps/web/src/styles/about-client-interactions.css
```

Import them once from the existing global stylesheet pipeline.

Design tokens should reuse existing CSS variables for:

- paper background;
- ROSA red;
- text/muted text;
- borders;
- container widths;
- button styles where already shared.

Avoid hard-coded one-off colors except where required for the client-specific red/black treatment.

## 9. Density specification

Desktop default targets:

- major section block padding: ~36–52 px top/bottom;
- story-row internal gap: ~28–44 px;
- primary section heading: ~24–30 px;
- body text: ~15–16 px;
- body line-height: ~1.45–1.55;
- hero headline: responsive clamp, visually below the homepage’s largest historic hero treatment;
- no section should contain decorative whitespace larger than its content requires.

These are design targets, not rigid pixel locks; final CSS may use `clamp()`.

## 10. Responsive matrix

The page must be intentionally composed at all of these classes, not merely “not broken”:

### Wide desktop: 1600–2560 px

- cap readable content widths;
- hero remains relatively shallow;
- story media does not grow indefinitely;
- five-document row remains centered and proportionate.

### Standard desktop/laptop: 1024–1599 px

- three story rows remain side-by-side;
- section density stays compact;
- compliance remains 6-across;
- documents remain five across while readable;
- no text collision at short laptop heights.

### Upper tablet: 800–1023 px

- story rows remain two-column with reduced gap and tighter type;
- compliance becomes 3 × 2;
- documents become 3 + 2;
- hero typography and padding tighten.

### Lower tablet: 641–799 px

- story rows stack into one column;
- compliance remains 3 × 2 where practical;
- documents remain a 3 + 2 grid;
- hero remains compact and text-first.

### Mobile: ≤640 px

- hero is short and text-first;
- story rows stack consistently; do not preserve alternating DOM reading order in a way that harms comprehension;
- compliance becomes 2 × 3;
- documents become horizontal snap rail;
- CTA/contact buttons wrap without full-width bloat unless necessary;
- absolutely no horizontal page overflow.

### RTL

- logical CSS properties (`margin-inline`, `padding-inline`, `text-align: start`) are preferred;
- story visual alternation should mirror where beneficial in Arabic but reading order remains logical;
- connectors and document rails must work in RTL;
- no English-only positioning assumptions.

## 11. Motion specification

Reuse the current motion system:

- `Reveal`
- `TextReveal`
- `Stagger`
- `StaggerItem`

Current shared values already provide ~0.58 s section motion, standard easing and ~28 px desktop translation. Keep those defaults unless a hero-specific treatment genuinely needs `MOTION_DURATION.hero`/`MOTION_DISTANCE.hero`.

Rules:

- transform/opacity only;
- no scroll-jacking;
- no custom RAF loops;
- no persistent `will-change` on static content;
- no springy/inertial wobble on corporate content;
- no animation that blocks interaction;
- reduced-motion must produce a complete readable page immediately.

## 12. Placeholder strategy

Placeholders are intentional production scaffolding, not temporary blank boxes.

Required future media slots:

- `about-client-hero`
- `about-client-workflow`
- `about-client-growth`
- `about-client-experience`
- `about-client-document-iso`
- `about-client-document-mdma`
- `about-client-document-mdel`
- `about-client-document-ar`
- `about-client-document-warehouse`

Each placeholder must:

- reserve final dimensions;
- expose a stable media-slot identifier;
- use neutral grayscale styling with restrained red accent;
- contain no fake photography or certification details;
- be replaceable later without changing section markup.

## 13. Accessibility

- exactly one `h1` on the page;
- headings descend logically;
- contact and quotation links have meaningful accessible names;
- decorative SVG compliance icons use `aria-hidden`;
- document rail is keyboard reachable;
- placeholder media is either correctly labeled or decorative depending context;
- no content depends only on red color for meaning;
- maintain adequate text/background contrast;
- honor reduced-motion preference;
- mobile snap rail must not trap focus.

## 14. Performance

The first placeholder phase should be lighter than the final photography phase.

- no unnecessary image downloads;
- no new animation dependency;
- no client-side state unless needed for a real interaction;
- About page should remain primarily server-rendered markup with only existing motion components introducing client boundaries;
- avoid layout thrashing by reserving all future media geometry now;
- future media pass should use AVIF/WebP, responsive sizes and explicit focal points.

## 15. Testing strategy

### Unit/static contracts

Create focused tests covering:

- exact section order;
- one `h1`;
- old About sections no longer render;
- all nine placeholder media slots exist;
- real contact/quotation routes remain correct;
- five document labels are present;
- no YouTube link is introduced;
- English + Arabic render without missing copy;
- no unsupported historical/manufacturing claims are introduced;
- motion hooks (`Reveal`, `TextReveal`, `Stagger`) are present on required sections.

### Responsive browser coverage

Minimum About matrix:

- 390 × 844
- 430 × 932
- 768 × 1024
- 1024 × 768
- 1366 × 768
- 1440 × 900
- 1920 × 1080
- one Arabic desktop viewport
- one Arabic mobile viewport
- one reduced-motion viewport

Assertions:

- zero horizontal overflow;
- hero stays compact;
- story layout follows breakpoint contract;
- compliance grid is 6/3×2/2×3 as appropriate;
- mobile document rail scrolls/snaps without page overflow;
- CTA/contact actions remain visible and usable;
- footer remains the shared site footer.

### Verification gates

Before completion:

- focused About tests;
- full web unit suite where practical;
- lint;
- strict typecheck;
- production build;
- affected Playwright About matrix;
- manual visual review at representative desktop/tablet/mobile widths.

Do not claim success without fresh verification evidence.

## 16. Implementation branch strategy

At implementation start:

1. resolve the latest committed tip of `frontend/client-homepage-compact-redesign`;
2. confirm it contains the approved homepage redesign and no unexpected divergence;
3. create a new About-specific branch from that tip, recommended name:
   `frontend/client-about-compact-redesign`;
4. do not branch from `main`;
5. keep modifications inside `apps/web/**` plus About redesign documentation/tests unless a clearly required shared public component must be adjusted.

## 17. Explicit non-goals for this phase

Do not:

- source or finalise the hero/workflow/growth/experience photography yet;
- ingest real certificate/document scans yet;
- change backend/API/Supabase/admin behavior;
- invent regulatory claims;
- redesign global navigation/footer architecture;
- rewrite homepage sections;
- add new animation libraries;
- create fake client credentials;
- optimize unrelated pages.

## 18. Acceptance criteria

The placeholder-phase redesign is accepted when:

1. The page is clearly recognisable as a refined implementation of the client JPG.
2. The page is materially denser than the old About page without cramped typography.
3. The three alternating story sections have consistent visual rhythm.
4. Compliance is native responsive UI, not a pasted infographic.
5. The five client-requested document categories are visible as honest placeholders.
6. Existing contact, quotation, social and footer systems remain functionally correct.
7. Motion quality matches the approved homepage style and respects reduced motion.
8. English and Arabic remain functional.
9. Mobile/tablet layouts are intentionally designed rather than desktop shrink-downs.
10. Final media can later replace placeholders without structural redesign.
11. No unsupported company/regulatory claim is newly introduced.
12. Verification gates pass before the branch is considered complete.
