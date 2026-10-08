"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { type ReactNode, useId, useState } from "react";
import { cn } from "@/lib/cn";
import { DesignCanvas } from "./design/design-canvas";

interface PreviewTabsProps {
  preview: ReactNode;
  code: ReactNode;
  source: string;
  filename?: string;
  align?: "center" | "start";
  className?: string;
}

const toolButton =
  "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50";

export function PreviewTabs({
  preview,
  code,
  source,
  filename,
  align = "center",
  className,
}: PreviewTabsProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const id = useId();

  const copy = async () => {
    await navigator.clipboard.writeText(source);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="ds-preview not-prose my-7 overflow-hidden rounded-xl border bg-card">
      <div className="flex h-11 items-center justify-between gap-2 border-b px-2">
        <div
          role="tablist"
          aria-label="Example view"
          className="inline-flex items-center gap-0.5 rounded-lg bg-muted/70 p-0.5"
        >
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              id={`${id}-${t}-tab`}
              aria-controls={`${id}-${t}`}
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className="h-7 rounded-md px-3 font-medium text-[0.78rem] text-muted-foreground capitalize outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 aria-selected:bg-background aria-selected:text-foreground aria-selected:shadow-xs dark:aria-selected:bg-accent"
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-0.5">
          {tab === "code" && filename && (
            <span className="me-1.5 hidden font-mono text-[0.72rem] text-muted-foreground sm:inline">
              {filename}
            </span>
          )}
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Copied" : "Copy code"}
            className={toolButton}
          >
            {copied ? (
              <CheckIcon className="size-3.5 text-success" />
            ) : (
              <CopyIcon className="size-3.5" />
            )}
          </button>
        </div>
      </div>
      <DesignCanvas
        overlays
        role="tabpanel"
        id={`${id}-preview`}
        aria-labelledby={`${id}-preview-tab`}
        hidden={tab !== "preview"}
        className={cn(
          "ds-canvas relative flex min-h-60 w-full justify-center overflow-x-auto bg-background p-6 text-foreground sm:p-10",
          align === "center" ? "items-center" : "items-start",
          className,
        )}
      >
        {preview}
      </DesignCanvas>
      <div
        role="tabpanel"
        id={`${id}-code`}
        aria-labelledby={`${id}-code-tab`}
        hidden={tab !== "code"}
      >
        {code}
      </div>
    </div>
  );
}
