"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CardLoading() {
  return (
    <Card className="w-full max-w-sm" aria-busy="true" aria-label="Loading">
      <CardHeader>
        <Skeleton className="h-5 w-32" />
        <Skeleton className="mt-1 h-3.5 w-48" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Skeleton className="h-24 w-full rounded-lg" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-4/5" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-8 w-24" />
      </CardFooter>
    </Card>
  );
}
