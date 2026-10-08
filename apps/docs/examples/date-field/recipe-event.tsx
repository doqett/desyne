"use client";

import {
  type CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  Time,
  toCalendarDateTime,
  today,
  toZoned,
} from "@internationalized/date";
import { useState } from "react";
import { type Key, useLocale } from "react-aria-components";
import { DateField, TimeField } from "@/components/ui/date-field";
import { Select, SelectItem } from "@/components/ui/select";

const zones = [
  { id: "America/Los_Angeles", name: "Pacific Time" },
  { id: "America/New_York", name: "Eastern Time" },
  { id: "Europe/London", name: "London" },
  { id: "Europe/Berlin", name: "Central European Time" },
  { id: "Asia/Kolkata", name: "India" },
  { id: "Asia/Tokyo", name: "Tokyo" },
];

export default function DateFieldRecipeEvent() {
  const { locale } = useLocale();
  const [date, setDate] = useState<CalendarDate | null>(
    today(getLocalTimeZone()).add({ days: 7 }),
  );
  const [start, setStart] = useState<Time | null>(new Time(15));
  const [end, setEnd] = useState<Time | null>(new Time(16));
  const [zone, setZone] = useState<Key | null>("America/New_York");

  const endBeforeStart = start && end ? end.compare(start) <= 0 : false;
  const zoned =
    date && start && zone
      ? toZoned(toCalendarDateTime(date, start), String(zone))
      : null;
  const local = zoned
    ? new DateFormatter(locale, {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: getLocalTimeZone(),
      }).format(zoned.toDate())
    : null;

  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-xl border bg-card p-5 shadow-xs">
      <h3 className="font-semibold text-sm">Schedule a webinar</h3>
      <DateField
        label="Date"
        value={date}
        onChange={setDate}
        minValue={today(getLocalTimeZone())}
      />
      <div className="grid grid-cols-2 gap-3">
        <TimeField label="Starts" value={start} onChange={setStart} />
        <TimeField
          label="Ends"
          value={end}
          onChange={setEnd}
          isInvalid={endBeforeStart}
          errorMessage="Ends before it starts."
        />
      </div>
      <Select
        label="Time zone"
        items={zones}
        selectedKey={zone}
        onSelectionChange={setZone}
      >
        {(z) => <SelectItem>{z.name}</SelectItem>}
      </Select>
      {local && (
        <p className="rounded-md bg-muted px-3 py-2 text-muted-foreground text-xs">
          Starts {local} in your time zone.
        </p>
      )}
    </div>
  );
}
