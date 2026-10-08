"use client";

import {
  CalendarIcon,
  FlagIcon,
  PanelRightIcon,
  TagIcon,
  UserIcon,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const fields = [
  {
    label: "Assignee",
    icon: UserIcon,
    value: (
      <span className="flex items-center gap-1.5">
        <Avatar size="xs" colorful fallback="MC" alt="Maya Chen" /> Maya Chen
      </span>
    ),
  },
  {
    label: "Priority",
    icon: FlagIcon,
    value: (
      <Badge variant="dot" color="danger">
        Urgent
      </Badge>
    ),
  },
  { label: "Due", icon: CalendarIcon, value: "Oct 14, 2026" },
  { label: "Labels", icon: TagIcon, value: <Badge size="sm">checkout</Badge> },
];

export default function SidebarRight() {
  return (
    <div
      data-sidebar-contained
      className="relative h-[400px] w-full overflow-hidden rounded-lg border"
    >
      <SidebarProvider className="h-full min-h-0">
        {/* On the right, render SidebarInset first so the space is reserved on the right. */}
        <SidebarInset>
          <header className="flex h-12 items-center justify-between gap-2 border-b px-4">
            <span className="font-medium text-sm">
              ENG-482 · Checkout retries
            </span>
            <SidebarTrigger aria-label="Toggle details">
              <PanelRightIcon />
            </SidebarTrigger>
          </header>
          <div className="grid content-start gap-3 p-4 text-muted-foreground text-sm">
            <p>
              Payments occasionally fail with a timeout from the card network.
              Retry idempotent requests up to three times with exponential
              backoff.
            </p>
            <div className="h-24 rounded-lg bg-muted" />
          </div>
        </SidebarInset>
        <Sidebar side="right">
          <SidebarHeader className="h-12 justify-center border-b px-4">
            <span className="font-medium text-sm">Details</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Properties</SidebarGroupLabel>
              <dl className="grid gap-3 px-2 text-sm">
                {fields.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center justify-between gap-2"
                  >
                    <dt className="flex items-center gap-2 text-sidebar-foreground/70">
                      <f.icon className="size-4" /> {f.label}
                    </dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Activity</SidebarGroupLabel>
              <p className="px-2 text-sidebar-foreground/70 text-xs">
                Maya moved this to In progress · 2h ago
              </p>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
}
