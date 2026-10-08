"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

// <Toaster /> is mounted once in the root layout — see Usage.
export default function ToastDemo() {
  return (
    <Button
      variant="outline"
      onPress={() =>
        toast("Event created", {
          description: "Design review · Friday, June 14 at 10:00 AM",
          action: { label: "Undo", onClick: () => toast("Event removed") },
        })
      }
    >
      Show toast
    </Button>
  );
}
