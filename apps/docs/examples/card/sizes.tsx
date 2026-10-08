"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const sizes = [
  { size: "sm", note: "12px padding and gap. Dense grids and sidebars." },
  { size: "md", note: "16px padding and gap. The default." },
  { size: "lg", note: "24px padding and gap. Forms and focused pages." },
] as const;

export default function CardSizes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      {sizes.map((s) => (
        <Card key={s.size} size={s.size}>
          <CardHeader>
            <CardTitle>Size {s.size}</CardTitle>
            <CardDescription>{s.note}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-2 rounded-full bg-muted" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
