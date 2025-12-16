import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // env: {
  //   SEREVER_URL: process.env.SERVER_URL,
  //   GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
  // },
  env: {
    SERVER_URL: process.env.SERVER_URL, // ✅ SERVER_URL
    GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
  },
  images: {
    remotePatterns: [
      // { protocol: "https", hostname: "nh3.googleusercontent.com" },
    ],
  },
  reactStrictMode: false,

};

export default nextConfig;
