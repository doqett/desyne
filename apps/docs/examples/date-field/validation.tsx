"use client";

import {
  type DateValue,
  getLocalTimeZone,
  isWeekend,
  today,
} from "@internationalized/date";
import { Form, useLocale } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { DateField } from "@/components/ui/date-field";

export default function DateFieldValidation() {
  const { locale } = useLocale();
  return (
    <Form
      validationBehavior="aria"
      className="flex w-full max-w-60 flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <DateField
        label="Go-live date"
        isRequired
        minValue={today(getLocalTimeZone())}
        validate={(date: DateValue | null) =>
          date && isWeekend(date, locale)
            ? "Releases ship on weekdays only."
            : null
        }
        errorMessage={(v) =>
          v.validationDetails.valueMissing
            ? "Choose a go-live date."
            : v.validationDetails.rangeUnderflow
              ? "The date can't be in the past."
              : v.validationErrors.join(" ")
        }
      />
      <Button type="submit" className="self-start">
        Schedule
      </Button>
    </Form>
  );
}
