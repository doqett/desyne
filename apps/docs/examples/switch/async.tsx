"use client";

import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";

// Stand-in for a real request. Fails one time in four.
const save = (value: boolean) =>
  new Promise<boolean>((resolve, reject) =>
    setTimeout(
      () => (Math.random() < 0.25 ? reject(new Error()) : resolve(value)),
      800,
    ),
  );

export default function SwitchAsync() {
  const [enabled, setEnabled] = useState(true);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");

  const onChange = async (next: boolean) => {
    setEnabled(next); // optimistic
    setStatus("saving");
    try {
      await save(next);
      setStatus("idle");
    } catch {
      setEnabled(!next); // roll back
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <Switch
        isSelected={enabled}
        onChange={onChange}
        isReadOnly={status === "saving"}
      >
        Auto-deploy on push
      </Switch>
      <p
        aria-live="polite"
        className="flex h-4 items-center gap-1.5 text-muted-foreground text-xs"
      >
        {status === "saving" && (
          <>
            <Spinner size="xs" aria-hidden /> Saving…
          </>
        )}
        {status === "error" && (
          <span className="text-destructive">
            Couldn't save. Your change was undone.
          </span>
        )}
      </p>
    </div>
  );
}
