"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function triggerPublish() {
  const admin = createAdminClient();

  const key = "last_published_at";
  const now = new Date().toISOString();

  const { data: existing } = await admin
    .from("site_settings")
    .select("key")
    .eq("key", key)
    .maybeSingle();

  if (existing) {
    await admin
      .from("site_settings")
      .update({ value_en: now, updated_at: now })
      .eq("key", key);
  } else {
    await admin
      .from("site_settings")
      .insert({ key, value_en: now, value_ar: now, updated_at: now });
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin/publishing");
}
