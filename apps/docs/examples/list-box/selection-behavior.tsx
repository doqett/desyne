"use client";

import { FileTextIcon } from "lucide-react";
import { ListBox, ListBoxItem } from "@/components/ui/list-box";

const files = [
  "brand-guidelines.pdf",
  "q3-roadmap.key",
  "customer-interviews.docx",
  "pricing-model.xlsx",
  "launch-checklist.md",
  "press-kit.zip",
];

export default function ListBoxSelectionBehavior() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-2">
      <ListBox
        aria-label="Files"
        selectionMode="multiple"
        selectionBehavior="replace"
        defaultSelectedKeys={["q3-roadmap.key"]}
      >
        {files.map((file) => (
          <ListBoxItem key={file} id={file} textValue={file}>
            <FileTextIcon />
            {file}
          </ListBoxItem>
        ))}
      </ListBox>
      <p className="text-muted-foreground text-xs">
        Click selects one file. Hold ⌘/Ctrl or Shift to select more.
      </p>
    </div>
  );
}
