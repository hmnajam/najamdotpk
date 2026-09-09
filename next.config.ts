import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/blog/shipping-is-a-feature", destination: "/blog/claude-code-review", permanent: true }];
  },
};

export default nextConfig;
