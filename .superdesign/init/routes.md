# Routes

## Framework

Next.js 16 App Router. Public pages are dispatched through one optional catch-all route under the shared public layout. Admin authentication and workspace routes use separate route groups.

## Public route map

| URL | Renderer | Layout |
|---|---|---|
| `/` | `Homepage` | `RootLayout -> PublicLayout -> PublicShell` |
| `/products` | `ProductsOverview` | Public shell |
| `/products/[family]` | `FamilyListingPage` | Public shell |
| `/products/[family]/[product]` | `ProductDetailPage` | Public shell |
| `/catalogues` | `CataloguesPage` | Public shell |
| `/about` | `AboutPage` | Public shell |
| `/procurement-support` | `ProcurementSupportPage` | Public shell |
| `/contact` | `ContactPage` | Public shell |
| `/search` | `SearchDefaultPage` | Public shell |
| `/inquiry` | `InquiryPage` | Public shell |
| `/request-quotation` | `QuotationPage` | Public shell |
| `/privacy`, `/terms` | `LegalPage` | Public shell |
| `/login`, `/forgot-password`, `/reset-password`, `/account` | public account/auth routes | Public shell |

## Admin route map

| URL | Renderer | Layout |
|---|---|---|
| `/admin/login` | `AdminLoginPage` | root/auth group |
| `/admin/recovery` | `AdminRecoveryPage` | root/auth group |
| `/admin` | owner dashboard | authenticated workspace |
| `/admin/[...segments]` | admin feature dispatcher | authenticated workspace |

## Public catch-all route

Source: `apps/web/src/app/(public)/[[...segments]]/page.tsx`

```tsx
import { notFound } from "next/navigation";
import {
  resolvePublicPage,
  resolvePublicPageKind
} from "@/features/public-routing/resolve-public-page";

const routeTitles: Record<string, string> = {
  "": "Homepage",
  products: "Products overview",
  catalogues: "Technical catalogues",
  about: "About Rosa",
  "procurement-support": "Procurement support",
  contact: "Contact Rosa",
  search: "Search the catalogue",
  inquiry: "Instrument inquiry",
  "request-quotation": "Request a quotation",
  privacy: "Privacy Policy",
  terms: "Terms"
};

export default async function Page({ params }: { params: Promise<{ segments?: string[] }> }) {
  const { segments = [] } = await params;
  const key = segments.join("/");
  const path = `/${key}`;
  const title = routeTitles[key] ?? (segments.at(-1)?.replaceAll("-", " ") || "Homepage");

  if (resolvePublicPageKind(key) === "not-found") notFound();
  const page = resolvePublicPage({ key, path, title });
  if (!page) notFound();
  return page;
}

```

## Public route resolver

Source: `apps/web/src/features/public-routing/resolve-public-page.tsx`

