"use client";

import { HomeIcon, InboxIcon, SettingsIcon, UsersIcon } from "lucide-react";
import { useState } from "react";
import { RouterProvider } from "react-aria-components";
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
  { href: "/home", title: "Home", icon: HomeIcon },
  { href: "/inbox", title: "Inbox", icon: InboxIcon },
  { href: "/team", title: "Team", icon: UsersIcon },
  { href: "/settings", title: "Settings", icon: SettingsIcon },
];

export default function SidebarMobile() {
  // Stand-in for your router. In Next.js use `useRouter().push` and `usePathname()`.
  const [pathname, setPathname] = useState("/home");
  const page = items.find((item) => item.href === pathname);

  return (
    <RouterProvider navigate={setPathname}>
      <div
        data-sidebar-contained
        className="relative h-[360px] w-full overflow-hidden rounded-lg border"
      >
        <SidebarProvider className="h-full min-h-0">
          {/* max-md: classes only reach the mobile sheet. */}
          <Sidebar className="max-md:w-72">
            <SidebarContent>
              <SidebarGroup>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        href={item.href}
                        isActive={item.href === pathname}
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
              <SidebarTrigger />
              <span className="font-medium text-sm">{page?.title}</span>
            </header>
            <p className="p-4 text-muted-foreground text-sm">
              On a phone, open the sheet and pick a page: it closes as the route
              changes.
            </p>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </RouterProvider>
  );
}
