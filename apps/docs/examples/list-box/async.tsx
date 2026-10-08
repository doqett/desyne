"use client";

import {
  Collection,
  ListBoxLoadMoreItem,
  useAsyncList,
} from "react-aria-components";
import { ListBox, ListBoxItem } from "@/components/ui/list-box";
import { Spinner } from "@/components/ui/spinner";

const packages = [
  "react",
  "react-dom",
  "next",
  "typescript",
  "tailwindcss",
  "vite",
  "zod",
  "date-fns",
  "lodash-es",
  "axios",
  "express",
  "prisma",
  "drizzle-orm",
  "vitest",
  "playwright",
  "eslint",
  "prettier",
  "biome",
  "turbo",
  "esbuild",
  "rollup",
  "webpack",
  "postcss",
  "autoprefixer",
  "clsx",
  "tailwind-merge",
  "lucide-react",
  "framer-motion",
  "zustand",
  "jotai",
  "swr",
  "@tanstack/react-query",
  "react-hook-form",
  "react-aria-components",
  "@internationalized/date",
  "sonner",
  "recharts",
  "shiki",
  "unified",
  "remark",
];

const PAGE_SIZE = 10;

export default function ListBoxAsync() {
  const list = useAsyncList<{ name: string }>({
    async load({ cursor }) {
      // Replace with a real request, e.g. fetch(`/api/packages?cursor=${cursor}`).
      const start = cursor ? Number(cursor) : 0;
      await new Promise((resolve) => setTimeout(resolve, 700));
      const page = packages.slice(start, start + PAGE_SIZE);
      const next = start + PAGE_SIZE;
      return {
        items: page.map((name) => ({ name })),
        cursor: next < packages.length ? String(next) : undefined,
      };
    },
  });

  return (
    <ListBox
      aria-label="Packages"
      selectionMode="multiple"
      className="h-64 w-full max-w-64"
      renderEmptyState={() =>
        list.isLoading ? (
          <Spinner label="Loading packages" className="mx-auto" />
        ) : (
          "No packages found."
        )
      }
    >
      <Collection items={list.items}>
        {(item) => (
          <ListBoxItem id={item.name} className="font-mono text-xs">
            {item.name}
          </ListBoxItem>
        )}
      </Collection>
      <ListBoxLoadMoreItem
        onLoadMore={list.loadMore}
        isLoading={list.loadingState === "loadingMore"}
        className="flex justify-center py-2"
      >
        <Spinner label="Loading more packages" />
      </ListBoxLoadMoreItem>
    </ListBox>
  );
}
