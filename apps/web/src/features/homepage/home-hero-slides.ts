import type { Route } from "next";
import type { PublicLocale } from "@/features/localization/locales";

export type HeroCopySide = "left" | "right";
export type HeroTone = "dark" | "light";

export interface LocalizedHeroText {
  en: string;
  ar: string;
}

export interface HeroImage {
  desktopSrc: string;
  mobileSrc: string;
  alt: LocalizedHeroText;
  desktopFocalPoint: string;
  mobileFocalPoint: string;
}

export interface HomeHeroCta {
  label: LocalizedHeroText;
  href: Route<string>;
  variant?: "primary" | "secondary";
}

export interface HomeHeroSlide {
  id: string;
  image: HeroImage;
  copySide: HeroCopySide;
  tone: HeroTone;
  eyebrow: LocalizedHeroText;
  title: LocalizedHeroText;
  copy: LocalizedHeroText;
  ctas: readonly HomeHeroCta[];
}

export interface LocalizedHomeHeroSlide {
  id: string;
  image: Omit<HeroImage, "alt"> & { alt: string };
  copySide: HeroCopySide;
  tone: HeroTone;
  eyebrow: string;
  title: string;
  copy: string;
  ctas: readonly {
    label: string;
    href: Route<string>;
    variant?: "primary" | "secondary";
  }[];
}

