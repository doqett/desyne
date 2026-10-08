"use client";

import { FileTextIcon, FolderIcon, HomeIcon, StarIcon } from "lucide-react";
import { useState } from "react";
import type { Key } from "react-aria-components";
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
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

type Mode = "offcanvas" | "icon" | "none";

const items = [
  { title: "Home", icon: HomeIcon },
  { title: "Starred", icon: StarIcon },
  { title: "Documents", icon: FileTextIcon },
  { title: "Shared folders", icon: FolderIcon },
];

export default function SidebarCollapsible() {
  const [mode, setMode] = useState<Mode>("icon");

  return (
    <div
      data-sidebar-contained
      className="relative h-[400px] w-full overflow-hidden rounded-lg border"
    >
      <SidebarProvider className="h-full min-h-0">
        <Sidebar
          collapsible={mode}
          className={mode === "none" ? "border-r" : undefined}
        >
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Drive</SidebarGroupLabel>
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
          <header className="flex h-12 items-center gap-2 border-b px-3">
            {mode !== "none" && <SidebarTrigger />}
            <ToggleButtonGroup
              aria-label="Collapsible mode"
              variant="segmented"
              size="xs"
              disallowEmptySelection
              selectedKeys={[mode]}
              onSelectionChange={(keys: Set<Key>) => {
                const [next] = keys;
                if (next) setMode(next as Mode);
              }}
            >
              <ToggleButton id="offcanvas">offcanvas</ToggleButton>
              <ToggleButton id="icon">icon</ToggleButton>
              <ToggleButton id="none">none</ToggleButton>
            </ToggleButtonGroup>
          </header>
          <div className="flex-1 p-4">
            <div className="h-full rounded-lg bg-muted" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
