"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function saveSiteContent(formData: FormData) {
  const key = formData.get("key") as string;
  const englishValue = formData.get("value_en") as string;
  const arabicValue = formData.get("value_ar") as string;

  if (!key) return;

  const admin = createAdminClient();

  const { data: existing } = await admin
    .from("site_settings")
    .select("key")
    .eq("key", key)
    .maybeSingle();

  if (existing) {
    await admin
      .from("site_settings")
      .update({
        value_en: englishValue || "",
        value_ar: arabicValue || "",
        updated_at: new Date().toISOString()
      })
      .eq("key", key);
  } else {
    await admin
      .from("site_settings")
      .insert({
        key,
        value_en: englishValue || "",
        value_ar: arabicValue || "",
        updated_at: new Date().toISOString()
      });
  }

  revalidatePath("/admin/content");
  revalidatePath("/");
}
