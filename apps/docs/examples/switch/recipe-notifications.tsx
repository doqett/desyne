"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

const categories = [
  {
    id: "comments",
    title: "Comments",
    description: "Replies and mentions on issues you follow.",
  },
  {
    id: "reviews",
    title: "Review requests",
    description: "When someone asks for your review on a pull request.",
  },
  {
    id: "deploys",
    title: "Deployments",
    description: "Failed and promoted deployments in your projects.",
  },
];

export default function SwitchRecipeNotifications() {
  const [enabled, setEnabled] = useState(true);
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    comments: true,
    reviews: true,
    deploys: false,
  });

  return (
    <div className="w-full max-w-md divide-y rounded-xl border bg-card">
      <Switch
        labelPlacement="start"
        size="lg"
        className="p-5"
        isSelected={enabled}
        onChange={setEnabled}
        description="Turn off to pause every email notification."
      >
        Email notifications
      </Switch>
      {categories.map((c) => (
        <Switch
          key={c.id}
          labelPlacement="start"
          className="px-5 py-4"
          isDisabled={!enabled}
          isSelected={enabled && prefs[c.id]}
          onChange={(value) => setPrefs((p) => ({ ...p, [c.id]: value }))}
          description={c.description}
        >
          {c.title}
        </Switch>
      ))}
    </div>
  );
}
