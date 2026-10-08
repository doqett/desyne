"use client";

import {
  CircleAlertIcon,
  CircleCheckIcon,
  FileImageIcon,
  FileTextIcon,
  FileVideoIcon,
  RotateCcwIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";

type Upload = {
  id: string;
  name: string;
  size: number;
  icon: typeof FileTextIcon;
  progress: number;
  failAt?: number;
  status: "uploading" | "done" | "failed";
};

const initial: Upload[] = [
  {
    id: "1",
    name: "Q3-report.pdf",
    size: 2.4,
    icon: FileTextIcon,
    progress: 100,
    status: "done",
  },
  {
    id: "2",
    name: "team-offsite.jpg",
    size: 5.8,
    icon: FileImageIcon,
    progress: 20,
    status: "uploading",
  },
  {
    id: "3",
    name: "product-demo.mp4",
    size: 48.2,
    icon: FileVideoIcon,
    progress: 5,
    failAt: 64,
    status: "uploading",
  },
];

export default function ProgressBarRecipeUploadList() {
  const [uploads, setUploads] = useState(initial);
  const active = uploads.some((u) => u.status === "uploading");

  useEffect(() => {
    if (!active) return;
    const timer = setInterval(() => {
      setUploads((list) =>
        list.map((u) => {
          if (u.status !== "uploading") return u;
          const progress = Math.min(100, u.progress + 30 / u.size + 2);
          if (u.failAt && progress >= u.failAt) {
            return { ...u, progress: u.failAt, status: "failed" };
          }
          return {
            ...u,
            progress,
            status: progress >= 100 ? "done" : u.status,
          };
        }),
      );
    }, 300);
    return () => clearInterval(timer);
  }, [active]);

  const retry = (id: string) =>
    setUploads((list) =>
      list.map((u) =>
        u.id === id
          ? { ...u, progress: 0, failAt: undefined, status: "uploading" }
          : u,
      ),
    );
  const remove = (id: string) =>
    setUploads((list) => list.filter((u) => u.id !== id));

  return (
    <div className="w-full max-w-md rounded-xl border bg-card">
      <div className="border-b px-4 py-3">
        <h3 className="font-medium text-sm">Uploads</h3>
      </div>
      <ul className="divide-y">
        {uploads.map((u) => {
          const Icon = u.icon;
          return (
            <li key={u.id} className="flex items-start gap-3 px-4 py-3">
              <Icon className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="truncate font-medium">{u.name}</span>
                  <span className="shrink-0 text-muted-foreground text-xs tabular-nums">
                    {u.status === "done" && `${u.size} MB`}
                    {u.status === "uploading" && `${Math.round(u.progress)}%`}
                    {u.status === "failed" && (
                      <span className="flex items-center gap-1 text-destructive">
                        <CircleAlertIcon className="size-3.5" /> Failed
                      </span>
                    )}
                  </span>
                </div>
                {u.status !== "done" && (
                  <ProgressBar
                    aria-label={`Uploading ${u.name}`}
                    value={u.progress}
                    showValue={false}
                    size="sm"
                    color={u.status === "failed" ? "danger" : "brand"}
                  />
                )}
              </div>
              {u.status === "done" && (
                <CircleCheckIcon className="mt-0.5 size-4 shrink-0 text-success" />
              )}
              {u.status === "failed" && (
                <Button
                  size="icon-xs"
                  variant="ghost"
                  aria-label={`Retry ${u.name}`}
                  onPress={() => retry(u.id)}
                >
                  <RotateCcwIcon />
                </Button>
              )}
              {u.status !== "done" && (
                <Button
                  size="icon-xs"
                  variant="ghost"
                  aria-label={`Remove ${u.name}`}
                  onPress={() => remove(u.id)}
                >
                  <XIcon />
                </Button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
