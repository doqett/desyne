"use client";

import { CheckIcon, CopyIcon, LinkIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";

const inviteUrl = "https://acme.dev/join/7f3k-92qd";

export default function TextFieldRecipeCopy() {
  const [copied, setCopied] = useState(false);
  return (
    <TextField
      className="w-full max-w-sm"
      label="Invite link"
      value={inviteUrl}
      isReadOnly
      prefix={<LinkIcon />}
      description="Anyone with this link can join as a member."
      suffix={
        <Button
          size="icon-xs"
          variant="ghost"
          aria-label={copied ? "Copied" : "Copy invite link"}
          className="-mr-1"
          onPress={async () => {
            await navigator.clipboard.writeText(inviteUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          {copied ? <CheckIcon className="text-success!" /> : <CopyIcon />}
        </Button>
      }
    />
  );
}
