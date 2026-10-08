"use client";

import {
  CheckIcon,
  CopyIcon,
  GlobeIcon,
  LockIcon,
  Share2Icon,
} from "lucide-react";
import { useState } from "react";
import type { Key } from "react-aria-components";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverDialog,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TextField } from "@/components/ui/text-field";

const url = "https://acme.design/f/Q3-launch-plan";

export default function PopoverRecipeShare() {
  const [access, setAccess] = useState<Key | null>("team");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard?.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <PopoverTrigger>
      <Button>
        <Share2Icon /> Share
      </Button>
      <Popover placement="bottom end">
        <PopoverDialog className="grid w-80 gap-4">
          <div className="grid gap-1.5">
            <PopoverTitle>Share “Q3 launch plan”</PopoverTitle>
            <p className="text-muted-foreground text-xs">
              Anyone with access can view and comment.
            </p>
          </div>
          <div className="flex items-end gap-2">
            <TextField
              aria-label="Share link"
              value={url}
              isReadOnly
              size="sm"
              className="min-w-0 flex-1"
            />
            <Button
              variant="outline"
              size="icon-sm"
              aria-label={copied ? "Copied" : "Copy link"}
              onPress={copy}
            >
              {copied ? <CheckIcon className="text-success" /> : <CopyIcon />}
            </Button>
          </div>
          <Select
            label="General access"
            size="sm"
            selectedKey={access}
            onSelectionChange={setAccess}
            prefix={access === "public" ? <GlobeIcon /> : <LockIcon />}
          >
            <SelectItem id="restricted">Only invited people</SelectItem>
            <SelectItem id="team">Anyone at Acme</SelectItem>
            <SelectItem id="public">Anyone with the link</SelectItem>
          </Select>
          <Separator />
          <div className="flex items-center justify-between gap-3">
            <AvatarGroup size="sm" max={4}>
              <Avatar size="sm" alt="Jin Park" fallback="JP" colorful />
              <Avatar size="sm" alt="Nora Ali" fallback="NA" colorful />
              <Avatar size="sm" alt="Sam Ortiz" fallback="SO" colorful />
              <Avatar size="sm" alt="Ivy Chen" fallback="IC" colorful />
              <Avatar size="sm" alt="Tom Reyes" fallback="TR" colorful />
            </AvatarGroup>
            <span className="text-muted-foreground text-xs">
              5 people have access
            </span>
          </div>
        </PopoverDialog>
      </Popover>
    </PopoverTrigger>
  );
}
