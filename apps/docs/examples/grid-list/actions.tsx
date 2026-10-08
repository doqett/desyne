"use client";

import {
  CopyIcon,
  MoreHorizontalIcon,
  PencilIcon,
  StarIcon,
  TrashIcon,
} from "lucide-react";
import { useListData } from "react-aria-components";
import { Button } from "@/components/ui/button";
import {
  GridList,
  GridListItem,
  GridListItemDescription,
  GridListItemLabel,
} from "@/components/ui/grid-list";
import { MenuContent, MenuItem, MenuTrigger } from "@/components/ui/menu";

export default function GridListActions() {
  const list = useListData({
    initialItems: [
      {
        id: "1",
        name: "Onboarding flow",
        updated: "Edited 2h ago",
        starred: true,
      },
      {
        id: "2",
        name: "Pricing page redesign",
        updated: "Edited yesterday",
        starred: false,
      },
      { id: "3", name: "Mobile nav", updated: "Edited Sep 20", starred: false },
    ],
  });
  return (
    <GridList
      aria-label="Designs"
      items={list.items}
      onAction={(key) => {
        const item = list.getItem(key);
        if (item) list.update(key, { ...item, updated: "Opened just now" });
      }}
      className="w-full max-w-96"
    >
      {(item) => (
        <GridListItem textValue={item.name}>
          <span className="flex min-w-0 flex-1 flex-col">
            <GridListItemLabel>{item.name}</GridListItemLabel>
            <GridListItemDescription>{item.updated}</GridListItemDescription>
          </span>
          <Button
            size="icon-sm"
            variant="ghost"
            aria-label={item.starred ? "Unstar" : "Star"}
            onPress={() =>
              list.update(item.id, { ...item, starred: !item.starred })
            }
          >
            <StarIcon
              className={item.starred ? "fill-warning text-warning" : ""}
            />
          </Button>
          <MenuTrigger>
            <Button size="icon-sm" variant="ghost" aria-label="More actions">
              <MoreHorizontalIcon />
            </Button>
            <MenuContent placement="bottom end">
              <MenuItem textValue="Rename">
                <PencilIcon /> Rename
              </MenuItem>
              <MenuItem textValue="Duplicate">
                <CopyIcon /> Duplicate
              </MenuItem>
              <MenuItem
                textValue="Delete"
                variant="destructive"
                onAction={() => list.remove(item.id)}
              >
                <TrashIcon /> Delete
              </MenuItem>
            </MenuContent>
          </MenuTrigger>
        </GridListItem>
      )}
    </GridList>
  );
}
