# Catalogue Downloads and Product Media Implementation Plan

> **For Codex:** Execute this plan in the current session, preserving all unrelated dirty-worktree changes. Do not commit, push, reset, or merge.

**Goal:** Publish the five owner-supplied catalogues, replace the public header wordmark with the supplied Rosa logo, and eliminate all remaining primary product-image placeholders.

**Architecture:** Keep catalogue PDF paths and product media in the existing registries. Add one shared navigation brand component. Make featured-product selectors forward media from the canonical product registry. Generate static, optimized catalogue-derived image assets for unresolved products.

**Tech Stack:** Next.js App Router, React, TypeScript, Vitest, Testing Library, CSS, PyMuPDF/Pillow as temporary asset-preparation tools.

---

### Task 1: Lock behavior with tests

**Files:**
- Create: `apps/web/src/test/catalogue-downloads-and-product-media.test.tsx`
- Modify: `apps/web/src/test/catalogue-documents.test.tsx`
- Modify: `apps/web/src/test/f7-story-pages.test.tsx`

1. Assert five stable PDF paths and five existing public files.
2. Assert catalogue cards render downloadable anchors rather than unavailable controls.
3. Assert every representative product resolves primary media.
4. Assert all registered products have primary media.
5. Assert desktop and mobile navigation use the shared logo asset.
6. Run the focused tests and confirm they fail for the intended missing behavior.

### Task 2: Publish catalogue files and wire the document model

**Files:**
- Create: `apps/web/public/media/catalogues/pdf/rosa-*-catalogue.pdf`
- Modify: `apps/web/src/features/catalogues/catalogue-document-model.ts`
- Modify: `apps/web/src/features/catalogues/catalogue-card.tsx`

1. Copy the five owner files with stable lowercase names.
2. Add a typed family-to-PDF mapping to the catalogue registry.
3. Render localized `Download PDF` anchors with a download hint.
4. Run catalogue-focused tests.

### Task 3: Prepare and register missing product media

**Files:**
- Create: `apps/web/public/media/catalogue-preview/<family>/<product>.webp`
- Create: `apps/web/src/features/catalogue-media/owner-catalogue-supplement.ts`
- Modify: `apps/web/src/features/catalogue-registry/products/{knives,punches,chisels,cutters}.ts`

1. Search the supplied PDFs by code and product name.
2. Render or extract the exact catalogue figure at high resolution.
3. Trim page text/whitespace, soften-remove the white page background, and fit the product on a consistent transparent canvas.
4. Record source metadata and bind assets to the ten unresolved registry entries.
5. Run the all-products-media assertion and visually inspect every generated asset.

### Task 4: Make representative cards inherit canonical media

**Files:**
- Modify: `apps/web/src/features/public-catalogue/models.ts`
- Modify: `apps/web/src/features/public-catalogue/selectors.ts`
- Modify: `apps/web/src/features/public-catalogue/product-preview-card.tsx`

1. Add optional image fields to the preview model.
2. Resolve each fixture to its canonical product and forward media fields.
3. Pass those fields into the existing product-media component.
4. Run representative-card tests.

### Task 5: Replace the navigation wordmark with the supplied logo

**Files:**
- Create: `apps/web/public/media/brand/rosa-header-logo.webp`
- Create: `apps/web/src/components/layout/public-brand-mark.tsx`
- Modify: `apps/web/src/components/layout/public-shell.tsx`
- Modify: `apps/web/src/components/layout/mobile-navigation.tsx`
- Modify: `apps/web/src/features/public-media/public-media.ts`
- Modify: relevant header CSS files

1. Create a tightly cropped, transparent derivative of the supplied logo.
2. Add one locale-aware shared brand component with an accessible home label.
3. Use it in desktop and mobile navigation.
4. Tune dimensions and backing treatment for light, dark, desktop, mobile, and RTL contexts.
5. Run shell/header tests.

### Task 6: Review and verify

1. Run focused tests after each implementation slice.
2. Run the full unit/static suite, typecheck, lint, and production build.
3. Start the local preview and inspect homepage representative media, catalogues/download behavior, header alignment, and affected product pages at desktop and mobile widths.
4. Confirm each download returns a PDF and each product image returns successfully.
5. Correct any visual, accessibility, console, or responsive regressions and rerun relevant checks.
