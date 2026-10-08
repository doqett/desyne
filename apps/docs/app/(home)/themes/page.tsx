import type { Metadata } from "next";
import { ThemeBuilder } from "@/components/themes/theme-builder";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Theme builder",
  description:
    "Build a Desyne theme: four styles, six base colors, any brand color, radius, density and fonts. Preview it on real components, then install with the shadcn CLI.",
  path: "/themes",
});

export default function ThemesPage() {
  return (
    <main className="flex flex-1 flex-col overflow-x-clip">
      <ThemeBuilder />
    </main>
  );
}
