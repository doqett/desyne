"use client";

import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

const sizes = ["xs", "sm", "md", "lg"] as const;

export default function ToggleButtonGroupSizes() {
  return (
    <div className="flex flex-col items-start gap-3">
      {sizes.map((size) => (
        <ToggleButtonGroup
          key={size}
          variant="segmented"
          size={size}
          aria-label={`Chart interval (${size})`}
          defaultSelectedKeys={["1d"]}
          disallowEmptySelection
        >
          <ToggleButton id="1h">1H</ToggleButton>
          <ToggleButton id="1d">1D</ToggleButton>
          <ToggleButton id="1w">1W</ToggleButton>
          <ToggleButton id="1m">1M</ToggleButton>
        </ToggleButtonGroup>
      ))}
    </div>
  );
}
