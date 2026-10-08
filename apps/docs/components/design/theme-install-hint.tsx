"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { encodeDesign } from "@/lib/design";
import { isCustomDesign, useDesign } from "@/lib/use-design";

/** The shadcn command that installs a design as a theme (`/r/themes/[design]`). */
export function themeInstallCommand(origin: string, encoded: string) {
  return `npx shadcn@latest add ${origin}/r/themes/${encoded}.json`;
}

/**
 * Shown next to install commands while a custom preview design is active, so
 * the visitor can install the theme the previews are rendered in.
 */
export function ThemeInstallHint({ className }: { className?: string }) {
  const [design] = useDesign();
  const [copied, setCopied] = useState(false);
  if (!isCustomDesign(design) || typeof window === "undefined") return null;
  const command = themeInstallCommand(
    window.location.origin,
    encodeDesign(design),
  );
  return (
    <div
      className={cn(
        "not-prose flex items-center gap-2 rounded-lg border border-dashed px-3 py-2 text-[0.75rem] text-fd-muted-foreground",
        className,
      )}
    >
      <span className="shrink-0">Your theme:</span>
      <code className="min-w-0 flex-1 truncate font-mono text-[0.7rem] text-fd-foreground">
        {command}
      </code>
      <button
        type="button"
        aria-label={copied ? "Copied" : "Copy theme install command"}
        onClick={async () => {
          await navigator.clipboard.writeText(command);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="inline-flex size-6 shrink-0 items-center justify-center rounded-md outline-none transition-colors hover:bg-fd-accent hover:text-fd-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        {copied ? (
          <CheckIcon className="size-3.5 text-success" />
        ) : (
          <CopyIcon className="size-3.5" />
        )}
      </button>
    </div>
  );
}
