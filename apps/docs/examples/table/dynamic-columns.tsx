"use client";

import { Columns3Icon } from "lucide-react";
import { useState } from "react";
import type { Selection } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { MenuContent, MenuItem, MenuTrigger } from "@/components/ui/menu";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

const allColumns = [
  { id: "name", name: "Customer", isRowHeader: true },
  { id: "email", name: "Email" },
  { id: "plan", name: "Plan" },
  { id: "seats", name: "Seats" },
  { id: "mrr", name: "MRR" },
  { id: "country", name: "Country" },
] as const;

type ColumnId = (typeof allColumns)[number]["id"];

const customers: ({ id: number } & Record<ColumnId, string>)[] = [
  {
    id: 1,
    name: "Northwind",
    email: "ops@northwind.io",
    plan: "Enterprise",
    seats: "240",
    mrr: "$18,400",
    country: "US",
  },
  {
    id: 2,
    name: "Fabrikam",
    email: "it@fabrikam.com",
    plan: "Business",
    seats: "56",
    mrr: "$3,920",
    country: "DE",
  },
  {
    id: 3,
    name: "Tailspin",
    email: "hello@tailspin.dev",
    plan: "Pro",
    seats: "12",
    mrr: "$480",
    country: "CA",
  },
  {
    id: 4,
    name: "Contoso",
    email: "billing@contoso.co",
    plan: "Business",
    seats: "88",
    mrr: "$6,160",
    country: "UK",
  },
];

export default function TableDynamicColumns() {
  const [visible, setVisible] = useState<Selection>(
    new Set(["name", "plan", "seats", "mrr"]),
  );
  const columns = allColumns.filter(
    (c) => c.id === "name" || visible === "all" || visible.has(c.id),
  );
  return (
    <div className="flex w-full max-w-2xl flex-col items-end gap-2">
      <MenuTrigger>
        <Button size="sm" variant="outline">
          <Columns3Icon /> Columns
        </Button>
        <MenuContent
          selectionMode="multiple"
          selectedKeys={visible}
          onSelectionChange={setVisible}
          disabledKeys={["name"]}
          items={allColumns}
          placement="bottom end"
        >
          {(c) => <MenuItem>{c.name}</MenuItem>}
        </MenuContent>
      </MenuTrigger>
      <Table aria-label="Customers">
        <TableHeader columns={columns}>
          {(c) => (
            <Column isRowHeader={"isRowHeader" in c && c.isRowHeader}>
              {c.name}
            </Column>
          )}
        </TableHeader>
        <TableBody items={customers} dependencies={[columns]}>
          {(item) => (
            <Row columns={columns}>{(c) => <Cell>{item[c.id]}</Cell>}</Row>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
