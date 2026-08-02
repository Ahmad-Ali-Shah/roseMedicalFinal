import { notFound } from "next/navigation";
import {
  AdminGovernanceRouteView,
  isAdminGovernanceRoot,
  resolveAdminGovernanceRoute
} from "@/features/admin-governance-routing";
import {
  AdminManagementRouteView,
  isAdminManagementRoot,
  resolveAdminManagementRoute
} from "@/features/admin-management-routing";
import {
  AdminOperationsRouteView,
  isAdminOperationsRoot,
  resolveAdminOperationsRoute
} from "@/features/admin-operations-routing";

export default async function Page({
  params
}: {
  params: Promise<{ segments: string[] }>;
}) {
  const { segments } = await params;
  const management = resolveAdminManagementRoute(segments);

  if (management.kind !== "not-found") {
    return <AdminManagementRouteView result={management} />;
  }

  const operations = resolveAdminOperationsRoute(segments);

  if (operations.kind !== "not-found") {
    return <AdminOperationsRouteView result={operations} />;
  }

  const governance = resolveAdminGovernanceRoute(segments);

  if (governance.kind !== "not-found") {
    return <AdminGovernanceRouteView result={governance} />;
  }

  const root = segments[0] ?? "";
  if (
    isAdminManagementRoot(root) ||
    isAdminOperationsRoot(root) ||
    isAdminGovernanceRoot(root)
  ) {
    notFound();
  }

  notFound();
}
