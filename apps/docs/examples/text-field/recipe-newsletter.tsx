"use client";

import { CheckCircle2Icon } from "lucide-react";
import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";

export default function TextFieldRecipeNewsletter() {
  const [email, setEmail] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  if (email) {
    return (
      <p className="flex items-center gap-2 text-sm">
        <CheckCircle2Icon className="size-4 text-success" />
        Check {email} to confirm your subscription.
      </p>
    );
  }

  return (
    <Form
      className="flex w-full max-w-md flex-col gap-3"
      onSubmit={async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setPending(true);
        await new Promise((r) => setTimeout(r, 800));
        setPending(false);
        setEmail(String(data.get("email")));
      }}
    >
      <div>
        <h3 className="font-semibold">Product updates</h3>
        <p className="text-muted-foreground text-sm">
          One email a month. No spam, unsubscribe anytime.
        </p>
      </div>
      <div className="flex items-start gap-2">
        <TextField
          aria-label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          isRequired
          placeholder="you@company.com"
          className="flex-1"
        />
        <Button type="submit" isPending={pending}>
          Subscribe
        </Button>
      </div>
    </Form>
  );
}
