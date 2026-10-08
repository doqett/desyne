"use client";

import { ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const orders = [
  {
    id: "#10432",
    customer: "Harper Lewis",
    total: "$248.00",
    status: "Paid",
    items: 3,
    placed: "Sep 27, 2026",
  },
  {
    id: "#10431",
    customer: "Mateo García",
    total: "$89.50",
    status: "Refunded",
    items: 1,
    placed: "Sep 26, 2026",
  },
  {
    id: "#10430",
    customer: "Aisha Bello",
    total: "$1,120.00",
    status: "Paid",
    items: 6,
    placed: "Sep 26, 2026",
  },
];

type Order = (typeof orders)[number];

export default function SheetControlled() {
  const [order, setOrder] = useState<Order | null>(null);
  return (
    <>
      <ul className="w-full max-w-sm divide-y rounded-lg border bg-card">
        {orders.map((o) => (
          <li key={o.id}>
            <Button
              variant="ghost"
              className="h-auto w-full justify-between rounded-none px-3 py-2.5 font-normal"
              onPress={() => setOrder(o)}
            >
              <span className="flex flex-col items-start">
                <span className="font-medium">{o.customer}</span>
                <span className="text-muted-foreground text-xs">{o.id}</span>
              </span>
              <span className="flex items-center gap-2 tabular-nums">
                {o.total}
                <ChevronRightIcon className="text-muted-foreground" />
              </span>
            </Button>
          </li>
        ))}
      </ul>
      <SheetContent
        isOpen={order !== null}
        onOpenChange={(isOpen) => !isOpen && setOrder(null)}
      >
        {order && (
          <>
            <SheetHeader>
              <SheetTitle>Order {order.id}</SheetTitle>
              <SheetDescription>Placed {order.placed}</SheetDescription>
            </SheetHeader>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 p-5 text-sm">
              <dt className="text-muted-foreground">Customer</dt>
              <dd>{order.customer}</dd>
              <dt className="text-muted-foreground">Status</dt>
              <dd>
                <Badge
                  size="sm"
                  color={order.status === "Paid" ? "success" : "neutral"}
                >
                  {order.status}
                </Badge>
              </dd>
              <dt className="text-muted-foreground">Items</dt>
              <dd>{order.items}</dd>
              <dt className="text-muted-foreground">Total</dt>
              <dd className="font-medium tabular-nums">{order.total}</dd>
            </dl>
            <SheetFooter>
              <SheetClose>Close</SheetClose>
              <Button>View invoice</Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </>
  );
}
