"use client";

import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

const limits = [
  { id: "requests", name: "API requests", free: "10k / mo", pro: "1M / mo" },
  { id: "seats", name: "Seats", free: "3", pro: "Unlimited" },
  { id: "storage", name: "Storage", free: "1 GB", pro: "100 GB" },
  { id: "retention", name: "Log retention", free: "7 days", pro: "90 days" },
];

export default function TableFramed() {
  return (
    <div className="w-full max-w-lg rounded-xl border bg-card p-4 shadow-xs">
      <h3 className="mb-2 font-semibold text-sm">Plan limits</h3>
      <Table aria-label="Plan limits" framed={false} density="compact">
        <TableHeader>
          <Column isRowHeader>Limit</Column>
          <Column className="text-right">Free</Column>
          <Column className="text-right">Pro</Column>
        </TableHeader>
        <TableBody items={limits}>
          {(l) => (
            <Row>
              <Cell>{l.name}</Cell>
              <Cell className="text-right text-muted-foreground">{l.free}</Cell>
              <Cell className="text-right font-medium">{l.pro}</Cell>
            </Row>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
