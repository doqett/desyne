"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarMinMax() {
  const now = today(getLocalTimeZone());
  return (
    <div className="flex flex-col items-center gap-2">
      <Calendar
        aria-label="Pickup date"
        minValue={now}
        maxValue={now.add({ days: 21 })}
        className="rounded-lg border bg-card shadow-xs"
      />
      <p className="text-muted-foreground text-xs">
        Pickup is available for the next three weeks.
      </p>
    </div>
  );
}
