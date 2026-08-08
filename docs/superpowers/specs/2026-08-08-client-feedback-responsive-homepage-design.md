# Rosa Medical Client-Feedback Responsive Homepage Design

**Date:** 2026-08-08  
**Status:** Approved design from client-feedback brainstorming; written-spec review pending  
**Authoritative base branch:** `ahmadx67676767`  
**Verified base commit:** `e7c63bfc319560dcbf98ba713a1b1289e7e71f00`  
**Design branch:** `frontend/client-feedback-responsive-homepage-design`  
**Approved Figma source:** https://www.figma.com/design/L7LKGItaD2o6tZzHuw1GUQ  
**Client density/interaction references:** https://www.imdad.com/ and https://www.imdad.com/ar/  
**Family-gallery interaction reference:** https://reactbits.dev/components/accordion-gallery

## 1. Purpose

The current Rosa Medical public site is visually strong, cinematic, animated, and already approved in broad character. The client specifically likes the existing responsive details and premium motion. The problem identified in client review is scale and viewport efficiency: on normal desktop and laptop displays, headings, media, hero height, section spacing, and cards often consume too much of the viewport. The same issue is noticeable on phones, where attractive sections still require excessive scrolling because each composition is vertically oversized.

This phase does **not** redesign Rosa from scratch. It preserves the existing brand, motion language, page hierarchy, public catalogue behavior, quotation flow, backend boundaries, and source-controlled presentation system. It introduces a reusable responsive-density foundation and proves it on the homepage first.

The target feeling is:

> The same premium Rosa website, but more mature in its use of viewport space.

A visitor should understand materially more of the page per viewport without perceiving the interface as globally shrunken, cramped, or reduced to a desktop-at-80%-zoom treatment.

## 2. Repository baseline and drift verification

The handoff checkpoint was `27c67f10f7fada54b281a800c2563568b77768c7`. Before writing this specification, `ahmadx67676767` was rechecked and had advanced by exactly two commits to `e7c63bfc319560dcbf98ba713a1b1289e7e71f00`.

The two-commit delta touches only:

- `apps/web/src/features/admin-products/actions.ts`
- `apps/web/src/features/admin-products/product-media-write.ts`
- `apps/web/src/test/admin-product-media-write.test.ts`
- `apps/web/src/test/test-runtime.setup.ts`

No homepage, public-shell, motion, responsive CSS, RTL, public-media, catalogue-read, or public-route file changed in that delta. The approved redesign therefore has no newly discovered implementation conflict.

The full root `README.md` was re-read. Its source-of-truth hierarchy remains important: the owners' latest explicit decisions outrank older accepted records, plans, tests, and historical notes. Some broad CMS/publishing language in the README predates later owner decisions, but that stale admin scope is unrelated to this frontend-only design and is not revived here.

## 3. Current implementation evidence behind the scale complaint

The present code confirms the client's observation rather than contradicting it.

Current or later-overridden homepage values include:

- desktop homepage hero `min-height: 51rem`;
- desktop hero title around `clamp(3.6rem, 5.2vw, 4.2rem)`;
- global section spacing around `clamp(4.5rem, 9vw, 8rem)`;
- family cards at roughly `26.25rem`, with the fifth at roughly `22.5rem`;
- mobile hero title up to roughly `3.45rem`;
- mobile hero media around `19–23rem` high after current owner-refinement overrides;
- a mobile composition that stacks substantial copy, actions, and a separate full-width visual stage.

The later F7/F8 layers improve polish but preserve much of this spatial scale. The redesign must therefore change composition and density deliberately rather than applying a cosmetic global transform.

## 4. Locked design principles

The following principles are fixed for this phase:

