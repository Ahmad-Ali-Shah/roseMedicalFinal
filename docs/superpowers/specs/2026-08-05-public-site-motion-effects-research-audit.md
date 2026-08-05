# Rosa Medical Public-Site Motion and Effects Research Audit

**Date:** 2026-08-05

**Status:** Research complete; awaiting user review; no implementation authorized by this document

**Authoritative product branch:** `integration/main-premium-polish-reconciliation`, including PR #20

**Audited homepage follow-up:** `4e67fc1` against its parent `a51b9a1`

**Scope:** Public shell and public routes only
**Direction:** Editorial luxury with selective cinematic moments, sharpened into surgical precision

This audit supersedes `2026-08-05-public-site-signature-motion-design.md` wherever the two documents conflict. In particular, it rejects the earlier idea of extending structural rails, indices, crop marks, technical captions, or similar decorative motifs across the site. The clarified objective is to preserve the current design and enhance what is already there through motion, hover, focus, press, state, and transition behavior.

## 1. Executive conclusion

Rosa does not need a new animation library, a new visual language, or a redesign. PR #20 already established a capable and unusually complete motion foundation: shared timing tokens, accessible entrance primitives, text reveals, local magnetic and tilt behavior, media framing, a responsive animated mobile menu, header state changes, route transitions, button feedback, link underlines, card/media hover states, inquiry list transitions, and quotation state motion.

The strongest course is therefore **effects-only refinement**:

1. Correct the homepage follow-up by retaining its responsive hero fix and useful interaction behavior while removing its structural decoration.
2. Tune the existing shared primitives so their blur, displacement, shadow, and frequency feel calmer and more consistent.
3. Complete missing interaction states on navigation, catalogue actions, media, forms, inquiry controls, search shortcuts, and footer links.
4. Reserve one slightly richer moment for the homepage hero and one for high-value product/catalogue media. Everything else remains quiet.
5. Add no runtime dependency. Adapt concepts from researched examples with the existing `motion/react` package and CSS.

The result should feel expensive because every response is precise, not because everything moves.

### Selected approach

**A. Effects-only refinement — selected.** Preserve markup, layout, typography, color, content, route behavior, and current component ownership. Refine existing motion and add small missing states.

**B. Library-led component adoption — rejected.** Direct React Bits, Magic UI, Cult UI, Aceternity, or 21st.dev components would add visual dialects and, in several cases, GSAP, Matter.js, OGL, Three.js, rough-notation, Radix, or MapLibre. Many duplicate Rosa primitives.

**C. Cleanup only — insufficient.** Removing the homepage decoration without completing inconsistent hover, focus, form, and state feedback would solve the redesign problem but leave the site short of the requested polish.

## 2. Non-negotiable design and behavior boundaries

- Do not alter the information architecture, route inventory, section order, product taxonomy, wording, typography, palette, content density, or responsive intent.
- Do not add fabricated claims, addresses, certifications, locations, catalogue availability, pricing, stock, or delivery information.
- Do not make essential content depend on animation or hydration. The existing primitives intentionally keep opacity at `1` before reveal; retain that resilience.
- Do not introduce autoplay carousels, permanent decorative loops, global cursor effects, pointer trails, splash simulations, physics, WebGL, or scroll hijacking.
- Prefer `transform` and `opacity`; treat animated blur and shadow as small, infrequent accents because they require paint work.
- Hover behavior must have a corresponding keyboard focus state where the element is actionable.
- Pointer-reactive tilt, magnetic movement, spotlight, and glare must be disabled for coarse pointers and reduced motion.
- Reduced motion must remove travel, parallax, tilt, magnetic displacement, blur reveals, and stagger delays. State changes remain immediate or crossfade only.
- Mobile is not a compressed desktop animation. Use shorter travel, fewer simultaneous items, no magnetic/tilt behavior, and no hover-dependent meaning.
- No direct dependency adoption is approved by this audit.

## 3. Audit method and current system

The review covered the public route dispatcher, shell, homepage sections, product overview, family listing, product detail, catalogues, procurement, about, contact, inquiry, quotation, search, legal templates, shared UI primitives, all motion primitives, premium/product/story/conversion/reduced-motion styles, and public motion/responsive tests.

### Existing motion foundation

| System | Current behavior | Assessment | Decision |
|---|---|---|---|
| Motion tokens | Micro `160ms`, component `280ms`, section `580ms`, hero `960ms`; premium ease curves | Coherent and reusable | Keep; avoid using hero duration for ordinary content |
| `MotionProvider` | Respects the user's reduced-motion setting | Correct base policy | Keep |
| `Reveal` | In-view once; 24px directional movement plus 4px blur; opacity never hides content | Robust but slightly strong when repeated | Keep; usually tune to 12–18px and 2–3px blur |
| `Stagger` | In-view once; 12px/3px child reveal; default 70ms interval | Good for short groups | Keep; cap perceptible sequence to roughly 4–6 items |
| `TextReveal` | Clipped word/line movement with blur; accessible aggregate label | Strongest existing signature | Keep for major headings only; never every heading |
| `Magnetic` | Local mouse tracking, spring response, reduced-motion guard | Already more restrained than common library versions | Keep for rare primary CTA use only |
| `TiltSurface` | Local pointer tilt, springs, reduced-motion guard | Suitable at low angles | Keep at 1–1.8 degrees on selected media/cards only |
| `SpotlightSurface` | Local CSS-variable spotlight with reduced-motion guard | Existing answer to Aceternity-style spotlight | Keep on at most one hero or feature surface per viewport |
| `MediaFrame` | Framing, overlays, optional progressive blur | Matches editorial photography | Keep; add only subtle image scale/overlay response |
| Route transition | 8px/2px blur entrance over 280ms | Quiet and functional | Keep; do not add exit delays or full-page wipes |
| Scroll header | Passive scroll listener scheduled through local `requestAnimationFrame` | Appropriate and not a permanent animation loop | Keep; slightly reduce shadow if it reads heavy |
| Mobile navigation | Backdrop fade, horizontal panel, staggered links, Escape/body-lock/focus return | Accessible and complete | Keep structure; polish active/focus states only |
| Buttons/links | Color transition, 1px label lift, press scale, directional underline | Correct foundation | Keep; standardize all raw anchors/buttons onto it |
| Inquiry/quotation | Layout transitions, add/remove, quantity updates, submit label, error/success entrance | Appropriate state-driven motion | Keep; normalize easing and reduced-motion behavior |

