"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

export default function TooltipControlled() {
  const [isOpen, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard?.writeText("npm i @acme/sdk").catch(() => {});
    setCopied(true);
    setOpen(true);
    setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 1500);
  };

  return (
    <div className="flex items-center gap-2 rounded-lg border bg-muted/40 py-1 pr-1 pl-3 font-mono text-sm">
      npm i @acme/sdk
      <TooltipTrigger
        isOpen={isOpen}
        onOpenChange={setOpen}
        shouldCloseOnPress={false}
      >
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Copy command"
          onPress={copy}
        >
          {copied ? <CheckIcon className="text-success" /> : <CopyIcon />}
        </Button>
        <Tooltip>{copied ? "Copied!" : "Copy command"}</Tooltip>
      </TooltipTrigger>
    </div>
  );
}
