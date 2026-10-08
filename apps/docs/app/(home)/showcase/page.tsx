import type { Metadata } from "next";
import {
  Band,
  CTA,
  Dim,
  Heading,
  PageHero,
} from "@/components/marketing/primitives";
import { BlockMarquee } from "@/components/marketing/shots";
import { ShowcaseGrid } from "@/components/marketing/showcase-grid";
import { proUrl, stats } from "@/lib/site";

export const metadata: Metadata = {
  title: "Showcase",
  description: "Templates and blocks built entirely with Desyne components.",
};

export default function ShowcasePage() {
  return (
    <main className="flex flex-1 flex-col overflow-x-clip">
      <PageHero
        title={
          <>
            Built with Desyne. <Dim>Every pixel.</Dim>
          </>
        }
        lead={`${stats.templates} complete templates and ${stats.blocks} blocks, made only from the components in this library. Open any of them live.`}
      >
        <div className="mt-8 flex flex-wrap gap-2">
          <CTA href={`${proUrl}/templates`}>Open template gallery</CTA>
          <CTA href={`${proUrl}/blocks`} tone="outline">
            Browse blocks
          </CTA>
        </div>
      </PageHero>
      <Band>
        <ShowcaseGrid />
      </Band>
      <Band muted inner="pb-10 sm:pb-12">
        <Heading>
          Sections you can drop in. <Dim>One command each.</Dim>
        </Heading>
      </Band>
      <div className="bg-muted/35 pb-16 dark:bg-muted/15">
        <BlockMarquee />
      </div>
    </main>
  );
}
