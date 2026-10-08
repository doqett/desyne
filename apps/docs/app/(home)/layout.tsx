import { HomeLayout } from "fumadocs-ui/layouts/home";
import { SiteFooter } from "@/components/marketing/site-footer";
import { baseOptions } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <HomeLayout {...baseOptions()} className="[--fd-layout-width:1200px]">
      {children}
      <SiteFooter />
    </HomeLayout>
  );
}
