"use client";

import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";

export default function TextFieldValidation() {
  return (
    <Form
      className="flex w-full max-w-xs flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <TextField
        label="Email"
        name="email"
        type="email"
        isRequired
        placeholder="you@company.com"
      />
      <TextField
        label="Invite code"
        name="code"
        isRequired
        pattern="[A-Z]{4}-[0-9]{4}"
        placeholder="ABCD-1234"
        description="Four capital letters, a dash, then four digits."
      />
      <Button type="submit" className="self-start">
        Join workspace
      </Button>
    </Form>
  );
}
