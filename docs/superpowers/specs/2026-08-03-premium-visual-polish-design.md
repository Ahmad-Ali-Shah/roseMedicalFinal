# Rosa Medical Premium Visual Polish Design

**Date:** 2026-08-03  
**Status:** Approved by Ahmad  
**Phase:** F7 Premium Visual Refinement  
**Base:** `main` after the merged public quotation slice  
**Implementation order:** visual polish first, mocked admin behavior second, remaining public interactions third

## 1. Goal

Transform the existing approved Rosa Medical frontend into a premium, editorial, medically credible experience through a coherent motion system, cinematic media treatment, refined interaction feedback and responsive visual restraint.

This phase does not redesign the information architecture, activate unfinished admin workflows, complete search/contact/catalogue behavior, or expand backend scope. It preserves the current page structure and makes that structure feel deliberate, confident and finished.

The approved motion language is:

> **Editorial luxury with selective cinematic moments.**

The result must feel like a serious international medical-procurement brand, not an AI component showcase, game interface, experimental portfolio or generic SaaS template.

## 2. Locked sequencing

Work proceeds in this order:

1. Premium visual polish, motion and media-ready presentation.
2. Mocked admin product and publishing workflow.
3. Remaining public interactions, including search, catalogue and contact behavior.

During this phase:

- No additional Supabase acceptance pass is required.
- No rate-limit, email-delivery or deployment work is introduced.
- No product publishing behavior is activated.
- No new public search, catalogue or contact behavior is activated.
- Existing quotation behavior remains functionally unchanged.

## 3. Existing layout remains authoritative

The current public composition remains intact:

- Global header, navigation, footer and route shells
- Homepage hero
- Family discovery
- Procurement support
- Featured instruments
- Catalogue access
- Final quotation CTA
- Products overview
- Family listings
- Product details
- About and evolution timeline
- Procurement-support page
- Catalogues
- Contact
- Inquiry
- Request quotation
- Legal pages

Polish is applied through reusable motion and media boundaries. Existing typography, spacing, colour, page hierarchy and approved Figma direction remain the visual source of truth.

## 4. External source strategy

The supplied sources are research and implementation references, not new design systems.

### shadcn.io and shadcn-style primitives

Use for accessible structural patterns and interaction foundations:

- Navigation menus and mobile sheets
- Dialog, drawer, hover-card and tooltip behavior
- Fields, labels, tabs and scroll areas
- Focus-visible behavior
- Skeleton and loading patterns
- Easing references
- Selective masked or split text patterns

Rosa tokens and component styling remain authoritative. Default shadcn appearance must not replace the current design.

### 21st.dev and Motion Primitives

Use for reusable motion architecture and high-quality marketing interaction patterns:

- In-view section reveals
- Stagger orchestration
- Magnetic CTAs
- Restrained tilt
- Spotlight surfaces
- Progressive blur
- Border trails
- Transition panels
- Sticky and compressing navigation
- Active underline movement

Patterns are adapted into Rosa-owned components rather than installed as unrelated one-off effects.

### Uiverse

Use as a micro-interaction detail bank:

- Button label and arrow movement
- Press feedback
- Animated borders
- Input focus treatments
- Compact loaders
- Tooltips
- Soft highlight sweeps

Reject neon, gaming, novelty, excessive glass and exaggerated 3D treatments.

### React Bits

Use selectively for memorable cinematic moments:

- Split or scroll-reveal text
- Blur text
- Magnet behavior
- Gradual blur
- Tilted or spotlight cards
- Restrained glare
- Hero atmospheric layers

Reject glitch, hyperspeed, pixel, gooey, liquid-cursor, ballpit, antigravity and persistent particle effects.

## 5. Motion architecture

Add one core animation dependency: `motion` for React.

Do not add GSAP, Three.js, a smooth-scroll replacement or multiple competing animation packages in this phase.

Create a Rosa-owned motion boundary:

```text
apps/web/src/features/motion/
├── motion-provider.tsx
├── motion.config.ts
├── reveal.tsx
├── stagger.tsx
├── text-reveal.tsx
├── magnetic.tsx
├── tilt-surface.tsx
├── spotlight-surface.tsx
├── progressive-blur.tsx
├── route-transition.tsx
├── scroll-header-controller.tsx
├── media-frame.tsx
└── index.ts
```

Add one phase-specific stylesheet:

```text
apps/web/src/styles/f7-premium-polish.css
```

### Component responsibilities

