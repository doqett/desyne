"use client";

import { FolderIcon, HomeIcon, InboxIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

const items = [
  { label: "Home", icon: HomeIcon },
  { label: "Inbox", icon: InboxIcon },
  { label: "Projects", icon: FolderIcon },
];

export default function TooltipDisabled() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex flex-col items-start gap-4">
      <Switch isSelected={expanded} onChange={setExpanded}>
        Show labels
      </Switch>
      <nav
        aria-label="Main"
        className="flex flex-col gap-1 rounded-lg border bg-card p-1"
      >
        {items.map((item) => (
          <TooltipTrigger key={item.label} isDisabled={expanded}>
            <Button
              variant="ghost"
              size={expanded ? "md" : "icon"}
              aria-label={expanded ? undefined : item.label}
              className={expanded ? "w-32 justify-start" : undefined}
            >
              <item.icon />
              {expanded && item.label}
            </Button>
            <Tooltip placement="right">{item.label}</Tooltip>
          </TooltipTrigger>
        ))}
      </nav>
    </div>
  );
}
