"use client";

import {
  BarChart3Icon,
  CreditCardIcon,
  HomeIcon,
  PackageIcon,
  UsersIcon,
} from "lucide-react";
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

const routes = [
  { href: "#overview", title: "Overview", icon: HomeIcon },
  { href: "#analytics", title: "Analytics", icon: BarChart3Icon },
  { href: "#customers", title: "Customers", icon: UsersIcon },
  { href: "#products", title: "Products", icon: PackageIcon },
  { href: "#payouts", title: "Payouts", icon: CreditCardIcon },
];

export default function SidebarRouter() {
  // Stand-in for your router. In Next.js use `usePathname()` and pass
  // `useRouter().push` to RouterProvider in your app's providers.
  const [pathname, setPathname] = useState("#overview");
  const current = routes.find((r) => r.href === pathname);

  return (
    <RouterProvider navigate={setPathname}>
      <div
        data-sidebar-contained
        className="relative h-[400px] w-full overflow-hidden rounded-lg border"
      >
        <SidebarProvider className="h-full min-h-0">
          <Sidebar collapsible="icon">
            <SidebarContent>
              <SidebarGroup>
                <SidebarMenu>
                  {routes.map((r) => (
                    <SidebarMenuItem key={r.href}>
                      <SidebarMenuButton
                        href={r.href}
                        isActive={pathname === r.href}
                        tooltip={r.title}
                      >
                        <r.icon />
                        <span>{r.title}</span>
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
              <span className="font-medium text-sm">{current?.title}</span>
            </header>
            <div className="flex-1 p-4 text-muted-foreground text-sm">
              Rendered for <code className="text-foreground">{pathname}</code>.
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </RouterProvider>
  );
}