- `MotionProvider`: reduced-motion awareness and shared configuration.
- `Reveal`: one in-view entrance with direction, distance and delay controls.
- `Stagger`: ordered child entrances without page-specific orchestration code.
- `TextReveal`: line- or word-level masked reveal for selected editorial headings only.
- `Magnetic`: desktop pointer response for principal CTAs only.
- `TiltSurface`: low-amplitude perspective for selected cards and media.
- `SpotlightSurface`: soft pointer-position highlight on dark surfaces.
- `ProgressiveBlur`: edge treatment for media and horizontal content boundaries.
- `RouteTransition`: short content entrance while header and footer remain stable.
- `ScrollHeaderController`: transparent-to-solid and expanded-to-compact header states.
- `MediaFrame`: stable media slot that supports placeholder, final image, overlay, focal point and motion without layout changes.

Each primitive must be independently understandable and removable. Page sections consume these primitives without owning animation-library details.

## 6. Timing and easing system

Use one restrained global scale:

- Micro feedback: 120–180ms
- Component transition: 220–320ms
- Section reveal: 480–700ms
- Hero choreography: 800–1200ms
- Stagger interval: 40–90ms

Primary easing should resemble ease-out-quart or ease-out-expo. Restrained springs are allowed for physical controls and small state changes only.

Rules:

- Motion explains hierarchy, state or direction.
- Large motion is reserved for entrances and major storytelling sections.
- Small motion communicates hover, focus, selection, removal and success.
- No endless animation near important reading content.
- No bounce-heavy choreography.
- No animation on every paragraph.
- Touch devices receive simpler movement.
- Reduced-motion users receive immediate, calm transitions.

## 7. Media strategy and parallel branch ownership

### Product imagery

A separate AI agent is sourcing and assigning clean product images on another branch.

The premium-polish branch must:

- Assume those images will exist.
- Preserve current product identity, aspect-ratio and media wrappers.
- Avoid editing product-image mappings unless required to support a reusable media wrapper.
- Avoid committing replacement product binaries.
- Design card and detail motion so clear-background product images can be inserted without reworking layout.
- Keep transforms restrained so cut-out products remain sharp and medically credible.

### Non-product cinematic imagery

A second agent will source imagery for the hero and other storytelling areas. These assets are not interchangeable with clean product cut-outs.

The polish system must be media-ready before final assets arrive:

- Every cinematic section receives a stable `MediaFrame` boundary.
- Media dimensions and focal-point behavior are defined before asset insertion.
- Placeholder geometry remains valid until final media is supplied.
- Motion must work with either placeholder or final image.
- Final images can be inserted through a media manifest or section model without rewriting animation components.
- Overlays, gradients and text contrast belong to the media frame, not to the image file.

### Branch conflict rules

- Premium-polish branch owns motion components, motion CSS, wrappers and section composition changes.
- Product-image branch owns product binaries and product-media mappings.
- Cinematic-asset branch owns non-product binaries and the final asset manifest or source list.
- No branch should reformat or broadly rewrite another branch's data files.
- Final integration should merge asset branches first or rebase the polish branch before wiring media paths.
- Asset filenames must be stable, descriptive and lowercase with hyphens.

## 8. Non-product asset slots

### Homepage hero

Need a cinematic landscape image or controlled composite with:

- Premium surgical-instrument presence
- Dark or neutral environment
- Metallic detail and realistic material response
- Strong negative space for the existing headline
- No embedded text or logos
- No graphic clinical scene
- No false manufacturing, certification or factory implication

Preferred directions:

1. Macro surgical-instrument arrangement with dramatic directional light.
2. Refined tabletop composition with steel instruments and dark architectural shadows.
3. Abstract metallic medical-tool detail that remains clearly related to instruments.

### Procurement support

Need one or two landscape images representing careful procurement without claiming unsupported operations:

- Product review or selection
- Neutral packaging preparation
- Documentation and instruments
- Hands interacting with tools in a non-clinical setting
- Clean, credible work surface

Avoid hospital procedures, shipping-fleet claims, giant warehouses or identifiable certifications.

### Catalogue access

Need document-oriented imagery:

- Premium catalogue cover or open spread
- Printed document on a refined work surface
- Instrument imagery integrated into editorial page design
- Space for overlays and card depth

Avoid generic laptop mockups, floating PDFs, fake page counts and embedded unreadable text.

### About and evolution timeline

Need historical or craftsmanship-oriented imagery that does not invent company history:

- Scissor or instrument evolution details
- Material, hinge, blade and handle close-ups
- Archival-feeling neutral compositions
- Hands or tools without identifiable false claims

Images support the concept of instrument evolution; they must not imply that Rosa personally manufactured historical artifacts unless verified.

### Contact and final CTA

Need optional supporting imagery only when it strengthens the composition:

- Quiet instrument or material detail
- Dark editorial crop
- Strong negative space

