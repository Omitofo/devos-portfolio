import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Prefer AVIF, then WebP, with Next/Image selecting the best supported
    // response format from the browser's Accept header.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
