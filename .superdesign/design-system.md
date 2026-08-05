# Rosa Medical Design System

## 1. Product context

Rosa Medical is a professional medical-instrument supplier and procurement partner. The public site helps institutional and professional buyers:

- discover surgical instrument families and representative products;
- understand product codes, variants, dimensions, and procurement context;
- build an organised inquiry;
- submit one clear request for quotation;
- assess Rosa as a credible, precise, international procurement partner.

The website is not a consumer storefront, generic SaaS landing page, speculative portfolio, or entertainment product. It must communicate clinical seriousness without becoming sterile, cold, or bureaucratic.

## 2. Authoritative baseline

Source-of-truth branch: PR #20 reconciliation tip `a51b9a1`, which is based on current `main` and contains the completed `frontend/premium-visual-polish` ancestry.

The current information architecture and section order remain authoritative:

1. Stable global header
2. Homepage hero
3. Instrument-family discovery
4. Procurement-support story
5. Featured instruments
6. Technical catalogue access
7. Final quotation CTA
8. Stable global footer

The enhancement may refine composition, depth, visual hierarchy, media framing, and motion choreography. It must not replace the site with a different template, invent product claims, add unverified manufacturing history, or activate unfinished behavior.

## 3. Core design idea

> Editorial luxury with selective cinematic moments, sharpened into surgical precision.

The page should feel composed like a premium technical editorial: warm paper, dark ink, measured red signals, high-quality steel, decisive whitespace, fine structural lines, and carefully staged motion. Cinematic energy belongs at the hero, one or two sectional transitions, and the final conversion moment. Reading and product comparison remain calm.

A visitor should feel:

- immediate confidence in the brand;
- the precision and material quality of surgical instruments;
- a deliberate progression from discovery to procurement;
- polish that rewards attention without demanding it.

## 4. Brand and color

Only use Rosa’s existing palette:

| Role | Token | Value |
|---|---|---|
| Brand/action | `--color-rosa-red` | `#e00815` |
| Brand hover/depth | `--color-rosa-red-dark` | `#b9000b` |
| Primary ink | `--color-ink` | `#191917` |
| Secondary ink | `--color-ink-soft` | `#2d2d2a` |
| Page ground | `--color-warm-white` | `#f9f7f2` |
| Paper surface | `--color-paper` | `#ffffff` |
| Quiet surface | `--color-mist` | `#f1f1ee` |
| Muted/technical | `--color-steel` | `#646b70` |
| Structural hairline | `--color-border` | `#d7d7d1` |

Rules:

- Red is a surgical signal, not a decorative wash. Use it for principal actions, tiny rules, indices, and controlled focal accents.
- Warm white is the dominant ground.
- Ink creates editorial contrast and selected cinematic sections.
- Steel and border tones provide technical structure.
- Never introduce purple, blue-neon, rainbow, candy gradients, or unrelated accent colors.
- Gradients may only interpolate existing neutral, ink, red, or transparent values and must remain subtle.

## 5. Typography

### Editorial

Use Lora through `--font-editorial` for hero statements, major section titles, and occasional large quotation/procurement statements.

- Weight: usually 400.
- Line height: approximately 0.94–1.08 for display sizes.
- Use balanced line breaks and generous breathing room.
- Do not use italic ornament as a general effect.
- Do not replace Lora with another serif.

### Interface

Use Inter through `--font-interface` for body copy, navigation, product data, labels, buttons, metadata, and technical content.

- Body copy should remain readable and quiet.
- Eyebrows and technical labels may use uppercase, heavy weight, and restrained tracking.
- Product codes and quantitative information must remain stable during motion.
- Do not introduce decorative or condensed fonts.

## 6. Layout and geometry

- Wide container: 80rem.
- Standard container: 72rem.
- Reading container: 46rem.
- Gutter: `clamp(1.25rem, 4vw, 5rem)`.
- Section rhythm: `clamp(4.5rem, 9vw, 8rem)`.
- Preserve the existing asymmetric editorial grids.
- Prefer hairlines, crop boundaries, paper layers, instrument silhouettes, negative space, and aligned baselines over rounded-card repetition.
- Control radius: 0.25rem. Surface radius: 0.125rem.
- Avoid large pills, floating glass containers, bento-for-its-own-sake, and dashboard-like density.
- Depth uses quiet shadows, border-darkening, 1–3px translations, low-degree perspective, and layered paper—not large diffuse elevation.

## 7. Image and media language

- Product images are clean technical cut-outs or carefully framed instrument photography.
- Non-product hero imagery should be dark-neutral, metallic, realistic, and allow negative space around copy.
- Every image must reserve its aspect ratio before load.
- Preserve focal points and avoid zooming beyond the source crop.
- No graphic clinical procedure, gore, fake hospital scenes, visible competitor marks, false factory claims, or invented certification.
- Overlays and grading belong to `MediaFrame`, not the source binary.
- Placeholder geometry must still look intentional when cinematic assets are unavailable.

