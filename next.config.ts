import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/api/preview',
        searchparams: ['url'],
      },
    ],
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
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.screenshotone.com",
      },
      {
        protocol: "https",
        hostname: "api.microlink.io",
      },
      {
        protocol: "https",
        hostname: "screenshot.rocks",
      },
      {
        protocol: "https",
        hostname: "cdn.microlink.io",
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
