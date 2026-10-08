"use client";

import {
  BookOpenIcon,
  BotIcon,
  FrameIcon,
  LayoutDashboardIcon,
  LifeBuoyIcon,
  MapIcon,
  PieChartIcon,
  SendIcon,
  SquareTerminalIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const groups = [
  {
    label: "Platform",
    items: [
      { title: "Dashboard", icon: LayoutDashboardIcon },
      { title: "Playground", icon: SquareTerminalIcon },
      { title: "Models", icon: BotIcon },
      { title: "Documentation", icon: BookOpenIcon },
    ],
  },
  {
    label: "Projects",
    items: [
      { title: "Design Engineering", icon: FrameIcon },
      { title: "Sales & Marketing", icon: PieChartIcon },
      { title: "Travel", icon: MapIcon },
    ],
  },
];

export default function SidebarGroups() {
  return (
    <div
      data-sidebar-contained
      className="relative h-[460px] w-full overflow-hidden rounded-lg border"
    >
      <SidebarProvider className="h-full min-h-0">
        <Sidebar collapsible="icon">
          <SidebarContent>
            {groups.map((group, g) => (
              <SidebarGroup key={group.label}>
                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                <SidebarMenu>
                  {group.items.map((item, i) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        href="#"
                        isActive={g === 0 && i === 0}
                        tooltip={item.title}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            ))}
          </SidebarContent>
          <SidebarSeparator />
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="sm" href="#" tooltip="Support">
                  <LifeBuoyIcon />
                  <span>Support</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton size="sm" href="#" tooltip="Feedback">
                  <SendIcon />
                  <span>Feedback</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 items-center gap-2 border-b px-3">
            <SidebarTrigger />
            <span className="font-medium text-sm">Dashboard</span>
          </header>
          <div className="flex-1 p-4">
            <div className="h-full rounded-lg bg-muted" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
