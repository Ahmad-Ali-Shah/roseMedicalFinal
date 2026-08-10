import type { AdminStatusTone } from "@/features/admin-primitives";

export const ADMIN_MESSAGE_WORKFLOW = [
  "New",
  "Reviewed",
  "Closed"
] as const;

export type AdminMessageStatus = (typeof ADMIN_MESSAGE_WORKFLOW)[number];

export function normalizeMessageStatus(value: string | null | undefined): AdminMessageStatus {
  if (value === "Read" || value === "Replied") return "Reviewed";
  return ADMIN_MESSAGE_WORKFLOW.includes(value as AdminMessageStatus)
    ? value as AdminMessageStatus
    : "New";
}

export const MESSAGE_WORKFLOW_COPY: Record<AdminMessageStatus, string> = {
  New: "A message has entered the protected owner queue.",
  Reviewed: "The owner has reviewed the message.",
  Closed: "The message no longer requires active follow-up."
};

export function getMessageStatusTone(
  status: AdminMessageStatus
): AdminStatusTone {
  switch (status) {
    case "New":
      return "warning";
    case "Reviewed":
      return "review";
    case "Closed":
      return "archived";
  }
}
