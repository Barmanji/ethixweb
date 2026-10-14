import type { Metadata } from "next";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import MotionLayer from "@/components/motion-layer";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Ethixweb — Thoughtful digital work, built with care", template: "%s | Ethixweb" },
  description: "Ethixweb is an independent digital studio in India bringing thoughtful design, dependable engineering, and practical AI together.",
  metadataBase: new URL("https://ethixweb.com"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-IN" data-theme="dark"><body id="top"><SiteNav /><MotionLayer>{children}</MotionLayer><SiteFooter /></body></html>;
}