## 8. Motion language

### Purpose

Motion must explain hierarchy, state, direction, or material response. It should make the page feel authored and expensive while keeping procurement information frictionless.

### Existing Rosa motion boundary

Continue to use only Rosa’s shared primitives:

- `MotionProvider`
- `Reveal`
- `Stagger` and `StaggerItem`
- `TextReveal`
- `Magnetic`
- `TiltSurface`
- `SpotlightSurface`
- `ProgressiveBlur`
- `MediaFrame`
- `ScrollHeaderController`
- `RouteTransition`

External libraries are reference sources. Adapt their useful ideas into Rosa-owned primitives instead of accumulating unrelated components.

### Timing

| Layer | Duration |
|---|---:|
| Micro feedback | 160ms |
| Component transition | 280ms |
| Section entrance | 580ms |
| Hero choreography | 960ms |
| Stagger interval | 40–90ms |

Use the existing easing curves:

- standard: `[0.22, 1, 0.36, 1]`;
- emphasized: `[0.16, 1, 0.3, 1]`.

Maximum travel:

- mobile: 12px;
- desktop: 24px;
- hero: 36px.

### Choreography hierarchy

1. Header establishes calm context.
2. Hero eyebrow, masked headline, body, actions, and media arrive as one intentional sequence.
3. Family cards enter in reading order.
4. Procurement copy and media counterbalance each other.
5. Featured instruments rise in a restrained cadence.
6. Catalogue sheets expose tactile paper depth.
7. Final quotation CTA receives one decisive arrival and the strongest permitted action response.

### Interaction rules

- Principal desktop CTA may use restrained magnetic response.
- Cards may use at most 2–3 degrees of local perspective.
- Image scale should stay around 1.01–1.025.
- Spotlight is local, soft, and primarily suited to dark surfaces.
- Button lift is 1–2px with label/arrow translation and a restrained press state.
- Border trails trigger only on hover/focus or once on entrance; no persistent loops.
- Scroll-linked behavior must not require a permanent global animation loop.
- Avoid animating layout during scroll.

## 9. Accessibility and responsive restraint

- All essential content is visible in server-rendered markup.
- `prefers-reduced-motion` resolves content immediately with no blur, offset, parallax, magnetic response, tilt, or stagger delay.
- Coarse pointers disable pointer tracking and perspective.
- Mobile receives fewer simultaneous effects, smaller distances, and simpler section entrances.
- Motion must not alter heading semantics, accessible names, focus order, or navigation timing.
- Focus-visible states remain clear and use the Rosa red focus treatment.
- Header and footer remain stable during route transitions.
- No transform-induced blur on body text.
- No horizontal overflow at any breakpoint.

## 10. Performance budget

- Sole runtime animation dependency: `motion`.
- No GSAP, Three.js, Lenis, WebGL canvas, autoplay video, cursor replacement, or additional theme runtime.
- Favor CSS transitions and MotionValues for local pointer interactions.
- Favor transform and opacity; use blur only during short entrances.
- Pointer tracking exists only while the component is relevant.
- No permanent decorative RAF loop.
- Lazy-load non-critical imagery; prioritize only the true above-the-fold hero media.
- Use Next Image, responsive `sizes`, and modern image formats.
- The enhancement should preserve good interaction latency on typical mid-range mobile hardware.

## 11. Homepage enhancement boundaries

### Keep

- Existing six-section order and content model.
- Existing navigation and footer information architecture.
- Existing Rosa palette, Lora/Inter pairing, action hierarchy, and procurement copy.
- Existing motion primitives and reduced-motion closeout.
- Existing product identities, codes, URLs, and catalogue data.

### Improve

- Hero composition and perceived depth without making text less readable.
- Section-to-section visual continuity.
- The clarity of one focal motion idea per section.
- Media framing so approved catalogue/product imagery feels intentional.
- Hover/focus feedback that is tactile but not noisy.
- Mobile hero fit and legibility.
- The relationship between final CTA energy and the rest of the page.
- Performance and animation-density discipline.

### Exclude

- New product/business claims.
- New homepage sections without a clear buyer purpose.
- Endless marquees, ambient particle fields, glitter, glitch, liquid chrome, physics toys, neon borders, or exaggerated 3D.
- Generic template hero patterns, floating dashboards, fake testimonials, logos, statistics, certifications, or social proof.
- Motion on every paragraph.
- Any backend, authentication, catalogue-data, quotation-contract, or deployment change.

## 12. Evaluation standard

A successful design remains unmistakably Rosa but feels materially more authored. It should pass five tests:

1. **Credibility:** appropriate for international medical procurement.
2. **Distinctiveness:** memorable without novelty effects.
3. **Hierarchy:** motion makes reading order clearer.
4. **Restraint:** calm wherever buyers compare information.
5. **Performance:** no effect justifies degraded interaction latency.
