# Rosa Medical Visual, Media, Quotation, and Admin Refinement Design

**Date:** 2026-08-06
**Status:** Approved by the owner's single-run authorization
**Authoritative base:** `feature/public-site-motion-system`

## Objective

Finish the owner-requested visual and functional refinement without changing Rosa's established identity. Replace weak editorial placeholders with supplied imagery, remove the two unwanted About narratives, make catalogue interactions gradual and legible, rebuild the live quotation form into a polished responsive business form, refine Procurement Support, and audit every admin route that the repository can truthfully exercise.

## Chosen approach

Use a small data-driven public-media registry plus focused component and CSS refinements. This keeps focal points, fit behavior, alt text, and family display order explicit while preserving the existing App Router, content registry, motion primitives, quotation APIs, and owner-auth boundary.

Rejected alternatives:

- A broad visual redesign would violate the requirement to remain faithful to the current site.
- Page-local hard-coded image paths would make later owner replacement error-prone.
- Image-generation or destructive retouching is unnecessary: the supplied logo works on a paper surface, and the cutter mark can be excluded through a controlled crop.
- New animation libraries would add latency without improving the restrained Rosa motion language.

## Fixed visual decisions

- Keep the warm paper, ink, Rosa red, editorial serif, square geometry, and asymmetric spacing already in production.
- Use real photography as quiet editorial depth, never as a busy wallpaper behind body copy.
- Use `object-fit: cover` for photography and `contain` for isolated instruments and the logo where preserving the silhouette matters.
- Store a focal point and fit mode per asset; hover zoom remains below 1.025.
- Keep all essential content visible without motion and flatten transforms under reduced motion/coarse pointers.
- Use opacity, transform, border, background, and color transitions only. No persistent blur, cursor trails, or ornamental motion.

## Page composition

### Home

- Hero: use the supplied surgical-instruments photograph, framed by the existing dark surface and a restrained contrast overlay. The text block and actions remain unchanged.
- Product families: use the five supplied family images. The display order becomes Knives, Scissors, Cutters, Chisels, Punches while keeping five existing card windows and correct routes. Sequence numbers follow the visible positions.
- Structured product information: replace the abstract geometry with the Rosa logo on a quiet white/paper brand plate, using `contain` and no crop.
- Catalogues: use a representative product image for each family, preserve existing content, and give every card a consistent image treatment.

### About

- Remove the complete buyer-expectations section.
- Replace the scissors-evolution section with an honest company-profile module: a concise Rosa introduction, a clear description of how buyers use the catalogue and inquiry flow, and visibly owner-editable content boundaries. It must not claim founding dates, certifications, manufacturing, stock, or delivery performance.
- Use the Rosa logo in the hero.
- Turn the four supported-buyer tiles into image-led editorial cards using the supplied photographs. Text remains legible through controlled gradients and position-specific focal points.
- Use the supplied collaboration photograph in the Procurement Support preview.

### Catalogues

- Catalogue document cards remain light initially and move smoothly to ink on hover/focus over roughly 280–340 ms.
- Catalogue covers become image-led without pretending that unavailable PDFs exist.
- In the document-led family index, no item is permanently red. The hovered or keyboard-focused row transitions to Rosa red, including its sequence, title, and directional action.

### Quotation

- Retain the existing POST boundary and success/error behavior.
- Build a real two-column business form: a readable introduction and grouped field surface on the left, a sticky selected-products summary on the right.
- Every live input receives the same field wrapper, label, focus state, autofill-safe color, and error-ready structure. Full-width country and notes fields avoid the current orphaned last cell.
- Submission confirmation and primary action form one deliberate closing panel. At tablet/mobile widths the summary moves below the form, controls become full width, and no horizontal overflow is allowed.
- Submission animation is limited to one entrance, button-label morph, error reveal, total-number update, and success acknowledgement.

### Procurement Support

- Use the supplied collaboration image in the hero.
- Preserve the six-step, four-request-type, checklist, routes, and final CTA content, but improve grouping, rhythm, hover/focus feedback, and visual sequencing.
- The six steps read as a connected process on wide screens and as a clean stacked route on small screens.

## Public media registry

The registry owns:

- `src`, `alt`, `focalPoint`, and `fit` for the home hero and brand logo.
- The five family-card assets and five catalogue-card assets.
- Four supported-buyer photographs.
- The procurement-support photograph.

Public components consume this registry rather than knowing filesystem filenames. Images are copied into `public/media/{brand,editorial,families}` with stable names.

## Admin audit boundary

Audit every admin navigation destination, route resolver, page model, empty/error/loading preview, responsive layout, owner-auth redirect, and API authorization test. Improve concrete issues found, especially configuration guidance and dead or ambiguous owner controls. Do not weaken authentication or simulate successful database mutations.

Without real Supabase owner credentials and production schema access, live persistence, RLS, storage replacement, and operational inquiry/message mutations cannot be truthfully certified. The run will fully verify repository-owned rendering, routing, authorization boundaries, model integrity, missing-configuration behavior, and available E2E routes.

## Accessibility and performance

- Meaningful images get precise alt text; decorative effects remain hidden.
- Hover behavior is duplicated with `:focus-visible` or `:focus-within`.
- Minimum interactive target size remains 44 px where controls are compact.
- Images use Next Image sizing and lazy loading except the home hero.
- No new runtime dependency; no continuous animation; no JS pointer loop for image interactions.
- Reduced-motion and coarse-pointer modes receive stable non-transform states.

## Acceptance criteria

1. The removed About sections no longer render, and the new company profile does.
2. The supplied logo and editorial images appear in every requested location with intentional fitting.
3. Home and Products family cards render in the requested visible order with correct labels, numbers, and destinations.
4. Both catalogue presentations contain five family images and smooth, accessible hover/focus transitions.
5. The document-led family index starts neutral and only the active item becomes red.
6. The live quotation form is visually structured, keyboard usable, responsive, and preserves working submission behavior.
7. Procurement Support reads as a designed page with restrained motion at desktop and mobile sizes.
8. Every admin route has been routed, rendered, and tested to the maximum available without external credentials; any external boundary is reported honestly.
9. Lint, typecheck, unit/static suites, production build, and targeted browser checks pass.
