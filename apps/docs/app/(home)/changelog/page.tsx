import type { Metadata } from "next";
import { ChangelogList } from "@/components/marketing/changelog-list";
import { Band, Dim, PageHero } from "@/components/marketing/primitives";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Changelog",
  description:
    "Every Desyne release, newest first: new React Aria components, docs guides, Pro blocks and multi-page templates, with what changed in each version.",
  path: "/changelog",
});

export default function ChangelogPage() {
  return (
    <main className="flex flex-1 flex-col overflow-x-clip">
      <PageHero
        title={
          <>
            What’s new. <Dim>Shipped weekly.</Dim>
          </>
        }
        lead="Components, Pro blocks and templates, newest first. Pro licences include every release listed here."
      />
      <Band>
        <ChangelogList />
      </Band>
    </main>
  );
}
