"use client";

import {
  type CalendarDate,
  endOfMonth,
  getLocalTimeZone,
  startOfMonth,
  startOfWeek,
  today,
} from "@internationalized/date";
import { useState } from "react";
import { type RangeValue, useLocale } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { RangeCalendar } from "@/components/ui/calendar";

type Range = RangeValue<CalendarDate>;

export default function CalendarRecipePresets() {
  const { locale } = useLocale();
  const now = today(getLocalTimeZone());
  const presets: { label: string; range: Range }[] = [
    { label: "Today", range: { start: now, end: now } },
    {
      label: "Last 7 days",
      range: { start: now.subtract({ days: 6 }), end: now },
    },
    {
      label: "Last 30 days",
      range: { start: now.subtract({ days: 29 }), end: now },
    },
    {
      label: "This week",
      range: { start: startOfWeek(now, locale), end: now },
    },
    { label: "This month", range: { start: startOfMonth(now), end: now } },
    {
      label: "Last month",
      range: {
        start: startOfMonth(now.subtract({ months: 1 })),
        end: endOfMonth(now.subtract({ months: 1 })),
      },
    },
  ];
  const [range, setRange] = useState<Range | null>(presets[1].range);
  const [focused, setFocused] = useState<CalendarDate>(now);

  const isActive = (r: Range) =>
    range !== null &&
    r.start.compare(range.start) === 0 &&
    r.end.compare(range.end) === 0;

  return (
    <div className="flex w-full max-w-md flex-col overflow-hidden rounded-xl border bg-card shadow-xs sm:flex-row">
      <div className="flex gap-1 overflow-x-auto border-b p-2 sm:w-36 sm:flex-col sm:border-r sm:border-b-0">
        {presets.map((p) => (
          <Button
            key={p.label}
            size="sm"
            variant={isActive(p.range) ? "soft" : "ghost"}
            className="shrink-0 justify-start"
            onPress={() => {
              setRange(p.range);
              setFocused(p.range.end);
            }}
          >
            {p.label}
          </Button>
        ))}
      </div>
      <RangeCalendar
        aria-label="Reporting period"
        value={range}
        onChange={setRange}
        focusedValue={focused}
        onFocusChange={setFocused}
        maxValue={now}
        className="mx-auto"
      />
    </div>
  );
}
