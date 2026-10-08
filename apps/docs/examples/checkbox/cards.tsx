"use client";

import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox";

const addons = [
  {
    id: "backups",
    title: "Daily backups",
    description: "Point-in-time restore for the last 30 days. $10/mo",
  },
  {
    id: "cdn",
    title: "Global CDN",
    description: "Serve assets from 300+ edge locations. $15/mo",
  },
  {
    id: "support",
    title: "Priority support",
    description: "4-hour response time, 24/7. $49/mo",
  },
];

export default function CheckboxCards() {
  return (
    <CheckboxGroup
      label="Add-ons"
      defaultValue={["backups"]}
      className="w-full max-w-sm"
    >
      {addons.map((addon) => (
        <Checkbox
          key={addon.id}
          value={addon.id}
          description={addon.description}
          className="w-full rounded-lg border bg-card p-3.5 shadow-xs transition-[border-color,background-color] data-hovered:border-brand/50 data-selected:border-brand data-selected:bg-brand/[0.04] data-focus-visible:ring-[3px] data-focus-visible:ring-ring/25"
        >
          {addon.title}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
