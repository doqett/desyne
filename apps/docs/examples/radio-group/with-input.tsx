"use client";

import { useState } from "react";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { TextField } from "@/components/ui/text-field";

export default function RadioGroupWithInput() {
  const [reason, setReason] = useState("price");
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <RadioGroup
        label="Why are you cancelling?"
        value={reason}
        onChange={setReason}
      >
        <Radio value="price">It's too expensive</Radio>
        <Radio value="features">It's missing features I need</Radio>
        <Radio value="switch">I'm switching to another product</Radio>
        <Radio value="other">Something else</Radio>
      </RadioGroup>
      {reason === "other" && (
        <TextField
          aria-label="Tell us more"
          placeholder="Tell us more…"
          autoFocus
          className="pl-6"
        />
      )}
    </div>
  );
}
