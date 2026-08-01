import { notFound } from "next/navigation";
import { getAdminNavigationItem } from "@/features/admin-navigation";
import { AdminDeferredRoutePage } from "@/features/admin-routing";

export default async function Page({ params }: { params: Promise<{ segments: string[] }> }) {
  const { segments } = await params;
  const pathname = `/admin/${segments.join("/")}`;
  const item = getAdminNavigationItem(pathname);

  if (!item || item.key === "dashboard") notFound();

  return <AdminDeferredRoutePage routeKey={item.key} />;
}
