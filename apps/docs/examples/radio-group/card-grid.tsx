"use client";

import { CreditCardIcon, LandmarkIcon, WalletIcon } from "lucide-react";
import { RadioCard, RadioGroup } from "@/components/ui/radio-group";

export default function RadioGroupCardGrid() {
  return (
    <RadioGroup
      label="Payment method"
      orientation="horizontal"
      defaultValue="card"
      className="w-full max-w-xl"
    >
      <RadioCard
        value="card"
        icon={<CreditCardIcon />}
        title="Card"
        description="Visa, Mastercard, Amex"
        className="min-w-40 flex-1"
      />
      <RadioCard
        value="bank"
        icon={<LandmarkIcon />}
        title="Bank transfer"
        description="2–3 business days"
        className="min-w-40 flex-1"
      />
      <RadioCard
        value="wallet"
        icon={<WalletIcon />}
        title="Wallet"
        description="Apple Pay, Google Pay"
        className="min-w-40 flex-1"
      />
    </RadioGroup>
  );
}
