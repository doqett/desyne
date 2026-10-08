"use client";

import {
  type CalendarDate,
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import { useState } from "react";
import { type RangeValue, useLocale } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { RangeCalendar } from "@/components/ui/calendar";

const NIGHTLY_RATE = 185;
const MIN_NIGHTS = 2;

export default function CalendarRecipeBooking() {
  const { locale } = useLocale();
  const now = today(getLocalTimeZone());
  const booked = [
    { start: now.add({ days: 5 }), end: now.add({ days: 8 }) },
    { start: now.add({ days: 15 }), end: now.add({ days: 17 }) },
  ];
  const [range, setRange] = useState<RangeValue<CalendarDate> | null>(null);

  const nights = range ? range.end.compare(range.start) : 0;
  const tooShort = range !== null && nights < MIN_NIGHTS;
  const fmt = new DateFormatter(locale, { month: "short", day: "numeric" });
  const format = (d: CalendarDate) => fmt.format(d.toDate(getLocalTimeZone()));

  return (
    <div className="flex w-full max-w-md flex-col overflow-hidden rounded-xl border bg-card shadow-xs sm:flex-row">
      <RangeCalendar
        aria-label="Stay dates"
        value={range}
        onChange={setRange}
        minValue={now}
        isDateUnavailable={(date: DateValue) =>
          booked.some(
            (b) => date.compare(b.start) >= 0 && date.compare(b.end) < 0,
          )
        }
        isInvalid={tooShort}
        errorMessage={
          tooShort ? `Minimum stay is ${MIN_NIGHTS} nights.` : undefined
        }
        className="mx-auto"
      />
      <div className="flex flex-1 flex-col gap-3 border-t p-4 sm:border-t-0 sm:border-l">
        <div>
          <p className="font-semibold text-sm">Lakeside cabin</p>
          <p className="text-muted-foreground text-xs">
            ${NIGHTLY_RATE} / night · {MIN_NIGHTS}-night minimum
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-y-1 text-sm">
          <dt className="text-muted-foreground">Check-in</dt>
          <dd className="text-right">{range ? format(range.start) : "—"}</dd>
          <dt className="text-muted-foreground">Check-out</dt>
          <dd className="text-right">{range ? format(range.end) : "—"}</dd>
          <dt className="text-muted-foreground">Nights</dt>
          <dd className="text-right tabular-nums">{nights || "—"}</dd>
        </dl>
        <div className="mt-auto flex items-center justify-between border-t pt-3">
          <span className="font-semibold text-sm tabular-nums">
            ${(nights * NIGHTLY_RATE).toLocaleString()}
          </span>
          <Button size="sm" isDisabled={!range || tooShort}>
            Reserve
          </Button>
        </div>
      </div>
    </div>
  );
}
