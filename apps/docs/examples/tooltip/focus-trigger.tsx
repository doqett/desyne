"use client";

import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

export default function TooltipFocusTrigger() {
  return (
    <div className="flex items-end gap-2">
      <TextField label="Coupon code" placeholder="SPRING26" className="w-48" />
      <TooltipTrigger trigger="focus">
        <Button variant="outline">Apply</Button>
        <Tooltip placement="bottom">Codes are case-insensitive</Tooltip>
      </TooltipTrigger>
    </div>
  );
}
