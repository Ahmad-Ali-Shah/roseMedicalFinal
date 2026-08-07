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
import { createClient } from "@/lib/supabase/server";
import type { AdminManagementRouteResult } from "./admin-management-route-model";

export async function AdminManagementRouteView({
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

      const dbSlug = `${result.family.slug}-${result.product.slug}`;
      const supabase = await createClient();
      const [categoriesRes, productRes] = await Promise.all([
        supabase
          .from("categories")
          .select("id, name_en, slug")
          .is("deleted_at", null)
          .order("sort_order", { ascending: true }),
        supabase
          .from("products")
          .select("id, category_id")
          .eq("slug", dbSlug)
          .maybeSingle()
      ]);
      const productId = productRes.data?.id ?? null;
      let imageUrl: string | null = null;
      if (productId) {
        const { data: imageRow } = await supabase
          .from("product_images")
          .select("image_path")
          .eq("product_id", productId)
          .eq("sort_order", 0)
          .maybeSingle();
        imageUrl = imageRow?.image_path ?? null;
      }

      return (
        <AdminProductEditorPage
          model={model}
          dbSlug={dbSlug}
          productId={productId}
          imageUrl={imageUrl}
          categories={categoriesRes.data ?? []}
          currentCategoryId={productRes.data?.category_id ?? null}
        />
      );
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
