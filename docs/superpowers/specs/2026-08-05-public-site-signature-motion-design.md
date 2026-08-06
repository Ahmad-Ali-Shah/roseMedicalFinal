# Rosa Medical Public-Site Signature Motion Design

> **Superseded for implementation decisions.** The user clarified that the intended work is an effects-only enhancement, not the extension of new structural motifs. Use [`2026-08-05-public-site-motion-effects-research-audit.md`](./2026-08-05-public-site-motion-effects-research-audit.md) as the authoritative motion direction. This file remains historical context only.

**Date:** 2026-08-05
**Status:** Direction approved; implementation specification recorded
**Authoritative base:** `integration/main-premium-polish-reconciliation` at `4e67fc1`
**Scope:** Remaining public-site visual, motion, interaction, responsive, and performance refinement after the homepage pass

## 1. Outcome

Extend the quality established by the refined homepage across every remaining public route while preserving Rosa Medical's approved structure, content, palette, typography, product identity, quotation behavior, and medically credible tone.

The finished site should feel like one deliberately art-directed procurement experience. It should be memorable through precision, material detail, confident hierarchy, and selective motion rather than through visual noise or novelty effects.

The governing expression remains:

> **Editorial luxury with selective cinematic moments, sharpened into surgical precision.**

This pass enhances the current design faithfully. It is not a redesign, a new content phase, a search activation, a backend expansion, or a component-library transplant.

## 2. Fixed constraints

The following are non-negotiable:

- Preserve the existing information architecture, route inventory, section order, wording, product counts, product codes, product paths, form fields, submission payloads, and legal warnings.
- Preserve the established Lora and Inter typography, warm paper surfaces, ink, steel, hairlines, and Rosa signal red.
- Preserve all product imagery and media mappings; do not replace product binaries in this branch.
- Preserve honest placeholders and unavailable states. Do not imply available PDFs, working search, confirmed contact data, stock, delivery promises, certification, manufacturing history, or other unverified facts.
- Reuse the current Rosa motion primitives and `framer-motion`. Add no new animation or rendering dependency.
- Keep the header, footer, route transition, inquiry storage, contact submission, and quotation submission contracts intact.
- Keep content immediately available without hydration-dependent invisibility.
- Support reduced motion, keyboard use, touch, coarse pointers, and every existing responsive breakpoint.
- Avoid permanent animation loops, global pointer tracking, scroll-driven layout animation, heavy shadows, glassmorphism, neon, extreme tilt, cursor replacement, and effects that compete with product information.

## 3. Considered approaches

### A. Progressive signature system — selected

Carry the homepage's existing technical-editorial motifs into the remaining site selectively: measured indices, fine rails, framed media, asymmetric alignment, restrained metallic depth, and page-role-specific motion. Shared rules create coherence, while each route retains its existing composition.

This gives the best balance of distinctiveness, maintainability, performance, and fidelity.

### B. Bespoke cinematic treatment per page — rejected

Designing every route as an independent visual statement could create more isolated “wow” moments, but would increase duplication, inconsistency, regression risk, and long-term maintenance cost. It would also make the site feel like a sequence of demos rather than one brand system.

### C. External component-library transplant — rejected

Dropping in multiple registry effects would produce quick novelty but introduce mismatched styling, duplicate existing primitives, extra runtime weight, and design drift. Prior evaluation also identified permanent animation loops, GSAP requirements, theme coupling, and redundant effects in the suggested libraries.

## 4. System architecture

### 4.1 Existing primitives remain authoritative

Use the current motion system:

- `MotionProvider`
- `Reveal`
- `Stagger`
- `TextReveal`
- `Magnetic`
- `Tilt`
- `Spotlight`
- `ProgressiveBlur`
- `MediaFrame`
- `ScrollHeader`
- `RouteTransition`

Page components may compose these primitives, but must not create page-specific animation infrastructure. A new shared component or prop is justified only when the same semantic need appears on at least three surfaces.

### 4.2 Signature visual vocabulary

The homepage establishes a small vocabulary that can recur elsewhere:

