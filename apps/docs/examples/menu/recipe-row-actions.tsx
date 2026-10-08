"use client";

import {
  CopyIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
  TriangleAlertIcon,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogIcon,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { toast } from "@/components/ui/toast";

const initial = [
  { id: "prod", name: "Production", url: "api.lumen.app", status: "Live" },
  { id: "staging", name: "Staging", url: "staging.lumen.app", status: "Live" },
  {
    id: "preview",
    name: "PR #482 preview",
    url: "pr-482.lumen.dev",
    status: "Paused",
  },
];

type Env = (typeof initial)[number];

export default function MenuRecipeRowActions() {
  const [envs, setEnvs] = useState(initial);
  const [toDelete, setToDelete] = useState<Env | null>(null);

  return (
    <>
      <ul className="w-full max-w-md divide-y rounded-lg border bg-card">
        {envs.map((env) => (
          <li key={env.id} className="flex items-center gap-3 px-3 py-2.5">
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-sm">{env.name}</p>
              <p className="truncate text-muted-foreground text-xs">
                {env.url}
              </p>
            </div>
            <Badge
              size="sm"
              variant="dot"
              color={env.status === "Live" ? "success" : "warning"}
            >
              {env.status}
            </Badge>
            <MenuTrigger>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Actions for ${env.name}`}
              >
                <MoreHorizontalIcon />
              </Button>
              <MenuContent
                placement="bottom end"
                onAction={(key) => {
                  if (key === "delete") setToDelete(env);
                  else if (key === "copy") toast(`Copied ${env.url}`);
                  else toast(`Editing ${env.name}`);
                }}
              >
                <MenuItem id="edit" textValue="Edit">
                  <PencilIcon /> Edit
                </MenuItem>
                <MenuItem id="copy" textValue="Copy URL">
                  <CopyIcon /> Copy URL
                </MenuItem>
                <MenuSeparator />
                <MenuItem id="delete" textValue="Delete…" variant="destructive">
                  <Trash2Icon /> Delete…
                </MenuItem>
              </MenuContent>
            </MenuTrigger>
          </li>
        ))}
      </ul>

      <DialogContent
        role="alertdialog"
        size="sm"
        isOpen={toDelete !== null}
        onOpenChange={(open) => !open && setToDelete(null)}
      >
        <DialogIcon tone="danger">
          <TriangleAlertIcon />
        </DialogIcon>
        <DialogHeader>
          <DialogTitle>Delete {toDelete?.name}?</DialogTitle>
          <DialogDescription>
            {toDelete?.url} will stop responding immediately. This can't be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose autoFocus>Cancel</DialogClose>
          <Button
            color="danger"
            onPress={() => {
              setEnvs((list) => list.filter((e) => e.id !== toDelete?.id));
              setToDelete(null);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
}
