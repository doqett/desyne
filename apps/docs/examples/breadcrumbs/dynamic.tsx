"use client";

import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";

const path = [
  { id: "org", label: "Acme Inc", href: "#" },
  { id: "team", label: "Growth", href: "#" },
  { id: "project", label: "Onboarding revamp", href: "#" },
  { id: "doc", label: "Research notes" },
];

export default function BreadcrumbsDynamic() {
  return (
    <Breadcrumbs items={path}>
      {(item) => (
        <Breadcrumb id={item.id} href={item.href}>
          {item.label}
        </Breadcrumb>
      )}
    </Breadcrumbs>
  );
}
