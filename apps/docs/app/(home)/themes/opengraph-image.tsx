import { marketingOgImage, ogSize } from "@/lib/og-image";

export const alt = "Desyne theme builder";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return marketingOgImage({
    headline: "Your brand in a few variables.",
    dim: "Every component follows.",
    sub: "Pick a style, colors, radius, density and fonts, then install the theme with the shadcn CLI.",
  });
}
