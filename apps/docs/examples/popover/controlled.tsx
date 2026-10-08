"use client";

import {
  CheckIcon,
  CircleDashedIcon,
  CircleDotIcon,
  CircleIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverDialog,
  PopoverTrigger,
} from "@/components/ui/popover";

const statuses = [
  { id: "backlog", label: "Backlog", icon: CircleDashedIcon },
  { id: "todo", label: "Todo", icon: CircleIcon },
  { id: "progress", label: "In progress", icon: CircleDotIcon },
  { id: "done", label: "Done", icon: CheckIcon },
];

export default function PopoverControlled() {
  const [isOpen, setOpen] = useState(false);
  const [status, setStatus] = useState(statuses[2]);
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-muted-foreground">Status</span>
      <PopoverTrigger isOpen={isOpen} onOpenChange={setOpen}>
        <Button variant="outline" size="sm">
          <status.icon /> {status.label}
        </Button>
        <Popover placement="bottom start">
          <PopoverDialog aria-label="Change status" className="w-48 p-1">
            <div className="grid">
              {statuses.map((s) => (
                <Button
                  key={s.id}
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  onPress={() => {
                    setStatus(s);
                    setOpen(false);
                  }}
                >
                  <s.icon /> {s.label}
                  {s.id === status.id && <CheckIcon className="ml-auto" />}
                </Button>
              ))}
            </div>
          </PopoverDialog>
        </Popover>
      </PopoverTrigger>
    </div>
  );
}
