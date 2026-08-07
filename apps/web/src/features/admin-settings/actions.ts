"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function saveSiteSettings(formData: FormData) {
  const admin = createAdminClient();

  const entries = Array.from(formData.entries());

  for (const [key, val] of entries) {
    if (key.startsWith("$ACTION") || key === "key") continue;

    const strVal = String(val);

    const { data: existing } = await admin
      .from("site_settings")
      .select("key")
      .eq("key", key)
      .maybeSingle();

    if (existing) {
      await admin
        .from("site_settings")
        .update({ value_en: strVal, updated_at: new Date().toISOString() })
        .eq("key", key);
    } else {
      await admin
        .from("site_settings")
        .insert({ key, value_en: strVal, value_ar: strVal, updated_at: new Date().toISOString() });
    }
  }

  revalidatePath("/admin/settings");
}
