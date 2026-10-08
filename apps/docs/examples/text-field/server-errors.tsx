"use client";

import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";

type Errors = Record<string, string>;

async function signUp(data: FormData): Promise<Errors> {
  await new Promise((r) => setTimeout(r, 600));
  const errors: Errors = {};
  if (String(data.get("email")).endsWith("@example.com"))
    errors.email = "An account with this email already exists.";
  if (String(data.get("company")).trim().toLowerCase() === "acme")
    errors.company = "This workspace name is reserved.";
  return errors;
}

export default function TextFieldServerErrors() {
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  return (
    <Form
      className="flex w-full max-w-xs flex-col gap-4"
      validationErrors={errors}
      onSubmit={async (e) => {
        e.preventDefault();
        setPending(true);
        setErrors(await signUp(new FormData(e.currentTarget)));
        setPending(false);
      }}
    >
      <TextField
        label="Email"
        name="email"
        type="email"
        isRequired
        defaultValue="jane@example.com"
      />
      <TextField
        label="Company"
        name="company"
        isRequired
        defaultValue="Acme"
      />
      <Button type="submit" isPending={pending} className="self-start">
        Create workspace
      </Button>
    </Form>
  );
}
