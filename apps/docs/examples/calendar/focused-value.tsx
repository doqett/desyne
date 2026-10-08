"use client";

import {
  type CalendarDate,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarFocusedValue() {
  const [focused, setFocused] = useState<CalendarDate>(parseDate("2027-03-15"));
  return (
    <div className="flex flex-col items-center gap-3">
      <Calendar
        aria-label="Release date"
        focusedValue={focused}
        onFocusChange={setFocused}
        className="rounded-lg border bg-card shadow-xs"
      />
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onPress={() => setFocused(today(getLocalTimeZone()))}
        >
          Today
        </Button>
        <Button
          size="sm"
          variant="outline"
          onPress={() => setFocused(parseDate("2027-03-15"))}
        >
          Launch day
        </Button>
      </div>
    </div>
  );
}
