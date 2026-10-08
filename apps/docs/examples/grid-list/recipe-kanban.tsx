"use client";

import {
  DropIndicator,
  type DropItem,
  isTextDropItem,
  type ListData,
  useDragAndDrop,
  useListData,
} from "react-aria-components";
import { Badge } from "@/components/ui/badge";
import {
  GridList,
  GridListItem,
  GridListItemLabel,
} from "@/components/ui/grid-list";

type Task = { id: string; title: string; priority: "High" | "Medium" | "Low" };

const TASK_TYPE = "application/x-task";
const tone = { High: "danger", Medium: "warning", Low: "neutral" } as const;

function Column({ title, list }: { title: string; list: ListData<Task> }) {
  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) =>
      [...keys].map((key) => {
        const task = list.getItem(key);
        return {
          [TASK_TYPE]: JSON.stringify(task),
          "text/plain": task?.title ?? "",
        };
      }),
    acceptedDragTypes: [TASK_TYPE],
    getDropOperation: () => "move",
    async onInsert(e) {
      const tasks = await readTasks(e.items);
      if (e.target.dropPosition === "before") {
        list.insertBefore(e.target.key, ...tasks);
      } else if (e.target.dropPosition === "after") {
        list.insertAfter(e.target.key, ...tasks);
      }
    },
    async onRootDrop(e) {
      list.append(...(await readTasks(e.items)));
    },
    onReorder(e) {
      if (e.target.dropPosition === "before") {
        list.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === "after") {
        list.moveAfter(e.target.key, e.keys);
      }
    },
    onDragEnd(e) {
      if (e.dropOperation === "move" && !e.isInternal) list.remove(...e.keys);
    },
    renderDropIndicator: (target) => (
      <DropIndicator
        target={target}
        className="-my-px h-0.5 rounded-full data-drop-target:bg-brand"
      />
    ),
  });

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <div className="flex items-center justify-between px-1">
        <span className="font-medium text-sm">{title}</span>
        <span className="text-muted-foreground text-xs tabular-nums">
          {list.items.length}
        </span>
      </div>
      <GridList
        aria-label={title}
        items={list.items}
        selectionMode="multiple"
        selectionBehavior="replace"
        dragAndDropHooks={dragAndDropHooks}
        renderEmptyState={() => "Drop tasks here"}
        className="min-h-40 bg-muted/40 data-drop-target:ring-2 data-drop-target:ring-brand/40"
      >
        {(task) => (
          <GridListItem
            textValue={task.title}
            className="border bg-card shadow-xs data-selected:border-brand/40"
          >
            <GridListItemLabel className="flex-1 whitespace-normal font-normal">
              {task.title}
            </GridListItemLabel>
            <Badge size="sm" variant="dot" color={tone[task.priority]}>
              {task.priority}
            </Badge>
          </GridListItem>
        )}
      </GridList>
    </div>
  );
}

async function readTasks(items: DropItem[]) {
  return Promise.all(
    items
      .filter(isTextDropItem)
      .map(async (item) => JSON.parse(await item.getText(TASK_TYPE)) as Task),
  );
}

export default function GridListRecipeKanban() {
  const todo = useListData<Task>({
    initialItems: [
      { id: "t1", title: "Audit onboarding emails", priority: "Medium" },
      { id: "t2", title: "Fix CSV export timeout", priority: "High" },
      { id: "t3", title: "Refresh pricing screenshots", priority: "Low" },
    ],
  });
  const doing = useListData<Task>({
    initialItems: [
      { id: "t4", title: "SSO for enterprise workspaces", priority: "High" },
    ],
  });
  const done = useListData<Task>({
    initialItems: [
      { id: "t5", title: "Migrate to the new billing API", priority: "Medium" },
    ],
  });
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4 sm:flex-row">
      <Column title="To do" list={todo} />
      <Column title="In progress" list={doing} />
      <Column title="Done" list={done} />
    </div>
  );
}
