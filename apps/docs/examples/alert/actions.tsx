"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function AlertActions() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <Alert
        color="warning"
        variant="accent"
        showIcon
        action={
          <Button size="sm" variant="outline">
            Upgrade
          </Button>
        }
      >
        <AlertTitle>Your trial ends in 3 days</AlertTitle>
        <AlertDescription>
          Upgrade to keep your projects and history.
        </AlertDescription>
      </Alert>
      <Alert
        color="info"
        showIcon
        action={
          <>
            <Button size="sm" variant="ghost">
              Later
            </Button>
            <Button size="sm">Restart</Button>
          </>
        }
      >
        <AlertTitle>Update ready</AlertTitle>
        <AlertDescription>Version 2.4.0 has been downloaded.</AlertDescription>
      </Alert>
    </div>
  );
}
