"use client";

import {
  DownloadIcon,
  FileTextIcon,
  ImageIcon,
  SheetIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { type Selection, useListData } from "react-aria-components";
import { Button } from "@/components/ui/button";
import {
  GridList,
  GridListItem,
  GridListItemDescription,
  GridListItemLabel,
} from "@/components/ui/grid-list";

const icons = { doc: FileTextIcon, sheet: SheetIcon, image: ImageIcon };

export default function GridListRecipeFileManager() {
  const files = useListData({
    initialItems: [
      {
        id: "1",
        name: "Q3 board deck.pdf",
        size: "4.2 MB",
        kind: "doc" as const,
      },
      {
        id: "2",
        name: "Revenue forecast.xlsx",
        size: "860 KB",
        kind: "sheet" as const,
      },
      {
        id: "3",
        name: "Team offsite.jpg",
        size: "2.8 MB",
        kind: "image" as const,
      },
      {
        id: "4",
        name: "Hiring plan.pdf",
        size: "310 KB",
        kind: "doc" as const,
      },
      {
        id: "5",
        name: "Churn analysis.xlsx",
        size: "1.3 MB",
        kind: "sheet" as const,
      },
    ],
  });
  const [selected, setSelected] = useState<Selection>(new Set());
  const count = selected === "all" ? files.items.length : selected.size;

  const removeSelected = () => {
    const keys =
      selected === "all" ? files.items.map((f) => f.id) : [...selected];
    files.remove(...keys);
    setSelected(new Set());
  };

  return (
    <div className="flex w-full max-w-md flex-col overflow-hidden rounded-lg border bg-card shadow-xs">
      <div className="flex h-11 items-center justify-between gap-2 border-b px-3">
        {count > 0 ? (
          <>
            <span className="font-medium text-sm">{count} selected</span>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost">
                <DownloadIcon /> Download
              </Button>
              <Button
                size="sm"
                variant="ghost"
                color="danger"
                onPress={removeSelected}
              >
                <TrashIcon /> Delete
              </Button>
            </div>
          </>
        ) : (
          <span className="text-muted-foreground text-sm">
            {files.items.length} files
          </span>
        )}
      </div>
      <GridList
        aria-label="Files"
        items={files.items}
        variant="plain"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        className="max-h-72 p-1"
        renderEmptyState={() => "This folder is empty."}
      >
        {(file) => {
          const Icon = icons[file.kind];
          return (
            <GridListItem textValue={file.name}>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <Icon className="size-4" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <GridListItemLabel>{file.name}</GridListItemLabel>
                <GridListItemDescription>{file.size}</GridListItemDescription>
              </span>
            </GridListItem>
          );
        }}
      </GridList>
    </div>
  );
}