1. **Preserve beauty and motion.** The client likes the current premium motion and visual character.
2. **No global `transform: scale(...)`.** Density comes from real layout, type, spacing, and media rules.
3. **No universal shrink percentage.** Components receive appropriate ranges and ceilings.
4. **Responsive means width + height + available component space.** A short 1366×768 laptop must be denser than a 1920×1080 display even when both use a desktop layout.
5. **Large screens have ceilings.** A 2560×1440 display gains breathing room and more visible content, not giant typography and media.
6. **Body readability and touch usability do not get sacrificed.** Normal body copy remains comfortably readable and interactive controls retain practical ~44 px targets where appropriate.
7. **Homepage first, system later.** Reusable density foundations are created now, but other public pages do not receive a wholesale density rewrite until the homepage has been evaluated.
8. **Shared exceptions are intentional.** Header/footer density, social links, and Arabic typography are shared foundations explicitly included in this first phase.
9. **No backend or production-data work.** This is a frontend design/responsive phase.

## 5. Scope

### 5.1 In scope

#### Global/shared foundation

- reusable responsive-density tokens and rules;
- width- and height-aware density behavior;
- modest shared public-header density refinement;
- footer social-links foundation;
- dedicated Contact-page social treatment;
- Arabic typography refinement while retaining Noto Sans Arabic.

#### Homepage

- exactly four hero slides;
- adaptive image-led carousel composition;
- image-specific copy placement and overlays;
- autoplay, dots, swipe, keyboard, reduced-motion behavior;
- substantially more compact hero sizing;
- new desktop five-family accordion gallery;
- new compact mobile/tablet swipe gallery;
- homepage-specific density tuning;
- preservation of existing Procurement Support, Featured Instruments, Catalogue Access, and Quotation CTA visual identities unless density tuning is required.

#### Verification

- five representative viewports during implementation;
- eleven explicit viewports before completion;
- browser visual review, geometry checks, RTL, reduced motion, keyboard, touch, overflow, and image-loading checks.

### 5.2 Explicitly out of scope

- total public-site redesign;
- immediate density propagation to every public page;
- admin redesign;
- Supabase migration or schema work;
- production DDL/DML;
- Storage deletion or product-media remapping;
- catalogue source-of-truth changes;
- product creation workflow;
- OpenAPI changes;
- `services/api/**` changes;
- motion-system rewrite;
- changing the Arabic font family;
- cloning Imdad;
- cloning React Bits styling;
- random hero-image sourcing;
- paid Cloudflare Images, R2, KV, D1, or other paid image infrastructure;
- unrelated cleanup.

## 6. Responsive-density architecture

### 6.1 Foundation without premature site-wide propagation

The new system should introduce reusable public-density tokens without replacing every legacy global spacing/type token immediately. The homepage opts into the new density foundation first. Other public pages remain visually unchanged except for the explicitly shared header/footer/Arabic refinements.

A suitable structure is a dedicated density layer, either as a focused CSS file or a bounded token group in `tokens.css`, exposing concepts such as:

- compact/standard/large page gutter;
- public header block size;
- display type scale;
- section-title scale;
- body/lead scale;
- section vertical rhythm;
- component/card gap;
- compact viewport multiplier/state;
- editorial media block size;
- homepage family-gallery block size;
- hero continuation reserve.

The implementation plan should preserve clear ownership so later pages can opt into these tokens instead of copying homepage-specific magic numbers.

### 6.2 Typography targets

Typography should become denser mainly by lowering oversized display ceilings, not by reducing ordinary body text.

Recommended homepage operating ranges:

- English hero display: approximately `2.45rem–3.85rem`, with a hard large-screen ceiling near `4rem`;
- small-phone hero display: approximately `2.25rem–2.9rem`;
- section headings: approximately `2rem–2.75rem`;
- normal body copy: approximately `1rem–1.06rem`, never made tiny to create artificial density;
- eyebrow/interface labels may remain compact but must remain readable and high contrast.

These are design ranges rather than a mandate to repeat one `clamp()` everywhere. Each component maps to the shared token appropriate to its role.

### 6.3 Spacing targets

The current `4.5rem–8rem` section rhythm is too generous for the homepage density target. Homepage section spacing should generally operate closer to roughly `3.25rem–5.75rem`, with an additional short-viewport cap that brings vertical rhythm down further on ~720–800 px-tall desktop/laptop displays.

The design must preserve separation between sections. Density should come from controlled rhythm, not from sections visually colliding.

### 6.4 Width and height awareness

