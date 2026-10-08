"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export default function ToastDismiss() {
  const lastId = useRef<string | number | null>(null);

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant="outline"
        onPress={() => {
          lastId.current = toast("Recording started", {
            duration: Number.POSITIVE_INFINITY,
          });
        }}
      >
        Start recording
      </Button>
      <Button
        variant="outline"
        onPress={() => {
          if (lastId.current !== null) toast.dismiss(lastId.current);
        }}
      >
        Dismiss last
      </Button>
      <Button variant="ghost" onPress={() => toast.dismiss()}>
        Dismiss all
      </Button>
    </div>
  );
}
