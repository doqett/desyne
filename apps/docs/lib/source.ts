import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { llms, loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { applyMdxPreset } from "fumadocs-mdx/config";
import { defineDocs } from "fumadocs-mdx/macro";
import { docsRoute } from "./shared";

/**
 * fumadocs' Markdown stringifier wraps every mdast handler, which drops the
 * `attention` hook mdast-util-to-markdown 2.1 uses for `strong` and
 * `emphasis`, so any `**bold**` in MDX recursed until the stack overflowed.
 * Serialising those two nodes here sidesteps the wrapped handlers.
 */
function stringifyAttention(
  node: { type: string },
  _parent: unknown,
  state: { containerPhrasing: (node: never, info: never) => string },
  info: unknown,
): string | undefined {
  const mark =
    node.type === "strong" ? "**" : node.type === "emphasis" ? "*" : null;
  if (!mark) return undefined;
  return `${mark}${state.containerPhrasing(node as never, info as never)}${mark}`;
}

/** Exposes the fence language to the `pre` component (for the caption bar). */
const rehypeCodeOptions = {
  ...rehypeCodeDefaultOptions,
  transformers: [
    ...(rehypeCodeDefaultOptions.transformers ?? []),
    {
      name: "desyne:language",
      pre(node: { properties: Record<string, unknown> }) {
        node.properties["data-language"] = (
          this as unknown as { options: { lang: string } }
        ).options.lang;
      },
    },
  ],
};

const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: pageSchema,
    // Search indexing and processed Markdown share the same stringifier fix.
    mdxOptions: applyMdxPreset({
      rehypeCodeOptions,
      remarkStructureOptions: { stringify: { stringify: stringifyAttention } },
    }),
    postprocess: {
      includeProcessedMarkdown: {
        headingIds: false,
        stringify: stringifyAttention,
      },
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export const docsLlms = llms(source, {
  renderPage: async (page) => `# ${page.data.title} (${page.url})

${await page.data.getText("processed")}`,
});
