import { redirect } from "next/navigation";

export default function ForgotPasswordPage(): never {
  redirect("/admin/recovery");
}
