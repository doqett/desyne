"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const events = [
  { time: "09:00", title: "Standup", room: "Zoom" },
  { time: "10:30", title: "Design review", room: "Room 4B" },
  { time: "13:00", title: "Lunch with Maya", room: "Café Lisboa" },
  { time: "15:00", title: "Roadmap planning", room: "Room 2A" },
  { time: "17:30", title: "1:1 with Jackson", room: "Zoom" },
];

export default function CarouselVertical() {
  return (
    <div className="py-12">
      <Carousel
        aria-label="Today's schedule"
        orientation="vertical"
        opts={{ align: "start" }}
        className="w-full max-w-xs"
      >
        <CarouselContent className="-mt-2 h-[168px]">
          {events.map((e) => (
            <CarouselItem key={e.time} className="basis-1/2 pt-2">
              <Card size="sm" className="h-full justify-center">
                <CardContent className="flex items-center gap-3">
                  <span className="font-mono text-muted-foreground text-xs tabular-nums">
                    {e.time}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{e.title}</span>
                    <span className="text-muted-foreground text-xs">
                      {e.room}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
