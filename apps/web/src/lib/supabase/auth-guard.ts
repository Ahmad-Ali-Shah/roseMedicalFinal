import { redirect } from "next/navigation";
import { isConfiguredOwner } from "@/lib/supabase/owner-identity";
import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const isOwner = user
    ? isConfiguredOwner(user, {
        ownerUserId: process.env.ROSA_OWNER_USER_ID,
        ownerEmail: process.env.ROSA_OWNER_EMAIL
      })
    : false;

  if (!isOwner) {
    redirect("/admin/login");
  }

  return user!;
}
