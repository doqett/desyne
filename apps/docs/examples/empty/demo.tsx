"use client";

import { FolderOpenIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyActions,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function EmptyDemo() {
  return (
    <Empty>
      <EmptyMedia variant="icon">
        <FolderOpenIcon />
      </EmptyMedia>
      <EmptyTitle>No projects yet</EmptyTitle>
      <EmptyDescription>
        Projects group your docs, tasks and files. Create one to get started, or
        import from Linear or Jira.
      </EmptyDescription>
      <EmptyActions>
        <Button>
          <PlusIcon />
          New project
        </Button>
        <Button variant="outline">Import</Button>
      </EmptyActions>
    </Empty>
  );
}
