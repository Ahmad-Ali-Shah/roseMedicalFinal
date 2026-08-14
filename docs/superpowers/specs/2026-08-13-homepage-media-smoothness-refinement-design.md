# Homepage Media + Smoothness Refinement — Design

**Date:** 2026-08-13
**Branch:** `frontend/client-homepage-compact-redesign`
**Parent redesign:** `docs/superpowers/specs/2026-08-13-client-homepage-compact-redesign-design.md`

## Goal

Keep the approved compact homepage layout intact while fixing the actual banner/Punches media failures, replacing the six temporary medical placeholders with client-JPG-style clinical photography, strengthening catalogue-cover hover feedback, and making motion/scroll interactions feel smoother and more deliberate.

## 1. Media failure — root cause and architecture

The failing homepage media path must no longer depend on SVG files that embed raster artwork. The client-provided hero images and Punches cover exist as direct raster source files, so the production path will use those assets directly.

### Hero source files

Use the exact client attachments as source masters:

- `Banner 1(1).png`
- `Banner 2(1).png`
- `Banner 4(1).png`
- `Banner 5(1).png`

Generate optimized production derivatives in AVIF and WebP. Preserve the full desktop compositions and create deliberate mobile crops from the same source masters.

The hero renderer returns to semantic `<picture>` / `<img>` media so the browser receives a conventional image resource, alt text exists in rendered markup, loading/preload behavior is straightforward, and the asset path is testable without CSS-variable background-image indirection.

### Punches cover

Use the newly supplied raster cover `Biopsy Catalog Cover.jpg(1).jpeg` as the source master; despite its filename, the attached artwork is the Punches catalogue cover supplied by the user. Generate direct AVIF/WebP catalogue-cover assets and render them with the same ordinary image path as the other four covers. Remove the Punches-only CSS background-image fallback once direct media is active.

No homepage hero or family-cover slot should rely on raster-in-SVG wrappers after this pass.

## 2. Placeholder photography — approved approach B

Photography should match the visual language of the client redesign JPG: close, clinical, grayscale/near-monochrome, professionally cropped, medically specific, and visually consistent. Avoid generic smiling-doctor stock photography.

Chosen direction/source candidates:

1. **Plastic Surgery** — close-up facial preparation / markings, like the client's eye/face reference. Preferred candidate: Pexels `hands-woman-face-professional-7585314` (blepharoplasty/facial preparation close-up).
2. **Orthopedics** — close-up orthopedic procedure, preferably joint/knee arthroscopy. Preferred candidate: Pexels `close-up-of-arthroscopic-knee-surgery-in-progress-30964336`.
3. **Maxillofacial** — clinical skull/jaw model rather than generic dentistry. Preferred candidate: Pexels `skulls-and-denture-cast-on-a-white-surface-6528857` or, if composition works better after crop, `jaw-model-in-transparent-skull-on-table-4687908`.
4. **Orthodontics** — close-up braces being examined with dental tools. Preferred candidate: Pexels `dentist-working-on-patient-teeth-with-brackets-19147369`.
5. **Spine** — clinician examining a spine X-ray. Preferred candidate: Pexels `a-doctor-looking-at-an-x-ray-4989186`.
6. **Securing Confidence** — gloved hand holding/using a precision surgical tool. Preferred candidate: Pexels `hand-in-a-glove-holding-a-tool-10292618`.

All selected source pages explicitly present the media as free-to-use Pexels stock. Before committing assets, download the highest practical source resolution, crop per slot, convert locally to AVIF/WebP, and keep attribution/source details in a small media provenance note in the repo.

### Image treatment

- grayscale or very low saturation;
- consistent contrast curve across all six;
- no excessive vignette or fake grain;
- crop around the actual clinical action/object;
- fixed aspect ratios matching the final section geometry;
- desktop and mobile crops only where materially needed;
- `object-fit: cover` with explicit focal points;
- meaningful localized alt text.

## 3. Catalogue hover refinement

The client-approved five-cover row stays structurally unchanged.

On fine-pointer hover/focus:

- image scale target: approximately `1.10–1.12`;
- duration: approximately `500–600ms`;
- emphasized ease consistent with the existing Rosa motion system;
- optional extremely small card lift/shadow increase only if it does not add layout movement;
- overflow remains clipped inside the portrait cover;
- keyboard focus gets the same visual emphasis;
- `prefers-reduced-motion: reduce` removes scale animation.

The effect should be visibly stronger than the current `1.035` override, but still premium rather than aggressive.

## 4. Motion and smoothness pass

Do not add a new animation library. Continue using `motion/react` and the existing `Reveal`, `Stagger`, and hero carousel infrastructure.

### Hero

- retain overlapping crossfade;
- media settles using transform + opacity only;
- copy rises subtly from below;
- no layout-affecting animation;
- preload the next real image resource;
- avoid persistent `will-change` outside elements that materially benefit from it;
- mobile and desktop use direct image assets, not CSS background URLs.

### Lower sections

- preserve Reveal/Stagger behavior already restored;
- normalize durations/easing so sections do not feel like separate animation systems;
- use only transform/opacity for entrance movement;
- keep entrance distances restrained;
- avoid animating width/height/top/left where transform can be used;
- preserve reduced-motion behavior.

### Interaction smoothness

- retain native scrolling;
- mobile family rail keeps native inertial scrolling + snap;
- avoid JS smooth-scroll libraries;
- keep pointer hover transitions GPU-friendly;
- audit unnecessary permanent `will-change` declarations;
- do not add global `scroll-behavior: smooth` to page navigation.

## 5. Test failures — classification and required cleanup

The supplied test run contains two different categories and they must not be treated the same.

### Genuine regressions to fix

- TypeScript compilation failures caused by retired homepage model type exports still imported by existing source files.
- Current redesigned tests that expect semantic hero image alt markup but no longer receive it because the hero was changed to a CSS background.
- Any test that targets the newly approved homepage and fails because real runtime behavior is broken.

### Obsolete contracts to update, not re-implement

Several tests still assert the previous homepage architecture, including:

- `procurement-support` and `catalogue-access` sections still existing on the homepage;
- previous five-family order;
- old desktop accordion/first-card expansion behavior;
- old hero asset names;
- old featured-product homepage model requirements.

Those assertions conflict with the client-approved compact redesign and must be updated to the new eight-section structure rather than forcing retired UI back into production.

### Verification target

After implementation:

- focused media/motion regression tests pass;
- `pnpm --filter @rosa/web lint` passes;
- `pnpm --filter @rosa/web typecheck` passes;
- relevant homepage/component Vitest suite passes;
- updated homepage Playwright acceptance passes across the existing viewport matrix;
- no unrelated admin/backend tests are weakened or deleted.

## 6. Scope constraints

- Do not redesign the homepage structure again.
- Do not reintroduce retired homepage sections simply to satisfy stale tests.
- Do not modify backend/API/admin behavior.
- Preserve Arabic/RTL, real social links, quotation flow, keyboard/touch behavior, and reduced-motion handling.
- Do not add YouTube or nonexistent footer routes.
- Keep all new imagery locally hosted after source acquisition/optimization; no runtime hotlinking to stock-photo CDNs.
