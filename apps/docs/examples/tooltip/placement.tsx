"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

const placements = ["top", "right", "bottom", "left"] as const;

export default function TooltipPlacement() {
  return (
    <div className="flex flex-wrap gap-2">
      {placements.map((placement) => (
        <TooltipTrigger key={placement}>
          <Button variant="outline" className="capitalize">
            {placement}
          </Button>
          <Tooltip placement={placement}>Tooltip on {placement}</Tooltip>
        </TooltipTrigger>
      ))}
    </div>
  );
}
