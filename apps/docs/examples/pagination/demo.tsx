"use client";

import { useState } from "react";
import { Paginator } from "@/components/ui/pagination";

export default function PaginationDemo() {
  const [page, setPage] = useState(5);
  return <Paginator page={page} pageCount={20} onPageChange={setPage} />;
}
