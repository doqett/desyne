"use client";

import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function BreadcrumbsSizes() {
  return (
    <div className="flex flex-col gap-4">
      {(["sm", "md"] as const).map((size) => (
        <Breadcrumbs key={size} size={size}>
          <Breadcrumb href="#">Store</Breadcrumb>
          <Breadcrumb href="#">Audio</Breadcrumb>
          <Breadcrumb href="#">Headphones</Breadcrumb>
          <Breadcrumb>Studio Pro Wireless</Breadcrumb>
        </Breadcrumbs>
      ))}
    </div>
  );
}
