"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function SpinnerOverlay() {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!refreshing) return;
    const timer = setTimeout(() => setRefreshing(false), 1500);
    return () => clearTimeout(timer);
  }, [refreshing]);

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div
        aria-busy={refreshing}
        className="relative overflow-hidden rounded-xl border bg-card p-4"
      >
        <p className="font-medium text-sm">Exchange rates</p>
        <dl className="mt-3 grid grid-cols-2 gap-y-1.5 text-sm">
          <dt className="text-muted-foreground">USD → EUR</dt>
          <dd className="text-right tabular-nums">0.9214</dd>
          <dt className="text-muted-foreground">USD → GBP</dt>
          <dd className="text-right tabular-nums">0.7862</dd>
          <dt className="text-muted-foreground">USD → JPY</dt>
          <dd className="text-right tabular-nums">156.31</dd>
        </dl>
        {refreshing && (
          <div className="absolute inset-0 flex items-center justify-center bg-card/70 backdrop-blur-[1px]">
            <Spinner size="lg" color="brand" label="Refreshing rates" />
          </div>
        )}
      </div>
      <Button
        size="sm"
        variant="outline"
        className="self-start"
        isDisabled={refreshing}
        onPress={() => setRefreshing(true)}
      >
        Refresh
      </Button>
    </div>
  );
}
