# Rosa Medical Figma Foundations and Homepage Production Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the production-quality Figma foundation, reusable public-site component library, and approved desktop/mobile homepage for Rosa Medical.

**Architecture:** This plan creates one Figma design file with isolated pages for foundations, components, desktop homepage, mobile homepage, and review/archive material. Design decisions are recorded in a Git-tracked manifest so the editable Figma source and implementation handoff remain synchronized. Product catalogue screens, inquiry flows, the admin dashboard, and Arabic/RTL adaptation will receive separate plans after the homepage direction is approved.

**Tech Stack:** Figma Design, Figma Variables, Auto Layout, reusable components and variants, interactive prototypes, GitHub design manifest, uploaded ROSA raster logo, professional placeholder imagery.

## Global Constraints

- Public brand name: **Rosa Medical**.
- Use the supplied **ROSA** logo as-is; do not add “Medical” into, under, or beside the logo.
- Do not mention Rosa Sanitaryware, Rosa International, Throhi, ownership, partnerships, or a “Rosa family” in public-facing design copy.
- Rosa Sanitaryware is a behavioral reference only; do not reproduce its weak template sections, inconsistent details, or dated patterns.
- Position Rosa Medical as a **medical instruments supplier and procurement partner**.
- Primary product navigation is by instrument family: Knives, Scissors, Punches, Chisels, Cutters.
- The public design is editorial-first, premium, composed, mostly light, product-led, and credible for medical procurement.
- Use Rosa red selectively; do not flood sections with red.
- Do not use fake statistics, testimonials, certifications, regulatory claims, factory claims, awards, export counts, or years-in-business claims.
- Do not use glassmorphism, decorative blobs, excessive gradients, constant floating elements, dramatic cursor effects, heavy parallax, generic doctor photography, or repeated rounded cards.
- No public prices, ratings, discounts, ecommerce promotions, or stock claims.
- The hero begins with one dominant editorial image and transparent navigation that becomes solid white on scroll.
- Phase 1 is English; every layout must remain structurally safe for later Arabic/RTL adaptation.
- Desktop master frame: 1440 px. Mobile master frame: 390 px.
- Use professional image placeholders; replacing them later must not require layout redesign.
- Every section must support brand clarity, product discovery, procurement credibility, or quotation conversion.

## Scope Boundary

This plan includes:

1. Figma file and page architecture
2. ROSA logo cleanup and asset board
3. Design variables, text styles, effects, and grid
4. Core public-site components
5. Visual direction board
6. Desktop homepage wireframe
7. Desktop homepage high-fidelity design
8. Mobile homepage high-fidelity design
9. Prototype interactions, accessibility review, and developer handoff notes

This plan excludes:

- Full Products overview/category/detail screens
- Catalogue-download page
- Inquiry basket and quotation form screens
- About and Contact inner pages
- Admin dashboard UI
- Arabic/RTL screens
- Website code implementation

Each excluded subsystem receives its own plan after the homepage visual direction is accepted.

---

## File Structure

### Figma file

Create one design file named:

`Rosa Medical — Website Design System`

Create pages in this exact order:

1. `00 — Cover & Index`
2. `01 — Brand & Direction`
3. `02 — Foundations`
4. `03 — Components`
5. `04 — Home / Wireframe`
6. `05 — Home / Desktop`
7. `06 — Home / Mobile`
8. `07 — Prototype & Handoff`
9. `90 — Archive`

### Repository documentation

Create during execution:

- `docs/design/rosa-medical-figma-manifest.md` — Figma URL, page list, node IDs, tokens, fonts, component names, approval status, and unresolved content replacements.
- `docs/design/rosa-medical-homepage-content.md` — exact approved homepage copy and placeholder labels used in Figma.
- `docs/design/rosa-medical-homepage-qa.md` — desktop/mobile visual QA and accessibility results.

---

### Task 1: Create the Figma File and Design Manifest

**Files:**
- Create: `docs/design/rosa-medical-figma-manifest.md`

**Interfaces:**
- Consumes: approved design specification at `docs/superpowers/specs/2026-07-30-rosa-medical-website-design.md`
- Produces: Figma file key/URL and stable page naming used by all later tasks

- [ ] **Step 1: Resolve the authenticated Figma plan**

Call Figma `whoami`. If exactly one eligible plan is returned, use its `key`. If more than one eligible plan is returned, stop and ask Ahmad which team/organization should own the file.

- [ ] **Step 2: Create the design file**

Create a Figma design file named exactly:

`Rosa Medical — Website Design System`

