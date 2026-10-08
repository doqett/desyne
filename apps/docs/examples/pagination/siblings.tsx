"use client";

import { useState } from "react";
import { Paginator } from "@/components/ui/pagination";

export default function PaginationSiblings() {
  const [page, setPage] = useState(10);
  return (
    <div className="flex flex-col items-center gap-4">
      {[0, 1, 2].map((siblings) => (
        <div key={siblings} className="flex flex-col items-center gap-1.5">
          <span className="text-muted-foreground text-xs">
            siblings={siblings}
          </span>
          <Paginator
            size="sm"
            siblings={siblings}
            page={page}
            pageCount={20}
            onPageChange={setPage}
          />
        </div>
      ))}
    </div>
  );
}
