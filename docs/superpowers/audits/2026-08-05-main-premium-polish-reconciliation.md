# Main–Premium Visual Polish Reconciliation Audit

**Date:** 2026-08-05  
**Repository:** `manbtd0-cloud/RosaMedical`  
**Integration branch:** `integration/main-premium-polish-reconciliation`  
**Authoritative baseline:** `main`  
**Historical premium source:** `frontend/premium-visual-polish`  
**Historical live source requested by the owner:** repository branch `lived`

## 1. Executive conclusion

The requested visual-polish merge is already represented in Git ancestry: `frontend/premium-visual-polish` is a complete ancestor of current `main`. The branch named `lived` is an older ancestor of both.

The correct integration operation is therefore not a two-way content merge. It is a **main-dominant forensic reconciliation** that proves every approved F7 premium feature remains present, identifies every premium-owned file changed after the premium branch ended, and restores only an evidence-backed regression.

This audit found:

- all approved premium motion primitives remain present;
- all four F7 presentation stylesheets remain present;
- the global shell, homepage choreography, product motion, story-page treatment and conversion-flow polish remain integrated;
- every premium-owned runtime file changed after the premium branch was either repaired for deterministic reduced-motion/hydration behavior or extended with newer catalogue media and scissors-evolution work;
- no premium capability was found missing;
- no historical `lived` implementation should overwrite current `main`;
- no runtime source repair is required for this reconciliation;
- the integration branch should add only a durable preservation test and coordination documentation.

## 2. Source-of-truth order used

Conflicts were resolved in this order:

1. Ahmad's latest explicit instruction: use current `main` as the dominant live/secure baseline and preserve premium visual work.
2. Root `README.md` product, security, ownership and integration rules.
3. Approved premium design specification.
4. Approved premium implementation plan.
5. Git ancestry and per-file comparisons.
6. Current runtime implementation.
7. Existing F7 static, unit/component and browser tests.
8. Historical branch assumptions.

This prevents an old branch label from outranking actual repository history.

## 3. Exact branch lineage

| Ref | Commit | Role |
|---|---|---|
| `lived` | `4fec4fa534fc318ac8770dbad0e3287ea1b3e589` | Historical live ancestor |
| `frontend/premium-visual-polish` | `8707648430c2d7d9c696c27091138aaa915fb0b0` | Completed historical F7 premium source |
| `main` at integration-branch creation | `74a81545fcd861d99d5f2ab81aaa4c890e40d4cd` | Current authoritative integrated baseline |
| `integration/main-premium-polish-reconciliation` at creation | `74a81545fcd861d99d5f2ab81aaa4c890e40d4cd` | Isolated reconciliation branch before documentation |

GitHub comparisons returned:

| Comparison | Result |
|---|---|
| `lived...frontend/premium-visual-polish` | Premium is 258 commits ahead, 0 behind |
| `frontend/premium-visual-polish...main` | Main is 100 commits ahead, 0 behind |
| `lived...main` | Main is 358 commits ahead, 0 behind |

The verified topology is:

```text
lived
  └── frontend/premium-visual-polish
        └── main
              └── integration/main-premium-polish-reconciliation
```

### Merge consequence

A normal merge of `lived` into the integration branch contributes no unique commit. A normal merge of `frontend/premium-visual-polish` into the integration branch also contributes no unique commit. Checking out historical versions of conflicting files would instead discard newer work.

Accordingly:

- the integration branch remains based on `main`;
- historical branches are evidence sources, not dominant trees;
- later `main` implementations are retained unless they demonstrably removed an approved premium capability;
- no ancestry-only merge commit is manufactured to imply work that Git already contains.

## 4. Protected main-owned boundaries

The following areas are outside premium ownership and remain authoritative from `main`:

- `services/api/**`;
- `packages/contracts/openapi/**` source operations;
- generated contract semantics;
- Supabase clients, authentication guards and owner-identity boundaries;
- public quotation normalization, hashing and persistence;
- API routes and live persistence behavior;
- catalogue product registries and exact product data;
- catalogue-media manifests, approval records and binary assets;
- Cloudflare/OpenNext, middleware/proxy and deployment configuration;
- package versions and lockfile state;
- admin behavior and unrelated admin test reconciliation.

