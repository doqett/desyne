"use client";

import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function BreadcrumbsSeparators() {
  return (
    <div className="flex flex-col gap-4">
      {(["chevron", "slash", "dot"] as const).map((separator) => (
        <Breadcrumbs key={separator} separator={separator}>
          <Breadcrumb href="#">Docs</Breadcrumb>
          <Breadcrumb href="#">Components</Breadcrumb>
          <Breadcrumb>Breadcrumbs</Breadcrumb>
        </Breadcrumbs>
      ))}
    </div>
  );
}
