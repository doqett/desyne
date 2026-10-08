"use client";

import { useEffect, useState } from "react";
import { ProgressBar } from "@/components/ui/progress-bar";

export default function ProgressBarDemo() {
  const [value, setValue] = useState(18);
  useEffect(() => {
    const timer = setTimeout(() => setValue(68), 600);
    return () => clearTimeout(timer);
  }, []);
  return (
    <ProgressBar className="max-w-xs" label="Uploading files" value={value} />
  );
}
