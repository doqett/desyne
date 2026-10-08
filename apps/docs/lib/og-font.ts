import { readFile } from "node:fs/promises";
import { join } from "node:path";

const weights = [500, 600] as const;

/** Inter (SIL OFL 1.1) bundled in `assets/fonts`, so builds never depend on the network. */
async function localFont(weight: (typeof weights)[number]) {
  try {
    const data = await readFile(
      join(process.cwd(), "assets/fonts", `inter-${weight}.ttf`),
    );
    return { name: "Inter", data, weight, style: "normal" as const };
  } catch {
    return null;
  }
}

/** Fallback: Inter from Google Fonts, subset to the glyphs the image uses. */
async function remoteFont(weight: (typeof weights)[number], text: string) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&text=${encodeURIComponent(text)}`,
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format/)?.[1];
    if (!url) return null;
    const data = await fetch(url).then((r) => r.arrayBuffer());
    return { name: "Inter", data, weight, style: "normal" as const };
  } catch {
    return null;
  }
}

/** Fonts for `ImageResponse`: bundled files first, Google Fonts as a fallback. */
export async function loadOgFonts(text: string) {
  const fonts = await Promise.all(
    weights.map(
      async (weight) => (await localFont(weight)) ?? remoteFont(weight, text),
    ),
  );
  return fonts.filter((f) => f !== null);
}
