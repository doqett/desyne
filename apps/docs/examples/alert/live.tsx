"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type Status = "idle" | "testing" | "failed";

export default function AlertLive() {
  const [status, setStatus] = useState<Status>("idle");

  async function test() {
    setStatus("testing");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("failed");
  }

  return (
    <div className="flex w-full max-w-md flex-col items-start gap-3">
      <Button variant="outline" isPending={status === "testing"} onPress={test}>
        Test connection
      </Button>
      {status === "failed" && (
        <Alert color="danger" showIcon onDismiss={() => setStatus("idle")}>
          <AlertTitle>Connection refused</AlertTitle>
          <AlertDescription>
            db.internal:5432 didn't respond. Check the host and that your IP is
            on the allow list.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
