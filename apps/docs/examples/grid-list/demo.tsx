"use client";

import { FileTextIcon, ImageIcon, SheetIcon } from "lucide-react";
import {
  GridList,
  GridListItem,
  GridListItemDescription,
  GridListItemLabel,
} from "@/components/ui/grid-list";

const files = [
  {
    id: "1",
    name: "Q3 report.pdf",
    meta: "2.4 MB · Edited 2h ago",
    icon: FileTextIcon,
  },
  {
    id: "2",
    name: "Budget 2027.xlsx",
    meta: "860 KB · Edited yesterday",
    icon: SheetIcon,
  },
  {
    id: "3",
    name: "Hero banner.png",
    meta: "1.1 MB · Edited Sep 12",
    icon: ImageIcon,
  },
];

export default function GridListDemo() {
  return (
    <GridList
      aria-label="Files"
      items={files}
      selectionMode="multiple"
      className="w-80"
    >
      {(file) => (
        <GridListItem textValue={file.name}>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <file.icon className="size-4" />
          </span>
          <span className="flex min-w-0 flex-col">
            <GridListItemLabel>{file.name}</GridListItemLabel>
            <GridListItemDescription>{file.meta}</GridListItemDescription>
          </span>
        </GridListItem>
      )}
    </GridList>
  );
}
