"use client";

import { TextareaField } from "@/components/ui/textarea";

export default function TextareaResize() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <TextareaField
        label="Vertical (default)"
        rows={3}
        description="Drag the corner to resize."
        defaultValue="Users can make this taller or shorter."
      />
      <TextareaField
        label="None"
        resize="none"
        rows={3}
        description="Fixed height; content scrolls."
        defaultValue="The height stays at three rows no matter what."
      />
      <TextareaField
        label="Auto"
        resize="auto"
        description="Grows with its content."
        defaultValue={
          "Type a few more lines here.\nThe field grows to fit them."
        }
      />
    </div>
  );
}
