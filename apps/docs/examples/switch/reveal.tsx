"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { TextareaField } from "@/components/ui/textarea";

export default function SwitchReveal() {
  const [enabled, setEnabled] = useState(true);
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <Switch
        isSelected={enabled}
        onChange={setEnabled}
        description="Reply automatically while you're away."
      >
        Out-of-office reply
      </Switch>
      {enabled && (
        <TextareaField
          label="Message"
          rows={3}
          defaultValue="I'm away until Monday and will reply when I'm back."
          className="pl-11.5"
        />
      )}
    </div>
  );
}
