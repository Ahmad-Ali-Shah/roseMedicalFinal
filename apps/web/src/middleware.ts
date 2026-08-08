import { NextResponse, type NextRequest } from "next/server";
import { shouldRenderPublicNotFound } from "@/features/public-routing/public-route-policy";
import { requiresSupabaseSession } from "@/lib/supabase/session-route-policy";
import { updateSession } from "@/lib/supabase/middleware";

export const runtime = "experimental-edge";

export async function middleware(request: NextRequest) {
  if (shouldRenderPublicNotFound(request.nextUrl.pathname)) {
    const notFoundUrl = request.nextUrl.clone();
    notFoundUrl.pathname = "/__rosa-not-found";
    notFoundUrl.search = "";

    const response = NextResponse.rewrite(notFoundUrl, { status: 404 });
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  if (!requiresSupabaseSession(request.nextUrl.pathname)) {
    return NextResponse.next({ request });
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|mockServiceWorker.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
};