Place it in the selected Figma plan’s drafts unless a project folder is explicitly supplied.

- [ ] **Step 3: Create and order pages**

Create the nine pages listed in **File Structure**. Delete or rename the default page so there are no unnamed pages.

- [ ] **Step 4: Build the cover frame**

On `00 — Cover & Index`, create a 1440 × 1024 cover frame containing:

- Supplied ROSA logo
- Title: `Rosa Medical`
- Subtitle: `Website Design System`
- Status: `Homepage design phase`
- Date: `30 July 2026`
- A compact index listing all Figma pages
- A red status chip reading `Approved direction`

The cover must use warm white, near-black, and Rosa red only.

- [ ] **Step 5: Create the Git-tracked manifest**

Create `docs/design/rosa-medical-figma-manifest.md` with this exact initial structure:

```markdown
# Rosa Medical Figma Manifest

- Figma file: [Rosa Medical — Website Design System](FIGMA_URL)
- File key: `FIGMA_FILE_KEY`
- Current phase: Foundations and homepage
- Last updated: 2026-07-30

## Pages

1. 00 — Cover & Index
2. 01 — Brand & Direction
3. 02 — Foundations
4. 03 — Components
5. 04 — Home / Wireframe
6. 05 — Home / Desktop
7. 06 — Home / Mobile
8. 07 — Prototype & Handoff
9. 90 — Archive

## Approval Status

- Design specification: approved
- Visual direction: pending
- Desktop wireframe: pending
- Desktop high fidelity: pending
- Mobile high fidelity: pending

## Asset Status

- ROSA logo: supplied raster, transparent cleanup required
- Hero imagery: professional placeholder
- Category imagery: professional placeholders
- Product imagery: neutral product placeholders
- Contact information: clearly labelled placeholder data
```

Replace `FIGMA_URL` and `FIGMA_FILE_KEY` with the real values before committing.

- [ ] **Step 6: Verify file structure**

Use Figma metadata inspection and confirm:

- File name is exact
- Nine pages exist
- Page order is exact
- Cover frame exists at 1440 × 1024
- No unnamed or accidental pages remain

- [ ] **Step 7: Commit documentation**

```bash
git add docs/design/rosa-medical-figma-manifest.md
git commit -m "docs: record Rosa Medical Figma workspace"
```

---

### Task 2: Clean and Prepare the ROSA Logo and Asset Board

**Files:**
- Modify: `docs/design/rosa-medical-figma-manifest.md`

**Interfaces:**
- Consumes: `/mnt/data/WhatsApp Image 2026-07-30 at 5.04.41 PM.jpeg`
- Produces: transparent ROSA logo asset, monochrome-safe usage guidance, placeholder image system

- [ ] **Step 1: Clean the supplied raster logo**

Remove the white background while preserving:

- Original rose symbol
- Original black `ROSA` wordmark
- Original red colour
- Original spacing and proportions

Do not redraw, reshape, add `Medical`, or alter the symbol.

Export working assets as:

- Transparent PNG for light backgrounds
- White-background PNG for documents
- A temporary monochrome-black version only for usage testing

- [ ] **Step 2: Place logo assets in Figma**

On `01 — Brand & Direction`, create an `Logo Assets` section with:

- `Logo / Primary / Transparent`
- `Logo / Primary / White Background`
- `Logo / Test / Monochrome`
- Clear-space diagram using the rose symbol height as the minimum clear-space unit
- Minimum digital width recommendation of 112 px

Add a visible note:

`Use the supplied ROSA artwork without adding a Medical descriptor.`

- [ ] **Step 3: Create placeholder image families**

Create labelled placeholder frames for:

- `Image / Hero / 16:9 / Editorial`
- `Image / Category / 4:5 / Instrument Family`
- `Image / Product / 1:1 / Isolated Instrument`
- `Image / Procurement / 4:3 / Inspection or Packing`
- `Image / CTA / 3:2 / Detail`

Use neutral photographic placeholders with steel, black, soft grey, and controlled red reflections. Avoid doctors, operating-room drama, blood, patients, and unverifiable factory imagery.

- [ ] **Step 4: Add replacement guidance**

Each placeholder must include a small internal label describing:

- Required aspect ratio
- Safe text/crop zone
- Recommended subject placement
- Whether a dark overlay is required

- [ ] **Step 5: Visual QA**

Confirm:

- Logo edges remain clean at 100%, 200%, and 400% zoom
- No white halo remains around the raster mark
- Transparent logo is readable on warm white and hero imagery
- Placeholder labels are visible in Figma but excluded from final export frames

