"use client";

import { useState } from "react";
import { RadioCard, RadioGroup } from "@/components/ui/radio-group";

const methods = [
  { id: "standard", name: "Standard", eta: "Arrives Mon, Jun 16", price: 0 },
  { id: "express", name: "Express", eta: "Arrives Thu, Jun 12", price: 9 },
  { id: "overnight", name: "Overnight", eta: "Arrives tomorrow", price: 24 },
];

const subtotal = 128;
const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function RadioGroupRecipeShipping() {
  const [method, setMethod] = useState("standard");
  const shipping = methods.find((m) => m.id === method)?.price ?? 0;

  return (
    <div className="flex w-full max-w-sm flex-col gap-5 rounded-xl border bg-card p-5">
      <RadioGroup
        label="Shipping method"
        value={method}
        onChange={setMethod}
        name="shipping"
      >
        {methods.map((m) => (
          <RadioCard
            key={m.id}
            value={m.id}
            title={
              <span className="flex justify-between gap-2">
                {m.name}
                <span className="tabular-nums">
                  {m.price === 0 ? "Free" : usd.format(m.price)}
                </span>
              </span>
            }
            description={m.eta}
          />
        ))}
      </RadioGroup>
      <dl className="grid grid-cols-[1fr_auto] gap-y-1.5 border-t pt-4 text-sm">
        <dt className="text-muted-foreground">Subtotal</dt>
        <dd className="tabular-nums">{usd.format(subtotal)}</dd>
        <dt className="text-muted-foreground">Shipping</dt>
        <dd className="tabular-nums">
          {shipping === 0 ? "Free" : usd.format(shipping)}
        </dd>
        <dt className="font-medium">Total</dt>
        <dd className="font-medium tabular-nums">
          {usd.format(subtotal + shipping)}
        </dd>
      </dl>
    </div>
  );
}
