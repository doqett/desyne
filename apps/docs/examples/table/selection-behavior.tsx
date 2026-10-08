"use client";

import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

const emails = [
  {
    id: 1,
    from: "Stripe",
    subject: "Your October payout is on its way",
    date: "Oct 2",
  },
  {
    id: 2,
    from: "Linear",
    subject: "Weekly digest: 14 issues closed",
    date: "Oct 1",
  },
  {
    id: 3,
    from: "Vercel",
    subject: "Deployment succeeded for web-app",
    date: "Sep 30",
  },
  {
    id: 4,
    from: "GitHub",
    subject: "[acme/api] PR #482 approved",
    date: "Sep 30",
  },
  {
    id: 5,
    from: "Figma",
    subject: "Ana shared “Checkout v3” with you",
    date: "Sep 29",
  },
];

export default function TableSelectionBehavior() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-2">
      <Table
        aria-label="Inbox"
        selectionMode="multiple"
        selectionBehavior="replace"
        density="compact"
        defaultSelectedKeys={[2]}
      >
        <TableHeader>
          <Column isRowHeader>From</Column>
          <Column>Subject</Column>
          <Column className="text-right">Date</Column>
        </TableHeader>
        <TableBody items={emails}>
          {(m) => (
            <Row>
              <Cell className="font-medium">{m.from}</Cell>
              <Cell className="max-w-64 truncate">{m.subject}</Cell>
              <Cell className="text-right text-muted-foreground">{m.date}</Cell>
            </Row>
          )}
        </TableBody>
      </Table>
      <p className="text-muted-foreground text-xs">
        Click selects a row. ⌘/Ctrl or Shift to select more.
      </p>
    </div>
  );
}
