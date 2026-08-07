import type { FamilySlug, PublicMediaModel } from "@/features/public-catalogue/models";
import type { PublicLocale } from "@/features/localization/locales";

export function publicMediaAlt(
  media: PublicMediaModel,
  locale: PublicLocale
): string {
  return locale === "ar" ? media.altAr ?? media.alt : media.alt;
}

export const ROSA_LOGO_MEDIA = {
  src: "/media/brand/rosa-primary-logo.jpeg",
  alt: "Rosa Medical rose emblem and wordmark",
  altAr: "شعار روزا ميديكال ووردة العلامة التجارية",
  focalPoint: "50% 50%",
  fit: "contain"
} as const satisfies PublicMediaModel;

export const ROSA_HEADER_LOGO_MEDIA = {
  src: "/media/brand/rosa-header-logo.png",
  alt: ROSA_LOGO_MEDIA.alt,
  altAr: ROSA_LOGO_MEDIA.altAr,
  focalPoint: ROSA_LOGO_MEDIA.focalPoint,
  fit: ROSA_LOGO_MEDIA.fit
} as const satisfies PublicMediaModel;

export const HOME_HERO_MEDIA = {
  src: "/media/editorial/home-hero-surgical-instruments.jpg",
  alt: "Surgical instruments arranged on a sterile blue field",
  altAr: "أدوات جراحية مرتبة على سطح أزرق معقم",
  focalPoint: "61% 58%",
  fit: "cover"
} as const satisfies PublicMediaModel;

export const PROCUREMENT_SUPPORT_MEDIA = {
  src: "/media/editorial/procurement-support.jpg",
  alt: "A procurement team reviewing information together",
  altAr: "فريق مشتريات يراجع المعلومات معًا",
  focalPoint: "52% 46%",
  fit: "cover"
} as const satisfies PublicMediaModel;

export const FAMILY_MEDIA_BY_SLUG = {
  knives: {
    src: "/media/families/knives-family.jpg",
    alt: "A gloved hand holding a precision surgical blade",
    altAr: "يد مرتدية قفازًا تمسك بشفرة جراحية دقيقة",
    focalPoint: "38% 50%",
    fit: "cover"
  },
  scissors: {
    src: "/media/families/scissors-family.jpg",
    alt: "Precision surgical scissors on a cool blue surface",
    altAr: "مقص جراحي دقيق على سطح أزرق",
    focalPoint: "62% 52%",
    fit: "cover"
  },
  punches: {
    src: "/media/families/punches-family.webp",
    alt: "A long precision punch instrument",
    altAr: "أداة ثقب جراحية طويلة ودقيقة",
    focalPoint: "55% 50%",
    fit: "contain"
  },
  chisels: {
    src: "/media/families/chisels-family.webp",
    alt: "A precision surgical chisel",
    altAr: "إزميل جراحي دقيق",
    focalPoint: "50% 50%",
    fit: "contain"
  },
  cutters: {
    src: "/media/families/cutters-family-clean.png",
    alt: "A precision surgical cutter",
    altAr: "أداة قطع جراحية دقيقة",
    focalPoint: "50% 50%",
    fit: "contain"
  }
} as const satisfies Record<FamilySlug, PublicMediaModel>;

