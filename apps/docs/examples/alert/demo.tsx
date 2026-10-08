"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertDemo() {
  return (
    <Alert showIcon className="max-w-md">
      <AlertTitle>A new version is available</AlertTitle>
      <AlertDescription>
        Refresh the page to get the latest features and fixes.
      </AlertDescription>
    </Alert>
  );
}
