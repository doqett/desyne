"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

export default function TooltipDelay() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <TooltipTrigger delay={0}>
        <Button variant="outline">Instant</Button>
        <Tooltip>Opens immediately</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button variant="outline">Default</Button>
        <Tooltip>Opens after 400ms</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger delay={1200} closeDelay={600}>
        <Button variant="outline">Slow</Button>
        <Tooltip>Opens after 1.2s, lingers for 600ms</Tooltip>
      </TooltipTrigger>
    </div>
  );
}
