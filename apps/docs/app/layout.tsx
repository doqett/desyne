import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata, Viewport } from "next";
import { Toaster } from "@/components/ui/toast";
import { designFontVariables, inter } from "@/lib/design-fonts";
import {
  homeDescription,
  homeTitle,
  isIndexable,
  siteName,
  siteOrigin,
} from "@/lib/seo";
import "./global.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: homeTitle, template: `%s · ${siteName}` },
  description: homeDescription,
  applicationName: siteName,
  openGraph: {
    siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  // Preview deployments and local dev stay out of search results.
  robots: isIndexable ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${designFontVariables}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          {children}
          <Toaster />
        </RootProvider>
      </body>
    </html>
  );
}
