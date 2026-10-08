"use client";

import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";

const crumbs = [
  "Engineering",
  "Platform Infrastructure and Developer Experience",
  "Quarterly planning",
  "Q3 2026 roadmap: service mesh migration and cost review",
];

export default function BreadcrumbsTruncation() {
  return (
    <Breadcrumbs className="max-w-md">
      {crumbs.map((label, i) => (
        <Breadcrumb key={label} href={i < crumbs.length - 1 ? "#" : undefined}>
          <span className="max-w-32 truncate" title={label}>
            {label}
          </span>
        </Breadcrumb>
      ))}
    </Breadcrumbs>
  );
}
