"use client";

import { Avatar } from "@/components/ui/avatar";

export default function AvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar
        size="lg"
        src="https://github.com/shadcn.png"
        alt="shadcn"
        fallback="CN"
        status="online"
      />
      <Avatar size="lg" colorful alt="Jordan Lee" fallback="JL" status="busy" />
      <Avatar
        size="lg"
        colorful
        alt="Olivia Martin"
        fallback="OM"
        status="away"
      />
      <Avatar size="lg" fallback="?" status="offline" />
    </div>
  );
}
