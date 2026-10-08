"use client";

import {
  DropZone as DropZonePrimitive,
  type DropZoneProps as DropZonePrimitiveProps,
  FileTrigger,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps } from "@/lib/primitive";

const dropZoneVariants = tv({
  base: [
    "flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-input border-dashed bg-muted/30 text-center text-sm outline-none transition-[border-color,background-color,box-shadow]",
    "data-hovered:border-brand/60",
    "data-drop-target:border-brand data-drop-target:border-solid data-drop-target:bg-accent data-drop-target:text-accent-foreground",
    "data-focus-visible:ring-(length:--ring-width) data-focus-visible:ring-ring/25 data-disabled:opacity-50",
  ],
  variants: {
    size: {
      sm: "min-h-24 p-4",
      md: "min-h-40 p-6",
      lg: "min-h-56 p-8",
    },
  },
  defaultVariants: { size: "md" },
});

export interface DropZoneProps extends DropZonePrimitiveProps {
  size?: "sm" | "md" | "lg";
}

/** Drop target for files or other drag data. Pair with `FileTrigger` for click-to-browse. */
export function DropZone({ className, size, ...props }: DropZoneProps) {
  return (
    <DropZonePrimitive
      data-slot="drop-zone"
      {...props}
      className={composeTailwindRenderProps(
        className,
        dropZoneVariants({ size }),
      )}
    />
  );
}

export { FileTrigger };