```tsx
import type { ReactNode } from "react";
import { RoutePlaceholder } from "@/components/layout/route-placeholder";
import { AboutPage } from "@/features/about";
import { CataloguesPage } from "@/features/catalogues";
import { resolveCataloguePath } from "@/features/catalogue-registry";
import { ContactPage } from "@/features/contact-preview";
import { FamilyListingPage } from "@/features/family-listing/family-listing-page";
import { Homepage } from "@/features/homepage/homepage";
import { InquiryPage, QuotationPage } from "@/features/inquiry";
import {
  LegalPage,
  PRIVACY_DOCUMENT,
  TERMS_DOCUMENT
} from "@/features/legal-pages";
import { ProductDetailPage } from "@/features/product-detail/product-detail-page";
import { ProductsOverview } from "@/features/products/products-overview";
import { ProcurementSupportPage } from "@/features/procurement-support";
import { SearchDefaultPage } from "@/features/search-preview";

export type PublicPageKind =
  | "homepage"
  | "products"
  | "catalogues"
  | "inquiry-empty"
  | "quotation-blocked"
  | "about"
  | "procurement-support"
  | "contact-static"
  | "search-default"
  | "privacy-template"
  | "terms-template"
  | "family"
  | "product"
  | "placeholder"
  | "not-found";

export function resolvePublicPageKind(key: string): PublicPageKind {
  if (key === "") return "homepage";
  if (key === "products") return "products";
  if (key === "catalogues") return "catalogues";
  if (key === "inquiry") return "inquiry-empty";
  if (key === "request-quotation") return "quotation-blocked";
  if (key === "about") return "about";
  if (key === "procurement-support") return "procurement-support";
  if (key === "contact") return "contact-static";
  if (key === "search") return "search-default";
  if (key === "privacy") return "privacy-template";
  if (key === "terms") return "terms-template";

  const segments = key.split("/").filter(Boolean);
  if (segments[0] !== "products") return "placeholder";

  const catalogueResult = resolveCataloguePath(segments);
  if (catalogueResult.kind === "family") return "family";
  if (catalogueResult.kind === "product") return "product";
  return "not-found";
}

export function resolvePublicPage({
  key,
  path,
  title
}: {
  key: string;
  path: string;
  title: string;
}): ReactNode | null {
  const kind = resolvePublicPageKind(key);
  const segments = key.split("/").filter(Boolean);

  switch (kind) {
    case "homepage":
      return <Homepage />;
    case "products":
      return <ProductsOverview />;
    case "catalogues":
      return <CataloguesPage />;
    case "inquiry-empty":
      return <InquiryPage />;
    case "quotation-blocked":
      return <QuotationPage />;
    case "about":
      return <AboutPage />;
    case "procurement-support":
      return <ProcurementSupportPage />;
    case "contact-static":
      return <ContactPage />;
    case "search-default":
      return <SearchDefaultPage />;
    case "privacy-template":
      return <LegalPage document={PRIVACY_DOCUMENT} />;
    case "terms-template":
      return <LegalPage document={TERMS_DOCUMENT} />;
    case "family":
      return <FamilyListingPage familySlug={segments[1] ?? ""} />;
    case "product":
      return (
        <ProductDetailPage
          familySlug={segments[1] ?? ""}
          productSlug={segments[2] ?? ""}
        />
      );
    case "placeholder":
      return <RoutePlaceholder eyebrow="Public route" title={title} path={path} />;
    case "not-found":
      return null;
  }
}

```

## Account route

Source: `apps/web/src/app/(public)/account/page.tsx`

```tsx
"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AccountInquiry {
  id: string;
  created_at: string;
  status: string | null;
  message: string;
  appointment_date: string | null;
}

export default function AccountPage() {
  const [inquiries, setInquiries] = useState<AccountInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    let active = true;

    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login?redirect=/account");
        return;
      }

      const response = await fetch("/api/inquiries?scope=mine");
      const data: unknown = await response.json();

      if (!active) return;
      setInquiries(response.ok && Array.isArray(data) ? data as AccountInquiry[] : []);
      setLoading(false);
    }

    void loadData();
    return () => {
      active = false;
    };
  }, [router, supabase]);

  if (loading) return <div style={{ color: "white", textAlign: "center", padding: "4rem" }}>Loading your history...</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1rem", background: "#0a0a0a", minHeight: "80vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold" }}>My Inquiries & History</h1>
        <button onClick={() => { void supabase.auth.signOut(); router.push("/"); }} style={{ padding: "0.5rem 1rem", borderRadius: "0.25rem", border: "1px solid #444", background: "#111", color: "#888", cursor: "pointer" }}>
          Sign Out
        </button>
      </div>

      {inquiries.length === 0 ? (
        <div style={{ background: "#111", padding: "2rem", borderRadius: "0.5rem", border: "1px solid #333", textAlign: "center" }}>
          <p style={{ color: "#888", marginBottom: "1rem" }}>You have not submitted any inquiries yet.</p>
          <Link href="/products" style={{ color: "#3b82f6", textDecoration: "underline" }}>Browse Products</Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} style={{ background: "#111", padding: "1.5rem", borderRadius: "0.5rem", border: "1px solid #333" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "#888", fontSize: "0.875rem" }}>{new Date(inquiry.created_at).toLocaleDateString()}</span>
                <span style={{ padding: "0.25rem 0.5rem", borderRadius: "0.25rem", fontSize: "0.75rem", fontWeight: "bold", background: inquiry.status === "Contacted" ? "#22c55e33" : "#facc1533", color: inquiry.status === "Contacted" ? "#22c55e" : "#facc15" }}>
                  {inquiry.status || "New"}
                </span>
              </div>
              <p style={{ color: "#ccc", fontSize: "0.875rem", whiteSpace: "pre-wrap" }}>{inquiry.message}</p>
              {inquiry.appointment_date && (
                <p style={{ color: "#22c55e", fontSize: "0.875rem", marginTop: "0.5rem" }}>ðŸ“… Appointment Scheduled: {new Date(inquiry.appointment_date).toLocaleDateString()}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

```

