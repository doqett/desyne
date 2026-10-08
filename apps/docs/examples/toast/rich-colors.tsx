"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export default function ToastRichColors() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant="outline"
        onPress={() => toast.success("Payment received", { richColors: true })}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onPress={() =>
          toast.warning("Card expires this month", { richColors: true })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onPress={() =>
          toast.error("Couldn't charge card ending 4242", {
            richColors: true,
          })
        }
      >
        Error
      </Button>
    </div>
  );
}
