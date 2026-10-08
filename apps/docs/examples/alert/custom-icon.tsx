"use client";

import { KeyRoundIcon, RocketIcon, WifiOffIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertCustomIcon() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Alert color="brand" icon={<RocketIcon />}>
        <AlertTitle>Workflows are here</AlertTitle>
        <AlertDescription>
          Automate reviews, deploys and notifications without leaving the app.
        </AlertDescription>
      </Alert>
      <Alert color="neutral" variant="outline" icon={<WifiOffIcon />}>
        <AlertTitle>You're offline</AlertTitle>
        <AlertDescription>
          Changes are saved locally and will sync when you reconnect.
        </AlertDescription>
      </Alert>
      <Alert color="warning" variant="accent" icon={<KeyRoundIcon />}>
        <AlertTitle>API key expires in 7 days</AlertTitle>
        <AlertDescription>
          Rotate the key before June 14 to avoid failed requests.
        </AlertDescription>
      </Alert>
    </div>
  );
}
