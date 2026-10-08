"use client";

import { PinIcon } from "lucide-react";
import { ToggleButton } from "@/components/ui/toggle-button";

export default function ToggleButtonSizes() {
  return (
    <div className="flex items-center gap-2">
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <ToggleButton
          key={size}
          variant="outline"
          size={size}
          aria-label={`Pin (${size})`}
        >
          <PinIcon />
        </ToggleButton>
      ))}
    </div>
  );
}
