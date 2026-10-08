"use client";

import { useState } from "react";
import type { Selection } from "react-aria-components";
import { Tree, TreeItem } from "@/components/ui/tree";

export default function TreeSelection() {
  const [selected, setSelected] = useState<Selection>(
    new Set(["issues-read", "issues-write", "repo-read"]),
  );
  const count = selected === "all" ? "All" : selected.size;
  return (
    <div className="flex flex-col gap-3">
      <Tree
        aria-label="Token permissions"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        defaultExpandedKeys={["repo", "issues"]}
        variant="bordered"
        className="w-80"
      >
        <TreeItem id="repo" title="Repository">
          <TreeItem id="repo-read" title="Read contents" />
          <TreeItem id="repo-write" title="Push commits" />
          <TreeItem id="repo-admin" title="Manage settings" isDisabled />
        </TreeItem>
        <TreeItem id="issues" title="Issues">
          <TreeItem id="issues-read" title="Read issues" />
          <TreeItem id="issues-write" title="Create and comment" />
        </TreeItem>
        <TreeItem id="deploy" title="Deployments">
          <TreeItem id="deploy-read" title="View deployments" />
          <TreeItem id="deploy-run" title="Trigger deploys" />
        </TreeItem>
      </Tree>
      <p className="text-muted-foreground text-sm" aria-live="polite">
        {count} permission{count === 1 ? "" : "s"} selected. Repository admin
        needs an owner role.
      </p>
    </div>
  );
}
