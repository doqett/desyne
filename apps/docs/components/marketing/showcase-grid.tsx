"use client";

import { useState } from "react";
import { templates } from "@/lib/site";
import { cn } from "@/lib/utils";
import { TemplateCard } from "./shots";

const kinds = ["All", "Websites", "Apps", "Content"] as const;

/** Broad group for a template's kind (kind stays as the card label). */
function group(kind: string) {
  if (kind === "SaaS app" || kind === "Education") return "Apps";
  if (["Publication", "Documentation", "Portfolio"].includes(kind))
    return "Content";
  return "Websites";
}
const inGroup = (kind: string, g: string) => g === "All" || group(kind) === g;

/** Template grid with group filters. */
export function ShowcaseGrid() {
  const [kind, setKind] = useState<string>("All");
  const list = templates.filter((t) => inGroup(t.kind, kind));
  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {kinds.map((k) => {
          const n = templates.filter((t) => inGroup(t.kind, k)).length;
          return (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
              className={cn(
                "flex h-8 items-center gap-1.5 rounded-full border px-3.5 text-sm transition-colors",
                kind === k
                  ? "border-foreground bg-foreground text-background"
                  : "bg-background hover:bg-muted",
              )}
            >
              {k}
              <span className="font-mono text-xs opacity-60">{n}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => (
          <TemplateCard key={t.slug} t={t} />
        ))}
      </div>
    </div>
  );
}
