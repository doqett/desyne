"use client";

import {
  AlertTriangleIcon,
  BadgeCheckIcon,
  ClockIcon,
  LockIcon,
  SparklesIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BadgeWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge color="success" shape="pill">
        <BadgeCheckIcon /> Verified
      </Badge>
      <Badge color="warning">
        <AlertTriangleIcon /> Degraded
      </Badge>
      <Badge variant="outline">
        <ClockIcon /> 2h ago
      </Badge>
      <Badge variant="outline">
        <LockIcon /> Private
      </Badge>
      <Badge variant="solid" color="brand">
        <SparklesIcon /> AI
      </Badge>
    </div>
  );
}
