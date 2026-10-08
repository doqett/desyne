"use client";

import { CheckCircle2Icon } from "lucide-react";
import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { TextareaField } from "@/components/ui/textarea";

export default function TextareaRecipeFeedback() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  if (sent) {
    return (
      <div className="flex w-full max-w-md flex-col items-center gap-2 rounded-xl border bg-card p-8 text-center">
        <CheckCircle2Icon className="size-6 text-success" />
        <p className="font-medium">Thanks for the feedback</p>
        <p className="text-muted-foreground text-sm">
          The product team reads every message.
        </p>
      </div>
    );
  }

  return (
    <Form
      className="flex w-full max-w-md flex-col gap-4 rounded-xl border bg-card p-5"
      onSubmit={async (e) => {
        e.preventDefault();
        setPending(true);
        await new Promise((r) => setTimeout(r, 800));
        setPending(false);
        setSent(true);
      }}
    >
      <div>
        <h3 className="font-semibold">Send feedback</h3>
        <p className="text-muted-foreground text-sm">
          Tell us what's working and what isn't.
        </p>
      </div>
      <Select label="Topic" name="topic" defaultSelectedKey="idea">
        <SelectItem id="idea">Feature idea</SelectItem>
        <SelectItem id="bug">Something is broken</SelectItem>
        <SelectItem id="billing">Billing</SelectItem>
      </Select>
      <TextareaField
        label="Message"
        name="message"
        isRequired
        rows={4}
        maxLength={1000}
        showCount
        value={message}
        onChange={setMessage}
        placeholder="The more detail, the better."
      />
      <div className="flex justify-end gap-2">
        <Button type="reset" variant="ghost" onPress={() => setMessage("")}>
          Clear
        </Button>
        <Button type="submit" isPending={pending}>
          Send
        </Button>
      </div>
    </Form>
  );
}
