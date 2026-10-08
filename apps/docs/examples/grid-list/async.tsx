"use client";

import {
  Collection,
  GridListLoadMoreItem,
  useAsyncList,
} from "react-aria-components";
import { Avatar } from "@/components/ui/avatar";
import {
  GridList,
  GridListItem,
  GridListItemDescription,
  GridListItemLabel,
} from "@/components/ui/grid-list";
import { Spinner } from "@/components/ui/spinner";

const first = [
  "Ana",
  "Kenji",
  "Sam",
  "Inès",
  "Maya",
  "Leo",
  "Priya",
  "Omar",
  "Lena",
  "Diego",
  "Yuki",
  "Tom",
];
const last = [
  "Souza",
  "Watanabe",
  "Okafor",
  "Laurent",
  "Patel",
  "Fischer",
  "Nair",
  "Haddad",
];
const people = Array.from({ length: 36 }, (_, i) => {
  const name = `${first[i % first.length]} ${last[(i * 5) % last.length]}`;
  return {
    id: String(i + 1),
    name,
    email: `${name.toLowerCase().replace(/[^a-z]+/g, ".")}@acme.dev`,
  };
});

export default function GridListAsync() {
  const list = useAsyncList<(typeof people)[number]>({
    async load({ cursor }) {
      // Replace with a real request that returns the next page and cursor.
      const start = cursor ? Number(cursor) : 0;
      await new Promise((resolve) => setTimeout(resolve, 700));
      const next = start + 8;
      return {
        items: people.slice(start, next),
        cursor: next < people.length ? String(next) : undefined,
      };
    },
  });
  return (
    <GridList
      aria-label="Members"
      selectionMode="multiple"
      className="h-72 w-full max-w-80"
      renderEmptyState={() =>
        list.isLoading ? (
          <Spinner label="Loading members" className="mx-auto" />
        ) : (
          "No members."
        )
      }
    >
      <Collection items={list.items}>
        {(p) => (
          <GridListItem textValue={p.name}>
            <Avatar
              size="sm"
              colorful
              alt={p.name}
              fallback={p.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            />
            <span className="flex min-w-0 flex-col">
              <GridListItemLabel>{p.name}</GridListItemLabel>
              <GridListItemDescription>{p.email}</GridListItemDescription>
            </span>
          </GridListItem>
        )}
      </Collection>
      <GridListLoadMoreItem
        onLoadMore={list.loadMore}
        isLoading={list.loadingState === "loadingMore"}
        className="flex justify-center py-2"
      >
        <Spinner label="Loading more members" />
      </GridListLoadMoreItem>
    </GridList>
  );
}
