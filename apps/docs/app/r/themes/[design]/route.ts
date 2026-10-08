import { fontImports } from "@/components/themes/font-imports";
import {
  bases,
  brands,
  decodeDesign,
  designToCssVars,
  encodeDesign,
  fonts,
  styles,
} from "@/lib/design";

/**
 * shadcn registry item for a theme-builder design:
 * `npx shadcn@latest add <origin>/r/themes/<encoded>.json`.
 * The CLI merges `cssVars` into the project's global CSS (`theme` → `@theme inline`,
 * `light` → `:root`, `dark` → `.dark`).
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ design: string }> },
) {
  const raw = decodeURIComponent((await params).design).replace(/\.json$/i, "");
  if (!/^\d+~/.test(raw))
    return Response.json({ error: "Unknown theme" }, { status: 404 });
  const design = decodeDesign(raw);
  const encoded = encodeDesign(design);
  const brand =
    brands[design.brand as keyof typeof brands]?.label ?? design.brand;
  const title = `Desyne ${styles[design.style].label} · ${bases[design.base].label} · ${brand}`;
  const fontUrl = fontImports[design.font];

  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "desyne-theme",
    type: "registry:theme",
    title,
    description: `Desyne design ${encoded}: ${styles[design.style].description} Radius ${design.radius}rem, ${design.density} density, ${fonts[design.font].label} font.`,
    cssVars: designToCssVars(design),
    ...(fontUrl && design.font !== "inter"
      ? { css: { [`@import url("${fontUrl}")`]: {} } }
      : {}),
    meta: { design: encoded, builder: `/themes?design=${encoded}` },
  };

  return Response.json(item, {
    headers: {
      "Cache-Control":
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
