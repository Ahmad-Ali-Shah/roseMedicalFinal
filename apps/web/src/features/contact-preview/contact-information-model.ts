export interface ContactInformationRow {
  label: string;
  value: string;
  confirmed: boolean;
}

export const CONTACT_INFORMATION = [
  { label: "Business name", value: "Rosa Medical", confirmed: true },
  { label: "Address", value: "Awaiting client confirmation", confirmed: false },
  { label: "Telephone", value: "Awaiting client confirmation", confirmed: false },
  { label: "WhatsApp", value: "Awaiting client confirmation", confirmed: false },
  { label: "Email", value: "Awaiting client confirmation", confirmed: false },
  { label: "Working hours", value: "Awaiting client confirmation", confirmed: false },
  { label: "Social profiles", value: "Awaiting client confirmation", confirmed: false }
] as const satisfies readonly ContactInformationRow[];
