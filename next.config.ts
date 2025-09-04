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
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Augmente la limite à 10 MB pour les uploads d'images
    },
  },
};

export default nextConfig;
