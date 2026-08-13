import type { CatalogueProductRecord } from "@/features/catalogue-registry";
import { selectFamilyCards, type FamilyCardModel, type FamilySlug } from "@/features/public-catalogue";
import { PUBLIC_CONTENT_VALUES } from "@/features/public-content-registry";
import { FAMILY_NAMES_AR } from "@/features/localization/public-copy";
import type { PublicLocale } from "@/features/localization/locales";
import type { Route } from "next";

export const HOME_FAMILY_ORDER = ["scissors", "cutters", "punches", "chisels", "knives"] as const satisfies readonly FamilySlug[];

function orderFamilies(families: readonly FamilyCardModel[]): readonly FamilyCardModel[] {
  return HOME_FAMILY_ORDER.flatMap((slug) => {
    const family = families.find((candidate) => candidate.slug === slug);
    return family ? [family] : [];
  });
}

const familiesEn = orderFamilies(selectFamilyCards());
const familiesAr = familiesEn.map((family) => ({ ...family, name: FAMILY_NAMES_AR[family.slug] }));
const contact = PUBLIC_CONTENT_VALUES.contactDetails;
const whatsappHref = `https://wa.me/${contact.phone.replace(/\D/g, "")}`;

export const HOME_PAGE_MODEL = {
  familyIntro: { title: "Our range of products" },
  families: familiesEn,
  comprehensive: {
    title: "Comprehensive Plans",
    copy: "Rosa offers comprehensive surgical and dental instrument plans engineered to support clinical excellence across multiple specialties. For advanced surgical fields—including plastic surgery, orthopedic surgery, spine surgery, gynecology and maxillofacial surgery—the portfolio provides robust, high-precision tools. Rosa’s dental care solutions also support general dentistry and orthodontics with dependable instruments designed for accurate handling and patient comfort. By organizing its product lines around clinical needs, Rosa helps surgical teams and dental professionals work with reliable, regulatory-compliant tools for specific procedures.",
    leadSpecialty: "Plastic Surgery",
    specialties: ["Orthopedics", "Maxillofacial", "Orthodontics", "Spine"]
  },
  confidence: {
    title: "Securing Confidence",
    copy: "Rosa Medical Devices stands as a trusted partner in the GCC medical trading sector, dedicated to delivering uncompromising quality and precision. Specializing in advanced surgical and dental instruments, the company provides healthcare professionals with reliable tools designed to support superior patient outcomes. By adhering to local and international standards through regulatory channels including ISO and SFDA compliance, Rosa maintains transparency and safety across its product lines. Backed by expertise in metallurgy, engineering, skilled manpower and a commitment to innovation, Rosa continues to bridge advanced surgical engineering with the demands of modern medical practice.",
    imageLabel: "Medical instrument quality and precision"
  },
  contactBand: {
    eyebrow: "Direct support",
    title: "Get in Touch Now",
    whatsappLabel: "WhatsApp Chat",
    whatsappHref,
    emailLabel: "Email",
    emailHref: contact.emailHref
  },
  assurance: {
    title: "Services Assure our Clients Success",
    badge: "SACS",
    cards: [
      { id: "customization", title: "Customization", copy: "We offer and deliver tailored, high-precision surgical and dental instruments customized precisely to meet your clinical specifications and unique procedural requirements." },
      { id: "compliance", title: "Compliance", copy: "We ensure complete regulatory compliance through strict adherence to Saudi SFDA standards, helping guarantee safe and authorized medical products." },
      { id: "quality", title: "Quality Standards", copy: "We maintain exceptional quality standards, sourcing ISO-certified, surgical-grade instruments built for precision, durability and safety for medical professionals." },
      { id: "supply-chain", title: "Supply Chain", copy: "We ensure reliable, efficient supply chain management, offering seamless import clearance and timely delivery of critical medical and dental instruments directly to our customers." }
    ]
  },
  quotation: {
    eyebrow: "Request a quotation",
    title: "Prepare your instruments inquiry.",
    copy: "Build a structured product list and send one clear request to Rosa Medical.",
    primary: { label: "Request a Quote", href: "/request-quotation" as const }
  },
  social: { title: "Follow Us" }
} as const;