The system uses a small number of genuine structural breakpoints plus fluid/clamped values between them. Height-aware rules are required for short laptops and desktop windows.

Preferred tools:

- `clamp()`;
- `min()` / `max()`;
- `svh` / `dvh` where appropriate;
- container queries for component composition when practical;
- `max-height` or equivalent short-viewport media conditions;
- maximum type/media ceilings;
- source-controlled layout tokens.

Avoid dozens of width-only patches.

## 7. Shared header density

The public header is shared and may be tightened modestly in this phase because it directly affects the initial viewport composition.

Target behavior:

- reduce the current ~5rem default visual height toward a roughly `4.25–4.75rem` operating range depending on viewport;
- keep the ROSA brand mark visually clear and undistorted;
- preserve navigation legibility and focus treatment;
- preserve mobile menu behavior;
- preserve current sticky/scrolled premium treatment;
- retain practical interaction targets even if the visual bar becomes shorter.

This is a restrained shared change, not a redesign of public navigation.

## 8. Homepage hero carousel

### 8.1 Core contract

The homepage hero becomes an **exactly four-slide image-led editorial carousel**.

The user will supply all four final images. Random external hero imagery must not be sourced or treated as final content.

Each slide is driven by a bounded model containing at least:

- stable slide ID;
- local/source-controlled image asset;
- desktop focal point;
- mobile focal point;
- physical copy side (`left` or `right`);
- image/tone/overlay treatment;
- eyebrow;
- title;
- supporting copy;
- primary CTA;
- optional secondary CTA;
- localized text values when final Arabic copy exists.

The final slide copy is intentionally **not pre-authored in this specification**. This is not an unresolved design placeholder. It is a locked content workflow: after the four user-supplied images arrive, each image is reviewed for subject, negative space, focal point, crop, contrast, message, and CTA opportunity, and the editorial copy is then written around that image.

The component architecture may be built before final images/copy, but production acceptance cannot pass until the four supplied images have been reviewed and integrated. Development fixtures must not be mistaken for final content.

### 8.2 Image review workflow

For each supplied hero image, explicitly determine:

1. technical resolution/quality;
2. aspect ratio and safe crop envelope;
3. subject location;
4. usable negative space;
5. desktop focal point;
6. mobile focal point;
7. copy side;
8. overlay strength/tone;
9. text contrast;
10. mobile crop;
11. editorial/marketing message supported by the image;
12. CTA opportunity;
13. slide order;
14. whether the image is suitable for a professional medical/procurement homepage.

Unsupported business/manufacturing claims remain prohibited.

### 8.3 Editorial consistency

All four slides share one system:

- same hero geometry family;
- same type hierarchy;
- same CTA components;
- same dot language;
- same motion quality;
- same responsive-density rules;
- same premium Rosa character.

Per-slide variation is limited to content-driven composition: image, focal point, crop, physical copy side, overlay, tone, copy, and CTA content.

Do not create four unrelated layout templates.

### 8.4 Desktop/laptop viewport fit

For normal laptop/desktop viewports, the intended first-screen composition is:

> complete header + complete hero + approximately 8–15% of the next homepage section visible.

The hero should use adaptive viewport fitting. A conceptual target is equivalent to reserving roughly 8–15 `svh` for continuation after accounting for the header, with sensible min/max hero block-size limits.

A practical geometry range is:

- short laptop (1280×720 / 1366×768): aggressively compact hero;
- 1440×900 / 1536×864: balanced hero;
- 1920×1080: more breathing room but still shows continuation;
- 2560×1440: stop increasing hero dimensions after a sensible maximum (roughly low-to-mid-50rem range) and allow more of the next section to become visible rather than enlarging the hero indefinitely.

Content safety overrides the continuation target: at 200% text scaling or unusually long localized content, the hero may grow enough to avoid clipping. The page must never crop or hide essential copy merely to satisfy the 8–15% geometry target.

### 8.5 Mobile hero composition

Mobile is not a squeezed desktop hero and must not preserve the current long sequence of large copy followed by a separate 19–23rem media block.

The mobile hero should use one compact integrated image-led stage in which copy, CTA, gradient/overlay, and image share the same composition. The image remains meaningfully visible rather than becoming a decorative sliver.

