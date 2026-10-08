"use client";

import { Focusable } from "react-aria-components";
import { Avatar } from "@/components/ui/avatar";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

const people = [
  { name: "Amara Okafor", role: "Owner", initials: "AO" },
  { name: "Ben Carter", role: "Editor", initials: "BC" },
  { name: "Chloé Martin", role: "Editor", initials: "CM" },
  { name: "Dev Patel", role: "Viewer", initials: "DP" },
];

export default function TooltipRecipeAvatarStack() {
  return (
    <div className="flex items-center gap-3">
      <ul aria-label="People with access" className="flex -space-x-2">
        {people.map((p) => (
          <li key={p.name}>
            <TooltipTrigger delay={200}>
              <Focusable>
                <span
                  role="img"
                  aria-label={p.name}
                  // biome-ignore lint/a11y/noNoninteractiveTabindex: focusable so keyboard users get the tooltip
                  tabIndex={0}
                  className="block rounded-full outline-none ring-2 ring-background focus-visible:ring-ring/50"
                >
                  <Avatar alt={p.name} fallback={p.initials} colorful />
                </span>
              </Focusable>
              <Tooltip variant="light">
                <p className="font-medium">{p.name}</p>
                <p className="text-muted-foreground">{p.role}</p>
              </Tooltip>
            </TooltipTrigger>
          </li>
        ))}
      </ul>
      <span className="text-muted-foreground text-sm">4 collaborators</span>
    </div>
  );
}
