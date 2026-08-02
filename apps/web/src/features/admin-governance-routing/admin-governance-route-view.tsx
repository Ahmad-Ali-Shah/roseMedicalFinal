import { notFound } from "next/navigation";
import { AdminContentPage } from "@/features/admin-content/admin-content-page";
import { AdminContactDetailsPage } from "@/features/admin-contact-details/admin-contact-details-page";
import { AdminPublishingPage } from "@/features/admin-publishing/admin-publishing-page";
import { AdminRevisionsPage } from "@/features/admin-revisions/admin-revisions-page";
import { AdminSettingsPage } from "@/features/admin-settings/admin-settings-page";
import type { AdminGovernanceRouteResult } from "./admin-governance-route-model";

export function AdminGovernanceRouteView({
  result
}: {
  result: AdminGovernanceRouteResult;
}) {
  switch (result.kind) {
    case "content":
      return <AdminContentPage />;
    case "contact-details":
      return <AdminContactDetailsPage />;
    case "publishing":
      return <AdminPublishingPage />;
    case "revisions":
      return <AdminRevisionsPage />;
    case "settings":
      return <AdminSettingsPage />;
    case "not-found":
      notFound();
  }
}
