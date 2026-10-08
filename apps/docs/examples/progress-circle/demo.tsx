"use client";

import { useEffect, useState } from "react";
import { ProgressCircle } from "@/components/ui/progress-circle";

export default function ProgressCircleDemo() {
  const [value, setValue] = useState(18);
  useEffect(() => {
    const id = setInterval(
      () => setValue((v) => (v >= 100 ? 0 : Math.min(100, v + 7))),
      700,
    );
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex items-center gap-6">
      <ProgressCircle aria-label="Uploading photos" value={value} size="lg" />
      <ProgressCircle aria-label="Syncing" isIndeterminate />
    </div>
  );
}
