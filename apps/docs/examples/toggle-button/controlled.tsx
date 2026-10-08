"use client";

import { BellIcon, BellOffIcon } from "lucide-react";
import { useState } from "react";
import { ToggleButton } from "@/components/ui/toggle-button";

export default function ToggleButtonControlled() {
  const [isMuted, setMuted] = useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <ToggleButton
        variant="outline"
        isSelected={isMuted}
        onChange={setMuted}
        aria-label="Mute notifications"
      >
        {isMuted ? <BellOffIcon /> : <BellIcon />}
      </ToggleButton>
      <p className="text-muted-foreground text-sm">
        Notifications for #design are {isMuted ? "muted" : "on"}.
      </p>
    </div>
  );
}
