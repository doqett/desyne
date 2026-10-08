"use client";

import { useState } from "react";
import { Paginator } from "@/components/ui/pagination";

export default function PaginationFewPages() {
  const [page, setPage] = useState(1);
  return <Paginator page={page} pageCount={5} onPageChange={setPage} />;
}