- [ ] **Step 6: Update manifest and commit**

Record the logo asset node IDs and status as `cleaned` in the manifest.

```bash
git add docs/design/rosa-medical-figma-manifest.md
git commit -m "docs: record Rosa brand assets and placeholder system"
```

---

### Task 3: Build Foundations, Variables, Grids, and Text Styles

**Files:**
- Modify: `docs/design/rosa-medical-figma-manifest.md`

**Interfaces:**
- Consumes: cleaned logo assets and approved visual direction
- Produces: named design variables/styles used by every component and homepage frame

- [ ] **Step 1: Create colour variables**

Create collection `Rosa / Colour` with these variables:

| Variable | Value | Usage |
|---|---:|---|
| `brand/red/600` | `#E00815` | Primary CTA, active controls, brand accents |
| `brand/red/700` | `#BE0611` | Hover/pressed state |
| `brand/red/050` | `#FDECEE` | Subtle selected background only |
| `neutral/ink/950` | `#191917` | Main text and dark surfaces |
| `neutral/ink/800` | `#30302D` | Secondary headings |
| `neutral/steel/600` | `#666B70` | Supporting copy and technical text |
| `neutral/steel/400` | `#9DA1A5` | Muted metadata |
| `neutral/line/200` | `#DFDFDA` | Borders and dividers |
| `neutral/line/100` | `#ECECE8` | Subtle separators |
| `neutral/warm/050` | `#F7F6F2` | Warm page background |
| `neutral/warm/025` | `#FBFAF7` | Elevated light section |
| `neutral/white` | `#FFFFFF` | Cards and header |
| `state/success` | `#2F6B4F` | Success feedback only |
| `state/error` | `#B42318` | Form errors only |
| `overlay/hero` | `rgba(11,11,10,0.48)` | Hero readability overlay |

- [ ] **Step 2: Create spacing and size variables**

Create collection `Rosa / Dimension`:

`space/0 = 0`, `space/4 = 4`, `space/8 = 8`, `space/12 = 12`, `space/16 = 16`, `space/20 = 20`, `space/24 = 24`, `space/32 = 32`, `space/40 = 40`, `space/48 = 48`, `space/64 = 64`, `space/80 = 80`, `space/96 = 96`, `space/120 = 120`, `space/160 = 160`.

Create radii:

`radius/0 = 0`, `radius/2 = 2`, `radius/6 = 6`, `radius/12 = 12`, `radius/999 = 999`.

Use `radius/999` only for tiny status chips and circular icon buttons; do not use pill-shaped containers as the main site language.

- [ ] **Step 3: Establish typography**

Use:

- Display/editorial: `Newsreader`
- Interface/body: `Inter`

Create these text styles:

| Style | Font | Size / Line | Weight |
|---|---|---:|---|
| `Display/Hero` | Newsreader | 72 / 76 | Medium |
| `Display/H1` | Newsreader | 60 / 66 | Medium |
| `Display/H2` | Newsreader | 48 / 54 | Medium |
| `Display/H3` | Newsreader | 36 / 42 | Medium |
| `Heading/H4` | Inter | 24 / 32 | Semi Bold |
| `Heading/H5` | Inter | 20 / 28 | Semi Bold |
| `Body/Large` | Inter | 18 / 30 | Regular |
| `Body/Default` | Inter | 16 / 26 | Regular |
| `Body/Small` | Inter | 14 / 22 | Regular |
| `Label/Default` | Inter | 14 / 20 | Medium |
| `Label/Small` | Inter | 12 / 18 | Medium |
| `Technical/Code` | Inter | 13 / 20 | Medium |
| `Navigation` | Inter | 14 / 20 | Medium |
| `Button` | Inter | 14 / 20 | Semi Bold |

Desktop hero maximum line length: 11–13 words per line. Body copy maximum width: 640 px.

- [ ] **Step 4: Create desktop and mobile grids**

Desktop frame:

- Width: 1440 px
- Content width: 1248 px
- Margins: 96 px
- Columns: 12
- Gutter: 24 px

Mobile frame:

- Width: 390 px
- Side margins: 20 px
- Columns: 4
- Gutter: 12 px

- [ ] **Step 5: Create effects**

Create:

- `Shadow/Subtle`: `0 8 30 rgba(25,25,23,0.06)`
- `Shadow/Header`: `0 1 0 rgba(25,25,23,0.08)`
- `Shadow/Overlay`: `0 12 40 rgba(10,10,9,0.14)`

Do not use stronger shadows in the public homepage.

