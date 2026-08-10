import type { AdminStatusTone } from "@/features/admin-primitives";

export const ADMIN_INQUIRY_WORKFLOW = [
  "New",
  "Reviewed",
  "Contacted",
  "Closed"
] as const;

export type AdminInquiryStatus = (typeof ADMIN_INQUIRY_WORKFLOW)[number];

export function normalizeInquiryStatus(value: string | null | undefined): AdminInquiryStatus {
  return ADMIN_INQUIRY_WORKFLOW.includes(value as AdminInquiryStatus)
    ? value as AdminInquiryStatus
    : "New";
}

export const INQUIRY_WORKFLOW_COPY: Record<AdminInquiryStatus, string> = {
  New: "A submission has entered the protected owner queue and needs review.",
  Reviewed: "Requirements and preserved product snapshots have been checked.",
  Contacted: "The owner has initiated an external conversation.",
  Closed: "The inquiry no longer requires active follow-up."
};

export function getInquiryStatusTone(
  status: AdminInquiryStatus
): AdminStatusTone {
  switch (status) {
    case "New":
      return "warning";
    case "Reviewed":
      return "review";
    case "Contacted":
      return "ready";
    case "Closed":
      return "archived";
  }
}
