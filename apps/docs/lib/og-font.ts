/**
 * Loads Inter from Google Fonts for `ImageResponse`, subset to the glyphs the
 * image uses. Returns no fonts (falling back to the built-in sans) if the
 * request fails, so a network hiccup never breaks the image.
 */
export async function loadOgFonts(text: string) {
  const weights = [500, 600] as const;
  const fonts = await Promise.all(
    weights.map(async (weight) => {
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
    }),
  );
  return fonts.filter((f) => f !== null);
}
