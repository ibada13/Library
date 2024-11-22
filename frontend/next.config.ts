import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {

    domains: ['127.0.0.1', 'localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port:'8000'
      },
    ]
  }
};

export default nextConfig;
