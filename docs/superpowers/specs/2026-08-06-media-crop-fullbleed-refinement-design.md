# Media Crop and Full-Bleed Refinement Design

## Goal

Refine the already-approved Rosa Medical public design without changing its layout language. The pass removes visual framing that competes with the imagery, gives each instrument family an intentional crop, replaces decorative catalogue mockups with real product imagery, and makes repeated hover behavior consistent.

## Decisions

### Homepage hero

- Keep the current copy, actions, typography, section height, and dark tone.
- Present the surgical-instruments photograph as a full-height visual plane anchored to the viewport's right edge.
- Remove the spotlight/tilt frame and its visible border/padding.
- Blend the photograph into the black section with a wide left-side gradient, while retaining a subtle bottom tone for text contrast.
- On small screens, place the image below the copy at full viewport width with a top/left fade so the composition remains legible and does not overflow.

### Product-family cards

- Keep the approved card grid and family order.
- Request high-quality optimized images and use family-specific fitting instead of one shared crop rule.
- Knives: reveal the blade as the primary subject by changing the focal point and crop.
- Cutters: use the clean transparent derivative with contain fitting and generous breathing room so the full tool is visible.
- Punches: enlarge the instrument without cutting it off; center and enlarge the title in the wide final card.
- Keep the approved Chisels treatment.

### Catalogue imagery

- Homepage catalogue cards show real instrument imagery only; remove the paper/document-line decoration.
- The catalogue page uses a separate media registry because portrait catalogue covers need different sources and presentation from landscape family cards.
- Use the owner-supplied scissors and K-wire cutter files for their requested catalogue covers. Keep the existing knives, punches, and chisels sources with family-specific rotation/scale rules.
- Preserve readable sequence/title/action overlays and the established dark hover transition.

### Repeated catalogue links

- All five Product-page catalogue links start from the same neutral state.
- Each individual link transitions to Rosa red on hover/focus; no first-card persistent-red exception remains.
- Touch devices retain a neutral non-hover state.

### About hero logo

- Preserve the logo's visual scale.
- Remove its frame border and fixed portrait-shaped dead space.
- Center the logo optically alongside the About heading and let the media wrapper size to a square presentation.

## Accessibility and performance

- Keep semantic links, headings, alt text, visible focus behavior, and reduced-motion overrides.
- Use Next Image responsive sizes and a high-but-bounded quality setting for prominent family/catalogue imagery.
- Do not add runtime image manipulation, canvas effects, or continuous animation.

## Acceptance criteria

- The homepage hero image touches the right viewport edge and has no visible frame; its left edge fades into the section background.
- All five family-card instruments are legible at desktop and mobile sizes, with the full Punches and Cutters instruments visible.
- Homepage catalogue cards contain no fake document graphic and show five ready real images.
- All five Product-page catalogue links share the same initial color and individually transition to red.
- Catalogue-page cover sources and fitting match the owner instructions.
- The About logo has no border or unused portrait gap and remains centered beside the copy.
- Target pages have no horizontal overflow, broken images, console errors, or reduced-motion regressions.
