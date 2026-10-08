"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-picker";

const MAX_DAYS = 14;

export default function DateRangePickerValidation() {
  const now = today(getLocalTimeZone());
  return (
    <Form
      validationBehavior="aria"
      className="flex w-full max-w-80 flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <DateRangePicker
        label="Vacation"
        isRequired
        minValue={now}
        defaultValue={{
          start: now.add({ days: 7 }),
          end: now.add({ days: 25 }),
        }}
        validate={(range) =>
          range && range.end.compare(range.start) >= MAX_DAYS
            ? `Requests are limited to ${MAX_DAYS} days. Split longer leave into two requests.`
            : null
        }
        description={`Up to ${MAX_DAYS} days per request.`}
      />
      <Button type="submit" className="self-start">
        Submit request
      </Button>
    </Form>
  );
}