## Public login route

Source: `apps/web/src/app/(public)/login/page.tsx`

```tsx
"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) setError(error.message);
      else alert("Check your email for a confirmation link!");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else { router.push("/checkout"); router.refresh(); }
    }
    setLoading(false);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", padding: "1rem", background: "#0a0a0a" }}>
      <div style={{ width: "100%", maxWidth: "400px", background: "#111", padding: "2rem", borderRadius: "0.5rem", border: "1px solid #333" }}>
        <h1 style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>{isSignUp ? "Create an account" : "Sign in to Rosa Medical"}</h1>
        <form onSubmit={handleAuth}>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="email" style={{ display: "block", color: "#888", fontSize: "0.875rem", marginBottom: "0.25rem" }}>Email</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}placeholder="you@example.com" style={{ width: "100%", padding: "0.75rem", borderRadius: "0.25rem", border: "1px solid #444", background: "#1a1a1a", color: "white", outline: "none" }} />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="password" style={{ display: "block", color: "#888", fontSize: "0.875rem", marginBottom: "0.25rem" }}>Password</label>
            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" style={{ width: "100%", padding: "0.75rem", borderRadius: "0.25rem", border: "1px solid #444", background: "#1a1a1a", color: "white", outline: "none" }} />
          </div>
          {error && <p style={{ color: "#f87171", marginBottom: "1rem", fontSize: "0.875rem" }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ width: "100%", padding: "0.75rem", borderRadius:"0.25rem", border: "none", background: "#3b82f6", color: "white", fontWeight: "bold", cursor: "pointer", opacity: loading ? 0.5 : 1 }}>
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <div style={{ marginTop: "1.5rem", textAlign: "center", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <button onClick={() => setIsSignUp(!isSignUp)} style={{ background: "none", border: "none", color:"#888", fontSize: "0.875rem", textDecoration: "underline", cursor: "pointer" }}>
            {isSignUp ? "Already have an account? Sign In" : "Dont have an account? Sign Up"}
          </button>
          {!isSignUp && (
            <Link href="/forgot-password" style={{ color: "#888", fontSize: "0.875rem", textDecoration: "underline" }}>
              Forgot Password?
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

```

## Forgot-password route

Source: `apps/web/src/app/(public)/forgot-password/page.tsx`

```tsx
"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const redirectTo = window.location.origin + "/auth/callback?type=recovery";
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      setStatus("success");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", padding: "1rem", background: "#0a0a0a" }}>
      <div style={{ width: "100%", maxWidth: "400px", background: "#111", padding: "2rem", borderRadius: "0.5rem", border: "1px solid #333" }}>
        <h1 style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Reset Password</h1>
        {status === "success" ? (
          <div style={{ padding: "1rem", background: "#0d1117", borderRadius: "0.25rem", border: "1px solid #2a4a2a", color: "#4ade80" }}>
            Reset link sent! Check your email inbox (and spam folder) for the link.
          </div>
        ) : (
          <form onSubmit={handleReset}>
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="email" style={{ display: "block", color: "#888", fontSize: "0.875rem", marginBottom: "0.25rem" }}>Email Address</label>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={{ width: "100%", padding: "0.75rem", borderRadius: "0.25rem", border: "1px solid #444", background: "#1a1a1a", color: "white", outline: "none" }} />
            </div>
            <button type="submit" disabled={status === "loading"} style={{ width: "100%", padding: "0.75rem", borderRadius: "0.25rem", border: "none", background: "#3b82f6", color: "white", fontWeight: "bold", cursor: "pointer", opacity: status === "loading" ? 0.5 : 1 }}>
              {status === "loading" ? "Sending..." : "Send Reset Link"}
            </button>
            {status === "error" && <p style={{ color: "#f87171", marginTop: "1rem", fontSize: "0.875rem" }}>Error: {errorMsg}</p>}
          </form>
        )}
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <Link href="/login" style={{ color: "#888", fontSize: "0.875rem", textDecoration: "underline" }}>Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
}

```

