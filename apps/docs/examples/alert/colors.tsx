"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const items = [
  {
    color: "info",
    title: "Scheduled maintenance",
    text: "The dashboard will be read-only on Sunday, 02:00–04:00 UTC.",
  },
  {
    color: "success",
    title: "Payment received",
    text: "Invoice INV-2041 for $1,280.00 has been paid.",
  },
  {
    color: "warning",
    title: "Storage almost full",
    text: "You've used 92% of your 50 GB quota.",
  },
  {
    color: "danger",
    title: "Deployment failed",
    text: "The build for main@4f2c1ab exited with code 1.",
  },
  {
    color: "neutral",
    title: "Draft",
    text: "This page isn't published yet. Only editors can see it.",
  },
] as const;

export default function AlertColors() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {items.map((item) => (
        <Alert key={item.color} color={item.color} showIcon>
          <AlertTitle>{item.title}</AlertTitle>
          <AlertDescription>{item.text}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
