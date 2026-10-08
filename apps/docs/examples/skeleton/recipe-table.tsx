"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

const invoices = [
  {
    id: "INV-1042",
    customer: "Acme Corp",
    status: "Paid",
    amount: "$2,500.00",
  },
  {
    id: "INV-1043",
    customer: "Globex",
    status: "Pending",
    amount: "$1,150.00",
  },
  {
    id: "INV-1044",
    customer: "Initech",
    status: "Overdue",
    amount: "$3,420.00",
  },
  { id: "INV-1045", customer: "Umbrella", status: "Paid", amount: "$980.00" },
];

const tone = {
  Paid: "success",
  Pending: "warning",
  Overdue: "danger",
} as const;

export default function SkeletonRecipeTable() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div className="flex w-full max-w-xl flex-col items-end gap-3">
      <Button
        size="sm"
        variant="outline"
        isDisabled={loading}
        onPress={() => setLoading(true)}
      >
        Refresh
      </Button>
      <div aria-busy={loading} className="w-full">
        <Table aria-label="Invoices" className="min-w-[480px]">
          <TableHeader>
            <Column isRowHeader>Invoice</Column>
            <Column>Customer</Column>
            <Column>Status</Column>
            <Column className="text-right">Amount</Column>
          </TableHeader>
          {loading ? (
            <TableBody>
              {invoices.map((inv) => (
                <Row key={inv.id} id={inv.id}>
                  <Cell textValue="Loading">
                    <Skeleton className="h-4 w-20" />
                  </Cell>
                  <Cell textValue="Loading">
                    <Skeleton className="h-4 w-28" />
                  </Cell>
                  <Cell textValue="Loading">
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </Cell>
                  <Cell textValue="Loading">
                    <Skeleton className="ml-auto h-4 w-16" />
                  </Cell>
                </Row>
              ))}
            </TableBody>
          ) : (
            <TableBody items={invoices}>
              {(inv) => (
                <Row id={inv.id}>
                  <Cell className="font-medium">{inv.id}</Cell>
                  <Cell>{inv.customer}</Cell>
                  <Cell>
                    <Badge color={tone[inv.status as keyof typeof tone]}>
                      {inv.status}
                    </Badge>
                  </Cell>
                  <Cell className="text-right tabular-nums">{inv.amount}</Cell>
                </Row>
              )}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
}
