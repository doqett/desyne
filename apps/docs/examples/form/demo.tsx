"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormActions, FormRow } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";

export default function FormDemo() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  return (
    <Form
      className="max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setSubmitted(String(data.get("firstName")));
      }}
    >
      <FormRow>
        <TextField label="First name" name="firstName" isRequired />
        <TextField label="Last name" name="lastName" isRequired />
      </FormRow>
      <TextField
        label="Work email"
        name="email"
        type="email"
        placeholder="you@company.com"
        isRequired
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        description="At least 8 characters."
        minLength={8}
        isRequired
      />
      <Checkbox name="terms" value="accepted" isRequired>
        I agree to the terms of service
      </Checkbox>
      <FormActions align="between">
        <p className="text-muted-foreground text-sm" aria-live="polite">
          {submitted ? `Welcome aboard, ${submitted}.` : null}
        </p>
        <Button type="submit">Create account</Button>
      </FormActions>
    </Form>
  );
}
