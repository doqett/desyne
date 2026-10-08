"use client";

import type * as PageTree from "fumadocs-core/page-tree";
import {
  SidebarContent,
  SidebarDrawerContent,
  SidebarDrawerOverlay,
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  SidebarItem,
  SidebarTrigger,
  SidebarViewport,
} from "fumadocs-ui/components/sidebar/base";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "fumadocs-ui/components/ui/collapsible";
import { useTreeContext } from "fumadocs-ui/contexts/tree";
import { ThemeSwitch } from "fumadocs-ui/layouts/shared/slots/theme-switch";
import { ArrowUpRightIcon, ChevronDownIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useId, useMemo, useState } from "react";
import { DesignSwitcher } from "@/components/design/design-switcher";
import { useDesignHref } from "@/components/design/use-design-href";
import { Logo } from "@/components/logo";
import { headerLinks, isNewPage } from "@/lib/docs-nav";
import { releases } from "@/lib/site";
import { cn } from "@/lib/utils";

type View = "guides" | "components";

const COMPONENTS_URL = "/docs/components";

const normalize = (url: string) =>
  url.length > 1 && url.endsWith("/") ? url.slice(0, -1) : url;

function isComponentsFolder(node: PageTree.Node): node is PageTree.Folder {
  return (
    node.type === "folder" &&
    normalize(node.index?.url ?? "") === COMPONENTS_URL
  );
}

function countPages(nodes: PageTree.Node[]): number {
  return nodes.reduce(
    (n, node) =>
      n +
      (node.type === "page"
        ? 1
        : node.type === "folder"
          ? countPages(node.children)
          : 0),
    0,
  );
}

/** Splits a flat list into groups that start at each separator. */
function groupBySeparator(nodes: PageTree.Node[]) {
  const groups: { title?: ReactNode; id: string; items: PageTree.Node[] }[] =
    [];
  for (const node of nodes) {
    if (node.type === "separator") {
      groups.push({
        title: node.name,
        id: node.$id ?? String(groups.length),
        items: [],
      });
      continue;
    }
    if (groups.length === 0) groups.push({ id: "root", items: [] });
    groups[groups.length - 1].items.push(node);
  }
  return groups.filter((g) => g.items.length > 0);
}

function containsUrl(nodes: PageTree.Node[], url: string): boolean {
  return nodes.some((node) =>
    node.type === "page"
      ? normalize(node.url) === url
      : node.type === "folder"
        ? normalize(node.index?.url ?? "") === url ||
          containsUrl(node.children, url)
        : false,
  );
}

function useSidebarModel() {
  const { root } = useTreeContext();
  const pathname = normalize(usePathname());
  return useMemo(() => {
    const componentsFolder = root.children.find(isComponentsFolder);
    const guides = root.children.filter((n) => !isComponentsFolder(n));
    const components = componentsFolder?.children ?? [];
    return {
      pathname,
      guides,
      componentsFolder,
      components,
      componentCount: countPages(components),
      section: (pathname.startsWith(COMPONENTS_URL)
        ? "components"
        : "guides") as View,
    };
  }, [root, pathname]);
}

const itemClass =
  "relative -ms-px flex w-full items-center gap-2 border-s border-transparent py-1 ps-3 pe-2 text-start text-[0.8125rem] text-muted-foreground leading-5 outline-none transition-colors hover:border-foreground/25 hover:text-foreground focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring/50 data-[active=true]:border-brand data-[active=true]:font-medium data-[active=true]:text-foreground [&_svg]:size-3.5 [&_svg]:shrink-0";

function NewBadge() {
  return (
    <span className="ms-auto rounded-[4px] bg-brand/10 px-1.5 py-px font-mono font-normal text-[0.625rem] text-brand uppercase tracking-[0.08em] dark:bg-brand/15">
      New
    </span>
  );
}

function PageLink({
  node,
  pathname,
}: {
  node: PageTree.Item;
  pathname: string;
}) {
  const active = normalize(node.url) === pathname;
  return (
    <li>
      <SidebarItem
        href={node.url}
        external={node.external}
        active={active}
        aria-current={active ? "page" : undefined}
        className={itemClass}
      >
        <span className="truncate">{node.name}</span>
        {node.external || /^https?:|\.txt$/.test(node.url) ? (
          <ArrowUpRightIcon aria-hidden className="ms-auto opacity-50" />
        ) : isNewPage(normalize(node.url)) ? (
          <NewBadge />
        ) : null}
      </SidebarItem>
    </li>
  );
}

function NodeList({
  nodes,
  pathname,
}: {
  nodes: PageTree.Node[];
  pathname: string;
}) {
  return (
    <ul className="flex flex-col border-s">
      {nodes.map((node, i) => {
        if (node.type === "page")
          return (
            <PageLink key={node.$id ?? i} node={node} pathname={pathname} />
          );
        if (node.type === "folder")
          return (
            <li key={node.$id ?? i}>
              <SidebarFolder
                collapsible={node.collapsible}
                defaultOpen={node.defaultOpen}
                active={containsUrl([node], pathname)}
              >
                {node.index ? (
                  <SidebarFolderLink
                    href={node.index.url}
                    active={normalize(node.index.url) === pathname}
                    className={cn(itemClass, "[&_svg]:ms-auto")}
                  >
                    {node.name}
                  </SidebarFolderLink>
                ) : (
                  <SidebarFolderTrigger
                    className={cn(itemClass, "[&_svg]:ms-auto")}
                  >
                    {node.name}
                  </SidebarFolderTrigger>
                )}
                <SidebarFolderContent className="ps-3">
                  <NodeList nodes={node.children} pathname={pathname} />
                </SidebarFolderContent>
              </SidebarFolder>
            </li>
          );
        return null;
      })}
    </ul>
  );
}

