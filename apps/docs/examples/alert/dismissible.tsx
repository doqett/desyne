"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function AlertDismissible() {
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <Button variant="outline" size="sm" onPress={() => setOpen(true)}>
        Show alert again
      </Button>
    );
  }

  return (
    <Alert
      color="success"
      showIcon
      className="max-w-md"
      onDismiss={() => setOpen(false)}
    >
      <AlertTitle>Domain verified</AlertTitle>
      <AlertDescription>
        acme.com is connected. SSL certificates are issued automatically.
      </AlertDescription>
    </Alert>
  );
}
