"use client";

import { ArchiveIcon, FileTextIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const files = [
  { id: "q3-report", name: "Q3 revenue report.pdf", size: "2.4 MB" },
  { id: "roadmap", name: "2025 roadmap.key", size: "18.1 MB" },
  { id: "brand", name: "Brand guidelines.fig", size: "7.8 MB" },
  { id: "contract", name: "Vendor contract (signed).pdf", size: "312 KB" },
];

export default function CheckboxRecipeBulkSelect() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["roadmap"]));
  const all = selected.size === files.length;
  const toggle = (id: string, checked: boolean) =>
    setSelected((s) => {
      const next = new Set(s);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border bg-card">
      <div className="flex h-12 items-center justify-between gap-3 border-b bg-muted/40 px-4">
        <Checkbox
          isSelected={all}
          isIndeterminate={selected.size > 0 && !all}
          onChange={(checked) =>
            setSelected(checked ? new Set(files.map((f) => f.id)) : new Set())
          }
        >
          {selected.size > 0 ? `${selected.size} selected` : "Select all"}
        </Checkbox>
        {selected.size > 0 && (
          <div className="flex gap-1">
            <Button variant="ghost" size="sm">
              <ArchiveIcon /> Archive
            </Button>
            <Button variant="ghost" color="danger" size="sm">
              <Trash2Icon /> Delete
            </Button>
          </div>
        )}
      </div>
      <ul className="divide-y">
        {files.map((file) => (
          <li key={file.id} className="flex items-center gap-3 px-4 py-3">
            <Checkbox
              aria-label={`Select ${file.name}`}
              isSelected={selected.has(file.id)}
              onChange={(checked) => toggle(file.id, checked)}
            />
            <FileTextIcon className="size-4 shrink-0 text-muted-foreground" />
            <span className="min-w-0 flex-1 truncate text-sm">{file.name}</span>
            <span className="text-muted-foreground text-xs tabular-nums">
              {file.size}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
