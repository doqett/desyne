"use client";

import {
  CalendarIcon,
  HomeIcon,
  InboxIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const items = [
  { title: "Home", icon: HomeIcon },
  { title: "Inbox", icon: InboxIcon },
  { title: "Calendar", icon: CalendarIcon },
  { title: "Team", icon: UsersIcon },
  { title: "Settings", icon: SettingsIcon },
];

export default function SidebarFloating() {
  return (
    <div
      data-sidebar-contained
      className="relative h-[400px] w-full overflow-hidden rounded-lg border bg-sidebar"
    >
      <SidebarProvider className="h-full min-h-0">
        <Sidebar variant="floating" collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarMenu>
                {items.map((item, i) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      href="#"
                      isActive={i === 1}
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
        <SidebarInset className="bg-transparent">
          <header className="flex h-12 items-center gap-2 px-3">
            <SidebarTrigger />
            <span className="font-medium text-sm">Inbox</span>
          </header>
          <div className="grid flex-1 gap-3 p-4 pt-0">
            <div className="rounded-lg border bg-background" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
