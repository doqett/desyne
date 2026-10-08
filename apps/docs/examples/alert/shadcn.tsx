"use client";

import { TerminalIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertShadcn() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Alert variant="default" icon={<TerminalIcon />}>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the CLI.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive" showIcon>
        <AlertTitle>Your session has expired</AlertTitle>
        <AlertDescription>Please sign in again to continue.</AlertDescription>
      </Alert>
    </div>
  );
}
