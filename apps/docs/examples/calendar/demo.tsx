"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarDemo() {
  return (
    <Calendar
      aria-label="Appointment date"
      defaultValue={today(getLocalTimeZone())}
      className="rounded-lg border bg-card shadow-xs"
    />
  );
}
