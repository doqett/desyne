"use client";

import {
  BookOpenIcon,
  ChevronRightIcon,
  LayoutDashboardIcon,
  SettingsIcon,
} from "lucide-react";
import { Disclosure, DisclosurePanel } from "react-aria-components";
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

const nav = [
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    items: ["Overview", "Reports", "Exports"],
  },
  {
    title: "Documentation",
    icon: BookOpenIcon,
    items: ["Introduction", "Get started", "Tutorials", "Changelog"],
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    items: ["General", "Team", "Billing", "Limits"],
  },
];

export default function SidebarSubmenu() {
  return (
    <div
      data-sidebar-contained
      className="relative h-[460px] w-full overflow-hidden rounded-lg border"
    >
      <SidebarProvider className="h-full min-h-0">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Platform</SidebarGroupLabel>
              <SidebarMenu>
                {nav.map((section, s) => (
                  <SidebarMenuItem key={section.title}>
                    <Disclosure
                      defaultExpanded={s === 1}
                      className="group/collapsible"
                    >
                      <SidebarMenuButton slot="trigger">
                        <section.icon />
                        <span>{section.title}</span>
                        <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-expanded/collapsible:rotate-90" />
                      </SidebarMenuButton>
                      <DisclosurePanel className="h-(--disclosure-panel-height) overflow-hidden transition-[height] duration-200 ease-out motion-reduce:transition-none">
                        <SidebarMenu className="mt-1 ml-3.5 gap-0.5 border-sidebar-border border-l pl-2.5">
                          {section.items.map((item, i) => (
                            <SidebarMenuItem key={item}>
                              <SidebarMenuButton
                                size="sm"
                                href="#"
                                isActive={s === 1 && i === 1}
                              >
                                <span>{item}</span>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </DisclosurePanel>
                    </Disclosure>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 items-center gap-2 border-b px-3">
            <SidebarTrigger />
            <span className="font-medium text-sm">Get started</span>
          </header>
          <div className="flex-1 p-4">
            <div className="h-full rounded-lg bg-muted" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
