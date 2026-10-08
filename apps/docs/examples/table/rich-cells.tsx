"use client";

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

const projects = [
  {
    id: 1,
    name: "Checkout v3",
    owner: "Ana Souza",
    status: "On track",
    progress: 72,
    due: "Oct 18",
  },
  {
    id: 2,
    name: "SSO for enterprise",
    owner: "Kenji Watanabe",
    status: "At risk",
    progress: 41,
    due: "Oct 31",
  },
  {
    id: 3,
    name: "Usage-based billing",
    owner: "Maya Patel",
    status: "Blocked",
    progress: 18,
    due: "Nov 14",
  },
  {
    id: 4,
    name: "Docs search",
    owner: "Leo Fischer",
    status: "Done",
    progress: 100,
    due: "Sep 26",
  },
];
const tone = {
  "On track": "success",
  "At risk": "warning",
  Blocked: "danger",
  Done: "neutral",
} as const;

export default function TableRichCells() {
  return (
    <div className="w-full max-w-2xl">
      <Table aria-label="Projects">
        <TableHeader>
          <Column isRowHeader>Project</Column>
          <Column>Owner</Column>
          <Column>Status</Column>
          <Column className="w-40">Progress</Column>
          <Column className="text-right">Due</Column>
        </TableHeader>
        <TableBody items={projects}>
          {(p) => (
            <Row>
              <Cell className="font-medium">{p.name}</Cell>
              <Cell>
                <span className="flex items-center gap-2">
                  <Avatar
                    size="xs"
                    colorful
                    alt={p.owner}
                    fallback={p.owner
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  />
                  {p.owner}
                </span>
              </Cell>
              <Cell>
                <Badge
                  variant="soft"
                  color={tone[p.status as keyof typeof tone]}
                >
                  {p.status}
                </Badge>
              </Cell>
              <Cell>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <span
                      className="block h-full rounded-full bg-brand"
                      style={{ width: `${p.progress}%` }}
                    />
                  </span>
                  <span className="w-8 text-right text-muted-foreground text-xs tabular-nums">
                    {p.progress}%
                  </span>
                </span>
              </Cell>
              <Cell className="text-right text-muted-foreground">{p.due}</Cell>
            </Row>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