## Reset-password route

Source: `apps/web/src/app/(public)/reset-password/page.tsx`

```tsx
"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      alert("Password updated successfully! Please log in.");
      router.push("/login");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", padding: "1rem", background: "#0a0a0a" }}>
      <div style={{ width: "100%", maxWidth: "400px", background: "#111", padding: "2rem", borderRadius: "0.5rem", border: "1px solid #333" }}>
        <h1 style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Set New Password</h1>
        <form onSubmit={handleUpdate}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="newPassword" style={{ display: "block", color: "#888", fontSize: "0.875rem", marginBottom: "0.25rem" }}>New Password</label>
            <input id="newPassword" type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" style={{ width: "100%", padding: "0.75rem", borderRadius: "0.25rem", border: "1px solid #444", background: "#1a1a1a", color: "white", outline: "none" }} />
          </div>
          <button type="submit" disabled={status === "loading"} style={{ width: "100%", padding: "0.75rem", borderRadius: "0.25rem", border: "none", background: "#22c55e", color: "white", fontWeight: "bold", cursor: "pointer", opacity: status === "loading" ? 0.5 : 1 }}>
            {status === "loading" ? "Updating..." : "Update Password"}
          </button>
          {status === "error" && <p style={{ color: "#f87171", marginTop: "1rem", fontSize: "0.875rem" }}>Error: {errorMsg}</p>}
        </form>
      </div>
    </div>
  );
}

```

## Admin login route

Source: `apps/web/src/app/admin/(auth)/login/page.tsx`

```tsx
import { AdminLoginPage } from "@/features/admin-auth-preview";

export default function Page() {
  return <AdminLoginPage />;
}

```

## Admin recovery route

Source: `apps/web/src/app/admin/(auth)/recovery/page.tsx`

```tsx
import { AdminRecoveryPage } from "@/features/admin-auth-preview";

export default function Page() {
  return <AdminRecoveryPage />;
}

```

## Admin workspace root

Source: `apps/web/src/app/admin/(workspace)/page.tsx`

```tsx
import { AdminDashboardPage } from "@/features/admin-dashboard";

export default function Page() {
  return <AdminDashboardPage />;
}

```

## Admin workspace catch-all

Source: `apps/web/src/app/admin/(workspace)/[...segments]/page.tsx`

```tsx
import { notFound } from "next/navigation";
import {
  AdminGovernanceRouteView,
  isAdminGovernanceRoot,
  resolveAdminGovernanceRoute
} from "@/features/admin-governance-routing";
import {
  AdminManagementRouteView,
  isAdminManagementRoot,
  resolveAdminManagementRoute
} from "@/features/admin-management-routing";
import {
  AdminOperationsRouteView,
  isAdminOperationsRoot,
  resolveAdminOperationsRoute
} from "@/features/admin-operations-routing";

export default async function Page({
  params
}: {
  params: Promise<{ segments: string[] }>;
}) {
  const { segments } = await params;
  const management = resolveAdminManagementRoute(segments);

  if (management.kind !== "not-found") {
    return <AdminManagementRouteView result={management} />;
  }

  const operations = resolveAdminOperationsRoute(segments);

  if (operations.kind !== "not-found") {
    return <AdminOperationsRouteView result={operations} />;
  }

  const governance = resolveAdminGovernanceRoute(segments);

  if (governance.kind !== "not-found") {
    return <AdminGovernanceRouteView result={governance} />;
  }

  const root = segments[0] ?? "";
  if (
    isAdminManagementRoot(root) ||
    isAdminOperationsRoot(root) ||
    isAdminGovernanceRoot(root)
  ) {
    notFound();
  }

  notFound();
}

```