- [ ] **Step 6: Build a foundations specimen**

On `02 — Foundations`, show every colour, text style, grid, spacing group, radius, and effect with its exact variable/style name.

- [ ] **Step 7: QA foundations**

Confirm:

- White text on `brand/red/600` meets AA for button-size text
- `neutral/ink/950` on light backgrounds exceeds AA
- Body text is never below 16 px in final desktop/mobile content
- Every component built later uses variables/styles rather than detached values

- [ ] **Step 8: Update manifest and commit**

Record fonts, token names, and foundations page node ID.

```bash
git add docs/design/rosa-medical-figma-manifest.md
git commit -m "docs: record Rosa Medical design foundations"
```

---

### Task 4: Build the Core Public-Site Component Library

**Files:**
- Modify: `docs/design/rosa-medical-figma-manifest.md`

**Interfaces:**
- Consumes: colour, dimension, typography, grid, and effect foundations
- Produces: reusable component variants used by desktop/mobile homepage frames

- [ ] **Step 1: Create button component set**

Create `Button` variants with properties:

- `Style = Primary | Secondary Light | Secondary Dark | Text`
- `Size = Medium | Large`
- `State = Default | Hover | Pressed | Focus | Disabled`
- `Icon = None | Leading | Trailing`

Primary large button:

- Height: 52 px
- Horizontal padding: 24 px
- Radius: 6 px
- Background: `brand/red/600`
- Text: `neutral/white`

Focus state must include a visible 2 px outer focus ring.

- [ ] **Step 2: Create navigation components**

Create:

- `Header / Desktop / Transparent`
- `Header / Desktop / Solid`
- `Header / Mobile / Transparent`
- `Header / Mobile / Solid`
- `Navigation Link / Default | Hover | Active | Focus`
- `Icon Button / Search`
- `Icon Button / Basket` with `Count = 0 | 1–9 | 9+`
- `Language Trigger / Hidden Phase 1 | English | Arabic`

The Phase 1 homepage uses `Language Trigger / Hidden Phase 1`, but the component remains available for later Arabic work.

- [ ] **Step 3: Create category tile component**

Create `Category Tile` variants:

- `Layout = Large Landscape | Portrait | Compact Mobile`
- `State = Default | Hover | Focus`
- Text fields: family name and `Explore family`
- Image fill uses `Image / Category / 4:5 / Instrument Family`

Use a restrained image darkening layer and a bottom-aligned title. No floating badge or decorative category number.

- [ ] **Step 4: Create product preview card**

Create `Product Card / Preview` containing:

- 1:1 product image area
- Product name
- Product code
- Variant/size summary
- `View Details` text action
- `Add to Inquiry` button

Variants:

- `Layout = Desktop | Mobile`
- `State = Default | Hover | Focus`
- `Inquiry = Not Added | Added`

No price, rating, discount, availability badge, or promotional label.

- [ ] **Step 5: Create catalogue card**

Create `Catalogue Card` containing:

- Instrument family name
- Document descriptor: `Product catalogue`
- Page-count placeholder hidden until verified
- `View catalogue`
- `Download PDF`
- A restrained document-cover visual block using the family accent only as a small detail

Variants: `Desktop | Mobile`, `Default | Hover | Focus`.

- [ ] **Step 6: Create process step component**

Create `Procurement Step` with:

- Step number `01`, `02`, or `03`
- Title
- One-sentence description
- Thin divider

No icons and no decorative timeline line.

- [ ] **Step 7: Create footer and section primitives**

Create:

- `Section Header / Left`
- `Section Header / Split`
- `Section Header / Centered` only for final CTA usage
- `Footer / Desktop`
- `Footer / Mobile`
- `Image Placeholder` variants from Task 2
- `Inline Link`
- `Divider`

- [ ] **Step 8: Component QA**

For every interactive component, verify:

- Default, hover, focus, pressed, and disabled states are visually distinct where relevant
- Focus is never communicated by colour alone
- Auto Layout supports longer Arabic text later
- Text layers use component properties where practical
- Component naming is exact and consistent
- No detached instances appear in final homepage frames

- [ ] **Step 9: Update manifest and commit**

Record component-set names and node IDs.

```bash
git add docs/design/rosa-medical-figma-manifest.md
git commit -m "docs: record Rosa Medical public component library"
```

---

### Task 5: Create the Visual Direction Board

**Files:**
- Create: `docs/design/rosa-medical-homepage-content.md`
- Modify: `docs/design/rosa-medical-figma-manifest.md`

