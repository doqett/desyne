"use client";

import { MailIcon, MapPinIcon, MessageSquareIcon } from "lucide-react";
import { Button as AriaButton } from "react-aria-components";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverDialog,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function PopoverProfileCard() {
  return (
    <p className="max-w-sm text-sm leading-relaxed">
      Reviewed by{" "}
      <PopoverTrigger>
        <AriaButton className="rounded-xs font-medium text-brand underline-offset-4 outline-none data-focus-visible:ring-[3px] data-focus-visible:ring-ring/25 data-hovered:underline">
          Elena Novak
        </AriaButton>
        <Popover placement="bottom start">
          <PopoverDialog className="grid w-72 gap-3">
            <div className="flex items-start gap-3">
              <Avatar
                size="lg"
                alt="Elena Novak"
                fallback="EN"
                colorful
                status="online"
              />
              <div className="min-w-0 flex-1">
                <PopoverTitle>Elena Novak</PopoverTitle>
                <p className="mt-1 text-muted-foreground text-xs">
                  Staff engineer · Payments
                </p>
              </div>
              <Badge size="sm" color="success">
                Available
              </Badge>
            </div>
            <ul className="grid gap-1.5 text-muted-foreground text-xs">
              <li className="flex items-center gap-2">
                <MapPinIcon className="size-3.5" /> Lisbon · 14:32 local time
              </li>
              <li className="flex items-center gap-2">
                <MailIcon className="size-3.5" /> elena.novak@acme.dev
              </li>
            </ul>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                View profile
              </Button>
              <Button size="sm">
                <MessageSquareIcon /> Message
              </Button>
            </div>
          </PopoverDialog>
        </Popover>
      </PopoverTrigger>{" "}
      two days ago and approved the migration plan for the ledger service.
    </p>
  );
}
