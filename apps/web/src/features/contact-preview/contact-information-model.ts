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
