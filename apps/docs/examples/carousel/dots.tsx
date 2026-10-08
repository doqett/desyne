"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const slides = [
  { title: "Invite your team", tone: "bg-chart-1/15" },
  { title: "Connect a data source", tone: "bg-chart-2/15" },
  { title: "Build your first dashboard", tone: "bg-chart-3/15" },
  { title: "Share with stakeholders", tone: "bg-chart-4/15" },
];

export default function CarouselDots() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <Carousel
      aria-label="Getting started"
      setApi={setApi}
      className="w-full max-w-xs"
    >
      <CarouselContent>
        {slides.map((s) => (
          <CarouselItem key={s.title}>
            <div
              className={cn(
                "flex aspect-[4/3] items-end rounded-xl p-5 font-medium",
                s.tone,
              )}
            >
              {s.title}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-3 flex justify-center gap-1.5">
        {slides.map((s, i) => (
          <button
            key={s.title}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === selected ? "true" : undefined}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-1.5 rounded-full bg-foreground/20 outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-ring/25",
              i === selected
                ? "w-5 bg-foreground"
                : "w-1.5 hover:bg-foreground/40",
            )}
          />
        ))}
      </div>
    </Carousel>
  );
}
