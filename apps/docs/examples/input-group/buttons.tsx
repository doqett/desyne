"use client";

import { CheckIcon, CopyIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { TextField } from "react-aria-components";
import { Description, Label } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

const apiKey = "sk_demo_51Hx9fK2aQ4mZ8rT";

export default function InputGroupButtons() {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <TextField
        value={apiKey}
        isReadOnly
        className="group/field flex flex-col gap-1.5"
      >
        <Label>API key</Label>
        <InputGroup>
          <InputGroupInput className="font-mono text-xs" />
          <InputGroupButton
            aria-label={copied ? "Copied" : "Copy API key"}
            onPress={() => {
              navigator.clipboard?.writeText(apiKey);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
          >
            {copied ? <CheckIcon className="text-success" /> : <CopyIcon />}
          </InputGroupButton>
        </InputGroup>
        <Description>Keep this secret. It has full access.</Description>
      </TextField>
      <TextField
        type={visible ? "text" : "password"}
        defaultValue="correct-horse-battery"
        className="group/field flex flex-col gap-1.5"
      >
        <Label>Password</Label>
        <InputGroup>
          <InputGroupInput />
          <InputGroupButton
            aria-label={visible ? "Hide password" : "Show password"}
            onPress={() => setVisible((v) => !v)}
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </InputGroupButton>
        </InputGroup>
      </TextField>
    </div>
  );
}
