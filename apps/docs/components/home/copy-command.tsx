"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "react-aria-components";
import { cn } from "@/lib/utils";

export function CopyCommand({
  command,
  className,
}: {
  command: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      className={cn(
        "group flex h-10 items-center gap-3 rounded-lg border bg-card/80 pr-1.5 pl-3.5 font-mono text-[0.8rem] shadow-xs backdrop-blur",
        className,
      )}
    >
      <span aria-hidden className="select-none text-primary">
        $
      </span>
      <code className="truncate text-foreground/90">{command}</code>
      <Button
        aria-label={copied ? "Copied" : "Copy command"}
        onPress={async () => {
          await navigator.clipboard.writeText(command);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="ml-auto flex size-7 shrink-0 cursor-default items-center justify-center rounded-md text-muted-foreground outline-none transition-colors data-hovered:bg-muted data-hovered:text-foreground data-focus-visible:ring-[3px] data-focus-visible:ring-ring/25"
      >
        {copied ? (
          <CheckIcon className="size-3.5 text-success" />
        ) : (
          <CopyIcon className="size-3.5" />
        )}
      </Button>
    </div>
  );
}
