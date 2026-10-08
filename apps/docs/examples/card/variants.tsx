"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const variants = [
  {
    variant: "outline",
    title: "Outline",
    text: "The default. A hairline border for most dashboard surfaces.",
  },
  {
    variant: "elevated",
    title: "Elevated",
    text: "A soft shadow that lifts featured content off the page.",
  },
  {
    variant: "filled",
    title: "Filled",
    text: "A muted fill with no border, for secondary or nested panels.",
  },
  {
    variant: "ghost",
    title: "Ghost",
    text: "No surface at all. Keeps the spacing and slots only.",
  },
] as const;

export default function CardVariants() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
      {variants.map((v) => (
        <Card key={v.variant} variant={v.variant} size="sm">
          <CardHeader>
            <CardTitle>{v.title}</CardTitle>
            <CardDescription>{v.text}</CardDescription>
          </CardHeader>
          <CardContent>
            <code className="text-muted-foreground text-xs">
              variant="{v.variant}"
            </code>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
