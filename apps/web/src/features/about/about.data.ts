import type { SupportedBuyerMediaKey } from "@/features/public-media";

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
