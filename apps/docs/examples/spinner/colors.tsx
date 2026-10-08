"use client";

import { Spinner } from "@/components/ui/spinner";

export default function SpinnerColors() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <span className="text-muted-foreground">
        <Spinner size="md" />
      </span>
      <Spinner size="md" color="primary" />
      <Spinner size="md" color="brand" />
      <Spinner size="md" color="info" />
      <Spinner size="md" color="success" />
      <Spinner size="md" color="warning" />
      <Spinner size="md" color="danger" />
    </div>
  );
}
