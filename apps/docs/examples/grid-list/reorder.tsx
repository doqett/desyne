"use client";

import {
  DropIndicator,
  useDragAndDrop,
  useListData,
} from "react-aria-components";
import { GridList, GridListItem } from "@/components/ui/grid-list";

export default function GridListReorder() {
  const list = useListData({
    initialItems: [
      { id: "1", name: "Triage new alerts" },
      { id: "2", name: "Review access requests" },
      { id: "3", name: "Rotate API keys" },
      { id: "4", name: "Update runbooks" },
      { id: "5", name: "Plan the next game day" },
    ],
  });
  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) =>
      [...keys].map((key) => ({ "text/plain": list.getItem(key)?.name ?? "" })),
    onReorder(e) {
      if (e.target.dropPosition === "before") {
        list.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === "after") {
        list.moveAfter(e.target.key, e.keys);
      }
    },
    renderDropIndicator: (target) => (
      <DropIndicator
        target={target}
        className="-my-px h-0.5 rounded-full data-drop-target:bg-brand"
      />
    ),
  });
  return (
    <GridList
      aria-label="Priorities"
      items={list.items}
      selectionMode="multiple"
      dragAndDropHooks={dragAndDropHooks}
      className="w-full max-w-80"
    >
      {(item) => <GridListItem>{item.name}</GridListItem>}
    </GridList>
  );
}
