"use client";

import { useState } from "react";
import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Switch } from "@/components/ui/switch";

export default function BreadcrumbsDisabled() {
  const [isDisabled, setDisabled] = useState(true);
  return (
    <div className="grid justify-items-start gap-4">
      <Breadcrumbs isDisabled={isDisabled}>
        <Breadcrumb href="#">Home</Breadcrumb>
        <Breadcrumb href="#">Projects</Breadcrumb>
        <Breadcrumb>Settings</Breadcrumb>
      </Breadcrumbs>
      <Switch isSelected={isDisabled} onChange={setDisabled}>
        Disabled
      </Switch>
    </div>
  );
}
