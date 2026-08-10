import { AdminAlert, AdminPageHeader } from "@/features/admin-primitives";
import { getLiveAdminFamilyRows } from "@/features/admin-families";
import { AdminProductCreateForm } from "./admin-product-create-form";

export async function AdminProductCreatePage() {
  const families = await getLiveAdminFamilyRows();

  return (
    <div className="admin-product-editor">
      <AdminPageHeader
        eyebrow="Products"
        title="Add a new product."
        description="New products are created as drafts and stay off the public catalogue until you activate them."
      />

      <AdminAlert tone="info" title="Draft-first workflow">
        This product is saved as a draft (inactive). Upload its primary image and activate it from the product editor once it is ready.
      </AdminAlert>

      <AdminProductCreateForm families={families} />
    </div>
  );
}
