"use client";

import {
  type CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import { useState } from "react";
import { useLocale } from "react-aria-components";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarControlled() {
  const { locale } = useLocale();
  const [date, setDate] = useState<CalendarDate | null>(
    today(getLocalTimeZone()).add({ days: 3 }),
  );
  const formatter = new DateFormatter(locale, { dateStyle: "full" });
  return (
    <div className="flex flex-col items-center gap-3">
      <Calendar
        aria-label="Delivery date"
        value={date}
        onChange={setDate}
        className="rounded-lg border bg-card shadow-xs"
      />
      <p className="text-muted-foreground text-sm">
        Delivery:{" "}
        <span className="font-medium text-foreground">
          {date ? formatter.format(date.toDate(getLocalTimeZone())) : "None"}
        </span>
      </p>
    </div>
  );
}
