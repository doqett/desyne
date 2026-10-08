"use client";

import { Avatar } from "@/components/ui/avatar";

export default function AvatarWithText() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Avatar
          src="https://github.com/shadcn.png"
          alt=""
          fallback="CN"
          status="online"
        />
        <div className="flex flex-col">
          <span className="font-medium text-sm">shadcn</span>
          <span className="text-muted-foreground text-xs">m@example.com</span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Avatar size="xs" colorful alt="" fallback="IN" />
        <span>
          <span className="font-medium">Isabella Nguyen</span>{" "}
          <span className="text-muted-foreground">commented 5m ago</span>
        </span>
      </div>
    </div>
  );
}
