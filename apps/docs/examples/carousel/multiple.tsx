"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const templates = [
  "Invoice",
  "Roadmap",
  "OKRs",
  "Retro",
  "Onboarding",
  "Changelog",
  "Postmortem",
  "Budget",
];

export default function CarouselMultiple() {
  return (
    <Carousel
      aria-label="Templates"
      opts={{ align: "start" }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {templates.map((name) => (
          <CarouselItem key={name} className="basis-1/2 md:basis-1/3">
            <Card size="sm">
              <CardContent className="flex aspect-square items-end">
                <span className="font-medium text-sm">{name}</span>
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