No file in those boundaries is changed by this reconciliation.

## 5. Approved premium intent

The approved F7 direction is:

> **Editorial luxury with selective cinematic moments.**

The system must feel like a serious international medical-procurement brand, not a component showcase, game interface, experimental portfolio or generic SaaS template.

The approved work intentionally preserves information architecture and product behavior while adding:

- coherent hierarchy-driven motion;
- cinematic but stable media framing;
- refined pointer and focus feedback;
- restrained route and section entrances;
- responsive visual restraint;
- reduced-motion and hydration safety;
- no competing animation libraries;
- no full-page smooth scrolling, heavy WebGL, neon, glitch or persistent decorative loops.

## 6. Premium motion-boundary matrix

Status terms:

- **Preserved unchanged:** current file is inherited through ancestry with no later runtime change affecting the capability.
- **Preserved and improved:** current file retains the premium capability and adds a verified safety, performance, media or functional improvement.
- **Superseded safely:** an implementation detail changed, but the approved user-facing capability remains and the replacement resolves a known defect.
- **Additive later work:** new post-premium functionality coexists without removing premium behavior.
- **Missing:** approved capability absent from current main.

| Capability / file | Current classification | Evidence and reconciliation decision |
|---|---|---|
| `motion-provider.tsx` | Preserved unchanged | Global Motion `reducedMotion="user"` and shared transition configuration remain available. |
| `motion.config.ts` | Preserved unchanged | Restrained durations, easing tuples, distances and intensity values remain the shared contract. |
| `types.ts` | Preserved unchanged | Motion direction, intensity and easing tuple types remain. |
| `reveal.tsx` | Superseded safely | Current implementation keeps semantic tags, `data-motion`, direction, shared timing, blur/offset entrance and viewport behavior. Server/client `useReducedMotion` branching was removed to eliminate hydration divergence; CSS now settles reduced-motion output. |
| `stagger.tsx` | Superseded safely | Ordered children, semantic tags, data attributes, CSS order variables and viewport stagger remain. Render-time reduced-motion branching was removed; the global reduced-motion layer neutralizes transforms and delays. |
| `text-reveal.tsx` | Superseded safely | One semantic heading, masked segments, word/line modes and stagger remain. Deterministic markup replaced render-time media-query branching, fixing the historical hydration issue. |
| `magnetic.tsx` | Preserved and improved | Desktop mouse response and local springs remain. Pointer handler becomes a no-op under reduced motion; deterministic MotionValues avoid server/client output differences. |
| `tilt-surface.tsx` | Preserved and improved | Restrained perspective and local pointer response remain; reduced-motion handler disables updates and CSS forces a settled transform. |
| `spotlight-surface.tsx` | Preserved unchanged | Local pointer-position CSS variables and reduced-motion guard remain. |
| `progressive-blur.tsx` | Preserved unchanged | Decorative edge blur remains semantically hidden. |
| `media-frame.tsx` | Preserved and improved | Stable aspect ratio, placeholder state, overlay, focal point, tone and media slot remain. Raw `<img>` was replaced by optimized Next.js `Image` with responsive `sizes` and priority support. |
| `scroll-header-controller.tsx` | Preserved unchanged | Passive scroll listener, requestAnimationFrame throttling and `data-scrolled` state remain. |
| `route-transition.tsx` | Superseded safely | Route-keyed content-only opacity/vertical/blur entrance remains. Deterministic markup replaced render-time reduced-motion branching; CSS provides immediate settled output. |
| `index.ts` | Preserved unchanged | All approved motion primitives remain exported from one Rosa-owned boundary. |

**Missing motion primitives:** none.

## 7. Styling and token matrix

