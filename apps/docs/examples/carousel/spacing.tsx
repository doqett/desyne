"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const colors = [
  "bg-chart-1/20",
  "bg-chart-2/20",
  "bg-chart-3/20",
  "bg-chart-4/20",
  "bg-chart-5/20",
  "bg-chart-1/20",
];

export default function CarouselSpacing() {
  return (
    <Carousel
      aria-label="Swatches"
      opts={{ align: "start" }}
      className="w-full max-w-sm"
    >
      <CarouselContent className="-ml-2">
        {colors.map((color, i) => (
          <CarouselItem
            // biome-ignore lint/suspicious/noArrayIndexKey: static swatches
            key={i}
            className="basis-1/3 pl-2"
          >
            <div
              className={`flex aspect-[3/4] items-end rounded-lg p-3 font-medium text-sm ${color}`}
            >
              {i + 1}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
