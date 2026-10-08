"use client";

import { Avatar } from "@/components/ui/avatar";

export default function AvatarShapes() {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Avatar size="lg" colorful alt="Jackson Lee" fallback="JL" />
        <span className="text-sm">Person</span>
      </div>
      <div className="flex items-center gap-2">
        <Avatar
          size="lg"
          shape="square"
          colorful
          alt="Northwind Analytics"
          fallback="NA"
        />
        <span className="text-sm">Workspace</span>
      </div>
    </div>
  );
}
