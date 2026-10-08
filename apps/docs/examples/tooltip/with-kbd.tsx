"use client";

import { RedoIcon, SearchIcon, UndoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

const actions = [
  { label: "Undo", icon: UndoIcon, keys: ["⌘", "Z"] },
  { label: "Redo", icon: RedoIcon, keys: ["⌘", "⇧", "Z"] },
  { label: "Search", icon: SearchIcon, keys: ["⌘", "K"] },
];

export default function TooltipWithKbd() {
  return (
    <div className="flex items-center gap-1">
      {actions.map((a) => (
        <TooltipTrigger key={a.label}>
          <Button variant="ghost" size="icon" aria-label={a.label}>
            <a.icon />
          </Button>
          <Tooltip variant="light" className="flex items-center gap-2">
            {a.label}
            <KbdGroup>
              {a.keys.map((k) => (
                <Kbd key={k} size="sm">
                  {k}
                </Kbd>
              ))}
            </KbdGroup>
          </Tooltip>
        </TooltipTrigger>
      ))}
    </div>
  );
}