| Capability / file | Classification | Evidence and reconciliation decision |
|---|---|---|
| `f7-premium-polish.css` | Preserved unchanged | Core motion surfaces, header, navigation, buttons, hero, cards, catalogue paper stack, CTA, coarse-pointer rules and reduced-motion rules remain. |
| `f7-product-polish.css` | Preserved unchanged | Product-grid, family, gallery, specification, Add-to-inquiry and mobile restraint rules remain. |
| `f7-story-polish.css` | Preserved unchanged | About/procurement/catalogue/contact/legal presentation and restraint rules remain. |
| `f7-conversion-polish.css` | Preserved unchanged | Inquiry lines, numeric transitions, sticky summaries, form focus lines, submit morph and success presentation remain. |
| `f7-reduced-motion-closeout.css` | Additive later safety work | Forces all motion targets and text segments to final visible state with no filter or transform. This closes the historical reduced-motion defect rather than removing motion for ordinary users. |
| `tokens.css` | Preserved | F7 motion timing/easing/distance variables remain available. |
| `globals.css` | Preserved and improved | New catalogue-media, scissors-evolution and reduced-motion styles are integrated; `f7-premium-polish.css` remains the final import, preserving cascade ownership. |

The current cascade order deliberately allows the premium layer to remain authoritative while separate closeout styles provide focused safeguards and media support.

## 8. Global shell matrix

| Approved feature | Classification | Current evidence |
|---|---|---|
| Root Motion provider | Preserved | `RootLayout` wraps content in `MotionProvider` while retaining the skip link. |
| Stable header and footer | Preserved | `PublicShell` keeps header/footer outside `RouteTransition`; only main content transitions. |
| Scroll-compressing header | Preserved | `ScrollHeaderController` drives `data-scrolled`; CSS reduces header height and adds separation. |
| Transparent home header | Preserved | Home-page CSS uses `body:has(.public-page--home)` for transparent pre-scroll state and solid scrolled state. |
| Desktop navigation underline movement | Preserved | `.nav-link::after` scales from right to left on hover/focus. |
| Stable button accessible names | Preserved | Button and ButtonLink retain visible children inside `.button__label`. |
| Button lift, label shift and press feedback | Preserved | F7 button rules retain hover/focus label movement and restrained active scale. |
| Full-height editorial mobile curtain | Preserved | `MobileNavigation` uses `AnimatePresence`, backdrop and `role="dialog"`/`aria-modal="true"` panel. |
| Escape close and focus return | Preserved | Keydown handler closes on Escape and restores trigger focus. |
| Body-scroll containment | Preserved | Body overflow is locked only while the menu is open and restored during cleanup. |
| Reduced-motion menu fallback | Preserved | Motion initial states are disabled for reduced-motion users and global CSS settles transforms. |

**Missing shell capability:** none.

## 9. Homepage choreography matrix

| Section | Approved behavior | Classification and current state |
|---|---|---|
| Hero | Eyebrow → masked heading → copy → CTAs → media; restrained magnetic actions, spotlight, tilt, blur | Preserved. `HomeHero` still composes `Reveal`, `TextReveal`, `Magnetic`, `SpotlightSurface`, `TiltSurface`, `MediaFrame` and `ProgressiveBlur` with staged delays. |
| Family discovery | Reading-order stagger, restrained card depth, independent title/arrow movement | Preserved. `Stagger`/`StaggerItem` wrap the family grid; `FamilyCard` retains tilt and spotlight surfaces; CSS retains independent micro-interactions. |
| Procurement support | Opposing reveals, process-line drawing, calm copy after arrival | Preserved. Media/copy enter from opposing directions; steps use ordered stagger; CSS retains the process line and restrained geometry response. |
| Featured instruments | Controlled stagger and restrained product depth | Preserved. Product preview grid remains staggered; card tilt and media scale remain small. |
| Catalogue access | Paper-stack depth, top-sheet movement, arrow advance, edge blur | Preserved. Catalogue cards retain `MediaFrame`, paper document geometry, stagger and progressive edge blur. |
| Final quotation CTA | One strong entrance, dark spotlight surface and one non-looping border trail | Preserved. CTA remains a single Reveal + SpotlightSurface; CSS trail responds only on hover/focus. |
| Section headings | Editorial masked reveal without changing semantic level | Preserved. `SectionHeading` still delegates to one semantic `TextReveal` heading. |

**Missing homepage capability:** none.

## 10. Product discovery and detail matrix

