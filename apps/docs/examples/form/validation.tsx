"use client";

import { Button } from "@/components/ui/button";
import { Form, FormActions } from "@/components/ui/form";
import { NumberField } from "@/components/ui/number-field";
import { TextField } from "@/components/ui/text-field";

const reserved = ["admin", "root", "support", "billing"];

export default function FormValidation() {
  return (
    <Form className="max-w-sm" onSubmit={(e) => e.preventDefault()}>
      {/* Built-in constraints: required, type, minLength, pattern. */}
      <TextField
        label="Email"
        name="email"
        type="email"
        isRequired
        placeholder="ana@northwind.io"
      />
      {/* Custom rule: return a message to mark the field invalid. */}
      <TextField
        label="Username"
        name="username"
        isRequired
        description="Lowercase letters, numbers and dashes."
        pattern="[a-z0-9-]+"
        validate={(value) =>
          reserved.includes(value.toLowerCase())
            ? `"${value}" is reserved. Pick another username.`
            : null
        }
      />
      <NumberField
        label="Team size"
        name="seats"
        minValue={1}
        maxValue={50}
        isRequired
        description="Plans include up to 50 seats."
      />
      <FormActions align="start">
        <Button type="submit">Continue</Button>
        <Button type="reset" variant="ghost">
          Reset
        </Button>
      </FormActions>
    </Form>
  );
}
