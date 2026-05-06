import type { NextConfig } from "next";

const config: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default config;
