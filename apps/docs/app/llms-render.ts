import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { InferPageType } from "fumadocs-core/source";
import { getRegistryItem } from "@/lib/registry";
import { appName } from "@/lib/shared";
import { source } from "@/lib/source";

/**
 * Markdown rendering shared by /llms.txt, /llms-full.txt and the per-page
 * `.md` routes. Docs-only JSX (live previews, install tabs) is replaced with
 * what an assistant actually needs: the example source and the CLI command.
 */

type Page = InferPageType<typeof source>;

/** Absolute origin for links in llms.txt. Relative links when unset. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NEXT_PUBLIC_VERCEL_ENV ? "https://desyne.dev" : "")
).replace(/\/$/, "");

export const markdownUrl = (url: string) => `${siteUrl}${url}.md`;

function exampleSource(name: string) {
  const file = join(process.cwd(), "examples", `${name}.tsx`);
  return existsSync(file) ? readFileSync(file, "utf8").trim() : undefined;
}

function installBlock(name: string) {
  const item = getRegistryItem(name);
  const deps = item?.dependencies?.length
    ? `\n\nnpm dependencies (installed by the CLI): ${item.dependencies.join(", ")}.`
    : "";
  return `\`\`\`bash\nnpx shadcn@latest add @desyne/${name}\n\`\`\`${deps}`;
}

/**
 * `inline: "all"` embeds every example's source (per-page Markdown).
 * `inline: "demo"` embeds only each component's main demo and points to the
 * page for the rest, which keeps llms-full.txt a usable size.
 */
export function expandMarkdown(
  md: string,
  {
    inline = "all",
    pageUrl = "",
  }: { inline?: "all" | "demo"; pageUrl?: string } = {},
) {
  return md
    .replace(
      /<ComponentPreview\b[^>]*?\bname=["']([^"']+)["'][^>]*?\/>/g,
      (tag, name: string) => {
        if (inline === "demo" && !name.endsWith("/demo"))
          return `Example \`${name}\`: source in ${markdownUrl(pageUrl)}`;
        const code = exampleSource(name);
        return code ? `\`\`\`tsx title="${name}.tsx"\n${code}\n\`\`\`` : tag;
      },
    )
    .replace(/<InstallTabs\b[^>]*?\bname=["']([^"']+)["'][^>]*?\/>/g, (_, n) =>
      installBlock(n),
    )
    .replace(/<ComponentLinks\b[^>]*?\/>\n*/g, "")
    .replace(/<ComponentGrid\b[^>]*?\/>\n*/g, "")
    .replace(/\n{3,}/g, "\n\n");
}

export async function renderPage(page: Page, inline: "all" | "demo" = "all") {
  const body = expandMarkdown(await page.data.getText("processed"), {
    inline,
    pageUrl: page.url,
  });
  const description = page.data.description
    ? `> ${page.data.description}\n\n`
    : "";
  return `# ${page.data.title}\n\nSource: ${siteUrl}${page.url}\n\n${description}${body.trim()}\n`;
}

/** Pages in sidebar order, grouped under the sidebar's section headings. */
export function sections() {
  const groups: { title: string; pages: Page[]; links: [string, string][] }[] =
    [];
  let current = {
    title: "Docs",
    pages: [] as Page[],
    links: [] as [string, string][],
  };
  groups.push(current);

  const start = (title: string) => {
    current = { title, pages: [], links: [] };
    groups.push(current);
  };

  type TreeNode = ReturnType<typeof source.getPageTree>["children"][number];
  const walk = (nodes: TreeNode[], prefix = "") => {
    for (const node of nodes) {
      if (node.type === "separator") {
        start(`${prefix}${String(node.name ?? "")}`);
      } else if (node.type === "folder") {
        const name = String(node.name ?? "");
        start(name);
        if (node.index) {
          const p = source.getNodePage(node.index);
          if (p) current.pages.push(p);
        }
        walk(node.children, `${name}: `);
      } else {
        const p = source.getNodePage(node);
        if (p) current.pages.push(p);
        else current.links.push([String(node.name ?? node.url), node.url]);
      }
    }
  };
  walk(source.getPageTree().children);
  return groups.filter((g) => g.pages.length > 0 || g.links.length > 0);
}

export function llmsIndex() {
  const lines = [
    `# ${appName}`,
    "",
    "> Accessible React components built on React Aria Components and styled with Tailwind CSS v4 using shadcn/ui token names. Components are installed as source with the shadcn CLI from the @desyne registry; Desyne Pro adds licensed blocks and multi-page templates.",
    "",
    "Key conventions:",
    "",
    '- Install: `npx shadcn@latest add @desyne/<name>` after adding `"@desyne": "<site>/r/{name}.json"` to `registries` in components.json.',
    "- Components are React Aria components: use `onPress` (not `onClick`), `isDisabled`, `isRequired`, `isInvalid`, `selectedKey`/`onSelectionChange`.",
    "- Fields take `label`, `description` and `errorMessage`; wrap forms in React Aria's `<Form>` for native validation and `validationErrors` for server errors.",
    "- Colors use a `color` prop (primary, brand, neutral, danger, success, warning, info). Sizes are sm (28px), md (32px, default), lg (40px).",
    "- Style states with data attributes: `data-hovered:`, `data-pressed:`, `data-focus-visible:`, `data-selected:`, `data-invalid:`.",
    "- Every page below is also available as Markdown by appending `.md` to its URL.",
    "",
  ];
  for (const group of sections()) {
    lines.push(`## ${group.title}`, "");
    for (const p of group.pages) {
      const desc = p.data.description ? `: ${p.data.description}` : "";
      lines.push(`- [${p.data.title}](${markdownUrl(p.url)})${desc}`);
    }
    for (const [name, url] of group.links) {
      lines.push(`- [${name}](${url.startsWith("/") ? siteUrl + url : url})`);
    }
    lines.push("");
  }
  lines.push(
    "## Optional",
    "",
    `- [Full documentation](${siteUrl}/llms-full.txt): every page above concatenated as Markdown, with each component's main example inlined. Append \`.md\` to a page URL for all of its examples.`,
    `- [Component registry item](${siteUrl}/r/button.json): shadcn registry JSON for any component at \`/r/<name>.json\`.`,
    "",
  );
  return lines.join("\n");
}

export async function llmsFull() {
  const pages = sections().flatMap((g) => g.pages);
  const rendered = await Promise.all(pages.map((p) => renderPage(p, "demo")));
  return rendered.join("\n---\n\n");
}
