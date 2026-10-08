"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import { RangeCalendar } from "@/components/ui/calendar";

export default function CalendarRange() {
  const now = today(getLocalTimeZone());
  return (
    <RangeCalendar
      aria-label="Trip dates"
      defaultValue={{ start: now.add({ days: 2 }), end: now.add({ days: 6 }) }}
      className="rounded-lg border bg-card shadow-xs"
    />
  );
}
