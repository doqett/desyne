"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

const positions = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
] as const;

export default function ToastPosition() {
  return (
    <div className="grid w-full max-w-md grid-cols-3 gap-2">
      {positions.map((position) => (
        <Button
          key={position}
          variant="outline"
          size="sm"
          onPress={() => toast(`Shown ${position}`, { position })}
        >
          {position}
        </Button>
      ))}
    </div>
  );
}
