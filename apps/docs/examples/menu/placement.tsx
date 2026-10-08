"use client";

import { Button } from "@/components/ui/button";
import { MenuContent, MenuItem, MenuTrigger } from "@/components/ui/menu";

const placements = [
  "bottom start",
  "bottom end",
  "top start",
  "right top",
] as const;

export default function MenuPlacement() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {placements.map((placement) => (
        <MenuTrigger key={placement}>
          <Button variant="outline" className="capitalize">
            {placement}
          </Button>
          <MenuContent placement={placement}>
            <MenuItem>Rename</MenuItem>
            <MenuItem>Move to…</MenuItem>
            <MenuItem>Download</MenuItem>
          </MenuContent>
        </MenuTrigger>
      ))}
    </div>
  );
}
