"use client";

import { ShoppingBagIcon } from "lucide-react";
import {
  Disclosure,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/components/ui/disclosure";

const items = [
  { name: "Studio Pro Wireless", qty: 1, price: 349 },
  { name: "Travel case", qty: 1, price: 29 },
  { name: "USB-C cable (2 m)", qty: 2, price: 12 },
];

const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
const shipping = 0;
const tax = Math.round(subtotal * 0.08 * 100) / 100;
const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function DisclosureRecipeOrderSummary() {
  return (
    <div className="w-full max-w-sm rounded-lg border bg-card px-4">
      <Disclosure className="border-b-0">
        <DisclosureTrigger>
          <ShoppingBagIcon />
          Order summary
          <span className="ml-2 font-semibold tabular-nums">
            {usd(subtotal + shipping + tax)}
          </span>
        </DisclosureTrigger>
        <DisclosurePanel>
          <ul className="grid gap-2 border-t pt-3">
            {items.map((i) => (
              <li key={i.name} className="flex justify-between gap-4">
                <span>
                  {i.name}
                  {i.qty > 1 && <span className="text-xs"> × {i.qty}</span>}
                </span>
                <span className="text-foreground tabular-nums">
                  {usd(i.qty * i.price)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-3 grid gap-1.5 border-t pt-3">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="text-foreground tabular-nums">{usd(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd className="text-foreground">Free</dd>
            </div>
            <div className="flex justify-between">
              <dt>Estimated tax</dt>
              <dd className="text-foreground tabular-nums">{usd(tax)}</dd>
            </div>
          </dl>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
