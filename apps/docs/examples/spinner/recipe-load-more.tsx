"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const all = [
  "Fix flaky checkout test",
  "Add Slack alerts for failed deploys",
  "Migrate billing to usage-based pricing",
  "Update onboarding copy",
  "Rotate staging database credentials",
  "Add CSV export to reports",
  "Improve search ranking for docs",
  "Drop support for Node 18",
  "Audit third-party scripts",
];

export default function SpinnerRecipeLoadMore() {
  const [count, setCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const hasMore = count < all.length;

  async function loadMore() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setCount((c) => Math.min(all.length, c + 3));
    setLoading(false);
  }

  return (
    <div className="w-full max-w-sm rounded-xl border bg-card">
      <ul className="divide-y text-sm">
        {all.slice(0, count).map((title) => (
          <li key={title} className="px-4 py-2.5">
            {title}
          </li>
        ))}
      </ul>
      <div className="flex justify-center border-t p-2">
        {loading ? (
          <div className="flex h-7 items-center gap-2 text-muted-foreground text-xs">
            <Spinner size="xs" aria-hidden /> Loading more issues…
          </div>
        ) : hasMore ? (
          <Button size="sm" variant="ghost" onPress={loadMore}>
            Load more
          </Button>
        ) : (
          <p className="flex h-7 items-center text-muted-foreground text-xs">
            You're all caught up
          </p>
        )}
      </div>
    </div>
  );
}
