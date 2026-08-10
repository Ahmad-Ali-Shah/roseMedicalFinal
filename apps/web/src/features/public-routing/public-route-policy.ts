import { FAMILY_SLUGS } from "@/features/public-catalogue";

const PUBLIC_PAGE_KEYS = new Set([
  "",
  "products",
  "catalogues",
  "inquiry",
  "request-quotation",
  "about",
  "procurement-support",
  "contact",
  "search",
  "privacy",
  "terms"
]);

const DEDICATED_PUBLIC_ROUTES = new Set([
  "account",
  "forgot-password",
  "login",
  "reset-password"
]);

const SYSTEM_FILES = new Set(["favicon.ico", "robots.txt", "sitemap.xml"]);

function hasDedicatedHandler(segments: readonly string[]): boolean {
  const key = segments.join("/");
  const root = segments[0] ?? "";

  return DEDICATED_PUBLIC_ROUTES.has(key)
    || root === "__rosa-not-found"
    || root === "admin"
    || root === "api"
    || root === "auth"
    || root === "_next"
    || root === "media"
    || SYSTEM_FILES.has(key);
}

/**
 * Returns true only for paths owned by the optional public catch-all that do
 * not resolve to a real public page. Dedicated app, API, auth, and static-file
 * routes remain under their own handlers.
 */
export function shouldRenderPublicNotFound(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);
  if (hasDedicatedHandler(segments)) return false;

  const publicSegments = segments[0] === "ar" ? segments.slice(1) : segments;
  const key = publicSegments.join("/");

  if (PUBLIC_PAGE_KEYS.has(key)) return false;
  if (publicSegments[0] !== "products") return true;
  const familySlug = publicSegments[1];
  const knownFamily = Boolean(
    familySlug && (FAMILY_SLUGS as readonly string[]).includes(familySlug)
  );

  if (publicSegments.length === 2) return !knownFamily;
  if (publicSegments.length === 3) {
    return !knownFamily || !publicSegments[2]?.trim();
  }
  return true;
}
