"use client";

import { MailIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";

export default function FormInline() {
  const [email, setEmail] = useState<string | null>(null);
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Form
        layout="inline"
        gap="sm"
        onSubmit={(e) => {
          e.preventDefault();
          setEmail(String(new FormData(e.currentTarget).get("email")));
        }}
      >
        <TextField
          aria-label="Email address"
          name="email"
          type="email"
          placeholder="you@studio.com"
          prefix={<MailIcon />}
          isRequired
          className="min-w-48 flex-1"
        />
        <Button type="submit">Subscribe</Button>
      </Form>
      <p className="text-muted-foreground text-xs" aria-live="polite">
        {email
          ? `Thanks! The next issue goes to ${email}.`
          : "One email a month about new components. No spam."}
      </p>
    </div>
  );
}
