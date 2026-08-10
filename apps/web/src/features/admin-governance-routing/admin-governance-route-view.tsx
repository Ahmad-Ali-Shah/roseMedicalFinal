import { notFound } from "next/navigation";
import { AdminContactDetailsPage } from "@/features/admin-contact-details/admin-contact-details-page";
import type { AdminGovernanceRouteResult } from "./admin-governance-route-model";

export function AdminGovernanceRouteView({
  result
}: {
  result: AdminGovernanceRouteResult;
}) {
  switch (result.kind) {
    case "contact-details":
      return <AdminContactDetailsPage />;
    case "not-found":
      notFound();
  }
}