These pages should not become image-heavy.

## 9. Asset technical requirements

Ask the sourcing agent to return:

- Original source URL and licence or usage note
- Photographer or provider attribution requirements
- Suggested Rosa slot
- Landscape or portrait orientation
- Pixel dimensions
- Focal-point description
- Recommended crop
- Whether the asset has text, logos, visible brands or identifiable people
- One primary and one fallback candidate per slot

Preferred minimums:

- Hero: at least 2400px wide
- Major section landscape: at least 1800px wide
- Portrait/editorial card: at least 1400px on the long edge
- Catalogue detail: enough resolution for high-density display

Prefer natural or restrained grading. Avoid low-resolution stock, obvious AI artifacts, distorted instruments, excessive depth-of-field blur, fake anatomy and inconsistent metal geometry.

## 10. Page-by-page motion design

### Global shell

#### Header

- Transparent over the dark homepage hero.
- Compresses slightly after leaving the hero.
- Transitions to a solid or restrained glass surface based on page context.
- Logo and navigation enter with a short downward reveal.
- Active navigation uses a travelling underline.
- Desktop links use a restrained underline or text-roll interaction.
- Mobile navigation becomes an editorial full-height curtain with correct focus behavior.

#### Route entrances

- Header and footer remain stable.
- Main content uses a short opacity and vertical entrance.
- No blocking transition screen.
- Back navigation remains immediate.
- Legal and utility pages use reduced choreography.

#### Buttons and links

Primary buttons:

- 1–2px hover lift
- Label or arrow shift
- Soft internal highlight sweep
- Restrained press scale
- Magnetic behavior only for selected desktop CTAs

Secondary buttons:

- Border transition
- Controlled edge fill
- No glow

Text links:

- Underline movement
- Small arrow translation
- No bouncing icons

### Homepage hero

Sequence:

1. Eyebrow fades and sharpens.
2. Headline reveals by lines through a mask.
3. Supporting copy appears with a shorter stagger.
4. CTAs enter together.
5. Hero media arrives through slow scale and lateral depth.
6. A restrained atmospheric light responds slightly to pointer movement.
7. Scroll indicator pulses once, then rests.

Hero media movement must use the eventual focal point and must not expose empty crop edges.

### Family discovery

- Preserve asymmetric grid.
- Stagger cards in reading order.
- Use 1.01–1.025 media scale.
- Apply a few pixels of pointer depth.
- Shift index, title and arrow independently.
- Use soft spotlight only on dark cards.
- Disable tilt on touch.

### Procurement-support section

- Reveal copy and media from opposing directions.
- Draw divider or process line as the section enters.
- Apply low-amplitude media parallax.
- Keep copy static after arrival.

### Featured instruments

- Rise cards in a controlled sequence.
- Apply restrained glare or highlight to media.
- Darken border rather than adding a large shadow.
- Allow maximum 2–3 degree pointer perspective.
- Keep names, codes and metadata stable.

### Catalogue access

- Use paper-stack depth.
- Move top sheet slightly on hover.
- Advance action arrow.
- Use progressive blur at horizontal edges only when necessary.

### Final quotation CTA

- Use one strong entrance.
- Allow one-time border trail.
- No looping glow.
- Primary desktop action may receive the strongest magnetic response.

### Products overview and family listings

- Reveal page heading by line.
- Enter family and product cards in spatial order.
- Use row-aware stagger for product grids.
- Apply restrained media scale and depth.
- Do not activate filters or search.

### Product detail

- Reveal breadcrumbs and title before controls.
- Use slow entrance and subtle pointer depth for main media.
- Crossfade future alternate media.
- Enter procurement summary after main media.
- Morph Add-to-inquiry label compactly after success.
- Keep specifications readable and stable.
- Reveal sticky mobile action only after the main action leaves view where practical.

### About and evolution timeline

- Draw the timeline progress line during scroll.
- Reveal each historical step when reached.
- Move media more slowly than text.
- Keep dates and headings still after entry.
- Do not introduce unverified milestones or imagery claims.

### Procurement-support page

- Sequence process numbers.
- Draw connecting lines.
- Use small alternating card offsets.
- Keep explanatory paragraphs calm.

### Catalogues

- Apply paper lift and shadow compression.
- Animate PDF corner or document indicator.
- Keep all document claims truthful.

### Contact

- Animate labels and focus borders.
- Stagger contact-information cards.
- Preserve current functionality; full behavior remains later phase C.

### Inquiry

- Animate added lines into place.
- Transition quantity values.
- Collapse removed lines smoothly.
- Animate summary-number changes.
- Keep summary gently sticky on desktop.

### Request quotation