const HOME_PAGE_MODEL_AR = {
  familyIntro: { title: "مجموعة منتجاتنا" },
  families: familiesAr,
  comprehensive: {
    title: "خطط شاملة",
    copy: "تقدم روزا خططًا شاملة للأدوات الجراحية وأدوات طب الأسنان لدعم التميز السريري عبر تخصصات متعددة. وتشمل المجالات المتقدمة جراحة التجميل والعظام والعمود الفقري وأمراض النساء وجراحة الوجه والفكين، مع أدوات متينة وعالية الدقة. كما تدعم حلول طب الأسنان لدى روزا طب الأسنان العام وتقويم الأسنان بأدوات موثوقة تساعد على دقة الاستخدام وراحة المريض. ومن خلال تنظيم خطوط المنتجات وفق الاحتياجات السريرية، تساعد روزا الفرق الجراحية وأطباء الأسنان على العمل بأدوات موثوقة ومتوافقة مع المتطلبات التنظيمية لكل إجراء.",
    leadSpecialty: "جراحة التجميل",
    specialties: ["جراحة العظام", "الوجه والفكين", "تقويم الأسنان", "العمود الفقري"]
  },
  confidence: {
    title: "ترسيخ الثقة",
    copy: "تُعد روزا ميديكال ديفايسز شريكًا موثوقًا في قطاع تجارة الأجهزة الطبية بدول مجلس التعاون الخليجي، مع التزام بالجودة والدقة. وتتخصص الشركة في الأدوات الجراحية وأدوات طب الأسنان المتقدمة، وتوفر للمتخصصين أدوات موثوقة تدعم نتائج علاجية أفضل. ومن خلال الالتزام بالمعايير المحلية والدولية عبر القنوات التنظيمية، بما في ذلك متطلبات ISO وSFDA، تحافظ روزا على الشفافية والسلامة عبر خطوط منتجاتها. وبالاستناد إلى الخبرة في المعادن والهندسة والكوادر الماهرة والالتزام بالابتكار، تواصل روزا الربط بين الهندسة الجراحية المتقدمة ومتطلبات الممارسة الطبية الحديثة.",
    imageLabel: "جودة ودقة الأدوات الطبية"
  },
  contactBand: {
    eyebrow: "دعم مباشر",
    title: "تواصل معنا الآن",
    whatsappLabel: "محادثة واتساب",
    whatsappHref,
    emailLabel: "البريد الإلكتروني",
    emailHref: contact.emailHref
  },
  assurance: {
    title: "خدمات تدعم نجاح عملائنا",
    badge: "SACS",
    cards: [
      { id: "customization", title: "التخصيص", copy: "نقدم أدوات جراحية وأدوات لطب الأسنان عالية الدقة ومصممة وفق المواصفات السريرية والمتطلبات الخاصة بكل إجراء." },
      { id: "compliance", title: "الامتثال", copy: "نلتزم بالمتطلبات التنظيمية من خلال التقيد الصارم بمعايير هيئة الغذاء والدواء السعودية SFDA بما يدعم توفير منتجات طبية آمنة ومصرح بها." },
      { id: "quality", title: "معايير الجودة", copy: "نحافظ على معايير جودة مرتفعة من خلال توريد أدوات جراحية معتمدة وفق ISO ومصنوعة للاستخدام الطبي بما يدعم الدقة والمتانة والسلامة." },
      { id: "supply-chain", title: "سلسلة الإمداد", copy: "نوفر إدارة موثوقة وفعالة لسلسلة الإمداد، مع دعم إجراءات الاستيراد والتخليص والتسليم في الوقت المناسب للأدوات الطبية وأدوات طب الأسنان." }
    ]
  },
  quotation: {
    eyebrow: "اطلب عرض سعر",
    title: "جهّز استفسارك عن الأدوات.",
    copy: "أنشئ قائمة منظمة بالمنتجات وأرسل طلبًا واضحًا إلى روزا ميديكال.",
    primary: { label: "اطلب عرض سعر", href: "/request-quotation" as const }
  },
  social: { title: "تابعنا" }
} as const;

export function createHomePageModel(
  productsOrLocale: readonly CatalogueProductRecord[] | PublicLocale = [],
  localeArg: PublicLocale = "en"
) {
  const locale = typeof productsOrLocale === "string" ? productsOrLocale : localeArg;
  return locale === "ar" ? HOME_PAGE_MODEL_AR : HOME_PAGE_MODEL;
}

export interface HomeFamilyIntroModel { title: string }
export interface HomeQuotationModel {
  eyebrow: string;
  title: string;
  copy: string;
  primary: { label: string; href: Route<string> };
}
export type HomeComprehensiveModel = ReturnType<typeof createHomePageModel>["comprehensive"];
export type HomeConfidenceModel = ReturnType<typeof createHomePageModel>["confidence"];
export type HomeContactBandModel = ReturnType<typeof createHomePageModel>["contactBand"];
export type HomeAssuranceModel = ReturnType<typeof createHomePageModel>["assurance"];
export type HomeSocialModel = ReturnType<typeof createHomePageModel>["social"];
