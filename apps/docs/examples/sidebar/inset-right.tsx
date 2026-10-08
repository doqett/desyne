"use client";

import {
  CalendarIcon,
  MessageSquareIcon,
  PanelRightIcon,
  PaperclipIcon,
  UsersIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const items = [
  { title: "Comments", icon: MessageSquareIcon },
  { title: "Attachments", icon: PaperclipIcon },
  { title: "People", icon: UsersIcon },
  { title: "Schedule", icon: CalendarIcon },
];

export default function SidebarInsetRight() {
  return (
    <div
      data-sidebar-contained
      className="relative h-[400px] w-full overflow-hidden rounded-lg border"
    >
      <SidebarProvider className="h-full min-h-0">
        <SidebarInset>
          <header className="flex h-12 items-center justify-between gap-2 px-3">
            <span className="font-medium text-sm">Launch plan</span>
            <SidebarTrigger aria-label="Toggle panel">
              <PanelRightIcon />
            </SidebarTrigger>
          </header>
          <div className="grid flex-1 grid-cols-2 gap-3 p-4 pt-0">
            <div className="rounded-lg bg-muted" />
            <div className="rounded-lg bg-muted" />
            <div className="col-span-2 rounded-lg bg-muted" />
          </div>
        </SidebarInset>
        <Sidebar side="right" variant="inset" collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {items.map((item, i) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      href="#"
                      isActive={i === 0}
                      tooltip={item.title}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
}
