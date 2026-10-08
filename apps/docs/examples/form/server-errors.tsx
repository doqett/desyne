"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormActions } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";

type Result =
  | { ok: true; slug: string }
  | { ok: false; errors: Record<string, string> };

// Stands in for a server action / API route. In a Next.js app this would be
// an exported "use server" function that checks the database.
async function createWorkspace(data: FormData): Promise<Result> {
  await new Promise((r) => setTimeout(r, 800));
  const slug = String(data.get("slug")).trim().toLowerCase();
  const email = String(data.get("billingEmail")).trim().toLowerCase();
  const errors: Record<string, string> = {};
  if (["acme", "northwind", "globex"].includes(slug)) {
    errors.slug = `“${slug}” is already taken. Try “${slug}-team”.`;
  }
  if (email.endsWith("@example.com")) {
    errors.billingEmail = "We can't send invoices to example.com addresses.";
  }
  return Object.keys(errors).length
    ? { ok: false, errors }
    : { ok: true, slug };
}

export default function FormServerErrors() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [created, setCreated] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  return (
    <Form
      className="max-w-sm"
      validationErrors={errors}
      onSubmit={async (e) => {
        e.preventDefault();
        setPending(true);
        setCreated(null);
        const result = await createWorkspace(new FormData(e.currentTarget));
        setPending(false);
        if (result.ok) {
          setErrors({});
          setCreated(result.slug);
        } else {
          setErrors(result.errors);
        }
      }}
    >
      {created && (
        <Alert color="success" showIcon>
          <AlertTitle>Workspace created</AlertTitle>
          <AlertDescription>
            Your workspace lives at app.wrenly.com/{created}.
          </AlertDescription>
        </Alert>
      )}
      <TextField
        label="Workspace URL"
        name="slug"
        prefix="wrenly.com/"
        defaultValue="acme"
        isRequired
      />
      <TextField
        label="Billing email"
        name="billingEmail"
        type="email"
        defaultValue="finance@example.com"
        isRequired
      />
      <FormActions>
        <Button type="submit" isPending={pending}>
          {pending ? "Creating…" : "Create workspace"}
        </Button>
      </FormActions>
    </Form>
  );
}
