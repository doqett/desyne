"use client";

import { useState } from "react";
import type { Selection } from "react-aria-components";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

const plans = [
  {
    id: "starter",
    name: "Starter",
    cpu: "1 vCPU",
    memory: "1 GB",
    price: "$5 / mo",
  },
  {
    id: "standard",
    name: "Standard",
    cpu: "2 vCPU",
    memory: "4 GB",
    price: "$24 / mo",
  },
  {
    id: "performance",
    name: "Performance",
    cpu: "4 vCPU",
    memory: "8 GB",
    price: "$48 / mo",
  },
  {
    id: "memory",
    name: "Memory optimized",
    cpu: "4 vCPU",
    memory: "32 GB",
    price: "$96 / mo",
  },
];

export default function TableSingleSelection() {
  const [selected, setSelected] = useState<Selection>(new Set(["standard"]));
  const plan = plans.find((p) => selected !== "all" && selected.has(p.id));
  return (
    <div className="flex w-full max-w-xl flex-col gap-2">
      <Table
        aria-label="Instance size"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <TableHeader>
          <Column isRowHeader>Plan</Column>
          <Column>CPU</Column>
          <Column>Memory</Column>
          <Column className="text-right">Price</Column>
        </TableHeader>
        <TableBody items={plans}>
          {(p) => (
            <Row>
              <Cell className="font-medium">{p.name}</Cell>
              <Cell>{p.cpu}</Cell>
              <Cell>{p.memory}</Cell>
              <Cell className="text-right tabular-nums">{p.price}</Cell>
            </Row>
          )}
        </TableBody>
      </Table>
      <p className="text-muted-foreground text-xs">
        Selected: {plan?.name ?? "none"}
      </p>
    </div>
  );
}
