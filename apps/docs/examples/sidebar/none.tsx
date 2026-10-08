"use client";

import {
  BellIcon,
  CreditCardIcon,
  KeyRoundIcon,
  PaletteIcon,
  ShieldIcon,
  UserIcon,
} from "lucide-react";
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

const groups = [
  {
    label: "Account",
    items: [
      { title: "Profile", icon: UserIcon },
      { title: "Appearance", icon: PaletteIcon },
      { title: "Notifications", icon: BellIcon },
    ],
  },
  {
    label: "Workspace",
    items: [
      { title: "Security", icon: ShieldIcon },
      { title: "API keys", icon: KeyRoundIcon },
      { title: "Billing", icon: CreditCardIcon },
    ],
  },
];

export default function SidebarNone() {
  return (
    <div className="flex h-[380px] w-full overflow-hidden rounded-lg border">
      <SidebarProvider className="h-full min-h-0">
        <Sidebar collapsible="none" className="w-52 border-r">
          <SidebarContent>
            {groups.map((group) => (
              <SidebarGroup key={group.label}>
                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        href="#"
                        isActive={item.title === "Appearance"}
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
        </Sidebar>
        <main className="grid flex-1 content-start gap-1 p-6">
          <h2 className="font-semibold text-lg">Appearance</h2>
          <p className="text-muted-foreground text-sm">
            Choose a theme and density for your workspace.
          </p>
        </main>
      </SidebarProvider>
    </div>
  );
}
