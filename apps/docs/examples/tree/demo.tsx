"use client";

import {
  FileCodeIcon,
  FileJsonIcon,
  FileTextIcon,
  FolderIcon,
  FolderOpenIcon,
} from "lucide-react";
import { Tree, TreeItem } from "@/components/ui/tree";

const folder = ({ isExpanded }: { isExpanded: boolean }) =>
  isExpanded ? <FolderOpenIcon /> : <FolderIcon />;

export default function TreeDemo() {
  return (
    <Tree
      aria-label="Project files"
      variant="bordered"
      defaultExpandedKeys={["app", "components"]}
      className="w-72"
    >
      <TreeItem id="app" title="app" icon={folder}>
        <TreeItem id="layout" title="layout.tsx" icon={<FileCodeIcon />} />
        <TreeItem id="page" title="page.tsx" icon={<FileCodeIcon />} />
        <TreeItem id="settings" title="settings" icon={folder}>
          <TreeItem
            id="settings-page"
            title="page.tsx"
            textValue="settings/page.tsx"
            icon={<FileCodeIcon />}
          />
        </TreeItem>
      </TreeItem>
      <TreeItem id="components" title="components" icon={folder}>
        <TreeItem id="ui" title="ui" icon={folder}>
          <TreeItem id="button" title="button.tsx" icon={<FileCodeIcon />} />
          <TreeItem id="tree" title="tree.tsx" icon={<FileCodeIcon />} />
        </TreeItem>
        <TreeItem id="header" title="site-header.tsx" icon={<FileCodeIcon />} />
      </TreeItem>
      <TreeItem id="package" title="package.json" icon={<FileJsonIcon />} />
      <TreeItem id="readme" title="README.md" icon={<FileTextIcon />} />
    </Tree>
  );
}
