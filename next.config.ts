import type { NextConfig } from "next";

const imageHosts = [
  "placehold.co",
  "tailwindui.com",
  "tailwindcss.com",
  "images.unsplash.com",
  "hips.hearstapps.com",
  "previews.123rf.com",
  "www.websiteclosers.com",
  "media.gq.com",
  "i5.walmartimages.com",
  "fashionisers.com",
  "png.pngtree.com",
  "plus.unsplash.com",
  "www.shutterstock.com",
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

export default nextConfig;
