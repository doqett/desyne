"use client";

import { DownloadIcon, FileArchiveIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { toast } from "@/components/ui/toast";

function ExportToast({ value }: { value: number }) {
  return (
    <div className="flex w-(--width) gap-3 rounded-lg bg-popover p-4 text-popover-foreground">
      <FileArchiveIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="font-medium text-sm">Exporting workspace</p>
        <ProgressBar
          aria-label="Export progress"
          value={value}
          size="sm"
          showValue={false}
        />
        <p className="text-muted-foreground text-xs tabular-nums">
          {Math.round(value)}% · workspace-export.zip
        </p>
      </div>
    </div>
  );
}

export default function ToastRecipeExportProgress() {
  async function start() {
    const id = toast.custom(() => <ExportToast value={0} />, {
      duration: Number.POSITIVE_INFINITY,
    });
    for (let value = 10; value <= 100; value += 10) {
      await new Promise((r) => setTimeout(r, 350));
      toast.custom(() => <ExportToast value={value} />, {
        id,
        duration: Number.POSITIVE_INFINITY,
      });
    }
    // A custom toast can't turn back into a standard one, so swap it out.
    toast.dismiss(id);
    toast.success("Export ready", {
      description: "workspace-export.zip · 184 MB",
      duration: 6000,
      action: { label: "Download", onClick: () => {} },
    });
  }

  return (
    <Button variant="outline" onPress={start}>
      <DownloadIcon /> Export workspace
    </Button>
  );
}
