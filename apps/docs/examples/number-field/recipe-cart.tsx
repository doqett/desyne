"use client";

import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NumberField } from "@/components/ui/number-field";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const initial = [
  {
    id: "tee",
    name: "Heavyweight tee",
    variant: "Sand / M",
    price: 38,
    qty: 2,
  },
  { id: "cap", name: "Six-panel cap", variant: "Olive", price: 29, qty: 1 },
  { id: "tote", name: "Canvas tote", variant: "Natural", price: 24, qty: 1 },
];

export default function NumberFieldRecipeCart() {
  const [lines, setLines] = useState(initial);
  const subtotal = lines.reduce(
    (sum, l) => sum + l.price * (Number.isNaN(l.qty) ? 0 : l.qty),
    0,
  );
  return (
    <div className="w-full max-w-md rounded-xl border bg-card">
      <ul className="divide-y">
        {lines.map((line) => (
          <li key={line.id} className="flex items-center gap-3 p-4">
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-sm">{line.name}</p>
              <p className="text-muted-foreground text-xs">
                {line.variant} · {currency.format(line.price)}
              </p>
            </div>
            <NumberField
              aria-label={`Quantity of ${line.name}`}
              size="sm"
              stepper="split"
              minValue={1}
              maxValue={10}
              value={line.qty}
              onChange={(qty) =>
                setLines((ls) =>
                  ls.map((l) => (l.id === line.id ? { ...l, qty } : l)),
                )
              }
              className="w-28 shrink-0"
            />
            <Button
              size="icon-sm"
              variant="ghost"
              aria-label={`Remove ${line.name}`}
              onPress={() =>
                setLines((ls) => ls.filter((l) => l.id !== line.id))
              }
            >
              <Trash2Icon />
            </Button>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t p-4 text-sm">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="font-semibold tabular-nums">
          {currency.format(subtotal)}
        </span>
      </div>
    </div>
  );
}
