"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const photos = [
  { seed: "chair-front", alt: "Oak lounge chair, front view" },
  { seed: "chair-side", alt: "Oak lounge chair, side view" },
  { seed: "chair-detail", alt: "Close-up of the woven seat" },
  { seed: "chair-room", alt: "Chair in a living room" },
  { seed: "chair-pair", alt: "Two chairs facing each other" },
];

export default function CarouselRecipeGallery() {
  const [main, setMain] = useState<CarouselApi>();
  const [thumbs, setThumbs] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!main) return;
    const onSelect = () => {
      const index = main.selectedScrollSnap();
      setSelected(index);
      thumbs?.scrollTo(index);
    };
    onSelect();
    main.on("select", onSelect);
    return () => {
      main.off("select", onSelect);
    };
  }, [main, thumbs]);

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Carousel aria-label="Product photos" setApi={setMain}>
        <CarouselContent>
          {photos.map((p) => (
            <CarouselItem key={p.seed}>
              {/* biome-ignore lint/performance/noImgElement: framework-agnostic example */}
              <img
                src={`https://picsum.photos/seed/${p.seed}/640/640`}
                alt={p.alt}
                className="aspect-square w-full rounded-xl bg-muted object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 bg-background/80 backdrop-blur" />
        <CarouselNext className="right-3 bg-background/80 backdrop-blur" />
      </Carousel>
      <Carousel
        aria-label="Thumbnails"
        setApi={setThumbs}
        // The main carousel already announces the selected photo.
        announce={false}
        opts={{ containScroll: "keepSnaps", dragFree: true }}
      >
        <CarouselContent className="-ml-2">
          {photos.map((p, i) => (
            <CarouselItem key={p.seed} className="basis-1/4 pl-2">
              <button
                type="button"
                aria-label={`Show photo ${i + 1}: ${p.alt}`}
                aria-current={i === selected ? "true" : undefined}
                onClick={() => main?.scrollTo(i)}
                className={cn(
                  "block w-full overflow-hidden rounded-lg outline-none ring-offset-2 ring-offset-background transition-opacity focus-visible:ring-[3px] focus-visible:ring-ring/25",
                  i === selected
                    ? "ring-2 ring-primary"
                    : "opacity-60 hover:opacity-100",
                )}
              >
                {/* biome-ignore lint/performance/noImgElement: framework-agnostic example */}
                <img
                  src={`https://picsum.photos/seed/${p.seed}/160/160`}
                  alt=""
                  className="aspect-square w-full bg-muted object-cover"
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
