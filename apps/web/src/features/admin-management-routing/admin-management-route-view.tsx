import { notFound } from "next/navigation";
import {
  AdminCatalogueDetailPage,
  AdminCataloguesPage,
  getAdminCatalogueEditor
} from "@/features/admin-catalogues";
import {
  AdminFamiliesPage,
  AdminFamilyEditorPage,
  getAdminFamilyEditor
} from "@/features/admin-families";
import { AdminMediaPage } from "@/features/admin-media";
import {
  AdminProductEditorPage,
  AdminProductsListPage,
  getAdminProductEditor
} from "@/features/admin-products";
import type { AdminManagementRouteResult } from "./admin-management-route-model";

export function AdminManagementRouteView({
  result
}: {
  result: AdminManagementRouteResult;
}) {
  switch (result.kind) {
    case "products":
      return <AdminProductsListPage />;
    case "product": {
      const model = getAdminProductEditor(result.family.slug, result.product.slug);
      if (!model) notFound();
      return <AdminProductEditorPage model={model} />;
    }
    case "families":
      return <AdminFamiliesPage />;
    case "family": {
      const model = getAdminFamilyEditor(result.family.slug);
      if (!model) notFound();
      return <AdminFamilyEditorPage model={model} />;
    }
    case "catalogues":
      return <AdminCataloguesPage />;
    case "catalogue": {
      const model = getAdminCatalogueEditor(result.family.slug);
      if (!model) notFound();
      return <AdminCatalogueDetailPage model={model} />;
    }
    case "media":
      return <AdminMediaPage />;
    case "not-found":
      notFound();
  }
}
