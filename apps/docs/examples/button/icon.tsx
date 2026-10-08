"use client";

import { HeartIcon, SettingsIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ButtonIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="icon-sm" variant="outline" aria-label="Settings">
        <SettingsIcon />
      </Button>
      <Button size="icon" variant="soft" aria-label="Like">
        <HeartIcon />
      </Button>
      <Button size="icon-lg" variant="solid" color="danger" aria-label="Delete">
        <Trash2Icon />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="rounded-full"
        aria-label="Settings"
      >
        <SettingsIcon />
      </Button>
    </div>
  );
}
