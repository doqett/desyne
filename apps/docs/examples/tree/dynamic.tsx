"use client";

import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import { Collection } from "react-aria-components";
import { Tree, TreeItem } from "@/components/ui/tree";

interface Node {
  id: string;
  name: string;
  size?: string;
  children?: Node[];
}

const files: Node[] = [
  {
    id: "brand",
    name: "Brand",
    children: [
      { id: "logo-svg", name: "logo.svg", size: "4 KB" },
      { id: "logo-png", name: "logo@2x.png", size: "88 KB" },
      {
        id: "fonts",
        name: "Fonts",
        children: [
          { id: "inter", name: "Inter.woff2", size: "312 KB" },
          { id: "mono", name: "JetBrainsMono.woff2", size: "96 KB" },
        ],
      },
    ],
  },
  {
    id: "contracts",
    name: "Contracts",
    children: [
      { id: "msa", name: "MSA – Northwind.pdf", size: "1.2 MB" },
      { id: "nda", name: "NDA – Globex.pdf", size: "240 KB" },
    ],
  },
  { id: "roadmap", name: "Roadmap 2027.key", size: "18 MB" },
];

export default function TreeDynamic() {
  return (
    <Tree
      aria-label="Shared drive"
      items={files}
      defaultExpandedKeys={["brand"]}
      variant="bordered"
      className="w-80"
    >
      {function renderNode(node: Node) {
        return (
          <TreeItem
            id={node.id}
            title={node.name}
            icon={
              node.children ? (
                ({ isExpanded }) =>
                  isExpanded ? <FolderOpenIcon /> : <FolderIcon />
              ) : (
                <FileIcon />
              )
            }
            suffix={node.size}
          >
            {node.children && (
              <Collection items={node.children}>{renderNode}</Collection>
            )}
          </TreeItem>
        );
      }}
    </Tree>
  );
}
