"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarDisabled() {
  const now = today(getLocalTimeZone());
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Calendar
          aria-label="Disabled calendar"
          isDisabled
          defaultValue={now}
          className="rounded-lg border bg-card shadow-xs"
        />
        <span className="text-muted-foreground text-xs">isDisabled</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Calendar
          aria-label="Read-only calendar"
          isReadOnly
          defaultValue={now}
          className="rounded-lg border bg-card shadow-xs"
        />
        <span className="text-muted-foreground text-xs">isReadOnly</span>
      </div>
    </div>
  );
}
