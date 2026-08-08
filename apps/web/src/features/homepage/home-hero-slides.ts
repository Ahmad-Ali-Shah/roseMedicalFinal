import type { Route } from "next";
import type { PublicLocale } from "@/features/localization/locales";
import { HOME_HERO_MEDIA } from "@/features/public-media";

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

const developmentImage = {
  desktopSrc: HOME_HERO_MEDIA.src,
  mobileSrc: HOME_HERO_MEDIA.src,
  alt: { en: HOME_HERO_MEDIA.alt, ar: HOME_HERO_MEDIA.altAr ?? HOME_HERO_MEDIA.alt },
  desktopFocalPoint: HOME_HERO_MEDIA.focalPoint ?? "50% 50%",
  mobileFocalPoint: "58% 52%"
} as const;

const approvedDevelopmentCopy = {
  eyebrow: { en: "Medical instruments supplier", ar: "مورّد أدوات طبية" },
  title: { en: "Precision instruments. Procurement made clear.", ar: "أدوات دقيقة. ومشتريات أكثر وضوحًا." },
  copy: {
    en: "A composed catalogue and quotation experience for hospitals, distributors and procurement teams.",
    ar: "تجربة منظمة لاستعراض الكتالوجات وطلب عروض الأسعار للمستشفيات والموزعين وفرق المشتريات."
  },
  ctas: [
    { label: { en: "Explore Products", ar: "استعرض المنتجات" }, href: "/products" as const },
    { label: { en: "Request a Quote", ar: "اطلب عرض سعر" }, href: "/request-quotation" as const, variant: "secondary" as const }
  ]
} as const;

export const HOME_HERO_SLIDES = [
  { id: "hero-development-01", image: developmentImage, copySide: "left", tone: "dark", ...approvedDevelopmentCopy },
  { id: "hero-development-02", image: developmentImage, copySide: "right", tone: "dark", ...approvedDevelopmentCopy },
  { id: "hero-development-03", image: developmentImage, copySide: "left", tone: "dark", ...approvedDevelopmentCopy },
  { id: "hero-development-04", image: developmentImage, copySide: "right", tone: "dark", ...approvedDevelopmentCopy }
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
