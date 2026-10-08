"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import { CheckIcon, MoonIcon, SunIcon } from "lucide-react";
import { type CSSProperties, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { TextField } from "@/components/ui/text-field";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { usePreviewDark } from "@/hooks/use-preview-theme";
import { cn } from "@/lib/utils";

const accents = [
  {
    name: "Indigo",
    light: "oklch(0.54 0.21 277)",
    dark: "oklch(0.67 0.18 277)",
  },
  {
    name: "Violet",
    light: "oklch(0.55 0.22 300)",
    dark: "oklch(0.7 0.18 300)",
  },
  { name: "Rose", light: "oklch(0.58 0.21 12)", dark: "oklch(0.7 0.17 12)" },
  { name: "Amber", light: "oklch(0.66 0.17 55)", dark: "oklch(0.76 0.15 60)" },
  {
    name: "Emerald",
    light: "oklch(0.56 0.14 160)",
    dark: "oklch(0.72 0.14 160)",
  },
  { name: "Ink", light: "oklch(0.25 0.01 286)", dark: "oklch(0.92 0.005 286)" },
];
const radii = [
  { label: "0", value: "0.125rem" },
  { label: "S", value: "0.375rem" },
  { label: "M", value: "0.625rem" },
  { label: "L", value: "1rem" },
];

/**
 * The hero stage: real components inside a scoped theme. Accent, radius and
 * mode only change CSS variables on this wrapper — exactly how theming works.
 */
export function ThemeStudio() {
  const [accent, setAccent] = useState(accents[0]);
  const [radius, setRadius] = useState("0.625rem");
  const [dark, toggleDark] = usePreviewDark();
  const [plan, setPlan] = useState(new Set<string | number>(["team"]));
  const [volume, setVolume] = useState(64);
  const [digest, setDigest] = useState(true);

  const vars = {
    "--brand": dark ? accent.dark : accent.light,
    "--ring": dark ? accent.dark : accent.light,
    "--radius": radius,
  } as CSSProperties;

  return (
    <div className="relative min-w-0">
      <div
        aria-hidden
        className="-inset-6 absolute rounded-[2rem] bg-[radial-gradient(60%_60%_at_70%_30%,color-mix(in_oklab,var(--brand)_22%,transparent),transparent)] blur-2xl"
      />
      <div className="relative overflow-hidden rounded-2xl border bg-background/70 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.35)] backdrop-blur">
        {/* toolbar */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b bg-muted/40 px-3 py-2.5 text-xs">
          <span className="font-medium text-muted-foreground">Theme</span>
          <fieldset aria-label="Accent colour" className="flex gap-1.5">
            {accents.map((a) => (
              <button
                key={a.name}
                type="button"
                aria-pressed={accent.name === a.name}
                aria-label={a.name}
                title={a.name}
                onClick={() => setAccent(a)}
                className="flex size-5 items-center justify-center rounded-full text-white outline-none ring-offset-2 ring-offset-background transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring"
                style={{ background: a.light }}
              >
                {accent.name === a.name && <CheckIcon className="size-3" />}
              </button>
            ))}
          </fieldset>
          <fieldset
            aria-label="Corner radius"
            className="flex rounded-md border bg-background p-0.5"
          >
            {radii.map((r) => (
              <button
                key={r.label}
                type="button"
                aria-pressed={radius === r.value}
                onClick={() => setRadius(r.value)}
                className={cn(
                  "h-6 w-7 rounded font-mono",
                  radius === r.value
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {r.label}
              </button>
            ))}
          </fieldset>
          <button
            type="button"
            role="switch"
            aria-checked={dark}
            aria-label="Dark preview"
            onClick={toggleDark}
            className="ml-auto flex h-7 items-center gap-1.5 rounded-md border bg-background px-2 text-muted-foreground hover:text-foreground"
          >
            {dark ? (
              <MoonIcon className="size-3.5" />
            ) : (
              <SunIcon className="size-3.5" />
            )}
            {dark ? "Dark" : "Light"}
          </button>
        </div>

        {/* stage */}
        <div
          style={vars}
          className={cn(
            "grid grid-cols-1 gap-3 bg-background p-3 text-foreground transition-colors sm:grid-cols-[1.15fr_1fr] sm:p-4",
            dark && "dark",
          )}
        >
          <div className="flex min-w-0 flex-col gap-3 rounded-xl border bg-card p-4">
            <div className="flex items-center gap-3">
              <Avatar
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80&crop=faces"
                alt="Maya Chen"
                size="lg"
                status="online"
              />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm">Maya Chen</p>
                <p className="text-muted-foreground text-xs">maya@acme.dev</p>
              </div>
              <Badge color="brand" variant="soft">
                Admin
              </Badge>
            </div>
            <TextField label="Workspace" defaultValue="Acme Inc." />
            <div>
              <p className="mb-1.5 font-medium text-sm">Plan</p>
              <ToggleButtonGroup
                aria-label="Plan"
                variant="segmented"
                size="sm"
                selectionMode="single"
                disallowEmptySelection
                selectedKeys={plan}
                onSelectionChange={setPlan}
                className="w-full [&>*]:flex-1"
              >
                <ToggleButton id="solo">Solo</ToggleButton>
                <ToggleButton id="team">Team</ToggleButton>
                <ToggleButton id="scale">Scale</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <Slider
              label="Seats"
              value={volume}
              onChange={(v) => setVolume(v as number)}
              minValue={1}
              maxValue={100}
              showOutput
              color="brand"
            />
            <Switch
              isSelected={digest}
              onChange={setDigest}
              description="Every Monday at 9:00"
            >
              Weekly digest
            </Switch>
            <Checkbox defaultSelected>Require two-factor sign-in</Checkbox>
            <div className="mt-1 flex justify-end gap-2">
              <Button variant="ghost" size="sm">
                Cancel
              </Button>
              <Button size="sm" color="brand">
                Save changes
              </Button>
            </div>
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <div className="flex justify-center rounded-xl border bg-card p-2">
              <Calendar
                aria-label="Launch date"
                defaultValue={today(getLocalTimeZone()).add({ days: 3 })}
              />
            </div>
            <div className="rounded-xl border bg-card p-4">
              <div className="flex items-baseline justify-between">
                <p className="font-medium text-sm">Storage</p>
                <p className="font-mono text-muted-foreground text-xs">
                  {Math.round(volume * 0.82)} / 82 GB
                </p>
              </div>
              <ProgressBar
                aria-label="Storage used"
                value={volume}
                showValue={false}
                className="mt-2.5"
              />
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge color="success" variant="soft">
                  Synced
                </Badge>
                <Badge variant="outline">EU region</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
