# Catalogue Downloads and Product Media Design

## Goal

Complete the public catalogue-media experience without changing Rosa's established page structure: ship the five supplied technical catalogues as real downloads, use the supplied Rosa identity in the navigation, and replace every remaining primary product-image placeholder with an intentional product asset.

## Approved design

### Catalogue downloads

Each family document receives one stable, same-origin URL under `/media/catalogues/pdf/`. Catalogue cards expose an explicit `Download PDF` action with the browser download hint while retaining an ordinary URL so opening or copying the link still works. The document registry remains the single source of truth for both English and Arabic pages.

### Navigation identity

Desktop and mobile navigation share one image-backed Rosa brand component. A tightly cropped transparent derivative of the supplied owner logo preserves the real mark at navigation scale. A restrained light backing treatment keeps it legible over the dark transparent home header without turning it into a visually heavy card.

### Product imagery

The product registry remains authoritative. Representative cards resolve media from their matching registry products rather than maintaining a second set of images. For products that still lack primary media, the supplied family catalogues are the first source: locate the exact product, make a clean high-resolution crop, remove catalogue-page whitespace, and place it on the same transparent product canvas used by existing product assets. A web substitute is allowed only when a catalogue does not contain a usable representation.

### Responsive and accessibility behavior

Images keep useful alternative labels, download controls keep descriptive link text, and the header brand retains a locale-aware home link and accessible name. Product imagery uses the existing responsive media-frame behavior and must not change card dimensions or cause layout shift.

## Verification

- Tests assert that all five document records have existing local PDF assets and render download links.
- Tests assert that featured products and every registered product have primary imagery.
- Tests assert that desktop and mobile navigation render the shared logo mark.
- Typecheck, lint, the complete test suite, and production build must pass.
- Browser review covers the header at desktop/mobile widths, homepage representative cards, catalogue card downloads, and representative product detail pages.
