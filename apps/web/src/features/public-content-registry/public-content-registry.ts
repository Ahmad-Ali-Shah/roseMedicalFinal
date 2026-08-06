import { PUBLIC_CONTENT_VALUES } from "./public-content-values";

export type PublicContentBlockKey =
  | "home.hero"
  | "home.support"
  | "about.introduction"
  | "procurement.introduction"
  | "contact.introduction"
  | "footer.description";

export type PublicContentPageKey =
  | "home"
  | "about"
  | "procurement"
  | "contact"
  | "global";

export type PublicContentHref =
  | "/"
  | "/about"
  | "/procurement-support"
  | "/contact";

export type PublicContentSensitivity =
  | "standard"
  | "business-positioning"
  | "contact-routing";

export interface PublicContentField {
  fieldKey: string;
  label: string;
  englishValue: string;
  arabicValue: null;
  fieldType: "short-text" | "long-text" | "label";
  characterGuidance: string;
}

export interface PublicContentBlock {
  blockKey: PublicContentBlockKey;
  pageKey: PublicContentPageKey;
  label: string;
  fields: readonly PublicContentField[];
  publicHref: PublicContentHref;
  affectedComponent: string;
  sensitivity: PublicContentSensitivity;
}

const field = (
  fieldKey: string,
  label: string,
  englishValue: string,
  fieldType: PublicContentField["fieldType"]
): PublicContentField => ({
  fieldKey,
  label,
  englishValue,
  arabicValue: null,
  fieldType,
  characterGuidance:
    fieldType === "label"
      ? "Keep under 40 characters."
      : fieldType === "short-text"
        ? "Keep under 90 characters."
        : "Keep under 220 characters."
});

export const PUBLIC_CONTENT_BLOCKS = [
  {
    blockKey: "home.hero",
    pageKey: "home",
    label: "Homepage hero",
    publicHref: "/",
    affectedComponent: "HomeHero",
    sensitivity: "business-positioning",
    fields: [
      field("eyebrow", "Eyebrow", PUBLIC_CONTENT_VALUES.homeHero.eyebrow, "label"),
      field("title", "Title", PUBLIC_CONTENT_VALUES.homeHero.title, "short-text"),
      field("copy", "Supporting copy", PUBLIC_CONTENT_VALUES.homeHero.copy, "long-text")
    ]
  },
  {
    blockKey: "home.support",
    pageKey: "home",
    label: "Homepage procurement support",
    publicHref: "/",
    affectedComponent: "ProcurementSupport",
    sensitivity: "standard",
    fields: [
      field("eyebrow", "Eyebrow", PUBLIC_CONTENT_VALUES.homeSupport.eyebrow, "label"),
      field("title", "Title", PUBLIC_CONTENT_VALUES.homeSupport.title, "short-text"),
      field("copy", "Supporting copy", PUBLIC_CONTENT_VALUES.homeSupport.copy, "long-text")
    ]
  },
  {
    blockKey: "about.introduction",
    pageKey: "about",
    label: "About introduction",
    publicHref: "/about",
    affectedComponent: "AboutPage",
    sensitivity: "business-positioning",
    fields: [
      field("eyebrow", "Eyebrow", PUBLIC_CONTENT_VALUES.aboutIntroduction.eyebrow, "label"),
      field("title", "Title", PUBLIC_CONTENT_VALUES.aboutIntroduction.title, "short-text"),
      field("copy", "Supporting copy", PUBLIC_CONTENT_VALUES.aboutIntroduction.copy, "long-text")
    ]
  },
  {
    blockKey: "procurement.introduction",
    pageKey: "procurement",
    label: "Procurement Support introduction",
    publicHref: "/procurement-support",
    affectedComponent: "ProcurementSupportPage",
    sensitivity: "standard",
    fields: [
      field("eyebrow", "Eyebrow", PUBLIC_CONTENT_VALUES.procurementIntroduction.eyebrow, "label"),
      field("title", "Title", PUBLIC_CONTENT_VALUES.procurementIntroduction.title, "short-text"),
      field("copy", "Supporting copy", PUBLIC_CONTENT_VALUES.procurementIntroduction.copy, "long-text")
    ]
  },
  {
    blockKey: "contact.introduction",
    pageKey: "contact",
    label: "Contact introduction",
    publicHref: "/contact",
    affectedComponent: "ContactPage",
    sensitivity: "contact-routing",
    fields: [
      field("eyebrow", "Eyebrow", PUBLIC_CONTENT_VALUES.contactIntroduction.eyebrow, "label"),
      field("title", "Title", PUBLIC_CONTENT_VALUES.contactIntroduction.title, "short-text"),
      field("copy", "Supporting copy", PUBLIC_CONTENT_VALUES.contactIntroduction.copy, "long-text")
    ]
  },
  {
    blockKey: "footer.description",
    pageKey: "global",
    label: "Footer description",
    publicHref: "/",
    affectedComponent: "PublicShell",
    sensitivity: "business-positioning",
    fields: [
      field("copy", "Description", PUBLIC_CONTENT_VALUES.footerDescription.copy, "long-text")
    ]
  }
] as const satisfies readonly PublicContentBlock[];

export function getPublicContentBlock(
  blockKey: PublicContentBlockKey
): PublicContentBlock | undefined {
  return PUBLIC_CONTENT_BLOCKS.find((block) => block.blockKey === blockKey);
}
