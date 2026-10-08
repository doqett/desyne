"use client";

import { Avatar } from "@/components/ui/avatar";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

const people = [
  {
    id: "1",
    name: "Maya Chen",
    email: "maya@fernhill.studio",
    role: "Owner",
    last: "2 min ago",
  },
  {
    id: "2",
    name: "Tomás Rivera",
    email: "tomas@fernhill.studio",
    role: "Admin",
    last: "1 h ago",
  },
  {
    id: "3",
    name: "Hana Kobayashi",
    email: "hana@fernhill.studio",
    role: "Editor",
    last: "Yesterday",
  },
  {
    id: "4",
    name: "Arjun Mehta",
    email: "arjun@fernhill.studio",
    role: "Viewer",
    last: "Sep 28",
  },
];

export default function TableBleed() {
  return (
    <section className="w-full rounded-xl border bg-card px-4 py-5 sm:px-6">
      <h3 className="font-semibold">Members</h3>
      <p className="mt-1 text-muted-foreground text-sm">
        The table runs edge to edge; its first and last columns line up with
        this text.
      </p>
      <div className="mt-4">
        <Table aria-label="Workspace members" bleed>
          <TableHeader>
            <Column isRowHeader>Name</Column>
            <Column>Role</Column>
            <Column className="text-right">Last active</Column>
          </TableHeader>
          <TableBody items={people}>
            {(p) => (
              <Row>
                <Cell>
                  <span className="flex items-center gap-2.5">
                    <Avatar
                      size="sm"
                      alt={p.name}
                      fallback={p.name.slice(0, 1)}
                    />
                    <span className="flex flex-col">
                      <span className="font-medium">{p.name}</span>
                      <span className="text-muted-foreground text-xs">
                        {p.email}
                      </span>
                    </span>
                  </span>
                </Cell>
                <Cell className="text-muted-foreground">{p.role}</Cell>
                <Cell className="text-right text-muted-foreground">
                  {p.last}
                </Cell>
              </Row>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