Mobile requirements:

- smaller display-type ceiling;
- image-specific mobile focal point;
- appropriate overlay for copy contrast;
- copy width controlled for 360–430 px screens;
- primary CTA visible without excessive scrolling;
- secondary CTA only when the slide genuinely requires it;
- compact hero block, generally able to communicate message + CTA + meaningful image content within roughly one initial viewport together with the header;
- safe-area/browser-chrome resilience;
- no tiny touch targets.

The desktop 8–15% next-section rule is not a rigid mobile rule. A small continuation hint is desirable when content allows it, but clarity and touch comfort take priority.

### 8.6 Autoplay

Use a single tunable constant at **4.75 seconds** per slide, which sits in the approved 4.5–5 second range.

Autoplay behavior:

- starts only when reduced motion is not requested;
- pauses while the carousel or its controls contain keyboard focus;
- pauses on pointer hover where hover exists;
- pauses during drag/swipe interaction;
- pauses when the document/tab is hidden;
- manual dot selection resets the timing window;
- no transition may replace a slide before its selected image is ready to display.

Dots are the only persistent navigation controls. There are no permanent previous/next arrows. The interaction-based pause behavior is the pause mechanism for this phase; no separate prominent pause button is introduced unless accessibility verification proves the interaction contract insufficient.

### 8.7 Dots and keyboard behavior

Carousel dots must be real controls, not decorative spans.

Requirements:

- four dots, one per slide;
- active state exposed programmatically (`aria-current` or equivalent);
- each dot has an accessible label such as “Show slide 2 of 4”;
- keyboard users can Tab to the dot control group and activate a slide with Enter/Space;
- Left/Right arrow behavior inside the dot group is supported when implemented as a roving/tablist-style control;
- focus is always visible;
- slide position is exposed to assistive technology without announcing every autoplay transition in an intrusive live region.

### 8.8 Touch/swipe

On touch/coarse-pointer devices, the hero supports restrained horizontal drag/swipe. Swipe changes one slide at a time and snaps cleanly. Accidental vertical-page scrolling should not be blocked by an over-aggressive gesture handler.

### 8.9 Transition character

Use the existing Motion system rather than adding a generic slider dependency. Preferred transition language is a restrained editorial crossfade with minimal image drift/scale and coordinated copy reveal. It should feel like an extension of F7 motion, not a Swiper/Bootstrap carousel.

The implementation should not add React Bits, Swiper, or another carousel package merely to switch four images.

### 8.10 Reduced motion

Under `prefers-reduced-motion: reduce`:

- autoplay is disabled;
- slide changes are immediate or effectively static;
- no parallax, blur choreography, drag spring, scale flourish, or stagger delay is required;
- current slide content is fully visible immediately;
- dots remain usable for manual slide selection.

This extends the current `MotionConfig reducedMotion="user"` and CSS reduced-motion policy rather than replacing it.

## 9. Hero image delivery and performance

The site deploys through OpenNext/Cloudflare with `images.unoptimized: true`. No paid Cloudflare Images service is introduced.

Hero-image delivery must therefore follow the existing offline/source-controlled optimization strategy.

For each final supplied image:

- preserve a source/provenance copy as appropriate;
- prepare right-sized local web derivatives before deployment;
- use WebP/AVIF where visually safe and supported by the existing static-asset workflow;
- prepare at least an appropriate mobile and desktop delivery size when a single source would waste substantial bandwidth;
- preserve detail and professional image quality;
- keep versioned/static cache-friendly paths.

Practical byte targets are approximately:

- first desktop hero asset: ideally ~250–350 KB or less;
- mobile hero derivative: ideally ~120–220 KB or less;

These are quality-aware targets, not permission to damage surgical/medical detail merely to hit a number.

Loading policy:

1. first slide image is the only slide aggressively prioritized/eagerly loaded;
2. the next slide is prefetched/preloaded after the initial critical render rather than loading all four at highest priority;
3. remaining slides are loaded progressively;
4. manual selection of an unloaded slide keeps the current slide visible until the requested image is decoded/ready, preventing blank flashes;
5. transitions never trigger Supabase calls or server refetches.

