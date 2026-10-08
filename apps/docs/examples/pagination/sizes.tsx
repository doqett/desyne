"use client";

import { useState } from "react";
import { Paginator } from "@/components/ui/pagination";

export default function PaginationSizes() {
  const [page, setPage] = useState(4);
  return (
    <div className="flex flex-col items-center gap-4">
      <Paginator size="sm" page={page} pageCount={12} onPageChange={setPage} />
      <Paginator size="md" page={page} pageCount={12} onPageChange={setPage} />
    </div>
  );
}
