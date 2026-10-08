"use client";

import { ArrowUpRightIcon, AtSignIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { type CSSProperties, type ReactNode, useState } from "react";
import { Radio, RadioGroup } from "react-aria-components";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";
import { TextField } from "@/components/ui/text-field";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { cn } from "@/lib/utils";

/*
 * Accents re-point --primary and --brand for everything inside the wall: the
 * same tokens you edit in your own CSS. "Default" keeps the shipped theme.
 */
const accents = [
  { id: "default", label: "Default", value: undefined },
  { id: "indigo", label: "Indigo", value: "oklch(0.54 0.21 277)" },
  { id: "emerald", label: "Emerald", value: "oklch(0.56 0.14 160)" },
  { id: "sky", label: "Sky", value: "oklch(0.58 0.15 235)" },
  { id: "rose", label: "Rose", value: "oklch(0.6 0.21 15)" },
  {
    id: "amber",
    label: "Amber",
    value: "oklch(0.76 0.16 70)",
    fg: "oklch(0.25 0.06 65)",
  },
] as const;

type Accent = (typeof accents)[number];

function accentStyle(a: Accent): CSSProperties | undefined {
  if (!a.value) return undefined;
  const fg = "fg" in a ? a.fg : "oklch(0.99 0 0)";
  return {
    "--primary": a.value,
    "--primary-foreground": fg,
    "--brand": a.value,
    "--brand-foreground": fg,
    "--ring": a.value,
  } as CSSProperties;
}

function Exhibit({
  title,
  href,
  className,
  children,
}: {
  title: string;
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <figure
      className={cn(
        "group/exhibit relative flex flex-col bg-background",
        className,
      )}
    >
      <div className="flex flex-1 items-center justify-center p-6 sm:p-8">
        {children}
      </div>
      <figcaption className="flex items-center gap-3 border-t border-dashed px-4 py-2.5 text-[0.75rem] text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        <Link
          href={href}
          className="flex items-center gap-1 outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
        >
          {title}
          <ArrowUpRightIcon className="size-3 opacity-0 transition-opacity group-hover/exhibit:opacity-100" />
        </Link>
      </figcaption>
    </figure>
  );
}

const team = [
  "Ava Lin",
  "Noah Park",
  "Mia Chen",
  "Leo Ruiz",
  "Zoe Adams",
  "Kai Moss",
];

export function ExhibitWall() {
  const [accentId, setAccentId] = useState<string>("default");
  const accent = accents.find((a) => a.id === accentId) ?? accents[0];

  return (
    <div style={accentStyle(accent)} className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-medium text-muted-foreground text-sm">
          Live components · pick an accent
        </p>
        <RadioGroup
          aria-label="Accent color"
          orientation="horizontal"
          value={accentId}
          onChange={setAccentId}
          className="flex items-center gap-1.5 rounded-full border bg-card p-1 shadow-xs"
        >
          {accents.map((a) => (
            <Radio
              key={a.id}
              value={a.id}
              aria-label={a.label}
              className="flex size-6 cursor-default items-center justify-center rounded-full outline-none ring-offset-2 ring-offset-card data-focus-visible:ring-2 data-focus-visible:ring-ring/50"
            >
              {({ isSelected }) => (
                <span
                  className={cn(
                    "size-4 rounded-full border border-black/10 transition-transform dark:border-white/15",
                    isSelected &&
                      "scale-110 ring-2 ring-foreground/70 ring-offset-2 ring-offset-card",
                  )}
                  style={{ background: a.value ?? "var(--foreground)" }}
                />
              )}
            </Radio>
          ))}
        </RadioGroup>
      </div>

      {/* The wall: 1px gaps over a border-colored backdrop draw the hairline grid. */}
      <div className="grid gap-px overflow-hidden rounded-xl border bg-border shadow-sm md:grid-cols-2 lg:grid-cols-12">
        <Exhibit
          title="Text Field"
          href="/docs/components/text-field"
          className="lg:col-span-4 lg:row-span-2"
        >
          <form
            className="flex w-full max-w-xs flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-1">
              <p className="font-semibold tracking-tight">Welcome back</p>
              <p className="text-muted-foreground text-sm">
                Sign in to your workspace.
              </p>
            </div>
            <TextField
              label="Email"
              type="email"
              prefix={<AtSignIcon />}
              placeholder="you@company.com"
            />
            <TextField
              label="Password"
              type="password"
              defaultValue="gallery-2026"
            />
            <Checkbox defaultSelected>Keep me signed in</Checkbox>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </Exhibit>

        <Exhibit
          title="Calendar"
          href="/docs/components/calendar"
          className="lg:col-span-4 lg:row-span-2"
        >
          <Calendar aria-label="Pick a date" />
        </Exhibit>

        <Exhibit
          title="Switch"
          href="/docs/components/switch"
          className="lg:col-span-4"
        >
          <div className="flex w-full max-w-xs flex-col gap-4">
            <Switch
              labelPlacement="start"
              defaultSelected
              description="Email me about sign-ins."
            >
              Security alerts
            </Switch>
            <Switch labelPlacement="start" description="Monthly changelog.">
              Product updates
            </Switch>
          </div>
        </Exhibit>

        <Exhibit
          title="Slider"
          href="/docs/components/slider"
          className="lg:col-span-4"
        >
          <div className="flex w-full max-w-xs flex-col gap-5">
            <Slider label="Seats" defaultValue={64} />
            <ProgressBar label="Storage" value={72} size="sm" />
          </div>
        </Exhibit>

        <Exhibit
          title="Avatar"
          href="/docs/components/avatar"
          className="lg:col-span-3"
        >
          <div className="flex flex-col items-center gap-3">
            <AvatarGroup max={4}>
              {team.map((name) => (
                <Avatar
                  key={name}
                  colorful
                  alt={name}
                  fallback={name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                />
              ))}
            </AvatarGroup>
            <div className="flex gap-1.5">
              <Badge variant="dot" color="success">
                Online
              </Badge>
              <Badge color="primary">Pro</Badge>
            </div>
          </div>
        </Exhibit>

        <Exhibit
          title="Tabs"
          href="/docs/components/tabs"
          className="lg:col-span-5"
        >
          <div className="flex w-full max-w-sm flex-col gap-5">
            <ToggleButtonGroup
              variant="segmented"
              aria-label="Range"
              defaultSelectedKeys={["week"]}
              disallowEmptySelection
            >
              <ToggleButton id="day">Day</ToggleButton>
              <ToggleButton id="week">Week</ToggleButton>
              <ToggleButton id="month">Month</ToggleButton>
            </ToggleButtonGroup>
            <Tabs>
              <TabList aria-label="Project">
                <Tab id="overview">Overview</Tab>
                <Tab id="activity">Activity</Tab>
                <Tab id="settings">Settings</Tab>
              </TabList>
              <TabPanel id="overview" className="text-muted-foreground text-sm">
                12 open issues · 3 in review
              </TabPanel>
              <TabPanel id="activity" className="text-muted-foreground text-sm">
                Ava merged #214 two hours ago.
              </TabPanel>
              <TabPanel id="settings" className="text-muted-foreground text-sm">
                Visibility: private to your team.
              </TabPanel>
            </Tabs>
          </div>
        </Exhibit>

        <Exhibit
          title="Kbd"
          href="/docs/components/kbd"
          className="md:col-span-2 lg:col-span-4"
        >
          <div className="flex w-full max-w-xs items-center gap-2 rounded-lg border bg-card px-3 py-2 text-muted-foreground text-sm shadow-xs">
            <SearchIcon className="size-4" />
            <span className="flex-1">Search components…</span>
            <KbdGroup>
              <Kbd size="sm">⌘</Kbd>
              <Kbd size="sm">K</Kbd>
            </KbdGroup>
          </div>
        </Exhibit>
      </div>
    </div>
  );
}
