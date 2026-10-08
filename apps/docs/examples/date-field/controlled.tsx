"use client";

import {
  type CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  parseDate,
} from "@internationalized/date";
import { useState } from "react";
import { useLocale } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { DateField } from "@/components/ui/date-field";

export default function DateFieldControlled() {
  const { locale } = useLocale();
  const [date, setDate] = useState<CalendarDate | null>(
    parseDate("2027-01-15"),
  );
  const formatter = new DateFormatter(locale, { dateStyle: "long" });
  return (
    <div className="flex w-full max-w-56 flex-col gap-3">
      <DateField label="Contract start" value={date} onChange={setDate} />
      <p className="text-muted-foreground text-xs">
        {date
          ? `Starts ${formatter.format(date.toDate(getLocalTimeZone()))} · ISO ${date.toString()}`
          : "No date"}
      </p>
      <Button
        size="sm"
        variant="outline"
        className="self-start"
        onPress={() => setDate(null)}
      >
        Clear
      </Button>
    </div>
  );
}
