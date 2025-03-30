import type { NextConfig } from "next";

const imageHosts = [
  "tailwindcss.com",
  "images.unsplash.com",
  "plus.unsplash.com",
  "media.istockphoto.com",
  "www.shutterstock.com",
  "cdn.sanity.io",
];

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  env: {
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: "service_8nwkxet",
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: "template_bsky8la",
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: "qeV_W2IMId2NMUL5W",
    GOOGLE_MAPS_API_KEY: "AIzaSyDQsUfinJeNTfOqqP1LHxrQOBtecJCzrkg",
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
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
