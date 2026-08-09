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
import {
  getAdminCatalogueProducts,
  getProductByPublicRoute
} from "@/features/catalogue-live";
import { AdminMediaPage } from "@/features/admin-media";
import {
  AdminProductCreatePage,
  AdminProductEditorPage,
  AdminProductsListPage,
  getAdminProductEditor
} from "@/features/admin-products";
import type { AdminManagementRouteResult } from "./admin-management-route-model";

export async function AdminManagementRouteView({
  result
}: {
  result: AdminManagementRouteResult;
}) {
  switch (result.kind) {
    case "products":
      return <AdminProductsListPage />;
    case "new-product":
      return <AdminProductCreatePage />;
    case "product": {
      const products = await getAdminCatalogueProducts();
      const product = getProductByPublicRoute(
        products,
        result.familySlug,
        result.productSlug
      );
      if (!product) notFound();

      const model = getAdminProductEditor(product);
      if (!model) notFound();
      return <AdminProductEditorPage model={model} />;
    }
    case "families":
      return <AdminFamiliesPage />;
    case "family": {
      const model = await getAdminFamilyEditor(result.family.slug);
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