function Group({
  title,
  nodes,
  pathname,
}: {
  title?: ReactNode;
  nodes: PageTree.Node[];
  pathname: string;
}) {
  const [open, setOpen] = useState(true);
  const id = useId();
  const current = containsUrl(nodes, pathname);
  if (!title) return <NodeList nodes={nodes} pathname={pathname} />;
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <section aria-labelledby={id} className="ds-sb-group">
        <div>
          <CollapsibleTrigger
            id={id}
            className="group/sep flex w-full items-center gap-2 rounded-sm py-1 text-start font-medium text-[0.8125rem] text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <span className={cn("truncate", current && "text-foreground")}>
              {title}
            </span>
            <ChevronDownIcon
              aria-hidden
              className={cn(
                "ms-auto size-3 opacity-0 transition group-hover/sep:opacity-60 group-focus-visible/sep:opacity-60",
                !open && "-rotate-90 opacity-60",
              )}
            />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="pt-1.5 ps-[3px]">
            <NodeList nodes={nodes} pathname={pathname} />
          </div>
        </CollapsibleContent>
      </section>
    </Collapsible>
  );
}

function SidebarBody() {
  const model = useSidebarModel();
  const guideGroups = groupBySeparator(model.guides);
  const componentNodes = [
    ...(model.componentsFolder?.index
      ? [
          {
            ...model.componentsFolder.index,
            name: "All components",
          } as PageTree.Item,
        ]
      : []),
    ...model.components,
  ];
  const componentGroups = groupBySeparator(componentNodes);

  return (
    <SidebarViewport className="ds-sb-viewport">
      <nav aria-label="Docs" className="flex flex-col gap-5 pt-4 pb-6">
        {guideGroups.map((g) => (
          <Group
            key={`guides-${g.id}`}
            title={g.title}
            nodes={g.items}
            pathname={model.pathname}
          />
        ))}
        <div className="flex items-center gap-2 border-t pt-5 font-medium text-[0.8125rem] text-foreground">
          Components
          <span className="font-mono font-normal text-[0.65rem] text-muted-foreground tabular-nums">
            {model.componentCount}
          </span>
        </div>
        {componentGroups.map((g) => (
          <Group
            key={`components-${g.id}`}
            title={g.title}
            nodes={g.items}
            pathname={model.pathname}
          />
        ))}
      </nav>
    </SidebarViewport>
  );
}

function SidebarFooter() {
  const latest = releases[0];
  return (
    <div className="flex items-center justify-between gap-2 border-t px-4 py-3 text-xs">
      <span className="inline-flex items-center gap-2 text-muted-foreground">
        <span className="relative flex size-1.5">
          <span className="absolute inset-0 rounded-full bg-success/60 motion-safe:animate-ping" />
          <span className="relative size-1.5 rounded-full bg-success" />
        </span>
        <span className="font-mono">v{latest.version}</span>
      </span>
      <Link
        href="/changelog"
        className="rounded-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        What&apos;s new
      </Link>
    </div>
  );
}

/** Desktop rail + mobile drawer, replacing the stock Fumadocs sidebar. */
export function DocsSidebar() {
  const designHref = useDesignHref();
  return (
    <>
      <SidebarContent>
        {({ ref, collapsed: _c, hovered: _h, ...rest }) => (
          <div
            data-sidebar-placeholder=""
            className="sticky top-(--fd-docs-row-1) z-20 h-[calc(var(--fd-docs-height)-var(--fd-docs-row-1))] [grid-area:sidebar] max-md:hidden md:layout:[--fd-sidebar-width:252px] xl:layout:[--fd-sidebar-width:272px]"
          >
            <aside
              id="nd-sidebar"
              ref={ref}
              aria-label="Documentation"
              className="ds-sidebar absolute inset-y-0 end-0 flex w-(--fd-sidebar-width) flex-col border-e bg-background"
              {...rest}
            >
              <SidebarBody />
              <SidebarFooter />
            </aside>
          </div>
        )}
      </SidebarContent>
      <SidebarDrawerOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px] data-[state=closed]:animate-fd-fade-out data-[state=open]:animate-fd-fade-in" />
      <SidebarDrawerContent
        aria-label="Documentation"
        className="ds-sidebar fixed inset-y-0 end-0 z-50 flex w-[88%] max-w-[360px] flex-col border-s bg-background shadow-2xl data-[state=closed]:animate-fd-sidebar-out data-[state=open]:animate-fd-sidebar-in"
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          <Logo />
          <SidebarTrigger className="-me-1.5 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50">
            <XIcon className="size-4" />
          </SidebarTrigger>
        </div>
        <div className="grid grid-cols-3 gap-1.5 border-b p-4">
          {headerLinks.map((l) => (
            <Link
              key={l.label}
              href={designHref(l.href)}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noreferrer" : undefined}
              className="inline-flex h-8 items-center justify-center gap-0.5 rounded-md border bg-card text-[0.78rem] text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              {l.label}
              {l.external && (
                <ArrowUpRightIcon aria-hidden className="size-3 opacity-50" />
              )}
            </Link>
          ))}
        </div>
        <SidebarBody />
        <div className="flex items-center justify-between border-t px-4 py-2.5">
          <span className="font-medium text-[0.8125rem] text-muted-foreground">
            Preview design
          </span>
          <DesignSwitcher alwaysShowLabel className="-me-1.5" />
        </div>
        <div className="flex items-center justify-between border-t px-4 py-3">
          <span className="font-medium text-[0.8125rem] text-muted-foreground">
            Theme
          </span>
          <ThemeSwitch />
        </div>
      </SidebarDrawerContent>
    </>
  );
}
