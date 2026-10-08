"use client";

import { InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

export default function TooltipLight() {
  return (
    <TooltipTrigger>
      <Button variant="ghost" size="icon" aria-label="What is MTTR?">
        <InfoIcon />
      </Button>
      <Tooltip variant="light" className="max-w-56">
        <p className="font-medium">Mean time to resolve</p>
        <p className="mt-0.5 text-muted-foreground">
          Average time from an alert firing to the incident being closed.
        </p>
      </Tooltip>
    </TooltipTrigger>
  );
}
