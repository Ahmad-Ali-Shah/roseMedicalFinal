"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function uploadCataloguePdf(formData: FormData) {
  const slug = formData.get("slug") as string;
  const file = formData.get("file") as File;

  if (!slug || !file || file.size === 0) return;

  const admin = createAdminClient();
  const ext = file.name.split(".").pop() || "pdf";
  const path = `catalogues/${slug}/${Date.now()}.${ext}`;

  const { error: uploadError } = await admin.storage
    .from("product-media")
    .upload(path, file, { upsert: true, contentType: file.type || "application/pdf" });

  if (uploadError) {
    console.error("Upload error:", uploadError);
    return;
  }

  const { data: publicUrlData } = admin.storage
    .from("product-media")
    .getPublicUrl(path);

  const pdfUrl = publicUrlData.publicUrl;

  const key = `catalogue_pdf_${slug}`;
  const { data: existing } = await admin
    .from("site_settings")
    .select("key")
    .eq("key", key)
    .maybeSingle();

  if (existing) {
    await admin
      .from("site_settings")
      .update({ value_en: pdfUrl, updated_at: new Date().toISOString() })
      .eq("key", key);
  } else {
    await admin
      .from("site_settings")
      .insert({ key, value_en: pdfUrl, value_ar: pdfUrl, updated_at: new Date().toISOString() });
  }

  revalidatePath("/admin/catalogues");
  revalidatePath(`/admin/catalogues/${slug}`);
  revalidatePath("/catalogues");
}
