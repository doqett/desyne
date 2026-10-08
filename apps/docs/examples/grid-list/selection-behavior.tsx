"use client";

import { FolderIcon } from "lucide-react";
import { GridList, GridListItem } from "@/components/ui/grid-list";

const folders = [
  "Contracts",
  "Invoices",
  "Receipts",
  "Tax returns",
  "Payroll",
  "Archive",
];

export default function GridListSelectionBehavior() {
  return (
    <div className="flex w-full max-w-72 flex-col gap-2">
      <GridList
        aria-label="Folders"
        selectionMode="multiple"
        selectionBehavior="replace"
        defaultSelectedKeys={["Invoices"]}
      >
        {folders.map((name) => (
          <GridListItem key={name} id={name} textValue={name}>
            <FolderIcon className="size-4 text-muted-foreground" />
            {name}
          </GridListItem>
        ))}
      </GridList>
      <p className="text-muted-foreground text-xs">
        No checkboxes: click to select, ⌘/Ctrl or Shift to select more.
      </p>
    </div>
  );
}
