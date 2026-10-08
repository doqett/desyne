"use client";

import { CheckIcon } from "lucide-react";
import { useState } from "react";
import type { Key } from "react-aria-components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

const features = ["Unlimited projects", "Version history", "SSO & audit log"];

export default function ToggleButtonGroupRecipePricing() {
  const [billing, setBilling] = useState<Key>("yearly");
  const price = billing === "yearly" ? 16 : 20;
  return (
    <div className="w-full max-w-xs space-y-4 rounded-xl border bg-card p-5">
      <ToggleButtonGroup
        variant="segmented"
        aria-label="Billing period"
        selectedKeys={[billing]}
        onSelectionChange={(keys) => {
          const [next] = keys;
          if (next) setBilling(next);
        }}
        disallowEmptySelection
        className="w-full *:flex-1"
      >
        <ToggleButton id="monthly">Monthly</ToggleButton>
        <ToggleButton id="yearly">
          Yearly
          <Badge size="sm" color="success">
            −20%
          </Badge>
        </ToggleButton>
      </ToggleButtonGroup>
      <div>
        <p className="font-medium text-sm">Pro</p>
        <p className="mt-1 flex items-baseline gap-1">
          <span className="font-semibold text-3xl tabular-nums">${price}</span>
          <span className="text-muted-foreground text-sm">
            per seat / month
          </span>
        </p>
        <p className="mt-1 text-muted-foreground text-xs">
          {billing === "yearly"
            ? `Billed $${price * 12} yearly`
            : "Billed monthly, cancel anytime"}
        </p>
      </div>
      <ul className="space-y-2 text-sm">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <CheckIcon className="size-4 text-success" /> {f}
          </li>
        ))}
      </ul>
      <Button className="w-full">Upgrade to Pro</Button>
    </div>
  );
}
