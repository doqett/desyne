"use client";

import { useEffect, useRef, useState } from "react";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
  TableLoadMore,
} from "@/components/ui/table";

const services = ["api", "web", "worker", "billing", "search", "auth"];
const levels = ["info", "info", "info", "warn", "error"] as const;
const messages = [
  "Request completed",
  "Cache miss, fetched from origin",
  "Retrying webhook delivery",
  "Slow query (412 ms)",
  "Token refreshed",
  "Job enqueued",
];

function makeEvents(start: number, count: number) {
  return Array.from({ length: count }, (_, k) => {
    const i = start + k;
    const t = new Date(Date.UTC(2026, 9, 5, 14, 0, 0) - i * 37_000);
    return {
      id: `evt_${(9000 - i).toString(36)}${i}`,
      time: t.toISOString().slice(11, 19),
      service: services[(i * 7) % services.length],
      level: levels[(i * 3) % levels.length],
      message: messages[(i * 5) % messages.length],
    };
  });
}

const TOTAL = 120;

export default function TableInfinite() {
  const [rows, setRows] = useState(() => makeEvents(0, 20));
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const loadMore = () => {
    if (loading || rows.length >= TOTAL) return;
    setLoading(true);
    // Simulates a paginated API call.
    timer.current = setTimeout(() => {
      setRows((r) => [...r, ...makeEvents(r.length, 20)]);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <Table
        aria-label="Event log"
        density="compact"
        containerClassName="max-h-80"
      >
        <TableHeader>
          <Column isRowHeader>Time (UTC)</Column>
          <Column>Service</Column>
          <Column>Level</Column>
          <Column>Message</Column>
        </TableHeader>
        <TableBody>
          {rows.map((e) => (
            <Row key={e.id} id={e.id}>
              <Cell className="font-mono text-xs tabular-nums">{e.time}</Cell>
              <Cell className="font-mono text-xs">{e.service}</Cell>
              <Cell>
                <span
                  className={
                    e.level === "error"
                      ? "text-destructive"
                      : e.level === "warn"
                        ? "text-warning"
                        : "text-muted-foreground"
                  }
                >
                  {e.level}
                </span>
              </Cell>
              <Cell>{e.message}</Cell>
            </Row>
          ))}
          {rows.length < TOTAL && (
            <TableLoadMore isLoading={loading} onLoadMore={loadMore} />
          )}
        </TableBody>
      </Table>
      <p className="text-muted-foreground text-xs" aria-live="polite">
        {rows.length} of {TOTAL} events
        {rows.length >= TOTAL && " · end of log"}
      </p>
    </div>
  );
}
