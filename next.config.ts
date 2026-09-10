import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/blog/shipping-is-a-feature", destination: "/blog/claude-code-review", permanent: true },
      { source: "/blog/content-as-code", destination: "/blog/fable-5-review", permanent: true },
    ];
  },
};

export default nextConfig;
