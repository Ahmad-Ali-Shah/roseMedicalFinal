import { PUBLIC_CONTENT_VALUES } from "@/features/public-content-registry";

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
  { label: "Telephone", labelAr: "الهاتف", value: PUBLIC_CONTENT_VALUES.contactDetails.phone, href: PUBLIC_CONTENT_VALUES.contactDetails.phoneHref, confirmed: true, ltr: true },
  { label: "Email", labelAr: "البريد الإلكتروني", value: PUBLIC_CONTENT_VALUES.contactDetails.email, href: PUBLIC_CONTENT_VALUES.contactDetails.emailHref, confirmed: true, ltr: true },
  { label: "Working hours", labelAr: "ساعات العمل", value: "Sunday–Thursday, 09:00–17:00 (AST)", valueAr: "الأحد–الخميس، 09:00–17:00 (بتوقيت السعودية)", confirmed: true }
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
