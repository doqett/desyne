import { marketingOgImage, ogSize } from "@/lib/og-image";

export const alt = "Templates and blocks built with Desyne";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return marketingOgImage({
    headline: "Built with Desyne.",
    dim: "Every pixel.",
    sub: "Multi-page templates and Pro blocks made only from the components in this library.",
  });
}
