"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export default function ToastDescription() {
  return (
    <Button
      variant="outline"
      onPress={() =>
        toast.success("Invitation sent", {
          description: "maya@acme.com will get an email to join Acme Inc.",
        })
      }
    >
      Invite teammate
    </Button>
  );
}
