"use client";

import {
  type DateValue,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarMultipleSelection() {
  const now = today(getLocalTimeZone());
  const [dates, setDates] = useState<readonly DateValue[]>([
    now.add({ days: 1 }),
    now.add({ days: 8 }),
  ]);
  return (
    <div className="flex flex-col items-center gap-3">
      <Calendar
        aria-label="On-call days"
        selectionMode="multiple"
        value={dates}
        onChange={setDates}
        className="rounded-lg border bg-card shadow-xs"
      />
      <p className="text-muted-foreground text-sm">
        {dates.length} {dates.length === 1 ? "day" : "days"} selected
      </p>
    </div>
  );
}
