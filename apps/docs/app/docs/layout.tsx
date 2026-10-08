import { DocsShell } from "@/components/docs/docs-shell";
import { SiteFooter } from "@/components/marketing/site-footer";
import { source } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsShell tree={source.getPageTree()} footer={<SiteFooter />}>
      {children}
    </DocsShell>
  );
}
