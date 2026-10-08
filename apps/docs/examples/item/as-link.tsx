"use client";

import {
  BellIcon,
  ChevronRightIcon,
  KeyRoundIcon,
  UserIcon,
} from "lucide-react";
import {
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  itemVariants,
} from "@/components/ui/item";

const links = [
  {
    href: "#profile",
    icon: UserIcon,
    title: "Profile",
    description: "Name, photo and contact details",
  },
  {
    href: "#notifications",
    icon: BellIcon,
    title: "Notifications",
    description: "Email, push and in-app alerts",
  },
  {
    href: "#security",
    icon: KeyRoundIcon,
    title: "Security",
    description: "Password, passkeys and sessions",
  },
];

export default function ItemAsLink() {
  return (
    <nav aria-label="Account settings" className="w-full max-w-sm">
      <ul className="flex flex-col gap-0.5">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className={itemVariants({ size: "sm" })}>
              <ItemMedia variant="icon">
                <l.icon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{l.title}</ItemTitle>
                <ItemDescription>{l.description}</ItemDescription>
              </ItemContent>
              <ChevronRightIcon
                aria-hidden
                className="size-4 text-muted-foreground transition-transform group-hover/item:translate-x-0.5"
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
