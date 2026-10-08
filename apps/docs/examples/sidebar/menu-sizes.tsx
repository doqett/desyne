"use client";

import { FolderIcon, HashIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function SidebarMenuSizes() {
  return (
    <div className="h-[360px] w-64 overflow-hidden rounded-lg border">
      <SidebarProvider className="h-full min-h-0">
        <Sidebar collapsible="none" className="w-full">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>lg</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton size="lg">
                    <Avatar
                      size="md"
                      shape="square"
                      colorful
                      fallback="AC"
                      alt="Acme"
                    />
                    <span className="flex flex-col leading-tight">
                      <span className="font-medium">Acme Inc</span>
                      <span className="text-sidebar-foreground/60 text-xs">
                        Enterprise
                      </span>
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>default</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <FolderIcon />
                    <span>Projects</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>sm</SidebarGroupLabel>
              <SidebarMenu>
                {["general", "design", "releases"].map((c) => (
                  <SidebarMenuItem key={c}>
                    <SidebarMenuButton size="sm">
                      <HashIcon />
                      <span>{c}</span>
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
