"use client";

import { FileTextIcon, HomeIcon, InboxIcon } from "lucide-react";
import { useState } from "react";
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
import { Switch } from "@/components/ui/switch";

const items = [
  { title: "Home", icon: HomeIcon },
  { title: "Inbox", icon: InboxIcon },
  { title: "Drafts", icon: FileTextIcon },
];

export default function SidebarControlled() {
  const [open, setOpen] = useState(true);

  return (
    <div
      data-sidebar-contained
      className="relative h-[360px] w-full overflow-hidden rounded-lg border"
    >
      <SidebarProvider
        open={open}
        onOpenChange={setOpen}
        className="h-full min-h-0"
      >
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {items.map((item, i) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={i === 0} tooltip={item.title}>
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
          <header className="flex h-12 items-center justify-between gap-2 border-b px-3">
            <SidebarTrigger />
            <Switch size="sm" isSelected={open} onChange={setOpen}>
              Show sidebar
            </Switch>
          </header>
          <div className="flex-1 p-4 text-muted-foreground text-sm">
            The sidebar is {open ? "expanded" : "collapsed"}.
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
