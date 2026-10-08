"use client";

import {
  BarChart3Icon,
  CreditCardIcon,
  HomeIcon,
  PackageIcon,
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
  { title: "Overview", icon: HomeIcon },
  { title: "Analytics", icon: BarChart3Icon },
  { title: "Customers", icon: UsersIcon },
  { title: "Products", icon: PackageIcon },
  { title: "Payouts", icon: CreditCardIcon },
];

export default function SidebarInsetDemo() {
  return (
    <div
      data-sidebar-contained
      className="relative h-[400px] w-full overflow-hidden rounded-lg border"
    >
      <SidebarProvider className="h-full min-h-0">
        <Sidebar variant="inset" collapsible="icon">
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
        <SidebarInset>
          <header className="flex h-12 items-center gap-2 px-3">
            <SidebarTrigger />
            <span className="font-medium text-sm">Overview</span>
          </header>
          <div className="grid flex-1 grid-cols-3 gap-3 p-4 pt-0">
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
