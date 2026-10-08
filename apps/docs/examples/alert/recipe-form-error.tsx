"use client";

import { useState } from "react";
import { Form } from "react-aria-components";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";

const taken = ["acme-web", "acme-api", "marketing"];

export default function AlertRecipeFormError() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <Form
      className="grid w-full max-w-sm gap-4 rounded-xl border bg-card p-5"
      onSubmit={async (e) => {
        e.preventDefault();
        const slug = String(new FormData(e.currentTarget).get("slug"));
        setError(null);
        setPending(true);
        await new Promise((r) => setTimeout(r, 900));
        setPending(false);
        setError(
          taken.includes(slug)
            ? `A project named “${slug}” already exists in this workspace.`
            : null,
        );
      }}
    >
      <div>
        <h3 className="font-semibold">New project</h3>
        <p className="text-muted-foreground text-sm">
          Try “acme-web” to see the error.
        </p>
      </div>
      {error && (
        <Alert color="danger" showIcon>
          <AlertTitle>Couldn't create project</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <TextField
        label="Project slug"
        name="slug"
        defaultValue="acme-web"
        isRequired
      />
      <Button type="submit" isPending={pending}>
        Create project
      </Button>
    </Form>
  );
}
