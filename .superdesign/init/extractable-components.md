# Extractable Components

## PublicShell

- Source: `apps/web/src/components/layout/public-shell.tsx`
- Category: layout
- Description: Global Rosa public header, navigation, route content boundary, and four-column footer.
- Extractable props: none beyond the default content slot.
- Hardcoded: ROSA wordmark, primary/utility/family navigation labels and URLs, footer structure, all CSS classes.

## MobileNavigation

- Source: `apps/web/src/components/layout/mobile-navigation.tsx`
- Category: layout
- Description: Accessible full-height mobile navigation curtain with motion-aware transitions.
- Extractable props: `primaryLinks`, `utilityLinks`.
- Hardcoded: menu/close labels, dialog structure, animation choreography, CSS classes.

## Container

- Source: `apps/web/src/components/layout/container.tsx`
- Category: layout
- Description: Width-constrained horizontal layout primitive.
- Extractable props: `size`, `className`.
- Hardcoded: container size class mapping.

## Section

- Source: `apps/web/src/components/layout/section.tsx`
- Category: layout
- Description: Public section wrapper with spacing variants.
- Extractable props: `className`, `spacing`.
- Hardcoded: semantic section element and CSS naming.

## Stack

- Source: `apps/web/src/components/layout/stack.tsx`
- Category: layout
- Description: Vertical rhythm primitive.
- Extractable props: `gap`, `className`.
- Hardcoded: stack class mapping.

## Grid

- Source: `apps/web/src/components/layout/grid.tsx`
- Category: layout
- Description: Responsive grid primitive.
- Extractable props: `columns`, `className`.
- Hardcoded: grid class mapping.

## Button

- Source: `apps/web/src/components/ui/button.tsx`
- Category: basic
- Description: Shared action control and typed Next.js link variant.
- Extractable props: `variant`, `size`, `href`, `disabled`.
- Hardcoded: button label wrapper and Rosa CSS classes.

## Card

- Source: `apps/web/src/components/ui/card.tsx`
- Category: basic
- Description: Bordered paper/mist/dark content surface.
- Extractable props: `tone`, `interactive`, `className`.
- Hardcoded: card CSS contract.

## Field

- Source: `apps/web/src/components/ui/field.tsx`
- Category: basic
- Description: Label, control, hint, and error wrapper.
- Extractable props: `label`, `hint`, `error`, `required`.
- Hardcoded: semantic labelling and field CSS contract.

## Alert

- Source: `apps/web/src/components/ui/alert.tsx`
- Category: basic
- Description: Semantic feedback banner.
- Extractable props: `tone`, `title`.
- Hardcoded: alert semantics and CSS classes.

## Status

- Source: `apps/web/src/components/ui/status.tsx`
- Category: basic
- Description: Compact semantic state chip.
- Extractable props: `tone`.
- Hardcoded: pill styling and status class mapping.

## MediaFrame

- Source: `apps/web/src/features/motion/media-frame.tsx`
- Category: basic
- Description: Stable-aspect editorial media frame with Next Image, tone, overlay, focal-point, and priority support.
- Extractable props: `aspect`, `tone`, `overlay`, `focalPoint`, `src`, `alt`.
- Hardcoded: media-frame visual layers and placeholder semantics.

## SectionHeading

- Source: `apps/web/src/features/public-catalogue/section-heading.tsx`
- Category: basic
- Description: Editorial eyebrow, masked heading, and supporting-copy pattern.
- Extractable props: `eyebrow`, `title`, `copy`, `align`, `as`.
- Hardcoded: text hierarchy and motion ownership.

## FamilyCard

- Source: `apps/web/src/features/public-catalogue/family-card.tsx`
- Category: basic
- Description: Instrument-family discovery card with restrained tilt, local spotlight, media, count, and arrow.
- Extractable props: `family`, `priority`.
- Hardcoded: internal hierarchy and interaction treatment.

## ProductPreviewCard

- Source: `apps/web/src/features/public-catalogue/product-preview-card.tsx`
- Category: basic
- Description: Representative instrument card with stable media, code, and specification preview.
- Extractable props: `product`, `priority`.
- Hardcoded: product hierarchy and interaction treatment.

## ProcurementPanel

- Source: `apps/web/src/features/public-catalogue/procurement-panel.tsx`
- Category: basic
- Description: Dark procurement-support panel used as a conversion bridge.
- Extractable props: `eyebrow`, `title`, `copy`, `actions`.
- Hardcoded: dark surface styling and content hierarchy.
