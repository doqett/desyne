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

const keys = [
  { id: "k1", name: "Production", prefix: "sk_live_4f…", status: "Active" },
  { id: "k2", name: "Staging", prefix: "sk_test_91…", status: "Active" },
  {
    id: "k3",
    name: "Legacy integration",
    prefix: "sk_live_0a…",
    status: "Revoked",
  },
  { id: "k4", name: "CI pipeline", prefix: "sk_test_7c…", status: "Active" },
];

export default function TableDisabled() {
  return (
    <div className="w-full max-w-xl">
      <Table
        aria-label="API keys"
        selectionMode="multiple"
        disabledKeys={keys
          .filter((k) => k.status === "Revoked")
          .map((k) => k.id)}
      >
        <TableHeader>
          <Column isRowHeader>Name</Column>
          <Column>Key</Column>
          <Column>Status</Column>
        </TableHeader>
        <TableBody items={keys}>
          {(k) => (
            <Row className="data-disabled:text-muted-foreground">
              <Cell className="font-medium">{k.name}</Cell>
              <Cell className="font-mono text-xs">{k.prefix}</Cell>
              <Cell>
                <Badge
                  variant="dot"
                  color={k.status === "Active" ? "success" : "neutral"}
                >
                  {k.status}
                </Badge>
              </Cell>
            </Row>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
