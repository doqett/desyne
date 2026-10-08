"use client";

import { FileTextIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

const initial = [
  { id: "1", name: "Launch plan.md", edited: "2 hours ago" },
  { id: "2", name: "Pricing research.md", edited: "Yesterday" },
  { id: "3", name: "Interview notes.md", edited: "May 28" },
  { id: "4", name: "Retro — sprint 42.md", edited: "May 21" },
];

export default function ToastRecipeUndoDelete() {
  const [docs, setDocs] = useState(initial);

  function remove(doc: (typeof initial)[number]) {
    const index = docs.findIndex((d) => d.id === doc.id);
    setDocs((list) => list.filter((d) => d.id !== doc.id));
    toast(`Deleted “${doc.name}”`, {
      action: {
        label: "Undo",
        onClick: () =>
          setDocs((list) => {
            const next = [...list];
            next.splice(index, 0, doc);
            return next;
          }),
      },
      // Commit the delete on the server only once the undo window has passed.
      onAutoClose: () => console.log(`DELETE /docs/${doc.id}`),
    });
  }

  return (
    <div className="w-full max-w-sm rounded-xl border bg-card">
      {docs.length === 0 ? (
        <div className="flex flex-col items-center gap-2 p-6 text-center">
          <p className="text-muted-foreground text-sm">No documents</p>
          <Button size="sm" variant="outline" onPress={() => setDocs(initial)}>
            Reset
          </Button>
        </div>
      ) : (
        <ul className="divide-y">
          {docs.map((doc) => (
            <li key={doc.id} className="flex items-center gap-3 px-4 py-2.5">
              <FileTextIcon className="size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-sm">{doc.name}</p>
                <p className="text-muted-foreground text-xs">
                  Edited {doc.edited}
                </p>
              </div>
              <Button
                size="icon-sm"
                variant="ghost"
                aria-label={`Delete ${doc.name}`}
                onPress={() => remove(doc)}
              >
                <Trash2Icon />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
