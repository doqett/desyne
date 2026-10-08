"use client";

import { CopyIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

const actions = [
  { label: "Edit", icon: PencilIcon },
  { label: "Duplicate", icon: CopyIcon },
  { label: "Delete", icon: Trash2Icon, color: "danger" as const },
];

export default function ButtonTooltip() {
  return (
    <div className="flex items-center gap-1">
      {actions.map((a) => (
        <TooltipTrigger key={a.label}>
          <Button
            variant="ghost"
            size="icon"
            color={a.color}
            aria-label={a.label}
          >
            <a.icon />
          </Button>
          <Tooltip>{a.label}</Tooltip>
        </TooltipTrigger>
      ))}
    </div>
  );
}
