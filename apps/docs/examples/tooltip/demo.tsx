"use client";

import { BookmarkPlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

export default function TooltipDemo() {
  return (
    <TooltipTrigger>
      <Button variant="outline" size="icon" aria-label="Add to library">
        <BookmarkPlusIcon />
      </Button>
      <Tooltip>Add to library</Tooltip>
    </TooltipTrigger>
  );
}
