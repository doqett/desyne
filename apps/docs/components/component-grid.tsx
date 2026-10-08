import { categories, components } from "@desyne/ui/registry";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Example } from "@/examples/__index__";
import { exampleSources } from "@/examples/__sources__";
import { newComponents } from "@/lib/docs-nav";
import { DesignCanvas } from "./design/design-canvas";

export function ComponentGrid() {
  return (
    <div className="not-prose flex flex-col gap-14">
      {categories.map((category) => {
        const items = components
          .filter((c) => c.category === category)
          .map((c) => ({
            ...c,
            example: `${c.name}/${c.preview ?? "demo"}`,
          }))
          .filter((c) => exampleSources[c.example] !== undefined);
        if (items.length === 0) return null;
        const id = `category-${category.toLowerCase().replace(/[^a-z]+/g, "-")}`;
        return (
          <section
            key={category}
            aria-labelledby={id}
            className="flex flex-col gap-5"
          >
            <div className="flex items-center gap-3">
              <h2
                id={id}
                className="font-semibold text-base tracking-[-0.01em]"
              >
                {category}
              </h2>
              <span className="rounded-full border bg-card px-1.5 font-mono text-[0.65rem] text-muted-foreground tabular-nums leading-4">
                {items.length}
              </span>
              <span aria-hidden className="h-px flex-1 bg-border" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((c) => {
                return (
                  <div
                    key={c.name}
                    className="group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-[border-color,box-shadow] focus-within:ring-[3px] focus-within:ring-ring/40 hover:border-foreground/20 hover:shadow-sm"
                  >
                    {/* Fixed-size canvas scaled down so every demo fits the same thumbnail. */}
                    <DesignCanvas
                      inert
                      aria-hidden
                      className="ds-canvas relative h-48 overflow-hidden border-b bg-background text-foreground"
                    >
                      <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex w-[420px] scale-[0.7] items-center justify-center transition-transform duration-300 group-hover:scale-[0.73]">
                        <Example name={c.example} />
                      </div>
                    </DesignCanvas>
                    <div className="flex flex-col gap-1 px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/docs/components/${c.name}`}
                          className="font-medium text-[0.9rem] tracking-[-0.01em] outline-none after:absolute after:inset-0"
                        >
                          {c.title}
                        </Link>
                        {newComponents.has(c.name) && (
                          <span className="rounded-[4px] bg-brand/10 px-1.5 py-px font-mono text-[0.6rem] text-brand uppercase tracking-[0.08em] dark:bg-brand/15">
                            New
                          </span>
                        )}
                        <ArrowRightIcon
                          aria-hidden
                          className="ms-auto size-3.5 text-muted-foreground opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                        />
                      </div>
                      <p className="line-clamp-2 text-[0.78rem] text-muted-foreground leading-relaxed">
                        {c.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
