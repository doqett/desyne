"use client";

import type * as PageTree from "fumadocs-core/page-tree";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "fumadocs-ui/components/sidebar/base";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { CSSProperties, ReactNode } from "react";
import { DocsSidebar } from "./sidebar";
import { SiteHeader } from "./site-header";

/** The provider lives above the header, so the layout's own slot is a pass-through. */
function PassThrough({ children }: { children?: ReactNode }) {
  return children;
}

/**
 * Docs chrome: the shared site header on top, then the Fumadocs grid with our
 * own sidebar. The sidebar provider wraps both so the header's menu button
 * can open the mobile drawer.
 */
export function DocsShell({
  tree,
  children,
  footer,
}: {
  tree: PageTree.Root;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <SidebarProvider>
      <div
        className="flex flex-1 flex-col"
        style={
          {
            "--fd-layout-width": "1440px",
            "--ds-header-height": "3.5rem",
          } as CSSProperties
        }
      >
        <a
          href="#nd-page"
          className="-translate-y-full fixed top-2 left-2 z-[60] rounded-md bg-foreground px-3 py-2 font-medium text-background text-sm opacity-0 transition focus-visible:translate-y-0 focus-visible:opacity-100"
        >
          Skip to content
        </a>
        <SiteHeader />
        <DocsLayout
          tree={tree}
          nav={{ enabled: false }}
          searchToggle={{ enabled: false }}
          themeSwitch={{ enabled: false }}
          slots={{
            sidebar: {
              provider: PassThrough,
              root: DocsSidebar,
              trigger: SidebarTrigger,
              useSidebar,
            },
          }}
          containerProps={{
            className: "ds-docs",
            style: {
              "--fd-banner-height": "var(--ds-header-height)",
            } as CSSProperties,
          }}
        >
          {children}
        </DocsLayout>
        {footer}
      </div>
    </SidebarProvider>
  );
}
