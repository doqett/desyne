import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Logo } from "@/components/logo";
import { gitConfig } from "./shared";
import { proUrl } from "./site";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
    },
    links: [
      { text: "Docs", url: "/docs" },
      { text: "Components", url: "/docs/components" },
      { text: "Themes", url: "/themes" },
      { text: "Showcase", url: "/showcase" },
      { text: "Changelog", url: "/changelog" },
      { text: "Pro", url: proUrl, external: true },
      { text: "Pricing", url: `${proUrl}/pricing`, external: true },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
