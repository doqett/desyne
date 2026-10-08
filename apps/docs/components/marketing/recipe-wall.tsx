"use client";

import {
  ArrowRightIcon,
  CheckIcon,
  CodeIcon,
  CopyIcon,
  EyeIcon,
} from "lucide-react";
import Link from "next/link";
import { type ComponentType, lazy, Suspense, useState } from "react";
import { cn } from "@/lib/utils";
import { type Recipe, recipeTabs as tabs } from "./recipes";

/** One code-split chunk per recipe: only the open tab's demos are loaded. */
const demos: Record<string, ComponentType> = {
  "radio-group/recipe-plan-picker": lazy(
    () => import("@/examples/radio-group/recipe-plan-picker"),
  ),
  "slider/recipe-pricing-calculator": lazy(
    () => import("@/examples/slider/recipe-pricing-calculator"),
  ),
  "input-otp/recipe-two-factor": lazy(
    () => import("@/examples/input-otp/recipe-two-factor"),
  ),
  "combobox/recipe-tag-picker": lazy(
    () => import("@/examples/combobox/recipe-tag-picker"),
  ),
  "calendar/recipe-booking": lazy(
    () => import("@/examples/calendar/recipe-booking"),
  ),
  "date-picker/recipe-travel": lazy(
    () => import("@/examples/date-picker/recipe-travel"),
  ),
  "date-field/recipe-business-hours": lazy(
    () => import("@/examples/date-field/recipe-business-hours"),
  ),
  "date-picker/recipe-report-range": lazy(
    () => import("@/examples/date-picker/recipe-report-range"),
  ),
  "dialog/recipe-invite": lazy(() => import("@/examples/dialog/recipe-invite")),
  "popover/recipe-share": lazy(() => import("@/examples/popover/recipe-share")),
  "menu/recipe-row-actions": lazy(
    () => import("@/examples/menu/recipe-row-actions"),
  ),
  "command-palette/recipe-app-search": lazy(
    () => import("@/examples/command-palette/recipe-app-search"),
  ),
  "chart/recipe-kpi": lazy(() => import("@/examples/chart/recipe-kpi")),
  "grid-list/recipe-kanban": lazy(
    () => import("@/examples/grid-list/recipe-kanban"),
  ),
  "list-box/recipe-transfer": lazy(
    () => import("@/examples/list-box/recipe-transfer"),
  ),
  "table/recipe-permissions": lazy(
    () => import("@/examples/table/recipe-permissions"),
  ),
  "toast/recipe-undo-delete": lazy(
    () => import("@/examples/toast/recipe-undo-delete"),
  ),
  "meter/recipe-usage-quotas": lazy(
    () => import("@/examples/meter/recipe-usage-quotas"),
  ),
  "progress-bar/recipe-import": lazy(
    () => import("@/examples/progress-bar/recipe-import"),
  ),
  "alert/recipe-plan-limit": lazy(
    () => import("@/examples/alert/recipe-plan-limit"),
  ),
};

function RecipeCard({ recipe, source }: { recipe: Recipe; source: string }) {
  const [view, setView] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const Demo = demos[recipe.key];
  if (!Demo) return null;

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card">
      <div className="relative flex min-h-80 flex-1">
        {view === "preview" ? (
          <div className="preview-canvas flex w-full items-center justify-center overflow-auto p-6">
            <Suspense fallback={null}>
              <Demo />
            </Suspense>
          </div>
        ) : (
          <div className="relative w-full">
            <pre className="absolute inset-0 overflow-auto p-4 font-mono text-[0.75rem] text-foreground/85 leading-relaxed">
              <code>{source}</code>
            </pre>
            <button
              type="button"
              aria-label={copied ? "Copied" : "Copy code"}
              onClick={async () => {
                await navigator.clipboard?.writeText(source);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-md border bg-background text-muted-foreground hover:text-foreground"
            >
              {copied ? (
                <CheckIcon className="size-3.5 text-success" />
              ) : (
                <CopyIcon className="size-3.5" />
              )}
            </button>
          </div>
        )}
      </div>
      <footer className="flex items-center gap-2 border-t px-3 py-2 text-sm">
        <span className="min-w-0 flex-1 truncate">
          <span className="font-medium">{recipe.title}</span>
          <span className="ml-2 font-mono text-muted-foreground text-xs">
            {recipe.component}
          </span>
        </span>
        <div className="flex rounded-md border p-0.5">
          {(["preview", "code"] as const).map((v) => {
            const Icon = v === "preview" ? EyeIcon : CodeIcon;
            return (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                aria-label={v === "preview" ? "Show preview" : "Show code"}
                onClick={() => setView(v)}
                className={cn(
                  "flex size-6 items-center justify-center rounded",
                  view === v
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-3.5" />
              </button>
            );
          })}
        </div>
        <Link
          href={`/docs/components/${recipe.component}`}
          aria-label={`${recipe.title} docs`}
          className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <ArrowRightIcon className="size-3.5" />
        </Link>
      </footer>
    </article>
  );
}

/** Tabbed wall of real recipes from the docs, each with preview and source. */
export function RecipeWall({
  sources,
}: {
  /** Example source by recipe key, read on the server. */
  sources: Record<string, string>;
}) {
  const [tab, setTab] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === tab) ?? tabs[0];
  return (
    <div>
      <div
        role="tablist"
        aria-label="Recipe categories"
        className="flex gap-1 overflow-x-auto rounded-xl border bg-muted/40 p-1 [scrollbar-width:none] sm:w-fit"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "h-8 shrink-0 rounded-lg px-3.5 font-medium text-sm transition-colors",
              tab === t.id
                ? "bg-background shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        aria-label={current.label}
        className="mt-6 grid gap-4 lg:grid-cols-2"
      >
        {current.recipes.map((r) => (
          <RecipeCard key={r.key} recipe={r} source={sources[r.key] ?? ""} />
        ))}
      </div>
    </div>
  );
}
