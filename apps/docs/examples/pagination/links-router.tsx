"use client";

import { useState } from "react";
import { RouterProvider } from "react-aria-components";
import {
  getPageRange,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const pageCount = 24;

export default function PaginationLinksRouter() {
  // Stand-in for your router. In Next.js read `useSearchParams()` and pass
  // `useRouter().push` to RouterProvider in your app's providers.
  const [page, setPage] = useState(1);
  const href = (p: number) => `?page=${p}`;

  return (
    <RouterProvider
      navigate={(to) => setPage(Number(new URLSearchParams(to).get("page")))}
    >
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={href(page - 1)} isDisabled={page <= 1} />
          </PaginationItem>
          {getPageRange(page, pageCount).map((p, i) =>
            p === "ellipsis" ? (
              // biome-ignore lint/suspicious/noArrayIndexKey: at most two ellipses
              <PaginationItem key={`e${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  href={href(p)}
                  isActive={p === page}
                  aria-label={`Page ${p}`}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            <PaginationNext
              href={href(page + 1)}
              isDisabled={page >= pageCount}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </RouterProvider>
  );
}
