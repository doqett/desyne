"use client";

import {
  type CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  isWeekend,
  today,
} from "@internationalized/date";
import { useState } from "react";
import type { Key } from "react-aria-components";
import { useLocale } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

const slots = [
  "09:00",
  "09:30",
  "10:00",
  "11:30",
  "13:00",
  "14:30",
  "15:00",
  "16:30",
];

export default function CalendarRecipeAppointment() {
  const { locale } = useLocale();
  const now = today(getLocalTimeZone());
  const [date, setDate] = useState<CalendarDate | null>(null);
  const [slot, setSlot] = useState<Key | null>(null);
  const fmt = new DateFormatter(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex w-full max-w-lg flex-col overflow-hidden rounded-xl border bg-card shadow-xs sm:flex-row">
      <Calendar
        aria-label="Appointment date"
        value={date}
        onChange={(d) => {
          setDate(d);
          setSlot(null);
        }}
        minValue={now.add({ days: 1 })}
        maxValue={now.add({ days: 45 })}
        isDateUnavailable={(d) => isWeekend(d, locale)}
        className="mx-auto"
      />
      <div className="flex flex-1 flex-col gap-3 border-t p-4 sm:border-t-0 sm:border-l">
        <p className="font-medium text-sm">
          {date ? fmt.format(date.toDate(getLocalTimeZone())) : "Pick a day"}
        </p>
        {date ? (
          <ToggleButtonGroup
            aria-label="Available times"
            variant="spaced"
            size="sm"
            selectionMode="single"
            selectedKeys={slot ? [slot] : []}
            onSelectionChange={(keys) => setSlot([...keys][0] ?? null)}
            className="grid grid-cols-3 gap-1.5 sm:grid-cols-2"
          >
            {slots.map((time) => (
              <ToggleButton key={time} id={time} className="tabular-nums">
                {time}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        ) : (
          <p className="text-muted-foreground text-xs">
            Available times appear once you choose a date. Weekends are closed.
          </p>
        )}
        <Button className="mt-auto" isDisabled={!date || !slot}>
          Book 30-minute call
        </Button>
      </div>
    </div>
  );
}
