"use client";

import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { DateField, TimeField } from "@/components/ui/date-field";

export default function DateFieldForm() {
  const [data, setData] = useState<Record<string, FormDataEntryValue> | null>(
    null,
  );
  return (
    <Form
      className="flex w-full max-w-64 flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setData(Object.fromEntries(new FormData(e.currentTarget)));
      }}
    >
      <DateField label="Delivery date" name="date" isRequired />
      <TimeField label="Arrival window starts" name="time" isRequired />
      <Button type="submit" className="self-start">
        Save
      </Button>
      {data && (
        <code className="rounded-md bg-muted px-2 py-1 text-xs">
          {JSON.stringify(data)}
        </code>
      )}
    </Form>
  );
}
