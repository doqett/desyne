"use client";

import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { DatePicker, DateRangePicker } from "@/components/ui/date-picker";

export default function DatePickerForm() {
  const [data, setData] = useState<Record<string, FormDataEntryValue> | null>(
    null,
  );
  return (
    <Form
      className="flex w-full max-w-80 flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setData(Object.fromEntries(new FormData(e.currentTarget)));
      }}
    >
      <DatePicker label="Publish on" name="publishAt" isRequired />
      <DateRangePicker
        label="Promotion"
        startName="promoStart"
        endName="promoEnd"
        isRequired
      />
      <Button type="submit" className="self-start">
        Save
      </Button>
      {data && (
        <code className="rounded-md bg-muted px-2 py-1 text-xs break-all">
          {JSON.stringify(data)}
        </code>
      )}
    </Form>
  );
}
