"use client";

import { CalendarCheckIcon, MailIcon, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export default function ToastIcon() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant="outline"
        onPress={() =>
          toast("Starred “Q3 planning”", {
            icon: <StarIcon className="size-4 fill-warning text-warning" />,
          })
        }
      >
        Star
      </Button>
      <Button
        variant="outline"
        onPress={() =>
          toast("3 new messages", { icon: <MailIcon className="size-4" /> })
        }
      >
        Messages
      </Button>
      <Button
        variant="outline"
        onPress={() =>
          toast.success("Meeting booked", {
            icon: <CalendarCheckIcon className="size-4" />,
          })
        }
      >
        Booking
      </Button>
    </div>
  );
}
