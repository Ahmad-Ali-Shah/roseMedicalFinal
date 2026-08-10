"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function uploadMediaAsset(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file || file.size === 0) return;

  const admin = createAdminClient();
  const path = `uploads/${Date.now()}_${file.name.replace(/[^a-z0-9.]/gi, "_")}`;

  const { error } = await admin.storage
    .from("product-media")
    .upload(path, file, { upsert: true, contentType: file.type });

  if (error) {
    console.error("Error uploading media:", error);
    return;
  }

  revalidatePath("/admin/media");
}
