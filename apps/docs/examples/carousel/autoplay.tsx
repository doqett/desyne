"use client";

import { PauseIcon, PlayIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const announcements = [
  {
    title: "Usage-based billing is live",
    text: "Pay only for the events you send.",
  },
  { title: "New: audit log export", text: "Download a CSV of every change." },
  { title: "SOC 2 Type II report", text: "Available to all Team customers." },
];

export default function CarouselAutoplay() {
  const [api, setApi] = useState<CarouselApi>();
  const [playing, setPlaying] = useState(true);
  const [paused, setPaused] = useState(false);

  // Start paused for people who prefer reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (!api || !playing || paused) return;
    const id = window.setInterval(() => api.scrollNext(), 4000);
    return () => window.clearInterval(id);
  }, [api, playing, paused]);

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Carousel
        aria-label="Announcements"
        setApi={setApi}
        opts={{ loop: true }}
        // Rotating slides shouldn't interrupt; announce only when stopped.
        announce={!playing}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <CarouselContent>
          {announcements.map((a) => (
            <CarouselItem key={a.title}>
              <Card size="sm">
                <CardContent className="flex flex-col gap-1 py-4">
                  <span className="font-medium text-sm">{a.title}</span>
                  <span className="text-muted-foreground text-xs">
                    {a.text}
                  </span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Button
        variant="ghost"
        size="xs"
        className="self-end"
        onPress={() => setPlaying((p) => !p)}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
        {playing ? "Pause" : "Play"}
      </Button>
    </div>
  );
}
