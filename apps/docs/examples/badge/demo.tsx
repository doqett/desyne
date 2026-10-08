"use client";

import { Badge } from "@/components/ui/badge";

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Draft</Badge>
      <Badge color="success">Active</Badge>
      <Badge color="warning">Pending review</Badge>
      <Badge color="danger">Failed</Badge>
      <Badge variant="solid" color="primary">
        New
      </Badge>
    </div>
  );
}
