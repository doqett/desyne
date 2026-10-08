"use client";

import {
  type DateValue,
  getLocalTimeZone,
  isWeekend,
  today,
} from "@internationalized/date";
import { useState } from "react";
import { useLocale } from "react-aria-components";
import { RangeCalendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";

export default function CalendarRangeUnavailable() {
  const { locale } = useLocale();
  const [allowWeekends, setAllowWeekends] = useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <RangeCalendar
        aria-label="Leave request"
        minValue={today(getLocalTimeZone())}
        isDateUnavailable={(date: DateValue) => isWeekend(date, locale)}
        allowsNonContiguousRanges={allowWeekends}
        className="rounded-lg border bg-card shadow-xs"
      />
      <Switch isSelected={allowWeekends} onChange={setAllowWeekends} size="sm">
        Span across weekends
      </Switch>
    </div>
  );
}
