"use client";

import { Button } from "@/components/ui/button";
import { Form, FormActions } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";

/** Compact form used as the component grid thumbnail. */
export default function FormThumb() {
  return (
    <Form className="w-full max-w-xs" onSubmit={(e) => e.preventDefault()}>
      <TextField
        label="Work email"
        name="email"
        type="email"
        defaultValue="maya@acme"
        isInvalid
        errorMessage="Enter a complete email address."
      />
      <FormActions>
        <Button variant="outline">Cancel</Button>
        <Button type="submit">Invite</Button>
      </FormActions>
    </Form>
  );
}
