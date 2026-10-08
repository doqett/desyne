"use client";

import { BellIcon, PinIcon, StarIcon } from "lucide-react";
import { ToggleButton } from "@/components/ui/toggle-button";

export default function ToggleButtonOutline() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ToggleButton variant="outline" defaultSelected>
        <StarIcon /> Star
      </ToggleButton>
      <ToggleButton variant="outline">
        <PinIcon /> Pin to sidebar
      </ToggleButton>
      <ToggleButton variant="outline">
        <BellIcon /> Watch
      </ToggleButton>
    </div>
  );
}
