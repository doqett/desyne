import { readFileSync } from "node:fs";
import { join } from "node:path";

export type PageLinks = {
  aria?: string;
  source?: string;
  docs?: { label: string; href: string };
};

/**
 * Reads the `<ComponentLinks />` props from a component page so the header
 * can show them as pills (the MDX tag itself renders nothing).
 */
export function getComponentLinks(pagePath: string): PageLinks | null {
  let raw: string;
  try {
    raw = readFileSync(join(process.cwd(), "content/docs", pagePath), "utf8");
  } catch {
    return null;
  }
  const tag = raw.match(/<ComponentLinks\b([^>]*?)\/>/)?.[1];
  if (!tag) return null;
  const docs = tag.match(
    /docs=\{\{\s*label:\s*"([^"]+)",\s*href:\s*"([^"]+)"\s*\}\}/,
  );
  return {
    aria: tag.match(/aria="([^"]+)"/)?.[1],
    source: tag.match(/source="([^"]+)"/)?.[1],
    docs: docs ? { label: docs[1], href: docs[2] } : undefined,
  };
}
