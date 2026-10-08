"use client";

import {
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  UnderlineIcon,
} from "lucide-react";
import { Toolbar } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

const groups = [
  [
    { label: "Bold", icon: BoldIcon, kbd: "⌘B" },
    { label: "Italic", icon: ItalicIcon, kbd: "⌘I" },
    { label: "Underline", icon: UnderlineIcon, kbd: "⌘U" },
  ],
  [
    { label: "Bulleted list", icon: ListIcon },
    { label: "Numbered list", icon: ListOrderedIcon },
  ],
  [{ label: "Insert link", icon: LinkIcon, kbd: "⌘K" }],
];

export default function ButtonRecipeToolbar() {
  return (
    <Toolbar
      aria-label="Formatting"
      className="flex items-center gap-1 rounded-lg border bg-card p-1 shadow-xs"
    >
      {groups.map((group, i) => (
        <div key={group[0].label} className="flex items-center gap-1">
          {i > 0 && <Separator orientation="vertical" className="mx-1 h-5" />}
          {group.map((a) => (
            <TooltipTrigger key={a.label}>
              <Button variant="ghost" size="icon-sm" aria-label={a.label}>
                <a.icon />
              </Button>
              <Tooltip>
                {a.label}
                {"kbd" in a && <span className="ml-2 opacity-60">{a.kbd}</span>}
              </Tooltip>
            </TooltipTrigger>
          ))}
        </div>
      ))}
    </Toolbar>
  );
}
