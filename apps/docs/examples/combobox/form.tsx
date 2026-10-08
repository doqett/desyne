"use client";

import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { ComboBox, ComboBoxItem } from "@/components/ui/combobox";

const countries = [
  { id: "DE", name: "Germany" },
  { id: "IN", name: "India" },
  { id: "JP", name: "Japan" },
  { id: "NP", name: "Nepal" },
  { id: "US", name: "United States" },
];

export default function ComboBoxForm() {
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
      <ComboBox
        label="Country (submits key)"
        name="country"
        defaultItems={countries}
        defaultValue="NP"
      >
        {(c) => <ComboBoxItem>{c.name}</ComboBoxItem>}
      </ComboBox>
      <ComboBox
        label="Ship from (submits text)"
        name="origin"
        formValue="text"
        defaultItems={countries}
        defaultValue="DE"
      >
        {(c) => <ComboBoxItem>{c.name}</ComboBoxItem>}
      </ComboBox>
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