**Interfaces:**
- Consumes: brand assets, foundations, components, approved editorial-first direction
- Produces: one selected visual direction and exact homepage copy baseline

- [ ] **Step 1: Build three direction strips**

On `01 — Brand & Direction`, create three 1440 × 760 direction frames:

1. `Direction A — Editorial Precision` — recommended
2. `Direction B — Product Gallery`
3. `Direction C — Commercial Minimal`

All three must obey the same brand and anti-pattern rules. They differ only in hierarchy and image/text balance.

- [ ] **Step 2: Fully develop Direction A**

Direction A must include:

- Large cinematic hero crop
- Transparent header
- Newsreader headline
- Minimal red accents
- Warm white content field
- Large instrument-family tiles
- Thin technical dividers
- One dark final CTA sample

- [ ] **Step 3: Keep B and C as restrained comparisons**

Direction B emphasizes product imagery earlier. Direction C emphasizes conventional procurement clarity. Neither should look intentionally weak; they exist to validate why Direction A best fits the approved brief.

- [ ] **Step 4: Establish exact homepage copy baseline**

Create `docs/design/rosa-medical-homepage-content.md` with:

```markdown
# Rosa Medical Homepage Content — Design Baseline

## Hero

Headline: Precision instruments. Clear procurement.

Supporting copy: A focused medical instruments supplier helping hospitals, clinics, distributors, and international buyers source the products they need with a direct quotation process.

Primary CTA: Explore Products
Secondary CTA: Request a Quote

## Instrument Families

Heading: Instruments, organised for faster sourcing.
Supporting copy: Browse Rosa’s core product families and build a structured inquiry around exact product codes, variants, and quantities.

Families:
- Knives
- Scissors
- Punches
- Chisels
- Cutters

## Procurement Introduction

Heading: A more direct way to source medical instruments.
Body: Rosa Medical supports professional buyers with organised product information, responsive inquiry handling, and a quotation process designed around specific instruments and quantities.
CTA: How procurement works

## Selected Instruments

Heading: Selected instruments
Supporting copy: Representative products from Rosa’s core instrument families.

## Catalogues

Heading: Browse the complete catalogues.
Supporting copy: Review product families, reference codes, dimensions, and available variations in Rosa’s downloadable catalogues.

## Process

Heading: From product search to quotation.

01 — Browse products
Find instruments by family and review available codes and variants.

02 — Prepare an inquiry
Add products, quantities, and notes to one organised request.

03 — Receive a quotation
Submit your company details and Rosa Medical will respond directly.

## Final CTA

Heading: Preparing a medical instrument requirement?
Body: Build an organised inquiry and send the complete requirement to Rosa Medical for quotation.
Primary CTA: Start an Inquiry
Secondary CTA: Contact Rosa
```

The copy is a design baseline, not final legal or marketing approval. Do not add claims beyond this text.

- [ ] **Step 5: Direction QA**

Confirm Direction A:

- Feels more editorial than technical, while retaining procurement credibility
- Does not resemble a generic healthcare SaaS template
- Has a practical path from hero to products to inquiry
- Works with replacement hero imagery
- Uses red as an accent rather than a field colour

- [ ] **Step 6: Mark Direction A selected**

Add a small Figma annotation above Direction A:

`Selected direction — Editorial Precision`

Move unused fragments to `90 — Archive`; do not delete them.

- [ ] **Step 7: Update manifest and commit**

Set visual direction status to `approved baseline` and record the selected frame node ID.

```bash
git add docs/design/rosa-medical-figma-manifest.md docs/design/rosa-medical-homepage-content.md
git commit -m "docs: define Rosa Medical homepage visual and content baseline"
```

---

### Task 6: Design the Desktop Homepage Wireframe

**Files:**
- Modify: `docs/design/rosa-medical-figma-manifest.md`

**Interfaces:**
- Consumes: selected visual direction, homepage content baseline, core components
- Produces: approved 1440 px homepage structure before visual polish

- [ ] **Step 1: Create the desktop wireframe frame**

On `04 — Home / Wireframe`, create:

`Home / Desktop / Wireframe / v1`

Width: 1440 px. Use a vertical Auto Layout frame. Use the 12-column grid from foundations.

- [ ] **Step 2: Set exact section sequence and approximate heights**

1. Header + hero: 920 px
2. Instrument families: 1180 px
3. Procurement introduction: 720 px
4. Selected instruments: 760 px
5. Catalogue access: 680 px
6. Procurement process: 520 px
7. Final quotation CTA: 520 px
8. Footer: 560 px

Section heights may adjust during high fidelity, but the sequence must not change without review.

