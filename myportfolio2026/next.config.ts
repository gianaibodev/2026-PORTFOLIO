import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@radix-ui/react-slot"],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  // A CSP that matches what the site genuinely loads. 'unsafe-inline' is the
  // one concession left: Next inlines its bootstrap script and the shader
  // components write inline styles, so removing it needs nonces. There is no
  // 'unsafe-eval' and no third-party script host, which only became possible
  // once the Spline embed went away.
  // Note: case studies support an iframe embed that nothing uses yet. If one
  // is ever added, its host must be added to frame-src or it will be blocked.
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://images.unsplash.com https://picsum.photos",
      "font-src 'self' data:",
      // A dependency feature-detects codec support with a tiny data: URI video;
      // without this it falls back to default-src and gets blocked.
      "media-src 'self' data: blob:",
      "connect-src 'self' https://vitals.vercel-insights.com",
      "worker-src 'self' blob:",
      "frame-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
