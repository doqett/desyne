"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarCaptionDropdown() {
  const now = today(getLocalTimeZone());
  return (
    <Calendar
      aria-label="Date of birth"
      captionLayout="dropdown"
      fromYear={1940}
      maxValue={now}
      defaultFocusedValue={now.set({ year: 1990, month: 6, day: 15 })}
      className="rounded-lg border bg-card shadow-xs"
    />
  );
}