export const HOME_CATALOGUE_MEDIA_BY_SLUG = {
  knives: {
    src: "/media/catalogue-preview/knives/knives-number-3.webp",
    alt: "Number 3 surgical knife handle",
    altAr: "Ù…Ù‚Ø¨Ø¶ Ù…Ø¨Ø¶Ø¹ Ø¬Ø±Ø§Ø­ÙŠ Ø±Ù‚Ù… 3",
    focalPoint: "50% 50%",
    fit: "contain"
  },
  scissors: {
    src: "/media/catalogue-preview/scissors/scissors-mayo-regular-curved.webp",
    alt: "Curved Mayo surgical scissors",
    altAr: "Ù…Ù‚Øµ Ù…Ø§ÙŠÙˆ Ø¬Ø±Ø§Ø­ÙŠ Ù…Ù†Ø­Ù†ÙŠ",
    focalPoint: "50% 50%",
    fit: "contain"
  },
  punches: {
    src: "/media/catalogue-preview/punches/punches-fahlbusch.webp",
    alt: "Fahlbusch surgical punch",
    altAr: "Ø£Ø¯Ø§Ø© Ø«Ù‚Ø¨ Ø¬Ø±Ø§Ø­ÙŠØ© ÙØ§Ù‡Ù„Ø¨ÙˆØ´",
    focalPoint: "50% 50%",
    fit: "contain"
  },
  chisels: {
    src: "/media/catalogue-preview/chisels/chisels-alexander-chisel.webp",
    alt: "Alexander surgical chisel",
    altAr: "Ø¥Ø²Ù…ÙŠÙ„ Ø¬Ø±Ø§Ø­ÙŠ Ø£Ù„ÙƒØ³Ù†Ø¯Ø±",
    focalPoint: "50% 50%",
    fit: "contain"
  },
  cutters: {
    src: "/media/catalogue-preview/cutters/cutters-stille-liston-curved.webp",
    alt: "Curved Stille Liston surgical cutter",
    altAr: "Ù‚Ø§Ø·Ø¹ Ø¬Ø±Ø§Ø­ÙŠ Ø³ØªÙŠÙ„ Ù„ÙŠØ³ØªÙˆÙ† Ù…Ù†Ø­Ù†ÙŠ",
    focalPoint: "50% 50%",
    fit: "contain"
  }
} as const satisfies Record<FamilySlug, PublicMediaModel>;

export const CATALOGUE_MEDIA_BY_SLUG = {
  knives: {
    src: "/media/catalogue-preview/knives/knives-number-3.webp",
    alt: "Number 3 surgical knife handle",
    altAr: "مقبض مشرط جراحي رقم 3",
    focalPoint: "50% 50%",
    fit: "contain"
  },
  scissors: {
    src: "/media/catalogue-preview/scissors/scissors-operating-regular-curved-sharp-sharp.webp",
    alt: "Curved operating surgical scissors with sharp points",
    altAr: "مقص جراحي تشغيلي منحني بطرفين حادين",
    focalPoint: "50% 50%",
    fit: "contain"
  },
  punches: {
    ...FAMILY_MEDIA_BY_SLUG.punches,
    focalPoint: "50% 50%",
    fit: "contain"
  },
  chisels: {
    ...FAMILY_MEDIA_BY_SLUG.chisels,
    focalPoint: "50% 50%",
    fit: "contain"
  },
  cutters: {
    src: "/media/catalogues/cutters-k-wire.jpg",
    alt: "K-wire end cutter arranged diagonally",
    altAr: "Ù‚Ø§Ø·Ø¹ Ù†Ù‡Ø§ÙŠØ© Ø³Ù„Ùƒ ÙƒÙŠ Ù…Ø±ØªØ¨ Ø¨Ø´ÙƒÙ„ Ù‚Ø·Ø±ÙŠ",
    focalPoint: "50% 50%",
    fit: "contain"
  }
} as const satisfies Record<FamilySlug, PublicMediaModel>;

export const SUPPORTED_BUYER_MEDIA = {
  hospitals: {
    src: "/media/editorial/about-hospitals.jpg",
    alt: "A surgical team passing an instrument in theatre",
    altAr: "فريق جراحي يمرر أداة داخل غرفة العمليات",
    focalPoint: "56% 52%",
    fit: "cover"
  },
  procurement: {
    src: "/media/editorial/about-procurement.jpg",
    alt: "A trolley carrying organised procurement packages",
    altAr: "عربة تحمل طرود مشتريات منظمة",
    focalPoint: "54% 58%",
    fit: "cover"
  },
  distributors: {
    src: "/media/editorial/about-distributors.jpg",
    alt: "Organised cartons in a distribution warehouse",
    altAr: "صناديق منظمة داخل مستودع توزيع",
    focalPoint: "52% 58%",
    fit: "cover"
  },
  international: {
    src: "/media/editorial/about-international-buyers.webp",
    alt: "A prepared tray of surgical instruments",
    altAr: "صينية مجهزة بالأدوات الجراحية",
    focalPoint: "50% 52%",
    fit: "cover"
  }
} as const satisfies Record<string, PublicMediaModel>;

export type SupportedBuyerMediaKey = keyof typeof SUPPORTED_BUYER_MEDIA;
