"use client";

import { FileSpreadsheetIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";

const total = 4800;
type Phase = "idle" | "analyzing" | "importing" | "done";

export default function ProgressBarRecipeImport() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [rows, setRows] = useState(0);

  useEffect(() => {
    if (phase === "analyzing") {
      const timer = setTimeout(() => setPhase("importing"), 1500);
      return () => clearTimeout(timer);
    }
    if (phase === "importing") {
      if (rows >= total) {
        setPhase("done");
        return;
      }
      const timer = setTimeout(
        () => setRows((r) => Math.min(total, r + 320)),
        150,
      );
      return () => clearTimeout(timer);
    }
  }, [phase, rows]);

  const start = () => {
    setRows(0);
    setPhase("analyzing");
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
          <FileSpreadsheetIcon className="size-4.5 text-muted-foreground" />
        </div>
        <div className="min-w-0">
          <p className="truncate font-medium text-sm">customers-2024.csv</p>
          <p className="text-muted-foreground text-xs">
            1.8 MB · {total.toLocaleString()} rows
          </p>
        </div>
      </div>

      {phase === "analyzing" && (
        <ProgressBar label="Analyzing columns…" isIndeterminate size="sm" />
      )}
      {(phase === "importing" || phase === "done") && (
        <ProgressBar
          label={phase === "done" ? "Import complete" : "Importing customers"}
          value={rows}
          maxValue={total}
          valueLabel={`${rows.toLocaleString()} of ${total.toLocaleString()} rows`}
          color={phase === "done" ? "success" : "brand"}
          size="sm"
        />
      )}

      <div className="flex justify-end gap-2">
        {phase === "idle" || phase === "done" ? (
          <Button size="sm" onPress={start}>
            {phase === "done" ? "Import again" : "Start import"}
          </Button>
        ) : (
          <Button size="sm" variant="outline" onPress={() => setPhase("idle")}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
