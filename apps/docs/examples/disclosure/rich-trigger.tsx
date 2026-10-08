"use client";

import { DatabaseIcon, GlobeIcon, ServerIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/components/ui/disclosure";

const services = [
  {
    id: "web",
    name: "web",
    icon: GlobeIcon,
    status: "Healthy",
    tone: "success",
    detail: "3 instances · p95 142 ms · last deploy 12 minutes ago",
  },
  {
    id: "api",
    name: "api",
    icon: ServerIcon,
    status: "Degraded",
    tone: "warning",
    detail: "1 of 4 instances failing health checks since 09:42 UTC",
  },
  {
    id: "db",
    name: "postgres",
    icon: DatabaseIcon,
    status: "Healthy",
    tone: "success",
    detail: "Primary in us-east-1 · 2 read replicas · 38% storage used",
  },
] as const;

export default function DisclosureRichTrigger() {
  return (
    <DisclosureGroup
      variant="card"
      className="max-w-md"
      defaultExpandedKeys={["api"]}
    >
      {services.map((s) => (
        <Disclosure key={s.id} id={s.id}>
          <DisclosureTrigger>
            <s.icon />
            <span className="font-mono">{s.name}</span>
            <Badge variant="dot" color={s.tone} size="sm">
              {s.status}
            </Badge>
          </DisclosureTrigger>
          <DisclosurePanel>{s.detail}</DisclosurePanel>
        </Disclosure>
      ))}
    </DisclosureGroup>
  );
}
