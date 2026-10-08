"use client";

import { MinusIcon, PlusIcon, ShoppingBagIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const initial = [
  {
    id: "tee",
    name: "Organic cotton tee",
    variant: "Oat · M",
    price: 32,
    qty: 2,
  },
  { id: "cap", name: "Six-panel cap", variant: "Forest", price: 28, qty: 1 },
  { id: "tote", name: "Canvas tote", variant: "Natural", price: 24, qty: 1 },
];

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function SheetRecipeCart() {
  const [items, setItems] = useState(initial);
  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);

  const setQty = (id: string, qty: number) =>
    setItems((list) =>
      qty <= 0
        ? list.filter((i) => i.id !== id)
        : list.map((i) => (i.id === id ? { ...i, qty } : i)),
    );

  return (
    <SheetTrigger>
      <Button variant="outline">
        <ShoppingBagIcon /> Cart ({count})
      </Button>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your cart</SheetTitle>
          <SheetDescription>
            {count === 0 ? "Your cart is empty." : `${count} items`}
          </SheetDescription>
        </SheetHeader>
        <ul className="min-h-0 flex-1 divide-y overflow-y-auto px-5">
          {items.map((item) => (
            <li key={item.id} className="flex gap-3 py-4">
              <div className="size-16 shrink-0 rounded-md bg-muted" />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex justify-between gap-2 text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{item.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {item.variant}
                    </p>
                  </div>
                  <p className="tabular-nums">{usd(item.price * item.qty)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon-xs"
                    aria-label={`Decrease ${item.name}`}
                    onPress={() => setQty(item.id, item.qty - 1)}
                  >
                    <MinusIcon />
                  </Button>
                  <span className="w-6 text-center text-sm tabular-nums">
                    {item.qty}
                  </span>
                  <Button
                    variant="outline"
                    size="icon-xs"
                    aria-label={`Increase ${item.name}`}
                    onPress={() => setQty(item.id, item.qty + 1)}
                  >
                    <PlusIcon />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    color="danger"
                    className="ml-auto"
                    aria-label={`Remove ${item.name}`}
                    onPress={() => setQty(item.id, 0)}
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <SheetFooter className="flex-col sm:flex-col sm:justify-start">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium tabular-nums">{usd(subtotal)}</span>
          </div>
          <p className="text-muted-foreground text-xs">
            Shipping and taxes are calculated at checkout.
          </p>
          <Button className="w-full" isDisabled={count === 0}>
            Checkout
          </Button>
        </SheetFooter>
      </SheetContent>
    </SheetTrigger>
  );
}
