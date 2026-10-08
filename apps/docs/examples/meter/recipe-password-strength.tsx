"use client";

import { useState } from "react";
import { Meter } from "@/components/ui/meter";
import { TextField } from "@/components/ui/text-field";

const levels = [
  { label: "Too short", color: "danger" },
  { label: "Weak", color: "danger" },
  { label: "Fair", color: "warning" },
  { label: "Good", color: "success" },
  { label: "Strong", color: "success" },
] as const;

function score(password: string) {
  if (password.length < 8) return 0;
  let s = 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) s++;
  if (/\d/.test(password)) s++;
  if (/[^A-Za-z0-9]/.test(password) || password.length >= 14) s++;
  return s;
}

export default function MeterRecipePasswordStrength() {
  const [password, setPassword] = useState("");
  const s = score(password);
  const level = levels[s];

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <TextField
        label="New password"
        type="password"
        value={password}
        onChange={setPassword}
        description="At least 8 characters. Mix cases, numbers and symbols."
      />
      <Meter
        label="Strength"
        value={password ? s : 0}
        maxValue={4}
        segments={4}
        size="sm"
        valueLabel={password ? level.label : "—"}
        color={level.color}
      />
    </div>
  );
}
