"use client";

import { Link } from "react-aria-components";
import { badgeVariants } from "@/components/ui/badge";

const topics = ["accessibility", "react", "design-tokens", "tailwind"];

export default function BadgeAsLink() {
  return (
    <nav aria-label="Topics" className="flex flex-wrap items-center gap-2">
      {topics.map((topic) => (
        <Link
          key={topic}
          href={`#${topic}`}
          className={badgeVariants({
            variant: "outline",
            shape: "pill",
            className:
              "cursor-pointer outline-none data-focus-visible:ring-[3px] data-focus-visible:ring-ring/25 data-hovered:bg-muted",
          })}
        >
          #{topic}
        </Link>
      ))}
    </nav>
  );
}
