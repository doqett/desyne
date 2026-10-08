"use client";

import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function BreadcrumbsDemo() {
  return (
    <Breadcrumbs>
      <Breadcrumb href="#">Home</Breadcrumb>
      <Breadcrumb href="#">Projects</Breadcrumb>
      <Breadcrumb href="#">acme-web</Breadcrumb>
      <Breadcrumb>Settings</Breadcrumb>
    </Breadcrumbs>
  );
}
