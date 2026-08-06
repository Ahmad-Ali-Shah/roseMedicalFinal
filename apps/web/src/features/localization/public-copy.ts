import { selectFamilyCards, selectFeaturedProducts } from "@/features/public-catalogue";

export const FAMILY_NAMES_AR = {
  knives: "المشارط والسكاكين الجراحية",
  scissors: "المقصات الجراحية",
  punches: "أدوات الثقب",
  chisels: "الأزاميل الجراحية",
  cutters: "أدوات القطع"
} as const;

const families = selectFamilyCards().map((family) => ({
  ...family,
  name: FAMILY_NAMES_AR[family.slug],
  description: `استعرض مجموعة ${FAMILY_NAMES_AR[family.slug]} حسب الرمز والمقاس والخيار.`
}));

export const HOME_PAGE_MODEL_AR = {
  hero: {
    eyebrow: "مورّد أدوات طبية",
    title: "أدوات دقيقة. ومشتريات أكثر وضوحًا.",
    copy: "تجربة منظمة لاستعراض الكتالوجات وطلب عروض الأسعار للمستشفيات والموزعين وفرق المشتريات.",
    primary: { label: "استعرض المنتجات", href: "/products" as const },
    secondary: { label: "اطلب عرض سعر", href: "/request-quotation" as const }
  },
  familyIntro: {
    eyebrow: "عائلات المنتجات",
    title: "استعرض حسب عائلة الأدوات.",
    copy: "خمسة كتالوجات متخصصة ومنظمة لتسهيل اكتشاف المنتجات وإعداد الاستفسار."
  },
  families,
  procurement: {
    eyebrow: "دعم المشتريات",
    title: "مسار أوضح من الكتالوج إلى عرض السعر.",
    copy: "نساعد المشترين على تحديد الأدوات وتنظيم متطلباتهم وإرسال طلب واحد واضح.",
    detailEyebrow: "معلومات منتجات منظمة",
    detailTitle: "مصمم لقرارات شراء عملية.",
    detailCopy: "ابحث حسب العائلة، وراجع الرموز والخيارات، وحدد الكميات، ثم أرسل طلب عرض سعر منظمًا.",
    steps: ["رموز منتجات واضحة", "استفسار يراعي الخيارات", "طلب واحد منظم"]
  },
  productsIntro: {
    eyebrow: "أدوات مختارة",
    title: "نماذج من المنتجات.",
    copy: "معاينة موجزة؛ تظهر الأبعاد والخيارات الكاملة في صفحة كل منتج."
  },
  products: selectFeaturedProducts().map((product) => ({ ...product, familyName: FAMILY_NAMES_AR[product.familySlug] })),
  catalogue: {
    eyebrow: "الكتالوجات",
    title: "كتالوجات تقنية لاستعراض منظم.",
    copy: "خمس وثائق لعائلات الأدوات، متصلة مباشرة بتجربة المنتجات وليست مجرد أرشيف ملفات.",
    items: families.map((family, index) => ({
      number: String(index + 1).padStart(2, "0"),
      slug: family.slug,
      name: family.name,
      media: family.media,
      href: "/catalogues" as const
    }))
  },
  quotation: {
    eyebrow: "طلب عرض سعر",
    title: "جهّز استفسارك عن الأدوات.",
    copy: "أنشئ قائمة منتجات منظمة وأرسل طلبًا واضحًا إلى روزا ميديكال.",
    primary: { label: "اطلب عرض سعر", href: "/request-quotation" as const }
  }
} as const;

export const SHELL_COPY = {
  en: {
    products: "Products", catalogues: "Catalogues", about: "About", contact: "Contact",
    search: "Search", inquiry: "Inquiry", quote: "Request a quote",
    productFamilies: "Product families", company: "Company", support: "Support"
  },
  ar: {
    products: "المنتجات", catalogues: "الكتالوجات", about: "من نحن", contact: "اتصل بنا",
    search: "بحث", inquiry: "الاستفسار", quote: "اطلب عرض سعر",
    productFamilies: "عائلات المنتجات", company: "الشركة", support: "الدعم"
  }
} as const;
