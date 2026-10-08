"use client";

import { DownloadIcon, PrinterIcon, Share2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

const actions = [
  { label: "Download", icon: DownloadIcon },
  { label: "Print", icon: PrinterIcon },
  { label: "Share", icon: Share2Icon },
];

export default function TooltipNoArrow() {
  return (
    <div className="flex items-center gap-1">
      {actions.map((a) => (
        <TooltipTrigger key={a.label}>
          <Button variant="ghost" size="icon" aria-label={a.label}>
            <a.icon />
          </Button>
          <Tooltip showArrow={false} placement="bottom" offset={4}>
            {a.label}
          </Tooltip>
        </TooltipTrigger>
      ))}
    </div>
  );
}
