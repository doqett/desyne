"use client";

import { GripVerticalIcon } from "lucide-react";
import { Button, useDragAndDrop, useListData } from "react-aria-components";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

export default function TableReorder() {
  const list = useListData({
    initialItems: [
      { id: "email", channel: "Email", delay: "Immediately" },
      { id: "slack", channel: "Slack #on-call", delay: "After 5 min" },
      { id: "sms", channel: "SMS", delay: "After 10 min" },
      { id: "phone", channel: "Phone call", delay: "After 15 min" },
    ],
  });
  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) =>
      [...keys].map((key) => ({
        "text/plain": list.getItem(key)?.channel ?? "",
      })),
    onReorder(e) {
      if (e.target.dropPosition === "before") {
        list.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === "after") {
        list.moveAfter(e.target.key, e.keys);
      }
    },
  });
  return (
    <div className="w-full max-w-lg">
      <Table aria-label="Escalation policy" dragAndDropHooks={dragAndDropHooks}>
        <TableHeader>
          <Column className="w-8">
            <span className="sr-only">Reorder</span>
          </Column>
          <Column className="w-10">Step</Column>
          <Column isRowHeader>Channel</Column>
          <Column>Notify</Column>
        </TableHeader>
        <TableBody items={list.items} dependencies={[list.items]}>
          {(item) => (
            <Row className="data-dragging:opacity-50 data-drop-target:bg-accent">
              <Cell>
                <Button
                  slot="drag"
                  className="flex cursor-grab items-center text-muted-foreground outline-none data-focus-visible:ring-2 data-focus-visible:ring-ring/30"
                >
                  <GripVerticalIcon aria-hidden className="size-4" />
                </Button>
              </Cell>
              <Cell className="text-muted-foreground tabular-nums">
                {list.items.indexOf(item) + 1}
              </Cell>
              <Cell className="font-medium">{item.channel}</Cell>
              <Cell>{item.delay}</Cell>
            </Row>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
