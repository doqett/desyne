"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Meter } from "@/components/ui/meter";

export default function AlertRecipePlanLimit() {
  return (
    <Alert
      color="warning"
      variant="accent"
      showIcon
      className="max-w-lg"
      action={<Button size="sm">Add seats</Button>}
    >
      <AlertTitle>You're almost out of seats</AlertTitle>
      <AlertDescription>
        New invitations will be blocked once all seats are taken.
      </AlertDescription>
      <Meter
        aria-label="Seats used"
        value={9}
        maxValue={10}
        valueLabel="9 of 10 seats"
        color="warning"
        size="sm"
        className="mt-2 max-w-60"
      />
    </Alert>
  );
}
