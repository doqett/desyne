"use client";

import {
  ChevronsUpDownIcon,
  FolderKanbanIcon,
  HomeIcon,
  InboxIcon,
  LogOutIcon,
  PlusIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
  MenuContent,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { Separator } from "@/components/ui/separator";
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

const main = [
  { title: "Home", icon: HomeIcon },
  { title: "Inbox", icon: InboxIcon, badge: "4" },
  { title: "Projects", icon: FolderKanbanIcon, active: true },
  { title: "Members", icon: UsersIcon },
];

const projects = [
  { title: "Checkout v2", color: "bg-emerald-500" },
  { title: "Mobile app", color: "bg-sky-500" },
  { title: "Brand refresh", color: "bg-amber-500" },
];

export default function SidebarRecipeAppShell() {
  return (
    <div
      data-sidebar-contained
      className="relative h-[520px] w-full overflow-hidden rounded-lg border"
    >
      <SidebarProvider className="h-full min-h-0">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <MenuTrigger>
                  <SidebarMenuButton size="lg" tooltip="Acme Inc">
                    <Avatar
                      size="md"
                      shape="square"
                      colorful
                      fallback="A"
                      alt="Acme Inc"
                    />
                    <span className="flex flex-1 flex-col leading-tight">
                      <span className="font-medium">Acme Inc</span>
                      <span className="text-sidebar-foreground/60 text-xs">
                        Pro plan
                      </span>
                    </span>
                    <ChevronsUpDownIcon className="ml-auto" />
                  </SidebarMenuButton>
                  <MenuContent
                    placement="bottom start"
                    popoverClassName="min-w-56"
                  >
                    <MenuSection title="Workspaces">
                      <MenuItem>Acme Inc</MenuItem>
                      <MenuItem>Globex Labs</MenuItem>
                    </MenuSection>
                    <MenuSeparator />
                    <MenuItem>
                      <PlusIcon /> Create workspace
                    </MenuItem>
                  </MenuContent>
                </MenuTrigger>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {main.map((item) => (
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
            <SidebarGroup>
              <SidebarGroupLabel>Projects</SidebarGroupLabel>
              <SidebarMenu>
                {projects.map((p) => (
                  <SidebarMenuItem key={p.title}>
                    <SidebarMenuButton href="#" tooltip={p.title}>
                      <span className="flex size-4 shrink-0 items-center justify-center">
                        <span className={`size-2 rounded-full ${p.color}`} />
                      </span>
                      <span>{p.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <MenuTrigger>
                  <SidebarMenuButton size="lg" tooltip="Maya Chen">
                    <Avatar size="md" colorful fallback="MC" alt="Maya Chen" />
                    <span className="flex flex-1 flex-col leading-tight">
                      <span className="font-medium">Maya Chen</span>
                      <span className="text-sidebar-foreground/60 text-xs">
                        maya@acme.dev
                      </span>
                    </span>
                    <ChevronsUpDownIcon className="ml-auto" />
                  </SidebarMenuButton>
                  <MenuContent
                    placement="top start"
                    popoverClassName="min-w-56"
                  >
                    <MenuItem>
                      <UserIcon /> Account
                    </MenuItem>
                    <MenuItem>
                      <SettingsIcon /> Settings
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem>
                      <LogOutIcon /> Log out
                    </MenuItem>
                  </MenuContent>
                </MenuTrigger>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mx-1 h-4 self-center"
            />
            <Breadcrumbs size="sm">
              <Breadcrumb href="#">Projects</Breadcrumb>
              <Breadcrumb>Checkout v2</Breadcrumb>
            </Breadcrumbs>
          </header>
          <div className="grid flex-1 auto-rows-min gap-3 p-4 pt-0 sm:grid-cols-3">
            <div className="aspect-video rounded-lg bg-muted" />
            <div className="aspect-video rounded-lg bg-muted" />
            <div className="aspect-video rounded-lg bg-muted" />
            <div className="h-40 rounded-lg bg-muted sm:col-span-3" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
