import { ArrowUpRightIcon } from "lucide-react";
import { proUrl, type ShowcaseTemplate, showcaseBlocks } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Light and dark screenshots that swap with the site theme. */
export function Shot({
  src,
  alt = "",
  width = 720,
  height = 450,
  className,
}: {
  src: string;
  alt?: string;
  /** Intrinsic size of the screenshot, so the box is reserved before load. */
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <>
      {/* biome-ignore lint/performance/noImgElement: static screenshots */}
      <img
        src={`${src}.webp`}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className={cn("dark:hidden", className)}
      />
      {/* biome-ignore lint/performance/noImgElement: static screenshots */}
      <img
        src={`${src}-dark.webp`}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className={cn("hidden dark:block", className)}
      />
    </>
  );
}

export function TemplateCard({
  t,
  className,
}: {
  t: ShowcaseTemplate;
  className?: string;
}) {
  return (
    <a
      href={`${proUrl}/templates/${t.slug}`}
      className={cn(
        "group block rounded-2xl border bg-card p-2 outline-none transition-shadow hover:shadow-lg focus-visible:ring-[3px] focus-visible:ring-ring/40",
        className,
      )}
    >
      <div className="overflow-hidden rounded-xl border bg-muted">
        <Shot
          src={`/showcase/${t.slug}`}
          alt={`${t.name} template — ${t.tagline}`}
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex items-center gap-2 px-2 pt-3 pb-1.5 text-sm">
        <span className="font-medium">{t.name}</span>
        <span className="truncate text-muted-foreground">{t.tagline}</span>
        <ArrowUpRightIcon className="ml-auto size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:rotate-45" />
      </div>
    </a>
  );
}

/** Two rows of Pro block thumbnails drifting in opposite directions. */
export function BlockMarquee() {
  const rows = [showcaseBlocks.slice(0, 8), showcaseBlocks.slice(8)];
  return (
    <div className="space-y-4 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      {rows.map((row, r) => (
        <div key={row[0].name} className="group flex overflow-hidden">
          <div
            className={cn(
              "flex w-max shrink-0 gap-4 pr-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none",
              r === 0
                ? "animate-[ds-marquee_60s_linear_infinite]"
                : "animate-[ds-marquee_70s_linear_infinite_reverse]",
            )}
          >
            {row.map((b) => (
              <a
                key={b.name}
                href={`${proUrl}/blocks`}
                className="block w-72 shrink-0 overflow-hidden rounded-xl border bg-card"
              >
                <Shot
                  src={`/showcase/blocks/${b.name}`}
                  alt={`${b.title} block`}
                  width={640}
                  height={400}
                  className="aspect-[16/10] w-full object-cover"
                />
                <span className="block border-t px-3 py-2 text-muted-foreground text-xs">
                  {b.title}
                </span>
              </a>
            ))}
            {row.map((b) => (
              <div
                key={`${b.name}-copy`}
                aria-hidden
                className="block w-72 shrink-0 overflow-hidden rounded-xl border bg-card"
              >
                <Shot
                  src={`/showcase/blocks/${b.name}`}
                  width={640}
                  height={400}
                  className="aspect-[16/10] w-full object-cover"
                />
                <span className="block border-t px-3 py-2 text-muted-foreground text-xs">
                  {b.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
