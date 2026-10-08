"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverDialog, PopoverTitle } from "@/components/ui/popover";
import { TextField } from "@/components/ui/text-field";

export default function PopoverTriggerRef() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="grid w-full max-w-xs gap-2">
      <div ref={fieldRef}>
        <TextField
          label="Webhook secret"
          defaultValue="whsec_6f2c1e9a"
          isReadOnly
        />
      </div>
      <Button
        variant="link"
        size="sm"
        className="justify-self-start px-0"
        onPress={() => setOpen(true)}
      >
        Where do I use this?
      </Button>
      <Popover
        triggerRef={fieldRef}
        isOpen={isOpen}
        onOpenChange={setOpen}
        placement="bottom start"
        showArrow
      >
        <PopoverDialog className="grid gap-2 text-sm">
          <PopoverTitle>Verifying webhooks</PopoverTitle>
          <p className="text-muted-foreground">
            Compare this secret with the signature in the{" "}
            <code className="font-mono text-foreground text-xs">
              X-Signature
            </code>{" "}
            header of every request we send.
          </p>
        </PopoverDialog>
      </Popover>
    </div>
  );
}
