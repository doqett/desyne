"use client";

import { CalendarIcon, KanbanIcon, ListIcon, TableIcon } from "lucide-react";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

export default function ToggleButtonGroupIcons() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <ToggleButtonGroup
        variant="segmented"
        aria-label="Layout"
        defaultSelectedKeys={["board"]}
        disallowEmptySelection
      >
        <ToggleButton id="list">
          <ListIcon /> List
        </ToggleButton>
        <ToggleButton id="board">
          <KanbanIcon /> Board
        </ToggleButton>
        <ToggleButton id="calendar">
          <CalendarIcon /> Calendar
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        aria-label="Layout"
        defaultSelectedKeys={["table"]}
        disallowEmptySelection
      >
        <ToggleButton id="table" aria-label="Table">
          <TableIcon />
        </ToggleButton>
        <ToggleButton id="board" aria-label="Board">
          <KanbanIcon />
        </ToggleButton>
        <ToggleButton id="calendar" aria-label="Calendar">
          <CalendarIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
