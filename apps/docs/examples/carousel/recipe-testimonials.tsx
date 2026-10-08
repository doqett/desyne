"use client";

import { QuoteIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "We replaced three internal tools in a week. Our on-call rotation finally has one place to look.",
    name: "Amara Okafor",
    role: "Head of SRE, Fieldline",
    initials: "AO",
  },
  {
    quote:
      "The audit log alone paid for it. Our SOC 2 evidence collection went from days to minutes.",
    name: "Kenji Tanaka",
    role: "Security Lead, Monoform",
    initials: "KT",
  },
  {
    quote:
      "Finance and engineering look at the same dashboard now. That used to be a monthly argument.",
    name: "Sofia Davis",
    role: "VP Finance, Northwind",
    initials: "SD",
  },
  {
    quote:
      "Setup took an afternoon. The SDKs are small and the docs answered every question we had.",
    name: "Lucas Brown",
    role: "Staff Engineer, Parcelly",
    initials: "LB",
  },
];

export default function CarouselRecipeTestimonials() {
  return (
    <Carousel
      aria-label="Customer testimonials"
      opts={{ align: "start", loop: true }}
      className="w-full max-w-2xl"
    >
      <CarouselContent>
        {testimonials.map((t) => (
          <CarouselItem key={t.name} className="sm:basis-1/2">
            <Card className="h-full">
              <CardContent className="flex flex-1 flex-col gap-3">
                <QuoteIcon
                  className="size-5 text-muted-foreground"
                  aria-hidden
                />
                <blockquote className="text-sm leading-relaxed">
                  {t.quote}
                </blockquote>
              </CardContent>
              <CardFooter className="gap-3">
                <Avatar colorful alt="" fallback={t.initials} />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{t.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {t.role}
                  </span>
                </div>
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