- Fine red or steel section rails that organize long pages without becoming decoration.
- Two-digit, aria-hidden section indices used only where they clarify a sequence.
- Technical captions and metadata aligned to media edges.
- Quiet crop marks, registration ticks, and hairline frames around selected media or document surfaces.
- Shallow paper or metal depth created through border, tonal shift, and tiny transforms rather than large shadows.
- Asymmetric editorial grids and deliberate negative space.
- Restrained signal-red accents; red never becomes a broad background wash.

These motifs should never all appear in one section. Each section receives one primary motif and, at most, one supporting detail.

### 4.3 Motion density budget

Each viewport section may contain:

1. One entry behavior that explains reading order; and
2. One local response on an interactive or media surface.

Avoid stacking text reveal, parallax, tilt, glare, spotlight, and border motion on the same object. Once content has entered, reading surfaces remain calm.

Timing remains within the existing scale:

- Micro feedback: 120–180ms
- Component state: 220–320ms
- Section entry: 480–700ms
- Hero choreography: 800–1200ms
- Stagger: 40–90ms

### 4.4 Page intensity tiers

| Tier | Routes | Treatment |
| --- | --- | --- |
| Signature | `/products`, `/products/:family`, `/products/:family/:product`, `/catalogues`, `/about` | Strongest hierarchy, selected cinematic framing, staged reading order, restrained pointer depth |
| Operational | `/procurement-support`, `/inquiry`, `/request-quotation`, `/contact` | Clear sequencing and precise state feedback; forms and instructions remain stable |
| Quiet | `/search`, `/privacy`, `/terms` | Near-static editorial presentation, focus clarity, minimal entrance motion |

The homepage remains the visual peak. No secondary route should try to out-perform it.

## 5. Page treatment

### 5.1 Products overview

Preserve the hero, discovery toolbar, family index, preview grid, catalogue support, and procurement call-to-action.

Enhance it with:

- A technical title stage that relates to the homepage without copying the homepage hero.
- A restrained catalogue-axis treatment connecting the family index to product discovery.
- Clearer depth between the discovery toolbar, family cards, and preview products.
- Row-aware stagger and stable card metadata.
- Focus and hover states that emphasize border, crop, product media, and action direction without moving text.
- Section indices and rails only where they clarify the browse sequence.

The search link remains a link to the intentionally unavailable search preview. No filter or search behavior is activated.

### 5.2 Family listings

Preserve the family introduction, media hero, discovery controls, complete product inventory, and public loading/no-result examples.

Enhance it with:

- A framed family-media stage with a small technical caption and stable placeholder behavior.
- Stronger relationship between family identity, result count, discovery controls, and grid.
- A product-result rail that makes long inventories easier to scan.
- Product cards with quiet material response: shallow media scale, border compression, code emphasis, and a controlled arrow shift.
- Mobile layouts that remain in normal flow with simpler entrances and no perspective response.

All family and product paths, product counts, and placeholder states remain unchanged.

### 5.3 Product detail

Preserve breadcrumbs, gallery, product title and code, procurement options, add-to-inquiry behavior, specifications, procurement note, related products, final call-to-action, and mobile inquiry bar.

Enhance it with:

- A technical gallery frame with restrained crop details, item index, and media metadata.
- Deliberate opposing entrance order: gallery first, procurement summary second, controls last.
- More precise hierarchy around code, variant, size, quantity, and add action.
- Stable specification rows with scan-oriented dividers and subtle row response that does not shift values.
- Related-product staging that echoes the family grid without repeating the full page treatment.
- A mobile inquiry bar that appears calmly, respects footer space, and never obscures content.

The existing inquiry local-storage boundary and the “Added · View inquiry” transition remain exact.

### 5.4 Catalogues

Preserve all five catalogue documents, unavailable PDF buttons, search route, quotation route, and current truthfulness.

Enhance it with:

