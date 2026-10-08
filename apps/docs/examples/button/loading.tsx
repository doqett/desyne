"use client";

import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "saving" | "saved";

export default function ButtonLoading() {
  const [status, setStatus] = useState<Status>("idle");

  async function save() {
    setStatus("saving");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 1500);
  }

  return (
    <Button
      isPending={status === "saving"}
      color={status === "saved" ? "success" : undefined}
      onPress={save}
      className="min-w-32"
    >
      {status === "saving" && "Saving…"}
      {status === "saved" && (
        <>
          <CheckIcon /> Saved
        </>
      )}
      {status === "idle" && "Save changes"}
    </Button>
  );
}
