"use client";

import { Rating } from "@/components/ui/rating";

const breakdown = [
  { stars: 5, count: 812 },
  { stars: 4, count: 264 },
  { stars: 3, count: 71 },
  { stars: 2, count: 18 },
  { stars: 1, count: 23 },
];
const total = breakdown.reduce((n, b) => n + b.count, 0);

export default function RatingReadOnly() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <div className="flex items-end gap-3">
        <span className="font-semibold text-4xl tabular-nums leading-none">
          4.5
        </span>
        <div className="flex flex-col gap-1">
          <Rating isReadOnly value={4.5} size="sm" />
          <span className="text-muted-foreground text-xs">
            {total.toLocaleString()} reviews
          </span>
        </div>
      </div>
      <ul className="flex flex-col gap-1.5 text-xs">
        {breakdown.map((b) => (
          <li key={b.stars} className="flex items-center gap-2">
            <span className="w-3 text-muted-foreground tabular-nums">
              {b.stars}
            </span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
              <span
                className="block h-full rounded-full bg-warning"
                style={{ width: `${(b.count / total) * 100}%` }}
              />
            </span>
            <span className="w-8 text-right text-muted-foreground tabular-nums">
              {b.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
