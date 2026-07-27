import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: {
    // Client document uploads flow through server actions.
    serverActions: { bodySizeLimit: "25mb" },
  },
};

export default nextConfig;
