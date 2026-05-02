import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "lastfm.freetls.fastly.net",
        pathname: "/i/u/**",
      },
    ],
  },
};

export default nextConfig;
