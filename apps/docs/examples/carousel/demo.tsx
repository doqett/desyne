"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    title: "Dashboards",
    text: "Every metric in one place.",
    tone: "from-chart-1/25",
  },
  {
    title: "Alerts",
    text: "Know before your users do.",
    tone: "from-chart-2/25",
  },
  {
    title: "Reports",
    text: "Scheduled PDFs for the board.",
    tone: "from-chart-3/25",
  },
  {
    title: "Integrations",
    text: "Connect 40+ data sources.",
    tone: "from-chart-4/25",
  },
  {
    title: "Audit log",
    text: "Every change, attributed.",
    tone: "from-chart-5/25",
  },
];

export default function CarouselDemo() {
  return (
    <Carousel aria-label="Product features" className="w-full max-w-xs">
      <CarouselContent>
        {slides.map((s) => (
          <CarouselItem key={s.title}>
            <Card className={`bg-gradient-to-br ${s.tone} to-card`}>
              <CardContent className="flex aspect-square flex-col justify-end gap-1 p-6">
                <span className="font-semibold text-2xl">{s.title}</span>
                <span className="text-muted-foreground text-sm">{s.text}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
