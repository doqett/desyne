import { marketingOgImage, ogSize } from "@/lib/og-image";

export const alt = "Desyne — accessible React Aria components for Tailwind v4";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return marketingOgImage({
    headline: "Accessible components that",
    dim: "look finished on day one.",
    sub: "Built on React Aria and Tailwind v4. Free and open source.",
  });
}
