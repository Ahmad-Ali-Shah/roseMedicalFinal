import type { Route } from "next";
import type { PublicLocale } from "@/features/localization";
import type { SupportedBuyerMediaKey } from "@/features/public-media";

export type AboutStoryId = "workflow" | "growth" | "experience";
export type AboutMediaSide = "left" | "right";
export type AboutComplianceId =
  | "regulations"
  | "legal-system"
  | "standards"
  | "law"
  | "rules"
  | "requirements";
export type AboutDocumentId = "iso" | "mdma" | "mdel" | "ar" | "warehouse";

export interface AboutStoryModel {
  id: AboutStoryId;
  title: string;
  copy: string;
  mediaSide: AboutMediaSide;
  mediaSlot: `about-client-${AboutStoryId}`;
  mediaLabel: string;
}

export interface AboutComplianceItem {
  id: AboutComplianceId;
  label: string;
}

export interface AboutDocumentModel {
  id: AboutDocumentId;
  label: "ISO" | "MDMA" | "MDEL" | "AR" | "WAREHOUSE";
  mediaSlot: `about-client-document-${AboutDocumentId}`;
}

export interface AboutPageModel {
  hero: {
    eyebrow: string;
    title: string;
    copy: string;
    mediaSlot: "about-client-hero";
    mediaLabel: string;
    primary: { label: string; href: Route<string> };
    secondary: { label: string; href: Route<string> };
  };
  introduction: { title: string; copy: string };
  stories: readonly AboutStoryModel[];
  contact: {
    eyebrow: string;
    title: string;
    whatsappLabel: string;
    emailLabel: string;
  };
  compliance: {
    title: string;
    items: readonly AboutComplianceItem[];
  };
  documents: readonly AboutDocumentModel[];
  quotation: {
    eyebrow: string;
    title: string;
    copy: string;
    primary: { label: string; href: Route<string> };
  };
  social: { title: string };
}

const ABOUT_DOCUMENTS: readonly AboutDocumentModel[] = [
  { id: "iso", label: "ISO", mediaSlot: "about-client-document-iso" },
  { id: "mdma", label: "MDMA", mediaSlot: "about-client-document-mdma" },
  { id: "mdel", label: "MDEL", mediaSlot: "about-client-document-mdel" },
  { id: "ar", label: "AR", mediaSlot: "about-client-document-ar" },
  { id: "warehouse", label: "WAREHOUSE", mediaSlot: "about-client-document-warehouse" }
] as const;

const ABOUT_PAGE_MODEL_EN: AboutPageModel = {
  hero: {
    eyebrow: "Medical Device Supplier",
    title: "Precision, clarity and dependable medical sourcing.",
    copy: "Rosa Medical brings structured product information, catalogue references and quotation support together for professional buyers.",
    mediaSlot: "about-client-hero",
    mediaLabel: "About Rosa editorial medical image pending",
    primary: { label: "Explore Products", href: "/products" },
    secondary: { label: "Request a Quote", href: "/request-quotation" }
  },
  introduction: {
    title: "About Rosa",
    copy: "At Rosa, we focus on clear product presentation, dependable communication and thoughtful support for professional medical sourcing. Our catalogue-led approach keeps instrument families, product references and inquiry details organised so buyers can move from discovery to follow-up with greater confidence."
  },
  stories: [
    {
      id: "workflow",
      title: "Our Workflow",
      copy: "Our workflow is built around clarity from the first catalogue review to the final inquiry. Product references, options, quantities and notes stay organised so requirements can be reviewed efficiently and communicated without unnecessary complexity.",
      mediaSide: "left",
      mediaSlot: "about-client-workflow",
      mediaLabel: "Workflow editorial image pending"
    },
    {
      id: "growth",
      title: "Business Growth",
      copy: "Sustainable business growth depends on reliable information, responsive follow-up and consistent service. Rosa supports that process by making product discovery and quotation preparation easier to navigate for professional buyers and trading partners.",
      mediaSide: "right",
      mediaSlot: "about-client-growth",
      mediaLabel: "Business growth editorial image pending"
    },
    {
      id: "experience",
      title: "Experience Sharing",
      copy: "We treat every inquiry as an opportunity to improve understanding. Clear communication between buyers, partners and our team helps turn product knowledge and practical requirements into better organised sourcing decisions.",
      mediaSide: "left",
      mediaSlot: "about-client-experience",
      mediaLabel: "Experience sharing editorial image pending"
    }
  ],
  contact: {
    eyebrow: "Direct support",
    title: "Get in Touch Now",
    whatsappLabel: "WhatsApp Chat",
    emailLabel: "Email"
  },
  compliance: {
    title: "COMPLIANCE",
    items: [
      { id: "regulations", label: "Regulations" },
      { id: "legal-system", label: "Legal System" },
      { id: "standards", label: "Standards" },
      { id: "law", label: "Law" },
      { id: "rules", label: "Rules" },
      { id: "requirements", label: "Requirements" }
    ]
  },
  documents: ABOUT_DOCUMENTS,
  quotation: {
    eyebrow: "REQUEST A QUOTATION",
    title: "Prepare your instruments inquiry.",
    copy: "Build a structured product list and send one clear request to Rosa Medical.",
    primary: { label: "Request a Quote", href: "/request-quotation" }
  },
  social: { title: "Follow Us" }
};