- [ ] **Step 3: Wireframe the hero**

Use:

- Full-bleed image block
- Transparent 88 px header
- Text block aligned to desktop columns 1–7
- Primary and secondary CTAs beneath supporting copy
- Safe image focus zone on columns 8–12
- No carousel arrows or pagination dots in Phase 1

- [ ] **Step 4: Wireframe the five instrument families**

Create an asymmetrical editorial grid:

- Row 1: Knives large landscape spanning 7 columns; Scissors portrait spanning 5 columns
- Row 2: Punches portrait spanning 4 columns; Chisels landscape spanning 8 columns
- Row 3: Cutters full-width restrained feature tile spanning 12 columns

Ensure every tile remains understandable without photography.

- [ ] **Step 5: Wireframe remaining sections**

- Procurement introduction: 5-column copy + 7-column image
- Selected instruments: four desktop product cards
- Catalogues: five cards in a horizontal 3+2 editorial arrangement, not a uniform five-column strip
- Procurement process: three equal columns separated by thin dividers
- Final CTA: dark field with centered copy and two CTAs
- Footer: four information columns plus bottom legal row

- [ ] **Step 6: Verify user journey**

Trace these paths visually:

1. Hero → Explore Products → Instrument families
2. Hero → Request a Quote → inquiry route annotation
3. Family tile → category route annotation
4. Product card → Add to Inquiry → basket confirmation annotation
5. Catalogue card → view/download route annotation

- [ ] **Step 7: Wireframe QA screenshot**

Export or screenshot the full wireframe and inspect at:

- Full-page scale
- 1440 px viewport crop
- 1280 px simulated viewport crop

Verify hierarchy, section rhythm, and CTA visibility before adding colour or photography.

- [ ] **Step 8: Update manifest and commit**

Record the wireframe node ID and status `ready for high fidelity`.

```bash
git add docs/design/rosa-medical-figma-manifest.md
git commit -m "docs: record Rosa Medical desktop homepage wireframe"
```

---

### Task 7: Produce the High-Fidelity Desktop Homepage

**Files:**
- Modify: `docs/design/rosa-medical-figma-manifest.md`

**Interfaces:**
- Consumes: approved wireframe, components, foundations, content baseline, placeholder image system
- Produces: implementation-ready desktop homepage at 1440 px

- [ ] **Step 1: Duplicate the approved wireframe**

Duplicate into `05 — Home / Desktop` and rename:

`Home / Desktop / Hi-Fi / v1`

Replace every wireframe primitive with component instances and variable-bound styles.

- [ ] **Step 2: Finish transparent and solid header states**

Transparent state:

- Logo uses supplied ROSA mark
- White navigation text over hero
- Search and basket visible
- No language switcher in Phase 1

Solid state:

- White background
- Near-black navigation
- Subtle bottom shadow
- Same 88 px height to avoid layout shift

- [ ] **Step 3: Finish hero composition**

Use:

- One editorial image placeholder
- `overlay/hero`
- Headline: `Precision instruments. Clear procurement.`
- Supporting copy from content baseline
- Primary red `Explore Products` button
- Secondary light `Request a Quote` button
- No carousel controls
- Bottom edge must transition cleanly into warm white without decorative waves or blobs

- [ ] **Step 4: Finish instrument-family section**

Use real component instances and family names. Each tile receives a distinct neutral placeholder crop while maintaining a consistent photographic direction.

Use only small red details such as a 1–2 px rule, arrow, or hover accent.

- [ ] **Step 5: Finish procurement and product-preview sections**

Procurement introduction:

- Editorial heading in Newsreader
- Body width no more than 560 px
- One large supporting image placeholder
- Text link `How procurement works`

Selected instruments:

Use representative catalogue-backed examples without extracting PDF images:

- Iris Scissors — `04-0901` — `10.5 cm, straight, sharp`
- Mayo Scissors — `04-0402` — `17 cm, straight`
- Osteotome — `36-6301` — `4 mm, 13.5 cm`
- Bone Cutters — `37-4903` — `22.5 cm`

Treat these as seed examples for layout only and label the content as replaceable in handoff notes.

- [ ] **Step 6: Finish catalogue and procurement-process sections**

Catalogue cards:

- Knives
- Scissors
- Punches
- Chisels
- Cutters

Do not display unverified page counts. Use `View catalogue` and `Download PDF` actions.

Process section uses the exact three steps from the content baseline with thin dividers and no icons.

- [ ] **Step 7: Finish final CTA and footer**

Final CTA:

