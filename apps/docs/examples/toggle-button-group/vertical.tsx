"use client";

import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

export default function ToggleButtonGroupVertical() {
  return (
    <ToggleButtonGroup
      orientation="vertical"
      aria-label="View"
      defaultSelectedKeys={["list"]}
      disallowEmptySelection
    >
      <ToggleButton id="list">List</ToggleButton>
      <ToggleButton id="board">Board</ToggleButton>
      <ToggleButton id="calendar">Calendar</ToggleButton>
    </ToggleButtonGroup>
  );
}
