"use client";

import { Badge } from "@/components/ui/badge";
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

export default function TableDemo() {
  return (
    <Table aria-label="Invoices" className="min-w-[480px]">
      <TableHeader>
        <Column isRowHeader>Invoice</Column>
        <Column>Customer</Column>
        <Column>Status</Column>
        <Column className="text-right">Amount</Column>
      </TableHeader>
      <TableBody items={invoices}>
        {(invoice) => (
          <Row>
            <Cell className="font-medium">{invoice.id}</Cell>
            <Cell>{invoice.customer}</Cell>
            <Cell>
              <Badge
                variant="dot"
                color={tone[invoice.status as keyof typeof tone]}
              >
                {invoice.status}
              </Badge>
            </Cell>
            <Cell className="text-right tabular-nums">{invoice.amount}</Cell>
          </Row>
        )}
      </TableBody>
    </Table>
  );
}
