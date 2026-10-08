"use client";

import {
  ArrowRightIcon,
  CheckIcon,
  CodeIcon,
  CopyIcon,
  EyeIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { examples } from "@/examples/__index__";
import { cn } from "@/lib/utils";

type Recipe = { key: string; title: string; component: string };
const tabs: { id: string; label: string; recipes: Recipe[] }[] = [
  {
    id: "forms",
    label: "Forms",
    recipes: [
      {
        key: "radio-group/recipe-plan-picker",
        title: "Plan picker",
        component: "radio-group",
      },
      {
        key: "slider/recipe-pricing-calculator",
        title: "Pricing calculator",
        component: "slider",
      },
      {
        key: "input-otp/recipe-two-factor",
        title: "Two-factor code",
        component: "input-otp",
      },
      {
        key: "combobox/recipe-tag-picker",
        title: "Tag picker",
        component: "combobox",
      },
    ],
  },
  {
    id: "dates",
    label: "Date & time",
    recipes: [
      {
        key: "calendar/recipe-booking",
        title: "Booking calendar",
        component: "calendar",
      },
      {
        key: "date-picker/recipe-travel",
        title: "Travel dates",
        component: "date-picker",
      },
      {
        key: "date-field/recipe-business-hours",
        title: "Business hours",
        component: "date-field",
      },
      {
        key: "date-picker/recipe-report-range",
        title: "Report range",
        component: "date-picker",
      },
    ],
  },
  {
    id: "overlays",
    label: "Overlays",
    recipes: [
      {
        key: "dialog/recipe-invite",
        title: "Invite dialog",
        component: "dialog",
      },
      {
        key: "popover/recipe-share",
        title: "Share popover",
        component: "popover",
      },
      {
        key: "menu/recipe-row-actions",
        title: "Row actions",
        component: "menu",
      },
      {
        key: "command-palette/recipe-app-search",
        title: "App search",
        component: "command-palette",
      },
    ],
  },
  {
    id: "data",
    label: "Data",
    recipes: [
      { key: "chart/recipe-kpi", title: "KPI chart", component: "chart" },
      {
        key: "grid-list/recipe-kanban",
        title: "Kanban",
        component: "grid-list",
      },
      {
        key: "list-box/recipe-transfer",
        title: "Transfer list",
        component: "list-box",
      },
      {
        key: "table/recipe-permissions",
        title: "Permissions table",
        component: "table",
      },
    ],
  },
  {
    id: "feedback",
    label: "Feedback",
    recipes: [
      {
        key: "toast/recipe-undo-delete",
        title: "Undo delete",
        component: "toast",
      },
      {
        key: "meter/recipe-usage-quotas",
        title: "Usage quotas",
        component: "meter",
      },
      {
        key: "progress-bar/recipe-import",
        title: "Import progress",
        component: "progress-bar",
      },
      {
        key: "alert/recipe-plan-limit",
        title: "Plan limit",
        component: "alert",
      },
    ],
  },
];

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [view, setView] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const entry = examples[recipe.key as keyof typeof examples];
  if (!entry) return null;
  const Demo = entry.component;

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card">
      <div className="relative flex min-h-80 flex-1">
        {view === "preview" ? (
          <div className="preview-canvas flex w-full items-center justify-center overflow-auto p-6">
            <Demo />
          </div>
        ) : (
          <div className="relative w-full">
            <pre className="absolute inset-0 overflow-auto p-4 font-mono text-[0.75rem] text-foreground/85 leading-relaxed">
              <code>{entry.source}</code>
            </pre>
            <button
              type="button"
              aria-label={copied ? "Copied" : "Copy code"}
              onClick={async () => {
                await navigator.clipboard?.writeText(entry.source);
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
export function RecipeWall() {
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
          <RecipeCard key={r.key} recipe={r} />
        ))}
      </div>
    </div>
  );
}
