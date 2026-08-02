"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateMessageStatus(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  const note = formData.get("admin_note") as string;
  const read = status !== "New";
  
  await supabase
    .from("contact_messages")
    .update({ 
      status, 
      read,
      admin_note: note || null
    })
    .eq("id", id);
    
  revalidatePath("/admin/messages");
}
