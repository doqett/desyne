"use client";

import { AtSignIcon } from "lucide-react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";

export default function TextFieldRecipeProfile() {
  return (
    <Form
      className="w-full max-w-lg rounded-xl border bg-card"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-1 border-b p-5">
        <h3 className="font-semibold">Profile</h3>
        <p className="text-muted-foreground text-sm">
          This is how others will see you on the site.
        </p>
      </div>
      <div className="grid gap-5 p-5 sm:grid-cols-2">
        <TextField
          label="First name"
          name="firstName"
          autoComplete="given-name"
          defaultValue="Priya"
          isRequired
        />
        <TextField
          label="Last name"
          name="lastName"
          autoComplete="family-name"
          defaultValue="Shrestha"
          isRequired
        />
        <TextField
          className="sm:col-span-2"
          label="Username"
          name="username"
          prefix={<AtSignIcon />}
          defaultValue="priya"
          description="Your profile lives at acme.dev/@priya."
          isRequired
        />
        <TextField
          className="sm:col-span-2"
          label="Website"
          name="website"
          inputMode="url"
          prefix="https://"
          placeholder="priya.dev"
        />
      </div>
      <div className="flex justify-end gap-2 border-t px-5 py-3">
        <Button type="reset" variant="ghost">
          Cancel
        </Button>
        <Button type="submit">Save profile</Button>
      </div>
    </Form>
  );
}
