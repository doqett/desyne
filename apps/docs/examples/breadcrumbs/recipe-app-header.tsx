"use client";

import { ChevronsUpDownIcon, GitBranchIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";

export default function BreadcrumbsRecipeAppHeader() {
  return (
    <div className="flex h-12 w-full max-w-2xl items-center justify-between gap-3 rounded-lg border bg-card px-3">
      <nav aria-label="Location" className="min-w-0">
        <Breadcrumbs separator="slash">
          <Breadcrumb
            href="#"
            icon={
              <Avatar
                size="xs"
                shape="square"
                colorful
                fallback="A"
                alt="Acme"
              />
            }
          >
            Acme
          </Breadcrumb>
          <Breadcrumb href="#">
            acme-web
            <Badge size="sm" variant="outline">
              Pro
            </Badge>
          </Breadcrumb>
          <Breadcrumb icon={<GitBranchIcon />}>feat/checkout-v2</Breadcrumb>
        </Breadcrumbs>
      </nav>
      <Button variant="ghost" size="icon-sm" aria-label="Switch project">
        <ChevronsUpDownIcon />
      </Button>
    </div>
  );
}
