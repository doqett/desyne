"use client";

import { BarChart3Icon, PlugIcon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";

const steps = [
  {
    icon: PlugIcon,
    title: "Connect a data source",
    text: "Pick Postgres, BigQuery or one of 40 SaaS connectors. Read-only credentials are enough.",
  },
  {
    icon: BarChart3Icon,
    title: "Build a dashboard",
    text: "Start from a template or drag metrics onto a blank canvas. Everything updates live.",
  },
  {
    icon: UsersIcon,
    title: "Invite your team",
    text: "Share dashboards with a link, or add teammates with viewer, editor or admin roles.",
  },
];

/** Custom controls: any component inside <Carousel> can call useCarousel(). */
function StepControls() {
  const { api, scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarousel();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <CardFooter className="justify-between border-t">
      <span className="text-muted-foreground text-xs" aria-live="polite">
        Step {index + 1} of {steps.length}
      </span>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          isDisabled={!canScrollPrev}
          onPress={scrollPrev}
        >
          Back
        </Button>
        {canScrollNext ? (
          <Button size="sm" onPress={scrollNext}>
            Continue
          </Button>
        ) : (
          <Button size="sm">Get started</Button>
        )}
      </div>
    </CardFooter>
  );
}

export default function CarouselRecipeOnboarding() {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <Carousel
        aria-label="Getting started"
        opts={{ watchDrag: false }}
        // The footer's step counter is the live region here.
        announce={false}
        className="flex flex-col gap-4"
      >
        <CarouselContent>
          {steps.map((s, i) => (
            <CarouselItem
              key={s.title}
              aria-label={`Step ${i + 1} of ${steps.length}`}
            >
              <CardHeader>
                <span className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <s.icon className="size-5" aria-hidden />
                </span>
                <CardTitle>{s.title}</CardTitle>
                <CardDescription>{s.text}</CardDescription>
              </CardHeader>
            </CarouselItem>
          ))}
        </CarouselContent>
        <StepControls />
      </Carousel>
    </Card>
  );
}
