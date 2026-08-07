"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function uploadFamilyHeroImage(formData: FormData) {
  const slug = formData.get("slug") as string;
  const file = formData.get("file") as File;
  if (!slug || !file || file.size === 0) return;

  const admin = createAdminClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `families/${slug}/${Date.now()}.${ext}`;

  const { error: uploadError } = await admin.storage
    .from("product-media")
    .upload(path, file, { upsert: true, contentType: file.type });
  if (uploadError) return;

  const { data: publicUrlData } = admin.storage
    .from("product-media")
    .getPublicUrl(path);

  await admin
    .from("categories")
    .update({ image_path: publicUrlData.publicUrl })
    .eq("slug", slug);

  revalidatePath("/admin/families");
  revalidatePath(`/admin/families/${slug}`);
}
