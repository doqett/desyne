"use client";

import { LockIcon, WifiIcon } from "lucide-react";
import { ToggleButton } from "@/components/ui/toggle-button";

export default function ToggleButtonDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ToggleButton variant="outline" isDisabled>
        <WifiIcon /> Offline mode
      </ToggleButton>
      <ToggleButton variant="outline" isDisabled defaultSelected>
        <LockIcon /> Locked
      </ToggleButton>
    </div>
  );
}