## 10. Homepage family discovery redesign

### 10.1 Copy direction

Replace the current technical wording direction:

- “Product families”
- “Browse by instrument family.”

with the approved simpler product-led direction:

- **Eyebrow:** “Our products”
- **Title:** “Explore the ROSA instrument collection.”

Supporting copy may be concise or omitted during visual refinement, but must stay simple, product-led, and free from unsupported manufacturing claims.

### 10.2 Desktop/fine-pointer accordion gallery

The current asymmetric five-card collage is replaced on sufficiently wide fine-pointer layouts by a single horizontal five-panel gallery inspired by the interaction idea at:

https://reactbits.dev/components/accordion-gallery

React Bits is a behavior reference, not a visual theme and not a required runtime dependency. The preferred implementation recreates the interaction locally with existing React, CSS, and Motion primitives.

All five family panels remain visible simultaneously:

1. Knives
2. Scissors
3. Punches
4. Chisels
5. Cutters

The deterministic initial active panel is **Knives**, matching source order and SSR output. Hover or keyboard focus makes another panel active. Clicking/tapping the family link navigates to the existing family route.

Panel content is intentionally minimal:

- family image;
- family name.

Do not reveal counts, descriptive paragraphs, metadata lists, or multiple CTAs inside the expanded state.

Interaction geometry:

- active panel expands smoothly;
- inactive panels compress but remain visibly identifiable;
- all five stay inside the same horizontal composition;
- panel labels remain readable in both states;
- the gallery height is height-aware and capped so it does not recreate the oversized-card problem.

A reasonable operating block size is roughly 19–26rem, contracted on short desktop viewports.

The home-only accordion should replace the old `TiltSurface` emphasis because animated width plus tilt would compete visually. Other family-card usages outside the homepage remain unchanged.

### 10.3 Structural switch: accordion vs swipe rail

This is a component-composition decision, not simply “desktop versus mobile.”

Use the accordion only when:

- the family-gallery container has approximately **56rem or more usable width**; and
- a fine pointer / hover-capable interaction model is available.

Otherwise use the swipe rail.

Expected matrix behavior:

- 768×1024: swipe rail;
- 1024×768: accordion when normal page gutters still leave sufficient gallery width;
- coarse-pointer devices: swipe rail even if physically wide.

This prevents awkward accordion behavior on touch tablets and narrow landscape layouts.

### 10.4 Keyboard behavior

Each family panel remains a normal navigable link. Keyboard focus activates/expands the focused panel, focus remains visibly outlined, and Enter activates the family route. No pointer-only information exists.

### 10.5 Reduced motion

Reduced-motion users receive the same five-panel information and active-state logic without animated width choreography. Active changes occur immediately.

## 11. Mobile/tablet family swipe gallery

On small/narrow/coarse-pointer layouts, do **not** stack five giant cards vertically.

Use a native horizontal scroll/snap rail:

- one dominant card mostly visible;
- a clear sliver of the next card visible;
- card width approximately 82–86% of available content width;
- compact vertical height around 14–18rem depending on viewport;
- `scroll-snap` for stable resting positions;
- touch-native horizontal movement;
- vertical page scrolling remains natural;
- image + family name only;
- no required JavaScript carousel library;
- route links remain normal links.

The next-card sliver is the primary affordance. Do not add a second set of large pagination controls that makes the section busy.

## 12. Catalogue section preservation

The homepage `CatalogueAccess` section remains visually distinct from the new family gallery.

Hard requirement:

> The catalogue section keeps its current stacked/collage/card identity.

It may inherit modest density-token improvements to spacing and card dimensions, but it must not become another accordion or swipe-gallery clone.

The redesign should increase visual variety: interactive linear family discovery followed later by the existing technical-catalogue composition.

## 13. Other homepage sections

The existing section order remains:

1. Home hero
2. Family discovery
3. Procurement Support
4. Featured Instruments
5. Catalogue Access
6. Quotation CTA

