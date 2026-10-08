"use client";

import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";

const taken = ["admin", "support", "jordan"];

export default function TextFieldCustomValidation() {
  return (
    <Form
      className="flex w-full max-w-xs flex-col gap-4"
      validationBehavior="aria"
      onSubmit={(e) => e.preventDefault()}
    >
      <TextField
        label="Username"
        name="username"
        defaultValue="admin"
        prefix="@"
        description="Lowercase letters, numbers and dashes."
        validate={(value) => {
          if (!/^[a-z0-9-]*$/.test(value))
            return "Use lowercase letters, numbers and dashes only.";
          if (value.length > 0 && value.length < 3)
            return "Must be at least 3 characters.";
          if (taken.includes(value)) return `@${value} is already taken.`;
          return null;
        }}
      />
      <Button type="submit" className="self-start">
        Claim username
      </Button>
    </Form>
  );
}
