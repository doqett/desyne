"use client";

import {
  FolderIcon,
  HomeIcon,
  InboxIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
} from "@/components/ui/sidebar";

const items = [
  { title: "Home", icon: HomeIcon, active: true },
  { title: "Inbox", icon: InboxIcon, badge: "12" },
  { title: "Search", icon: SearchIcon },
  { title: "Projects", icon: FolderIcon },
  { title: "Settings", icon: SettingsIcon },
];

export default function SidebarDemo() {
  return (
    // data-sidebar-contained keeps the sidebar inside this box; omit it in a real app layout.
    <div
      data-sidebar-contained
      className="relative h-[420px] w-full overflow-hidden rounded-lg border"
    >
      <SidebarProvider className="h-full min-h-0">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" tooltip="Acme Inc">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary font-semibold text-primary-foreground text-xs">
                    A
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="font-medium">Acme Inc</span>
                    <span className="text-muted-foreground text-xs">
                      Enterprise
                    </span>
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      href="#"
                      isActive={item.active}
                      tooltip={item.title}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" tooltip="Jordan">
                  <Avatar size="md" shape="square" fallback="JL" />
                  <span className="flex flex-col leading-tight">
                    <span className="font-medium">Jordan</span>
                    <span className="text-muted-foreground text-xs">
                      jordan@example.com
                    </span>
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 items-center gap-2 border-b px-3">
            <SidebarTrigger />
            <span className="font-medium text-sm">Home</span>
          </header>
          <div className="grid flex-1 grid-cols-3 gap-3 p-4">
            <div className="rounded-lg bg-muted" />
            <div className="rounded-lg bg-muted" />
            <div className="rounded-lg bg-muted" />
            <div className="col-span-3 rounded-lg bg-muted" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
