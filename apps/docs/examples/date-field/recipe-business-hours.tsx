"use client";

import { Time } from "@internationalized/date";
import { useState } from "react";
import { TimeField } from "@/components/ui/date-field";
import { Switch } from "@/components/ui/switch";

type Day = {
  id: string;
  name: string;
  open: boolean;
  from: Time | null;
  to: Time | null;
};

const initial: Day[] = [
  {
    id: "mon",
    name: "Monday",
    open: true,
    from: new Time(9),
    to: new Time(17),
  },
  {
    id: "tue",
    name: "Tuesday",
    open: true,
    from: new Time(9),
    to: new Time(17),
  },
  {
    id: "wed",
    name: "Wednesday",
    open: true,
    from: new Time(9),
    to: new Time(17),
  },
  {
    id: "thu",
    name: "Thursday",
    open: true,
    from: new Time(9),
    to: new Time(20),
  },
  {
    id: "fri",
    name: "Friday",
    open: true,
    from: new Time(9),
    to: new Time(15),
  },
  {
    id: "sat",
    name: "Saturday",
    open: false,
    from: new Time(10),
    to: new Time(14),
  },
  { id: "sun", name: "Sunday", open: false, from: null, to: null },
];

export default function DateFieldRecipeBusinessHours() {
  const [days, setDays] = useState(initial);
  const update = (id: string, patch: Partial<Day>) =>
    setDays((prev) => prev.map((d) => (d.id === id ? { ...d, ...patch } : d)));

  return (
    <div className="w-full max-w-lg divide-y rounded-xl border bg-card shadow-xs">
      {days.map((day) => {
        const invalid =
          day.open && day.from && day.to
            ? day.to.compare(day.from) <= 0
            : false;
        return (
          <div
            key={day.id}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3"
          >
            <Switch
              size="sm"
              isSelected={day.open}
              onChange={(open) => update(day.id, { open })}
              className="w-32"
            >
              {day.name}
            </Switch>
            {day.open ? (
              <div className="flex flex-1 items-start gap-2">
                <TimeField
                  aria-label={`${day.name} opens`}
                  size="sm"
                  value={day.from}
                  onChange={(from) => update(day.id, { from })}
                  className="w-28"
                />
                <span className="pt-1 text-muted-foreground text-xs">to</span>
                <TimeField
                  aria-label={`${day.name} closes`}
                  size="sm"
                  value={day.to}
                  onChange={(to) => update(day.id, { to })}
                  isInvalid={invalid}
                  errorMessage="Must be after opening."
                  className="w-28"
                />
              </div>
            ) : (
              <span className="text-muted-foreground text-sm">Closed</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
