"use client";

import { BookOpenIcon, CodeIcon, LayersIcon, RocketIcon } from "lucide-react";
import { useState } from "react";
import { Tree, TreeItem } from "@/components/ui/tree";

export default function TreeNavigation() {
  const [page, setPage] = useState("install");
  return (
    <div className="flex w-full max-w-xl gap-6">
      <Tree
        aria-label="Documentation"
        selectionMode="single"
        selectionBehavior="replace"
        disallowEmptySelection
        selectedKeys={[page]}
        onSelectionChange={(keys) => {
          const [key] = [...keys];
          if (key) setPage(String(key));
        }}
        defaultExpandedKeys={["start", "guides"]}
        className="w-56 shrink-0"
      >
        <TreeItem id="start" title="Getting started" icon={<RocketIcon />}>
          <TreeItem id="install" title="Installation" />
          <TreeItem id="theming" title="Theming" />
        </TreeItem>
        <TreeItem id="guides" title="Guides" icon={<BookOpenIcon />}>
          <TreeItem id="forms" title="Forms" />
          <TreeItem id="dark-mode" title="Dark mode" />
          <TreeItem id="next" title="Next.js" />
        </TreeItem>
        <TreeItem id="components" title="Components" icon={<LayersIcon />}>
          <TreeItem id="button" title="Button" />
          <TreeItem id="tree" title="Tree" />
        </TreeItem>
        <TreeItem id="api" title="API reference" icon={<CodeIcon />} />
      </Tree>
      <div className="hidden flex-1 rounded-lg border border-dashed p-4 text-muted-foreground text-sm sm:block">
        Showing <span className="font-medium text-foreground">{page}</span>.
        Click a page, or use the arrow keys and Enter.
      </div>
    </div>
  );
}
