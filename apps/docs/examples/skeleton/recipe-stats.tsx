"use client";

import { ArrowDownRightIcon, ArrowUpRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const stats = [
  { label: "Revenue", value: "$48,290", change: 12.4 },
  { label: "Active users", value: "3,812", change: 4.1 },
  { label: "Churn", value: "1.9%", change: -0.6 },
];

export default function SkeletonRecipeStats() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <div aria-busy={loading} className="grid gap-3 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex flex-col gap-2">
              <span className="text-muted-foreground text-xs">{s.label}</span>
              {loading ? (
                <>
                  <Skeleton animation="shimmer" className="h-8 w-24" />
                  <Skeleton animation="shimmer" className="h-4 w-16" />
                </>
              ) : (
                <>
                  <span className="font-semibold text-2xl tabular-nums leading-8">
                    {s.value}
                  </span>
                  <span
                    className={`flex h-4 items-center gap-1 text-xs ${s.change >= 0 ? "text-success" : "text-destructive"}`}
                  >
                    {s.change >= 0 ? (
                      <ArrowUpRightIcon className="size-3.5" />
                    ) : (
                      <ArrowDownRightIcon className="size-3.5" />
                    )}
                    {Math.abs(s.change)}% vs last month
                  </span>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="self-start"
        isDisabled={loading}
        onPress={() => setLoading(true)}
      >
        Reload
      </Button>
    </div>
  );
}
