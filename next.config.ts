import type { NextConfig } from "next";

const imageHosts = [
  "tailwindcss.com",
  "images.unsplash.com",
  "plus.unsplash.com",
  "media.istockphoto.com",
];

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: "service_8nwkxet",
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: "template_bsky8la",
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: "qeV_W2IMId2NMUL5W",
    GOOGLE_MAPS_API_KEY: "AIzaSyDQsUfinJeNTfOqqP1LHxrQOBtecJCzrkg",
  },
  images: {
    remotePatterns: imageHosts.map((hostname) => ({
      protocol: "https",
      hostname,
      port: "",
      pathname: "/**",
    })),
    dangerouslyAllowSVG: true,
  },
};

import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const finalConfig = bundleAnalyzer({
  ...nextConfig,
  // other Next.js config options here
});

export default finalConfig;
