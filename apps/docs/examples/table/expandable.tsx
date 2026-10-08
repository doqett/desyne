"use client";

import { Fragment, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableExpandButton,
  TableHeader,
} from "@/components/ui/table";

const orders = [
  {
    id: "ORD-4821",
    customer: "Fernhill Studio",
    status: "Shipped",
    total: 1284,
    items: [
      { sku: "DSK-OAK-140", name: "Oak desk, 140 cm", qty: 1, price: 940 },
      { sku: "LMP-BRS-02", name: "Brass task lamp", qty: 2, price: 172 },
    ],
  },
  {
    id: "ORD-4820",
    customer: "Halcyon Health",
    status: "Processing",
    total: 2310,
    items: [
      { sku: "CHR-ERG-11", name: "Ergonomic chair", qty: 3, price: 690 },
      { sku: "MAT-FLT-90", name: "Floor mat, 90 cm", qty: 3, price: 80 },
    ],
  },
  {
    id: "ORD-4819",
    customer: "Copperleaf Foods",
    status: "Delivered",
    total: 486,
    items: [
      { sku: "SHF-WAL-80", name: "Wall shelf, 80 cm", qty: 3, price: 162 },
    ],
  },
];

const tone = {
  Shipped: "info",
  Processing: "warning",
  Delivered: "success",
} as const;

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function TableExpandable() {
  const [open, setOpen] = useState<Set<string>>(new Set(["ORD-4821"]));
  const toggle = (id: string) =>
    setOpen((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <Table aria-label="Orders">
      <TableHeader>
        <Column width={44} aria-label="Expand" />
        <Column isRowHeader>Order</Column>
        <Column>Customer</Column>
        <Column>Status</Column>
        <Column className="text-right">Total</Column>
      </TableHeader>
      <TableBody>
        {orders.map((o) => (
          <Fragment key={o.id}>
            <Row id={o.id}>
              <Cell>
                <TableExpandButton
                  isExpanded={open.has(o.id)}
                  onPress={() => toggle(o.id)}
                  aria-label={`${open.has(o.id) ? "Hide" : "Show"} items in ${o.id}`}
                />
              </Cell>
              <Cell className="font-medium font-mono text-xs">{o.id}</Cell>
              <Cell>{o.customer}</Cell>
              <Cell>
                <Badge
                  variant="soft"
                  color={tone[o.status as keyof typeof tone]}
                >
                  {o.status}
                </Badge>
              </Cell>
              <Cell className="text-right tabular-nums">{money(o.total)}</Cell>
            </Row>
            {open.has(o.id) && (
              <Row
                id={`${o.id}-items`}
                className="bg-muted/30 data-hovered:bg-muted/30"
              >
                <Cell colSpan={5} className="py-0">
                  <ul className="divide-y py-1 pl-11">
                    {o.items.map((it) => (
                      <li
                        key={it.sku}
                        className="flex items-center gap-4 py-2 text-sm"
                      >
                        <span className="w-28 font-mono text-muted-foreground text-xs">
                          {it.sku}
                        </span>
                        <span className="flex-1">{it.name}</span>
                        <span className="text-muted-foreground tabular-nums">
                          {it.qty} × {money(it.price)}
                        </span>
                        <span className="w-24 text-right tabular-nums">
                          {money(it.qty * it.price)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Cell>
              </Row>
            )}
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
}
