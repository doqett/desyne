"use client";

import {
  BarChart3Icon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { Link } from "react-aria-components";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetTrigger } from "@/components/ui/sheet";

const nav = [
  { label: "Home", icon: HomeIcon, current: true },
  { label: "Inbox", icon: InboxIcon, badge: "12" },
  { label: "Projects", icon: FolderIcon },
  { label: "Reports", icon: BarChart3Icon },
  { label: "Team", icon: UsersIcon },
];

export default function SheetRecipeMobileNav() {
  return (
    <div className="flex w-full max-w-sm items-center gap-2 rounded-lg border bg-card px-2 py-1.5">
      <SheetTrigger>
        <Button variant="ghost" size="icon" aria-label="Open navigation">
          <MenuIcon />
        </Button>
        <SheetContent side="left" size="sm" aria-label="Navigation">
          {({ close }) => (
            <nav className="flex h-full flex-col gap-1 p-3">
              <div className="flex items-center gap-2 px-2 pt-1 pb-4 font-semibold">
                <div className="size-6 rounded-md bg-brand" />
                Northwind
              </div>
              {nav.map((item) => (
                <Link
                  key={item.label}
                  href={`#${item.label.toLowerCase()}`}
                  onPress={close}
                  aria-current={item.current ? "page" : undefined}
                  className="flex items-center gap-3 rounded-md px-2 py-2 text-muted-foreground text-sm outline-none data-focus-visible:ring-[3px] data-focus-visible:ring-ring/25 data-hovered:bg-muted data-hovered:text-foreground aria-[current=page]:bg-muted aria-[current=page]:font-medium aria-[current=page]:text-foreground"
                >
                  <item.icon className="size-4" />
                  {item.label}
                  {item.badge && (
                    <Badge size="sm" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
              <div className="mt-auto flex items-center gap-3 border-t px-2 pt-3">
                <Avatar size="sm" alt="Rina Patel" fallback="RP" colorful />
                <div className="min-w-0 flex-1 text-sm">
                  <p className="truncate font-medium">Rina Patel</p>
                  <p className="truncate text-muted-foreground text-xs">
                    rina@northwind.io
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Settings"
                  onPress={close}
                >
                  <SettingsIcon />
                </Button>
              </div>
            </nav>
          )}
        </SheetContent>
      </SheetTrigger>
      <span className="font-semibold text-sm">Home</span>
    </div>
  );
}