- Background `neutral/ink/950`
- White Newsreader heading
- White/steel supporting copy
- Primary red button
- Secondary dark-outline button

Footer placeholder fields:

- `Riyadh, Saudi Arabia`
- `+966 XX XXX XXXX`
- `info@rosamedical.example`
- `Sunday–Thursday, 9:00–18:00`

Every placeholder must carry a Figma annotation: `Replace before launch`.

- [ ] **Step 8: Desktop responsive sanity frames**

Create linked sanity frames at:

- `Home / Desktop / 1280 Check`
- `Home / Tablet / 1024 Check`

These are not separate final designs. They verify that the 1440 composition can adapt without overlap, unreadable hero crops, or broken category hierarchy.

- [ ] **Step 9: Desktop high-fidelity QA**

Confirm:

- No detached instances
- All colours/text use variables or styles
- Hero text remains readable on the placeholder image
- Header is legible in transparent and solid states
- Primary CTA appears above the fold
- Products are discoverable before credibility content becomes long
- Inquiry actions are visible without dominating
- Red occupies less than approximately 15% of the overall page area
- No section exists only for visual decoration

- [ ] **Step 10: Update manifest and commit**

Record desktop frame node IDs and status `desktop hi-fi complete`.

```bash
git add docs/design/rosa-medical-figma-manifest.md
git commit -m "docs: record Rosa Medical desktop homepage design"
```

---

### Task 8: Produce the High-Fidelity Mobile Homepage

**Files:**
- Modify: `docs/design/rosa-medical-figma-manifest.md`

**Interfaces:**
- Consumes: approved desktop homepage and mobile component variants
- Produces: implementation-ready 390 px homepage with intentional mobile hierarchy

- [ ] **Step 1: Create mobile frame**

On `06 — Home / Mobile`, create:

`Home / Mobile / Hi-Fi / v1`

Width: 390 px. Use the 4-column grid and 20 px margins.

- [ ] **Step 2: Adapt the header and hero**

- Header height: 72 px
- ROSA logo left
- Search and basket remain visible
- Menu trigger right
- Hero minimum height: 760 px
- Text remains bottom-aligned over image
- Headline size uses `Display/H2` or an explicitly documented 44/48 mobile override
- CTAs stack vertically at full content width

- [ ] **Step 3: Adapt instrument families**

Use one-column editorial tiles with varied but controlled heights:

- Knives: 420 px
- Scissors: 340 px
- Punches: 340 px
- Chisels: 420 px
- Cutters: 300 px

Do not convert the section into a horizontal carousel.

- [ ] **Step 4: Adapt content sections**

- Procurement copy precedes image
- Selected instruments use a one-column list/card pattern
- Catalogue cards use one-column rows with visible view/download actions
- Procurement process stacks vertically with dividers
- Final CTA uses full width and stacked CTAs
- Footer collapses into grouped sections with clear headings; accordion behavior may be annotated but is not mandatory in Figma Phase 1

- [ ] **Step 5: Create mobile menu state**

Create `Home / Mobile / Menu Open` showing:

- Products
- Catalogues
- About
- Contact
- Inquiry Basket
- Search entry

Use a full-height white drawer. No nested category drawer is required in the homepage phase; annotate that Products opens the future products menu.

- [ ] **Step 6: Mobile QA**

Confirm:

- No text below 14 px; body remains 16 px
- Tap targets are at least 44 × 44 px
- No horizontal scrolling
- Logo remains readable
- Hero text does not collide with focal image area
- Category titles remain visible without hover
- All key actions work without hover
- Basket and menu controls have clear focus states

- [ ] **Step 7: Update manifest and commit**

Record mobile frame node IDs and status `mobile hi-fi complete`.

```bash
git add docs/design/rosa-medical-figma-manifest.md
git commit -m "docs: record Rosa Medical mobile homepage design"
```

---

### Task 9: Add Prototype Behavior, Handoff Notes, and Final QA

**Files:**
- Create: `docs/design/rosa-medical-homepage-qa.md`
- Modify: `docs/design/rosa-medical-figma-manifest.md`

**Interfaces:**
- Consumes: desktop and mobile high-fidelity frames
- Produces: reviewable prototype, implementation notes, and verified homepage design package

- [ ] **Step 1: Create prototype flows**

On `07 — Prototype & Handoff`, define:

**Desktop flow**

- Transparent header state → solid header state annotation on scroll
- Products navigation → mega-menu preview overlay
- Explore Products → instrument-family section
- Request a Quote → future inquiry route annotation
- Category tile → future category page annotation
- Add to Inquiry → Added state and basket count update

