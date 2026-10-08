"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const cities = ["Lisbon", "Kyoto", "Oaxaca", "Tallinn", "Cape Town"];

export default function CarouselLoop() {
  return (
    <Carousel
      aria-label="Destinations"
      opts={{ loop: true }}
      className="w-full max-w-xs"
    >
      <CarouselContent>
        {cities.map((city) => (
          <CarouselItem key={city}>
            <Card>
              <CardContent className="flex aspect-[4/3] items-center justify-center">
                <span className="font-semibold text-2xl">{city}</span>
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
