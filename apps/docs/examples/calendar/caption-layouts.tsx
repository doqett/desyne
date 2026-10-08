"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import { useState } from "react";
import { Calendar, type CalendarCaptionLayout } from "@/components/ui/calendar";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

const layouts: CalendarCaptionLayout[] = [
  "label",
  "dropdown",
  "dropdown-months",
  "dropdown-years",
];

export default function CalendarCaptionLayouts() {
  const [layout, setLayout] = useState<CalendarCaptionLayout>("dropdown");
  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleButtonGroup
        aria-label="Caption layout"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={[layout]}
        onSelectionChange={(keys) =>
          setLayout([...keys][0] as CalendarCaptionLayout)
        }
        variant="segmented"
        size="sm"
      >
        {layouts.map((l) => (
          <ToggleButton key={l} id={l}>
            {l}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Calendar
        aria-label="Delivery date"
        captionLayout={layout}
        defaultValue={today(getLocalTimeZone())}
        className="rounded-lg border bg-card shadow-xs"
      />
    </div>
  );
}
