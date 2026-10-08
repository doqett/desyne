"use client";

import {
  HomeIcon,
  InboxIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  SettingsIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";

// Any component inside SidebarProvider can read and change the sidebar state.
function SidebarToggle() {
  const { state, toggleSidebar } = useSidebar();
  const expanded = state === "expanded";
  return (
    <Button variant="outline" size="sm" onPress={toggleSidebar}>
      {expanded ? <PanelLeftCloseIcon /> : <PanelLeftOpenIcon />}
      {expanded ? "Hide sidebar" : "Show sidebar"}
      <KbdGroup>
        <Kbd size="sm">⌘</Kbd>
        <Kbd size="sm">B</Kbd>
      </KbdGroup>
    </Button>
  );
}

const items = [
  { title: "Home", icon: HomeIcon },
  { title: "Inbox", icon: InboxIcon },
  { title: "Settings", icon: SettingsIcon },
];

export default function SidebarUseSidebar() {
  return (
    <div
      data-sidebar-contained
      className="relative h-[360px] w-full overflow-hidden rounded-lg border"
    >
      <SidebarProvider className="h-full min-h-0">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {items.map((item, i) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={i === 0}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 items-center gap-2 border-b px-3">
            <SidebarToggle />
          </header>
          <div className="flex-1 p-4">
            <div className="h-full rounded-lg bg-muted" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
