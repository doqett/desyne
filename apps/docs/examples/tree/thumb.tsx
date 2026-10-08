"use client";

import {
  FileCodeIcon,
  FileTextIcon,
  FolderIcon,
  FolderOpenIcon,
} from "lucide-react";
import { Tree, TreeItem } from "@/components/ui/tree";

const folder = ({ isExpanded }: { isExpanded: boolean }) =>
  isExpanded ? <FolderOpenIcon /> : <FolderIcon />;

/** Compact tree used as the component grid thumbnail. */
export default function TreeThumb() {
  return (
    <Tree
      aria-label="Files"
      variant="bordered"
      defaultExpandedKeys={["app"]}
      className="w-60"
    >
      <TreeItem id="app" title="app" icon={folder}>
        <TreeItem id="layout" title="layout.tsx" icon={<FileCodeIcon />} />
        <TreeItem id="page" title="page.tsx" icon={<FileCodeIcon />} />
      </TreeItem>
      <TreeItem id="components" title="components" icon={folder}>
        <TreeItem id="button" title="button.tsx" icon={<FileCodeIcon />} />
      </TreeItem>
      <TreeItem id="readme" title="README.md" icon={<FileTextIcon />} />
    </Tree>
  );
}
