import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

function assertIncludes(source, values, label) {
  for (const value of values) {
    assert.equal(
      source.includes(value),
      true,
      `${label} must retain ${JSON.stringify(value)}`
    );
  }
}

test("reconciliation preserves the complete Rosa-owned motion boundary", async () => {
  const [layout, index, globals, reducedMotion, mediaFrame] = await Promise.all([
    read("app/layout.tsx"),
    read("features/motion/index.ts"),
    read("app/globals.css"),
    read("styles/f7-reduced-motion-closeout.css"),
    read("features/motion/media-frame.tsx")
  ]);

  assertIncludes(layout, ["MotionProvider", "<MotionProvider>"], "root layout");
  assertIncludes(index, [
    "./motion-provider",
    "./reveal",
    "./stagger",
    "./text-reveal",
    "./magnetic",
    "./tilt-surface",
    "./spotlight-surface",
    "./progressive-blur",
    "./media-frame",
    "./scroll-header-controller",
    "./route-transition"
  ], "motion index");
  const premiumImport = globals.indexOf('@import "../styles/f7-premium-polish.css";');
  const rtlImport = globals.indexOf('@import "../styles/rtl.css";');
  assert.equal(premiumImport > -1 && rtlImport > premiumImport, true, "RTL overrides must follow the premium motion layer");
  assertIncludes(reducedMotion, [
    "prefers-reduced-motion: reduce",
    "opacity: 1 !important",
    "filter: none !important",
    "transform: none !important",
    ".text-reveal__segment"
  ], "reduced-motion closeout");
  assertIncludes(mediaFrame, [
    'import Image from "next/image"',
    "data-media-state",
    "data-media-aspect",
    "data-media-slot",
    "objectPosition: focalPoint",
    "sizes={sizes}"
  ], "media frame");
});

test("reconciliation preserves the premium public shell and mobile curtain", async () => {
  const [shell, mobileNavigation, button, premiumCss] = await Promise.all([
    read("components/layout/public-shell.tsx"),
    read("components/layout/mobile-navigation.tsx"),
    read("components/ui/button.tsx"),
    read("styles/f7-premium-polish.css")
  ]);

  assertIncludes(shell, [
    "ScrollHeaderController",
    "RouteTransition",
    "MobileNavigation",
    "<RouteTransition>{children}</RouteTransition>",
    "site-footer"
  ], "public shell");
  assertIncludes(mobileNavigation, [
    "AnimatePresence",
    'event.key === "Escape"',
    'role="dialog"',
    'aria-modal="true"',
    'document.body.style.overflow = "hidden"',
    "triggerRef.current?.focus()"
  ], "mobile navigation");
  assertIncludes(button, [
    'className="button__label"',
    "ButtonLink"
  ], "button primitives");
  assertIncludes(premiumCss, [
    ".site-header[data-scrolled=\"true\"]",
    "body:has(.public-page--home) .site-header[data-scrolled=\"false\"]",
    ".nav-link::after",
    ".mobile-navigation__panel",
    ".button:not([disabled], [aria-disabled=\"true\"]):active"
  ], "premium shell styles");
});

test("reconciliation preserves homepage cinematic choreography", async () => {
  const [
    hero,
    familyDiscovery,
    featuredInstruments,
    procurementSupport,
    catalogueAccess,
    quotationCta,
    familyCard,
    productCard,
    premiumCss
  ] = await Promise.all([
    read("features/homepage/sections/home-hero.tsx"),
    read("features/homepage/sections/family-discovery.tsx"),
    read("features/homepage/sections/featured-instruments.tsx"),
    read("features/homepage/sections/procurement-support.tsx"),
    read("features/homepage/sections/catalogue-access.tsx"),
    read("features/homepage/sections/quotation-cta.tsx"),
    read("features/public-catalogue/family-card.tsx"),
    read("features/public-catalogue/product-preview-card.tsx"),
    read("styles/f7-premium-polish.css")
  ]);

  assertIncludes(hero, [
    "TextReveal",
    "Magnetic",
    "MediaFrame",
    "home-hero__visual--fullbleed",
    "home-hero__media-fade",
    'data-home-choreography="hero"',
    'mediaSlot="homepage-hero"'
  ], "homepage hero");
  assertIncludes(familyDiscovery, ["Stagger", "StaggerItem", "interval={0.065}"], "family discovery");
  assertIncludes(featuredInstruments, ["Stagger", "StaggerItem", "interval={0.08}"], "featured instruments");
  assertIncludes(procurementSupport, [
    'direction="right"',
    'direction="left"',
    "TextReveal",
    "procurement-steps"
  ], "homepage procurement support");
  assertIncludes(catalogueAccess, [
    "MediaFrame",
    "ProgressiveBlur",
    "catalogue-grid__blur"
  ], "catalogue access");
  assertIncludes(quotationCta, ["Reveal", "SpotlightSurface", "procurement-panel--premium-cta"], "quotation CTA");
  assertIncludes(familyCard, ["TiltSurface", "family-card__surface", "premium-surface"], "family card");
  assert.equal(
    familyCard.includes("SpotlightSurface"),
    false,
    "repeated family cards must not attach pointer spotlights"
  );
  assertIncludes(productCard, ["TiltSurface", "premium-surface"], "product preview card");
  assertIncludes(premiumCss, [
    ".home-hero__instrument-composition",
    ".procurement-steps::before",
    ".procurement-panel--premium-cta::after"
  ], "homepage premium styles");
});

