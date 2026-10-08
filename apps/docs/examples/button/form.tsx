"use client";

import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";

export default function ButtonForm() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  return (
    <Form
      className="flex w-full max-w-xs flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        setSubmitted(JSON.stringify(data));
      }}
      onReset={() => setSubmitted(null)}
    >
      <TextField label="Project name" name="name" isRequired />
      <div className="flex gap-2">
        <Button type="submit">Create</Button>
        <Button type="reset" variant="ghost">
          Reset
        </Button>
      </div>
      {submitted && (
        <code className="rounded-md bg-muted px-2 py-1 text-xs">
          {submitted}
        </code>
      )}
    </Form>
  );
}
