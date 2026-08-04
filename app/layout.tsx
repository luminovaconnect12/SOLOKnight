import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { BootIntro } from "@/components/layout/boot-intro";
import { ScrollProgress } from "@/components/layout/scroll-progress";

const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"] });
const body = Inter({ variable: "--font-body", subsets: ["latin"] });
const hud = JetBrains_Mono({ variable: "--font-hud", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} — ${siteConfig.tagline}`, template: `%s — ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: ["Solo Knight", "entertainment marketing studio", "gaming campaigns", "esports promotion", "anime marketing", "brand collaborations", "experiential marketing agency"],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: siteConfig.url, title: `${siteConfig.name} — ${siteConfig.tagline}`, description: siteConfig.description, siteName: siteConfig.name },
  twitter: { card: "summary_large_image", title: `${siteConfig.name} — ${siteConfig.tagline}`, description: siteConfig.description },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Solo Knight",
  url: siteConfig.url,
  description: siteConfig.description,
  email: siteConfig.contactEmail,
  sameAs: [siteConfig.social.instagram, siteConfig.social.x, siteConfig.social.youtube],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${hud.variable} dark h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-knight-blue focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
        <BootIntro />
        <CustomCursor />
        <ScrollProgress />
        <SmoothScrollProvider>
          <SiteNav />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
