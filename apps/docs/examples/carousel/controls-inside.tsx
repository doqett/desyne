"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  { title: "Spring collection", tone: "from-chart-2/40" },
  { title: "Linen essentials", tone: "from-chart-3/40" },
  { title: "Weekend travel", tone: "from-chart-5/40" },
];

export default function CarouselControlsInside() {
  return (
    <Carousel aria-label="Collections" className="w-full max-w-md">
      <CarouselContent>
        {slides.map((s) => (
          <CarouselItem key={s.title}>
            <div
              className={`flex aspect-[16/9] items-end rounded-xl bg-gradient-to-t ${s.tone} to-muted p-5`}
            >
              <span className="font-semibold text-lg">{s.title}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-3 bg-background/80 backdrop-blur" />
      <CarouselNext className="right-3 bg-background/80 backdrop-blur" />
    </Carousel>
  );
}
