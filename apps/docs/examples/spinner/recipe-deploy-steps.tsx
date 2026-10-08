"use client";

import { CircleCheckIcon, CircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const steps = [
  "Cloning repository",
  "Installing dependencies",
  "Building application",
  "Uploading assets",
  "Assigning domain",
];

export default function SpinnerRecipeDeploySteps() {
  const [current, setCurrent] = useState(0);
  const done = current >= steps.length;

  useEffect(() => {
    if (done) return;
    const timer = setInterval(() => setCurrent((c) => c + 1), 1100);
    return () => clearInterval(timer);
  }, [done]);

  return (
    <div className="w-full max-w-sm rounded-xl border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-medium text-sm">
          {done ? "Deployed to production" : "Deploying acme-web"}
        </p>
        <Button
          size="xs"
          variant="ghost"
          isDisabled={!done}
          onPress={() => setCurrent(0)}
        >
          Redeploy
        </Button>
      </div>
      <ol className="grid gap-2.5 text-sm">
        {steps.map((step, i) => (
          <li
            key={step}
            className={cn(
              "flex items-center gap-2.5",
              i > current && "text-muted-foreground",
            )}
          >
            {i < current && (
              <CircleCheckIcon className="size-4 text-success" aria-hidden />
            )}
            {i === current && <Spinner color="brand" aria-hidden />}
            {i > current && (
              <CircleIcon className="size-4 opacity-40" aria-hidden />
            )}
            {step}
          </li>
        ))}
      </ol>
      <p aria-live="polite" className="sr-only">
        {done ? "Deployment complete" : steps[current]}
      </p>
    </div>
  );
}
