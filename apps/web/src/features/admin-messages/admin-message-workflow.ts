import type { AdminStatusTone } from "@/features/admin-primitives";

export const ADMIN_MESSAGE_WORKFLOW = [
  "New",
  "Read",
  "Replied",
  "Closed"
] as const;

export type AdminMessageStatus = (typeof ADMIN_MESSAGE_WORKFLOW)[number];

export const MESSAGE_WORKFLOW_COPY: Record<AdminMessageStatus, string> = {
  New: "A message has entered the protected owner queue.",
  Read: "The owner has reviewed the message.",
  Replied: "The owner has responded through a future external communication workflow.",
  Closed: "The message no longer requires active follow-up."
};

export function getMessageStatusTone(
  status: AdminMessageStatus
): AdminStatusTone {
  switch (status) {
    case "New":
      return "warning";
    case "Read":
      return "review";
    case "Replied":
      return "ready";
    case "Closed":
      return "archived";
  }
}
