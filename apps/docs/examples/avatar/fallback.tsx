"use client";

import { UserIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

export default function AvatarFallback() {
  return (
    <div className="flex items-center gap-4">
      <Avatar
        size="lg"
        src="https://github.com/shadcn.png"
        alt="shadcn"
        fallback="CN"
      />
      <Avatar
        size="lg"
        src="https://example.invalid/missing.png"
        alt="Broken image"
        fallback="BI"
      />
      <Avatar size="lg" alt="Sofia Davis" fallback="SD" />
      <Avatar
        size="lg"
        alt="Guest"
        fallback={<UserIcon className="size-5" aria-hidden />}
      />
    </div>
  );
}