| Approved feature | Classification | Current state |
|---|---|---|
| Products title choreography | Preserved | Breadcrumb, eyebrow, masked H1 and supporting copy retain ordered Reveal/TextReveal composition. |
| Family and product grid spatial order | Preserved | Grid sections retain Stagger/StaggerItem wrappers and stable list semantics. |
| Restrained card perspective | Preserved | Family and product cards retain low-degree TiltSurface wrappers and coarse-pointer fallbacks. |
| Stable product names, codes and options | Preserved | Motion wrappers do not alter catalogue identity data. |
| Family hero media depth | Preserved | Copy and media retain opposing entrance directions and low-amplitude tilt. |
| Product detail entrance order | Preserved | Breadcrumbs, gallery and summary retain explicit Reveal boundaries and staged delays. |
| Product gallery depth | Preserved and improved | Tilt remains; current approved AVIF/WebP catalogue assets are wired into thumbnails and primary media. |
| Family-card media | Preserved and improved | Existing motion wrapper now receives current catalogue media path, fallback path, sprite index and responsive sizes. |
| Add-to-inquiry morph | Preserved | AnimatePresence still transitions from “Add to inquiry” to “Added · View inquiry” without changing storage behavior. |
| Related-product choreography | Preserved | Related grids remain inside premium Reveal/Stagger boundaries. |
| Mobile product action restraint | Preserved | Existing mobile-action implementation and F7 browser tests remain; no historical overwrite occurred. |

**Missing product capability:** none.

## 11. Story, utility and legal matrix

| Domain | Classification | Current state |
|---|---|---|
| About hero | Preserved | Breadcrumb, eyebrow, masked H1, copy and media-ready frame remain. |
| About expectations and buyer lists | Preserved | Reveal/Stagger structures and numbered editorial line treatment remain. |
| Scissors evolution | Additive later work | A truthful, non-dated responsive `ScissorsEvolution` section was added after premium and does not replace premium framing. |
| Procurement support page | Preserved | Media-ready hero, title reveal, process/list motion and restrained final CTA remain. |
| Catalogue page | Preserved | Editorial intro, masked heading, document-card depth and guidance entrance remain. |
| Contact page | Preserved | Hero sequence, staggered information/form regions, focus-line treatment and media frame remain. |
| Legal pages | Preserved | One calm hero entrance and minimal section reveals remain; no cinematic pointer effects were introduced. |

**Missing story or utility capability:** none.

## 12. Inquiry and quotation conversion matrix

| Approved feature | Classification | Current state |
|---|---|---|
| Inquiry heading entrance | Preserved | Motion wrapper retains short opacity/vertical entrance. |
| New inquiry-line entrance | Preserved | Each line retains `initial`, `animate`, layout animation and short transition. |
| Smooth removal | Preserved | AnimatePresence exit collapses opacity, height, spacing, padding and border. |
| Quantity transition | Preserved | Keyed `motion.output` updates visually while the DOM value remains current. |
| Summary-number transition | Preserved | Product-count and total-quantity outputs remain keyed and live. |
| Sticky desktop summary | Preserved | Conversion CSS keeps inquiry and quotation summaries sticky above the desktop breakpoint. |
| Fieldset-level form reveal | Preserved | Quotation form reveals by fieldset, not individual input. |
| Submit-state label morph | Preserved | AnimatePresence swaps ready and submitting labels inside the button. |
| Error reveal | Preserved | Error alert enters/exits with restrained movement. |
| Success reveal | Preserved | Success content and check mark retain one restrained entrance. |
| Existing submission behavior | Preserved from main | Reconciliation does not alter the current normalized public quotation API boundary. |

**Missing conversion capability:** none.

## 13. Responsive, accessibility and performance matrix

