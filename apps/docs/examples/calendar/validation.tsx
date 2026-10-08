"use client";

import {
  type CalendarDate,
  getLocalTimeZone,
  isWeekend,
  today,
} from "@internationalized/date";
import { useState } from "react";
import { useLocale } from "react-aria-components";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarValidation() {
  const { locale } = useLocale();
  const [date, setDate] = useState<CalendarDate | null>(() => {
    // Start on the next Saturday so the error is visible.
    let d = today(getLocalTimeZone());
    while (!isWeekend(d, locale)) d = d.add({ days: 1 });
    return d;
  });
  const isInvalid = date !== null && isWeekend(date, locale);
  return (
    <Calendar
      aria-label="Deployment date"
      value={date}
      onChange={setDate}
      isInvalid={isInvalid}
      errorMessage={
        isInvalid
          ? "Deploys are frozen on weekends. Pick a weekday."
          : undefined
      }
      className="max-w-72 rounded-lg border bg-card shadow-xs"
    />
  );
}
