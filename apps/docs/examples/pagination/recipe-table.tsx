"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Paginator } from "@/components/ui/pagination";
import { Select, SelectItem } from "@/components/ui/select";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

const customers = [
  "Acme Corp",
  "Globex",
  "Initech",
  "Umbrella",
  "Hooli",
  "Stark Industries",
  "Wayne Enterprises",
];
const statuses = ["Paid", "Pending", "Overdue"] as const;
const tone = {
  Paid: "success",
  Pending: "warning",
  Overdue: "danger",
} as const;

const invoices = Array.from({ length: 57 }, (_, i) => ({
  id: `INV-${1001 + i}`,
  customer: customers[i % customers.length],
  status: statuses[(i * 7) % 3],
  amount: `$${(((i * 37) % 40) * 125 + 480).toLocaleString()}.00`,
}));

export default function PaginationRecipeTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const pageCount = Math.ceil(invoices.length / pageSize);
  const start = (page - 1) * pageSize;
  const rows = invoices.slice(start, start + pageSize);

  return (
    <div className="grid w-full max-w-2xl gap-3">
      <Table aria-label="Invoices" className="min-w-[480px]">
        <TableHeader>
          <Column isRowHeader>Invoice</Column>
          <Column>Customer</Column>
          <Column>Status</Column>
          <Column className="text-right">Amount</Column>
        </TableHeader>
        <TableBody items={rows}>
          {(invoice) => (
            <Row>
              <Cell className="font-medium">{invoice.id}</Cell>
              <Cell>{invoice.customer}</Cell>
              <Cell>
                <Badge variant="dot" color={tone[invoice.status]}>
                  {invoice.status}
                </Badge>
              </Cell>
              <Cell className="text-right tabular-nums">{invoice.amount}</Cell>
            </Row>
          )}
        </TableBody>
      </Table>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <span id="rows-per-page">Rows per page</span>
          <Select
            aria-labelledby="rows-per-page"
            size="sm"
            className="w-20"
            selectedKey={String(pageSize)}
            onSelectionChange={(key) => {
              setPageSize(Number(key));
              setPage(1);
            }}
          >
            <SelectItem id="5">5</SelectItem>
            <SelectItem id="10">10</SelectItem>
            <SelectItem id="20">20</SelectItem>
          </Select>
        </div>
        <span className="text-muted-foreground text-sm tabular-nums">
          {start + 1}–{Math.min(start + pageSize, invoices.length)} of{" "}
          {invoices.length}
        </span>
        <Paginator
          size="sm"
          page={page}
          pageCount={pageCount}
          onPageChange={setPage}
          className="mx-0 w-auto"
        />
      </div>
    </div>
  );
}
