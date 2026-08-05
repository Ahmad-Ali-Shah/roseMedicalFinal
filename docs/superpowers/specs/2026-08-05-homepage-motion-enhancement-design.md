# Rosa Homepage Motion Enhancement Design

**Date:** 2026-08-05
**Status:** Approved for implementation
**Scope:** Public homepage only

## Intent

Refine the existing Rosa homepage into a more assured, luxurious surgical-instrument experience without redesigning its information architecture, changing its visual language, or adding animation weight. The current six-section composition, typography, copy, colour system, routes, and dark-versus-paper rhythm remain authoritative.

The chosen direction is **Surgical Editorial Depth**: restrained editorial layouts, precise metallic geometry, strong black-and-paper contrast, and selective motion that feels engineered rather than decorative.

## User-facing outcome

- The mobile hero reads cleanly with no instrument artwork crossing the heading or body copy.
- The hero retains its two-part copy-and-instrument composition at every breakpoint.
- Desktop presentation gains depth through controlled framing, fine technical details, and pointer-only response.
- The six homepage sections feel connected through a consistent reveal rhythm and subtle section signatures.
- Interaction remains professional and accessible: no endless animation, no scroll hijacking, no content hidden from reduced-motion users, and no pointer-dependent instructions.

## Authoritative structure

The following order and responsibilities remain unchanged:

1. Hero: Rosa positioning, primary exploration action, quotation action, and instrument composition.
2. Family discovery: five existing family links.
3. Procurement support: current review narrative and three-step process.
4. Featured instruments: existing representative product links.
5. Catalogue access: five current catalogue links.
6. Quotation CTA: existing final inquiry action.

## Visual treatment

### Hero

The black hero remains the signature moment. On wide screens, the copy and instrument stage stay side by side. The stage receives a quiet technical frame, a small index caption, and layered metallic geometry using CSS only.

On phones, the instrument stage moves into normal document flow below the actions. The title, copy, actions, and stage must never overlap. The stage becomes shorter and calmer while preserving enough height to read as intentional imagery rather than a banner.

### Section rhythm

Paper sections retain their existing layouts. A fine editorial rule and compact section index may be used as a recurring visual signature where it clarifies hierarchy. Spacing remains generous on desktop and intentionally compressed on phones.

Family and product cards keep their current surfaces and links. Hover and focus effects are limited to small elevation, line, instrument, or label shifts and are disabled or neutralized for coarse pointers.

The procurement geometry remains abstract. Its lines may gain a calibrated focal axis, but no looping movement. The catalogue cards retain the paper-stack metaphor, with stagger and hover response supplied by the existing motion primitives and CSS transitions.

### Final CTA

The dark quotation panel remains a single strong closing gesture. It may use one controlled red-line response and subtle background depth; it must not compete with the hero.

## Motion system

Use only the existing `motion/react` primitives in `src/features/motion` and CSS transitions.

- Micro response: 160 ms
- Component response: 280 ms
- Section reveal: 580 ms
- Hero choreography: up to 960 ms
- Stagger interval: 40–90 ms

Motion runs once as content enters view. No permanent requestAnimationFrame loop, autoplay sequence, marquee, parallax loop, or scroll hijack is permitted. Pointer effects are decorative enhancements only.

## Responsive and accessibility contract

- At 390 px viewport width, hero title and hero visual bounding boxes do not overlap.
- No horizontal overflow at supported desktop, tablet, or mobile viewports.
- Actions remain keyboard reachable and retain visible focus treatment.
- `prefers-reduced-motion: reduce` removes transforms, blur reveals, and transition duration while leaving all content visible.
- `(hover: none)` and `(pointer: coarse)` remove tilt, magnetic, and spotlight response.
- Decorative geometry remains `aria-hidden`; existing headings and link labels remain unchanged.

## Performance boundary

- No new runtime dependency.
- No raster/video asset is introduced in this pass.
- No WebGL, canvas, GSAP, Lenis, or Three.js.
- Visual depth uses pseudo-elements, gradients, borders, opacity, and transform-only transitions.
- Effects must not create a continuing animation after entry or interaction ends.

## Verification

Implementation is accepted when focused component and Playwright tests pass, the full web test suite passes, lint/type/build checks pass, and new desktop/mobile screenshots confirm the mobile overlap is repaired without changing the established Rosa composition.