### Current-site audit by route

| Route | Existing strengths | Genuine gaps | Restraint risk |
|---|---|---|---|
| `/` | Hero choreography, section reveals, staggered cards, image/card/button behavior | Later decorative layer competes with original design; hover weights are uneven | High if every section receives a signature effect |
| `/products` | Text hero, family/product stagger, tilted cards, procurement CTA | Search/family pathways need clearer focus and action feedback | Medium |
| `/products/:family` | Hero reveal, editorial media, staggered product grid | Product-card hover should move image, metadata, and arrow as one restrained system | Medium on large grids |
| `/products/:family/:product` | Opposing reveals, gallery tilt, related-product stagger, add-to-inquiry state | Gallery affordance, selection/focus, sticky mobile CTA feedback can be more precise | Medium |
| `/catalogues` | TextReveal, staggered document cards, low tilt, document actions | Available/unavailable actions and cover hover need more unified feedback | Medium |
| `/procurement-support` | Hero, numbered lists, checklist stagger, CTA reveals | Numbered rows can use a small line/number response; avoid reanimating the whole process | Low |
| `/about` | Hero, framed media, timeline stagger, supported-buyers sequence | Editorial media and selected list rows need subtle hover/focus depth | Low |
| `/contact` | Hero, form/panel reveals, verified placeholder language | Field states and async feedback are visually abrupt; location must remain an honest placeholder | Medium |
| `/inquiry` | Layout animation, item removal, quantities, live outputs | Destructive control feedback and summary emphasis need consistent focus/press treatment | Low |
| `/request-quotation` | Fieldset entrances, error presence, submit label, success mark | Fieldset motion is repetitive; validation/focus/error transitions need consistency | Medium |
| `/search` | Clear static fallback and family shortcuts | It has no shared entrance/stagger and its read-only input can feel accidentally disabled | Low |
| `/privacy`, `/terms` | Quiet section reveals appropriate to reading | Sticky section links need active/focus behavior, not more content animation | Low |
| Header/footer | Scroll state, desktop nav underline, mobile panel motion | Current-route cue and footer link feedback should match; quote CTA can carry one restrained arrow cue | Medium if nav becomes pill-shaped |

## 4. Homepage commit `4e67fc1` correction audit

The homepage follow-up combined two different kinds of work: a valuable mobile layout correction and a new layer of structural visual decoration. These must not be treated as one revert.

### Keep

| Change | Why it stays |
|---|---|
| Mobile hero changed from a fixed-height/absolute overlay to an in-flow grid | Prevents overlap, clipping, and content collisions while preserving the composition |
| Real mobile gutters, adjusted title/copy spacing and line height | Responsive correction, not redesign |
| Hero media placed below copy on narrow screens | Makes content order legible and robust |
| Narrow-screen reveal transform suppression where needed | Prevents edge clipping and unnecessary mobile travel |
| Existing hero text choreography | It is a motion effect directly aligned with the clarified request |
| Existing instrument/media hover, after intensity tuning | It adds quiet material response without changing structure |
| Mobile non-overlap and gutter tests | Protects the valuable part of the follow-up |

### Simplify

| Change | Correction |
|---|---|
| Strong card shadows and hover shadows | Use border/tonal shift plus 1–2px lift; soften or remove broad shadow blooms |
| Catalogue top-right line expansion | Retain only if it acts as an action cue; shorten travel and pair with arrow/label motion |
| Section radial washes | Return sections to established tones or reduce until imperceptible at rest |
| Hero media hover | Limit to roughly `scale(1.01–1.015)` or a 1–2px detail shift; no dramatic zoom |

### Remove

| Change | Reason |
|---|---|
| Visible section indices `02–06` and their rails | New page furniture rather than interaction enhancement |
| `data-home-index` hooks when no longer needed | Implementation residue of the removed decoration |
| Hero technical caption (`01 / Rosa Instruments`, `Precision steel study`) | New editorial content and composition, not motion |
| Inner crop frame and crosshair gradients | Technical-decoration overlay that changes the established design language |
| Red crop mark and orbit crosshairs | Decorative motif with no interaction or information purpose |
| Procurement crosshair/circle construction | Same issue; it makes the card a new illustration rather than enhancing the existing one |
| CTA grid/registration background | Adds visual noise behind an already strong CTA |

### Neutral / repository-only

- Superdesign metadata, workspace files, notes, and documentation do not affect the customer experience. Keep or remove according to repository policy, not visual preference.
- Tests that assert decorative indices/captions should be replaced by behavioral assertions, while responsive regression tests remain.

## 5. Research findings and adaptation decisions

The research treated component galleries as inspiration, not as quality guarantees. Each candidate was checked for behavior, dependency cost, interaction model, accessibility implications, and fit with Rosa's medical-procurement tone.

### Serious candidates