**Mobile flow**

- Menu trigger → full-height menu open state
- Menu close → homepage
- Explore Products → instrument-family section
- Add to Inquiry → Added state

Do not fake complete inner pages; use clearly labelled destination frames where screens are out of scope.

- [ ] **Step 2: Add developer annotations**

Annotate:

- Header transition trigger: after leaving hero boundary
- Header transition duration: 220 ms ease-out
- Category hover: image scale from 1.00 to 1.025 over 300 ms
- Product-card hover: border darkens and card lifts no more than 2 px
- Reduced motion: remove image scale and translate; retain instant state changes
- Hero image safe zone and overlay requirement
- Placeholder content that must be replaced before launch

- [ ] **Step 3: Run accessibility and consistency QA**

Create `docs/design/rosa-medical-homepage-qa.md` with this checklist and record Pass/Fail for each item:

```markdown
# Rosa Medical Homepage Design QA

## Brand
- [ ] Supplied ROSA logo is unchanged
- [ ] No Medical descriptor is attached to the logo
- [ ] No ownership/partnership references appear
- [ ] Rosa red is used selectively

## Content Integrity
- [ ] No fake statistics
- [ ] No fake certifications or regulatory claims
- [ ] No manufacturing/factory claims
- [ ] All contact data placeholders are marked for replacement

## Desktop
- [ ] 1440 master frame uses 12-column grid
- [ ] Header transparent and solid states are complete
- [ ] Hero CTA is above the fold
- [ ] Five instrument families are visible and distinct
- [ ] Product cards show no prices or ratings
- [ ] Inquiry action remains clear

## Mobile
- [ ] 390 master frame uses 4-column grid
- [ ] No horizontal overflow
- [ ] All tap targets are at least 44 px
- [ ] Menu open state is complete
- [ ] No hover-only information

## Accessibility
- [ ] Text contrast meets WCAG AA
- [ ] Focus states are visible
- [ ] Body text is at least 16 px
- [ ] Reduced-motion behavior is documented
- [ ] Reading order is logical

## Figma Hygiene
- [ ] Pages are named and ordered
- [ ] Final frames use Auto Layout
- [ ] Final frames contain no detached component instances
- [ ] Variables and text styles are consistently applied
- [ ] Outdated explorations are moved to Archive
```

Fix every failed item before declaring the homepage complete.

- [ ] **Step 4: Inspect screenshots at useful resolutions**

Generate screenshots of:

- Desktop full page
- Desktop hero at high resolution
- Desktop category section
- Mobile full page
- Mobile hero
- Mobile menu open

Review visual balance, text wrapping, contrast, crop safety, and component consistency.

- [ ] **Step 5: Final manifest update**

Add:

- Desktop and mobile master node IDs
- Prototype start node IDs
- Component library node ID
- Final QA status
- List of placeholder assets/content that must be replaced
- Next planned subsystem: Products and Catalogue screens

- [ ] **Step 6: Commit QA and handoff documentation**

```bash
git add docs/design/rosa-medical-figma-manifest.md docs/design/rosa-medical-homepage-qa.md
git commit -m "docs: complete Rosa Medical homepage design handoff"
```

- [ ] **Step 7: Present homepage for approval**

Provide Ahmad:

- Editable Figma file URL
- Desktop homepage frame URL
- Mobile homepage frame URL
- Brief list of deliberate design decisions
- Explicit list of placeholder assets/content
- QA result

Do not begin Products, Inquiry, Admin, or Arabic screens until the homepage is approved.

---

## Plan Self-Review

### Spec coverage

Covered in this plan:

- Brand/logo usage
- Mostly-light editorial direction
- Transparent-to-solid navigation
- Dominant hero imagery
- Five instrument-family navigation
- Product preview without ecommerce language
- Catalogue access
- Procurement process
- Quotation CTA
- Responsive desktop/mobile behavior
- Arabic-safe structural preparation
- Placeholder policy
- Anti-AI design restrictions
- Accessibility and reduced motion
- Figma component and variable hygiene

Intentionally deferred to separate plans:

- Full product/catalogue screens
- Inquiry forms and dashboard-backed workflow screens
- Admin dashboard
- Arabic copy and RTL screens
- Code implementation

### Placeholder scan

The only placeholder values permitted by this plan are explicitly labelled contact and image content required by the approved specification. No implementation step uses `TBD`, `TODO`, or undefined behavior.

### Naming consistency

The Figma page, frame, component, variable, text-style, and documentation names in later tasks match the names introduced earlier in this plan.
