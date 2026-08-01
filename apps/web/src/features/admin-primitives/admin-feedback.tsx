import type { ReactNode } from "react";
import { Alert } from "@/components/ui";
import type { AdminStatusTone } from "./admin-status";

export function AdminAlert({
  tone = "neutral",
  title,
  children
}: {
  tone?: AdminStatusTone;
  title: string;
  children: ReactNode;
}) {
  const baseTone = tone === "danger" || tone === "warning" || tone === "success"
    ? tone
    : "neutral";

  return (
    <Alert
      tone={baseTone}
      title={title}
      className="admin-alert"
      data-admin-alert-tone={tone}
    >
      {children}
    </Alert>
  );
}
