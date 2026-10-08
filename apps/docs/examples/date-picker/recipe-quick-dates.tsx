"use client";

import {
  type CalendarDate,
  getLocalTimeZone,
  startOfWeek,
  today,
} from "@internationalized/date";
import { useState } from "react";
import { useLocale } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";

export default function DatePickerRecipeQuickDates() {
  const { locale } = useLocale();
  const now = today(getLocalTimeZone());
  const [due, setDue] = useState<CalendarDate | null>(null);
  const quick = [
    { label: "Today", date: now },
    { label: "Tomorrow", date: now.add({ days: 1 }) },
    {
      label: "Next week",
      date: startOfWeek(now.add({ weeks: 1 }), locale, "mon"),
    },
    { label: "In 2 weeks", date: now.add({ weeks: 2 }) },
  ];
  return (
    <div className="flex w-full max-w-72 flex-col gap-2">
      <DatePicker
        label="Due date"
        value={due}
        onChange={setDue}
        minValue={now}
      />
      <div className="flex flex-wrap gap-1">
        {quick.map((q) => (
          <Button
            key={q.label}
            size="xs"
            variant={due?.compare(q.date) === 0 ? "soft" : "outline"}
            onPress={() => setDue(q.date)}
          >
            {q.label}
          </Button>
        ))}
        {due && (
          <Button size="xs" variant="ghost" onPress={() => setDue(null)}>
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
