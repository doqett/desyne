import type { Metadata } from "next";
import { ChangelogList } from "@/components/marketing/changelog-list";
import { Band, Dim, PageHero } from "@/components/marketing/primitives";

export const metadata: Metadata = {
  title: "Changelog",
  description: "New components, Pro blocks and templates, release by release.",
};

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