- A document-oriented hero with a measured filing/index motif.
- Paper-stack depth using hairlines, small offsets, and shadow compression.
- A subtle corner or document-indicator response on supported pointers.
- Clearer separation between catalogue identity, availability, and next action.
- A guidance section presented as a calm procurement sequence.

No PDF is made available and no empty download link is introduced.

### 5.5 Procurement support

Preserve the six procurement steps, four requirement types, six information items, every approved route, and honest media placeholder.

Enhance it with:

- A framed hero with modest opposing copy/media entrance.
- A single progress rail connecting numbered steps.
- Alternating offsets that remain subtle and collapse cleanly on mobile.
- Clear information grouping for product codes, quantities, variants, packing, destination, and timing context.
- Action surfaces that guide visitors toward products, inquiry, contact, or quotation without inventing service promises.

### 5.6 About

Preserve the current story, buyer expectations, scissors evolution, supported-buyer groups, family index, procurement preview, placeholders, and all truthfulness protections.

Enhance it with:

- Stronger continuity between the editorial hero and the company/buyer narrative.
- A measured progress line through the five scissors-evolution stages.
- Slow media-to-copy depth at entry only; dates and text settle completely afterward.
- Controlled section indices and material details that support craftsmanship without implying manufacturing history.
- A quieter final procurement transition that connects story to action.

This is the strongest story page, but it remains subordinate to the homepage.

### 5.7 Contact

Preserve the general contact form, POST behavior, reset behavior, placeholder contact information, location media placeholder, and quotation route.

Enhance it with:

- A calm editorial introduction and clearer distinction between general contact and product quotation.
- Precise focus-border and label feedback without floating-label novelty.
- Staged contact-information presentation.
- Restrained pending, success, and error feedback inside the existing functional boundary.
- A quiet location/media frame that continues to state its placeholder status honestly.

Active form fields must never tilt, scale, or animate their layout.

### 5.8 Inquiry

Preserve immediate local-storage updates, quantity controls, notes, removal, clear action, summary, and quotation route.

Enhance it with:

- Cleaner line-item hierarchy and stronger visual connection between quantity, notes, and removal.
- Existing layout transitions with tuned timing and no delayed state.
- Numeric transitions that remain polite to assistive technology.
- A stable desktop summary and an uncluttered mobile sequence.
- Explicit empty and ready states that feel intentional but remain functionally identical.

### 5.9 Request quotation

Preserve all field semantics, validation, checkbox, POST payload, pending/error/success states, reference display, and clear-after-success behavior.

Enhance it with:

- Section-level form staging rather than field-by-field animation.
- One shared focus treatment across every input.
- Compact button-state morphing with stable width where practical.
- A restrained success composition that emphasizes the reference and next steps.
- Error presentation that is immediate, readable, and never dependent on motion.

The page remains a quotation workflow and must not adopt ecommerce language.

### 5.10 Search

Preserve the explicitly unavailable search behavior and family shortcuts.

Enhance it only through:

- Clearer preview/unavailable-state hierarchy.
- Strong keyboard focus on family routes and future search affordances.
- Minimal entrance motion.

Do not create a simulated search, results, loading state, or false functionality.

### 5.11 Legal pages

Preserve every section, review warning, update placeholder, and current legal caveats.

Enhance only typography, anchor/focus clarity, sticky-navigation resilience, and a minimal page entrance. Do not add tilt, text splitting, staggered sections, cinematic media, or decorative motion.

### 5.12 Global shell

The existing header, mobile navigation, route transition, buttons, links, and footer already establish the shared interaction language. Changes are limited to fixing inconsistencies revealed by the page pass:

- Keep route changes short and non-blocking.
- Keep the header and footer stable.
- Preserve visible focus and touch targets.
- Keep footer actions unobscured by sticky mobile controls.
- Use common arrow, underline, border, and press feedback consistently.

## 6. Responsive and reduced-motion behavior

Desktop may use selected tilt, magnetic response, local spotlight, and shallow pointer depth.

Touch and coarse-pointer environments receive:

- No tilt or magnetic transforms.
- No pointer-following spotlight.
- Shorter travel distances and fewer simultaneous entrances.
- Normal-flow heroes and action groups.
- Product grids and forms optimized for scanning rather than spectacle.

