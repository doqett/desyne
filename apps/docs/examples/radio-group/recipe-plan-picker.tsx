"use client";

import { BuildingIcon, RocketIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioCard, RadioGroup } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

const plans = [
  {
    id: "hobby",
    name: "Hobby",
    icon: <UserIcon />,
    monthly: 0,
    blurb: "1 project, community support",
  },
  {
    id: "pro",
    name: "Pro",
    icon: <RocketIcon />,
    monthly: 20,
    blurb: "Unlimited projects, preview deploys",
    popular: true,
  },
  {
    id: "team",
    name: "Team",
    icon: <BuildingIcon />,
    monthly: 45,
    blurb: "SSO, roles and audit log",
  },
];

export default function RadioGroupRecipePlanPicker() {
  const [plan, setPlan] = useState("pro");
  const [yearly, setYearly] = useState(true);
  const price = (monthly: number) =>
    monthly === 0
      ? "Free"
      : `$${yearly ? Math.round(monthly * 0.8) : monthly}/mo`;

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Switch isSelected={yearly} onChange={setYearly} size="sm">
        Bill yearly (save 20%)
      </Switch>
      <RadioGroup
        label="Plan"
        value={plan}
        onChange={setPlan}
        className="w-full"
      >
        {plans.map((p) => (
          <RadioCard
            key={p.id}
            value={p.id}
            icon={p.icon}
            title={
              <span className="flex items-center gap-2">
                {p.name}
                {p.popular && (
                  <Badge color="brand" size="sm">
                    Popular
                  </Badge>
                )}
                <span className="ml-auto text-muted-foreground tabular-nums">
                  {price(p.monthly)}
                </span>
              </span>
            }
            description={p.blurb}
          />
        ))}
      </RadioGroup>
      <Button className="w-full">
        Continue with {plans.find((p) => p.id === plan)?.name}
      </Button>
    </div>
  );
}
