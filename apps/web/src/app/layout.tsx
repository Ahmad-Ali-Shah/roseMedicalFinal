import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { MotionProvider } from "@/features/motion";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" });

export const metadata: Metadata = {
  title: { default: "ROSA", template: "%s | ROSA" },
  description: "Medical instruments supplier and procurement partner."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body>
        <MotionProvider>
          <a className="skip-link" href="#main-content">Skip to content</a>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
