import { marketingOgImage, ogSize } from "@/lib/og-image";

export const alt = "Desyne changelog";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return marketingOgImage({
    headline: "What’s new.",
    dim: "Release by release.",
    sub: "New components, guides, Pro blocks and templates, newest first.",
  });
}
