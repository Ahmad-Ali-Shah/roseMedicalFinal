import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Owner Workspace | ROSA",
    template: "%s | ROSA Owner Workspace"
  },
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
