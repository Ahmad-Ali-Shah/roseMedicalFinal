import { notFound } from "next/navigation";
import { getAdminNavigationItem } from "@/features/admin-navigation";
import { AdminDeferredRoutePage } from "@/features/admin-routing";
import {
  AdminManagementRouteView,
  isAdminManagementRoot,
  resolveAdminManagementRoute
} from "@/features/admin-management-routing";

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

  const root = segments[0] ?? "";
  if (isAdminManagementRoot(root)) notFound();

  const pathname = `/admin/${segments.join("/")}`;
  const item = getAdminNavigationItem(pathname);
  if (!item || item.key === "dashboard") notFound();

  return <AdminDeferredRoutePage routeKey={item.key} />;
}
