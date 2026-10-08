import { marketingOgImage, ogSize } from "@/lib/og-image";

export const alt = "About Desyne and its license";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return marketingOgImage({
    headline: "Interfaces should be accessible",
    dim: "and beautiful.",
    sub: "Why Desyne exists, the principles behind it and the license in plain words.",
  });
}