test("reconciliation preserves product discovery motion and current catalogue media", async () => {
  const [
    productsHero,
    familyIndex,
    previewGrid,
    familyHero,
    familyGrid,
    familyProductCard,
    productDetail,
    productGallery,
    addButton,
    productCss
  ] = await Promise.all([
    read("features/products/sections/products-hero.tsx"),
    read("features/products/sections/family-index.tsx"),
    read("features/products/sections/product-preview-grid.tsx"),
    read("features/family-listing/family-hero.tsx"),
    read("features/family-listing/family-product-grid.tsx"),
    read("features/family-listing/family-product-card.tsx"),
    read("features/product-detail/product-detail-page.tsx"),
    read("features/product-detail/product-gallery.tsx"),
    read("features/inquiry/add-to-inquiry-button.tsx"),
    read("styles/f7-product-polish.css")
  ]);

  assertIncludes(productsHero, ["Reveal", "TextReveal", 'as="h1"'], "products hero");
  assertIncludes(familyIndex, ["Stagger", "StaggerItem", "products-family-grid"], "products family index");
  assertIncludes(previewGrid, ["Stagger", "StaggerItem", "product-preview-grid"], "product preview grid");
  assertIncludes(familyHero, ["Reveal", "TextReveal", "TiltSurface"], "family hero");
  assertIncludes(familyGrid, ["Stagger", "StaggerItem", "family-product-grid"], "family product grid");
  assertIncludes(familyProductCard, [
    "TiltSurface",
    "product.mediaPath",
    "product.mediaFallbackPath",
    "product.mediaIndex",
    "premium-surface"
  ], "family product card");
  assertIncludes(productDetail, [
    "product-detail-layout__gallery-reveal",
    "product-detail-layout__summary-reveal",
    "RelatedProductGrid",
    "MobileInquiryBar"
  ], "product detail page");
  assertIncludes(productGallery, [
    "TiltSurface",
    "product.mediaPath",
    "product.mediaFallbackPath",
    "product.mediaIndex"
  ], "product gallery");
  assertIncludes(addButton, [
    "AnimatePresence",
    "add-to-inquiry-transition",
    "Added · View inquiry"
  ], "Add-to-inquiry transition");
  assertIncludes(productCss, [
    ".products-family-grid > [data-motion=\"stagger-item\"]",
    ".family-product-card:hover .product-media-placeholder",
    ".product-gallery__primary",
    ".add-to-inquiry-transition"
  ], "product premium styles");
});

test("reconciliation preserves story, utility and legal restraint", async () => {
  const [
    about,
    supportedBuyers,
    procurement,
    catalogues,
    contact,
    legal,
    storyCss
  ] = await Promise.all([
    read("features/about/about-page.tsx"),
    read("features/about/supported-buyers.tsx"),
    read("features/procurement-support/procurement-support-page.tsx"),
    read("features/catalogues/catalogues-page.tsx"),
    read("features/contact-preview/contact-page.tsx"),
    read("features/legal-pages/legal-page.tsx"),
    read("styles/f7-story-polish.css")
  ]);

  assertIncludes(about, [
    "TextReveal",
    "MediaFrame",
    "SupportedBuyers",
    "CompanyProfile"
  ], "About page");
  assertIncludes(supportedBuyers, [
    "Stagger",
    "StaggerItem",
    "supported-buyers"
  ], "About buyer stagger");
  assertIncludes(procurement, [
    "TextReveal",
    "MediaFrame",
    "Reveal",
    "ProcurementProcess"
  ], "procurement support page");
  assertIncludes(catalogues, ["TextReveal", "Reveal", "CatalogueGrid"], "catalogues page");
  assertIncludes(contact, [
    "TextReveal",
    "RiyadhMap",
    "contact-information-reveal",
    "contact-form-reveal"
  ], "contact page");
  assertIncludes(legal, [
    "Reveal",
    "legal-page__hero-reveal",
    "legal-section-reveal"
  ], "legal page");
  assertIncludes(storyCss, [
    ".story-media-frame",
    ".catalogue-document-card__tilt",
    ".contact-preview-field::after",
    ".legal-section-reveal"
  ], "story premium styles");
});

test("reconciliation preserves inquiry and quotation conversion polish", async () => {
  const [inquiry, quotation, conversionCss] = await Promise.all([
    read("features/inquiry/inquiry-page.tsx"),
    read("features/inquiry/quotation-page.tsx"),
    read("styles/f7-conversion-polish.css")
  ]);

  assertIncludes(inquiry, [
    "AnimatePresence",
    "motion.article",
    "layout",
    "conversion-value",
    "inquiry-preview-summary"
  ], "inquiry conversion flow");
  assertIncludes(quotation, [
    'data-motion="quotation-form-fields"',
    "data-quotation-fieldset",
    "quotation-submit-button__label",
    "quotation-success-state__mark",
    "AnimatePresence"
  ], "quotation conversion flow");
  assertIncludes(conversionCss, [
    ".inquiry-preview-line",
    ".conversion-value",
    ".quotation-form-preview [data-quotation-fieldset]::after",
    "position: sticky",
    ".quotation-success-state__mark"
  ], "conversion premium styles");
});
