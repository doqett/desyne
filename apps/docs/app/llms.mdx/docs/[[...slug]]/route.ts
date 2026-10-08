import { notFound } from "next/navigation";
import { absoluteUrl } from "@/lib/seo";
import { getPageMarkdownUrl } from "@/lib/shared";
import { source } from "@/lib/source";
import { renderPage } from "../../../llms-render";

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<"/llms.mdx/docs/[[...slug]]">,
) {
  const { slug } = await params;
  const page = source.getPage(slug?.slice(0, -1));
  if (!page) notFound();

  return new Response(await renderPage(page), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      // The Markdown twin of a docs page: keep it out of the index and point
      // search engines at the HTML page instead.
      "X-Robots-Tag": "noindex",
      Link: `<${absoluteUrl(page.url)}>; rel="canonical"`,
    },
  });
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageMarkdownUrl(page).segments,
  }));
}
