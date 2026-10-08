import type { Metadata } from "next";
import { ThemeBuilder } from "@/components/themes/theme-builder";

export const metadata: Metadata = {
  title: "Themes",
  description:
    "Build a Desyne theme: four styles, six base colors, any brand color, radius, density and fonts. Install it with the shadcn CLI.",
};

export default function ThemesPage() {
  return (
    <main className="flex flex-1 flex-col overflow-x-clip">
      <ThemeBuilder />
    </main>
  );
}
