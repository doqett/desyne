"use client";

import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";

export default function TextFieldForm() {
  const [data, setData] = useState<Record<string, FormDataEntryValue> | null>(
    null,
  );
  return (
    <Form
      className="flex w-full max-w-xs flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setData(Object.fromEntries(new FormData(e.currentTarget)));
      }}
    >
      <TextField
        label="Full name"
        name="name"
        autoComplete="name"
        isRequired
        defaultValue="Ada Lovelace"
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        isRequired
        defaultValue="ada@acme.dev"
      />
      <div className="flex gap-2">
        <Button type="submit">Submit</Button>
        <Button type="reset" variant="outline" onPress={() => setData(null)}>
          Reset
        </Button>
      </div>
      {data && (
        <code className="rounded-md bg-muted px-2 py-1 text-xs">
          {JSON.stringify(data)}
        </code>
      )}
    </Form>
  );
}
