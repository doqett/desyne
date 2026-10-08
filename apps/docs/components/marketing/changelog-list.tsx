"use client";

import { useState } from "react";
import { type Release, releases } from "@/lib/site";
import { cn } from "@/lib/utils";

const kinds = ["All", "Components", "Pro", "Templates"] as const;
const tone: Record<Release["kind"], string> = {
  Components: "bg-info/12 text-info",
  Pro: "bg-brand/12 text-brand",
  Templates: "bg-success/12 text-success",
};
const fmt = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/** Release timeline with a kind filter; dates sit in a sticky gutter. */
export function ChangelogList() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("All");
  const list = releases.filter((r) => kind === "All" || r.kind === kind);
  return (
    <div className="grid gap-10 lg:grid-cols-[12rem_1fr]">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <p className="font-medium text-muted-foreground text-sm">Filter</p>
        <div className="mt-3 flex flex-wrap gap-1.5 lg:flex-col">
          {kinds.map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
              className={cn(
                "h-8 rounded-lg px-3 text-left text-sm transition-colors",
                kind === k
                  ? "bg-muted font-medium"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
      <ol className="relative space-y-12 border-l pl-8">
        {list.map((r) => (
          <li key={r.version} className="relative">
            <span
              aria-hidden
              className="-left-[37px] absolute top-1.5 size-2.5 rounded-full border-2 border-background bg-brand ring-4 ring-brand/15"
            />
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <time dateTime={r.date} className="text-muted-foreground">
                {fmt(r.date)}
              </time>
              <span className="font-mono text-xs">{r.version}</span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 font-medium text-xs",
                  tone[r.kind],
                )}
              >
                {r.kind}
              </span>
            </div>
            <h2 className="mt-2 font-semibold text-xl tracking-tight">
              {r.title}
            </h2>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              {r.items.map((i) => (
                <li key={i} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2.5 size-1 shrink-0 rounded-full bg-foreground/40"
                  />
                  {i}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
