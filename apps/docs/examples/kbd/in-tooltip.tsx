"use client";

import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

const actions = [
  { label: "Bold", icon: BoldIcon, key: "B" },
  { label: "Italic", icon: ItalicIcon, key: "I" },
  { label: "Underline", icon: UnderlineIcon, key: "U" },
];

export default function KbdInTooltip() {
  return (
    <div className="flex items-center gap-1">
      {actions.map((a) => (
        <TooltipTrigger key={a.label}>
          <Button variant="ghost" size="icon-sm" aria-label={a.label}>
            <a.icon />
          </Button>
          <Tooltip variant="light" className="flex items-center gap-2">
            {a.label}
            <KbdGroup>
              <Kbd size="sm">⌘</Kbd>
              <Kbd size="sm">{a.key}</Kbd>
            </KbdGroup>
          </Tooltip>
        </TooltipTrigger>
      ))}
    </div>
  );
}
