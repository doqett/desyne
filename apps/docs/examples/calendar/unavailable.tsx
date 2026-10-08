"use client";

import {
  type DateValue,
  getLocalTimeZone,
  isWeekend,
  today,
} from "@internationalized/date";
import { useLocale } from "react-aria-components";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarUnavailable() {
  const { locale } = useLocale();
  const now = today(getLocalTimeZone());
  // Dates already fully booked.
  const booked = [
    now.add({ days: 3 }),
    now.add({ days: 4 }),
    now.add({ days: 10 }),
  ];
  return (
    <Calendar
      aria-label="Meeting date"
      minValue={now}
      isDateUnavailable={(date: DateValue) =>
        isWeekend(date, locale) || booked.some((d) => d.compare(date) === 0)
      }
      className="rounded-lg border bg-card shadow-xs"
    />
  );
}
