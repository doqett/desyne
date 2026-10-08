"use client";

import {
  BarChart3Icon,
  HomeIcon,
  InboxIcon,
  LayersIcon,
  SettingsIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const items = [
  { label: "Home", icon: HomeIcon, kbd: "G H", current: true },
  { label: "Inbox", icon: InboxIcon, kbd: "G I" },
  { label: "Projects", icon: LayersIcon, kbd: "G P" },
  { label: "Analytics", icon: BarChart3Icon, kbd: "G A" },
];

export default function TooltipRecipeIconRail() {
  return (
    <nav
      aria-label="Main"
      className="flex h-72 w-14 flex-col items-center gap-1 rounded-xl border bg-card py-3"
    >
      <div className="mb-3 size-7 rounded-lg bg-brand" aria-hidden />
      {items.map((item) => (
        <TooltipTrigger key={item.label} delay={0}>
          <Button
            variant="ghost"
            size="icon"
            aria-label={item.label}
            aria-current={item.current ? "page" : undefined}
            className={cn(item.current && "bg-muted text-foreground")}
          >
            <item.icon />
          </Button>
          <Tooltip placement="right" className="flex items-center gap-2">
            {item.label}
            <Kbd
              size="sm"
              className="border-background/20 bg-background/15 text-background"
            >
              {item.kbd}
            </Kbd>
          </Tooltip>
        </TooltipTrigger>
      ))}
      <TooltipTrigger delay={0}>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Settings"
          className="mt-auto"
        >
          <SettingsIcon />
        </Button>
        <Tooltip placement="right">Settings</Tooltip>
      </TooltipTrigger>
    </nav>
  );
}
