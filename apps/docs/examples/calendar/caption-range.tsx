"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import { RangeCalendar } from "@/components/ui/calendar";

export default function CalendarCaptionRange() {
  const now = today(getLocalTimeZone());
  return (
    <div className="flex flex-col items-center gap-2">
      <RangeCalendar
        aria-label="Stay dates"
        captionLayout="dropdown-months"
        minValue={now}
        maxValue={now.add({ months: 11 })}
        visibleDuration={{ months: 2 }}
        pageBehavior="single"
        className="rounded-lg border bg-card shadow-xs"
      />
      <p className="text-muted-foreground text-xs">
        Bookings open 11 months ahead. Jump straight to a month from the header.
      </p>
    </div>
  );
}
