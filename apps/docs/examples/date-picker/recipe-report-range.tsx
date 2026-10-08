"use client";

import {
  type CalendarDate,
  getLocalTimeZone,
  startOfMonth,
  startOfYear,
  today,
} from "@internationalized/date";
import { CalendarRangeIcon } from "lucide-react";
import { useState } from "react";
import type { Key, RangeValue } from "react-aria-components";
import { DateRangePicker } from "@/components/ui/date-picker";
import { Select, SelectItem } from "@/components/ui/select";

type Range = RangeValue<CalendarDate>;

function presetRange(id: Key, now: CalendarDate): Range | null {
  switch (id) {
    case "7d":
      return { start: now.subtract({ days: 6 }), end: now };
    case "30d":
      return { start: now.subtract({ days: 29 }), end: now };
    case "90d":
      return { start: now.subtract({ days: 89 }), end: now };
    case "mtd":
      return { start: startOfMonth(now), end: now };
    case "ytd":
      return { start: startOfYear(now), end: now };
    default:
      return null;
  }
}

export default function DatePickerRecipeReportRange() {
  const now = today(getLocalTimeZone());
  const [preset, setPreset] = useState<Key | null>("30d");
  const [range, setRange] = useState<Range | null>(presetRange("30d", now));

  return (
    <div className="flex w-full max-w-xl flex-wrap items-end gap-2 rounded-lg border bg-card p-3 shadow-xs">
      <Select
        label="Period"
        size="sm"
        prefix={<CalendarRangeIcon />}
        selectedKey={preset}
        onSelectionChange={(key) => {
          setPreset(key);
          if (key && key !== "custom") setRange(presetRange(key, now));
        }}
        className="w-44"
      >
        <SelectItem id="7d">Last 7 days</SelectItem>
        <SelectItem id="30d">Last 30 days</SelectItem>
        <SelectItem id="90d">Last 90 days</SelectItem>
        <SelectItem id="mtd">Month to date</SelectItem>
        <SelectItem id="ytd">Year to date</SelectItem>
        <SelectItem id="custom">Custom</SelectItem>
      </Select>
      <DateRangePicker
        aria-label="Custom range"
        size="sm"
        value={range}
        onChange={(value) => {
          setRange(value);
          setPreset("custom");
        }}
        maxValue={now}
        className="w-auto min-w-64 flex-1"
      />
    </div>
  );
}
