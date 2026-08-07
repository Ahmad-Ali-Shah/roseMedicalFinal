"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function updateProductCategory(formData: FormData) {
  const slug = formData.get("slug") as string;
  const categoryId = formData.get("category_id") as string;

  if (!slug || !categoryId) return;

  const admin = createAdminClient();

  await admin
    .from("products")
    .update({ category_id: categoryId })
    .eq("slug", slug);

  revalidatePath("/admin/products");
  revalidatePath("/admin/families");
}

export async function uploadProductMedia(formData: FormData) {
  const productId = formData.get("product_id") as string;
  const slug = formData.get("slug") as string;
  const file = formData.get("file") as File;

  if (!productId || !slug || !file || file.size === 0) return;

  const admin = createAdminClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${slug}/${Date.now()}.${ext}`;

  const { error: uploadError } = await admin.storage
    .from("product-media")
    .upload(path, file, { upsert: true, contentType: file.type });

  if (uploadError) return;

  const { data: publicUrlData } = admin.storage
    .from("product-media")
    .getPublicUrl(path);

  const { data: existing } = await admin
    .from("product_images")
    .select("id")
    .eq("product_id", productId)
    .eq("sort_order", 0)
    .maybeSingle();

  if (existing) {
    await admin
      .from("product_images")
      .update({ image_path: publicUrlData.publicUrl })
      .eq("id", existing.id);
  } else {
    await admin
      .from("product_images")
      .insert({ product_id: productId, image_path: publicUrlData.publicUrl, sort_order: 0 });
  }

  revalidatePath("/admin/products");
}