Reduced-motion mode receives fully settled content:

- No transforms, blur, stagger delay, parallax, magnetic response, or pointer depth.
- Immediate route and state changes.
- All controls and content available at first render.

## 7. Performance model

- Animate transform and opacity only for frequent motion.
- Use existing intersection-observer-based primitives instead of page listeners.
- Keep pointer calculations local to hovered components and disabled on coarse pointers.
- Add no permanent `requestAnimationFrame` loop.
- Reserve media dimensions to prevent layout shift.
- Avoid scroll handlers that read and write layout each frame.
- Add no runtime dependency and no autoplay media.
- Keep server-rendered markup meaningful before client hydration.
- Prefer CSS for hairlines, crop marks, and small surface responses.

## 8. Implementation decomposition

### Phase A — Discovery and product system

Routes:

- `/products`
- `/products/:family`
- `/products/:family/:product`

Shared surfaces:

- Product/family cards
- Discovery controls
- Product gallery
- Specification and procurement panels
- Mobile inquiry action

This phase runs first because it defines the reusable visual grammar for the largest portion of the public site.

### Phase B — Procurement and conversion

Routes:

- `/catalogues`
- `/procurement-support`
- `/inquiry`
- `/request-quotation`
- `/contact`

This phase applies the product grammar to document, guidance, and form surfaces while protecting all operational behavior.

### Phase C — Story and utility

Routes:

- `/about`
- `/search`
- `/privacy`
- `/terms`

This phase gives About its controlled cinematic treatment and deliberately keeps search/legal presentation quiet.

### Phase D — Global restraint and optimization

- Cross-route density audit
- Desktop, tablet, and mobile visual review
- Coarse-pointer review
- Reduced-motion review
- Keyboard/focus review
- Horizontal-overflow and sticky-control review
- Performance and animation-loop audit
- Full unit, static, E2E, typecheck, lint, and production-build verification

Each phase is independently testable and should be committed as a coherent batch. Shared changes should land in the earliest phase that needs them to avoid repeated churn.

## 9. Verification contracts

### Test-first structural coverage

Before each implementation batch, extend or add focused tests that express the new shared structure and its invariants. Tests should validate semantic markers and contracts, not incidental class-name snapshots.

### Existing behavior that must continue to pass

- Products overview family and preview counts
- Complete family product inventory and product links
- Product code and add-to-inquiry behavior
- Five unavailable catalogue documents
- Six procurement steps and information groups
- About placeholders and five evolution stages
- Contact form submission boundary
- Inquiry persistence and immediate state updates
- Quotation POST payload, pending state, success reference, and clear-after-success behavior
- Search unavailability
- Legal section counts and warnings

### Browser verification

Representative routes are reviewed at desktop, tablet, and mobile sizes for:

- Visual hierarchy and page-to-page coherence
- No horizontal overflow
- No obscured footer or sticky actions
- Stable media geometry
- Keyboard focus visibility
- Settled reduced-motion output
- Disabled coarse-pointer transforms
- No hydration warnings

### Completion gate

The work is complete only when the targeted tests, the complete 75-file unit suite, relevant Playwright suites, lint, typecheck, and production build pass from the integrated branch, followed by a final browser review of every public route class.

## 10. Acceptance criteria

The implementation succeeds when:

- The current website remains immediately recognizable and structurally faithful.
- The homepage remains the visual peak while every public route now belongs to the same design system.
- Product discovery is clearer, richer, and more tactile without reducing credibility or scan speed.
- Forms and conversion flows feel polished without hiding or delaying state.
- About becomes memorable without inventing history or claims.
- Search and legal pages remain honest, calm, and readable.
- Motion communicates hierarchy, reading order, or state and never exists merely to move.
- Desktop interactions have depth; mobile and reduced-motion experiences remain composed and complete.
- No new animation dependency, performance-heavy loop, or broad backend/data change is introduced.
- Existing functional and accessibility contracts remain intact.
