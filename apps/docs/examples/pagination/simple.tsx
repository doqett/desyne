"use client";

import { useState } from "react";
import { Paginator } from "@/components/ui/pagination";

export default function PaginationSimple() {
  const [page, setPage] = useState(3);
  return <Paginator simple page={page} pageCount={42} onPageChange={setPage} />;
}
