export const PUBLIC_LOCALES = ["en", "ar"] as const;
export type PublicLocale = (typeof PUBLIC_LOCALES)[number];

export function parseLocaleSegments(input: readonly string[]): {
  locale: PublicLocale;
  segments: string[];
} {
  if (input[0] === "ar") return { locale: "ar", segments: input.slice(1) };
  return { locale: "en", segments: [...input] };
}

export function getLocaleFromPathname(pathname: string): PublicLocale {
  return pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
}

export function stripLocalePath(pathname: string): string {
  if (pathname === "/ar") return "/";
  if (pathname.startsWith("/ar/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

export function localizePath(pathname: string, locale: PublicLocale): string {
  if (/^(?:[a-z]+:|#|\/\/)/i.test(pathname)) return pathname;
  const plainPath = stripLocalePath(pathname.startsWith("/") ? pathname : `/${pathname}`);
  if (locale === "en") return plainPath;
  return plainPath === "/" ? "/ar" : `/ar${plainPath}`;
}
