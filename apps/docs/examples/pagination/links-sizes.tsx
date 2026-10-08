"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationLinksSizes() {
  return (
    <div className="flex flex-col items-center gap-4">
      {(["sm", "md"] as const).map((size) => (
        <Pagination key={size}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" size={size} />
            </PaginationItem>
            {[1, 2, 3].map((p) => (
              <PaginationItem key={p}>
                <PaginationLink href="#" size={size} isActive={p === 1}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" size={size} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ))}
    </div>
  );
}