export const HOME_HERO_SLIDES = [
  {
    id: "precision-instruments",
    image: {
      desktopSrc: "/media/editorial/home-hero/v1/home-hero-01-desktop.webp",
      mobileSrc: "/media/editorial/home-hero/v1/home-hero-01-mobile.webp",
      alt: {
        en: "Surgical instruments arranged on a sterile blue field",
        ar: "أدوات جراحية مرتبة على سطح أزرق معقم"
      },
      desktopFocalPoint: "61% 58%",
      mobileFocalPoint: "66% 54%"
    },
    copySide: "left",
    tone: "dark",
    eyebrow: { en: "Medical instruments supplier", ar: "مورّد أدوات طبية" },
    title: {
      en: "Precision instruments. Procurement made clear.",
      ar: "أدوات دقيقة. ومشتريات أكثر وضوحًا."
    },
    copy: {
      en: "A composed catalogue and quotation experience for hospitals, distributors and procurement teams.",
      ar: "تجربة منظمة لاستعراض الكتالوجات وطلب عروض الأسعار للمستشفيات والموزعين وفرق المشتريات."
    },
    ctas: [
      { label: { en: "Explore Products", ar: "استعرض المنتجات" }, href: "/products" as const },
      { label: { en: "View Catalogues", ar: "عرض الكتالوجات" }, href: "/catalogues" as const, variant: "secondary" as const }
    ]
  },
  {
    id: "clinical-instrument-context",
    image: {
      desktopSrc: "/media/editorial/home-hero/v1/home-hero-02-desktop.webp",
      mobileSrc: "/media/editorial/home-hero/v1/home-hero-02-mobile.webp",
      alt: {
        en: "Surgical instruments hanging on a rack beside an operating field",
        ar: "أدوات جراحية معلقة على حامل بجوار حقل العمليات"
      },
      desktopFocalPoint: "68% 53%",
      mobileFocalPoint: "78% 52%"
    },
    copySide: "left",
    tone: "dark",
    eyebrow: { en: "Structured product discovery", ar: "استعراض منظم للمنتجات" },
    title: {
      en: "A clearer view of the instruments you need.",
      ar: "رؤية أوضح للأدوات التي تحتاجها."
    },
    copy: {
      en: "Browse focused instrument families, review product codes and variants, and carry the right details into your inquiry.",
      ar: "استعرض عائلات الأدوات المركزة، وراجع الرموز والخيارات، واحتفظ بالتفاصيل الصحيحة داخل استفسارك."
    },
    ctas: [
      { label: { en: "Explore Products", ar: "استعرض المنتجات" }, href: "/products" as const },
      { label: { en: "View Catalogues", ar: "عرض الكتالوجات" }, href: "/catalogues" as const, variant: "secondary" as const }
    ]
  },
  {
    id: "surgical-instrument-selection",
    image: {
      desktopSrc: "/media/editorial/home-hero/v1/home-hero-03-desktop.webp",
      mobileSrc: "/media/editorial/home-hero/v1/home-hero-03-mobile.webp",
      alt: {
        en: "Gloved surgical team passing a surgical instrument in an operating room",
        ar: "فريق جراحي مرتدٍ للقفازات يتبادل أداة جراحية داخل غرفة العمليات"
      },
      desktopFocalPoint: "54% 50%",
      mobileFocalPoint: "55% 50%"
    },
    copySide: "left",
    tone: "dark",
    eyebrow: { en: "Instrument selection", ar: "اختيار الأدوات" },
    title: {
      en: "Clearer instrument selection, from the start.",
      ar: "اختيار أوضح للأدوات منذ البداية."
    },
    copy: {
      en: "Move from family browsing to product codes, configurations and quantities in one composed quotation path.",
      ar: "انتقل من استعراض العائلات إلى رموز المنتجات وخياراتها وكمياتها ضمن مسار واحد منظم لطلب عرض السعر."
    },
    ctas: [
      { label: { en: "Explore Products", ar: "استعرض المنتجات" }, href: "/products" as const },
      { label: { en: "View Catalogues", ar: "عرض الكتالوجات" }, href: "/catalogues" as const, variant: "secondary" as const }
    ]
  },
  {
    id: "catalogue-to-quotation",
    image: {
      desktopSrc: "/media/editorial/home-hero/v1/home-hero-04-desktop.webp",
      mobileSrc: "/media/editorial/home-hero/v1/home-hero-04-mobile.webp",
      alt: {
        en: "Surgical instruments prepared on a blue sterile drape",
        ar: "أدوات جراحية مجهزة على غطاء أزرق معقم"
      },
      desktopFocalPoint: "48% 52%",
      mobileFocalPoint: "48% 52%"
    },
    copySide: "right",
    tone: "dark",
    eyebrow: { en: "Catalogue to quotation", ar: "من الكتالوج إلى عرض السعر" },
    title: {
      en: "From catalogue detail to one organised request.",
      ar: "حوّل تفاصيل الكتالوج إلى طلب واحد منظم."
    },
    copy: {
      en: "Identify the instrument family, review available configurations, and bring quantities together without losing product context.",
      ar: "حدد عائلة الأداة، وراجع الخيارات المتاحة، واجمع الكميات مع الحفاظ على سياق كل منتج."
    },
    ctas: [
      { label: { en: "View Catalogues", ar: "عرض الكتالوجات" }, href: "/catalogues" as const },
      { label: { en: "Explore Products", ar: "استعرض المنتجات" }, href: "/products" as const, variant: "secondary" as const }
    ]
  }
] as const satisfies readonly [HomeHeroSlide, HomeHeroSlide, HomeHeroSlide, HomeHeroSlide];

export function localizeHomeHeroSlide(
  slide: HomeHeroSlide,
  locale: PublicLocale
): LocalizedHomeHeroSlide {
  const key = locale === "ar" ? "ar" : "en";
  return {
    id: slide.id,
    image: {
      desktopSrc: slide.image.desktopSrc,
      mobileSrc: slide.image.mobileSrc,
      alt: slide.image.alt[key],
      desktopFocalPoint: slide.image.desktopFocalPoint,
      mobileFocalPoint: slide.image.mobileFocalPoint
    },
    copySide: slide.copySide,
    tone: slide.tone,
    eyebrow: slide.eyebrow[key],
    title: slide.title[key],
    copy: slide.copy[key],
    ctas: slide.ctas.map((cta) => ({
      label: cta.label[key],
      href: cta.href,
      ...(cta.variant ? { variant: cta.variant } : {})
    }))
  };
}
