import type { MetadataRoute } from "next";
import { homeDescription } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Desyne",
    short_name: "Desyne",
    description: homeDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0b",
    theme_color: "#0a0a0b",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}
