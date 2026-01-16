import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@emailjs/browser'], // Fix for Instagram In-App Browser crash
};

export default nextConfig;
