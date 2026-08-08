export function requiresSupabaseSession(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}
