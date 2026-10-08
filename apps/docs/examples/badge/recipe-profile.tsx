"use client";

import { BadgeCheckIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function BadgeRecipeProfile() {
  return (
    <div className="flex w-full max-w-md items-start gap-4 rounded-xl border bg-card p-4">
      <Avatar size="xl" colorful alt="Maya Patel" fallback="MP" />
      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold text-base">Maya Patel</h3>
          <Badge size="sm" shape="pill" color="info">
            <BadgeCheckIcon /> Verified
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm">
          Staff engineer, Platform · Joined March 2023
        </p>
        <div className="flex flex-wrap gap-1.5">
          <Badge size="sm" variant="outline">
            TypeScript
          </Badge>
          <Badge size="sm" variant="outline">
            Kubernetes
          </Badge>
          <Badge size="sm" variant="outline">
            Postgres
          </Badge>
          <Badge size="sm" variant="solid" color="brand">
            Admin
          </Badge>
        </div>
      </div>
    </div>
  );
}
