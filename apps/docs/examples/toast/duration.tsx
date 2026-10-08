"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export default function ToastDuration() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant="outline"
        onPress={() => toast("Link copied", { duration: 1500 })}
      >
        Short (1.5s)
      </Button>
      <Button
        variant="outline"
        onPress={() =>
          toast.warning("Your session expires in 5 minutes", {
            duration: 10000,
            closeButton: true,
          })
        }
      >
        Long with close button
      </Button>
      <Button
        variant="outline"
        onPress={() =>
          toast.error("Connection lost", {
            description: "Reconnecting… Changes are saved locally.",
            duration: Number.POSITIVE_INFINITY,
            closeButton: true,
          })
        }
      >
        Until dismissed
      </Button>
    </div>
  );
}