Procurement Support, Featured Instruments, Catalogue Access, and Quotation CTA retain their current design/motion language. They may receive homepage-scoped density adjustments such as:

- reduced vertical section padding;
- shorter media/card blocks where currently excessive;
- tighter heading margins;
- smaller display ceilings;
- more compact short-viewport behavior.

Do not use this phase as permission to redesign those sections.

## 14. Social links

### 14.1 Platforms

The shared social set is exactly:

- Instagram
- Facebook
- LinkedIn
- X / Twitter

### 14.2 Central registry

All social destinations are defined once in a source-controlled shared registry. No component duplicates URLs.

Initial safe placeholder destinations are the platform root pages:

- Instagram → `https://www.instagram.com/`
- Facebook → `https://www.facebook.com/`
- LinkedIn → `https://www.linkedin.com/`
- X → `https://x.com/`

These are deliberately not fabricated Rosa profile URLs or handles. Replacing them later with real client profiles should require editing one registry only.

Each entry carries at least platform key, English label, Arabic label, URL, and external-link metadata.

### 14.3 Footer treatment

Socials appear in the footer on every public page. To avoid visual noise, they belong in the existing brand/footer identity area as a compact social row/group rather than creating a heavy new fifth navigation column.

External links:

- open in a new tab;
- use appropriate `rel="noopener noreferrer"` protection;
- have clear accessible names;
- never use `href="#"`.

### 14.4 Contact-page treatment

The Contact page receives a dedicated, explicit social group in addition to the footer presence. It should be visually integrated with business contact information/end-of-page content without pretending that social links are product-quotation channels.

The current generic `CONTACT_INFORMATION` row that fabricates one `@rosamedicalexample` social profile should no longer be rendered once the dedicated shared social group is introduced. This avoids duplicate/conflicting social truth and removes a fabricated handle from the presentation.

## 15. Arabic typography

### 15.1 Font decision

Keep the existing `Noto_Sans_Arabic` integration and `--font-arabic` variable. Do not substitute another Arabic typeface in this phase.

The Imdad Arabic site is a density/character reference only; this project does not claim Noto Sans Arabic is Imdad's exact font.

### 15.2 Typography refinement

RTL content should receive dedicated Arabic type tuning rather than inheriting Latin editorial dimensions mechanically.

Direction:

- headings: Noto Sans Arabic, generally weight 600;
- labels/eyebrows: approximately weight 700;
- body: weight 400–500;
- heading line-height: roughly 1.25–1.4 depending size;
- body line-height: roughly 1.6–1.75;
- body text remains comfortably readable;
- Arabic display-size ceilings are tuned independently to prevent tall glyph boxes from recreating the oversized feel;
- paragraph width and line wrapping are reviewed at all final viewports;
- mixed LTR content (codes, email, phone) remains explicitly LTR where appropriate.

### 15.3 Image-led hero in RTL

Hero `copySide` is a **physical image-composition property** selected from the photograph's negative space. It is not automatically mirrored merely because the locale is Arabic. Arabic text direction/alignment is RTL inside the chosen copy region.

This prevents RTL mirroring from moving text onto the subject of an image. If a supplied image genuinely needs a different Arabic crop/side, that is captured as explicit slide metadata during image review rather than inferred globally.

## 16. Motion preservation

The existing motion system remains authoritative:

- `MotionProvider` with `reducedMotion="user"`;
- Reveal;
- TextReveal;
- stagger primitives;
- route transitions;
- magnetic interaction;
- tilt/spotlight/premium surfaces;
- existing easing/duration tokens;
- CSS reduced-motion fallbacks.

The redesign adapts motion only where the old interaction physically conflicts with new composition:

- old static-hero choreography becomes carousel choreography;
- home family-card tilt is replaced by accordion expansion on desktop;
- mobile family interaction becomes native swipe/snap;
- other existing premium motion remains.

Do not add gratuitous animation or rewrite the F7 motion foundation.

## 17. Data and backend boundaries

The homepage continues to perform its existing bounded live catalogue read for featured products. The carousel, family gallery, socials, and responsive-density system do not create new backend dependencies.

Required preservation:

