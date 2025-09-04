import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "ideal-octo-system.vercel.app",
      },
      {
        protocol: "https",
        hostname: "uvjhykyaalklmrdvlbbo.supabase.co",
      },
    ],
  },
};

export default nextConfig;
