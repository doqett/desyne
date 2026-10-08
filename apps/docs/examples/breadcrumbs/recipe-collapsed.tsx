"use client";

import { MoreHorizontalIcon } from "lucide-react";
import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { MenuContent, MenuItem, MenuTrigger } from "@/components/ui/menu";

const hidden = ["Engineering", "Platform", "Runbooks"];

export default function BreadcrumbsRecipeCollapsed() {
  return (
    <Breadcrumbs>
      <Breadcrumb href="#">Wiki</Breadcrumb>
      {/* link={false} renders the menu trigger as-is, keeping the separator. */}
      <Breadcrumb link={false}>
        <MenuTrigger>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={`Show ${hidden.length} more`}
            className="text-muted-foreground"
          >
            <MoreHorizontalIcon />
          </Button>
          <MenuContent placement="bottom start">
            {hidden.map((label) => (
              <MenuItem key={label} href="#">
                {label}
              </MenuItem>
            ))}
          </MenuContent>
        </MenuTrigger>
      </Breadcrumb>
      <Breadcrumb href="#">Incidents</Breadcrumb>
      <Breadcrumb>Database failover</Breadcrumb>
    </Breadcrumbs>
  );
}
