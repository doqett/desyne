"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ButtonPending() {
  const [isPending, setPending] = useState(false);
  return (
    <Button
      isPending={isPending}
      onPress={() => {
        setPending(true);
        setTimeout(() => setPending(false), 2000);
      }}
    >
      {isPending ? "Saving…" : "Save changes"}
    </Button>
  );
}
