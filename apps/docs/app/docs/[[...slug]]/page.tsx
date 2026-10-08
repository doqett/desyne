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
import { getMDXComponents } from "@/components/mdx";
import { getComponentLinks } from "@/lib/docs-tree";
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
            <MarkdownCopyButton markdownUrl={markdownUrl} className={action} />
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
  );
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

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImageUrl(page).url,
    },
  };
}
