import { notFound } from "next/navigation";
import { AdminInquiriesPage } from "@/features/admin-inquiries/admin-inquiries-page";
import { AdminMessagesPage } from "@/features/admin-messages/admin-messages-page";
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
