import type { Metadata } from "next";
import { Inter, Lora, Tajawal } from "next/font/google";
import { MotionProvider } from "@/features/motion";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" });
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rosamedical.example"),
  title: { default: "Rosa Medical", template: "%s | Rosa Medical" },
  description: "Medical instrument catalogues and structured quotation support for professional procurement teams.",
  applicationName: "Rosa Medical",
  openGraph: {
    type: "website",
    siteName: "Rosa Medical",
    title: "Rosa Medical",
    description: "Medical instrument catalogues and structured quotation support."
  },
  twitter: { card: "summary", title: "Rosa Medical" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${lora.variable} ${tajawal.variable}`} data-scroll-behavior="smooth">
      <body>
        <script dangerouslySetInnerHTML={{ __html: "try{var a=location.pathname==='/ar'||location.pathname.indexOf('/ar/')===0;document.documentElement.lang=a?'ar':'en';document.documentElement.dir=a?'rtl':'ltr'}catch(e){}" }} />
        <MotionProvider>
          <a className="skip-link" href="#main-content">
            <span className="skip-link__label skip-link__label--en" lang="en">Skip to content</span>
            <span className="skip-link__label skip-link__label--ar" lang="ar">انتقل إلى المحتوى</span>
          </a>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
