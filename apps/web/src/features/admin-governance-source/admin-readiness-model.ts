import type { AdminStatusTone } from "@/features/admin-primitives";

export type AdminReadinessKey = "contact" | "pdfs" | "media" | "legal" | "arabic";

export type AdminReadinessStatus =
  | "Awaiting confirmation"
  | "Awaiting publication"
  | "Awaiting replacement"
  | "Awaiting legal approval"
  | "Deferred";

export interface AdminReadinessItem {
  key: AdminReadinessKey;
  label: string;
  status: AdminReadinessStatus;
  tone: Extract<AdminStatusTone, "neutral" | "warning">;
}

export const ADMIN_READINESS_ITEMS = [
  {
    key: "contact",
    label: "Contact information",
    status: "Awaiting confirmation",
    tone: "warning"
  },
  {
    key: "pdfs",
    label: "Catalogue PDF paths",
    status: "Awaiting publication",
    tone: "warning"
  },
  {
    key: "media",
    label: "Product media",
    status: "Awaiting replacement",
    tone: "warning"
  },
  {
    key: "legal",
    label: "Privacy and Terms",
    status: "Awaiting legal approval",
    tone: "warning"
  },
  {
    key: "arabic",
    label: "Arabic content",
    status: "Deferred",
    tone: "neutral"
  }
] as const satisfies readonly AdminReadinessItem[];