| Source / effect | Behavior and possible Rosa placement | Dependency / performance | Decision and simpler alternative | Mobile / reduced motion |
|---|---|---|---|---|
| [React Bits Masked Heading](https://reactbits.dev/text-animations/masked-heading) | Moving texture clipped through glyphs; considered only for the homepage H1 | GSAP; visually and paint intensive | Reject direct use; Rosa's existing clipped word reveal provides hierarchy without texture | Never use texture on mobile; plain static heading under reduced motion |
| [React Bits Split Text](https://reactbits.dev/text-animations/split-text) | Character/word stagger; considered for major route titles | GSAP + React integration; many animated nodes | Reject direct use; retain accessible word-level `TextReveal` on H1s only | Shorter/no stagger on mobile; coherent static text under reduced motion |
| [React Bits Scroll Reveal](https://reactbits.dev/text-animations/scroll-reveal) / [Scroll Float](https://reactbits.dev/text-animations/scroll-float) | Scroll-linked text unblur/parallax; considered for about storytelling | GSAP and continuous scroll-linked updates | Reject; use one-shot IntersectionObserver entrances | No continuous mobile scroll work; static under reduced motion |
| [React Bits Animated Content](https://reactbits.dev/animations/animated-content) | Generic mount/in-view wrapper; could apply to sections | GSAP and duplicate abstraction | Reject duplicate; tune Rosa `Reveal` | Existing mobile distance rules; static under reduced motion |
| [React Bits Animated List](https://reactbits.dev/components/animated-list) | Sequential list entrance/state; relevant to grids, timelines, inquiry | Motion; moderate DOM orchestration | Adapt concept through existing `Stagger` and `AnimatePresence` | Cap/disable sequence on mobile and reduced motion |
| [React Bits Falling Text](https://reactbits.dev/text-animations/falling-text) | Gravity/bounce text fragments | Matter.js physics and continuous simulation | Reject; no Rosa placement serves a business purpose | Never enable |
| [React Bits Pixel Transition](https://reactbits.dev/animations/pixel-transition) | Pixel dissolve between card/media states | GSAP; many animated pixel elements | Reject; use a small image crossfade or scale | Never enable; static media fallback |
| [React Bits Depth Carousel](https://reactbits.dev/components/depth-carousel) | 3D draggable/keyboard carousel; considered for product imagery | GSAP plus control/state/3D layer cost | Reject; retain inspectable gallery/grid and use crossfade for selected image | Stable swipe/selection UI if ever needed; immediate swap under reduced motion |
| [React Bits Circular Gallery](https://reactbits.dev/components/circular-gallery) | WebGL orbit gallery | OGL/GPU/runtime cost | Reject; product comparison needs stable geometry | Never enable |
| [React Bits Pill Nav](https://reactbits.dev/components/pill-nav) | Sliding active pill | GSAP + routing assumptions | Adapt only current-route movement as Rosa hairline/underline; keep existing header geometry | Resting active marker on touch; instant marker under reduced motion |
| [React Bits Card Nav](https://reactbits.dev/components/card-nav) | Navigation expands into card panels | GSAP + icons; substantial DOM/layout change | Reject; current desktop/mobile navigation already fits the site | Existing mobile panel remains authoritative |
| [Magic UI Word Rotate](https://magicui.design/docs/components/word-rotate) | Timed phrase replacement; considered for hero copy | Motion plus recurring interval | Reject; stable content is more trustworthy and simpler | Never autoplay; static wording |
| [Magic UI Highlighter](https://magicui.design/docs/components/highlighter) | Hand-drawn marker annotation | `rough-notation`; additional rendering | Reject; use Rosa signal-red hairline or type color if emphasis is needed | Static emphasis only |
| [Magic UI Text 3D Flip](https://magicui.design/docs/components/text-3d-flip) | Per-letter 3D hover flip; considered for nav or hero | Motion, many layers, legibility/focus risk | Reject; use underline/word reveal | Never on touch; static under reduced motion |
| [Magic UI Blur Fade](https://magicui.design/docs/components/blur-fade) | Blur/translate entrance for content/media | Motion; duplicates existing primitive | Reject duplicate; reduce Rosa `Reveal` blur instead | No blur on mobile/reduced motion |
| [Magic UI Interactive Hover Button](https://magicui.design/docs/components/interactive-hover-button) / [21st.dev variant](https://21st.dev/community/components/dillionverma/interactive-hover-button/default) | Expanding fill plus label/arrow motion; relevant to primary CTAs | CSS/Motion variants; some examples add icon dependency | Adapt label/arrow by 2–4px inside Rosa's rectangular button; reject giant dot/pill | Press/color feedback on touch; instant state under reduced motion |
| [Magic UI Glare Hover](https://magicui.design/docs/components/glare-hover) | Diagonal pseudo-element highlight; possible on one featured catalogue cover | CSS-only but paint work across the surface | Optional and restricted; simpler alternative is border/overlay shift | Disable for coarse pointer and reduced motion |
| [Magic UI Border Beam](https://magicui.design/docs/components/border-beam) | Infinite traveling border | Motion loop and permanent paint work | Reject; use static hairline plus event-driven border color | Never enable |
| [Magic UI Ripple Button](https://magicui.design/docs/components/ripple-button) | Click-origin ripple | CSS plus per-click state | Reject as playful/material; current press compression is sufficient | Press compression only; instant under reduced motion |
| [Cult UI Text Animate](https://www.cult-ui.com/docs/components/text-animate) | Multiple roll/whip/fade/pop/shift modes | Motion; risk of inconsistent page-specific grammar | Reject component; use Rosa's calm word or container entrance | One shorter mobile entrance; static under reduced motion |
| [Cult UI Neumorph Button](https://www.cult-ui.com/docs/components/neumorph-button) | Soft 3D hover/active/loading | CSS/component; heavy shadow painting and visual mismatch | Reject style; retain explicit press and stable loading label | Press only on touch; color/state change under reduced motion |
| [Aceternity Card Spotlight](https://ui.aceternity.com/components/card-spotlight) | Pointer-following radial light; possible on hero/card | Motion and local pointer updates | Reject duplicate; Rosa already owns `SpotlightSurface` | Disable on coarse pointer/reduced motion |
| [Aceternity Moving Border](https://ui.aceternity.com/components/moving-border) | Continuous animated outline | Motion loop and persistent paint | Reject; use event-driven border change | Never enable |
| [Aceternity Spotlight](https://ui.aceternity.com/components/spotlight) | Large animated hero illumination | CSS entrance/paint work | Reject direct use; existing hero lighting is sufficient | Static background on mobile/reduced motion |
| [Motion Primitives Magnetic](https://motion-primitives.com/docs/magnetic) | Pointer attraction for CTA/control | Existing Motion dependency; local pointer work | Keep Rosa's substantially weaker implementation for at most one desktop CTA | Disable for coarse pointer and reduced motion |
| [Motion Primitives Tilt](https://motion-primitives.com/docs/tilt), [Spotlight](https://motion-primitives.com/docs/spotlight), [In View](https://motion-primitives.com/docs/in-view) | Reusable surface and entrance behavior | Existing Motion dependency but duplicate components | Reject transplant; keep Rosa-owned equivalents | Existing Rosa guards remain authoritative |
| [shadcn Navigation Menu](https://ui.shadcn.com/docs/components/base/navigation-menu) / Sheet | Accessible menu/drawer structures | Radix and structural migration | Reference semantics only; current menu already handles focus, Escape, backdrop, and scroll lock | Preserve current mobile implementation; instant under reduced motion |
| [21st.dev cursor catalogue](https://21st.dev/community/components/s/cursor) / React Bits trails | Cursor replacement, blobs, image trails, pixel/WebGL trails | Global tracking; GSAP or Three stack in examples | Reject; default cursor and local element feedback are clearer | Never enable |
| [21st.dev Expand Map](https://21st.dev/community/components/jatin-yadav05/expand-map/default) | Coordinate card expands to map | Framer Motion plus provider/data assumptions | Defer; preserve explicit unverified-location placeholder | Static placeholder/link first; no camera animation under reduced motion |
| [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/) | Interactive WebGL vector map with controls/markers | Large SDK plus tiles, styles, CSP and worker setup | Do not add now; after verified coordinates, prefer a lazy static image/link unless interaction is required | Lazy load after intent; use `reduceMotion`; static link fallback |

### Research-derived principles

- Motion's official guidance supports CSS for simple hover/focus color transitions and Motion for gesture, presence, in-view, and layout orchestration. Rosa should maintain that separation.
- `inView`/IntersectionObserver is appropriate for one-shot section entrances; continuous scroll progress is unnecessary here.
- Motion's `useReducedMotion` should turn spatial movement into immediate changes or opacity-only feedback.
- Transform and opacity are the preferred animated properties. Blur, filter, large shadow, and 3D effects must be sparse and measured on low-power hardware.
- The existing direct `motion` imports mean a `LazyMotion` bundle strategy would require a coordinated migration. It is not a free optimization and should not be mixed into the visual pass without measurements.

### Source index

- [React Bits](https://reactbits.dev/) and [official repository](https://github.com/DavidHDev/react-bits)
- [Motion for React](https://motion.dev/docs/react), [hover](https://motion.dev/docs/hover), [inView](https://motion.dev/docs/inview), [reduced motion](https://motion.dev/docs/react-use-reduced-motion), [performance](https://motion.dev/docs/performance), and [bundle size](https://motion.dev/docs/react-reduce-bundle-size)
- [Motion Primitives](https://motion-primitives.com/docs) and [Magnetic](https://motion-primitives.com/docs/magnetic)
- Magic UI: [Word Rotate](https://magicui.design/docs/components/word-rotate), [Highlighter](https://magicui.design/docs/components/highlighter), [Text 3D Flip](https://magicui.design/docs/components/text-3d-flip), [Interactive Hover Button](https://magicui.design/docs/components/interactive-hover-button), [Glare Hover](https://magicui.design/docs/components/glare-hover)
- Cult UI: [Text Animate](https://www.cult-ui.com/docs/components/text-animate), [Neumorph Button](https://www.cult-ui.com/docs/components/neumorph-button)
- Aceternity: [Moving Border](https://ui.aceternity.com/components/moving-border), [Spotlight](https://ui.aceternity.com/components/spotlight)
- [21st.dev interactive hover button](https://21st.dev/community/components/dillionverma/interactive-hover-button/default), [hover catalogue](https://21st.dev/community/components/s/hover-animation), [map catalogue](https://21st.dev/community/components/s/map), and [Expand Map](https://21st.dev/community/components/jatin-yadav05/expand-map/default)
- [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/) and its [`reduceMotion` map option](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/MapOptions/)

## 6. Shared motion grammar

### Density levels

| Level | Meaning | Allowed behavior |
|---|---|---|
| 0 — still | Reading/legal/static utility | Focus, press, and state feedback only |
| 1 — quiet | Standard content section | One container reveal plus normal link/button interactions |
| 2 — expressive | Product/card/media group | Staggered entrance plus one coordinated hover response |
| 3 — signature | Homepage hero or one high-value feature | Text choreography plus one restrained spatial/material effect |

No viewport should show more than one level-3 effect. Adjacent sections should not both use level 3. Long grids use level 2 only on their first visible row; subsequent items should settle without a long cascade.

### Timing and distance

| Interaction | Target | Easing |
|---|---:|---|
| Press/tap acknowledgment | 100–160ms | standard |
| Hover/focus micro response | 160–220ms | standard |
| Card/media response | 220–320ms | standard |
| Section entrance | 420–580ms | emphasized only for headings |
| Hero text sequence | 700–960ms total, not per word | emphasized |
| Stagger interval | 40–70ms, capped | standard |
| Desktop travel | 8–18px normal; 24px maximum | — |
| Mobile travel | 0–10px | — |

### Cross-device variants

**Desktop fine pointer:** allows 1–2px lift, 1–1.8 degree tilt on selected large surfaces, local magnetic movement on a rare CTA, slight image scale, underline/arrow travel, and an optional single glare sweep.

**Mobile/coarse pointer:** no tilt, magnetic, spotlight tracking, or hover-only reveal. Tap/press feedback remains; entrances use 0–10px travel and shorter stagger. Controls never change size in a way that shifts layout.

**Reduced motion:** no transform travel, tilt, magnetic response, stagger delay, scrolling parallax, blur animation, or glare. Route and state changes become immediate or use a short opacity crossfade. Focus indicators remain fully visible.

## 7. Detailed page-by-page motion map

The entries below are implementation decisions, not permission to implement. “Existing” means retain/tune; “Add” means a future implementation candidate.

### Shared shell

| Element | Effect and trigger | Intensity / timing | Desktop | Mobile | Reduced motion | Source | Cost / risk |
|---|---|---|---|---|---|---|---|
| Header scroll state | Existing background/border transition when page scrolls | Quiet, 280ms | Keep blur; soften broad shadow | Same, no height bounce | Immediate color/border | Existing Rosa | Low; test sticky layout |
| Primary nav links | Directional underline on hover/focus; add current-route resting segment | Quiet, 180–220ms | 1px line grows left-to-right | Current-route line only; touch has no hover dependency | Instant line | Pill Nav principle, Rosa styling | Low; pathname and focus tests |
| Quote CTA | Label/arrow shift on hover/focus, press scale on activation | Expressive micro, 160–200ms, 2–4px | Optional very weak magnetic response only for this CTA | Press only | Color/underline only | Magic/21st concept adapted | Low-medium; avoid text duplication for AT |
| Mobile menu trigger | Existing two-line morph | 280ms | N/A | Keep; ensure focus-visible ring | Instant icon state | Existing Rosa | Low |
| Mobile panel | Existing backdrop fade, panel slide, link sequence | 220–300ms, 40ms links | N/A | Keep; no spring overshoot | Immediate/crossfade | Existing Rosa | Low; focus/escape/body-lock tests |
| Route content | Existing 8px/2px blur entrance | 220–280ms | Keep | Reduce to 4px/no blur | Opacity-only or immediate | Existing Rosa | Low; avoid delayed navigation |
| Footer links | Match premium underline and 2px arrow shift where present | Quiet, 180ms | Hover and focus | Press/focus only | Instant underline | Existing Rosa | Low |

### Homepage `/`

| Section / element | Effect and trigger | Intensity / timing | Desktop | Mobile | Reduced motion | Source | Cost / risk |
|---|---|---|---|---|---|---|---|
| Hero eyebrow/title/copy/actions | Preserve ordered entrance on initial view; use clipped words only for H1 | Signature, 750–900ms total | 12–18px max; short word stagger | 0–8px, shorter sequence | Immediately visible; optional 120ms fade | Existing `TextReveal`; Split Text concept | Medium; LCP must not wait |
| Hero instrument/media | One shallow settle on load plus subtle hover on fine pointer | Signature, 500–700ms settle; 280ms hover | Scale at most 1.015 or 1–2px detail shift | Static | Static | Existing Rosa/Glare concept optional | Medium; avoid large filters/shadows |
| Hero actions | Standard button label/arrow and press response | Quiet, 160–200ms | Hover/focus/press | Press | Instant color | Rosa button system | Low |
| Family introduction | Single section-heading reveal | Quiet, 480ms | 12px | 6px | Static | `Reveal` | Low |
| Family cards | Group stagger; coordinated image scale, title/number/arrow response | Expressive, 50–60ms stagger; 240ms hover | Image 1.015, card lift 1–2px | No hover/tilt; press color | No travel; border/color only | Existing Rosa | Medium on grid; cap stagger |
| Featured products | Same grammar as family cards, slightly calmer because denser | Expressive, 40–50ms visible-row stagger | No more than 1 degree tilt | Static cards with press response | No tilt/stagger | Existing Rosa | Medium |
| Procurement support | Container reveal; numbered lines or icon details respond only if interactive | Quiet, 480ms | Hairline/arrow shift on linked row | Press only | Static | Existing Rosa | Low |
| Catalogue access | Cover settles in with content; available action gets arrow/line response | Expressive, 500ms; hover 240ms | Optional one soft glare sweep on cover only | No glare; press state | No glare/travel | Magic Glare adapted | Medium; optional, easy to overdo |
| Quotation CTA | One content reveal and normal CTA response | Quiet-to-expressive, 480ms | No decorative grid/crosshair; optional local spotlight only if already present | Static background | Static | Existing Rosa | Low |

### Products overview `/products`

| Section / element | Effect and trigger | Intensity / timing | Desktop | Mobile | Reduced motion | Source | Cost / risk |
|---|---|---|---|---|---|---|---|
| Intro/H1 | Existing TextReveal plus copy entrance | Expressive, 650–800ms total | 12–18px | 6–8px | Static | Rosa | Low |
| Family index | Stagger rows/cards; number, title, arrow respond together | Expressive, 50ms; hover 220ms | 1–2px lift, 2–4px arrow | Press/focus only | Border/color only | Animated List principle | Medium |
| Product discovery grid | First visible row stagger; media scale/action shift | Expressive, 40ms; hover 240ms | Max 1 degree tilt on featured cards only | No tilt | No transform | Rosa | Medium |
| Catalogue support | Container reveal; document link underline/arrow | Quiet | Normal hover/focus | Press | Instant | Rosa | Low |
| Procurement CTA | Existing reveal and button behavior | Quiet | Keep | Keep | Static | Rosa | Low |

### Family listing `/products/:family`

| Section / element | Effect and trigger | Intensity / timing | Desktop | Mobile | Reduced motion | Source | Cost / risk |
|---|---|---|---|---|---|---|---|
| Breadcrumb/hero | Breadcrumb appears without travel; H1 word reveal; media rise | Expressive, 650–800ms | Copy/media may use opposing 12px directions | Both flow upward 6px | Static | Rosa | Low |
| Editorial media | Subtle overlay shift or image scale on hover if non-actionable visual | Quiet, 260ms | Max scale 1.01 | Static | Static | MediaFrame | Low |
| Product grid | One-shot stagger; coordinated card response | Expressive, 40–55ms | 1px lift, media 1.015, arrow 3px | No hover lift; clear tap state | No travel | Rosa | Medium on large lists |
| Procurement panel | Single reveal; buttons use shared states | Quiet | Keep | Keep | Static | Rosa | Low |

### Product detail `/products/:family/:product`

| Section / element | Effect and trigger | Intensity / timing | Desktop | Mobile | Reduced motion | Source | Cost / risk |
|---|---|---|---|---|---|---|---|
| Breadcrumb/gallery/summary | Existing opposing entrance | Expressive, 500–650ms | 12px maximum | Unified 6px upward reveal | Static | Rosa | Low |
| Gallery frame | Very shallow tilt on pointer; selected thumbnail border/opacity transition | Expressive, 220–280ms | 1–1.4 degrees; image scale <=1.01 | No tilt; selected state immediate | Static geometry; color only | Motion Primitives Tilt concept via Rosa | Medium; pointer/device QA |
| Specification rows | Optional first-view short stagger only if rows are few; hover row tint only when useful | Quiet, 30–40ms | No row translation | Static | Static | Animated List principle | Low; avoid slowing scanning |
| Add to inquiry | Existing label/state swap; add press feedback and stable width | Expressive micro, 160–200ms | Hover/focus/press | Press | Instant label change | Existing Rosa | Low; live-region/state tests |
| Mobile inquiry bar | Enter once when it becomes sticky/available; no bouncing | Quiet, 180–220ms | N/A | 4px/opacity entrance; press feedback | Immediate | Rosa | Low |
| Related products | Short stagger and shared card behavior | Quiet-to-expressive | Normal desktop card behavior | No hover | No travel | Rosa | Low |

### Catalogues `/catalogues`

| Section / element | Effect and trigger | Intensity / timing | Desktop | Mobile | Reduced motion | Source | Cost / risk |
|---|---|---|---|---|---|---|---|
| Intro | Existing heading/copy sequence | Expressive, 650–800ms | 12px | 6px | Static | Rosa | Low |
| Document grid | Short stagger; low tilt already capped at 1.4 degrees | Expressive, 50–60ms | Keep tilt only on fine pointer | No tilt | No stagger/tilt | Rosa | Medium |
| Catalogue cover | Image/cover scale plus optional restrained glare on featured item only | Expressive, 280–420ms | One sweep per hover entry; no loop | Static | Static | Magic Glare adapted | Medium; optional |
| PDF unavailable action | No hover promise; disabled style stays still | Still | Static | Static | Static | Semantic requirement | Low |
| Explore/View actions | Shared label/arrow response | Quiet, 180ms | Hover/focus | Press | Color only | Rosa + interactive button principle | Low |
| Guidance panel | Single container reveal, standard actions | Quiet | Keep | Keep | Static | Rosa | Low |

### Procurement support `/procurement-support`

| Section / element | Effect and trigger | Intensity / timing | Desktop | Mobile | Reduced motion | Source | Cost / risk |
|---|---|---|---|---|---|---|---|
| Hero | Existing H1/media sequence | Expressive | 12px | 6px | Static | Rosa | Low |
| Six-step process | Container reveal; on actionable/focusable rows only, number and hairline shift | Quiet, 180–220ms interaction | No blanket hover on static prose | Static | Static | Animated List principle | Low |
| Requirement types | One container reveal, not six dramatic animations | Quiet, 480ms | Keep | Keep | Static | Rosa | Low |
| Information checklist | Existing short stagger | Quiet, 40–50ms | Keep | Shorter/none | Static | Rosa | Low |
| Route choices/final CTA | Standard reveal and button states | Quiet | Keep | Keep | Static | Rosa | Low |

### About `/about`

| Section / element | Effect and trigger | Intensity / timing | Desktop | Mobile | Reduced motion | Source | Cost / risk |
|---|---|---|---|---|---|---|---|
| Hero | Existing H1/media entrance | Expressive | Opposing 12px allowed | Unified 6px | Static | Rosa | Low |
| Expectations | One list/container reveal | Quiet | Optional row hairline response only if linked | Static | Static | Rosa | Low |
| Scissors evolution | Existing media reveal + timeline stagger | Expressive but slow-reading friendly, 55–70ms | Keep; no scroll-tethered timeline | Reduce/disable stagger | Static | Rosa; reject ScrollFloat | Medium |
| Supported buyers | Existing alternating-card stagger | Expressive, 50–60ms | Border/tonal hover only | Press only if actionable; otherwise still | Still | Rosa | Low |
| Family index | Shared family interactions | Quiet-to-expressive | Keep | No hover | No travel | Rosa | Low |
| Procurement/final CTA | Container reveal and shared buttons | Quiet | Keep | Keep | Static | Rosa | Low |

### Contact `/contact`

| Section / element | Effect and trigger | Intensity / timing | Desktop | Mobile | Reduced motion | Source | Cost / risk |
|---|---|---|---|---|---|---|---|
| Hero | Existing H1/copy/action sequence | Expressive | 12px | 6px | Static | Rosa | Low |
| Information panel/form | Existing paired reveals | Quiet, 420–500ms | 40–60ms offset only | Same direction, minimal delay | Static | Rosa | Low |
| Fields | Label/border/underline transition on focus, validation status crossfade | Quiet, 160–220ms | Focus-visible and focus-within | Same | Instant color/border | Existing story CSS | Low; validation and contrast tests |
| Submit | Stable-width label crossfade for idle/loading; success/error region entrance | Expressive micro, 160–220ms | Keep layout stable | Same | Instant label/state | Quotation pattern | Low-medium; live region needed |
| Location | Keep explicit “Location awaiting confirmation” placeholder; no random map | Still | Optional static framed placeholder only | Same | Same | Data-integrity rule | None |
| Future verified map | Prefer lazy static map image/link before interactive SDK | Optional future | Load after interaction/viewport | Static link first | No animated camera | 21st/MapLibre research | High if SDK adopted |
| Quotation CTA | Shared reveal/button states | Quiet | Keep | Keep | Static | Rosa | Low |

### Inquiry `/inquiry`

| Section / element | Effect and trigger | Intensity / timing | Desktop | Mobile | Reduced motion | Source | Cost / risk |
|---|---|---|---|---|---|---|---|
| Empty/loading state | Simple immediate content or short fade | Still-to-quiet, <=180ms | No skeleton shimmer loop | Same | Immediate | Rosa | Low |
| Populated heading/summary | Existing 8px entrance | Quiet, 280–340ms | Keep; normalize easing | 4px | Opacity/immediate | Rosa | Low |
| Inquiry lines | Existing layout entry/removal; collapse on removal | Expressive state motion, 200–240ms | Keep | Keep but shorten | Immediate removal or opacity only | AnimatePresence | Medium; focus after removal |
| Quantity control | Press response plus existing numeric output change | Quiet, 120–160ms | Keep | Larger tap target, press only | Instant number | Rosa | Low |
| Notes/remove/clear | Shared focus/underline; destructive press/state clarity | Quiet | No playful shake | Same | Instant | Rosa | Low |
| Proceed action | Shared primary CTA response | Quiet | Hover/focus/press | Press | Color only | Rosa | Low |

### Quotation `/request-quotation`

| Section / element | Effect and trigger | Intensity / timing | Desktop | Mobile | Reduced motion | Source | Cost / risk |
|---|---|---|---|---|---|---|---|
| Blocked state | One content reveal only | Quiet | 8px | 4px | Static | Rosa | Low |
| Form heading/summary | Existing entrance | Quiet, 280–340ms | Keep | 4px | Static | Rosa | Low |
| Fieldsets | Reduce repetitive three-part in-view motion; one form entrance or very short offsets | Quiet, 350–450ms total | 30–40ms offset | No stagger | Static | Rosa | Low |
| Fields/checkbox | Focus line, validation border/message crossfade | Quiet, 160–220ms | Focus-visible | Same | Instant | Rosa | Low |
| Submit label | Existing wait-mode label swap, stable button size | Expressive micro, 160ms | Keep | Keep | Instant | Rosa | Low |
| Error | Existing presence; avoid shake | Quiet, 140–180ms | 3–4px/opacity | Opacity | Immediate | Rosa | Low |
| Success | Existing mark scale + content reveal | Expressive but singular, 240–340ms | Keep subtle | Keep | Immediate | Rosa | Low |

### Search `/search`

| Section / element | Effect and trigger | Intensity / timing | Desktop | Mobile | Reduced motion | Source | Cost / risk |
|---|---|---|---|---|---|---|---|
| Default panel | Add one shared section entrance; do not animate read-only input as active | Quiet, 420ms | 8–12px | 4px | Static | Rosa `Reveal` | Low |
| Read-only search field | Focus/hover must not imply working search; preserve status text | Still | No animated affordance beyond border clarity | Same | Same | Semantic rule | Low |
| Family shortcuts | Short stagger and coordinated number/title/arrow response | Expressive, 40–50ms; 200ms hover | 1px lift/arrow shift | Press only | Border/color only | Animated List concept | Low |
| Future result states | Use list presence for genuine query changes only | State-driven, 180–240ms | Fade/4px | Fade | Immediate | Existing inquiry pattern | Medium, future only |

### Legal `/privacy` and `/terms`

| Section / element | Effect and trigger | Intensity / timing | Desktop | Mobile | Reduced motion | Source | Cost / risk |
|---|---|---|---|---|---|---|---|
| Hero | Existing single reveal; no split text | Quiet, 420ms | 8–12px | 4px | Static | Rosa | Low |
| Section navigation | Underline/focus state; optional active section marker only if robustly observed | Quiet, 180ms | Sticky state may use color/line | Non-sticky/normal links | Instant | Rosa | Medium if scrollspy added; optional |
| Legal sections | Existing reveals should be reduced or grouped; reading must never wait | Still-to-quiet | First section may reveal; later sections mostly static | Static | Static | Rosa | Low |
| Review note | Static emphasis | Still | No animation | No animation | No animation | Integrity rule | None |

## 8. Shared component plan

### Keep and tune

- `Reveal`: reduce default travel/blur or add a quieter intensity option. Do not create page-specific copies.
- `Stagger`: retain, with a maximum useful sequence and automatic reduced/mobile restraint.
- `TextReveal`: reserve for route H1s and at most one homepage H2. Keep its accessibility wrapper.
- `Magnetic`: retain but use only on a rare primary CTA; never on every button.
- `TiltSurface`: retain at low angles; never on dense mobile grids.
- `SpotlightSurface`: retain for one selected surface, not a general card treatment.
- `MediaFrame`: retain and standardize the small image-scale/overlay response.
- `RouteTransition`, `ScrollHeaderController`, and `MobileNavigation`: retain architecture and polish states in place.

### Small shared additions that may be justified later

- A shared arrow/label treatment inside existing `Button`/`ButtonLink` and editorial links. It must preserve text semantics and button width.
- A CSS-only `premium-glare` utility only if it is used on two or three deliberate media/document surfaces. It must run once per hover entry, never loop, and disappear for coarse/reduced motion.
- A shared async status transition for contact and quotation forms, reusing `AnimatePresence` and accessible live regions.
- A current-route nav indicator based on pathname, using the existing hairline vocabulary.

### Do not add

- Another reveal, split-text, tilt, spotlight, magnetic, mobile sheet, button, or card system.
- GSAP, Matter.js, OGL, Three.js/react-three-fiber, rough-notation, Radix solely for motion, a cursor library, or a map SDK without verified map requirements.
- A global animation event bus, continuous requestAnimationFrame loop, or scroll-progress controller.

## 9. Effect density map

| Area | Density | Signature allowance |
|---|---:|---|
| Homepage hero | 3 | One text sequence + one media response |
| Homepage content sections | 1–2 | One reveal or stagger and one hover grammar |
| Products overview/family grids | 2 | Stagger + coordinated card hover, capped |
| Product detail hero/gallery | 2 | Entrance + low gallery response |
| Catalogue grid | 2 | Stagger + low tilt; glare optional on featured only |
| About evolution | 2 | Timeline stagger; no scroll tethering |
| Procurement/contact | 1 | Entrances and functional states |
| Inquiry/quotation | 1–2 | State changes, not decoration |
| Search | 1 | One entrance + shortcuts |
| Legal | 0–1 | Mostly still |
| Header/mobile menu | 1–2 | Functional state motion |
| Footer | 1 | Link/CTA micro-interactions only |

## 10. Explicit rejection list

- Falling text, gravity, bounce, elastic words, or scattered characters.
- Pixel dissolves, CRT/glitch, noise distortion, liquid masks, blob/splash cursors, image trails, particle trails, or cursor replacement.
- Circular, 3D, depth, auto-rotating, or scroll-jacked galleries.
- Autoplay word rotation, typewriter loops, marquee copy, or changing claims.
- Hand-drawn marker highlighting, neon/glow, glassmorphism, neumorphism, giant pill navigation, or animated gradient borders.
- Large spring overshoot, bouncy CTA icons, excessive arrow travel, dramatic 3D flip, or card rotations beyond shallow material response.
- Permanent border beams, spotlights, shimmering loaders, or ambient loops.
- Per-section numbering, rails, crosshairs, crop marks, registration grids, or technical captions added as new page furniture.
- Random or example map coordinates, addresses, pins, or contact facts.
- Direct library components whose styling, dependency graph, or DOM structure displaces Rosa's system.

## 11. Dependency decision

**Decision: add no runtime dependency.**

The installed `motion` package and current CSS are sufficient. The only candidate worth borrowing that is not already covered is a restrained glare sweep, and that can be implemented with a pseudo-element. Icons should use existing assets or simple inline geometry only if the design already calls for an arrow; no icon package is justified solely for hover behavior.

Do not migrate to `LazyMotion` during the visual pass by assumption. First measure the current client bundle and locate all direct `motion` imports. If bundle reduction becomes a separate objective, perform a complete migration with bundle evidence and regression tests.

## 12. Implementation order for a later approved phase

1. **P0 — Homepage correction:** remove structural decoration from `4e67fc1`, preserve mobile flow/gutters and useful tests, tune shadow and hover intensity.
2. **P1 — Shared grammar:** normalize motion tokens, quieter Reveal/Stagger behavior, shared button/link/nav/footer states, coarse-pointer and reduced-motion rules.
3. **P2 — Homepage effects:** refine hero text/media, family/product cards, catalogue cover, procurement and CTA behavior without markup redesign.
4. **P3 — Commerce discovery:** products overview, family listing, product detail/gallery, catalogue documents.
5. **P4 — Story/support:** about, procurement, contact form states, confirmed-location placeholder treatment.
6. **P5 — Conversion/utility:** inquiry, quotation, search, legal pages.
7. **P6 — Closeout:** responsive, keyboard, screen-reader semantics, reduced motion, low-power performance, cross-route visual regression, and complete test suite.

Each phase must finish with its own browser review and tests before the next begins. Do not accumulate all visual changes into one unreviewable batch.

## 13. Verification plan

### Automated checks

- Run the existing unit/component suite and preserve the previously passing public behavior baseline.
- Run existing Playwright suites for homepage polish, product polish, story pages, conversion polish, public shell, responsive restraint, reduced motion, route smoke, and catalogue media.
- Replace tests that assert removed homepage decoration with interaction/responsive assertions.
- Add focused tests for current-route navigation, keyboard focus states, coarse-pointer disabling, stable button labels, async contact status, inquiry removal focus, and reduced-motion fallbacks.
- Run type checking, linting, build, and `git diff --check`.
- Check every audited viewport for horizontal overflow and transformed focus-ring clipping.
- Capture console output during route traversal and fail on hydration mismatch or uncaught runtime errors.
- Inspect browser performance recordings for unexpected recurring animation frames after the page becomes idle.

### Manual browser matrix

Test every public route at approximately 360, 390, 768, 1024, 1440, and a wide desktop viewport. Cover:

- keyboard-only navigation and visible focus;
- mouse hover and press;
- touch/coarse pointer emulation;
- `prefers-reduced-motion: reduce`;
- slow CPU and network throttling on the homepage and product grids;
- route navigation with back/forward and restored scroll;
- long translated/wrapped labels where possible;
- form idle, focus, invalid, loading, error, and success states;
- inquiry add, quantity update, line removal, clear, and proceed;
- mobile menu opening, Escape, outside close, scroll lock, and focus return.

### Performance acceptance

- No new permanent animation loop.
- No new global pointer or scroll listener.
- No new animation/map/WebGL dependency.
- No layout shift caused by label swaps, hover borders, or transformed containers.
- No meaningful LCP delay from hero choreography; hero content remains present before hydration.
- No prolonged paint flashing from large blur, filter, or shadow animation.
- Smooth interaction on a throttled mid-range mobile profile, not just a desktop workstation.

### Accessibility acceptance

- Actionable hover treatment is also present for `:focus-visible`.
- Decorative layers are pointer-inert and hidden from assistive technology.
- Split text retains a coherent accessible label and does not duplicate speech.
- Motion never communicates the only indication of selection, error, completion, or availability.
- Reduced motion removes travel, tilt, glare, magnetic motion, blur, and stagger.
- Focus is not lost after inquiry item removal or route/menu transitions.

## 14. Prioritized recommendation table

| Priority | Recommendation | Affected pages | Visual impact | Implementation cost | Performance cost | Accessibility risk |
|---|---|---|---:|---:|---:|---:|
| Essential | Preserve mobile hero flow/gutters from `4e67fc1` | Homepage | High | Low | Low | Low |
| Essential | Remove homepage indices, technical caption, crop/crosshair/grid decoration | Homepage | High | Low | Positive reduction | Positive reduction |
| Essential | Retain and tune shared Reveal/Stagger/TextReveal rather than add variants | All public routes | High | Medium | Low | Low with defined fallback |
| Essential | Standardize button, link, nav, footer, focus, and press feedback | Shell and all routes | High | Medium | Low | Positive |
| Essential | Enforce coarse-pointer and reduced-motion fallbacks | All public routes | High | Medium | Positive | High positive |
| Essential | Improve async, validation, quantity, insertion, and removal states | Contact, inquiry, quotation | High | Medium | Low | Positive |
| Recommended | Coordinate product/family card media, title, number, and arrow hover | Homepage, products, family, related products | High | Medium | Low | Low |
| Recommended | Refine gallery selection/tilt and mobile inquiry feedback | Product detail | Medium-high | Medium | Low | Low |
| Recommended | Add current-route hairline indicator | Desktop and mobile navigation | Medium | Medium | Low | Positive |
| Recommended | Unify catalogue cover, availability, and action feedback | Homepage catalogues, `/catalogues` | Medium-high | Medium | Low | Low |
| Recommended | Add restrained search shortcut entrance/interaction | Search | Medium | Low | Low | Low |
| Recommended | Reduce repeated legal and quotation-fieldset motion | Legal, quotation | Medium | Low | Positive reduction | Positive |
| Optional | CSS glare on one featured catalogue/media surface | Homepage or catalogues, not both per viewport | Medium | Low | Low-medium | Low with fallback |
| Optional future | Static verified map image/link after real location approval | Contact | Medium | Medium | Low if lazy | Low |
| Deferred | Full interactive MapLibre map | Contact | Low until requirements exist | High | High | Medium |
| Rejected | Direct external animation component installs | Site-wide | Low/negative | High | Medium-high | Medium |
| Rejected | Cursor, physics, WebGL, autoplay, beam, or continuous effects | Site-wide | Negative | High | High | High |

## 15. Definition of success

The later implementation succeeds when a returning stakeholder recognizes the same Rosa site—same layout, same type, same colors, same content—but every interaction feels more deliberate. Headings arrive cleanly; cards feel material without floating; images respond without zooming theatrically; buttons acknowledge hover, focus, and press; navigation feels exact; forms communicate state; inquiry changes remain understandable; mobile stays calm; reduced-motion users receive the complete experience; and no effect calls attention to its source library.

The test is not “how many animations were added?” It is whether the site feels more composed, responsive, trustworthy, and premium without becoming visibly redesigned.
