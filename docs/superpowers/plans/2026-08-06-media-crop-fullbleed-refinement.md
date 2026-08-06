# Media Crop and Full-Bleed Refinement Implementation Plan

> Scope note: execute in the existing approved worktree and preserve all unrelated user changes. No commit, push, or merge is authorized by this task.

## 1. Lock regression expectations

- Extend homepage rendering tests to require a full-bleed hero shell and to reject the fake catalogue document decoration.
- Extend catalogue document tests to require the owner-supplied scissors and cutter media paths.
- Extend About rendering coverage for the dedicated unframed logo presentation.
- Extend browser QA to exercise all five catalogue mini cards and measure full-bleed hero geometry, About logo border/aspect, and responsive overflow.
- Run the focused tests and confirm they fail for the intended missing behavior.

## 2. Add catalogue-specific media assets and registry

- Copy the supplied scissors and K-wire cutter originals into `apps/web/public/media/catalogues/` without modifying the source files.
- Add a `CATALOGUE_MEDIA_BY_SLUG` registry so catalogue-cover presentation can differ from family-card presentation.
- Point the catalogue document model to the new registry.

## 3. Implement the full-bleed homepage hero

- Remove the spotlight and tilt wrappers from `HomeHero` while retaining the single reveal animation.
- Make the hero container composition extend the visual column to the viewport's right edge.
- Add left-edge and mobile gradient blending through CSS pseudo-elements/overlays.
- Keep the image eager, responsive, and high quality without introducing runtime effects.

## 4. Refine family and catalogue media presentation

- Add an optional quality property to `MediaFrame` and use it on prominent cards.
- Apply family-specific focal point, padding, scale, and title alignment rules for Knives, Punches, Chisels, and Cutters.
- Remove the homepage catalogue paper-copy markup and its CSS.
- Apply catalogue-cover-specific presentation rules for the five families, including portrait rotation where it improves legibility.

## 5. Normalize interaction and About logo styling

- Remove the first catalogue mini card's persistent red base state.
- Preserve a smooth, individual red hover/focus transition for every card and neutral touch behavior.
- Switch the About logo to a square media aspect, remove its border/dead space, and center it in the hero grid at desktop and mobile sizes.

## 6. Verify and refine

- Run focused Vitest files after each implementation slice.
- Use the in-app browser to inspect homepage, Products, Catalogues, and About at desktop and mobile sizes; take screenshots.
- Measure hero right-edge alignment, broken images, overflow, all five hover transitions, and the About logo's computed border/aspect.
- Run the broader web unit/static tests and production build.
- Review the final diff for accidental scope expansion and report exact verification evidence.
