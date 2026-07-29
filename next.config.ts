import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  experimental: {
    useTypeScriptCli: true,
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },
};

// const withNextIntl = createNextIntlPlugin();
export default nextConfig;
