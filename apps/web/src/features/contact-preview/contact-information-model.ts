export interface ContactInformationRow {
  label: string;
  labelAr: string;
  value: string;
  valueAr?: string;
  confirmed: boolean;
  href?: string;
  external?: boolean;
  ltr?: boolean;
}

export const CONTACT_INFORMATION: readonly ContactInformationRow[] = [
  { label: "Business name", labelAr: "اسم المنشأة", value: "Rosa Medical", valueAr: "روزا ميديكال", confirmed: true },
  { label: "Address", labelAr: "العنوان", value: "King Fahd Road, Al Olaya, Riyadh 12214, Saudi Arabia", valueAr: "طريق الملك فهد، العليا، الرياض 12214، المملكة العربية السعودية", confirmed: true },
  { label: "Telephone", labelAr: "الهاتف", value: "+966 11 555 0142", href: "tel:+966115550142", confirmed: true, ltr: true },
  { label: "WhatsApp", labelAr: "واتساب", value: "+966 50 555 0142", href: "https://wa.me/966505550142", confirmed: true, external: true, ltr: true },
  { label: "Email", labelAr: "البريد الإلكتروني", value: "hello@example.com", href: "mailto:hello@example.com", confirmed: true, ltr: true },
  { label: "Working hours", labelAr: "ساعات العمل", value: "Sunday–Thursday, 09:00–17:00 (AST)", valueAr: "الأحد–الخميس، 09:00–17:00 (بتوقيت السعودية)", confirmed: true },
  { label: "Social profiles", labelAr: "حسابات التواصل", value: "@rosamedicalexample", href: "https://example.com/rosa-medical", confirmed: true, external: true, ltr: true }
];

export interface SiteSettingLike {
  key: string;
  value_en: string | null;
  value_ar: string | null;
}

const CONTACT_SETTING_KEY_BY_LABEL: Record<string, string> = {
  "Business name": "contact_business_name",
  "Address": "contact_address",
  "Telephone": "contact_phone",
  "WhatsApp": "contact_whatsapp",
  "Email": "contact_email",
  "Working hours": "contact_working_hours"
};

function buildDynamicHref(label: string, value: string): { href?: string; external?: boolean } {
  if (label === "Telephone") return { href: `tel:${value.replace(/[^\d+]/g, "")}` };
  if (label === "WhatsApp") return { href: `https://wa.me/${value.replace(/\D/g, "")}`, external: true };
  if (label === "Email") return { href: `mailto:${value}` };
  return {};
}

export function buildContactInformation(
  settings: readonly SiteSettingLike[] = []
): ContactInformationRow[] {
  return CONTACT_INFORMATION.map((row) => {
    const settingKey = CONTACT_SETTING_KEY_BY_LABEL[row.label];
    if (!settingKey) return row;
    const setting = settings.find((entry) => entry.key === settingKey);
    const value = setting?.value_en?.trim() || row.value;
    const valueAr = setting?.value_ar?.trim() || row.valueAr;
    const dynamicHref = buildDynamicHref(row.label, value);
    const href = dynamicHref.href ?? row.href;
    const external = dynamicHref.external ?? row.external;
    return {
      ...row,
      value,
      ...(valueAr !== undefined ? { valueAr } : {}),
      ...(href !== undefined ? { href } : {}),
      ...(external !== undefined ? { external } : {})
    };
  });
}
