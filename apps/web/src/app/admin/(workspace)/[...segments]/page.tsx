import { RoutePlaceholder } from "@/components/layout/route-placeholder";

const adminTitles: Record<string, string> = {
  products: "Manage products",
  families: "Manage families",
  catalogues: "Manage catalogues",
  media: "Media library",
  inquiries: "Quotation inquiries",
  messages: "General messages",
  content: "Website content",
  "contact-details": "Contact details",
  publishing: "Publishing centre",
  revisions: "Revision history",
  settings: "Admin settings"
};

export default async function Page({ params }: { params: Promise<{ segments: string[] }> }) {
  const { segments } = await params;
  const key = segments[0] ?? "overview";
  const path = `/admin/${segments.join("/")}`;
  const title = adminTitles[key] ?? key.replaceAll("-", " ");
  return <RoutePlaceholder eyebrow="Admin route" title={title} path={path} />;
}
