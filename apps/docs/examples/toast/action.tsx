"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export default function ToastAction() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant="outline"
        onPress={() =>
          toast("Conversation archived", {
            action: {
              label: "Undo",
              onClick: () => toast.success("Conversation restored"),
            },
          })
        }
      >
        Action
      </Button>
      <Button
        variant="outline"
        onPress={() =>
          toast("Update available", {
            description: "Restart to install version 2.4.0.",
            action: {
              label: "Restart",
              onClick: () => toast.info("Restarting…"),
            },
            cancel: { label: "Later", onClick: () => {} },
          })
        }
      >
        Action and cancel
      </Button>
    </div>
  );
}
