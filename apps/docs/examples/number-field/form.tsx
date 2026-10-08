"use client";

import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { NumberField } from "@/components/ui/number-field";

export default function NumberFieldForm() {
  const [data, setData] = useState<Record<string, FormDataEntryValue> | null>(
    null,
  );
  return (
    <Form
      className="flex w-full max-w-56 flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setData(Object.fromEntries(new FormData(e.currentTarget)));
      }}
    >
      <NumberField
        label="Budget"
        name="budget"
        defaultValue={1500}
        minValue={0}
        formatOptions={{ style: "currency", currency: "EUR" }}
      />
      <NumberField
        label="Discount"
        name="discount"
        defaultValue={0.1}
        minValue={0}
        maxValue={1}
        step={0.05}
        formatOptions={{ style: "percent" }}
      />
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
