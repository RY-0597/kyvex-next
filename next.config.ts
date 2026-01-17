import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@emailjs/browser'], // Fix for Instagram In-App Browser crash
  // Headers are now managed by middleware.ts for conditional Instagram handling
};

export default nextConfig;
