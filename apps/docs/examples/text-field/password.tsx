"use client";

import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "react-aria-components";
import { TextField } from "@/components/ui/text-field";

export default function TextFieldPassword() {
  const [visible, setVisible] = useState(false);
  return (
    <TextField
      className="w-full max-w-xs"
      label="Password"
      type={visible ? "text" : "password"}
      autoComplete="current-password"
      defaultValue="correct-horse-battery"
      prefix={<LockIcon />}
      suffix={
        <Button
          aria-label={visible ? "Hide password" : "Show password"}
          onPress={() => setVisible((v) => !v)}
          className="flex cursor-default rounded-sm outline-none data-hovered:[&_svg]:text-foreground data-focus-visible:ring-2 data-focus-visible:ring-ring/30"
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </Button>
      }
    />
  );
}
