"use client";

import { HomeIcon } from "lucide-react";
import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function BreadcrumbsIconHome() {
  return (
    <Breadcrumbs>
      <Breadcrumb href="#" icon={<HomeIcon />}>
        <span className="sr-only">Home</span>
      </Breadcrumb>
      <Breadcrumb href="#">Help Center</Breadcrumb>
      <Breadcrumb href="#">Billing</Breadcrumb>
      <Breadcrumb>Update a payment method</Breadcrumb>
    </Breadcrumbs>
  );
}
