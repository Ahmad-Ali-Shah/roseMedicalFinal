export type AdminSettingStatus = "Not connected" | "Not configured" | "Deferred" | "Structurally supported" | "Protected" | "Unavailable";

export interface AdminSettingItem {
  key: string;
  label: string;
  value: string;
  status: AdminSettingStatus;
}

export interface AdminSettingsGroup {
  key: "owner" | "notifications" | "preview" | "arabic" | "storage-deployment";
  label: string;
  description: string;
  items: readonly AdminSettingItem[];
}

export const ADMIN_SETTINGS_GROUPS = [
  {
    key: "owner",
    label: "Owner account",
    description: "Authentication and recovery configuration require a protected backend session.",
    items: [
      { key: "authentication", label: "Owner authentication", value: "Owner authentication not connected", status: "Not connected" },
      { key: "email", label: "Owner email", value: "Owner email unavailable until authenticated configuration exists", status: "Unavailable" }
    ]
  },
  {
    key: "notifications",
    label: "Notifications",
    description: "Delivery recipients and an email provider are not configured.",
    items: [
      { key: "messages", label: "General-message notification recipient", value: "Not configured", status: "Not configured" },
      { key: "quotations", label: "Quotation notification recipient", value: "Not configured", status: "Not configured" },
      { key: "provider", label: "Email provider", value: "Not connected", status: "Not connected" }
    ]
  },
  {
    key: "preview",
    label: "Public preview",
    description: "The current public composition is available, but no draft-preview environment exists.",
    items: [
      { key: "current", label: "Current public composition", value: "Available at the public site", status: "Structurally supported" },
      { key: "environment", label: "Draft preview environment", value: "Not connected", status: "Not connected" },
      { key: "url", label: "Preview URL", value: "Not configured", status: "Not configured" }
    ]
  },
  {
    key: "arabic",
    label: "Arabic publishing",
    description: "Arabic field structure exists, but production publishing remains protected.",
    items: [
      { key: "launch", label: "Arabic public launch", value: "Deferred", status: "Deferred" },
      { key: "fields", label: "Arabic editing fields", value: "Structurally supported", status: "Structurally supported" },
      { key: "publishing", label: "Arabic publishing", value: "Protected until content review and the Arabic production gate", status: "Protected" }
    ]
  },
  {
    key: "storage-deployment",
    label: "Storage and deployment",
    description: "Upload, persistence and deployment providers have not been connected.",
    items: [
      { key: "uploads", label: "Managed uploads", value: "Not connected", status: "Not connected" },
      { key: "pdfs", label: "Catalogue PDF storage", value: "Not connected", status: "Not connected" },
      { key: "deployment", label: "Deployment publishing", value: "Not connected", status: "Not connected" },
      { key: "revisions", label: "Revision persistence", value: "Not connected", status: "Not connected" }
    ]
  }
] as const satisfies readonly AdminSettingsGroup[];

export const PROTECTED_SYSTEM_SETTINGS = [
  "ROSA identity",
  "Lora and Inter typography",
  "Brand palette",
  "Design tokens",
  "Component library",
  "Public templates",
  "Route structure",
  "Navigation",
  "Security policy",
  "Data retention",
  "Backend infrastructure"
] as const;
