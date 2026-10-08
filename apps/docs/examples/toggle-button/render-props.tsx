"use client";

import { EyeIcon, EyeOffIcon, StarIcon } from "lucide-react";
import { ToggleButton } from "@/components/ui/toggle-button";

export default function ToggleButtonRenderProps() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ToggleButton variant="outline">
        {({ isSelected }) => (
          <>
            <StarIcon
              className={isSelected ? "size-4 fill-current" : "size-4"}
            />
            Star
          </>
        )}
      </ToggleButton>
      <ToggleButton variant="outline" aria-label="Hide archived projects">
        {({ isSelected }) => (isSelected ? <EyeOffIcon /> : <EyeIcon />)}
      </ToggleButton>
    </div>
  );
}
