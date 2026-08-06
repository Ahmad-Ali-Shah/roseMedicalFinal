# Rosa Medical media-placeholder audit

Date: 2026-08-06

## Resolved in the current pass

- All five family listing heroes now render real, ready media: Knives, Scissors, Punches, Chisels, and Cutters.
- The Technical Catalogues page now renders five real cover images.
- The Knives and Scissors catalogue covers use individual product imagery rather than the former supplied photographs.
- The Punches catalogue cover keeps its 120-degree upward diagonal orientation before and after hover.
- The Punches family card has a readable high-contrast title and a contained full-instrument composition at desktop and mobile widths.

## Public product records still missing a unique source image

These are genuine source-data gaps. The family and product pages deliberately fall back to the neutral instrument placeholder rather than displaying the wrong product.

| Family | Product | Code |
| --- | --- | --- |
| Knives | Scalpel Handle No. 3 | 18-0644 |
| Knives | Bard Parker Handle | 18-0650 |
| Knives | Amputation Knife | 18-1202 |
| Knives | Resection Knife | 18-1404 |
| Punches | Biopsy Punch | 23-1204 |
| Chisels | Codman | 36-7101 |
| Chisels | Lambotte | 36-7201 |
| Chisels | Mini Lambotte | 36-7214 |
| Chisels | Farabeuf | 37-0701 |
| Cutters | SC-01T | SC-01T |

Scissors currently has no unresolved family-listing product image.

## Existing UI compositions that still use placeholder artwork

- The three representative-product cards on the homepage and Products overview use a preview model that does not carry media paths.
- Search-result cards do not currently forward a product's existing media path to their preview component.
- Related-product cards do not currently forward a product's existing media path to their preview component.
- Product-detail thumbnail positions two through four are intentional future-gallery states; the first thumbnail and primary view use the registered image when one exists.
- The empty-inquiry illustration is an intentional decorative empty state, not missing product media.

## Admin-only managed-media requirements

The admin product list/editor, media library, and catalogue management screens still show managed-asset requirements where the Supabase-backed upload and publication workflow has no registered asset. These are explicit workflow states and are kept separate from public family imagery. They should be replaced only when an administrator uploads and associates the correct source asset or catalogue PDF.

## Verification evidence

- Desktop and mobile routes checked: `/catalogues`, `/products`, and all five `/products/{family}` pages.
- All nine checked route/viewport combinations returned HTTP 200 with zero broken images, zero console errors, zero page errors, and zero horizontal overflow.
- Punches catalogue rotation measured 120 degrees both before and after hover at 1440 px and 390 px.
- Punches card title measured white and visible at 72 px desktop and 35.2 px mobile.
