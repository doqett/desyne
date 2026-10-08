"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverDialog,
  PopoverTrigger,
} from "@/components/ui/popover";

const placements = ["top", "right", "bottom", "left"] as const;

export default function PopoverPlacement() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {placements.map((placement) => (
        <PopoverTrigger key={placement}>
          <Button variant="outline" className="capitalize">
            {placement}
          </Button>
          <Popover placement={placement} showArrow>
            <PopoverDialog
              aria-label={`Popover on ${placement}`}
              className="w-auto px-3 py-2 text-sm"
            >
              Placed on the {placement}
            </PopoverDialog>
          </Popover>
        </PopoverTrigger>
      ))}
    </div>
  );
}
