"use client";

import { FileTextIcon, LayoutGridIcon, ListIcon } from "lucide-react";
import { useState } from "react";
import type { Key } from "react-aria-components";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { cn } from "@/lib/utils";

const files = [
  { name: "Brand guidelines.pdf", size: "4.2 MB", updated: "Today" },
  { name: "Q3 board deck.key", size: "18.7 MB", updated: "Yesterday" },
  { name: "Customer interviews.docx", size: "310 KB", updated: "Mon" },
  { name: "Pricing model.xlsx", size: "96 KB", updated: "Sep 12" },
];

export default function ToggleButtonGroupRecipeViewSwitcher() {
  const [view, setView] = useState<Key>("grid");
  return (
    <div className="w-full max-w-lg space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold text-sm">Shared files</h3>
        <ToggleButtonGroup
          variant="segmented"
          size="sm"
          aria-label="View as"
          selectedKeys={[view]}
          onSelectionChange={(keys) => {
            const [next] = keys;
            if (next) setView(next);
          }}
          disallowEmptySelection
        >
          <ToggleButton id="grid" aria-label="Grid">
            <LayoutGridIcon />
          </ToggleButton>
          <ToggleButton id="list" aria-label="List">
            <ListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <ul
        className={cn(
          view === "grid"
            ? "grid grid-cols-2 gap-2"
            : "divide-y rounded-lg border bg-card",
        )}
      >
        {files.map((f) => (
          <li
            key={f.name}
            className={cn(
              "flex items-center gap-3 text-sm",
              view === "grid"
                ? "flex-col items-start rounded-lg border bg-card p-3"
                : "px-3 py-2.5",
            )}
          >
            <FileTextIcon className="size-4 shrink-0 text-muted-foreground" />
            <span className="min-w-0 flex-1 truncate font-medium">
              {f.name}
            </span>
            <span className="shrink-0 text-muted-foreground text-xs">
              {f.size} · {f.updated}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
