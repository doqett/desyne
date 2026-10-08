"use client";

import { RefreshCwIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoadingState() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-4">
      <div
        aria-busy={loading}
        aria-live="polite"
        className="flex w-full items-center gap-3 rounded-xl border bg-card p-4"
      >
        {loading ? (
          <>
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </>
        ) : (
          <>
            <Avatar alt="Maya Chen" fallback="MC" colorful />
            <div className="min-w-0">
              <p className="font-medium text-sm">Maya Chen</p>
              <p className="truncate text-muted-foreground text-xs">
                Product designer · Joined March 2023
              </p>
            </div>
          </>
        )}
      </div>
      <Button
        size="sm"
        variant="outline"
        isDisabled={loading}
        onPress={() => setLoading(true)}
      >
        <RefreshCwIcon /> Reload
      </Button>
    </div>
  );
}
