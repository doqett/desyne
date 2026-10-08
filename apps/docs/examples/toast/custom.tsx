"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export default function ToastCustom() {
  return (
    <Button
      variant="outline"
      onPress={() =>
        toast.custom(
          (id) => (
            <div className="flex w-(--width) gap-3 rounded-lg bg-popover p-4 text-popover-foreground text-sm">
              <Avatar alt="Maya Chen" fallback="MC" colorful />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <p>
                  <span className="font-medium">Maya Chen</span> mentioned you
                  in <span className="font-medium">Q3 roadmap</span>
                </p>
                <p className="line-clamp-2 text-muted-foreground">
                  “Can you take a look at the pricing section before Friday?”
                </p>
                <div className="flex gap-2">
                  <Button size="xs" onPress={() => toast.dismiss(id)}>
                    Reply
                  </Button>
                  <Button
                    size="xs"
                    variant="ghost"
                    onPress={() => toast.dismiss(id)}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          ),
          { duration: 8000 },
        )
      }
    >
      Show notification
    </Button>
  );
}
