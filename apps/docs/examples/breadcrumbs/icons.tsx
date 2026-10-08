"use client";

import { FolderIcon, HomeIcon } from "lucide-react";
import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function BreadcrumbsIcons() {
  return (
    <Breadcrumbs size="sm">
      <Breadcrumb href="#" icon={<HomeIcon />}>
        Home
      </Breadcrumb>
      <Breadcrumb href="#" icon={<FolderIcon />}>
        Documents
      </Breadcrumb>
      <Breadcrumb>Q3 report.pdf</Breadcrumb>
    </Breadcrumbs>
  );
}
