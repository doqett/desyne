"use client";

import { ArrowUpRightIcon, BookOpenIcon, BoxesIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const links = [
  {
    icon: BookOpenIcon,
    title: "Documentation",
    text: "Guides, concepts and the full API reference.",
    href: "#documentation",
  },
  {
    icon: BoxesIcon,
    title: "Examples",
    text: "Copy-paste starting points for common screens.",
    href: "#examples",
  },
];

export default function CardInteractive() {
  return (
    <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
      {links.map((c) => (
        <Card
          key={c.title}
          size="sm"
          isInteractive
          className="relative has-[a:focus-visible]:ring-[3px] has-[a:focus-visible]:ring-ring/25"
        >
          <CardHeader>
            <span className="mb-2 flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
              <c.icon className="size-4" />
            </span>
            <CardTitle>
              {/* The ::after overlay stretches the link over the whole card. */}
              <a
                href={c.href}
                className="flex items-center gap-1 outline-none after:absolute after:inset-0 after:rounded-xl"
              >
                {c.title}
                <ArrowUpRightIcon className="size-3.5 text-muted-foreground transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
              </a>
            </CardTitle>
            <CardDescription>{c.text}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
