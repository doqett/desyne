import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const isDev = process.env.NODE_ENV === "development";

/*
 * Content-Security-Policy. Next.js injects inline scripts (RSC payload,
 * next-themes' no-flash script, JSON-LD), and allowing them by nonce would
 * force every page to render per request, giving up static generation. So
 * scripts are limited to this origin plus inline, and everything else is
 * locked down. vercel.live is the toolbar on preview deployments. Dev adds 'unsafe-eval' (React call stacks) and the HMR socket.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://vercel.live`,
  "style-src 'self' 'unsafe-inline'",
  // Examples load stock photos from a few hosts; images can't run code.
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://vercel.live https://assets.vercel.com",
  `connect-src 'self'${isDev ? " ws: wss:" : ""} https://vercel.live wss://ws-us3.pusher.com`,
  "frame-src 'self' https://vercel.live",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["@desyne/ui"],
  // The source is public; maps make production errors and Lighthouse readable.
  productionBrowserSourceMaps: true,
  experimental: {
    optimizePackageImports: [
      "react-aria-components",
      "react-aria",
      "@internationalized/date",
      "lucide-react",
      "recharts",
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default withMDX(config);
