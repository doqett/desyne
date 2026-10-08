"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormActions } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";
import { TextareaField } from "@/components/ui/textarea";

export default function FormSubmitting() {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  return (
    <Form
      className="max-w-sm"
      onSubmit={async (e) => {
        e.preventDefault();
        setPending(true);
        await new Promise((r) => setTimeout(r, 1500));
        setPending(false);
        setSent(true);
      }}
    >
      {/* Fields stay readable but can't be edited while the request runs. */}
      <TextField
        label="Subject"
        name="subject"
        defaultValue="Invoice #2041 shows the wrong VAT number"
        isRequired
        isReadOnly={pending}
      />
      <TextareaField
        label="Message"
        name="message"
        rows={4}
        defaultValue="Hi, our VAT number changed in March. Could you reissue the invoice?"
        isRequired
        isReadOnly={pending}
      />
      <FormActions align="between">
        <span className="text-muted-foreground text-sm" role="status">
          {sent && !pending ? "Sent. We reply within a day." : null}
        </span>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            isDisabled={pending}
            onPress={() => setSent(false)}
          >
            Cancel
          </Button>
          <Button type="submit" isPending={pending}>
            {pending ? "Sending…" : "Send message"}
          </Button>
        </div>
      </FormActions>
    </Form>
  );
}
