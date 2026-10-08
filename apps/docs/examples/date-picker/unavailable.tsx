"use client";

import {
  type DateValue,
  getLocalTimeZone,
  isWeekend,
  parseDate,
  today,
} from "@internationalized/date";
import { useLocale } from "react-aria-components";
import { DatePicker } from "@/components/ui/date-picker";

// Public holidays the warehouse is closed.
const holidays = ["2026-11-26", "2026-12-25", "2027-01-01"].map((d) =>
  parseDate(d),
);

export default function DatePickerUnavailable() {
  const { locale } = useLocale();
  return (
    <DatePicker
      label="Pickup date"
      minValue={today(getLocalTimeZone()).add({ days: 1 })}
      isDateUnavailable={(date: DateValue) =>
        isWeekend(date, locale) || holidays.some((h) => h.compare(date) === 0)
      }
      description="Weekdays only, excluding public holidays."
      className="w-full max-w-60"
    />
  );
}
