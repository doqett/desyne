"use client";

import { FileCode2Icon, FolderIcon, TerminalIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: "add",
    title: "Add",
    body: "One command per component. Dependencies come along automatically.",
  },
  {
    id: "own",
    title: "Own",
    body: "Plain .tsx lands in your repo. No package to upgrade, nothing hidden.",
  },
  {
    id: "compose",
    title: "Compose",
    body: "Build real screens from small, accessible parts, styled with your tokens.",
  },
] as const;
type Step = (typeof steps)[number]["id"];

const tree = [
  { d: 0, name: "app", dir: true },
  { d: 0, name: "components", dir: true },
  { d: 1, name: "ui", dir: true },
  { d: 2, name: "button.tsx", added: true },
  { d: 2, name: "field.tsx", added: true },
  { d: 2, name: "switch.tsx", added: true },
  { d: 1, name: "settings", dir: true },
  { d: 2, name: "notifications.tsx" },
  { d: 0, name: "lib", dir: true },
  { d: 1, name: "utils.ts", added: true },
];

/** Three-step tour from CLI to owned source to a composed screen. */
export function CodeTour({
  source,
}: {
  /** Source of the composed screen in the last step, read on the server. */
  source: string;
}) {
  const [step, setStep] = useState<Step>("add");
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[18rem_1fr] [&>*]:min-w-0">
      <div
        role="tablist"
        aria-label="How it works"
        aria-orientation="vertical"
        className="flex flex-col gap-2"
      >
        {steps.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={step === s.id}
            onClick={() => setStep(s.id)}
            className={cn(
              "rounded-xl border p-4 text-left transition-colors",
              step === s.id
                ? "border-foreground/20 bg-card shadow-sm"
                : "border-transparent hover:bg-muted/50",
            )}
          >
            <span className="block font-semibold">{s.title}</span>
            <span className="mt-1 block text-muted-foreground text-sm">
              {s.body}
            </span>
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        className="min-h-[24rem] overflow-hidden rounded-2xl border bg-zinc-950 text-zinc-100 shadow-xl"
      >
        <div className="flex items-center gap-2 border-white/10 border-b px-4 py-2.5 text-xs text-zinc-400">
          {step === "add" ? (
            <TerminalIcon className="size-3.5" />
          ) : (
            <FileCode2Icon className="size-3.5" />
          )}
          {step === "add"
            ? "Terminal"
            : step === "own"
              ? "Explorer"
              : "components/settings/notifications.tsx"}
        </div>
        {step === "add" && (
          <pre className="overflow-x-auto p-5 font-mono text-[0.8125rem] leading-7">
            <span className="text-zinc-500">$</span> npx shadcn@latest add
            @desyne/switch{"\n"}
            <span className="text-emerald-400">✔</span> Checking registry.{"\n"}
            <span className="text-emerald-400">✔</span> Installing dependencies:
            react-aria-components{"\n"}
            <span className="text-emerald-400">✔</span> Created 3 files:{"\n"}
            {"  "}
            <span className="text-zinc-400">- components/ui/switch.tsx</span>
            {"\n"}
            {"  "}
            <span className="text-zinc-400">- components/ui/field.tsx</span>
            {"\n"}
            {"  "}
            <span className="text-zinc-400">- lib/utils.ts</span>
            {"\n\n"}
            <span className="text-zinc-500">$</span>{" "}
            <span className="animate-pulse">▍</span>
          </pre>
        )}
        {step === "own" && (
          <ul className="p-5 font-mono text-[0.8125rem] leading-7">
            {tree.map((t) => (
              <li
                key={`${t.d}-${t.name}`}
                className="flex items-center gap-2"
                style={{ paddingLeft: t.d * 18 }}
              >
                {t.dir ? (
                  <FolderIcon className="size-3.5 text-zinc-500" />
                ) : (
                  <FileCode2Icon className="size-3.5 text-zinc-500" />
                )}
                <span className={t.added ? "text-emerald-300" : ""}>
                  {t.name}
                </span>
                {t.added && (
                  <span className="rounded bg-emerald-400/15 px-1.5 text-[0.625rem] text-emerald-300">
                    new
                  </span>
                )}
              </li>
            ))}
            <li className="mt-4 font-sans text-sm text-zinc-400">
              Rename, restyle or delete anything. It’s your code now.
            </li>
          </ul>
        )}
        {step === "compose" && (
          <pre className="max-h-[28rem] overflow-auto p-5 font-mono text-[0.75rem] text-zinc-300 leading-relaxed">
            <code>{source}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
