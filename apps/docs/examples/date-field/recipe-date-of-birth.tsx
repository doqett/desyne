"use client";

import {
  CalendarDate,
  type DateValue,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { DateField } from "@/components/ui/date-field";

function ageOn(birth: DateValue, on: DateValue) {
  const years = on.year - birth.year;
  const hadBirthday =
    on.month > birth.month || (on.month === birth.month && on.day >= birth.day);
  return hadBirthday ? years : years - 1;
}

export default function DateFieldRecipeDateOfBirth() {
  const now = today(getLocalTimeZone());
  const [birth, setBirth] = useState<CalendarDate | null>(null);
  const age = birth ? ageOn(birth, now) : null;
  return (
    <Form
      validationBehavior="aria"
      className="flex w-full max-w-72 flex-col gap-4 rounded-xl border bg-card p-5 shadow-xs"
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <h3 className="font-semibold text-sm">Verify your age</h3>
        <p className="text-muted-foreground text-xs">
          You must be 18 or older to open an account.
        </p>
      </div>
      <DateField
        label="Date of birth"
        name="dob"
        value={birth}
        onChange={setBirth}
        isRequired
        autoComplete="bday"
        placeholderValue={new CalendarDate(1990, 1, 1)}
        maxValue={now}
        validate={(date) =>
          date && ageOn(date, now) < 18
            ? "You must be at least 18 years old."
            : null
        }
        description={age !== null && age >= 0 ? `Age: ${age}` : undefined}
      />
      <Button type="submit">Continue</Button>
    </Form>
  );
}
