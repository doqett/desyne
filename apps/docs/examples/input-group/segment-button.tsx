"use client";

import { useState } from "react";
import { Form, TextField } from "react-aria-components";
import { FieldError, Label } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function InputGroupSegmentButton() {
  const [joined, setJoined] = useState<string | null>(null);
  return (
    <Form
      className="w-full max-w-sm"
      onSubmit={(e) => {
        e.preventDefault();
        setJoined(String(new FormData(e.currentTarget).get("email")));
      }}
    >
      <TextField
        name="email"
        type="email"
        isRequired
        className="group/field flex flex-col gap-1.5"
      >
        <Label>Newsletter</Label>
        <InputGroup>
          <InputGroupInput placeholder="you@company.com" />
          <InputGroupButton type="submit" variant="segment">
            Subscribe
          </InputGroupButton>
        </InputGroup>
        <FieldError />
      </TextField>
      {joined && (
        <p role="status" className="mt-2 text-muted-foreground text-sm">
          Subscribed {joined}. Check your inbox to confirm.
        </p>
      )}
    </Form>
  );
}
