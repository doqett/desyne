"use client";

import { useMemo, useState } from "react";
import type { Selection, SortDescriptor } from "react-aria-components";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

const users = [
  { id: 1, name: "Olivia Martin", email: "olivia@acme.com", role: "Admin" },
  { id: 2, name: "Jackson Lee", email: "jackson@acme.com", role: "Member" },
  { id: 3, name: "Isabella Nguyen", email: "isabella@acme.com", role: "Owner" },
  { id: 4, name: "William Kim", email: "will@acme.com", role: "Member" },
];
type User = (typeof users)[number];

export default function TableSelectionSorting() {
  const [sort, setSort] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [selected, setSelected] = useState<Selection>(new Set([2]));
  const items = useMemo(() => {
    const key = sort.column as keyof User;
    return [...users].sort((a, b) => {
      const cmp = String(a[key]).localeCompare(String(b[key]));
      return sort.direction === "descending" ? -cmp : cmp;
    });
  }, [sort]);
  const count = selected === "all" ? users.length : selected.size;
  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-muted-foreground text-xs">{count} selected</p>
      <Table
        aria-label="Members"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        sortDescriptor={sort}
        onSortChange={setSort}
        className="min-w-[420px]"
      >
        <TableHeader>
          <Column id="name" isRowHeader allowsSorting>
            Name
          </Column>
          <Column id="role" allowsSorting>
            Role
          </Column>
        </TableHeader>
        <TableBody items={items}>
          {(user) => (
            <Row>
              <Cell>
                <div className="flex items-center gap-2.5">
                  <Avatar
                    size="sm"
                    colorful
                    alt={user.name}
                    fallback={user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-muted-foreground text-xs">
                      {user.email}
                    </span>
                  </div>
                </div>
              </Cell>
              <Cell>
                <Badge color={user.role === "Owner" ? "primary" : "neutral"}>
                  {user.role}
                </Badge>
              </Cell>
            </Row>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
