"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminUser } from "@/lib/supabase/admin-auth";
import { revalidatePath } from "next/cache";
import { clearCatalogueProjectionCache } from "@/features/catalogue-live/catalogue-live.cache";

function value(formData: FormData, key: string): string {
  const input = formData.get(key);
  return typeof input === "string" ? input.trim() : "";
}

export async function saveFamily(formData: FormData) {
  const slug = value(formData, "slug");
  const nameEn = value(formData, "name_en");
  const nameAr = value(formData, "name_ar") || nameEn;
  const introductionEn = value(formData, "introduction_en");

  if (!slug || !nameEn || !introductionEn) {
    throw new Error("English name and introduction are required.");
  }

  await requireAdminUser();
  const admin = createAdminClient();
  const { error: categoryError } = await admin
    .from("categories")
    .update({ name_en: nameEn, name_ar: nameAr })
    .eq("slug", slug);

  if (categoryError) throw new Error(`Family update failed: ${categoryError.message}`);

  const settingKey = `family_introduction_${slug}`;
  const { error: settingError } = await admin
    .from("site_settings")
    .upsert({
      key: settingKey,
      value_en: introductionEn,
      value_ar: introductionEn,
      updated_at: new Date().toISOString()
    }, { onConflict: "key" });

  if (settingError) throw new Error(`Family introduction update failed: ${settingError.message}`);

  clearCatalogueProjectionCache();
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath(`/products/${slug}`);
  revalidatePath("/catalogues");
  revalidatePath("/admin/families");
  revalidatePath(`/admin/families/${slug}`);
  revalidatePath("/admin/catalogues");
}
