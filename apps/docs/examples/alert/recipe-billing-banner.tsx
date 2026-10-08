"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function AlertRecipeBillingBanner() {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-xl border bg-background">
      {open && (
        <Alert
          variant="solid"
          color="danger"
          showIcon
          className="rounded-none"
          onDismiss={() => setOpen(false)}
          action={
            <Button size="sm" variant="outline" color="neutral">
              Update card
            </Button>
          }
        >
          <AlertTitle>Your last payment failed</AlertTitle>
          <AlertDescription>
            We'll retry on June 3. Update your card to avoid losing access to
            the Team plan.
          </AlertDescription>
        </Alert>
      )}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <span className="font-medium text-sm">Acme Inc.</span>
        <span className="text-muted-foreground text-xs">Billing</span>
      </div>
      <div className="grid gap-2 p-4">
        <div className="h-3 w-2/3 rounded bg-muted" />
        <div className="h-3 w-1/2 rounded bg-muted" />
        <div className="h-3 w-3/5 rounded bg-muted" />
      </div>
      {!open && (
        <div className="border-t px-4 py-3">
          <Button size="sm" variant="ghost" onPress={() => setOpen(true)}>
            Show banner again
          </Button>
        </div>
      )}
    </div>
  );
}
