"use client";

import {
  type CalendarDate,
  type DateValue,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import { useState } from "react";
import type { RangeValue } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-picker";
import { NumberField } from "@/components/ui/number-field";

export default function DatePickerRecipeTravel() {
  const now = today(getLocalTimeZone());
  const soldOut = [now.add({ days: 9 }), now.add({ days: 10 })];
  const [stay, setStay] = useState<RangeValue<CalendarDate> | null>(null);
  const nights = stay ? stay.end.compare(stay.start) : 0;

  return (
    <form
      className="flex w-full max-w-sm flex-col gap-4 rounded-xl border bg-card p-4 shadow-xs"
      onSubmit={(e) => e.preventDefault()}
    >
      <h3 className="font-semibold text-sm">Find a room</h3>
      <DateRangePicker
        label="Check-in → check-out"
        value={stay}
        onChange={setStay}
        minValue={now}
        maxValue={now.add({ years: 1 })}
        isDateUnavailable={(date: DateValue) =>
          soldOut.some((d) => d.compare(date) === 0)
        }
        startName="checkIn"
        endName="checkOut"
        isRequired
        description={
          nights > 0
            ? `${nights} ${nights === 1 ? "night" : "nights"}`
            : "Sold-out nights are struck through."
        }
      />
      <NumberField
        label="Guests"
        name="guests"
        defaultValue={2}
        minValue={1}
        maxValue={8}
      />
      <Button type="submit">Search availability</Button>
    </form>
  );
}
