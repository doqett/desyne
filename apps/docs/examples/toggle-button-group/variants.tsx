"use client";

import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

const variants = ["attached", "segmented", "spaced"] as const;

export default function ToggleButtonGroupVariants() {
  return (
    <div className="grid gap-5">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col items-start gap-2">
          <span className="text-muted-foreground text-xs">{variant}</span>
          <ToggleButtonGroup
            variant={variant}
            aria-label={`Status filter (${variant})`}
            defaultSelectedKeys={["open"]}
            disallowEmptySelection
          >
            <ToggleButton id="open">Open</ToggleButton>
            <ToggleButton id="merged">Merged</ToggleButton>
            <ToggleButton id="closed">Closed</ToggleButton>
          </ToggleButtonGroup>
        </div>
      ))}
    </div>
  );
}
