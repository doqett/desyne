"use client";

import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

export default function ToggleButtonGroupSegmented() {
  return (
    <ToggleButtonGroup
      variant="segmented"
      aria-label="Time range"
      defaultSelectedKeys={["week"]}
      disallowEmptySelection
    >
      <ToggleButton id="day">Day</ToggleButton>
      <ToggleButton id="week">Week</ToggleButton>
      <ToggleButton id="month">Month</ToggleButton>
      <ToggleButton id="year">Year</ToggleButton>
    </ToggleButtonGroup>
  );
}
