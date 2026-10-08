"use client";

import { BuildingIcon, RocketIcon, UserIcon } from "lucide-react";
import { RadioCard, RadioGroup } from "@/components/ui/radio-group";

export default function RadioGroupCards() {
  return (
    <RadioGroup label="Plan" defaultValue="team" className="w-full max-w-sm">
      <RadioCard
        value="personal"
        icon={<UserIcon />}
        title="Personal"
        description="For individuals. Up to 3 projects."
      />
      <RadioCard
        value="team"
        icon={<RocketIcon />}
        title="Team"
        description="$12 per seat. Unlimited projects."
      />
      <RadioCard
        value="enterprise"
        icon={<BuildingIcon />}
        title="Enterprise"
        description="SSO, audit logs and dedicated support."
      />
    </RadioGroup>
  );
}
