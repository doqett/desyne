"use client";

import { RangeCalendar } from "@/components/ui/calendar";

export default function CalendarMultipleMonths() {
  return (
    <RangeCalendar
      aria-label="Campaign dates"
      visibleDuration={{ months: 2 }}
      pageBehavior="single"
      className="rounded-lg border bg-card shadow-xs"
    />
  );
}
