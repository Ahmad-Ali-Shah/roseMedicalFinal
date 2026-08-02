import { CONTACT_INFORMATION } from "@/features/contact-preview/contact-information-model";

export type ContactImpactStatus = "Current frontend consumer" | "Not implemented";

export interface ContactImpactRow {
  key:
    | "contact-page"
    | "footer"
    | "inquiry-confirmation"
    | "message-confirmation"
    | "email-templates";
  label: string;
  fields: readonly string[];
  status: ContactImpactStatus;
}

export const CONTACT_IMPACT_ROWS = [
  {
    key: "contact-page",
    label: "Public Contact page",
    fields: ["Business name", "Address", "Telephone", "WhatsApp", "Email", "Working hours", "Social profiles"],
    status: "Current frontend consumer"
  },
  {
    key: "footer",
    label: "Public footer contact column",
    fields: ["Address", "Telephone", "Email", "Working hours"],
    status: "Not implemented"
  },
  {
    key: "inquiry-confirmation",
    label: "Inquiry confirmation",
    fields: ["Business name", "Email"],
    status: "Not implemented"
  },
  {
    key: "message-confirmation",
    label: "Contact-message confirmation",
    fields: ["Business name", "Email"],
    status: "Not implemented"
  },
  {
    key: "email-templates",
    label: "Future email templates",
    fields: ["Business name", "Email"],
    status: "Not implemented"
  }
] as const satisfies readonly ContactImpactRow[];

export function getUnresolvedContactCount(): number {
  return CONTACT_INFORMATION.filter((row) => !row.confirmed).length;
}
