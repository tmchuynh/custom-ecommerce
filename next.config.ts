import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: "service_8nwkxet",
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: "template_bsky8la",
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: "qeV_W2IMId2NMUL5W",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "", // Optional: You can leave this blank
        pathname: "/**", // Allow all paths from placehold.co
      },
      {
        protocol: "https",
        hostname: "tailwindui.com", // Adding the tailwindui.com domain
        port: "", // Optional: You can leave this blank
        pathname: "/**", // Allow all paths from tailwindui.com
      },
    ],
    dangerouslyAllowSVG: true, // Allows SVG images to be loaded
  },
};

export default nextConfig;
