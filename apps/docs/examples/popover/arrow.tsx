"use client";

import { InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverDialog,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function PopoverArrow() {
  return (
    <div className="flex items-center gap-1.5 text-sm">
      Monthly active users
      <PopoverTrigger>
        <Button variant="ghost" size="icon-xs" aria-label="About this metric">
          <InfoIcon />
        </Button>
        <Popover showArrow placement="top">
          <PopoverDialog
            aria-label="About monthly active users"
            className="w-64 text-sm"
          >
            Unique users who signed in at least once in the last 30 days. Bots
            and service accounts are excluded.
          </PopoverDialog>
        </Popover>
      </PopoverTrigger>
    </div>
  );
}
