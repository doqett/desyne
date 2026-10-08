"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertContent() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Alert color="success" showIcon>
        <AlertTitle>Your profile has been updated.</AlertTitle>
      </Alert>
      <Alert color="info" showIcon>
        <AlertDescription>
          Invoices are generated on the 1st of each month and emailed to the
          billing contact.
        </AlertDescription>
      </Alert>
      <Alert color="warning" showIcon>
        <AlertTitle>Two-factor authentication is off</AlertTitle>
        <AlertDescription>
          Anyone with your password can sign in to this account.
        </AlertDescription>
      </Alert>
    </div>
  );
}
