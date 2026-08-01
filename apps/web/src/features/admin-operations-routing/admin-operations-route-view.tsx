import { notFound } from "next/navigation";
import { AdminInquiriesPage } from "@/features/admin-inquiries";
import { AdminMessagesPage } from "@/features/admin-messages";
import type { AdminOperationsRouteResult } from "./admin-operations-route-model";

export function AdminOperationsRouteView({
  result
}: {
  result: AdminOperationsRouteResult;
}) {
  switch (result.kind) {
    case "inquiries":
      return <AdminInquiriesPage />;
    case "messages":
      return <AdminMessagesPage />;
    case "not-found":
      notFound();
  }
}
