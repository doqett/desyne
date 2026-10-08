import {
  DocsBody,
  DocsPage,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComponentPills, PageHeader } from "@/components/docs/page-header";
import { DocsArticle, PageFooterNav } from "@/components/docs/page-parts";
import { DocsTOC } from "@/components/docs/toc";
import { JsonLd } from "@/components/json-ld";
import { getMDXComponents } from "@/components/mdx";
import { getComponentLinks } from "@/lib/docs-tree";
import {
  absoluteUrl,
  metaDescription,
  organization,
  pageMetadata,
  siteName,
} from "@/lib/seo";
import { getPageImageUrl, getPageMarkdownUrl, gitConfig } from "@/lib/shared";
import { source } from "@/lib/source";

const action =
  "h-7 gap-1.5 rounded-full border bg-card px-3 font-medium text-[0.75rem] text-muted-foreground shadow-none hover:border-foreground/20 hover:bg-card hover:text-foreground [&_svg]:size-3.5";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const title = page.data.title;
  const links = getComponentLinks(page.path);

  return (
    <>
      <JsonLd data={structuredData(page)} />
      <DocsPage
        toc={page.data.toc}
        full={page.data.full}
        breadcrumb={{ enabled: false }}
        tableOfContent={{ component: <DocsTOC /> }}
        footer={{ component: <PageFooterNav /> }}
        slots={{ container: DocsArticle }}
      >
        <PageHeader
          title={title}
          description={page.data.description}
          actions={
            <>
              <MarkdownCopyButton
                markdownUrl={markdownUrl}
                className={action}
              />
              <ViewOptionsPopover
                markdownUrl={markdownUrl}
                githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/apps/docs/content/docs/${page.path}`}
                className={action}
              />
              {links && (
                <>
                  <span
                    aria-hidden
                    className="mx-1 h-4 w-px bg-border max-sm:hidden"
                  />
                  <ComponentPills links={links} />
                </>
              )}
            </>
          }
        />
        <DocsBody className="ds-prose">
          <MDX
            components={getMDXComponents({
              // this allows you to link to other pages with relative file paths
              a: createRelativeLink(source, page),
            })}
          />
        </DocsBody>
      </DocsPage>
    </>
  );
}

type DocPage = NonNullable<ReturnType<typeof source.getPage>>;

const isComponent = (page: DocPage) =>
  page.slugs[0] === "components" && page.slugs.length > 1;

function describe(page: DocPage) {
  return metaDescription(
    page.data.description,
    isComponent(page)
      ? [
          "An accessible React Aria component for Tailwind v4.",
          "Accessible, themeable and installed with the shadcn CLI.",
          "Built on React Aria; install it with the shadcn CLI.",
          "Built on React Aria.",
        ]
      : [
          "From the Desyne docs for React Aria and Tailwind v4.",
          "Part of the Desyne component docs.",
          "Desyne docs.",
        ],
  );
}

/** Breadcrumb trail from the docs root to this page, using page titles. */
function trail(page: DocPage) {
  const items = [{ name: "Docs", url: absoluteUrl("/docs") }];
  for (let i = 1; i <= page.slugs.length; i++) {
    const p = source.getPage(page.slugs.slice(0, i));
    if (p) items.push({ name: p.data.title, url: absoluteUrl(p.url) });
  }
  return items;
}

function structuredData(page: DocPage) {
  const url = absoluteUrl(page.url);
  return [
    {
      "@type": "TechArticle",
      headline: page.data.title,
      description: describe(page),
      url,
      mainEntityOfPage: url,
      image: absoluteUrl(getPageImageUrl(page).url),
      inLanguage: "en",
      author: { "@id": organization["@id"] },
      publisher: organization,
      isPartOf: { "@type": "WebSite", name: siteName, url: absoluteUrl("/") },
      ...(isComponent(page) && {
        about: {
          "@type": "SoftwareSourceCode",
          name: `${page.data.title} component`,
          programmingLanguage: "TypeScript",
          codeRepository: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
        },
      }),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: trail(page).map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    },
  ];
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return pageMetadata({
    title: page.slugs.length === 0 ? "Documentation" : page.data.title,
    description: describe(page),
    path: page.url,
    image: getPageImageUrl(page).url,
    type: "article",
  });
}
