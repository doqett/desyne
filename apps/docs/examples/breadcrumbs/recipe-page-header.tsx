"use client";

import { PencilIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";

export default function BreadcrumbsRecipePageHeader() {
  return (
    <header className="flex w-full max-w-2xl flex-wrap items-end justify-between gap-4 border-b pb-4">
      <div className="grid gap-2">
        <Breadcrumbs size="sm">
          <Breadcrumb href="#">Products</Breadcrumb>
          <Breadcrumb href="#">Headphones</Breadcrumb>
          <Breadcrumb>Studio Pro Wireless</Breadcrumb>
        </Breadcrumbs>
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-xl tracking-tight">
            Studio Pro Wireless
          </h1>
          <Badge variant="dot" color="success">
            Active
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm">
          SKU HP-2041 · 318 in stock · Updated 2 hours ago
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <PencilIcon /> Edit
        </Button>
        <Button>View in store</Button>
      </div>
    </header>
  );
}
