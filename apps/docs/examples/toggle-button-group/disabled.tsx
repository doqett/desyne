"use client";

import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

export default function ToggleButtonGroupDisabled() {
  return (
    <div className="flex flex-col items-start gap-4">
      <ToggleButtonGroup
        variant="segmented"
        aria-label="Plan"
        defaultSelectedKeys={["pro"]}
        disallowEmptySelection
        isDisabled
      >
        <ToggleButton id="free">Free</ToggleButton>
        <ToggleButton id="pro">Pro</ToggleButton>
        <ToggleButton id="team">Team</ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        aria-label="Export format"
        defaultSelectedKeys={["csv"]}
        disallowEmptySelection
      >
        <ToggleButton id="csv">CSV</ToggleButton>
        <ToggleButton id="xlsx">Excel</ToggleButton>
        <ToggleButton id="pdf" isDisabled>
          PDF
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