const ABOUT_PAGE_MODEL_AR: AboutPageModel = {
  hero: {
    eyebrow: "مورد أجهزة وأدوات طبية",
    title: "الدقة والوضوح لدعم توريد الأدوات الطبية.",
    copy: "تجمع روزا ميديكال معلومات المنتجات ومراجع الكتالوج ودعم طلبات عروض الأسعار في مسار واضح للمشترين المهنيين.",
    mediaSlot: "about-client-hero",
    mediaLabel: "صورة تحريرية عن روزا بانتظار الإضافة",
    primary: { label: "استعرض المنتجات", href: "/products" },
    secondary: { label: "اطلب عرض سعر", href: "/request-quotation" }
  },
  introduction: {
    title: "عن روزا",
    copy: "تركز روزا على عرض المنتجات بوضوح والتواصل الموثوق والدعم المنظم لعمليات التوريد الطبي المهنية. ويساعد نهجنا القائم على الكتالوج في ترتيب عائلات الأدوات ومراجع المنتجات وتفاصيل الاستفسار للانتقال من الاستكشاف إلى المتابعة بصورة أوضح."
  },
  stories: [
    {
      id: "workflow",
      title: "سير العمل",
      copy: "يعتمد سير العمل لدينا على الوضوح من مراجعة الكتالوج الأولى حتى إعداد الاستفسار. تبقى مراجع المنتجات والخيارات والكميات والملاحظات منظمة لتسهيل المراجعة والتواصل دون تعقيد غير ضروري.",
      mediaSide: "left",
      mediaSlot: "about-client-workflow",
      mediaLabel: "صورة سير العمل بانتظار الإضافة"
    },
    {
      id: "growth",
      title: "نمو الأعمال",
      copy: "يعتمد نمو الأعمال المستدام على المعلومات الموثوقة والمتابعة السريعة والخدمة المتسقة. وتدعم روزا هذه العملية عبر تسهيل اكتشاف المنتجات وتجهيز طلبات عروض الأسعار للمشترين المهنيين وشركاء التجارة.",
      mediaSide: "right",
      mediaSlot: "about-client-growth",
      mediaLabel: "صورة نمو الأعمال بانتظار الإضافة"
    },
    {
      id: "experience",
      title: "تبادل الخبرات",
      copy: "نتعامل مع كل استفسار كفرصة لتحسين الفهم. ويساعد التواصل الواضح بين المشترين والشركاء وفريقنا على تحويل معرفة المنتجات والمتطلبات العملية إلى قرارات توريد أكثر تنظيماً.",
      mediaSide: "left",
      mediaSlot: "about-client-experience",
      mediaLabel: "صورة تبادل الخبرات بانتظار الإضافة"
    }
  ],
  contact: {
    eyebrow: "دعم مباشر",
    title: "تواصل معنا الآن",
    whatsappLabel: "محادثة واتساب",
    emailLabel: "البريد الإلكتروني"
  },
  compliance: {
    title: "الامتثال",
    items: [
      { id: "regulations", label: "اللوائح" },
      { id: "legal-system", label: "النظام القانوني" },
      { id: "standards", label: "المعايير" },
      { id: "law", label: "القانون" },
      { id: "rules", label: "القواعد" },
      { id: "requirements", label: "المتطلبات" }
    ]
  },
  documents: ABOUT_DOCUMENTS,
  quotation: {
    eyebrow: "اطلب عرض سعر",
    title: "جهّز استفسارك عن الأدوات.",
    copy: "أنشئ قائمة منظمة بالمنتجات وأرسل طلباً واضحاً إلى روزا ميديكال.",
    primary: { label: "اطلب عرض سعر", href: "/request-quotation" }
  },
  social: { title: "تابعنا" }
};

