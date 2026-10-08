"use client";

import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { TextareaField } from "@/components/ui/textarea";

export default function TextareaForm() {
  const [data, setData] = useState<Record<string, FormDataEntryValue> | null>(
    null,
  );
  return (
    <Form
      className="flex w-full max-w-sm flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setData(Object.fromEntries(new FormData(e.currentTarget)));
      }}
    >
      <TextareaField
        label="Release notes"
        name="notes"
        rows={3}
        isRequired
        defaultValue="Fixed CSV export for reports with more than 10k rows."
      />
      <Button type="submit" className="self-start">
        Publish release
      </Button>
      {data && (
        <code className="rounded-md bg-muted px-2 py-1 text-xs">
          {JSON.stringify(data)}
        </code>
      )}
    </Form>
  );
}
