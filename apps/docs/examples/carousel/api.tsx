"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const photos = ["Harbor", "Old town", "Tram 28", "Sunset", "Market"];

export default function CarouselApiExample() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Carousel aria-label="Lisbon photos" setApi={setApi}>
        <CarouselContent>
          {photos.map((p) => (
            <CarouselItem key={p}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center">
                  <span className="font-semibold text-xl">{p}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {/* Visual counter only: Carousel already announces the slide to screen readers. */}
      <p
        className="text-center text-muted-foreground text-sm tabular-nums"
        aria-hidden
      >
        Slide {current} of {count}
      </p>
    </div>
  );
}