export function createAboutPageModel(locale: PublicLocale = "en"): AboutPageModel {
  return locale === "ar" ? ABOUT_PAGE_MODEL_AR : ABOUT_PAGE_MODEL_EN;
}

// Legacy exported content remains available for reusable components that are no longer
// rendered by the client-redesigned About composition.
export const COMPANY_PROFILE = {
  eyebrow: "Our company",
  title: "We are Rosa Medical.",
  lead: "A focused partner for clearer instrument sourcing.",
  paragraphs: [
    "Rosa Medical presents surgical instruments through clear product families, exact catalogue references and a practical quotation path.",
    "Our role is to help professional buyers move from product discovery to an organised requirement that can be reviewed and followed up with confidence."
  ],
  principles: [
    { label: "Focused", copy: "Instrument information arranged around real selection decisions." },
    { label: "Considered", copy: "A calm, professional route from catalogue review to inquiry." },
    { label: "Connected", copy: "Product codes, quantities and notes kept together for follow-up." }
  ]
} as const;

export const COMPANY_PROFILE_AR = {
  eyebrow: "شركتنا",
  title: "نحن روزا ميديكال.",
  lead: "شريك يركز على جعل توريد الأدوات أكثر وضوحًا.",
  paragraphs: [
    "تقدم روزا ميديكال الأدوات الجراحية ضمن عائلات واضحة ومراجع كتالوج دقيقة ومسار عملي لطلب عرض السعر.",
    "يتمثل دورنا في مساعدة المشترين المهنيين على الانتقال من اكتشاف المنتج إلى متطلبات منظمة يمكن مراجعتها ومتابعتها بثقة."
  ],
  principles: [
    { label: "تركيز", copy: "معلومات الأدوات مرتبة حول قرارات الاختيار العملية." },
    { label: "عناية", copy: "مسار مهني هادئ من مراجعة الكتالوج إلى الاستفسار." },
    { label: "ترابط", copy: "رموز المنتجات والكميات والملاحظات مجمعة للمتابعة." }
  ]
} as const;

export interface SupportedBuyerRecord {
  sequence: string;
  title: string;
  mediaKey: SupportedBuyerMediaKey;
}

export const SUPPORTED_BUYERS = [
  { sequence: "01", title: "Hospitals and clinics", mediaKey: "hospitals" },
  { sequence: "02", title: "Procurement teams", mediaKey: "procurement" },
  { sequence: "03", title: "Distributors and wholesalers", mediaKey: "distributors" },
  { sequence: "04", title: "International buyers", mediaKey: "international" }
] as const satisfies readonly SupportedBuyerRecord[];

export const SUPPORTED_BUYERS_AR = [
  { sequence: "01", title: "المستشفيات والعيادات", mediaKey: "hospitals" },
  { sequence: "02", title: "فرق المشتريات", mediaKey: "procurement" },
  { sequence: "03", title: "الموزعون وتجار الجملة", mediaKey: "distributors" },
  { sequence: "04", title: "المشترون الدوليون", mediaKey: "international" }
] as const satisfies readonly SupportedBuyerRecord[];
