"use client";

import { BookmarkIcon, HeartIcon } from "lucide-react";
import { ToggleButton } from "@/components/ui/toggle-button";

export default function ToggleButtonCustomStyle() {
  return (
    <div className="flex items-center gap-1">
      <ToggleButton
        aria-label="Like"
        className="data-selected:bg-destructive/10 data-selected:text-destructive data-selected:[&_svg]:fill-current"
      >
        <HeartIcon />
      </ToggleButton>
      <ToggleButton
        aria-label="Save"
        defaultSelected
        className="data-selected:bg-transparent data-selected:text-brand data-selected:[&_svg]:fill-current"
      >
        <BookmarkIcon />
      </ToggleButton>
    </div>
  );
}