- no public Supabase auth round trip reintroduced;
- no transition-triggered Supabase read;
- no full-catalogue hydration added to the homepage;
- `getFeaturedCatalogueProducts()` remains bounded;
- family presentation/media remains source-controlled;
- product media relationships remain untouched;
- inquiry snapshots and quotation behavior remain unchanged;
- no production database writes;
- no database schema changes;
- no Storage mutation/deletion;
- no OpenAPI changes;
- no `services/api/**` changes.

## 18. Component boundaries

The implementation plan should preserve small, testable units. Recommended boundaries are:

### Responsive density

A reusable density-token/style layer consumed first by homepage/shared shell.

### Hero carousel

A focused client component responsible only for:

- active slide state;
- timing/pause state;
- dots;
- swipe/keyboard interaction;
- transition state;
- progressive image loading.

Slide content/data stays outside the interaction component.

### Family gallery

A focused home-only component with:

- shared family data;
- accordion presentation for wide/fine-pointer environments;
- native swipe rail for narrow/coarse-pointer environments.

It does not replace the generic family cards used on the Products page unless a later rollout explicitly chooses to do so.

### Social links

One central registry plus one reusable rendering component consumed by PublicShell/footer and Contact.

### Arabic density

Shared RTL typography rules layered onto the existing Noto Sans Arabic setup.

## 19. Accessibility contract

The phase must preserve or improve accessibility.

Requirements:

- semantic hero region/heading structure;
- four accessible dot buttons;
- visible keyboard focus;
- keyboard-operable manual slide selection;
- autoplay pause on focus/interaction;
- reduced-motion disables autoplay and nonessential choreography;
- family panels remain standard links;
- native swipe rail remains keyboard/scroll accessible;
- no hover-only information;
- practical ~44 px interactive targets where appropriate;
- no text/image clipping at 200% text scaling where practical;
- correct RTL direction and LTR islands;
- external social links have meaningful names and safe target/rel behavior;
- no horizontal page overflow.

## 20. Development viewport matrix

Normal implementation iterations use only these five representative sizes:

1. **360×800** — small phone
2. **390×844** — normal phone
3. **768×1024** — tablet portrait
4. **1366×768** — short/common laptop
5. **1920×1080** — normal large desktop

These five are the fast loop. Do not run the full acceptance matrix after every small CSS adjustment.

## 21. Final responsive acceptance matrix

Before this phase can be called complete, explicitly review all eleven:

- 360×800
- 390×844
- 430×932
- 768×1024
- 1024×768
- 1280×720
- 1366×768
- 1440×900
- 1536×864
- 1920×1080
- 2560×1440

Each size requires actual browser/screenshot review, not merely a successful HTTP response.

## 22. Acceptance checks per viewport

Review at minimum:

### Initial composition

- header density;
- hero height;
- hero message visibility;
- hero CTA fit;
- desktop/laptop 8–15% next-section continuation where applicable;
- no giant blank or oversized first-screen feeling.

### Typography

- heading wrapping;
- paragraph wrapping;
- no clipped text;
- sensible line lengths;
- no accidental giant display type;
- Arabic heading/body rhythm;
- RTL wrapping and mixed-direction values.

### Hero media and carousel

- focal point/crop;
- image quality;
- overlay/contrast;
- copy-side suitability;
- dot placement;
- autoplay timing;
- pause behavior;
- manual selection;
- swipe behavior;
- no blank frame during image load;
- reduced motion.

### Family gallery

- all five desktop panels visible when accordion mode applies;
- active/inactive proportions;
- readable family names in compressed state;
- focus behavior;
- mobile/tablet dominant card + next-card sliver;
- native swipe/snap;
- compact vertical footprint.

### Remaining homepage

- Procurement Support density;
- Featured Instruments density;
- Catalogue section still retains its distinct current composition;
- Quotation CTA remains premium;
- section-to-section rhythm feels deliberate.

### Shared shell

- footer density;
- social link placement;
- Contact social treatment;
- mobile menu and touch targets;
- no horizontal overflow.

### Resilience

- no unexpected layout shift;
- safe mobile browser chrome/safe-area behavior;
- 200% text scaling robustness where practical;
- keyboard navigation/focus;
- coarse pointer behavior;
- image loading behavior.

