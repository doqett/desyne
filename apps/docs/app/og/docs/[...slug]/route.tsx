import { generateOGImage } from "fumadocs-ui/og";
import { notFound } from "next/navigation";
import { logoMark } from "@/components/logo";
import { appName, getPageImageUrl } from "@/lib/shared";
import { source } from "@/lib/source";

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<"/og/docs/[...slug]">,
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return generateOGImage({
    title: page.data.title,
    description: page.data.description,
    site: appName,
    primaryColor: "rgba(99,102,241,0.35)",
    primaryTextColor: "rgb(250,250,250)",
    icon: (
      <svg width="56" height="56" viewBox={logoMark.viewBox}>
        <title>{appName}</title>
        <path d={logoMark.stem} fill="rgb(250,250,250)" />
        <path d={logoMark.bowl} fill="rgb(129,140,248)" />
      </svg>
    ),
  });
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImageUrl(page).segments,
  }));
}
