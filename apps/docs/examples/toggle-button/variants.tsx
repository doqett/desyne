"use client";

import { EyeIcon, StarIcon } from "lucide-react";
import { ToggleButton } from "@/components/ui/toggle-button";

export default function ToggleButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <ToggleButton defaultSelected>
          <EyeIcon /> Preview
        </ToggleButton>
        <span className="text-muted-foreground text-xs">default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ToggleButton variant="outline" defaultSelected>
          <StarIcon /> Starred
        </ToggleButton>
        <span className="text-muted-foreground text-xs">outline</span>
      </div>
    </div>
  );
}