## 23. Test strategy

Implementation follows test-first behavior changes where applicable.

### 23.1 Unit/component tests

Cover:

- exactly four hero slide records;
- active-slide state transitions;
- 4.75-second timer constant;
- autoplay pause/resume rules;
- manual dot selection;
- reduced-motion no-autoplay behavior;
- accessible dot labels/current state;
- max two CTAs per slide model;
- family gallery contains exactly five fixed family routes;
- desktop active family changes on focus/hover logic;
- mobile rail renders same five families with minimal content;
- social registry contains exactly four platforms and no `#` URLs;
- footer and Contact consume the same social registry;
- Noto Sans Arabic remains the configured Arabic font.

### 23.2 Browser behavior tests

Extend the existing F7 homepage/responsive Playwright coverage rather than replacing it.

Browser tests should verify:

- no horizontal overflow;
- homepage keeps all six sections;
- hero dots select slides;
- autoplay advances only when permitted;
- focus/hover/hidden-document/reduced-motion pause behavior;
- touch swipe changes slide without blocking vertical scrolling;
- short laptop hero geometry;
- next-section continuation target on normal desktop/laptop sizes;
- family accordion keeps all five panels visible and focusable;
- 768×1024 uses swipe rail;
- 1024×768 uses accordion when container width is sufficient;
- coarse pointer uses swipe mode;
- catalogue section is still present and visually separate;
- footer socials on public pages;
- Contact dedicated socials;
- Arabic homepage/hero/footer rendering;
- reduced motion produces settled/static styles.

### 23.3 Visual evidence

For the five development viewports, capture focused screenshots at meaningful checkpoints.

For final acceptance, capture/review the eleven-size matrix with at least:

- initial viewport/hero;
- family discovery section;
- one full-page or stitched homepage review where practical;
- Arabic/RTL representative screenshots;
- reduced-motion representative screenshot/state.

Do not declare visual completion from DOM assertions alone.

### 23.4 Performance regression checks

Verify:

- no public `/auth/v1/user` request reintroduced;
- no new full-catalogue homepage request;
- first hero image is the only aggressively prioritized slide;
- other hero images load progressively;
- non-product media remains local/source-controlled;
- social/family/hero interactions do not fetch Supabase;
- static image byte/dimension audit includes all four final hero assets;
- no paid runtime image service is added.

## 24. Implementation rollout after written-spec approval

The implementation plan must divide work into bounded stages:

1. responsive-density foundation and regression tests;
2. shared header density and homepage base geometry;
3. hero-carousel behavior using deterministic development data;
4. user-supplied hero image review, offline derivatives, final per-image copy/composition;
5. desktop family accordion;
6. mobile/tablet family swipe rail;
7. remaining homepage density tuning while preserving section identities;
8. shared social registry + footer + Contact treatment;
9. Noto Sans Arabic typography refinement;
10. focused five-viewport development review;
11. complete test/build/accessibility/performance verification;
12. final eleven-viewport screenshot/visual acceptance.

After this phase passes, stop and evaluate the density system before creating a separate follow-up spec/plan to propagate it to Products, family listing, product detail, About, Contact, Procurement Support, Search, inquiry/quotation, and other public pages.

## 25. Success definition

The phase succeeds when the homepage still feels unmistakably like the current Rosa site—cinematic, premium, editorial, animated, medical/procurement focused—but no longer looks as though it was designed at 125% zoom.

A successful short laptop view shows the complete hero comfortably and a visible continuation of the page. A successful phone view communicates the core slide message, CTA, and meaningful image content without forcing a long scroll through oversized hero/family blocks. A successful large desktop feels spacious and premium while respecting typography/media ceilings and exposing more of the page instead of scaling everything upward.

The user should perceive **better proportion and information density**, not “everything was made smaller.”

## 26. Design gate

This document records the already-approved verbal design in written repository form. No implementation begins from this specification until the user reviews and approves this written spec. After written approval, the next workflow is Superpowers `writing-plans`, producing the detailed implementation plan before any production code is changed.
