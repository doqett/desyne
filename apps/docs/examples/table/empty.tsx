"use client";

import { SearchXIcon } from "lucide-react";
import { Column, Table, TableBody, TableHeader } from "@/components/ui/table";

export default function TableEmpty() {
  return (
    <Table aria-label="Alerts" className="min-w-[420px]">
      <TableHeader>
        <Column isRowHeader>Alert</Column>
        <Column>Severity</Column>
        <Column>Time</Column>
      </TableHeader>
      <TableBody
        renderEmptyState={() => (
          <div className="flex flex-col items-center gap-2 py-4">
            <SearchXIcon className="size-6 text-muted-foreground/60" />
            <span>No alerts match your filters.</span>
          </div>
        )}
      >
        {[]}
      </TableBody>
    </Table>
  );
}
