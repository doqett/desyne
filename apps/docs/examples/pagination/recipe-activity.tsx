"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Paginator } from "@/components/ui/pagination";

const events = [
  { who: "Maya Chen", what: "deployed acme-web to production", when: "2m ago" },
  {
    who: "Omar Farouk",
    what: "merged #482 Add checkout retries",
    when: "18m ago",
  },
  { who: "Lena Park", what: "invited 3 people to Growth", when: "1h ago" },
  { who: "Maya Chen", what: "rotated the Stripe API key", when: "3h ago" },
  { who: "Diego Ruiz", what: "opened #489 Flaky login test", when: "5h ago" },
  {
    who: "Lena Park",
    what: "changed the billing plan to Pro",
    when: "Yesterday",
  },
  {
    who: "Omar Farouk",
    what: "deleted the staging-old branch",
    when: "Yesterday",
  },
  { who: "Diego Ruiz", what: "created the Q4 roadmap doc", when: "2d ago" },
  { who: "Maya Chen", what: "enabled SSO for acme.dev", when: "3d ago" },
];

const pageSize = 3;

export default function PaginationRecipeActivity() {
  const [page, setPage] = useState(1);
  const items = events.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>
          Everything that happened in your workspace.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-4">
          {items.map((e) => (
            <li
              key={`${e.who}-${e.what}`}
              className="flex items-start gap-3 text-sm"
            >
              <Avatar
                size="sm"
                colorful
                fallback={e.who
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
                alt={e.who}
              />
              <div className="grid gap-0.5">
                <span>
                  <span className="font-medium">{e.who}</span>{" "}
                  <span className="text-muted-foreground">{e.what}</span>
                </span>
                <span className="text-muted-foreground text-xs">{e.when}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="border-t">
        <Paginator
          simple
          size="sm"
          page={page}
          pageCount={Math.ceil(events.length / pageSize)}
          onPageChange={setPage}
          className="justify-end"
        />
      </CardFooter>
    </Card>
  );
}
