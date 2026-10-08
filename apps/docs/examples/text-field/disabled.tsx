"use client";

import { TextField } from "@/components/ui/text-field";

export default function TextFieldDisabled() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <TextField
        label="Workspace"
        defaultValue="Acme Inc."
        isDisabled
        description="Only owners can rename the workspace."
      />
      <TextField
        label="Workspace ID"
        defaultValue="ws_01HZX4Q9K2M7"
        isReadOnly
        description="Read only: can be focused, selected and copied."
      />
    </div>
  );
}