| Requirement | Classification | Evidence |
|---|---|---|
| `prefers-reduced-motion` respected globally | Preserved and strengthened | MotionConfig respects user preference; F7 CSS removes transitions and current closeout CSS forces all targets to final visible state. |
| No essential content hidden before hydration | Preserved and strengthened | Reveal/TextReveal/Stagger server markup remains visible; render-time media-query branching was removed. |
| No reduced-motion blur/translation | Preserved and strengthened | `f7-reduced-motion-closeout.css` sets `filter:none` and `transform:none` with `!important`. |
| Coarse pointers avoid magnetic/tilt/spotlight tracking | Preserved | Pointer handlers require mouse; CSS neutralizes transforms and hides spotlight effect. |
| Mobile receives fewer effects | Preserved | Product/family/card transforms are removed at mobile breakpoints and touch rules. |
| Focus visibility and semantics | Preserved | Motion wrappers retain semantic element selection and pass relevant ARIA attributes. |
| Media dimensions reserved | Preserved | MediaFrame uses explicit aspect states; product media wrappers use positioned Next Image. |
| No permanent decorative animation loop | Preserved | Scroll state is event-driven; pointer tracking is local; no global RAF loop or autoplay video was added. |
| Transform/opacity preferred | Preserved | Entrance and interaction motion remains based on transforms, opacity and filter rather than scroll-driven layout properties. |

## 14. Post-premium changed-file review

The comparison `frontend/premium-visual-polish...main` shows `main` 100 commits ahead and 0 behind. Most additions are catalogue media, product data, validation, tests, scripts and the scissors-evolution section.

Premium-owned runtime files changed after the historical premium tip were reviewed individually:

| File | Later change | Decision |
|---|---|---|
| `apps/web/src/features/motion/reveal.tsx` | Deterministic render; removed `useReducedMotion` markup branch | Keep main. Fixes hydration/reduced-motion defect. |
| `apps/web/src/features/motion/stagger.tsx` | Deterministic render and CSS-controlled reduced motion | Keep main. Retains ordered stagger for ordinary users. |
| `apps/web/src/features/motion/text-reveal.tsx` | Deterministic markup; CSS final-state fallback | Keep main. Removes historical segment hydration issue. |
| `apps/web/src/features/motion/route-transition.tsx` | Deterministic initial markup | Keep main. Preserves route transition and avoids server/client mismatch. |
| `apps/web/src/features/motion/magnetic.tsx` | Deterministic MotionValue style | Keep main. Reduced-motion handler and CSS still neutralize response. |
| `apps/web/src/features/motion/tilt-surface.tsx` | Deterministic MotionValue style | Keep main. Reduced-motion handler and CSS still neutralize response. |
| `apps/web/src/features/motion/media-frame.tsx` | Next Image, responsive sizes and priority | Keep main. Performance/accessibility improvement. |
| `apps/web/src/app/globals.css` | Added catalogue media, scissors evolution and reduced-motion closeout imports | Keep main. Premium stylesheet still last. |
| `apps/web/src/features/about/about-page.tsx` | Added ScissorsEvolution | Keep main. Approved additive story section. |
| `apps/web/src/features/family-listing/family-product-card.tsx` | Connected current catalogue media and size metadata | Keep main. Preserves premium wrapper and adds current data. |
| `apps/web/src/features/product-detail/product-gallery.tsx` | Connected current catalogue media | Keep main. Preserves tilt and gallery composition. |
| `.github/workflows/temporary-f7-checkpoint.yml` | Diagnostics scope changed | Not a premium runtime feature. Current failures are tracked separately. |
| F7 tests | Updated for deterministic reduced motion and current product media | Keep main. Tests represent current integrated behavior. |

No reviewed change justifies restoring a historical premium version.

## 15. Verification evidence

### 15.1 Successful integrated premium checkpoint

Workflow run `30853574029` checked out `integration/final-production-closeout` at commit:

```text
98eae790d6ee271721c3e5bc42c3351798aa4b28
```

Observed results:

```text
F7 stylesheet checks: 4 passed, 0 failed
Lint: passed
Vitest files: 75 passed, 0 failed
Vitest tests: 344 passed, 0 failed
Strict TypeScript: passed
Production build: passed
Playwright tests: 58 passed, 2 intentional skips, 0 failed
```

The browser matrix covered:

- premium public shell;
- homepage polish;
- product polish;
- story pages;
- conversion flow;
- reduced motion;
- responsive restraint;
- Scissors, Chisels, Cutters, Knives and Punches catalogue journeys.

