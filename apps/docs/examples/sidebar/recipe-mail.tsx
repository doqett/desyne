"use client";

import {
  ArchiveIcon,
  FileIcon,
  InboxIcon,
  PencilIcon,
  SendIcon,
  StarIcon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

// Shows its tooltip only when the sidebar is collapsed to icons, like SidebarMenuButton.
function ComposeButton() {
  const { state, isMobile } = useSidebar();
  return (
    <TooltipTrigger isDisabled={state !== "collapsed" || isMobile}>
      <Button
        aria-label="Compose"
        className="w-full group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-0"
      >
        <PencilIcon />
        <span className="group-data-[collapsible=icon]:hidden">Compose</span>
      </Button>
      <Tooltip placement="right">Compose</Tooltip>
    </TooltipTrigger>
  );
}

const folders = [
  { title: "Inbox", icon: InboxIcon, count: 128 },
  { title: "Starred", icon: StarIcon },
  { title: "Drafts", icon: FileIcon, count: 9 },
  { title: "Sent", icon: SendIcon },
  { title: "Archive", icon: ArchiveIcon },
  { title: "Trash", icon: Trash2Icon },
];

const labels = [
  { title: "Customers", color: "bg-sky-500", count: 12 },
  { title: "Invoices", color: "bg-emerald-500" },
  { title: "Hiring", color: "bg-violet-500", count: 3 },
];

const messages = [
  {
    from: "Stripe",
    subject: "Your payout of $4,120.00 is on the way",
    time: "9:41",
  },
  {
    from: "Lena Park",
    subject: "Re: Offer letter for the design role",
    time: "8:15",
  },
  {
    from: "Linear",
    subject: "3 issues were assigned to you",
    time: "Yesterday",
  },
];

export default function SidebarRecipeMail() {
  return (
    <div
      data-sidebar-contained
      className="relative h-[480px] w-full overflow-hidden rounded-lg border"
    >
      <SidebarProvider className="h-full min-h-0">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <ComposeButton />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {folders.map((f, i) => (
                  <SidebarMenuItem key={f.title}>
                    <SidebarMenuButton
                      href="#"
                      isActive={i === 0}
                      tooltip={f.title}
                    >
                      <f.icon />
                      <span>{f.title}</span>
                    </SidebarMenuButton>
                    {f.count && <SidebarMenuBadge>{f.count}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Labels</SidebarGroupLabel>
              <SidebarMenu>
                {labels.map((l) => (
                  <SidebarMenuItem key={l.title}>
                    <SidebarMenuButton href="#" tooltip={l.title}>
                      <span className="flex size-4 shrink-0 items-center justify-center">
                        <span className={`size-2 rounded-full ${l.color}`} />
                      </span>
                      <span>{l.title}</span>
                    </SidebarMenuButton>
                    {l.count && <SidebarMenuBadge>{l.count}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-3">
            <SidebarTrigger />
            <span className="font-medium text-sm">Inbox</span>
          </header>
          <ul className="divide-y overflow-auto">
            {messages.map((m) => (
              <li key={m.subject} className="grid gap-0.5 px-4 py-3 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{m.from}</span>
                  <span className="text-muted-foreground text-xs">
                    {m.time}
                  </span>
                </div>
                <span className="truncate text-muted-foreground">
                  {m.subject}
                </span>
              </li>
            ))}
          </ul>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