- Reveal form by sections, not field by field.
- Use one shared Rosa focus treatment.
- Morph pending state inside the submit button.
- Use one restrained success reveal.
- Preserve submission behavior.

### Legal pages

- Minimal entrance only.
- No decorative cinematic effects.
- Prioritize readability.

## 11. Effects explicitly excluded

Do not introduce:

- Persistent cursor trails or cursor replacement
- Liquid chrome text
- Rainbow or neon gradients
- Glitch typography
- Heavy WebGL canvases
- Physics cards
- Floating UI everywhere
- Large glass pill navigation
- Endless marquees
- Aggressive 3D rotation
- Bounce-heavy springs
- Full-page smooth-scroll replacement
- Animation on every paragraph
- Decorative motion that competes with product information

## 12. Responsive and accessibility requirements

- Respect `prefers-reduced-motion` globally.
- Reduced-motion mode must remove parallax, tilt, magnetic response and stagger delays.
- Do not hide essential content behind animation state.
- Avoid hydration-dependent invisible content.
- Keep focus order and focus visibility intact.
- Pointer effects must have keyboard and touch equivalents where interaction meaning exists.
- Avoid transform-induced text blur.
- Prevent cumulative layout shift by reserving media dimensions.
- Mobile receives fewer simultaneous effects and shorter distances.
- Animation must not block navigation or form submission.

## 13. Performance requirements

- Use transforms and opacity for frequent motion.
- Avoid animating layout properties during scroll.
- Use intersection observers through shared primitives rather than page-specific listeners.
- Keep pointer tracking local to active components.
- Lazy-load non-critical cinematic media.
- Use responsive image sizes and modern formats during final asset integration.
- Avoid autoplay video unless later explicitly approved.
- No permanent high-frequency animation loop for decorative effects.

## 14. Implementation batches

### P1 — Motion foundation

- Add `motion`.
- Add shared timings and easing.
- Add reduced-motion handling.
- Build reusable motion and media primitives.
- Add F7 stylesheet.

### P2 — Global premium shell

- Header transformation
- Desktop navigation
- Mobile curtain navigation
- Buttons and links
- Route entrances
- Focus and touch behavior

### P3 — Homepage cinematic pass

- Hero
- Family discovery
- Procurement support
- Featured instruments
- Catalogue access
- Quotation CTA

### P4 — Product discovery pass

- Products overview
- Family pages
- Product cards
- Product detail
- Mobile product action

### P5 — Story and utility pass

- About timeline
- Procurement-support page
- Catalogues
- Contact
- Legal pages

### P6 — Conversion-flow polish

- Inquiry
- Request quotation
- Form transitions
- Success and failure presentation

### P7 — Responsive restraint pass

- Reduce mobile density
- Verify reduced-motion fallbacks
- Prevent layout shift
- Disable pointer-only effects on touch
- Review animation density across complete journeys
- Confirm the result remains a premium medical-procurement website

## 15. Validation approach

This phase is visual and interaction focused, but it must not knowingly break existing behavior.

Verification should focus on:

- Motion primitive unit and static composition checks
- Reduced-motion behavior
- Keyboard navigation and focus retention
- No horizontal overflow at existing breakpoints
- No invisible content before hydration
- Existing public quotation journey remains functional
- Screenshot and browser review of representative pages
- Performance review for animation loops, layout shift and media loading

Do not expand this phase into real Supabase acceptance, backend hardening or unfinished feature activation.

## 16. Brief for the cinematic image-sourcing agent

Use this concise brief:

> Source premium, realistic, legally usable non-product imagery for the Rosa Medical website. Focus on: one dark cinematic homepage hero with surgical instruments and strong negative space for text; procurement-support imagery showing careful selection, documentation or neutral packaging; premium catalogue/document photography; and close-up craftsmanship or instrument-evolution imagery for the About timeline. Avoid graphic surgery, hospitals, fake factories, certification claims, visible logos, embedded text, distorted instruments and obvious AI artifacts. Return one primary and one fallback per slot with source URL, licence note, dimensions, orientation, focal point and recommended crop. Prefer hero images at 2400px+ wide and major section images at 1800px+ wide.

## 17. Acceptance criteria

The phase is successful when:

- The existing layout is recognizably the same approved Rosa design.
- Motion feels coherent across pages rather than assembled from unrelated libraries.
- Homepage and About contain memorable but restrained cinematic moments.
- Product browsing remains clear and medically credible.
- Final non-product assets can be inserted without layout or animation rewrites.
- Product-image work can merge without broad conflicts.
- Mobile and reduced-motion experiences remain calm and complete.
- The site feels premium before mocked admin behavior and remaining public interactions are activated.
