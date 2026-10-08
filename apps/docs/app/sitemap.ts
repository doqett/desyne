import { statSync } from "node:fs";
import { join } from "node:path";
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { releases } from "@/lib/site";
import { source } from "@/lib/source";

/** Build time; the fallback when a file date can't be read. */
const built = new Date();

/** Last change of a docs page: the MDX file's mtime at build. */
function modified(path: string) {
  try {
    return statSync(join(process.cwd(), "content/docs", path)).mtime;
  } catch {
    return built;
  }
}

function priority(slugs: string[]) {
  if (slugs.length === 0) return 0.9;
  if (slugs[0] === "components") return slugs.length === 1 ? 0.9 : 0.8;
  return 0.7;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const latestRelease = new Date(releases[0]?.date ?? built);
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: built, priority: 1 },
    { url: absoluteUrl("/themes"), lastModified: built, priority: 0.7 },
    { url: absoluteUrl("/showcase"), lastModified: built, priority: 0.6 },
    {
      url: absoluteUrl("/changelog"),
      lastModified: latestRelease,
      priority: 0.5,
    },
    { url: absoluteUrl("/about"), lastModified: built, priority: 0.5 },
  ];
  const docs = source.getPages().map((page) => ({
    url: absoluteUrl(page.url),
    lastModified: modified(page.path),
    priority: priority(page.slugs),
  }));
  return [...pages, ...docs];
}
