import { RootProvider } from "fumadocs-ui/provider/next";
import { Toaster } from "@/components/ui/toast";
import { designFontVariables, inter } from "@/lib/design-fonts";
import "./global.css";

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
