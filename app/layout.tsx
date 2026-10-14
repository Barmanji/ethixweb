import type { Metadata } from "next";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import MotionLayer from "@/components/motion-layer";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Ethixweb — Thoughtful digital work, built with care",
    template: "%s | Ethixweb",
  },
  description:
    "Ethixweb is an independent digital studio in India bringing thoughtful design, dependable engineering, and practical AI together.",
  metadataBase: new URL("https://ethixweb-jj.com"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const content = (
    <>
      <Suspense fallback={<div className="site-header" aria-hidden="true" />}>
        <SiteNav />
      </Suspense>
      <MotionLayer>{children}</MotionLayer>
      <SiteFooter />
    </>
  );
  return (
    <html
      lang="en-IN"
      data-theme="dark"
      className={cn("font-sans", geist.variable)}
    >
      <body id="top">
        <Suspense fallback={null}>
          {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? (
            <ClerkProvider>{content}</ClerkProvider>
          ) : (
            content
          )}
        </Suspense>
      </body>
    </html>
  );
}
