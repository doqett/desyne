"use client";

import {
  DropIndicator,
  useDragAndDrop,
  useListData,
} from "react-aria-components";
import { ListBox, ListBoxItem } from "@/components/ui/list-box";

export default function ListBoxReorder() {
  const list = useListData({
    initialItems: [
      { id: "overview", name: "Overview" },
      { id: "pricing", name: "Pricing" },
      { id: "customers", name: "Customers" },
      { id: "changelog", name: "Changelog" },
      { id: "careers", name: "Careers" },
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
    <div className="flex w-full max-w-60 flex-col gap-2">
      <ListBox
        aria-label="Navigation order"
        items={list.items}
        selectionMode="multiple"
        dragAndDropHooks={dragAndDropHooks}
      >
        {(item) => (
          <ListBoxItem className="data-dragging:opacity-50">
            {item.name}
          </ListBoxItem>
        )}
      </ListBox>
      <p className="text-muted-foreground text-xs">
        Drag to reorder, or focus an item and press Enter to start a keyboard
        drag.
      </p>
    </div>
  );
}
