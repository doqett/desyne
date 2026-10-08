"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";

const managers = ["pnpm", "npm", "yarn", "bun"] as const;
type Manager = (typeof managers)[number];

const STORAGE_KEY = "ds-package-manager";
const EVENT = "ds-package-manager";

const runners: Record<Manager, string> = {
  pnpm: "pnpm dlx",
  npm: "npx",
  yarn: "yarn dlx",
  bun: "bunx --bun",
};
const installers: Record<Manager, string> = {
  pnpm: "pnpm add",
  npm: "npm install",
  yarn: "yarn add",
  bun: "bun add",
};

/** One shared package-manager choice for every command on the page. */
function useManager() {
  const [pm, setPm] = useState<Manager>("pnpm");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Manager | null;
      if (saved && managers.includes(saved)) setPm(saved);
    } catch {}
    const onChange = (e: Event) => setPm((e as CustomEvent<Manager>).detail);
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);
  const choose = useCallback((next: Manager) => {
    setPm(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
  }, []);
  return [pm, choose] as const;
}

/**
 * A terminal command with a pnpm / npm / yarn / bun segmented control.
 * `kind="run"` prefixes a runner (`npx`), `kind="add"` an installer.
 */
export function PmCommand({
  args,
  kind = "run",
  className,
}: {
  args: string;
  kind?: "run" | "add";
  className?: string;
}) {
  const [pm, setPm] = useManager();
  const [copied, setCopied] = useState(false);
  const id = useId();
  const command = `${(kind === "run" ? runners : installers)[pm]} ${args}`;

  return (
    <div
      className={cn(
        "ds-code dark not-prose overflow-hidden rounded-xl border bg-(--ds-code-surface) text-foreground",
        className,
      )}
    >
      <div className="flex h-10 items-center gap-2 border-b ps-1.5 pe-1.5">
        <div
          role="tablist"
          aria-label="Package manager"
          className="flex items-center gap-0.5"
        >
          {managers.map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              id={`${id}-${m}`}
              aria-selected={pm === m}
              aria-controls={`${id}-panel`}
              onClick={() => setPm(m)}
              className="h-7 rounded-md px-2.5 font-mono text-[0.75rem] text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 aria-selected:bg-white/[0.08] aria-selected:text-foreground"
            >
              {m}
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label={copied ? "Copied" : "Copy command"}
          onClick={async () => {
            await navigator.clipboard.writeText(command);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="ms-auto inline-flex size-7 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-white/[0.08] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          {copied ? (
            <CheckIcon className="size-3.5 text-success" />
          ) : (
            <CopyIcon className="size-3.5" />
          )}
        </button>
      </div>
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-${pm}`}
        className="overflow-x-auto px-4 py-3.5 font-mono text-[0.8125rem] leading-6"
      >
        <code className="whitespace-pre">
          <span aria-hidden className="select-none text-muted-foreground/60">
            ${" "}
          </span>
          <span className="text-brand">{command.split(" ")[0]}</span>
          <span className="text-foreground/90">
            {command.slice(command.indexOf(" "))}
          </span>
        </code>
      </div>
    </div>
  );
}
