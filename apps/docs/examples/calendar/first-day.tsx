"use client";

import { Calendar } from "@/components/ui/calendar";

export default function CalendarFirstDay() {
  return (
    <Calendar
      aria-label="Sprint start"
      firstDayOfWeek="mon"
      className="rounded-lg border bg-card shadow-xs"
    />
  );
}
