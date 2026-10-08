"use client";

import { FolderPlusIcon, PlusIcon, UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ButtonRecipeEmptyState() {
  return (
    <div className="flex w-full max-w-md flex-col items-center rounded-xl border border-dashed px-6 py-10 text-center">
      <span className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <FolderPlusIcon className="size-5" />
      </span>
      <p className="mt-4 font-medium">No projects yet</p>
      <p className="mt-1 text-muted-foreground text-sm">
        Create your first project or import an existing one.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Button>
          <PlusIcon /> New project
        </Button>
        <Button variant="outline">
          <UploadIcon /> Import
        </Button>
      </div>
    </div>
  );
}
