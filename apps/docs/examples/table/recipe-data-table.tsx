"use client";

import { DownloadIcon, ListFilterIcon, TrashIcon } from "lucide-react";
import { useMemo, useState } from "react";
import type { Key, Selection, SortDescriptor } from "react-aria-components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Paginator } from "@/components/ui/pagination";
import { SearchField } from "@/components/ui/search-field";
import { Select, SelectItem } from "@/components/ui/select";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

type Status = "Paid" | "Pending" | "Overdue" | "Refunded";
type Invoice = {
  id: string;
  customer: string;
  status: Status;
  amount: number;
  issued: string;
};

const customers = [
  "Acme Corp",
  "Globex",
  "Initech",
  "Umbrella",
  "Hooli",
  "Stark Industries",
  "Wayne Enterprises",
  "Soylent",
  "Tyrell",
  "Cyberdyne",
];
const statuses: Status[] = [
  "Paid",
  "Paid",
  "Pending",
  "Overdue",
  "Paid",
  "Refunded",
];
const invoices: Invoice[] = Array.from({ length: 23 }, (_, i) => ({
  id: `INV-${1040 + i}`,
  customer: customers[(i * 7) % customers.length],
  status: statuses[(i * 5) % statuses.length],
  amount: 180 + ((i * 7919) % 4200),
  issued: `2026-${String(9 - Math.floor(i / 9)).padStart(2, "0")}-${String(28 - (i % 9) * 3).padStart(2, "0")}`,
}));
const tone = {
  Paid: "success",
  Pending: "warning",
  Overdue: "danger",
  Refunded: "neutral",
} as const;
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const PAGE_SIZE = 6;

export default function TableRecipeDataTable() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Key | null>("all");
  const [sort, setSort] = useState<SortDescriptor>({
    column: "issued",
    direction: "descending",
  });
  const [selected, setSelected] = useState<Selection>(new Set());
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = invoices.filter(
      (inv) =>
        (status === "all" || inv.status === status) &&
        (!q ||
          inv.customer.toLowerCase().includes(q) ||
          inv.id.toLowerCase().includes(q)),
    );
    const key = sort.column as keyof Invoice;
    return rows.sort((a, b) => {
      const cmp =
        typeof a[key] === "number"
          ? (a[key] as number) - (b[key] as number)
          : String(a[key]).localeCompare(String(b[key]));
      return sort.direction === "descending" ? -cmp : cmp;
    });
  }, [query, status, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const count = selected === "all" ? filtered.length : selected.size;

  return (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {count > 0 ? (
          <>
            <span className="font-medium text-sm">{count} selected</span>
            <Button size="sm" variant="outline">
              <DownloadIcon /> Export
            </Button>
            <Button size="sm" variant="outline" color="danger">
              <TrashIcon /> Void
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onPress={() => setSelected(new Set())}
            >
              Clear
            </Button>
          </>
        ) : (
          <>
            <SearchField
              aria-label="Search invoices"
              placeholder="Search customer or invoice…"
              size="sm"
              value={query}
              onChange={(v) => {
                setQuery(v);
                setPage(1);
              }}
              className="min-w-48 flex-1"
            />
            <Select
              aria-label="Status"
              size="sm"
              prefix={<ListFilterIcon />}
              selectedKey={status}
              onSelectionChange={(k) => {
                setStatus(k);
                setPage(1);
              }}
              className="w-40"
            >
              <SelectItem id="all">All statuses</SelectItem>
              <SelectItem id="Paid">Paid</SelectItem>
              <SelectItem id="Pending">Pending</SelectItem>
              <SelectItem id="Overdue">Overdue</SelectItem>
              <SelectItem id="Refunded">Refunded</SelectItem>
            </Select>
          </>
        )}
      </div>
      <Table
        aria-label="Invoices"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        sortDescriptor={sort}
        onSortChange={setSort}
      >
        <TableHeader>
          <Column id="id" isRowHeader allowsSorting>
            Invoice
          </Column>
          <Column id="customer" allowsSorting>
            Customer
          </Column>
          <Column id="status">Status</Column>
          <Column id="issued" allowsSorting>
            Issued
          </Column>
          <Column id="amount" allowsSorting className="text-right">
            Amount
          </Column>
        </TableHeader>
        <TableBody
          items={rows}
          renderEmptyState={() => "No invoices match your filters."}
        >
          {(inv) => (
            <Row>
              <Cell className="font-medium">{inv.id}</Cell>
              <Cell>{inv.customer}</Cell>
              <Cell>
                <Badge variant="dot" color={tone[inv.status]}>
                  {inv.status}
                </Badge>
              </Cell>
              <Cell className="text-muted-foreground tabular-nums">
                {inv.issued}
              </Cell>
              <Cell className="text-right tabular-nums">
                {currency.format(inv.amount)}
              </Cell>
            </Row>
          )}
        </TableBody>
      </Table>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-muted-foreground text-xs">
          {filtered.length} invoices
        </span>
        <Paginator
          page={current}
          pageCount={pageCount}
          onPageChange={setPage}
          size="sm"
        />
      </div>
    </div>
  );
}
