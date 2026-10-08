import type { FontId } from "@/lib/design";

/** Google Fonts stylesheet for a font preset (what users add to load it). */
export const fontImports: Partial<Record<FontId, string>> = {
  inter:
    "https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap",
  geist:
    "https://fonts.googleapis.com/css2?family=Geist:wght@400..700&display=swap",
  plex: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap",
  serif:
    "https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=Source+Serif+4:opsz,wght@8..60,400..700&display=swap",
  mono: "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400..700&display=swap",
};
