"use client";

import {
  type CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import { useState } from "react";
import { useLocale } from "react-aria-components";
import { DatePicker } from "@/components/ui/date-picker";

export default function DatePickerControlled() {
  const { locale } = useLocale();
  const [date, setDate] = useState<CalendarDate | null>(
    today(getLocalTimeZone()).add({ weeks: 2 }),
  );
  const formatter = new DateFormatter(locale, { dateStyle: "full" });
  return (
    <div className="flex w-full max-w-60 flex-col gap-3">
      <DatePicker label="Renewal date" value={date} onChange={setDate} />
      <p className="text-muted-foreground text-xs">
        {date
          ? `Renews ${formatter.format(date.toDate(getLocalTimeZone()))}`
          : "No renewal date"}
      </p>
    </div>
  );
}