### 15.2 Runtime-drift check after the successful checkpoint

Comparison of `98eae790d6ee271721c3e5bc42c3351798aa4b28...main` returned 24 later commits. The changed files were limited to:

- the temporary diagnostics workflow;
- static admin policy tests;
- route inventory/manifests;
- catalogue/admin route browser tests;
- route smoke tests;
- closeout progress documentation.

No premium runtime component or F7 stylesheet changed after the successful checkpoint. Therefore the successful premium runtime evidence remains applicable to current main, while fresh reconciliation-specific checks are still required before final completion.

### 15.3 Current unrelated diagnostics failure

Current main workflow run `30860268238` failed four temporary admin jobs:

- admin foundation;
- catalogue management;
- operations;
- governance.

The admin-foundation log demonstrates stale expectations for the earlier static-admin phase, including:

- expecting explanatory text stating that noindex metadata is not access control;
- expecting zero forms and a disabled sign-in button;
- expecting twelve visible admin-navigation links on unauthenticated routes;
- expecting product-management routes to remain informational.

Current live/protected admin behavior no longer matches those static-preview assumptions. These failures do not execute the premium public matrix and are not caused by any reconciliation branch change. They are recorded as a pre-existing separate test-maintenance issue and are not modified here.

## 16. Existing premium test inventory

The current repository retains focused coverage for:

### Static and unit/component contracts

- `f7-motion-config.test.ts`
- `f7-motion-primitives.test.tsx`
- `f7-motion-surfaces.test.tsx`
- `f7-motion-restraint.test.ts`
- `f7-premium-styles.static.test.mjs`
- `f7-public-shell.test.tsx`
- `f7-homepage-motion.test.tsx`
- `f7-product-polish.test.tsx`
- `f7-story-pages.test.tsx`
- `f7-conversion-polish.test.tsx`

### Browser contracts

- `f7-public-shell.spec.ts`
- `f7-homepage-polish.spec.ts`
- `f7-product-polish.spec.ts`
- `f7-story-pages.spec.ts`
- `f7-conversion-polish.spec.ts`
- `f7-reduced-motion.spec.ts`
- `f7-responsive-restraint.spec.ts`

The reconciliation adds one cross-domain static gate so a future change cannot silently remove an entire premium layer while isolated tests continue to pass.

## 17. Runtime-repair decision

**Decision: no runtime source repair is required.**

Reasoning:

1. Git ancestry proves the premium branch is fully included.
2. Every approved premium domain remains represented in current source.
3. Every later-modified premium-owned runtime file was inspected.
4. Later changes are safety, performance, media or approved additive improvements.
5. The complete premium public matrix passed at the last runtime checkpoint.
6. No premium runtime source changed after that checkpoint.
7. Replacing current files with historical variants would reintroduce known hydration, reduced-motion, raw-image or missing-media problems.

The correct branch delta is therefore documentation plus one preservation gate, not a speculative visual rewrite.

## 18. Final preservation matrix summary

| Domain | Preserved | Improved | Missing | Runtime repair required |
|---|---:|---:|---:|---:|
| Motion foundation | Yes | Yes | 0 | No |
| Global shell/navigation | Yes | Yes | 0 | No |
| Homepage cinematic pass | Yes | Yes through later media readiness | 0 | No |
| Product discovery/detail | Yes | Yes through catalogue-media integration | 0 | No |
| About/story/utility/legal | Yes | Yes through ScissorsEvolution | 0 | No |
| Inquiry/quotation conversion | Yes | Current main behavior retained | 0 | No |
| Responsive/reduced-motion/accessibility | Yes | Yes, materially strengthened | 0 | No |
| Backend/security/contracts/deployment | Preserved from main | Not changed by this task | N/A | No |

## 19. Scope confirmation

This audit does not change:

- `main`;
- `lived`;
- `frontend/premium-visual-polish`;
- `services/api/**`;
- OpenAPI source;
- shared contract semantics;
- authentication or public-account policy;
- quotation persistence;
- catalogue product data;
- catalogue media;
- admin behavior;
- deployment configuration.

It establishes the evidence required to safely retain current `main` as the complete and superior integrated result.