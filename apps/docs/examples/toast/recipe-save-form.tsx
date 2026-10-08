"use client";

import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { toast } from "@/components/ui/toast";

function saveProfile(data: FormData) {
  return new Promise<string>((resolve, reject) =>
    setTimeout(() => {
      const handle = String(data.get("handle"));
      if (handle === "admin") reject(new Error("That handle is reserved."));
      else resolve(handle);
    }, 1200),
  );
}

export default function ToastRecipeSaveForm() {
  const [pending, setPending] = useState(false);

  return (
    <Form
      className="grid w-full max-w-sm gap-4 rounded-xl border bg-card p-5"
      onSubmit={async (e) => {
        e.preventDefault();
        setPending(true);
        const save = saveProfile(new FormData(e.currentTarget));
        toast.promise(save, {
          loading: "Saving profile…",
          success: (handle) => ({
            message: "Profile updated",
            description: `Your public URL is acme.com/@${handle}`,
          }),
          error: (err: Error) => ({
            message: "Couldn't save profile",
            description: err.message,
          }),
          finally: () => setPending(false),
        });
      }}
    >
      <TextField label="Display name" name="name" defaultValue="Maya Chen" />
      <TextField
        label="Handle"
        name="handle"
        defaultValue="maya"
        description="Try “admin” to see the error state."
        isRequired
      />
      <Button type="submit" isPending={pending} className="justify-self-end">
        Save
      </Button>
    </Form>
  );
}
