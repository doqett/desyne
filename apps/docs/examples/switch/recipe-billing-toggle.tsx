"use client";

import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const tiers = [
  {
    name: "Starter",
    monthly: 12,
    features: ["3 projects", "Basic analytics", "Email support"],
  },
  {
    name: "Growth",
    monthly: 39,
    features: ["Unlimited projects", "Advanced analytics", "Priority support"],
  },
];

export default function SwitchRecipeBillingToggle() {
  const [yearly, setYearly] = useState(false);
  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-5">
      <div className="flex items-center gap-3 text-sm">
        <Switch isSelected={yearly} onChange={setYearly}>
          Yearly billing
        </Switch>
        <Badge color="success" size="sm">
          2 months free
        </Badge>
      </div>
      <div className="grid w-full gap-4 sm:grid-cols-2">
        {tiers.map((tier) => {
          const price = yearly
            ? Math.round((tier.monthly * 10) / 12)
            : tier.monthly;
          return (
            <div
              key={tier.name}
              className="flex flex-col gap-4 rounded-xl border bg-card p-5"
            >
              <div>
                <p className="font-medium text-sm">{tier.name}</p>
                <p className="mt-1">
                  <span className="font-semibold text-3xl tabular-nums">
                    ${price}
                  </span>
                  <span className="text-muted-foreground text-sm"> /month</span>
                </p>
                <p className="text-muted-foreground text-xs">
                  {yearly
                    ? `$${tier.monthly * 10} billed yearly`
                    : "Billed monthly"}
                </p>
              </div>
              <ul className="grid gap-2 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckIcon className="size-4 text-success" /> {f}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="mt-auto">
                Choose {tier.name}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
