"use client";

import { RotateCcwIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";

export default function ProgressBarLive() {
  const [value, setValue] = useState(0);
  const done = value >= 100;

  useEffect(() => {
    if (done) return;
    const timer = setInterval(
      () => setValue((v) => Math.min(100, v + Math.random() * 12)),
      400,
    );
    return () => clearInterval(timer);
  }, [done]);

  return (
    <div className="flex w-full max-w-xs flex-col items-start gap-4">
      <ProgressBar
        label={done ? "Export ready" : "Exporting report…"}
        value={value}
        color={done ? "success" : "brand"}
      />
      <Button
        size="sm"
        variant="outline"
        isDisabled={!done}
        onPress={() => setValue(0)}
      >
        <RotateCcwIcon /> Run again
      </Button>
    </div>
  );
}
